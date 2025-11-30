/**
 * Generate comprehensive quiz bank - Multiple categories
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const questions = [
  // Insurance questions
  {
    question_text: "What is a deductible in insurance?",
    options: ["The monthly payment", "Amount you pay before insurance kicks in", "Maximum coverage limit", "Annual premium"],
    correct_answer: 1,
    explanation: "A deductible is the amount you must pay out-of-pocket before your insurance begins to cover costs.",
    difficulty_level: 'beginner',
    topics: ['Insurance']
  },
  {
    question_text: "Which type of life insurance is typically cheaper?",
    options: ["Whole life", "Universal life", "Term life", "Variable life"],
    correct_answer: 2,
    explanation: "Term life insurance is the cheapest option as it only covers you for a specific period with no cash value.",
    difficulty_level: 'intermediate',
    topics: ['Insurance', 'Life Insurance']
  },
  {
    question_text: "What does liability insurance cover?",
    options: ["Your own injuries", "Damage to your car", "Damage you cause to others", "Theft of your property"],
    correct_answer: 2,
    explanation: "Liability insurance covers damage or injury you cause to other people or their property.",
    difficulty_level: 'beginner',
    topics: ['Insurance', 'Auto Insurance']
  },
  
  // Investing questions
  {
    question_text: "What is dollar-cost averaging?",
    options: ["Buying stocks at their lowest price", "Investing the same amount regularly regardless of price", "Selling when prices drop", "Only investing in dollar stores"],
    correct_answer: 1,
    explanation: "Dollar-cost averaging means investing a fixed amount regularly, buying more shares when prices are low and fewer when high.",
    difficulty_level: 'intermediate',
    topics: ['Investing', 'Investment Strategies']
  },
  {
    question_text: "What is the main advantage of a Roth IRA?",
    options: ["Tax deduction now", "Tax-free withdrawals in retirement", "No contribution limits", "Guaranteed returns"],
    correct_answer: 1,
    explanation: "Roth IRA contributions are taxed now, but all withdrawals in retirement are completely tax-free.",
    difficulty_level: 'intermediate',
    topics: ['Investing', 'Retirement']
  },
  {
    question_text: "What does P/E ratio stand for in stock investing?",
    options: ["Profit/Equity", "Price/Earnings", "Premium/Exchange", "Portfolio/Efficiency"],
    correct_answer: 1,
    explanation: "P/E (Price-to-Earnings) ratio compares stock price to earnings per share, indicating if a stock is over/undervalued.",
    difficulty_level: 'advanced',
    topics: ['Investing', 'Stocks']
  },
  {
    question_text: "What is compound interest?",
    options: ["Interest charged on loans", "Interest earned on interest", "Complex interest calculations", "Interest paid monthly"],
    correct_answer: 1,
    explanation: "Compound interest means earning interest on your initial investment plus accumulated interest from previous periods.",
    difficulty_level: 'beginner',
    topics: ['Investing', 'Savings']
  },
  {
    question_text: "What is a dividend?",
    options: ["Stock price increase", "Company profit shared with shareholders", "Investment fee", "Trading commission"],
    correct_answer: 1,
    explanation: "Dividends are portions of company profits paid to shareholders, usually quarterly.",
    difficulty_level: 'beginner',
    topics: ['Investing', 'Stocks']
  },
  
  // Budgeting questions
  {
    question_text: "What is the envelope budgeting method?",
    options: ["Mailing bills in envelopes", "Allocating cash to categories in physical envelopes", "Digital budgeting app", "Saving leftover money"],
    correct_answer: 1,
    explanation: "Envelope budgeting divides cash into envelopes for different spending categories, preventing overspending.",
    difficulty_level: 'beginner',
    topics: ['Budgeting']
  },
  {
    question_text: "What is a sinking fund?",
    options: ["Emergency fund for disasters", "Savings for a specific planned expense", "Investment account", "Debt payment fund"],
    correct_answer: 1,
    explanation: "A sinking fund is money saved regularly for a specific future expense like vacation, car repair, or holiday gifts.",
    difficulty_level: 'intermediate',
    topics: ['Budgeting', 'Savings']
  },
  {
    question_text: "What percentage of income should go to housing?",
    options: ["No more than 28-30%", "No more than 50%", "No more than 15%", "As much as needed"],
    correct_answer: 0,
    explanation: "Financial experts recommend spending no more than 28-30% of gross income on housing to maintain financial health.",
    difficulty_level: 'intermediate',
    topics: ['Budgeting', 'Housing']
  },
  
  // Credit & Debt questions
  {
    question_text: "How many credit bureaus are there in the US?",
    options: ["1", "2", "3", "5"],
    correct_answer: 2,
    explanation: "There are three major credit bureaus: Equifax, Experian, and TransUnion.",
    difficulty_level: 'beginner',
    topics: ['Credit', 'Credit Score']
  },
  {
    question_text: "What is a good credit utilization ratio?",
    options: ["Under 10%", "Under 30%", "Under 50%", "Under 70%"],
    correct_answer: 1,
    explanation: "Keep credit utilization (balance/limit) under 30% for optimal credit scores, with under 10% being even better.",
    difficulty_level: 'intermediate',
    topics: ['Credit', 'Credit Score']
  },
  {
    question_text: "How long do hard inquiries stay on your credit report?",
    options: ["6 months", "1 year", "2 years", "7 years"],
    correct_answer: 2,
    explanation: "Hard inquiries from credit applications remain on your report for 2 years but typically only impact scores for 1 year.",
    difficulty_level: 'intermediate',
    topics: ['Credit', 'Credit Score']
  },
  {
    question_text: "What is the difference between a hard and soft credit inquiry?",
    options: ["Hard inquiries affect credit score, soft inquiries don't", "Soft inquiries cost money", "Hard inquiries are illegal", "No difference"],
    correct_answer: 0,
    explanation: "Hard inquiries (credit applications) affect your score and show on reports. Soft inquiries (checking your own credit) don't impact scores.",
    difficulty_level: 'intermediate',
    topics: ['Credit', 'Credit Score']
  },
  
  // Taxes questions
  {
    question_text: "What is the difference between a tax deduction and tax credit?",
    options: ["No difference", "Deductions reduce taxable income, credits reduce tax owed", "Credits are illegal", "Deductions are better"],
    correct_answer: 1,
    explanation: "Tax deductions lower your taxable income; tax credits directly reduce the tax you owe dollar-for-dollar.",
    difficulty_level: 'intermediate',
    topics: ['Taxes']
  },
  {
    question_text: "What is a W-2 form?",
    options: ["Tax return", "Employer wage and tax statement", "Investment report", "Loan application"],
    correct_answer: 1,
    explanation: "A W-2 form shows your annual wages and taxes withheld by your employer, needed to file your tax return.",
    difficulty_level: 'beginner',
    topics: ['Taxes']
  },
  {
    question_text: "What does it mean to be in a higher tax bracket?",
    options: ["All income is taxed at that rate", "Only income above threshold is taxed at that rate", "You pay double taxes", "You get tax refunds"],
    correct_answer: 1,
    explanation: "The US has a progressive tax system - only income above each bracket threshold is taxed at that higher rate.",
    difficulty_level: 'intermediate',
    topics: ['Taxes']
  },
  
  // Savings questions
  {
    question_text: "What is a high-yield savings account?",
    options: ["Risky investment account", "Savings account with above-average interest rate", "Checking account", "Retirement account"],
    correct_answer: 1,
    explanation: "High-yield savings accounts offer higher interest rates (4-5%) compared to traditional savings (0.01-0.05%).",
    difficulty_level: 'beginner',
    topics: ['Savings', 'Banking']
  },
  {
    question_text: "What is FDIC insurance?",
    options: ["Health insurance", "Car insurance", "Bank deposit insurance up to $250,000", "Investment insurance"],
    correct_answer: 2,
    explanation: "FDIC (Federal Deposit Insurance Corporation) protects bank deposits up to $250,000 per depositor if bank fails.",
    difficulty_level: 'beginner',
    topics: ['Banking', 'Savings']
  },
  {
    question_text: "What is the Rule of 72?",
    options: ["Retirement age", "Estimate years to double money (72/interest rate)", "Credit score formula", "Budget percentage"],
    correct_answer: 1,
    explanation: "The Rule of 72 estimates how long it takes to double your money: 72 divided by interest rate = years to double.",
    difficulty_level: 'intermediate',
    topics: ['Investing', 'Savings']
  }
]

async function addQuestions() {
  console.log('📝 Adding comprehensive quiz questions...\n')

  let created = 0
  let skipped = 0
  const categories = new Set<string>()

  for (const q of questions) {
    q.topics.forEach(t => categories.add(t))
    
    const { data: existing } = await supabase
      .from('quiz_questions')
      .select('id')
      .eq('question_text', q.question_text)
      .single()

    if (existing) {
      skipped++
      continue
    }

    const { error } = await supabase
      .from('quiz_questions')
      .insert(q)

    if (error) {
      console.log(`❌ ${q.question_text.substring(0, 40)}...`)
      console.log(`   ${error.message}`)
      skipped++
    } else {
      console.log(`✅ ${q.question_text}`)
      created++
    }
  }

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━`)
  console.log(`✅ Created: ${created}`)
  console.log(`⏭️  Skipped: ${skipped}`)
  console.log(`📚 Categories: ${categories.size}`)
  console.log(`📊 Topics: ${Array.from(categories).join(', ')}`)
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━\n`)
}

addQuestions().catch(console.error)
