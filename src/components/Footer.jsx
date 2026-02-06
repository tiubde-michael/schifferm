"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoMark from "./LogoMark";

const getLocaleFromPath = (pathname) => (pathname?.startsWith("/en") ? "en" : "de");

function Footer() {
  const pathname = usePathname();
  const lang = getLocaleFromPath(pathname);
  const legalLinks =
    lang === "en"
      ? [
          { href: "/en/imprint", label: "Imprint" },
          { href: "/en/privacy", label: "Privacy" },
        ]
      : [
          { href: "/de/impressum", label: "Impressum" },
          { href: "/de/datenschutz", label: "Datenschutz" },
        ];

  return (
    <footer className="mt-16 bg-slate-900 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <LogoMark className="h-9 w-12" />
            <div className="text-lg font-semibold text-white">Michael Schiffer</div>
          </div>
          <p className="mt-3 max-w-xl text-sm text-slate-300">
            AI-first professional authority site with structured data, machine-readable endpoints, and a concise
            operational profile.
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 md:items-end">
          <div className="text-sm text-slate-300">
            <div>Spremberg, Deutschland</div>
            <div>
              <a href="mailto:Schiffer@TIUB.de" className="hover:text-implementers-accent">
                Schiffer@TIUB.de
              </a>
            </div>
            <div>
              <a href="tel:+491722564248" className="hover:text-implementers-accent">
                +49 172 25 6 42 48
              </a>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href={`/${lang}/machine-readable`} className="text-sm text-slate-200 hover:text-implementers-accent">
              Machine-Readable
            </Link>
            {legalLinks.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-slate-200 hover:text-implementers-accent">
                {item.label}
              </Link>
            ))}
            <a href="https://the-implementers.de" className="text-sm text-slate-200 hover:text-implementers-accent">
              the-implementers.de
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
