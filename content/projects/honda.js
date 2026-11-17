import { fullMedia, statement, row, media, text } from "./_kit";

const M = "/media/honda/";

const honda = {
  slug: "honda",
  name: "Honda",
  year: "2018",
  discipline: "Web",
  role: "Product Designer",
  services: ["Product Design", "UX/UI", "Design System"],
  tags: ["Product Design", "Web", "Design System"],
  cover: { img: "/media/covers/honda.webp" },
  grad: ["#6a7883", "#374149"],
  hoverImages: [M + "s-01.webp", M + "s-03.webp", M + "s-05.webp"],
  summary: "Website · 2018",
  published: true,
  lede: { lead: "Honda,", rest: "reinventing the website around the purchase journey." },
  detail: {
    eyebrow: "Kick-off",
    heading: "Audit, workshop, focus.",
    body: [
      "We compared platform analytics, available research and competitor analysis to audit the site’s weakest points, then prepared high-level designs and games for a kick-off workshop with stakeholders.",
      "The workshop clarified what the business needed from the final designs and modules, the differences between car and motorbike customers, and which information best guides people towards dealerships and test drives.",
    ],
  },
  modules: [
    fullMedia("free", M + "s-01.webp", "Platform", "The Honda website across devices"),
    statement(
      "Reinvent the Honda website by understanding customer needs and the role the site plays along the purchase journey — delivering more relevant content to people faster, with a more consistent experience and design language across the platform.",
      "Kick-off"
    ),
    row(
      text(4, "Focus", "From the workshop we focused on three areas — Home, Product and Offers — reducing drop-off with better navigation and a more joined-up experience that guides people towards booking test drives and visiting dealerships.", "Home, Product, Offers", true),
      media(8, "16:10", M + "s-02.webp", "Wireframes", "Wireframes for key pages")
    ),
    row(
      media(6, "16:10", M + "s-03.webp", "Motorbikes", "Motorbike pages"),
      media(6, "16:10", M + "s-04.webp", "Cars", "Car pages")
    ),
    row(
      media(8, "16:10", M + "s-05.webp", "Product", "Choose from six models"),
      text(4, "Testing", "Clickable prototypes were tested with participants on desktop and mobile, in the context of the whole customer journey. What we learned defined governance for page structure, how each module should be used across markets and departments, and the assets each one needs.", "Prototypes")
    ),
    row(
      media(6, "3:4", M + "s-06.webp", "Home page", "Full home page", "top"),
      text(6, "Visual language", "We revisited the design and UI language across the site, updating colour, type and interaction styles alongside the new modules for a more coherent, contemporary feel.", "Design language")
    ),
  ],
};

export default honda;
