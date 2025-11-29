/**
 * Create Quiz Questions for All Beginner Lessons
 * Generates 5-10 questions per lesson for Financial Literacy Basics, Budgeting Basics, Emergency Planning, and Credit Management
 */

import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

// Quiz questions organized by lesson slug
const quizQuestions = {
  // FINANCIAL LITERACY BASICS
  'basic-financial-concepts': [
    {
      question_text: 'What is the difference between gross income and net income?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Gross is what you earn after taxes, net is before taxes', value: 'a' },
        { id: 'b', text: 'Gross is before deductions, net is what you actually take home', value: 'b' },
        { id: 'c', text: 'There is no difference', value: 'c' },
        { id: 'd', text: 'Gross is from your job, net includes investments', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'Gross income is your total earnings before any deductions (taxes, insurance, retirement). Net income is what actually hits your bank account after all deductions—this is what you have available to spend.',
      difficulty_level: 'easy',
      topics: ['income', 'financial basics']
    },
    {
      question_text: 'Which of these is considered a FIXED expense?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Groceries', value: 'a' },
        { id: 'b', text: 'Entertainment', value: 'b' },
        { id: 'c', text: 'Rent or mortgage payment', value: 'c' },
        { id: 'd', text: 'Restaurant meals', value: 'd' }
      ],
      correct_answer: 'c',
      explanation: 'Fixed expenses stay the same each month, like rent/mortgage, car payment, or insurance. Variable expenses like groceries, entertainment, and dining out change month to month.',
      difficulty_level: 'easy',
      topics: ['expenses', 'budgeting']
    },
    {
      question_text: 'What is an asset?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Money you owe to others', value: 'a' },
        { id: 'b', text: 'Something of value that you own', value: 'b' },
        { id: 'c', text: 'Your monthly expenses', value: 'c' },
        { id: 'd', text: 'Your credit card balance', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'An asset is anything of value that you own—savings account, car, home, investments. Money you owe is a liability, not an asset.',
      difficulty_level: 'easy',
      topics: ['assets', 'financial basics']
    },
    {
      question_text: 'What does positive cash flow mean?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'You have cash in your wallet', value: 'a' },
        { id: 'b', text: 'You earn more than you spend each month', value: 'b' },
        { id: 'c', text: 'You have a checking account', value: 'c' },
        { id: 'd', text: 'You use credit cards for purchases', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'Positive cash flow means more money comes in than goes out each month. This is essential for saving and building wealth. Negative cash flow means you\'re spending more than you earn—a path to debt.',
      difficulty_level: 'medium',
      topics: ['cash flow', 'budgeting']
    },
    {
      question_text: 'True or False: Your net worth is calculated by subtracting your liabilities from your assets.',
      question_type: 'true_false',
      options: [
        { id: 'true', text: 'True', value: 'true' },
        { id: 'false', text: 'False', value: 'false' }
      ],
      correct_answer: 'true',
      explanation: 'True! Net worth = Assets - Liabilities. If you have $15,000 in savings and a car worth $10,000 (assets = $25,000) but owe $8,000 in student loans (liabilities), your net worth is $17,000.',
      difficulty_level: 'medium',
      topics: ['net worth', 'financial basics']
    },
    {
      question_text: 'Which expense category typically takes the largest percentage of a budget?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Entertainment', value: 'a' },
        { id: 'b', text: 'Housing (rent/mortgage)', value: 'b' },
        { id: 'c', text: 'Clothing', value: 'c' },
        { id: 'd', text: 'Phone bill', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'Housing is typically the largest expense, often 25-35% of income. This is why the "30% rule" (don\'t spend more than 30% of gross income on housing) exists.',
      difficulty_level: 'easy',
      topics: ['housing', 'budgeting']
    }
  ],

  'financial-goal-setting': [
    {
      question_text: 'What does the "S" in SMART goals stand for?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Simple', value: 'a' },
        { id: 'b', text: 'Specific', value: 'b' },
        { id: 'c', text: 'Strategic', value: 'c' },
        { id: 'd', text: 'Standardized', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'SMART stands for Specific, Measurable, Achievable, Relevant, and Time-bound. Specific means clearly defining what you want to accomplish instead of vague goals like "save money."',
      difficulty_level: 'easy',
      topics: ['goal setting', 'SMART goals']
    },
    {
      question_text: 'Which is an example of a short-term financial goal?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Saving $500 for car insurance due in 3 months', value: 'a' },
        { id: 'b', text: 'Saving for retirement in 30 years', value: 'b' },
        { id: 'c', text: 'Buying a house in 10 years', value: 'c' },
        { id: 'd', text: 'Paying off student loans over 8 years', value: 'd' }
      ],
      correct_answer: 'a',
      explanation: 'Short-term goals are typically achievable within 1 year. Saving $500 in 3 months is a perfect short-term goal. Retirement and house down payments are long-term (5+ years).',
      difficulty_level: 'easy',
      topics: ['goal setting', 'timeframes']
    },
    {
      question_text: 'What is a common mistake when setting financial goals?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Writing them down', value: 'a' },
        { id: 'b', text: 'Making them too vague or unrealistic', value: 'b' },
        { id: 'c', text: 'Reviewing them regularly', value: 'c' },
        { id: 'd', text: 'Sharing them with a friend for accountability', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'Vague goals like "save more" or unrealistic ones like "save $50,000 next month on a $30,000 salary" set you up for failure. Goals should be specific, measurable, and achievable.',
      difficulty_level: 'medium',
      topics: ['goal setting', 'common mistakes']
    },
    {
      question_text: 'True or False: You should only focus on one financial goal at a time.',
      question_type: 'true_false',
      options: [
        { id: 'true', text: 'True', value: 'true' },
        { id: 'false', text: 'False', value: 'false' }
      ],
      correct_answer: 'false',
      explanation: 'False! You can work on multiple goals simultaneously by prioritizing and allocating money to each. For example, save $100/month for emergency fund AND $50/month for vacation. Balance is key.',
      difficulty_level: 'medium',
      topics: ['goal setting', 'prioritization']
    },
    {
      question_text: 'What should you do if you don\'t reach a financial goal by the deadline?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Give up completely', value: 'a' },
        { id: 'b', text: 'Reassess and adjust the timeline or approach', value: 'b' },
        { id: 'c', text: 'Feel like a failure and avoid setting future goals', value: 'c' },
        { id: 'd', text: 'Pretend the goal never existed', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'Missing a deadline doesn\'t mean failure—it means you need to reassess. Maybe the timeline was too aggressive, your approach needs adjusting, or life circumstances changed. Adjust and keep going!',
      difficulty_level: 'medium',
      topics: ['goal setting', 'flexibility']
    }
  ],

  'building-good-financial-habits': [
    {
      question_text: 'What is the "pay yourself first" strategy?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Spending money on yourself before paying bills', value: 'a' },
        { id: 'b', text: 'Putting money into savings before spending on anything else', value: 'b' },
        { id: 'c', text: 'Paying yourself a salary if you\'re self-employed', value: 'c' },
        { id: 'd', text: 'Taking money out of savings for fun purchases', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'Pay yourself first means treating savings as your #1 "bill"—move money to savings when you get paid, before spending on anything else. This ensures you actually save instead of saving "whatever\'s left" (usually nothing).',
      difficulty_level: 'easy',
      topics: ['saving', 'habits']
    },
    {
      question_text: 'How long does it typically take to form a new habit?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: '3 days', value: 'a' },
        { id: 'b', text: '1 week', value: 'b' },
        { id: 'c', text: '21-66 days depending on complexity', value: 'c' },
        { id: 'd', text: '6 months', value: 'd' }
      ],
      correct_answer: 'c',
      explanation: 'Research shows habit formation takes 21-66 days depending on the complexity of the habit. Simple habits (drinking water) form faster than complex ones (exercising daily). Be patient with yourself!',
      difficulty_level: 'medium',
      topics: ['habits', 'psychology']
    },
    {
      question_text: 'What is habit stacking?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Trying to form many habits at once', value: 'a' },
        { id: 'b', text: 'Attaching a new habit to an existing one', value: 'b' },
        { id: 'c', text: 'Writing down all your habits', value: 'c' },
        { id: 'd', text: 'Doing habits in a specific order', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'Habit stacking means linking a new habit to an existing one. Example: "After I pour my morning coffee (existing habit), I will transfer $5 to savings (new habit)." The existing habit becomes the trigger.',
      difficulty_level: 'medium',
      topics: ['habits', 'behavior change']
    },
    {
      question_text: 'True or False: Automating savings removes the need for willpower.',
      question_type: 'true_false',
      options: [
        { id: 'true', text: 'True', value: 'true' },
        { id: 'false', text: 'False', value: 'false' }
      ],
      correct_answer: 'true',
      explanation: 'True! When savings happen automatically (like auto-transfer on payday), you don\'t have to decide to save—it just happens. This removes the willpower battle and makes saving effortless.',
      difficulty_level: 'easy',
      topics: ['automation', 'saving']
    },
    {
      question_text: 'What is a "money date"?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Taking someone out to an expensive restaurant', value: 'a' },
        { id: 'b', text: 'A scheduled time to review your finances', value: 'b' },
        { id: 'c', text: 'The day your paycheck arrives', value: 'c' },
        { id: 'd', text: 'A date with your banker', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'A money date is a regular appointment with yourself (weekly or monthly) to review your spending, check your budget, and make financial decisions. It builds awareness and accountability.',
      difficulty_level: 'easy',
      topics: ['habits', 'budgeting']
    },
    {
      question_text: 'Which approach is better for building financial habits?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Start with 10 major changes all at once', value: 'a' },
        { id: 'b', text: 'Start with one tiny habit and build from there', value: 'b' },
        { id: 'c', text: 'Wait until you\'re motivated to make changes', value: 'c' },
        { id: 'd', text: 'Only make changes during New Year\'s', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'Start small! One tiny habit that succeeds builds confidence and momentum. Trying to change everything at once leads to overwhelm and giving up. Master one habit, then add another.',
      difficulty_level: 'easy',
      topics: ['habits', 'behavior change']
    }
  ],

  'understanding-paychecks': [
    {
      question_text: 'What is the difference between gross pay and net pay?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'There is no difference', value: 'a' },
        { id: 'b', text: 'Gross pay is before deductions, net pay is after', value: 'b' },
        { id: 'c', text: 'Net pay is what you earn, gross is what you take home', value: 'c' },
        { id: 'd', text: 'Gross pay includes bonuses, net does not', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'Gross pay is your total earnings before any deductions. Net pay (take-home pay) is what remains after federal tax, state tax, FICA, and other deductions. Always budget based on net pay, not gross.',
      difficulty_level: 'easy',
      topics: ['paychecks', 'income']
    },
    {
      question_text: 'What does FICA stand for?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Federal Income Credit Amount', value: 'a' },
        { id: 'b', text: 'Federal Insurance Contributions Act', value: 'b' },
        { id: 'c', text: 'Financial Income and Career Assistance', value: 'c' },
        { id: 'd', text: 'Federal Individual Credit Account', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'FICA = Federal Insurance Contributions Act. It funds Social Security (6.2%) and Medicare (1.45%). Every employee pays 7.65% total, and your employer matches it. It appears on every paycheck.',
      difficulty_level: 'medium',
      topics: ['taxes', 'paychecks']
    },
    {
      question_text: 'Which paycheck deduction goes into a tax-advantaged retirement account?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Federal income tax', value: 'a' },
        { id: 'b', text: 'FICA', value: 'b' },
        { id: 'c', text: '401(k) contribution', value: 'c' },
        { id: 'd', text: 'Health insurance premium', value: 'd' }
      ],
      correct_answer: 'c',
      explanation: '401(k) contributions go directly into your retirement account before taxes (if traditional 401k). This reduces your taxable income now and grows tax-deferred until retirement.',
      difficulty_level: 'medium',
      topics: ['retirement', 'paychecks']
    },
    {
      question_text: 'True or False: Pre-tax deductions reduce your taxable income.',
      question_type: 'true_false',
      options: [
        { id: 'true', text: 'True', value: 'true' },
        { id: 'false', text: 'False', value: 'false' }
      ],
      correct_answer: 'true',
      explanation: 'True! Pre-tax deductions (like traditional 401k, HSA, some health insurance) are subtracted before calculating income tax. This lowers your tax bill. Post-tax deductions (like Roth 401k) are taken after taxes.',
      difficulty_level: 'medium',
      topics: ['taxes', 'deductions']
    },
    {
      question_text: 'If your gross pay is $3,000 and total deductions are $750, what is your net pay?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: '$3,000', value: 'a' },
        { id: 'b', text: '$2,250', value: 'b' },
        { id: 'c', text: '$3,750', value: 'c' },
        { id: 'd', text: '$750', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'Net pay = Gross pay - Deductions. $3,000 - $750 = $2,250 take-home pay. This is the actual amount deposited in your account and available to spend.',
      difficulty_level: 'easy',
      topics: ['paychecks', 'calculation']
    }
  ]
}

