"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

// Site launch sequence (port of "Gray Space — Launch sequence v5", radial / purple).
// Plays on a full page load of Home — first visit and every browser refresh — but not
// when Home is reached by in-app navigation, and never for reduced motion. A dark
// overlay holds the NICK GRAY wordmark, which resolves from a strong ink bleed to clean
// while a soft triangular halo flickers out and a white + purple oval glow grows; the
// overlay then fades to the page grey as the home hero rises in underneath.
const PATHS = [
  "M150.93,16.33v7.81h-7.81V.72h17.09c6.97,0,9.51,3.18,9.51,7.92,0,3.5-1.66,5.49-3.95,6.31l3.95,9.19h-8.36l-2.89-7.8h-.39s-7.15-.01-7.15-.01ZM150.93,11.09h7.51c1.9,0,2.92-.98,2.92-2.59s-1.02-2.53-2.92-2.53h-7.51v5.12Z",
  "M0,.72h8.99l10.86,14.66h.07V.72h7.54v23.42h-8.63L7.61,9.35h-.07v14.79H0V.72Z",
  "M30.91.72h7.81v23.42h-7.81V.72Z",
  "M71.61,15.12c-.95,5.05-3.74,9.74-14.83,9.74-9.91,0-14.73-4.36-14.73-12.43S46.62,0,56.79,0c7.15,0,13.05,1.64,14.76,9.74h-8.69c-.46-1.67-1.61-4.49-6.04-4.49-4.89,0-6.49,3.31-6.49,7.18s1.44,7.18,6.49,7.18c3.51,0,5.61-1.77,6.13-4.49h8.66Z",
  "M74.96.72h7.81v9.18L92.54.72h10.4l-10.59,9.22,11.41,14.2h-10.43l-7.25-9.35-3.31,2.76v6.59h-7.81V.72Z",
  "M127.17,10.86h12.59v13.28h-3.64l-.95-2.43c-1.02,1.15-4.03,3.15-10.1,3.15-10.23,0-14.73-4.36-14.73-12.43,0-6.89,4.56-12.43,14.69-12.43,6.46,0,13.74,1.67,14.73,8.43h-8.82c-.49-1.8-1.9-3.38-5.58-3.38-4.79,0-6.95,3.28-6.95,7.41s2.16,7.35,6.95,7.35c3.84,0,5.84-1.44,6.59-4.1h-4.79v-4.85Z",
  "M182.91.72h9.54l10.07,23.42h-8.36l-1.41-3.8h-10.23l-1.41,3.8h-8.36L182.91.72ZM187.66,6.63h-.07l-3.25,8.86h6.56l-3.25-8.86Z",
  "M208.57,16.76L198.17.72h9.05l5.25,9.94,5.25-9.94h9.05l-10.4,16.04v7.38h-7.81v-7.38Z",
];

