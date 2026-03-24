/**
 * Sets up intersection observer for reveal animations.
 * Elements with [data-reveal] attribute will have 'is-visible' class added when they come into view.
 */
export const setupRevealObserver = (): (() => void) => {
  const revealNodes = document.querySelectorAll<HTMLElement>("[data-reveal]");

  if (revealNodes.length === 0) {
    return () => {};
  }

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.16,
    }
  );

  revealNodes.forEach((node) => {
    revealObserver.observe(node);
  });

  return () => revealObserver.disconnect();
};

/**
 * Sets up event tracking for elements with [data-track] attribute.
 */
export const setupTracking = (
  trackEvent: (eventName: string, payload: Record<string, unknown>) => void
): (() => void) => {
  const trackables = document.querySelectorAll<HTMLElement>("[data-track]");
  const cleanupFns: Array<() => void> = [];

  trackables.forEach((node) => {
    const onTrackedClick = (): void => {
      const label =
        node instanceof HTMLAnchorElement
          ? node.href
          : (node.textContent ?? "").trim();

      trackEvent(node.getAttribute("data-track") ?? "interaction_click", {
        label,
      });
    };

    node.addEventListener("click", onTrackedClick);
    cleanupFns.push(() => node.removeEventListener("click", onTrackedClick));
  });

  return () => {
    cleanupFns.forEach((cleanupFn) => cleanupFn());
  };
};
