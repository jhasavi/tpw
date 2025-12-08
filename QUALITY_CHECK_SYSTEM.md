# Quality Check System - The Purple Wings

## Overview

This automated quality check system identifies and reports on all lessons with content issues across The Purple Wings platform. It detects:

- **"Lesson Coming Soon"** - Lessons with no content in the database
- **"Error Loading Lesson"** - Lessons with malformed or missing content fields
- **Incomplete data** - Lessons missing expected structure
- **Empty courses** - Courses with no lessons

## The Problem

You identified that several lessons show issues:
1. ✅ `/learn/womens-financial-literacy/financial-literacy-basics/understanding-money-banking` - Shows "Lesson Coming Soon"
2. ✅ `/learn/womens-financial-literacy/financial-literacy-basics/insurance-basics` - Shows "Error Loading Lesson"
3. ✅ `/learn/womens-financial-literacy/financial-literacy-basics/smart-shopping-saving` - Shows "Error Loading Lesson"

Before this system, these issues were only found manually by visiting each page. Now you can **automatically find all problems** with a single command.

## How It Works

### The Issue Detection Logic

#### "Lesson Coming Soon" 
A lesson shows this message when:
```typescript
const hasContent = lesson.content &&
  typeof lesson.content === 'object' && (
    ('introduction' in lesson.content && lesson.content.introduction) ||
    ('sections' in lesson.content && Array.isArray(lesson.content.sections) && lesson.content.sections.length > 0) ||
    ('markdown' in lesson.content && lesson.content.markdown && typeof lesson.content.markdown === 'string' && lesson.content.markdown.length > 0)
  )

if (!hasContent) {
  // Shows "Lesson Coming Soon"
}
```

**Source:** `src/app/learn/[curriculum]/[course]/[lesson]/page.tsx` (lines 100-117)

#### "Error Loading Lesson"
This can occur when:
- Content field is `null` or `undefined`
- Content is not a valid JSON object
- Content exists but is malformed

**Source:** `src/app/learn/[curriculum]/[course]/[lesson]/error.tsx` (error boundary)

### Database Structure

Lessons are stored in the `lessons` table with:
```sql
- id (uuid)
- course_id (uuid, foreign key)
- title (text)
- slug (text)
- content (jsonb) -- This is where the problem is
- created_at (timestamp)
```

The `content` field must be a JSON object with at least one of:
- `introduction` (string)
- `sections` (array of objects)
- `markdown` (string)
- `keyTakeaways` (array)
- `resources` (array)
- `actionItems` (array)

## Quick Start

### Run the Automated Quality Check (Easiest)

```bash
npm run quality-check
```

This will:
1. ✅ Connect to your Supabase database
2. ✅ Scan all lessons and courses
3. ✅ Generate a detailed report
4. ✅ Save results to `quality-check-YYYY-MM-DD.json`
5. ✅ Display action items in the terminal

**Output Example:**
```
═══════════════════════════════════════════════════════════════════════════
  QUALITY CHECK RESULTS
═══════════════════════════════════════════════════════════════════════════

📊 Summary Statistics:
   Total Lessons: 42
   Total Courses: 8
   Total Issues Found: 5
   Coverage: 88%

🚧 LESSONS SHOWING "COMING SOON" (3)
═══════════════════════════════════════════════════════════════════════════

1. Insurance Basics
   📖 Course: Financial Literacy Basics
   🔗 URL: https://www.thepurplewings.org/learn/womens-financial-literacy/financial-literacy-basics/insurance-basics
   Status: Null

...
```

## Available Commands

### 1. Automatic Quality Check (JavaScript)
```bash
npm run quality-check
```
- ✅ Easiest to use
- ✅ No build required
- ✅ Works with .env.local
- ✅ Generates JSON report
- 📊 **Best for daily checks**

### 2. TypeScript Version
```bash
npm run quality-check:ts
```
- ✅ Full type safety
- ✅ More detailed logging
- ✅ Better error handling
- 📊 **Best for CI/CD integration**

### 3. SQL Queries Only
```bash
npm run quality-check:sql
```
- Shows 5 SQL queries you can run manually
- ✅ Best for exploration
- ✅ Run directly in Supabase dashboard
- 📊 **Best for understanding the data**

## Understanding the Report

### JSON Report Output

The report is saved as `quality-check-YYYY-MM-DD.json`:

```json
{
  "timestamp": "2025-12-07T10:30:00.000Z",
  "lessonsScanned": 42,
  "coursesScanned": 8,
  "curriculaScanned": 1,
  "issues": {
    "comingSoon": [
      {
        "lessonId": "uuid",
        "lessonTitle": "Insurance Basics",
        "courseTitle": "Financial Literacy Basics",
        "courseSlug": "financial-literacy-basics",
        "lessonSlug": "insurance-basics",
        "curriculumSlug": "womens-financial-literacy",
        "url": "/learn/womens-financial-literacy/financial-literacy-basics/insurance-basics",
        "contentStatus": "Null"
      }
    ],
    "errorLoading": [...],
    "emptyCourses": [...],
    "orphanedLessons": [...]
  }
}
```

