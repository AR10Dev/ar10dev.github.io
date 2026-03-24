import type { Component } from "solid-js";
import { createSignal, For, onMount } from "solid-js";

const Navbar: Component<{ links: string[] }> = (props) => {
  const [current, setCurrent] = createSignal("");

  onMount(() => {
    getSection();

    window.onscroll = () => {
      getSection();
    };
  });

  const getSection = () => {
    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.scrollY + 200 >= sectionTop) {
        setCurrent(section.getAttribute("id"));
      }
    });
  };

  return (
    <ul class="h-full space-x-3 py-4 pr-2 font-bold uppercase" style="color: var(--text-muted);">
      <For each={props.links}>
        {(link) => (
          <li
            class={`float-right transition-colors`}
            style={{
              color: current() === link ? "var(--accent-strong)" : "var(--text-muted)",
            }}
          >
            <a class="block px-2 hover:opacity-80 transition-opacity" href={`#${link}`}>
              {link}
            </a>
          </li>
        )}
      </For>
    </ul>
  );
};

export default Navbar;