export default function Launch() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // already played in this page load (client navigation back to Home), or reduced motion
    if (window.__gsLaunched || reduce) {
      el.style.display = "none";
      return;
    }
    window.__gsLaunched = true;
    document.documentElement.classList.add("launching");

    const q = (s) => el.querySelector(s);
    const L = { blur: q("#L_blur"), disp: q("#L_disp"), turb: q("#L_turb") };
    const ink = { p: 1 };
    const applyInk = () => {
      const p = ink.p;
      L.blur.setAttribute("stdDeviation", (p * 5.2).toFixed(3));
      L.disp.setAttribute("scale", ((0.82 * p + 0.18 * p * p) * 30).toFixed(2));
    };
    let t = 0, raf = 0;
    const loop = () => {
      t += 0.016;
      L.turb.setAttribute("baseFrequency", (0.012 + 0.006 * ink.p + Math.sin(t * 0.9) * 0.0024 * ink.p).toFixed(4));
      raf = requestAnimationFrame(loop);
    };
    loop();
    applyInk();

    const halo = q(".ln-halo"), glow = q(".ln-glow"), glowC = q(".ln-glowC"), logo = q(".ln-logo"), fx = q(".ln-fx");
    gsap.set([halo, glow, glowC], { xPercent: -50, yPercent: -50 });
    gsap.set(halo, { opacity: 0, scale: 0.96 });
    gsap.set([glow, glowC], { scale: 0, opacity: 0 });
    gsap.set(logo, { autoAlpha: 0 });

    // home pieces that rise in as the overlay clears
    const rise = [".nav", ".home .hero .wl .row", ".home .hero .stage", ".home .hero .scap"]
      .map((s) => Array.from(document.querySelectorAll(s)))
      .filter((a) => a.length);
    rise.forEach((a) => gsap.set(a, { y: 30, autoAlpha: 0 }));
    const stage = document.querySelector(".home .hero .stage");
    const blur = { b: 16 };

    const reveal = () => {
      document.documentElement.classList.remove("launching");
      rise.forEach((a, i) =>
        gsap.to(a, { y: 0, autoAlpha: 1, duration: 0.9, ease: "power3.out", stagger: a.length > 1 ? 0.05 : 0, delay: 0.05 + i * 0.08 })
      );
      if (stage) {
        gsap.fromTo(stage, { scale: 1.06 }, { scale: 1, duration: 1.1, ease: "power3.out", delay: 0.1 });
        gsap.to(blur, { b: 0, duration: 1, ease: "power2.out", delay: 0.1, onUpdate: () => (stage.style.filter = blur.b > 0.05 ? `blur(${blur.b.toFixed(2)}px)` : "") });
      }
    };

    const tl = gsap.timeline({
      onComplete: () => {
        cancelAnimationFrame(raf);
        el.style.display = "none";
      },
    });
    tl.to(halo, { opacity: 0.6, scale: 1, duration: 0.3, ease: "power2.out" }, 0.08)
      .to(logo, { autoAlpha: 1, duration: 0.45, ease: "power2.out" }, 0.12)
      .to(ink, { p: 0, duration: 2.15, ease: "power1.inOut", onUpdate: applyInk }, 0.2)
      // the halo flickers once and is gone in under a second
      .to(halo, { opacity: 0.24, duration: 0.08, ease: "power1.in" }, 0.46)
      .to(halo, { opacity: 0.6, duration: 0.09, ease: "power1.out" }, 0.54)
      .to(halo, { opacity: 0, duration: 0.12, ease: "power1.in" }, 0.78)
      // soft white oval, then the purple, grow from nothing and breathe
      .fromTo(glow, { scale: 0, opacity: 0 }, { scale: 1, opacity: 0.6, duration: 1, ease: "power1.out" }, 1.35)
      .add(() => gsap.to(fx, { scale: 1.03, duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1 }), 1.8)
      .fromTo(glowC, { scale: 0, opacity: 0 }, { scale: 1, opacity: 0.68, duration: 1, ease: "power1.out" }, 1.8)
      // fold into the page grey while the site rises underneath
      .to(el, { backgroundColor: "#F7F7F7", duration: 0.75, ease: "power2.inOut" }, 2.25)
      .to(glowC, { opacity: 0, duration: 0.7, ease: "power2.inOut" }, 2.45)
      .to(glow, { opacity: 0, duration: 0.7, ease: "power2.inOut" }, 2.55)
      .to(logo, { autoAlpha: 0, duration: 0.5, ease: "power2.inOut" }, 2.5)
      .add(reveal, 2.5)
      .to(el, { autoAlpha: 0, duration: 0.55, ease: "power2.inOut" }, 2.8);

    // any key or click skips straight to the site
    const skip = () => tl.progress(1);
    window.addEventListener("keydown", skip, { once: true });
    el.addEventListener("click", skip, { once: true });

    return () => {
      tl.kill();
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", skip);
      document.documentElement.classList.remove("launching");
    };
  }, []);

  return (
    <div className="launch" ref={root} aria-hidden="true">
      <svg className="ln-defs" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="inkLaunch" x="-40%" y="-160%" width="180%" height="420%" colorInterpolationFilters="sRGB">
            <feTurbulence id="L_turb" type="fractalNoise" baseFrequency="0.016" numOctaves="2" seed="4" result="t" />
            <feDisplacementMap id="L_disp" in="SourceGraphic" in2="t" scale="0" xChannelSelector="R" yChannelSelector="G" result="d" />
            <feGaussianBlur id="L_blur" in="d" stdDeviation="0" result="b" />
            <feColorMatrix in="b" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -10" />
          </filter>
          <filter id="haloB" x="-45%" y="-45%" width="190%" height="190%">
            <feGaussianBlur stdDeviation="64" />
          </filter>
        </defs>
      </svg>
      <div className="ln-fx">
        <div className="ln-halo">
          <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <path d="M500 40 L905 740 L95 740 Z" fill="none" stroke="#ffffff" strokeWidth="118" strokeLinejoin="round" strokeLinecap="round" filter="url(#haloB)" opacity=".6" />
          </svg>
        </div>
        <div className="ln-glow" />
        <div className="ln-glowC" />
      </div>
      <div className="ln-logo">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 -20 247 65">
          <g filter="url(#inkLaunch)">
            {PATHS.map((d, i) => (
              <path key={i} d={d} fill="currentColor" />
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
}
