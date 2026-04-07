// This file is used as is:inline content - keep as self-contained IIFE
export const themeInitScript = `(() => {
  try {
    const storedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = storedTheme === null ? systemPrefersDark : storedTheme === "dark";
    document.documentElement.classList.toggle("dark", shouldUseDark);
    if (shouldUseDark !== false) document.documentElement.classList.add("js");
  } catch {
    // Ignore localStorage restrictions
  }
})();`;