async function createQuizQuestions() {
  console.log('🎯 Creating beginner quiz questions...\\n')

  let totalCreated = 0
  let totalErrors = 0

  // Get curriculum
  const { data: curriculum } = await supabase
    .from('curricula')
    .select('id')
    .eq('slug', 'womens-financial-literacy')
    .single()

  if (!curriculum) {
    console.error('❌ Could not find curriculum')
    return
  }

  // Process each lesson's questions
  for (const [lessonSlug, questions] of Object.entries(quizQuestions)) {
    console.log(`\\n📚 Processing ${lessonSlug}...`)

    // Find the lesson
    const { data: lesson } = await supabase
      .from('lessons')
      .select('id, title, course_id')
      .eq('slug', lessonSlug)
      .single()

    if (!lesson) {
      console.log(`  ⚠️  Lesson ${lessonSlug} not found, skipping`)
      continue
    }

    // Insert each question
    for (const q of questions) {
      // Insert question
      const { data: question, error: qError } = await supabase
        .from('quiz_questions')
        .insert({
          question_text: q.question_text,
          question_type: q.question_type,
          options: q.options,
          correct_answer: q.correct_answer,
          explanation: q.explanation,
          difficulty_level: q.difficulty_level,
          topics: q.topics
        })
        .select()
        .single()

      if (qError) {
        console.error(`  ❌ Error creating question: ${qError.message}`)
        totalErrors++
        continue
      }

      // Link question to lesson
      const { error: linkError } = await supabase
        .from('lesson_quizzes')
        .insert({
          lesson_id: lesson.id,
          question_id: question.id,
          display_order: totalCreated + 1
        })

      if (linkError) {
        console.error(`  ❌ Error linking question: ${linkError.message}`)
        totalErrors++
      } else {
        totalCreated++
        console.log(`  ✅ "${q.question_text.substring(0, 50)}..."`)
      }
    }

    console.log(`  📊 Created ${questions.length} questions for ${lesson.title}`)
  }

  console.log(`\\n\\n✨ Summary:`)
  console.log(`  📝 Total questions created: ${totalCreated}`)
  console.log(`  ❌ Total errors: ${totalErrors}`)
  console.log(`  📚 Lessons with quizzes: ${Object.keys(quizQuestions).length}`)
}

createQuizQuestions()
