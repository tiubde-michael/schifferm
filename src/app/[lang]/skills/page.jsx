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
  const title = `${labels[lang].navigation.skills} | ${profileContent.site.fullName}`;
  const description = "Skills, tools, and operational capabilities.";
  return buildMetadata({ lang, title, description, path: `/${lang}/skills` });
}

const renderList = (items) => (
  <ul className="mt-3 space-y-2 text-sm text-slate-700">
    {items.map((item) => (
      <li key={item}>• {item}</li>
    ))}
  </ul>
);

export default async function SkillsPage({ params }) {
  const resolvedParams = await params;
  const lang = getLocale(resolvedParams?.lang);
  const copy = labels[lang];

  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-implementers-blue">{copy.sections.skills}</p>
        <h1 className="mt-2 font-heading text-3xl text-slate-900">{labels[lang].navigation.skills}</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">AI</h2>
          {renderList(profileContent.skills.ai)}
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Automation</h2>
          {renderList(profileContent.skills.automation)}
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Programming</h2>
          {renderList(profileContent.skills.programming)}
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Databases</h2>
          {renderList(profileContent.skills.databases)}
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Ops</h2>
          {renderList(profileContent.skills.ops)}
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Office / PM</h2>
          {renderList(profileContent.skills.officePm)}
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">CAD</h2>
          {renderList(profileContent.skills.cad)}
        </div>
      </div>
    </section>
  );
}
