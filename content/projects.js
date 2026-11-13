// ============================================================
// GRAY SPACE — content layer (Sanity-ready).
// This is Layer 2: the part you iterate on freely. Add / edit / reorder
// projects here and the whole site updates — no component changes.
// Each object maps 1:1 to a future Sanity `project` document; the module
// blocks map to a portable-text-style array of typed blocks.
//
// MEDIA: use { img: "/media/foo.jpg" } for a real asset in /public/media,
// or { grad: ["#aaa","#333"] } as a placeholder. Swap grads for imgs as
// real work lands — nothing else needs to change.
//
// To publish a full case study: set `published: true` and fill `modules`.
// Projects without modules still render a valid lighter case-study page
// (lede + meta + overview + "full case study on request").
// ============================================================

export const projects = [
  {
    slug: "phillips",
    name: "Phillips",
    year: "2026",
    discipline: "Product Design",
    role: "Lead Designer",
    services: ["Branding", "Product Design", "Product Strategy", "UX/UI", "Visual Design"],
    tags: ["Product Design", "UX/UI", "Design System"],
    cover: { img: "/media/phillips/cover-16x9.webp" },
    grad: ["#2a2d33", "#15161a"],
    hoverImages: ["/media/phillips/browse.webp", "/media/phillips/sale.webp", "/media/phillips/lot-details.webp"],
    summary: "Auction platform · 2026",
    published: true,
    lede: { lead: "Phillips,", rest: "transforming the end-to-end client experience." },
    detail: {
      eyebrow: "Bidding abandonment",
      heading: "From registered to active bidder.",
      image: { img: "/media/phillips/bidding.webp" },
      body: [
        "Only 17.7% of registered users were converting into active bidders. We ran a cross-functional study — journey-mapping workshops, qualitative testing and synthesis — to find where intent was lost across registration, advance bidding and the live Saleroom.",
        "The redesign targeted those drop-off points directly: clearer advance bidding, better notifications, and a rebuilt live Saleroom — lifting overall bid conversion and online live bids.",
      ],
    },
    modules: [
      { type: "full", ratio: "free", label: "Homepage & brand", media: { img: "/media/phillips/hero.webp", alt: "Phillips redesigned homepage hero" } },
      {
        type: "statement",
        text:
          "Phillips is an international auction house. We rebuilt its client-facing digital experience from the ground up — a native iOS app, a responsive web platform, an updated auction calendar and a live Saleroom — on a new design system and brand identity.",
        cta: { label: "The opportunity" },
      },
      {
        type: "row",
        cols: [
          { span: "col-8", kind: "media", ratio: "16:9", label: "Sale page", media: { img: "/media/phillips/sale.webp", alt: "Phillips sale page" } },
          { span: "col-4", kind: "detail", eyebrow: "The challenge", copy: "An ageing native app, inconsistent UI across platforms, and a live bidding experience that failed during key sales — with no shared design language to ship against.", label: "Sale & calendar", cta: true },
        ],
      },
      {
        type: "row",
        cols: [
          { span: "col-7", kind: "media", ratio: "free", label: "Browse & discovery", media: { img: "/media/phillips/browse.webp", alt: "Phillips browse departments screen" } },
          { span: "col-5", kind: "detail", eyebrow: "Role", copy: "Design direction across process, product polish and brand (2024–2026): journey-mapping workshops, a new digital brand direction with a custom typeface, and a design system with shared tokens and an integrated component library.", label: "Brand & system", cta: true },
        ],
      },
      { type: "full", ratio: "free", label: "Lot details", media: { img: "/media/phillips/lot-details.webp", alt: "Phillips lot details screen" } },
      {
        type: "row",
        cols: [
          { span: "col-6", kind: "media", ratio: "16:9", label: "Live Saleroom · desktop", media: { img: "/media/phillips/saleroom-desktop.webp", alt: "Phillips live Saleroom on desktop" } },
          { span: "col-6", kind: "media", ratio: "16:9", label: "Live Saleroom · mobile", media: { img: "/media/phillips/saleroom-mobile.webp", alt: "Phillips live Saleroom on mobile" } },
        ],
      },
      {
        type: "row",
        cols: [
          {
            span: "col-6",
            kind: "device",
            frame: { bg: "#000000", ar: "ar-portrait", mode: "bleed" },
            device: {
              storyUI: true,
              bottomNav: false,
              user: "Phillipsauction",
              time: "18h",
              avatar: "/media/phillips/ig-avatar.png",
              screen: {
                video: "/media/phillips/story.mp4",
                webm: "/media/phillips/story.webm",
                poster: "/media/phillips/story-poster.webp",
                fit: "top",
                bg: "#ffffff",
              },
            },
          },
          {
            span: "col-6",
            kind: "media",
            frame: { bg: "#EAE9E6", ar: "ar-portrait", mode: "inset" },
            ratio: "16:9",
            media: {
              video: "/media/phillips/watch.mp4",
              webm: "/media/phillips/watch.webm",
              poster: "/media/phillips/watch-poster.webp",
              alt: "Phillips INTERSECT — specialist interview from the watch sale film",
            },
          },
        ],
      },
      {
        type: "row",
        cols: [
          {
            span: "col-7",
            kind: "detail",
            eyebrow: "Social & story",
            copy: "The INTERSECT watch sale ran as native IG-story takeovers. The chrome — progress bar, header, nav — is composited live over the footage, so the same clip reflows for any device or ratio without re-exporting.",
            label: "INTERSECT campaign",
            cta: true,
          },
        ],
      },
      {
        type: "statement",
        text:
          "The first iOS phase launched within six months. The calendar redesign nearly doubled click-to-register — from 618 to 1,100+ over 90 days — and shared tokens cut design-to-development friction across the team.",
        cta: { label: "Full case study" },
      },
    ],
    overview: {
      heading: "Overview",
      body: [
        "Phillips is a leading international auction house for 20th-century and contemporary art, design and luxury. As bidding moved online, its digital products had fragmented — an ageing app, inconsistent interfaces, and a live Saleroom that strained during the sales that mattered most.",
        "The engagement rebuilt the client journey end-to-end on a shared design system and a refreshed brand: a native iOS app, a responsive web platform, an updated auction calendar and a live Saleroom — designed to turn registered users into active, confident bidders.",
      ],
    },
  },

  {
    slug: "christies",
    name: "Christie's",
    year: "2025",
    discipline: "Search & Discovery",
    role: "Lead Product Designer",
    services: ["Branding", "Product Design", "Product Strategy", "UX/UI", "Visual Design"],
    tags: ["Product Design", "UX Strategy"],
    cover: { grad: ["#b7a890", "#6f6353"] },
    grad: ["#b7a890", "#6f6353"],
    hoverImages: [],
    summary: "Search & discovery · 2025",
    published: true,
    lede: { lead: "Christie's,", rest: "Transforming how collectors search & discover." },
    detail: {
      eyebrow: "Search & Discovery",
      heading: "Connecting people with the objects they'll want to own.",
      image: { grad: ["#b7a890", "#6f6353"] },
      body: [
        "As online bidding surged amid shifting behaviours, the brief was to rethink how collectors find work across every digital touchpoint — making search feel contextual, editorial and fast rather than transactional.",
        "We redesigned global search with new autosuggestions, rolled out Browse All and 500 artist & category landing pages, launched a CRM to create alerts and follow artists, and shipped a specialist-facing native app for estimations and selling.",
        "The result tied discovery back to Christie's editorial voice while measurably shortening the path from interest to bid.",
      ],
    },
    modules: [
      { type: "full", ar: "ar-wide", label: "Global search redesign", media: { grad: ["#b7a890", "#6f6353"] } },
      {
        type: "statement",
        text:
          "Included are accomplishments designed, built and shipped by understanding the problem space — connecting customers with the items most relevant to them, from a global search redesign to new browse and discovery surfaces.",
        cta: { label: "Read more" },
      },
      {
        type: "row",
        cols: [
          { span: "col-8", kind: "media", ar: "ar-std", label: "Browse all", media: { grad: ["#2b5a55", "#123330"] } },
          {
            span: "col-4",
            kind: "detail",
            eyebrow: "The approach",
            copy:
              "500 new artist & category landing pages, a CRM to create alerts and follow artists, and a specialist-facing app for estimations — each shipped against a measured problem.",
            label: "Browse & discovery",
            cta: true,
          },
        ],
      },
      {
        type: "row",
        cols: [
          {
            span: "col-5",
            kind: "carousel",
            slides: [
              { tag: "Billboard", body: "With a broader brand toolkit, the work now lives on the shelves of the world's largest retailers without losing its identity.", media: { grad: ["#c9c3b4", "#8d8574"] } },
              { tag: "Out of home", body: "A system designed to carry consistently from pack to poster across every surface.", media: { grad: ["#d7d2c4", "#a39b86"] } },
              { tag: "Product", body: "The hero surfaces, shot to feel editorial rather than clinical.", media: { grad: ["#8fa58c", "#43593f"] } },
              { tag: "Identity", body: "A flexible logo system that adapts across formats while staying unmistakably one brand.", media: { grad: ["#b7a890", "#6f6353"] } },
            ],
          },
          { span: "col-7", kind: "media", ar: "ar-tall", label: "In-situ · retail", media: { grad: ["#5f8f63", "#24401f"] } },
        ],
      },
      {
        type: "row",
        tight: true,
        cols: [
          { span: "col-7", kind: "media", ar: "ar-std", fill: true, label: "Focal point", media: { grad: ["#24401f", "#0f1f0c"] } },
          {
            span: "col-5",
            kind: "stack",
            items: [
              { kind: "media", ar: "ar-wide", label: "Detail", media: { grad: ["#cfd6c3", "#aab59a"] } },
              { kind: "detail", copy: "The same search patterns, now part of a system as adaptive as the collection it surfaces.", label: "Logo lockup", cta: true },
            ],
          },
        ],
      },
      {
        type: "row",
        cols: [
          { span: "col-6", kind: "media", ar: "ar-std", label: "CRM & alerts", media: { grad: ["#5b6b7d", "#2f3a47"] } },
          { span: "col-6", kind: "media", ar: "ar-std", label: "Watch compare", media: { grad: ["#8a7fa6", "#4b4661"] } },
        ],
      },
      {
        type: "statement",
        text:
          "Transforming search and discovery across digital touchpoints — embracing a more user-centred and contextually relevant approach.",
        cta: { label: "Full case study" },
      },
    ],
    overview: {
      heading: "Overview",
      body: [
        "Christie's is one of the world's leading auction houses, selling art and luxury across live and online sales to collectors in nearly every country. As the market moved online, the challenge was making a vast, specialist catalogue feel discoverable to a new generation of buyers without losing the expertise that defines the brand.",
        "We were brought in to rethink how collectors search and discover — connecting people with the lots most relevant to them. The work spanned a global search redesign, 500 new artist and category landing pages, a CRM to follow artists and set alerts, and a specialist-facing app for estimations, each shipped against a measured problem.",
      ],
    },
  },

  // --- Remaining shelf: roster + grid entries. Lighter case pages for now;
  //     promote any to a full study by adding `modules` + `published: true`. ---
  mk("zalando", "Zalando", "2024", "Design System", ["Design System", "UX/UI"], ["#5b6b7d", "#2f3a47"], "Design system · 2024"),
  mk("frontify", "Frontify", "2024", "Brand & Web", ["Brand", "Web"], ["#8a7fa6", "#4b4661"], "Brand & web · 2024"),
  mk("channel-4", "Channel 4", "2023", "Product Design", ["Product Design", "Prototyping"], ["#2b5a55", "#123330"], "Product design · 2023"),
  mk("cazoo", "Cazoo", "2023", "UX Strategy", ["UX Strategy", "Product Design"], ["#7f8a74", "#49513f"], "UX strategy · 2023"),
  mk("lta-rally", "LTA Rally", "2022", "Campaign", ["Campaign", "Art Direction"], ["#b08767", "#6e4f38"], "Campaign · 2022"),
  mk("just-eat", "Just Eat", "2022", "Product Design", ["Product Design", "UX/UI"], ["#8f8a55", "#514d2c"], "Product design · 2022"),
  mk("honda", "HONDA", "2021", "Prototyping", ["Prototyping", "Motion"], ["#6a7883", "#374149"], "Prototyping · 2021"),
  mk("bt-tv", "BT TV", "2021", "Interaction", ["Interaction", "UX/UI"], ["#4a4f86", "#262a4e"], "Interaction · 2021"),
  mk("bookinggo", "BookingGo", "2020", "Product Design", ["Product Design", "UX Strategy"], ["#5d8079", "#30473f"], "Product design · 2020"),
];

