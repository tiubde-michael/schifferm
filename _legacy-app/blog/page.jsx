import Blog from "../../components/pages/Blog";
import { getAllPosts } from "../../content/blog/posts";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  title: "Blog",
  description: "Aktuelle Projekte und Einblicke zu lokalen LLMs, Prozessoptimierung und Projektmanagement.",
  openGraph: {
    title: "Blog | The Implementers GmbH",
    description: "Aktuelle Projekte und Einblicke zu lokalen LLMs, Prozessoptimierung und Projektmanagement.",
    url: `${siteUrl}/blog`,
    images: [
      {
        url: `${siteUrl}/blog/og-1200x627.png`,
        width: 1200,
        height: 627,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  const posts = getAllPosts()
    .slice()
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  return <Blog posts={posts} />;
}
