/**
 * Centralized constants for shared CSS classes and configuration
 * Eliminates redundancy and ensures consistency across components
 */

export const TYPOGRAPHY_CLASSES = {
  kicker:
    "text-[0.75rem] font-bold uppercase tracking-[0.22em] text-[var(--accent-strong)]",
  title:
    "font-['Sora','Segoe_UI',sans-serif] text-[clamp(1.7rem,3vw,2.35rem)] leading-[1.15] tracking-[-0.02em]",
  heroTitle:
    "mt-4 text-balance font-['Sora','Segoe_UI',sans-serif] text-[clamp(2.1rem,5vw,4.3rem)] leading-[1.06] tracking-[-0.03em]",
  subheading: "text-2xl font-semibold text-[var(--text-strong)] md:text-3xl",
  body: "text-[clamp(1rem,2vw,1.2rem)] leading-[1.7] text-[var(--text-muted)]",
};

export const BUTTON_CLASSES = {
  base: "inline-flex min-h-[2.75rem] items-center justify-center rounded-full px-[1.3rem] py-[0.82rem] text-[0.84rem] font-bold uppercase tracking-[0.05em] transition-[transform,box-shadow,background,border-color] duration-200 hover:-translate-y-[1px] max-md:w-full",
  primary:
    "bg-[linear-gradient(120deg,#db7a38,#b05422)] text-[var(--accent-contrast)] shadow-[0_14px_30px_rgba(176,84,34,0.25)] hover:shadow-[0_12px_26px_rgba(15,23,42,0.2)]",
  secondary:
    "border border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--surface-panel)_86%,transparent)] text-[var(--text-strong)] hover:shadow-[0_12px_26px_rgba(15,23,42,0.2)]",
};

export const CARD_CLASSES = {
  base: "rounded-[var(--card-radius)] border border-[var(--card-uniform-border)] bg-[var(--card-uniform-bg)] shadow-[var(--card-shadow)]",
  compact: "p-5",
};

export const FORM_CLASSES = {
  input:
    "mt-1.5 w-full rounded-xl border border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--surface-panel)_90%,transparent)] px-[0.85rem] py-[0.72rem] text-[var(--text-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[color-mix(in_srgb,var(--accent-strong)_60%,white)]",
};

export const ICON_BUTTON_CLASSES = {
  base: "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-strong)] text-[var(--text-strong)] transition-[transform,border-color,background,color] duration-200 hover:-translate-y-[1px]",
  elevated:
    "bg-[color-mix(in_srgb,var(--surface-panel)_85%,transparent)] hover:border-[color-mix(in_srgb,var(--accent-strong)_55%,var(--border-strong))] hover:bg-[color-mix(in_srgb,var(--surface-panel)_78%,var(--accent-strong)_22%)]",
};

export const SOCIAL_LINK_CLASSES = {
  icon: "inline-flex h-[2.4rem] w-[2.4rem] items-center justify-center rounded-xl border border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--surface-panel)_86%,transparent)] text-[var(--text-strong)] transition-[transform,border-color,background] duration-200 hover:-translate-y-[1px] hover:border-[color-mix(in_srgb,var(--accent-strong)_60%,var(--border-strong))] hover:bg-[color-mix(in_srgb,var(--surface-panel)_78%,var(--accent-strong)_22%)]",
  text: "text-[0.82rem] font-bold text-[var(--accent-strong)] transition-opacity duration-200 hover:opacity-80",
};

export const SKIP_LINK_CLASSES =
  "absolute left-4 top-[-100%] z-[200] rounded-[0.6rem] border border-[var(--border-strong)] bg-[var(--surface-panel)] px-[0.85rem] py-[0.55rem] font-bold text-[var(--text-strong)] focus-visible:top-[0.8rem]";

export const CONTAINER_CLASSES = {
  horizontal: "mx-auto max-w-screen-xl px-6",
  section: "mx-auto w-full max-w-screen-xl px-6",
};
