import { defineConfig } from 'astro/config'
import solid from '@astrojs/solid-js'
import UnoCSS from '@unocss/astro'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import robotsTxt from 'astro-robots-txt'
import presetWind from '@unocss/preset-wind'
import presetAttributify from '@unocss/preset-attributify'
import { presetScrollbar } from 'unocss-preset-scrollbar'

// https://astro.build/config
export default defineConfig({
  site: 'https://ar10dev.github.io/', // Your public domain, e.g.: https://my-site.dev/. Used to generate sitemaps and canonical URLs.
  integrations: [
    solid(),
    UnoCSS({
      presets: [presetWind(), presetAttributify(), presetScrollbar()]
    }),
    mdx(),
    sitemap(),
    robotsTxt()
  ]
})
