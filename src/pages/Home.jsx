import { Brain, Cog, MessageSquare, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const heroTiles = [
  { title: "KI-Agenten", to: "/leistungen/lokale-llms", icon: Brain, description: "Automatisierte Assistenten, die Fachwissen sicher nutzen." },
  { title: "Sprachagenten", to: "/leistungen/lokale-llms", icon: MessageSquare, description: "Natürliche Dialoge mit Ihrem On-Prem-Stack." },
  { title: "Prozessoptimierung", to: "/leistungen/prozessoptimierung", icon: Cog, description: "Effizienzsteigerung mit Lean-Ansatz und KI." },
  { title: "Projektmanagement", to: "/leistungen/projektmanagement", icon: Users, description: "Strukturierte Umsetzung mit PDCA-Ansatz." },
];

const services = [
  {
    title: "Lokale LLMs & RAG",
    description: "DSGVO-konforme Wissensagenten auf Basis von Ollama, GPT-OSS 20B und RAG-Pipelines.",
    to: "/leistungen/lokale-llms",
    icon: ShieldCheck,
  },
  {
    title: "Prozessoptimierung",
    description: "Lean, Six Sigma und KVP vereint mit Echtzeit-Kennzahlen und KI-gestützter Analyse.",
    to: "/leistungen/prozessoptimierung",
    icon: Cog,
  },
  {
    title: "Projektmanagement",
    description: "Planung, Steuerung und Umsetzung nach PDCA – messbare Ergebnisse ohne Umwege.",
    to: "/leistungen/projektmanagement",
    icon: Users,
  },
];

const highlights = [
  { label: "On-Prem & DSGVO", color: "bg-white/15" },
  { label: "Langjährige Beratungserfahrung", color: "bg-white/10" },
  { label: "KI-Agenten mit Sprachschnittstelle", color: "bg-white/15" },
];

function Home() {
  return (
    <>
      <Helmet>
        <title>The Implementers GmbH | Traditionelle Expertise trifft auf KI-Innovation</title>
        <meta
          name="description"
          content="Wir verbinden bewährte Beratungsmethoden mit modernen KI-Agenten und Sprachagenten. DSGVO-konforme LLM-Lösungen, Prozessoptimierung und Projektmanagement aus einer Hand."
        />
      </Helmet>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-16 pt-24 lg:flex-row lg:items-center lg:pt-28">
          <div className="flex-1 text-white">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white">
              <Sparkles className="h-4 w-4 text-implementers-accent" />
              KI-Agenten, Beratung und Umsetzung
            </div>
            <h1 className="font-heading text-4xl leading-tight sm:text-5xl">Traditionelle Expertise trifft auf KI-Innovation</h1>
            <p className="mt-4 max-w-2xl text-lg text-white/85">
              Wir verbinden bewährte Beratungsmethoden mit modernsten KI-Agenten und Sprachagenten, um Ihr Unternehmen in die Zukunft zu führen.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {highlights.map((item) => (
                <span
                  key={item.label}
                  className={`rounded-full ${item.color} px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white`}
                >
                  {item.label}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://outlook.office.com/book/KIOE@tiub.onmicrosoft.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-implementers-accent px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                Beratung buchen
              </a>
              <Link
                to="/leistungen/lokale-llms"
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Lokale LLMs entdecken
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <div className="grid gap-3 md:grid-cols-2">
              {heroTiles.map((tile) => (
                <Link
                  to={tile.to}
                  key={tile.title}
                  className="glass-tile group relative overflow-hidden rounded-2xl border border-white/40 p-5 transition hover:bg-black/60"
                >
                  <div className="flex items-center justify-between">
                    <tile.icon className="h-8 w-8 text-implementers-accent" />
                    <span className="text-xs font-semibold text-white/60">Mehr erfahren</span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">{tile.title}</h3>
                  <p className="mt-1 text-sm text-white/70">{tile.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16" id="about">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-10 w-1 rounded-full bg-implementers-blue" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-implementers-blue">Leistungen</p>
            <h2 className="font-heading text-3xl text-slate-900">Beratung trifft Umsetzung</h2>
          </div>
        </div>
        <p className="max-w-3xl text-base text-slate-700">
          Wir bauen KI-Agenten auf Ihren Daten, optimieren Prozesse entlang Lean- und Six-Sigma-Prinzipien und steuern Projekte nach PDCA. Immer
          DSGVO-konform, immer mit messbaren Ergebnissen.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <Link
              to={service.to}
              key={service.title}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-implementers-blue/10 text-implementers-blue">
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">{service.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{service.description}</p>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-implementers-blue">Mehr erfahren</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;

