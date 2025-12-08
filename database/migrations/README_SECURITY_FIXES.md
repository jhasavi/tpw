# Security Fixes for Supabase Warnings

## Overview
This migration addresses all security warnings from Supabase database linter.

## Changes Made

### 1. SECURITY DEFINER Views (3 ERRORS Fixed)
**Problem**: Views with SECURITY DEFINER enforce permissions of the view creator, not the querying user.

**Fixed Views**:
- `quiz_attempts_detailed`
- `course_progress_summary`
- `user_learning_stats`

**Solution**: Recreated all views without SECURITY DEFINER (uses SECURITY INVOKER by default), ensuring RLS policies are enforced based on the querying user.

---

### 2. RLS Disabled on Public Tables (8 ERRORS Fixed)
**Problem**: Tables exposed to PostgREST without Row Level Security enabled.

**Fixed Tables**:
- `achievements` - Now readable by all authenticated users
- `users` - Users can only view their own data
- `courses` - Publicly readable
- `curricula` - Publicly readable
- `lessons` - Publicly readable
- `lesson_quizzes` - Publicly readable
- `self_assessments` - Publicly readable
- `quiz_questions` - Publicly readable

**Solution**: 
- Enabled RLS on all tables
- Created appropriate policies for each table based on access requirements
- Content tables are read-only for all users
- User-specific tables enforce user ownership

---

### 3. Function Search Path Mutable (16 WARNINGS Fixed)
**Problem**: Functions without explicit `search_path` are vulnerable to privilege escalation attacks.

**Fixed Functions**:
- `increment_user_lesson_progress` - Added `SET search_path = public`
- `check_and_award_achievements` - Added `SET search_path = public`
- `calculate_profile_completeness` - Added `SET search_path = public`
- `update_learning_streak` - Added `SET search_path = public`
- `trigger_update_profile_completeness` - Added `SET search_path = public`
- `get_user_role` - Added `SET search_path = public`
- `increment_topic_views` - Added `SET search_path = public`
- `update_topic_activity` - Added `SET search_path = public`
- `update_modified_column` - Added `SET search_path = public`
- `initialize_user_gamification` - Added `SET search_path = public`
- `update_daily_goals` - Added `SET search_path = public`
- `calculate_course_progress` - Added `SET search_path = public`
- `update_enrollment_progress` - Added `SET search_path = public`
- `update_updated_at_column` - Added `SET search_path = public`
- `generate_course_recommendations` - Added `SET search_path = public`

**Solution**: Added `SET search_path = public` to all functions to prevent attackers from injecting malicious functions/tables.

---

## Warnings Requiring Manual Action in Supabase Dashboard

### 1. Auth OTP Long Expiry (1 WARNING)
**Action Required**: 
- Go to Authentication → Email Auth settings in Supabase Dashboard
- Reduce OTP expiry to less than 1 hour (currently > 1 hour)

### 2. Leaked Password Protection Disabled (1 WARNING)
**Action Required**:
- Go to Authentication → Password settings in Supabase Dashboard
- Enable "Leaked Password Protection"
- This checks passwords against HaveIBeenPwned.org database

### 3. Postgres Version Security Patches (1 WARNING)
**Action Required**:
- Go to Settings → Database in Supabase Dashboard
- Upgrade Postgres version from `supabase-postgres-17.4.1.069` to latest
- Follow upgrade guide: https://supabase.com/docs/guides/platform/upgrading

---

## Migration Steps

### Option 1: Run via Supabase CLI
```bash
# Make sure you're logged in
supabase login

# Run the migration
supabase db push
```

### Option 2: Run via SQL Editor in Supabase Dashboard
1. Go to SQL Editor in Supabase Dashboard
2. Create a new query
3. Copy and paste the entire contents of `fix_security_warnings.sql`
4. Execute the query

### Option 3: Run via psql
```bash
psql $DATABASE_URL -f database/migrations/fix_security_warnings.sql
```

---

## Verification

After running the migration, verify the fixes:

```sql
-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN (
    'achievements', 'users', 'courses', 'curricula', 
    'lessons', 'lesson_quizzes', 'self_assessments', 'quiz_questions'
  );

-- Check functions have search_path set
SELECT 
  p.proname as function_name,
  pg_get_function_arguments(p.oid) as arguments,
  CASE 
    WHEN p.proconfig IS NULL THEN 'NOT SET'
    ELSE array_to_string(p.proconfig, ', ')
  END as config
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public'
  AND p.proname IN (
    'increment_user_lesson_progress', 'check_and_award_achievements',
    'calculate_profile_completeness', 'update_learning_streak'
  );

-- Check views are not SECURITY DEFINER
SELECT 
  viewname,
  definition
FROM pg_views
WHERE schemaname = 'public'
  AND viewname IN (
    'quiz_attempts_detailed', 'course_progress_summary', 'user_learning_stats'
  );
```

---

## Impact Assessment

### Breaking Changes
**None** - All changes are backward compatible. Existing queries and API calls will continue to work.

### Performance Impact
**Minimal** - RLS policies may add a small overhead to queries, but should be negligible for most use cases.

### Security Improvements
- ✅ Prevents unauthorized data access via views
- ✅ Enforces row-level security on all public tables
- ✅ Prevents privilege escalation attacks via functions
- ✅ Follows Supabase security best practices

---

## Resources

- [Supabase Database Linter](https://supabase.com/docs/guides/database/database-linter)
- [Row Level Security Guide](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Function Security](https://supabase.com/docs/guides/database/database-linter?lint=0011_function_search_path_mutable)
- [Going to Production Checklist](https://supabase.com/docs/guides/platform/going-into-prod#security)
