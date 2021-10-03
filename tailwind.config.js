const scrollbar = require('tailwind-scrollbar')

module.exports = {
  mode: 'jit',
  plugins: [scrollbar],
  minify: true,
  content: ['./public/**/*.html', './src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {},
      spacing: {},
      colors: {}
    }
  },
  variants: {
    scrollbar: ['rounded'],
    extend: {
      opacity: ['disabled']
    }
  }
}
