import { notFound } from "next/navigation";
import Chrome from "@/components/Chrome";
import Footer from "@/components/Footer";
import CaseStudyBody from "@/components/casestudy/CaseStudyBody";
import JsonLd from "@/components/JsonLd";
import ContactButton from "@/components/ContactButton";
import { site } from "@/content/site";
import { getProject, getPrevNext, allProjects } from "@/content/projects";

export function generateStaticParams() {
  return allProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const description = `${p.name} — ${p.lede.rest}` + (p.year ? ` ${p.role}, ${p.year}.` : "");
  const url = `/work/${p.slug}`;
  return {
    title: p.name,
    description,
    alternates: { canonical: url },
    ...(p.hidden || p.onRequest ? { robots: { index: false, follow: false } } : null),
    openGraph: {
      title: `${p.name} — Gray Space`,
      description,
      url: `https://grayspc.com${url}`,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const { prev, next } = getPrevNext(slug);

  // listed on Work, but the full case study is shared on request
  if (p.onRequest) {
    return (
      <div data-theme="dark" className="about-shell">
        <Chrome active="work" />
        <main className="onreq wrap" id="main">
          <section className="hero">
            <h1 className="r now">{site.onRequest}<span className="cur" aria-hidden="true">______</span></h1>
            <ContactButton className="mbtn r now d2">Email<span className="ul2" /></ContactButton>
          </section>
        </main>
        <Footer prev={prev} next={next} />
      </div>
    );
  }

  const workLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${p.name} — ${p.discipline}`,
    headline: p.lede.rest,
    creator: { "@type": "Person", name: "Nicholas Gray" },
    about: p.services,
    ...(p.year ? { dateCreated: p.year } : null),
    url: `https://grayspc.com/work/${p.slug}`,
  };

  return (
    <>
      <JsonLd data={workLd} />
      <Chrome active="work" />
      <main className="case" id="main">
        <section className="intro wrap">
          <h1 className="lede">
            {p.lede.lead && <span className="cl">{p.lede.lead}</span>} {p.lede.rest}
          </h1>
          <div className="meta">
            <div className="cell">
              <div className="l">Client</div>
              <div className="v">{p.client || p.name}</div>
            </div>
            <div className="cell">
              <div className="l">Year</div>
              <div className="v">{p.year || "—"}</div>
            </div>
            <div className="cell">
              <div className="l">Role</div>
              <div className="v">{p.role}{p.agency ? " · " + p.agency : ""}</div>
            </div>
            <div className="cell keywords">
              <div className="l">Services</div>
              <div className="v">{p.services.join(", ")}</div>
            </div>
          </div>
        </section>

        {p.modules && p.modules.length ? (
          <>
            <CaseStudyBody modules={p.modules} detail={p.detail} details={p.details} accent={p.accent} />
            {!p.published && (
              <section className="section statement wrap">
                <p className="modhead">Full case study available on request.</p>
              </section>
            )}
          </>
        ) : (
          <section className="section statement wrap">
            <p className="modhead">Full case study available on request.</p>
          </section>
        )}

        {p.overview && (
          <section className="section overview wrap">
            <h2 className="r">{p.overview.heading}</h2>
            <div className="body r">
              {p.overview.body.map((t, i) => (
                <p key={i}>{t}</p>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer prev={prev} next={next} />
    </>
  );
}
