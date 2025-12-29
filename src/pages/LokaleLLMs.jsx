import { CheckCircle2, Server, Shield, Sparkles } from "lucide-react";
import { Helmet } from "react-helmet-async";

const technologies = ["Ollama", "GPT-4-OS 20B", "RAG"];
const benefits = ["DSGVO-konform", "On-Prem oder Private Cloud", "Kosteneffizient skalierbar", "Maximale Datensicherheit"];
const useCases = ["Medizinische Dokumentation", "Fragebogen-Auswertung", "Wissensmanagement"];

function LokaleLLMs() {
  return (
    <>
      <Helmet>
        <title>Lokale LLMs &amp; RAG | The Implementers GmbH</title>
        <meta
          name="description"
          content="DSGVO-konforme KI-Agenten mit Ollama, GPT-4-OS 20B und RAG. On-Premise Lösungen für Dokumentation, Auswertungen und Wissensmanagement."
        />
      </Helmet>

      <section className="bg-gradient-to-br from-implementers-blue/10 via-white to-implementers-green/10">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-implementers-blue">Lokale LLMs &amp; RAG</p>
              <h1 className="font-heading text-3xl text-slate-900">DSGVO on-premise</h1>
              <p className="mt-3 max-w-2xl text-slate-700">
                Wir entwickeln Sprach- und KI-Agenten, die Ihre sensiblen Daten sicher nutzen. Komplett On-Prem oder in Ihrer
                Private Cloud – ohne Abstriche bei Performance oder Nutzererlebnis.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold text-implementers-blue shadow-sm">
                <Shield className="h-4 w-4" />
                DSGVO-konforme Architektur
              </div>
            </div>
            <div className="grid gap-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Server className="h-5 w-5 text-implementers-green" />
                Technologien
              </div>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <span key={tech} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-800">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">Vorteile</h3>
              <div className="mt-4 space-y-3">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3 text-slate-700">
                    <CheckCircle2 className="h-5 w-5 text-implementers-green" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">Anwendungsbereiche</h3>
              <div className="mt-4 space-y-3">
                {useCases.map((item) => (
                  <div key={item} className="flex items-center gap-3 text-slate-700">
                    <Sparkles className="h-5 w-5 text-implementers-blue" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-implementers-blue/20 bg-white p-6 shadow-lg shadow-implementers-blue/10">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Sichere Sprachagenten für Ihre Daten</h3>
                <p className="mt-1 text-sm text-slate-700">
                  Wir integrieren LLMs in bestehende Prozesse, definieren Guardrails und setzen Governance um, damit Ihre Teams sofort starten können.
                </p>
              </div>
              <a
                href="https://outlook.office.com/book/KIOE@tiub.onmicrosoft.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-implementers-blue px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-implementers-green"
              >
                Beratung buchen
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LokaleLLMs;
