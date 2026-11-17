import { fullMedia, statement, row, media, text } from "./_kit";

const M = "/media/bt-tv/";

const btTv = {
  slug: "bt-tv",
  name: "BT TV",
  year: "2017",
  discipline: "TV & Product",
  role: "Lead Product Designer",
  services: ["Product Design", "TV", "UX"],
  tags: ["Product Design", "TV", "UX"],
  cover: { img: "/media/covers/bt-tv.webp" },
  grad: ["#4a4f86", "#262a4e"],
  hoverImages: [M + "s-01.webp", M + "s-06.webp", M + "s-08.webp"],
  summary: "TV & video on demand · 2017",
  published: true,
  lede: { lead: "BT TV,", rest: "one service across every screen." },
  detail: {
    eyebrow: "Process",
    heading: "Design, prototype, test, repeat.",
    body: [
      "Over several months we ran cycles of designing, prototyping and user testing across platforms and devices, collaborating with the wider team and an external agency.",
      "We reviewed designs with stakeholders, worked closely with engineers as features were built, and iterated after every sprint based on the results of user testing.",
    ],
  },
  modules: [
    fullMedia("16:10", M + "s-00.webp", "BT TV", "BT TV across devices"),
    statement(
      "“How could BT TV get more people thinking about the service when it came to choosing what to watch?” We set out to answer this by reimagining BT’s TV and video on demand service — redesigning the set-top box player, responsive websites and native apps for a more fluid, consistent experience across platforms.",
      "Process"
    ),
    row(
      text(4, "Research", "Analysing the platform, business requirements and competitors, alongside user research and focus groups, surfaced the pain points to fix. We mapped the end-to-end experience into a framework for better content discovery across multiscreen viewing.", "Framework", true),
      media(8, "free", M + "s-01.webp", "Multiscreen", "BT TV on laptop, tablet and phone")
    ),
    row(
      media(6, "4:3", M + "s-04.webp", "Wireframes", "Wireframes across platforms"),
      media(6, "4:3", M + "s-05.webp", "Specification", "Annotated designs")
    ),
    row(
      media(6, "16:10", M + "s-02.webp", "Live channels", "Live channels"),
      media(6, "16:10", M + "s-03.webp", "Playback", "Playback on tablet and phone")
    ),
    statement(
      "We prioritised features by user preference and by how the experience should differ on each platform — from content discovery and playback to linear viewing, including the TV guide and recording linear programmes on the go."
    ),
    row(
      media(6, "16:10", M + "s-06.webp", "TV guide", "TV guide"),
      media(6, "16:10", M + "s-07.webp", "Programme page", "Programme page")
    ),
    fullMedia("free", M + "s-08.webp", "Set-top box", "BT TV on the set-top box"),
    row(
      text(4, "Phase two", "A second phase added downloads and online rental and purchase on every platform, and extended BT TV to Chromecast, Amazon Fire, Apple TV and Smart TVs.", "New platforms"),
      media(8, "16:10", M + "s-09.webp", "Apps", "BT TV apps")
    ),
  ],
};

export default btTv;
