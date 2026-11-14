import { full, statement, row, tight, media, gap, text, carousel, slide, gapSlide, stack, phone, framed, img } from "./_kit";

const M = "/media/christies/";
const GROUND = "#EFECE6"; // warm paper ground for device / inset frames

const christies = {
  slug: "christies",
  name: "Christie's",
  year: "2024",
  period: "2022–2024",
  discipline: "Search & Discovery",
  role: "Lead Designer",
  services: ["Art Direction", "Interaction Design", "Product Design", "Product Strategy", "UX/UI"],
  tags: ["Product Design", "Search & Discovery", "Product Strategy"],
  cover: { img: "/media/covers/christies.webp" },
  grad: ["#b7a890", "#6f6353"],
  hoverImages: [M + "autosuggest.webp", M + "search-results.webp", M + "artist-page.webp"],
  summary: "Search & discovery · 2022–2024",
  published: true,
  lede: { lead: "Christie's,", rest: "transforming how collectors search and discover." },
  detail: {
    eyebrow: "Search & discovery",
    heading: "Connecting people with the objects they'll want to own.",
    image: { img: M + "search-results.webp" },
    body: [
      "Search was the front door for collectors, and it was letting them down: more than half of all searches returned nothing in an upcoming sale. People arrived knowing what they wanted — 71% of queries were for a specific artist, brand or author — and left without a next step.",
      "We reframed search from a results list into a route to something: suggestions that understand artists and categories, results that separate what's coming up from what has sold, and landing pages that give every artist and category a permanent home. Testing also showed that horizontal filters were found and used far more readily than a side panel, which shaped the results layout.",
      "The first release shipped in around four months. From there the same thinking extended into alerts and follows, a dedicated watch-finding experience, and Art Advisor — a native tool that lets specialists value an object from a photograph.",
    ],
  },
  modules: [
    full(img(M + "hero.webp", "Christie's — search and discovery"), { label: "Search & discovery" }),
    statement(
      "Christie's has sold art and luxury since 1766 and now reaches collectors in 46 countries. As bidding moved online, we rebuilt how people find what they're looking for — global search, browse, alerts, watches, and a valuation tool for specialists.",
      "The opportunity"
    ),
    row(
      media(8, "16:9", M + "autosuggest.webp", "Autosuggest", "Christie's global search with autosuggestions"),
      text(4, "The challenge", "More than half of searches returned no upcoming lots, and 71% were for a specific artist, brand or author. Search had to stop answering ‘nothing found’ and start offering somewhere to go.", "Global search", true)
    ),
    row(
      media(6, "16:9", M + "search-results.webp", "Search results", "Christie's search results page"),
      media(6, "16:9", M + "search-gallery.webp", "Gallery view", "Christie's search results in gallery view")
    ),
    statement("If most people search for a name, every name deserves a destination. Browse All and 500 new artist and category pages gave collectors a place to land, follow and return to."),
    full(img(M + "browse-all.webp", "Christie's Browse All page"), { label: "Browse all" }),
    row(
      media(6, "16:9", M + "artist-page.webp", "Artist page", "Christie's artist landing page"),
      media(6, "16:9", M + "featured-artist.webp", "Featured artist", "Christie's featured artist module")
    ),
    row(
      phone(6, M + "m-follow.webp", "#1C1C1C"),
      framed(6, M + "alerts-mobile.webp", "#1C1C1C", "16:9", "Creating an alert on mobile")
    ),
    tight(
      carousel(5, [
        slide("Lot switcher", "Move between lots in a sale without losing your place.", M + "m-lot-switcher.webp", { contain: true, bg: GROUND }),
        slide("Superzoom", "Get close enough to see the brushwork.", M + "m-superzoom.webp", { contain: true, bg: GROUND }),
        gapSlide("Search", "A single entry point for artists, categories, sales and stories.", "Mobile search screen (750×1624 export, like the other two) — the folder has no plain mobile search state."),
      ]),
      stack(
        7,
        { kind: "media", ratio: "16:9", label: "Alerts", media: img(M + "alerts-desktop.webp", "Creating an alert on desktop") },
        { kind: "detail", eyebrow: "Alerts & follows", copy: "A search that finds nothing today becomes an alert for tomorrow. Collectors can follow artists and save searches, and hear from Christie's when a matching lot is consigned.", label: "CRM", cta: true }
      )
    ),
    statement("Watches behave differently from art: buyers compare references, sizes and condition. A dedicated finder lets them filter by what matters and weigh pieces side by side."),
    full(img(M + "watch-hero.webp", "Christie's watch search"), { label: "Watches" }),
    row(
      media(6, "16:9", M + "watch-find.webp", "Find my watch", "Christie's Find My Watch on desktop"),
      media(6, "16:9", M + "watch-menu.webp", "Watch menu", "Christie's watch navigation menu")
    ),
    row(
      text(4, "Compare", "Search and compare for luxury watches — built on the same search foundations, tuned to the way watch collectors shop.", "Luxury watches"),
      media(8, "16:9", M + "watch-mobile.webp", "Watches · mobile", "Christie's watch experience on mobile")
    ),
    row(
      gap(12, "16:9", "Compare in motion", "Design call-out: comparison is an interaction, and stills undersell it. A short looping screen recording (10–15s, 16:9) of two watches being added and compared would be the most persuasive asset in this section — the VideoMedia module is ready for it.")
    ),
    full(img(M + "advisor-hero.webp", "Christie's Art Advisor"), { label: "Art Advisor" }),
    row(
      phone(6, M + "m-advisor.webp", "#1C1C1C"),
      framed(6, M + "advisor-screens.webp", "#1C1C1C", "16:9", "Art Advisor screens")
    ),
    row(
      text(7, "Art Advisor", "A native app for Christie's specialists. Photograph an object and image recognition returns comparable lots and recent prices, turning a valuation that once took research into a conversation they can have in the room.", "Specialist valuation", true)
    ),
    full(img(M + "brand-assets.webp", "Christie's brand assets"), { label: "Brand assets" }),
    statement(
      "Traffic to search rose 30%, most of it from new visitors, and click-through from search into sales and stories grew by around 30% year on year.",
      "Full case study"
    ),
  ],
  overview: {
    heading: "Overview",
    body: [
      "Christie's is one of the world's leading auction houses, selling art and luxury to collectors across live and online sales. As the market moved online, a vast specialist catalogue had to become discoverable to a new generation of buyers without losing the expertise that defines the house.",
      "Over two years as lead designer I worked across global search and autosuggest, Browse All and 500 artist and category pages, alerts and follows, a watch search and compare experience, and Art Advisor, a native valuation tool for specialists — each shipped against a measured problem.",
    ],
  },
};

export default christies;
