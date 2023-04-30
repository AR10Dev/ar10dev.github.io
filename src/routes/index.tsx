import { A } from 'solid-start'
import About from '../components/About'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Typer from '../components/Typer'
import { TyperProps } from '../components/types'

export default function Home() {
  const links: string[] = ['contact', 'works', 'skill', 'about']
  const background = 'bg-gray-900'
  const typer: TyperProps = {
    cursor: true,
    loop: true,
    typingSpeed: 90,
    typingPause: 1300,
    backspaceSpeed: 80,
    text: [
      'Student',
      'Game Developer',
      'Professor',
      'Tech Enthusiast',
      'Full Stack Developer'
    ]
  }
  return (
    <>
      <header class={`fixed inset-x-0 top-0 z-[1] w-full ${background}`}>
        <div class="flex max-w-screen-lg p-4 mx-auto bg-gray-900 xl:max-w-screen-xl">
          <h1 class="flex-none w-16 h-16 pl-2">
            <A href="/">
              <img
                src="/pwa-512x512.png"
                alt="logo"
                class="block align-middle max-w-full h-auto"
              />
            </A>
          </h1>
          <nav class="flex-grow">
            <Navbar links={links} />
          </nav>
        </div>
      </header>
      <div
        class={`h-screen relative grid justify-items-center place-content-center gap-4 ${background}`}
      >
        <div class="max-w-screen-lg mx-auto text-center xl:max-w-screen-xl">
          <h1 class="font-bold text-7xl m-0">Avaab Razzaq</h1>
          <h3 class="text-3xl font-semibold text-slate-200">
            I'm a <Typer {...typer} />
          </h3>
        </div>
      </div>
      <About />
      <Footer />
    </>
  )
}
