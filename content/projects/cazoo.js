import { copyGap, full, statement, row, gap, text, carousel, gapSlide, img } from "./_kit";

const cazoo = {
  slug: "cazoo",
  name: "Cazoo",
  year: "2019",
  discipline: "Product Design",
  role: "Product Designer",
  services: ["Product Design", "Service Design", "UX/UI"],
  tags: ["Product Design", "Service Design", "UX/UI"],
  cover: { img: "/media/covers/cazoo.webp" },
  grad: ["#7f8a74", "#49513f"],
  hoverImages: [],
  summary: "Used-car marketplace · 2019",
  published: true,
  lede: { lead: "Cazoo,", rest: "buying a car entirely online." },
  detail: {
    eyebrow: "The journey",
    heading: "Browse, details, purchase, delivery.",
    body: [
      "Cazoo launched to sell used cars entirely online and deliver them within 48 hours. With no forecourt and no salesperson, the product had to do all the reassuring.",
      "We mapped the journey across four stages — Browse, Details, Purchase & Order, and Delivery — and designed against the doubts that surface at each one.",
      "Four principles held the work together: build trust at every step, signpost what happens next, keep a clear hierarchy of information, and let navigation flex around how people actually shop for a car.",
    ],
  },
  modules: [
    full(img("/media/covers/cazoo.webp", "Cazoo"), { label: "Cazoo" }),
    statement("Founded in late 2018, Cazoo set out to make buying a used car as simple as any other online purchase, delivered in 48 hours. We designed the purchase journey and adapted the new brand for digital.", "The journey"),
    row(
      gap(8, "16:9", "Journey map", "Design call-out: a clean journey map across Browse → Details → Purchase & Order → Delivery. This is a service design project, so the map is the hero artefact."),
      text(4, "The challenge", "A car is a considered purchase. Without a test drive, every screen had to answer the question a salesperson would.", "Challenge", true)
    ),
    row(
      carousel(5, [
        gapSlide("Trust", "Reassurance at every step.", "Mobile screen showing trust cues (inspection, guarantee)."),
        gapSlide("Signposting", "Always clear what happens next.", "Mobile screen — order progress."),
        gapSlide("Hierarchy", "The right detail at the right time.", "Mobile screen — car details."),
        gapSlide("Navigation", "Flexible routes through the range.", "Mobile screen — browse and filter."),
      ]),
      gap(7, "3:4", "Car details", "Car details page, tall crop.")
    ),
    row(gap(6, "16:9", "Browse", "Browse results, desktop."), gap(6, "16:9", "Purchase & order", "Checkout flow, desktop or 3-up mobile.")),
    row(gap(12, "16:9", "Delivery", "Delivery scheduling and handover — the moment the promise is kept.")),
    copyGap("launch milestone or early traction figure."),
  ],
  overview: {
    heading: "Overview",
    body: [
      "Cazoo is an online used-car marketplace founded in late 2018, promising delivery to your door within 48 hours.",
      "As product designer I worked on the end-to-end purchase journey and on adapting the brand for digital, guided by principles of trust, signposting, hierarchy and flexible navigation.",
    ],
  },
};

export default cazoo;
