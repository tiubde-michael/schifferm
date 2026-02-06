import "../globals.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { buildStructuredData } from "../../lib/structuredData";
import { profileContent } from "../../content/profile";
import { siteConfig } from "../../lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return siteConfig.locales.map((lang) => ({ lang }));
}

export default async function RootLayout({ children, params }) {
  const resolvedParams = await params;
  const lang = siteConfig.locales.includes(resolvedParams?.lang) ? resolvedParams.lang : siteConfig.defaultLocale;
  const structuredData = buildStructuredData({ lang, content: profileContent });

  return (
    <html lang={lang}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <Header />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
