// Responsive image helpers. scripts/build-media.py writes public/media/_sizes.json
// listing the widths built for each image (name-1200.webp, name-2000.webp, name.webp).
import sizes from "@/public/media/_sizes.json";

export function srcSet(src) {
  const w = src && sizes[src];
  if (!w || w.length < 2) return undefined;
  const base = src.slice(0, -5);
  return w.map((x, i) => (i === w.length - 1 ? src : `${base}-${x}.webp`) + ` ${x}w`).join(", ");
}

// sizes attribute from a grid span ("col-8" → 66vw on desktop, full width below lg)
export function sizesFor(span) {
  const n = parseInt(String(span || "col-12").replace("col-", ""), 10) || 12;
  return `(max-width: 1024px) 100vw, ${Math.round((n / 12) * 100)}vw`;
}