### Issue Categories

#### 1. Coming Soon Issues
- **Problem**: Lesson has `null` or empty content
- **Symptoms**: User sees "🚧 Lesson Coming Soon" message
- **Fix**: Add content to the lesson

#### 2. Error Loading Issues
- **Problem**: Content field is malformed
- **Symptoms**: User sees "📖 Error Loading Lesson" message
- **Fix**: Fix the JSON structure in the content field

#### 3. Empty Courses
- **Problem**: Course has no lessons
- **Symptoms**: Shows "📝 Coming Soon" on course page
- **Fix**: Add lessons or unpublish course

#### 4. Orphaned Lessons
- **Problem**: Lesson exists but course/curriculum is deleted
- **Symptoms**: Lesson becomes inaccessible
- **Fix**: Delete orphaned lessons or restore course

## Fixing Issues

### Fix "Coming Soon" Lessons

#### Option 1: Manual Database Update (SQL)
```sql
-- Update a single lesson with content
UPDATE lessons 
SET content = jsonb_build_object(
  'introduction', 'Your introduction text here...',
  'sections', jsonb_build_array(),
  'keyTakeaways', jsonb_build_array(),
  'resources', jsonb_build_array(),
  'actionItems', jsonb_build_array()
)
WHERE slug = 'insurance-basics'
AND course_id = (
  SELECT id FROM courses WHERE slug = 'financial-literacy-basics'
);
```

#### Option 2: Use Migration Scripts
```bash
# Run existing content population script
npx ts-node scripts/populate-lesson-content.ts
```

#### Option 3: Create a Script
Create `scripts/fix-missing-content.ts` to bulk-update lessons with placeholder content.

### Fix "Error Loading" Lessons

#### Option 1: Identify the Issue
```sql
-- Find lessons with invalid content structure
SELECT 
  l.id,
  l.title,
  l.content,
  jsonb_typeof(l.content) as type
FROM lessons l
WHERE l.content IS NOT NULL
  AND jsonb_typeof(l.content) != 'object';
```

#### Option 2: Fix the Content
```sql
-- Fix malformed JSON
UPDATE lessons 
SET content = jsonb_build_object(
  'introduction', '',
  'sections', jsonb_build_array(),
  'markdown', ''
)
WHERE id = 'lesson-uuid';
```

### Unpublish Problem Lessons (Temporary Fix)

If you can't fix them immediately:

1. **Add an `is_published` field** to lessons table
2. **Hide unpublished lessons** from course pages
3. **Return when content is ready**

Example:
```sql
ALTER TABLE lessons ADD COLUMN is_published BOOLEAN DEFAULT true;

UPDATE lessons SET is_published = false WHERE slug IN (
  'insurance-basics',
  'smart-shopping-saving'
);
```

## Integration with Your Workflow

### Run Before Deployment

Add to your CI/CD pipeline:

```bash
#!/bin/bash
# .github/workflows/quality-check.yml

- name: Run Quality Check
  run: npm run quality-check
  
- name: Fail if critical issues
  run: |
    if [ -f quality-check-*.json ]; then
      ISSUES=$(jq '.issues.comingSoon | length' quality-check-*.json)
      if [ "$ISSUES" -gt 5 ]; then
        echo "❌ Too many 'Coming Soon' lessons: $ISSUES"
        exit 1
      fi
    fi
```

### Run Daily/Weekly

Set up a cron job:
```bash
# Run every Sunday at 9 AM
0 9 * * 0 cd /path/to/tpw && npm run quality-check
```

### Manual Audits

Run before checking in lessons:
```bash
# Check current status
npm run quality-check

# View the report
cat quality-check-*.json | jq .

# Check specific course
npm run quality-check | grep "Financial Literacy Basics" -A 10
```

## SQL Queries for Supabase Dashboard

