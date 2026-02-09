import { buildMetadata } from "../../../lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "en" }];
}

export async function generateMetadata() {
  const title = "Privacy Policy | Michael Schiffer";
  const description = "Privacy policy for the website schifferm.de.";
  return buildMetadata({
    lang: "en",
    title,
    description,
    path: "/en/privacy",
    languagePaths: {
      de: "/de/datenschutz",
      en: "/en/privacy",
    },
  });
}

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-implementers-blue">Legal</p>
        <h1 className="mt-2 font-heading text-3xl text-slate-900">Privacy Policy</h1>
        <p className="mt-3 text-base text-slate-700">
          This notice explains how personal data is processed on schifferm.de.
        </p>
      </div>

      <div className="space-y-8 text-sm text-slate-700">
        <section>
          <h2 className="text-base font-semibold text-slate-900">1. Controller</h2>
          <p className="mt-2">Michael Schiffer</p>
          <p>Weberweg 3</p>
          <p>03130 Spremberg</p>
          <p>Germany</p>
          <p className="mt-2">
            Email: <a href="mailto:schiffer@tiub.de">schiffer@tiub.de</a>
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">2. Hosting and server log files</h2>
          <p className="mt-2">
            This website is operated by a technical hosting provider (e.g. IONOS). When the website is accessed,
            technically required server log data is processed, including IP address, date and time, requested page,
            transferred data volume, status code, browser details, operating system and referrer URL.
          </p>
          <p className="mt-2">
            Processing is carried out to provide the website, ensure system security and perform error analysis.
            The legal basis is Art. 6(1)(f) GDPR.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">3. Contact by email</h2>
          <p className="mt-2">
            If you contact us by email, the transmitted data is processed to handle your request.
            The legal basis is Art. 6(1)(b) GDPR where applicable, otherwise Art. 6(1)(f) GDPR.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">4. No tracking and no third-party plugins</h2>
          <p className="mt-2">
            This website uses no tracking, no analytics services, no social media plugins,
            no YouTube plugins and no consent-based marketing cookies.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">5. Your rights</h2>
          <p className="mt-2">
            Under the GDPR you have the right of access, rectification, erasure, restriction of processing,
            data portability, objection, withdrawal of consent and the right to lodge a complaint with a
            supervisory authority.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">6. Version date</h2>
          <p className="mt-2">Version date: February 9, 2026</p>
        </section>
      </div>
    </section>
  );
}
