import { slideshow, stats, statement, row, media, text, carousel, slide } from "./_kit";

const M = "/media/channel-4/";
const YELLOW = "#FFE902"; // Channel 4 identity yellow (sampled from the brand boards)
const TEAL = "#00FFC5"; // All 4 UI teal (sampled from the app)

const channel4 = {
  slug: "channel-4",
  name: "Channel 4",
  year: "2021",
  discipline: "Product Design",
  role: "Lead UX Designer",
  agency: "Novoda",
  services: ["UX Strategy", "Product Design", "UX/UI", "Subscriptions"],
  tags: ["Product Design", "UX Strategy", "Multi-platform"],
  cover: { img: "/media/covers/channel-4.webp" },
  grad: ["#2b5a55", "#123330"],
  hoverImages: [M + "hero-mobile.webp", M + "hero-tvos.webp", M + "hero-playback.webp"],
  summary: "All 4+ · 2021",
  published: true,
  lede: { lead: "Channel 4,", rest: "making All 4+ worth signing up for." },
  detail: {
    eyebrow: "The challenge",
    heading: "Prompt where it adds value, not everywhere.",
    body: [
      "All 4+ had launched and the next phase was growing it. I mapped the subscription journey end to end — home, brand hub, landing page, in-app purchase, managing and cancelling — and worked out how each step should behave across five platforms, each with its own rules for payments and accounts.",
      "The questions were practical. Where does an offer belong during playback — after the first episode, or when someone wants the rest of the box set? Once someone subscribes, how do we confirm it and return them to exactly where they started? And when a subscription lapses, what should they see next?",
      "Underneath it all was consistency. The All 4+ mark was appearing at too many sizes, so we set a few simple sizing rules that held from a phone to a TV.",
    ],
  },
  modules: [
    slideshow(
      [
        { img: M + "hero-brand.webp", alt: "Channel 4 identity boards", label: "Brand", panAr: 4000 / 1245, hold: 4.4 },
        { img: M + "hero-web.webp", alt: "All 4 on web with the All 4+ promotion", label: "Web" },
        { img: M + "hero-mobile.webp", alt: "All 4 home and brand hub on Android", label: "iOS & Android" },
        { img: M + "hero-tvos.webp", alt: "All 4 on tvOS", label: "tvOS" },
        { img: M + "hero-playback.webp", alt: "All 4 playback on tablet and mobile", label: "Playback" },
      ],
      { accents: [YELLOW, TEAL], label: "Channel 4 — All 4+ highlights" }
    ),
    stats(
      [
        { value: "2.2 → 4.4", label: "App store rating" },
        { value: "99.4%", label: "Crash free" },
        { value: "10M+", label: "App downloads" },
      ],
      "Part of the wider product and rebrand effort that turned All 4 around."
    ),
    statement(
      "Novoda brought me in to help Channel 4 ramp up a new product experience for All 4 — taking its recent brand work into the product to drive engagement. I led UX across iOS, Android, tablet, web and tvOS, with a strong focus on sign-ups to All 4+: ad-free viewing and early access to new series.",
      "The challenge"
    ),
    row(
      text(4, "The challenge", "Most people come to All 4 expecting it to be free. The job was to find the moments where a subscription genuinely adds value and prompt there, without getting in the way of the free experience. Core metrics were engagement, usage and sign-ups.", "Sign-ups", true),
      media(8, "16:9", M + "subscribe.webp", "Landing page", "All 4+ landing page on tablet and mobile")
    ),
    row(
      carousel(6, [
        slide("Home", "Early access flagged on the hero, without hiding the artwork.", M + "m-home.webp"),
        slide("Brand hub", "The first episode free, the rest of the series one tap away with All 4+.", M + "m-brand-hub.webp"),
        slide("All 4+", "A home for the subscription, with the free trial up front.", M + "m-hub.webp"),
        slide("Go ad free", "An ad-free option sitting alongside play, share and download.", M + "m-film.webp"),
      ]),
      {
        span: "col-6",
        kind: "device",
        label: "Landing page prototype",
        frame: { bg: YELLOW, ar: "ar-portrait", mode: "whole" },
        device: {
          statusBar: "solid",
          screen: { video: M + "paywall.mp4", webm: M + "paywall.webm", poster: M + "paywall-poster.webp", fit: "inset", bg: "#111111" },
        },
      }
    ),
    statement(
      "In testing, a padlock read as a barrier. The Plus mark, drawn from the Channel 4 identity, read as something extra. As one participant put it: “I like the 4+ better than the lock… unfriendly to see a lock there.”"
    ),
    row(
      text(4, "The Plus mark", "The full All 4+ lockup leads on heroes, brand hubs and promos. The Plus on its own marks an action, on tiles and buttons. On TV the Plus shows first and All 4+ is revealed on focus, so browsing stays light.", "Brand into product"),
      media(8, "16:9", M + "hero-tvos.webp", "tvOS", "All 4 on tvOS with All 4+ early access")
    ),
    { type: "full", ratio: "free", label: "Playback · watch more", media: { img: M + "watch-more.webp", alt: "Next-episode countdown and watch more in playback" } },
    statement(
      "One clear signal for premium across five platforms, and sign-up prompts placed where they add value — the hero, the brand hub, the end of an episode. Since the updates, Channel 4 has seen increased engagement and sign-ups to All 4+."
    ),
  ],
};

export default channel4;
