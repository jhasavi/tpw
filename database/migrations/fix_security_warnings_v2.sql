-- =============================================
-- SECURITY FIXES FOR SUPABASE WARNINGS - V2
-- Created: 2024-12-02
-- Purpose: Address Supabase database linter security warnings
-- Instructions: Run this in Supabase Dashboard SQL Editor
-- =============================================

BEGIN;

-- =============================================
-- FIX 1: RECREATE VIEWS WITHOUT SECURITY DEFINER
-- =============================================

-- Recreate quiz_attempts_detailed view (if it exists as a view, not a table)
DO $$ 
BEGIN
  -- Check if quiz_attempts_detailed is a view
  IF EXISTS (
    SELECT 1 FROM pg_views 
    WHERE schemaname = 'public' AND viewname = 'quiz_attempts_detailed'
  ) THEN
    DROP VIEW IF EXISTS public.quiz_attempts_detailed CASCADE;
    -- Recreate without SECURITY DEFINER
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
    
    RAISE NOTICE 'Recreated quiz_attempts_detailed view without SECURITY DEFINER';
  ELSE
    RAISE NOTICE 'quiz_attempts_detailed is not a view, skipping';
  END IF;
END $$;

-- Recreate course_progress_summary view
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_views 
    WHERE schemaname = 'public' AND viewname = 'course_progress_summary'
  ) THEN
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
    
    RAISE NOTICE 'Recreated course_progress_summary view without SECURITY DEFINER';
  END IF;
END $$;

-- Recreate user_learning_stats view
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_views 
    WHERE schemaname = 'public' AND viewname = 'user_learning_stats'
  ) THEN
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
    
    RAISE NOTICE 'Recreated user_learning_stats view without SECURITY DEFINER';
  END IF;
END $$;

-- =============================================
-- FIX 2: ENABLE ROW LEVEL SECURITY ON TABLES
-- =============================================

-- Enable RLS on achievements (if table exists)
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE schemaname = 'public' AND tablename = 'achievements'
  ) THEN
    ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
    
    -- Drop existing policy if it exists
    DROP POLICY IF EXISTS "Anyone can view achievements" ON public.achievements;
    
    -- Create read-only policy
    CREATE POLICY "Anyone can view achievements" ON public.achievements
      FOR SELECT USING (TRUE);
    
    RAISE NOTICE 'Enabled RLS on achievements table';
  ELSE
    RAISE NOTICE 'achievements table does not exist, skipping';
  END IF;
END $$;

-- Enable RLS on courses
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE schemaname = 'public' AND tablename = 'courses' AND rowsecurity = true
  ) THEN
    ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
    
    DROP POLICY IF EXISTS "Anyone can view courses" ON public.courses;
    
    CREATE POLICY "Anyone can view courses" ON public.courses
      FOR SELECT USING (TRUE);
    
    RAISE NOTICE 'Enabled RLS on courses table';
  ELSE
    RAISE NOTICE 'RLS already enabled on courses table';
  END IF;
END $$;

-- Enable RLS on curricula
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE schemaname = 'public' AND tablename = 'curricula' AND rowsecurity = true
  ) THEN
    ALTER TABLE public.curricula ENABLE ROW LEVEL SECURITY;
    
    DROP POLICY IF EXISTS "Anyone can view curricula" ON public.curricula;
    
    CREATE POLICY "Anyone can view curricula" ON public.curricula
      FOR SELECT USING (TRUE);
    
    RAISE NOTICE 'Enabled RLS on curricula table';
  ELSE
    RAISE NOTICE 'RLS already enabled on curricula table';
  END IF;
END $$;

-- Enable RLS on lessons
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE schemaname = 'public' AND tablename = 'lessons' AND rowsecurity = true
  ) THEN
    ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
    
    DROP POLICY IF EXISTS "Anyone can view lessons" ON public.lessons;
    
    CREATE POLICY "Anyone can view lessons" ON public.lessons
      FOR SELECT USING (TRUE);
    
    RAISE NOTICE 'Enabled RLS on lessons table';
  ELSE
    RAISE NOTICE 'RLS already enabled on lessons table';
  END IF;
END $$;

-- Enable RLS on lesson_quizzes
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE schemaname = 'public' AND tablename = 'lesson_quizzes' AND rowsecurity = true
  ) THEN
    ALTER TABLE public.lesson_quizzes ENABLE ROW LEVEL SECURITY;
    
    DROP POLICY IF EXISTS "Anyone can view lesson quizzes" ON public.lesson_quizzes;
    
    CREATE POLICY "Anyone can view lesson quizzes" ON public.lesson_quizzes
      FOR SELECT USING (TRUE);
    
    RAISE NOTICE 'Enabled RLS on lesson_quizzes table';
  ELSE
    RAISE NOTICE 'RLS already enabled on lesson_quizzes table';
  END IF;
END $$;

