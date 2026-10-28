import { useEffect, useRef, useState } from "react";

// True while the element is on screen; resets once it has fully left, so frames
// fade back in when scrolled to again.
export function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
        else if (entry.boundingClientRect.top > window.innerHeight || entry.boundingClientRect.bottom < 0)
          setInView(false);
      },
      { rootMargin: "-8% 0px -8% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return [ref, inView] as const;
}
