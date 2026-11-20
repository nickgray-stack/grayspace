"use client";
import { useEffect, useId, useRef } from "react";
import gsap from "gsap";
import S from "./doctolibScript.json";

// The Doctolib script logo, written in as if by hand. The logo artwork is masked by
// pen strokes traced along its centre line (in the order and direction it would be
// written); each stroke draws at a steady pen speed with a short lift between strokes.
//
// <ScriptWrite src="/…/logo.svg" auto />  — plays itself when scrolled into view
// writeTimeline(svgEl, { duration })     — returns a GSAP timeline to nest elsewhere
export function writeTimeline(svg, { duration = 2.2, lift = 0.07 } = {}) {
  const paths = svg ? Array.from(svg.querySelectorAll(".sw-pen")) : [];
  const total = S.strokes.reduce((t, s) => t + Math.max(s.len, 3), 0);
  const pen = (duration - lift * (paths.length - 1)) / total; // seconds per unit of ink
  const tl = gsap.timeline();
  const full = svg ? svg.querySelector(".sw-full") : null;
  // strokes stay invisible until the pen reaches them (round caps would otherwise dot the start)
  gsap.set(paths, { strokeDashoffset: 1, opacity: 0 });
  if (full) gsap.set(full, { opacity: 0 });
  paths.forEach((p, i) => {
    const len = Math.max(S.strokes[i].len, 3);
    const at = i ? `>${lift}` : 0;
    tl.set(p, { opacity: 1 }, at);
    // a gentle ease in/out per stroke reads as a hand, not a plotter
    tl.to(p, { strokeDashoffset: 0, duration: len * pen, ease: "sine.inOut" }, "<");
  });
  // seal any hairline the pen missed at joins
  if (full) tl.to(full, { opacity: 1, duration: 0.35, ease: "none" }, ">-0.1");
  return tl;
}

export default function ScriptWrite({ src, className, style, auto = false, duration }) {
  const id = useId().replace(/:/g, "");
  const ref = useRef(null);
  useEffect(() => {
    if (!auto || !ref.current) return;
    const svg = ref.current;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tl = writeTimeline(svg, { duration }).pause();
    if (reduce) { tl.progress(1); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { tl.play(); io.disconnect(); } }, { threshold: 0.5 });
    io.observe(svg);
    return () => { io.disconnect(); tl.kill(); };
  }, [auto, duration]);
  return (
    <svg ref={ref} className={className} style={style} viewBox={`0 0 ${S.w} ${S.h}`} role="img" aria-label="Doctolib">
      <defs>
        <mask id={`sw${id}`} maskUnits="userSpaceOnUse" x="-4" y="-4" width={S.w + 8} height={S.h + 8}>
          {S.strokes.map((s, i) => (
            <path key={i} className="sw-pen" d={s.d} pathLength="1" fill="none" stroke="#fff" strokeWidth={S.pen} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 1" strokeDashoffset="1" opacity="0" />
          ))}
        </mask>
      </defs>
      <image href={src} x="0" y="0" width={S.w} height={S.h} mask={`url(#sw${id})`} />
      <image className="sw-full" href={src} x="0" y="0" width={S.w} height={S.h} opacity="0" />
    </svg>
  );
}
