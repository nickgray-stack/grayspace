"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Pause, Play } from "lucide-react";

// Hero slideshow for the wide (16:9) media slot.
//
// Transition: two brand-colour slabs sweep across on a forward-leaning angle,
// with the incoming image following on the same edge and settling from a
// slight zoom. The outgoing slide drifts left underneath (parallax). During
// the hold, a slow push-in keeps the frame alive; a `pan` slide (an image
// wider than the frame) travels across instead.
//
// Timings: 1.15s expo.inOut wipe, layers staggered 65ms, 1.7s expo.out settle,
// 3.6s hold (override per slide with `hold`). Pauses off-screen and when the tab
// is hidden. Pause/play control + clickable progress bars (WCAG 2.2.2).
// prefers-reduced-motion: starts paused; navigation and Play use a plain crossfade.

const D = 1.15; // wipe duration (s)
const STAGGER = 0.065; // between slab A, slab B and the image — keeps the colour bands slim
const EASE = "expo.inOut";
const SLANT = 22; // leading-edge lean, % of frame width

// Clip polygon for a layer at progress p (0 hidden off right → 1 fully covering).
// Edge leans forward ("/"), travelling right → left.
function poly(p) {
  const xt = (100 + SLANT) * (1 - p);
  const xb = xt - SLANT;
  return `polygon(${xt}% 0%, ${100 + SLANT}% 0%, ${100 + SLANT}% 100%, ${xb}% 100%)`;
}

