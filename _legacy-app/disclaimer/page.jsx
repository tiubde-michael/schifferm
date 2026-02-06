import Rechtliches from "../../components/pages/Rechtliches";
import { readContentFile } from "../../lib/server/readContentFile";
import { getLegacySection } from "../../lib/legacySections";
import { sectionIds } from "../../components/pages/rechtlichesSectionIds";

export const metadata = {
  title: "Disclaimer",
  description: "Impressum, Datenschutzerklärung, Disclaimer und AGB der The Implementers GmbH.",
};

export default async function Page() {
  const [impressumRaw, datenschutzRaw, disclaimerRaw] = await Promise.all([
    readContentFile("src/content/legacy/impressum.html"),
    readContentFile("src/content/legacy/datenschutz.html"),
    readContentFile("src/content/legacy/disclaimer.html"),
  ]);

  const content = {
    impressumDe: getLegacySection({
      html: impressumRaw,
      anchorName: "Impressum-DE",
      stopAnchors: ["Site-Notice"],
    }),
    siteNoticeEn: getLegacySection({
      html: impressumRaw,
      anchorName: "Site-Notice",
      stopAnchors: [],
    }),
    datenschutzDe: getLegacySection({
      html: datenschutzRaw,
      anchorName: "Datenschutzerklaerung",
      stopAnchors: ["Privacy-Police"],
    }),
    privacyEn: getLegacySection({
      html: datenschutzRaw,
      anchorName: "Privacy-Police",
      stopAnchors: [],
    }),
    disclaimerDe: getLegacySection({
      html: disclaimerRaw,
      anchorName: "Disclaimer-DE",
      stopAnchors: ["Disclaimer-EN"],
    }),
    disclaimerEn: getLegacySection({
      html: disclaimerRaw,
      anchorName: "Disclaimer-EN",
      stopAnchors: [],
    }),
  };

  return <Rechtliches initialSectionId={sectionIds.disclaimerDe} content={content} />;
}
