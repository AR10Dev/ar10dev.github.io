/**
 * URL path → last-modified date map for sitemap generation.
 *
 * Google uses unique lastmod values to determine crawl priority.
 * Having all pages share one timestamp reduces crawl efficiency.
 *
 * Maintenance: update dates here when content is significantly modified.
 */

const lastmodByPath: Record<string, string> = {
  // Static pages
  "/": "2026-04-27T12:00:00Z",
  "/about/": "2026-04-27T12:00:00Z",
  "/contact/": "2026-04-27T12:00:00Z",
  "/services/": "2026-04-27T12:00:00Z",
  "/portfolio/": "2026-04-27T12:00:00Z",
  "/blog/": "2026-04-27T12:00:00Z",

  // Service pages (all share modifiedTime="2026-04-08")
  "/services/ai-agent-development/": "2026-04-27T12:00:00Z",
  "/services/ai-automation/": "2026-04-27T12:00:00Z",
  "/services/ai-chatbot-development/": "2026-04-27T12:00:00Z",
  "/services/ai-workflow-automation/": "2026-04-27T12:00:00Z",
  "/services/conversion-optimization/": "2026-04-27T12:00:00Z",
  "/services/full-stack-web-development/": "2026-04-27T12:00:00Z",
  "/services/llm-integration/": "2026-04-27T12:00:00Z",
  "/services/mcp-integration/": "2026-04-27T12:00:00Z",
  "/services/mobile-app-development/": "2026-04-27T12:00:00Z",
  "/services/programmatic-seo/": "2026-04-27T12:00:00Z",
  "/services/prompt-engineering/": "2026-04-27T12:00:00Z",
  "/services/saas-mvp-development/": "2026-04-27T12:00:00Z",
  "/services/seo-growth/": "2026-04-27T12:00:00Z",
  "/services/social-media-growth/": "2026-04-27T12:00:00Z",
  "/services/technical-seo/": "2026-04-27T12:00:00Z",
  "/services/technical-seo-audit/": "2026-04-27T12:00:00Z",

  // Blog posts (updatedDate ?? publishDate)
  "/blog/ab-testing-best-practices-improve-conversions/":
    "2026-04-27T12:00:00Z",
  "/blog/building-custom-chatgpt-interfaces-for-business/":
    "2026-04-27T12:00:00Z",
  "/blog/building-mvp-4-weeks-technical-guide/": "2026-04-27T12:00:00Z",
  "/blog/complete-technical-seo-audit-checklist/": "2026-04-27T12:00:00Z",
  "/blog/how-programmatic-seo-generates-10x-traffic/": "2026-04-27T12:00:00Z",
  "/blog/how-to-automate-lead-qualification-with-ai/": "2026-04-27T12:00:00Z",
  "/blog/openai-vs-anthropic-which-llm-for-business/": "2026-04-27T12:00:00Z",
  "/blog/why-astro-best-framework-marketing-sites/": "2026-04-27T12:00:00Z",

  // Portfolio items
  "/portfolio/ai-workflow-automation/": "2026-04-27T12:00:00Z",
  "/portfolio/content-marketing-strategy/": "2026-04-27T12:00:00Z",
  "/portfolio/fullstack-analytics-saas/": "2026-04-27T12:00:00Z",
  "/portfolio/marketing-funnel-optimization/": "2026-04-27T12:00:00Z",
  "/portfolio/paid-social-campaigns/": "2026-04-27T12:00:00Z",
  "/portfolio/social-media-management/": "2026-04-27T12:00:00Z",
};

/**
 * Returns the lastmod ISO string for a given sitemap URL.
 * Falls back to undefined if the URL is not in the map.
 */
export function getLastmodForUrl(url: string): string | undefined {
  let pathname: string;
  try {
    pathname = new URL(url).pathname;
  } catch {
    pathname = url;
  }
  return lastmodByPath[pathname];
}
