import { Activity, BarChart3, Gauge, Link2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import beratungPoRaw from "../content/legacy/process/beratung-po00.html?raw";
import { extractLegacyBody, sanitizeLegacyProcessHtml } from "../lib/legacyProcess";

const methods = [
  { title: "Lean", description: "Verschwendung reduzieren, Wertströme glätten und Durchlaufzeiten senken." },
  { title: "Six Sigma", description: "Stabile Prozesse mit klaren Messpunkten und Fehlerreduktion." },
  { title: "KVP", description: "Kontinuierliche Verbesserung verankern – mit Kennzahlen und Team-Workshops." },
];

function Prozessoptimierung() {
  const legacyContent = sanitizeLegacyProcessHtml(extractLegacyBody(beratungPoRaw));

  return (
    <>
      <Helmet>
        <title>Prozessoptimierung | The Implementers GmbH</title>
        <meta
          name="description"
          content="Lean, Six Sigma und KVP kombiniert mit KI-gestützter Analyse. Wir optimieren Ihre Abläufe messbar und nachhaltig."
        />
      </Helmet>

      <section className="bg-gradient-to-br from-white via-white to-implementers-green/5">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-implementers-blue">Prozessoptimierung</p>
            <h1 className="font-heading text-3xl text-slate-900">Lean, Six Sigma und KVP</h1>
            <p className="max-w-3xl text-slate-700">
              Wir verbinden klassische Methoden mit KI-gestützten Analysen. So werden Engpässe sichtbar, Abläufe schlanker
              und Teams handlungsfähig.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {methods.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-implementers-blue/10 text-implementers-blue">
                  <Activity className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-700">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-implementers-blue/20 bg-white p-6 shadow-lg shadow-implementers-blue/10">
              <div className="flex items-center gap-3">
                <Gauge className="h-6 w-6 text-implementers-blue" />
                <h3 className="text-lg font-semibold text-slate-900">Kennzahlen in Echtzeit</h3>
              </div>
              <p className="mt-2 text-sm text-slate-700">
                Wir definieren Messpunkte, richten Dashboards ein und etablieren Routinen, damit Verbesserungen sichtbar und steuerbar bleiben.
              </p>
            </div>
            <div className="rounded-2xl border border-implementers-green/20 bg-white p-6 shadow-lg shadow-implementers-green/10">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-6 w-6 text-implementers-green" />
                <h3 className="text-lg font-semibold text-slate-900">KI-gestützte Analysen</h3>
              </div>
              <p className="mt-2 text-sm text-slate-700">
                Sprachagenten identifizieren Engpässe, bündeln Feedback und schlagen Maßnahmen vor – immer mit klarer Priorisierung.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-2xl text-slate-900">Inhalte aus Prozessoptimierung (Legacy)</h2>
            <p className="mt-2 text-sm text-slate-700">
              Inhalte und Beispiele aus der bisherigen Seite <span className="font-semibold">Beratung-PO00</span>.
            </p>
            <div className="legacy-content mt-6" dangerouslySetInnerHTML={{ __html: legacyContent }} />
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <Link2 className="h-5 w-5 text-implementers-blue" />
              <h2 className="font-heading text-2xl text-slate-900">Unterseiten</h2>
            </div>
            <p className="mt-2 text-sm text-slate-700">Vertiefende Inhalte aus dem bisherigen Bereich Prozessoptimierung.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                to="/leistungen/prozessoptimierung/kaizen"
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-implementers-blue/40 hover:bg-white"
              >
                Kaizen / KVP
              </Link>
              <Link
                to="/leistungen/prozessoptimierung/begriffserklaerung"
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-implementers-blue/40 hover:bg-white"
              >
                Begriffserklärung
              </Link>
              <Link
                to="/leistungen/prozessoptimierung/5s"
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-implementers-blue/40 hover:bg-white"
              >
                5S Arbeitsplatzorganisation
              </Link>
              <Link
                to="/leistungen/prozessoptimierung/six-sigma"
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-implementers-blue/40 hover:bg-white"
              >
                Six Sigma / 6S
              </Link>
              <Link
                to="/leistungen/prozessoptimierung/lean"
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-implementers-blue/40 hover:bg-white"
              >
                Lean / Wertschöpfung
              </Link>
              <Link
                to="/leistungen/prozessoptimierung/tps"
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-implementers-blue/40 hover:bg-white"
              >
                TPS
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Prozessoptimierung;
