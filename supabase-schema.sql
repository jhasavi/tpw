-- The Purple Wing - Clean Database Schema
-- Women's Financial Literacy Platform

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- USERS & AUTHENTICATION
-- =============================================
-- Note: Supabase auth.users table is managed by Supabase Auth
-- We extend it with a profiles table

CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  location TEXT, -- For MA-specific features
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- =============================================
-- CURRICULUM STRUCTURE
-- =============================================

-- Curricula (Two main learning paths)
CREATE TABLE public.curricula (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL, -- 'womens-financial-literacy' or 'finra-40-hour'
  title TEXT NOT NULL,
  description TEXT,
  target_audience TEXT,
  estimated_hours INTEGER,
  is_professional_track BOOLEAN DEFAULT FALSE,
  display_order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Courses (e.g., "Financial Foundations", "Budgeting Basics")
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  curriculum_id UUID REFERENCES public.curricula(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  level TEXT, -- 'beginner', 'intermediate', 'advanced', 'women-specific'
  estimated_hours DECIMAL(4,2),
  display_order INTEGER,
  icon TEXT, -- Icon identifier for UI
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(curriculum_id, slug)
);

-- Lessons (individual learning units within courses)
CREATE TABLE public.lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  content JSONB, -- Rich content structure
  objectives TEXT[],
  key_concepts TEXT[],
  duration_minutes INTEGER,
  display_order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(course_id, slug)
);

-- =============================================
-- QUIZ & ASSESSMENT SYSTEM
-- =============================================

-- Question Bank (Reusable questions across lessons)
CREATE TABLE public.quiz_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL DEFAULT 'multiple_choice', -- 'multiple_choice', 'true_false', 'multi_select'
  options JSONB, -- Array of answer options
  correct_answer JSONB, -- Correct answer(s)
  explanation TEXT, -- Why this is the correct answer
  difficulty_level TEXT, -- 'easy', 'medium', 'hard'
  topics TEXT[], -- Tags for categorization
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lesson Quiz Assignments (Which questions appear in which lesson quiz)
CREATE TABLE public.lesson_quizzes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
  question_id UUID REFERENCES public.quiz_questions(id) ON DELETE CASCADE,
  display_order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(lesson_id, question_id)
);

-- Self-Assessment Templates
CREATE TABLE public.self_assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  assessment_type TEXT, -- 'initial', 'midpoint', 'final', 'confidence'
  questions JSONB, -- Array of assessment questions
  scoring_rubric JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- USER PROGRESS & TRACKING
-- =============================================

-- Lesson Progress
CREATE TABLE public.lesson_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'not_started', -- 'not_started', 'in_progress', 'completed'
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  time_spent_minutes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own progress" ON public.lesson_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress" ON public.lesson_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" ON public.lesson_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Quiz Attempts
CREATE TABLE public.quiz_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
  score INTEGER, -- Percentage score
  total_questions INTEGER,
  correct_answers INTEGER,
  answers JSONB, -- User's answers for review
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own quiz attempts" ON public.quiz_attempts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own quiz attempts" ON public.quiz_attempts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Self-Assessment Results
CREATE TABLE public.self_assessment_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  assessment_id UUID REFERENCES public.self_assessments(id) ON DELETE CASCADE,
  responses JSONB,
  score JSONB, -- Calculated scores by category
  recommendations TEXT[],
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.self_assessment_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own assessment results" ON public.self_assessment_results
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own assessment results" ON public.self_assessment_results
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =============================================
-- COMMUNITY & ENGAGEMENT (Future)
-- =============================================

-- Discussion Forums (Placeholder for community features)
CREATE TABLE public.discussion_topics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  category TEXT,
  is_ma_specific BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.discussion_topics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view discussions" ON public.discussion_topics
  FOR SELECT USING (TRUE);

-- =============================================
-- HELPER FUNCTIONS & TRIGGERS
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all relevant tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_curricula_updated_at BEFORE UPDATE ON public.curricula
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON public.courses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lessons_updated_at BEFORE UPDATE ON public.lessons
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lesson_progress_updated_at BEFORE UPDATE ON public.lesson_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- SEED DATA - Two Curricula
-- =============================================

INSERT INTO public.curricula (slug, title, description, target_audience, estimated_hours, is_professional_track, display_order)
VALUES 
  ('womens-financial-literacy', 
   'Women''s Financial Literacy Curriculum',
   'A comprehensive, life-stage-aware financial education curriculum designed for women, centered on financial independence, safety, protection, and empowerment.',
   'All women seeking financial independence and literacy',
   100,
   FALSE,
   1),
  ('finra-40-hour',
   '40-Hour FINRA-Compliant Financial Empowerment Course',
   'A structured, professional-level 40-hour course for women seeking in-depth financial knowledge and potential career paths in finance.',
   'Women seeking professional financial credentials',
   40,
   TRUE,
   2);

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

CREATE INDEX idx_courses_curriculum ON public.courses(curriculum_id);
CREATE INDEX idx_lessons_course ON public.lessons(course_id);
CREATE INDEX idx_lesson_progress_user ON public.lesson_progress(user_id);
CREATE INDEX idx_lesson_progress_lesson ON public.lesson_progress(lesson_id);
CREATE INDEX idx_quiz_attempts_user ON public.quiz_attempts(user_id);
CREATE INDEX idx_quiz_attempts_lesson ON public.quiz_attempts(lesson_id);
CREATE INDEX idx_lesson_quizzes_lesson ON public.lesson_quizzes(lesson_id);

-- =============================================
-- COMMENTS FOR DOCUMENTATION
-- =============================================

COMMENT ON TABLE public.profiles IS 'Extended user profile information beyond Supabase auth.users';
COMMENT ON TABLE public.curricula IS 'Top-level learning paths (Women''s Financial Literacy, FINRA 40-Hour)';
COMMENT ON TABLE public.courses IS 'Courses within each curriculum (e.g., Budgeting Basics, Investing 101)';
COMMENT ON TABLE public.lessons IS 'Individual lessons within courses';
COMMENT ON TABLE public.quiz_questions IS 'Reusable question bank for all quizzes';
COMMENT ON TABLE public.lesson_progress IS 'Tracks user progress through each lesson';
COMMENT ON TABLE public.quiz_attempts IS 'Records of user quiz attempts and scores';
COMMENT ON TABLE public.self_assessments IS 'Self-assessment templates for confidence and knowledge checks';
