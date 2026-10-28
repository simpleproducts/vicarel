import { Fragment } from "react";
import { useLang } from "@/lib/lang-context";
import { dict, t, type Lang } from "@/lib/i18n";

const langs: Lang[] = ["es", "en"];

export default function LangToggle() {
  const { lang, setLang } = useLang();

  return (
    <div className="flex gap-1" role="group" aria-label={t(dict.nav.language, lang)}>
      {langs.map((l, i) => (
        <Fragment key={l}>
          {i > 0 && <span aria-hidden>/</span>}
          <button
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            className={lang === l ? "u-active" : "opacity-50 hover:opacity-100"}
          >
            {l.toUpperCase()}
          </button>
        </Fragment>
      ))}
    </div>
  );
}
