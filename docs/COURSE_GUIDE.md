# TPW Course Guide

## Overview

The Purple Wings offers **two curricula** hosted in Supabase and synced from `src/data/lessons/`:

| Curriculum | Slug | Courses | Audience |
|------------|------|---------|----------|
| Women's Financial Literacy | `womens-financial-literacy` | 23 | Self-paced learners, all levels |
| 40-Hour FINRA Track | `finra-40-hour` | 8 | Professional / compliance learners |

**Self-study portal:** [/learn](https://www.thepurplewings.org/learn) — public lessons, optional free account for progress.

## Beginner track (fully authored)

These four courses have complete lesson content in the repo:

1. **Financial Literacy Basics** — `financial-literacy-basics`
2. **Budgeting Basics** — `budgeting-basics`
3. **Emergency Planning** — `emergency-planning`
4. **Credit Management** — `credit-management`

Sync to production database:

```bash
npm run sync-lessons
```

## Lesson structure

Each lesson in `src/data/lessons/` includes:

- `introduction`, `sections[]`, `keyTakeaways`, `actionItems`, `resources`
- Learning `objectives` and `durationMinutes`
- Optional lesson quiz in Supabase (`lesson_quizzes` / `quiz_questions`)

## URLs

- Curriculum: `/learn/{curriculum-slug}`
- Course: `/learn/{curriculum}/{course}`
- Lesson: `/learn/{curriculum}/{course}/{lesson}` (public, no login required)

## Topic guides (SEO)

Eight guides at `/guides/{slug}` complement courses — see `src/data/guides/content.ts`.

## Certificates

Requires signed-in user and all lessons in a course marked complete in `lesson_progress`.

## Related docs

- [SELF_STUDY_PORTAL.md](SELF_STUDY_PORTAL.md)
- [CONTENT_SOURCES.md](CONTENT_SOURCES.md)
