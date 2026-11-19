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


// ---- scenes 3–4 layout (Figma frame coordinates) ----------------------------------
const box = (x, y, w, h) => ({ left: u(x), top: u(y), width: u(w), ...(h ? { height: u(h) } : null) });
const SPMID = ["radiology", "cardiology", "dermatology", "nutrition", "general-practice", "physiotherapy"];
const RIGHT = ["pediatrics", "orthopedics", "ent", "gastro", "orthopedics-2", "endocrinology"];
const SPW = { radiology: 115, cardiology: 127, dermatology: 151, nutrition: 101, "general-practice": 195, physiotherapy: 166, pediatrics: 115, orthopedics: 149, ent: 48, gastro: 78, "orthopedics-2": 149, endocrinology: 169 };
const DRS = [
  { c: "#E4FFEE", w: 204 },
  { c: "#FFD89E", w: 201 },
  { c: "#E8F3FF", w: 200 },
  { c: "#FFECE0", w: 202 },
];
const DRY = [683, 753.74, 824.48, 895.46];

function S34({ R }) {
  const A = (f) => R + f;
  return (
    <>
      <div className="s3-left">
        {/* top-left: two social posts on sand */}
        <div className="s3-frame s3-posts" style={{ ...box(0, 6, 983, 553), background: "#E7D7C8" }}>
          <div className="s3-post" style={box(197, 99, 271)}>
            <img src={A("s3/post-bg.svg")} alt="" style={box(0, 0, 271)} />
            <img className="s3-bump" src={A("s3/post-l-top.svg")} alt="" style={box(0, 33, 271)} />
            <img className="s3-bump" src={A("s3/post-l-bottom.svg")} alt="" style={box(0, 283, 271)} />
            <img className="s3-ptitle" src={A("s3/post-l-title.svg")} alt="" style={box(57, 130, 158)} />
          </div>
          <div className="s3-post" style={box(516, 99, 271)}>
            <img src={A("s3/post-bg.svg")} alt="" style={box(0, 0, 271)} />
            <img className="s3-bump" src={A("s3/post-r-top.svg")} alt="" style={box(0, 33, 271)} />
            <img className="s3-bump" src={A("s3/post-r-bottom.svg")} alt="" style={box(0, 184, 271)} />
            <img className="s3-ptitle" src={A("s3/post-r-title.svg")} alt="" style={box(82, 94, 106)} />
            <img className="s3-ptitle" src={A("s3/post-r-title2.svg")} alt="" style={box(63, 251, 146)} />
          </div>
        </div>
        {/* bottom-left: practitioner chips */}
        <div className="s3-frame s3-chips" style={{ ...box(0, 565, 509, 509), background: "#F5F3F0" }}>
          {DRS.map((d, i) => (
            <div key={i} className="s3-row" style={box(102, DRY[i] - 565, 304.6, 60.2)}>
              <span className="s3-cell" style={{ ...box(0, 0, 57.65, 60.2), "--c": d.c }} />
              <span className="s3-cell" style={{ ...box(57.65, 0, 246.9, 60.2), "--c": d.c }} />
              <img src={A(`s3/avatar-${i}.webp`)} alt="" style={box(11, 11.7, 36)} />
              <img src={A(`s3/dr-${i}.svg`)} alt="" style={box(78, 20, d.w)} />
            </div>
          ))}
        </div>
        {/* bottom-middle: specialty table on mint */}
        <div className="s3-frame s3-table" style={{ ...box(516, 566, 467, 508), background: "#BCDFC8" }}>
          {SPMID.map((n, i) => (
            <div key={i} className="s3-row" style={box(-183, 85.75 + 58.03 * i, 712.4, 58.03)}>
              <span className="s3-tcell" style={box(0, 0, 268.2, 58.03)} />
              <span className="s3-tcell" style={box(268.2, 0, 245.2, 58.03)} />
              <span className="s3-tcell" style={box(513.4, 0, 199, 58.03)} />
              <img src={A(`s3/sp-${n}.svg`)} alt="" style={box(287.8, 19.3, SPW[n])} />
              <img src={A(`s3/sp-${RIGHT[i]}.svg`)} alt="" style={box(533.4, 19.3, SPW[RIGHT[i]])} />
            </div>
          ))}
        </div>
      </div>

      {/* scene 4: Live Well, network lines opening from the centre */}
      <div className="s3-frame s4-live" style={{ ...box(16, 60, 969, 969), background: "#F4F2EE" }}>
        <img className="s4-net" src={A("s4/network.svg")} alt="" style={box(0, 0, 969)} />
        <img className="s4-title" src={A("s4/live-well.svg")} alt="Live Well." style={box(329, 454, 312)} />
      </div>

      {/* right: phones on white */}
      <div className="s3-right" style={{ ...box(1000, 0, 920, 1080), background: "#FFFFFF" }}>
        <img src={A("s3/phone-ai.webp")} alt="" style={box(657.2, 159.8, 509)} />
        <div style={box(93.75, 159.8, 509)}>
          <img src={A("s3/phone-home-empty.webp")} alt="" style={{ width: "100%", display: "block" }} />
          {/* the Doctolib script writes itself in as the phone lands */}
          <img className="s3-logo" src={A("s3/home-logo.svg")} alt="" style={box(23.25 + 179, 23.25 + 78, 105)} />
          {/* Home content, loaded in on top of the empty screen (phone-local coordinates + 23.25 shadow pad) */}
          <img className="s3-load" src={A("s3/home-heading.svg")} alt="" style={box(23.25 + 28.5, 23.25 + 157, 406)} />
          <img className="s3-load" src={A("s3/home-search.svg")} alt="" style={box(23.25 + 20, 23.25 + 264, 425)} />
          <div className="s3-card" style={box(23.25 + 28.5, 23.25 + 386.7, 406, 399)}>
            <img src={A("s3/home-card.svg")} alt="" style={box(0, 0, 406)} />
            <img src={A("s3/home-card-head.webp")} alt="" style={box(0, 11.3, 406)} />
            <img className="s3-chip" src={A("s3/home-chip-0.svg")} alt="" style={box(68.5, 96.3, 295)} />
            <img className="s3-chip" src={A("s3/home-chip-1.svg")} alt="" style={box(68.5, 162.3, 295)} />
            <img className="s3-chip" src={A("s3/home-chip-2.svg")} alt="" style={box(68.5, 229.3, 295)} />
            <img className="s3-chip" src={A("s3/home-ask.svg")} alt="" style={box(77.5, 327.3, 161)} />
          </div>
        </div>
      </div>
    </>
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
      ;

    // ---- Scene 3 · Assets and screens ------------------------------------------
    // the intelligence layer leaves; brand frames drop in from the top and rise from
    // the bottom with their contents settling inside; the phone panel slides in from
    // the right and Home "loads" its content (open, push, settle).
    const T3 = 8.6;
    gsap.set(q(".s3-posts"), { y: u(-620) });
    gsap.set(q(".s3-chips"), { y: u(560) });
    gsap.set(q(".s3-table"), { y: u(560) });
    gsap.set(q(".s3-right"), { x: u(940) });
    gsap.set(q(".s3-post"), { y: u(-70) });
    gsap.set(q(".s3-bump"), { y: u(22) });
    gsap.set(q(".s3-ptitle"), { autoAlpha: 0, y: u(10) });
    gsap.set(q(".s3-row"), { autoAlpha: 0, y: u(26) });
    gsap.set(q(".s3-load"), { autoAlpha: 0, y: u(14) });
    gsap.set(q(".s3-card"), { autoAlpha: 0, scale: 0.96, transformOrigin: "50% 0%" });
    gsap.set(q(".s3-chip"), { autoAlpha: 0, x: u(18) });
    gsap.set(q(".s3-logo"), { clipPath: "inset(0% 100% 0% 0%)" });
    gsap.set(q(".s4-live"), { y: u(1100) });
    gsap.set(q(".s4-net"), { clipPath: "circle(0% at 50% 50%)" });
    gsap.set(q(".s4-title"), { clipPath: "inset(0% 50% 0% 50%)", y: u(8) });

    tl.to(q(".sr-mark, .sr-tile"), { autoAlpha: 0, y: u(-30), duration: 0.5, ease: ease("exit"), stagger: 0.04 }, T3)
      .to(q(".s3-right"), { x: 0, duration: 1.25, ease: ease("move") }, T3 + 0.15)
      .to(q(".s3-posts"), { y: 0, duration: 1.15, ease: ease("settle") }, T3 + 0.35)
      .to(q(".s3-post"), { y: 0, duration: 0.9, ease: ease("card"), stagger: 0.12 }, T3 + 0.85)
      .to(q(".s3-bump"), { y: 0, duration: 0.8, ease: ease("card"), stagger: 0.1 }, T3 + 1.2)
      .to(q(".s3-ptitle"), { autoAlpha: 1, y: 0, duration: 0.7, ease: ease("settle"), stagger: 0.08 }, T3 + 1.4)
      .to(q(".s3-chips"), { y: 0, duration: 1.15, ease: ease("settle") }, T3 + 0.5)
      .to(q(".s3-table"), { y: 0, duration: 1.15, ease: ease("settle") }, T3 + 0.65)
      .to(q(".s3-chips .s3-row"), { autoAlpha: 1, y: 0, duration: 0.7, ease: ease("card"), stagger: 0.09 }, T3 + 1.05)
      .to(q(".s3-table .s3-row"), { autoAlpha: 1, y: 0, duration: 0.7, ease: ease("card"), stagger: 0.07 }, T3 + 1.2)
      .to(q(".s3-logo"), { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: ease("move") }, T3 + 0.95)
      // Home loads in: heading, search, then the card opens and its prompts push in
      .to(q(".s3-load"), { autoAlpha: 1, y: 0, duration: 0.7, ease: ease("settle"), stagger: 0.12 }, T3 + 1.25)
      .to(q(".s3-card"), { autoAlpha: 1, scale: 1, duration: 0.8, ease: ease("settle") }, T3 + 1.55)
      .to(q(".s3-chip"), { autoAlpha: 1, x: 0, duration: 0.7, ease: ease("settle"), stagger: 0.1 }, T3 + 1.85);

    // ---- Scene 4 · Asset swap -------------------------------------------------------
    // the next frame pushes the brand assets up and out; the network lines open from
    // the centre and "Live Well." peels open around it
    const T4 = T3 + 5.6;
    tl.to(q(".s3-left"), { y: u(-1100), duration: 1.25, ease: ease("move") }, T4)
      .to(q(".s4-live"), { y: 0, duration: 1.25, ease: ease("move") }, T4)
      .to(q(".s4-net"), { clipPath: "circle(75% at 50% 50%)", duration: 1.9, ease: ease("settle") }, T4 + 0.7)
      .to(q(".s4-title"), { clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 1.2, ease: ease("settle") }, T4 + 1.0)
      .to({}, { duration: 3.0 });

    if (reduce) {
      // reduced motion: rest on the final composed frame, no movement
      tl.progress(1).pause();
      setDone(true);
      return;
    }

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

        {/* scenes 3–4: brand frames on the left, phones on the right */}
        <S34 R={m.reel} />

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
