import { Component, createSignal, onMount } from 'solid-js'
import { useMousePosition } from '@solid-primitives/mouse'
import createRAF from '@solid-primitives/raf'
import { useWindowScrollPosition } from '@solid-primitives/scroll'

const lerp = (current: number, goal: number, p: number): number =>
  (1 - p) * current + p * goal

const Cursor: Component = () => {
  onMount(() => start())
  const mouse = useMousePosition()
  const scrool = useWindowScrollPosition()
  const [pos, setPos] = createSignal({ x: 0, y: 0 })
  const [, start] = createRAF(() => {
    setPos(p => ({
      x: lerp(p.x, mouse.x - scrool.x - document.body.offsetLeft, 0.1),
      y: lerp(p.y, mouse.y - scrool.y - document.body.offsetTop, 0.1)
    }))
  })
  return (
    <>
      <div
        style={{ transform: `translate(${pos().x}px, ${pos().y}px)` }}
        class="block fixed z-10 top-0 left-0 w-10 h-10 rounded-full border-dashed border-2 border-blue-600 mt-[calc(40px*-0.5)] ml-[calc(40px*-0.5)] pointer-events-none transition-transform duration-[850ms] ease-[cubic-bezier(0,0.02,0,1)]"
      />
      <div
        style={{ transform: `translate(${pos().x}px, ${pos().y}px)` }}
        class="block fixed z-10 top-0 left-0 w-0.5 h-0.5 rounded-full border-2 border-light-blue-600 mt-[calc(2px*-0.5)] ml-[calc(2px*-0.5)] pointer-events-none transition-transform duration-700 ease-[cubic-bezier(0,0.02,0,1)]"
      />
    </>
  )
}

export default Cursor
