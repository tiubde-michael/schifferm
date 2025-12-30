import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import LogoMark from "./LogoMark";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Über uns", to: "/", anchor: "about" },
  { label: "Blog", to: "/blog" },
  { label: "Kontakt", to: "/kontakt" },
];

const serviceLinks = [
  { label: "Lokale LLMs & RAG", to: "/leistungen/lokale-llms" },
  { label: "Projektmanagement", to: "/leistungen/projektmanagement" },
  { label: "Prozessoptimierung", to: "/leistungen/prozessoptimierung" },
];

const bookingUrl = "https://outlook.office.com/book/KIOE@tiub.onmicrosoft.com/";

const linkClasses = ({ isActive }) =>
  `text-sm font-medium transition hover:text-implementers-blue ${
    isActive ? "text-implementers-blue" : "text-slate-700"
  }`;

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const handleAnchorClick = (anchor) => {
    setMenuOpen(false);
    if (!anchor) return;
    setTimeout(() => {
      const element = document.getElementById(anchor);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:py-4">
        <Link to="/" className="flex items-center gap-3">
          <LogoMark />
          <div className="leading-tight">
            <div className="text-sm font-semibold text-slate-900">The Implementers GmbH</div>
            <div className="text-xs text-slate-500">Tradition trifft KI-Praxis</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((item) =>
            item.anchor ? (
              <NavLink
                key={item.label}
                to={item.to}
                className={linkClasses}
                onClick={() => handleAnchorClick(item.anchor)}
                end={item.to === "/"}
              >
                {item.label}
              </NavLink>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                className={linkClasses}
                onClick={() => setMenuOpen(false)}
                end={item.to === "/"}
              >
                {item.label}
              </NavLink>
            )
          )}

          <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
            <button
              className="flex items-center gap-1 text-sm font-medium text-slate-700 transition hover:text-implementers-blue"
              onClick={() => setServicesOpen((prev) => !prev)}
              type="button"
            >
              Leistungen
              <ChevronDown className="h-4 w-4" />
            </button>
            {servicesOpen && (
              <div className="absolute right-0 top-full z-50 pt-3">
                <div className="w-56 rounded-lg border border-slate-200 bg-white p-2 shadow-xl">
                  {serviceLinks.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setServicesOpen(false)}
                      className={({ isActive }) =>
                        `block rounded-md px-3 py-2 text-sm font-medium transition hover:bg-slate-50 ${
                          isActive ? "text-implementers-blue" : "text-slate-700"
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            )}
          </div>

          <a
            href={bookingUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-implementers-blue px-4 py-2 text-sm font-semibold text-white shadow-glow-green transition hover:-translate-y-0.5 hover:bg-implementers-green"
          >
            Beratung buchen
          </a>
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
            {navLinks.map((item) =>
              item.anchor ? (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className={linkClasses}
                  end={item.to === "/"}
                  onClick={() => handleAnchorClick(item.anchor)}
                >
                  {item.label}
                </NavLink>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={linkClasses}
                  onClick={() => setMenuOpen(false)}
                  end={item.to === "/"}
                >
                  {item.label}
                </NavLink>
              )
            )}
            <div className="pt-2">
              <div className="text-xs font-semibold uppercase text-slate-400">Leistungen</div>
              <div className="mt-1 space-y-1">
                {serviceLinks.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `block rounded-md px-2 py-2 text-sm font-medium transition hover:bg-slate-50 ${
                        isActive ? "text-implementers-blue" : "text-slate-700"
                      }`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
            <a
              href={bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-implementers-blue px-4 py-2 text-sm font-semibold text-white shadow-glow-green transition hover:bg-implementers-green"
            >
              Beratung buchen
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;

