import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { PERSON_NAME, SITE_NAME, SITE_URL } from "@lib/siteMeta";

export async function GET(context: APIContext) {
  const siteUrl = SITE_URL;

  const blogPosts = await getCollection("blog", ({ data }) => {
    return data.draft !== true;
  });

  const sortedPosts = blogPosts.sort(
    (a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime(),
  );

  return rss({
    title: `${SITE_NAME} Blog`,
    description:
      "Insights on AI automation, growth engineering, full-stack development, and marketing optimization strategies. Expert articles from a Miami-based consultant.",
    site: context.site ?? siteUrl,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.description,
      link: `/blog/${post.id}/`,
      categories: [post.data.category, ...post.data.tags],
      author: post.data.author,
    })),
    customData: `<language>en-us</language>
<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
<managingEditor>itsavaab@gmail.com (${PERSON_NAME})</managingEditor>
<webMaster>itsavaab@gmail.com (${PERSON_NAME})</webMaster>`,
  });
}
