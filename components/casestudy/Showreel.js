"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

// Doctolib showreel hero — built in code so scenes can be retimed or swapped.
// Everything is laid out on the Figma 1920 × 1080 frame and sized in container
// units (1px of the frame = 1/19.2 cqw), so it scales cleanly at any width.
//
// Motion grammar (calm, considered): OPEN (cells part from a point),
// PUSH (cells move along one axis), SETTLE (content rises and lands softly).
// Eases (exact bezier curves via CustomEase):
gsap.registerPlugin(CustomEase);
const bez = (id, c) => CustomEase.create(id, "M0,0 C" + c + " 1,1");
const EASE = {
  settle: bez("sr-settle", "0.22,1 0.36,1"), // entrances / settles
  move: bez("sr-move", "0.65,0 0.35,1"), // both ends visible
  exit: bez("sr-exit", "0.32,0 0.67,0"), // quiet exits
  card: bez("sr-card", "0.34,1.3 0.64,1"), // small cards only, ≤3% overshoot
};
const ease = (k) => EASE[k];

const W = 1920;
const H = 1080;
const u = (px) => (px / W) * 100 + "cqw"; // frame px → container units

// Scene 1 centre cell (the "intelligence" window) and the pinwheel of quadrants
const CELL = { l: 620, t: 399, r: 1300, b: 689 };
const MID = { x: (CELL.l + CELL.r) / 2, y: (CELL.t + CELL.b) / 2 };

function Sparkle() {
  return (
    <svg viewBox="0 0 30 36" aria-hidden="true">
      <path d="M15 0 C16 12 18 16 30 18 C18 20 16 24 15 36 C14 24 12 20 0 18 C12 16 14 12 15 0Z" fill="currentColor" />
    </svg>
  );
}

