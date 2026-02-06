import { notFound } from "next/navigation";
import LegacyProcessPage from "../../../../components/legacy/LegacyProcessPage";
import { readContentFile } from "../../../../lib/server/readContentFile";

const pages = {
  kaizen: { title: "Kaizen / KVP", file: "kaizen00.html" },
  "5s": { title: "5S Arbeitsplatzorganisation", file: "5s00.html" },
  "six-sigma": { title: "Six Sigma / 6S", file: "sixsigma00.html" },
  lean: { title: "Lean", file: "def-lean-00.html" },
  tps: { title: "TPS", file: "tps00.html" },
  begriffserklaerung: { title: "Begriffserklärung", file: "begriffaerklaerung01.html" },
  "vision-strategie": { title: "Vision & Strategie", file: "beratung-vi00.html" },
  bab: { title: "BAB", file: "def-bab.html" },
  bep: { title: "BEP", file: "def-bep.html" },
  deckungsbeitrag: { title: "Deckungsbeitrag", file: "def-db.html" },
  kosten: { title: "Kosten", file: "def-kosten.html" },
  sgp: { title: "SGP", file: "def-sgp.html" },
  savings: { title: "Savings", file: "transparenz040_saving.html" },
};

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const entry = pages[resolvedParams.slug];
  if (!entry) return {};
  return {
    title: entry.title,
    description: entry.description,
  };
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const entry = pages[resolvedParams.slug];
  if (!entry) return notFound();
  const rawHtml = await readContentFile(`src/content/legacy/process/${entry.file}`);

  return <LegacyProcessPage title={entry.title} description={entry.description} rawHtml={rawHtml} />;
}
