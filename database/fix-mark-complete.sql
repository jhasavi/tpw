-- Comprehensive Fix for Mark Complete Issues
-- Date: November 30, 2025

-- ISSUE 1: Missing profile for user (causes foreign key constraint error)
-- Create profile for existing user
INSERT INTO public.profiles (
  id,
  email,
  full_name,
  onboarding_completed,
  created_at,
  updated_at,
  is_admin
)
SELECT 
  u.id,
  u.email,
  u.raw_user_meta_data->>'full_name',
  false,
  u.created_at,
  NOW(),
  false
FROM auth.users u
WHERE u.id NOT IN (SELECT id FROM public.profiles)
  AND u.deleted_at IS NULL
ON CONFLICT (id) DO NOTHING;

-- ISSUE 2: Add missing is_published column to courses table
ALTER TABLE public.courses 
ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT true;

-- Update all existing courses to be published
UPDATE public.courses SET is_published = true WHERE is_published IS NULL;

-- ISSUE 3: Add missing is_published column to curricula table (if needed)
ALTER TABLE public.curricula 
ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT true;

UPDATE public.curricula SET is_published = true WHERE is_published IS NULL;

-- ISSUE 4: Fix RLS policies - Allow authenticated users to read their own data

-- Drop existing restrictive policies if any
DROP POLICY IF EXISTS "Users can read own onboarding" ON public.onboarding_progress;
DROP POLICY IF EXISTS "Users can insert own onboarding" ON public.onboarding_progress;
DROP POLICY IF EXISTS "Users can update own onboarding" ON public.onboarding_progress;

-- Create proper RLS policies for onboarding_progress
CREATE POLICY "Users can read own onboarding"
  ON public.onboarding_progress
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own onboarding"
  ON public.onboarding_progress
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own onboarding"
  ON public.onboarding_progress
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Fix lesson_progress policies
DROP POLICY IF EXISTS "Users can read own progress" ON public.lesson_progress;
DROP POLICY IF EXISTS "Users can insert own progress" ON public.lesson_progress;
DROP POLICY IF EXISTS "Users can update own progress" ON public.lesson_progress;

CREATE POLICY "Users can read own progress"
  ON public.lesson_progress
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON public.lesson_progress
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON public.lesson_progress
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ISSUE 5: Enable RLS on tables (if not already enabled)
ALTER TABLE public.onboarding_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;

-- ISSUE 6: Fix the generate_course_recommendations function
CREATE OR REPLACE FUNCTION generate_course_recommendations(p_user_id UUID)
RETURNS TABLE (
  course_id UUID,
  course_title TEXT,
  course_description TEXT,
  match_score INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.id as course_id,
    c.title as course_title,
    c.description as course_description,
    50 as match_score  -- Default score for now
  FROM courses c
  JOIN curricula cu ON c.curriculum_id = cu.id
  WHERE COALESCE(c.is_published, true) = true
    AND COALESCE(cu.is_published, true) = true
  ORDER BY c.order_index
  LIMIT 5;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ISSUE 7: Create trigger to auto-create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    onboarding_completed,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    false,
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if any
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Verify fixes
SELECT 'Profile Count:' as info, COUNT(*) as count FROM public.profiles;
SELECT 'Users without profiles:' as info, COUNT(*) as count 
FROM auth.users u 
WHERE u.id NOT IN (SELECT id FROM public.profiles) 
  AND u.deleted_at IS NULL;

SELECT 'Courses table has is_published:' as info, 
  COUNT(*) FILTER (WHERE column_name = 'is_published') > 0 as has_column
FROM information_schema.columns 
WHERE table_name = 'courses' 
  AND table_schema = 'public';

SELECT 'RLS enabled on lesson_progress:' as info, 
  pg_class.relrowsecurity as enabled
FROM pg_class
WHERE relname = 'lesson_progress';
