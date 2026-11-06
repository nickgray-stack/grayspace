import Chrome from "@/components/Chrome";
import Footer from "@/components/Footer";
import ContactButton from "@/components/ContactButton";
import { EMAIL } from "@/lib/contact";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with Nicholas Gray for project enquiries, collaborations or a full case-study walk-through. Based in London.",
  alternates: { canonical: "/contact" },
};

// V1 stub — restrained, matches the About tone. The form opens the visitor's
// mail client (no backend yet); a hosted form endpoint lands with the CMS step.
export default function ContactPage() {
  return (
    <>
      <Chrome active={null} />
      <main className="contact wrap" id="main">
        <section className="chero">
          <h1 className="clede r now">Let's make something considered.</h1>
          <p className="csub r now d1">
            For project enquiries, collaborations, or a full case-study walk-through — the quickest
            way to reach me is email.
          </p>
          <div className="cactions r now d2">
            <ContactButton className="cbtn">Copy email</ContactButton>
            <a className="cbtn ghost" href={"mailto:" + EMAIL}>
              {EMAIL}
            </a>
          </div>

          <form className="cform r" action={"mailto:" + EMAIL} method="post" encType="text/plain">
            <div className="field">
              <label htmlFor="c-name">Name</label>
              <input id="c-name" name="name" type="text" autoComplete="name" />
            </div>
            <div className="field">
              <label htmlFor="c-email">Email</label>
              <input id="c-email" name="email" type="email" autoComplete="email" />
            </div>
            <div className="field">
              <label htmlFor="c-msg">About the project</label>
              <textarea id="c-msg" name="message" rows={4} />
            </div>
            <button className="cbtn submit" type="submit">
              Send enquiry
            </button>
          </form>

          <p className="cnote">Based in London · available for select contract & studio work.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
