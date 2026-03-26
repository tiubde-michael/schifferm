"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";

const categoryLabels = {
  all:           { de: "Alle",          en: "All" },
  ai:            { de: "KI & GenAI",    en: "AI & GenAI" },
  manufacturing: { de: "Industrie",     en: "Manufacturing" },
  healthcare:    { de: "Healthcare",    en: "Healthcare" },
  consulting:    { de: "Beratung",      en: "Consulting" },
};

const categoryOrder = ["all", "ai", "healthcare", "manufacturing", "consulting"];

const categoryColors = {
  all:           "bg-implementers-blue text-white",
  ai:            "bg-emerald-500 text-white",
  manufacturing: "bg-amber-500 text-white",
  healthcare:    "bg-cyan-500 text-white",
  consulting:    "bg-teal-500 text-white",
};

const categoryColorsInactive = {
  all:           "bg-slate-100 text-slate-600 hover:bg-slate-200",
  ai:            "bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
  manufacturing: "bg-amber-50 text-amber-700 hover:bg-amber-100",
  healthcare:    "bg-cyan-50 text-cyan-700 hover:bg-cyan-100",
  consulting:    "bg-teal-50 text-teal-700 hover:bg-teal-100",
};

export default function ProjectFilter({ projects, lang }) {
  const [activeFilter, setActiveFilter] = useState("all");

  const counts = { all: projects.length };
  for (const p of projects) {
    const cat = p.category || "consulting";
    counts[cat] = (counts[cat] || 0) + 1;
  }

  const filtered = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <>
      {/* Filter buttons */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categoryOrder.filter((k) => counts[k]).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveFilter(cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeFilter === cat ? categoryColors[cat] : categoryColorsInactive[cat]
            }`}
          >
            {categoryLabels[cat]?.[lang] || cat}
            <span className="ml-1.5 opacity-70">{counts[cat]}</span>
          </button>
        ))}
      </div>

      {/* Project cards */}
      <div className="grid gap-4">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} lang={lang} />
        ))}
      </div>
    </>
  );
}
