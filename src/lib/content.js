import { profileContent } from "../content/profile";
import { siteConfig } from "./site";

export const getLocale = (lang) => (siteConfig.locales.includes(lang) ? lang : siteConfig.defaultLocale);

export const getLocalizedPositioning = (lang) => profileContent.positioning[getLocale(lang)];

export const getLocalizedPublications = (lang) => profileContent.publications[getLocale(lang)];
