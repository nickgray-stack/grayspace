
const P = "/media/phillips/";
const pic = (span, ratio, file, alt) => ({ span: "col-" + span, kind: "media", ratio, media: { img: P + file, alt } });
const panel = (span, copy, label) => ({ span: "col-" + span, kind: "detail", solo: true, copy, label });
const lockup = (...cols) => ({ type: "row", tight: true, cols });
const say = (text, label, detail, muted) => ({ type: "statement", text, ...(muted ? { muted } : null), ...(label ? { cta: { label, detail } } : null) });

const phillips = {
  slug: "phillips",
  name: "Phillips",
  year: "2024–2026",
  discipline: "Product Design",
  role: "Lead Designer",
  services: ["Branding", "Product Design", "Product Strategy", "UX/UI", "Visual Design"],
  tags: ["Product Design", "UX/UI", "Design System"],
  cover: { img: "/media/covers/phillips.webp" },
  grad: ["#2a2d33", "#15161a"],
  hoverImages: ["/media/phillips/browse.webp", "/media/phillips/sale.webp", "/media/phillips/lot-details.webp"],
  summary: "Auction platform · 2026",
  published: true,
  lede: { lead: "Phillips,", rest: "transforming the end-to-end client experience." },
  details: {
    challenge: {
      eyebrow: "The challenge",
      heading: "Fragmented products, and bidders lost at every sale.",
      body: [
        "Phillips' digital products had grown fragmented: an ageing native app, inconsistent UI across platforms, and a live bidding experience that failed during high-stakes auctions. There was no shared design language or token structure to build from.",
        "Research pointed to bidding abandonment. Only *17.7%* of registered users became active bidders: process friction, unclear advance bidding and poorly timed communications were costing revenue at every sale.",
        "The opportunity was to redesign the journey from discovery and registration to live bidding, and lay a foundation the team could ship on consistently.",
      ],
    },
    role: {
      eyebrow: "My role",
      heading: "Design direction across process, product and brand.",
      body: [
        "I ran cross-functional workshops to map the end-to-end client journey, turning the findings into feature definitions and UX frameworks for each product phase.",
        "I worked with Product and a UX researcher on the Bidding Abandonment Rate study: qualitative testing, synthesis, and turning insights into design across registration, the calendar and the live Saleroom.",
        "I owned or co-led the iOS app redesign, the auction calendar across native and responsive web, and the live Saleroom and bidding experience.",
      ],
    },
    brand: {
      eyebrow: "Brand and system",
      heading: "A new digital brand, and a system to build on.",
      body: [
        "I led a new digital brand direction, including a custom typeface commissioned from an external agency.",
        "I built a new design system with shared tokens, a unified UI language and a component library integrated into the codebase. It gave engineering a reliable, scalable foundation for the first time, and cut design-to-development friction across platforms.",
      ],
    },
    outcomes: {
      eyebrow: "Outcomes",
      heading: "Launched in phases, through early 2026.",
      figures: [
        { value: "618", to: "1,100+", label: "Click-to-register in 90 days after the calendar redesign" },
      ],
      body: [
        "The first phase of the iOS app launched within six months, with the calendar and live Saleroom following in later phases. Testing confirmed cards and a clearer hierarchy matched how clients discover sales.",
        "The redesign addressed what drove bidding abandonment: clearer advance bidding, better notifications and a rebuilt live Saleroom. Overall bid conversion from registered users increased, with online live bids up.",
      ],
    },
  },
  // every visual full width at its own ratio (nothing cropped), stacked 8px apart
  modules: [
    lockup(pic(12, "free", "hero.webp", "Phillips Jewels Hong Kong poster beside the redesigned homepage on a laptop")),
    say("Phillips is a leading auction house for contemporary art, design, watches and jewellery. We rebuilt its whole client-facing experience: a native iOS app, a responsive web platform, an auction calendar and a live Saleroom, on a new design system and brand.", "The challenge", "challenge"),
    lockup(
      pic(12, "free", "browse.webp", "Phillips browse departments"),
      pic(12, "free", "sale-home.webp", "Phillips sale and home pages"),
      pic(12, "free", "sale.webp", "Phillips sale page"),
      panel(6, "A full redesign of the auction calendar across native and responsive web. Cards and a clearer hierarchy match how clients look for sales, and click-to-register nearly doubled, from *618 to 1,100+* in 90 days.", "Auction calendar")
    ),
    say("I led design from 2024 to 2026 across process, product polish and brand, from journey-mapping workshops to the bidding abandonment study.", "My role", "role"),
    lockup(
      pic(12, "free", "registering.webp", "Phillips registration flow"),
      pic(12, "free", "bidding-favourites.webp", "Phillips bidding and favourites")
    ),
    say("Alongside the product, I led a new digital brand with a custom typeface, and built a design system with shared tokens and a component library in the codebase.", "Brand and system", "brand"),
    lockup(
      pic(12, "free", "onboarding.webp", "Phillips onboarding, registration and verification flows"),
      pic(12, "free", "lot-details.webp", "Phillips lot details")
    ),
    say("The first iOS phase launched within six months. The new design tackled what drove bidding abandonment: clearer advance bidding, better notifications and a rebuilt live Saleroom.", "Outcomes", "outcomes"),
    lockup(
      pic(12, "free", "saleroom-desktop.webp", "Phillips live Saleroom on desktop"),
      pic(12, "free", "saleroom-mobile.webp", "Phillips live Saleroom on mobile"),
      pic(12, "free", "notifications-live.webp", "Phillips live sale notifications and live activity"),
      panel(6, "The highest-priority workstream after repeated failures during live sales. A rebuilt Saleroom on desktop and mobile, with online live bids up after the redesign.", "Live Saleroom")
    ),
    {
      type: "row",
      tight: true,
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
            avatar: P + "ig-avatar.png",
            screen: { video: P + "story.mp4", webm: P + "story.webm", poster: P + "story-poster.webp", fit: "top", bg: "#ffffff" },
          },
        },
        {
          span: "col-6",
          kind: "media",
          frame: { bg: "#EAE9E6", ar: "ar-portrait", mode: "inset" },
          ratio: "16:9",
          media: { video: P + "watch.mp4", webm: P + "watch.webm", poster: P + "watch-poster.webp", alt: "Phillips INTERSECT watch sale film" },
        },
        panel(6, "The INTERSECT watch sale ran as native Instagram story takeovers. The story chrome is built live over the footage, so the same clip works at any size.", "INTERSECT campaign"),
      ],
    },
    lockup(pic(12, "free", "brand-assets.webp", "Phillips brand assets")),
  ],
  overview: {
    heading: "Overview",
    body: [
      "Phillips is a leading international auction house. As bidding moved online, its digital products had fragmented: an ageing app, inconsistent interfaces, and a live Saleroom that strained in the sales that mattered most.",
      "We rebuilt the client journey end to end on a shared design system and a refreshed brand, to turn registered users into active, confident bidders.",
    ],
  },
};

export default phillips;
