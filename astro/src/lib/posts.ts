import type { CollectionEntry } from 'astro:content';

const FILENAME_RE = /^(\d{4})-(\d{2})-(\d{2})-(.+)$/;

/**
 * Jekyll builds a post's :year/:month/:day/:title permalink from the
 * literal date in its front matter (falling back to the filename's date
 * only when there's none) and the slug from its filename — see
 * content.config.ts's posts loader, which computes `data.urlDate` from the
 * raw front matter text for exactly this reason.
 */
export function postUrlParts(entry: CollectionEntry<'posts'>) {
  const filenameMatch = FILENAME_RE.exec(entry.id);
  if (!filenameMatch) {
    throw new Error(`Post id "${entry.id}" doesn't match the YYYY-MM-DD-slug filename pattern`);
  }
  const [, , , , rawSlug] = filenameMatch;

  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(entry.data.urlDate);
  if (!dateMatch) {
    throw new Error(`Post "${entry.id}" has an invalid urlDate "${entry.data.urlDate}"`);
  }
  const [, year, month, day] = dateMatch;

  return { year, month, day, slug: rawSlug.toLowerCase() };
}

export function postUrl(entry: CollectionEntry<'posts'>) {
  const { year, month, day, slug } = postUrlParts(entry);
  return `/news/${year}/${month}/${day}/${slug}/`;
}
