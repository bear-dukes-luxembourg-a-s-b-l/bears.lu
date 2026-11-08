import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export const prerender = true;

const slugify = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

// Separate from /feed.xml (blog posts) — a feed of upcoming/past community
// events, for consumers that only care about the calendar, not the news.
// Same guid scheme as calendar.ics.ts's UID so the two stay in sync.
export async function GET(context: APIContext) {
  const events = (await getCollection('generalEvents')).sort(
    (a, b) => b.data.date.localeCompare(a.data.date) // newest first, like feed.xml
  );

  return rss({
    title: 'Bear Dukes Luxembourg — Events',
    description: 'Upcoming and past bear events in and around Luxembourg.',
    site: context.site!,
    items: events.map((event) => {
      const link = event.data.facebook ?? event.data.ticket_url ?? event.data.place_url ?? `${context.site}calendar`;
      const descriptionParts = [
        event.data.community ? 'Community event — relayed, not organized by Bear Dukes Luxembourg.' : null,
        event.data.price ? `Price: ${event.data.price}` : null,
        `Where: ${event.data.place}`,
      ].filter((part): part is string => Boolean(part));

      // Several events can share the same external link (a recurring venue's
      // Facebook page, the /calendar fallback), so the default link-based
      // guid isn't unique — override it via customData instead.
      const guid = `${event.data.date}-${slugify(event.data.title)}@bears.lu`;

      return {
        title: event.data.title,
        pubDate: new Date(`${event.data.date}T00:00:00Z`),
        link,
        customData: `<guid isPermaLink="false">${guid}</guid>`,
        description: descriptionParts.join(' — '),
      };
    }),
  });
}
