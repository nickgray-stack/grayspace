import { fullGap, statement, row, gap, text, carousel, gapSlide } from "./_kit";

const hl = {
  slug: "hargreaves-lansdown",
  name: "Hargreaves Lansdown",
  year: "2016",
  discipline: "Mobile App",
  role: "Lead Product Designer",
  services: ["Product Design", "UX/UI"],
  tags: ["Product Design", "Mobile", "UX/UI"],
  cover: { grad: ["#3d4f6b", "#1c2738"] },
  grad: ["#3d4f6b", "#1c2738"],
  hoverImages: [],
  summary: "Investing app · 2016",
  published: true,
  lede: { lead: "Hargreaves Lansdown,", rest: "investing made clear on mobile." },
  detail: {
    eyebrow: "Principles",
    heading: "Simplify, relevance, guidance, security.",
    body: [
      "Discovery began with the people using the app. Personas were weighted against one another so that design decisions could be traced back to who they served most.",
      "Four principles came out of it — Simplify, Relevance, Guidance and Security — and were applied across the account overview, the trading flow, and news and watchlists.",
    ],
  },
  modules: [
    fullGap("Account overview", "Hero: 3-up mobile screens on a deep brand ground, 16:9."),
    statement("A redesign of the Hargreaves Lansdown mobile app, built on four principles: simplify, stay relevant, guide, and keep it secure.", "The principles"),
    row(
      carousel(5, [
        gapSlide("Simplify", "Less on screen, more understood.", "Mobile screen — account overview."),
        gapSlide("Relevance", "What matters to this investor, first.", "Mobile screen — personalised view."),
        gapSlide("Guidance", "Help at the point of decision.", "Mobile screen — trading flow."),
        gapSlide("Security", "Confidence without friction.", "Mobile screen — login / confirmation."),
      ]),
      gap(7, "3:4", "Principles in practice", "Design call-out: four principles, four slides — the carousel maps one screen to each, so the principles are shown rather than listed.")
    ),
    row(
      gap(8, "16:9", "Trading flow", "Trading flow, step by step."),
      text(4, "Discovery", "Weighted personas kept decisions tied to the investors they affected most.", "Personas", true)
    ),
    row(gap(6, "16:9", "News", "Account news."), gap(6, "16:9", "Watchlist", "Watchlist.")),
  ],
  overview: {
    heading: "Overview",
    body: ["Hargreaves Lansdown is the UK's largest investment platform for private investors. As lead product designer I worked on its mobile app, from discovery and personas through account overview, trading, news and watchlists."],
  },
};

export default hl;
