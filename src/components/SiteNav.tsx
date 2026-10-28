import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, type CSSProperties } from "react";
import { useLang } from "@/lib/lang-context";
import { sectionLinks, useSection } from "@/lib/sections";
import { dict, t } from "@/lib/i18n";
import LangToggle from "./LangToggle";
import ThemeSwatches from "./ThemeSwatches";

export default function SiteNav() {
  const { lang } = useLang();
  const section = useSection();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);

  const links = sectionLinks(lang);
  const currentKey = section && section !== "info" ? section : "overview";
  const current = links.find((l) => l.key === currentKey) ?? links[0];

  useEffect(() => {
    const close = () => {
      setOpen(false);
      setMenu(false);
    };
    router.events.on("routeChangeStart", close);
    return () => router.events.off("routeChangeStart", close);
  }, [router.events]);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", menu);
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  return (
    <>
      <nav className="site-nav blend t-label" aria-label={t(dict.nav.menu, lang)}>
        <div className="hidden lg:flex items-end gap-7">
          <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
            }}
          >
            <ul
              id="nav-sections"
              className={`absolute bottom-full left-0 min-w-max pb-[0.4em] space-y-[0.3em] ${open ? "block" : "hidden"}`}
            >
              {links
                .filter((l) => l.key !== currentKey)
                .map((l) => (
                  <li key={l.key}>
                    <Link href={l.href} className="u-hover">
                      {l.label}
                    </Link>
                  </li>
                ))}
            </ul>
            <button
              type="button"
              className="flex gap-2"
              aria-expanded={open}
              aria-controls="nav-sections"
              onClick={() => setOpen((o) => !o)}
            >
              <span aria-hidden>{open ? "↓" : "↑"}</span>
              <span className={section && section !== "info" ? "u-active" : ""}>{current.label}</span>
            </button>
          </div>
          <Link
            href="/info"
            className={section === "info" ? "u-active" : "u-hover"}
            aria-current={section === "info" ? "page" : undefined}
          >
            {t(dict.nav.info, lang)}
          </Link>
          <LangToggle />
        </div>

        <button
          type="button"
          className="lg:hidden flex gap-2"
          aria-expanded={menu}
          aria-controls="mobile-menu"
          onClick={() => setMenu((m) => !m)}
        >
          {menu ? t(dict.nav.close, lang) : t(dict.nav.menu, lang)}
          <span aria-hidden>{menu ? "↑" : "↓"}</span>
        </button>
      </nav>

      {menu && (
        <div id="mobile-menu" className="mobile-menu lg:hidden">
          <ul className="t-mega space-y-[0.08em]">
            {sectionLinks(lang, { withInfo: true }).map((l, i) => (
              <li key={l.key} style={{ "--i": i } as CSSProperties}>
                <Link
                  href={l.href}
                  className={l.key === section ? "u-active" : ""}
                  aria-current={l.key === section ? "page" : undefined}
                  onClick={() => setMenu(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="t-label flex items-center justify-between pt-10">
            <LangToggle />
            <ThemeSwatches className="flex items-center gap-2" />
          </div>
        </div>
      )}
    </>
  );
}
