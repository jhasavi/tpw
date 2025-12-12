# Apply Supabase Security Definer View Fixes

## Steps to Apply via Supabase Dashboard

### 1. Go to Supabase SQL Editor
- Navigate to: https://supabase.com/dashboard/project/ckdshqbrxctjadljjhhy/sql
- Click **New Query**

### 2. Copy and Paste the SQL

```sql
BEGIN;

-- Drop and recreate views without SECURITY DEFINER
DROP VIEW IF EXISTS public.quiz_attempts_detailed CASCADE;
DROP VIEW IF EXISTS public.course_progress_summary CASCADE;
DROP VIEW IF EXISTS public.user_learning_stats CASCADE;

-- Recreate views with SECURITY INVOKER (default, implicit)
CREATE VIEW public.quiz_attempts_detailed AS
SELECT 
  qa.id,
  qa.user_id,
  qa.lesson_id,
  qa.score,
  qa.total_questions,
  qa.correct_answers,
  qa.answers,
  qa.completed_at,
  qa.created_at,
  l.title as lesson_title,
  c.title as course_title,
  p.email as user_email,
  p.full_name as user_name
FROM quiz_attempts qa
LEFT JOIN lessons l ON l.id = qa.lesson_id
LEFT JOIN courses c ON c.id = l.course_id
LEFT JOIN profiles p ON p.id = qa.user_id;

CREATE VIEW public.course_progress_summary AS
SELECT 
  c.id as course_id,
  c.title as course_title,
  COUNT(DISTINCT l.id) as total_lessons,
  COUNT(DISTINCT lp.lesson_id) FILTER (WHERE lp.status = 'completed') as completed_lessons,
  COUNT(DISTINCT lp.user_id) as total_learners
FROM courses c
LEFT JOIN lessons l ON l.course_id = c.id
LEFT JOIN lesson_progress lp ON lp.lesson_id = l.id
GROUP BY c.id, c.title;

CREATE VIEW public.user_learning_stats AS
SELECT 
  p.id as user_id,
  p.email,
  COUNT(DISTINCT lp.lesson_id) FILTER (WHERE lp.status = 'completed') as lessons_completed,
  COUNT(DISTINCT qa.id) as quizzes_taken,
  ROUND(AVG(qa.score), 2) as average_quiz_score,
  MAX(lp.completed_at) as last_activity
FROM profiles p
LEFT JOIN lesson_progress lp ON lp.user_id = p.id
LEFT JOIN quiz_attempts qa ON qa.user_id = p.id
GROUP BY p.id, p.email;

COMMIT;
```

### 3. Execute the Query
- Click **Run** button (or press `Cmd+Enter` on Mac)
- You should see "Query executed successfully"

### 4. Verify the Fix
Run this verification query:

```sql
SELECT table_schema, table_name
FROM information_schema.views
WHERE table_schema = 'public'
  AND table_name IN ('quiz_attempts_detailed','course_progress_summary','user_learning_stats')
ORDER BY table_name;
```

Expected output: 3 rows (one for each view)

### 5. Check Linter Results
1. Go to **Database** → **Lint**
2. Look for the three `security_definer_view` errors
3. They should now be **RESOLVED** ✅

---

## Files Updated

- ✅ `database/migrations/remove-security-definer-views.sql` - Current migration file
- ✅ Old migration files deleted for clarity

## Related Changes

- ✅ `src/components/FloatingQuizCTA.tsx` - Restored desktop visibility
- ✅ `src/app/learn/[curriculum]/[course]/[lesson]/page.tsx` - Layout verified:
  - Duplicate "Test Your Knowledge" card removed
  - "Lesson Navigation" box positioned above "Test Your Knowledge" quiz box
  - Styling consistent across all lessons
- ✅ `src/components/QuizSection.tsx` - Styled to match "Lesson Navigation" box appearance

---

## Status

- [ ] SQL migration executed in Supabase
- [ ] Linter shows 0 errors
- [ ] Lesson page verified visually
- [ ] All changes pushed to main
