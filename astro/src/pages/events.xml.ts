import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export const prerender = true;

// Atom, not RSS — same reason as feed.xml.ts: the automation that consumes
// these feeds only works with Atom entries (see that file's comment for the
// full story).
const escapeXml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export async function GET(context: APIContext) {
  const site = context.site!.toString().replace(/\/$/, '');
  const events = (await getCollection('generalEvents')).sort((a, b) => b.data.date.localeCompare(a.data.date));

  const now = new Date().toISOString();

  const entries = events.map((event) => {
    const link = event.data.facebook ?? event.data.ticket_url ?? event.data.place_url ?? `${site}/calendar`;
    // Several events can share the same external link (a recurring venue's
    // page, the /calendar fallback), so the id needs its own per-event key
    // rather than reusing the link.
    const id = `${site}/events/${event.data.date}-${event.id}`;
    const published = new Date(`${event.data.date}T00:00:00Z`).toISOString();
    const summaryParts = [
      event.data.community ? 'Community event — relayed, not organized by Bear Dukes Luxembourg.' : null,
      event.data.price ? `Price: ${event.data.price}` : null,
      `Where: ${event.data.place}`,
    ].filter((part): part is string => Boolean(part));
    const category = event.data.community ? '<category term="Community" />' : '';

    const summary = summaryParts.join(' — ');
    return `<entry><title type="html">${escapeXml(event.data.title)}</title><link href="${escapeXml(link)}" rel="alternate" type="text/html" title="${escapeXml(event.data.title)}" /><published>${published}</published><updated>${published}</updated><id>${escapeXml(id)}</id><content type="html"><![CDATA[${summary}]]></content>${category}<summary type="html"><![CDATA[${summary}]]></summary></entry>`;
  });

  const body = `<?xml version="1.0" encoding="utf-8"?><feed xmlns="http://www.w3.org/2005/Atom" xml:lang="en_US"><link href="${escapeXml(`${site}/events.xml`)}" rel="self" type="application/atom+xml" /><link href="${escapeXml(`${site}/calendar`)}" rel="alternate" type="text/html" hreflang="en_US" /><updated>${now}</updated><id>${escapeXml(`${site}/events.xml`)}</id><title type="html">Bear Dukes Luxembourg — Events</title><subtitle>Upcoming and past bear events in and around Luxembourg.</subtitle><author><name>Bear Dukes Luxembourg a.s.b.l.</name></author>${entries.join('')}</feed>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' },
  });
}
