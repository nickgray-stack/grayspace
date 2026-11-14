"use client";
import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { mediaBg } from "@/content/projects";

// Autoplay carousel (5s) with animated progress fill, infinite loop, chevrons,
// glass pager, pause on hover/focus, arrow-key nav, reduced-motion safe.
// Ported from the prototype's custom carousel (embla is the intended lib later).
export default function Carousel({ slides }) {
  const carRef = useRef(null);
  const trackRef = useRef(null);
  const pagerRef = useRef(null);
  const tagRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const car = carRef.current;
    const pager = pagerRef.current;
    const cTag = tagRef.current;
    const cBody = bodyRef.current;
    if (!track || !slides || !slides.length) return;

    const n = slides.length;
    const reduce =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const mk = (s) => {
      const d = document.createElement("div");
      d.className = "cslide";
      d.style.background = mediaBg(s.media);
      d.innerHTML = '<span class="tag"></span>';
      if (s.media && s.media.todo) {
        d.classList.add("gap");
        const t = document.createElement("p");
        t.className = "gap-t";
        t.textContent = "Asset slot · 4:5 — " + s.media.todo;
        d.appendChild(t);
      }
      d.querySelector(".tag").textContent = s.tag;
      return d;
    };
    track.innerHTML = "";
    [slides[n - 1]].concat(slides, [slides[0]]).forEach((s) => track.appendChild(mk(s)));

    let idx = 1;
    const setX = (anim) => {
      track.style.transition = anim ? "transform .6s cubic-bezier(.65,0,.35,1)" : "none";
      track.style.transform = "translateX(-" + idx * 100 + "%)";
    };
    setX(false);
    const real = () => {
      let r = idx - 1;
      if (r < 0) r = n - 1;
      if (r > n - 1) r = 0;
      return r;
    };
    let fillEl = null;
    const buildPager = (a) => {
      pager.innerHTML = "";
      for (let i = 0; i < n; i++) {
        if (i === a) {
          const t = document.createElement("div");
          t.className = "track";
          t.setAttribute("role", "img");
          t.setAttribute("aria-label", "Slide " + (i + 1) + " of " + n);
          const f = document.createElement("div");
          f.className = "fill";
          t.appendChild(f);
          fillEl = f;
          pager.appendChild(t);
        } else {
          const b = document.createElement("button");
          b.type = "button";
          b.className = "dot";
          b.setAttribute("aria-label", "Go to slide " + (i + 1));
          b.addEventListener("click", () => goto(i));
          pager.appendChild(b);
        }
      }
    };
    const updateUI = () => {
      const r = real();
      cTag.textContent = slides[r].tag;
      cBody.textContent = slides[r].body;
      buildPager(r);
    };

    let raf,
      startTime,
      elapsed = 0,
      pausedAt = null;
    const DUR = 5000;
    const loop = (ts) => {
      if (pausedAt != null) return;
      const e = elapsed + (ts - startTime);
      const p = Math.min(e / DUR, 1);
      if (fillEl) fillEl.style.transform = "scaleX(" + p + ")";
      if (p >= 1) next();
      else raf = requestAnimationFrame(loop);
    };
    const play = () => {
      if (reduce) return;
      cancelAnimationFrame(raf);
      elapsed = 0;
      pausedAt = null;
      startTime = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const go = (d) => {
      idx += d;
      setX(true);
      updateUI();
      play();
    };
    const next = () => go(1);
    const prev = () => go(-1);
    const goto = (i) => {
      idx = i + 1;
      setX(true);
      updateUI();
      play();
    };
    const onEnd = () => {
      if (idx === n + 1) {
        idx = 1;
        setX(false);
      } else if (idx === 0) {
        idx = n;
        setX(false);
      }
    };
    track.addEventListener("transitionend", onEnd);
    const nextBtn = car.querySelector(".chev.next");
    const prevBtn = car.querySelector(".chev.prev");
    nextBtn.addEventListener("click", next);
    prevBtn.addEventListener("click", prev);
    const onEnter = () => {
      if (reduce || pausedAt != null) return;
      pausedAt = performance.now();
      cancelAnimationFrame(raf);
      elapsed += pausedAt - startTime;
    };
    const onLeave = () => {
      if (reduce || pausedAt == null) return;
      pausedAt = null;
      startTime = performance.now();
      raf = requestAnimationFrame(loop);
    };
    car.addEventListener("mouseenter", onEnter);
    car.addEventListener("mouseleave", onLeave);
    // pause autoplay while the carousel (or its controls) holds keyboard focus
    const onFocusIn = () => onEnter();
    const onFocusOut = (e) => {
      if (!car.contains(e.relatedTarget)) onLeave();
    };
    car.addEventListener("focusin", onFocusIn);
    car.addEventListener("focusout", onFocusOut);
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    car.addEventListener("keydown", onKey);

    updateUI();
    if (reduce) {
      if (fillEl) fillEl.style.transform = "scaleX(1)";
    } else {
      play();
    }

    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("transitionend", onEnd);
      nextBtn.removeEventListener("click", next);
      prevBtn.removeEventListener("click", prev);
      car.removeEventListener("mouseenter", onEnter);
      car.removeEventListener("mouseleave", onLeave);
      car.removeEventListener("focusin", onFocusIn);
      car.removeEventListener("focusout", onFocusOut);
      car.removeEventListener("keydown", onKey);
    };
  }, [slides]);

  return (
    <div className="carousel">
      <div
        className="cmedia"
        ref={carRef}
        tabIndex={0}
        aria-roledescription="carousel"
        aria-label="Project gallery"
      >
        <div className="ctrack" ref={trackRef}></div>
        <button className="chev prev" type="button" aria-label="Previous slide">
          <ChevronLeft className="i" size={24} strokeWidth={1.75} />
        </button>
        <button className="chev next" type="button" aria-label="Next slide">
          <ChevronRight className="i" size={24} strokeWidth={1.75} />
        </button>
        <div className="pager" ref={pagerRef}></div>
      </div>
      <div className="ccap">
        <div className="t" ref={tagRef}></div>
        <div className="b" ref={bodyRef}></div>
      </div>
    </div>
  );
}
