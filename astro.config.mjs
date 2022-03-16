import { defineConfig } from 'astro/config';
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

// https://astro.build/config
export default defineConfig({
  buildOptions: {
    site: 'https://ar10dev.github.io/', // Your public domain, e.g.: https://my-site.dev/. Used to generate sitemaps and canonical URLs.
  },
  renderers: ['@astrojs/renderer-solid'],
  vite: {
    css: {
      // PostCSS Config
      postcss: {
        plugins: [
          tailwindcss,
          autoprefixer,
          cssnano({
            preset: 'default',
            plugins: [autoprefixer]
          })
        ]
      }
    },
    build: {
      target: 'esnext',
      minify: 'terser',
      terserOptions: {
        ecma: 2020
      }
    }
  }
})
