/**
 * Centralized constants for shared CSS classes and configuration
 * Eliminates redundancy and ensures consistency across components
 */

export const TYPOGRAPHY_CLASSES = {
  kicker:
    "text-[0.75rem] font-bold uppercase tracking-[0.22em] text-[var(--accent-strong)] leading-[1.4]",
  title:
    "font-['Sora',-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif] text-[clamp(1.7rem,3vw,2.35rem)] leading-[1.2] tracking-[-0.02em] font-bold",
  heroTitle:
    "mt-4 text-balance font-['Sora',-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif] text-[clamp(2.1rem,5vw,4.3rem)] leading-[1.08] tracking-[-0.03em] font-extrabold",
  subheading: "text-2xl font-semibold text-[var(--text-strong)] md:text-3xl leading-[1.3] tracking-[-0.015em]",
  sectionTitle: "font-['Sora',-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif] text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.25] tracking-[-0.02em] font-bold",
  body: "text-[clamp(1rem,2vw,1.15rem)] leading-[1.75] text-[var(--text-muted)] font-normal",
  label: "text-sm text-[var(--accent-strong)] font-semibold leading-[1.5]",
  labelXs: "text-xs font-semibold text-[var(--accent-strong)] leading-[1.4] tracking-[0.02em]",
  cardTitle: "text-xl font-semibold text-[var(--text-strong)] leading-[1.3] tracking-[-0.01em]",
  cardTitleBold: "text-xl font-bold leading-[1.25] text-[var(--text-strong)] tracking-[-0.01em]",
  cardText: "text-base font-normal text-[var(--text-muted)] leading-[1.65]",
  cardBody: "text-base font-normal text-[var(--text-strong)] leading-[1.65]",
  cardBodySm: "text-sm text-[var(--text-muted)] leading-[1.6]",
  cardBodyXs: "text-xs text-[var(--text-muted)] leading-[1.5]",
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
  glass: "rounded-lg border border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--surface-panel)_80%,transparent)] shadow-[0_10px_26px_rgba(0,0,0,0.2)] backdrop-blur-sm",
  glassVariant: "rounded-lg border border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--surface-panel)_88%,transparent)] shadow-[0_8px_18px_rgba(0,0,0,0.16)] backdrop-blur-sm",
  portfolio: "rounded-lg border border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--surface-panel)_80%,transparent)] p-4 shadow-[0_12px_30px_rgba(0,0,0,0.22)] backdrop-blur-sm hover:shadow-[0_14px_36px_rgba(0,0,0,0.28)]",
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
  sectionLg: "section-content max-w-screen-lg mx-auto xl:max-w-screen-xl w-full",
};

export const LINK_CLASSES = {
  underlined: "inline-block border-b border-[var(--accent-strong)] pb-0.5 text-xs font-semibold text-[var(--accent-strong)]",
  ctaButton: "inline-block rounded-lg bg-[var(--accent-strong)] px-6 py-3 font-semibold text-[var(--accent-contrast)] hover:opacity-90",
};

export const LAYOUT_CLASSES = {
  siteBg: "fixed inset-0 -z-10 pointer-events-none site-bg",
  mainContent: "h-screen overflow-y-auto scroll-smooth-snap",
  slideSection: "min-h-screen snap-start snap-always flex items-center md:min-h-screen max-md:min-h-0 max-md:snap-normal",
  slideSectionChild: "w-full",
  homeSlide: "block",
  sectionSizeHome: "pt-[clamp(5.6rem,10vh,8rem)] pb-[clamp(2.5rem,6vh,5rem)] max-md:pt-[6.2rem] max-md:pb-10",
  sectionSizeWork: "pt-[clamp(4.5rem,8vh,6.5rem)] pb-[clamp(3rem,7vh,5.5rem)] max-md:pt-[6.2rem] max-md:pb-10",
  sectionSizeBlog: "pt-[clamp(4.2rem,7.5vh,6rem)] pb-[clamp(3rem,7vh,5.2rem)] max-md:pt-[6.2rem] max-md:pb-10",
  homeStack: "min-h-[clamp(35rem,calc(100vh-7rem),56rem)] flex flex-col justify-center gap-[clamp(1.5rem,3vh,2.5rem)] max-md:min-h-0 max-md:justify-start",
};

export const TYPING_CLASSES = {
  live: "hidden js:inline",
  fallback: "js:hidden",
  cursor: "animate-blink",
};
