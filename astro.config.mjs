import { defineConfig } from 'astro/config'
import solid from '@astrojs/solid-js'
import tailwindcss from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import tailwindCss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

// https://astro.build/config
export default defineConfig({
  site: 'https://ar10dev.github.io/', // Your public domain, e.g.: https://my-site.dev/. Used to generate sitemaps and canonical URLs.
  integrations: [ solid(), tailwindcss(), sitemap() ],
  vite: {
    css: {
      // PostCSS Config
      postcss: {
        plugins: [
          tailwindCss,
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
