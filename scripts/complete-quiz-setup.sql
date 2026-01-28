-- =============================================
-- COMPLETE QUIZ SETUP FOR ALL LESSONS
-- =============================================
-- This script adds quiz questions and links them to lessons
-- Run this in Supabase SQL Editor to activate quizzes for all lessons

-- Step 1: Add quiz questions for all major lesson topics
INSERT INTO quiz_questions (id, question_text, question_type, options, correct_answer, explanation, difficulty_level, created_at) VALUES
-- Budgeting Basics
('bq-001', 'What is the primary purpose of a budget?', 'multiple_choice', 
 '[{"id":"1","text":"To restrict spending","value":"a"},{"id":"2","text":"To plan and track your money","value":"b"},{"id":"3","text":"To save all your income","value":"d"},{"id":"4","text":"To eliminate all expenses","value":"c"}]', 
 'b', 'A budget helps you plan where your money goes and track your spending patterns, giving you control over your finances.', 'easy', NOW()),

('bq-002', 'Which budgeting method involves giving every dollar a job?', 'multiple_choice', 
 '[{"id":"1","text":"50/30/20 rule","value":"a"},{"id":"2","text":"Zero-based budgeting","value":"b"},{"id":"3","text":"Envelope method","value":"c"},{"id":"4","text":"Pay yourself first","value":"d"}]', 
 'b', 'Zero-based budgeting assigns every dollar of income to expenses, savings, or debt repayment, so your income minus expenses equals zero.', 'medium', NOW()),

('bq-003', 'What percentage of your income should typically go to needs according to the 50/30/20 rule?', 'multiple_choice', 
 '[{"id":"1","text":"20%","value":"a"},{"id":"2","text":"30%","value":"b"},{"id":"3","text":"50%","value":"c"},{"id":"4","text":"70%","value":"d"}]', 
 'c', 'The 50/30/20 rule suggests allocating 50% of after-tax income to needs (essentials like housing, food, utilities), 30% to wants, and 20% to savings and debt repayment.', 'easy', NOW()),

-- Emergency Planning
('eq-001', 'How many months of living expenses should you aim to have in an emergency fund?', 'multiple_choice', 
 '[{"id":"1","text":"1-2 months","value":"a"},{"id":"2","text":"3-6 months","value":"b"},{"id":"3","text":"12 months","value":"c"},{"id":"4","text":"24 months","value":"d"}]', 
 'b', 'Financial experts recommend having 3-6 months of living expenses saved for emergencies, though some people prefer more depending on their situation.', 'easy', NOW()),

('eq-002', 'Where should you typically keep your emergency fund?', 'multiple_choice', 
 '[{"id":"1","text":"Stock market investments","value":"a"},{"id":"2","text":"High-yield savings account","value":"b"},{"id":"3","text":"Real estate","value":"c"},{"id":"4","text":"Cryptocurrency","value":"d"}]', 
 'b', 'Emergency funds should be kept in liquid, safe accounts like high-yield savings accounts where you can access the money quickly without risk of loss.', 'medium', NOW()),

('eq-003', 'What is the first step in building an emergency fund?', 'multiple_choice', 
 '[{"id":"1","text":"Investing in stocks","value":"a"},{"id":"2","text":"Tracking expenses to find savings","value":"b"},{"id":"3","text":"Applying for credit cards","value":"c"},{"id":"4","text":"Buying insurance","value":"d"}]', 
 'b', 'Before you can save for emergencies, you need to understand where your money is currently going so you can identify areas to cut back and redirect to savings.', 'easy', NOW()),

-- Credit Management
('cq-001', 'What is a credit score primarily used for?', 'multiple_choice', 
 '[{"id":"1","text":"Tracking your spending","value":"a"},{"id":"2","text":"Determining loan eligibility and interest rates","value":"b"},{"id":"3","text":"Calculating your net worth","value":"c"},{"id":"4","text":"Budgeting your expenses","value":"d"}]', 
 'b', 'Credit scores are primarily used by lenders to assess your creditworthiness and determine whether to approve loans and what interest rates to offer.', 'easy', NOW()),

