import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { marked } from 'marked';
import { postUrl } from '../lib/posts';

export const prerender = true;

// Same path the old Jekyll site served via jekyll-feed (/feed.xml), and
// same format — Atom, not RSS. An external automation (Ruby/Feedjira-based)
// reads this feed, and its link-resolution code only works for Atom entries
// ("link_rels" isn't defined anywhere in Feedjira's own source — it's that
// app's own helper, apparently only wired up for AtomEntry, not RSSEntry).
// Switching to RSS broke it; this restores the original Atom shape.
const escapeXml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const firstParagraphText = (html: string) => {
  const match = /<p>([\s\S]*?)<\/p>/.exec(html);
  return (match ? match[1] : html).replace(/<[^>]+>/g, '').trim();
};

export async function GET(context: APIContext) {
  const site = context.site!.toString().replace(/\/$/, '');
  const posts = (await getCollection('posts')).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const now = new Date().toISOString();

  const entries = await Promise.all(
    posts.map(async (post) => {
      const link = `${site}${postUrl(post)}`;
      const id = link.replace(/\/$/, '');
      const published = post.data.date.toISOString();
      const contentHtml = await marked.parse(post.data.body);
      const summary = firstParagraphText(contentHtml);
      const categories = post.data.categories.map((c) => `<category term="${escapeXml(c)}" />`).join('');
      const media = post.data.image
        ? `<media:thumbnail xmlns:media="http://search.yahoo.com/mrss/" url="${escapeXml(`${site}${post.data.image}`)}" /><media:content medium="image" url="${escapeXml(`${site}${post.data.image}`)}" xmlns:media="http://search.yahoo.com/mrss/" />`
        : '';

      return `<entry><title type="html">${escapeXml(post.data.title)}</title><link href="${escapeXml(link)}" rel="alternate" type="text/html" title="${escapeXml(post.data.title)}" /><published>${published}</published><updated>${published}</updated><id>${escapeXml(id)}</id><content type="html" xml:base="${escapeXml(link)}"><![CDATA[${contentHtml}]]></content>${post.data.author ? `<author><name>${escapeXml(post.data.author)}</name></author>` : ''}${categories}<summary type="html"><![CDATA[${summary}]]></summary>${media}</entry>`;
    })
  );

  const body = `<?xml version="1.0" encoding="utf-8"?><feed xmlns="http://www.w3.org/2005/Atom" xml:lang="en_US"><link href="${escapeXml(`${site}/feed.xml`)}" rel="self" type="application/atom+xml" /><link href="${escapeXml(`${site}/`)}" rel="alternate" type="text/html" hreflang="en_US" /><updated>${now}</updated><id>${escapeXml(`${site}/feed.xml`)}</id><title type="html">Bear Dukes Luxembourg</title><subtitle>We are the Luxembourgish bear community 🇱🇺🐻.</subtitle><author><name>Bear Dukes Luxembourg a.s.b.l.</name></author>${entries.join('')}</feed>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' },
  });
}
