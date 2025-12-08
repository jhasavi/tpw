# Fixing Identified Issues - December 8, 2025

## Summary
Quality check found **1 issue** in your system:

### 🚧 "Coming Soon" Lesson (1)
- **Lesson:** Understanding Money & Banking
- **Course:** Financial Literacy Basics  
- **URL:** https://www.thepurplewings.org/learn/womens-financial-literacy/financial-literacy-basics/understanding-money-banking
- **Status:** Empty content (content is empty object)
- **Severity:** High - Users see "🚧 Lesson Coming Soon"

## Issue Details

### What's the Problem?
The lesson "Understanding Money & Banking" has an empty content field in the database. When a user tries to view it, the app checks if the lesson has content:

```typescript
// From src/app/learn/[curriculum]/[course]/[lesson]/page.tsx
const hasContent = lesson.content &&
  typeof lesson.content === 'object' && (
    ('introduction' in lesson.content && lesson.content.introduction) ||
    ('sections' in lesson.content && Array.isArray(lesson.content.sections) && lesson.content.sections.length > 0) ||
    ('markdown' in lesson.content && lesson.content.markdown && typeof lesson.content.markdown === 'string' && lesson.content.markdown.length > 0)
  )

if (!hasContent) {
  // Shows this:
  <h2>Lesson Coming Soon</h2>
  <p><strong>Understanding Money & Banking</strong> is being prepared. Check back soon!</p>
}
```

## Fix Options

### Option 1: Quick Fix with Sample Content (10 minutes)

Use the sample lesson content already in your database:

```bash
# First, check what a complete lesson looks like
# This lesson has full content:
# /learn/womens-financial-literacy/budgeting-basics/understanding-budgets

# SQL to copy content structure:
UPDATE lessons 
SET content = jsonb_build_object(
  'introduction', 'Learn what money really is, how the banking system works, and why it matters for your financial future.',
  'sections', jsonb_build_array(
    jsonb_build_object(
      'title', 'What is Money?',
      'content', 'Money serves three main functions: medium of exchange, store of value, and unit of account. Understanding these helps you use money effectively.',
      'examples', jsonb_build_array(
        'Using cash to buy groceries (medium of exchange)',
        'Putting money in a savings account for later (store of value)'
      ),
      'tips', jsonb_build_array(
        'Money is valuable because we collectively agree it is',
        'Different cultures have used different things as money throughout history'
      )
    ),
    jsonb_build_object(
      'title', 'How Banks Work',
      'content', 'Banks act as intermediaries - they take deposits from customers and lend that money to others. They make money on the difference (the interest spread).',
      'examples', jsonb_build_array(),
      'tips', jsonb_build_array()
    )
  ),
  'keyTakeaways', jsonb_build_array(
    'Money has three key functions',
    'Banks are intermediaries that connect savers and borrowers',
    'FDIC insurance protects your deposits up to $250,000',
    'Different accounts serve different purposes'
  ),
  'resources', jsonb_build_array(
    jsonb_build_object(
      'type', 'article',
      'title', 'How the Banking System Works',
      'description', 'Educational overview of modern banking',
      'url', 'https://www.investopedia.com/terms/b/bank.asp'
    )
  ),
  'actionItems', jsonb_build_array(
    'Open a savings account at your preferred bank',
    'Review your account statements',
    'Compare interest rates at different banks'
  )
)
WHERE slug = 'understanding-money-banking'
AND course_id = (SELECT id FROM courses WHERE slug = 'financial-literacy-basics');
```

### Option 2: Use Migration Script (5 minutes)

```bash
# Run the existing population script
npx ts-node scripts/populate-lesson-content.ts

# This will check if understanding-money-banking needs content
# and populate it with comprehensive content
```

### Option 3: Add Content via Supabase Dashboard (3 minutes)

