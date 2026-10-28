import Link from "next/link";
import { useLang } from "@/lib/lang-context";
import { useSection } from "@/lib/sections";
import { dict, t } from "@/lib/i18n";

export default function SiteHeader() {
  const { lang } = useLang();
  const section = useSection();

  return (
    <header className="site-header blend">
      <Link href="/" className="t-display inline-block">
        <span className="block lg:inline">Victoria</span> <span className="block lg:inline">Carelli</span>
      </Link>
      {/* On /info the name opens the sentence that continues in the page. */}
      {section === "info" && (
        <p className="t-display hidden lg:block" aria-hidden>
          {t(dict.header.is, lang)}
        </p>
      )}
    </header>
  );
}
