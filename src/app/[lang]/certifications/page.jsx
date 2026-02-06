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
  const title = `${labels[lang].navigation.certifications} | ${profileContent.site.fullName}`;
  const description = "Certifications grouped by domain.";
  return buildMetadata({ lang, title, description, path: `/${lang}/certifications` });
}

export default async function CertificationsPage({ params }) {
  const resolvedParams = await params;
  const lang = getLocale(resolvedParams?.lang);
  const copy = labels[lang];

  const groupTitles = {
    de: [
      "Qualitaet & Prozess-Exzellenz",
      "Programm- & Launch-Management",
      "Healthcare Operations & GenAI",
      "AI / Data Engineering",
    ],
    en: [
      "Quality & Process Excellence",
      "Program & Launch Management",
      "Healthcare Operations & GenAI",
      "AI / Data Engineering",
    ],
  };

  const groups = [
    { title: groupTitles[lang][0], items: profileContent.certifications.quality },
    { title: groupTitles[lang][1], items: profileContent.certifications.program },
    { title: groupTitles[lang][2], items: profileContent.certifications.healthcare },
    { title: groupTitles[lang][3], items: profileContent.certifications.aiData },
  ];

  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-implementers-blue">{copy.sections.certifications}</p>
        <h1 className="mt-2 font-heading text-3xl text-slate-900">{labels[lang].navigation.certifications}</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {groups.map((group) => (
          <div key={group.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">{group.title}</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {group.items.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
