// Doctolib — V2 structure. The page tells the big picture in a few beats, each led by
// a visual and one large statement; the nuance lives in overlays.
//   Problem → Vision (Léa) → Direction tested → Success metric made real (info cards
//   on Home) → Care plan + AI → Brand → System. Overview closes.
// Copy comes from Nick's handoff (WORK WORK/_copy-review/Doctolib), trimmed.
// Assets not yet exported show as gradient placeholders named with the expected file.
import { row, phone, stats } from "./_kit";

const M = "/media/doctolib/";
const NAVY = "#0B2A4E"; // brand navy (buttons, headings) — emphasis colour

// helpers --------------------------------------------------------------------------
const SOFT = "#F5F3F0"; // brand soft tone
const LBLUE = "#D8EAFF"; // brand light blue
const WHITE = "#FFFFFF";
const PH = (file, note, ratio = "16:9") => ({ ph: "doctolib/" + file, note, ratio });
const fullPh = (ratio, file, note, caption) => ({ type: "full", ratio, media: PH(file, note, ratio), ...(caption ? { caption } : null) });
const full = (file, alt, caption) => ({ type: "full", ratio: "16:9", media: { img: M + file, alt }, ...(caption ? { caption } : null) });
const pic = (span, ratio, file, alt, caption) => ({ span: "col-" + span, kind: "media", ratio, media: { img: M + file, alt }, ...(caption ? { caption } : null) });
// prototype recording, whole phone on a brand-colour panel (screens carry their own status bar)
const app = (span, file, bg, caption, ar = "ar-89") => {
  const p = phone(span, M + file, bg, { baked: true, mode: "whole", screenBg: SOFT });
  return { ...p, frame: { ...p.frame, ar }, ...(caption ? { caption } : null) };
};
// three recordings side by side on one full-width panel
const stage = (bg, files, caption) => ({ type: "stage", bg, ratio: "16:9", screenBg: SOFT, phones: files.map((f) => M + f), ...(caption ? { caption } : null) });
// image carousel (designed panels that belong together)
const carousel = (span, ratio, files, caption) => ({ span: "col-" + span, kind: "carousel", ratio, slides: files.map((f) => ({ media: { img: M + f } })), ...(caption ? { caption } : null) });
// info card on its own under a lockup, with white space beside it
const panel = (span, eyebrow, copy, label, detail) => ({ span: "col-" + span, kind: "detail", solo: true, eyebrow, copy, label, cta: !!detail, detail });
// lockup: visuals and their info card in one tightly packed grid (cards wrap onto
// the next line of the same grid, 8px apart, Mouthwash-style)
const lockup = (...cols) => ({ type: "row", tight: true, cols });
// large statement + button that opens an overlay (the overlay carries the eyebrow)
const say = (text, label, detail, muted) => ({ type: "statement", text, ...(muted ? { muted } : null), ...(label ? { cta: { label, detail } } : null) });

