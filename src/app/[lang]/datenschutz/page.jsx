import { buildMetadata } from "../../../lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "de" }];
}

export async function generateMetadata() {
  const title = "Datenschutzerklaerung | Michael Schiffer";
  const description = "Datenschutzerklaerung fuer die Website schifferm.de.";
  return buildMetadata({
    lang: "de",
    title,
    description,
    path: "/de/datenschutz",
    languagePaths: {
      de: "/de/datenschutz",
      en: "/en/privacy",
    },
  });
}

export default function DatenschutzPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-implementers-blue">Rechtliches</p>
        <h1 className="mt-2 font-heading text-3xl text-slate-900">Datenschutzerklaerung</h1>
        <p className="mt-3 text-base text-slate-700">
          Diese Hinweise informieren ueber die Verarbeitung personenbezogener Daten auf schifferm.de.
        </p>
      </div>

      <div className="space-y-8 text-sm text-slate-700">
        <section>
          <h2 className="text-base font-semibold text-slate-900">1. Verantwortlicher</h2>
          <p className="mt-2">Michael Schiffer</p>
          <p>Weberweg 3</p>
          <p>03130 Spremberg</p>
          <p>Deutschland</p>
          <p className="mt-2">
            E-Mail: <a href="mailto:schiffer@tiub.de">schiffer@tiub.de</a>
          </p>
          <p>
            Telefon: <a href="tel:+491722564248">+49 172 2564248</a>
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">2. Hosting</h2>
          <p className="mt-2">
            Diese Website wird bei IONOS SE gehostet. Beim Aufruf der Seiten verarbeitet der Host
            technische Zugriffsdaten (Server-Logfiles). Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO
            (berechtigtes Interesse an einem sicheren und stabilen Betrieb).
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">3. Zugriffsdaten</h2>
          <p className="mt-2">
            Beim Besuch der Website werden ueblicherweise folgende Daten verarbeitet: IP-Adresse, Datum und Uhrzeit,
            aufgerufene Seite, Referrer-URL, uebertragene Datenmenge, Statuscodes und User-Agent.
            Eine Zusammenfuehrung dieser Daten mit anderen Datenquellen erfolgt nicht.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">4. Kontaktaufnahme</h2>
          <p className="mt-2">
            Bei Kontaktaufnahme per E-Mail oder Telefon werden die uebermittelten Daten zur Bearbeitung der Anfrage
            verwendet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Massnahmen) sowie
            Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung).
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">5. Cookies und Tracking</h2>
          <p className="mt-2">
            Diese Website setzt keine Cookies zu Analyse- oder Marketingzwecken ein und verwendet keine
            Tracking-Dienste.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">6. Ihre Rechte</h2>
          <p className="mt-2">
            Sie haben das Recht auf Auskunft, Berichtigung, Loeschung, Einschraenkung der Verarbeitung,
            Widerspruch sowie Datenuebertragbarkeit. Zudem besteht ein Beschwerderecht bei der zustaendigen
            Aufsichtsbehoerde.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">7. Sicherheit</h2>
          <p className="mt-2">
            Die Uebertragung erfolgt verschluesselt (TLS). Ein vollstaendiger Schutz der Daten vor dem Zugriff durch
            Dritte ist jedoch nicht moeglich.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">8. Externe Links</h2>
          <p className="mt-2">
            Diese Website kann Links zu externen Seiten enthalten. Fuer deren Inhalte und Datenschutzpraktiken ist
            der jeweilige Anbieter verantwortlich.
          </p>
        </section>
      </div>
    </section>
  );
}
