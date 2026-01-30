import { CalendarDays } from "lucide-react";
import Link from "next/link";

function Blog({ posts = [] }) {
  return (
    <>
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
            <article key={post.slug} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              {post.coverImage ? (
                <Link href={`/blog/${post.slug}`} className="mb-4 block rounded-xl border border-slate-100 bg-slate-50 p-2">
                  <img src={post.coverImage} alt={post.title} className="h-40 w-full object-contain" loading="lazy" />
                </Link>
              ) : null}
              <div className="flex items-center gap-2 text-xs font-semibold text-implementers-blue">
                <CalendarDays className="h-4 w-4" />
                Praxisbericht
              </div>
              <h2 className="mt-3 text-xl font-semibold text-slate-900">
                <Link href={`/blog/${post.slug}`} className="hover:text-implementers-blue">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-slate-700">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 inline-flex items-center text-sm font-semibold text-implementers-blue"
              >
                Beitrag lesen
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default Blog;
