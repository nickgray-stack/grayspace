import { fullGap, statement, row, gap, text, carousel, gapSlide } from "./_kit";

const btTv = {
  slug: "bt-tv",
  name: "BT TV",
  year: "2017",
  discipline: "TV & Product",
  role: "Lead Product Designer",
  services: ["Product Design", "TV", "UX"],
  tags: ["Product Design", "TV", "UX"],
  cover: { grad: ["#4a4f86", "#262a4e"] },
  grad: ["#4a4f86", "#262a4e"],
  hoverImages: [],
  summary: "TV platform · 2017",
  published: true,
  lede: { lead: "BT TV,", rest: "one service across every screen." },
  detail: {
    eyebrow: "The question",
    heading: "How could BT TV get more people thinking about the service when choosing what to watch?",
    body: [
      "That question framed the work across the set-top box player, responsive web and native apps. Research set the direction, design sprints tested it quickly, and a prioritisation exercise decided what shipped first.",
      "A second phase extended the service to downloads and purchases, and to more screens — Chromecast, Fire TV, Apple TV and Smart TVs.",
    ],
  },
  modules: [
    fullGap("Set-top box", "Hero: the TV interface in a living-room context or clean TV frame, 16:9."),
    statement("How could BT TV get more people thinking about the service when choosing what to watch? We redesigned the experience across set-top box, web and apps to answer that.", "The question"),
    row(
      gap(8, "16:9", "Player", "Set-top box player UI."),
      text(4, "Process", "Research, design sprints and a prioritisation exercise shaped a first release, with a second phase planned behind it.", "Research & sprints", true)
    ),
    row(
      carousel(5, [
        gapSlide("TV", "The ten-foot experience.", "Set-top box UI crop, 4:5."),
        gapSlide("Web", "Responsive web.", "Web UI crop, 4:5."),
        gapSlide("Mobile", "Native apps.", "App screen, 4:5."),
      ]),
      gap(7, "3:4", "One service, many screens", "Design call-out: a multi-device family shot is the signature image for this project — it shows the same design language holding from TV to phone.")
    ),
    row(gap(12, "16:9", "Phase two", "Downloads, purchases and casting — Chromecast, Fire TV, Apple TV, Smart TVs.")),
  ],
  overview: {
    heading: "Overview",
    body: ["BT TV is BT's television service. As lead product designer I worked across the set-top box player, responsive web and native apps, from research and sprints through to a second phase covering downloads, purchases and more devices."],
  },
};

export default btTv;
