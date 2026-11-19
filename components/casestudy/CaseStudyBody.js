"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Plus, X } from "lucide-react";
import { mediaBg } from "@/content/projects";
import { srcSet, sizesFor } from "@/content/mediaSizes";
import Carousel from "./Carousel";
import VideoMedia from "./VideoMedia";
import DeviceFrame from "./DeviceFrame";
import Slideshow from "./Slideshow";
import { Targets, Shifts, Persona, JourneyCard, Pull, Bars, Sentence, Lists, Loop, System, Ladder, Table, rich } from "./Story";
import InfoCards from "./InfoCards";
import Showreel from "./Showreel";
import { vidFor } from "./stageHelpers";

const PlusIco = () => <Plus className="i" size={24} strokeWidth={1.75} aria-hidden="true" />;

// aspect-ratio for fixed-ratio media: from an explicit ratio ("16:9") or a legacy ar class.
const AR = { "ar-wide": "16/9", "ar-std": "4/3", "ar-tall": "3/4", "ar-portrait": "4/5", "ar-square": "1/1" };
function arCss(c) {
  if (c.ratio && c.ratio !== "free") return c.ratio.replace(":", "/");
  return AR[c.ar] || "4/3";
}

// Hybrid media container. Real image → free-ratio (image sets its own height) or
// fixed-ratio (crop to fill). Gradient placeholder → fixed-ratio box.
// Asset slot: a visible placeholder for media that doesn't exist yet, carrying
// the design call-out (what to make + why). Set NEXT_PUBLIC_SHOW_GAPS=0 to
// render slots as quiet blank surfaces (e.g. for a client-facing preview).
const SHOW_GAPS = process.env.NEXT_PUBLIC_SHOW_GAPS !== "0";
function GapBox({ c, fill }) {
  const ratio = c.ratio && c.ratio !== "free" ? c.ratio : "16:9";
  const style = { aspectRatio: ratio.replace(":", "/"), ...(fill ? { height: "100%" } : null) };
  if (!SHOW_GAPS) return <div className="media" style={style} />;
  return (
    <div className="media gap" style={style}>
      <div className="gap-in">
        <span className="gap-k">Asset slot · {ratio}{c.label ? " · " + c.label : ""}</span>
        <p className="gap-t">{c.media.todo}</p>
      </div>
    </div>
  );
}

// Placeholder for an asset still to export: soft gradient + the expected file name.
function PhBox({ c, fill }) {
  const ratio = c.ratio && c.ratio !== "free" ? c.ratio : "16:9";
  const style = { aspectRatio: ratio.replace(":", "/"), ...(fill ? { height: "100%" } : null) };
  return (
    <div className="media ph" style={style}>
      <div className="ph-in"><span className="ph-file">{c.media.ph}</span>{c.media.note && <span className="ph-note">{c.media.note}</span>}</div>
    </div>
  );
}

// Caption below a visual (used for asset tags like "B · Prescription follow-through")
const withCaption = (c, el) =>
  c.caption ? (
    <figure className="cap-fig">
      {el}
      <figcaption className="cap">{c.caption}</figcaption>
    </figure>
  ) : el;

function MediaBox({ c, fill }) {
  if (c.media && c.media.ph) return <PhBox c={c} fill={fill} />;
  if (c.media && c.media.todo) return <GapBox c={c} fill={fill} />;
  const img = c.media && c.media.img;
  const free = c.ratio === "free" || (c.media && c.media.ratio === "free");
  const alt = (c.media && c.media.alt) || c.label || "";
  const video = c.media && c.media.video;
  if (video) {
    const vstyle = { aspectRatio: arCss(c), ...(fill ? { height: "100%" } : null) };
    return (
      <div className="media" style={vstyle}>
        <VideoMedia src={video} webm={c.media.webm} poster={c.media.poster} cover />
        {c.label && <span className="label">{c.label}</span>}
      </div>
    );
  }
  if (img && free) {
    return (
      <figure className="media free">
        <img className="mfit" src={c.media.img} srcSet={srcSet(c.media.img)} sizes={sizesFor(c.span)} alt={alt} loading="lazy" decoding="async" />
        {c.label && <span className="label">{c.label}</span>}
      </figure>
    );
  }
  const style = { aspectRatio: arCss(c), ...(fill ? { height: "100%" } : null) };
  if (img) {
    return (
      <div className="media" style={style}>
        <img className="mcover" src={c.media.img} srcSet={srcSet(c.media.img)} sizes={sizesFor(c.span)} alt={alt} loading="lazy" decoding="async" style={c.media.pos ? { objectPosition: c.media.pos } : undefined} />
        {c.label && <span className="label">{c.label}</span>}
      </div>
    );
  }
  return (
    <div className="media" style={{ background: mediaBg(c.media), ...style }}>
      {c.label && <span className="label">{c.label}</span>}
    </div>
  );
}

