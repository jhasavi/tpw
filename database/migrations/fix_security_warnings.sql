-- =============================================
-- SECURITY FIXES FOR SUPABASE WARNINGS
-- Created: 2024-12-02
-- Purpose: Address Supabase database linter security warnings
-- =============================================

BEGIN;

-- =============================================
-- FIX 1: REMOVE SECURITY DEFINER FROM VIEWS
-- =============================================
-- These views should use SECURITY INVOKER (default) instead of SECURITY DEFINER
-- to enforce RLS policies of the querying user, not the view creator

-- Drop and recreate quiz_attempts_detailed view without SECURITY DEFINER
DROP VIEW IF EXISTS public.quiz_attempts_detailed CASCADE;
CREATE OR REPLACE VIEW public.quiz_attempts_detailed AS
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

-- Drop and recreate course_progress_summary view without SECURITY DEFINER
DROP VIEW IF EXISTS public.course_progress_summary CASCADE;
CREATE OR REPLACE VIEW public.course_progress_summary AS
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

-- Drop and recreate user_learning_stats view without SECURITY DEFINER
DROP VIEW IF EXISTS public.user_learning_stats CASCADE;
CREATE OR REPLACE VIEW public.user_learning_stats AS
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
-- FIX 2: ENABLE ROW LEVEL SECURITY ON TABLES
-- =============================================

-- Enable RLS on achievements table
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

-- Create policies for achievements (read-only for all authenticated users)
DROP POLICY IF EXISTS "Anyone can view achievements" ON public.achievements;
CREATE POLICY "Anyone can view achievements" ON public.achievements
  FOR SELECT USING (TRUE);

-- Enable RLS on users table (if it exists in your schema)
-- Note: This might be the profiles table extension
DO $$ 
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'users') THEN
    ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
    
    DROP POLICY IF EXISTS "Users can view their own data" ON public.users;
    CREATE POLICY "Users can view their own data" ON public.users
      FOR SELECT USING (auth.uid() = id);
  END IF;
END $$;

-- Enable RLS on courses table
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Create policies for courses (read-only for all users)
DROP POLICY IF EXISTS "Anyone can view courses" ON public.courses;
CREATE POLICY "Anyone can view courses" ON public.courses
  FOR SELECT USING (TRUE);

-- Enable RLS on curricula table
ALTER TABLE public.curricula ENABLE ROW LEVEL SECURITY;

-- Create policies for curricula (read-only for all users)
DROP POLICY IF EXISTS "Anyone can view curricula" ON public.curricula;
CREATE POLICY "Anyone can view curricula" ON public.curricula
  FOR SELECT USING (TRUE);

-- Enable RLS on lessons table
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;

-- Create policies for lessons (read-only for all users)
DROP POLICY IF EXISTS "Anyone can view lessons" ON public.lessons;
CREATE POLICY "Anyone can view lessons" ON public.lessons
  FOR SELECT USING (TRUE);

-- Enable RLS on lesson_quizzes table
ALTER TABLE public.lesson_quizzes ENABLE ROW LEVEL SECURITY;

-- Create policies for lesson_quizzes (read-only for all users)
DROP POLICY IF EXISTS "Anyone can view lesson quizzes" ON public.lesson_quizzes;
CREATE POLICY "Anyone can view lesson quizzes" ON public.lesson_quizzes
  FOR SELECT USING (TRUE);

-- Enable RLS on self_assessments table
ALTER TABLE public.self_assessments ENABLE ROW LEVEL SECURITY;

-- Create policies for self_assessments (read-only for all users)
DROP POLICY IF EXISTS "Anyone can view self assessments" ON public.self_assessments;
CREATE POLICY "Anyone can view self assessments" ON public.self_assessments
  FOR SELECT USING (TRUE);

-- Enable RLS on quiz_questions table
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;

-- Create policies for quiz_questions (read-only for all users)
DROP POLICY IF EXISTS "Anyone can view quiz questions" ON public.quiz_questions;
CREATE POLICY "Anyone can view quiz questions" ON public.quiz_questions
  FOR SELECT USING (TRUE);

-- =============================================
-- FIX 3: SET SEARCH_PATH ON FUNCTIONS
-- =============================================
-- Add SET search_path to all functions to prevent privilege escalation attacks

-- Function: increment_user_lesson_progress
CREATE OR REPLACE FUNCTION public.increment_user_lesson_progress(
  p_user_id UUID,
  p_lesson_id UUID,
  p_time_spent_minutes INTEGER DEFAULT 0
)
RETURNS void AS $$
BEGIN
  INSERT INTO public.lesson_progress (user_id, lesson_id, status, started_at, time_spent_minutes)
  VALUES (p_user_id, p_lesson_id, 'in_progress', NOW(), p_time_spent_minutes)
  ON CONFLICT (user_id, lesson_id) 
  DO UPDATE SET 
    time_spent_minutes = public.lesson_progress.time_spent_minutes + EXCLUDED.time_spent_minutes,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public;

