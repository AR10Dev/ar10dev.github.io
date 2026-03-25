type ThemeMode = "light" | "dark";

const THEME_KEY = "theme" as const;
const MOON_ICON_SELECTOR = '[data-theme-icon="moon"]' as const;
const SUN_ICON_SELECTOR = '[data-theme-icon="sun"]' as const;
const THEME_TOGGLE_ID = "theme-toggle" as const;
const DARK_CLASS = "dark" as const;

/**
 * Returns the theme toggle button if present and correctly typed.
 */
export const getThemeToggleButton = (): HTMLButtonElement | null => {
  const node = document.getElementById(THEME_TOGGLE_ID);
  return node instanceof HTMLButtonElement ? node : null;
};

/**
 * Reads the persisted theme value from localStorage.
 */
export const readStoredTheme = (): ThemeMode | null => {
  try {
    const storedTheme = localStorage.getItem(THEME_KEY);
    return storedTheme === "light" || storedTheme === "dark"
      ? storedTheme
      : null;
  } catch {
    // Ignore localStorage restrictions.
    return null;
  }
};

/**
 * Persists the current theme for future visits.
 */
export const persistTheme = (theme: ThemeMode): void => {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Ignore localStorage restrictions.
  }
};

/**
 * Updates theme toggle button UI to reflect current theme state.
 */
const updateToggleUI = (toggle: HTMLButtonElement, isDark: boolean): void => {
  const moonIcon = toggle.querySelector(MOON_ICON_SELECTOR);
  const sunIcon = toggle.querySelector(SUN_ICON_SELECTOR);
  const actionLabel = isDark ? "Switch to light mode" : "Switch to dark mode";

  moonIcon?.classList.toggle("hidden", !isDark);
  sunIcon?.classList.toggle("hidden", isDark);

  toggle.title = actionLabel;
  toggle.setAttribute("aria-label", actionLabel);
  toggle.setAttribute("aria-pressed", String(isDark));
};

/**
 * Applies the visual theme to the document and updates the toggle label.
 */
export const applyTheme = (isDark: boolean): void => {
  document.documentElement.classList.toggle(DARK_CLASS, isDark);
  const toggle = getThemeToggleButton();
  if (toggle) {
    updateToggleUI(toggle, isDark);
  }
};

export type { ThemeMode };
