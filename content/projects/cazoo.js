import { fullMedia, statement, row, media, text, phone } from "./_kit";

const M = "/media/cazoo/";
const ORANGE = "#E8533E";

const cazoo = {
  slug: "cazoo",
  name: "Cazoo",
  year: "2019",
  discipline: "Product Design",
  role: "Product Designer",
  services: ["Design", "Service Design", "UI", "UX"],
  tags: ["Product Design", "Service Design", "UX/UI"],
  cover: { img: "/media/covers/cazoo.webp" },
  grad: ["#7f8a74", "#49513f"],
  hoverImages: [M + "s-00.webp", M + "s-08.webp", M + "s-10.webp"],
  summary: "Used-car marketplace · 2019",
  published: true,
  lede: { lead: "Cazoo,", rest: "making buying a used car simpler." },
  detail: {
    eyebrow: "Discovery",
    heading: "Browse, details, purchase, delivery.",
    body: [
      "We started by understanding customer needs and motivations, gathering insights that became hypotheses to test and validate as discovery continued.",
      "Service journey mapping set out what mattered when designing the core pages of the site: Browse, Details, Purchase & Order, and Delivery.",
    ],
  },
  modules: [
    fullMedia("4:3", M + "s-00.webp", "Search", "Cazoo search results with filters"),
    statement(
      "Cazoo is a used-car marketplace, founded in late 2018, that sells cars entirely online with home delivery in 48 hours. I joined to help define the purchase journey, and to translate brand guidelines designed for print into a digital space.",
      "Discovery"
    ),
    row(
      text(4, "Discovery", "Customer needs and motivations became hypotheses we tested as we went. Service journey mapping shaped the core pages: Browse, Details, Purchase & Order, and Delivery.", "Journey mapping", true),
      media(8, "free", M + "s-08.webp", "Car details", "Car detail page variants")
    ),
    row(
      media(6, "3:4", M + "s-01.webp", "Home", "Home page", "top"),
      media(6, "3:4", M + "s-03.webp", "Details", "Car details page", "top")
    ),
    statement(
      "Values from research became our design principles as we developed the UI language and design system. Trust came first: clear signposting, a relatable hierarchy of details and flexible navigation, so people could quickly learn where the information they cared about lived."
    ),
    row(
      media(6, "3:4", M + "s-02.webp", "Browse", "Search results page", "top"),
      media(6, "3:4", M + "s-06.webp", "Delivery", "Delivery scheduling", "top")
    ),
    row(
      media(6, "1:1", M + "s-05.webp", "Purchase & order", "Purchase and order", "top"),
      media(6, "1:1", M + "s-07.webp", "Similar cars", "Popular brands and similar cars", "top")
    ),
    row(
      phone(6, M + "m-results.webp", ORANGE),
      media(6, "4:5", M + "inspection.webp", "Photography", "Vehicle inspection photography")
    ),
    row(
      media(6, "free", M + "s-09.webp", "Interior view", "360 interior view"),
      media(6, "free", M + "s-10.webp", "Mobile", "Cazoo on mobile")
    ),
    row(
      text(4, "Print to digital", "The brand was designed for print. We translated it for screens: orange for the logo and calls to action, indigo for tags and secondary buttons, celadon for panels and icons, with Archia for type.", "Brand"),
      media(8, "free", M + "s-11.webp", "Colour", "Digital colour system")
    ),
    fullMedia("free", M + "s-12.webp", "Type & icons", "Typography and iconography"),
  ],
};

export default cazoo;
