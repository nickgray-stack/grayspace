// Doctolib — V1 of the structure on the real site, from Nick's handoff
// (WORK WORK/_copy-review/Doctolib). Copy is his, close to final; layout is a
// starting point. Assets not yet exported show as gradient placeholders with the
// expected file name (media: { ph }). Tags tying screens to the metric (A/B/C/F)
// are captions below visuals.
import { row, text, phone } from "./_kit";

const M = "/media/doctolib/";
const BLUE = "#0D76F0"; // Doctolib blue
const WARM = "#F4F2EC"; // app background
const ph = (span, ratio, file, note, caption) => ({ span: "col-" + span, kind: "media", ratio, media: { ph: "doctolib/" + file, note }, ...(caption ? { caption } : null) });
const fullPh = (ratio, file, note, caption) => ({ type: "full", ratio, media: { ph: "doctolib/" + file, note }, ...(caption ? { caption } : null) });
// one prototype recording (screens have their own status bar) — whole phone on a colour panel
const app = (span, file, bg, caption) => ({ ...phone(span, M + file, bg, { baked: true, mode: "whole", screenBg: WARM }), ...(caption ? { caption } : null) });
const stage = (bg, files, caption) => ({ type: "stage", bg, ratio: "16:9", screenBg: WARM, phones: files.map((f) => M + f), ...(caption ? { caption } : null) });
const journey = (span, n, title, pain, designed) => ({ span: "col-" + span, kind: "journey", n, title, pain, designed });

