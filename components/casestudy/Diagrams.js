"use client";
import { useLayoutEffect, useRef, useState } from "react";

// Small explanatory diagrams for overlays, drawn in code so they stay crisp and
// match the page type. Each is keyed by name from a detail's `diagram` field.

// The quality action: the agreed definition, one part per line with its highlight,
// and four notes in the corners joined to their part by drawn arrows (after the Shape
// metric board). Lines never wrap and every size is in container units, so the layout
// is the same at every width and the measured arrows always land on the right words.
// Below ~380px the arrows drop and the notes list under the sentence.
const QA_LINES = [
  [{ n: 1, t: "The share of consultations that end with" }],
  [{ t: "an " }, { n: 2, t: "assigned care plan action" }, { t: "," }],
  [{ t: "where the " }, { n: 3, t: "patient completes that action" }],
  [{ t: "within a " }, { n: 4, t: "clinically appropriate window" }, { t: "." }],
];
const QA_C = { 1: "#F5E6B8", 2: "#EFD3B4", 3: "#C5CBF0", 4: "#C3DECF" };
const QA_NOTES = {
  1: "We count only consultations where the practitioner sets a next step.",
  2: "No-shows and visits with no action fall away, so the focus is what the practitioner asked for.",
  3: "Every action is recorded, even with a simple tick: “I've picked up my prescription.”",
  4: "Each action is measured against the window that's clinically right for it.",
};

export function QualityDiagram() {
  const root = useRef(null);
  const [arrows, setArrows] = useState([]);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const draw = () => {
      const R = el.getBoundingClientRect();
      if (!R.width || getComputedStyle(el.firstElementChild).getPropertyValue("--qa-arrows").trim() !== "1") return setArrows([]);
      const box = (q) => { const r = el.querySelector(q).getBoundingClientRect(); return { l: r.left - R.left, r: r.right - R.left, t: r.top - R.top, b: r.bottom - R.top, w: r.width, h: r.height }; };
      const n1 = box('[data-note="1"]'), n2 = box('[data-note="2"]'), n3 = box('[data-note="3"]'), n4 = box('[data-note="4"]');
      const m1 = box('[data-mark="1"]'), m2 = box('[data-mark="2"]'), m3 = box('[data-mark="3"]'), m4 = box('[data-mark="4"]');
      const g = R.width * 0.014; // gap between arrow tips and their targets
      // each arrow is one smooth quarter-bend (quadratic): it leaves its note along one
      // axis and arrives on the other, so every tip points squarely at its words
      const list = [
        // 1 · leaves the top-left note to the right, bends down onto line one
        { s: [n1.r + g, n1.t + n1.h * 0.5], e: [m1.l + m1.w * 0.78, m1.t - g] },
        // 2 · drops from the top-right note, bends left into the end of line two
        { s: [n2.l + n2.w * 0.55, n2.b + g], e: [m2.r + g * 1.8, m2.t + m2.h / 2] },
        // 3 · rises from the bottom-right note, bends left into the end of line three
        { s: [n3.l + n3.w * 0.7, n3.t - g], e: [m3.r + g * 1.8, m3.t + m3.h / 2] },
        // 4 · leaves the bottom-left note to the right, bends up onto line four
        { s: [n4.r + g, n4.t + n4.h * 0.5], e: [m4.l + m4.w * 0.78, m4.b + g] },
      ].map(({ s, e }, i) => ({ s, e, c: i === 0 || i === 3 ? [e[0], s[1]] : [s[0], e[1]] }));

      const L = R.width * 0.02;
      setArrows(list.map(({ s, e, c }) => {
        const a = Math.atan2(e[1] - c[1], e[0] - c[0]), W = 0.48;
        return {
          d: `M${s[0]} ${s[1]}Q${c[0]} ${c[1]} ${e[0]} ${e[1]}`,
          h: `M${e[0] - L * Math.cos(a - W)} ${e[1] - L * Math.sin(a - W)}L${e[0]} ${e[1]}L${e[0] - L * Math.cos(a + W)} ${e[1] - L * Math.sin(a + W)}`,
        };
      }));
    };
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(el);
    el.querySelectorAll("[data-note], .dg-qa-s").forEach((n) => ro.observe(n));
    const ts = [150, 500, 900, 1500].map((t) => setTimeout(draw, t));
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw);
    return () => { ro.disconnect(); ts.forEach(clearTimeout); };
  }, []);

  const Note = ({ n, cls }) => (
    <p className={"dg-qa-note " + cls} data-note={n}><span className="dg-qa-k" style={{ background: QA_C[n] }}>{n}</span>{QA_NOTES[n]}</p>
  );

  return (
    <div className="dg-qa" ref={root}>
      <div className="dg-qa-in">
      <div className="dg-qa-row"><Note n={1} cls="l" /><Note n={2} cls="r" /></div>
      <p className="dg-qa-s">
        {QA_LINES.map((line, i) => (
          <span className="dg-qa-line" key={i}>
            {line.map((p, j) => (p.n ? <mark key={j} data-mark={p.n} style={{ background: QA_C[p.n] }}>{p.t}</mark> : <span key={j}>{p.t}</span>))}
          </span>
        ))}
      </p>
      <div className="dg-qa-row"><Note n={4} cls="l" /><Note n={3} cls="r" /></div>
      </div>
      <svg className="dg-qa-arrows" aria-hidden="true">
        {arrows.map((a, i) => (<g key={i}><path d={a.d} /><path d={a.h} /></g>))}
      </svg>
    </div>
  );
}

