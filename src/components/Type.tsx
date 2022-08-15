import type { Component } from 'solid-js'
import type { TypedOptions } from 'typed.js'
import { onCleanup, onMount } from 'solid-js'
import Typed from 'typed.js'

const Type: Component = () => {
  let span: HTMLSpanElement
  let typed: Typed

  onMount(() => {
    const options: TypedOptions = {
      strings: [
        'Student',
        'Game Developer',
        'Professor',
        'Tech Enthusiast',
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
