"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { LOGO_SVG } from "./Logo";

// The nav logo: crisp vector at rest, ink-bleed filter attached ONLY on hover
// (attaching a filter at rest rasterises + pixelates it), fades out on scroll.
// Ported from shared.js. Rendered via innerHTML so React never reconciles the
// SVG children we reparent into a <g>.
export default function InkLogo() {
  const aRef = useRef(null);
  const router = useRouter();

  // fade out on scroll (Mouthwash-style)
  useEffect(() => {
    const el = aRef.current;
    const onScroll = () => {
      const y = window.scrollY;
      const o = Math.max(0, Math.min(1, 1 - (y - 24) / 110)); // fades 24px -> 134px
      if (el) {
        el.style.opacity = o;
        el.style.pointerEvents = o < 0.08 ? "none" : "";
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ink-bleed filter on hover (pointer devices)
  useEffect(() => {
    const logo = aRef.current;
    if (!logo) return;
    const svg = logo.querySelector("svg.logomark");
    if (!svg) return;

    if (!document.getElementById("inkNav")) {
      const holder = document.createElement("div");
      holder.style.cssText = "position:absolute;width:0;height:0;overflow:hidden";
      holder.setAttribute("aria-hidden", "true");
      holder.innerHTML =
        '<svg width="0" height="0"><defs><filter id="inkNav" x="-60%" y="-220%" width="220%" height="540%" color-interpolation-filters="sRGB"><feTurbulence id="N_turb" type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="9" result="t"/><feDisplacementMap id="N_disp" in="SourceGraphic" in2="t" scale="0" xChannelSelector="R" yChannelSelector="G" result="d"/><feGaussianBlur id="N_blur" in="d" stdDeviation="0" result="b"/><feColorMatrix in="b" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8"/></filter></defs></svg>';
      document.body.appendChild(holder);
    }
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    while (svg.firstChild) g.appendChild(svg.firstChild);
    svg.appendChild(g);
    const blur = document.getElementById("N_blur");
    const disp = document.getElementById("N_disp");
    const turb = document.getElementById("N_turb");
    if (!blur || !disp || !turb) return;

    let p = 0,
      target = 0,
      raf = 0,
      t = 0;
    const apply = () => {
      blur.setAttribute("stdDeviation", (p * 1.9).toFixed(3));
      disp.setAttribute("scale", (p * 7).toFixed(2));
    };
    const loop = () => {
      t += 0.016;
      p += (target - p) * 0.14;
      turb.setAttribute("baseFrequency", (0.028 + Math.sin(t * 1.6) * 0.005 * p).toFixed(4));
      apply();
      if (target === 0 && p < 0.004) {
        p = 0;
        apply();
        g.removeAttribute("filter");
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    const enter = () => {
      g.setAttribute("filter", "url(#inkNav)");
      target = 1;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const leave = () => {
      target = 0;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    logo.addEventListener("mouseenter", enter);
    logo.addEventListener("mouseleave", leave);
    return () => {
      logo.removeEventListener("mouseenter", enter);
      logo.removeEventListener("mouseleave", leave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const go = (e) => {
    e.preventDefault();
    if (window.location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  };

  return (
    <a
      ref={aRef}
      className="logo"
      href="/"
      data-top
      aria-label="Nick Gray — home"
      onClick={go}
      dangerouslySetInnerHTML={{ __html: LOGO_SVG }}
    />
  );
}
