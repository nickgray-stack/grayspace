import { notFound } from "next/navigation";
import Chrome from "@/components/Chrome";
import Footer from "@/components/Footer";
import CaseStudyBody from "@/components/casestudy/CaseStudyBody";
import JsonLd from "@/components/JsonLd";
import { getProject, getPrevNext, projects } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
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
              <div className="v">{p.name}</div>
            </div>
            <div className="cell">
              <div className="l">Year</div>
              <div className="v">{p.period || p.year || "—"}</div>
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
            <CaseStudyBody modules={p.modules} detail={p.detail} />
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
