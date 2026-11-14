import { full, statement, row, gap, text, img } from "./_kit";

const ltaRally = {
  slug: "lta-rally",
  name: "LTA Rally",
  year: "2019",
  discipline: "Brand & Product",
  role: "Product Designer",
  services: ["Branding", "Product Design", "Motion"],
  tags: ["Branding", "Product Design", "Motion"],
  cover: { img: "/media/covers/lta-rally.webp" },
  grad: ["#b08767", "#6e4f38"],
  hoverImages: [],
  summary: "Brand & product · 2019",
  published: true,
  lede: { lead: "LTA Rally,", rest: "getting Britain back on court." },
  detail: {
    eyebrow: "Identity",
    heading: "A logo drawn from the court.",
    body: [
      "Rally is the LTA's service for finding and booking a court, with tips to help lapsed players pick up a racket again. It needed an identity that felt lighter and more inviting than a governing body.",
      "The wordmark takes its cue from the game. Its italic angle follows the vanishing point of a court seen from the baseline, and a taller x-height keeps it legible at app-icon size.",
      "Motion extends the same geometry: polygons set at the LTA's master angles, moving on long, shallow easing so the brand feels like a rally rather than a smash.",
    ],
  },
  modules: [
    full(img("/media/covers/lta-rally.webp", "LTA Rally"), { label: "Rally" }),
    statement("Rally helps people find a court, book it and get playing. We created the identity and product for the LTA's push to bring lapsed players back to tennis.", "The identity"),
    row(
      gap(7, "4:3", "Logo construction", "Design call-out: the construction story (italic angle = court vanishing point) is a gift. One diagram showing the court perspective lines overlaid on the wordmark would explain the idea in a glance."),
      text(5, "Logo", "The italic angle follows the vanishing point of a court. A taller x-height keeps the mark clear when it's small.", "Wordmark", true)
    ),
    row(gap(12, "16:9", "Motion", "The motion piece as a looping video (currently a GIF on the old site — re-export as MP4/WebM for quality and weight).")),
    row(
      gap(6, "4:5", "Court booking", "Booking flow in a device frame (DeviceFrame, bleed) on a Rally brand colour."),
      gap(6, "4:5", "Tips", "Tips content inset on a colour ground, or a second device.")
    ),
    row(gap(12, "16:9", "Brand in use", "Identity applied — app icon, social, courtside.")),
  ],
  overview: {
    heading: "Overview",
    body: [
      "The Lawn Tennis Association is the governing body for tennis in Britain. Rally is its consumer service for booking courts and getting back into the game.",
      "As product designer I worked across the Rally identity, its motion language and the booking product.",
    ],
  },
};

export default ltaRally;
