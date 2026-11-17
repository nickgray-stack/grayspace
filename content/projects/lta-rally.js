import { fullMedia, statement, row, media, text, phone } from "./_kit";

const M = "/media/lta-rally/";
const TEAL = "#2BC4AE";

const ltaRally = {
  slug: "lta-rally",
  name: "LTA Rally",
  year: "2019",
  discipline: "Brand & Product",
  role: "Product Designer",
  services: ["Branding", "Design", "Product Design"],
  tags: ["Branding", "Product Design", "Motion"],
  cover: { img: "/media/covers/lta-rally.webp" },
  grad: ["#b08767", "#6e4f38"],
  hoverImages: [M + "s-01.webp", M + "s-02.webp", M + "s-08.webp"],
  summary: "Brand & product · 2019",
  published: true,
  lede: { lead: "LTA Rally,", rest: "bringing lapsed players back to tennis." },
  detail: {
    eyebrow: "Identity",
    heading: "A logo that follows the court.",
    body: [
      "The angle of the italics follows the vanishing point from the logo mark, and a typeface with a taller x-height makes the logo bigger overall and better at small sizes.",
      "In motion, polygons transform to match the LTA master angles, with long, shallow animation curves easing everything to a comfortable stop. Text appears from cuts that match the logo angles, while rotating and scaling graphics create a zooming focus effect.",
    ],
  },
  modules: [
    fullMedia("16:9", M + "s-00.webp", "Rally", "LTA Rally identity"),
    statement(
      "With the LTA, we set out to encourage lapsed players back into the game, move tennis away from its elitist image and increase brand engagement. Coinciding with a rebrand and new products, I joined to design the identity for Rally — a website to book courts and get tips and news about the game.",
      "Identity"
    ),
    row(
      media(6, "16:9", M + "s-01.webp", "Tennis opened up", "Rally home on mobile"),
      media(6, "16:9", M + "s-02.webp", "Court booking", "Court search and booking")
    ),
    row(
      text(4, "Logo", "The italic angle follows the vanishing point from the logo mark, and a taller x-height makes the logo bigger overall and better at small sizes.", "Identity", true),
      media(8, "4:3", M + "s-07.webp", "Logo construction", "Rally logo construction")
    ),
    fullMedia("16:9", M + "s-08.webp", "Lockups", "Rally lockups"),
    row(
      phone(6, M + "motion.mp4", TEAL),
      text(6, "Motion", "Polygons transform to match the LTA master angles, with long, shallow curves easing everything to a comfortable stop. Text appears from cuts that match the logo angles, and rotating, scaling graphics give a zooming focus effect.", "Motion")
    ),
    fullMedia("free", M + "s-04.webp", "Booking", "Rally booking screens"),
    row(
      media(6, "16:9", M + "s-03.webp", "Booking flow", "Booking confirmation flow"),
      media(6, "16:9", M + "s-05.webp", "Palette & type", "Colour palette and typography")
    ),
    fullMedia("16:9", M + "s-06.webp", "Iconography", "Rally iconography"),
  ],
};

export default ltaRally;
