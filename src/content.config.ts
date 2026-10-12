import dotenv from 'dotenv';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { Entry } from 'contentful';
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

import { createContentfulClient } from './lib/contentful/client';
import { toPlain } from './lib/contentful/plain';
import {
  IMAGE_VERTICAL_ALIGNS,
  THEMES,
  type ContentfulAsset,
  type DesignMethod,
  type Organization,
  type RelatedCaseStudy,
  type SectionEntry,
} from './lib/contentful/types';

/** Content runs outside Vite; load the same env files as Astro (root + local overrides). */
const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
for (const file of ['.env', '.env.local'] as const) {
  const envPath = resolve(projectRoot, file);
  if (existsSync(envPath)) {
    dotenv.config({ path: envPath, override: file === '.env.local' });
  }
}

function linked<T>(name: string) {
  return z.custom<T>((value) => typeof value === 'object' && value !== null && 'fields' in value, {
    message: `${name} must be a resolved Contentful link`,
  });
}

const caseStudyDataSchema = z.object({
  slug: z.string(),
  title: z.string(),
  theme: z.enum(THEMES),
  imageVerticalAlign: z.enum(IMAGE_VERTICAL_ALIGNS).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  isCaseStudy: z.boolean().optional(),
  partners: z.string().optional(),
  date: z.date(),
  featuredImage: linked<ContentfulAsset>('featuredImage'),
  organizations: z.array(linked<Organization>('organizations')).optional(),
  methods: z.array(linked<DesignMethod>('methods')).optional(),
  sections: z.array(linked<SectionEntry>('sections')).optional(),
  relatedCaseStudy: linked<RelatedCaseStudy>('relatedCaseStudy').optional(),
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
        const fields = toPlain(item.fields, new Set([item])) as Record<string, unknown>;
        const slug = typeof fields.slug === 'string' ? fields.slug : undefined;
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
