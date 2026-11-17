// Tiny builders for case-study modules. They only return plain objects (the
// same shapes CaseStudyBody renders and Sanity will store) — they just keep
// the per-project files short and readable.
//
//   full(media, opts)                     full-width media
//   statement(text, ctaLabel?)            large statement, optional overlay CTA
//   row(...cols) / tight(...cols)         12-col row
//   media(span, ratio, src, label, alt)   image column  (ratio "16:9" | "4:3" | "4:5" | "free" …)
//   gap(span, ratio, label, todo)         ASSET SLOT — placeholder + design call-out
//   text(span, eyebrow, copy, label, cta) detail card
//   carousel(span, slides)                4:5 carousel; slides via slide()/gapSlide()
//   phone(span, src, bg, opts)            device frame (bleed) showing a mobile screen
//   framed(span, src, bg, ratio)          media inset on a colour ground (pairs with phone)
const S = (n) => (typeof n === "number" ? "col-" + n : n);

export const img = (src, alt = "") => ({ img: src, alt });
// a source ending in .mp4 becomes a looping video (expects -poster.webp and .webm beside it)
export const vid = (src, alt = "") => ({ video: src, webm: src.replace(/\.mp4$/, ".webm"), poster: src.replace(/\.mp4$/, "-poster.webp"), alt });
const auto = (src, alt) => (/\.mp4$/.test(src) ? vid(src, alt) : img(src, alt));
export const todo = (text) => ({ todo: text });

export const full = (m, o = {}) => ({ type: "full", ratio: "16:9", media: m, ...o });
export const fullGap = (label, text, ratio = "16:9") => ({ type: "full", ratio, label, media: todo(text) });
// Hero slideshow (wide). slides: [{ img, alt, label, panAr?, hold? }] — panAr = image
// width/height when the image is wider than the frame and should travel across.
export const slideshow = (slides, o = {}) => ({ type: "slideshow", ratio: "16:9", slides, ...o });
// Headline numbers: stats([{ value, label }], "optional intro line")
export const stats = (items, intro) => ({ type: "stats", items, ...(intro ? { intro } : null) });
export const statement = (text, cta) => ({ type: "statement", text, ...(cta ? { cta: { label: cta } } : null) });
// COPY SLOT — a statement still to be written (hidden when gaps are off)
export const copyGap = (text) => ({ type: "statement", todo: true, text });
export const row = (...cols) => ({ type: "row", cols });
export const tight = (...cols) => ({ type: "row", tight: true, cols });

// pos: CSS object-position for the crop, e.g. "top" to show the top of a long page
export const media = (span, ratio, src, label, alt, pos) => ({ span: S(span), kind: "media", ratio, label, media: { ...auto(src, alt || label), ...(pos ? { pos } : null) } });
export const fullMedia = (ratio, src, label, alt, pos) => ({ type: "full", ratio, label, media: { ...auto(src, alt || label), ...(pos ? { pos } : null) } });
export const gap = (span, ratio, label, text) => ({ span: S(span), kind: "media", ratio, label, media: todo(text) });
export const text = (span, eyebrow, copy, label, cta = false) => ({ span: S(span), kind: "detail", eyebrow, copy, label, cta });
export const carousel = (span, slides) => ({ span: S(span), kind: "carousel", slides });
export const slide = (tag, body, src, o = {}) => ({ tag, body, media: { img: src, ...o } });
export const gapSlide = (tag, body, text) => ({ tag, body, media: todo(text) });
export const stack = (span, ...items) => ({ span: S(span), kind: "stack", items });

// phone(span, src, bg, { baked, mode, screenBg })
//  default: app screen/video placed below a solid status bar (fit "inset") and the
//           whole device shown in the 4:5 panel (mode "whole") — nothing cropped.
//  baked:   the screen already contains its own status bar → no added bar, anchored
//           to the top, device cropped by the panel edge (mode "bleed").
export const phone = (span, src, bg = "#EAE9E6", o = {}) => {
  const media = /\.mp4$/.test(src) ? vid(src) : { img: src };
  return {
    span: S(span),
    kind: "device",
    frame: { bg, ar: "ar-portrait", mode: o.mode || (o.baked ? "bleed" : "whole") },
    device: o.baked
      ? { statusBar: false, screen: { ...media, fit: "top", shift: "0%", bg: o.screenBg || "#ffffff" } }
      : { statusBar: "solid", screen: { ...media, fit: "inset", bg: o.screenBg || "#000000" } },
  };
};
export const framed = (span, src, bg = "#EAE9E6", ratio = "16:9", alt = "") => ({
  span: S(span),
  kind: "media",
  frame: { bg, ar: "ar-portrait", mode: "inset" },
  ratio,
  media: img(src, alt),
});
