# Quick Fix for Supabase Security Warnings

## Step 1: Run the SQL Migration

1. **Open Supabase Dashboard**: https://supabase.com/dashboard
2. **Navigate to**: SQL Editor (left sidebar)
3. **Create a new query**
4. **Copy and paste** the entire contents of `database/migrations/fix_security_warnings_v2.sql`
5. **Click "Run"**

The migration will:
- ✅ Remove SECURITY DEFINER from 3 views
- ✅ Enable RLS on 7+ public tables
- ✅ Add search_path to 15+ functions
- ✅ Show a summary of what was fixed

---

## Step 2: Manual Dashboard Settings (Required)

### Auth OTP Expiry (WARNING)
1. Go to **Authentication** → **Email Auth** in Supabase Dashboard
2. Find **"OTP Expiry"** setting
3. Change from current value to **3600 seconds (1 hour)** or less
4. Click **Save**

### Postgres Version Upgrade (WARNING)
1. Go to **Settings** → **Infrastructure** → **Database** in Supabase Dashboard
2. Look for **"Postgres version"** section
3. If an upgrade is available, click **"Upgrade"**
4. Follow the prompts to upgrade to the latest version

**Note**: Password protection feature (#2) is Pro plan only - you can ignore that warning on the free tier.

---

## Step 3: Verify the Fixes

After running the migration, run this query in SQL Editor to verify:

\`\`\`sql
-- Check RLS is enabled on tables
SELECT 
  tablename,
  CASE WHEN rowsecurity THEN '✅ Enabled' ELSE '❌ Disabled' END as rls_status
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN (
    'achievements', 'courses', 'curricula', 'lessons',
    'lesson_quizzes', 'self_assessments', 'quiz_questions'
  )
ORDER BY tablename;

-- Check functions have search_path set
SELECT 
  p.proname as function_name,
  CASE 
    WHEN p.proconfig IS NULL THEN '❌ Not set'
    WHEN 'search_path=public' = ANY(p.proconfig) THEN '✅ Set to public'
    ELSE '⚠️ Other value'
  END as search_path_status
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public'
  AND p.proname IN (
    'update_learning_streak', 'calculate_profile_completeness',
    'check_and_award_achievements', 'calculate_course_progress'
  )
ORDER BY p.proname;

-- Check views are not SECURITY DEFINER
SELECT 
  viewname,
  '✅ SECURITY INVOKER (safe)' as status
FROM pg_views
WHERE schemaname = 'public'
  AND viewname IN (
    'quiz_attempts_detailed', 'course_progress_summary', 'user_learning_stats'
  )
ORDER BY viewname;
\`\`\`

---

## Expected Results

After completing all steps:
- **ERRORS**: Should drop from 11 to 0
- **WARNINGS**: Should drop from 19 to 2-3 (Auth settings + Postgres version)
  - Password protection warning will remain (Pro plan feature)

---

## Troubleshooting

If you see errors when running the migration:
1. The migration is idempotent - safe to run multiple times
2. Check the NOTICE messages to see what was actually changed
3. Some functions/tables may not exist in your schema - this is OK, they'll be skipped

If warnings persist:
1. Wait 5-10 minutes after running migration for Supabase to re-scan
2. Go to Database → Advisors in dashboard to see updated status
3. Some warnings require manual dashboard changes (see Step 2)