// How the system worked: tokens → B2C / B2B components → contracts → code, on navy,
// redrawn from the Shape deck slide (same geometry, units are the slide's px).
export function SystemDiagram() {
  const box = (x, y, w, h, r, dash) => <rect x={x} y={y} width={w} height={h} rx={r} fill="none" stroke="#fff" strokeWidth="2" strokeDasharray={dash ? "8 6" : undefined} />;
  const label = (x, y, t) => <text x={x} y={y} textAnchor="middle" dominantBaseline="middle">{t}</text>;
  return (
    <div className="dg-sys">
      <svg viewBox="990 96 840 830" role="img" aria-label="Tokens feed B2C and B2B component libraries for mobile and desktop, which feed contracts and tokens files, which sync both ways with code">
        <g className="dg-sys-l" fill="none" stroke="#fff" strokeWidth="2">
          <path d="M1410 219V250M1210 281V250H1610V281" />
          <path d="M1210 539V590H1610V539M1410 590V621" />
          <path d="M1410 735V795M1398 749L1410 737L1422 749M1398 781L1410 793L1422 781" />
        </g>
        {box(1261, 131, 298, 88, 18)}
        {box(1031, 281, 358, 258, 22)}
        {box(1431, 281, 358, 258, 22, true)}
        {box(1061, 381, 138, 108, 20)}
        {box(1221, 381, 138, 108, 20, true)}
        {box(1461, 381, 138, 108, 20)}
        {box(1621, 381, 138, 108, 20, true)}
        {box(1261, 621, 298, 108, 18)}
        {box(1261, 801, 298, 88, 18)}
        <g className="dg-sys-t" fill="#fff">
          {label(1410, 176, "Tokens")}
          {label(1210, 314, "Components (B2C)")}
          {label(1610, 314, "Components (B2B)")}
          {label(1130, 436, "Mobile")}
          {label(1290, 436, "Desktop")}
          {label(1530, 436, "Mobile")}
          {label(1690, 436, "Desktop")}
          {label(1410, 660, "Contracts.ts")}
          {label(1410, 690, "Tokens.json")}
          {label(1410, 846, "Code")}
        </g>
      </svg>
    </div>
  );
}

export const DIAGRAMS = { quality: QualityDiagram, system: SystemDiagram };
