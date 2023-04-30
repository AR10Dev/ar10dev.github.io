export default function About() {
  return (
    <div id="about" class="grid gap-4 justify-items-center place-content-center">
      <section class="max-w-screen-lg mx-auto xl:max-w-screen-xl">
        <article class="p-8 mx-8 my-8 bg-white border shadow-xl rounded-xl xl:mx-20">
          <h5 class="mt-0 mb-4 text-3xl font-bold text-center text-blue-700 uppercase line">
            About me
          </h5>
          <div class="select-text">
            <p class="text-base text-gray-700">
              Passionate about technology, student of the Virtual University of Pakistan
              and ready for new challenges.
            </p>
            <p class="text-base text-gray-700">
              I code since the first ```printf("Hello Wold");``` in 2016. In 2020, I
              graduated in IT from ITCS Erasmo da Rotterdam.
            </p>
          </div>
        </article>
      </section>
    </div>
  )
}
