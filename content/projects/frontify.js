import { fullMedia, statement, row, media, text, phone, framed } from "./_kit";

const M = "/media/frontify/";
const PAPER = "#EFE8E6";

const frontify = {
  slug: "frontify",
  name: "Frontify",
  year: "2020",
  discipline: "Brand & Web",
  role: "Lead Designer",
  agency: "Design Studio",
  services: ["Art Direction", "Branding", "Product Design", "UX/UI"],
  tags: ["Branding", "Web", "Art Direction"],
  cover: { img: "/media/covers/frontify.webp" },
  grad: ["#8a7fa6", "#4b4661"],
  hoverImages: [M + "s-01.webp", M + "s-09.webp", M + "s-12.webp"],
  summary: "Brand & web · 2020",
  published: true,
  lede: { lead: "Frontify,", rest: "building a home for brands." },
  detail: {
    eyebrow: "Discovery",
    heading: "Four needs to design for.",
    body: [
      "I led the initial discovery phase to shape our strategy, running workshops with a dual purpose: to gather insight for the website redesign, and to understand our clients’ perspective and Frontify’s future positioning.",
      "We identified the core needs and pain points that became the foundations of the design approach: simplify the information, tell a more effective story, show people what the product actually does, and use content to bring activity to the site.",
    ],
  },
  modules: [
    fullMedia("16:9", M + "s-12.webp", "Brand", "Frontify brand applied across web, print and out of home"),
    statement(
      "Alongside a new strategic vision and brand refresh, Frontify needed to turn its brand essence — the home for brands — into a digital experience worth noticing. I joined to lead the digital experience and identity, developing the look, feel and positioning of a new website to re-establish Frontify as the leading brand management platform.",
      "Discovery"
    ),
    row(
      text(4, "Discovery", "Workshops with the team and clients surfaced four needs: simplify the information, tell a more effective story, show what the product does, and use content to bring activity to the site.", "Workshops", true),
      media(8, "16:9", M + "workshop.webp", "Workshops", "Discovery workshop output")
    ),
    statement(
      "Insight pointed to a user-centred repositioning: beyond asset management, towards brand management rooted in empathy. The new proposition — “Welcome Everyone” — captured the mission of creating a place where brands can flourish."
    ),
    fullMedia("16:9", M + "s-01.webp", "Welcome Everyone", "Welcome Everyone home page hero"),
    row(
      text(4, "Information architecture", "Interviews with a wide range of stakeholders informed a new information architecture, moving from multiple products to one unified view of key value features, with simpler navigation that reflects what customers need.", "IA"),
      media(8, "16:9", M + "s-03.webp", "Navigation", "Simplified navigation")
    ),
    row(
      media(6, "16:9", M + "s-05.webp", "Modules", "Strong tools, stronger brands module"),
      media(6, "16:9", M + "s-06.webp", "Modules", "Teams centralised module")
    ),
    row(
      text(4, "Modular UX", "A modular page structure gave Frontify a flexible, scalable framework, handed over with a full design system, so the business could grow the site with new functionality while keeping it consistent.", "Design system"),
      media(8, "4:3", M + "s-07.webp", "Asset library", "Where all your assets call home")
    ),
    fullMedia("free", M + "s-02.webp", "Home", "Home page"),
    row(
      media(8, "16:9", M + "s-09.webp", "Interactive demonstration", "Interactive product demonstration"),
      text(4, "Interactive demonstration", "An interactive product tour organises Frontify’s solutions by application and function. It became a key part of onboarding — engaging clients, prompting them to share their business needs, and setting up the sales conversation that follows.", "Product tour")
    ),
    row(
      media(6, "16:9", M + "s-10.webp", "Demo", "Coordinate your teams step of the demo"),
      media(6, "16:9", M + "s-11.webp", "Demo", "Work more easily with everyone")
    ),
    row(
      phone(6, M + "m-demo.webp", PAPER, { baked: true }),
      framed(6, M + "brand-builders.webp", PAPER, "16:9", "Welcome brand builders")
    ),
    statement(
      "The home page brings together the problems Frontify solves — use cases, how companies benefit, life at Frontify and its mission around community — with clear signposts to actions that show the product’s capabilities in a tangible way."
    ),
  ],
};

export default frontify;
