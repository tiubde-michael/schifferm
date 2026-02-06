import Link from "next/link";
import { buildMetadata } from "../../lib/seo";
import { profileContent } from "../../content/profile";
import { labels } from "../../lib/i18n";
import { getLocale, getLocalizedPositioning } from "../../lib/content";
import { siteConfig } from "../../lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return siteConfig.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = getLocale(resolvedParams?.lang);
  const positioning = getLocalizedPositioning(lang);
  const title = `${profileContent.site.fullName}`;
  const description = positioning.oneLiner;
  return buildMetadata({ lang, title, description, path: `/${lang}` });
}

export default async function LandingPage({ params }) {
  const resolvedParams = await params;
  const lang = getLocale(resolvedParams?.lang);
  const positioning = getLocalizedPositioning(lang);
  const copy = labels[lang];

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-16 pt-24 lg:flex-row lg:items-center lg:pt-28">
          <div className="flex-1 text-white">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white">
              AI-first • Machine-readable
            </div>
            <h1 className="font-heading text-4xl leading-tight sm:text-5xl">{positioning.headline}</h1>
            <p className="mt-4 max-w-2xl text-lg text-white/85">{positioning.oneLiner}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {positioning.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white"
                >
                  {keyword}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/${lang}/profile`}
                className="inline-flex items-center justify-center rounded-full bg-implementers-accent px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                {copy.navigation.profile}
              </Link>
              <Link
                href={`/${lang}/machine-readable`}
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {copy.navigation.machineReadable}
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <div className="grid gap-4">
              {profileContent.coreDomains.map((domain) => (
                <div
                  key={domain.title[lang]}
                  className="glass-tile group relative overflow-hidden rounded-2xl border border-white/40 p-5 text-white"
                >
                  <h3 className="text-lg font-semibold">{domain.title[lang]}</h3>
                  <p className="mt-2 text-sm text-white/70">{domain.focus[lang].join(" · ")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-10 w-1 rounded-full bg-implementers-blue" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-implementers-blue">
              {copy.sections.coreDomains}
            </p>
            <h2 className="font-heading text-3xl text-slate-900">{profileContent.site.fullName}</h2>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {profileContent.coreDomains.map((domain) => (
            <div key={domain.title[lang]} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">{domain.title[lang]}</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {domain.focus[lang].map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
