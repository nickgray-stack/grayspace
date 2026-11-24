import { fullMedia, statement, row, media, text } from "./_kit";

const M = "/media/hargreaves-lansdown/";

const hl = {
  slug: "hargreaves-lansdown",
  name: "Hargreaves Lansdown",
  year: "2016",
  discipline: "Mobile App",
  role: "Lead Product Designer",
  services: ["Product Design", "UX/UI"],
  tags: ["Product Design", "Mobile", "UX/UI"],
  cover: { img: "/media/covers/hargreaves-lansdown.webp" },
  grad: ["#3d4f6b", "#1c2738"],
  hoverImages: [M + "s-07.webp", M + "s-08.webp", M + "s-09.webp"],
  summary: "Investing app · 2016",
  published: true,
  onRequest: true, // listed on Work; page shows "available upon request"
  lede: { lead: "Hargreaves Lansdown,", rest: "demystifying investing on mobile." },
  detail: {
    eyebrow: "Discovery",
    heading: "Weighting what matters.",
    body: [
      "Discovery set out to understand the competing forces around customers’ expectations, needs and pain points, and the new market landscape.",
      "After interviewing stakeholders, employees and existing customers, we built a spreadsheet of key patterns, insights and technology opportunities mapped against each persona, using a weighting score to prioritise features and use cases.",
    ],
  },
  modules: [
    fullMedia("16:10", M + "s-00.webp", "Mobile app", "Hargreaves Lansdown mobile app"),
    statement(
      "Create a leading mobile experience that supports Hargreaves Lansdown’s trusted reputation — understanding how the way people manage their money has changed, and demystifying trading for HL customers with a flexible system for investing.",
      "Discovery"
    ),
    row(
      text(4, "Discovery", "Interviews with stakeholders, employees and customers fed a spreadsheet of patterns, insights and opportunities mapped against each persona, with a weighting score to prioritise features and use cases.", "Personas", true),
      media(8, "16:10", M + "s-03.webp", "Weighting", "Persona weighting spreadsheet")
    ),
    fullMedia("free", M + "s-02.webp", "Research", "Research wall"),
    statement("Web and app analysis, and learning the trading process and its nuances, defined four principles for the new experience: Simplify, Relevance, Guidance and Security."),
    row(
      media(6, "16:10", M + "s-01.webp", "Fact sheets", "Fund and share fact sheets"),
      text(6, "Fact sheets", "Alongside the global experience — login, account, trading, navigation, news and search — I focused on fact sheet pages for funds and shares, reviewing every piece of data to set a hierarchy based on relevance to the customer, with visual representations for insight.", "Data hierarchy")
    ),
    fullMedia("16:10", M + "s-04.webp", "Flows", "Trading flow logic"),
    fullMedia("free", M + "s-06.webp", "Cell structure", "Cell structure"),
    fullMedia("16:10", M + "s-07.webp", "Account overview", "Account overview"),
    fullMedia("16:10", M + "s-08.webp", "Trading flow", "Trading flow"),
    fullMedia("16:10", M + "s-09.webp", "Account · news · watchlist", "Account, news and watchlist"),
  ],
};

export default hl;
