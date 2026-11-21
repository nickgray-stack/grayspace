"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

// Medication-plan arc (Doctolib brand data-vis), built from the brand board's
// top-right frame (775 × 522). Reusable: in the showreel (nested timeline) or on
// the page (auto-plays once in view).
//
//   m = { base: "/media/doctolib/reel/med/", value: 21, digits?: { 0: url, … 9: url, "%": url } }
//
// Motion: the two rings draw round from the left · avatar and label settle ·
// the blue progress arc sweeps up to the value while the figure counts to it ·
// the soft glow rises at the base. Without digit glyphs (the brand serif isn't
// licensed for web), the figure is revealed as artwork instead of counting.
gsap.registerPlugin(CustomEase);
const bez = (id, c) => CustomEase.create(id, "M0,0 C" + c + " 1,1");
const SETTLE = bez("ma-settle", "0.22,1 0.36,1");
const MOVE = bez("ma-move", "0.65,0 0.35,1");

const W = 775;
const H = 522;
const u = (px) => (px / W) * 100 + "cqw";
const box = (x, y, w) => ({ left: u(x), top: u(y), width: u(w) });
const C = { x: 395.2, y: 521 }; // ring centre (below the frame's bottom edge)
const R_ARC = 343;
const END = -118; // degrees, where the progress arc finishes at the design's value

const pt = (r, deg) => [C.x + r * Math.cos((deg * Math.PI) / 180), C.y + r * Math.sin((deg * Math.PI) / 180)];
const arcPath = (r, a0, a1) => {
  const [x0, y0] = pt(r, a0);
  const [x1, y1] = pt(r, a1);
  return `M${x0} ${y0} A${r} ${r} 0 ${Math.abs(a1 - a0) > 180 ? 1 : 0} 1 ${x1} ${y1}`;
};

export function medArcTimeline(root, m = {}) {
  const q = (s) => root.querySelectorAll(s);
  const value = m.value ?? 21;
  const tl = gsap.timeline();
  gsap.set(q(".ma-ring"), { strokeDashoffset: 1 });
  gsap.set(q(".ma-prog"), { strokeDashoffset: 1 });
  gsap.set(q(".ma-av, .ma-lab"), { autoAlpha: 0, y: u(10) });
  gsap.set(q(".ma-val"), { autoAlpha: 0, y: u(18), clipPath: "inset(100% 0% 0% 0%)" });
  gsap.set(q(".ma-glow"), { autoAlpha: 0, y: u(40) });
  const num = root.querySelector(".ma-num");
  const counting = !!num;
  if (counting) gsap.set(q(".ma-prog"), { strokeDashoffset: 1 });
  tl.to(q(".ma-ring"), { strokeDashoffset: 0, duration: 1.4, ease: MOVE, stagger: 0.15 }, 0)
    .to(q(".ma-glow"), { autoAlpha: 1, y: 0, duration: 1.4, ease: SETTLE }, 0.2)
    .to(q(".ma-av"), { autoAlpha: 1, y: 0, duration: 0.7, ease: SETTLE }, 0.45)
    .to(q(".ma-lab"), { autoAlpha: 1, y: 0, duration: 0.7, ease: SETTLE }, 0.6)
    .to(q(".ma-val"), { autoAlpha: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: SETTLE }, 0.75);
  if (counting) {
    // the figure counts up and the arc grows in lock-step with it
    const prog = q(".ma-prog");
    const o = { v: 0 };
    const draw = () => {
      const n = Math.round(o.v);
      setFigure(num, n);
      gsap.set(prog, { strokeDashoffset: 1 - o.v / value });
    };
    setFigure(num, 0);
    tl.to(o, { v: value, duration: 2.0, ease: "power2.out", onUpdate: draw }, 0.8);
  } else {
    tl.to(q(".ma-prog"), { strokeDashoffset: 0, duration: 1.6, ease: SETTLE }, 0.7);
  }
  return tl;
}

