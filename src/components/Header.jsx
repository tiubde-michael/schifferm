"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoMark from "./LogoMark";
import { labels } from "../lib/i18n";

const linkClasses = (isActive) =>
  `text-sm font-medium transition hover:text-implementers-blue ${isActive ? "text-implementers-blue" : "text-slate-700"}`;

const getLocaleFromPath = (pathname) => (pathname?.startsWith("/en") ? "en" : "de");

const buildNav = (lang) => {
  const nav = labels[lang].navigation;
  return [
    { label: nav.home, href: `/${lang}` },
    { label: nav.profile, href: `/${lang}/profile` },
    { label: nav.skills, href: `/${lang}/skills` },
    { label: nav.projects, href: `/${lang}/projects` },
    { label: nav.certifications, href: `/${lang}/certifications` },
    { label: nav.publications, href: `/${lang}/publications` },
    { label: nav.machineReadable, href: `/${lang}/machine-readable` },
  ];
};

const buildLanguageHref = (pathname, targetLang) => {
  if (!pathname) return `/${targetLang}`;
  if (pathname.startsWith("/de")) return pathname.replace("/de", `/${targetLang}`);
  if (pathname.startsWith("/en")) return pathname.replace("/en", `/${targetLang}`);
  return `/${targetLang}`;
};

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const lang = getLocaleFromPath(pathname);
  const navLinks = buildNav(lang);
  const toggleLang = lang === "de" ? "en" : "de";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:py-4">
        <Link href={`/${lang}`} className="flex items-center gap-3">
          <LogoMark />
          <div className="leading-tight">
            <div className="text-sm font-semibold text-slate-900">Michael Schiffer</div>
            <div className="text-xs text-slate-500">AI-first Professional Authority</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {navLinks.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link key={item.href} href={item.href} className={linkClasses(isActive)}>
                {item.label}
              </Link>
            );
          })}
          <Link
            href={buildLanguageHref(pathname, toggleLang)}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600 transition hover:border-implementers-blue hover:text-implementers-blue"
          >
            {toggleLang.toUpperCase()}
          </Link>
        </nav>

        <button
          className="inline-flex items-center rounded-md border border-slate-200 p-2 text-slate-700 lg:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Navigation öffnen oder schließen"
          type="button"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden">
          <div className="space-y-2 border-t border-slate-200 bg-white px-4 py-3">
            {navLinks.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={linkClasses(isActive)}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href={buildLanguageHref(pathname, toggleLang)}
              className="mt-2 inline-flex w-full items-center justify-center rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600"
              onClick={() => setMenuOpen(false)}
            >
              {toggleLang.toUpperCase()}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
