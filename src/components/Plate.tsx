import type { CSSProperties } from "react";
import type { Project } from "@/lib/projects";

// Deterministic placeholder art per project + frame index, until real photographs
// are added: still lifes for photography, posters for graphic design, horizons for
// art direction.

type Rand = () => number;
type Tone = { h: number; s: number; l: number };
// Each scene seeds its own generator: a shared one would advance across StrictMode's
// double render and stop matching the server HTML.
type SceneProps = { seed: string; tone: Tone; project: Project; index: number };

function seeded(seed: string): Rand {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return () => {
    h = (h + 0x6d2b79f5) | 0;
    let x = Math.imul(h ^ (h >>> 15), 1 | h);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp = (n: number, min = 0, max = 100) => Math.min(max, Math.max(min, n));
const round = (n: number) => Math.round(n * 10) / 10;
const pct = (n: number) => `${round(n)}%`;
const hsl = (h: number, s: number, l: number) =>
  `hsl(${round(((h % 360) + 360) % 360)} ${round(clamp(s))}% ${round(clamp(l))}%)`;

export default function Plate({ project, index }: { project: Project; index: number }) {
  const seed = `${project.slug}:${index}`;
  const { hue, sat, light } = project.tone;
  const tone = { h: hue + ((index % 5) - 2) * 8, s: sat, l: clamp(light + (seeded(seed)() - 0.5) * 16, 18, 90) };
  const props = { seed, tone, project, index };

  return (
    <div className="plate" aria-hidden>
      {project.discipline === "graphic" ? (
        <Poster {...props} />
      ) : project.discipline === "direction" ? (
        <Horizon {...props} />
      ) : (
        <StillLife {...props} />
      )}
      <div className="plate-light" />
      <div className="grain" />
    </div>
  );
}

function StillLife({ seed, tone: { h, s, l } }: SceneProps) {
  const r = seeded(`${seed}:still`);
  const horizon = 58 + r() * 14;
  const kind = Math.floor(r() * 4);
  const hue = h + 140 + r() * 80;
  const base = hsl(hue, s + 24, 30 + r() * 32);
  const w = 24 + r() * 20;
  const left = clamp(50 - w / 2 + (r() - 0.5) * 28, 6, 94 - w);
  const bottom = 100 - horizon - 4 - r() * 12;
  const tilt = (r() - 0.5) * 8;
  const cylinder = `linear-gradient(90deg, ${hsl(hue, s + 20, 14)} 0%, ${base} 36%, ${hsl(hue, s + 8, 72)} 60%, ${hsl(hue, s + 20, 18)} 100%)`;
  const shapes: CSSProperties[] = [
    {
      aspectRatio: "1",
      borderRadius: "50%",
      background: `radial-gradient(circle at 34% 30%, ${hsl(hue, s + 10, 84)} 0%, ${base} 40%, ${hsl(hue, s + 20, 12)} 100%)`,
    },
    { aspectRatio: "0.5", borderRadius: "999px", background: cylinder },
    { aspectRatio: "0.72", borderRadius: "999px 999px 3px 3px", background: cylinder },
    { aspectRatio: "1.6", borderRadius: "4px", background: cylinder, transform: `rotate(${round(tilt)}deg)` },
  ];

  const companion = r() > 0.45;
  const cw = 7 + r() * 7;
  const gap = 2 + r() * 5;
  const cl = left + w + gap > 94 - cw ? left - cw - gap : left + w + gap;
  const cHue = hue + 180;

  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${hsl(h, s, l + 10)} 0%, ${hsl(h, s, l)} ${pct(horizon - 5)}, ${hsl(h + 6, s + 6, l - 10)} ${pct(horizon + 3)}, ${hsl(h + 8, s + 8, l - 22)} 100%)`,
        }}
      />
      <Shadow left={left + w * 0.12} width={w * 1.3} bottom={bottom - 3.5} />
      <div className="absolute" style={{ left: pct(left), width: pct(w), bottom: pct(bottom), ...shapes[kind] }} />
      {companion && (
        <>
          <Shadow left={cl + cw * 0.15} width={cw * 1.4} bottom={bottom - 2} />
          <div
            className="absolute rounded-full"
            style={{
              left: pct(cl),
              width: pct(cw),
              bottom: pct(bottom),
              aspectRatio: "1",
              background: `radial-gradient(circle at 34% 30%, ${hsl(cHue, s + 30, 80)} 0%, ${hsl(cHue, s + 30, 50)} 45%, ${hsl(cHue, s + 30, 18)} 100%)`,
            }}
          />
        </>
      )}
    </>
  );
}

function Shadow({ left, width, bottom }: { left: number; width: number; bottom: number }) {
  return (
    <div
      className="absolute"
      style={{
        left: pct(left),
        width: pct(width),
        bottom: pct(bottom),
        height: "9%",
        background: "radial-gradient(closest-side, rgb(0 0 0 / 0.4), transparent)",
        filter: "blur(3px)",
      }}
    />
  );
}

function Poster({ seed, tone: { h, s, l }, project, index }: SceneProps) {
  const r = seeded(`${seed}:poster`);
  const variant = index % 3;
  const paper = hsl(h, s + 4, l);
  const ink = hsl(h + 180, s, l > 55 ? 14 : 90);

  const meta = (color: string) => (
    <div
      className="absolute inset-x-[6%] top-[5%] flex justify-between border-b pb-[2%] font-semibold uppercase"
      style={{ fontSize: "clamp(9px, 3.2cqw, 20px)", letterSpacing: "-0.02em", color, borderColor: color }}
    >
      <span>{project.client ?? "VC"}</span>
      <span>{project.year}</span>
    </div>
  );

  if (variant === 0) {
    return (
      <div className="absolute inset-0" style={{ background: paper }}>
        {meta(ink)}
        <span
          className="absolute font-serif italic leading-[0.8]"
          style={{ fontSize: "100cqmin", left: "6%", bottom: "-8%", color: ink }}
        >
          {project.title.en[0]}
        </span>
      </div>
    );
  }

  if (variant === 1) {
    const size = 46 + r() * 20;
    return (
      <div className="absolute inset-0" style={{ background: hsl(h, 14, 93) }}>
        <div
          className="absolute rounded-full"
          style={{ width: pct(size), aspectRatio: "1", left: "10%", top: "22%", background: hsl(h, s + 10, l - 6) }}
        />
        <div
          className="absolute rounded-full mix-blend-multiply"
          style={{
            width: pct(size),
            aspectRatio: "1",
            left: pct(30 + r() * 12),
            top: pct(34 + r() * 10),
            background: hsl(h - 25, s + 10, l - 14),
          }}
        />
        {meta(hsl(h + 180, s, 14))}
      </div>
    );
  }

  const band = 6 + r() * 6;
  return (
    <div
      className="absolute inset-0"
      style={{
        background: `repeating-linear-gradient(180deg, ${paper} 0 ${pct(band)}, ${hsl(h + 8, s + 6, l - 16)} ${pct(band)} ${pct(band * 2)})`,
      }}
    >
      <span
        className="absolute inset-x-0 top-[38%] text-center font-serif italic mix-blend-difference"
        style={{ fontSize: "22cqw", color: hsl(h, 12, 96) }}
      >
        {project.title.en.split(" ")[0].toLowerCase()}
      </span>
    </div>
  );
}

function Horizon({ seed, tone: { h, s, l }, index }: SceneProps) {
  const r = seeded(`${seed}:horizon`);
  const land = 26 + r() * 22;
  const size = 24 + r() * 26;
  const sunX = 18 + r() * 64;
  const sunY = land - 4 + r() * 16;

  return (
    <>
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(180deg, ${hsl(h, s, l + 16)} 0%, ${hsl(h + 24, s + 14, l - 2)} 100%)` }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: pct(size),
          aspectRatio: "1",
          left: pct(sunX - size / 2),
          bottom: pct(sunY),
          background: `radial-gradient(circle at 40% 35%, ${hsl(h + 40, s + 40, 80)}, ${hsl(h + 20, s + 45, 58)})`,
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: pct(land),
          background: `linear-gradient(180deg, ${hsl(h + 190, s, l - 18)} 0%, ${hsl(h + 200, s + 6, l - 34)} 100%)`,
        }}
      />
      {index % 2 === 1 && <div className="absolute inset-[6%] border border-white/60" />}
    </>
  );
}
