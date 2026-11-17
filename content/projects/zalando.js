import { fullMedia, statement, row, media, text } from "./_kit";

const M = "/media/zalando/";

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
  hoverImages: [M + "s-01.webp", M + "s-06.webp", M + "s-08.webp"],
  summary: "Zalando Plus · 2021",
  published: true,
  lede: { lead: "Zalando,", rest: "giving Plus members first access to sales." },
  detail: {
    eyebrow: "Team & role",
    heading: "Leading the Pre-sale product design.",
    body: [
      "I led the product design solution, working alongside a product manager and a technical product lead, and collaborating with another Plus designer at key stages on wider Plus design decisions and UX principles.",
      "My role covered collaboration on the wider product strategy, designing the UI and UX, validation and testing, specifying flows and designs for implementation, and a solution design document reviewed with senior board members.",
    ],
  },
  modules: [
    fullMedia("5:3", M + "s-01.webp", "Plus Pre-sale", "Plus Pre-sale on the Zalando app"),
    statement(
      "Zalando launched Plus’ first non-convenience benefit, Early Access — “Shop it first” — giving members first access to the hottest releases. Plus Pre-sale set out to complement those VIP benefits: exclusive early access to sales, with more products, more sizes and a less stressful way to shop them.",
      "Team & role"
    ),
    row(
      text(4, "The challenge", "When sales went live, everyone had the same stressful rush to find the products and sizes they wanted before they sold out. In interviews and surveys, many members said they didn’t feel treated any differently from standard customers. The challenge was to meet the demand for an exclusive experience — and turn a perception of no rewards into new reasons to be a member.", "Challenge", true),
      media(8, "5:3", M + "s-02.webp", "Catalogue", "Pre-sale filters and catalogue on mobile")
    ),
    row(
      media(7, "16:9", M + "process.mp4", "Understanding the customer", "Research synthesis: understanding the customer"),
      text(5, "Research", "Two earlier tests had validated the proposition. This round expanded our insight into acquiring eligible customers, with two goals: validate placing first-time discounted items in the outlet, and check how clearly Pre-sale information read across the core journey.", "Research goals")
    ),
    fullMedia("free", M + "s-05.webp", "Plus principles", "Plus UX principles mapped across the journey"),
    statement(
      "Testing showed pain points in how eligible customers read Pre-sale at the catalogue stage, and in the price they expected to pay. We reworked the UX copy and page heading to explain more simply how members unlock the best price."
    ),
    row(
      media(6, "5:3", M + "s-06.webp", "Product page", "Pre-sale on the product page"),
      media(6, "5:3", M + "s-10.webp", "Member view", "The Plus member view")
    ),
    fullMedia("free", M + "s-07.webp", "Desktop", "Pre-sale on the desktop product page"),
    fullMedia("16:9", M + "journeys.mp4", "Journeys", "Organic journeys into Pre-sale"),
    row(
      media(6, "5:3", M + "s-08.webp", "Checkout", "Pre-sale checkout"),
      media(6, "5:3", M + "s-09.webp", "Communication", "Banners, newsletter and push across the journey")
    ),
    statement(
      "For both customer cohorts we built a communication strategy across onsite banners, newsletters and push — enhancing the experience for existing Plus members, while growing curiosity among eligible customers. I worked closely with a new UX copywriter to tighten the tone and simplify how we explained the value at key moments."
    ),
  ],
};

export default zalando;
