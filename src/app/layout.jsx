import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "The Implementers GmbH",
    template: "%s | The Implementers GmbH",
  },
  description:
    "Wir verbinden traditionelle Beratungsmethoden mit modernen KI-Agenten und Sprachagenten. DSGVO-konforme LLM-Lösungen, Prozessoptimierung und Projektmanagement aus einer Hand.",
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: siteUrl,
    siteName: "The Implementers GmbH",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <Header />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
