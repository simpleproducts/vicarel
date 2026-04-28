import { useLang } from "@/lib/lang-context";
import { dict, t } from "@/lib/i18n";

const clients = [
  "Casa Violeta",
  "Editorial Atlas",
  "Ferment Co.",
  "Revista Mar",
  "Tres Estaciones",
  "Panadería Norte",
  "Marea Baja",
  "Estudio Norte",
];

export default function About() {
  const { lang } = useLang();
  const body = t(dict.about.body, lang);
  const services = t(dict.about.services, lang);

  return (
    <div className="mx-auto max-w-[1600px] px-6 md:px-10 pt-10 md:pt-16">
      <header className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-16 md:pb-24 border-b hairline">
        <div className="md:col-span-7">
          <p className="text-[12px] uppercase tracking-[0.22em] text-[var(--muted)] mb-6">
            {t(dict.about.title, lang)}
          </p>
          <h1 className="font-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] tracking-tight">
            <span className="italic font-light">A propósito,</span>
            <br />
            an introduction
            <span className="text-[var(--accent)]">.</span>
          </h1>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pt-16 md:pt-24">
        <div className="md:col-span-7 md:col-start-2 space-y-6 text-base md:text-lg leading-relaxed text-[var(--foreground)]/85">
          {body.map((p, i) => (
            <p key={i} className={i === 0 ? "font-display text-2xl md:text-3xl leading-snug text-[var(--foreground)]" : ""}>
              {p}
            </p>
          ))}
        </div>

        <aside className="md:col-span-3 md:col-start-10 space-y-12 text-[13px]">
          <div>
            <h2 className="text-[12px] uppercase tracking-[0.22em] text-[var(--muted)] mb-4">
              {t(dict.about.servicesTitle, lang)}
            </h2>
            <ul className="space-y-1.5">
              {services.map((s, i) => (
                <li key={s} className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] tabular-nums text-[var(--muted)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[12px] uppercase tracking-[0.22em] text-[var(--muted)] mb-4">
              {t(dict.about.clientsTitle, lang)}
            </h2>
            <ul className="space-y-1.5">
              {clients.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </div>
  );
}
