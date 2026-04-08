import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import solid from "@astrojs/solid-js";
import rehypeD2 from "@beoe/rehype-d2";
import tailwindcss from "@tailwindcss/vite";
import AstroPWA from "@vite-pwa/astro";
import { defineConfig } from "astro/config";
import rehypeCopyCodeButton from "./src/lib/rehypeCopyCodeButton";

// https://astro.build/config
export default defineConfig({
  site: "https://avaabrazzaq.com", // Used to generate canonical URLs and sitemap entries.
  trailingSlash: "always", // Consistent URL format - all URLs end with /
  markdown: {
    syntaxHighlight: {
      type: "shiki",
      excludeLangs: ["math", "d2"],
    },
    rehypePlugins: [
      [
        rehypeD2,
        {
          theme: 0,
          darkTheme: 200,
          sketch: false,
        },
      ],
      rehypeCopyCodeButton,
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    solid(),
    mdx({
      rehypePlugins: [
        [
          rehypeD2,
          {
            theme: 0,
            darkTheme: 200,
            sketch: false,
          },
        ],
        rehypeCopyCodeButton,
      ],
    }),
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
        let changefreq = "monthly";

        // Homepage gets highest priority
        if (url === "https://avaabrazzaq.com/") {
          priority = 1.0;
          changefreq = "weekly";
        }
        // Blog posts - high priority, updated occasionally
        else if (url.includes("/blog/") && !url.endsWith("/blog/")) {
          priority = 0.8;
          changefreq = "monthly";
        }
        // Blog index
        else if (url.endsWith("/blog/")) {
          priority = 0.9;
          changefreq = "weekly";
        }
        // Service pages - high priority
        else if (url.includes("/services/") && !url.endsWith("/services/")) {
          priority = 0.8;
          changefreq = "monthly";
        }
        // Services index
        else if (url.endsWith("/services/")) {
          priority = 0.9;
          changefreq = "monthly";
        }
        // Portfolio items
        else if (url.includes("/portfolio/") && !url.endsWith("/portfolio/")) {
          priority = 0.7;
          changefreq = "yearly";
        }
        // Portfolio index
        else if (url.endsWith("/portfolio/")) {
          priority = 0.8;
          changefreq = "monthly";
        }
        // About and contact
        else if (url.includes("/about/") || url.includes("/contact/")) {
          priority = 0.7;
          changefreq = "monthly";
        }

        return {
          ...item,
          changefreq: changefreq as typeof item.changefreq,
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
            purpose: "any",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
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
