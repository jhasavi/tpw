# Quick Reference - Quality Check System

## One-Line Commands

### Check all lessons
```bash
npm run quality-check
```

### View the latest report
```bash
cat quality-check-*.json | jq .
```

### Count issues by type
```bash
cat quality-check-*.json | jq '.issues | map_values(length)'
```

### List all "Coming Soon" lessons
```bash
cat quality-check-*.json | jq '.issues.comingSoon[] | "\(.lessonTitle) (\(.courseTitle))"'
```

## Current Status (as of December 8, 2025)

```
Total Lessons Scanned:  135
Total Courses:          31
Issues Found:           1
Coverage:              99%
```

### Issues Breakdown:
- 🚧 Coming Soon: 1
  - Understanding Money & Banking (Financial Literacy Basics)
- ⚠️ Error Loading: 0
- 🚫 Empty Courses: 0
- 🔗 Orphaned Lessons: 0

### Detailed URLs:
- https://www.thepurplewings.org/learn/womens-financial-literacy/financial-literacy-basics/understanding-money-banking

## Fix This Lesson

### Option A: Add Content (SQL)
```sql
UPDATE lessons 
SET content = jsonb_build_object(
  'introduction', 'Lesson introduction text...',
  'sections', jsonb_build_array(
    jsonb_build_object('title', 'Section 1', 'content', 'Section content...')
  ),
  'keyTakeaways', jsonb_build_array('Key point 1', 'Key point 2'),
  'resources', jsonb_build_array(),
  'actionItems', jsonb_build_array()
)
WHERE slug = 'understanding-money-banking'
AND course_id = (SELECT id FROM courses WHERE slug = 'financial-literacy-basics');
```

### Option B: Use Migration Script
```bash
npx ts-node scripts/populate-lesson-content.ts
```

### Option C: Hide Until Ready
```sql
-- Add published field if it doesn't exist
ALTER TABLE lessons ADD COLUMN is_published BOOLEAN DEFAULT true;

-- Hide the lesson
UPDATE lessons SET is_published = false 
WHERE slug = 'understanding-money-banking';

-- Update the course page to filter hidden lessons
-- (requires code changes in src/app/learn/[curriculum]/[course]/page.tsx)
```

## Automate This

### Daily Check (macOS/Linux)
Add to crontab:
```bash
crontab -e
# Add this line to run at 9 AM daily:
0 9 * * * cd /Users/Sanjeev/tpw && npm run quality-check >> quality-check.log 2>&1
```

### Weekly Report Email
```bash
# Create scripts/send-quality-report.sh
#!/bin/bash
npm run quality-check
cat quality-check-*.json | \
  jq '.issues.comingSoon[] | "- \(.lessonTitle) (\(.courseTitle))"' | \
  mail -s "Weekly Quality Check Report" your-email@example.com
```

### GitHub Actions (CI/CD)
```yaml
# .github/workflows/quality-check.yml
name: Quality Check
on:
  schedule:
    - cron: '0 9 * * 0' # Weekly Sunday 9 AM UTC
  workflow_dispatch:

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run quality-check
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.SUPABASE_KEY }}
      - uses: actions/upload-artifact@v3
        with:
          name: quality-check-report
          path: quality-check-*.json
```

## Monitoring Metrics

Track these over time:
- **Total Lessons**: Should increase as you add content
- **Coverage %**: Should approach 100%
- **Coming Soon Count**: Should decrease
- **Error Loading Count**: Should stay at 0

Example dashboard tracking:
```bash
# See trend
tail -10 quality-check-*.json | \
  jq -r '.timestamp, .lessonsScanned, .issues.comingSoon | length'
```

## Integration Points

### Before Deployment
```bash
# scripts/pre-deploy.sh
#!/bin/bash
npm run quality-check
ISSUES=$(jq '.issues.comingSoon | length' quality-check-*.json)
if [ "$ISSUES" -gt 0 ]; then
  echo "❌ Cannot deploy: $ISSUES lessons have 'Coming Soon' status"
  exit 1
fi
```

### On Commit
```bash
# .husky/pre-commit
npm run quality-check
```

### In Pull Requests
```yaml
# .github/workflows/pr-check.yml
- name: Quality Check
  run: npm run quality-check
  
- name: Comment Results
  uses: actions/github-script@v6
  with:
    script: |
      const report = require('./quality-check-*.json');
      const comment = `## Quality Check Results\n- Issues: ${report.issues.comingSoon.length}`;
      github.rest.issues.createComment({...});
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Missing Supabase credentials" | Check `.env.local` has `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` |
| "401 Unauthorized" | Regenerate API key in Supabase Settings > API |
| "Connection timeout" | Check internet, Supabase status page, or try again |
| Report is old/stale | Delete `quality-check-*.json` and run again |
| Can't update lesson | Check course exists and lesson slug is correct |

## Files Reference

| File | Purpose |
|------|---------|
| `scripts/quality-check-auto.js` | Main Node.js quality check ⭐ USE THIS |
| `scripts/comprehensive-quality-check.ts` | TypeScript version for CI/CD |
| `scripts/quality-check-queries.sh` | SQL queries for manual inspection |
| `QUALITY_CHECK_SYSTEM.md` | Full documentation |
| `QUALITY_CHECK_QUICK_REFERENCE.md` | This file |
| `quality-check-*.json` | Generated reports |

## Test the System

```bash
# Generate a fresh report
npm run quality-check

# View summary
echo "Coming Soon:" && \
  jq '.issues.comingSoon | length' quality-check-*.json

echo "Errors:" && \
  jq '.issues.errorLoading | length' quality-check-*.json

echo "Coverage:" && \
  jq '.lessonsScanned, (.lessonsScanned - (.issues.comingSoon | length))' quality-check-*.json | \
  paste -sd',' - | awk -F, '{print int($2/$1*100)"%"}'
```

## More Help

- Full documentation: `QUALITY_CHECK_SYSTEM.md`
- Run quality check: `npm run quality-check`
- View SQL queries: `npm run quality-check:sql`
- TypeScript version: `npm run quality-check:ts`

---

**Last Updated:** December 8, 2025  
**Version:** 1.0
