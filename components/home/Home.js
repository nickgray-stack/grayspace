"use client";
import { useState } from "react";
import Link from "next/link";
import { projects, mediaBg } from "@/content/projects";
import WorkCard from "./WorkCard";

// Home: roster hero (links + live preview) + 2-up work grid. Everything comes
// from the content layer — order, names, previews, tags.
export default function Home() {
  const [active, setActive] = useState(0);
  const rows = Math.ceil(projects.length / 2);
  const cur = projects[active];

  return (
    <main className="home" id="main">
      <section className="hero wrap">
        <ol className="wl" style={{ gridTemplateRows: `repeat(${rows}, auto)` }}>
          {projects.map((p, i) => (
            <li key={p.slug}>
              <Link
                className={"row" + (i === active ? " active" : "")}
                href={"/work/" + p.slug}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <span className="nm">{p.name}</span>
              </Link>
            </li>
          ))}
        </ol>
        <div className="stage" aria-live="polite">
          {projects.map((p, i) => (
            <div
              key={p.slug}
              className={"frame" + (i === active ? " show" : "")}
              style={{ background: mediaBg(p.cover) }}
            />
          ))}
        </div>
        <div className="scap">
          <span className="t">{cur.name}</span>
          <span className="m">{cur.discipline} · {cur.year}</span>
        </div>
      </section>

      <section className="wrap work" id="work">
        <div className="grid wgrid">
          {projects.map((p) => (
            <WorkCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
