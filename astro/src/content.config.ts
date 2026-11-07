import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';
import type { Loader } from 'astro/loaders';
import { existsSync, promises as fs } from 'node:fs';
import { fileURLToPath } from 'node:url';

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
  // Top-level keys (gold / silver / media) become entry ids; each value is
  // that tier's list of sponsors. Object-shaped data doesn't need an `id`
  // field, so the built-in file() loader works fine here.
  loader: file('../_data/sponsors.json'),
  schema: sponsorEntry.array(),
});

export const collections = { mrbears, candidates, events, sponsors };
