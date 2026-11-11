import type { CollectionEntry } from 'astro:content';

/**
 * An event is still upcoming until its last day is over — end_date for a
 * multi-day event, otherwise just its date. Compared as plain YYYY-MM-DD
 * strings (same format as the front matter) so there's no timezone drift.
 */
export function isUpcoming(event: CollectionEntry<'generalEvents'>['data'], today: string): boolean {
  return (event.end_date ?? event.date) >= today;
}

export function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}
