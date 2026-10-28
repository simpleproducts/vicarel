export type Lang = "es" | "en";

// Copy may use *asterisks* for the serif italic accent (see components/Rich).
export const dict = {
  meta: {
    title: {
      es: "Victoria Carelli — Fotografía, diseño gráfico y dirección de arte",
      en: "Victoria Carelli — Photography, graphic design & art direction",
    },
  },
  nav: {
    overview: { es: "Todo", en: "Overview" },
    info: { es: "Info", en: "Info" },
    menu: { es: "Índice", en: "Index" },
    close: { es: "Cerrar", en: "Close" },
    palette: { es: "Paleta", en: "Palette" },
    language: { es: "Idioma", en: "Language" },
    skip: { es: "Saltar al contenido", en: "Skip to content" },
  },
  themes: {
    "1": { es: "Terracota", en: "Terracotta" },
    "2": { es: "Noche", en: "Night" },
    "3": { es: "Color", en: "Colour" },
  },
  header: {
    is: { es: "es", en: "is" },
  },
  disciplines: {
    photography: { es: "Fotografía", en: "Photography" },
    graphic: { es: "Diseño gráfico", en: "Graphic design" },
    direction: { es: "Dirección de arte", en: "Art direction" },
  },
  more: {
    title: { es: "más", en: "more" },
    top: { es: "Arriba", en: "Top" },
  },
  project: {
    client: { es: "Cliente", en: "Client" },
    year: { es: "Año", en: "Year" },
    discipline: { es: "Disciplina", en: "Discipline" },
    next: { es: "siguiente", en: "next" },
  },
  info: {
    statements: {
      es: [
        "una *fotógrafa*, diseñadora gráfica y *directora de arte* de Buenos Aires.",
        "Construye *identidades visuales* para marcas, editoriales y proyectos culturales.",
        "Trabaja entre la *imagen*, la *tipografía* y la *dirección de arte*.",
      ],
      en: [
        "a Buenos Aires-based *photographer*, graphic designer and *art director*.",
        "She builds *visual identities* for brands, editorials and cultural projects.",
        "Working across *image-making*, *typography* and *art direction*.",
      ],
    },
    servicesTitle: { es: "Servicios", en: "Services" },
    services: {
      es: [
        "Identidad visual",
        "Dirección de arte",
        "Fotografía editorial",
        "Fotografía de producto",
        "Diseño editorial",
        "Campañas",
      ],
      en: [
        "Visual identity",
        "Art direction",
        "Editorial photography",
        "Product photography",
        "Editorial design",
        "Campaigns",
      ],
    },
    clientsTitle: { es: "Clientes", en: "Clients" },
    studio: { es: "Estudio", en: "Studio" },
    write: { es: "Escribime", en: "Write" },
    reply: {
      es: "Suelo responder en menos de 48 hs.",
      en: "I usually reply within 48 hours.",
    },
    elsewhere: { es: "En otros lados", en: "Elsewhere" },
    available: {
      es: "Disponible para nuevos proyectos · 2026",
      en: "Available for new projects · 2026",
    },
  },
  notFound: {
    title: { es: "Nada por acá", en: "Nothing here" },
    back: { es: "Volver al inicio", en: "Back home" },
  },
};

export function t<T>(value: { es: T; en: T }, lang: Lang): T {
  return value[lang];
}
