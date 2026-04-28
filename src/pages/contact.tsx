import { useLang } from "@/lib/lang-context";
import { dict, t } from "@/lib/i18n";

const links = [
  { label: "Instagram", href: "https://instagram.com/", handle: "@victoriacarelli" },
  { label: "Behance", href: "https://www.behance.net/", handle: "/victoriacarelli" },
  { label: "LinkedIn", href: "https://www.linkedin.com/", handle: "/in/victoriacarelli" },
];

export default function Contact() {
  const { lang } = useLang();

  return (
    <div className="mx-auto max-w-[1600px] px-6 md:px-10 pt-10 md:pt-16">
      <header className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-16 md:pb-24 border-b hairline">
        <div className="md:col-span-8">
          <p className="text-[12px] uppercase tracking-[0.22em] text-[var(--muted)] mb-6">
            {t(dict.contact.title, lang)}
          </p>
          <h1 className="font-display text-[clamp(2.5rem,9vw,8rem)] leading-[0.95] tracking-tight">
            <span className="italic font-light">Let&apos;s</span> work
            <br />
            together
            <span className="text-[var(--accent)]">.</span>
          </h1>
        </div>
        <p className="md:col-span-4 md:col-start-9 text-base md:text-lg leading-relaxed text-[var(--foreground)]/80 self-end">
          {t(dict.contact.lede, lang)}
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pt-16 md:pt-24 mb-24">
        <div className="md:col-span-7">
          <p className="text-[12px] uppercase tracking-[0.22em] text-[var(--muted)] mb-4">Email</p>
          <a
            href="mailto:hello@victoriacarelli.com"
            className="font-display text-3xl md:text-6xl tracking-tight link-underline break-all"
          >
            hello@victoriacarelli.com
          </a>

          <p className="text-[12px] uppercase tracking-[0.22em] text-[var(--muted)] mt-16 mb-4">
            {lang === "es" ? "Estudio" : "Studio"}
          </p>
          <p className="font-display text-xl md:text-2xl">
            Buenos Aires, Argentina
            <br />
            <span className="text-[var(--muted)]">GMT−3</span>
          </p>
        </div>

        <div className="md:col-span-4 md:col-start-9">
          <p className="text-[12px] uppercase tracking-[0.22em] text-[var(--muted)] mb-6">
            {t(dict.contact.elsewhere, lang)}
          </p>
          <ul className="divide-y hairline border-y hairline">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-baseline justify-between py-4 group"
                >
                  <span className="font-display text-lg">{l.label}</span>
                  <span className="text-[var(--muted)] text-[13px] group-hover:text-[var(--foreground)] transition-colors">
                    {l.handle} →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
