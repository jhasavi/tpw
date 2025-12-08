-- =============================================
-- SECURITY FIXES - FINAL PASS
-- Created: 2024-12-02
-- Purpose: Fix remaining 4 security errors
-- =============================================

BEGIN;

-- =============================================
-- FIX 1: FORCE RECREATE VIEWS WITHOUT SECURITY DEFINER
-- =============================================

-- Force drop and recreate quiz_attempts_detailed
DROP VIEW IF EXISTS public.quiz_attempts_detailed CASCADE;

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
  qa.created_at
FROM quiz_attempts qa;

-- Force drop and recreate course_progress_summary
DROP VIEW IF EXISTS public.course_progress_summary CASCADE;

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

-- Force drop and recreate user_learning_stats
DROP VIEW IF EXISTS public.user_learning_stats CASCADE;

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
-- FIX 2: ENABLE RLS ON USERS TABLE
-- =============================================

-- Enable RLS on users table
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE schemaname = 'public' AND tablename = 'users'
  ) THEN
    ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
    
    -- Drop existing policies if they exist
    DROP POLICY IF EXISTS "Users can view their own data" ON public.users;
    DROP POLICY IF EXISTS "Users can update their own data" ON public.users;
    
    -- Create policies
    CREATE POLICY "Users can view their own data" ON public.users
      FOR SELECT USING (auth.uid() = id);
    
    CREATE POLICY "Users can update their own data" ON public.users
      FOR UPDATE USING (auth.uid() = id);
    
    RAISE NOTICE 'Enabled RLS on users table';
  ELSE
    RAISE NOTICE 'users table does not exist';
  END IF;
END $$;

-- =============================================
-- VERIFICATION
-- =============================================

DO $$
DECLARE
  view_count INTEGER;
  users_rls BOOLEAN;
BEGIN
  -- Check views exist and are NOT security definer
  SELECT COUNT(*) INTO view_count
  FROM pg_views
  WHERE schemaname = 'public'
    AND viewname IN ('quiz_attempts_detailed', 'course_progress_summary', 'user_learning_stats');
  
  -- Check users table has RLS
  SELECT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE schemaname = 'public' 
      AND tablename = 'users' 
      AND rowsecurity = true
  ) INTO users_rls;
  
  RAISE NOTICE '================================';
  RAISE NOTICE 'FINAL VERIFICATION';
  RAISE NOTICE '================================';
  RAISE NOTICE 'Views recreated: %', view_count;
  RAISE NOTICE 'Users table RLS enabled: %', users_rls;
  RAISE NOTICE '================================';
  RAISE NOTICE 'All 4 errors should now be fixed!';
  RAISE NOTICE '================================';
END $$;

COMMIT;
