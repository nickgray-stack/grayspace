"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Global motion foundation, mounted once in the root layout:
//  - adds `js` to <html> (enables the reveal hidden-state)
//  - scroll-reveal via IntersectionObserver (.r -> .in), re-scanning on DOM changes
//  - Lenis smooth scroll wired to GSAP's ticker + ScrollTrigger (ready for richer motion)
//  - respects prefers-reduced-motion (no Lenis, reveals shown immediately via CSS)
export default function SmoothScroll() {
  useEffect(() => {
    document.documentElement.classList.add("js");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    const scan = () => document.querySelectorAll(".r:not(.in)").forEach((el) => io.observe(el));
    scan();
    requestAnimationFrame(() =>
      document.querySelectorAll(".r.now").forEach((el) => el.classList.add("in"))
    );
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    let lenis;
    let raf;
    if (!reduce) {
      gsap.registerPlugin(ScrollTrigger);
      lenis = new Lenis({ duration: 1.1, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      raf = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    }

    return () => {
      io.disconnect();
      mo.disconnect();
      if (raf) gsap.ticker.remove(raf);
      if (lenis) lenis.destroy();
    };
  }, []);
  return null;
}
