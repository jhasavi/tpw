# Supabase Security Definer View Errors - Fix Guide

## Overview

Your Supabase database has 3 views defined with `SECURITY DEFINER` which is flagged by Supabase's database linter as a security issue.

### What's the Problem?

When a view is created with `SECURITY DEFINER`, it:
- ❌ Executes with the permissions of the **view creator** (usually the schema owner)
- ❌ **Bypasses Row Level Security (RLS) policies** of the querying user
- ❌ Can expose data that should be restricted by RLS

The correct approach is to use `SECURITY INVOKER` (the default), which:
- ✅ Executes with the permissions of the **user running the query**
- ✅ **Respects RLS policies** of the querying user
- ✅ Maintains security boundaries

### Affected Views

| View Name | Location | Status |
|-----------|----------|--------|
| `quiz_attempts_detailed` | `public` schema | ❌ ERROR |
| `course_progress_summary` | `public` schema | ❌ ERROR |
| `user_learning_stats` | `public` schema | ❌ ERROR |

---

## How to Fix

### Step 1: Navigate to Supabase SQL Editor

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project: **tpw**
3. Click **SQL Editor** in the left sidebar

### Step 2: Run the Migration

1. Click **New Query** button
2. Copy the entire contents of this file:
   ```
   database/migrations/remove-security-definer-views.sql
   ```
3. Paste into the SQL editor
4. Click **Run** (or press `Cmd+Enter`)

**Expected Output:**
```
Query executed successfully
```

### Step 3: Verify the Fix

Run this query in Supabase SQL Editor to confirm all views are fixed:

```sql
SELECT 
  table_name,
  view_definition
FROM information_schema.views 
WHERE table_schema = 'public'
  AND table_name IN (
    'quiz_attempts_detailed', 
    'course_progress_summary', 
    'user_learning_stats'
  )
ORDER BY table_name;
```

You should see all three views listed without any `SECURITY DEFINER` clause.

### Step 4: Run Supabase Linter

1. In Supabase Dashboard, go to **Database** > **Lint**
2. Look for the three security_definer_view errors
3. They should now show as **RESOLVED** ✅

---

## Technical Details

### What Changed

**Before:**
```sql
CREATE OR REPLACE VIEW public.quiz_attempts_detailed WITH (SECURITY_DEFINER) AS
SELECT ...
```

**After:**
```sql
CREATE VIEW public.quiz_attempts_detailed AS
SELECT ...
```

(The `SECURITY INVOKER` is now the default and implicit)

### Impact on Security

These views will now properly enforce RLS policies:

1. **quiz_attempts_detailed**
   - Users can only see their own quiz attempts (via quiz_attempts RLS)
   - Filtered by the underlying tables' RLS policies

2. **course_progress_summary**
   - Shows aggregate data but respects lesson_progress RLS
   - Only counts lessons/progress visible to the querying user

3. **user_learning_stats**
   - Users can only see their own statistics (via profiles RLS)
   - Filtered by lesson_progress and quiz_attempts RLS policies

### RLS Policies Already in Place

The following RLS policies are already protecting these tables:

**profiles table:**
```sql
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
```

**lesson_progress table:**
```sql
CREATE POLICY "Users can view own progress" ON lesson_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own progress" ON lesson_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

**quiz_attempts table:**
```sql
CREATE POLICY "Users can view own attempts" ON quiz_attempts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own attempts" ON quiz_attempts
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

---

## References

- [Supabase Database Linter Documentation](https://supabase.com/docs/guides/database/database-linter)
- [SECURITY DEFINER vs INVOKER](https://supabase.com/docs/guides/database/database-linter?lint=0010_security_definer_view)
- [PostgreSQL Security Definer Documentation](https://www.postgresql.org/docs/current/sql-createfunction.html)

---

## Troubleshooting

### Issue: "Cannot drop view... CASCADE required"

**Solution:** The migration already includes `CASCADE`, so this shouldn't happen. If it does, ensure you're using the latest migration file.

### Issue: Views still showing errors after running migration

**Possible causes:**
1. Migration wasn't actually executed (check Supabase SQL logs)
2. Need to refresh the Supabase Linter cache
3. Views might be created again elsewhere

**Solution:**
1. Check the migration status in Supabase
2. Go to Database > Lint and click "Refresh Lint Results"
3. Search codebase for any other view creation statements

### Issue: Queries to views start failing

**Possible causes:**
1. RLS policies on underlying tables are too restrictive
2. User lacks read permissions on underlying tables

**Solution:**
1. Check that user has SELECT permissions on quiz_attempts, lesson_progress, etc.
2. Verify RLS policies allow access (e.g., `auth.uid() = user_id`)
3. Test with a sample query in Supabase SQL Editor

---

## Verification Checklist

After applying the fix:

- [ ] Migration executed successfully in Supabase
- [ ] Three views are visible in Database > Views section
- [ ] Linter shows 0 errors for `security_definer_view`
- [ ] Views still return correct data when queried
- [ ] Application continues to work normally

---

## Questions or Issues?

If you encounter any problems:

1. **Check Supabase logs** - Database > Logs section
2. **Verify RLS policies** - Ensure they're properly configured
3. **Test view queries** - Run them directly in Supabase SQL Editor
4. **Check application logs** - Look for any permission-related errors

