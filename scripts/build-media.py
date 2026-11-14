#!/usr/bin/env python3
"""Regenerate web media from source assets, per scripts/media-manifest.json.

Sources are never modified. Usage:
  python3 scripts/build-media.py --root phillips=/path/to/"Final Assets" --root christies=/path/to/"FOLIO ASSETS"
Roots default to the device paths in the manifest (works when run on Nick's Mac).
Add --only christies/ to limit by output prefix. Requires Pillow.
"""
import argparse, json, os, sys
from PIL import Image

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
missing = 0
for it in man["assets"]:
    if a.only and not it["out"].startswith(a.only):
        continue
    src = os.path.join(roots[it["root"]], it["src"])
    dst = os.path.join(out_base, it["out"])
    if not os.path.exists(src):
        print("MISSING", src); missing += 1; continue
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    im = Image.open(src)
    im = im.convert("RGBA" if im.mode in ("RGBA", "LA", "P") else "RGB")
    if im.width > it["w"]:
        im = im.resize((it["w"], round(im.height * it["w"] / im.width)), Image.LANCZOS)
    im.save(dst, "WEBP", quality=a.quality, method=6)
    print(f"{it['out']:44s} {im.width}x{im.height} {os.path.getsize(dst)//1024}KB")
sys.exit(1 if missing else 0)
