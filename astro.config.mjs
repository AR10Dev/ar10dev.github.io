import { defineConfig } from 'astro/config'
import solid from '@astrojs/solid-js'
import tailwindcss from '@astrojs/tailwind'
import tailwindCss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import { VitePWA } from 'vite-plugin-pwa'

// https://astro.build/config
export default defineConfig({
  site: 'https://ar10dev.github.io/', // Your public domain, e.g.: https://my-site.dev/. Used to generate sitemaps and canonical URLs.
  integrations: [solid(), tailwindcss()],
  vite: {
    plugins: [
      VitePWA({
        includeAssets: ['favicon.ico', 'robots.txt'],
        manifest: {
          name: 'AR10',
          short_name: `Avaab Razzaq - AR10's blog`,
          description: `The one and only official blog on the internet created by Avaab Razzaq, aka "AR10"`,
          theme_color: '#ffffff',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ]
        }
      })
    ],
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
