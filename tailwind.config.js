module.exports = {
  mode: 'jit',
  plugins: [require('tailwind-scrollbar')],
  minify: true,
  content: ['./public/**/*.html', './src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}'],
  theme: {},
  variants: {
    scrollbar: ['rounded'],
    extend: {
      opacity: ['disabled']
    }
  }
}
