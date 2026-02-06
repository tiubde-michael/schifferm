import { buildMetadata } from "../../../lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "de" }];
}

export async function generateMetadata() {
  const title = "Impressum | Michael Schiffer";
  const description = "Impressum und Anbieterkennzeichnung fuer schifferm.de.";
  return buildMetadata({
    lang: "de",
    title,
    description,
    path: "/de/impressum",
    languagePaths: {
      de: "/de/impressum",
      en: "/en/imprint",
    },
  });
}

export default function ImpressumPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-implementers-blue">Rechtliches</p>
        <h1 className="mt-2 font-heading text-3xl text-slate-900">Impressum</h1>
        <p className="mt-3 text-base text-slate-700">Angaben gemaess 5 TMG und 18 Abs. 2 MStV.</p>
      </div>

      <div className="space-y-8 text-sm text-slate-700">
        <section>
          <h2 className="text-base font-semibold text-slate-900">Diensteanbieter</h2>
          <p className="mt-2">Michael Schiffer</p>
          <p>Weberweg 3</p>
          <p>03130 Spremberg</p>
          <p>Deutschland</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">Kontakt</h2>
          <p className="mt-2">
            E-Mail: <a href="mailto:schiffer@tiub.de">schiffer@tiub.de</a>
          </p>
          <p>
            Telefon: <a href="tel:+491722564248">+49 172 2564248</a>
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">Verantwortlich fuer den Inhalt</h2>
          <p className="mt-2">Michael Schiffer</p>
          <p>Weberweg 3</p>
          <p>03130 Spremberg</p>
          <p>Deutschland</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">Hinweise</h2>
          <p className="mt-2">
            Diese Website dient der Vorstellung eines professionellen Profils und enthaelt keine
            kommerziellen Bestell- oder Zahlungsfunktionen.
          </p>
          <p className="mt-2">Eine Umsatzsteuer-Identifikationsnummer ist nicht vorhanden.</p>
        </section>
      </div>
    </section>
  );
}
