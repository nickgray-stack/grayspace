import Chrome from "@/components/Chrome";
import Footer from "@/components/Footer";
import ContactButton from "@/components/ContactButton";
import { site } from "@/content/site";

export const metadata = {
  title: "About",
  description:
    "Nicholas Gray is a multidisciplinary designer with more than 15 years across UX, interaction, visual design, prototyping and brand identity.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    // Intentional dark page — scoped, not the whole site.
    <div data-theme="dark" className="about-shell">
      <Chrome active="about" />
      <main className="about wrap" id="main">
        <section className="hero">
          <div className="statement">
            {site.about.paragraphs.map((t, i) => (
              <p key={i} className={"para r now" + (i ? " d1" : "")}>{t}</p>
            ))}
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
