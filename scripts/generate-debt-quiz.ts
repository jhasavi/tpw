/**
 * Generate more quiz questions - Category 8: Debt Management
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const debtQuestions = [
  {
    question: "What is the 'debt avalanche' method?",
    options: [
      "Paying off debts from highest to lowest interest rate",
      "Paying off debts from smallest to largest balance",
      "Consolidating all debts into one payment",
      "Only paying minimum payments"
    ],
    correct_answer: 0,
    explanation: "The debt avalanche method prioritizes high-interest debt first to minimize total interest paid.",
    difficulty: 'intermediate',
    category: 'Debt Management'
  },
  {
    question: "What is the 'debt snowball' method?",
    options: [
      "Paying off debts from highest interest rate first",
      "Paying off debts from smallest to largest balance",
      "Negotiating lower interest rates",
      "Declaring bankruptcy"
    ],
    correct_answer: 1,
    explanation: "The debt snowball method starts with the smallest debt for psychological wins and motivation.",
    difficulty: 'beginner',
    category: 'Debt Management'
  },
  {
    question: "What is a good debt-to-income ratio?",
    options: [
      "Below 36%",
      "Below 50%",
      "Below 70%",
      "Below 90%"
    ],
    correct_answer: 0,
    explanation: "Lenders prefer a debt-to-income ratio below 36%, with 28% or less being ideal.",
    difficulty: 'intermediate',
    category: 'Debt Management'
  },
  {
    question: "What should you prioritize paying off first?",
    options: [
      "Credit card debt",
      "Mortgage",
      "Student loans",
      "Car loan"
    ],
    correct_answer: 0,
    explanation: "Credit cards typically have the highest interest rates (15-25%), costing you the most.",
    difficulty: 'beginner',
    category: 'Debt Management'
  },
  {
    question: "What is debt consolidation?",
    options: [
      "Ignoring all debts",
      "Combining multiple debts into a single loan",
      "Filing for bankruptcy",
      "Negotiating with creditors"
    ],
    correct_answer: 1,
    explanation: "Debt consolidation combines multiple debts into one loan, often with a lower interest rate.",
    difficulty: 'intermediate',
    category: 'Debt Management'
  },
  {
    question: "How long does a bankruptcy stay on your credit report?",
    options: [
      "3 years",
      "5 years",
      "7-10 years",
      "Forever"
    ],
    correct_answer: 2,
    explanation: "Chapter 7 bankruptcy stays for 10 years, Chapter 13 for 7 years on your credit report.",
    difficulty: 'advanced',
    category: 'Debt Management'
  },
  {
    question: "What is the minimum payment trap?",
    options: [
      "Paying minimum amounts keeps you in debt longer with more interest",
      "Paying more than minimum is illegal",
      "Minimum payments improve credit scores faster",
      "It's the fastest way to pay off debt"
    ],
    correct_answer: 0,
    explanation: "Paying only minimums extends your debt duration and maximizes interest paid to creditors.",
    difficulty: 'intermediate',
    category: 'Debt Management'
  },
  {
    question: "What is a balance transfer?",
    options: [
      "Moving debt from one card to another, often with 0% intro APR",
      "Splitting payments between cards",
      "Closing credit card accounts",
      "Increasing credit limits"
    ],
    correct_answer: 0,
    explanation: "Balance transfers move debt to a new card with lower interest, typically 0% for 12-18 months.",
    difficulty: 'intermediate',
    category: 'Debt Management'
  },
  {
    question: "What does APR stand for?",
    options: [
      "Annual Percentage Rate",
      "Average Payment Ratio",
      "Account Payment Record",
      "Automatic Payment Requirement"
    ],
    correct_answer: 0,
    explanation: "APR is Annual Percentage Rate - the yearly interest rate charged on borrowed money.",
    difficulty: 'beginner',
    category: 'Debt Management'
  },
  {
    question: "When is debt consolidation a good idea?",
    options: [
      "Always",
      "When you can get a lower interest rate and won't accumulate new debt",
      "Never",
      "Only when filing for bankruptcy"
    ],
    correct_answer: 1,
    explanation: "Consolidation works if you get lower interest AND address the spending habits that caused debt.",
    difficulty: 'intermediate',
    category: 'Debt Management'
  }
]

async function addQuestions() {
  console.log('📝 Adding Debt Management quiz questions...\n')

  let created = 0
  let skipped = 0

  for (const q of debtQuestions) {
    const { data: existing } = await supabase
      .from('quiz_questions')
      .select('id')
      .eq('question_text', q.question)
      .single()

    if (existing) {
      console.log(`⏭️  Skipped (exists): ${q.question.substring(0, 50)}...`)
      skipped++
      continue
    }

    const { error } = await supabase
      .from('quiz_questions')
      .insert({
        question_text: q.question,
        options: q.options,
        correct_answer: q.correct_answer,
        explanation: q.explanation,
        difficulty_level: q.difficulty,
        topics: [q.category]
      })

    if (error) {
      console.log(`❌ Error: ${q.question.substring(0, 50)}...`)
      console.log(`   ${error.message}`)
      skipped++
    } else {
      console.log(`✅ ${q.question}`)
      created++
    }
  }

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━`)
  console.log(`✅ Created: ${created}`)
  console.log(`⏭️  Skipped: ${skipped}`)
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━\n`)
}

addQuestions().catch(console.error)
