declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Emits tracking data to dataLayer, gtag, and an internal custom event.
 */
export const trackEvent = (
  eventName: string,
  payload: Record<string, unknown> = {}
): void => {
  window.dataLayer ||= [];
  window.dataLayer.push({ event: eventName, ...payload });

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, payload);
  }

  window.dispatchEvent(
    new CustomEvent("portfolio:track", {
      detail: { eventName, ...payload },
    })
  );

  if (import.meta.env.DEV) {
    console.info("[analytics]", eventName, payload);
  }
};
