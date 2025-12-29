import { CalendarDays } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const posts = [
  {
    title: "Arztdokumentation mit lokaler LLM",
    excerpt: "Wie ein On-Prem LLM medizinische Dokumentation beschleunigt und gleichzeitig Datenschutz sicherstellt.",
  },
  {
    title: "Automatische Auswertung von Schmerzfragebögen",
    excerpt: "Schnellere Auswertung, bessere Patientensicht – KI-gestützte Auswertung mit klaren Guardrails.",
  },
];

function Blog() {
  return (
    <>
      <Helmet>
        <title>Blog | The Implementers GmbH</title>
        <meta
          name="description"
          content="Aktuelle Projekte und Einblicke zu lokalen LLMs, Prozessoptimierung und Projektmanagement."
        />
      </Helmet>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-implementers-blue">Blog</p>
          <h1 className="font-heading text-3xl text-slate-900">Einblicke aus Projekten</h1>
          <p className="mt-2 text-slate-700">
            Praxisnahe Beispiele, wie wir KI-Agenten und strukturierte Methoden einsetzen.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <article key={post.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold text-implementers-blue">
                <CalendarDays className="h-4 w-4" />
                Praxisbericht
              </div>
              <h2 className="mt-3 text-xl font-semibold text-slate-900">{post.title}</h2>
              <p className="mt-2 text-sm text-slate-700">{post.excerpt}</p>
              <Link
                to="/kontakt"
                className="mt-4 inline-flex items-center text-sm font-semibold text-implementers-blue"
              >
                Details anfragen
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default Blog;
