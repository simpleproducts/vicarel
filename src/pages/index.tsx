import Head from "next/head";
import { useLang } from "@/lib/lang-context";
import { dict, t } from "@/lib/i18n";
import { projects } from "@/lib/projects";
import Collage from "@/components/Collage";

const frames = projects.map((project) => ({ project, index: 0 }));

export default function Home() {
  const { lang } = useLang();

  return (
    <>
      <Head>
        <title>{t(dict.meta.title, lang)}</title>
      </Head>
      <h1 className="sr-only">{t(dict.meta.title, lang)}</h1>
      <Collage frames={frames} />
    </>
  );
}
