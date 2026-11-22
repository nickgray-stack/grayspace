"use client";
import { useId, useRef, useEffect } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import F from "./doctolibScriptFigma.json";

// The Doctolib write-on, rebuilt 1:1 from Nick's Figma splash ("Appointment
// Confirmation resize" · Logo Reveal): the same nine mask strokes, stroke weight,
// per-stroke timing and easing, read straight from the Figma file. The full logo
// fades in at the end to seal any edge the strokes don't cover.
//
// writeTimelineFigma(svg, { speed }) — speed 1 = Figma timing (writing ≈ 1.1s)
gsap.registerPlugin(CustomEase);
const EASE = CustomEase.create("sw-figma", `M0,0 C${F.ease[0]},${F.ease[1]} ${F.ease[2]},${F.ease[3]} 1,1`);

export function writeTimelineFigma(svg, { speed = 1 } = {}) {
  const pens = svg ? Array.from(svg.querySelectorAll(".swf-pen")) : [];
  const full = svg ? svg.querySelector(".swf-full") : null;
  const T = F.total / speed;
  const tl = gsap.timeline();
  pens.forEach((p, i) => {
    const s = F.strokes[i];
    // grow the dash from 0 to the whole path; reversed strokes grow from the end
    gsap.set(p, { attr: { "stroke-dasharray": "0 1", "stroke-dashoffset": s.rev ? -1 : 0 } });
    tl.to(p, { attr: { "stroke-dasharray": "1 1", "stroke-dashoffset": 0 }, duration: (s.t1 - s.t0) * T, ease: EASE }, s.t0 * T);
  });
  if (full) {
    gsap.set(full, { opacity: 0 });
    tl.to(full, { opacity: 1, duration: (F.seal[1] - F.seal[0]) * T, ease: "power1.inOut" }, F.seal[0] * T);
  }
  return tl;
}

export default function ScriptWriteFigma({ src, className, style, auto = false, speed }) {
  const id = useId().replace(/:/g, "");
  const ref = useRef(null);
  useEffect(() => {
    if (!auto || !ref.current) return;
    const svg = ref.current;
    const tl = writeTimelineFigma(svg, { speed }).pause();
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) { tl.progress(1); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { tl.play(); io.disconnect(); } }, { threshold: 0.5 });
    io.observe(svg);
    return () => { io.disconnect(); tl.kill(); };
  }, [auto, speed]);
  const L = F.logo;
  return (
    <svg ref={ref} className={className} style={style} viewBox={`0 0 ${F.w} ${F.h}`} role="img" aria-label="Doctolib">
      <defs>
        <mask id={`swf${id}`} maskUnits="userSpaceOnUse" x="-10" y="-10" width={F.w + 20} height={F.h + 20}>
          {F.strokes.map((s, i) => (
            <path key={i} className="swf-pen" transform={`translate(${s.x} ${s.y})`} d={s.d} pathLength="1" fill="none" stroke="#fff" strokeWidth={F.pen} strokeLinejoin="round" strokeLinecap="butt" strokeDasharray="0 1" />
          ))}
        </mask>
      </defs>
      <image href={src} x={L.x} y={L.y} width={L.w} height={L.h} mask={`url(#swf${id})`} />
      <image className="swf-full" href={src} x={L.x} y={L.y} width={L.w} height={L.h} opacity="0" />
    </svg>
  );
}
