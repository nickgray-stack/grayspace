// Export a case study's site copy as Markdown (for Dropbox Paper, Docs, review).
//   node scripts/export-copy.mjs channel-4        -> copy/channel-4.md
//   node scripts/export-copy.mjs --all            -> every project
// Paper: File → Import, or paste the Markdown straight into a doc.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const dir = path.join(root, "content", "projects");
const out = path.join(root, "copy");
fs.mkdirSync(out, { recursive: true });

// project files import "./_kit" without an extension; load via a temp .mjs copy
async function load(slug) {
  const tmp = path.join(dir, `.export-${slug}.mjs`);
  const kitTmp = path.join(dir, `.export-kit.mjs`);
  fs.writeFileSync(kitTmp, fs.readFileSync(path.join(dir, "_kit.js"), "utf8"));
  fs.writeFileSync(tmp, fs.readFileSync(path.join(dir, slug + ".js"), "utf8").replace(/from "\.\/_kit"/g, 'from "./.export-kit.mjs"'));
  try { return (await import(pathToFileURL(tmp).href + "?t=" + Date.now())).default; }
  finally { fs.rmSync(tmp, { force: true }); fs.rmSync(kitTmp, { force: true }); }
}

function md(p) {
  const L = [];
  L.push(`# ${p.name}`, "");
  L.push(`**${p.lede.lead}** ${p.lede.rest}`, "");
  L.push(`Client: ${p.name} · Year: ${p.year || "—"} · Role: ${p.role}${p.agency ? " · " + p.agency : ""}`);
  L.push(`Services: ${p.services.join(", ")}`, "");
  let n = 0;
  const media = (c) => (c.media && c.media.todo ? `_[Asset slot — ${c.media.todo}]_` : null);
  for (const m of p.modules || []) {
    n++;
    if (m.type === "slideshow") { L.push(`## ${n}. Hero slideshow`, "", ...m.slides.map((s) => `- ${s.label || ""} — ${s.alt || ""}`), ""); continue; }
    if (m.type === "stats") { L.push(`## ${n}. Headline numbers`, ""); if (m.intro) L.push(m.intro, ""); L.push(...m.items.map((i) => `- **${i.value}** ${i.label}`), ""); continue; }
    if (m.type === "statement") { L.push(`## ${n}. Statement${m.todo ? " (copy slot)" : ""}`, "", m.text, ""); if (m.cta) L.push(`Button: ${m.cta.label}`, ""); continue; }
    if (m.type === "full") { L.push(`## ${n}. Full-width image — ${m.label || ""}`, ""); const g = media(m); if (g) L.push(g, ""); continue; }
    if (m.type === "row") {
      L.push(`## ${n}. Row`, "");
      const col = (c) => {
        if (c.kind === "detail") { L.push(`**${c.eyebrow || c.label || "Text"}**`, "", c.copy, ""); if (c.label) L.push(`Label: ${c.label}`, ""); }
        else if (c.kind === "carousel") { L.push("**Carousel**", ""); c.slides.forEach((s) => L.push(`- **${s.tag}** — ${s.body}`)); L.push(""); }
        else if (c.kind === "stack") c.items.forEach(col);
        else { L.push(`_Image: ${c.label || (c.media && c.media.alt) || c.kind}_`, ""); const g = media(c); if (g) L.push(g, ""); }
      };
      m.cols.forEach(col);
    }
  }
  if (p.detail) { L.push("## Read-more panel", "", `_${p.detail.eyebrow}_`, "", `**${p.detail.heading}**`, "", ...p.detail.body.flatMap((b) => [b, ""])); }
  if (p.overview) { L.push(`## ${p.overview.heading}`, "", ...p.overview.body.flatMap((b) => [b, ""])); }
  return L.join("\n");
}

const args = process.argv.slice(2);
const slugs = args.includes("--all")
  ? fs.readdirSync(dir).filter((f) => f.endsWith(".js") && !f.startsWith("_") && !f.startsWith(".")).map((f) => f.slice(0, -3))
  : args;
for (const s of slugs) {
  const p = await load(s);
  fs.writeFileSync(path.join(out, s + ".md"), md(p));
  console.log("copy/" + s + ".md");
}
