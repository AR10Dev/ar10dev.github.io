import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const siteCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/site" }),
  schema: z.object({
    brandTitle: z.string(),
    metaDescription: z.string(),
    kicker: z.string(),
    heroLead: z.string(),
    githubUrl: z.string().url(),
    responseTime: z.string(),
    timezone: z.string(),
    location: z.string(),
    availability: z.string(),
    contactEmail: z.string().email(),
    bookingUrl: z.string().url(),
  }),
});

const portfolioCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/portfolio" }),
  schema: z.object({
    order: z.number().int().nonnegative(),
    title: z.string(),
    category: z.string(),
    summary: z.string(),
    impact: z.string(),
    timeframe: z.string(),
    stack: z.array(z.string()),
    proofUrl: z.string().url(),
    proofLabel: z.string(),
  }),
});

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default("Avaab Razzaq"),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }).optional(),
    tags: z.array(z.string()).default([]),
    category: z.enum(["AI", "Marketing", "Development", "Growth", "Analytics", "Tutorial"]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    readingTime: z.number().optional(),
  }),
});

export const collections = {
  site: siteCollection,
  portfolio: portfolioCollection,
  blog: blogCollection,
};
