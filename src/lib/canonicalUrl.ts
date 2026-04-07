export function normalizeCanonicalUrl(
  inputUrl: string,
  siteUrl: string,
): string {
  const parsedUrl = new URL(inputUrl, siteUrl);
  parsedUrl.protocol = "https:";
  // Force the correct host in case Astro.site is misconfigured
  const configuredHost = new URL(siteUrl).host;
  parsedUrl.host = configuredHost;
  parsedUrl.search = "";
  parsedUrl.hash = "";
  if (!parsedUrl.pathname.endsWith("/") && !parsedUrl.pathname.includes(".")) {
    parsedUrl.pathname = `${parsedUrl.pathname}/`;
  }
  return parsedUrl.toString();
}

export function buildSiteUrl(astroSite: URL | undefined): string {
  const url = new URL(astroSite?.toString() ?? "https://avaabrazzaq.com");
  url.protocol = "https:";
  return url.origin;
}
