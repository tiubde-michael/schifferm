import { useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { FileText, Globe, ShieldCheck } from "lucide-react";
import impressumRaw from "../content/legacy/impressum.html?raw";
import datenschutzRaw from "../content/legacy/datenschutz.html?raw";
import disclaimerRaw from "../content/legacy/disclaimer.html?raw";
import { getLegacySection } from "../lib/legacySections";
import { sectionIds } from "./rechtlichesSectionIds";


function scrollToId(id) {
  const element = document.getElementById(id);
  if (!element) return;
  element.scrollIntoView({ behavior: "smooth", block: "start" });
}

function JumpLink({ label, id, icon: Icon }) {
  return (
    <button
      type="button"
      onClick={() => scrollToId(id)}
      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-implementers-blue/40 hover:bg-slate-50"
    >
      {Icon ? <Icon className="h-4 w-4 text-implementers-blue" /> : null}
      {label}
    </button>
  );
}

function LegalSection({ id, title, html }) {
  return (
    <section id={id} className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="font-heading text-2xl text-slate-900">{title}</h2>
      <div
        className="legal-content mt-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  );
}

function Rechtliches({ initialSectionId = sectionIds.impressumDe }) {
  const content = useMemo(() => {
    const impressumDe = getLegacySection({
      html: impressumRaw,
      anchorName: "Impressum-DE",
      stopAnchors: ["Site-Notice"],
    });
    const siteNoticeEn = getLegacySection({
      html: impressumRaw,
      anchorName: "Site-Notice",
      stopAnchors: [],
    });

    const datenschutzDe = getLegacySection({
      html: datenschutzRaw,
      anchorName: "Datenschutzerklaerung",
      stopAnchors: ["Privacy-Police"],
    });
    const privacyEn = getLegacySection({
      html: datenschutzRaw,
      anchorName: "Privacy-Police",
      stopAnchors: [],
    });

    const disclaimerDe = getLegacySection({
      html: disclaimerRaw,
      anchorName: "Disclaimer-DE",
      stopAnchors: ["Disclaimer-EN"],
    });
    const disclaimerEn = getLegacySection({
      html: disclaimerRaw,
      anchorName: "Disclaimer-EN",
      stopAnchors: [],
    });

    return { impressumDe, siteNoticeEn, datenschutzDe, privacyEn, disclaimerDe, disclaimerEn };
  }, []);

  useEffect(() => {
    if (!initialSectionId) return;
    const timeout = setTimeout(() => scrollToId(initialSectionId), 120);
    return () => clearTimeout(timeout);
  }, [initialSectionId]);

  return (
    <>
      <Helmet>
        <title>Impressum, Datenschutz, Disclaimer | The Implementers GmbH</title>
        <meta
          name="description"
          content="Impressum, DatenschutzerklÃ¤rung, Disclaimer und AGB der The Implementers GmbH."
        />
      </Helmet>

      <section className="bg-gradient-to-br from-implementers-blue/10 via-white to-implementers-green/10">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <p className="text-xs font-semibold uppercase tracking-wide text-implementers-blue">Rechtliches</p>
          <h1 className="font-heading text-3xl text-slate-900">Impressum, Datenschutz und Disclaimer</h1>
          <p className="mt-2 max-w-3xl text-slate-700">
            Sprungmarken fÃ¼hren direkt zu den jeweiligen Abschnitten in Deutsch und Englisch.
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <FileText className="h-4 w-4 text-implementers-blue" />
                DE
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <JumpLink label="Impressum" id={sectionIds.impressumDe} />
                <JumpLink label="DatenschutzerklÃ¤rung" id={sectionIds.datenschutzDe} icon={ShieldCheck} />
                <JumpLink label="Disclaimer" id={sectionIds.disclaimerDe} />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Globe className="h-4 w-4 text-implementers-green" />
                EN
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <JumpLink label="Site Notice" id={sectionIds.siteNoticeEn} />
                <JumpLink label="Privacy Policy" id={sectionIds.privacyEn} icon={ShieldCheck} />
                <JumpLink label="Disclaimer" id={sectionIds.disclaimerEn} />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <a
              href="/agb/TI-DO-AGB.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-implementers-accent px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-implementers-green"
            >
              <FileText className="h-4 w-4" />
              Allgemeine GeschÃ¤ftsbedingungen (AGB)
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-4 py-12">
        <LegalSection id={sectionIds.impressumDe} title="Impressum (DE)" html={content.impressumDe} />
        <LegalSection id={sectionIds.datenschutzDe} title="DatenschutzerklÃ¤rung (DE)" html={content.datenschutzDe} />
        <LegalSection id={sectionIds.disclaimerDe} title="Disclaimer (DE)" html={content.disclaimerDe} />
        <LegalSection id={sectionIds.siteNoticeEn} title="Site Notice (EN)" html={content.siteNoticeEn} />
        <LegalSection id={sectionIds.privacyEn} title="Privacy Policy (EN)" html={content.privacyEn} />
        <LegalSection id={sectionIds.disclaimerEn} title="Disclaimer (EN)" html={content.disclaimerEn} />
      </section>
    </>
  );
}

export default Rechtliches;

