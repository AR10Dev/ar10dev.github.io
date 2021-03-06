import { Component, onMount, createSignal, For } from 'solid-js'

const links: string[] = ['contact', 'works', 'skill', 'about']

const Navbar: Component = () => {
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
    <ul class="space-x-3 py-4 pr-2 h-full font-bold uppercase text-gray-300">
      <For each={links}>
        {link => (
          <li class={`float-right ${current() === link ? 'text-yellow-500' : ''}`.trim()}>
            <a class="block px-2" href={`#${link}`.trim()}>
              {link}
            </a>
          </li>
        )}
      </For>
    </ul>
  )
}

export default Navbar
