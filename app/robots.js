import { SITE_URL } from "@/content/site";
const base = SITE_URL;

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
