import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const prerender = true;

const pad = (n: number) => String(n).padStart(2, '0');

const icsEscape = (s: string) =>
  s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');

const slugify = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

// A single-day event with a fixed start time (our own, "7:00 PM" style)
// becomes a timed VEVENT; a multi-day one (most community events, which
// set end_date instead of time) becomes an all-day entry spanning its
// real date range.
const TIME_RE = /^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i;

export const GET: APIRoute = async () => {
  const events = (await getCollection('generalEvents')).sort((a, b) =>
    a.data.date.localeCompare(b.data.date)
  );

  const now = new Date();
  const dtstamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}Z`;

  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Bear Dukes Luxembourg//Events//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Bear Dukes Luxembourg \u2014 Events',
  ];

  for (const { data: event } of events) {
    const [year, month, day] = event.date.split('-').map(Number);
    const timeMatch = event.time ? TIME_RE.exec(event.time.trim()) : null;

    lines.push('BEGIN:VEVENT');
    lines.push(`UID:${event.date}-${slugify(event.title)}@bears.lu`);
    lines.push(`DTSTAMP:${dtstamp}`);

    if (timeMatch) {
      let hour = parseInt(timeMatch[1], 10);
      const minute = parseInt(timeMatch[2], 10);
      const ampm = timeMatch[3]?.toUpperCase();
      if (ampm === 'PM' && hour < 12) hour += 12;
      if (ampm === 'AM' && hour === 12) hour = 0;

      const start = new Date(Date.UTC(year, month - 1, day, hour, minute));
      const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // 2h default duration

      const fmt = (d: Date) =>
        `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00`;
      // No VTIMEZONE block — relies on the calendar app recognizing the
      // IANA tz id, which every major one (Google/Apple/Outlook) does.
      lines.push(`DTSTART;TZID=Europe/Luxembourg:${fmt(start)}`);
      lines.push(`DTEND;TZID=Europe/Luxembourg:${fmt(end)}`);
    } else {
      const fmtDate = (d: Date) => `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}`;
      // DTEND is exclusive in iCalendar, so an end_date of the 22nd needs
      // the 23rd here; a single-day event (no end_date) just spans one day.
      let endDate: Date;
      if (event.end_date) {
        const [endYear, endMonth, endDay] = event.end_date.split('-').map(Number);
        endDate = new Date(Date.UTC(endYear, endMonth - 1, endDay + 1));
      } else {
        endDate = new Date(Date.UTC(year, month - 1, day + 1));
      }
      lines.push(`DTSTART;VALUE=DATE:${fmtDate(new Date(Date.UTC(year, month - 1, day)))}`);
      lines.push(`DTEND;VALUE=DATE:${fmtDate(endDate)}`);
    }

    lines.push(`SUMMARY:${icsEscape(event.title)}`);
    lines.push(`LOCATION:${icsEscape(event.place)}`);

    const descriptionParts = [
      event.community ? 'Community event \u2014 relayed, not organized by Bear Dukes Luxembourg.' : null,
      event.price ? `Price: ${event.price}` : null,
    ].filter((part): part is string => Boolean(part));
    if (descriptionParts.length > 0) {
      lines.push(`DESCRIPTION:${icsEscape(descriptionParts.join('\\n'))}`);
    }

    const url = event.facebook ?? event.ticket_url ?? event.place_url;
    if (url) lines.push(`URL:${url}`);

    lines.push('END:VEVENT');
  }

  lines.push('END:VCALENDAR');

  return new Response(lines.join('\r\n') + '\r\n', {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'inline; filename="bear-dukes-events.ics"',
    },
  });
};
