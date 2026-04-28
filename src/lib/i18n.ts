export type Lang = "es" | "en";

export const dict = {
  nav: {
    work: { es: "Trabajo", en: "Work" },
    about: { es: "Sobre mí", en: "About" },
    contact: { es: "Contacto", en: "Contact" },
  },
  home: {
    eyebrow: {
      es: "Estudio independiente · Buenos Aires",
      en: "Independent studio · Buenos Aires",
    },
    name: { es: "Victoria Carelli", en: "Victoria Carelli" },
    roles: {
      es: ["Fotógrafa", "Diseñadora gráfica", "Directora de arte"],
      en: ["Photographer", "Graphic designer", "Art director"],
    },
    intro: {
      es:
        "Construyo identidades visuales para marcas, editoriales y proyectos culturales — entre la imagen, la tipografía y la dirección de arte.",
      en:
        "I build visual identities for brands, editorials and cultural projects — across image-making, typography and art direction.",
    },
    indexLabel: { es: "Índice", en: "Index" },
    selectedWork: { es: "Trabajo seleccionado", en: "Selected work" },
    viewAll: { es: "Ver todo", en: "View all" },
    available: {
      es: "Disponible para nuevos proyectos · 2026",
      en: "Available for new projects · 2026",
    },
  },
  disciplines: {
    photography: { es: "Fotografía", en: "Photography" },
    graphic: { es: "Diseño gráfico", en: "Graphic design" },
    direction: { es: "Dirección de arte", en: "Art direction" },
  },
  work: {
    title: { es: "Trabajo", en: "Work" },
    lede: {
      es:
        "Una selección de proyectos recientes en fotografía, diseño gráfico y dirección de arte.",
      en:
        "A selection of recent projects across photography, graphic design and art direction.",
    },
  },
  about: {
    title: { es: "Sobre mí", en: "About" },
    body: {
      es: [
        "Victoria Carelli es fotógrafa, diseñadora gráfica y directora de arte. Trabaja con marcas, editoriales y proyectos culturales en la intersección de la imagen y el diseño.",
        "Su práctica combina fotografía de autor, dirección de arte y un trabajo tipográfico cuidado para construir identidades visuales con voz propia.",
        "Vive y trabaja entre Buenos Aires y proyectos remotos en Latinoamérica y Europa.",
      ],
      en: [
        "Victoria Carelli is a photographer, graphic designer and art director. She works with brands, editorial outlets and cultural projects at the intersection of image and design.",
        "Her practice blends authored photography, art direction and considered typographic work into visual identities with a clear voice.",
        "Based in Buenos Aires, working remotely with collaborators across Latin America and Europe.",
      ],
    },
    clientsTitle: { es: "Clientes y colaboraciones", en: "Clients & collaborations" },
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
  },
  contact: {
    title: { es: "Contacto", en: "Contact" },
    lede: {
      es:
        "Para encargos, colaboraciones o consultas, escribime. Suelo responder en menos de 48 hs.",
      en:
        "For commissions, collaborations or enquiries, get in touch. I usually reply within 48 hours.",
    },
    elsewhere: { es: "En otros lados", en: "Elsewhere" },
  },
  footer: {
    rights: {
      es: "Todos los derechos reservados",
      en: "All rights reserved",
    },
    site: { es: "Sitio", en: "Site" },
  },
};

export function t<T>(value: { es: T; en: T }, lang: Lang): T {
  return value[lang];
}
