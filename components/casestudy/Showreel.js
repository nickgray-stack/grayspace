"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import MedArc, { medArcTimeline } from "./MedArc";
import ScriptWrite, { writeTimeline } from "./ScriptWrite";

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

function S34({ R, tr, end }) {
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

      {/* scene 5: the light-blue panel opens across the frame; clarity line + arches */}
      <div className="s5">
        <div className="s5-wipe" style={{ ...box(1000, 0, 920, 1080), background: "#D8EAFF" }} />
        <img className="s5-d" src={A("s5/d-mark.svg")} alt="" style={box(665, 69, 29)} />
        <img className="s5-title" src={A("s5/title.svg")} alt="We bring clarity to the complexities of healthcare" style={box(666, 142, 453)} />
        <div className="s5-arches" style={box(659, 364, 603, 716)}>
          <img className="s5-frame" src={A("s5/bar.svg")} alt="" style={box(0.6, 0, 602.2)} />
          <img className="s5-frame" src={A("s5/frame.svg")} alt="" style={box(0.15, 0, 603)} />
          {[0.94, 106.97, 213.24, 328.52].map((y, i) => (
            <img key={i} className="s5-arch" src={A(`s5/arch-${i}.svg`)} alt="" style={box(0, y, 603)} />
          ))}
        </div>
      </div>

      {/* scene 6: photography steps in from the left, Live Well on yellow */}
      <div className="s6">
        <div className="s6-left">
          <div className="s6-panel" style={box(8, 10, 1114, 1061)} />
          <img className="s6-title" src={A("s6/title.svg")} alt="Helping healthier lives" style={box(52, 58, 241)} />
          {[
            [8, 310.5, 514.9, 762.4],
            [522.9, 600, 319.3, 472.8],
            [842, 782, 280.3, 290.8],
          ].map(([x, y, w, h], i) => (
            <div key={i} className="s6-ph" style={box(x, y, w, h)}>
              <img src={A(`s6/photo-${i + 1}.webp`)} alt="" />
            </div>
          ))}
        </div>
        <div className="s6-cell" style={box(1133, 540, 775, 698)}>
          <img src={A("s6/circle.webp")} alt="" style={box(0, 259, 776)} />
          <div className="s6-tab">
            <span className="s6-bezel" style={box(193.3, 104.8, 388.8, 583.2)} />
            <img src={A("s6/screen-back.svg")} alt="" style={box(213, 125.5, 349)} />
            <img src={A("s6/screen-body.svg")} alt="" style={box(213, 161, 349)} />
            <img src={A("s6/screen-head.svg")} alt="" style={box(213, 126, 349)} />
            <img src={A("s6/d.svg")} alt="" style={box(223.9, 134.1, 15.2)} />
            <img src={A("s6/tagline.svg")} alt="" style={box(418.7, 140, 131)} />
            <img className="s6-in" src={A("s6/live-well.svg")} alt="Live Well" style={box(277.5, 233, 235)} />
            <img className="s6-in" src={A("s6/illustration.webp")} alt="" style={box(288.3, 281.3, 213.6)} />
          </div>
        </div>
      </div>

      {/* top-right cell, version 2: the medication-plan arc pushes up over the arches */}
      {tr === "medication" && (
        <div className="s6-medcell" style={box(1133, 10, 775, 522)}>
          <div className="s6-med">
            <MedArc m={{ base: R + "med/", value: 21 }} />
          </div>
        </div>
      )}

      {/* end, version 1: mark above, script wipes in beneath */}
      {end === "wipe" && (
        <div className="sr-end">
          <div className="sr-end-mark" style={box(785, 213, 350, 350)}>
            <video muted loop playsInline preload="auto" src={A("mark.mp4")} />
          </div>
          <img className="sr-end-logo" src={A("s3/home-logo.svg")} alt="Doctolib" style={box(800, 612, 320)} />
        </div>
      )}
      {/* end, version 2: the mark performs in the centre, leaves, and the script is hand-written */}
      {end === "write" && (
        <div className="sr-end">
          <div className="sr-end-mark" style={box(960 - 230, 540 - 230, 460, 460)}>
            <video muted loop playsInline preload="auto" src={A("mark.mp4")} />
          </div>
          <ScriptWrite className="sr-end-write" src={A("s3/home-logo.svg")} style={box(960 - 170, 540 - 42, 340)} />
        </div>
      )}

      {/* right: phones on soft blue */}
      <div className="s3-right" style={{ ...box(1000, 0, 920, 1080), background: "#D8EAFF" }}>
        <img className="s3-phone" src={A("s3/phone-ai.webp")} alt="" style={box(657.2, 159.8, 509)} />
        <div className="s3-phone" style={box(93.75, 159.8, 509)}>
          <img src={A("s3/phone-home-empty.webp")} alt="" style={{ width: "100%", display: "block" }} />
          {/* the Doctolib script writes itself in as the phone lands */}
          <img className="s3-logo" src={A("s3/home-logo.svg")} alt="" style={box(23.25 + 179, 23.25 + 78, 105)} />
          {/* Home content, loaded in on top of the empty screen (phone-local coordinates + 23.25 shadow pad) */}
          <img className="s3-load" src={A("s3/home-heading.svg")} alt="" style={box(23.25 + 28.5, 23.25 + 157, 406)} />
          <img className="s3-load" src={A("s3/home-search.svg")} alt="" style={box(23.25 + 20, 23.25 + 264, 425)} />
          <div className="s3-card" style={box(23.25 + 28.5, 23.25 + 386.7, 406, 399)}>
            <img src={A("s3/home-card.svg")} alt="" style={box(0, 0, 406)} />
            <video className="s3-aimark" src={A("mark-sm.mp4")} muted loop playsInline autoPlay preload="auto" style={box(42 - 25.6, 57.3 - 25.6, 51.2, 51.2)} />
            <img src={A("s3/card-heading.svg")} alt="" style={box(77.5, 28.3, 297)} />
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

// Versions are switchable from the content file (m.topRight, m.ending) or, for quick
// side-by-side comparison, from the URL: ?tr=arches|medication&end=wipe|write
export default function Showreel({ m }) {
  const [v, setV] = useState({ tr: m.topRight || "arches", end: m.ending || "wipe" });
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const tr = p.get("tr");
    const end = p.get("end");
    if (tr || end) setV((o) => ({ tr: tr || o.tr, end: end || o.end }));
  }, []);
  return <ShowreelInner key={v.tr + v.end} m={m} tr={v.tr} end={v.end} />;
}

