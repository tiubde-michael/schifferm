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
  const title = `${labels[lang].navigation.machineReadable} | ${profileContent.site.fullName}`;
  const description = "Static machine-readable profile endpoints.";
  return buildMetadata({ lang, title, description, path: `/${lang}/machine-readable` });
}

export default async function MachineReadablePage({ params }) {
  const resolvedParams = await params;
  const lang = getLocale(resolvedParams?.lang);
  const copy = labels[lang];

  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-implementers-blue">
          {copy.sections.machineReadable}
        </p>
        <h1 className="mt-2 font-heading text-3xl text-slate-900">{labels[lang].navigation.machineReadable}</h1>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-700">
          These endpoints are static files generated from the central profile data source.
        </p>
        <ul className="mt-4 space-y-2 text-sm text-slate-700">
          <li>
            <a className="text-implementers-blue" href={`/${lang}/machine-readable/profile.json`}>
              /{lang}/machine-readable/profile.json
            </a>
          </li>
          <li>
            <a className="text-implementers-blue" href={`/${lang}/machine-readable/profile.md`}>
              /{lang}/machine-readable/profile.md
            </a>
          </li>
          <li>
            <a className="text-implementers-blue" href={`/${lang}/machine-readable/profile.txt`}>
              /{lang}/machine-readable/profile.txt
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
