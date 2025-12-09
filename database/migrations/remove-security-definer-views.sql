-- =============================================
-- MIGRATION: Remove SECURITY DEFINER from Views
-- =============================================
-- Purpose: Fix Supabase security linter errors by removing SECURITY DEFINER
--          from views and allowing RLS policies of the querying user to apply
-- 
-- Errors Fixed:
-- - security_definer_view_public_user_learning_stats
-- - security_definer_view_public_course_progress_summary
-- - security_definer_view_public_quiz_attempts_detailed
--
-- Reference: https://supabase.com/docs/guides/database/database-linter?lint=0010_security_definer_view

BEGIN;

-- =============================================
-- Drop existing views that have SECURITY DEFINER
-- =============================================

DROP VIEW IF EXISTS public.quiz_attempts_detailed CASCADE;
DROP VIEW IF EXISTS public.course_progress_summary CASCADE;
DROP VIEW IF EXISTS public.user_learning_stats CASCADE;

-- =============================================
-- Recreate views WITHOUT SECURITY DEFINER
-- (Using default SECURITY INVOKER)
-- =============================================

-- View 1: quiz_attempts_detailed
-- Purpose: Detailed view of quiz attempts with related lesson and course info
-- RLS: Will respect the querying user's RLS policies on underlying tables
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

-- View 2: course_progress_summary
-- Purpose: Aggregate course progress statistics
-- RLS: No user-specific data, but enforces policies on underlying lesson_progress table
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

-- View 3: user_learning_stats
-- Purpose: Per-user learning statistics and progress
-- RLS: Enforces policies on profiles, lesson_progress, and quiz_attempts tables
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

-- =============================================
-- VERIFICATION
-- =============================================
-- After applying this migration, verify views with:
-- SELECT * FROM information_schema.views 
-- WHERE table_name IN ('quiz_attempts_detailed', 'course_progress_summary', 'user_learning_stats');

COMMIT;
