import { Helmet } from "react-helmet-async";
import { ExternalLink, Linkedin, Mail, Phone } from "lucide-react";

const contactItems = [
  { label: "Telefon", value: "+49 172 2564248", icon: Phone, href: "tel:+491722564248" },
  { label: "E-Mail", value: "schiffer@tiub.de", icon: Mail, href: "mailto:schiffer@tiub.de" },
  {
    label: "LinkedIn",
    value: "Profil öffnen",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/michael-schiffer-87bb7180",
  },
];

function Kontakt() {
  return (
    <>
      <Helmet>
        <title>Kontakt | The Implementers GmbH</title>
        <meta name="description" content="Direkter Draht zu The Implementers GmbH. Jetzt kostenlose Erstberatung vereinbaren." />
      </Helmet>

      <section className="mx-auto max-w-4xl px-4 py-14">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-implementers-blue/10">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-implementers-blue">Kontakt</p>
            <h1 className="font-heading text-3xl text-slate-900">Michael Schiffer</h1>
            <p className="text-slate-700">Lassen Sie uns über Ihr Vorhaben sprechen.</p>
          </div>

          <div className="mt-6 space-y-3">
            {contactItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-slate-800 transition hover:border-implementers-blue/40 hover:bg-white"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 text-implementers-blue" />
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{item.label}</div>
                    <div className="text-sm font-semibold">{item.value}</div>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-slate-400" />
              </a>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://outlook.office.com/book/KIOE@tiub.onmicrosoft.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-implementers-green px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-implementers-accent"
            >
              Kostenlose Erstberatung vereinbaren
            </a>
            <a
              href="mailto:schiffer@tiub.de"
              className="inline-flex items-center justify-center rounded-full border border-implementers-green px-6 py-3 text-sm font-semibold text-implementers-green transition hover:bg-implementers-green/10"
            >
              Nachricht senden
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Kontakt;
