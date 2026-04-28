import type { BreadcrumbItem } from "../components/Breadcrumb.astro";
import { PERSON_NAME, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./siteMeta";

/**
 * Generates a valid schema.org BreadcrumbList object from a list of breadcrumb items.
 * This ensures the visual Breadcrumb component and the JSON-LD schema are always in sync.
 *
 * @param items The same array of items passed to the <Breadcrumb> component
 * @param canonicalUrl The full URL of the current page, used as the ID for the schema
 * @returns A JSON-LD compatible BreadcrumbList object
 */
export function generateBreadcrumbSchema(
  items: BreadcrumbItem[],
  canonicalUrl: string,
) {
  const siteUrl = SITE_URL;

  return {
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href && {
        item: new URL(item.href, siteUrl).toString(),
      }),
    })),
  };
}

/**
 * Returns the base WebSite and Person JSON-LD schema objects used across all pages.
 *
 * @param siteUrl The base URL of the website
 * @returns An array containing the base WebSite and Person schema objects
 */
export function getBaseSchemaGraph(
  siteUrl: string = SITE_URL,
  includePerson: boolean = true,
) {
  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${siteUrl}/#person` },
    },
  ];

  if (includePerson) {
    graph.push({
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: PERSON_NAME,
      url: siteUrl,
      jobTitle: "AI Growth Engineer",
      sameAs: [
        "https://github.com/AR10Dev",
        "https://linkedin.com/in/avaab-razzaq",
        "https://twitter.com/itsmeAvaab",
      ],
    });
  }

  return graph;
}
