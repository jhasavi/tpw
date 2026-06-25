# Content Sources & Attribution

The Purple Wings synthesizes **public educational material** into women-centered self-study lessons. We do not copy proprietary courseware.

## Primary sources

| Source | Use | URL |
|--------|-----|-----|
| CFPB | Budgeting, credit, savings, housing | https://www.consumerfinance.gov |
| SEC Investor.gov | Investing basics, risk | https://www.investor.gov |
| FDIC Money Smart | Structured financial education | https://www.fdic.gov/resources/consumers/money-smart/ |
| FTC Consumer | Credit reports, fraud, debt | https://consumer.ftc.gov |
| IRS | Retirement account rules | https://www.irs.gov/retirement-plans |

## Adaptation rules

1. **Original framing** — Every lesson uses TPW prose with a women's financial lens (pay gap, caregiving, longevity).
2. **Cite facts** — Statistics and regulatory limits link to official sources in lesson "Resources" sections.
3. **No scraping** — We do not republish paid courses or copyrighted materials.
4. **Guides** — `/guides/*` pages include a "Sources & further reading" section with outbound links.

## Updating content

- Lessons: edit `src/data/lessons/*.ts`, then `npm run sync-lessons`
- Guides: edit `src/data/guides/content.ts`
- Quizzes: `database/migrations/seed_beginner_lesson_quizzes.sql` (extend as needed)
