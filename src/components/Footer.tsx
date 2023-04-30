import { A } from 'solid-start'

export default function Footer() {
  return (
    <footer class="grid gap-2 py-6 bg-black justify-items-center place-content-center">
      <p class="text-base">Copyright © 2023 Avaab Razzaq All rights reserved</p>
      <p class="text-base">
        Made with ❤️ by{' '}
        <A
          class="font-bold transition-colors duration-200 text-sky-400 hover:text-sky-500"
          href="https://github.com/AR10Dev"
        >
          AR10Dev
        </A>
      </p>
    </footer>
  )
}
