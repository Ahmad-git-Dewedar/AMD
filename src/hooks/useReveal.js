import { useEffect } from 'react';

/**
 * Adds .is-visible to every [data-reveal] element as it enters the viewport.
 * Runs again whenever `key` changes (route or language), so new nodes are picked up
 */
export function useReveal(key) {
  useEffect(() => {
    const nodes = [...document.querySelectorAll('[data-reveal]:not(.is-visible)')];
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((n) => n.classList.add('is-visible'));
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [key]);
}
