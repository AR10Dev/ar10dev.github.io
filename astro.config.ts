import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import sitemap, { ChangeFreqEnum } from "@astrojs/sitemap";
import solid from "@astrojs/solid-js";
import tailwindcss from "@tailwindcss/vite";
import AstroPWA from "@vite-pwa/astro";
import { defineConfig } from "astro/config";

const tailwindPlugin = tailwindcss() as unknown as never;

// https://astro.build/config
export default defineConfig({
  site: "https://avaabrazzaq.com/", // Your public domain, e.g.: https://my-site.dev/. Used to generate sitemaps and canonical URLs.
  trailingSlash: "always", // Consistent URL format - all URLs end with /
  vite: {
    plugins: [tailwindPlugin],
  },
  integrations: [
    solid(),
    mdx(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    sitemap({
      serialize(item) {
        // Enhanced sitemap with priority and changefreq
        const url = item.url;
        let priority = 0.5;
        let changefreq = ChangeFreqEnum.MONTHLY;

        // Homepage gets highest priority
        if (url === "https://avaabrazzaq.com/") {
          priority = 1.0;
          changefreq = ChangeFreqEnum.WEEKLY;
        }
        // Blog posts - high priority, updated occasionally
        else if (url.includes("/blog/") && !url.endsWith("/blog/")) {
          priority = 0.8;
          changefreq = ChangeFreqEnum.MONTHLY;
        }
        // Blog index
        else if (url.endsWith("/blog/")) {
          priority = 0.9;
          changefreq = ChangeFreqEnum.WEEKLY;
        }
        // Service pages - high priority
        else if (url.includes("/services/") && !url.endsWith("/services/")) {
          priority = 0.8;
          changefreq = ChangeFreqEnum.MONTHLY;
        }
        // Services index
        else if (url.endsWith("/services/")) {
          priority = 0.9;
          changefreq = ChangeFreqEnum.MONTHLY;
        }
        // Portfolio items
        else if (url.includes("/portfolio/") && !url.endsWith("/portfolio/")) {
          priority = 0.7;
          changefreq = ChangeFreqEnum.YEARLY;
        }
        // Portfolio index
        else if (url.endsWith("/portfolio/")) {
          priority = 0.8;
          changefreq = ChangeFreqEnum.MONTHLY;
        }
        // About and contact
        else if (url.includes("/about/") || url.includes("/contact/")) {
          priority = 0.7;
          changefreq = ChangeFreqEnum.MONTHLY;
        }

        return {
          ...item,
          changefreq,
          priority,
          // Note: lastmod is automatically added by Astro sitemap when available
        };
      },
    }),
    AstroPWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png"],
      manifest: {
        name: "Avaab Razzaq",
        short_name: "AR10",
        theme_color: "#000000",
        background_color: "#000000",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "images",
              expiration: {
                maxEntries: 20,
              },
            },
          },
          {
            urlPattern: /\.(?:woff|woff2|ttf|eot)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "fonts",
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 7 * 24 * 60 * 60,
              },
            },
          },
        ],
      },
    }),
  ],
});
