import {
  denyAnalyticsConsent,
  getAnalyticsConsentState,
  grantAnalyticsConsent,
  syncAnalyticsConsentState,
  trackEvent,
} from "../lib/analytics";
import { setupRevealObserver, setupTracking } from "../lib/observe";
import {
  applyTheme,
  getThemeToggleButton,
  persistTheme,
  readStoredTheme,
  type ThemeMode,
} from "../lib/theme";

type CleanupFn = () => void;

const setupConsentBanner = (): CleanupFn => {
  syncAnalyticsConsentState();

  const consentBanner = document.getElementById("analytics-consent-banner");
  if (!(consentBanner instanceof HTMLElement)) {
    return () => {};
  }

  const acceptButton = consentBanner.querySelector<HTMLButtonElement>(
    '[data-consent-action="accept"]',
  );
  const declineButton = consentBanner.querySelector<HTMLButtonElement>(
    '[data-consent-action="decline"]',
  );

  const hideBanner = (): void => {
    consentBanner.classList.add("hidden");
  };

  const showBanner = (): void => {
    consentBanner.classList.remove("hidden");
  };

  if (getAnalyticsConsentState() === "unknown") {
    showBanner();
  } else {
    hideBanner();
  }

  const onAccept = (): void => {
    grantAnalyticsConsent();
    hideBanner();
    trackEvent("consent_updated", {
      consent: "granted",
      source: "banner",
    });
  };

  const onDecline = (): void => {
    denyAnalyticsConsent();
    hideBanner();
  };

  acceptButton?.addEventListener("click", onAccept);
  declineButton?.addEventListener("click", onDecline);

  return () => {
    acceptButton?.removeEventListener("click", onAccept);
    declineButton?.removeEventListener("click", onDecline);
  };
};

const setupConversionTracking = (): CleanupFn => {
  const conversionForms = [
    {
      selector: 'form[name="homepage-lead"]',
      eventName: "conversion_homepage_lead_submit",
      source: "homepage",
    },
    {
      selector: 'form[name="contact-form"]',
      eventName: "conversion_contact_form_submit",
      source: "contact",
    },
  ] as const;

  const cleanupFns: CleanupFn[] = [];

  conversionForms.forEach(({ selector, eventName, source }) => {
    const form = document.querySelector<HTMLFormElement>(selector);
    if (!form) {
      return;
    }

    const onSubmit = (): void => {
      trackEvent(eventName, {
        form_name: form.getAttribute("name") ?? "unknown",
        source,
        cta_location: source,
        interaction_type: "submit",
      });
    };

    form.addEventListener("submit", onSubmit);
    cleanupFns.push(() => form.removeEventListener("submit", onSubmit));
  });

  return () => {
    cleanupFns.forEach((cleanupFn) => void cleanupFn());
  };
};

if (typeof window !== "undefined" && typeof document !== "undefined") {
  // Initialize theme from stored value or system preference
  const storedTheme = readStoredTheme();
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialIsDark = storedTheme ? storedTheme === "dark" : prefersDark;
  applyTheme(initialIsDark);

  const cleanupFns: CleanupFn[] = [];
  cleanupFns.push(setupConsentBanner());

  // Setup theme toggle
  const toggle = getThemeToggleButton();
  if (toggle) {
    const onThemeToggle = (): void => {
      const isDark = !document.documentElement.classList.contains("dark");
      applyTheme(isDark);
      const mode: ThemeMode = isDark ? "dark" : "light";
      trackEvent("toggle_theme", {
        mode,
        cta_location: "theme_toggle",
        interaction_type: "click",
      });
      persistTheme(mode);
    };

    toggle.addEventListener("click", onThemeToggle);
    cleanupFns.push(() => toggle.removeEventListener("click", onThemeToggle));
  }

  // Setup tracking and reveal observer
  cleanupFns.push(setupTracking(trackEvent));
  cleanupFns.push(setupConversionTracking());
  cleanupFns.push(setupRevealObserver());

  // Setup slide navigation
  const mainContent = document.getElementById("main-content");
  const slides = Array.from(
    document.querySelectorAll<HTMLElement>(".slide-section"),
  );

  if (mainContent && slides.length > 0) {
    let isSlideAnimating = false;

    const findNearestSlideIndex = (): number => {
      const center = mainContent.scrollTop + mainContent.clientHeight / 2;
      let nearestIndex = 0;
      let minDistance = Number.POSITIVE_INFINITY;

      slides.forEach((slide, index) => {
        const distance = Math.abs(
          slide.offsetTop + slide.offsetHeight / 2 - center,
        );
        if (distance < minDistance) {
          minDistance = distance;
          nearestIndex = index;
        }
      });

      return nearestIndex;
    };

    const goToSlide = (targetIndex: number): void => {
      if (isSlideAnimating) {
        return;
      }

      const clampedIndex = Math.max(
        0,
        Math.min(targetIndex, slides.length - 1),
      );
      const targetSlide = slides[clampedIndex];
      if (!targetSlide) {
        return;
      }

      isSlideAnimating = true;

      targetSlide.scrollIntoView({ behavior: "smooth", block: "start" });

      window.setTimeout(() => {
        isSlideAnimating = false;
      }, 700);
    };

    // Wheel scroll navigation
    const onWheel = (event: WheelEvent): void => {
      if (Math.abs(event.deltaY) < 8 || isSlideAnimating) {
        return;
      }

      event.preventDefault();
      const currentIndex = findNearestSlideIndex();
      const direction = event.deltaY > 0 ? 1 : -1;
      goToSlide(currentIndex + direction);
    };

    // Keyboard navigation
    const onKeyDown = (event: KeyboardEvent): void => {
      const downKeys = ["ArrowDown", "PageDown"];
      const upKeys = ["ArrowUp", "PageUp"];

      if (event.key === " " || downKeys.includes(event.key)) {
        event.preventDefault();
        goToSlide(findNearestSlideIndex() + 1);
        return;
      }

      if (upKeys.includes(event.key)) {
        event.preventDefault();
        goToSlide(findNearestSlideIndex() - 1);
      }
    };

    mainContent.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    cleanupFns.push(() => mainContent.removeEventListener("wheel", onWheel));
    cleanupFns.push(() => window.removeEventListener("keydown", onKeyDown));
  }

  // Cleanup on page hide
  window.addEventListener(
    "pagehide",
    () => {
      cleanupFns.forEach((cleanupFn) => void cleanupFn());
    },
    { once: true },
  );

  if (import.meta.env.DEV && "serviceWorker" in navigator) {
    navigator.serviceWorker
      .getRegistrations()
      .then((registrations) => {
        registrations.forEach((registration) => {
          void registration.unregister();
        });
      })
      .catch(() => {
        // Ignore cleanup failures in development.
      });
  }
}
