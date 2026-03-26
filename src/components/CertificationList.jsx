"use client";

import { useState } from "react";

const colorMap = {
  emerald: { bg: "bg-emerald-50", text: "text-emerald-700", badge: "bg-emerald-100 text-emerald-700" },
  cyan:    { bg: "bg-cyan-50",    text: "text-cyan-700",    badge: "bg-cyan-100 text-cyan-700" },
  amber:   { bg: "bg-amber-50",   text: "text-amber-700",   badge: "bg-amber-100 text-amber-700" },
  violet:  { bg: "bg-violet-50",  text: "text-violet-700",  badge: "bg-violet-100 text-violet-700" },
  slate:   { bg: "bg-slate-50",   text: "text-slate-700",   badge: "bg-slate-100 text-slate-700" },
};

function CertItem({ cert, lang }) {
  const [open, setOpen] = useState(false);
  const hasDesc = !!cert.description;

  return (
    <li className="border-b border-slate-100 last:border-b-0">
      <button
        type="button"
        onClick={() => hasDesc && setOpen(!open)}
        className={`flex w-full items-start justify-between gap-3 py-3 text-left ${hasDesc ? "cursor-pointer" : "cursor-default"}`}
      >
        <div className="min-w-0">
          <span className="text-sm font-medium text-slate-900">{cert.name}</span>
          {cert.issuer && (
            <span className="ml-2 text-sm text-slate-500">— {cert.issuer}</span>
          )}
        </div>
        <div className="flex flex-shrink-0 items-center gap-2">
          <span className="text-xs font-mono text-slate-400">{cert.dateFrom}</span>
          {hasDesc && (
            <span className="text-xs text-slate-400">{open ? "▲" : "▼"}</span>
          )}
        </div>
      </button>
      {open && cert.description && (
        <div className="pb-3 pl-0 text-sm text-slate-600 leading-relaxed">
          {cert.description}
        </div>
      )}
    </li>
  );
}

export default function CertificationList({ groups, lang }) {
  return (
    <div className="space-y-8">
      {groups.map((group) => {
        const colors = colorMap[group.color] || colorMap.slate;
        return (
          <div key={group.category} className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className={`flex items-center justify-between px-6 py-4 ${colors.bg}`}>
              <h2 className={`text-sm font-bold uppercase tracking-wider ${colors.text}`}>
                {group.label}
              </h2>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${colors.badge}`}>
                {group.items.length}
              </span>
            </div>
            <ul className="px-6">
              {group.items.map((cert) => (
                <CertItem key={cert.id} cert={cert} lang={lang} />
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
