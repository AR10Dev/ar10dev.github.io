/* eslint-disable @typescript-eslint/no-floating-promises */
import { generateSW } from 'workbox-build'

// NOTE: This should be run *AFTER* all your assets are built
const buildSW = () => {
  return generateSW({
    globDirectory: 'dist',
    globPatterns: ['**/**/*.{html,json,js,css}'],
    swDest: 'dist/sw.js',

    // Define runtime caching rules.
    runtimeCaching: [
      {
        urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

        handler: 'StaleWhileRevalidate',

        options: {
          cacheName: 'images',

          // Only cache 10 images.
          expiration: {
            maxEntries: 20
          }
        }
      },
      {
        urlPattern: /\.(?:woff|woff2|ttf|eot)$/,

        // Apply a cache-first strategy.
        handler: 'CacheFirst',

        options: {
          // Use a custom cache name.
          cacheName: 'fonts',

          // Only cache 20 fonts.
          expiration: {
            maxEntries: 20,
            maxAgeSeconds: 7 * 24 * 60 * 60
          }
        }
      }
    ]
  })
}

buildSW()
