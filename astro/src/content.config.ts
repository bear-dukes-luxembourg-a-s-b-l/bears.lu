import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';
import type { Loader } from 'astro/loaders';
import { existsSync, promises as fs } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { parse as parseYaml } from 'yaml';
import matter from 'gray-matter';

// These collections read straight from the Jekyll site's _data/*.json files
// (one directory up), so content stays single-sourced while both sites are
// live during the migration. Once the Jekyll site is retired, these files
// move into src/content/ and the loaders become glob()/local JSON imports.

/**
 * Astro's built-in `file()` loader requires each array item to carry its own
 * `id`/`slug` field, which none of the Jekyll data files have. This loader
 * is the same thing but keys entries by their array index instead.
 */
function jsonArrayLoader(fileName: string): Loader {
  return {
    name: 'json-array-loader',
    load: async ({ config, store, parseData, logger, watcher }) => {
      const url = new URL(fileName, config.root);
      const filePath = fileURLToPath(url);

      async function sync() {
        if (!existsSync(filePath)) {
          logger.error(`File not found: ${fileName}`);
          return;
        }
        const raw = await fs.readFile(filePath, 'utf-8');
        const items = JSON.parse(raw) as unknown[];
        store.clear();
        for (const [index, item] of items.entries()) {
          const id = String(index);
          const data = await parseData({ id, data: item as Record<string, unknown> });
          store.set({ id, data });
        }
      }

      await sync();
      watcher?.add(filePath);
      watcher?.on('change', async (changedPath) => {
        if (changedPath === filePath) {
          logger.info(`Reloading data from ${fileName}`);
          await sync();
        }
      });
    },
  };
}

const mrbears = defineCollection({
  loader: jsonArrayLoader('../_data/mrbears.json'),
  schema: z.object({
    year: z.union([z.number(), z.string()]),
    name: z.string(),
    description: z.string(),
    image: z.string().optional(),
    social: z
      .object({
        facebook: z.string().optional(),
        instagram: z.string().optional(),
        twitter: z.string().optional(),
      })
      .optional(),
  }),
});

const candidates = defineCollection({
  loader: jsonArrayLoader('../_data/candidates.json'),
  schema: z.object({
    photos: z.array(z.string()),
    name: z.string(),
    age: z.string(),
    about: z.string(),
    motivation: z.string(),
    links: z
      .object({
        instagram: z.string().optional(),
        facebook: z.string().optional(),
        tiktok: z.string().optional(),
      })
      .optional(),
  }),
});

const events = defineCollection({
  loader: jsonArrayLoader('../_data/events.json'),
  schema: z.object({
    date: z.string(),
    events: z.array(
      z.object({
        title: z.string(),
        time: z.string(),
        place: z.string(),
        place_url: z.string().optional(),
        price: z.union([z.string(), z.number()]).optional(),
        description: z.string().optional(),
        facebook: z.string().optional(),
        ticket_url: z.string().optional(),
        rsvp_url: z.string().optional(),
      })
    ),
  }),
});

const sponsorEntry = z.object({
  name: z.string(),
  title: z.string().optional(),
  url: z.string(),
  image: z.string(),
});

const sponsors = defineCollection({
  // Bear Pride-specific sponsors for the current edition. Top-level keys
  // (gold / silver / media) become entry ids; each value is that tier's
  // list of sponsors. Object-shaped data doesn't need an `id` field, so the
  // built-in file() loader works fine here.
  loader: file('../_data/sponsors.json'),
  schema: sponsorEntry.array(),
});

// The asbl's own year-round partners, shown on the home page — separate
// from `sponsors` (above), which is specific to the current Bear Pride
// edition and shown on /bear-pride. Starts empty: fill in
// _data/general-sponsors.json with the real list when ready.
const generalSponsors = defineCollection({
  loader: jsonArrayLoader('../_data/general-sponsors.json'),
  schema: sponsorEntry,
});

// General community events shown on the home page — separate from
// `events` (below), which is the Bear Pride week's own programme and
// shown on /bear-pride. The Jekyll site used an Airtable embed for this;
// this is the "manage it ourselves" replacement.
//
// One markdown file per event in src/content/general-events/ (the
// frontmatter has the list-view fields below; the body, if any, is a
// longer description rendered with `render()` where needed) — this content
// is new, not migrated from Jekyll, so it uses Astro's native file-per-entry
// collection shape instead of a single JSON array: friendlier to edit by
// hand, and the shape Sveltia CMS (planned for a later step) expects.
// Starts empty: add a .md file per event when ready.
const generalEvents = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/general-events' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    time: z.string(),
    place: z.string(),
    place_url: z.string().optional(),
    price: z.union([z.string(), z.number()]).optional(),
    facebook: z.string().optional(),
    ticket_url: z.string().optional(),
    rsvp_url: z.string().optional(),
  }),
});