('cq-002', 'Which action has the biggest positive impact on your credit score?', 'multiple_choice', 
 '[{"id":"1","text":"Opening new credit cards","value":"a"},{"id":"2","text":"Paying bills on time","value":"b"},{"id":"3","text":"Closing old accounts","value":"c"},{"id":"4","text":"Using cash for all purchases","value":"d"}]', 
 'b', 'Payment history is the most important factor in credit scores, making up about 35% of your FICO score. Consistently paying bills on time has the largest positive impact.', 'medium', NOW()),

('cq-003', 'What is credit utilization?', 'multiple_choice', 
 '[{"id":"1","text":"The number of credit cards you have","value":"a"},{"id":"2","text":"The ratio of credit used to total available credit","value":"b"},{"id":"3","text":"Your total credit limit","value":"c"},{"id":"4","text":"The interest rate on your cards","value":"d"}]', 
 'b', 'Credit utilization is the percentage of your available credit that you''re currently using. It''s recommended to keep it below 30% for a healthy credit score.', 'medium', NOW()),

-- Financial Goal Setting
('gq-001', 'What makes a financial goal SMART?', 'multiple_choice', 
 '[{"id":"1","text":"Specific, Measurable, Achievable, Relevant, Time-bound","value":"a"},{"id":"2","text":"Simple, Money-oriented, Ambitious, Realistic, Timely","value":"b"},{"id":"3","text":"Strategic, Measurable, Actionable, Reasonable, Targeted","value":"c"},{"id":"4","text":"Structured, Meaningful, Attainable, Reachable, Defined","value":"d"}]', 
 'a', 'SMART goals are Specific, Measurable, Achievable, Relevant, and Time-bound. This framework helps create clear, actionable financial goals.', 'easy', NOW()),

('gq-002', 'What is the difference between short-term and long-term financial goals?', 'multiple_choice', 
 '[{"id":"1","text":"Amount of money involved","value":"a"},{"id":"2","text":"Time horizon for achievement","value":"b"},{"id":"3","text":"Type of investment needed","value":"c"},{"id":"4","text":"Level of difficulty","value":"d"}]', 
 'b', 'The main difference is the time horizon - short-term goals are typically under 1-2 years, while long-term goals are 5+ years away. This affects your savings and investment strategy.', 'medium', NOW()),

-- Building Good Financial Habits
('hq-001', 'What is the most effective way to build lasting financial habits?', 'multiple_choice', 
 '[{"id":"1","text":"Making big changes all at once","value":"a"},{"id":"2","text":"Starting small and being consistent","value":"b"},{"id":"3","text":"Waiting for the perfect time","value":"c"},{"id":"4","text":"Following complex systems","value":"d"}]', 
 'b', 'Research shows that starting with small, manageable changes and being consistent is more effective for building lasting habits than trying to make drastic changes overnight.', 'easy', NOW()),

('hq-002', 'How often should you typically review your budget?', 'multiple_choice', 
 '[{"id":"1","text":"Once a year","value":"a"},{"id":"2","text":"Monthly","value":"b"},{"id":"3","text":"Only when problems arise","value":"c"},{"id":"4","text":"Every few years","value":"d"}]', 
 'b', 'Monthly budget reviews help you stay on track, adjust for changes in income or expenses, and catch issues before they become problems.', 'medium', NOW()),

-- Understanding Paychecks
('pq-001', 'What is the difference between gross pay and net pay?', 'multiple_choice', 
 '[{"id":"1","text":"Gross pay is after taxes, net pay is before taxes","value":"a"},{"id":"2","text":"Gross pay is before taxes, net pay is after taxes","value":"b"},{"id":"3","text":"They are the same amount","value":"c"},{"id":"4","text":"Gross pay includes bonuses, net pay does not","value":"d"}]', 
 'b', 'Gross pay is your total earnings before any deductions like taxes, insurance, or retirement contributions. Net pay is what you actually take home after all deductions.', 'easy', NOW()),

