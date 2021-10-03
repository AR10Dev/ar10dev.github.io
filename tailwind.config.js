module.exports = {
  mode: 'jit',
  plugins: [require('tailwind-scrollbar')],
  minify: true,
  content: ['./public/**/*.html', './src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}'],
  darkMode: false, // or 'media' or 'class'
  theme: {},
  variants: {
    scrollbar: ['rounded'],
    extend: {
      opacity: ['disabled']
    }
  }
}
