import Link from "next/link";
import { useLang } from "@/lib/lang-context";
import { dict, t } from "@/lib/i18n";
import { projects, type Project } from "@/lib/projects";
import CoverTile from "@/components/CoverTile";
import type { Lang } from "@/lib/i18n";

export default function Home() {
  const { lang } = useLang();
  const featured = projects.slice(0, 5);

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-[1600px] px-6 md:px-10 pt-10 md:pt-20 pb-20 md:pb-28">
        <div className="flex items-center gap-3 text-[12px] uppercase tracking-[0.22em] text-[var(--muted)] fade-up">
          <span className="inline-block w-8 h-px bg-[var(--muted)]" />
          {t(dict.home.eyebrow, lang)}
        </div>

        <h1 className="font-display text-[clamp(3rem,12vw,12rem)] leading-[0.92] mt-8 fade-up">
          Victoria
          <br />
          <span className="italic font-light">Carelli</span>
          <span className="text-[var(--accent)]">.</span>
        </h1>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <ul className="md:col-span-5 flex flex-wrap md:flex-col gap-x-4 gap-y-1 text-[15px] md:text-base">
            {t(dict.home.roles, lang).map((role, i) => (
              <li key={role} className="flex items-baseline gap-3">
                <span className="font-mono text-[11px] tabular-nums text-[var(--muted)] w-6">
                  0{i + 1}
                </span>
                <span className="font-display text-2xl md:text-3xl tracking-tight">
                  {role}
                </span>
              </li>
            ))}
          </ul>

          <p className="md:col-span-6 md:col-start-7 text-base md:text-lg leading-relaxed text-[var(--foreground)]/80 max-w-xl">
            {t(dict.home.intro, lang)}
          </p>
        </div>
      </section>

      {/* Selected work */}
      <section className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="flex items-end justify-between border-t hairline pt-6 mb-10">
          <h2 className="text-[12px] uppercase tracking-[0.22em] text-[var(--muted)]">
            {t(dict.home.selectedWork, lang)} — 2023 / 2025
          </h2>
          <Link href="/work" className="text-[13px] link-underline">
            {t(dict.home.viewAll, lang)} →
          </Link>
        </div>

        <div className="grid grid-cols-12 gap-6 md:gap-8">
          <Link href={`/work/${featured[0].slug}`} className="group col-span-12 md:col-span-7">
            <CoverTile project={featured[0]} label={t(dict.disciplines[featured[0].discipline], lang)} />
            <ProjectMeta p={featured[0]} lang={lang} />
          </Link>

          <Link href={`/work/${featured[1].slug}`} className="group col-span-12 md:col-span-5 md:mt-24">
            <CoverTile project={featured[1]} label={t(dict.disciplines[featured[1].discipline], lang)} />
            <ProjectMeta p={featured[1]} lang={lang} />
          </Link>

          <Link
            href={`/work/${featured[2].slug}`}
            className="group col-span-6 md:col-span-4 md:col-start-2 md:mt-12"
          >
            <CoverTile project={featured[2]} label={t(dict.disciplines[featured[2].discipline], lang)} />
            <ProjectMeta p={featured[2]} lang={lang} />
          </Link>

          <Link
            href={`/work/${featured[3].slug}`}
            className="group col-span-6 md:col-span-6 md:col-start-7"
          >
            <CoverTile project={featured[3]} label={t(dict.disciplines[featured[3].discipline], lang)} />
            <ProjectMeta p={featured[3]} lang={lang} />
          </Link>

          <Link
            href={`/work/${featured[4].slug}`}
            className="group col-span-12 md:col-span-6 md:col-start-4 md:mt-16"
          >
            <CoverTile project={featured[4]} label={t(dict.disciplines[featured[4].discipline], lang)} />
            <ProjectMeta p={featured[4]} lang={lang} />
          </Link>
        </div>
      </section>

      {/* Index of disciplines */}
      <section className="mx-auto max-w-[1600px] px-6 md:px-10 mt-32 md:mt-48">
        <h2 className="text-[12px] uppercase tracking-[0.22em] text-[var(--muted)] border-t hairline pt-6 mb-10">
          {t(dict.home.indexLabel, lang)}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 border-y hairline">
          {(["photography", "graphic", "direction"] as const).map((d, i) => (
            <Link
              key={d}
              href={`/work#${d}`}
              className={`group flex items-baseline justify-between py-10 md:py-14 px-2 md:px-6 hover:bg-[var(--line)]/40 transition-colors ${
                i < 2 ? "border-b md:border-b-0 md:border-r hairline" : ""
              }`}
            >
              <span className="font-mono text-[11px] tabular-nums text-[var(--muted)]">0{i + 1}</span>
              <span className="font-display text-3xl md:text-4xl tracking-tight">
                {t(dict.disciplines[d], lang)}
              </span>
              <span className="text-[var(--muted)] group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Availability */}
      <section className="mx-auto max-w-[1600px] px-6 md:px-10 mt-24 md:mt-32 mb-12">
        <div className="flex items-center gap-3 text-[12px] uppercase tracking-[0.22em] text-[var(--muted)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
          </span>
          {t(dict.home.available, lang)}
        </div>
      </section>
    </div>
  );
}

function ProjectMeta({ p, lang }: { p: Project; lang: Lang }) {
  return (
    <div className="mt-4 flex items-baseline justify-between gap-4 text-[13px]">
      <span className="font-display text-base md:text-lg tracking-tight">{p.title[lang]}</span>
      <span className="font-mono tabular-nums text-[var(--muted)]">{p.year}</span>
    </div>
  );
}