('pq-002', 'What is FICA?', 'multiple_choice', 
 '[{"id":"1","text":"Federal income tax","value":"a"},{"id":"2","text":"State income tax","value":"b"},{"id":"3","text":"Social Security and Medicare taxes","value":"c"},{"id":"4","text":"Federal unemployment tax","value":"d"}]', 
 'c', 'FICA stands for Federal Insurance Contributions Act and includes Social Security (6.2%) and Medicare (1.45%) taxes that are deducted from your paycheck.', 'medium', NOW()),

-- Basic Financial Concepts
('fq-001', 'What is compound interest?', 'multiple_choice', 
 '[{"id":"1","text":"Interest calculated only on the principal amount","value":"a"},{"id":"2","text":"Interest calculated on principal plus accumulated interest","value":"b"},{"id":"3","text":"A fixed interest rate","value":"c"},{"id":"4":"text":"Interest paid monthly","value":"d"}]', 
 'b', 'Compound interest is interest calculated on both the principal amount and the accumulated interest from previous periods, allowing your money to grow exponentially over time.', 'medium', NOW()),

('fq-002', 'What is inflation?', 'multiple_choice', 
 '[{"id":"1","text":"The increase in your salary over time","value":"a"},{"id":"2","text":"The rate at which prices for goods and services rise","value":"b"},{"id":"3","text":"The decrease in stock prices","value":"c"},{"id":"4","text":"The interest rate on savings accounts","value":"d"}]', 
 'b', 'Inflation is the rate at which the general level of prices for goods and services is rising, and subsequently, purchasing power is falling.', 'easy', NOW());

-- Step 2: Create lesson_quizzes relationships
-- This links questions to specific lessons
-- Note: You'll need to update the lesson_ids based on your actual lessons table

INSERT INTO lesson_quizzes (lesson_id, question_id, display_order) VALUES
-- Budgeting Basics Lessons (assuming lesson IDs)
('budgeting-basics-1', 'bq-001', 1),
('budgeting-basics-1', 'bq-002', 2),
('budgeting-basics-1', 'bq-003', 3),

('budgeting-basics-2', 'bq-001', 1),
('budgeting-basics-2', 'bq-002', 2),
('budgeting-basics-2', 'bq-003', 3),

-- Emergency Planning Lessons
('emergency-planning-1', 'eq-001', 1),
('emergency-planning-1', 'eq-002', 2),
('emergency-planning-1', 'eq-003', 3),

('emergency-planning-2', 'eq-001', 1),
('emergency-planning-2', 'eq-002', 2),
('emergency-planning-2', 'eq-003', 3),

('emergency-planning-3', 'eq-001', 1),
('emergency-planning-3', 'eq-002', 2),
('emergency-planning-3', 'eq-003', 3),

-- Credit Management Lessons
('credit-management-1', 'cq-001', 1),
('credit-management-1', 'cq-002', 2),
('credit-management-1', 'cq-003', 3),

('credit-management-2', 'cq-001', 1),
('credit-management-2', 'cq-002', 2),
('credit-management-2', 'cq-003', 3),

-- Financial Goal Setting
('financial-goal-setting', 'gq-001', 1),
('financial-goal-setting', 'gq-002', 2),

-- Building Good Financial Habits
('building-good-financial-habits', 'hq-001', 1),
('building-good-financial-habits', 'hq-002', 2),

-- Understanding Paychecks
('understanding-paychecks', 'pq-001', 1),
('understanding-paychecks', 'pq-002', 2),

-- Basic Financial Concepts
('basic-financial-concepts', 'fq-001', 1),
('basic-financial-concepts', 'fq-002', 2)
ON CONFLICT (lesson_id, question_id) DO NOTHING;

-- Step 3: Verification queries
SELECT 'Quiz setup completed successfully!' as status;

-- To verify the questions were added:
-- SELECT COUNT(*) as total_questions FROM quiz_questions;

-- To verify the lesson relationships:
-- SELECT COUNT(*) as total_lesson_quizzes FROM lesson_quizzes;

-- To see which lessons now have quizzes:
-- SELECT DISTINCT lq.lesson_id, l.title 
-- FROM lesson_quizzes lq
-- JOIN lessons l ON l.id = lq.lesson_id
-- ORDER BY l.title;
