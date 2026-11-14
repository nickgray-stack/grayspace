const phillips = {
  slug: "phillips",
  name: "Phillips",
  year: "2026",
  period: "2024–2026",
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
        { span: "col-6", kind: "media", ratio: "16:9", label: "Registering", media: { img: "/media/phillips/registering.webp", alt: "Phillips registration flow" } },
        { span: "col-6", kind: "media", ratio: "16:9", label: "Bidding & favourites", media: { img: "/media/phillips/bidding-favourites.webp", alt: "Phillips bidding and favourites screens" } },
      ],
    },
    { type: "full", ratio: "free", label: "Onboarding & verification", media: { img: "/media/phillips/onboarding.webp", alt: "Phillips onboarding, registration and verification flows" } },
    {
      type: "row",
      cols: [
        { span: "col-4", kind: "detail", eyebrow: "The study", copy: "Only 17.7% of registered users went on to bid. Mapping the journey showed intent leaking at three points: registering for a sale, placing an advance bid, and joining the live Saleroom.", label: "Bidding abandonment", cta: true },
        { span: "col-8", kind: "media", ratio: "16:9", label: "Journey map", media: { todo: "Design call-out: this is the strongest story on the page and it has no visual. A single 16:9 journey-map graphic — registered → advance bid → live bid, with the 17.7% drop-off marked — would turn the number into evidence. Could also be a 3-slide carousel (before / insight / after)." } },
      ],
    },
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
        { span: "col-6", kind: "media", ratio: "16:9", label: "Live sale notifications", media: { img: "/media/phillips/notifications-live.webp", alt: "Phillips live sale notifications" } },
        { span: "col-6", kind: "media", ratio: "16:9", label: "Notifications", media: { img: "/media/phillips/notifications-social.webp", alt: "Phillips notification designs" } },
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
    { type: "full", ratio: "16:9", label: "Brand assets", media: { img: "/media/phillips/brand-assets.webp", alt: "Phillips brand assets" } },
    {
      type: "row",
      cols: [
        { span: "col-5", kind: "carousel", slides: [
          { tag: "Typeface", body: "A custom typeface gives Phillips a voice of its own across product and brand.", media: { todo: "Type specimen, cropped 4:5 — the custom typeface at display size." } },
          { tag: "Tokens", body: "Shared tokens keep design and engineering working from one source.", media: { todo: "Colour + spacing tokens sheet, 4:5." } },
          { tag: "Components", body: "An integrated component library, built once and used across iOS and web.", media: { todo: "Component library overview, 4:5." } },
        ] },
        { span: "col-7", kind: "media", ratio: "3:4", label: "Design system", media: { todo: "Design call-out: the system is named in the copy but never shown. A carousel (left) of typeface / tokens / components beside one tall 3:4 hero of the library would close the loop between brand and product — and it is the section a hiring lead will look for." } },
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
};

export default phillips;
