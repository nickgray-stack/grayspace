"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Plus, X } from "lucide-react";
import { mediaBg } from "@/content/projects";
import Carousel from "./Carousel";

const PlusIco = () => <Plus className="i" size={24} strokeWidth={1.75} aria-hidden="true" />;

// Renders the case-study module array + the shared detail overlay (desktop modal
// / mobile bottom-sheet with drag-to-dismiss). All `+` / CTA buttons open the
// one overlay built from `detail`. Ported from the prototype.
export default function CaseStudyBody({ modules = [], detail }) {
  const [mounted, setMounted] = useState(false);
  const [on, setOn] = useState(false);
  const panelRef = useRef(null);
  const barRef = useRef(null);
  const lastFocus = useRef(null);

  const openOv = useCallback(
    (trigger) => {
      if (!detail) return;
      lastFocus.current = trigger || null;
      setMounted(true);
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => setOn(true));
    },
    [detail]
  );
  const closeOv = useCallback(() => {
    setOn(false);
    document.body.style.overflow = "";
    const p = panelRef.current;
    if (p) {
      p.style.transition = "";
      p.style.transform = "";
    }
    setTimeout(() => setMounted(false), 450);
    if (lastFocus.current) lastFocus.current.focus();
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        closeOv();
        return;
      }
      // focus trap: keep Tab within the dialog panel
      if (e.key === "Tab") {
        const panel = panelRef.current;
        if (!panel) return;
        const f = panel.querySelectorAll(
          'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mounted, closeOv]);

  useEffect(() => {
    if (!mounted) return;
    const p = panelRef.current;
    if (p) {
      p.style.transition = "";
      p.style.transform = "";
      p.scrollTop = 0;
    }
    const panel = panelRef.current;
    const bar = barRef.current;
    if (!panel || !bar) return;
    let dragging = false,
      startY = 0,
      dy = 0;
    const down = (e) => {
      if (!window.matchMedia("(max-width:720px)").matches) return;
      dragging = true;
      startY = e.clientY;
      dy = 0;
      panel.style.transition = "none";
      try {
        bar.setPointerCapture(e.pointerId);
      } catch (_) {}
    };
    const move = (e) => {
      if (!dragging) return;
      dy = Math.max(0, e.clientY - startY);
      panel.style.transform = "translateY(" + dy + "px)";
    };
    const end = () => {
      if (!dragging) return;
      dragging = false;
      panel.style.transition = "";
      if (dy > 130) closeOv();
      else panel.style.transform = "";
    };
    bar.addEventListener("pointerdown", down);
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerup", end);
    document.addEventListener("pointercancel", end);
    return () => {
      bar.removeEventListener("pointerdown", down);
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerup", end);
      document.removeEventListener("pointercancel", end);
    };
  }, [mounted, closeOv]);

  const onOpen = (e) => openOv(e.currentTarget);

  const renderMedia = (c, inStack) => (
    <div
      className={"media " + (c.ar || "ar-std")}
      style={{ background: mediaBg(c.media), ...(c.fill ? { height: "100%" } : null) }}
    >
      {c.label && <span className="label">{c.label}</span>}
    </div>
  );

  const renderDetail = (c) => (
    <div className="detail">
      <div>
        {c.eyebrow && <div className="eyebrow">{c.eyebrow}</div>}
        <p>{c.copy}</p>
      </div>
      <div className="cardfoot">
        <span className="blabel">{c.label}</span>
        {c.cta && detail && (
          <button className="iconbtn" type="button" onClick={onOpen} aria-label="Read more">
            <PlusIco />
          </button>
        )}
      </div>
    </div>
  );

  const renderCol = (c, i) => {
    if (c.kind === "carousel") {
      return (
        <div className={c.span + " r"} key={i}>
          <Carousel slides={c.slides} />
        </div>
      );
    }
    if (c.kind === "stack") {
      return (
        <div className={c.span + " r"} key={i}>
          <div className="stack">
            {c.items.map((it, j) =>
              it.kind === "detail" ? (
                <div key={j} style={{ display: "contents" }}>
                  {renderDetail(it)}
                </div>
              ) : (
                <div key={j} style={{ display: "contents" }}>
                  {renderMedia(it, true)}
                </div>
              )
            )}
          </div>
        </div>
      );
    }
    if (c.kind === "detail") {
      return (
        <div className={c.span + " r"} key={i}>
          {renderDetail(c)}
        </div>
      );
    }
    return (
      <div className={c.span + " r"} key={i}>
        {renderMedia(c)}
      </div>
    );
  };

  const renderModule = (m, i) => {
    if (m.type === "full") {
      return (
        <section className="section wrap" key={i}>
          <div className="grid">
            <div className="col-12 r">
              <div className={"media " + (m.ar || "ar-wide")} style={{ background: mediaBg(m.media) }}>
                {m.label && <span className="label">{m.label}</span>}
              </div>
            </div>
          </div>
        </section>
      );
    }
    if (m.type === "statement") {
      return (
        <section className="section statement wrap" key={i}>
          <p className="modhead r">{m.text}</p>
          {m.cta && detail && (
            <div className="ctarow r">
              <button className="btn-exp" type="button" onClick={onOpen} aria-label={m.cta.label}>
                <span className="lbl">{m.cta.label}</span>
                <span className="ico">
                  <PlusIco />
                </span>
              </button>
            </div>
          )}
        </section>
      );
    }
    if (m.type === "row") {
      return (
        <section className="section wrap" key={i}>
          <div className={"grid" + (m.tight ? " tight" : "")}>{m.cols.map(renderCol)}</div>
        </section>
      );
    }
    return null;
  };

  return (
    <>
      {modules.map(renderModule)}

      {detail && (
        <div
          className={"scrim" + (on ? " on" : "")}
          hidden={!mounted}
          role="dialog"
          aria-modal="true"
          aria-label="Case study detail"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeOv();
          }}
        >
          <div className="panel" role="document" ref={panelRef}>
            <div className="sheetbar" ref={barRef}>
              <span className="grabber" aria-hidden="true" />
              <button className="closebtn" type="button" aria-label="Close detail" onClick={closeOv}>
                <X className="i" size={24} strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>
            <div className="eyebrow">{detail.eyebrow}</div>
            <h2>{detail.heading}</h2>
            {detail.image && (
              <div className="img" role="img" aria-label="Project image" style={{ background: mediaBg(detail.image) }} />
            )}
            {detail.body.map((p, i) => (
              <p key={i} className={i === detail.body.length - 1 ? "last" : undefined}>
                {p}
              </p>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
