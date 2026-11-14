import { copyGap, full, statement, row, tight, gap, text, carousel, gapSlide, img } from "./_kit";

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
  hoverImages: [],
  summary: "Brand & web · 2020",
  published: true,
  lede: { lead: "Frontify,", rest: "building the home for brands." },
  detail: {
    eyebrow: "Repositioning",
    heading: "Welcome everyone.",
    body: [
      "Frontify asked for a website that could carry a bigger idea: the home for brands. Discovery surfaced four needs the site had to meet, and showed that the product was being described as a tool for brand managers when it was used by everyone who touches a brand.",
      "‘Welcome Everyone’ became the repositioning. It opened the story up to designers, developers, marketers and partners, and gave the information architecture a clear job — get each of them to their part of the platform quickly.",
      "The site was built as a modular system so Frontify's team could compose new pages without design support, with an interactive demonstration on the home page that shows the product instead of describing it.",
    ],
  },
  modules: [
    full(img("/media/covers/frontify.webp", "Frontify website"), { label: "Home page" }),
    statement("Frontify is where brands live — guidelines, assets and templates in one place. With Design Studio, we repositioned the company and rebuilt its website around a simple invitation: Welcome Everyone.", "The ask"),
    row(
      text(4, "Discovery", "Four needs came out of discovery and set the brief for the site — from telling a clearer story to showing the product at work.", "Discovery", true),
      gap(8, "16:9", "Repositioning", "‘Welcome Everyone’ brand moment — campaign visual or hero lockup, 16:9.")
    ),
    tight(
      gap(7, "4:3", "Information architecture", "Design call-out: an IA diagram redrawn in the brand style (not a workshop photo) shows the thinking behind the modular system and gives this page a strategy beat between the visual ones."),
      text(5, "Modular UX", "A kit of modules that lets Frontify's own team build pages without design support — consistent where it counts, flexible where it helps.", "System")
    ),
    row(
      carousel(5, [
        gapSlide("Hero", "Modules designed to be combined, not templated.", "Module crop 4:5 — hero."),
        gapSlide("Feature", "One structure, many stories.", "Module crop 4:5 — feature block."),
        gapSlide("Proof", "Customer evidence, built in.", "Module crop 4:5 — customer proof."),
      ]),
      gap(7, "3:4", "Home page", "Full home page scroll, tall crop 3:4.")
    ),
    row(
      gap(12, "16:9", "Interactive demonstration", "Design call-out: the interactive demo is the centrepiece and should move. A 10–15s loop of the demo in use (16:9) belongs here as a video.")
    ),
    copyGap("launch result, or a line from Frontify on what the new site changed."),
  ],
  overview: {
    heading: "Overview",
    body: [
      "Frontify is a brand management platform used by companies to keep guidelines, assets and templates in one place. The brief was to make its website the best expression of that idea.",
      "As lead designer at Design Studio I worked from discovery through repositioning, information architecture, a modular UX system, the home page and an interactive product demonstration.",
    ],
  },
};

export default frontify;
