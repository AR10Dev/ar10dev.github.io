/**
 * Sets up intersection observer for reveal - animations removed.
 * Elements with [data-reveal] attribute will have 'is-visible' class added when they come into view.
 * Elements with [data-reveal-list] will trigger class additions on their children.
 */
export const setupRevealObserver = (): (() => void) => {
  const revealNodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
  const revealListNodes = document.querySelectorAll<HTMLElement>("[data-reveal-list]");
  const revealRoot = document.querySelector<HTMLElement>("#main-content");

  if (revealNodes.length === 0 && revealListNodes.length === 0) {
    return () => {};
  }

  const observerOptions: IntersectionObserverInit = {
    root: revealRoot,
    rootMargin: "-8% 0px -8% 0px",
    threshold: 0.15,
  };

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
        
        if (entry.isIntersecting && entry.target.getAttribute("data-reveal-list")) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    observerOptions,
  );

  // Combine all nodes to observe
  const allNodes = [...revealNodes, ...revealListNodes];
  allNodes.forEach((node) => revealObserver.observe(node));

  return () => revealObserver.disconnect();
};

/**
 * Sets up event tracking for elements with [data-track] attribute.
 */
export const setupTracking = (
  trackEvent: (eventName: string, payload: Record<string, unknown>) => void,
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
    cleanupFns.forEach((cleanupFn) => void cleanupFn());
  };
};
