import { buildMetadata } from "../../../lib/seo";
import { profileContent } from "../../../content/profile";
import { labels } from "../../../lib/i18n";
import { getLocale } from "../../../lib/content";
import { siteConfig } from "../../../lib/site";
import { getSkillsGrouped } from "../../../lib/careerData";
import LevelDots from "../../../components/LevelDots";

export const dynamicParams = false;

export function generateStaticParams() {
  return siteConfig.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = getLocale(resolvedParams?.lang);
  const title = `${labels[lang].navigation.skills} | ${profileContent.site.fullName}`;
  const description = lang === "de"
    ? "IT-Kenntnisse und Fachkompetenzen mit Niveaustufen."
    : "Skills, tools, and operational capabilities with proficiency levels.";
  return buildMetadata({ lang, title, description, path: `/${lang}/skills` });
}

export default async function SkillsPage({ params }) {
  const resolvedParams = await params;
  const lang = getLocale(resolvedParams?.lang);
  const copy = labels[lang];
  const groups = getSkillsGrouped(lang);

  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-implementers-blue">
          {copy.sections.skills}
        </p>
        <h1 className="mt-2 font-heading text-3xl text-slate-900">
          {labels[lang].navigation.skills}
        </h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <div
            key={group.category}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-implementers-blue">
              {group.label}
            </h2>
            <div className="space-y-3">
              {group.items.map((skill) => (
                <div key={skill.id} className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-slate-900">{skill.name}</span>
                  <LevelDots level={skill.level} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
