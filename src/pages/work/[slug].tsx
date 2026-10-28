import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useLang } from "@/lib/lang-context";
import { useCursor } from "@/lib/cursor-context";
import { dict, t } from "@/lib/i18n";
import { disciplineSlug, projects } from "@/lib/projects";
import Collage from "@/components/Collage";
import Media from "@/components/Media";
import Rich from "@/components/Rich";

type Props = { slug: string };

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: projects.map((p) => ({ params: { slug: p.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = typeof params?.slug === "string" ? params.slug : "";
  if (!projects.some((p) => p.slug === slug)) return { notFound: true };
  return { props: { slug } };
};

// The strip in the fourth slot shows frames 3–5, so the list skips them.
const frameIndexes = [0, 1, 2, 3, 6, 7, 8];

export default function ProjectPage({ slug }: Props) {
  const { lang } = useLang();
  const cursor = useCursor();
  const idx = projects.findIndex((p) => p.slug === slug);
  const project = projects[idx];
  const next = projects[(idx + 1) % projects.length];
  const [name, kind] = project.title[lang].split(" — ");
  const [nextName] = next.title[lang].split(" — ");

  return (
    <>
      <Head>
        <title>{`${project.title[lang]} — Victoria Carelli`}</title>
      </Head>

      <article>
        <header className="grid grid-cols-1 gap-x-[var(--gutter)] gap-y-8 pb-12 lg:grid-cols-24 lg:pb-20">
          <h1 className="t-mega lg:col-span-16">
            {name}
            {kind && (
              <>
                {" "}
                <em>{kind.toLowerCase()}</em>
              </>
            )}
          </h1>
          <dl className="t-label grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 self-end lg:col-span-7 lg:col-start-18">
            {project.client && (
              <>
                <dt className="opacity-60">{t(dict.project.client, lang)}</dt>
                <dd>{project.client}</dd>
              </>
            )}
            <dt className="opacity-60">{t(dict.project.year, lang)}</dt>
            <dd>{project.year}</dd>
            <dt className="opacity-60">{t(dict.project.discipline, lang)}</dt>
            <dd>
              <Link href={`/${disciplineSlug[project.discipline]}`} className="u-hover">
                {t(dict.disciplines[project.discipline], lang)}
              </Link>
            </dd>
          </dl>
          <p className="t-statement t-statement--sm max-w-[24ch] lg:col-span-14">
            <Rich text={project.summary[lang]} />
          </p>
        </header>

        <Collage frames={frameIndexes.map((index) => ({ project, index }))} linked={false} />

        <Link
          href={`/work/${next.slug}`}
          className="mb-24 block border-t border-current pt-6"
          onPointerEnter={() =>
            cursor.show({
              kind: "preview",
              content: <Media project={next} index={0} ratio="4 / 5" alt="" sizes="300px" />,
            })
          }
          onPointerLeave={cursor.hide}
        >
          <span className="t-heading block">{t(dict.project.next, lang)}</span>
          <span className="t-mega mt-3 block">
            {nextName} <span aria-hidden>→</span>
          </span>
        </Link>
      </article>
    </>
  );
}
