import solid from 'solid-start/vite'
import adapter from 'solid-start-static'
import UnoCSS from '@unocss/vite'
import presetWind from '@unocss/preset-wind'
import presetAttributify from '@unocss/preset-attributify'
import { presetScrollbar } from 'unocss-preset-scrollbar'
import lightningcss from 'vite-plugin-lightningcss'
// import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'

export default defineConfig({
  // base: '/ar10dev.github.io/',
  plugins: [
    lightningcss({
      browserslist: '>= 0.25%'
    }),
    solid({
      adapter: adapter()
      // ssr: true
    }),
    // VitePWA({
    //   devOptions: {
    //     enabled: false
    //   },
    //   includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
    //   manifest: {
    //     name: 'Avaab Razzaq',
    //     short_name: 'AR10',
    //     description: "The one and only official website on the internet created by Avaab Razzaq, aka 'AR10'",
    //     theme_color: '#000000',
    //     background_color: '#000000',
    //     display: 'standalone',
    //     icons: [
    //       {
    //         src: 'pwa-192x192.png',
    //         sizes: '192x192',
    //         type: 'image/png'
    //       },
    //       {
    //         src: 'pwa-512x512.png',
    //         sizes: '512x512',
    //         type: 'image/png'
    //       },
    //       {
    //         src: "pwa-192x192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //         purpose: "any maskable"
    //       }
    //     ]
    //   }
    // }),
    UnoCSS({
      presets: [presetWind(), presetAttributify(), presetScrollbar()],
      preflights: [
        {
          getCSS: ({}) => `
          *,:after,:before {
            border: 0 solid #e5e7eb;
            box-sizing: border-box
          }
        
          html {
            -webkit-text-size-adjust: 100%;
            font-family: ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
            line-height: 1.5;
            -moz-tab-size: 4;
            -o-tab-size: 4;
            tab-size: 4
          }
        
          body {
            line-height: inherit;
            margin: 0
          }
        
          hr {
            border-top-width: 1px;
            color: inherit;
            height: 0
          }
          
          abbr:where([title]) {
            -webkit-text-decoration: underline dotted;
            text-decoration: underline dotted
          }
          
          h1,h2,h3,h4,h5,h6 {
            font-size: inherit;
            font-weight: inherit
          }
          
          a {
            color: inherit;
            text-decoration: inherit
          }
          
          b,strong {
            font-weight: bolder
          }
          
          code,kbd,pre,samp {
            font-family: ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;
            font-size: 1em
          }
          
          small {
            font-size: 80%
          }
          
          sub,sup {
            font-size: 75%;
            line-height: 0;
            position: relative;
            vertical-align: baseline
          }
          
          sub {
            bottom: -.25em
          }
          
          sup {
            top: -.5em
          }
          
          table {
            border-collapse: collapse;
            border-color: inherit;
            text-indent: 0
          }
          
          button,input,optgroup,select,textarea {
            color: inherit;
            font-family: inherit;
            font-size: 100%;
            font-weight: inherit;
            line-height: inherit;
            margin: 0;
            padding: 0
          }
          
          button,select {
            text-transform: none
          }
          
          [type=button],[type=reset],[type=submit],button {
            -webkit-appearance: button;
            background-color: transparent;
            background-image: none
          }
          
          :-moz-focusring {
            outline: auto
          }
          
          :-moz-ui-invalid {
            box-shadow: none
          }
          
          progress {
            vertical-align: baseline
          }
          
          ::-webkit-inner-spin-button,::-webkit-outer-spin-button {
            height: auto
          }
          
          [type=search] {
            -webkit-appearance: textfield;
            outline-offset: -2px
          }
          
          ::-webkit-search-decoration {
            -webkit-appearance: none
          }
          
          ::-webkit-file-upload-button {
            -webkit-appearance: button;
            font: inherit
          }
          
          summary {
            display: list-item
          }
          
          blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre {
            margin: 0
          }
          
          fieldset {
            margin: 0
          }
          
          fieldset,legend {
            padding: 0
          }
          
          menu,ol,ul {
            list-style: none;
            margin: 0;
            padding: 0
          }
          
          textarea {
            resize: vertical
          }
          
          input::-moz-placeholder,textarea::-moz-placeholder {
            color: #9ca3af;
            opacity: 1
          }
          
          input::placeholder,textarea::placeholder {
            color: #9ca3af;
            opacity: 1
          }
          
          [role=button],button {
            cursor: pointer
          }
          
          :disabled {
            cursor: default
          }
          
          audio,canvas,embed,iframe,img,object,svg,video {
            display: block;
            vertical-align: middle
          }
          
          img,video {
            height: auto;
            max-width: 100%
          }
          `
        }
      ]
    })
  ]
})
