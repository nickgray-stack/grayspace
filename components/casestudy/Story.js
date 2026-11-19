"use client";
import { useEffect, useRef, useState } from "react";

// Storytelling modules for the core case studies: big type, diagrams and figures.
// Each one is plain data in content/projects/<slug>.js and animates once when it
// scrolls into view (class "in"). Reduced motion: final state, no movement.

export function useInView(threshold = 0.25) {
  const ref = useRef(null);
  const [inView, setIn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setIn(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setIn(true); io.disconnect(); } }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// *emphasis* inside a string → <em>
export function rich(text) {
  if (!text) return null;
  return String(text).split(/(\*[^*]+\*)/g).map((t, i) => (t.startsWith("*") && t.endsWith("*") ? <em key={i}>{t.slice(1, -1)}</em> : t));
}

// Count a figure up from 0 (keeps prefixes/suffixes like "%", "→", ",").
function CountUp({ value, run }) {
  const m = String(value).match(/^(\D*)([\d.,]+)(.*)$/);
  const [n, setN] = useState(m ? 0 : null);
  useEffect(() => {
    if (!m || !run) return;
    const target = parseFloat(m[2].replace(/,/g, ""));
    const dec = (m[2].split(".")[1] || "").length;
    const t0 = performance.now(); const D = 1200; let raf;
    const tick = (t) => { const p = Math.min(1, (t - t0) / D); const e = 1 - Math.pow(1 - p, 4); setN((target * e).toFixed(dec)); if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!m) return <>{value}</>;
  return <>{m[1]}{run ? n : 0}{m[3]}</>;
}

// ---- Targets: before → after figures, then the objectives -------------------
export function Targets({ m }) {
  const [ref, inView] = useInView();
  return (
    <section className={"section wrap st-targets" + (inView ? " in" : "")} ref={ref}>
      <div className="st-tgrid">
        {m.items.map((it, i) => (
          <div className="st-target" key={i} style={{ "--d": i * 120 + "ms" }}>
            <div className="st-eyebrow">{it.eyebrow}</div>
            <div className="st-fig">
              <span className="st-from">{it.from}</span>
              <svg className="st-arrow" viewBox="0 0 60 20" aria-hidden="true"><path d="M2 10h52M46 3l8 7-8 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <span className="st-to"><CountUp value={it.to} run={inView} /></span>
            </div>
            <div className="st-sub">{it.sub}</div>
          </div>
        ))}
      </div>
      {m.objectives && (
        <div className="st-objs">
          <div className="st-eyebrow">Business objectives</div>
          <ol>{m.objectives.map((o, i) => <li key={i} style={{ "--d": 400 + i * 80 + "ms" }}><span>{String(i + 1).padStart(2, "0")}</span>{o}</li>)}</ol>
        </div>
      )}
      {m.note && <p className="st-fine">{m.note}</p>}
    </section>
  );
}

// ---- Shifts: three from → to pairs -------------------------------------------
export function Shifts({ m }) {
  const [ref, inView] = useInView();
  return (
    <section className={"section wrap st-shifts" + (inView ? " in" : "")} ref={ref}>
      {m.items.map((it, i) => (
        <div className="st-shift" key={i} style={{ "--d": i * 180 + "ms" }}>
          <div className="st-pair">
            <span className="st-old">{it.from}</span>
            <span className="st-line" aria-hidden="true" />
            <span className="st-new">{it.to}</span>
          </div>
          <p>{it.copy}</p>
        </div>
      ))}
    </section>
  );
}

// ---- Persona -------------------------------------------------------------------
export function Persona({ m }) {
  const [ref, inView] = useInView();
  return (
    <section className={"section wrap st-persona" + (inView ? " in" : "")} ref={ref}>
      <div className="st-pcard">
        <div className="st-avatar" aria-hidden="true">{m.initial || m.name[0]}</div>
        <div>
          <div className="st-eyebrow">{m.eyebrow}</div>
          <p className="st-pname">{m.name}</p>
          <p>{m.bio}</p>
        </div>
        <blockquote>{m.quote}</blockquote>
      </div>
      {m.text && <p className="modhead st-after">{m.text}</p>}
    </section>
  );
}

// ---- Journey text card (pairs with a phone in a row) ---------------------------
export function JourneyCard({ c }) {
  return (
    <div className="detail st-journey">
      <div>
        <div className="st-jn">{c.n}</div>
        <h3>{c.title}</h3>
      </div>
      <div className="st-jcols">
        <div><div className="st-eyebrow">The pain point</div><p>{c.pain}</p></div>
        <div><div className="st-eyebrow">What we designed</div><p>{c.designed}</p></div>
      </div>
    </div>
  );
}

// ---- Pull-out + principles grid --------------------------------------------------
export function Pull({ m }) {
  const [ref, inView] = useInView();
  return (
    <section className={"section wrap st-pull" + (inView ? " in" : "")} ref={ref}>
      <p className="st-pullq">{m.text}</p>
      {m.items && (
        <div className="st-pgrid">
          {m.items.map((it, i) => (
            <div key={i} style={{ "--d": i * 90 + "ms" }}><span>{String(i + 1).padStart(2, "0")}</span><h4>{it.title}</h4><p>{it.copy}</p></div>
          ))}
        </div>
      )}
      {m.note && <p className="st-fine">{m.note}</p>}
    </section>
  );
}

// ---- Bars: grouped bar chart (preference test) or funnel ----------------------------
export function Bars({ m }) {
  const [ref, inView] = useInView(0.3);
  const max = m.max || 100;
  return (
    <section className={"section wrap st-bars" + (inView ? " in" : "")} ref={ref}>
      <div className="st-bhead">
        {m.eyebrow && <div className="st-eyebrow">{m.eyebrow}</div>}
        <div className="st-legend">{m.series.map((s, i) => <span key={i} className={i === (m.highlight ?? -1) ? "hi" : ""}><i style={{ background: s.color }} />{s.name}</span>)}</div>
      </div>
      <div className="st-bgroups">
        {m.groups.map((g, gi) => (
          <div className="st-bgroup" key={gi}>
            <div className="st-glabel">{g.label}</div>
            <div className="st-brows">
              {g.values.map((v, i) => (
                <div className={"st-brow" + (i === (m.highlight ?? -1) ? " hi" : "")} key={i}>
                  <span className="st-bar" style={{ "--w": (v / max) * 100 + "%", "--d": gi * 120 + i * 60 + "ms", background: m.series[i].color }} />
                  <span className="st-bval">{v}{m.unit || ""}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {m.caption && <p className="st-cap">{rich(m.caption)}</p>}
    </section>
  );
}

// ---- The quality-action sentence: colour-coded phrases + numbered notes -------------
export function Sentence({ m }) {
  const [ref, inView] = useInView(0.3);
  const [hover, setHover] = useState(null);
  return (
    <section className={"section wrap st-sentence" + (inView ? " in" : "")} ref={ref}>
      {m.eyebrow && <div className="st-eyebrow">{m.eyebrow}</div>}
      <p className="st-qsent">
        {m.parts.map((p, i) =>
          typeof p === "string" ? <span key={i}>{p}</span> : (
            <mark key={i} className={"st-mark" + (hover === p.n ? " on" : "")} style={{ "--d": 200 + p.n * 380 + "ms" }} onMouseEnter={() => setHover(p.n)} onMouseLeave={() => setHover(null)}>
              {p.text}<sup>{p.n}</sup>
            </mark>
          )
        )}
      </p>
      {m.notes && (
        <div className="st-notes">
          {m.notes.map((n, i) => (
            <div key={i} className={"st-note" + (hover === i + 1 ? " on" : "")} style={{ "--d": 900 + i * 120 + "ms" }} onMouseEnter={() => setHover(i + 1)} onMouseLeave={() => setHover(null)}>
              <span className="st-nn">{i + 1}</span>
              <h4>{n.title}</h4>
              <p>{n.copy}</p>
            </div>
          ))}
        </div>
      )}
      {m.foot && <p className="st-fine">{m.foot}</p>}
    </section>
  );
}

// ---- Two lists: what we nudge vs what we don't count ---------------------------------
export function Lists({ m }) {
  const [ref, inView] = useInView();
  return (
    <section className={"section wrap st-lists" + (inView ? " in" : "")} ref={ref}>
      {m.cols.map((col, ci) => (
        <div className={"st-list" + (col.muted ? " muted" : "")} key={ci}>
          <div className="st-eyebrow">{col.title}</div>
          <ul>
            {col.items.map((it, i) => (
              <li key={i} style={{ "--d": ci * 300 + i * 100 + "ms" }}>
                <span className="st-badge">{it.k}</span>
                <div><h4>{it.title}</h4><p>{it.copy}</p></div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

// ---- Loop: four steps that feed back into the first ------------------------------
export function Loop({ m }) {
  const [ref, inView] = useInView(0.3);
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setStep((s) => (s + 1) % m.steps.length), 1800);
    return () => clearInterval(id);
  }, [inView, m.steps.length]);
  return (
    <section className={"section wrap st-loop" + (inView ? " in" : "")} ref={ref}>
      {m.text && <p className="st-metric">{rich(m.text)}</p>}
      <div className="st-lgrid" style={{ "--n": m.steps.length }}>
        {m.steps.map((s, i) => (
          <div key={i} className={"st-lstep" + (i === step ? " on" : "")} style={{ "--d": i * 140 + "ms" }}>
            <span className="st-ln">{String(i + 1).padStart(2, "0")}</span>
            <h4>{s.title}</h4>
            <p>{s.copy}</p>
            {i < m.steps.length - 1 && <svg className="st-larr" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>}
          </div>
        ))}
        <svg className="st-lback" viewBox="0 0 1000 60" preserveAspectRatio="none" aria-hidden="true">
          <path d="M970 4 C970 46, 940 54, 880 54 L120 54 C60 54, 30 46, 30 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" vectorEffect="non-scaling-stroke" />
          <path d="M22 14 L30 4 L38 14" fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      {m.note && <p className="st-fine">{m.note}</p>}
    </section>
  );
}

// ---- System diagram: tokens → components (B2C/B2B × mobile/desktop) → contracts ↔ code
export function System({ m }) {
  const [ref, inView] = useInView(0.3);
  return (
    <section className={"section wrap st-system" + (inView ? " in" : "")} ref={ref}>
      <div className="st-sysgrid">
        <div className="st-syscopy">
          {m.eyebrow && <div className="st-eyebrow">{m.eyebrow}</div>}
          <ul>{m.points.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
        <div className="st-diagram" aria-label="Design system architecture">
          <div className="st-node st-root" style={{ "--d": "0ms" }}>Tokens</div>
          <div className="st-branch" />
          <div className="st-libs">
            {["Components (B2C)", "Components (B2B)"].map((l, i) => (
              <div className="st-node st-lib" key={i} style={{ "--d": 200 + i * 120 + "ms" }}>
                {l}
                <div className="st-modes"><span>Mobile</span><span>Desktop</span></div>
              </div>
            ))}
          </div>
          <div className="st-branch up" />
          <div className="st-node" style={{ "--d": "520ms" }}>Contracts.ts · Tokens.json</div>
          <div className="st-sync" aria-hidden="true">↕</div>
          <div className="st-node st-code" style={{ "--d": "680ms" }}>Code</div>
        </div>
      </div>
    </section>
  );
}

// ---- Evidence ladder -------------------------------------------------------------
export function Ladder({ m }) {
  const [ref, inView] = useInView();
  return (
    <section className={"section wrap st-ladder" + (inView ? " in" : "")} ref={ref}>
      <h2 className="st-h2">{m.title}</h2>
      <ol>
        {m.items.map((it, i) => (
          <li key={i} className={it.open ? "open" : ""} style={{ "--d": i * 110 + "ms" }}>
            <span className="st-dot" />
            <h4>{it.k}</h4>
            <p>{it.copy}</p>
          </li>
        ))}
      </ol>
      {m.note && <p className="st-ladnote">{m.note}</p>}
    </section>
  );
}

// ---- Data table (fallback when a chart isn't the right form) -----------------------
export function Table({ m }) {
  return (
    <section className="section wrap st-table">
      {m.eyebrow && <div className="st-eyebrow">{m.eyebrow}</div>}
      <table>
        <thead><tr><th />{m.cols.map((c, i) => <th key={i}>{c}</th>)}</tr></thead>
        <tbody>{m.rows.map((r, i) => <tr key={i}><th>{r[0]}</th>{r.slice(1).map((v, j) => <td key={j} className={j === m.highlight ? "hi" : ""}>{v}</td>)}</tr>)}</tbody>
      </table>
      {m.caption && <p className="st-cap">{rich(m.caption)}</p>}
    </section>
  );
}
