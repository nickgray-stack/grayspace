"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { mediaBg } from "@/content/projects";

// A work-grid tile. If the project has hoverImages, hovering cross-fades through
// them with an "N / total" counter (V1 hover-slideshow). Otherwise a single
// cover layer. Content-gated: add hoverImages[] in the data to light it up.
export default function WorkCard({ project }) {
  const frames = project.hoverImages && project.hoverImages.length ? project.hoverImages : null;
  const [idx, setIdx] = useState(0);
  const iv = useRef(null);

  // preload hover frames
  useEffect(() => {
    if (!frames) return;
    frames.forEach((src) => {
      const im = new Image();
      im.src = src;
    });
    return () => clearInterval(iv.current);
  }, [frames]);

  const onEnter = () => {
    if (!frames || frames.length < 2) return;
    clearInterval(iv.current);
    iv.current = setInterval(() => {
      setIdx((i) => (i + 1) % frames.length);
    }, 800);
  };
  const onLeave = () => {
    clearInterval(iv.current);
    setIdx(0);
  };

  return (
    <Link
      className="card col-6 r"
      href={"/work/" + project.slug}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="media ar-work">
        {frames ? (
          <>
            <span className="shot">{idx + 1} / {frames.length}</span>
            {frames.map((src, i) => (
              <div
                key={src}
                className={"slide" + (i === idx ? " on" : "")}
                style={{ backgroundImage: `url(${src})` }}
              />
            ))}
          </>
        ) : (
          <div className="slide on" style={{ background: mediaBg(project.cover) }} />
        )}
      </div>
      <div className="wcap">
        <span className="t">{project.name}</span>
        <div className="tags">
          {project.tags.map((t) => (
            <span className="tag" key={t}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
