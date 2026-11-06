# Gray Space — grayspc.com

Nick Gray's portfolio. Next.js (App Router) · GSAP + Lenis · self-hosted Switzer.
A studio-of-one "shop window": Home (roster + work grid) → Case study → About → Contact.

This V1 is a faithful build of the Oct–Nov 2026 HTML prototype, re-architected as a
real app with a **Sanity-ready content layer** so adding/editing work is data-only.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all pages prerender static)
npm run start      # serve the production build
```

Node 18.18+ (built on Node 22).

## Architecture (three layers)

1. **Locked foundation** — `app/globals.css` holds the design system ported 1:1 from
   the prototype's `shared.css` (tokens, nav, mobile menu, footer, 12-col grid,
   media/aspect, reveal, toast). Shared behaviour from `shared.js` lives in
   `components/` (`Chrome`, `InkLogo`, `SmoothScroll`, `Footer`, `ContactButton`,
   `ToastHost`). **Don't re-litigate this — it's the settled direction.**
2. **Content** — everything in `content/` (`projects.js`, `site.js`). Sanity-ready
   shape. This is the layer you iterate on freely. See `ITERATING.md`.
3. **Pages/templates** — `app/page.js` (Home), `app/work/[slug]/page.js` (Case study,
   generated from the content), `app/about`, `app/contact`.

## What's V1 vs open

**Done:** full design system, chrome (nav + ink-bleed logo + top-down mobile menu +
footer), Home (roster hero + 2-up hover-slideshow grid), the Christie's case study
(modules, carousel, drag-to-dismiss overlay, overview, prev/next), About (scoped dark),
Contact stub, Lenis + GSAP + scroll-reveal, reduced-motion, static prerender of all pages.

**Open / parked (flagged in code):** the launch animation (not yet folded into Home);
per-project hover-slideshow crops; Vaul/embla swap-ins (custom ports ship in V1);
real media + video (placeholders are gradients today); Sanity wiring; the About
light-vs-dark decision; renaming the two `Lede` uses.

## Deploy

GitHub → Vercel (not yet linked — do this together). `next build` is clean and every
route is static, so it deploys as-is. Native `<video>` is intended to come from a CDN,
not the repo.
