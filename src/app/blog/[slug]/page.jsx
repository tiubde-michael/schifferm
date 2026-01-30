import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "../../../content/blog/posts";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

function markdownToHtml(markdown) {
  if (!markdown) return "";
  const normalized = markdown.replace(/\r\n/g, "\n");
  const lines = normalized.split("\n");
  const html = [];
  let paragraph = [];
  let inList = false;

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    html.push(`<p>${inlineFormat(paragraph.join(" "))}</p>`);
    paragraph = [];
  };

  const closeList = () => {
    if (!inList) return;
    html.push("</ul>");
    inList = false;
  };

  const inlineFormat = (text) => {
    let output = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    output = output.replace(
      /(https?:\/\/[^\s<]+)/g,
      '<a href="$1" target="_blank" rel="noreferrer">$1</a>'
    );
    return output;
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      closeList();
      continue;
    }

    if (line.startsWith("### ")) {
      flushParagraph();
      closeList();
      html.push(`<h3>${inlineFormat(line.slice(4))}</h3>`);
      continue;
    }
    if (line.startsWith("## ")) {
      flushParagraph();
      closeList();
      html.push(`<h2>${inlineFormat(line.slice(3))}</h2>`);
      continue;
    }
    if (line.startsWith("# ")) {
      flushParagraph();
      closeList();
      html.push(`<h1>${inlineFormat(line.slice(2))}</h1>`);
      continue;
    }
    if (line.startsWith("- ")) {
      flushParagraph();
      if (!inList) {
        html.push("<ul>");
        inList = true;
      }
      html.push(`<li>${inlineFormat(line.slice(2))}</li>`);
      continue;
    }

    const hardBreak = rawLine.endsWith("  ");
    paragraph.push(hardBreak ? `${line}<br />` : line);
  }

  flushParagraph();
  closeList();

  return html.join("");
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  if (!post) return {};
  const url = `${siteUrl}/blog/${post.slug}/`;
  const ogImage = post.ogImage ? `${siteUrl}${post.ogImage}` : undefined;
  const author = post.author || "Michael Schiffer";
  const publishedTime = post.date ? new Date(post.date).toISOString() : undefined;

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: author }],
    other: {
      author,
    },
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime,
      authors: [author],
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 627,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  if (!post) return notFound();
  const orderedPosts = getAllPosts()
    .slice()
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  const currentIndex = orderedPosts.findIndex((item) => item.slug === post.slug);
  const prevPost = currentIndex > 0 ? orderedPosts[currentIndex - 1] : null;
  const nextPost = currentIndex >= 0 ? orderedPosts[currentIndex + 1] : null;
  let markdown = post.bodyMarkdown;
  if (markdown) {
    const trimmed = markdown.trimStart();
    if (trimmed.startsWith("# ")) {
      markdown = trimmed.replace(/^# .*?\n/, "");
    }
  }
  const bodyHtml = post.bodyHtml || post.body || markdownToHtml(markdown);

  return (
    <section className="mx-auto max-w-3xl px-4 py-14">
      <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-implementers-blue/10">
        <p className="text-xs font-semibold uppercase tracking-wide text-implementers-blue">Blog</p>
        <h1 className="mt-2 font-heading text-3xl text-slate-900">{post.title}</h1>
        <p className="mt-2 text-slate-700">{post.excerpt}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          {prevPost ? (
            <Link
              href={`/blog/${prevPost.slug}`}
              className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-implementers-blue/40 hover:text-implementers-blue"
            >
              Vorheriger Artikel
            </Link>
          ) : null}
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-implementers-blue/40 hover:text-implementers-blue"
          >
            Zur Übersicht
          </Link>
          {nextPost ? (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="inline-flex items-center justify-center rounded-full bg-implementers-blue px-4 py-2 text-sm font-semibold text-white shadow-glow-green transition hover:-translate-y-0.5 hover:bg-implementers-green"
            >
              Nächster Artikel
            </Link>
          ) : null}
        </div>
        {post.coverImage ? (
          <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-2">
            <img src={post.coverImage} alt={post.title} className="max-h-[480px] w-full object-contain" />
          </div>
        ) : null}
        <div
          className="mt-6 space-y-4 text-slate-700 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-slate-900 [&_ul]:list-disc [&_ul]:pl-6"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />
      </article>
    </section>
  );
}
