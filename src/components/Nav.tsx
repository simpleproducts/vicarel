import Link from "next/link";
import { useRouter } from "next/router";
import { useLang } from "@/lib/lang-context";
import { dict, t } from "@/lib/i18n";

export default function Nav() {
  const { lang, setLang } = useLang();
  const { pathname } = useRouter();

  const items = [
    { href: "/work", label: t(dict.nav.work, lang) },
    { href: "/about", label: t(dict.nav.about, lang) },
    { href: "/contact", label: t(dict.nav.contact, lang) },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/80 backdrop-blur-md">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-[15px] md:text-base tracking-tight"
          aria-label="Victoria Carelli — Home"
        >
          Victoria Carelli
        </Link>

        <nav className="flex items-center gap-6 md:gap-10 text-[13px] uppercase tracking-[0.18em]">
          {items.map((it) => {
            const active = pathname === it.href || pathname.startsWith(it.href + "/");
            return (
              <Link
                key={it.href}
                href={it.href}
                className={`link-underline ${active ? "text-[var(--foreground)]" : "text-[var(--muted)] hover:text-[var(--foreground)]"}`}
              >
                {it.label}
              </Link>
            );
          })}

          <span className="hidden md:inline-block w-px h-4 bg-[var(--line)]" aria-hidden />

          <div className="flex items-center gap-1 text-[var(--muted)]">
            <button
              onClick={() => setLang("es")}
              className={lang === "es" ? "text-[var(--foreground)]" : "hover:text-[var(--foreground)]"}
              aria-pressed={lang === "es"}
            >
              ES
            </button>
            <span aria-hidden>/</span>
            <button
              onClick={() => setLang("en")}
              className={lang === "en" ? "text-[var(--foreground)]" : "hover:text-[var(--foreground)]"}
              aria-pressed={lang === "en"}
            >
              EN
            </button>
          </div>
        </nav>
      </div>
      <div className="h-px bg-[var(--line)]" />
    </header>
  );
}
