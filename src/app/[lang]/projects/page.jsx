import { buildMetadata } from "../../../lib/seo";
import { profileContent } from "../../../content/profile";
import { labels } from "../../../lib/i18n";
import { getLocale } from "../../../lib/content";
import { siteConfig } from "../../../lib/site";
import { getProjects } from "../../../lib/careerData";
import ProjectFilter from "../../../components/ProjectFilter";

export const dynamicParams = false;

export function generateStaticParams() {
  return siteConfig.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = getLocale(resolvedParams?.lang);
  const title = `${labels[lang].navigation.projects} | ${profileContent.site.fullName}`;
  const description = lang === "de"
    ? "Projektübersicht: KI, Healthcare, Industrie und Beratung."
    : "Project overview: AI, healthcare, manufacturing and consulting.";
  return buildMetadata({ lang, title, description, path: `/${lang}/projects` });
}

export default async function ProjectsPage({ params }) {
  const resolvedParams = await params;
  const lang = getLocale(resolvedParams?.lang);
  const copy = labels[lang];
  const projects = getProjects(lang);

  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-implementers-blue">
          {copy.sections.workTypes}
        </p>
        <h1 className="mt-2 font-heading text-3xl text-slate-900">
          {labels[lang].navigation.projects}
        </h1>
        <p className="mt-3 text-sm text-slate-500">
          {lang === "de"
            ? `${projects.length} Projekte — klicken für Details`
            : `${projects.length} projects — click for details`}
        </p>
      </div>

      <ProjectFilter projects={projects} lang={lang} />
    </section>
  );
}
