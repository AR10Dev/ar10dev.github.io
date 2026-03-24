import {
  applyTheme,
  getThemeToggleButton,
  persistTheme,
  readStoredTheme,
  type ThemeMode,
} from "../lib/theme";
import { trackEvent } from "../lib/analytics";
import { setupRevealObserver, setupTracking } from "../lib/observe";

type CleanupFn = () => void;

// Initialize stored theme
const storedTheme = readStoredTheme();
if (storedTheme) {
  applyTheme(storedTheme === "dark");
}

const cleanupFns: CleanupFn[] = [];

// Setup theme toggle
const toggle = getThemeToggleButton();
if (toggle) {
  const onThemeToggle = (): void => {
    const isDark = !document.documentElement.classList.contains("dark");
    applyTheme(isDark);
    const mode: ThemeMode = isDark ? "dark" : "light";
    trackEvent("toggle_theme", { mode });
    persistTheme(mode);
  };

  toggle.addEventListener("click", onThemeToggle);
  cleanupFns.push(() => toggle.removeEventListener("click", onThemeToggle));
}

// Setup tracking and reveal observer
cleanupFns.push(setupTracking(trackEvent));
cleanupFns.push(setupRevealObserver());

// Cleanup on page hide
window.addEventListener(
  "pagehide",
  () => {
    cleanupFns.forEach((cleanupFn) => cleanupFn());
  },
  { once: true }
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

export {};
