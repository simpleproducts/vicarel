import type { ReactNode } from "react";
import { useDocumentLang, useLang } from "@/lib/lang-context";
import { useSection } from "@/lib/sections";
import { dict, t } from "@/lib/i18n";
import SiteHeader from "./SiteHeader";
import SiteNav from "./SiteNav";
import ThemeSwatches from "./ThemeSwatches";
import MoreSection from "./MoreSection";
import Curtain from "./Curtain";

export default function Shell({ children }: { children: ReactNode }) {
  const { lang } = useLang();
  const section = useSection();
  useDocumentLang();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[70] focus:bg-fg focus:px-3 focus:py-2 focus:text-on-fg t-label"
      >
        {t(dict.nav.skip, lang)}
      </a>
      <div className="backdrop" aria-hidden />
      <SiteHeader />
      <SiteNav />
      <ThemeSwatches className="swatches" />
      <main id="main" className={`page ${section === "info" ? "page--info" : ""}`}>
        {children}
      </main>
      <MoreSection />
      <Curtain />
    </>
  );
}
