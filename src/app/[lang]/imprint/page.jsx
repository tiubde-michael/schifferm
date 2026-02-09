import { buildMetadata } from "../../../lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "en" }];
}

export async function generateMetadata() {
  const title = "Imprint | Michael Schiffer";
  const description = "Legal notice and provider identification for schifferm.de.";
  return buildMetadata({
    lang: "en",
    title,
    description,
    path: "/en/imprint",
    languagePaths: {
      de: "/de/impressum",
      en: "/en/imprint",
    },
  });
}

export default function ImprintPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-implementers-blue">Legal</p>
        <h1 className="mt-2 font-heading text-3xl text-slate-900">Imprint</h1>
        <p className="mt-3 text-base text-slate-700">Information pursuant to Section 5 DDG.</p>
      </div>

      <div className="space-y-8 text-sm text-slate-700">
        <section>
          <h2 className="text-base font-semibold text-slate-900">Service provider</h2>
          <p className="mt-2">Michael Schiffer</p>
          <p>Weberweg 3</p>
          <p>03130 Spremberg</p>
          <p>Germany</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">Contact</h2>
          <p className="mt-2">
            Email: <a href="mailto:schiffer@tiub.de">schiffer@tiub.de</a>
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">Responsible for content</h2>
          <p className="mt-2">Michael Schiffer</p>
          <p>Weberweg 3</p>
          <p>03130 Spremberg</p>
          <p>Germany</p>
        </section>
      </div>
    </section>
  );
}
