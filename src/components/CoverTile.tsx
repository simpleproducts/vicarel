import type { Project } from "@/lib/projects";

type Props = {
  project: Project;
  label?: string;
};

export default function CoverTile({ project, label }: Props) {
  const { hue, sat, light, ratio } = project.cover;
  const a = `hsl(${hue} ${sat}% ${light}%)`;
  const b = `hsl(${(hue + 18) % 360} ${Math.max(sat - 8, 0)}% ${Math.max(light - 14, 8)}%)`;
  const c = `hsl(${(hue + 340) % 360} ${Math.min(sat + 6, 80)}% ${Math.min(light + 10, 96)}%)`;

  return (
    <div
      className="relative w-full overflow-hidden bg-[var(--line)]"
      style={{ aspectRatio: ratio }}
    >
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        style={{
          backgroundImage: `radial-gradient(120% 80% at 20% 18%, ${c} 0%, ${a} 38%, ${b} 100%)`,
        }}
      />
      <div
        className="absolute inset-0 mix-blend-overlay opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 3px)",
        }}
      />
      {label && (
        <span className="absolute left-3 bottom-3 text-[11px] uppercase tracking-[0.2em] text-white/85 mix-blend-difference">
          {label}
        </span>
      )}
    </div>
  );
}
