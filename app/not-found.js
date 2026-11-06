import Link from "next/link";
import Chrome from "@/components/Chrome";
import Footer from "@/components/Footer";

export const metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <>
      <Chrome active={null} />
      <main className="contact wrap" id="main">
        <section className="chero">
          <h1 className="clede">Nothing here.</h1>
          <p className="csub">
            That page has moved or never existed — but the work is one click away.
          </p>
          <div className="cactions">
            <Link className="cbtn" href="/">
              Back to work
            </Link>
            <Link className="cbtn ghost" href="/about">
              About
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