const doctolib = {
  slug: "doctolib",
  name: "Doctolib",
  client: "Doctolib, via ustwo",
  year: "2026",
  discipline: "Vision & Product Design",
  role: "Lead Product Designer",
  services: ["Vision", "Product Design", "UX/UI", "Visual Identity", "Design System"],
  tags: ["Product Vision", "AI", "Design System"],
  accent: BLUE,
  cover: { img: "/media/covers/doctolib.webp" },
  grad: ["#0D76F0", "#0a4fa0"],
  hoverImages: [],
  summary: "Health companion · 2026",
  published: true,
  lede: { lead: "Doctolib,", rest: "from booking app to health companion." },
  details: {
    process: {
      eyebrow: "How the project ran",
      heading: "From a three week vision to a system in code.",
      body: [
        "*Boost · the vision, 3 weeks.* A week in Paris immersed in the business and the health landscape, benchmarking and stakeholder conversations, then mood boards and a vision prototype for the CEO.",
        "*Shape · 10 weeks.* Direction testing in three markets, stakeholder interviews, the quality action metric, and three journeys taken to detailed UX and UI, with product requirements written alongside.",
        "*Brand.* The vision's visual identity scaled into a brand platform and playbook.",
        "*System and handover.* A new design system, translated into code the client could migrate to, then handed over through deep dives, demos and documentation.",
      ],
    },
    rules: {
      eyebrow: "Design system",
      heading: "One system, with rules the client could sign off.",
      body: [
        "*Rules.* For each component I wrote the interaction rules and logic: what it's for and how to use it, and presented them for sign off with the client.",
        "*Priorities.* I showed the client's design system lead which components to build first, and how combining variants could simplify the library before each master component was made.",
        "*Scale.* We iterated and documented components so each one worked across many cases.",
        "*Into code.* The system was translated into code the client could migrate to, built from what we made in Claude: tokens, contracts and stories for every component.",
        "I also rebuilt Booking on the new components as a stress test. It's a reskin that still needs iteration, not a shipped redesign.",
      ],
    },
    role: {
      eyebrow: "My role",
      heading: "Co-lead designer, first week to handover.",
      body: [
        "I co-led design across the whole engagement: the Paris immersion and the vision prototype, the direction tests, and the shift to designing for quality actions.",
        "I led the Home journey and the call on its direction, shaped the AI assistant, created the visual identity that grew into the brand, and wrote the interaction rules for the design system.",
      ],
    },
  },
  modules: [
    // 1 · Hero
    stage(BLUE, ["ai-appointment.mp4", "switch-profile.mp4", "care-complete.mp4"], "Hero · Home, switching from Léa to Hugo"),

    // 2 · The problem
    { type: "statement", kicker: "The problem", text: "Millions of people use Doctolib to book an appointment, then leave. The brief: turn a transactional booking app into a health companion people return to." },
    {
      type: "targets",
      items: [
        { eyebrow: "Low adoption", from: "2%", to: "20%", sub: "AI assistant weekly users, as a share of app weekly users" },
        { eyebrow: "Low return use", from: "8%", to: "20%", sub: "AI assistant week one retention" },
        { eyebrow: "Low use beyond booking", from: "3%", to: "5%", sub: "Health companion power users: non booking use on 2 or more days a week" },
      ],
      objectives: ["Create value", "Drive AI assistant adoption", "Build a data moat", "Leverage the HCP connection", "Elevate the brand"],
      note: "The five business objectives, and the KPIs that grounded our thinking. Today against the target for the end of 2026: targets, not results.",
    },

    // 3 · Phase 1 · Boost
    {
      type: "statement",
      phase: "Phase 1 · Boost · 3 weeks",
      kicker: "From Paris to a vision",
      text: "We started with a week in Paris, immersed in Doctolib's business problems and the health landscape. We benchmarked the space, listened to stakeholders, and played back quick vision ideas and mood boards built on what we'd learnt. Three weeks in, that became a prototype of nine journeys and 86 screens for the CEO.",
      cta: { label: "How the project ran", detail: "process" },
    },
    row(
      ph(8, "16:9", "vision-prototype.mp4", "Vision prototype — the 86 screens / nine journeys as one overview (grid or reel)"),
      { span: "col-4", kind: "detail", eyebrow: "Shown to the CEO", copy: "A rapid prototype of early thinking: some old ideas, some new, brought to life around engagement loops. Not bulletproof flows, and not yet tested. The reaction was positive, and it showed us where to push next.", label: "86 screens · nine journeys · three weeks" }
    ),

    // 4 · Three shifts
    { type: "statement", kicker: "The vision in three shifts", text: "We looked at journeys, not surfaces. Each one moved the experience the same way." },
    {
      type: "shifts",
      items: [
        { from: "Transactional", to: "Conversational", copy: "Ask Doctolib is the way in, not a feature at the edge." },
        { from: "Busy", to: "Calm", copy: "Room to breathe. The right thing at the right moment." },
        { from: "Reactive", to: "Proactive", copy: "Anticipate what matters before people have to ask." },
      ],
    },

    // 5 · Meet Léa + three journeys
    { type: "statement", kicker: "Meet Léa", text: "Through one person we told three stories, each solving a real pain point for her and a real problem for the business: from a worried question to a booked appointment, a prepared consultation, and a treatment she understands." },
    {
      type: "persona",
      eyebrow: "Persona · family health manager",
      name: "Léa, 34",
      initial: "L",
      bio: "Mother of Hugo, 2. She books and manages care for her whole family: her son, her partner and her mother. Organised and proactive, yet healthcare still feels opaque.",
      quote: "“She wants support that informs her judgement, not replaces it.”",
    },
    row(
      app(6, "lea-1-triage-booking.mp4", BLUE),
      journey(6, "01", "From triage, to booking, to reassurance.", "Hugo has a fever. Léa doesn't know if it's serious, who to see, or how the pathway works.", "Ask Doctolib understands the need, reassures her, and books the right practitioner in the same conversation.")
    ),
    row(
      journey(6, "02", "Arrive prepared.", "Parents forget what they meant to raise, and past results or medication changes never surface. They leave without covering everything.", "Intelligence threaded through the appointment: a short questionnaire and a suggested discussion guide, so the GP has what they need."),
      app(6, "lea-2-before.mp4", WARM)
    ),
    row(
      app(6, "post-consultation.mp4", BLUE),
      journey(6, "03", "Understand what happens next.", "Summaries mix observations and jargon. No plain guidance on dosing or side effects, and no way to tell what's normal.", "A summary in human language, an assistant that knows the diagnosis, and a care plan that nudges each dose at the right time.")
    ),

    // 6 · Early principles
    {
      type: "pull",
      text: "A companion, not a transaction.",
      items: [
        { title: "One Doctolib", copy: "One brand for people and professionals." },
        { title: "Room to breathe", copy: "Show restraint, reveal the right thing at the right moment." },
        { title: "Draw the focus", copy: "Make the next step obvious." },
        { title: "Show that we care", copy: "Learn each person's rhythms, so it feels like being known." },
        { title: "Connect people and professionals", copy: "Make every interaction better on both sides." },
      ],
      note: "The early principles we wrote with the vision, and kept designing to.",
    },

    // 7 · Phase 2 · Shape
    {
      type: "statement",
      phase: "Phase 2 · Shape · 10 weeks",
      kicker: "Choosing a direction",
      text: "We stretched the vision three ways, then asked patients and professionals in France, Italy and Germany which felt most like a health companion they'd trust. My original vision came first in every group.",
    },
    row(ph(4, "4:5", "direction-1.jpg", "Direction 1 · the vision"), ph(4, "4:5", "direction-2.jpg", "Direction 2"), ph(4, "4:5", "direction-3.jpg", "Direction 3")),
    {
      type: "bars",
      eyebrow: "Share preferring each direction · Maze test, head to head",
      series: [{ name: "Direction 1", color: BLUE }, { name: "Direction 2", color: "#8F8F8A" }, { name: "Direction 3", color: "#B8B5AD" }],
      highlight: 0,
      max: 60,
      unit: "%",
      groups: [
        { label: "Patients, France", values: [40.8, 25.9, 33.3] },
        { label: "Patients, Italy", values: [40.0, 27.6, 32.4] },
        { label: "Patients, Germany", values: [48.8, 25.2, 26.0] },
        { label: "Professionals, France", values: [58.3, 16.7, 25.0] },
      ],
      caption: "Direction 1 is the vision. People chose it for clarity and an uncluttered feel. Trust didn't vary by design: it followed how sensitive the information the AI asked for was. Direction 1 went on to become the brand direction.",
    },

    // 8 · The metric that changed the work
    { type: "statement", kicker: "The metric that changed the work", text: "Eight stakeholder interviews narrowed nine journeys to three. Then we asked a harder question: what should a health companion actually make people do?" },
    {
      type: "sentence",
      eyebrow: "A quality action",
      colors: [BLUE, "#E8673F", "#2B9A66", "#D99A1E"],
      parts: [
        "The share of ",
        { n: 1, text: "consultations" },
        " that end with ",
        { n: 2, text: "an assigned care plan action" },
        ", where ",
        { n: 3, text: "the patient completes that action" },
        " ",
        { n: 4, text: "within a clinically appropriate window" },
        ".",
      ],
      notes: [
        { title: "Only consultations with an action", copy: "We start where a practitioner has defined a next step." },
        { title: "An assigned care plan action", copy: "This strips out no-shows and no actions, and focuses on what the practitioner asked for." },
        { title: "The patient completes it", copy: "Every action needs a way to record it, even a tick: “I've picked up the prescription.”" },
        { title: "In a clinically appropriate window", copy: "The open question: a fluid timeframe, or a first action within 3 days?" },
      ],
    },
    {
      type: "lists",
      cols: [
        {
          title: "What we nudge",
          items: [
            { k: "A", title: "Book the next step", copy: "A follow-up or referral, booked and attended." },
            { k: "B", title: "Follow through on a prescription", copy: "Collected, and ideally taken as prescribed." },
            { k: "C", title: "Complete a plan step", copy: "A test booked, a reading logged, a milestone hit." },
          ],
        },
        {
          title: "What we deliberately don't count",
          muted: true,
          items: [
            { k: "D", title: "No action", copy: "The consultation closed with nothing assigned." },
            { k: "E", title: "Admin outputs", copy: "Sick notes and certificates. Common, but not behaviour to change." },
            { k: "F", title: "Urgent escalation", copy: "Never optimised as engagement. It's a safety problem, not a habit problem." },
          ],
        },
      ],
    },
    {
      type: "loop",
      text: "The AI assistant is an *enabler*, not the behaviour we grow. Careful prompts and windows into the assistant are how the product nudges the patient to complete the next action.",
      steps: [
        { title: "Need", copy: "“What do I need to do for my health right now?”" },
        { title: "Prompt", copy: "Home ranks by relevance. The assistant is one tap away." },
        { title: "Quality action", copy: "Take the dose. Book the referral. Log the reading." },
        { title: "Measure", copy: "Success counted in quality actions, not daily users." },
      ],
      note: "Each completed action shapes the next Home: reminders, check-ins and follow-ups close the loop.",
    },

    // 9 · Three journeys, designed for action
    { type: "statement", kicker: "Three journeys, designed for action", text: "Home, the care plan and the AI assistant, taken from vision to detailed UX and UI. Booking was reskinned on the same system as a stress test." },
    row(
      app(5, "home-complete.mp4", WARM, "Home"),
      { span: "col-7", kind: "stack", items: [
        { kind: "media", ratio: "16:9", media: { ph: "doctolib/home-directions.jpg", note: "Three Home directions side by side" }, caption: "Three directions · B chosen" },
        { kind: "detail", eyebrow: "Home", copy: "Leads with what matters today, ordered by relevance rather than feature. Urgent items for another family member rise into the hero, and one profile switch lets a parent act for a child. I led Home and made the call on Direction B.", label: "Direction B" },
      ] }
    ),
    stage(BLUE, ["prescription.mp4", "medicine-schedule.mp4", "check-in.mp4"], "B · Prescription follow-through · Care plan"),
    row(
      text(4, "Care plan", "Where the quality action lives. Every step a practitioner sets becomes something to tick off, with a nudge at the right time and a summary in plain language.", "Care plan"),
      ph(4, "4:5", "care-plan.jpg", "Care plan screen", "B · Prescription follow-through · Care plan"),
      ph(4, "4:5", "consultation-summary.jpg", "Consultation summary screen", "A + C · What happens next · Consultation summary")
    ),
    row(
      app(6, "ai-response.mp4", BLUE, "AI health assistant"),
      { span: "col-6", kind: "stack", items: [
        { kind: "detail", eyebrow: "AI health assistant", copy: "Calm answers with clear escalation. Answers run full width with no bubble, bold never marks a claim or a number, and urgent cases escalate plainly instead of keeping people chatting.", label: "Assistant" },
        { kind: "media", ratio: "16:9", media: { ph: "doctolib/ai-fever-answer.jpg + ai-urgent-escalation.jpg", note: "A fever answer, and an urgent escalation" }, caption: "A fever answer · F · Escalate, don't engage" },
      ] }
    ),

    // 10 · Phase 3 · Brand
    { type: "statement", phase: "Phase 3 · Brand", kicker: "A brand platform designed to grow", text: "The visual identity we created for the product vision held up when it scaled into a full brand. Doctolib is entering a new era, in how people manage their health and how professionals give care. The brand needed convictions broad enough to guide both: simple, honest and flexible." },
    { type: "statement", kicker: "Brand purpose · working draft", text: "We're honing the art of clinical science to help people and practitioners create *more healthy years in every life*, through our presence making action simple." },
    { type: "full", ratio: "16:9", media: { ph: "doctolib/brand-layout.jpg", note: "The “Live Well” grid — a flexible layout system" }, caption: "A flexible layout system" },
    row(
      ph(8, "16:9", "brand-dataviz.jpg", "Intricate, clear data visualisation", "Intricate, clear data visualisation"),
      text(4, "The route", "A flexible system inspired by scientific and medical language, that turns the complex into clarity. The same language runs from a poster to a care plan.", "Brand")
    ),

    // 11 · Phase 4 · System and handover
    { type: "statement", phase: "Phase 4 · System and handover", kicker: "A system that scales", text: "While the journeys were designed, we built a new foundational design system aligned to the brand, then translated it into code the client could migrate to. My part was the rules: what each component is for and how to use it, signed off with the client.", cta: { label: "How the rules worked", detail: "rules" } },
    { type: "full", ratio: "16:9", media: { ph: "doctolib/ds-components.jpg", note: "The component library" }, caption: "The component library" },
    { type: "stats", items: [
      { value: "61", label: "components in Figma and code, each with a contract, a story and a Figma master" },
      { value: "208", label: "component tokens" },
      { value: "42", label: "colour tokens" },
      { value: "0", label: "raw values in the components" },
    ] },
    { type: "system", eyebrow: "A scalable system", points: [
      "One source of truth for tokens. New modes for breakpoints, colour and B2B are easy to add.",
      "A B2C library that sets the foundation for B2B. A clean slate that's easier to onboard designers and ship to code.",
      "Skills to move swiftly between Figma and code.",
    ] },

    // 12 · Where it stands, Overview, Appendix
    {
      type: "ladder",
      title: "Where it stands",
      items: [
        { k: "Adopted", copy: "The vision carried into Shape and Brand, and Direction 1 became the brand direction." },
        { k: "Validated", copy: "Direction 1 led the head to head test in every group, across three markets." },
        { k: "Built", copy: "61 components in Figma and code, with zero raw values." },
        { k: "Handed over", copy: "Deep dives, demos, recordings and handover documentation for the client's teams." },
        { k: "In flight", copy: "The AI assistant, the Italy tests and the brand playbook, when I left.", open: true },
      ],
      note: "I left before the final results, so I don't claim any. If I did it again, I'd test Booking properly and bring the system rules to the client earlier.",
    },
    {
      type: "prose",
      heading: "Overview",
      body: [
        "ustwo worked with Doctolib to rethink the app for patients, moving it from a place to book and leave towards a companion people return to for their health.",
        "I co-led design from the first week in Paris to the handover: the vision prototype shown to the CEO, the Home journey, the AI assistant, the visual identity that grew into the brand, and the rules behind a 61 component design system the client could migrate to.",
      ],
      cta: { label: "My role", detail: "role" },
    },
    { type: "statement", phase: "Appendix · a separate market", text: "Italy was a separate two week sprint on search and profile. Italy leaked at every step against France and Germany, and about 60% of people who viewed a profile never started a booking." },
    {
      type: "bars",
      eyebrow: "Share of searches reaching each step",
      series: [{ name: "Italy", color: BLUE }, { name: "France", color: "#8F8F8A" }, { name: "Germany", color: "#B8B5AD" }],
      highlight: 0,
      max: 80,
      unit: "%",
      groups: [
        { label: "A profile", values: [36, 76, 64] },
        { label: "A started booking", values: [14.5, 63, 52] },
        { label: "A confirmed booking", values: [4.1, 36, 22] },
      ],
      caption: "I presented the research and proposed a sticky booking button, freeing the top of the profile for reviews, expertise and trust signals. The team agreed to redesign the hero around trust.",
    },
    row(ph(6, "4:5", "italy-profile-hero.jpg", "Profile hero · sticky booking button", "Profile hero · sticky booking button")),
  ],
};

export default doctolib;
