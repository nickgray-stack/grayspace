# Iterating on Gray Space

The whole point of the architecture: **content and UX are cheap to change, the design
system is stable.** Here's how to do the common things without fighting the code.

---

## Add or edit a project

Everything lives in `content/projects.js`. Each entry is one object (a future Sanity
`project` document). To add a project, copy an existing object and edit it. Order in
the array = order on the site (roster + grid).

Minimum fields for a shelf entry (shows on Home + a lighter case page):

```js
{
  slug: "new-client",            // URL: /work/new-client
  name: "New Client",
  year: "2026",
  discipline: "Product Design",  // roster caption
  role: "Lead Product Designer",
  services: ["Product Design", "UX/UI"],
  tags: ["Product Design", "UX/UI"],   // grid pills
  cover: { grad: ["#5b6b7d", "#2f3a47"] }, // or { img: "/media/x.jpg" }
  grad: ["#5b6b7d", "#2f3a47"],
  hoverImages: [],               // add 2–4 crops to light up the hover-slideshow
  summary: "Product design · 2026",
  published: false,
  lede: { lead: "New Client,", rest: "a short outcome line." },
  overview: { heading: "Overview", body: ["First paragraph.", "Second paragraph."] },
}
```

The lighter `mk(...)` helper at the bottom of the file generates this shape for you —
the trailing shelf entries use it. Use the full object form when you want control.

## Add real imagery

Drop files in `public/media/` and reference them as `"/media/filename.jpg"`:

- **Cover** (roster preview + grid tile): `cover: { img: "/media/client.jpg" }`
- **Hover-slideshow** (grid tile cross-fade): `hoverImages: ["/media/a.jpg", "/media/b.jpg", "/media/c.jpg"]`
- Anywhere a module takes `media`, swap `{ grad: [...] }` for `{ img: "/media/x.jpg" }`.

Nothing else changes — gradients are just placeholders.

## Promote a project to a full case study

Set `published: true` and add a `modules` array + a `detail` object (the overlay).
Modules are typed blocks — copy Christie's as the reference. Block types:

- `{ type: "full", ar, label, media }` — full-width hero media
- `{ type: "statement", text, cta: { label } }` — big statement + optional "read more"
- `{ type: "row", tight?, cols: [...] }` — a grid row; each col is:
  - `{ span: "col-8", kind: "media", ar, label, media }`
  - `{ span: "col-4", kind: "detail", eyebrow?, copy, label, cta? }`
  - `{ span: "col-5", kind: "carousel", slides: [{ tag, body, media }] }`
  - `{ span: "col-5", kind: "stack", items: [media/detail, ...] }`

Spans use the 12-col grid (`col-4` … `col-12`). All CTA `+` buttons open the single
`detail` overlay.

## Change a design token (colour, spacing, radius, type)

Edit the `:root` block at the top of `app/globals.css`. Tokens cascade everywhere
(light + dark). Dark values are in the `[data-theme="dark"]` block. Don't hardcode
colours in components — use a token.

## Edit About / Contact copy

`content/site.js` (About statement + footnote). Contact copy is in
`app/contact/page.js`.

## Fix a component's behaviour

One concern per file in `components/`:
- Nav + mobile menu → `Chrome.js`
- Nav logo (ink-bleed + fade) → `InkLogo.js`
- Smooth scroll + scroll-reveal → `SmoothScroll.js`
- Carousel → `components/casestudy/Carousel.js`
- Case-study modules + overlay → `components/casestudy/CaseStudyBody.js`
- Work-grid tile + hover-slideshow → `components/home/WorkCard.js`
- Contact copy + toast → `lib/contact.js` + `ToastHost.js`

## Reduced motion

Honoured globally (`SmoothScroll` skips Lenis; CSS shows reveals immediately and kills
transitions). Test with your OS "reduce motion" setting.
