import type { Project } from "@/lib/projects";

export type FrameRef = { project: Project; index: number };

// Positions on a 24-column grid. `shift` drops the frame by that many vw on desktop;
// `m*` override the full-width mobile default; a `strip` renders three frames side by side.
type Slot = {
  start: number;
  span: number;
  ratio: string;
  shift?: number;
  mStart?: number;
  mSpan?: number;
  strip?: boolean;
};

export type PlacedSlot = Slot & { frame: FrameRef };

const patterns: Slot[][] = [
  [
    { start: 1, span: 15, ratio: "3 / 2" },
    { start: 17, span: 8, ratio: "4 / 5", shift: 4, mStart: 9, mSpan: 16 },
  ],
  [{ start: 5, span: 17, ratio: "3 / 2" }],
  [{ start: 1, span: 22, ratio: "4 / 5", strip: true }],
  [
    { start: 3, span: 8, ratio: "4 / 5", mSpan: 16 },
    { start: 13, span: 11, ratio: "1 / 1", shift: 9, mStart: 7, mSpan: 18 },
  ],
  [{ start: 9, span: 12, ratio: "4 / 5", mStart: 4, mSpan: 21 }],
  [
    { start: 1, span: 10, ratio: "1 / 1" },
    { start: 14, span: 11, ratio: "3 / 2", shift: 14, mStart: 5, mSpan: 20 },
  ],
  [{ start: 6, span: 14, ratio: "3 / 2" }],
];

export function compose(frames: FrameRef[]): PlacedSlot[][] {
  const rows: PlacedSlot[][] = [];
  let i = 0;
  for (let p = 0; i < frames.length; p++) {
    const pattern = patterns[p % patterns.length].slice(0, frames.length - i);
    rows.push(pattern.map((slot) => ({ ...slot, frame: frames[i++] })));
  }
  return rows;
}
