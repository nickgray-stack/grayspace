import { projects } from "@/content/projects";

const base = "https://grayspc.com";

export default function sitemap() {
  const now = new Date();
  const staticRoutes = [
    { url: `${base}/`, priority: 1 },
    { url: `${base}/about`, priority: 0.7 },
    { url: `${base}/contact`, priority: 0.7 },
  ].map((r) => ({ ...r, lastModified: now, changeFrequency: "monthly" }));

  const work = projects.map((p) => ({
    url: `${base}/work/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...work];
}
