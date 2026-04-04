declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export const ANALYTICS_CONSENT_STORAGE_KEY = "analytics_consent";
export const ANALYTICS_CONSENT_EVENT = "analytics:consent";

export type AnalyticsConsentState = "granted" | "denied" | "unknown";

const readStoredConsent = (): AnalyticsConsentState => {
  try {
    const storedValue = localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY);
    if (storedValue === "granted" || storedValue === "denied") {
      return storedValue;
    }
  } catch {
    // Ignore storage access restrictions and treat consent as unknown.
  }

  return "unknown";
};

const persistConsent = (
  consent: Exclude<AnalyticsConsentState, "unknown">,
): void => {
  try {
    localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, consent);
  } catch {
    // Ignore storage access restrictions when persisting consent.
  }
};

const dispatchConsentEvent = (
  consent: Exclude<AnalyticsConsentState, "unknown">,
): void => {
  window.dispatchEvent(
    new CustomEvent(ANALYTICS_CONSENT_EVENT, {
      detail: { consent },
    }),
  );
};

export const getAnalyticsConsentState = (): AnalyticsConsentState =>
  readStoredConsent();

export const hasAnalyticsConsent = (): boolean =>
  getAnalyticsConsentState() === "granted";

export const syncAnalyticsConsentState = (): void => {
  const consent = hasAnalyticsConsent() ? "granted" : "denied";
  dispatchConsentEvent(consent);
};

export const grantAnalyticsConsent = (): void => {
  persistConsent("granted");
  dispatchConsentEvent("granted");
};

export const denyAnalyticsConsent = (): void => {
  persistConsent("denied");
  dispatchConsentEvent("denied");
};

const normalizeEventName = (value: string): string => {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

  return normalized || "interaction_click";
};

const inferPageType = (pathname: string): string => {
  if (pathname === "/") {
    return "home";
  }

  if (pathname.startsWith("/services/")) {
    return pathname === "/services/" ? "services_index" : "service_detail";
  }

  if (pathname.startsWith("/portfolio/")) {
    return pathname === "/portfolio/" ? "portfolio_index" : "portfolio_detail";
  }

  if (pathname.startsWith("/blog/")) {
    return pathname === "/blog/" ? "blog_index" : "blog_detail";
  }

  if (pathname.startsWith("/contact/")) {
    return "contact";
  }

  if (pathname.startsWith("/about/")) {
    return "about";
  }

  return "other";
};

const inferCtaLocation = (
  normalizedEventName: string,
  payload: Record<string, unknown>,
): string => {
  if (
    typeof payload.cta_location === "string" &&
    payload.cta_location.length > 0
  ) {
    return payload.cta_location;
  }

  if (typeof payload.source === "string" && payload.source.length > 0) {
    return payload.source;
  }

  if (normalizedEventName.startsWith("nav_")) {
    return "navigation";
  }

  if (normalizedEventName.startsWith("footer_")) {
    return "footer";
  }

  if (normalizedEventName.includes("homepage")) {
    return "homepage";
  }

  if (normalizedEventName.includes("contact")) {
    return "contact";
  }

  if (normalizedEventName.includes("services")) {
    return "services";
  }

  if (normalizedEventName.includes("portfolio")) {
    return "portfolio";
  }

  return "general";
};

const inferDestinationUrl = (
  payload: Record<string, unknown>,
): string | undefined => {
  if (
    typeof payload.destination_url === "string" &&
    payload.destination_url.length > 0
  ) {
    return payload.destination_url;
  }

  if (
    typeof payload.label === "string" &&
    /^https?:\/\//i.test(payload.label)
  ) {
    return payload.label;
  }

  return undefined;
};

const compactPayload = (
  payload: Record<string, unknown>,
): Record<string, unknown> =>
  Object.fromEntries(
    Object.entries(payload).filter(
      ([, value]) => !(value === undefined || value === null || value === ""),
    ),
  );

/**
 * Emits tracking data to dataLayer, gtag, and an internal custom event.
 */
export const trackEvent = (
  eventName: string,
  payload: Record<string, unknown> = {},
): void => {
  if (!hasAnalyticsConsent()) {
    if (import.meta.env.DEV) {
      console.info("[analytics:blocked]", eventName, payload);
    }

    return;
  }

  const normalizedEventName = normalizeEventName(eventName);
  const pagePath = window.location.pathname;

  const normalizedPayload = compactPayload({
    ...payload,
    event_name: normalizedEventName,
    page_path: pagePath,
    page_type: inferPageType(pagePath),
    page_title: document.title,
    cta_location: inferCtaLocation(normalizedEventName, payload),
    destination_url: inferDestinationUrl(payload),
  });

  window.dataLayer ||= [];
  window.dataLayer.push({ event: normalizedEventName, ...normalizedPayload });

  if (typeof window.gtag === "function") {
    window.gtag("event", normalizedEventName, normalizedPayload);
  }

  window.dispatchEvent(
    new CustomEvent("portfolio:track", {
      detail: { eventName: normalizedEventName, ...normalizedPayload },
    }),
  );

  if (import.meta.env.DEV) {
    console.info("[analytics]", normalizedEventName, normalizedPayload);
  }
};