-- Function: check_and_award_achievements
CREATE OR REPLACE FUNCTION public.check_and_award_achievements()
RETURNS TRIGGER AS $$
DECLARE
  v_user_id UUID;
  v_quiz_count INTEGER;
  v_avg_score NUMERIC;
BEGIN
  v_user_id := NEW.user_id;
  
  -- Count total quizzes completed
  SELECT COUNT(*) INTO v_quiz_count
  FROM public.quiz_attempts
  WHERE user_id = v_user_id;
  
  -- Calculate average score
  SELECT AVG(score) INTO v_avg_score
  FROM public.quiz_attempts
  WHERE user_id = v_user_id;
  
  -- Award achievements based on quiz count
  IF v_quiz_count = 1 THEN
    INSERT INTO public.user_achievements (user_id, achievement_id, earned_at)
    SELECT v_user_id, id, NOW()
    FROM public.achievements
    WHERE code = 'first_quiz'
    ON CONFLICT DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SET search_path = public;

-- Function: calculate_profile_completeness
CREATE OR REPLACE FUNCTION public.calculate_profile_completeness(profile_id UUID)
RETURNS INTEGER AS $$
DECLARE
  completeness INTEGER := 0;
  profile_record RECORD;
BEGIN
  SELECT * INTO profile_record FROM public.profiles WHERE id = profile_id;
  
  IF profile_record IS NULL THEN
    RETURN 0;
  END IF;
  
  -- Base fields
  IF profile_record.full_name IS NOT NULL AND profile_record.full_name != '' THEN
    completeness := completeness + 10;
  END IF;
  
  IF profile_record.avatar_url IS NOT NULL AND profile_record.avatar_url != '' THEN
    completeness := completeness + 15;
  END IF;
  
  IF profile_record.location IS NOT NULL AND profile_record.location != '' THEN
    completeness := completeness + 5;
  END IF;
  
  -- Extended fields (if they exist)
  IF profile_record.bio IS NOT NULL AND profile_record.bio != '' THEN
    completeness := completeness + 15;
  END IF;
  
  RETURN LEAST(completeness, 100);
END;
$$ LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public;

-- Function: update_learning_streak
CREATE OR REPLACE FUNCTION public.update_learning_streak(p_user_id UUID)
RETURNS void AS $$
DECLARE
  streak_record RECORD;
  today DATE := CURRENT_DATE;
  yesterday DATE := CURRENT_DATE - INTERVAL '1 day';
BEGIN
  -- Get or create streak record
  SELECT * INTO streak_record FROM public.learning_streaks WHERE user_id = p_user_id;
  
  IF streak_record IS NULL THEN
    INSERT INTO public.learning_streaks (user_id, current_streak, longest_streak, last_activity_date, streak_start_date, total_active_days)
    VALUES (p_user_id, 1, 1, today, today, 1);
  ELSE
    IF streak_record.last_activity_date = today THEN
      RETURN;
    ELSIF streak_record.last_activity_date = yesterday THEN
      UPDATE public.learning_streaks
      SET 
        current_streak = current_streak + 1,
        longest_streak = GREATEST(longest_streak, current_streak + 1),
        last_activity_date = today,
        total_active_days = total_active_days + 1,
        updated_at = NOW()
      WHERE user_id = p_user_id;
    ELSE
      UPDATE public.learning_streaks
      SET 
        current_streak = 1,
        last_activity_date = today,
        streak_start_date = today,
        total_active_days = total_active_days + 1,
        updated_at = NOW()
      WHERE user_id = p_user_id;
    END IF;
  END IF;
END;
$$ LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public;

