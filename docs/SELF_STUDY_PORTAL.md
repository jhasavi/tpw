# Self-Study Portal

**The Purple Wings** is a free self-study portal for women learning personal finance.

## Learner journey

1. **Discover** — Homepage, `/learn`, topic `/guides`, or SEO landing pages
2. **Study** — Read public lessons at `/learn/{curriculum}/{course}/{lesson}` (no account required)
3. **Practice** — Lesson quizzes and standalone `/quiz` assessments
4. **Optional account** — Sign up to sync progress, bookmarks, and certificates

## Public vs signed-in

| Feature | Anonymous | Signed in |
|---------|-----------|-----------|
| Read lessons | Yes | Yes |
| Take quizzes | Yes | Yes |
| Progress (this device) | localStorage | Supabase |
| Bookmarks | No | Yes |
| Certificates | No | Yes (after course completion) |
| Dashboard | No | Yes |

## Beginner path

1. [Financial Literacy Basics](/learn/womens-financial-literacy/financial-literacy-basics)
2. [Budgeting Basics](/learn/womens-financial-literacy/budgeting-basics)
3. [Emergency Planning](/learn/womens-financial-literacy/emergency-planning)
4. [Credit Management](/learn/womens-financial-literacy/credit-management)

## Content sync

Lesson content lives in `src/data/lessons/` and syncs to Supabase:

```bash
npm run sync-lessons
```

Requires `.env.local` with `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.

## SEO

- Dynamic sitemap: curricula, courses, lessons, guides, blog
- Topic guides: `/guides/{slug}` with FAQ schema
- RSS: `/feed.xml`
