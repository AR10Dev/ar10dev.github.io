import { Component, onCleanup, onMount } from 'solid-js'
import Typed from 'typed.js'

const Type: Component = () => {
  let span: HTMLSpanElement
  let typed: Typed

  onMount(() => {
    const options = {
      strings: [
        'Student',
        'Game Developer',
        'Tech Enthusiast',
        'Freelancer',
        'Full Stack Developer'
      ],
      typeSpeed: 90,
      loop: true,
      backDelay: 900,
      backSpeed: 50
    }
    typed = new Typed(span, options)
  })

  onCleanup(() => {
    typed.destroy()
  })

  return <span ref={span} />
}

export default Type
