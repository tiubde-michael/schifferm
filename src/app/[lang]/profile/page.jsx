import { buildMetadata } from "../../../lib/seo";
import { profileContent } from "../../../content/profile";
import { labels } from "../../../lib/i18n";
import { getLocale, getLocalizedPositioning } from "../../../lib/content";
import { siteConfig } from "../../../lib/site";

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

  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-implementers-blue">{copy.navigation.profile}</p>
        <h1 className="mt-2 font-heading text-3xl text-slate-900">{profileContent.site.fullName}</h1>
        <p className="mt-3 text-base text-slate-700">{positioning.oneLiner}</p>
      </div>

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
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {profileContent.person.languages.map((language) => (
              <li key={language.code}>
                {language.label}: {language.level}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">{copy.sections.experience}</h2>
          <ul className="mt-4 space-y-4 text-sm text-slate-700">
            {profileContent.experience.map((item) => (
              <li key={`${item.period}-${typeof item.title === "string" ? item.title : item.title[lang]}`}>
                <div className="text-xs font-semibold uppercase text-slate-400">{item.period}</div>
                <div className="font-semibold text-slate-900">
                  {typeof item.title === "string" ? item.title : item.title[lang]}
                </div>
                <div>{typeof item.details === "string" ? item.details : item.details[lang]}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">{copy.sections.education}</h2>
          <ul className="mt-4 space-y-4 text-sm text-slate-700">
            {profileContent.education.map((item) => (
              <li key={`${item.period}-${item.title}`}>
                <div className="text-xs font-semibold uppercase text-slate-400">{item.period}</div>
                <div className="font-semibold text-slate-900">{item.title}</div>
                <div>{item.details}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
