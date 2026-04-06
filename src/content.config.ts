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
    githubUrl: z.url(),
    responseTime: z.string(),
    timezone: z.string(),
    location: z.string(),
    availability: z.string(),
    contactEmail: z.email(),
    bookingUrl: z.url(),
  }),
});

const servicesCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/services" }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    metaTitle: z.string(),
    metaDescription: z.string(),
    heroTitle: z.string(),
    heroSubtitle: z.string(),
    introduction: z.string(),
    benefits: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
      }),
    ),
    services: z.array(
      z.object({
        name: z.string(),
        description: z.string(),
        icon: z.string(),
      }),
    ),
    technologies: z.array(z.string()),
    cta: z.object({
      title: z.string(),
      description: z.string(),
      buttonText: z.string(),
      buttonLink: z.string(),
    }),
    faqs: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        }),
      )
      .optional(),
    parentService: z.string().optional(),
    relatedServices: z.array(z.string()).optional(),
    relatedBlogPosts: z.array(z.string()).optional(),
  }),
});

const portfolioCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/portfolio" }),
  schema: z.object({
    order: z.number().int().nonnegative(),
    title: z.string(),
    category: z.string(),
    summary: z.string(),
    description: z.string(),
    challenge: z.string(),
    solution: z.string(),
    impact: z.string(),
    timeframe: z.string(),
    stack: z.array(z.string()),
    proofUrl: z.url(),
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
    image: z
      .object({
        src: z.string(),
        alt: z.string(),
      })
      .optional(),
    tags: z.array(z.string()).default([]),
    category: z.enum([
      "AI",
      "Marketing",
      "Development",
      "Growth",
      "Analytics",
      "Tutorial",
    ]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    readingTime: z.number().optional(),
    relatedService: z.string().optional(),
    // HowTo schema support for tutorial posts
    howTo: z
      .object({
        totalTime: z.string().optional(), // e.g., "PT4W" for 4 weeks
        estimatedCost: z.string().optional(),
        steps: z.array(
          z.object({
            name: z.string(),
            text: z.string(),
          }),
        ),
      })
      .optional(),
  }),
});

export const collections = {
  site: siteCollection,
  services: servicesCollection,
  portfolio: portfolioCollection,
  blog: blogCollection,
};
