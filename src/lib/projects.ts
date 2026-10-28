export type Discipline = "photography" | "graphic" | "direction";

export type Project = {
  slug: string;
  discipline: Discipline;
  title: { es: string; en: string };
  summary: { es: string; en: string };
  client?: string;
  year: number;
  // Base colour for the generated placeholder plates.
  tone: { hue: number; sat: number; light: number };
  // Real photographs under /public, e.g. "/work/casa-violeta/01.jpg". Replace the plates when set.
  images?: string[];
};

export const projects: Project[] = [
  {
    slug: "casa-violeta",
    discipline: "direction",
    title: { es: "Casa Violeta — Identidad", en: "Casa Violeta — Identity" },
    summary: {
      es: "Identidad visual y *dirección de arte* para Casa Violeta.",
      en: "Visual identity and *art direction* for Casa Violeta.",
    },
    client: "Casa Violeta",
    year: 2025,
    tone: { hue: 18, sat: 36, light: 78 },
  },
  {
    slug: "estudio-mar",
    discipline: "photography",
    title: { es: "Estudio Mar — Editorial", en: "Estudio Mar — Editorial" },
    summary: {
      es: "Una serie *editorial* para Revista Mar.",
      en: "An *editorial* series for Revista Mar.",
    },
    client: "Revista Mar",
    year: 2025,
    tone: { hue: 200, sat: 18, light: 70 },
  },
  {
    slug: "ferment",
    discipline: "graphic",
    title: { es: "Ferment — Packaging", en: "Ferment — Packaging" },
    summary: {
      es: "Un sistema de *packaging* para Ferment Co.",
      en: "A *packaging* system for Ferment Co.",
    },
    client: "Ferment Co.",
    year: 2024,
    tone: { hue: 38, sat: 48, light: 64 },
  },
  {
    slug: "noche-clara",
    discipline: "photography",
    title: { es: "Noche Clara — Serie", en: "Noche Clara — Series" },
    summary: {
      es: "Una serie de autor, *de noche*.",
      en: "An authored series, *after dark*.",
    },
    year: 2024,
    tone: { hue: 244, sat: 22, light: 28 },
  },
  {
    slug: "atlas",
    discipline: "graphic",
    title: { es: "Atlas — Libro", en: "Atlas — Book" },
    summary: {
      es: "Diseño *editorial* de un libro para Editorial Atlas.",
      en: "*Editorial* design of a book for Editorial Atlas.",
    },
    client: "Editorial Atlas",
    year: 2024,
    tone: { hue: 12, sat: 60, light: 50 },
  },
  {
    slug: "tres-estaciones",
    discipline: "direction",
    title: { es: "Tres Estaciones — Campaña", en: "Tres Estaciones — Campaign" },
    summary: {
      es: "Dirección de arte de *campaña* para Tres Estaciones.",
      en: "*Campaign* art direction for Tres Estaciones.",
    },
    client: "Tres Estaciones",
    year: 2023,
    tone: { hue: 150, sat: 22, light: 58 },
  },
  {
    slug: "panaderia-norte",
    discipline: "photography",
    title: { es: "Panadería Norte", en: "Panadería Norte" },
    summary: {
      es: "Fotografía de *producto* para Panadería Norte.",
      en: "*Product* photography for Panadería Norte.",
    },
    client: "Panadería Norte",
    year: 2023,
    tone: { hue: 28, sat: 52, light: 60 },
  },
  {
    slug: "marea-baja",
    discipline: "direction",
    title: { es: "Marea Baja — Editorial", en: "Marea Baja — Editorial" },
    summary: {
      es: "Dirección de arte *editorial*.",
      en: "*Editorial* art direction.",
    },
    year: 2023,
    tone: { hue: 188, sat: 28, light: 46 },
  },
  {
    slug: "plano-tipo",
    discipline: "graphic",
    title: { es: "Plano Tipo — Sistema", en: "Plano Tipo — System" },
    summary: {
      es: "Un sistema *tipográfico* modular.",
      en: "A modular *typographic* system.",
    },
    year: 2022,
    tone: { hue: 0, sat: 0, light: 92 },
  },
];

// Stand-in for the portrait on /info.
export const studio: Project = {
  slug: "studio",
  discipline: "photography",
  title: { es: "Victoria Carelli", en: "Victoria Carelli" },
  summary: { es: "", en: "" },
  year: 2026,
  tone: { hue: 24, sat: 34, light: 72 },
};

export const disciplineOrder: Discipline[] = ["photography", "graphic", "direction"];

export const disciplineSlug: Record<Discipline, string> = {
  photography: "photography",
  graphic: "graphic-design",
  direction: "art-direction",
};

export function disciplineFromSlug(slug: unknown): Discipline | null {
  return disciplineOrder.find((d) => disciplineSlug[d] === slug) ?? null;
}
