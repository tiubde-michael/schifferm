import Link from "next/link";
import LogoMark from "./LogoMark";

const legalLinks = [
  { to: "/impressum", label: "Impressum" },
  { to: "/disclaimer", label: "Disclaimer" },
  { to: "/datenschutz", label: "Datenschutz" },
];

function Footer() {
  return (
    <footer className="mt-16 bg-slate-900 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <LogoMark className="h-9 w-12" />
            <div className="text-lg font-semibold text-white">The Implementers GmbH</div>
          </div>
          <p className="mt-3 max-w-xl text-sm text-slate-300">
            Wir bringen traditionelle Beratung und KI-Agenten zusammen, damit Ihre Vorhaben schneller
            Wirkung zeigen.
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 md:items-end">
          <div className="flex gap-4">
            {legalLinks.map((item) => (
              <Link key={item.to} href={item.to} className="text-sm text-slate-200 hover:text-implementers-accent">
                {item.label}
              </Link>
            ))}
          </div>
          <a
            href="https://outlook.office.com/book/KIOE@tiub.onmicrosoft.com/"
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-implementers-green px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-implementers-accent"
          >
            Kostenlose Erstberatung
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