1. Go to: https://app.supabase.com/project/_/editor
2. Click on `lessons` table
3. Find "Understanding Money & Banking"
4. Click on the `content` field (JSON editor will open)
5. Paste this content:

```json
{
  "introduction": "Learn what money really is, how the banking system works, and why it matters for your financial future.",
  "sections": [
    {
      "title": "What is Money?",
      "content": "Money serves three main functions: medium of exchange, store of value, and unit of account.",
      "examples": ["Using cash to buy groceries", "Saving money for the future"],
      "tips": ["Money is valuable because we agree it is"]
    },
    {
      "title": "How Banks Work",
      "content": "Banks take deposits and lend money to others, making money on the difference.",
      "examples": ["Checking accounts", "Savings accounts"],
      "tips": ["FDIC insurance protects deposits up to $250,000"]
    }
  ],
  "keyTakeaways": [
    "Money has three key functions",
    "Banks are financial intermediaries",
    "FDIC insurance protects deposits",
    "Different accounts serve different purposes"
  ],
  "resources": [],
  "actionItems": [
    "Open a savings account",
    "Review your account statements",
    "Compare interest rates at different banks"
  ]
}
```

### Option 4: Hide the Lesson Temporarily (Immediate - 5 minutes)

If you can't fix it right now, hide it from users:

```sql
-- Add a published column if it doesn't exist
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT true;

-- Hide this specific lesson
UPDATE lessons SET is_published = false 
WHERE slug = 'understanding-money-banking'
AND course_id = (SELECT id FROM courses WHERE slug = 'financial-literacy-basics');
```

Then update the course page to hide unpublished lessons:

**File:** `src/app/learn/[curriculum]/[course]/page.tsx`

```typescript
// Change this line:
const { data: lessons } = await supabase
  .from('lessons')
  .select('*')
  .eq('course_id', courseData.id)
  .order('display_order')

// To this:
const { data: lessons } = await supabase
  .from('lessons')
  .select('*')
  .eq('course_id', courseData.id)
  .eq('is_published', true)  // Add this line
  .order('display_order')
```

## Next Steps

1. **Pick a solution above** (I recommend Option 2 or 3 - quickest)
2. **Apply the fix** using your chosen method
3. **Verify it's fixed:**
   ```bash
   npm run quality-check
   ```
4. **Check the site:** Visit the URL to confirm it shows content
5. **Celebrate!** 🎉

## Verification

After fixing, run:
```bash
npm run quality-check
```

You should see:
```
═══════════════════════════════════════════════════════════════════════════
  QUALITY CHECK RESULTS
═══════════════════════════════════════════════════════════════════════════

📊 Summary Statistics:
   Total Lessons: 135
   Total Courses: 31
   Total Issues Found: 0  ← Should be 0
   Coverage: 100%         ← Should be 100%
```

## Future Prevention

### Checklist Before Publishing Lessons
- ✅ Lesson has title
- ✅ Lesson has description
- ✅ Content object exists and is valid JSON
- ✅ Content has at least one of: introduction, sections, or markdown
- ✅ Run quality check: `npm run quality-check`
- ✅ Visit page to verify content displays

### Automate This Check
Add to your deployment process:
```bash
#!/bin/bash
# scripts/pre-deploy.sh
npm run quality-check
ISSUES=$(jq '.issues.comingSoon | length' quality-check-*.json)
if [ "$ISSUES" -gt 0 ]; then
  echo "❌ Deploy blocked: $ISSUES lessons showing 'Coming Soon'"
  exit 1
fi
echo "✅ All lessons have content. Ready to deploy."
```

## Questions?

- Full documentation: `QUALITY_CHECK_SYSTEM.md`
- Quick reference: `QUALITY_CHECK_QUICK_REFERENCE.md`
- View latest report: `cat quality-check-*.json | jq .`

---

**Report Generated:** December 8, 2025  
**Issues Found:** 1  
**Severity:** Medium  
**Time to Fix:** 3-10 minutes depending on method chosen
