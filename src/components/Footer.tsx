import { useLang } from "@/lib/lang-context";
import { dict, t } from "@/lib/i18n";

export default function Footer() {
  const { lang } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-32 border-t hairline">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-[13px] text-[var(--muted)]">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
          <span className="font-display text-[var(--foreground)] text-base">Victoria Carelli</span>
          <span>
            © {year} — {t(dict.footer.rights, lang)}
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a href="mailto:hello@victoriacarelli.com" className="link-underline">
            hello@victoriacarelli.com
          </a>
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noreferrer"
            className="link-underline"
          >
            Instagram
          </a>
          <a
            href="https://www.behance.net/"
            target="_blank"
            rel="noreferrer"
            className="link-underline"
          >
            Behance
          </a>
        </div>
      </div>
    </footer>
  );
}