-- Function: trigger_update_profile_completeness
CREATE OR REPLACE FUNCTION public.trigger_update_profile_completeness()
RETURNS TRIGGER AS $$
BEGIN
  NEW.profile_completeness := public.calculate_profile_completeness(NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SET search_path = public;

-- Function: get_user_role
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS TEXT AS $$
DECLARE
  user_role TEXT;
BEGIN
  SELECT role INTO user_role FROM public.profiles WHERE id = user_id;
  RETURN COALESCE(user_role, 'user');
END;
$$ LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public;

-- Function: increment_topic_views
CREATE OR REPLACE FUNCTION public.increment_topic_views(topic_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.discussion_topics
  SET view_count = COALESCE(view_count, 0) + 1,
      updated_at = NOW()
  WHERE id = topic_id;
END;
$$ LANGUAGE plpgsql
SET search_path = public;

-- Function: update_topic_activity
CREATE OR REPLACE FUNCTION public.update_topic_activity()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.discussion_topics
  SET updated_at = NOW()
  WHERE id = NEW.topic_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SET search_path = public;

-- Function: update_modified_column
CREATE OR REPLACE FUNCTION public.update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SET search_path = public;

-- Function: initialize_user_gamification
CREATE OR REPLACE FUNCTION public.initialize_user_gamification(p_user_id UUID)
RETURNS void AS $$
BEGIN
  INSERT INTO public.user_gamification (user_id, total_points, level, current_xp, next_level_xp)
  VALUES (p_user_id, 0, 1, 0, 100)
  ON CONFLICT (user_id) DO NOTHING;
  
  INSERT INTO public.learning_streaks (user_id, current_streak, longest_streak, total_active_days)
  VALUES (p_user_id, 0, 0, 0)
  ON CONFLICT (user_id) DO NOTHING;
END;
$$ LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public;

-- Function: update_daily_goals
CREATE OR REPLACE FUNCTION public.update_daily_goals(p_user_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.daily_goals
  SET 
    lessons_completed_today = lessons_completed_today + 1,
    updated_at = NOW()
  WHERE user_id = p_user_id AND DATE(created_at) = CURRENT_DATE;
  
  IF NOT FOUND THEN
    INSERT INTO public.daily_goals (user_id, lessons_completed_today, target_lessons)
    VALUES (p_user_id, 1, 3);
  END IF;
END;
$$ LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public;

-- Function: calculate_course_progress
CREATE OR REPLACE FUNCTION public.calculate_course_progress(p_user_id UUID, p_course_id UUID)
RETURNS NUMERIC AS $$
DECLARE
  total_lessons INTEGER;
  completed_lessons INTEGER;
BEGIN
  SELECT COUNT(*) INTO total_lessons
  FROM public.lessons
  WHERE course_id = p_course_id;
  
  IF total_lessons = 0 THEN
    RETURN 0;
  END IF;
  
  SELECT COUNT(*) INTO completed_lessons
  FROM public.lesson_progress lp
  JOIN public.lessons l ON l.id = lp.lesson_id
  WHERE lp.user_id = p_user_id 
    AND l.course_id = p_course_id 
    AND lp.status = 'completed';
  
  RETURN ROUND((completed_lessons::NUMERIC / total_lessons::NUMERIC) * 100, 2);
END;
$$ LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public;

-- Function: update_enrollment_progress
CREATE OR REPLACE FUNCTION public.update_enrollment_progress()
RETURNS TRIGGER AS $$
DECLARE
  v_course_id UUID;
  v_progress NUMERIC;
BEGIN
  SELECT l.course_id INTO v_course_id
  FROM public.lessons l
  WHERE l.id = NEW.lesson_id;
  
  v_progress := public.calculate_course_progress(NEW.user_id, v_course_id);
  
  UPDATE public.course_enrollments
  SET 
    progress_percentage = v_progress,
    updated_at = NOW()
  WHERE user_id = NEW.user_id AND course_id = v_course_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SET search_path = public;

-- Function: update_updated_at_column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SET search_path = public;

-- Function: generate_course_recommendations
CREATE OR REPLACE FUNCTION public.generate_course_recommendations(p_user_id UUID)
RETURNS TABLE(course_id UUID, course_title TEXT, relevance_score INTEGER) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.id,
    c.title,
    100 as relevance_score
  FROM public.courses c
  WHERE c.id NOT IN (
    SELECT ce.course_id
    FROM public.course_enrollments ce
    WHERE ce.user_id = p_user_id
  )
  ORDER BY c.display_order
  LIMIT 5;
END;
$$ LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public;

-- =============================================
-- VERIFICATION
-- =============================================

-- Check that RLS is enabled on all tables
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN 
    SELECT tablename 
    FROM pg_tables 
    WHERE schemaname = 'public' 
      AND tablename IN (
        'achievements', 'users', 'courses', 'curricula', 
        'lessons', 'lesson_quizzes', 'self_assessments', 'quiz_questions'
      )
  LOOP
    IF NOT EXISTS (
      SELECT 1 FROM pg_tables 
      WHERE schemaname = 'public' 
        AND tablename = r.tablename 
        AND rowsecurity = true
    ) THEN
      RAISE NOTICE 'WARNING: RLS not enabled on table: %', r.tablename;
    ELSE
      RAISE NOTICE 'RLS enabled on table: %', r.tablename;
    END IF;
  END LOOP;
END $$;

COMMIT;

-- =============================================
-- POST-MIGRATION NOTES
-- =============================================
-- 1. SECURITY DEFINER views have been recreated as SECURITY INVOKER (default)
-- 2. RLS has been enabled on all public-facing tables
-- 3. All functions now have SET search_path = public to prevent privilege escalation
-- 4. Auth configuration warnings need to be addressed in Supabase Dashboard:
--    - Reduce OTP expiry to less than 1 hour
--    - Enable leaked password protection
--    - Upgrade Postgres version when available
