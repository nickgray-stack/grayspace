// ============================================================
// GRAY SPACE — content layer (Sanity-ready).
// One file per project in content/projects/<slug>.js. This index only sets
// the ORDER (roster + grid + prev/next) and exposes helpers.
//
// To add a project: copy an existing file, edit, import it here, add it to
// `all`. To hide one without deleting it: `hidden: true` in its file.
//
// MEDIA shapes (see content/projects/_kit.js for builders):
//   { img: "/media/x.webp", alt }      real asset (built by scripts/build-media.py)
//   { video, webm, poster }            looping muted video
//   { todo: "what to make + why" }     ASSET SLOT — visible placeholder + call-out
//   { grad: ["#a","#b"] }              legacy gradient placeholder
// ============================================================
import phillips from "./projects/phillips";
import christies from "./projects/christies";
import zalando from "./projects/zalando";
import frontify from "./projects/frontify";
import channel4 from "./projects/channel-4";
import cazoo from "./projects/cazoo";
import ltaRally from "./projects/lta-rally";
import justEat from "./projects/just-eat";
import honda from "./projects/honda";
import btTv from "./projects/bt-tv";
import bookinggo from "./projects/bookinggo";
import hl from "./projects/hargreaves-lansdown";
import fiat from "./projects/fiat-500";
import doctolib from "./projects/doctolib";

const all = [phillips, christies, doctolib, zalando, frontify, channel4, cazoo, ltaRally, justEat, honda, btTv, bookinggo, hl, fiat];

export const projects = all.filter((p) => !p.hidden);
export const allProjects = projects;

export function getProject(slug) {
  return projects.find((p) => p.slug === slug) || null;
}

export function getPrevNext(slug) {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i < 0) return { prev: null, next: null };
  const prevP = projects[(i - 1 + projects.length) % projects.length];
  const nextP = projects[(i + 1) % projects.length];
  const toNav = (p) => ({
    name: p.name,
    href: "/work/" + p.slug,
    thumb: p.cover.img ? `url(${p.cover.img})` : `linear-gradient(145deg, ${p.grad[0]}, ${p.grad[1]})`,
  });
  return { prev: toNav(prevP), next: toNav(nextP) };
}

// shared helper: turn a media spec into a CSS background value
export function mediaBg(media) {
  if (!media) return "var(--surface)";
  if (media.img && media.contain) return `${media.bg || "var(--surface)"} center / auto 84% no-repeat url("${media.img}")`;
  if (media.img) return `center / cover no-repeat url("${media.img}")`;
  if (media.grad) return `linear-gradient(145deg, ${media.grad[0]}, ${media.grad[1]})`;
  return "var(--surface)";
}
