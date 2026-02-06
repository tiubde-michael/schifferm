export const siteConfig = {
  siteName: "Michael Schiffer",
  defaultLocale: "de",
  locales: ["de", "en"],
};

export const getSiteUrl = () => process.env.NEXT_PUBLIC_SITE_URL || "https://schifferm.de";
