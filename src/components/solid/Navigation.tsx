import type { Component } from "solid-js";
import { createSignal, For, onCleanup, onMount, Show } from "solid-js";

export interface NavLink {
  label: string;
  href: string;
  isActive?: boolean;
  children?: NavLink[];
}

interface NavigationProps {
  links: NavLink[];
  currentPath: string;
}

const Navigation: Component<NavigationProps> = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [openDropdown, setOpenDropdown] = createSignal<string | null>(null);

  const isActive = (href: string): boolean => {
    if (href === "/") {
      return props.currentPath === "/" || props.currentPath === "";
    }
    return props.currentPath.startsWith(href);
  };

  const hasActiveChild = (link: NavLink): boolean => {
    if (!link.children) return false;
    return link.children.some((child) => isActive(child.href));
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

  const toTrackToken = (value: string): string =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "");

  return (
    <nav class="flex items-center" aria-label="Main navigation">
      {/* Desktop Navigation */}
      <ul class="hidden md:flex items-center gap-1 rounded-xl border border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--surface-panel)_84%,transparent)] px-1.5 py-1 shadow-[0_10px_24px_rgba(15,23,42,0.08)]">
        <For each={props.links}>
          {(link) => (
            <li class="relative">
              <Show
                when={link.children && link.children.length > 0}
                fallback={
                  <a
                    class={`${baseClass} ${isActive(link.href) ? activeClass : ""}`}
                    href={link.href}
                    data-track={`nav_desktop_${toTrackToken(link.label)}`}
                    aria-current={isActive(link.href) ? "page" : undefined}
                  >
                    {link.label}
                  </a>
                }
              >
                <button
                  type="button"
                  class={`${baseClass} ${isActive(link.href) || hasActiveChild(link) ? activeClass : ""} gap-1`}
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown() === link.label ? null : link.label,
                    )
                  }
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  aria-expanded={openDropdown() === link.label}
                  aria-haspopup="true"
                >
                  {link.label}
                  <svg
                    class={`h-3.5 w-3.5 transition-transform ${openDropdown() === link.label ? "rotate-180" : ""}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <Show when={openDropdown() === link.label}>
                  <div
                    class="absolute left-0 top-full z-50 mt-1 min-w-[220px] rounded-xl border border-[var(--border-strong)] bg-[var(--surface-panel)] p-1.5 shadow-lg"
                    onMouseLeave={() => setOpenDropdown(null)}
                    role="menu"
                  >
                    <For each={link.children}>
                      {(child) => (
                        <a
                          class="block rounded-lg px-4 py-2.5 text-sm font-medium text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-elevated)] hover:text-[var(--text-strong)]"
                          href={child.href}
                          data-track={`nav_desktop_${toTrackToken(link.label)}_${toTrackToken(child.label)}`}
                          onClick={() => setOpenDropdown(null)}
                        >
                          {child.label}
                        </a>
                      )}
                    </For>
                    <div class="my-1.5 border-t border-[var(--border-strong)]" />
                    <a
                      class="block rounded-lg px-4 py-2.5 text-sm font-semibold text-[var(--accent-strong)] transition-colors hover:bg-[var(--surface-elevated)]"
                      href={link.href}
                      data-track={`nav_desktop_${toTrackToken(link.label)}_all`}
                      onClick={() => setOpenDropdown(null)}
                    >
                      View All Services →
                    </a>
                  </div>
                </Show>
              </Show>
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
          <ul class="py-2 overflow-y-auto max-h-[calc(100vh-180px)]">
            <For each={props.links}>
              {(link) => (
                <li>
                  <Show
                    when={link.children && link.children.length > 0}
                    fallback={
                      <a
                        class={`${mobileBaseClass} ${isActive(link.href) ? mobileActiveClass : ""}`}
                        href={link.href}
                        data-track={`nav_mobile_${toTrackToken(link.label)}`}
                        onClick={() => setIsOpen(false)}
                        aria-current={isActive(link.href) ? "page" : undefined}
                      >
                        {link.label}
                      </a>
                    }
                  >
                    <button
                      type="button"
                      class={`${mobileBaseClass} flex items-center justify-between ${isActive(link.href) || hasActiveChild(link) ? mobileActiveClass : ""}`}
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown() === link.label ? null : link.label,
                        )
                      }
                    >
                      {link.label}
                      <svg
                        class={`h-4 w-4 transition-transform ${openDropdown() === link.label ? "rotate-180" : ""}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                    <Show when={openDropdown() === link.label}>
                      <ul class="bg-[var(--surface-panel)] border-t border-[var(--border-strong)]">
                        <For each={link.children}>
                          {(child) => (
                            <li>
                              <a
                                class="block px-8 py-2.5 text-sm text-[var(--text-muted)] hover:bg-[var(--surface-elevated)] hover:text-[var(--text-strong)]"
                                href={child.href}
                                data-track={`nav_mobile_${toTrackToken(link.label)}_${toTrackToken(child.label)}`}
                                onClick={() => setIsOpen(false)}
                              >
                                {child.label}
                              </a>
                            </li>
                          )}
                        </For>
                        <li>
                          <a
                            class="block px-8 py-2.5 text-sm font-semibold text-[var(--accent-strong)] hover:bg-[var(--surface-elevated)]"
                            href={link.href}
                            data-track={`nav_mobile_${toTrackToken(link.label)}_all`}
                            onClick={() => setIsOpen(false)}
                          >
                            View All Services →
                          </a>
                        </li>
                      </ul>
                    </Show>
                  </Show>
                </li>
              )}
            </For>
          </ul>
          <div class="absolute bottom-0 left-0 right-0 border-t border-[var(--border-strong)] p-4">
            <a
              href="/contact/"
              class="block w-full rounded-lg bg-[linear-gradient(120deg,#db7a38,#b05422)] px-4 py-3 text-center font-bold text-white shadow-lg"
              data-track="nav_mobile_contact_cta"
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
