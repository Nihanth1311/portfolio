---
title: Job Hunt
summary: A job-search app that finds fresh roles, scores them against your skills and tracks every application.
intro: Job hunting is mostly reading listings that were never a fit. Job Hunt does that reading for you. It gathers roles straight from company careers pages, keeps the ones that match your background, and prepares a résumé for each, so the time goes into applying.
order: 1
featured: true
caseStudy: true
stack: [Next.js, React, TypeScript, PostgreSQL, Drizzle ORM, Tailwind CSS, Docker, Render]
highlights:
  - Pulls new roles from 94 company careers sites, filters them by salary floor and experience, and scores each one against your skills.
  - Picks the right base résumé for the role and prepares a tailoring prompt, so a DevOps job starts from the DevOps résumé.
  - Tracks applications on a drag-and-drop board with notes, a timeline and automatic follow-up dates.
  - Sends a morning Telegram digest and instant alerts for strong matches.
  - Keeps each person’s data private, with invite-only Google sign-in and one-click export.
flowLabel: Every application moves across the tracker board
flow: [Saved, Applied, Assessment, Interview, Offer]
parts:
  - name: Next.js server on Render
    does: Renders the pages, fetches and scores jobs, sends notifications.
  - name: PostgreSQL on Neon
    does: Holds every job, profile, résumé and application.
  - name: 94 company careers sites
    does: The source of jobs, read through the same public feeds a careers page uses.
  - name: Three schedulers
    does: A cron service, GitHub Actions and the server’s own timer wake the app to fetch.
  - name: Web Push
    does: Delivers alerts to a phone with no third-party account.
link: https://job-hunt-xwy9.onrender.com
linkLabel: Open Job Hunt
note: Invite-only. Sign-in needs a Google account that has been invited.
---

## The problem

Job boards told me a role was posted yesterday when it had been open for a month. I was spending evenings reading listings that were stale, too senior, or below my salary floor, and then losing track of the ones I had applied to.

I wanted one place that finds roles with honest dates, tells me which are worth my time, and remembers every application. Then friends wanted to use it too, which turned a personal script into a small multi-user product.

## How it works

A Next.js app on Render stores everything in PostgreSQL on Neon. On a schedule it collects jobs from company careers sites, scores them for each person, and notifies their phone. The whole thing runs on free plans, which shaped most of the decisions below.

## Honest dates meant changing the source

The first version used a jobs API. Its "posted" date was really a re-listing date, so a job open for more than 30 days showed as one day old. No amount of filtering on my side could fix data that was wrong at the source.

I replaced it with readers for the careers sites themselves: Workday, Greenhouse, Lever, Ashby and a few company-specific formats. These give the real posting date, and anything older than 30 days is skipped.

> Know where your data comes from, and check the dates before you trust them.

## Fifteen users should not mean fifteen times the traffic

Careers sites are read once, into a shared pool. Each person’s feed is then filled from that pool for the companies they follow, and scored against their own profile. The same job gets a different score for each person, but the company’s site is only asked once.

The same job can arrive from two sources, so every job gets a key built from company, title and city. A unique index on that key means the database refuses the second copy, instead of relying on application code to remember to check.

## The free database that nearly ran out

Nine days into a month, the database had used 95% of its 5 GB network allowance. Running out would have stopped the app until the next billing period.

The cause was a query that worked fine and cost too much. Every person’s fetch read the entire shared pool, more than 3,300 jobs with full descriptions, to find the handful that were new. With four people fetching eight times a day, that came to about 575 MB daily. The jobs page was also sending all 150 descriptions on every visit.

The fix was to let the database do the filtering. Each person now remembers when they last took from the pool and asks only for jobs added since then, from companies they follow. The jobs list no longer carries descriptions; a card loads its own when opened.

> "It works" is not the same as "it is cheap". Filter in the database, not in JavaScript after loading everything.

## The alarm clock that did not ring

Render’s free server sleeps after 15 minutes, so it cannot run its own timer. I used a scheduled GitHub Actions workflow to wake it every hour. One morning a fetch that was due at about 2:40 ran at 6:23.

The app’s own records showed it fetched correctly every time it was woken. The alarm simply had not arrived: GitHub’s scheduled runs are best effort and can be hours late.

So now there are three alarms: a cron service, GitHub Actions, and the server’s own timer while it is awake. Extra wake-ups are harmless because the scheduler is idempotent, and only fetches for a person when their slot is due. The endpoint answers straight away and does the work in the background, and a settings page shows when each alarm last arrived.

A second free-plan limit shaped the schedule itself. The database is billed by the hours it is awake, and a check every ten minutes would never let it sleep. Fetches now happen at fixed clock times, and checks in between skip the database entirely.

> Do not depend on one unreliable trigger. Record what happened, so that "it seems broken" becomes a five-second diagnosis.

## A score you can trust

A job’s score is a weighted mix: skills matched, experience fit, salary, and whether it is a tech role at all. A skills dictionary maps the spellings job descriptions use, so "k8s" counts as Kubernetes.

The rules matter more than the number. A job is marked **no** if it is too senior or pays below your floor, **check** if something is unknown, and **fit** only when everything was verified. A new user with no skills entered scores zero, because an early version showed a friend 69% built from nothing but experience and salary points.

When the scoring rules change, a version number is bumped and each person’s feed is re-scored once, the next time they open the app.

## Security

- Sign-in is Google OAuth with PKCE, and invite-only.
- Session tokens live in an httpOnly cookie. The database stores only their SHA-256 hash, so a leaked database cannot be used to sign in.
- Each person’s API keys are encrypted with AES-256-GCM before they are stored.

## What is still open

Push notifications sent with high urgency from the hosted server never arrive, while the same notification sent from a laptop does. I tested one variable at a time, could not find the cause, and made urgency a setting so it can be flipped back without a deploy. I would still like to know why.

Adding multiple users late also cost more than it should have. Every query needed a user id, and the migration had to be edited by hand so existing data was kept. Next time I would put the user on every table from the first day.
