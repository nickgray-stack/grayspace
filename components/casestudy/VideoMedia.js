"use client";
import { useEffect, useRef } from "react";

// Looping, muted, autoplay-on-scroll video. Plays only while in view (pauses
// offscreen) for performance. Accepts a local path or an external URL, plus an
// optional WebM source and a poster for instant paint. `cover` crops to fill
// (device screens, full-bleed); otherwise the video keeps its own ratio.
export default function VideoMedia({ src, webm, poster, ratio, cover = true, className = "" }) {
  const ref = useRef(null);

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
          if (e.isIntersecting) {
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

  const style = ratio && ratio !== "free" ? { aspectRatio: ratio.replace(":", "/") } : undefined;

  return (
    <video
      ref={ref}
      className={(cover ? "vmcover " : "vmfit ") + className}
      poster={poster}
      muted
      loop
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
