import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { marked } from 'marked';
import { postUrl } from '../lib/posts';

export const prerender = true;

// Same path as the old Jekyll site's jekyll-feed plugin (/feed.xml) — an
// external automation depends on this exact URL, so the migration to Astro
// must keep serving a feed there even though the format switches from
// jekyll-feed's Atom to RSS 2.0.
export async function GET(context: APIContext) {
  const posts = (await getCollection('posts')).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'Bear Dukes Luxembourg',
    description: 'We are the Luxembourgish bear community 🇱🇺🐻.',
    site: context.site!,
    items: await Promise.all(
      posts.map(async (post) => ({
        title: post.data.title,
        pubDate: post.data.date,
        link: postUrl(post),
        author: post.data.author,
        categories: post.data.categories,
        content: await marked.parse(post.data.body),
      }))
    ),
  });
}
