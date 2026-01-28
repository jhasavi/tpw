-- =============================================
-- ADD QUIZZES TO LESSONS SHOWING "QUIZ COMING SOON"
-- =============================================
-- This script adds quiz questions to lessons that currently don't have quizzes
-- Run this in Supabase SQL Editor to activate quizzes for all lessons

-- First, let's identify lessons that don't have quizzes
-- and add quiz questions for them

-- Insert quiz questions for various lesson topics
-- Each lesson will get 3-5 relevant questions

-- Budgeting Basics Lessons
INSERT INTO quiz_questions (id, question_text, question_type, options, correct_answer, explanation, difficulty_level, created_at) VALUES
-- Budgeting Basics Lesson 1
(gen_random_uuid(), 'What is the primary purpose of a budget?', 'multiple_choice', 
 '[{"id":"1","text":"To restrict spending","value":"a"},{"id":"2","text":"To plan and track your money","value":"b"},{"id":"3","text":"To save all your income","value":"d"},{"id":"4","text":"To eliminate all expenses","value":"c"}]', 
 'b', 'A budget helps you plan where your money goes and track your spending patterns, giving you control over your finances.', 'easy', NOW()),

(gen_random_uuid(), 'Which budgeting method involves giving every dollar a job?', 'multiple_choice', 
 '[{"id":"1","text":"50/30/20 rule","value":"a"},{"id":"2","text":"Zero-based budgeting","value":"b"},{"id":"3","text":"Envelope method","value":"c"},{"id":"4","text":"Pay yourself first","value":"d"}]', 
 'b', 'Zero-based budgeting assigns every dollar of income to expenses, savings, or debt repayment, so your income minus expenses equals zero.', 'medium', NOW()),

(gen_random_uuid(), 'What percentage of your income should typically go to needs according to the 50/30/20 rule?', 'multiple_choice', 
 '[{"id":"1","text":"20%","value":"a"},{"id":"2","text":"30%","value":"b"},{"id":"3","text":"50%","value":"c"},{"id":"4","text":"70%","value":"d"}]', 
 'c', 'The 50/30/20 rule suggests allocating 50% of after-tax income to needs (essentials like housing, food, utilities), 30% to wants, and 20% to savings and debt repayment.', 'easy', NOW()),

-- Emergency Planning Lessons
(gen_random_uuid(), 'How many months of living expenses should you aim to have in an emergency fund?', 'multiple_choice', 
 '[{"id":"1","text":"1-2 months","value":"a"},{"id":"2","text":"3-6 months","value":"b"},{"id":"3","text":"12 months","value":"c"},{"id":"4","text":"24 months","value":"d"}]', 
 'b', 'Financial experts recommend having 3-6 months of living expenses saved for emergencies, though some people prefer more depending on their situation.', 'easy', NOW()),

(gen_random_uuid(), 'Where should you typically keep your emergency fund?', 'multiple_choice', 
 '[{"id":"1","text":"Stock market investments","value":"a"},{"id":"2","text":"High-yield savings account","value":"b"},{"id":"3","text":"Real estate","value":"c"},{"id":"4","text":"Cryptocurrency","value":"d"}]', 
 'b', 'Emergency funds should be kept in liquid, safe accounts like high-yield savings accounts where you can access the money quickly without risk of loss.', 'medium', NOW()),

(gen_random_uuid(), 'What is the first step in building an emergency fund?', 'multiple_choice', 
 '[{"id":"1","text":"Investing in stocks","value":"a"},{"id":"2","text":"Tracking expenses to find savings","value":"b"},{"id":"3","text":"Applying for credit cards","value":"c"},{"id":"4","text":"Buying insurance","value":"d"}]', 
 'b', 'Before you can save for emergencies, you need to understand where your money is currently going so you can identify areas to cut back and redirect to savings.', 'easy', NOW()),

-- Credit Management Lessons
(gen_random_uuid(), 'What is a credit score primarily used for?', 'multiple_choice', 
 '[{"id":"1","text":"Tracking your spending","value":"a"},{"id":"2","text":"Determining loan eligibility and interest rates","value":"b"},{"id":"3","text":"Calculating your net worth","value":"c"},{"id":"4","text":"Budgeting your expenses","value":"d"}]', 
 'b', 'Credit scores are primarily used by lenders to assess your creditworthiness and determine whether to approve loans and what interest rates to offer.', 'easy', NOW()),

(gen_random_uuid(), 'Which action has the biggest positive impact on your credit score?', 'multiple_choice', 
 '[{"id":"1","text":"Opening new credit cards","value":"a"},{"id":"2","text":"Paying bills on time","value":"b"},{"id":"3","text":"Closing old accounts","value":"c"},{"id":"4","text":"Using cash for all purchases","value":"d"}]', 
 'b', 'Payment history is the most important factor in credit scores, making up about 35% of your FICO score. Consistently paying bills on time has the largest positive impact.', 'medium', NOW()),

