import Link from "next/link";
import { useLang } from "@/lib/lang-context";
import { useCursor } from "@/lib/cursor-context";
import { sectionLinks, useSection } from "@/lib/sections";
import { dict, t } from "@/lib/i18n";
import Media from "./Media";

const year = new Date().getFullYear();

export default function MoreSection() {
  const { lang } = useLang();
  const section = useSection();
  const cursor = useCursor();

  return (
    <section className="more" aria-labelledby="more-title">
      <div className="flex flex-1 flex-col items-center justify-center">
        <h2 id="more-title" className="t-heading mb-5">
          {t(dict.more.title, lang)}
        </h2>
        <ul className="more-list t-mega">
          {sectionLinks(lang, { withInfo: true }).map((l) => (
            <li key={l.key}>
              <Link
                href={l.href}
                className={l.key === section ? "u-active" : ""}
                aria-current={l.key === section ? "page" : undefined}
                onPointerEnter={() =>
                  cursor.show({
                    kind: "preview",
                    content: <Media project={l.preview} index={0} ratio="4 / 5" alt="" sizes="300px" />,
                  })
                }
                onPointerLeave={cursor.hide}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <footer className="t-label mt-20 flex flex-wrap justify-center gap-x-6 gap-y-2 lg:mb-14">
        <span>© {year} Victoria Carelli</span>
        <a href="mailto:hello@victoriacarelli.com" className="u-hover">
          hello<em>@</em>victoriacarelli.com
        </a>
        <button
          type="button"
          className="u-hover uppercase"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          {t(dict.more.top, lang)} ↑
        </button>
      </footer>
    </section>
  );
}
