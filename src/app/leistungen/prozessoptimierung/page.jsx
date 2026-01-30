import Prozessoptimierung from "../../../components/pages/Prozessoptimierung";
import { readContentFile } from "../../../lib/server/readContentFile";

export const metadata = {
  title: "Prozessoptimierung",
  description: "Lean, Six Sigma und KVP kombiniert mit KI-gestützter Analyse. Wir optimieren Ihre Abläufe messbar und nachhaltig.",
};

export default async function Page() {
  const legacyHtml = await readContentFile("src/content/legacy/process/beratung-po00.html");
  return <Prozessoptimierung legacyHtml={legacyHtml} />;
}
