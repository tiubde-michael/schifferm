import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo } from "react";
import LogoMark from "../components/LogoMark";
import pdcaImage from "../assets/images/PDCA.jpg";
import pmBannerImage from "../assets/images/PM00PM1.JPG";
import systemanalyseImage from "../assets/images/PM00SA1.GIF";
import lieferantenImage from "../assets/images/Lieferanten-Kunden.JPG";
import weltVerlagerungImage from "../assets/images/Welt-Verlagerung.JPG";
import crisis1Image from "../assets/images/j0200271.GIF";
import crisis2Image from "../assets/images/j0379443.GIF";
import crisis3Image from "../assets/images/bd06670_.GIF";
import crisis4Image from "../assets/images/j0432031.GIF";
import crisis5Image from "../assets/images/j0422532.jpg";
import tiLegacyLogoImage from "../assets/images/The_Implementers.jpg";
import pmRaw from "../content/legacy/projektmanagement/pm00pm000.html?raw";
import saRaw from "../content/legacy/projektmanagement/pm00sa000.html?raw";
import leRaw from "../content/legacy/projektmanagement/pm00le000.html?raw";
import pvRaw from "../content/legacy/projektmanagement/pm00pv000.html?raw";
import kmRaw from "../content/legacy/projektmanagement/pm00km000.html?raw";
import { parseLegacyProjektmanagementHtml } from "../lib/legacyProjektmanagement";

