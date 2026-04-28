export const SITE_URL = "https://avaabrazzaq.com";
export const SITE_NAME = "Avaab Razzaq - AI Growth Engineer";
export const PERSON_NAME = "Avaab Razzaq";
export const SITE_DESCRIPTION =
  "AI Growth Engineer specializing in web apps, AI automation, and technical SEO";
export const TWITTER_HANDLE = "@itsmeAvaab";
export const DEFAULT_META_KEYWORDS =
  "AI Growth Engineer, AI Automation, Full-Stack Developer, SEO Expert, Miami Florida, Web Development, LLM Integration, Workflow Automation";
export const DEFAULT_ROBOTS =
  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
export const DEFAULT_OG_IMAGE = "/og-ai-growth-engineer.png";

export function resolveAbsoluteUrl(value: string, siteUrl: string): string {
  return value.startsWith("http") ? value : new URL(value, siteUrl).toString();
}
