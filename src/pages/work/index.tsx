import Link from "next/link";
import { useLang } from "@/lib/lang-context";
import { dict, t } from "@/lib/i18n";
import { disciplineOrder, projects } from "@/lib/projects";
import CoverTile from "@/components/CoverTile";

export default function WorkIndex() {
  const { lang } = useLang();

  return (
    <div className="mx-auto max-w-[1600px] px-6 md:px-10 pt-10 md:pt-16">
      <header className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-16 md:pb-24 border-b hairline">
        <div className="md:col-span-7">
          <p className="text-[12px] uppercase tracking-[0.22em] text-[var(--muted)] mb-6">
            {t(dict.work.title, lang)} — 2022 / 2025
          </p>
          <h1 className="font-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] tracking-tight">
            <span className="italic font-light">Selected</span>
            <br />
            archive
            <span className="text-[var(--accent)]">.</span>
          </h1>
        </div>
        <p className="md:col-span-4 md:col-start-9 text-base md:text-lg leading-relaxed text-[var(--foreground)]/80 self-end">
          {t(dict.work.lede, lang)}
        </p>
      </header>

      {disciplineOrder.map((d) => {
        const items = projects.filter((p) => p.discipline === d);
        return (
          <section key={d} id={d} className="pt-16 md:pt-24 scroll-mt-28">
            <div className="flex items-baseline justify-between mb-10">
              <h2 className="font-display text-3xl md:text-5xl tracking-tight">
                {t(dict.disciplines[d], lang)}
              </h2>
              <span className="font-mono text-[11px] tabular-nums text-[var(--muted)]">
                {String(items.length).padStart(2, "0")} {lang === "es" ? "proyectos" : "projects"}
              </span>
            </div>

            <div className="grid grid-cols-12 gap-6 md:gap-8">
              {items.map((p, i) => {
                const span =
                  i % 3 === 0
                    ? "col-span-12 md:col-span-7"
                    : i % 3 === 1
                    ? "col-span-6 md:col-span-5"
                    : "col-span-6 md:col-span-5 md:col-start-4";
                return (
                  <Link key={p.slug} href={`/work/${p.slug}`} className={`group ${span}`}>
                    <CoverTile project={p} label={t(dict.disciplines[p.discipline], lang)} />
                    <div className="mt-4 flex items-baseline justify-between gap-4 text-[13px]">
                      <span className="font-display text-base md:text-lg tracking-tight">
                        {p.title[lang]}
                      </span>
                      <span className="font-mono tabular-nums text-[var(--muted)]">{p.year}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
