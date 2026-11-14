import { fullGap, statement, row, gap, text } from "./_kit";

const honda = {
  slug: "honda",
  name: "Honda",
  year: "2018",
  discipline: "Web",
  role: "Product Designer",
  services: ["Product Design", "UX/UI", "Design System"],
  tags: ["Product Design", "Web", "Design System"],
  cover: { grad: ["#6a7883", "#374149"] },
  grad: ["#6a7883", "#374149"],
  hoverImages: [],
  summary: "Website redesign · 2018",
  published: true,
  lede: { lead: "Honda,", rest: "rethinking the website from the modules up." },
  detail: {
    eyebrow: "Approach",
    heading: "Audit, focus, test, govern.",
    body: [
      "We began with an audit of the existing site and a kickoff workshop to agree where a redesign would matter most. That narrowed the work to three page types: Home, Product and Offers.",
      "Prototypes for desktop and mobile were tested with customers, and what held up became a governed set of modules with a shared visual language — so the site could keep growing without drifting.",
    ],
  },
  modules: [
    fullGap("Home", "Home page hero mockup, 16:9. Also needs a home-page cover for the roster (none in Figma yet)."),
    statement("A rethink of Honda's website, focused on the pages that carry the most weight — Home, Product and Offers — and on a module system the team could govern.", "The approach"),
    row(
      gap(8, "16:9", "Product page", "Product page, desktop."),
      text(4, "Focus", "An audit and kickoff workshop narrowed the scope to three page types, prototyped and tested on desktop and mobile.", "Audit & workshop", true)
    ),
    row(gap(6, "4:5", "Mobile", "Mobile prototype in a device frame."), gap(6, "4:5", "Offers", "Offers page inset on a colour ground.")),
    row(gap(12, "16:9", "Module governance", "Design call-out: a module library overview — each module with its rules — would show the systems thinking that outlasts the launch.")),
  ],
  overview: {
    heading: "Overview",
    body: ["A redesign of the Honda website, from audit and workshop through tested prototypes to a governed module system and visual language."],
  },
};

export default honda;
