// HIDDEN — not in the roster, grid, prev/next or sitemap, but builds at
// /work/doctolib (noindex) for private review. Copy is DRAFT: Nick is writing the
// final story separately. This version tests the prototype recordings in the
// device frame. Set `hidden: false` to publish.
import { fullMedia, statement, row, tight, text, phone } from "./_kit";

const M = "/media/doctolib/";
const BLUE = "#0D76F0"; // Doctolib blue (sampled from the logo animation)
const WARM = "#F4F2EC"; // app background
const SCREEN = "#F4F2EC";
const app = (span, file, bg) => phone(span, M + file, bg, { baked: true, mode: "whole", screenBg: SCREEN });

const doctolib = {
  slug: "doctolib",
  name: "Doctolib",
  hidden: true,
  year: "2026",
  discipline: "Product & Brand Vision",
  role: "Lead Product Designer",
  agency: "ustwo",
  services: ["Product Vision", "UX Strategy", "Visual Design", "Design System"],
  tags: ["Product Vision", "UX Strategy", "Design System"],
  cover: { img: "/media/covers/doctolib.webp" },
  grad: ["#0D76F0", "#0a4fa0"],
  hoverImages: [],
  summary: "Product & brand vision · 2026",
  published: true,
  lede: { lead: "Doctolib,", rest: "a vision for the next patient app." },
  modules: [
    fullMedia("16:9", "/media/covers/doctolib.webp", "Doctolib", "Doctolib vision"),
    statement(
      "Draft — With ustwo, I worked on Shape: the brand vision and UX strategy for Doctolib’s patient app. A week in Paris kicked it off, and three weeks later we presented a vision prototype to the CEO that went on to shape both the product and the brand."
    ),
    row(app(6, "triage.mp4", BLUE), app(6, "booking.mp4", WARM)),
    row(
      text(6, "Triage, not diagnosis", "Draft — An assistant that helps families understand what’s happening and gets them to the right care, then books it in the same conversation.", "AI orientation"),
      app(6, "ai-response.mp4", BLUE)
    ),
    row(app(6, "post-consultation.mp4", WARM), text(6, "After the appointment", "Draft — A plain-language summary of the consultation, what happens next, and the treatment plan in one place.", "Post-consultation")),
    tight(app(4, "prescription.mp4", BLUE), app(4, "medicine-schedule.mp4", BLUE), app(4, "check-in.mp4", BLUE)),
    row(text(6, "One account, the whole family", "Draft — Switch between family members and see each person’s appointments and care plans.", "Profiles"), app(6, "switch-profile.mp4", WARM)),
  ],
};

export default doctolib;
