import { full, statement, row, gap, text, carousel, gapSlide, img } from "./_kit";

const justEat = {
  slug: "just-eat",
  name: "Just Eat",
  year: "2019",
  discipline: "Product Design",
  role: "Product Designer",
  services: ["Product Design", "Research", "UX/UI"],
  tags: ["Product Design", "Research", "UX/UI"],
  cover: { img: "/media/covers/just-eat.webp" },
  grad: ["#8f8a55", "#514d2c"],
  hoverImages: [],
  summary: "Product vision · 2019",
  published: true,
  lede: { lead: "Just Eat,", rest: "a new product experience from search to doorstep." },
  detail: {
    eyebrow: "Product vision",
    heading: "From finding food to coming back for more.",
    body: [
      "The brief was a new product experience and a refreshed design direction for Just Eat. Research and workshops with the team set the priorities before any screens were drawn.",
      "The work followed the order: search and discovery, restaurant menus brought to life with stories, delivery, and an account and loyalty area built around a points and tier scheme.",
    ],
  },
  modules: [
    full(img("/media/covers/just-eat.webp", "Just Eat"), { label: "Just Eat" }),
    statement("A new product experience and design direction for Just Eat, covering the whole order — discovering food, choosing from a menu, tracking delivery, and being rewarded for coming back.", "The vision"),
    row(
      text(4, "Research", "Research and workshops with the Just Eat team framed the opportunity and set the order of work.", "Research & workshops", true),
      gap(8, "16:9", "Search & discovery", "Search and discovery screens, 3-up mobile on brand colour.")
    ),
    row(
      carousel(5, [
        gapSlide("Search", "Find something to eat, fast.", "Mobile screen — search."),
        gapSlide("Menu", "Restaurant menus with stories.", "Mobile screen — menu and stories."),
        gapSlide("Delivery", "Know where your order is.", "Mobile screen — delivery tracking."),
        gapSlide("Loyalty", "Points and tiers that reward regulars.", "Mobile screen — loyalty."),
      ]),
      gap(7, "3:4", "Restaurant menu", "Design call-out: the journey has four clear beats — a carousel walks through them in order, next to one tall hero of the menu page.")
    ),
    row(gap(12, "16:9", "Prototype", "The prototype in motion (currently a GIF — re-export as video).")),
    row(gap(6, "16:9", "Delivery", "Delivery tracking."), gap(6, "16:9", "Account & loyalty", "Points and tier scheme.")),
  ],
  overview: {
    heading: "Overview",
    body: [
      "Just Eat is one of the world's largest food delivery marketplaces. This project set out a new product experience and a refreshed design direction.",
      "As product designer I worked from research and workshops through search and discovery, restaurant menus and stories, delivery, and account and loyalty.",
    ],
  },
};

export default justEat;
