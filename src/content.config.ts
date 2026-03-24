import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro:schema";

const aboutCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/about" }),
  schema: z.object({
    title: z.string(),
  }),
});

const portfolioCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/portfolio" }),
  schema: z.object({
    order: z.number(),
    category: z.string(),
    title: z.string(),
    summary: z.string(),
    impact: z.string(),
    timeframe: z.string(),
    stack: z.array(z.string()),
    proofLabel: z.string(),
    proofUrl: z.string(),
  }),
});

const testimonialsCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/testimonials" }),
  schema: z.object({
    order: z.number().optional(),
    quote: z.string(),
    author: z.string(),
    company: z.string(),
    year: z.number().optional(),
  }),
});

export const collections = {
  about: aboutCollection,
  portfolio: portfolioCollection,
  testimonials: testimonialsCollection,
};
