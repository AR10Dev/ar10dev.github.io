import type { Component } from "solid-js";
import { createSignal, For, onCleanup, onMount, Show } from "solid-js";

export interface NavLink {
  label: string;
  href: string;
  isActive?: boolean;
}

interface NavigationProps {
  links: NavLink[];
  currentPath: string;
}

const Navigation: Component<NavigationProps> = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);

  const isActive = (href: string): boolean => {
    if (href === "/") {
      return props.currentPath === "/" || props.currentPath === "";
    }
    return props.currentPath.startsWith(href);
  };

  onMount(() => {
    if (typeof window === "undefined") return;

    onCleanup(() => {
      // Cleanup if needed
    });
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const baseClass =
    "inline-flex items-center justify-center rounded-[0.65rem] border border-transparent px-[0.85rem] py-[0.5rem] text-[0.78rem] font-semibold tracking-[0.04em] text-[var(--text-muted)] transition-all duration-200 hover:border-[var(--border-strong)] hover:bg-[color-mix(in_srgb,var(--surface-panel)_76%,transparent)] hover:text-[var(--text-strong)]";

  const activeClass =
    "!text-white border-[color-mix(in_srgb,var(--accent-strong)_70%,var(--border-strong))] bg-[color-mix(in_srgb,var(--accent-strong)_86%,#10243d)] shadow-[0_0_0_1px_color-mix(in_srgb,var(--accent-strong)_55%,transparent)]";

  const mobileBaseClass =
    "block w-full px-4 py-3 text-left text-base font-semibold text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-elevated)] hover:text-[var(--text-strong)]";

  const mobileActiveClass =
    "!text-[var(--accent-strong)] bg-[var(--surface-elevated)]";

  return (
    <nav class="flex items-center" aria-label="Main navigation">
      {/* Desktop Navigation */}
      <ul class="hidden md:flex items-center gap-1 rounded-xl border border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--surface-panel)_84%,transparent)] px-1.5 py-1 shadow-[0_10px_24px_rgba(15,23,42,0.08)]">
        <For each={props.links}>
          {(link) => (
            <li>
              <a
                class={`${baseClass} ${isActive(link.href) ? activeClass : ""}`}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
              </a>
            </li>
          )}
        </For>
      </ul>

      {/* Mobile Menu Button */}
      <button
        type="button"
        class="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--surface-panel)_85%,transparent)] text-[var(--text-strong)] transition-all hover:bg-[var(--surface-elevated)]"
        aria-expanded={isOpen()}
        aria-controls="mobile-menu"
        aria-label={isOpen() ? "Close menu" : "Open menu"}
        onClick={() => setIsOpen(!isOpen())}
      >
        <Show
          when={isOpen()}
          fallback={
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-label="Menu"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          }
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-label="Close menu"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </Show>
      </button>

      {/* Mobile Menu Overlay */}
      <Show when={isOpen()}>
        <button
          type="button"
          class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
          onKeyDown={handleKeyDown}
          aria-label="Close menu"
        />
        <div
          id="mobile-menu"
          class="fixed right-0 top-0 z-50 h-full w-[280px] bg-[var(--surface-elevated)] shadow-xl md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <div class="flex items-center justify-between border-b border-[var(--border-strong)] p-4">
            <span class="text-lg font-bold text-[var(--text-strong)]">
              Menu
            </span>
            <button
              type="button"
              class="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--surface-panel)] hover:text-[var(--text-strong)]"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-label="Close menu"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <ul class="py-2">
            <For each={props.links}>
              {(link) => (
                <li>
                  <a
                    class={`${mobileBaseClass} ${isActive(link.href) ? mobileActiveClass : ""}`}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    aria-current={isActive(link.href) ? "page" : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              )}
            </For>
          </ul>
          <div class="absolute bottom-0 left-0 right-0 border-t border-[var(--border-strong)] p-4">
            <a
              href="/contact/"
              class="block w-full rounded-lg bg-[linear-gradient(120deg,#db7a38,#b05422)] px-4 py-3 text-center font-bold text-white shadow-lg"
              onClick={() => setIsOpen(false)}
            >
              Get in Touch
            </a>
          </div>
        </div>
      </Show>
    </nav>
  );
};

export default Navigation;
