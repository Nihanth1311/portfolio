import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One markdown file per project in src/content/projects/.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    // A short paragraph shown on the home page.
    intro: z.string().optional(),
    // true gives the project its own page at /projects/<file-name>/, built from the text below the frontmatter.
    caseStudy: z.boolean().default(false),
    // Optional: the main pieces of the system, listed on the project page.
    parts: z.array(z.object({ name: z.string(), does: z.string() })).default([]),
    // Lower numbers show first.
    order: z.number().default(100),
    // The featured project gets the wide panel at the top. Use it for one project.
    featured: z.boolean().default(false),
    stack: z.array(z.string()).default([]),
    highlights: z.array(z.string()).default([]),
    link: z.url().optional(),
    linkLabel: z.string().optional(),
    repo: z.url().optional(),
    note: z.string().optional(),
    // Optional: an ordered set of steps, drawn as a row. Use only for a real sequence.
    flow: z.array(z.string()).default([]),
    flowLabel: z.string().optional(),
    // Set to true to keep a file in the folder without showing it.
    draft: z.boolean().default(false),
  }),
});

// One markdown file per role in src/content/experience/.
const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: z.object({
    company: z.string(),
    role: z.string(),
    team: z.string().optional(),
    location: z.string(),
    // Year and month, for example "2026-08". Leave `end` out for a current role.
    start: z.string().regex(/^\d{4}-\d{2}$/),
    end: z.string().regex(/^\d{4}-\d{2}$/).optional(),
    stack: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, experience };