/**
 * Reads the Bear Pride edition's own settings, as a single entry with id
 * "bearpride". Used to live nested under `bearpride:` in the Jekyll site's
 * _config.yml; split into its own file so it can be a standalone Sveltia
 * CMS file collection without risking a CMS save rewriting the rest of
 * _config.yml (title, social links, pagination…).
 */
function bearPrideConfigLoader(fileName: string): Loader {
  return {
    name: 'bearpride-config-loader',
    load: async ({ config, store, parseData, logger, watcher }) => {
      const url = new URL(fileName, config.root);
      const filePath = fileURLToPath(url);

      async function sync() {
        if (!existsSync(filePath)) {
          logger.error(`File not found: ${fileName}`);
          return;
        }
        const raw = await fs.readFile(filePath, 'utf-8');
        const parsed = parseYaml(raw) as Record<string, unknown>;
        store.clear();
        const id = 'bearpride';
        const data = await parseData({ id, data: parsed });
        store.set({ id, data });
      }

      await sync();
      watcher?.add(filePath);
      watcher?.on('change', async (changedPath) => {
        if (changedPath === filePath) {
          logger.info(`Reloading data from ${fileName}`);
          await sync();
        }
      });
    },
  };
}

const bearPrideConfig = defineCollection({
  loader: bearPrideConfigLoader('../_data/bearpride.yml'),
  schema: z.object({
    enabled: z.boolean(),
    homepage_panel: z.object({
      title: z.string(),
      description: z.string(),
    }),
    facebook_main_event: z.string().optional(),
    combo_ticket_url: z.string().nullable().optional(),
    application_open: z.boolean(),
    candidate_list: z.boolean(),
    hotel_cta: z.object({
      display: z.boolean(),
      content: z.string(),
      url: z.string(),
    }),
  }),
});

/**
 * Astro's built-in glob() loader has two problems with this directory:
 * - it only recognizes .md/.mdx by extension, so the ~25 posts still using
 *   Jekyll's old .markdown extension get skipped ("No entry type found");
 * - when a post's front matter has its own `slug:` field, glob() uses that
 *   as the entry id instead of the filename, which breaks the
 *   YYYY-MM-DD-slug filename pattern every post's URL is derived from.
 *
 * This loader reads both extensions, keys every entry by filename (never
 * by a `slug` field), and keeps the raw markdown body as a string to be
 * rendered with `marked` at display time instead of Astro's content
 * render pipeline.
 */
function postsLoader(dir: string): Loader {
  return {
    name: 'posts-loader',
    load: async ({ config, store, parseData, logger, watcher }) => {
      const dirUrl = new URL(dir, config.root);
      const dirPath = fileURLToPath(dirUrl);

      async function sync() {
        if (!existsSync(dirPath)) {
          logger.error(`Directory not found: ${dir}`);
          return;
        }
        const filenames = (await fs.readdir(dirPath)).filter((f) => /\.(md|markdown)$/.test(f));
        store.clear();
        for (const filename of filenames) {
          const filePath = `${dirPath}/${filename}`;
          const raw = await fs.readFile(filePath, 'utf-8');
          const { data: frontmatter, content } = matter(raw);
          const id = filename.replace(/\.(md|markdown)$/, '');
          // Jekyll builds a post's URL from the literal YYYY-MM-DD written in
          // its `date:` front matter (falling back to the filename's date
          // only when there's no front matter date). Extracted from the raw
          // text, not the gray-matter-parsed value, so YAML's own date
          // parsing and timezone handling never shift it by a day.
          const dateMatch = /^date:\s*['"]?(\d{4}-\d{2}-\d{2})/m.exec(raw);
          const filenameDateMatch = /^(\d{4}-\d{2}-\d{2})-/.exec(filename);
          const urlDate = dateMatch?.[1] ?? filenameDateMatch?.[1];
          const data = await parseData({ id, data: { ...frontmatter, body: content, urlDate } });
          store.set({ id, data });
        }
      }

      await sync();
      watcher?.add(dirPath);
      watcher?.on('all', async (_event, changedPath) => {
        if (changedPath.startsWith(dirPath)) {
          logger.info(`Reloading posts from ${dir}`);
          await sync();
        }
      });
    },
  };
}

// Blog posts. Jekyll front matter is inconsistent across 10 years of posts
// (categories as a comma-string, an array, or a single string; dates in a
// few different formats), so the schema stays permissive and normalizes
// `categories` into an array.
const posts = defineCollection({
  loader: postsLoader('../_posts'),
  schema: z.object({
    body: z.string(),
    title: z.string(),
    date: z.coerce.date(),
    urlDate: z.string(),
    image: z.string().optional(),
    author: z.string().optional(),
    categories: z
      .union([z.string(), z.array(z.string())])
      .optional()
      .transform((value) => {
        if (!value) return [];
        return Array.isArray(value) ? value : value.split(',').map((c) => c.trim());
      }),
  }),
});

export const collections = {
  mrbears,
  candidates,
  events,
  sponsors,
  generalSponsors,
  generalEvents,
  bearPrideConfig,
  posts,
};
