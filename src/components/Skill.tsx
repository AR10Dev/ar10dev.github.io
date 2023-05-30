import { Component, For, onCleanup, onMount } from 'solid-js'

const Skill: Component = () => {
  const languages = [
    { name: 'Rust', progress: 100, classList: 'bg-blue-600 h-2.5 rounded-full' },
    { name: 'C / C++', progress: 100, classList: 'bg-blue-600 h-2.5 rounded-full' },
    { name: 'JavaScript', progress: 100, classList: 'bg-blue-600 h-2.5 rounded-full' },
    { name: 'TypeScript', progress: 90, classList: 'bg-blue-600 h-2.5 rounded-full' },
    { name: 'HTML', progress: 100, classList: 'bg-blue-600 h-2.5 rounded-full' },
    { name: 'CSS', progress: 100, classList: 'bg-blue-600 h-2.5 rounded-full' },
    { name: 'Python', progress: 90, classList: 'bg-blue-600 h-2.5 rounded-full' },
    { name: 'SQL', progress: 100, classList: 'bg-blue-600 h-2.5 rounded-full' },
    { name: 'GO', progress: 20, classList: 'bg-blue-600 h-2.5 rounded-full' }
  ]
  return (
    <div id="skill" class="grid gap-4 justify-items-center place-content-center">
      <section class="max-w-screen-lg mx-auto xl:max-w-screen-xl">
        <article class="p-8 mx-8 my-8 bg-white border shadow-xl rounded-xl xl:mx-20">
          <h5 class="mt-0 mb-4 text-3xl font-bold text-center text-blue-700 uppercase line">
            Skills
          </h5>
          <div class="text-black">
            <For each={languages}>
              {({ name, progress, classList }, index) => (
                <div class="flex items-center">
                  <p>{name}</p>
                  <div class="grow w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div class={classList} style={`width: ${progress}%`} />
                  </div>
                </div>
              )}
            </For>
          </div>
        </article>
      </section>
      <section class="max-w-screen-lg mx-auto xl:max-w-screen-xl">
        <article class="p-8 mx-8 my-8 bg-white border shadow-xl rounded-xl xl:mx-20">
          <h5 class="mt-0 mb-4 text-3xl font-bold text-center text-blue-700 uppercase line">
            Tools
          </h5>
          <div class="text-black">
            <For each={languages}>
              {({ name, progress, className }, index) => (
                <div class="flex items-center">
                  <p>{name}</p>
                  <div class="grow w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div class={className} style={`width: ${progress}%`} />
                  </div>
                </div>
              )}
            </For>
          </div>
        </article>
      </section>
    </div>
  )
}

export default Skill
