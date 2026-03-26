import { buildMetadata } from "../../../lib/seo";
import { profileContent } from "../../../content/profile";
import { labels } from "../../../lib/i18n";
import { getLocale, getLocalizedPositioning } from "../../../lib/content";
import { siteConfig } from "../../../lib/site";
import {
  getWorkExperience,
  getEducation,
  getLanguages,
} from "../../../lib/careerData";

export const dynamicParams = false;

export function generateStaticParams() {
  return siteConfig.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = getLocale(resolvedParams?.lang);
  const positioning = getLocalizedPositioning(lang);
  const title = `${labels[lang].navigation.profile} | ${profileContent.site.fullName}`;
  const description = positioning.oneLiner;
  return buildMetadata({ lang, title, description, path: `/${lang}/profile` });
}

export default async function ProfilePage({ params }) {
  const resolvedParams = await params;
  const lang = getLocale(resolvedParams?.lang);
  const copy = labels[lang];
  const positioning = getLocalizedPositioning(lang);
  const workExperience = getWorkExperience(lang);
  const education = getEducation(lang);
  const languages = getLanguages(lang);
  const present = lang === "de" ? "heute" : "present";

  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-implementers-blue">
          {copy.navigation.profile}
        </p>
        <h1 className="mt-2 font-heading text-3xl text-slate-900">
          {profileContent.site.fullName}
        </h1>
        <p className="mt-3 text-base text-slate-700">{positioning.oneLiner}</p>
      </div>

      {/* Contact + Languages row */}
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">{copy.sections.contact}</h2>
          <div className="mt-3 space-y-2 text-sm text-slate-700">
            <div>{profileContent.person.location}</div>
            <div>
              <a href={`mailto:${profileContent.person.email}`} className="text-implementers-blue">
                {profileContent.person.email}
              </a>
            </div>
            <div>
              <a href="tel:+491722564248" className="text-implementers-blue">
                {profileContent.person.mobile}
              </a>
            </div>
            <div>
              <a href={profileContent.site.sameAs[0]} className="text-implementers-blue">
                {profileContent.site.sameAs[0]}
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">{copy.sections.languages}</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {languages.map((la) => (
              <span
                key={la.language}
                className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-700"
              >
                {la.language}: <span className="font-medium">{la.level}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Work Experience Timeline */}
      <div className="mt-12">
        <h2 className="mb-6 text-xl font-semibold text-slate-900">
          {copy.sections.experience}
        </h2>
        <div className="relative pl-6 before:absolute before:left-2 before:top-0 before:bottom-0 before:w-0.5 before:bg-slate-200">
          {workExperience.map((job) => (
            <div key={job.id} className="relative pb-8 pl-6">
              {/* Timeline dot */}
              <span
                className={`absolute -left-[13px] top-1.5 h-3 w-3 rounded-full border-2 border-white ${
                  job.isCurrent ? "bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]" : "bg-implementers-blue"
                }`}
              />

              {/* Date + employer */}
              <div className="flex flex-wrap items-baseline gap-2 text-xs">
                <span className="font-mono font-medium text-implementers-blue">
                  {job.dateFrom} – {job.dateTo || present}
                </span>
                {job.location && (
                  <span className="text-slate-400">| {job.location}</span>
                )}
              </div>

              {/* Role + Company */}
              <h3 className="mt-1 text-base font-semibold text-slate-900">
                {job.role}
              </h3>
              <div className="text-sm text-slate-500">{job.employer}</div>

              {/* Level + Department badges */}
              {(job.level || job.department) && (
                <div className="mt-1.5 flex flex-wrap gap-2">
                  {job.level && (
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600">
                      {job.level}
                    </span>
                  )}
                  {job.department && (
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600">
                      {job.department}
                    </span>
                  )}
                </div>
              )}

              {/* Description */}
              {job.description && (
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {job.description}
                </p>
              )}

              {/* Inline projects for TI GmbH */}
              {job.projects.length > 0 && (
                <div className="mt-3 space-y-1.5">
                  {job.projects.map((p) => (
                    <div key={p.id} className="flex items-start gap-2 text-sm">
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-slate-400" />
                      <span className="text-slate-600">
                        <span className="font-medium text-slate-800">{p.title}</span>
                        {p.client && <span className="text-slate-400"> ({p.client})</span>}
                        <span className="text-slate-400"> {p.dateFrom}–{p.dateTo || present}</span>
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mt-12">
        <h2 className="mb-6 text-xl font-semibold text-slate-900">
          {copy.sections.education}
        </h2>
        <div className="space-y-4">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-base font-semibold text-slate-900">
                  {edu.institution}
                </h3>
                <span className="text-xs font-mono font-medium text-slate-400">
                  {edu.dateFrom} – {edu.dateTo}
                </span>
              </div>
              <div className="mt-1 text-sm font-medium text-implementers-blue">
                {edu.degree} — {edu.field}
              </div>
              {edu.grade && (
                <div className="mt-1 text-xs text-slate-500">
                  {lang === "de" ? "Note" : "Grade"}: {edu.grade}
                </div>
              )}
              {edu.thesis && (
                <div className="mt-1 text-xs text-slate-500">
                  {lang === "de" ? "Abschlussarbeit" : "Thesis"}: {edu.thesis}
                </div>
              )}
              {edu.description && (
                <div className="mt-1 text-xs text-slate-500">{edu.description}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
