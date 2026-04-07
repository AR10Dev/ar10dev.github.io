const COPY_LABEL = "Copy";
const COPIED_LABEL = "Copied!";
const ERROR_LABEL = "Retry";
const RESET_DELAY_MS = 2_000;

const setButtonLabel = (
  button: HTMLButtonElement,
  label: string,
  copied = false,
) => {
  button.textContent = label;

  if (copied) {
    button.setAttribute("data-copied", "true");
    return;
  }

  button.removeAttribute("data-copied");
};

const getCodeText = (button: HTMLButtonElement): string => {
  const pre = button.closest("pre");
  const codeElement = pre?.querySelector("code");

  if (!codeElement?.textContent) {
    return "";
  }

  return codeElement.textContent.replace(/\n$/, "");
};

const bindCopyButton = (button: HTMLButtonElement) => {
  if (button.dataset.copyBound === "true") {
    return;
  }

  button.dataset.copyBound = "true";

  button.addEventListener("click", async () => {
    const codeText = getCodeText(button);

    if (!codeText) {
      return;
    }

    try {
      await navigator.clipboard.writeText(codeText);
      setButtonLabel(button, COPIED_LABEL, true);
    } catch {
      setButtonLabel(button, ERROR_LABEL);
    }

    window.setTimeout(() => {
      setButtonLabel(button, COPY_LABEL);
    }, RESET_DELAY_MS);
  });
};

const initializeCodeCopyButtons = () => {
  const copyButtons = document.querySelectorAll<HTMLButtonElement>(
    "button[data-code-copy]",
  );

  copyButtons.forEach(bindCopyButton);
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeCodeCopyButtons, {
    once: true,
  });
} else {
  initializeCodeCopyButtons();
}
