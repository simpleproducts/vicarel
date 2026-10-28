import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/router";

type Float = { kind: "label" | "preview"; content: ReactNode };

type Ctx = {
  show: (f: Float) => void;
  hide: () => void;
};

const CursorContext = createContext<Ctx | null>(null);

const OFFSET = 18;
const EDGE = 12;

// One floating element for the whole site that trails the mouse: project captions
// over the collage and image previews over the index links.
export function CursorProvider({ children }: { children: ReactNode }) {
  const [float, setFloat] = useState<Float | null>(null);
  const el = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0, cx: 0, cy: 0, raf: 0, snap: true, kick: () => {} });
  const router = useRouter();

  useEffect(() => {
    const p = pos.current;
    const ease = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : 0.22;

    const tick = () => {
      const node = el.current;
      if (!node) {
        p.raf = 0;
        return;
      }
      if (p.snap) {
        p.cx = p.x;
        p.cy = p.y;
        p.snap = false;
      } else {
        p.cx += (p.x - p.cx) * ease;
        p.cy += (p.y - p.cy) * ease;
      }
      const w = node.offsetWidth;
      const h = node.offsetHeight;
      const left = p.cx + OFFSET + w > window.innerWidth - EDGE ? p.cx - OFFSET - w : p.cx + OFFSET;
      const top = p.cy + OFFSET + h > window.innerHeight - EDGE ? p.cy - OFFSET - h : p.cy + OFFSET;
      node.style.transform = `translate3d(${left}px, ${top}px, 0)`;
      p.raf = Math.abs(p.x - p.cx) + Math.abs(p.y - p.cy) > 0.2 ? requestAnimationFrame(tick) : 0;
    };

    p.kick = () => {
      if (!p.raf) p.raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      p.x = e.clientX;
      p.y = e.clientY;
      p.kick();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(p.raf);
    };
  }, []);

  const show = useCallback((f: Float) => {
    setFloat(f);
    pos.current.kick();
  }, []);

  const hide = useCallback(() => {
    setFloat(null);
    pos.current.snap = true;
  }, []);

  useEffect(() => {
    router.events.on("routeChangeStart", hide);
    return () => router.events.off("routeChangeStart", hide);
  }, [router.events, hide]);

  return (
    <CursorContext.Provider value={{ show, hide }}>
      {children}
      <div
        ref={el}
        className={`cursor-float t-label cursor-float--${float?.kind ?? "label"}`}
        data-visible={float ? "true" : "false"}
        aria-hidden
      >
        {float?.content}
      </div>
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const ctx = useContext(CursorContext);
  if (!ctx) throw new Error("useCursor must be used within CursorProvider");
  return ctx;
}
