module.exports = {
  plugins: [require('./src/plugins/tailwindcss/scrollbar.js')],
  minify: true,
  content: ['./src/**/*.{astro,ts,tsx}'],
  theme: {},
  variants: {
    scrollbar: ['rounded'],
    extend: {
      opacity: ['disabled']
    }
  }
}
