import Head from "next/head";
import Link from "next/link";
import { useLang } from "@/lib/lang-context";
import { dict, t } from "@/lib/i18n";

export default function NotFound() {
  const { lang } = useLang();

  return (
    <>
      <Head>
        <title>404 — Victoria Carelli</title>
      </Head>
      <div className="flex min-h-[60svh] flex-col justify-center gap-8 pb-24">
        <h1 className="t-mega">
          404 <em>{t(dict.notFound.title, lang).toLowerCase()}</em>
        </h1>
        <Link href="/" className="t-label u-active self-start">
          ← {t(dict.notFound.back, lang)}
        </Link>
      </div>
    </>
  );
}
