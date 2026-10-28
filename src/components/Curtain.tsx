import type { CSSProperties } from "react";
import { useTheme, type Theme } from "@/lib/theme-context";

// One transition per destination theme; all three stay mounted so their CSS
// transitions run from the idle state. See .curtain--* in globals.css.
export default function Curtain() {
  const { curtain } = useTheme();
  const phase = (t: Theme) => (curtain?.target === t ? curtain.phase : undefined);

  return (
    <>
      <div className="curtain curtain--stripes" data-phase={phase("1")} aria-hidden>
        {Array.from({ length: 9 }, (_, i) => (
          <span key={i} style={{ "--i": i } as CSSProperties} />
        ))}
      </div>
      <div className="curtain curtain--rings" data-phase={phase("2")} aria-hidden>
        {Array.from({ length: 8 }, (_, i) => (
          <span key={i} style={{ "--i": i } as CSSProperties} />
        ))}
      </div>
      <div className="curtain curtain--wipe" data-phase={phase("3")} aria-hidden />
    </>
  );
}