function LeistungenProjektmanagement() {
  const location = useLocation();

  const { title: pmTitle, html: pmHtml } = useMemo(() => parseLegacyProjektmanagementHtml(pmRaw), []);
  const { title: saTitle, html: saHtml } = useMemo(() => parseLegacyProjektmanagementHtml(saRaw), []);
  const { title: leTitle, html: leHtml } = useMemo(() => parseLegacyProjektmanagementHtml(leRaw), []);
  const { title: pvTitle, html: pvHtml } = useMemo(() => parseLegacyProjektmanagementHtml(pvRaw), []);
  const { title: kmTitle } = useMemo(() => parseLegacyProjektmanagementHtml(kmRaw), []);

  const activeSection = useMemo(() => new URLSearchParams(location.search).get("section") || "", [location.search]);

  useEffect(() => {
    const section = new URLSearchParams(location.search).get("section");
    if (!section) return;
    const element = document.getElementById(section);
    if (!element) return;
    setTimeout(() => element.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  }, [location.search]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const jumpLinkClass = (id) =>
    [
      "rounded-full border px-4 py-2 text-sm font-semibold transition",
      activeSection === id
        ? "border-implementers-blue/40 bg-white text-implementers-blue"
        : "border-slate-200 bg-slate-50 text-slate-800 hover:border-implementers-blue/40 hover:bg-white",
    ].join(" ");

  const richTextClass =
    "text-slate-700 leading-relaxed space-y-4 [&_p]:text-slate-700 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-1 [&_strong]:font-semibold [&_strong]:text-slate-900 [&_table]:w-full [&_table]:border-collapse [&_td]:align-top [&_td]:p-3 [&_td]:border [&_td]:border-slate-200 [&_th]:p-3 [&_th]:border [&_th]:border-slate-200 [&_th]:text-left [&_th]:bg-slate-50";

  return (
    <>
      <Helmet>
        <title>Projektmanagement & Methoden | The Implementers GmbH</title>
        <meta
          name="description"
          content="Projektmanagement & Methoden: Programmmanagement, Systemanalyse und Lean-Ansätze – mit klarer Struktur und PDCA-Zyklus."
        />
      </Helmet>

      <section id="top" className="bg-gradient-to-br from-white via-white to-implementers-blue/5">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <p className="text-xs font-semibold uppercase tracking-wide text-implementers-blue">Leistungen</p>
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Projektmanagement & Methoden</h1>
          <p className="mt-4 max-w-3xl text-slate-700 leading-relaxed">
            Inhalte aus der bisherigen Projektmanagement-Seite, modern strukturiert: Projektmanagement, Systemanalyse, Lean & Effizienz,
            Verlagerungen und Krisenmanagement.
          </p>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold text-slate-900">Sprungmarken</div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link to="?section=projektmanagement" className={jumpLinkClass("projektmanagement")}>
                Projektmanagement (#projektmanagement)
              </Link>
              <Link to="?section=systemanalyse" className={jumpLinkClass("systemanalyse")}>
                Systemanalyse (#systemanalyse)
              </Link>
              <Link to="?section=lean" className={jumpLinkClass("lean")}>
                Lean & Effizienz (#lean)
              </Link>
              <Link to="?section=verlagerungen" className={jumpLinkClass("verlagerungen")}>
                Verlagerungen (#verlagerungen)
              </Link>
              <Link to="?section=krisenmanagement" className={jumpLinkClass("krisenmanagement")}>
                Krisenmanagement (#krisenmanagement)
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="projektmanagement" className="mx-auto max-w-6xl px-4 py-10 scroll-mt-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Projektmanagement</h2>
            {pmTitle ? <p className="mt-2 text-sm font-semibold text-slate-900">{pmTitle}</p> : null}
            <div className={"mt-4 " + richTextClass} dangerouslySetInnerHTML={{ __html: pmHtml }} />
            <button
              type="button"
              onClick={scrollToTop}
              className="mt-6 inline-block text-sm font-semibold text-implementers-blue hover:underline"
            >
              Zurück nach oben
            </button>
          </div>
          <div className="space-y-5">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <img src={pdcaImage} alt="PDCA Zyklus" className="h-auto w-full rounded-lg" loading="lazy" />
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <img src={pmBannerImage} alt="Projektmanagement Übersicht (Legacy)" className="h-auto w-full rounded-lg" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section id="systemanalyse" className="mx-auto max-w-6xl px-4 py-10 scroll-mt-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Systemanalyse</h2>
            {saTitle ? <p className="mt-2 text-sm font-semibold text-slate-900">{saTitle}</p> : null}
            <div className={"mt-4 " + richTextClass} dangerouslySetInnerHTML={{ __html: saHtml }} />
            <button
              type="button"
              onClick={scrollToTop}
              className="mt-6 inline-block text-sm font-semibold text-implementers-blue hover:underline"
            >
              Zurück nach oben
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <img src={pdcaImage} alt="PDCA Zyklus" className="h-auto w-full rounded-lg" loading="lazy" />
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <img src={systemanalyseImage} alt="Systemanalyse (Legacy)" className="h-auto w-full rounded-lg" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section id="lean" className="mx-auto max-w-6xl px-4 py-10 scroll-mt-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Lean & Effizienz</h2>
            {leTitle ? <p className="mt-2 text-sm font-semibold text-slate-900">{leTitle}</p> : null}
            <div className={"mt-4 " + richTextClass} dangerouslySetInnerHTML={{ __html: leHtml }} />
            <button
              type="button"
              onClick={scrollToTop}
              className="mt-6 inline-block text-sm font-semibold text-implementers-blue hover:underline"
            >
              Zurück nach oben
            </button>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <img src={lieferantenImage} alt="Lieferanten-Kunden (Legacy)" className="h-auto w-full rounded-lg" loading="lazy" />
          </div>
        </div>
      </section>

      <section id="verlagerungen" className="mx-auto max-w-6xl px-4 py-10 scroll-mt-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Verlagerungen</h2>
            {pvTitle ? <p className="mt-2 text-sm font-semibold text-slate-900">{pvTitle}</p> : null}
            <div className={"mt-4 " + richTextClass} dangerouslySetInnerHTML={{ __html: pvHtml }} />
            <button
              type="button"
              onClick={scrollToTop}
              className="mt-6 inline-block text-sm font-semibold text-implementers-blue hover:underline"
            >
              Zurück nach oben
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <img src={pdcaImage} alt="PDCA Zyklus" className="h-auto w-full rounded-lg" loading="lazy" />
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <img src={weltVerlagerungImage} alt="Weltkarte Verlagerung (Legacy)" className="h-auto w-full rounded-lg" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section id="krisenmanagement" className="mx-auto max-w-6xl px-4 py-10 scroll-mt-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Krisenmanagement</h2>
            {kmTitle ? <p className="mt-2 text-sm font-semibold text-slate-900">{kmTitle}</p> : null}
            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-slate-700 leading-relaxed">
                Wenn der Normalbetrieb nicht mehr stabil ist, hilft eine klare Struktur: schnell Lagebild herstellen, priorisieren und Maßnahmen
                konsequent umsetzen.
              </p>
            </div>
            <button
              type="button"
              onClick={scrollToTop}
              className="mt-6 inline-block text-sm font-semibold text-implementers-blue hover:underline"
            >
              Zurück nach oben
            </button>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start gap-4">
              <img src={crisis4Image} alt="Krisenmanagement (Legacy)" className="h-auto w-[30%] rounded-lg" loading="lazy" />
              <div className="flex-1 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start gap-3">
                  <LogoMark />
                  <div>
                    <div className="text-sm font-semibold text-slate-900">The Implementers GmbH</div>
                    <div className="mt-1 text-sm text-slate-700">Unterstützung mit erfahrenen Expertisen und bewährten Methoden.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-6xl px-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Tabelle aus der Legacy-Seite</h3>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[680px] border-collapse">
                <tbody>
                  <tr className="border-b border-slate-200">
                    <td className="w-64 border border-slate-200 p-4 align-middle">
                      <img src={pdcaImage} alt="PDCA Zyklus" className="h-auto w-full rounded-lg" loading="lazy" />
                    </td>
                    <td className="border border-slate-200 p-4 text-slate-700 leading-relaxed">Wenn dieses Ideal mal verlassen wurde</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="w-64 border border-slate-200 p-4 align-middle">
                      <img
                        src={crisis1Image}
                        alt="Krisenmanagement Situation (Legacy)"
                        className="mx-auto h-auto w-1/2 rounded-lg"
                        loading="lazy"
                      />
                    </td>
                    <td className="border border-slate-200 p-4 text-slate-700 leading-relaxed">
                      <ul className="list-disc pl-6">
                        <li>Ihre Produktion ist nicht mehr unter Kontrolle</li>
                        <li>Ihr Projekt ist ins Stocken geraten</li>
                        <li>Ihr Kunde ist unzufrieden</li>
                        <li>Ihr Lieferant kann Ihre Anforderung nicht mehr erfüllen</li>
                      </ul>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="w-64 border border-slate-200 p-4 align-middle">
                      <img
                        src={crisis2Image}
                        alt="Krisenmanagement Ressourcen (Legacy)"
                        className="mx-auto h-auto w-1/2 rounded-lg"
                        loading="lazy"
                      />
                    </td>
                    <td className="border border-slate-200 p-4 text-slate-700 leading-relaxed">
                      <ul className="list-disc pl-6">
                        <li>
                          Ihrem Team fehlen:
                          <ul className="list-disc pl-6">
                            <li>die richtigen Ressourcen</li>
                            <li>die richtigen Hilfsmittel</li>
                          </ul>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="w-64 border border-slate-200 p-4 align-middle">
                      <img
                        src={crisis3Image}
                        alt="Krisenmanagement Fokus (Legacy)"
                        className="mx-auto h-auto w-1/2 rounded-lg"
                        loading="lazy"
                      />
                    </td>
                    <td className="border border-slate-200 p-4 text-slate-700 leading-relaxed">
                      <ul className="list-disc pl-6">
                        <li>In Ihrem Team arbeiten alle an allen Fronten</li>
                        <li>aber nicht in die gleiche Richtung</li>
                      </ul>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="w-64 border border-slate-200 p-4 align-middle">
                      <img
                        src={crisis4Image}
                        alt="Krisenmanagement Unterstützung (Legacy)"
                        className="mx-auto h-auto w-1/2 rounded-lg"
                        loading="lazy"
                      />
                    </td>
                    <td className="border border-slate-200 p-4 text-slate-700 leading-relaxed">
                      <Link to="/impressum" className="font-semibold text-implementers-blue hover:underline">
                        =&gt; Unterstützung anfordern
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="w-64 border border-slate-200 p-4 align-middle">
                      <div className="flex items-center justify-center gap-3">
                        <img src={crisis5Image} alt="Expertise (Legacy)" className="h-20 w-20 rounded-lg object-cover" loading="lazy" />
                        <img src={tiLegacyLogoImage} alt="The Implementers (Legacy)" className="h-10 w-auto" loading="lazy" />
                      </div>
                    </td>
                    <td className="border border-slate-200 p-4 text-slate-700 leading-relaxed">
                      <ul className="list-disc pl-6">
                        <li>Wir helfen mit erfahrenen Expertisen</li>
                        <li>unterstützen und schulen Ihr Team</li>
                        <li>nutzen bewährte Methoden zur Problemlösung und Stabilisierung</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LeistungenProjektmanagement;
