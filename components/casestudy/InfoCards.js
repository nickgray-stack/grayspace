"use client";
import { useEffect, useRef, useState } from "react";

// Animated info-card cluster (Doctolib). Layout mirrors the Figma frame
// "asset-Info Cards" (960 × 1080): background line art across the top, four
// cards placed at their Figma coordinates. On entering the viewport the line art
// eases in, then each card rises and settles with a gentle overshoot, staggered.
// Reduced motion: everything simply appears in place.
//
// m: { bg, lines, cards: [{ src, x, y, w, h }], frame: [960, 1080], pad }
//    x/y/w/h are the card's box in frame units; `pad` is the shadow margin baked
//    into each exported PNG (frame units), so the visible card lands on x/y.
export default function InfoCards({ m }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  const [fw, fh] = m.frame || [960, 1080];
  const pad = m.pad ?? 14;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const pct = (v, of) => (v / of) * 100 + "%";

  return (
    <div ref={ref} className={"icards" + (on ? " in" : "")} style={{ aspectRatio: `${fw}/${fh}`, background: m.bg }}>
      {m.lines && <img className="ic-lines" src={m.lines} alt="" aria-hidden="true" style={{ width: "100%", aspectRatio: m.linesAr || "2880/1820" }} />}
      {m.cards.map((c, i) => (
        <img
          key={i}
          className="ic-card"
          src={c.src}
          alt={c.alt || ""}
          loading="lazy"
          style={{
            left: pct(c.x - pad, fw),
            top: pct(c.y - pad, fh),
            width: pct(c.w + pad * 2, fw),
            "--d": (m.order ? m.order.indexOf(i) : i) * 150 + 250 + "ms",
          }}
        />
      ))}
    </div>
  );
}
