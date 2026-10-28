// A tiny localStorage-backed store for useSyncExternalStore: the server and the
// hydration pass see `fallback`, the client then re-renders with the stored value.
export type Pref<T extends string> = {
  get: () => T;
  getServer: () => T;
  set: (value: T) => void;
  subscribe: (listener: () => void) => () => void;
};

export function createPref<T extends string>(opts: {
  key: string;
  values: readonly T[];
  fallback: T;
  detect?: () => T | null;
  onChange?: (value: T) => void;
}): Pref<T> {
  const listeners = new Set<() => void>();
  let current: T | null = null;

  return {
    get() {
      if (current === null) {
        let stored: string | null = null;
        try {
          stored = window.localStorage.getItem(opts.key);
        } catch {}
        current = opts.values.includes(stored as T)
          ? (stored as T)
          : (opts.detect?.() ?? opts.fallback);
      }
      return current;
    },
    getServer: () => opts.fallback,
    set(value) {
      current = value;
      try {
        window.localStorage.setItem(opts.key, value);
      } catch {}
      opts.onChange?.(value);
      listeners.forEach((l) => l());
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}
