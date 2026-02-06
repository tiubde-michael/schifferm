import { getSiteUrl, siteConfig } from "./site";

export const buildMetadata = ({ lang, title, description, path, languagePaths }) => {
  const siteUrl = getSiteUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalPath = languagePaths?.[lang] ?? normalizedPath;
  const canonical = `${siteUrl}${canonicalPath}`;
  const alternate = (locale) =>
    languagePaths?.[locale] ?? `${siteUrl}/${locale}${normalizedPath.replace(`/${lang}`, "")}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        de: alternate("de"),
        en: alternate("en"),
      },
    },
    openGraph: {
      type: "website",
      locale: lang === "de" ? "de_DE" : "en_US",
      url: canonical,
      title,
      description,
      siteName: siteConfig.siteName,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
};
