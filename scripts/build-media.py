#!/usr/bin/env python3
"""Regenerate web media from source assets, per scripts/media-manifest.json.

Sources are never modified. Usage:
  python3 scripts/build-media.py --root phillips="/path/to/Final Assets" --root channel4="/path/to/Channel 4"
Roots default to the device paths in the manifest (works when run on Nick's Mac).
--only channel-4/ limits by output prefix. Requires Pillow (+ ffmpeg for video entries).

Entry keys:
  src     source file (relative to root)          out   output path under public/media
  w       max output width                         ar    optional "16:9" etc. -> centre crop to ratio
  box     [l,t,r,b] pixel crop applied before ar/resize
  focus   0..1 vertical anchor for the crop (0 top, .5 centre, 1 bottom)
  hstack  list of srcs placed side by side (same height) instead of src
  video   {"crop":[x,y,w,h], "w":700} -> mp4 + webm + poster from a video source
"""
import argparse, json, os, subprocess, sys
from PIL import Image, ImageFilter

here = os.path.dirname(os.path.abspath(__file__))
man = json.load(open(os.path.join(here, "media-manifest.json")))
ap = argparse.ArgumentParser()
ap.add_argument("--root", action="append", default=[])
ap.add_argument("--only", default="")
ap.add_argument("--quality", type=int, default=82)
a = ap.parse_args()
roots = dict(man["roots"])
for r in a.root:
    k, v = r.split("=", 1)
    roots[k] = v
out_base = os.path.join(here, "..", "public", "media")


def load(root, src):
    im = Image.open(os.path.join(roots[root], src))
    return im.convert("RGBA" if im.mode in ("RGBA", "LA", "P") else "RGB")


def crop_ar(im, ar, focus=0.5):
    n, d = (float(x) for x in ar.split(":"))
    want = n / d
    w, h = im.size
    if w / h > want:  # too wide -> crop sides (centred)
        nw = round(h * want); x = (w - nw) // 2
        return im.crop((x, 0, x + nw, h))
    nh = round(w / want); y = round((h - nh) * focus)
    return im.crop((0, y, w, y + nh))


missing = 0
for it in man["assets"]:
    if a.only and not it["out"].startswith(a.only):
        continue
    dst = os.path.join(out_base, it["out"])
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    srcs = it.get("hstack") or [it["src"]]
    paths = [os.path.join(roots[it["root"]], s) for s in srcs]
    gone = [p for p in paths if not os.path.exists(p)]
    if gone:
        for p in gone: print("MISSING", p)
        missing += 1; continue

    if "video" in it:
        v = it["video"]; x, y, w, h = v["crop"]; ow = v.get("w", w)
        vf = f"crop={w}:{h}:{x}:{y},scale={ow}:-2:flags=lanczos,unsharp=5:5:0.6"
        base = dst.rsplit(".", 1)[0]
        run = lambda *c: subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", paths[0], *c], check=True)
        run("-vf", vf, "-an", "-c:v", "libx264", "-preset", "slow", "-crf", "20", "-pix_fmt", "yuv420p", "-movflags", "+faststart", base + ".mp4")
        run("-vf", vf, "-an", "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "34", "-row-mt", "1", base + ".webm")
        run("-ss", "0.5", "-vf", vf, "-frames:v", "1", "-q:v", "3", base + "-poster.jpg")
        Image.open(base + "-poster.jpg").save(base + "-poster.webp", "WEBP", quality=80); os.remove(base + "-poster.jpg")
        print(f"{it['out']:44s} video {ow}w {os.path.getsize(base + '.mp4')//1024}KB mp4")
        continue

    ims = [load(it["root"], s) for s in srcs]
    if len(ims) > 1:
        H = min(i.height for i in ims)
        ims = [i.resize((round(i.width * H / i.height), H), Image.LANCZOS) if i.height != H else i for i in ims]
        im = Image.new("RGB", (sum(i.width for i in ims), H))
        x = 0
        for i in ims:
            im.paste(i, (x, 0)); x += i.width
    else:
        im = ims[0]
    if it.get("box"):  # explicit pixel crop [left, top, right, bottom] on the source
        im = im.crop(tuple(it["box"]))
    if it.get("ar"):
        im = crop_ar(im, it["ar"], it.get("focus", 0.5))
    if im.width > it["w"]:
        im = im.resize((it["w"], round(im.height * it["w"] / im.width)), Image.LANCZOS)
    im.save(dst, "WEBP", quality=a.quality, method=6)
    print(f"{it['out']:44s} {im.width}x{im.height} {os.path.getsize(dst)//1024}KB")
sys.exit(1 if missing else 0)
