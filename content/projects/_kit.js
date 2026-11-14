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
export const todo = (text) => ({ todo: text });

export const full = (m, o = {}) => ({ type: "full", ratio: "16:9", media: m, ...o });
export const fullGap = (label, text, ratio = "16:9") => ({ type: "full", ratio, label, media: todo(text) });
export const statement = (text, cta) => ({ type: "statement", text, ...(cta ? { cta: { label: cta } } : null) });
// COPY SLOT — a statement still to be written (hidden when gaps are off)
export const copyGap = (text) => ({ type: "statement", todo: true, text });
export const row = (...cols) => ({ type: "row", cols });
export const tight = (...cols) => ({ type: "row", tight: true, cols });

export const media = (span, ratio, src, label, alt) => ({ span: S(span), kind: "media", ratio, label, media: img(src, alt || label) });
export const gap = (span, ratio, label, text) => ({ span: S(span), kind: "media", ratio, label, media: todo(text) });
export const text = (span, eyebrow, copy, label, cta = false) => ({ span: S(span), kind: "detail", eyebrow, copy, label, cta });
export const carousel = (span, slides) => ({ span: S(span), kind: "carousel", slides });
export const slide = (tag, body, src, o = {}) => ({ tag, body, media: { img: src, ...o } });
export const gapSlide = (tag, body, text) => ({ tag, body, media: todo(text) });
export const stack = (span, ...items) => ({ span: S(span), kind: "stack", items });

export const phone = (span, src, bg = "#EAE9E6", o = {}) => ({
  span: S(span),
  kind: "device",
  frame: { bg, ar: "ar-portrait", mode: "bleed" },
  device: { statusBar: false, screen: { img: src, fit: "top", shift: "0%", bg: "#ffffff", ...o } },
});
export const framed = (span, src, bg = "#EAE9E6", ratio = "16:9", alt = "") => ({
  span: S(span),
  kind: "media",
  frame: { bg, ar: "ar-portrait", mode: "inset" },
  ratio,
  media: img(src, alt),
});
