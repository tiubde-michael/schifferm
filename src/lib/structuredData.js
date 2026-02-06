import { getSiteUrl } from "./site";

export const buildStructuredData = ({ lang, content }) => {
  const siteUrl = getSiteUrl();
  const personId = `${siteUrl}/#person`;
  const siteId = `${siteUrl}/#website`;

  const skills = [
    ...content.skills.ai,
    ...content.skills.automation,
    ...content.skills.programming,
    ...content.skills.databases,
    ...content.skills.ops,
    ...content.skills.officePm,
    ...content.skills.cad,
  ];

  const credentials = [
    ...content.certifications.quality,
    ...content.certifications.program,
    ...content.certifications.healthcare,
    ...content.certifications.aiData,
  ];

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
        itemListElement: skills.map((skill, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: skill,
        })),
      },
      ...credentials.map((credential) => ({
        "@type": "EducationalOccupationalCredential",
        name: credential,
        credentialCategory: "Professional Certification",
        recognizedBy: {
          "@type": "Organization",
          name: credential.split("—")[1]?.trim() || "Issuing Organization",
        },
      })),
    ],
  };
};
