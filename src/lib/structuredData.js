import { getSiteUrl } from "./site";
import { getSkills, getCertifications } from "./careerData";

export const buildStructuredData = ({ lang, content }) => {
  const siteUrl = getSiteUrl();
  const personId = `${siteUrl}/#person`;
  const siteId = `${siteUrl}/#website`;

  const allSkills = getSkills(lang).map((s) => `${s.name} (${s.level})`);
  const allCerts = getCertifications(lang);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": siteId,
        url: siteUrl,
        name: content.site.name,
        inLanguage: lang,
      },
      {
        "@type": "Person",
        "@id": personId,
        name: content.person.name,
        email: `mailto:${content.person.email}`,
        telephone: content.person.mobile,
        address: {
          "@type": "PostalAddress",
          addressLocality: content.person.location,
          addressCountry: "DE",
        },
        sameAs: content.site.sameAs,
        knowsLanguage: content.person.languages.map((langItem) => langItem.label),
      },
      {
        "@type": "ItemList",
        name: "Skills",
        itemListElement: allSkills.map((skill, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: skill,
        })),
      },
      ...allCerts.map((cert) => ({
        "@type": "EducationalOccupationalCredential",
        name: cert.name,
        credentialCategory: "Professional Certification",
        recognizedBy: {
          "@type": "Organization",
          name: cert.issuer || "Issuing Organization",
        },
      })),
    ],
  };
};
