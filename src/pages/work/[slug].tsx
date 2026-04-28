import Link from "next/link";
import { useRouter } from "next/router";
import { useLang } from "@/lib/lang-context";
import { dict, t } from "@/lib/i18n";
import { projects } from "@/lib/projects";
import CoverTile from "@/components/CoverTile";

export default function ProjectPage() {
  const { lang } = useLang();
  const { query } = useRouter();
  const slug = typeof query.slug === "string" ? query.slug : "";
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="mx-auto max-w-[800px] px-6 md:px-10 pt-20 pb-32 text-center">
        <p className="text-[12px] uppercase tracking-[0.22em] text-[var(--muted)] mb-4">404</p>
        <h1 className="font-display text-4xl md:text-6xl">
          {lang === "es" ? "Proyecto no encontrado" : "Project not found"}
        </h1>
        <Link href="/work" className="link-underline mt-8 inline-block">
          ← {t(dict.nav.work, lang)}
        </Link>
      </div>
    );
  }

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <div className="mx-auto max-w-[1600px] px-6 md:px-10 pt-10 md:pt-16">
      <header className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-12 md:mb-20">
        <div className="md:col-span-7">
          <p className="text-[12px] uppercase tracking-[0.22em] text-[var(--muted)] mb-6">
            {t(dict.disciplines[project.discipline], lang)} · {project.year}
          </p>
          <h1 className="font-display text-[clamp(2.25rem,7vw,6rem)] leading-[0.98] tracking-tight">
            {project.title[lang]}
          </h1>
        </div>
        {project.client && (
          <div className="md:col-span-3 md:col-start-9 self-end text-[13px]">
            <p className="text-[var(--muted)] uppercase tracking-[0.2em] mb-2">
              {lang === "es" ? "Cliente" : "Client"}
            </p>
            <p className="font-display text-lg">{project.client}</p>
          </div>
        )}
      </header>

      <CoverTile project={project} />

      <div className="mt-8 grid grid-cols-12 gap-6 md:gap-8">
        <CoverTile project={{ ...project, cover: { ...project.cover, ratio: "3 / 4" } }} />
        <div className="col-span-6">
          <CoverTile
            project={{
              ...project,
              cover: { ...project.cover, hue: (project.cover.hue + 30) % 360, ratio: "1 / 1" },
            }}
          />
        </div>
        <div className="col-span-6">
          <CoverTile
            project={{
              ...project,
              cover: { ...project.cover, hue: (project.cover.hue + 320) % 360, ratio: "1 / 1" },
            }}
          />
        </div>
      </div>

      <Link
        href={`/work/${next.slug}`}
        className="group block mt-32 md:mt-48 border-t hairline pt-10"
      >
        <p className="text-[12px] uppercase tracking-[0.22em] text-[var(--muted)] mb-4">
          {lang === "es" ? "Siguiente" : "Next"}
        </p>
        <div className="flex items-baseline justify-between">
          <h3 className="font-display text-3xl md:text-5xl tracking-tight">
            {next.title[lang]}
          </h3>
          <span className="text-[var(--muted)] group-hover:translate-x-2 transition-transform">→</span>
        </div>
      </Link>
    </div>
  );
}
