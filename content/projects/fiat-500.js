import { fullMedia, statement, row, media, text } from "./_kit";

const M = "/media/fiat-500/";

const fiat = {
  slug: "fiat-500",
  name: "Fiat 500",
  year: "2016",
  discipline: "Mobile Web",
  role: "UX/UI Designer",
  services: ["UX/UI", "Mobile Web"],
  tags: ["UX/UI", "Mobile Web"],
  cover: { img: "/media/covers/fiat-500.webp" },
  grad: ["#a35a52", "#5c2a25"],
  hoverImages: [M + "s-03.webp", M + "s-04.webp", M + "s-05.webp"],
  summary: "Mobile web · 2016",
  published: true,
  lede: { lead: "Fiat 500,", rest: "turning desire into test drives on mobile." },
  detail: {
    eyebrow: "Research",
    heading: "Where mobile matters in the journey.",
    body: [
      "We analysed a quantitative study across markets to understand customer behaviour and needs. It showed where mobile web matters in the purchase journey — inspiration and evaluation, confirmation, re-confirmation and positive usage — and what experience could guide customers towards the dealer.",
    ],
  },
  modules: [
    fullMedia("16:10", M + "s-00.webp", "Fiat 500", "Fiat 500 mobile web"),
    statement(
      "Define and develop a mobile web experience for the Fiat 500 family — optimising the purchase journey on mobile to drive awareness of and desire for the 500 models, converting interest into real leads and test drives, with a strong brand experience throughout.",
      "Research"
    ),
    row(
      text(4, "Workshops", "From the research we ran workshops with the client on functionality, interactions and journeys, alongside Fiat’s new CRM strategy. I created a user flow, then sketched high-fidelity wireframes, cross-checking features and journeys against personas from the research.", "User flow", true),
      media(8, "16:10", M + "s-02.webp", "User flow", "User flow and wireframes")
    ),
    row(
      media(6, "4:5", M + "s-01.webp", "Long scroll", "Mobile page", "top"),
      media(6, "4:5", M + "s-05.webp", "My 500", "Customise your 500")
    ),
    fullMedia("16:10", M + "s-03.webp", "Choose your 500", "Choose your 500"),
    fullMedia("16:10", M + "s-04.webp", "Book a test drive", "Book a test drive flow"),
    fullMedia("16:10", M + "s-05.webp", "Customise · My 500", "Customise car – My 500"),
  ],
};

export default fiat;