// Device mockup column. `device.screen` is a video ({video,poster}) or image
// ({img}); chrome (status bar, IG-story UI) is composited live, not baked in.
function DeviceBox({ c }) {
  const d = c.device || {};
  const s = d.screen || {};
  const screen = s.video ? (
    <VideoMedia src={s.video} webm={s.webm} poster={s.poster} cover />
  ) : (
    <img src={s.img} alt={s.alt || c.label || ""} loading="lazy" />
  );
  return (
    <DeviceFrame
      statusBar={d.statusBar === undefined ? true : d.statusBar}
      storyUI={!!d.storyUI}
      bottomNav={!!d.bottomNav}
      user={d.user}
      time={d.time}
      avatar={d.avatar}
      fit={s.fit}
      shift={s.shift}
      vwidth={s.vwidth}
      screenBg={s.bg}
    >
      {screen}
    </DeviceFrame>
  );
}

const renderVisual = (c, fill) =>
  withCaption(c, c.kind === "device" || c.device ? <DeviceBox c={c} /> : <MediaBox c={c} fill={fill} />);

// Coloured "frame" for campaign rows: a fixed-ratio panel (a standard media ratio,
// e.g. 4:5) with a background colour. `mode: "bleed"` seats a device near the top
// and lets it overflow the bottom edge (cropped device, matching the Figma design);
// `mode: "inset"` (default) centres a media asset (video/image) on the colour ground.
const renderFramed = (c) => {
  if (!c.frame) return renderVisual(c, c.fill);
  return withCaption(c, renderFramedInner(c));
};
const renderFramedInner = (c) => {
  const f = c.frame;
  const mode = f.mode || "inset";
  const cls = "vmframe " + (f.ar || "ar-portrait") + " m-" + mode;
  let inner;
  if (c.kind === "device" || c.device) {
    inner = <DeviceBox c={c} />;
  } else {
    const m = c.media || {};
    inner = (
      <div className="vframe-media" style={{ aspectRatio: arCss(c) }}>
        {m.video ? (
          <VideoMedia src={m.video} webm={m.webm} poster={m.poster} cover />
        ) : (
          <img src={m.img} srcSet={srcSet(m.img)} sizes="(max-width: 1024px) 80vw, 40vw" alt={m.alt || c.label || ""} loading="lazy" />
        )}
      </div>
    );
  }
  return (
    <div className={cls} style={{ background: f.bg }}>
      {inner}
    </div>
  );
};

// Renders the case-study module array + the shared detail overlay (desktop modal
// / mobile bottom-sheet with drag-to-dismiss). All `+` / CTA buttons open the
// one overlay built from `detail`. Ported from the prototype.
// Several phones playing side by side on one colour panel (groups recordings into one story beat)
function Stage({ m }) {
  const ratio = (m.ratio || "16:9").replace(":", "/");
  return withCaption(m, (
    <div className="stage" style={{ background: m.bg, aspectRatio: ratio, "--n": m.phones.length }}>
      {m.phones.map((src, i) => (
        <div className="stage-dev" key={i}>
          <DeviceBox c={{ device: { statusBar: false, screen: { ...vidFor(src), fit: "top", shift: "0%", bg: m.screenBg || "#ffffff" } } }} />
        </div>
      ))}
    </div>
  ));
}

