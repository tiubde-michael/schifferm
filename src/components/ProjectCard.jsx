"use client";

import { useState } from "react";

const categoryColors = {
  ai:            { bg: "bg-emerald-50",  text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500" },
  manufacturing: { bg: "bg-amber-50",    text: "text-amber-700",   border: "border-amber-200",   dot: "bg-amber-500" },
  healthcare:    { bg: "bg-cyan-50",     text: "text-cyan-700",    border: "border-cyan-200",     dot: "bg-cyan-500" },
  consulting:    { bg: "bg-teal-50",     text: "text-teal-700",    border: "border-teal-200",     dot: "bg-teal-500" },
};

const categoryLabels = {
  ai:            { de: "KI & GenAI",    en: "AI & GenAI" },
  manufacturing: { de: "Industrie",     en: "Manufacturing" },
  healthcare:    { de: "Healthcare",    en: "Healthcare" },
  consulting:    { de: "Beratung",      en: "Consulting" },
};

export default function ProjectCard({ project, lang }) {
  const [expanded, setExpanded] = useState(false);
  const cat = project.category || "consulting";
  const colors = categoryColors[cat] || categoryColors.consulting;
  const label = categoryLabels[cat]?.[lang] || cat;
  const present = lang === "de" ? "heute" : "present";
  const hasDetail = project.description && project.description !== project.descriptionShort;

  return (
    <div
      className={`rounded-2xl border bg-white shadow-sm transition-all ${colors.border} ${expanded ? "ring-1 ring-implementers-blue/20" : ""}`}
    >
      <button
        type="button"
        onClick={() => hasDetail && setExpanded(!expanded)}
        className={`w-full text-left p-6 ${hasDetail ? "cursor-pointer" : "cursor-default"}`}
      >
        {/* Header row */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${colors.bg} ${colors.text}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${colors.dot}`} />
            {label}
          </span>
          <span className="text-xs font-medium text-slate-400 font-mono">
            {project.dateFrom} – {project.dateTo || present}
          </span>
          {project.client && (
            <span className="text-xs text-slate-500">
              | {project.client}
            </span>
          )}
          {hasDetail && (
            <span className="ml-auto text-xs text-slate-400">
              {expanded ? "▲" : "▼"}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-slate-900">{project.title}</h3>

        {/* Short description (eyecatcher) */}
        {project.descriptionShort && (
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            {project.descriptionShort}
          </p>
        )}
      </button>

      {/* Expanded: full description */}
      {expanded && hasDetail && (
        <div className="px-6 pb-6 border-t border-slate-100">
          <p className="mt-4 text-sm text-slate-700 leading-relaxed whitespace-pre-line">
            {project.description}
          </p>
        </div>
      )}
    </div>
  );
}
