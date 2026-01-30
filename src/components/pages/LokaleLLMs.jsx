"use client";

import { CheckCircle2, Server, Shield, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import StarRating from "../StarRating";
import { LOCAL_LLM_MODELS } from "../../data/localLlms";


const technologies = ["Ollama", "GPT-OSS 20B", "RAG"];
const benefits = ["DSGVO-konform", "On-Prem oder Private Cloud", "Kosteneffizient skalierbar", "Maximale Datensicherheit"];
const useCases = ["Medizinische Dokumentation", "Fragebogen-Auswertung", "Wissensmanagement"];

function includesInsensitive(haystack, needle) {
  return haystack.toLowerCase().includes(needle.toLowerCase());
}

function ratingNumber(value) {
  if (value === "N/A") return -1;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : -1;
}

function matchesCategory(model, category) {
  if (category === "Alle") return true;
  if (category === "Text") return model.text !== "N/A";
  if (category === "Vision") return model.bild !== "N/A";
  if (category === "OCR") return model.ocr !== "N/A";
  if (category === "Medizin") return ratingNumber(model.medizinIcd) >= 4 || includesInsensitive(model.model, "med");
  if (category === "Coding") return includesInsensitive(model.zielEinsatz, "coding") || includesInsensitive(model.model, "coder");
  return true;
}

function LokaleLLMs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("Alle");
  const [sortKey, setSortKey] = useState("Deutsch");

  const filteredModels = useMemo(() => {
    const trimmedQuery = searchQuery.trim();

    const filtered = LOCAL_LLM_MODELS.filter((model) => {
      const queryMatch =
        trimmedQuery.length === 0 ||
        includesInsensitive(model.model, trimmedQuery) ||
        includesInsensitive(model.zielEinsatz, trimmedQuery);

      return queryMatch && matchesCategory(model, category);
    });

    const sortValue = (model) => {
      if (sortKey === "Deutsch") return ratingNumber(model.deutsch);
      if (sortKey === "Text") return ratingNumber(model.text);
      if (sortKey === "Agentic") return ratingNumber(model.agenticToolUse);
      if (sortKey === "Medizin") return ratingNumber(model.medizinIcd);
      if (sortKey === "Modell") return model.model.toLowerCase();
      return ratingNumber(model.deutsch);
    };

    return [...filtered].sort((left, right) => {
      const leftValue = sortValue(left);
      const rightValue = sortValue(right);

      if (typeof leftValue === "string" && typeof rightValue === "string") return leftValue.localeCompare(rightValue);
      if (typeof leftValue === "number" && typeof rightValue === "number") return rightValue - leftValue;
      return 0;
    });
  }, [category, searchQuery, sortKey]);

  const renderRatingCell = (value) => {
    if (value === "N/A") return <span className="text-gray-500">N/A</span>;
    return <StarRating value={value} className="whitespace-nowrap text-sm text-slate-800" />;
  };

  return (
    <>
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
                  Wir integrieren LLMs in bestehende Prozesse, definieren Guardrails und setzen Governance um, damit Ihre Teams
                  sofort starten können.
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

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Master-Tabelle – Lokale Modelle</h2>
                <p className="mt-2 max-w-4xl text-sm text-slate-700">
                  Vergleich lokaler LLMs nach Einsatz, Offenheit, Fähigkeiten und VRAM. Bewertungen in 5-Sterne-Skala; nicht
                  zutreffende Felder: N/A. Hier nur ein kleiner Auszug aus verschiedenen Modellen, die lokal genutzt werden
                  können und zum Teil den großen „online“ Modellen in ihrem Fachbereich überlegen sind.
                </p>
              </div>
              <div className="flex flex-col gap-3 md:flex-row">
                <label className="flex flex-col gap-1 text-xs font-semibold text-slate-700">
                  Suche
                  <input
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Modell oder Einsatz..."
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm outline-none focus:border-implementers-blue focus:ring-2 focus:ring-implementers-blue/20 md:w-64"
                    type="search"
                  />
                </label>
                <label className="flex flex-col gap-1 text-xs font-semibold text-slate-700">
                  Kategorie
                  <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm outline-none focus:border-implementers-blue focus:ring-2 focus:ring-implementers-blue/20"
                  >
                    {['Alle', 'Text', 'Vision', 'OCR', 'Medizin', 'Coding'].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-1 text-xs font-semibold text-slate-700">
                  Sortierung
                  <select
                    value={sortKey}
                    onChange={(event) => setSortKey(event.target.value)}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm outline-none focus:border-implementers-blue focus:ring-2 focus:ring-implementers-blue/20"
                  >
                    {['Deutsch', 'Text', 'Agentic', 'Medizin', 'Modell'].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              <div className="font-semibold text-slate-900">Legende:</div>
              <div className="mt-1 grid gap-1 md:grid-cols-3">
                <div>
                  <span className="font-mono">★☆☆☆☆</span> = schlecht / nicht geeignet
                </div>
                <div>
                  <span className="font-mono">★★★★★</span> = sehr gut
                </div>
                <div>
                  <span className="font-semibold text-gray-500">N/A</span> = nicht zutreffend
                </div>
              </div>
            </div>

            <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200">
              <table className="min-w-[1400px] divide-y divide-slate-200 text-left text-sm text-slate-700">
                <thead className="bg-slate-50">
                  <tr className="divide-x divide-slate-200">
                    <th
                      scope="col"
                      className="sticky top-0 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-700"
                    >
                      Modell
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-700"
                    >
                      Ziel-Einsatz
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-700"
                    >
                      Open Weights
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-700"
                    >
                      Open Source
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-700"
                    >
                      Trainingsdaten offen
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-700"
                    >
                      Fine-Tuned / Base
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-700"
                    >
                      Text
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-700"
                    >
                      Bild
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-700"
                    >
                      OCR
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-700"
                    >
                      Deutsch
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-700"
                    >
                      Zusammenfassen
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-700"
                    >
                      Medizin / ICD
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-700"
                    >
                      Agentic Tool Use
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-700"
                    >
                      Pro
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-700"
                    >
                      Contra
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-700"
                    >
                      VRAM min
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-700"
                    >
                      VRAM optimal
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {filteredModels.map((model) => (
                    <tr key={model.model} className="divide-x divide-slate-200">
                      <th scope="row" className="whitespace-nowrap px-4 py-3 font-semibold text-slate-900">
                        {model.model}
                      </th>
                      <td className="whitespace-nowrap px-4 py-3">{model.zielEinsatz}</td>
                      <td className="px-4 py-3">{renderRatingCell(model.openWeights)}</td>
                      <td className="px-4 py-3">{renderRatingCell(model.openSource)}</td>
                      <td className="px-4 py-3">{renderRatingCell(model.trainingsdatenOffen)}</td>
                      <td className="whitespace-nowrap px-4 py-3">{model.fineTunedBase}</td>
                      <td className="px-4 py-3">{renderRatingCell(model.text)}</td>
                      <td className="px-4 py-3">{renderRatingCell(model.bild)}</td>
                      <td className="px-4 py-3">{renderRatingCell(model.ocr)}</td>
                      <td className="px-4 py-3">{renderRatingCell(model.deutsch)}</td>
                      <td className="px-4 py-3">{renderRatingCell(model.zusammenfassen)}</td>
                      <td className="px-4 py-3">{renderRatingCell(model.medizinIcd)}</td>
                      <td className="px-4 py-3">{renderRatingCell(model.agenticToolUse)}</td>
                      <td className="min-w-[220px] px-4 py-3">{model.pro}</td>
                      <td className="min-w-[220px] px-4 py-3">{model.contra}</td>
                      <td className="whitespace-nowrap px-4 py-3">{model.vramMin}</td>
                      <td className="whitespace-nowrap px-4 py-3">{model.vramOptimal}</td>
                    </tr>
                  ))}
                  {filteredModels.length === 0 ? (
                    <tr>
                      <td colSpan={17} className="px-4 py-6 text-center text-sm text-slate-600">
                        Keine Modelle gefunden.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Hinweis: Die Bewertungen sind praxisnahe Einschätzungen und dienen der schnellen Orientierung, nicht als
              Faktenbehauptung.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default LokaleLLMs;