// Figure built from the brand's own digit artwork (no web font needed): two digit
// slots and a percent sign, bottom-aligned, centred on the design's "21%".
const DW = { 0: 56, 1: 29, 2: 49, 3: 49, 4: 57, 5: 51, 6: 53, 7: 51, 8: 53, 9: 53 };
const DROP = { 0: 0.7, 3: 0.7, 6: 0.7, 8: 0.6, 9: 0.7 }; // optical overshoot of round figures
function setFigure(el, n) {
  const digits = String(n).split("");
  const slots = el.querySelectorAll(".ma-d");
  const base = el.dataset.base;
  slots.forEach((img, i) => {
    const ch = digits[i];
    if (ch === undefined) { img.style.display = "none"; return; }
    img.style.display = "block";
    if (img.dataset.ch !== ch) { img.dataset.ch = ch; img.src = base + "d" + ch + ".svg"; }
    img.style.width = u(DW[ch]);
    img.style.transform = `translateY(${u(DROP[ch] || 0)})`;
  });
}

export default function MedArc({ m = {}, auto = false, className = "", style }) {
  const ref = useRef(null);
  const base = m.base || "/media/doctolib/reel/med/";
  const value = m.value ?? 21;
  const a0 = END - (value / 100) * 360; // arc length is the value, as a share of the ring

  useEffect(() => {
    if (!auto || !ref.current) return;
    const el = ref.current;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tl = medArcTimeline(el, m).pause();
    if (reduce) { tl.progress(1); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { tl.play(); io.disconnect(); } }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); tl.kill(); };
  }, [auto]);

  return (
    <div ref={ref} className={"ma " + className} style={{ background: m.bg || "#F6F2EC", ...style }}>
      <img className="ma-glow" src={base + "glow.webp"} alt="" style={box(42, 289, 720)} />
      <svg className="ma-svg" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
        <defs>
          <linearGradient id="ma-g" x1="0" y1="180" x2="0" y2="522" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#C9DEFD" stopOpacity=".55" />
            <stop offset="1" stopColor="#5C9FF1" />
          </linearGradient>
          <filter id="ma-soft" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="1.1" /></filter>
          <filter id="ma-hi" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="1.6" /></filter>
        </defs>
        {/* rings draw round from the left */}
        <path className="ma-ring" d={arcPath(326.2, 180, 359.9)} pathLength="1" fill="none" stroke="#1d1d1b" strokeWidth=".5" strokeDasharray="1 1" />
        <path className="ma-ring" d={arcPath(308.8, 180, 359.9)} pathLength="1" fill="none" stroke="#1d1d1b" strokeWidth=".5" strokeDasharray="1 1" />
        {/* dashes are a second stroke riding over the outer ring once drawn */}
        <path d={arcPath(326.2, 180, 359.9)} fill="none" stroke="#F6F2EC" strokeWidth="1.2" strokeDasharray="3 3" />
        {/* progress arc: soft gradient body + inner highlight */}
        <path className="ma-prog" d={arcPath(R_ARC, a0, END)} pathLength="1" fill="none" stroke="url(#ma-g)" strokeWidth="9" strokeLinecap="round" strokeDasharray="1 1" filter="url(#ma-soft)" />
        <path className="ma-prog" d={arcPath(R_ARC - 1.5, a0, END - 0.4)} pathLength="1" fill="none" stroke="#fff" strokeOpacity=".85" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="1 1" filter="url(#ma-hi)" />
      </svg>
      <img className="ma-av" src={base + "avatar.svg"} alt="" style={box(373, 263, 44.2)} />
      <div className="ma-lab">
        <img src={base + "tri.svg"} alt="" style={box(327, 329, 10.7)} />
        <img src={base + "label.svg"} alt="Medication Plan" style={box(348, 328, 105)} />
      </div>
      {m.count === false ? (
        <img className="ma-val" src={base + "value-21.svg"} alt={value + "%"} style={box(315, 378, 162)} />
      ) : (
        <div className="ma-val ma-num" data-base={base} role="img" aria-label={value + "%"} style={{ left: u(0), top: u(378), width: u(W), height: u(73.5) }}>
          <img className="ma-d" alt="" />
          <img className="ma-d" alt="" />
          <img className="ma-pct" src={base + "pct.svg"} alt="" style={{ width: u(76.5) }} />
        </div>
      )}
    </div>
  );
}
