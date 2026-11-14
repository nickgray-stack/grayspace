import { fullGap, statement, row, gap, text } from "./_kit";

const fiat = {
  slug: "fiat-500",
  name: "Fiat 500",
  year: "2016",
  discipline: "Mobile Web",
  role: "UX/UI Designer",
  services: ["UX/UI", "Mobile Web"],
  tags: ["UX/UI", "Mobile Web"],
  cover: { grad: ["#a35a52", "#5c2a25"] },
  grad: ["#a35a52", "#5c2a25"],
  hoverImages: [],
  summary: "Mobile web · 2016",
  published: true,
  lede: { lead: "Fiat 500,", rest: "choosing, customising and booking on mobile." },
  detail: {
    eyebrow: "Journey",
    heading: "From inspiration to the keys.",
    body: [
      "The mobile site for the 500 family was planned against the stages a buyer moves through: inspiration and evaluation, confirmation, re-confirmation, and positive usage.",
      "Three experiences carried it: Choose your 500, a short flow to book a test drive, and My 500, where a customer builds the car they want.",
    ],
  },
  modules: [
    fullGap("Choose your 500", "Hero: mobile screens with the 500 range, 16:9."),
    statement("A mobile web experience for the Fiat 500 family, taking people from first interest to a booked test drive and a car configured their way.", "The journey"),
    row(
      gap(6, "4:5", "Customise · My 500", "Design call-out: the configurator in a device frame — ideally a short video of colours changing; it is the most playful moment in the project."),
      gap(6, "4:5", "Book a test drive", "Test-drive flow inset on a colour ground.")
    ),
    row(
      text(4, "Planning", "Each screen was mapped to a stage of the buying journey, from inspiration to ownership.", "Journey stages", true),
      gap(8, "16:9", "Journey stages", "Journey diagram, 16:9.")
    ),
  ],
  overview: {
    heading: "Overview",
    body: ["Mobile web for the Fiat 500 family, for Fiat Group. As UX/UI designer I worked on Choose your 500, the test-drive booking flow and the My 500 customiser."],
  },
};

export default fiat;
