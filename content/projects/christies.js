import { full, statement, row, tight, media, gap, text, carousel, slide, gapSlide, stack, phone, framed, img } from "./_kit";

const M = "/media/christies/";
const panel = (span, copy, label) => ({ span: "col-" + span, kind: "detail", solo: true, copy, label });
const say = (text, label, detail, muted) => ({ type: "statement", text, ...(muted ? { muted } : null), ...(label ? { cta: { label, detail } } : null) });

const christies = {
  slug: "christies",
  name: "Christie's",
  year: "2022–2024",
  discipline: "Search & Discovery",
  role: "Lead Designer",
  services: ["Art Direction", "Interaction Design", "Product Design", "Product Strategy", "UX/UI"],
  tags: ["Product Design", "Search & Discovery", "Product Strategy"],
  cover: { img: "/media/covers/christies.webp" },
  grad: ["#b7a890", "#6f6353"],
  hoverImages: [M + "autosuggest.webp", M + "search-results.webp", M + "artist-page.webp"],
  summary: "Search & discovery · 2022",
  published: true,
  lede: { lead: "Christie's,", rest: "transforming how collectors search and discover." },
  details: {
    shipped: {
      eyebrow: "What we shipped",
      heading: "Five releases, each against a measured problem.",
      body: [
        "Designed, built and shipped by understanding the problem space, to connect customers with relevant items.",
        { title: "Shipped", items: ["Global search redesign with new autosuggestions", "Browse All and 500 new artist and category pages", "CRM launch to create alerts and follow artists", "A specialist and client-facing native app for estimations and selling", "Search and compare for the luxury watch department"] },
        "Search engagement and SEO improved, with traffic up by *over 30%*, practically all new visitors, including more traffic to the new artist pages from organic and paid search. Click-through from search to sales and stories rose by *nearly 30%* year on year.",
      ],
    },
    challenge: {
      eyebrow: "The challenge",
      heading: "Paving the way for big ideas.",
      body: [
        "We needed to reduce bounces and exits, remove navigation paths that led to dead ends, and increase clients' propensity to transact.",
        "Synthesising research and data, we diagnosed customer and business problems and ran workshops on vision and strategy: reviewing existing experiences, empathy mapping, generating ideas and prioritising them by impact.",
        "Working with the product owner, stakeholders and engineers in iterative sprints, we started with search: streamlining the UX, refining filters, creating artist, Browse All and category pages, and improving relevance. We tested, iterated and launched the MVP in *four months*.",
      ],
    },
    crm: {
      eyebrow: "Alerts and follows",
      heading: "Capturing preferences, bringing collectors back.",
      body: [
        "We built more relevant suggestions and new CRM capabilities that let users follow artists and save alerts, capturing preferences and increasing returning users.",
        "Combined with suggested searches and lot recommendations based on searches and related artists, it gave clients a more targeted experience to inspire them.",
      ],
    },
    advisor: {
      eyebrow: "Art Advisor",
      heading: "Faster, more accurate valuations for specialists.",
      body: [
        "Specialists lost a lot of time trying to identify matches for requested items.",
        "They needed an easier way to match items, get relevant cataloguing suggestions, and auto-populate comparable lots as part of wider valuations. Art Advisor uses image recognition to do exactly that.",
      ],
    },
  },
  modules: [
    full(img(M + "search-results.webp", "Christie's search results")),
    say("Founded in 1766, Christie's sells art and luxury in 46 countries. As online bidding surged, I led design to transform search and discovery across web and native.", "What we shipped", "shipped", "Search traffic grew by over 30%, almost all new visitors, and click-through from search to sales and stories rose by nearly 30%."),
    full(img(M + "browse-all.webp", "Christie's Browse All")),
    say("Christie's sells rare objects, so most of the time it doesn't have what people are looking for. Over half of searches returned no upcoming results, leaving buyers at dead ends.", "The challenge", "challenge"),
    tight(
      media(8, "16:9", M + "search-gallery.webp", null, "Christie's search results in gallery view"),
      panel(4, "We revamped search, streamlined the UX and refined filters, with results that match what clients ask for. The MVP launched in four months.", "Global search")
    ),
    tight(
      panel(4, "Horizontal filter themes drove more engagement and click-through, so search moved to contextual horizontal menus that reveal content progressively.", "Horizontal filters"),
      gap(8, "16:9", "Horizontal filters", "Horizontal filters on search results — a still or short MP4 loop, 16:9.")
    ),
    say("Seventy-one percent of searches were for a specific artist, brand or author, so we launched 500 artist and category pages, built to scale."),
    tight(
      { span: "col-4", kind: "media", ratio: "451:1024", media: { img: M + "artist-page-full.webp", alt: "A full Christie's artist page: Jean-Michel Basquiat", pos: "top" } },
      stack(8,
        { kind: "media", ratio: "16:9", media: img(M + "featured-artist.webp", "Christie's featured artist module") },
        { kind: "media", ratio: "16:9", media: img(M + "autosuggest.webp", "Christie's search autosuggestions") }
      )
    ),
    say("New CRM features let collectors follow artists and save alerts, with suggested searches and lot recommendations from related artists.", "Alerts and follows", "crm"),
    tight(
      media(8, "16:9", M + "alerts-motion.mp4", null, "Creating an alert for a search"),
      phone(4, M + "alert-saved.mp4", "#EFECE6", { baked: true })
    ),
    say("A search and compare experience for the luxury watch department, built on the same search foundations."),
    tight(
      media(8, "16:9", M + "watch-hero.webp", null, "Christie's watches"),
      panel(4, "Watch buyers compare references, sizes and condition, so a dedicated finder lets them filter by what matters and weigh pieces side by side.", "Luxury watches"),
      media(6, "16:9", M + "watch-find.webp", null, "Christie's Find your watch"),
      media(6, "16:9", M + "watch-visual-search.mp4", null, "Christie's watch visual search"),
      media(6, "16:9", M + "autosuggest-watch.webp", null, "Christie's watch autosuggestions"),
      media(6, "16:9", M + "watch-mobile.webp", null, "Christie's watches on mobile")
    ),
    say("Art Advisor uses image recognition to help specialists value lots faster and more accurately.", "Art Advisor", "advisor"),
    tight(
      media(6, "16:9", M + "advisor-hero.webp", null, "Christie's Art Advisor"),
      media(6, "16:9", M + "advisor-screens.webp", null, "Art Advisor screens")
    ),
  ],
  overview: {
    heading: "Overview",
    body: [
      "Christie's is one of the world's leading auction houses. As the market moved online, a vast specialist catalogue had to become discoverable to a new generation of buyers.",
      "Over two years as lead designer I worked across global search, Browse All and 500 artist and category pages, alerts and follows, watch search and compare, and Art Advisor, a valuation tool for specialists.",
    ],
  },
};

export default christies;
