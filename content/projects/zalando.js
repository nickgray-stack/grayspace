import { copyGap, full, statement, row, gap, text, carousel, gapSlide, img } from "./_kit";

const zalando = {
  slug: "zalando",
  name: "Zalando",
  year: "2021",
  discipline: "Product Design",
  role: "Senior Product Designer",
  services: ["Design", "Product Strategy", "UX/UI"],
  tags: ["Product Design", "Product Strategy", "UX/UI"],
  cover: { img: "/media/covers/zalando.webp" },
  grad: ["#5b6b7d", "#2f3a47"],
  hoverImages: [],
  summary: "Zalando Plus · 2021",
  published: true,
  lede: { lead: "Zalando,", rest: "giving Plus members the first look." },
  detail: {
    eyebrow: "Early Access",
    heading: "Shop it first.",
    body: [
      "Early Access gives Zalando Plus members a head start on newly discounted items before they open to everyone. The benefit only works if members notice it, understand it, and trust that the window is real.",
      "Research focused on two questions: where first-time discounted items should sit within the outlet, and whether members understood the pre-sale information they were shown. The answers shaped both placement and language.",
      "The benefit was then carried by a communication strategy designed per cohort — banners, newsletters and push — so each group heard about Early Access in the place and tone most likely to land.",
    ],
  },
  modules: [
    full(img("/media/covers/zalando.webp", "Zalando Plus Early Access"), { label: "Early Access" }),
    statement("Early Access lets Zalando Plus members shop newly discounted items before anyone else. We designed the benefit end to end — where it lives, how it's explained, and how members hear about it.", "The brief"),
    row(
      gap(8, "16:9", "Outlet placement", "Hero mockup of the outlet with Early Access items in place (desktop or 3-up mobile)."),
      text(4, "The challenge", "A membership benefit is only worth what members understand of it. Early Access had to be visible at the right moment and clear about what ‘first’ meant.", "Challenge", true)
    ),
    row(
      text(5, "Research", "Two goals: find the right place in the outlet for first-time discounted items, and test whether pre-sale information was understood.", "Research goals"),
      carousel(7, [
        gapSlide("Placement", "Where first-time discounted items sit within the outlet.", "Mobile screen — outlet placement variant."),
        gapSlide("Pre-sale", "How the pre-sale window and price are explained.", "Mobile screen — pre-sale information."),
        gapSlide("Member state", "What a Plus member sees versus everyone else.", "Mobile screen — member vs non-member comparison."),
      ])
    ),
    row(
      gap(12, "16:9", "Communication strategy", "Design call-out: the cohort strategy is the differentiator here. One wide graphic laying out banner / newsletter / push per cohort — a simple matrix — would show strategic range, not just screens.")
    ),
    row(
      gap(6, "4:5", "Push", "Push notification in a device frame (DeviceFrame, bleed)."),
      gap(6, "4:5", "Newsletter", "Newsletter design inset on a colour ground — pairs with the device as a campaign row.")
    ),
    copyGap("launch result or adoption figure for Early Access."),
  ],
  overview: {
    heading: "Overview",
    body: [
      "Zalando Plus is the membership programme of Europe's largest online fashion platform. Early Access — ‘Shop it first’ — rewards members with a head start on newly discounted items.",
      "As senior product designer I worked across the challenge definition, research, the outlet experience and the communication strategy that introduced the benefit to each member cohort.",
    ],
  },
};

export default zalando;
