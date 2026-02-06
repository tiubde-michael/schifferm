import { getSiteUrl, siteConfig } from "../lib/site";

export const dynamic = "force-static";

const pages = [
  { de: "", en: "" },
  { de: "/profile", en: "/profile" },
  { de: "/skills", en: "/skills" },
  { de: "/projects", en: "/projects" },
  { de: "/certifications", en: "/certifications" },
  { de: "/publications", en: "/publications" },
  { de: "/machine-readable", en: "/machine-readable" },
  { de: "/impressum", en: "/imprint" },
  { de: "/datenschutz", en: "/privacy" },
];

export default function sitemap() {
  const siteUrl = getSiteUrl();
  const now = new Date().toISOString();

  return siteConfig.locales.flatMap((lang) =>
    pages.map((page) => ({
      url: `${siteUrl}/${lang}${page[lang]}`.replace(/\/$/, ""),
      lastModified: now,
    }))
  );
}
