import { buildMetadata } from "../../../lib/seo";
import { profileContent } from "../../../content/profile";
import { labels } from "../../../lib/i18n";
import { getLocale } from "../../../lib/content";
import { siteConfig } from "../../../lib/site";
import { getCertificationsGrouped } from "../../../lib/careerData";
import CertificationList from "../../../components/CertificationList";

export const dynamicParams = false;

export function generateStaticParams() {
  return siteConfig.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = getLocale(resolvedParams?.lang);
  const title = `${labels[lang].navigation.certifications} | ${profileContent.site.fullName}`;
  const description = lang === "de"
    ? "43 Zertifikate und Weiterbildungen gruppiert nach Fachbereich."
    : "43 certifications and training grouped by domain.";
  return buildMetadata({ lang, title, description, path: `/${lang}/certifications` });
}

export default async function CertificationsPage({ params }) {
  const resolvedParams = await params;
  const lang = getLocale(resolvedParams?.lang);
  const copy = labels[lang];
  const groups = getCertificationsGrouped(lang);

  const totalCount = groups.reduce((sum, g) => sum + g.items.length, 0);

  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-implementers-blue">
          {copy.sections.certifications}
        </p>
        <h1 className="mt-2 font-heading text-3xl text-slate-900">
          {labels[lang].navigation.certifications}
        </h1>
        <p className="mt-3 text-sm text-slate-500">
          {lang === "de"
            ? `${totalCount} Zertifikate & Weiterbildungen — klicken für Details`
            : `${totalCount} certifications & training — click for details`}
        </p>
      </div>

      <CertificationList groups={groups} lang={lang} />
    </section>
  );
}
