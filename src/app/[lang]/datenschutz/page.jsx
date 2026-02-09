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
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">2. Hosting und Server-Logfiles</h2>
          <p className="mt-2">
            Diese Website wird bei einem technischen Hosting-Dienstleister betrieben (z. B. IONOS). Beim Aufruf der
            Website werden technisch notwendige Server-Logdaten verarbeitet, insbesondere IP-Adresse, Datum und Uhrzeit,
            aufgerufene Seite oder Datei, uebertragene Datenmenge, Statuscode, Browsertyp, Browserversion,
            Betriebssystem und Referrer-URL.
          </p>
          <p className="mt-2">
            Die Verarbeitung erfolgt zur Bereitstellung der Website, zur Gewaehrleistung der Systemsicherheit und zur
            Fehleranalyse. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">3. Kontakt per E-Mail</h2>
          <p className="mt-2">
            Bei Kontaktaufnahme per E-Mail werden die uebermittelten Daten zur Bearbeitung der Anfrage verarbeitet.
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit die Anfrage auf ein Vertragsverhaeltnis abzielt,
            ansonsten Art. 6 Abs. 1 lit. f DSGVO.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">4. Keine Tracking- und Drittanbieter-Dienste</h2>
          <p className="mt-2">
            Diese Website nutzt kein Tracking, keine Analyse-Dienste, keine Social-Media-Plugins,
            keine YouTube-Plugins und keine einwilligungspflichtigen Marketing-Cookies.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">5. Ihre Rechte</h2>
          <p className="mt-2">
            Sie haben nach der DSGVO das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Loeschung (Art. 17),
            Einschraenkung der Verarbeitung (Art. 18), Datenuebertragbarkeit (Art. 20), Widerspruch (Art. 21)
            sowie Widerruf erteilter Einwilligungen mit Wirkung fuer die Zukunft (Art. 7 Abs. 3).
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">6. Beschwerderecht</h2>
          <p className="mt-2">
            Sie haben das Recht auf Beschwerde bei einer Datenschutz-Aufsichtsbehoerde (Art. 77 DSGVO).
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">7. Stand</h2>
          <p className="mt-2">Stand: 9. Februar 2026</p>
        </section>
      </div>
    </section>
  );
}