export default function Slideshow({ slides = [], ratio = "16:9", accents = ["#FFE902", "#00FFC5"], hold = 3.6, label = "Project highlights" }) {
  const rootRef = useRef(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const api = useRef({});
  const n = slides.length;
  const [rw, rh] = ratio.split(":").map(Number);
  const frameAr = rw / rh;

  useEffect(() => {
    const root = rootRef.current;
    if (!root || n < 2) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const slideEls = [...root.querySelectorAll(".ss-slide")];
    const imgEls = slideEls.map((s) => s.querySelector(".ss-img"));
    const [wipeA, wipeB] = root.querySelectorAll(".ss-wipe");
    const fills = [...root.querySelectorAll(".ss-bar i")];
    const st = { cur: 0, tl: null, k: 0, userPaused: reduce, inView: false };

    const panShift = (i) => {
      const ar = slides[i].panAr;
      return ar && ar > frameAr ? -(1 - frameAr / ar) * 100 : 0;
    };

    const reset = (except) => {
      slideEls.forEach((el, i) => {
        if (i === except) return;
        gsap.set(el, { visibility: "hidden", zIndex: 1, xPercent: 0, scale: 1, clipPath: "none", autoAlpha: 0 });
      });
      gsap.set([wipeA, wipeB], { clipPath: poly(0) });
    };
    const setFills = (cur) => fills.forEach((f, i) => gsap.set(f, { scaleX: i < cur ? 1 : 0 }));

    // the "life" of a slide once visible: push-in or pan, bar fill, then advance
    const life = (tl, i, at) => {
      const dur = (slides[i].hold || hold) + (reduce ? 0 : D);
      if (slides[i].panAr) {
        tl.fromTo(imgEls[i], { xPercent: 0 }, { xPercent: panShift(i), duration: dur + D, ease: "sine.inOut" }, at);
      } else if (!reduce) {
        tl.fromTo(slideEls[i], { scale: 1 }, { scale: 1.035, duration: dur + D, ease: "none" }, at);
      }
      tl.fromTo(fills[i], { scaleX: 0 }, { scaleX: 1, duration: dur, ease: "none" }, at);
      tl.call(() => go((i + 1) % n), null, at + dur);
    };

    const go = (to) => {
      const from = st.cur;
      if (to === from) return;
      if (st.tl) st.tl.kill();
      reset(from);
      st.cur = to;
      setActive(to);
      setFills(to);

      const inS = slideEls[to];
      const outS = slideEls[from];
      const tl = gsap.timeline({ paused: !(st.inView && !st.userPaused) });
      st.tl = tl;

      if (reduce) {
        // the crossfade always runs (it answers a click); only the auto-advance waits on Play
        gsap.set(inS, { visibility: "visible", zIndex: 4, clipPath: "none", autoAlpha: 0 });
        gsap.to(inS, {
          autoAlpha: 1, duration: 0.6, ease: "power1.inOut",
          onComplete: () => { gsap.set(outS, { visibility: "hidden", autoAlpha: 0, zIndex: 1 }); gsap.set(inS, { zIndex: 2 }); },
        });
        life(tl, to, 0.6);
        return;
      }

      const k = st.k++;
      gsap.set(wipeA, { backgroundColor: accents[k % 2], zIndex: 2 });
      gsap.set(wipeB, { backgroundColor: accents[(k + 1) % 2], zIndex: 3 });
      gsap.set(inS, { visibility: "visible", autoAlpha: 1, zIndex: 4, xPercent: 0, scale: 1, clipPath: poly(0) });
      gsap.set(outS, { zIndex: 1 });

      const pA = { p: 0 }, pB = { p: 0 }, pI = { p: 0 };
      tl.to(pA, { p: 1, duration: D, ease: EASE, onUpdate: () => (wipeA.style.clipPath = poly(pA.p)) }, 0)
        .to(pB, { p: 1, duration: D, ease: EASE, onUpdate: () => (wipeB.style.clipPath = poly(pB.p)) }, STAGGER)
        .to(pI, { p: 1, duration: D, ease: EASE, onUpdate: () => (inS.style.clipPath = poly(pI.p)) }, STAGGER * 2)
        .to(outS, { xPercent: -10, duration: D + STAGGER * 2, ease: EASE }, 0);
      if (!slides[to].panAr) {
        tl.fromTo(imgEls[to], { scale: 1.16, xPercent: 5 }, { scale: 1, xPercent: 0, duration: 1.7, ease: "expo.out" }, STAGGER * 2);
      }
      tl.call(() => {
        gsap.set(outS, { visibility: "hidden", autoAlpha: 0, xPercent: 0, scale: 1 });
        gsap.set([wipeA, wipeB], { clipPath: poly(0) });
        inS.style.clipPath = "none";
        gsap.set(inS, { zIndex: 2 });
      }, null, D + STAGGER * 2);
      life(tl, to, STAGGER * 2);
    };

    // first slide: no wipe, just its life
    reset(0);
    setFills(0);
    gsap.set(slideEls[0], { visibility: "visible", autoAlpha: 1, zIndex: 2, clipPath: "none" });
    const first = gsap.timeline({ paused: true });
    st.tl = first;
    life(first, 0, 0);

    const sync = () => {
      if (!st.tl) return;
      if (st.inView && !st.userPaused && !document.hidden) st.tl.play();
      else st.tl.pause();
    };
    const io = new IntersectionObserver(([e]) => { st.inView = e.isIntersecting; sync(); }, { threshold: 0.25 });
    io.observe(root);
    document.addEventListener("visibilitychange", sync);

    api.current = {
      go: (i) => { go(i); sync(); },
      toggle: () => { st.userPaused = !st.userPaused; setPaused(st.userPaused); sync(); },
    };
    setPaused(st.userPaused);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      if (st.tl) st.tl.kill();
      gsap.killTweensOf([...slideEls, ...imgEls, wipeA, wipeB, ...fills]);
    };
  }, [slides, n, hold, frameAr, accents]);

  return (
    <div
      className="media ss"
      ref={rootRef}
      style={{ aspectRatio: rw + "/" + rh }}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      {slides.map((s, i) => (
        <div className={"ss-slide" + (i === 0 ? " first" : "")} key={i} aria-hidden={i !== active}>
          <img
            className={"ss-img" + (s.panAr ? " pan" : "")}
            src={s.img}
            alt={s.alt || s.label || ""}
            loading={i < 2 ? "eager" : "lazy"}
            decoding="async"
            style={s.panAr ? { aspectRatio: String(s.panAr) } : undefined}
          />
        </div>
      ))}
      <span className="ss-wipe" aria-hidden="true" />
      <span className="ss-wipe" aria-hidden="true" />
      <div className="ss-ui">
        {slides[active] && slides[active].label ? (
          <span className="label ss-label" key={active}>{slides[active].label}</span>
        ) : <span />}
        {n > 1 && (
          <div className="ss-ctrl">
            <div className="ss-bars">
              {slides.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  className="ss-bar"
                  aria-label={"Show slide " + (i + 1) + (s.label ? ": " + s.label : "")}
                  aria-current={i === active ? "true" : undefined}
                  onClick={() => api.current.go && api.current.go(i)}
                >
                  <i />
                </button>
              ))}
            </div>
            <button type="button" className="ss-pp" aria-label={paused ? "Play slideshow" : "Pause slideshow"} onClick={() => api.current.toggle && api.current.toggle()}>
              {paused ? <Play size={14} strokeWidth={2} aria-hidden="true" /> : <Pause size={14} strokeWidth={2} aria-hidden="true" />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
