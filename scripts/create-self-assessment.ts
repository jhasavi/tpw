/**
 * Create Self-Assessment Quiz Questions
 * Initial assessment to help users find their starting point
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

// Self-assessment questions to gauge user's financial literacy level
const selfAssessmentQuestions = [
  {
    question_text: 'Do you currently track your monthly income and expenses?',
    question_type: 'multiple_choice',
    options: JSON.stringify([
      'Yes, I track everything in detail',
      'I have a rough idea but don\'t track formally',
      'No, I don\'t track my finances',
      'What does tracking mean?'
    ]),
    correct_answer: JSON.stringify(0),
    explanation: 'Tracking income and expenses is the foundation of financial health. It helps you understand where your money goes and make informed decisions.',
    difficulty_level: 'easy',
    topics: ['Budgeting Basics']
  },
  {
    question_text: 'How often do you review your budget?',
    question_type: 'multiple_choice',
    options: JSON.stringify([
      'Weekly or monthly',
      'Every few months',
      'Once a year',
      'I don\'t have a budget'
    ]),
    correct_answer: JSON.stringify(0),
    explanation: 'Regular budget reviews (weekly or monthly) help you stay on track and adjust to changing circumstances.',
    difficulty_level: 'easy',
    topics: ['Budgeting Basics']
  },
  {
    question_text: 'Do you have an emergency fund?',
    question_type: 'multiple_choice',
    options: JSON.stringify([
      'Yes, 6+ months of expenses saved',
      'Yes, but less than 3 months',
      'I\'m working on building one',
      'No, I don\'t have emergency savings'
    ]),
    correct_answer: JSON.stringify(0),
    explanation: 'Financial experts recommend having 3-6 months of expenses in an emergency fund for unexpected situations.',
    difficulty_level: 'easy',
    topics: ['Saving & Emergency Funds']
  },
  {
    question_text: 'What percentage of your income do you save each month?',
    question_type: 'multiple_choice',
    options: JSON.stringify([
      '20% or more',
      '10-19%',
      '1-9%',
      'I don\'t save regularly'
    ]),
    correct_answer: JSON.stringify(0),
    explanation: 'The 50/30/20 rule suggests saving at least 20% of your income. Any amount saved is better than nothing!',
    difficulty_level: 'easy',
    topics: ['Saving & Emergency Funds']
  },
  {
    question_text: 'Do you know your credit score?',
    question_type: 'multiple_choice',
    options: JSON.stringify([
      'Yes, and I check it regularly',
      'Yes, but I don\'t check often',
      'I checked it once',
      'No, I don\'t know my credit score'
    ]),
    correct_answer: JSON.stringify(0),
    explanation: 'Knowing your credit score helps you understand your financial health and qualify for better loan terms.',
    difficulty_level: 'easy',
    topics: ['Credit & Debt Management']
  },
  {
    question_text: 'How do you manage credit card payments?',
    question_type: 'multiple_choice',
    options: JSON.stringify([
      'I pay off the full balance monthly',
      'I pay more than the minimum',
      'I pay the minimum amount',
      'I don\'t have a credit card / I miss payments sometimes'
    ]),
    correct_answer: JSON.stringify(0),
    explanation: 'Paying the full balance monthly avoids interest charges and builds good credit history.',
    difficulty_level: 'easy',
    topics: ['Credit & Debt Management']
  },
  {
    question_text: 'Are you currently investing for retirement?',
    question_type: 'multiple_choice',
    options: JSON.stringify([
      'Yes, I contribute regularly to a retirement account',
      'Yes, but not consistently',
      'I plan to start soon',
      'No, I haven\'t started'
    ]),
    correct_answer: JSON.stringify(0),
    explanation: 'Starting early with retirement investing leverages compound interest and gives your money more time to grow.',
    difficulty_level: 'medium',
    topics: ['Investing & Retirement']
  },
  {
    question_text: 'What is your understanding of compound interest?',
    question_type: 'multiple_choice',
    options: JSON.stringify([
      'I understand it well and use it in my planning',
      'I have a basic understanding',
      'I\'ve heard of it but don\'t really understand',
      'What is compound interest?'
    ]),
    correct_answer: JSON.stringify(0),
    explanation: 'Compound interest is "interest on interest" - a powerful force that helps your money grow exponentially over time.',
    difficulty_level: 'medium',
    topics: ['Investing & Retirement']
  },
  {
    question_text: 'Do you have adequate insurance coverage? (health, life, etc.)',
    question_type: 'multiple_choice',
    options: JSON.stringify([
      'Yes, I have comprehensive coverage',
      'Yes, but I\'m not sure if it\'s adequate',
      'I have some basic coverage',
      'No, I don\'t have insurance'
    ]),
    correct_answer: JSON.stringify(0),
    explanation: 'Insurance protects you and your family from financial catastrophe due to unexpected events.',
    difficulty_level: 'medium',
    topics: ['Insurance & Protection']
  },
  {
    question_text: 'Have you set specific financial goals for the next 1-5 years?',
    question_type: 'multiple_choice',
    options: JSON.stringify([
      'Yes, I have written SMART goals',
      'Yes, but they\'re not very specific',
      'I have some ideas but nothing formal',
      'No, I haven\'t set financial goals'
    ]),
    correct_answer: JSON.stringify(0),
    explanation: 'Setting SMART (Specific, Measurable, Achievable, Relevant, Time-bound) goals increases your likelihood of success.',
    difficulty_level: 'easy',
    topics: ['Financial Goals']
  },
  {
    question_text: 'Do you understand your tax obligations and deductions?',
    question_type: 'multiple_choice',
    options: JSON.stringify([
      'Yes, I plan for taxes and maximize deductions',
      'I have basic understanding',
      'I rely on others to handle taxes',
      'I don\'t understand taxes well'
    ]),
    correct_answer: JSON.stringify(0),
    explanation: 'Understanding taxes helps you keep more of your money through legal deductions and proper planning.',
    difficulty_level: 'medium',
    topics: ['Tax Planning']
  },
  {
    question_text: 'Do you have a will or estate plan?',
    question_type: 'multiple_choice',
    options: JSON.stringify([
      'Yes, and I update it regularly',
      'Yes, but it\'s outdated',
      'I\'m planning to create one',
      'No, I don\'t have one'
    ]),
    correct_answer: JSON.stringify(0),
    explanation: 'An estate plan ensures your assets are distributed according to your wishes and can reduce tax burden on heirs.',
    difficulty_level: 'hard',
    topics: ['Estate Planning']
  },
  {
    question_text: 'How familiar are you with different investment types? (stocks, bonds, real estate, etc.)',
    question_type: 'multiple_choice',
    options: JSON.stringify([
      'Very familiar, I have a diversified portfolio',
      'Somewhat familiar, I invest in a few types',
      'Not very familiar, I stick to basics',
      'Not familiar at all'
    ]),
    correct_answer: JSON.stringify(0),
    explanation: 'Understanding various investment types helps you build a diversified portfolio suited to your risk tolerance and goals.',
    difficulty_level: 'medium',
    topics: ['Investment Knowledge']
  },
  {
    question_text: 'Are you financially independent or working toward it?',
    question_type: 'multiple_choice',
    options: JSON.stringify([
      'Yes, I am financially independent',
      'I\'m working toward it with a plan',
      'I want to be but don\'t have a plan',
      'I haven\'t thought about it'
    ]),
    correct_answer: JSON.stringify(0),
    explanation: 'Financial independence means having enough passive income to cover your living expenses without working.',
    difficulty_level: 'hard',
    topics: ['Financial Independence']
  },
  {
    question_text: 'How confident do you feel about making financial decisions?',
    question_type: 'multiple_choice',
    options: JSON.stringify([
      'Very confident, I research and decide independently',
      'Somewhat confident, but I sometimes need help',
      'Not very confident, I often need guidance',
      'Not confident at all, money stresses me out'
    ]),
    correct_answer: JSON.stringify(0),
    explanation: 'Building financial confidence comes from education and experience. Everyone starts somewhere!',
    difficulty_level: 'easy',
    topics: ['Money Mindset']
  }
]

async function createSelfAssessment() {
  console.log('🎯 Creating Self-Assessment Quiz...\\n')

  // Create or get self-assessment lesson
  const { data: lesson, error: lessonError } = await supabase
    .from('lessons')
    .select('id')
    .eq('slug', 'self-assessment')
    .single()

  if (lessonError && lessonError.code !== 'PGRST116') {
    console.error('Error checking for self-assessment lesson:', lessonError)
    return
  }

  let lessonId: string

  if (!lesson) {
    console.log('Creating self-assessment lesson...')
    
    // Get Women's Financial Literacy curriculum
    const { data: curriculum } = await supabase
      .from('curricula')
      .select('id')
      .eq('slug', 'womens-financial-literacy')
      .single()

    if (!curriculum) {
      console.error('Women\'s Financial Literacy curriculum not found')
      return
    }

    // Get Financial Literacy Basics course
    const { data: course } = await supabase
      .from('courses')
      .select('id')
      .eq('slug', 'financial-literacy-basics')
      .eq('curriculum_id', curriculum.id)
      .single()

    if (!course) {
      console.error('Financial Literacy Basics course not found')
      return
    }

    // Create self-assessment lesson
    const { data: newLesson, error: createError } = await supabase
      .from('lessons')
      .insert({
        course_id: course.id,
        title: 'Self-Assessment: Find Your Starting Point',
        slug: 'self-assessment',
        description: 'Take this quick assessment to understand your current financial literacy level and get personalized course recommendations.',
        content: {
          markdown: `# Financial Literacy Self-Assessment

Welcome to The Purple Wings! This self-assessment will help you:

- Understand your current financial knowledge level
- Identify areas where you're doing great
- Discover opportunities for growth
- Get personalized course recommendations

## How It Works

1. **Answer honestly** - There are no wrong answers!
2. **Take your time** - This isn't a test, it's a tool
3. **Review your results** - See where you stand
4. **Get recommendations** - Find courses perfect for your level

## Scoring Guide

- **130-150 points**: Advanced - You have strong financial knowledge!
- **100-129 points**: Intermediate - You have good foundations, ready to level up
- **70-99 points**: Developing - You're building important skills
- **Below 70 points**: Beginner - Perfect! You're in the right place to start learning

Ready? Let's begin!`
        },
        display_order: 0,
        duration_minutes: 15
      })
      .select('id')
      .single()

    if (createError) {
      console.error('Error creating self-assessment lesson:', createError)
      return
    }

    lessonId = newLesson.id
    console.log('✅ Created self-assessment lesson')
  } else {
    lessonId = lesson.id
    console.log('✅ Using existing self-assessment lesson')
  }

  // Create quiz questions
  console.log('\\nCreating quiz questions...')
  
  for (const question of selfAssessmentQuestions) {
    const { data: existingQ, error: checkError } = await supabase
      .from('quiz_questions')
      .select('id')
      .eq('question_text', question.question_text)
      .maybeSingle()

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking question:', checkError)
      continue
    }

    if (existingQ) {
      console.log(`  ⏭️  Question already exists: "${question.question_text.substring(0, 50)}..."`)
      continue
    }

    const { data: newQuestion, error: questionError } = await supabase
      .from('quiz_questions')
      .insert({
        ...question,
        created_at: new Date().toISOString()
      })
      .select('id')
      .single()

    if (questionError) {
      console.error(`  ❌ Error creating question: ${question.question_text}`, questionError)
      continue
    }

    // Link question to lesson
    const { error: linkError } = await supabase
      .from('lesson_quizzes')
      .insert({
        lesson_id: lessonId,
        question_id: newQuestion.id,
        created_at: new Date().toISOString()
      })

    if (linkError) {
      console.error(`  ❌ Error linking question to lesson`, linkError)
      continue
    }

    console.log(`  ✅ Created: "${question.question_text.substring(0, 60)}..."`)
  }

  console.log('\n📊 Summary:')
  console.log(`  Total questions created: ${selfAssessmentQuestions.length}`)
  console.log(`  Topics covered: ${new Set(selfAssessmentQuestions.flatMap(q => q.topics)).size}`)
  console.log(`  Lesson ID: ${lessonId}`)
  console.log('\n🎉 Self-assessment quiz created successfully!')
  console.log('\n💡 Next steps:')
  console.log('  1. Navigate to /learn/womens-financial-literacy/financial-literacy-basics/self-assessment')
  console.log('  2. Take the assessment')
  console.log('  3. Review your score and recommendations')
}

createSelfAssessment()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Fatal error:', error)
    process.exit(1)
  })
