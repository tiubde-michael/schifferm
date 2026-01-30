"use client";

import { useEffect } from "react";
import { FileText, Globe, ShieldCheck } from "lucide-react";
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
      <div className="legal-content mt-4" dangerouslySetInnerHTML={{ __html: html }} />
    </section>
  );
}

function Rechtliches({ initialSectionId = sectionIds.impressumDe, content }) {
  const safeContent = content || {
    impressumDe: "",
    siteNoticeEn: "",
    datenschutzDe: "",
    privacyEn: "",
    disclaimerDe: "",
    disclaimerEn: "",
  };
  useEffect(() => {
    if (!initialSectionId) return;
    const timeout = setTimeout(() => scrollToId(initialSectionId), 120);
    return () => clearTimeout(timeout);
  }, [initialSectionId]);

  return (
    <>
      <section className="bg-gradient-to-br from-implementers-blue/10 via-white to-implementers-green/10">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <p className="text-xs font-semibold uppercase tracking-wide text-implementers-blue">Rechtliches</p>
          <h1 className="font-heading text-3xl text-slate-900">Impressum, Datenschutz und Disclaimer</h1>
          <p className="mt-2 max-w-3xl text-slate-700">
            Sprungmarken führen direkt zu den jeweiligen Abschnitten in Deutsch und Englisch.
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <FileText className="h-4 w-4 text-implementers-blue" />
                DE
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <JumpLink label="Impressum" id={sectionIds.impressumDe} />
                <JumpLink label="Datenschutzerklärung" id={sectionIds.datenschutzDe} icon={ShieldCheck} />
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
              Allgemeine Geschäftsbedingungen (AGB)
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-4 py-12">
        <LegalSection id={sectionIds.impressumDe} title="Impressum (DE)" html={safeContent.impressumDe} />
        <LegalSection id={sectionIds.datenschutzDe} title="Datenschutzerklärung (DE)" html={safeContent.datenschutzDe} />
        <LegalSection id={sectionIds.disclaimerDe} title="Disclaimer (DE)" html={safeContent.disclaimerDe} />
        <LegalSection id={sectionIds.siteNoticeEn} title="Site Notice (EN)" html={safeContent.siteNoticeEn} />
        <LegalSection id={sectionIds.privacyEn} title="Privacy Policy (EN)" html={safeContent.privacyEn} />
        <LegalSection id={sectionIds.disclaimerEn} title="Disclaimer (EN)" html={safeContent.disclaimerEn} />
      </section>
    </>
  );
}

export default Rechtliches;
