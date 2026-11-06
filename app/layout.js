import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ToastHost from "@/components/ToastHost";
import JsonLd from "@/components/JsonLd";

// Switzer, self-hosted (ITF Free License — keep the license file when you add it
// to the repo). Variable 100–900, exposed as --font-switzer and consumed by the
// --font token in globals.css.
const switzer = localFont({
  src: "./fonts/Switzer-Variable.woff2",
  variable: "--font-switzer",
  weight: "100 900",
  display: "swap",
});

export const metadata = {
  title: { default: "Gray Space", template: "%s — Gray Space" },
  description:
    "Gray Space — the design work of Nicholas Gray. Selected UX & product design, London.",
  metadataBase: new URL("https://grayspc.com"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Gray Space",
    description: "The design work of Nicholas Gray. Selected UX & product design, London.",
    url: "https://grayspc.com",
    siteName: "Gray Space",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Gray Space — Nicholas Gray" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gray Space",
    description: "The design work of Nicholas Gray. Selected UX & product design, London.",
    images: ["/og.png"],
  },
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nicholas Gray",
  alternateName: "Nick Gray",
  jobTitle: "Lead Product Designer",
  url: "https://grayspc.com",
  worksFor: { "@type": "Organization", name: "Gray Space Studio Ltd" },
  address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
  email: "mailto:hello@grayspc.com",
  knowsAbout: [
    "Product Design",
    "UX Design",
    "UI Design",
    "Prototyping",
    "Design Systems",
    "Brand Identity",
  ],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={switzer.variable}>
      <body>
        {/* set `js` before paint so reveal hidden-state applies without a flash */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
        <a className="skip" href="#main">
          Skip to content
        </a>
        <JsonLd data={personLd} />
        <SmoothScroll />
        {children}
        <ToastHost />
      </body>
    </html>
  );
}
