import { useLang } from "@/lib/lang-context";
import { themes, useTheme } from "@/lib/theme-context";
import { dict, t } from "@/lib/i18n";

// The active swatch is sized from html[data-theme] in CSS, so it is right before hydration.
export default function ThemeSwatches({ className = "" }: { className?: string }) {
  const { theme, select } = useTheme();
  const { lang } = useLang();

  return (
    <div className={className} role="group" aria-label={t(dict.nav.palette, lang)}>
      {themes.map((n) => (
        <button
          key={n}
          type="button"
          className="swatch"
          data-swatch={n}
          aria-pressed={theme === n}
          aria-label={t(dict.themes[n], lang)}
          title={t(dict.themes[n], lang)}
          onClick={() => select(n)}
        >
          <span />
        </button>
      ))}
    </div>
  );
}
