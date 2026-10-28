import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useLang } from "@/lib/lang-context";
import { dict, t } from "@/lib/i18n";
import {
  disciplineFromSlug,
  disciplineOrder,
  disciplineSlug,
  projects,
  type Discipline,
} from "@/lib/projects";
import Collage from "@/components/Collage";

type Props = { discipline: Discipline };

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: disciplineOrder.map((d) => ({ params: { discipline: disciplineSlug[d] } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const discipline = disciplineFromSlug(params?.discipline);
  if (!discipline) return { notFound: true };
  return { props: { discipline } };
};

export default function DisciplinePage({ discipline }: Props) {
  const { lang } = useLang();
  const items = projects.filter((p) => p.discipline === discipline);
  // Covers first, then a second frame of each (index 4 keeps strips clear of the covers).
  const frames = [
    ...items.map((project) => ({ project, index: 0 })),
    ...items.map((project) => ({ project, index: 4 })),
  ];
  const label = t(dict.disciplines[discipline], lang);

  return (
    <>
      <Head>
        <title>{`${label} — Victoria Carelli`}</title>
      </Head>
      <h1 className="sr-only">{label}</h1>
      <Collage frames={frames} />
    </>
  );
}
