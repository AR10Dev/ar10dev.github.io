/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,ts,tsx}'],
  plugins: [require('./src/plugins/tailwindcss/scrollbar.js')],
  variants: {
    scrollbar: ['rounded'],
    extend: {
      opacity: ['disabled']
    }
  }
}
