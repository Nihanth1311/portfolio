# Nihanth Baratam — portfolio

A static site built with [Astro](https://astro.build). No backend.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:4321. `npm run build` writes the finished site to `dist/`.

## Update your content

You never need to touch the design files to change what the site says.

| To change | Edit |
|---|---|
| Name, headline, intro, email, links, availability line | `src/data/site.ts` |
| Skills, education, achievements | `src/data/site.ts` |
| The hero chart (labels and timings) | `trace` in `src/data/site.ts` |
| Résumé | Replace `public/resume.pdf` with the new file, keeping the name |
| A job | One file per role in `src/content/experience/` |
| A project | One file per project in `src/content/projects/` |

### Add a project

Create `src/content/projects/my-project.md`:

```md
---
title: My Project
summary: One sentence on what it is.
order: 2            # lower numbers show first
featured: false     # true puts it in the wide dark panel (use for one project)
stack: [React, Django, PostgreSQL]
highlights:
  - A result, with a number if you have one.
  - Another result.
link: https://example.com      # optional, live URL
linkLabel: Open My Project     # optional
repo: https://github.com/...   # optional
note: Anything a visitor should know before clicking.   # optional
---

An optional paragraph or two about the project.
```

Set `draft: true` to hide a project or job without deleting its file.

### Add a job

Create `src/content/experience/company-role.md`:

```md
---
company: Company
role: Your title
team: Product or team      # optional
location: City, Country
start: "2027-01"           # year-month
end: "2027-12"             # leave out for a current role
---

- What you did, as bullet points.
```

Jobs sort by start date, newest first.

## Design

Colours, type sizes and spacing are tokens at the top of `src/styles/global.css`.
Each section of the page is one file in `src/components/`.
