"use client";
import { useEffect, useRef } from "react";

// Looping, muted, autoplay-on-scroll video. Plays only while in view (pauses
// offscreen) for performance. Accepts a local path or an external URL, plus an
// optional WebM source and a poster for instant paint. `cover` crops to fill
// (device screens, full-bleed); otherwise the video keeps its own ratio.
// Sequenced use (a stage on phones): pass `active` to run one clip at a time — it
// restarts and plays when it becomes active, pauses otherwise — with `loop={false}`
// and `onEnded` to hand over to the next clip.
export default function VideoMedia({ src, webm, poster, ratio, cover = true, className = "", loop = true, active, onEnded }) {
  const ref = useRef(null);
  const inView = useRef(false);
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // Force-mute via the DOM property — the React `muted` attribute alone is
    // unreliable and lets a clip that carries an audio track play sound.
    v.muted = true;
    v.defaultMuted = true;
    v.volume = 0;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          inView.current = e.isIntersecting;
          if (e.isIntersecting && activeRef.current !== false) {
            const p = v.play();
            if (p && p.catch) p.catch(() => {});
          } else {
            v.pause();
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v || active === undefined) return;
    if (active) {
      try { v.currentTime = 0; } catch (e) {}
      if (inView.current) { const p = v.play(); if (p && p.catch) p.catch(() => {}); }
    } else v.pause();
  }, [active]);

  const style = ratio && ratio !== "free" ? { aspectRatio: ratio.replace(":", "/") } : undefined;

  return (
    <video
      ref={ref}
      className={(cover ? "vmcover " : "vmfit ") + className}
      poster={poster}
      muted
      loop={loop}
      onEnded={onEnded}
      playsInline
      preload="metadata"
      aria-hidden="true"
      style={style}
    >
      {webm && <source src={webm} type="video/webm" />}
      {src && <source src={src} type="video/mp4" />}
    </video>
  );
}