-- Enable RLS on self_assessments
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE schemaname = 'public' AND tablename = 'self_assessments' AND rowsecurity = true
  ) THEN
    ALTER TABLE public.self_assessments ENABLE ROW LEVEL SECURITY;
    
    DROP POLICY IF EXISTS "Anyone can view self assessments" ON public.self_assessments;
    
    CREATE POLICY "Anyone can view self assessments" ON public.self_assessments
      FOR SELECT USING (TRUE);
    
    RAISE NOTICE 'Enabled RLS on self_assessments table';
  ELSE
    RAISE NOTICE 'RLS already enabled on self_assessments table';
  END IF;
END $$;

-- Enable RLS on quiz_questions
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE schemaname = 'public' AND tablename = 'quiz_questions' AND rowsecurity = true
  ) THEN
    ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
    
    DROP POLICY IF EXISTS "Anyone can view quiz questions" ON public.quiz_questions;
    
    CREATE POLICY "Anyone can view quiz questions" ON public.quiz_questions
      FOR SELECT USING (TRUE);
    
    RAISE NOTICE 'Enabled RLS on quiz_questions table';
  ELSE
    RAISE NOTICE 'RLS already enabled on quiz_questions table';
  END IF;
END $$;

-- =============================================
-- FIX 3: ADD SEARCH_PATH TO FUNCTIONS
-- =============================================
-- This adds SET search_path to existing functions to prevent privilege escalation

-- Update functions with search_path (handling overloaded functions)
DO $$
DECLARE
  func_record RECORD;
  func_signature TEXT;
  success_count INTEGER := 0;
  skip_count INTEGER := 0;
BEGIN
  -- Loop through all functions in public schema
  FOR func_record IN
    SELECT 
      p.oid,
      p.proname as function_name,
      pg_get_function_identity_arguments(p.oid) as args,
      pg_get_function_arguments(p.oid) as full_args
    FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public'
      AND p.proname IN (
        'increment_user_lesson_progress',
        'check_and_award_achievements',
        'calculate_profile_completeness',
        'update_learning_streak',
        'trigger_update_profile_completeness',
        'get_user_role',
        'increment_topic_views',
        'update_topic_activity',
        'update_modified_column',
        'initialize_user_gamification',
        'update_daily_goals',
        'calculate_course_progress',
        'update_enrollment_progress',
        'update_updated_at_column',
        'generate_course_recommendations'
      )
      -- Only update if search_path not already set
      AND (p.proconfig IS NULL OR NOT 'search_path=public' = ANY(p.proconfig))
  LOOP
    BEGIN
      -- Build the function signature with argument types
      func_signature := format('public.%I(%s)', func_record.function_name, func_record.args);
      
      -- Add search_path to the function
      EXECUTE format('ALTER FUNCTION %s SET search_path = public', func_signature);
      
      success_count := success_count + 1;
      RAISE NOTICE 'Added search_path to function: %(%)', func_record.function_name, func_record.args;
      
    EXCEPTION WHEN OTHERS THEN
      skip_count := skip_count + 1;
      RAISE NOTICE 'Skipped function % (%) - Error: %', func_record.function_name, func_record.args, SQLERRM;
    END;
  END LOOP;
  
  RAISE NOTICE 'Functions updated with search_path: %', success_count;
  RAISE NOTICE 'Functions skipped: %', skip_count;
END $$;

-- =============================================
-- SUMMARY
-- =============================================
DO $$
DECLARE
  view_count INTEGER;
  table_with_rls INTEGER;
  func_count INTEGER;
BEGIN
  -- Count views fixed
  SELECT COUNT(*) INTO view_count
  FROM pg_views
  WHERE schemaname = 'public'
    AND viewname IN ('quiz_attempts_detailed', 'course_progress_summary', 'user_learning_stats');
  
  -- Count tables with RLS enabled
  SELECT COUNT(*) INTO table_with_rls
  FROM pg_tables
  WHERE schemaname = 'public'
    AND tablename IN (
      'achievements', 'courses', 'curricula', 'lessons',
      'lesson_quizzes', 'self_assessments', 'quiz_questions'
    )
    AND rowsecurity = true;
  
  -- Count functions with search_path set
  SELECT COUNT(*) INTO func_count
  FROM pg_proc p
  JOIN pg_namespace n ON p.pronamespace = n.oid
  WHERE n.nspname = 'public'
    AND p.proconfig IS NOT NULL
    AND 'search_path=public' = ANY(p.proconfig);
  
  RAISE NOTICE '================================';
  RAISE NOTICE 'MIGRATION SUMMARY';
  RAISE NOTICE '================================';
  RAISE NOTICE 'Views without SECURITY DEFINER: %', view_count;
  RAISE NOTICE 'Tables with RLS enabled: %', table_with_rls;
  RAISE NOTICE 'Functions with search_path set: %', func_count;
  RAISE NOTICE '================================';
END $$;

COMMIT;
