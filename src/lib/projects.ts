export type Discipline = "photography" | "graphic" | "direction";

export type Project = {
  slug: string;
  discipline: Discipline;
  title: { es: string; en: string };
  client?: string;
  year: number;
  cover: { hue: number; sat: number; light: number; ratio: string };
};

export const projects: Project[] = [
  {
    slug: "casa-violeta",
    discipline: "direction",
    title: { es: "Casa Violeta — Identidad", en: "Casa Violeta — Identity" },
    client: "Casa Violeta",
    year: 2025,
    cover: { hue: 18, sat: 36, light: 78, ratio: "4 / 5" },
  },
  {
    slug: "estudio-mar",
    discipline: "photography",
    title: { es: "Estudio Mar — Editorial", en: "Estudio Mar — Editorial" },
    client: "Revista Mar",
    year: 2025,
    cover: { hue: 200, sat: 18, light: 70, ratio: "3 / 4" },
  },
  {
    slug: "ferment",
    discipline: "graphic",
    title: { es: "Ferment — Packaging", en: "Ferment — Packaging" },
    client: "Ferment Co.",
    year: 2024,
    cover: { hue: 38, sat: 48, light: 64, ratio: "1 / 1" },
  },
  {
    slug: "noche-clara",
    discipline: "photography",
    title: { es: "Noche Clara — Serie", en: "Noche Clara — Series" },
    year: 2024,
    cover: { hue: 244, sat: 22, light: 28, ratio: "4 / 5" },
  },
  {
    slug: "atlas",
    discipline: "graphic",
    title: { es: "Atlas — Libro", en: "Atlas — Book" },
    client: "Editorial Atlas",
    year: 2024,
    cover: { hue: 12, sat: 60, light: 50, ratio: "3 / 4" },
  },
  {
    slug: "tres-estaciones",
    discipline: "direction",
    title: { es: "Tres Estaciones — Campaña", en: "Tres Estaciones — Campaign" },
    client: "Tres Estaciones",
    year: 2023,
    cover: { hue: 150, sat: 22, light: 58, ratio: "1 / 1" },
  },
  {
    slug: "panaderia-norte",
    discipline: "photography",
    title: { es: "Panadería Norte", en: "Panadería Norte" },
    client: "Panadería Norte",
    year: 2023,
    cover: { hue: 28, sat: 52, light: 60, ratio: "4 / 5" },
  },
  {
    slug: "marea-baja",
    discipline: "direction",
    title: { es: "Marea Baja — Editorial", en: "Marea Baja — Editorial" },
    year: 2023,
    cover: { hue: 188, sat: 28, light: 46, ratio: "3 / 4" },
  },
  {
    slug: "plano-tipo",
    discipline: "graphic",
    title: { es: "Plano Tipo — Sistema", en: "Plano Tipo — System" },
    year: 2022,
    cover: { hue: 0, sat: 0, light: 92, ratio: "1 / 1" },
  },
];

export const disciplineOrder: Discipline[] = ["photography", "graphic", "direction"];
