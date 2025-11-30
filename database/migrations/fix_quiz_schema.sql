-- Fix Quiz System Database Schema
-- Adds category support to quiz system

-- Create quiz_categories table
CREATE TABLE IF NOT EXISTS public.quiz_categories (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  color TEXT,
  display_order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert the 15 quiz categories
INSERT INTO public.quiz_categories (id, name, slug, description, icon, color, display_order) VALUES
  (1, 'Budgeting', 'budgeting', 'Master budgeting fundamentals and strategies', '💰', 'purple', 1),
  (2, 'Banking & Accounts', 'banking-accounts', 'Learn about banking products and services', '🏦', 'blue', 2),
  (3, 'Credit & Debt', 'credit-debt', 'Understand credit scores and debt management', '💳', 'indigo', 3),
  (4, 'Saving & Emergency Funds', 'saving-emergency', 'Build your savings and emergency fund', '🏆', 'green', 4),
  (5, 'Investing Basics', 'investing-basics', 'Introduction to investing and wealth building', '📈', 'emerald', 5),
  (6, 'Retirement Planning', 'retirement-planning', 'Plan for a secure retirement', '🌅', 'orange', 6),
  (7, 'Insurance', 'insurance', 'Protect yourself with the right insurance', '🛡️', 'cyan', 7),
  (8, 'Taxes', 'taxes', 'Navigate tax planning and filing', '📊', 'red', 8),
  (9, 'Real Estate & Mortgages', 'real-estate-mortgages', 'Home buying and mortgage basics', '🏠', 'pink', 9),
  (10, 'Career & Income', 'career-income', 'Maximize your earning potential', '💼', 'violet', 10),
  (11, 'Small Business', 'small-business', 'Entrepreneurship and business finance', '🚀', 'fuchsia', 11),
  (12, 'Estate Planning', 'estate-planning', 'Plan your legacy and protect assets', '📜', 'slate', 12),
  (13, 'Divorce & Independence', 'divorce-independence', 'Financial independence after divorce', '💪', 'rose', 13),
  (14, 'Financial Safety', 'financial-safety', 'Protect yourself from financial abuse', '🔒', 'amber', 14),
  (15, 'Empowerment', 'empowerment', 'Build confidence and financial power', '✨', 'teal', 15)
ON CONFLICT (id) DO NOTHING;

-- Add category_id to quiz_questions if it doesn't exist
ALTER TABLE public.quiz_questions 
ADD COLUMN IF NOT EXISTS category_id INTEGER REFERENCES public.quiz_categories(id);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_quiz_questions_category ON public.quiz_questions(category_id);

-- Update existing questions to assign to categories 1-3 (evenly distributed)
-- This is a best-effort assignment based on existing questions
WITH numbered_questions AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at) as rn
  FROM public.quiz_questions
  WHERE category_id IS NULL
)
UPDATE public.quiz_questions q
SET category_id = CASE 
  WHEN nq.rn <= 55 THEN 1  -- First 55 questions -> Budgeting
  WHEN nq.rn <= 110 THEN 2 -- Next 55 questions -> Banking
  ELSE 3                    -- Remaining -> Credit & Debt
END
FROM numbered_questions nq
WHERE q.id = nq.id;

-- Create a view for quiz attempts with category info
CREATE OR REPLACE VIEW public.quiz_attempts_detailed AS
SELECT 
  qa.id,
  qa.user_id,
  qa.lesson_id,
  qq.category_id,
  qc.name as category_name,
  qa.score,
  qa.total_questions,
  qa.correct_answers,
  qa.answers,
  qa.completed_at,
  qa.created_at
FROM public.quiz_attempts qa
LEFT JOIN public.lesson_quizzes lq ON lq.lesson_id = qa.lesson_id
LEFT JOIN public.quiz_questions qq ON qq.id = lq.question_id
LEFT JOIN public.quiz_categories qc ON qc.id = qq.category_id;

-- Add RLS policies for quiz_categories
ALTER TABLE public.quiz_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view quiz categories" ON public.quiz_categories
  FOR SELECT USING (TRUE);

-- Comments
COMMENT ON TABLE public.quiz_categories IS 'Quiz categories for organizing questions into 15 financial topics';
COMMENT ON VIEW public.quiz_attempts_detailed IS 'Quiz attempts with category information for statistics';
