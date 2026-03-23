import fs from "fs";
import path from "path";
import { buildMetadata } from "../../../lib/seo";
import { profileContent } from "../../../content/profile";
import { getLocale } from "../../../lib/content";
import { siteConfig } from "../../../lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return siteConfig.locales.map((lang) => ({ lang }));
}

function loadCareerData(lang) {
  const jsonPath = path.join(process.cwd(), "public", "career", lang, "profile.json");
  return JSON.parse(fs.readFileSync(jsonPath, "utf8"));
}

const copy = {
  de: {
    pageTitle: "Vollständiger Lebenslauf",
    summary: "Zusammenfassung",
    contact: "Kontakt",
    experience: "Berufserfahrung",
    education: "Ausbildung",
    skills: "Kenntnisse",
    certifications: "Zertifikate",
    languages: "Sprachen",
    awards: "Auszeichnungen",
    present: "heute",
    download: "Maschinenlesbare Formate",
    downloadHint: "Diese Daten sind auch in maschinenlesbaren Formaten verfügbar:",
  },
  en: {
    pageTitle: "Full Curriculum Vitae",
    summary: "Summary",
    contact: "Contact",
    experience: "Work Experience",
    education: "Education",
    skills: "Skills",
    certifications: "Certifications",
    languages: "Languages",
    awards: "Awards",
    present: "present",
    download: "Machine-Readable Formats",
    downloadHint: "This data is also available in machine-readable formats:",
  },
};

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = getLocale(resolvedParams?.lang);
  const title = `${copy[lang].pageTitle} | ${profileContent.site.fullName}`;
  const description = lang === "de"
    ? "Vollständiger Lebenslauf mit allen Positionen, Projekten, Zertifikaten und Kenntnissen."
    : "Full CV with all positions, projects, certifications and skills.";
  return buildMetadata({ lang, title, description, path: `/${lang}/career` });
}

export default async function CareerPage({ params }) {
  const resolvedParams = await params;
  const lang = getLocale(resolvedParams?.lang);
  const t = copy[lang];
  const data = loadCareerData(lang);

  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-implementers-blue">
          {t.pageTitle}
        </p>
        <h1 className="mt-2 font-heading text-3xl text-slate-900">
          {data.basics.name}
        </h1>
        <p className="mt-3 text-base text-slate-700">{data.basics.label}</p>
      </div>

      {/* Contact */}
      <div className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">{t.contact}</h2>
        <div className="mt-3 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
          <div>
            <a href={`mailto:${data.basics.email}`} className="text-implementers-blue hover:underline">
              {data.basics.email}
            </a>
          </div>
          <div>
            <a href={`tel:${data.basics.phone.replace(/\s/g, "")}`} className="text-implementers-blue hover:underline">
              {data.basics.phone}
            </a>
          </div>
          <div>{data.basics.location.city}, {data.basics.location.countryCode}</div>
          <div>
            <a href={data.basics.url} className="text-implementers-blue hover:underline">
              {data.basics.url}
            </a>
          </div>
          {data.basics.profiles?.map((p) => (
            p.url && (
              <div key={p.network}>
                <a href={p.url} className="text-implementers-blue hover:underline" target="_blank" rel="noopener noreferrer">
                  {p.network}
                </a>
              </div>
            )
          ))}
        </div>
      </div>

      {/* Languages */}
      {data.languages?.length > 0 && (
        <div className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">{t.languages}</h2>
          <div className="mt-3 flex flex-wrap gap-3">
            {data.languages.map((l) => (
              <span key={l.language} className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-700">
                {l.language}: <span className="font-medium">{l.fluency}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Work Experience */}
      <div className="mb-10">
        <h2 className="mb-6 text-xl font-semibold text-slate-900">{t.experience}</h2>
        <div className="space-y-8">
          {data.work?.map((job, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-base font-semibold text-slate-900">{job.name}</h3>
                <span className="text-xs font-medium text-slate-400">
                  {job.startDate} – {job.endDate || t.present}
                </span>
              </div>
              <div className="mt-1 text-sm font-medium text-implementers-blue">{job.position}</div>
              {job.summary && (
                <div className="mt-1 text-xs text-slate-500">{job.summary}</div>
              )}
              {job.highlights?.length > 0 && (
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {job.highlights.map((h, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-implementers-blue" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mb-10">
        <h2 className="mb-6 text-xl font-semibold text-slate-900">{t.education}</h2>
        <div className="space-y-4">
          {data.education?.map((edu, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-base font-semibold text-slate-900">{edu.institution}</h3>
                <span className="text-xs font-medium text-slate-400">
                  {edu.startDate} – {edu.endDate}
                </span>
              </div>
              <div className="mt-1 text-sm font-medium text-implementers-blue">
                {edu.studyType} — {edu.area}
              </div>
              {edu.score && (
                <div className="mt-1 text-xs text-slate-500">
                  {lang === "de" ? "Note" : "Grade"}: {edu.score}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="mb-10">
        <h2 className="mb-6 text-xl font-semibold text-slate-900">{t.skills}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {data.skills?.map((group, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">{group.name}</h3>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {group.keywords.map((kw, j) => (
                  <span key={j} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="mb-10">
        <h2 className="mb-6 text-xl font-semibold text-slate-900">{t.certifications}</h2>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <ul className="space-y-3 text-sm text-slate-700">
            {data.certificates?.map((cert, i) => (
              <li key={i} className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <span className="font-medium text-slate-900">{cert.name}</span>
                  <span className="ml-2 text-slate-500">— {cert.issuer}</span>
                </div>
                <span className="text-xs text-slate-400">{cert.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Awards */}
      {data.awards?.length > 0 && (
        <div className="mb-10">
          <h2 className="mb-6 text-xl font-semibold text-slate-900">{t.awards}</h2>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <ul className="space-y-2 text-sm text-slate-700">
              {data.awards.map((a, i) => (
                <li key={i}>
                  <span className="font-medium text-slate-900">{a.title}</span>
                  <span className="ml-2 text-xs text-slate-400">({a.date})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Machine-readable formats */}
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6">
        <h2 className="text-lg font-semibold text-slate-900">{t.download}</h2>
        <p className="mt-2 text-sm text-slate-600">{t.downloadHint}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href={`/career/${lang}/profile.json`} className="rounded-full border border-implementers-blue px-4 py-1.5 text-sm font-medium text-implementers-blue transition hover:bg-implementers-blue hover:text-white">
            JSON Resume
          </a>
          <a href={`/career/${lang}/profile.md`} className="rounded-full border border-implementers-blue px-4 py-1.5 text-sm font-medium text-implementers-blue transition hover:bg-implementers-blue hover:text-white">
            Markdown
          </a>
          <a href="/career/schema.jsonld" className="rounded-full border border-implementers-blue px-4 py-1.5 text-sm font-medium text-implementers-blue transition hover:bg-implementers-blue hover:text-white">
            Schema.org JSON-LD
          </a>
          <a href="/llms.txt" className="rounded-full border border-implementers-blue px-4 py-1.5 text-sm font-medium text-implementers-blue transition hover:bg-implementers-blue hover:text-white">
            llms.txt
          </a>
        </div>
      </div>
    </section>
  );
}
