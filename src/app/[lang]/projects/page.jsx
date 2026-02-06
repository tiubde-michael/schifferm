import { buildMetadata } from "../../../lib/seo";
import { profileContent } from "../../../content/profile";
import { labels } from "../../../lib/i18n";
import { getLocale } from "../../../lib/content";
import { siteConfig } from "../../../lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return siteConfig.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = getLocale(resolvedParams?.lang);
  const title = `${labels[lang].navigation.projects} | ${profileContent.site.fullName}`;
  const description = "Representative work types and delivery outcomes.";
  return buildMetadata({ lang, title, description, path: `/${lang}/projects` });
}

export default async function ProjectsPage({ params }) {
  const resolvedParams = await params;
  const lang = getLocale(resolvedParams?.lang);
  const copy = labels[lang];

  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-implementers-blue">{copy.sections.workTypes}</p>
        <h1 className="mt-2 font-heading text-3xl text-slate-900">{labels[lang].navigation.projects}</h1>
      </div>

      <div className="grid gap-6">
        {profileContent.workTypes.map((work) => (
          <div key={work.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-implementers-blue/10 px-3 py-1 text-xs font-semibold text-implementers-blue">
                {work.id}
              </span>
              <h2 className="text-lg font-semibold text-slate-900">{work.title[lang]}</h2>
              <span className="text-xs font-semibold uppercase text-slate-400">{work.status[lang]}</span>
            </div>
            <div className="mt-3 text-sm text-slate-700">Stack: {work.stack}</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {work.outcomes[lang].map((outcome) => (
                <li key={outcome}>• {outcome}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
