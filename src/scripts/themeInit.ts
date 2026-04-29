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

  // Give injected iframes a descriptive title for accessibility audits.
  const applyIframeTitles = () => {
    document.querySelectorAll("iframe:not([title])").forEach((iframe) => {
      const iframeElement = iframe;
      const source = iframeElement.getAttribute("src") ?? "";
      const title = source.includes("partytown")
        ? "Partytown worker frame"
        : source.includes("cal.com")
          ? "Calendar scheduling embed"
          : "Embedded content";

      iframeElement.setAttribute("title", title);
    });
  };

  const startIframeTitleObserver = () => {
    applyIframeTitles();

    const observer = new MutationObserver(() => {
      applyIframeTitles();
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startIframeTitleObserver, { once: true });
  } else {
    startIframeTitleObserver();
  }
})();`;
