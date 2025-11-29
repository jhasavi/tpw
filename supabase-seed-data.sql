-- Seed Data for The Purple Wing Platform
-- Run this AFTER running supabase-schema.sql

-- This adds sample data so you can test the platform immediately

BEGIN;

-- =============================================
-- SAMPLE SELF-ASSESSMENT
-- =============================================

INSERT INTO public.self_assessments (id, title, description, assessment_type, questions, scoring_rubric)
VALUES (
  uuid_generate_v4(),
  'Financial Wellness Self-Assessment',
  'A quick assessment to understand your current financial situation and confidence level',
  'initial',
  '[
    {
      "id": "q1",
      "question": "How confident do you feel about your understanding of basic financial concepts?",
      "type": "rating",
      "category": "knowledge",
      "options": ["Not confident at all", "Slightly confident", "Moderately confident", "Very confident", "Extremely confident"]
    },
    {
      "id": "q2",
      "question": "Do you currently have a monthly budget that you follow?",
      "type": "multiple_choice",
      "category": "behavior",
      "options": ["No, I don''t have a budget", "I have a rough idea but don''t track it", "I have a budget but don''t always stick to it", "Yes, I have and follow a detailed budget"]
    },
    {
      "id": "q3",
      "question": "How many months of expenses do you have saved in an emergency fund?",
      "type": "multiple_choice",
      "category": "security",
      "options": ["None", "Less than 1 month", "1-3 months", "3-6 months", "More than 6 months"]
    },
    {
      "id": "q4",
      "question": "How would you rate your current debt situation?",
      "type": "rating",
      "category": "debt",
      "options": ["Overwhelming", "Stressful", "Manageable", "Minimal", "Debt-free"]
    },
    {
      "id": "q5",
      "question": "Are you currently investing for retirement?",
      "type": "multiple_choice",
      "category": "investing",
      "options": ["No, not at all", "I want to but don''t know how", "Yes, but not regularly", "Yes, I contribute regularly"]
    }
  ]'::jsonb,
  '{
    "categories": ["knowledge", "behavior", "security", "debt", "investing"],
    "interpretation": {
      "low": "You''re at the beginning of your financial journey. Our beginner courses will give you the foundation you need.",
      "medium": "You have some financial knowledge but there''s room to grow. Focus on intermediate courses to strengthen your skills.",
      "high": "You have a strong financial foundation. Advanced courses and women-specific topics will take you to the next level."
    }
  }'::jsonb
);

-- =============================================
-- SAMPLE QUIZ QUESTIONS
-- =============================================

-- Questions for "Understanding Money & Banking" lesson

