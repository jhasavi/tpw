-- Seed sample quiz questions for beginner lessons (run manually in Supabase SQL editor)
-- Links lessons by slug under womens-financial-literacy curriculum

INSERT INTO lesson_quizzes (lesson_id, title, description, passing_score, is_active)
SELECT l.id, 'Knowledge Check', 'Quick quiz for this lesson', 70, true
FROM lessons l
JOIN courses c ON c.id = l.course_id
JOIN curricula cu ON cu.id = c.curriculum_id
WHERE cu.slug = 'womens-financial-literacy'
  AND c.slug IN ('financial-literacy-basics', 'budgeting-basics', 'emergency-planning', 'credit-management')
  AND NOT EXISTS (
    SELECT 1 FROM lesson_quizzes lq WHERE lq.lesson_id = l.id
  );

-- Example questions for financial-literacy-intro (extend pattern for other lessons)
INSERT INTO quiz_questions (quiz_id, question_text, question_type, options, correct_answer, explanation, display_order)
SELECT lq.id,
  'What is the primary purpose of a personal budget?',
  'multiple_choice',
  '["Track spending and plan where money goes","Eliminate all fun spending","Maximize credit card use","Avoid saving"]'::jsonb,
  'Track spending and plan where money goes',
  'A budget is a plan for your money, not a restriction on all enjoyment.',
  1
FROM lesson_quizzes lq
JOIN lessons l ON l.id = lq.lesson_id
WHERE l.slug = 'financial-literacy-intro'
  AND NOT EXISTS (SELECT 1 FROM quiz_questions qq WHERE qq.quiz_id = lq.id);