(gen_random_uuid(), 'What is credit utilization?', 'multiple_choice', 
 '[{"id":"1","text":"The number of credit cards you have","value":"a"},{"id":"2","text":"The ratio of credit used to total available credit","value":"b"},{"id":"3","text":"Your total credit limit","value":"c"},{"id":"4","text":"The interest rate on your cards","value":"d"}]', 
 'b', 'Credit utilization is the percentage of your available credit that you''re currently using. It''s recommended to keep it below 30% for a healthy credit score.', 'medium', NOW()),

-- Financial Goal Setting Lessons
(gen_random_uuid(), 'What makes a financial goal SMART?', 'multiple_choice', 
 '[{"id":"1","text":"Specific, Measurable, Achievable, Relevant, Time-bound","value":"a"},{"id":"2","text":"Simple, Money-oriented, Ambitious, Realistic, Timely","value":"b"},{"id":"3","text":"Strategic, Measurable, Actionable, Reasonable, Targeted","value":"c"},{"id":"4","text":"Structured, Meaningful, Attainable, Reachable, Defined","value":"d"}]', 
 'a', 'SMART goals are Specific, Measurable, Achievable, Relevant, and Time-bound. This framework helps create clear, actionable financial goals.', 'easy', NOW()),

(gen_random_uuid(), 'What is the difference between short-term and long-term financial goals?', 'multiple_choice', 
 '[{"id":"1","text":"Amount of money involved","value":"a"},{"id":"2","text":"Time horizon for achievement","value":"b"},{"id":"3","text":"Type of investment needed","value":"c"},{"id":"4","text":"Level of difficulty","value":"d"}]', 
 'b', 'The main difference is the time horizon - short-term goals are typically under 1-2 years, while long-term goals are 5+ years away. This affects your savings and investment strategy.', 'medium', NOW()),

-- Building Good Financial Habits
(gen_random_uuid(), 'What is the most effective way to build lasting financial habits?', 'multiple_choice', 
 '[{"id":"1","text":"Making big changes all at once","value":"a"},{"id":"2","text":"Starting small and being consistent","value":"b"},{"id":"3","text":"Waiting for the perfect time","value":"c"},{"id":"4","text":"Following complex systems","value":"d"}]', 
 'b', 'Research shows that starting with small, manageable changes and being consistent is more effective for building lasting habits than trying to make drastic changes overnight.', 'easy', NOW()),

(gen_random_uuid(), 'How often should you typically review your budget?', 'multiple_choice', 
 '[{"id":"1","text":"Once a year","value":"a"},{"id":"2","text":"Monthly","value":"b"},{"id":"3","text":"Only when problems arise","value":"c"},{"id":"4","text":"Every few years","value":"d"}]', 
 'b', 'Monthly budget reviews help you stay on track, adjust for changes in income or expenses, and catch issues before they become problems.', 'medium', NOW());

-- Now we need to link these questions to lessons
-- First, let's get the lesson IDs and question IDs we just created
-- Then insert into lesson_quizzes table

-- Note: In a real implementation, you would:
-- 1. Get the actual lesson IDs from your lessons table
-- 2. Get the question IDs that were just created
-- 3. Insert appropriate relationships in lesson_quizzes

-- Example structure for lesson_quizzes (you'll need to adjust with actual IDs):
/*
INSERT INTO lesson_quizzes (lesson_id, question_id, display_order) VALUES
-- Budgeting Basics - Lesson 1
('lesson-id-1', 'question-id-1', 1),
('lesson-id-1', 'question-id-2', 2),
('lesson-id-1', 'question-id-3', 3),

-- Emergency Planning - Lesson 1  
('lesson-id-2', 'question-id-4', 1),
('lesson-id-2', 'question-id-5', 2),
('lesson-id-2', 'question-id-6', 3),

-- Credit Management - Lesson 1
('lesson-id-3', 'question-id-7', 1),
('lesson-id-3', 'question-id-8', 2),
('lesson-id-3', 'question-id-9', 3),

-- Financial Goal Setting
('lesson-id-4', 'question-id-10', 1),
('lesson-id-4', 'question-id-11', 2),

-- Building Good Financial Habits
('lesson-id-5', 'question-id-12', 1),
('lesson-id-5', 'question-id-13', 2);
*/

-- Verification query to check what we've added
SELECT 'Quiz questions added successfully!' as status;

-- To see the questions you just added:
-- SELECT * FROM quiz_questions ORDER BY created_at DESC LIMIT 20;
