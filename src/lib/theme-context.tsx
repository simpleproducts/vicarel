import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { createPref } from "@/lib/pref";

export type Theme = "1" | "2" | "3";
export const themes: Theme[] = ["1", "2", "3"];

// Must cover the slowest curtain in globals.css (stripes: 8 × 28ms + 320ms).
const OPEN_MS = 560;
const CLOSE_MS = 560;

const themePref = createPref<Theme>({
  key: "vc-theme",
  values: themes,
  fallback: "1",
  onChange: (t) => {
    document.documentElement.dataset.theme = t;
  },
});

type Curtain = { target: Theme; phase: "opening" | "closing" };

type Ctx = {
  theme: Theme;
  select: (t: Theme) => void;
  curtain: Curtain | null;
};

const ThemeContext = createContext<Ctx | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(themePref.subscribe, themePref.get, themePref.getServer);
  const [curtain, setCurtain] = useState<Curtain | null>(null);
  const busy = useRef(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((id) => window.clearTimeout(id));
  }, []);

  const select = useCallback((target: Theme) => {
    if (busy.current || target === themePref.get()) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      themePref.set(target);
      return;
    }
    busy.current = true;
    setCurtain({ target, phase: "opening" });
    timers.current.push(
      window.setTimeout(() => {
        themePref.set(target);
        setCurtain({ target, phase: "closing" });
        timers.current.push(
          window.setTimeout(() => {
            setCurtain(null);
            busy.current = false;
          }, CLOSE_MS),
        );
      }, OPEN_MS),
    );
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, select, curtain }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
