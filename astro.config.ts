import { defineConfig } from 'astro/config'
import solid from '@astrojs/solid-js'
import tailwindcss from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import image from '@astrojs/image'
import robotsTxt from 'astro-robots-txt'

// https://astro.build/config
export default defineConfig({
  site: 'https://ar10dev.github.io/', // Your public domain, e.g.: https://my-site.dev/. Used to generate sitemaps and canonical URLs.
  experimental: { integrations: true },
  integrations: [ solid(), tailwindcss(), sitemap(), robotsTxt(), image()]
})
