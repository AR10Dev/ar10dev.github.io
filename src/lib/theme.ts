type ThemeMode = "light" | "dark";

/**
 * Returns the theme toggle button if present and correctly typed.
 */
export const getThemeToggleButton = (): HTMLButtonElement | null => {
  const node = document.getElementById("theme-toggle");
  return node instanceof HTMLButtonElement ? node : null;
};

/**
 * Reads the persisted theme value from localStorage.
 */
export const readStoredTheme = (): ThemeMode | null => {
  try {
    const storedTheme = localStorage.getItem("theme");
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
    localStorage.setItem("theme", theme);
  } catch {
    // Ignore localStorage restrictions.
  }
};

/**
 * Applies the visual theme to the document and updates the toggle label.
 */
export const applyTheme = (isDark: boolean): void => {
  document.documentElement.classList.toggle("dark", isDark);
  const toggle = getThemeToggleButton();
  if (toggle) {
    toggle.textContent = isDark ? "Light mode" : "Dark mode";
    toggle.setAttribute("aria-pressed", String(isDark));
  }
};

export type { ThemeMode };