const doctolib = {
  slug: "doctolib",
  name: "Doctolib",
  client: "Doctolib, via ustwo",
  year: "2026",
  discipline: "Vision & Product Design",
  role: "Lead Product Designer",
  services: ["Vision", "Product Design", "UX/UI", "Visual Identity", "Design System"],
  tags: ["Product Vision", "AI", "Design System"],
  accent: NAVY,
  cover: { img: "/media/covers/doctolib.webp" },
  grad: ["#0D76F0", "#0a4fa0"],
  hoverImages: [],
  summary: "Health companion · 2026",
  published: true,
  lede: { lead: "Doctolib,", rest: "from booking app to health companion." },

  // overlays ------------------------------------------------------------------------
  details: {
    brief: {
      eyebrow: "The brief",
      heading: "Five objectives, three numbers to move.",
      figures: [
        { value: "2%", to: "20%", name: "Low adoption", label: "AI assistant weekly users, as a share of app weekly users" },
        { value: "8%", to: "20%", name: "Low return use", label: "AI assistant week one retention" },
        { value: "3%", to: "5%", name: "Low use beyond booking", label: "People using it beyond booking, two or more days a week" },
      ],
      body: [
        "Targets for the end of 2026, not results.",
        { title: "What the business needed", items: ["Create value", "Drive AI assistant adoption", "Build a data moat", "Leverage the connection with practitioners", "Elevate the brand"] },
              ],
    },
    lea: {
      eyebrow: "The vision",
      heading: "From a week in Paris to a prototype for the CEO.",
      media: { img: M + "pain-point-shifts.webp", alt: "The vision in three shifts: transactional to conversational, busy to calm, reactive to proactive", ratio: "1600:908" },
      body: [
        "We started with a week in Paris, immersed in Doctolib's business problems and the health landscape. We benchmarked the space, listened to stakeholders, and played back quick vision ideas and mood boards built on what we'd learnt. Three weeks in, that became a prototype of nine journeys and 86 screens for the CEO.",
        { title: "The vision in three shifts", items: ["*Transactional → Conversational.* Ask Doctolib is the way in, not a feature at the edge.", "*Busy → Calm.* The right thing at the right moment.", "*Reactive → Proactive.* Anticipate what matters before people ask."] },
        "*Léa, 34.* Mother of Hugo, 2. She manages care for her whole family, and wants support that informs her judgement, not replaces it.",
        { k: "01", title: "From triage, to booking, to reassurance", copy: "Hugo has a fever. Ask Doctolib reassures Léa and books the right practitioner in the same conversation." },
        { k: "02", title: "Arrive prepared", copy: "A short questionnaire and a suggested discussion guide, so the GP has what they need." },
        { k: "03", title: "Understand what happens next", copy: "A summary in human language, and a care plan that nudges each dose at the right time." },
      ],
    },
    test: {
      eyebrow: "Choosing a direction",
      heading: "The vision came first in every group.",
      media: { img: M + "direction-test.webp", alt: "Direction test screens: profile, booking and Ask Doctolib", ratio: "4:3" },
      figures: [
        { value: "58%", label: "of professionals in France chose it" },
        { value: "49%", label: "of patients in Germany" },
        { value: "41%", label: "of patients in France" },
        { value: "40%", label: "of patients in Italy" },
      ],
      body: [
        "We stretched the vision three ways and ran head to head tests with patients and professionals in France, Italy and Germany.",
        "People chose it for its clarity and uncluttered feel. Trust didn't change with the design: it followed how sensitive the information the AI asked for was. Direction 1 went on to become the brand direction.",
      ],
    },
    quality: {
      eyebrow: "The success metric",
      heading: "Counting quality actions, not daily users.",
      diagram: "quality",
      body: [
        { title: "What we nudge", items: ["*A* · Book the next step: a follow-up or referral, booked and attended.", "*B* · Follow through on a prescription: collected, and ideally taken as prescribed.", "*C* · Complete a plan step: a test booked, a reading logged, a milestone hit."] },
        { title: "What we deliberately don't count", items: ["*D* · No action.", "*E* · Admin outputs like sick notes.", "*F* · Urgent escalation: a safety problem, never engagement."] },
        "The AI assistant is an enabler, not the behaviour we grow.",
      ],
    },
    brand: {
      eyebrow: "Brand",
      heading: "From product vision to brand platform.",
      body: [
        "Doctolib is entering a new era, in how people manage their health and how professionals give care. The brand needed convictions broad enough to guide both: simple, honest and flexible.",
        "A flexible system inspired by scientific and medical language, that turns the complex into clarity. The same language runs from a poster to a care plan.",
      ],
    },
    system: {
      eyebrow: "Design system",
      heading: "One system, with rules the client could sign off.",
      diagram: "system",
      figures: [
        { value: "61", label: "components in Figma and code" },
        { value: "208", label: "component tokens" },
        { value: "42", label: "colour tokens" },
        { value: "0", label: "raw values in the components" },
      ],
      body: [
        "For each component I wrote the rules: what it's for and how to use it, signed off with the client. I set which components to build first, and where combining variants would simplify the library.",
        "One source of truth for tokens, so new modes for breakpoints, colour and B2B are easy to add. The system was translated into code the client could migrate to, with a contract and a story for every component.",
      ],
    },
    role: {
      eyebrow: "My role",
      heading: "Co-lead designer, first week to handover.",
      body: [
        "I co-led design across the whole engagement: the Paris immersion and the vision prototype, the direction tests, and the shift to designing for quality actions.",
        "I led the Home journey and the call on its direction, shaped the AI assistant, created the visual identity that grew into the brand, and wrote the interaction rules for the design system.",
        "I left before the final results, so I don't claim any.",
      ],
    },
  },

  modules: [
    // Hero — showreel built in code (scenes 1–2 so far; more as assets arrive)
    {
      type: "showreel",
      colors: { bg: "#F8F3EE", quad: "#BCDFC8" },
      guide: "Gathering guidance…",
      reel: M + "reel/",
      // versions — previous ones stay available: topRight "arches", ending "wipe"
      topRight: "medication",
      ending: "write",
      script: "figma", // or "traced" (hand-authored centre lines)
      mark: { video: M + "reel/mark.mp4", webm: M + "reel/mark.webm", poster: M + "reel/mark-poster.webp" },
      tiles: [M + "reel/tile-responding.webp", M + "reel/tile-listening.webp", M + "reel/tile-thinking.webp"],
    },

    // 1 · Problem — the three problems named, figures at body scale
    say("Millions of people book on Doctolib, then leave. The brief: turn a booking app into a health companion people come back to. The numbers to move were low adoption, low return use, and low use beyond booking.", "The brief", "brief"),

    // 2 · The vision: the speed, then the three stories
    say("We spent a week in Paris inside Doctolib’s business. Three weeks later, the CEO saw a vision prototype of nine journeys and 86 screens, told through one parent: Léa.", "The vision", "lea"),
    stage(SOFT, ["lea-1-triage-booking.mp4", "lea-2-before.mp4", "post-consultation.mp4"], "Vision · Triage to booking · Arrive prepared · Understand what's next"),

    // 3 · The test
    say("Tested against two alternatives with patients and professionals in three markets, the vision came first in every group, and went on to become the brand.", "The test", "test"),

    // 5 · Home, where the metric shows up first
    lockup(
      {
        span: "col-4",
        kind: "stack",
        items: [
          { kind: "carousel", ratio: "8:9", slides: ["profile-switch.webp", "home-state-01.webp", "home-state-02.webp"].map((f) => ({ media: { img: M + f } })) },
          { kind: "detail", solo: true, copy: "Home leads with what matters today. Appointments surface two days before, so the next action is always clear, and one profile switch lets a parent act for a child.", label: "Dynamic Home" },
        ],
      },
      pic(8, "1800:1497", "hero-screens-tall.webp", "Home, Hugo's appointment and today's activities screens")
    ),

    // 4 · The metric that changed the work — between Home and the info cards that make it measurable
    say(
      "Eight stakeholder interviews narrowed nine journeys to three. Then we asked a harder question: what should a health companion actually make people do?",
      "The success metric",
      "quality",
      "Our answer became the success metric: consultations that end with a care plan action the patient completes in a clinically appropriate window."
    ),

    lockup(
      {
        span: "col-6",
        kind: "infocards",
        bg: SOFT,
        lines: M + "cards/lines.webp",
        frame: [960, 1080],
        order: [0, 2, 1, 3],
        cards: [
          { src: M + "cards/card-1.webp", x: 72, y: 63, w: 342, alt: "Appointment tomorrow, with a health questionnaire to complete" },
          { src: M + "cards/card-2.webp", x: 72, y: 492, w: 342, alt: "Appointment today, with directions" },
          { src: M + "cards/card-3.webp", x: 462, y: 162, w: 342, alt: "Post-consultation summary" },
          { src: M + "cards/card-4.webp", x: 462, y: 551, w: 342, alt: "Prescription pick-up check" },
        ],
      },
      app(6, "home-complete.mp4", LBLUE),
      panel(6, null, "Each card turns a quality action into one tap: arrive prepared, attend, understand what's next, pick up the prescription. The next one always leads Home, and every tap gives us a way to *measure it*.", "Success metric")
    ),

    // 5 · Care plan: brand image beside the care plan screens, then the live activity
    lockup(
      pic(6, "8:9", "brand-01.webp", "Brand: More healthy years in every lifespan, Live Well"),
      carousel(6, "8:9", ["careplan-01.webp", "careplan-02.webp", "careplan-03.webp"]),
      panel(4, null, "The care plan turns a consultation into steps Léa can act on: a summary in plain language, a medicine schedule, and nudges at the right time. Live activities ask for one small update, a dose recorded, and each answer goes back to the doctor, so Doctolib *learns what works*.", "Care plan"),
      pic(8, "16:9", "live-activity.webp", "Lock screen live activity: Louis' final dose, record or snooze")
    ),

    // 6 · AI assistant — a stage like the vision, then the card beside care plan assist
    stage(SOFT, ["ai-response.mp4", "ai-appointment.mp4", "ai-article.mp4"]),
    lockup(
      panel(6, null, "Calm answers with clear escalation: full width, no bubble, and urgent cases escalate plainly. It knows your appointments and care plan, and *suggests articles and next steps* from what's happening in your health right now.", "AI assistant"),
      app(6, "ai-care-plan-assist.mp4", LBLUE)
    ),

    // 7 · Brand
    full("brand-cover.webp", "Doctolib brand: Live Well"),
    say("The visual identity I created for the vision held up when it scaled into a full brand: *simple, honest and flexible*.", "The brand", "brand"),
    full("brand-02.webp", "Brand applications: app onboarding, Live Well, data visualisation, campaign"),

    // 8 · System
    full("ds-components.webp", "Components from the Doctolib design system"),
    say("A new design system aligned to the brand, translated into code the client could migrate to. My part was the rules behind *61 components*.", "How the system worked", "system"),

    // Overview
    {
      type: "prose",
      heading: "Overview",
      body: [
        "ustwo worked with Doctolib to rethink the app for patients, moving it from a place to book and leave towards a companion people return to for their health.",
        "I co-led design from the first week in Paris to the handover: the vision prototype shown to the CEO, the Home journey, the AI assistant, the visual identity that grew into the brand, and the rules behind a 61 component design system.",
      ],
      cta: { label: "My role", detail: "role" },
    },
  ],
};

export default doctolib;
