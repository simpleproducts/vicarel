import Link from "next/link";
import type { CSSProperties } from "react";
import { useLang } from "@/lib/lang-context";
import { useCursor } from "@/lib/cursor-context";
import { useInView } from "@/lib/use-in-view";
import { compose, type FrameRef, type PlacedSlot } from "@/lib/collage";
import type { Lang } from "@/lib/i18n";
import Media from "./Media";

type Props = {
  frames: FrameRef[];
  // Link each frame to its project page and show the trailing caption.
  linked?: boolean;
};

export default function Collage({ frames, linked = true }: Props) {
  const { lang } = useLang();

  return (
    <div className="collage">
      {compose(frames).map((row, r) => (
        <div key={r} className="collage-row">
          {row.map((slot) => (
            <Frame
              key={`${slot.frame.project.slug}-${slot.frame.index}`}
              slot={slot}
              lang={lang}
              linked={linked}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function Frame({ slot, lang, linked }: { slot: PlacedSlot; lang: Lang; linked: boolean }) {
  const [ref, inView] = useInView<HTMLElement>();
  const cursor = useCursor();
  const { project, index } = slot.frame;
  const title = project.title[lang];
  const vw = Math.round((slot.span / 24) * 100);

  const media = slot.strip ? (
    <div className="strip">
      {[0, 1, 2].map((k) => (
        <Media
          key={k}
          project={project}
          index={index + k}
          ratio={slot.ratio}
          alt={title}
          sizes={`(min-width: 1024px) ${Math.round(vw / 3)}vw, 33vw`}
        />
      ))}
    </div>
  ) : (
    <Media
      project={project}
      index={index}
      ratio={slot.ratio}
      alt={title}
      sizes={`(min-width: 1024px) ${vw}vw, 100vw`}
    />
  );

  const style = {
    "--start": slot.start,
    "--span": slot.span,
    "--shift": slot.shift ?? 0,
    "--m-start": slot.mStart ?? 1,
    "--m-span": slot.mSpan ?? 24,
  } as CSSProperties;

  return (
    <figure ref={ref} className="frame reveal" data-in={inView} style={style}>
      {linked ? (
        <>
          <Link
            href={`/work/${project.slug}`}
            className="frame-link block"
            aria-label={`${title}, ${project.year}`}
            onPointerEnter={() =>
              cursor.show({
                kind: "label",
                content: (
                  <>
                    {title} <span className="opacity-60">· {project.year}</span>
                  </>
                ),
              })
            }
            onPointerLeave={cursor.hide}
          >
            {media}
          </Link>
          <figcaption className="t-label mt-2 lg:sr-only">
            {title} <span className="opacity-60">· {project.year}</span>
          </figcaption>
        </>
      ) : (
        media
      )}
    </figure>
  );
}