export default function CaseStudyBody({ modules = [], detail, details, accent }) {
  const [mounted, setMounted] = useState(false);
  const [on, setOn] = useState(false);
  const [dkey, setDkey] = useState(null);
  const panelRef = useRef(null);
  const barRef = useRef(null);
  const lastFocus = useRef(null);

  const openOv = useCallback(
    (trigger, key) => {
      if (!detail && !details) return;
      setDkey(key || null);
      lastFocus.current = trigger || null;
      setMounted(true);
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => setOn(true));
    },
    [detail, details]
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

  const onOpen = (e) => openOv(e.currentTarget, e.currentTarget.dataset.detail);
  const hasDetail = (key) => (key && details ? !!details[key] : !!detail);
  const cur = (dkey && details && details[dkey]) || detail || (details && Object.values(details)[0]);

  const renderMedia = (c, inStack) => renderVisual(c, c.fill);

  const renderDetail = (c) => (
    <div className={"detail" + (c.solo ? " solo" : "")}>
      <div>
        {c.eyebrow && <div className="eyebrow">{c.eyebrow}</div>}
        <p>{rich(c.copy)}</p>
      </div>
      <div className="cardfoot">
        <span className="blabel">{c.label}</span>
        {c.cta && hasDetail(c.detail) && (
          <button className="iconbtn" type="button" onClick={onOpen} data-detail={c.detail || ""} aria-label="Read more">
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
          {withCaption(c, <Carousel slides={c.slides} ratio={c.ratio} />)}
        </div>
      );
    }
    if (c.kind === "infocards") {
      return (
        <div className={c.span + " r"} key={i}>
          {withCaption(c, <InfoCards m={c} />)}
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
    if (c.kind === "journey") {
      return (
        <div className={c.span + " r"} key={i}>
          <JourneyCard c={c} />
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
        {renderFramed(c)}
      </div>
    );
  };

  const renderModule = (m, i) => {
    const story = { targets: Targets, shifts: Shifts, persona: Persona, pull: Pull, bars: Bars, sentence: Sentence, lists: Lists, loop: Loop, system: System, ladder: Ladder, table: Table }[m.type];
    if (story) { const C = story; return <C m={m} key={i} />; }
    if (m.type === "stage") {
      return (
        <section className="section wrap" key={i}>
          <div className="grid"><div className="col-12 r"><Stage m={m} /></div></div>
        </section>
      );
    }
    if (m.type === "prose") {
      return (
        <section className="section overview wrap" key={i}>
          <h2 className="r">{m.heading}</h2>
          <div className="body r">
            {m.body.map((t, j) => <p key={j}>{rich(t)}</p>)}
            {m.cta && hasDetail(m.cta.detail) && (
              <div className="ctarow">
                <button className="btn-exp" type="button" onClick={onOpen} data-detail={m.cta.detail || ""} aria-label={m.cta.label}>
                  <span className="lbl">{m.cta.label}</span><span className="ico"><PlusIco /></span>
                </button>
              </div>
            )}
          </div>
        </section>
      );
    }
    if (m.type === "slideshow") {
      return (
        <section className="section wrap" key={i}>
          <div className="grid">
            <div className="col-12 r">
              <Slideshow slides={m.slides} ratio={m.ratio} accents={m.accents} hold={m.hold} label={m.label} />
            </div>
          </div>
        </section>
      );
    }
    if (m.type === "stats") {
      return (
        <section className="section stats wrap" key={i}>
          {m.intro && <p className="stats-intro r">{m.intro}</p>}
          <dl className="stats-row">
            {m.items.map((it, j) => (
              <div className="stat r" key={j}>
                <dt>{it.label}</dt>
                <dd>{it.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      );
    }
    if (m.type === "showreel") {
      return (
        <section className="section wrap" key={i}>
          <div className="grid"><div className="col-12 r now">{withCaption(m, <Showreel m={m} />)}</div></div>
        </section>
      );
    }
    if (m.type === "full") {
      return (
        <section className="section wrap" key={i}>
          <div className="grid">
            <div className="col-12 r">{renderVisual(m)}</div>
          </div>
        </section>
      );
    }
    if (m.type === "statement" && m.todo) {
      if (!SHOW_GAPS) return null;
      return (
        <section className="section wrap" key={i}>
          <div className="copygap r">
            <span className="gap-k">Copy slot · outcome</span>
            <p className="gap-t">{m.text}</p>
          </div>
        </section>
      );
    }
    if (m.type === "statement") {
      return (
        <section className={"section statement wrap" + (m.phase ? " has-phase" : "")} key={i}>
          {m.phase && <p className="st-phase r">{m.phase}</p>}
          {m.kicker && <p className="st-kick r">{m.kicker}</p>}
          <p className="modhead r">{rich(m.text)}</p>
          {m.cta && hasDetail(m.cta.detail) && (
            <div className="ctarow r">
              <button className="btn-exp" type="button" onClick={onOpen} data-detail={m.cta.detail || ""} aria-label={m.cta.label}>
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
    <div className="cs" style={accent ? { "--cs-accent": accent } : undefined}>
      {modules.map(renderModule)}

      {cur && (
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
            <div className="eyebrow">{cur.eyebrow}</div>
            <h2>{cur.heading}</h2>
            {cur.image && (
              <div className="img" role="img" aria-label="Project image" style={{ background: mediaBg(cur.image) }} />
            )}
            {cur.media && (
              <div className="ov-media">{cur.media.ph ? <PhBox c={{ ratio: cur.media.ratio || "16:9", media: cur.media }} /> : <MediaBox c={{ ratio: cur.media.ratio || "16:9", media: cur.media }} />}</div>
            )}
            {cur.figures && (
              <dl className="ov-figs">
                {cur.figures.map((f, i) => (
                  <div key={i}><dd>{f.value}</dd><dt>{f.label}</dt></div>
                ))}
              </dl>
            )}
            {(cur.body || []).map((p, i) =>
              typeof p === "string" ? (
                <p key={i} className={i === cur.body.length - 1 ? "last" : undefined}>{rich(p)}</p>
              ) : (
                <div className="ov-sec" key={i}>
                  {p.k && <span className="ov-k">{p.k}</span>}
                  <h3>{p.title}</h3>
                  {p.copy && <p>{rich(p.copy)}</p>}
                  {p.items && <ul>{p.items.map((it, j) => <li key={j}>{rich(it)}</li>)}</ul>}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
