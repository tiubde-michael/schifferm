import LeistungenProjektmanagement from "../../../components/pages/LeistungenProjektmanagement";
import { readContentFile } from "../../../lib/server/readContentFile";
import { parseLegacyProjektmanagementHtml } from "../../../lib/legacyProjektmanagement";

export const metadata = {
  title: "Projektmanagement & Methoden",
  description: "Projektmanagement & Methoden: Programmmanagement, Systemanalyse und Lean-Ansätze – mit klarer Struktur und PDCA-Zyklus.",
};

export default async function Page() {
  const [pmRaw, saRaw, leRaw, pvRaw, kmRaw] = await Promise.all([
    readContentFile("src/content/legacy/projektmanagement/pm00pm000.html"),
    readContentFile("src/content/legacy/projektmanagement/pm00sa000.html"),
    readContentFile("src/content/legacy/projektmanagement/pm00le000.html"),
    readContentFile("src/content/legacy/projektmanagement/pm00pv000.html"),
    readContentFile("src/content/legacy/projektmanagement/pm00km000.html"),
  ]);

  const { title: pmTitle, html: pmHtml } = parseLegacyProjektmanagementHtml(pmRaw);
  const { title: saTitle, html: saHtml } = parseLegacyProjektmanagementHtml(saRaw);
  const { title: leTitle, html: leHtml } = parseLegacyProjektmanagementHtml(leRaw);
  const { title: pvTitle, html: pvHtml } = parseLegacyProjektmanagementHtml(pvRaw);
  const { title: kmTitle } = parseLegacyProjektmanagementHtml(kmRaw);

  return (
    <LeistungenProjektmanagement
      sections={{
        pmTitle,
        pmHtml,
        saTitle,
        saHtml,
        leTitle,
        leHtml,
        pvTitle,
        pvHtml,
        kmTitle,
      }}
    />
  );
}
