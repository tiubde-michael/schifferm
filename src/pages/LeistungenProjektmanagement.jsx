import { CheckCircle2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import pdcaImage from "../assets/images/PDCA.jpg";
const steps = [
  { title: "Plan", detail: "Ziele, KPIs und ein klarer Fahrplan – sauber geplant, bevor wir loslegen." },
  { title: "Do", detail: "Umsetzung in fokussierten Workstreams mit kurzen Feedbackzyklen." },
  { title: "Check", detail: "Transparente Kennzahlen, Abweichungen erkennen und learnings festhalten." },
  { title: "Act", detail: "Nachsteuerung und Rollout, damit Ergebnisse nachhaltig verankert werden." },
];

function LeistungenProjektmanagement() {
  return (
    <>
      <Helmet>
        <title>Projektmanagement | The Implementers GmbH</title>
        <meta
          name="description"
          content="Projektmanagement mit PDCA-Ansatz. Strukturierte Planung, Umsetzung und Steuerung für messbare Projektergebnisse."
        />
      </Helmet>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-implementers-blue">Projektmanagement</p>
            <h1 className="font-heading text-3xl text-slate-900">Strukturierte Projektabwicklung mit PDCA</h1>
            <p className="mt-4 text-slate-700">
              Wir steuern Projekte pragmatisch und transparent. Der PDCA-Zyklus schafft klare Verantwortlichkeiten,
              messbare Ergebnisse und schnelle Anpassungen, wenn sich Rahmenbedingungen ändern.
            </p>
            <div className="mt-6 grid gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              {steps.map((step) => (
                <div key={step.title} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-implementers-green" />
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{step.title}</div>
                    <p className="text-sm text-slate-700">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-implementers-blue/15">
            <img src={pdcaImage} alt="PDCA Zyklus" className="h-auto w-full" loading="lazy" />
          </div>
        </div>
      </section>
    </>
  );
}

export default LeistungenProjektmanagement;