function ShowreelInner({ m, tr, end }) {
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
    window.__showreel = tl; // scrub in the console: __showreel.pause().seek(20, false)

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
      .to(q(".sr-guide"), { autoAlpha: 0, duration: 0.45, ease: ease("exit") }, 3.2)
      .to(sparks, { autoAlpha: 0, duration: 0.35, ease: ease("exit") }, 3.3)
      .to(cell, { l: -40, t: -40, r: W + 40, b: H + 40, duration: 1.3, ease: ease("move"), onUpdate: place }, 3.3);

    // ---- Scene 2 · Intelligence layer ----------------------------------------
    tl.call(() => { if (mark) { try { mark.currentTime = 2.0; } catch (e) {} mark.play().catch(() => {}); } }, [], 3.8)
      .to(q(".sr-mark"), { autoAlpha: 1, scale: 1, duration: 1.2, ease: ease("settle") }, 3.9)
      .to(q(".sr-tile"), { autoAlpha: 1, y: 0, duration: 0.8, ease: ease("card"), stagger: 0.12 }, 4.6)
      .fromTo(q(".sr-tile-i"), { autoAlpha: 0, scale: 0.72 }, { autoAlpha: 1, scale: 1, duration: 0.9, ease: ease("settle"), stagger: 0.12 }, 4.85)
      .fromTo(q(".sr-tile-l"), { clipPath: "inset(0% 100% 0% 0%)", y: u(6) }, { clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 0.8, ease: ease("settle"), stagger: 0.12 }, 5.05)
      ;

    // ---- Scene 3 · Assets and screens ------------------------------------------
    // the intelligence layer leaves; brand frames drop in from the top and rise from
    // the bottom with their contents settling inside; the phone panel slides in from
    // the right and Home "loads" its content (open, push, settle).
    const T3 = 7.0;
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
    const T4 = T3 + 4.4;
    tl.to(q(".s3-left"), { y: u(-1100), duration: 1.25, ease: ease("move") }, T4)
      .to(q(".s4-live"), { y: 0, duration: 1.25, ease: ease("move") }, T4)
      .to(q(".s4-net"), { clipPath: "circle(75% at 50% 50%)", duration: 1.9, ease: ease("settle") }, T4 + 0.7)
      .to(q(".s4-title"), { clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 1.2, ease: ease("settle") }, T4 + 1.0);

    // ---- Scene 4 → 5 · Push, open, settle ------------------------------------------
    // PUSH: the phones sink out of their blue panel. OPEN: the panel's edge sweeps left
    // across the frame, pushing Live Well off to the left, so blue becomes the stage.
    // SETTLE: the D mark and the line rise in, then the arches fall into place one by one.
    const T5 = T4 + 3.3;
    gsap.set(q(".s5"), { autoAlpha: 0 });
    tl.set(q(".s5"), { autoAlpha: 1 }, T5 + 0.3); // revealed beneath the matching blue phone panel
    gsap.set(q(".s5-d, .s5-title"), { autoAlpha: 0, y: u(24) });
    gsap.set(q(".s5-title"), { clipPath: "inset(0% 0% 100% 0%)" });
    gsap.set(q(".s5-frame"), { y: u(760) });
    gsap.set(q(".s5-arch"), { y: u(-140), autoAlpha: 0 });
    tl.to(q(".s3-phone"), { y: u(1150), duration: 0.9, ease: ease("exit"), stagger: 0.08 }, T5)
      .set(q(".s3-right"), { autoAlpha: 0 }, T5 + 0.95) // same blue as the wipe beneath: invisible hand-off
      .to(q(".s5-wipe"), { left: "0cqw", width: "100cqw", duration: 1.25, ease: ease("move") }, T5 + 0.35)
      .to(q(".s4-live"), { x: u(-1000), duration: 1.25, ease: ease("move") }, T5 + 0.35)
      .to(q(".s5-d"), { autoAlpha: 1, y: 0, duration: 0.8, ease: ease("settle") }, T5 + 1.3)
      .to(q(".s5-title"), { autoAlpha: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: ease("settle") }, T5 + 1.4)
      .to(q(".s5-frame"), { y: 0, duration: 1.2, ease: ease("settle") }, T5 + 1.55)
      // lowest arch lands first; each one above settles behind it, so the stack builds upward
      .to(q(".s5-arch"), { y: 0, autoAlpha: 1, duration: 0.9, ease: ease("card"), stagger: { each: 0.2, from: "end" } }, T5 + 2.05);

    // ---- Scene 6 · Grid and photography ---------------------------------------------
    // PUSH: the blue clarity scene shrinks into the top-right cell while photography
    // pushes in from the left and the yellow cell rises beneath it. SETTLE: each photo
    // opens upward and eases down in scale, building the steps; the tablet settles.
    const T6 = T5 + 4.0;
    const cellClip = (t, r, b, l, rad) => `inset(${u(t)} ${u(r)} ${u(b)} ${u(l)} round ${u(rad)})`;
    gsap.set(q(".s5"), { clipPath: cellClip(0, 0, 0, 0, 0) });
    gsap.set(q(".s6-left"), { x: u(-1150) });
    gsap.set(q(".s6-cell"), { y: u(600) });
    gsap.set(q(".s6-title"), { clipPath: "inset(0% 0% 100% 0%)", y: u(20) });
    gsap.set(q(".s6-ph"), { clipPath: "inset(100% 0% 0% 0%)" });
    gsap.set(q(".s6-ph img"), { scale: 1.18 });
    gsap.set(q(".s6-tab"), { y: u(130) });
    gsap.set(q(".s6-in"), { autoAlpha: 0, y: u(14) });
    gsap.set(q(".sr-end-mark"), { autoAlpha: 0, scale: 0.9 });
    gsap.set(q(".sr-end-logo"), { clipPath: "inset(0% 100% 0% 0%)" });
    tl.to(q(".s5-d, .s5-title"), { autoAlpha: 0, y: u(-20), duration: 0.4, ease: ease("exit") }, T6)
      .to(q(".s5"), { clipPath: cellClip(10, 12, 548, 1133, 8), duration: 1.2, ease: ease("move") }, T6)
      .to(q(".s5-arches"), { x: u(672.4), y: u(-270.2), scale: 0.627, transformOrigin: "0% 0%", duration: 1.2, ease: ease("move") }, T6)
      .to(q(".s6-left"), { x: 0, duration: 1.2, ease: ease("move") }, T6)
      .to(q(".s6-cell"), { y: 0, duration: 1.1, ease: ease("settle") }, T6 + 0.3)
      .to(q(".s6-ph"), { clipPath: "inset(0% 0% 0% 0%)", duration: 1.0, ease: ease("settle"), stagger: 0.15 }, T6 + 0.55)
      .to(q(".s6-ph img"), { scale: 1, duration: 1.4, ease: ease("settle"), stagger: 0.15 }, T6 + 0.55)
      .to(q(".s6-title"), { clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 1.0, ease: ease("settle") }, T6 + 0.8)
      .to(q(".s6-tab"), { y: 0, duration: 1.0, ease: ease("settle") }, T6 + 0.7)
      .to(q(".s6-in"), { autoAlpha: 1, y: 0, duration: 0.7, ease: ease("settle"), stagger: 0.12 }, T6 + 1.15);

    if (tr === "medication") {
      // the medication arc pushes up into the top-right cell, the arches leave above it
      const medRoot = el.querySelector(".s6-med .ma");
      gsap.set(q(".s6-med"), { yPercent: 102 });
      tl.to(q(".s6-med"), { yPercent: 0, duration: 1.0, ease: ease("move") }, T6 + 1.25)
        .to(q(".s5-arches"), { y: u(-270.2 - 560), duration: 1.0, ease: ease("move") }, T6 + 1.25);
      if (medRoot) tl.add(medArcTimeline(medRoot, { value: 21 }), T6 + 1.85);
    }

    // ---- End · Back to the calm ground ------------------------------------------------
    // OPEN: the three cells part outwards (the opening, in reverse). The mark returns and
    // plays a different passage of its animation; then the script writes itself in.
    const T7 = T6 + (tr === "medication" ? 5.0 : 3.6);
    const endMark = el.querySelector(".sr-end-mark video");
    tl.to(q(".s6-left"), { x: u(-1160), duration: 1.1, ease: ease("move") }, T7)
      .to(q(".s5, .s6-medcell"), { x: u(820), duration: 1.1, ease: ease("move") }, T7)
      .to(q(".s6-cell"), { x: u(820), duration: 1.1, ease: ease("move") }, T7 + 0.06)
      .call(() => { if (endMark) { try { endMark.currentTime = 8.0; } catch (e) {} endMark.play().catch(() => {}); } }, [], T7 + 0.4);
    if (end === "write") {
      // the mark performs for a moment in the centre, gathers itself and leaves;
      // then the script is written in its place, stroke by stroke
      const sw = el.querySelector(".sr-end-write");
      gsap.set(q(".sr-end-mark"), { autoAlpha: 0, scale: 0.88 });
      tl.to(q(".sr-end-mark"), { autoAlpha: 1, scale: 1, duration: 1.0, ease: ease("settle") }, T7 + 0.5)
        .to(q(".sr-end-mark"), { autoAlpha: 0, scale: 0.55, duration: 0.7, ease: ease("exit") }, T7 + 2.7);
      if (sw) tl.add(writeTimeline(sw, { duration: 2.0 }), T7 + 3.15);
      tl.to({}, { duration: 1.4 });
    } else {
      tl.to(q(".sr-end-mark"), { autoAlpha: 1, scale: 1, duration: 1.0, ease: ease("settle") }, T7 + 0.55)
        .to(q(".sr-end-logo"), { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: ease("move") }, T7 + 2.3)
        .to({}, { duration: 1.6 });
    }

    el.classList.add("ready");
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
  }, [tr, end]);

  const toggle = () => {
    const tl = tlRef.current;
    const el = root.current;
    if (!tl) return;
    if (done) {
      setDone(false);
      setPlaying(true);
      delete el.dataset.userPaused;
      tl.restart(false, false); // render callbacks on the jump back so the grid closes again
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
        {/* state tiles: card, live icon, label */}
        {[
          ["responding", 21, 5, 174, 71],
          ["listening", 22, 15, 171, 80],
          ["thinking", 27, 13, 165, 81],
        ].map(([k, ix, iy, iw, lx], i) => (
          <div key={k} className="sr-tile" style={{ left: u(612 + i * 240.5), top: u(766), width: u(214), height: u(220.7) }}>
            <img className="sr-tile-bg" src={m.reel + "s2/tile-bg.webp"} alt="" />
            <img className={"sr-tile-i sr-i-" + k} src={m.reel + `s2/i-${k}.svg`} alt="" style={{ left: u(ix), top: u(iy), width: u(iw) }} />
            <img className="sr-tile-l" src={m.reel + `s2/l-${k}.svg`} alt={k[0].toUpperCase() + k.slice(1)} style={{ left: u(lx), top: u(186.5), width: u({ responding: 74.2, listening: 55.5, thinking: 54 }[k]) }} />
          </div>
        ))}

        {/* scenes 3–4: brand frames on the left, phones on the right */}
        <S34 R={m.reel} tr={tr} end={end} />

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
          <video className="sr-guide-mark" src={m.reel + "mark-sm.mp4"} muted loop playsInline autoPlay preload="auto" style={{ left: u(834 - CELL.l - 32), top: u(539 - CELL.t - 32), width: u(64) }} />
          <img className="sr-guide-t" src={m.reel + "s2/guide.svg"} alt={m.guide || "Gathering guidance…"} style={{ left: u(893 - CELL.l), top: u(526 - CELL.t), width: u(257) }} />
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
