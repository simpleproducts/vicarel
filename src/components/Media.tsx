import Image from "next/image";
import type { Project } from "@/lib/projects";
import Plate from "./Plate";

type Props = {
  project: Project;
  index: number;
  ratio: string;
  alt: string;
  sizes: string;
};

export default function Media({ project, index, ratio, alt, sizes }: Props) {
  const src = project.images?.length ? project.images[index % project.images.length] : undefined;

  return (
    <div className="media" style={{ aspectRatio: ratio }}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      ) : (
        <Plate project={project} index={index} />
      )}
    </div>
  );
}
