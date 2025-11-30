# Database Migration - Quick Guide

## ✅ Migration Ready: `consolidated_p5_p6.sql`

This migration activates all Priority #5 and #6 features:
- ✅ Achievements system
- ✅ Course/lesson bookmarks
- ✅ Learning streaks
- ✅ Skill assessments
- ✅ Onboarding progress
- ✅ Course recommendations
- ✅ Tooltip tracking
- ✅ Celebration events
- ✅ Extended profile fields

## 🚀 Run Migration (2 minutes)

### Option 1: Supabase Dashboard (Recommended)

1. **Open SQL Editor:**
   https://supabase.com/dashboard/project/ckdshqbrxctjadljjhhy/sql

2. **Copy migration:**
   ```bash
   cat database/migrations/consolidated_p5_p6.sql | pbcopy
   ```

3. **Paste in SQL Editor and click "RUN"**

4. **Verify success:** Look for "Migration completed successfully!" message

### Option 2: Supabase CLI

```bash
# Install CLI if needed
npm install -g supabase

# Login
supabase login

# Link project
supabase link --project-ref ckdshqbrxctjadljjhhy

# Run migration
supabase db push database/migrations/consolidated_p5_p6.sql
```

## ✅ Verification

After running, verify tables exist:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN (
    'achievements',
    'user_achievements',
    'course_bookmarks',
    'lesson_bookmarks',
    'learning_streaks',
    'skill_assessments',
    'onboarding_progress',
    'course_recommendations',
    'user_tooltips_seen',
    'celebration_events'
  )
ORDER BY table_name;
```

Should return 10 tables.

## 🎉 What Happens After

Once migration completes:
- ✅ Bookmark buttons will save to database
- ✅ Welcome wizard progress will persist
- ✅ Achievements will unlock
- ✅ Tooltips will show once per user
- ✅ Profile enhancements active

## 🔒 Safety Notes

- ✅ Migration is **idempotent** (safe to re-run)
- ✅ Uses `IF NOT EXISTS` checks
- ✅ No data loss risk
- ✅ All tables have RLS policies

## 📊 Migration Stats

- **File:** `database/migrations/consolidated_p5_p6.sql`
- **Size:** 281 lines
- **Tables:** 10 new tables
- **Policies:** 20+ RLS policies
- **Indexes:** 10+ performance indexes
- **Functions:** 1 (get_recommended_courses)
