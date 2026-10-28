import { useRouter } from "next/router";
import { dict, t, type Lang } from "@/lib/i18n";
import {
  disciplineFromSlug,
  disciplineOrder,
  disciplineSlug,
  projects,
  studio,
  type Discipline,
  type Project,
} from "@/lib/projects";

export type Section = "overview" | Discipline | "info";

export type SectionLink = { key: Section; href: string; label: string; preview: Project };

export function sectionLinks(lang: Lang, { withInfo = false } = {}): SectionLink[] {
  const links: SectionLink[] = [
    { key: "overview", href: "/", label: t(dict.nav.overview, lang), preview: projects[0] },
    ...disciplineOrder.map((d) => ({
      key: d,
      href: `/${disciplineSlug[d]}`,
      label: t(dict.disciplines[d], lang),
      preview: projects.find((p) => p.discipline === d) ?? projects[0],
    })),
  ];
  if (withInfo) links.push({ key: "info", href: "/info", label: t(dict.nav.info, lang), preview: studio });
  return links;
}

export function useSection(): Section | null {
  const { pathname, query } = useRouter();
  if (pathname === "/") return "overview";
  if (pathname === "/info") return "info";
  if (pathname === "/[discipline]") return disciplineFromSlug(query.discipline);
  if (pathname === "/work/[slug]") return projects.find((p) => p.slug === query.slug)?.discipline ?? null;
  return null;
}
