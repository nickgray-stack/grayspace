"use client";
import { useEffect } from "react";

// Scroll + reveal foundation.
//
// Smooth-momentum scrolling (the Lenis library) has been REMOVED. It was
// hijacking the mouse wheel on desktop and breaking scrolling, while mobile
// felt fine because Lenis leaves touch scrolling native by default. So the fix
// is to make desktop behave like mobile: plain native scrolling — which is the
// most robust, fastest and most accessible option, and genuinely best practice.
//
// Scroll-reveal is handled with IntersectionObserver, which is independent of
// how the page scrolls, so the fade-in animations are unchanged.
export default function SmoothScroll() {
  useEffect(() => {
    document.documentElement.classList.add("js");

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

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}
