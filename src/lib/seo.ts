import type { BreadcrumbItem } from "../components/Breadcrumb.astro";
import { buildSiteUrl, normalizeCanonicalUrl } from "./canonicalUrl";
import { generateBreadcrumbSchema, getBaseSchemaGraph } from "./schema";
import { DEFAULT_OG_IMAGE, resolveAbsoluteUrl } from "./siteMeta";

export interface SeoContext {
  siteUrl: string;
  canonicalUrl: string;
  ogImage: string;
}

export interface SeoContextOptions {
  astroSite?: URL;
  pathname: string;
  ogImage?: string;
}

export interface StructuredDataOptions {
  siteUrl: string;
  canonicalUrl: string;
  graph?: Record<string, unknown>[];
  breadcrumbs?: BreadcrumbItem[];
  includePerson?: boolean;
}

export function createSeoContext({
  astroSite,
  pathname,
  ogImage = DEFAULT_OG_IMAGE,
}: SeoContextOptions): SeoContext {
  const siteUrl = buildSiteUrl(astroSite);

  return {
    siteUrl,
    canonicalUrl: normalizeCanonicalUrl(pathname, siteUrl),
    ogImage: resolveAbsoluteUrl(ogImage, siteUrl),
  };
}

export function createStructuredData({
  siteUrl,
  canonicalUrl,
  graph = [],
  breadcrumbs = [],
  includePerson = true,
}: StructuredDataOptions): Record<string, unknown> {
  const structuredGraph: Record<string, unknown>[] = [
    ...getBaseSchemaGraph(siteUrl, includePerson),
    ...graph,
  ];

  if (breadcrumbs.length > 0) {
    structuredGraph.push(generateBreadcrumbSchema(breadcrumbs, canonicalUrl));
  }

  return {
    "@context": "https://schema.org",
    "@graph": structuredGraph,
  };
}
