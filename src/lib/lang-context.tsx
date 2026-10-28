import { useCallback, useEffect, useSyncExternalStore } from "react";
import type { Lang } from "@/lib/i18n";
import { createPref } from "@/lib/pref";

const langPref = createPref<Lang>({
  key: "vc-lang",
  values: ["es", "en"],
  fallback: "es",
  detect: () => (navigator.language?.toLowerCase().startsWith("en") ? "en" : null),
});

export function useLang() {
  const lang = useSyncExternalStore(langPref.subscribe, langPref.get, langPref.getServer);
  const setLang = useCallback((l: Lang) => langPref.set(l), []);
  const toggle = useCallback(() => langPref.set(langPref.get() === "es" ? "en" : "es"), []);
  return { lang, setLang, toggle };
}

export function useDocumentLang() {
  const { lang } = useLang();
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
}
