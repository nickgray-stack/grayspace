import { fullMedia, statement, row, media, text, phone } from "./_kit";

const M = "/media/just-eat/";

const justEat = {
  slug: "just-eat",
  name: "Just Eat",
  year: "2019",
  discipline: "Product Design",
  role: "Product Designer",
  services: ["Product Design", "Product Strategy", "UX/UI"],
  tags: ["Product Design", "Product Strategy", "UX/UI"],
  cover: { img: "/media/covers/just-eat.webp" },
  grad: ["#8f8a55", "#514d2c"],
  hoverImages: [M + "s-01.webp", M + "s-03.webp", M + "s-07.webp"],
  summary: "Product vision · 2019",
  published: true,
  lede: { lead: "Just Eat,", rest: "reimagining the app for the future." },
  detail: {
    eyebrow: "Approach",
    heading: "A holistic look at the consumer app.",
    body: [
      "We brought together app data, customer insight into how people behaved, and the drivers that would add the most value. From there we ran workshops to conceptualise, iterating for weeks on a new direction that took a holistic look at the consumer app experience.",
    ],
  },
  modules: [
    fullMedia("16:9", M + "s-00.webp", "Just Eat", "Just Eat"),
    statement(
      "A new product experience and refreshed design direction that captures the ebullient personality of the brand and reimagines it for the future. I joined the team to support strategy and define new initiatives, creating a new user experience and UI for the app.",
      "Approach"
    ),
    row(
      text(4, "Approach", "App data, customer insight and the drivers of value fed weeks of workshops and iteration on a new direction for the whole consumer app.", "Workshops", true),
      media(8, "16:9", M + "s-01.webp", "New direction", "Just Eat app home")
    ),
    row(
      media(8, "16:9", M + "s-02.webp", "Search", "Search and discovery"),
      text(4, "Discovery", "The app serves trusted recommendations and supports the different ways people search for food — taking them to food quickly with dish-level recommendations, and popular cuisines nearby as quick links.", "Search & discovery")
    ),
    row(
      media(6, "16:9", M + "s-03.webp", "Dishes", "Dish-level recommendations"),
      media(6, "16:9", M + "s-04.webp", "Restaurant stories", "Restaurant stories on menu pages")
    ),
    row(
      text(6, "Menus", "Menu pages include restaurant stories, helping partners build a connection with customers while building confidence and trust with relevant tips and reviews.", "Restaurant stories"),
      phone(6, M + "returning.mp4", "#FA0029")
    ),
    fullMedia("16:9", M + "s-05.webp", "Delivery", "Delivery tracking"),
    row(
      media(6, "16:9", M + "s-06.webp", "Account", "Account and rewards"),
      media(6, "16:9", M + "s-07.webp", "Loyalty", "Loyalty tiers")
    ),
    statement(
      "A simple, easy-to-understand loyalty scheme that makes customers feel special and encourages them to return: earn points, get rewarded, and unlock higher-value rewards and VIP perks at higher tiers."
    ),
    fullMedia("16:9", M + "s-08.webp", "Components", "UI components"),
  ],
};

export default justEat;