export default function Showreel({ m }) {
  const root = useRef(null);
  const tlRef = useRef(null);
  const [done, setDone] = useState(false);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = (s) => el.querySelectorAll(s);
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mark = el.querySelector(".sr-mark video");

    // The cell is driven by four numbers; quadrants and sparkles follow them.
    const cell = { l: MID.x, t: MID.y, r: MID.x, b: MID.y };
    const quads = q(".sr-quad");
    const sparks = q(".sr-spark");
    const place = () => {
      const { l, t, r, b } = cell;
      const set = (n, x0, y0, x1, y1) => {
        n.style.left = u(x0);
        n.style.top = u(y0);
        n.style.width = u(Math.max(0, x1 - x0));
        n.style.height = u(Math.max(0, y1 - y0));
      };
      // pinwheel: TL, TR, BR, BL
      set(quads[0], -2000, -2000, r, t);
      set(quads[1], r, -2000, W + 2000, b);
      set(quads[2], l, b, W + 2000, H + 2000);
      set(quads[3], -2000, t, l, H + 2000);
      [[l, t], [r, t], [r, b], [l, b]].forEach(([x, y], i) => {
        sparks[i].style.left = u(x);
        sparks[i].style.top = u(y);
      });
    };
    place();

    const tl = gsap.timeline({ paused: true, onComplete: () => setDone(true) });
    tlRef.current = tl;

    if (reduce) {
      // final calm frame, no motion
      Object.assign(cell, { l: -400, t: -400, r: W + 400, b: H + 400 });
      place();
      gsap.set(q(".sr-mark, .sr-tile"), { autoAlpha: 1, y: 0, scale: 1 });
      gsap.set(q(".sr-guide"), { autoAlpha: 0 });
      setDone(true);
      return;
    }

    gsap.set(q(".sr-mark"), { autoAlpha: 0, scale: 0.86 });
    gsap.set(q(".sr-tile"), { autoAlpha: 0, y: u(60) });
    gsap.set(q(".sr-guide"), { autoAlpha: 0 });
    gsap.set(sparks, { autoAlpha: 0, scale: 0.4 });

    // ---- Scene 1 · Opening frame reveal ---------------------------------------
    // a point → a slit (width first) → the window (height), sparkles on the corners
    tl.to(sparks, { autoAlpha: 1, scale: 1, duration: 0.5, ease: ease("settle"), stagger: 0.05 }, 0.2)
      .to(cell, { l: CELL.l, r: CELL.r, t: MID.y - 3, b: MID.y + 3, duration: 1.0, ease: ease("settle"), onUpdate: place }, 0.35)
      .to(cell, { t: CELL.t, b: CELL.b, duration: 1.0, ease: ease("settle"), onUpdate: place }, 1.05)
      .to(q(".sr-guide"), { autoAlpha: 1, duration: 0.4, ease: "none" }, 1.7)
      .fromTo(q(".sr-guide-t"), { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: ease("settle") }, 1.8)
      // hold, then the quadrants part outwards to reveal the light ground
      .to(q(".sr-guide"), { autoAlpha: 0, duration: 0.45, ease: ease("exit") }, 4.0)
      .to(sparks, { autoAlpha: 0, duration: 0.35, ease: ease("exit") }, 4.1)
      .to(cell, { l: -40, t: -40, r: W + 40, b: H + 40, duration: 1.3, ease: ease("move"), onUpdate: place }, 4.1);

    // ---- Scene 2 · Intelligence layer ----------------------------------------
    tl.call(() => mark && mark.play().catch(() => {}), [], 4.6)
      .to(q(".sr-mark"), { autoAlpha: 1, scale: 1, duration: 1.2, ease: ease("settle") }, 4.7)
      .to(q(".sr-tile"), { autoAlpha: 1, y: 0, duration: 0.8, ease: ease("card"), stagger: 0.12 }, 5.5)
      // hold on the intelligence layer (scenes 3+ follow when assets arrive)
      .to({}, { duration: 3.2 });

    // play when visible, pause when off screen or in a background tab
    let inView = false;
    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      if (inView && !tl.isActive() && tl.progress() < 1 && !el.dataset.userPaused) tl.play();
      if (!inView) tl.pause();
    }, { threshold: 0.35 });
    io.observe(el);
    const onVis = () => (document.hidden ? tl.pause() : inView && !el.dataset.userPaused && tl.progress() < 1 && tl.play());
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      tl.kill();
    };
  }, []);

  const toggle = () => {
    const tl = tlRef.current;
    const el = root.current;
    if (!tl) return;
    if (done) {
      setDone(false);
      setPlaying(true);
      delete el.dataset.userPaused;
      tl.restart();
      return;
    }
    if (tl.isActive()) {
      tl.pause();
      el.dataset.userPaused = "1";
      setPlaying(false);
    } else {
      delete el.dataset.userPaused;
      tl.play();
      setPlaying(true);
    }
  };

  const c = m.colors || {};
  return (
    <div className="sr" ref={root} style={{ "--sr-bg": c.bg || "#F6F2EC", "--sr-quad": c.quad || "#BCDFC8", "--sr-line": c.line || "rgba(24,46,34,.55)" }}>
      <div className="sr-stage">
        {/* scene 2: the intelligence layer */}
        <div className="sr-mark" style={{ left: u(960 - 240), top: u(150), width: u(480) }}>
          <video muted loop playsInline preload="auto" poster={m.mark.poster}>
            <source src={m.mark.webm} type="video/webm" />
            <source src={m.mark.video} type="video/mp4" />
          </video>
        </div>
        {(m.tiles || []).map((t, i) => (
          <img key={i} className="sr-tile" src={t} alt="" style={{ left: u(612 + i * 240.5), top: u(766), width: u(214) }} />
        ))}

        {/* scene 1: quadrants + window */}
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="sr-quad" />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="sr-spark">
            <Sparkle />
          </span>
        ))}
        <div className="sr-guide" style={{ left: u(CELL.l), top: u(CELL.t), width: u(CELL.r - CELL.l), height: u(CELL.b - CELL.t) }}>
          <span className="sr-guide-mark" />
          <span className="sr-guide-t">{m.guide || "Gathering guidance…"}</span>
        </div>
      </div>
      <button className="sr-ctl" type="button" onClick={toggle} aria-label={done ? "Replay showreel" : playing ? "Pause showreel" : "Play showreel"}>
        {done ? (
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4.5h4.5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" /></svg>
        ) : playing ? (
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l12-7.5z" fill="currentColor" /></svg>
        )}
      </button>
    </div>
  );
}
