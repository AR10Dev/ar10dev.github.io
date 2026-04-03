import type { Component } from "solid-js";
import { createSignal, For, onCleanup, onMount } from "solid-js";

const MIN_ACTIVE_RATIO = 0.2;
const THRESHOLD_ARRAY = [0, 0.1, 0.2, 0.35, 0.5, 0.65, 0.8, 1];

interface NavbarProps {
  links: string[];
}

const Navbar: Component<NavbarProps> = (props) => {
  const [current, setCurrent] = createSignal("");
  let scrollContainer: HTMLElement | Window | null = null;
  let sectionObserver: IntersectionObserver | null = null;
  let onScroll: (() => void) | null = null;
  let onHashChange: (() => void) | null = null;

  /**
   * Calculate visible ratio of section in viewport
   */
  const calculateVisibleRatio = (
    rect: DOMRect,
    viewportTop: number,
    viewportBottom: number,
    viewportHeight: number,
  ): number => {
    const visible = Math.max(
      0,
      Math.min(rect.bottom, viewportBottom) - Math.max(rect.top, viewportTop),
    );
    const denominator = Math.max(1, Math.min(rect.height, viewportHeight));
    return visible / denominator;
  };

  /**
   * Determine active section from viewport using scroll container
   */
  const getSectionFromViewport = (
    sections: HTMLElement[],
    scroller: HTMLElement | null,
  ): string => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return "";
    }

    if (sections.length === 0) {
      return "";
    }

    let activeId = "";
    let maxVisibleRatio = 0;

    const rootRect = scroller?.getBoundingClientRect() || {
      top: 0,
      bottom: window.innerHeight,
    };
    const viewportTop = rootRect.top;
    const viewportBottom = rootRect.bottom || window.innerHeight;
    const viewportHeight = Math.max(1, viewportBottom - viewportTop);

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const visibleRatio = calculateVisibleRatio(
        rect,
        viewportTop,
        viewportBottom,
        viewportHeight,
      );

      if (visibleRatio > maxVisibleRatio) {
        maxVisibleRatio = visibleRatio;
        activeId = section.id;
      }
    });

    return maxVisibleRatio >= MIN_ACTIVE_RATIO ? activeId : "";
  };

  onMount(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    const scroller = document.getElementById("main-content");
    scrollContainer = scroller ?? window;
    const sections = props.links
      .map((link) => document.getElementById(link))
      .filter(
        (section): section is HTMLElement => section instanceof HTMLElement,
      );

    if (sections.length === 0) {
      return;
    }

    const updateFromViewport = () => {
      const activeId = getSectionFromViewport(sections, scroller);
      if (activeId) {
        setCurrent(activeId);
      }
    };

    // Try using IntersectionObserver for better performance
    if (typeof window.IntersectionObserver !== "undefined") {
      const sectionRatios = new Map<string, number>();

      sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const sectionId = (entry.target as HTMLElement).id;
            sectionRatios.set(sectionId, entry.intersectionRatio);
          });

          let activeId = "";
          let maxRatio = Number.NEGATIVE_INFINITY;

          sections.forEach((section) => {
            const ratio = sectionRatios.get(section.id) ?? 0;
            if (ratio > maxRatio) {
              maxRatio = ratio;
              activeId = section.id;
            }
          });

          if (activeId && maxRatio >= MIN_ACTIVE_RATIO) {
            setCurrent(activeId);
          } else {
            setCurrent("");
          }
        },
        {
          root: scroller,
          threshold: THRESHOLD_ARRAY,
        },
      );

      sections.forEach((section) => void sectionObserver?.observe(section));
    } else {
      // Fallback for browsers without IntersectionObserver
      onScroll = () => updateFromViewport();
      onScroll();
      scrollContainer?.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
    }

    // Handle hash changes for direct navigation
    onHashChange = () => {
      const hashId = window.location.hash.replace("#", "");
      if (props.links.includes(hashId)) {
        setCurrent(hashId);
      } else {
        updateFromViewport();
      }
    };

    window.addEventListener("hashchange", onHashChange, { passive: true });

    // Set initial active section
    const initialHash = window.location.hash.replace("#", "");
    if (props.links.includes(initialHash)) {
      setCurrent(initialHash);
    } else {
      updateFromViewport();
    }
  });

  onCleanup(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (scrollContainer && onScroll) {
      scrollContainer.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    }
    if (sectionObserver) {
      sectionObserver.disconnect();
      sectionObserver = null;
    }
    if (onHashChange) {
      window.removeEventListener("hashchange", onHashChange);
    }
  });

  const baseClass =
    "inline-flex items-center justify-center rounded-[0.65rem] border border-transparent px-[0.7rem] py-[0.42rem] text-[0.73rem] tracking-[0.06em] text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:bg-[color-mix(in_srgb,var(--surface-panel)_76%,transparent)] hover:text-[var(--text-strong)]";
  const activeClass =
    "!text-white border-[color-mix(in_srgb,var(--accent-strong)_70%,var(--border-strong))] bg-[color-mix(in_srgb,var(--accent-strong)_86%,#10243d)] shadow-[0_0_0_1px_color-mix(in_srgb,var(--accent-strong)_55%,transparent)]";

  return (
    <ul class="ml-auto flex h-full items-center justify-end gap-1 rounded-xl border border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--surface-panel)_84%,transparent)] px-1 py-1 font-bold uppercase shadow-[0_10px_24px_rgba(15,23,42,0.08)]">
      <For each={props.links}>
        {(link) => (
          <li>
            <a
              class={`${baseClass}${current() === link ? activeClass : ""}`}
              style={current() === link ? { color: "white" } : undefined}
              href={`#${link}`}
              onClick={() => setCurrent(link)}
              aria-current={current() === link ? "page" : undefined}
            >
              {link}
            </a>
          </li>
        )}
      </For>
    </ul>
  );
};

export default Navbar;