You can run these queries directly in [Supabase SQL Editor](https://app.supabase.com/project/_/sql):

### Query 1: All "Coming Soon" Lessons
```sql
SELECT 
  l.id,
  l.title,
  l.slug,
  c.title as course_title,
  c.slug as course_slug,
  CASE 
    WHEN l.content IS NULL THEN 'NULL'
    WHEN (l.content->>'introduction' = '' OR l.content->>'introduction' IS NULL)
         AND jsonb_array_length(l.content->'sections') = 0
         AND (l.content->>'markdown' = '' OR l.content->>'markdown' IS NULL)
    THEN 'Empty'
    ELSE 'Has Content'
  END as status
FROM lessons l
JOIN courses c ON l.course_id = c.id
WHERE l.content IS NULL 
   OR (l.content->>'introduction' = '' AND (l.content->'sections' IS NULL OR jsonb_array_length(l.content->'sections') = 0))
ORDER BY c.title, l.title;
```

### Query 2: Content Statistics
```sql
SELECT 
  COUNT(*) as total_lessons,
  SUM(CASE WHEN l.content IS NULL THEN 1 ELSE 0 END) as null_content,
  SUM(CASE WHEN l.content IS NOT NULL AND 
           (l.content->>'introduction' = '' OR l.content->>'introduction' IS NULL)
           AND (l.content->'sections' IS NULL OR jsonb_array_length(l.content->'sections') = 0)
      THEN 1 ELSE 0 END) as empty_content,
  SUM(CASE WHEN l.content IS NOT NULL AND (
           (l.content->>'introduction' != '' AND l.content->>'introduction' IS NOT NULL)
           OR (l.content->'sections' IS NOT NULL AND jsonb_array_length(l.content->'sections') > 0)
      )
      THEN 1 ELSE 0 END) as has_content
FROM lessons l;
```

## Troubleshooting

### "Missing Supabase credentials"
```bash
# Check .env.local exists
ls -la .env.local

# Check it has the required variables
grep SUPABASE_URL .env.local
grep SUPABASE_KEY .env.local
```

### "401 Unauthorized"
```bash
# The API key in .env.local is wrong or expired
# Generate a new one in Supabase:
# 1. Go to Settings > API
# 2. Copy the "Service Role Secret" (for reading all data)
# 3. Update SUPABASE_SERVICE_ROLE_KEY in .env.local
```

### "Connection timeout"
```bash
# Supabase is slow or unreachable
# 1. Check internet connection
# 2. Verify Supabase URL is correct
# 3. Try running again - servers may be busy
```

## Files Created

### 1. `/scripts/quality-check-auto.js`
- 🚀 Main automated quality check script
- Uses Node.js (no build required)
- Works with .env.local
- Generates JSON reports

### 2. `/scripts/comprehensive-quality-check.ts`
- 📊 TypeScript version with full typing
- Better for CI/CD
- Requires `tsx` to run

### 3. `/scripts/quality-check-queries.sh`
- 🔍 SQL queries you can run manually
- Best for understanding the data
- Run in Supabase dashboard

### 4. Updated `package.json`
Added commands:
```json
"quality-check": "node scripts/quality-check-auto.js",
"quality-check:sql": "bash scripts/quality-check-queries.sh",
"quality-check:ts": "tsx scripts/comprehensive-quality-check.ts"
```

## Next Steps

### Immediate (Today)
1. ✅ Run the quality check: `npm run quality-check`
2. ✅ Review the issues found
3. ✅ Share results with your team

### Short Term (This Week)
1. 📝 Fix the identified issues
2. 🔄 Re-run quality check to verify
3. 📊 Monitor for new issues

### Medium Term (This Month)
1. 🤖 Integrate into CI/CD pipeline
2. 📅 Set up weekly automated checks
3. 🎯 Improve content coverage

### Long Term (Ongoing)
1. 🔍 Run before deployments
2. 📈 Track improvement over time
3. 🎓 Use as part of content review process

## Example: Real-World Usage

```bash
# Check current quality
$ npm run quality-check

🚧 LESSONS SHOWING "COMING SOON" (3)
1. Insurance Basics
   📖 Course: Financial Literacy Basics
   🔗 URL: https://www.thepurplewings.org/learn/womens-financial-literacy/financial-literacy-basics/insurance-basics
   Status: Null

2. Smart Shopping & Saving
   📖 Course: Financial Literacy Basics
   🔗 URL: https://www.thepurplewings.org/learn/womens-financial-literacy/financial-literacy-basics/smart-shopping-saving
   Status: Empty

ACTION ITEMS:
🔧 Fix "Coming Soon" Lessons (3):
   1. Update each lesson with content in the database
   2. Use migration scripts: npx ts-node scripts/populate-lesson-content.ts
   3. Or temporarily unpublish these lessons
   4. See SQL queries in scripts/quality-check-queries.sh for details

# Now you can fix these 3 lessons and rerun
$ npm run quality-check
# Verify they're fixed!
```

## Support

For issues with the quality check system:
1. 📝 Check error message in terminal
2. 🔍 Review `quality-check-*.json` report
3. 🧪 Run SQL queries manually in Supabase
4. 💬 Check environment variables in `.env.local`

---

**Created:** December 7, 2025  
**Version:** 1.0  
**Status:** Ready for Production