INSERT INTO public.quiz_questions (question_text, question_type, options, correct_answer, explanation, difficulty_level, topics)
VALUES
  (
    'What are the three main functions of money?',
    'multiple_choice',
    '[
      {"id": "a", "text": "Saving, spending, and investing", "value": "a"},
      {"id": "b", "text": "Medium of exchange, store of value, and unit of account", "value": "b"},
      {"id": "c", "text": "Cash, credit, and debit", "value": "c"},
      {"id": "d", "text": "Earning, saving, and giving", "value": "d"}
    ]'::jsonb,
    '"b"'::jsonb,
    'Money serves three key functions: (1) Medium of exchange - allows us to trade without bartering, (2) Store of value - holds worth over time so we can save, and (3) Unit of account - gives us a common way to measure and compare value.',
    'easy',
    ARRAY['money basics', 'financial literacy']
  ),
  (
    'How do banks primarily make money?',
    'multiple_choice',
    '[
      {"id": "a", "text": "By charging monthly account fees", "value": "a"},
      {"id": "b", "text": "By investing in the stock market", "value": "b"},
      {"id": "c", "text": "By lending money at higher interest rates than they pay depositors", "value": "c"},
      {"id": "d", "text": "By printing money", "value": "d"}
    ]'::jsonb,
    '"c"'::jsonb,
    'Banks make money primarily through the interest rate spread. They pay you a small amount of interest on your deposits (like 0.5%) and lend that money to others at higher rates (like 6%), keeping the difference as profit.',
    'medium',
    ARRAY['banking', 'financial literacy']
  ),
  (
    'What is the FDIC insurance limit per depositor, per bank?',
    'multiple_choice',
    '[
      {"id": "a", "text": "$100,000", "value": "a"},
      {"id": "b", "text": "$250,000", "value": "b"},
      {"id": "c", "text": "$500,000", "value": "c"},
      {"id": "d", "text": "$1,000,000", "value": "d"}
    ]'::jsonb,
    '"b"'::jsonb,
    'The FDIC insures up to $250,000 per depositor, per bank. This means if your bank fails, you''re guaranteed to get your money back (up to this limit). Joint accounts have $500,000 coverage ($250,000 per owner).',
    'easy',
    ARRAY['banking', 'FDIC', 'security']
  ),
  (
    'Which type of account is BEST for building an emergency fund with easy access to your money?',
    'multiple_choice',
    '[
      {"id": "a", "text": "Checking account", "value": "a"},
      {"id": "b", "text": "High-yield savings account", "value": "b"},
      {"id": "c", "text": "Certificate of Deposit (CD)", "value": "c"},
      {"id": "d", "text": "Investment account", "value": "d"}
    ]'::jsonb,
    '"b"'::jsonb,
    'A high-yield savings account is ideal for emergency funds because it offers: (1) Easy access when you need it, (2) FDIC insurance for safety, and (3) Better interest rates than regular checking or savings accounts. CDs lock up your money, and investment accounts can lose value.',
    'medium',
    ARRAY['savings', 'emergency fund', 'banking']
  ),
  (
    'True or False: Online banks are less safe than traditional banks with physical branches.',
    'true_false',
    '[
      {"id": "true", "text": "True", "value": "true"},
      {"id": "false", "text": "False", "value": "false"}
    ]'::jsonb,
    '"false"'::jsonb,
    'FALSE. Online banks are just as safe as traditional banks as long as they are FDIC insured. They often offer higher interest rates and lower fees because they don''t have the overhead costs of physical branches. Always verify the "Member FDIC" status before opening an account.',
    'easy',
    ARRAY['banking', 'online banking', 'safety']
  ),
  (
    'What is the main advantage of credit unions over traditional banks?',
    'multiple_choice',
    '[
      {"id": "a", "text": "They have more physical branches", "value": "a"},
      {"id": "b", "text": "They are member-owned and often have better rates and lower fees", "value": "b"},
      {"id": "c", "text": "They offer higher FDIC insurance limits", "value": "c"},
      {"id": "d", "text": "They don''t require any membership qualifications", "value": "d"}
    ]'::jsonb,
    '"b"'::jsonb,
    'Credit unions are member-owned, not-for-profit institutions. This means profits go back to members in the form of better interest rates on savings, lower interest rates on loans, and lower fees. They are insured by NCUA (similar to FDIC) up to $250,000.',
    'medium',
    ARRAY['credit unions', 'banking']
  ),
  (
    'If you have $300,000 to deposit and want full FDIC protection, what should you do?',
    'multiple_choice',
    '[
      {"id": "a", "text": "Put it all in one bank", "value": "a"},
      {"id": "b", "text": "Split it between two or more FDIC-insured banks", "value": "b"},
      {"id": "c", "text": "Keep it in cash at home", "value": "c"},
      {"id": "d", "text": "FDIC insurance doesn''t matter for that amount", "value": "d"}
    ]'::jsonb,
    '"b"'::jsonb,
    'FDIC insurance covers up to $250,000 per depositor, per bank. If you have $300,000, you should split it between at least two banks to ensure full coverage. For example: $250,000 in Bank A and $50,000 in Bank B. Each amount is fully insured.',
    'hard',
    ARRAY['FDIC', 'banking', 'security']
  ),
  (
    'Which of these is NOT a key function of money?',
    'multiple_choice',
    '[
      {"id": "a", "text": "Medium of exchange", "value": "a"},
      {"id": "b", "text": "Store of value", "value": "b"},
      {"id": "c", "text": "Unit of account", "value": "c"},
      {"id": "d", "text": "Guaranteed investment return", "value": "d"}
    ]'::jsonb,
    '"d"'::jsonb,
    'Money serves three functions: medium of exchange, store of value, and unit of account. It does NOT guarantee investment returns—that''s what investments are for. Money itself (like in a savings account) typically earns minimal interest.',
    'easy',
    ARRAY['money basics', 'financial literacy']
  );

-- =============================================
-- HELPFUL VIEWS (Optional - for analytics)
-- =============================================

-- View: Course progress summary
CREATE OR REPLACE VIEW course_progress_summary AS
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

-- View: User learning stats
CREATE OR REPLACE VIEW user_learning_stats AS
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

-- =============================================
-- VERIFICATION QUERIES
-- =============================================

-- Run these to verify the seed data was inserted:

-- Check self-assessments
-- SELECT title, assessment_type FROM public.self_assessments;

-- Check quiz questions  
-- SELECT question_text, difficulty_level FROM public.quiz_questions;

-- Check curricula
-- SELECT slug, title, estimated_hours FROM public.curricula;

-- =============================================
-- NOTES
-- =============================================

-- This seed data provides:
-- ✓ One complete self-assessment template
-- ✓ 8 quiz questions for the sample lesson
-- ✓ Helper views for analytics

-- To add more:
-- 1. Copy the INSERT pattern above
-- 2. Update values for new content
-- 3. Run the query in Supabase SQL Editor

-- Remember:
-- - Quiz questions link to lessons via lesson_quizzes table
-- - Self-assessment results are stored per-user
-- - All data respects RLS policies
