import { useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { sanitizeLegacyProcessHtml, extractLegacyBody } from "../../lib/legacyProcess";

function LegacyProcessPage({ title, description, rawHtml }) {
  const location = useLocation();
  const sanitized = useMemo(() => sanitizeLegacyProcessHtml(extractLegacyBody(rawHtml)), [rawHtml]);

  const scrollToSection = (section) => {
    if (!section) return;
    const safeSection = typeof CSS !== "undefined" && CSS.escape ? CSS.escape(section) : section;
    const byName = document.querySelector(`a[name="${safeSection}"]`);
    const byId = document.getElementById(section);
    const target = byId || byName;
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const section = new URLSearchParams(location.search).get("section");
    if (!section) return;
    const timeout = setTimeout(() => scrollToSection(section), 120);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);

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
    <>
      <Helmet>
        <title>{title} | The Implementers GmbH</title>
        {description ? <meta name="description" content={description} /> : null}
      </Helmet>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-implementers-blue/10">
          <h1 className="font-heading text-3xl text-slate-900">{title}</h1>
          <div
            className="legacy-content mt-6"
            dangerouslySetInnerHTML={{ __html: sanitized }}
            onClick={handleLegacyClick}
          />
        </div>
      </section>
    </>
  );
}

export default LegacyProcessPage;
