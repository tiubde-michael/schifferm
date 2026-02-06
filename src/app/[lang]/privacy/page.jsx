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
          <p>
            Phone: <a href="tel:+491722564248">+49 172 2564248</a>
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">2. Hosting</h2>
          <p className="mt-2">
            This website is hosted by IONOS SE. When you access the site, the hosting provider processes technical
            access data (server log files). The legal basis is Art. 6(1)(f) GDPR (legitimate interest in secure and
            stable operation).
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">3. Access data</h2>
          <p className="mt-2">
            Typical access data includes IP address, date and time, requested page, referrer URL, transferred data
            volume, status codes, and user agent. These data are not combined with other data sources.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">4. Contact</h2>
          <p className="mt-2">
            If you contact us by email or phone, the transmitted data is used to handle your request. The legal basis
            is Art. 6(1)(b) GDPR (pre-contractual measures) and Art. 6(1)(f) GDPR (legitimate interest in responding).
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">5. Cookies and tracking</h2>
          <p className="mt-2">This website does not use cookies for analytics or marketing and uses no tracking tools.</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">6. Your rights</h2>
          <p className="mt-2">
            You have the right of access, rectification, erasure, restriction of processing, objection, and data
            portability. You also have the right to lodge a complaint with a supervisory authority.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">7. Security</h2>
          <p className="mt-2">
            Transmission is encrypted (TLS). Complete protection of data against access by third parties cannot be
            guaranteed.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">8. External links</h2>
          <p className="mt-2">
            This website may contain links to external sites. Their content and privacy practices are the
            responsibility of the respective provider.
          </p>
        </section>
      </div>
    </section>
  );
}
