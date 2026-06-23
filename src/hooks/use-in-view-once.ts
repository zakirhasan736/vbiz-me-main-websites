'use client';

import { useEffect, useRef, useState } from 'react';

type UseInViewOnceOptions = {
  rootMargin?: string;
  once?: boolean;
};

export function useInViewOnce<T extends HTMLElement = HTMLElement>(
  options: UseInViewOnceOptions = {},
) {
  const { rootMargin = '-100px 0px', once = true } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold: 0 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once, rootMargin]);

  return { ref, inView };
}
