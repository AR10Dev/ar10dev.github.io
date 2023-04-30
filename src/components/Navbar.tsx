import { A } from 'solid-start'
import type { Component } from 'solid-js'
import { onMount, createSignal, For } from 'solid-js'

const Navbar: Component<{ links: string[] }> = props => {
  const [current, setCurrent] = createSignal('')

  onMount(() => {
    getSection()

    window.onscroll = () => {
      getSection()
    }
  })

  const getSection = () => {
    const sections = document.querySelectorAll('div')

    sections.forEach(section => {
      const sectionTop = section.offsetTop
      if (window.scrollY + 200 >= sectionTop) {
        setCurrent(section.getAttribute('id'))
      }
    })
  }

  return (
    <ul class="h-full space-x-3 py-4 pr-2 font-bold uppercase text-gray-300 list-none">
      <For each={props.links}>
        {link => (
          <li class={`float-right ${current() === link ? 'text-yellow-500' : ''}`}>
            <A class="block px-2" href={`#${link}`}>
              {link}
            </A>
          </li>
        )}
      </For>
    </ul>
  )
}

export default Navbar
