import Head from "next/head";
import { useSyncExternalStore } from "react";
import { useLang } from "@/lib/lang-context";
import { dict, t } from "@/lib/i18n";
import { studio } from "@/lib/projects";
import Media from "@/components/Media";
import Rich from "@/components/Rich";

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

const links = [
  { label: "Instagram", href: "https://instagram.com/" },
  { label: "Behance", href: "https://www.behance.net/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
];

const clock = new Intl.DateTimeFormat("es-AR", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "America/Argentina/Buenos_Aires",
});

const subscribeClock = (cb: () => void) => {
  const id = window.setInterval(cb, 15_000);
  return () => window.clearInterval(id);
};

function useStudioTime() {
  return useSyncExternalStore(
    subscribeClock,
    () => clock.format(new Date()),
    () => "",
  );
}

export default function Info() {
  const { lang } = useLang();
  const time = useStudioTime();
  const [first, ...rest] = t(dict.info.statements, lang);

  return (
    <>
      <Head>
        <title>Info — Victoria Carelli</title>
      </Head>

      <div className="grid grid-cols-1 gap-x-[var(--gutter)] gap-y-16 pb-24 lg:grid-cols-24">
        <div className="space-y-10 lg:col-span-13">
          <h1 className="sr-only">Info</h1>
          <p className="t-display mb-4 lg:hidden" aria-hidden>
            {t(dict.header.is, lang)}
          </p>
          <p className="t-statement">
            <Rich text={first} />
          </p>
          <div className="w-[58%] max-w-[340px]">
            <Media project={studio} index={0} ratio="4 / 5" alt="Victoria Carelli" sizes="340px" />
          </div>
          {rest.map((s) => (
            <p key={s} className="t-statement">
              <Rich text={s} />
            </p>
          ))}

          <div className="grid grid-cols-2 gap-6 pt-6">
            <section>
              <h2 className="t-heading mb-3">{t(dict.info.servicesTitle, lang)}</h2>
              <ul className="t-label space-y-[0.3em]">
                {t(dict.info.services, lang).map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="t-heading mb-3">{t(dict.info.clientsTitle, lang)}</h2>
              <ul className="t-label space-y-[0.3em]">
                {clients.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        <aside className="space-y-9 self-start lg:sticky lg:top-[calc(var(--header-h)+var(--display)+2.5rem)] lg:col-span-9 lg:col-start-16">
          <section>
            <h2 className="t-heading mb-3">{t(dict.info.write, lang)}</h2>
            <p className="t-statement t-statement--sm">
              <a href="mailto:hello@victoriacarelli.com" className="u-hover break-all">
                hello<em>@</em>
                <br />
                victoriacarelli.com
              </a>
            </p>
            <p className="t-label mt-3 opacity-60">{t(dict.info.reply, lang)}</p>
          </section>

          <section>
            <h2 className="t-heading mb-3">{t(dict.info.studio, lang)}</h2>
            <p className="t-label space-y-[0.3em]">
              <span className="block">Buenos Aires, Argentina</span>
              <span className="block tabular-nums">
                {time || "—"} · GMT−3
              </span>
            </p>
          </section>

          <section>
            <h2 className="t-heading mb-3">{t(dict.info.elsewhere, lang)}</h2>
            <ul className="t-label space-y-[0.3em]">
              {links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noreferrer" className="u-hover">
                    {l.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <p className="t-label flex items-center gap-2">
            <span className="pulse" aria-hidden />
            {t(dict.info.available, lang)}
          </p>
        </aside>
      </div>
    </>
  );
}
