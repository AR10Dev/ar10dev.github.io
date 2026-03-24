/**
 * Tailwind CSS utility class strings for reusable UI components.
 * These are extracted to avoid repetition across components and pages.
 */

export const headerBackground =
  "bg-[var(--surface-elevated)]/90 backdrop-blur supports-[backdrop-filter]:bg-[var(--surface-elevated)]/75 border-b border-[var(--border-strong)]";

export const primaryButtonClass =
  "inline-flex w-full items-center justify-center rounded-full bg-linear-[125deg,var(--accent-strong),color-mix(in_srgb,var(--accent-strong)_88%,white)] px-[1.35rem] py-[0.82rem] text-[0.8rem] font-bold uppercase tracking-[0.06em] text-[var(--accent-contrast)] shadow-[0_12px_28px_rgba(182,80,36,0.3)] transition duration-200 hover:-translate-y-0.5 min-[769px]:w-auto";

export const secondaryButtonClass =
  "inline-flex w-full items-center justify-center rounded-full border border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--surface-panel)_88%,transparent)] px-[1.35rem] py-[0.82rem] text-[0.8rem] font-bold uppercase tracking-[0.06em] text-[var(--text-strong)] transition duration-200 hover:-translate-y-0.5 min-[769px]:w-auto";
