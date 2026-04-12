import dotenv from 'dotenv';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { Entry } from 'contentful';
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

import { createContentfulClient } from './lib/contentful/client';

/** Content runs outside Vite; load the same env files as Astro (root + local overrides). */
const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
for (const file of ['.env', '.env.local'] as const) {
  const envPath = resolve(projectRoot, file);
  if (existsSync(envPath)) {
    dotenv.config({ path: envPath, override: file === '.env.local' });
  }
}

const caseStudyDataSchema = z.looseObject({
  slug: z.string(),
});

export const collections = {
  caseStudies: defineCollection({
    loader: async () => {
      let response;
      try {
        const client = createContentfulClient();
        response = await client.getEntries({
          content_type: 'caseStudy',
          order: ['fields.startDate'],
          include: 10,
        });
      } catch (e) {
        const msg = e instanceof Error ? e.message : JSON.stringify(e);
        throw new Error(`Contentful caseStudies loader failed: ${msg}`, { cause: e });
      }

      return response.items.map((item: Entry) => {
        const fields = item.fields as Record<string, unknown>;
        const slug = fields.slug as string | undefined;
        if (!slug) {
          throw new Error(`caseStudy ${item.sys.id} is missing a slug`);
        }
        const data = {
          ...fields,
          slug,
          date: new Date(item.sys.updatedAt),
        };
        // Astro passes the whole object to the collection schema (not `data` only).
        return { id: slug, ...data };
      });
    },
    schema: caseStudyDataSchema,
  }),
};