// helper for the lighter shelf entries
function mk(slug, name, year, discipline, tags, grad, summary) {
  return {
    slug,
    name,
    year,
    discipline,
    role: "Lead Product Designer",
    services: tags,
    tags,
    cover: { grad },
    grad,
    hoverImages: [],
    summary,
    published: false,
    lede: { lead: name + ",", rest: discipline + " for a measured outcome." },
    overview: {
      heading: "Overview",
      body: [
        "A selected engagement covering " +
          discipline.toLowerCase() +
          ". This entry is part of the working shelf; the full case study is available on request.",
      ],
    },
  };
}

export const allProjects = projects;

export function getProject(slug) {
  return projects.find((p) => p.slug === slug) || null;
}

export function getPrevNext(slug) {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i < 0) return { prev: null, next: null };
  const prevP = projects[(i - 1 + projects.length) % projects.length];
  const nextP = projects[(i + 1) % projects.length];
  const toNav = (p) => ({
    name: p.name,
    href: "/work/" + p.slug,
    thumb: p.cover.img ? `url(${p.cover.img})` : `linear-gradient(145deg, ${p.grad[0]}, ${p.grad[1]})`,
  });
  return { prev: toNav(prevP), next: toNav(nextP) };
}

// shared helper: turn a media spec into a CSS background value
export function mediaBg(media) {
  if (!media) return "var(--surface)";
  if (media.img) return `center / cover no-repeat url(${media.img})`;
  if (media.grad) return `linear-gradient(145deg, ${media.grad[0]}, ${media.grad[1]})`;
  return "var(--surface)";
}
