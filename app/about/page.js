import Chrome from "@/components/Chrome";
import Footer from "@/components/Footer";
import ContactButton from "@/components/ContactButton";
import { site } from "@/content/site";

export const metadata = {
  title: "About",
  description:
    "Gray Space is the design work of Nicholas Gray — a multidisciplinary designer with 10+ years across UX, UI, prototyping and brand/identity.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const lines = site.studioName.split("\n");
  return (
    // Intentional dark page — scoped, not the whole site. The shell paints its
    // own dark bg + fg and fills the viewport, so the scoped dark tokens apply
    // to background and inherited text (not just elements that read the vars).
    <div data-theme="dark" className="about-shell">
      <Chrome active="about" />
      <main className="about wrap" id="main">
        <section className="hero">
          <div className="statement">
            <h1 className="studio r now">
              {lines.map((l, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {l}
                </span>
              ))}
            </h1>
            <p className="lede r now d1">{site.about.lede}</p>
          </div>
          <div className="meta r now d3">
            <ContactButton className="mbtn">
              Email<span className="ul2" />
            </ContactButton>
            <span className="right">{site.about.footnote}</span>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
