"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { sanitizeLegacyProcessHtml, extractLegacyBody } from "../../lib/legacyProcess";

function LegacyProcessPage({ title, description, rawHtml }) {
  const searchParams = useSearchParams();
  const sanitized = sanitizeLegacyProcessHtml(extractLegacyBody(rawHtml || ""));

  const scrollToSection = (section) => {
    if (!section) return;
    const safeSection = typeof CSS !== "undefined" && CSS.escape ? CSS.escape(section) : section;
    const byName = document.querySelector(`a[name="${safeSection}"]`);
    const byId = document.getElementById(section);
    const target = byId || byName;
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const section = searchParams?.get("section");
    if (!section) return;
    const timeout = setTimeout(() => scrollToSection(section), 120);
    return () => clearTimeout(timeout);
  }, [searchParams]);

  const handleLegacyClick = (event) => {
    const anchor = event.target.closest?.("a");
    if (!anchor) return;
    const href = anchor.getAttribute("href");
    if (!href) return;

    if (href.startsWith("#")) {
      event.preventDefault();
      scrollToSection(href.slice(1));
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-implementers-blue/10">
        <h1 className="font-heading text-3xl text-slate-900">{title}</h1>
        {description ? <p className="mt-2 text-slate-700">{description}</p> : null}
        <div
          className="legacy-content mt-6"
          dangerouslySetInnerHTML={{ __html: sanitized }}
          onClick={handleLegacyClick}
        />
      </div>
    </section>
  );
}

export default LegacyProcessPage;
