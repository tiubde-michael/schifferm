import { buildMetadata } from "../../../lib/seo";
import { profileContent } from "../../../content/profile";
import { labels } from "../../../lib/i18n";
import { getLocale, getLocalizedPublications } from "../../../lib/content";
import { siteConfig } from "../../../lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return siteConfig.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = getLocale(resolvedParams?.lang);
  const title = `${labels[lang].navigation.publications} | ${profileContent.site.fullName}`;
  const description = getLocalizedPublications(lang)[0]?.title || profileContent.site.fullName;
  return buildMetadata({ lang, title, description, path: `/${lang}/publications` });
}

export default async function PublicationsPage({ params }) {
  const resolvedParams = await params;
  const lang = getLocale(resolvedParams?.lang);
  const copy = labels[lang];
  const publicationItems = getLocalizedPublications(lang);
  const fileHref = (file) => encodeURI(`/docs/${file}`);

  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-implementers-blue">{copy.sections.publications}</p>
        <h1 className="mt-2 font-heading text-3xl text-slate-900">{labels[lang].navigation.publications}</h1>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <ul className="space-y-2 text-sm text-slate-700">
          {publicationItems.map((item) => (
            <li key={item.title}>
              •{" "}
              <a className="text-implementers-blue" href={fileHref(item.file)}>
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">{copy.sections.diplomaFiles}</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          {profileContent.diplomaFiles.map((file) => (
            <li key={file}>
              •{" "}
              <a className="text-implementers-blue" href={fileHref(file)}>
                {file}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
