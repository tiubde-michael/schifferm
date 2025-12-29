import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Blog from "./pages/Blog";
import Home from "./pages/Home";
import Kontakt from "./pages/Kontakt";
import LokaleLLMs from "./pages/LokaleLLMs";
import Prozessoptimierung from "./pages/Prozessoptimierung";
import LeistungenProjektmanagement from "./pages/LeistungenProjektmanagement";
import Rechtliches, { sectionIds } from "./pages/Rechtliches";
import LegacyProcessPage from "./pages/legacy/LegacyProcessPage";
import kaizenRaw from "./content/legacy/process/kaizen00.html?raw";
import fiveSRaw from "./content/legacy/process/5s00.html?raw";
import sixSigmaRaw from "./content/legacy/process/sixsigma00.html?raw";
import leanRaw from "./content/legacy/process/def-lean-00.html?raw";
import tpsRaw from "./content/legacy/process/tps00.html?raw";
import begriffeRaw from "./content/legacy/process/begriffaerklaerung01.html?raw";
import visionRaw from "./content/legacy/process/beratung-vi00.html?raw";
import babRaw from "./content/legacy/process/def-bab.html?raw";
import bepRaw from "./content/legacy/process/def-bep.html?raw";
import dbRaw from "./content/legacy/process/def-db.html?raw";
import kostenRaw from "./content/legacy/process/def-kosten.html?raw";
import sgpRaw from "./content/legacy/process/def-sgp.html?raw";
import savingsRaw from "./content/legacy/process/transparenz040_saving.html?raw";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leistungen/lokale-llms" element={<LokaleLLMs />} />
          <Route path="/leistungen/projektmanagement" element={<LeistungenProjektmanagement />} />
          <Route path="/leistungen/prozessoptimierung" element={<Prozessoptimierung />} />
          <Route
            path="/leistungen/prozessoptimierung/kaizen"
            element={<LegacyProcessPage title="Kaizen / KVP" rawHtml={kaizenRaw} />}
          />
          <Route
            path="/leistungen/prozessoptimierung/5s"
            element={<LegacyProcessPage title="5S Arbeitsplatzorganisation" rawHtml={fiveSRaw} />}
          />
          <Route
            path="/leistungen/prozessoptimierung/six-sigma"
            element={<LegacyProcessPage title="Six Sigma / 6S" rawHtml={sixSigmaRaw} />}
          />
          <Route
            path="/leistungen/prozessoptimierung/lean"
            element={<LegacyProcessPage title="Lean" rawHtml={leanRaw} />}
          />
          <Route
            path="/leistungen/prozessoptimierung/tps"
            element={<LegacyProcessPage title="TPS" rawHtml={tpsRaw} />}
          />
          <Route
            path="/leistungen/prozessoptimierung/begriffserklaerung"
            element={<LegacyProcessPage title="Begriffserklärung" rawHtml={begriffeRaw} />}
          />
          <Route
            path="/leistungen/prozessoptimierung/vision-strategie"
            element={<LegacyProcessPage title="Vision & Strategie" rawHtml={visionRaw} />}
          />
          <Route
            path="/leistungen/prozessoptimierung/bab"
            element={<LegacyProcessPage title="BAB" rawHtml={babRaw} />}
          />
          <Route
            path="/leistungen/prozessoptimierung/bep"
            element={<LegacyProcessPage title="BEP" rawHtml={bepRaw} />}
          />
          <Route
            path="/leistungen/prozessoptimierung/deckungsbeitrag"
            element={<LegacyProcessPage title="Deckungsbeitrag" rawHtml={dbRaw} />}
          />
          <Route
            path="/leistungen/prozessoptimierung/kosten"
            element={<LegacyProcessPage title="Kosten" rawHtml={kostenRaw} />}
          />
          <Route
            path="/leistungen/prozessoptimierung/sgp"
            element={<LegacyProcessPage title="SGP" rawHtml={sgpRaw} />}
          />
          <Route
            path="/leistungen/prozessoptimierung/savings"
            element={<LegacyProcessPage title="Savings" rawHtml={savingsRaw} />}
          />
          <Route path="/blog" element={<Blog />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/impressum" element={<Rechtliches initialSectionId={sectionIds.impressumDe} />} />
          <Route path="/datenschutz" element={<Rechtliches initialSectionId={sectionIds.datenschutzDe} />} />
          <Route path="/disclaimer" element={<Rechtliches initialSectionId={sectionIds.disclaimerDe} />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
