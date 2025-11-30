/**
 * Add more practical lessons - Wave 2
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const lessons = [
  {
    courseSlug: 'financial-literacy-basics',
    title: 'Understanding and Improving Your Credit Score',
    slug: 'understanding-credit-score',
    description: 'Learn what affects your credit score and how to improve it',
    duration_minutes: 18,
    display_order: 102,
    content: {
      introduction: 'Your credit score impacts loan approvals, interest rates, and even rental applications. Understanding how it works puts you in control.',
      objectives: [
        'Understand the 5 factors that determine credit scores',
        'Learn how to check your credit report for free',
        'Identify strategies to improve your score',
        'Recognize credit score myths vs. facts'
      ],
      sections: [
        {
          title: 'What Is a Credit Score?',
          content: 'A credit score is a 3-digit number (300-850) that represents your creditworthiness. Higher scores mean better loan terms and lower interest rates.',
          keyPoints: [
            '300-579: Poor credit',
            '580-669: Fair credit',
            '670-739: Good credit',
            '740-799: Very good credit',
            '800-850: Exceptional credit'
          ]
        },
        {
          title: 'The 5 Factors That Matter',
          content: 'FICO and VantageScore use similar factors with different weightings to calculate your score.',
          keyPoints: [
            '35% Payment History - Pay on time, every time',
            '30% Amounts Owed - Keep credit utilization under 30%',
            '15% Length of Credit History - Older accounts help',
            '10% New Credit - Too many applications hurt',
            '10% Credit Mix - Variety of credit types helps'
          ]
        },
        {
          title: 'Quick Wins to Improve Your Score',
          content: 'Some strategies show results in weeks, others take months. Focus on payment history and utilization first.',
          keyPoints: [
            'Set up automatic payments (never miss a payment)',
            'Pay down credit card balances below 30%',
            'Request credit limit increases (lowers utilization)',
            'Become an authorized user on a good account',
            'Dispute errors on your credit report'
          ]
        }
      ],
      keyTakeaways: [
        'Payment history is the single most important factor',
        'Check your credit report free at annualcreditreport.com',
        'Improvement takes time - be patient and consistent',
        'Avoid credit repair scams - you can do this yourself'
      ],
      actionItems: [
        'Get your free credit report today',
        'Set up automatic minimum payments on all cards',
        'Calculate your credit utilization percentage',
        'Create a plan to pay down high-utilization cards'
      ]
    }
  },
  {
    courseSlug: 'budgeting-basics',
    title: 'Emergency Fund Essentials',
    slug: 'emergency-fund-essentials',
    description: 'Build financial security with an emergency fund',
    duration_minutes: 14,
    display_order: 50,
    content: {
      introduction: 'An emergency fund is your financial safety net. It prevents debt when unexpected expenses arise and provides peace of mind.',
      objectives: [
        'Determine your emergency fund target amount',
        'Choose the right account for emergency savings',
        'Create a realistic saving plan',
        'Know when to use (and not use) emergency funds'
      ],
      sections: [
        {
          title: 'How Much Do You Need?',
          content: 'Target 3-6 months of essential expenses. Start with $1,000, then build to one month, then three, then six.',
          keyPoints: [
            'Beginners: Start with $1,000',
            'Stable income: 3 months expenses',
            'Variable income/single earner: 6 months',
            'Self-employed: 6-12 months'
          ]
        },
        {
          title: 'Where to Keep It',
          content: 'Balance accessibility with growth. You need quick access but also want some interest.',
          keyPoints: [
            'High-yield savings account (4-5% APY)',
            'Money market account',
            'NOT checking (too easy to spend)',
            'NOT investments (too volatile)',
            'Keep separate from regular savings'
          ]
        },
        {
          title: 'Building It Fast',
          content: 'Automate savings and find extra money to accelerate your progress.',
          keyPoints: [
            'Automatic transfer every payday',
            'Save windfalls (tax refunds, bonuses)',
            'Sell unused items',
            'Cut one major expense temporarily',
            'Side hustle income goes to emergency fund'
          ]
        }
      ],
      keyTakeaways: [
        'Start small - $1,000 is better than $0',
        'Automate deposits so you don\'t forget',
        'Only use for true emergencies',
        'Replenish immediately after use'
      ],
      actionItems: [
        'Calculate your monthly essential expenses',
        'Set emergency fund goal (3-6 months)',
        'Open high-yield savings account',
        'Set up automatic monthly transfer'
      ]
    }
  },
  {
    courseSlug: 'investing-101',
    title: 'Investment Basics for Beginners',
    slug: 'investment-basics-beginners',
    description: 'Start your investment journey with confidence',
    duration_minutes: 20,
    display_order: 10,
    content: {
      introduction: 'Investing helps your money grow faster than inflation. Start early, stay consistent, and let compound interest work its magic.',
      objectives: [
        'Understand different types of investments',
        'Learn the power of compound interest',
        'Start investing with small amounts',
        'Avoid common beginner mistakes'
      ],
      sections: [
        {
          title: 'Why Invest?',
          content: 'Savings accounts are safe but earn minimal interest. Investing historically returns 7-10% annually, though with more risk.',
          keyPoints: [
            'Beat inflation (protect purchasing power)',
            'Build wealth over time',
            'Achieve financial goals (retirement, home, etc.)',
            'Compound interest: earn returns on returns'
          ]
        },
        {
          title: 'Investment Types',
          content: 'Different investments serve different purposes. Most beginners should start with index funds.',
          keyPoints: [
            'Stocks: Own pieces of companies (higher risk/return)',
            'Bonds: Loan money for fixed interest (lower risk)',
            'Index Funds: Own many stocks at once (diversified)',
            'ETFs: Like index funds, trade like stocks',
            'Real Estate: Property investment (requires capital)'
          ]
        },
        {
          title: 'Getting Started',
          content: 'You don\'t need thousands to start. Many platforms allow investing with as little as $1.',
          keyPoints: [
            'Open brokerage account (Fidelity, Vanguard, etc.)',
            'Start with target-date or index funds',
            'Contribute regularly (dollar-cost averaging)',
            'Don\'t try to time the market',
            'Think long-term (5+ years)'
          ]
        }
      ],
      keyTakeaways: [
        'Start now, even with small amounts',
        'Diversification reduces risk',
        'Time in market beats timing the market',
        'Low-cost index funds are beginner-friendly'
      ],
      actionItems: [
        'Research brokerage accounts',
        'Calculate how much you can invest monthly',
        'Learn about your employer 401(k) match',
        'Set up automatic investments'
      ]
    }
  }
]

async function addLessons() {
  console.log('📚 Adding Wave 2 lessons...\n')

  let created = 0
  let skipped = 0

  for (const lesson of lessons) {
    const { data: course } = await supabase
      .from('courses')
      .select('id, title')
      .eq('slug', lesson.courseSlug)
      .single()

    if (!course) {
      console.log(`❌ Course not found: ${lesson.courseSlug}`)
      skipped++
      continue
    }

    const { data: existing } = await supabase
      .from('lessons')
      .select('id')
      .eq('course_id', course.id)
      .eq('slug', lesson.slug)
      .single()

    if (existing) {
      console.log(`⏭️  ${lesson.title} (exists)`)
      skipped++
      continue
    }

    const { error } = await supabase
      .from('lessons')
      .insert({
        course_id: course.id,
        title: lesson.title,
        slug: lesson.slug,
        description: lesson.description,
        content: lesson.content,
        duration_minutes: lesson.duration_minutes,
        display_order: lesson.display_order
      })

    if (error) {
      console.log(`❌ ${lesson.title}: ${error.message}`)
      skipped++
    } else {
      console.log(`✅ ${lesson.title}`)
      created++
    }
  }

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━`)
  console.log(`✅ Created: ${created}`)
  console.log(`⏭️  Skipped: ${skipped}`)
  console.log(`📊 Total Lessons: ${created + skipped}`)
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━\n`)
}

addLessons().catch(console.error)
