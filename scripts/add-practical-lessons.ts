/**
 * Quick Content Expansion
 * Adds practical lessons to existing courses
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const newLessons = [
  {
    courseSlug: 'financial-literacy-basics',
    title: 'Creating Your First Budget',
    slug: 'creating-first-budget',
    description: 'Step-by-step guide to building a realistic budget',
    duration_minutes: 15,
    display_order: 100,
    content: {
      introduction: 'A budget is your financial roadmap. Learn to create one that actually works for your lifestyle and goals.',
      objectives: [
        'Track all income and expenses accurately',
        'Apply the 50/30/20 budgeting rule',
        'Use budgeting tools effectively',
        'Adjust budget based on real spending'
      ],
      sections: [
        {
          title: '1. Calculate Your Income',
          content: 'Start with your after-tax income. Include all sources: salary, side hustles, freelance work, and passive income. Use your take-home pay, not gross salary.',
          keyPoints: [
            'Use net pay (after taxes and deductions)',
            'Include ALL income sources',
            'Calculate monthly average for irregular income',
            'Be conservative with estimates'
          ]
        },
        {
          title: '2. List All Expenses',
          content: 'Review 2-3 months of bank and credit card statements. Categorize every expense as needs, wants, or savings/debt.',
          keyPoints: [
            'Fixed: Rent, car payment, insurance',
            'Variable: Groceries, gas, utilities',
            'Periodic: Annual subscriptions (÷12)',
            'Don\'t forget cash spending!'
          ]
        },
        {
          title: '3. The 50/30/20 Framework',
          content: 'Allocate 50% to needs, 30% to wants, 20% to savings and debt. This balanced approach prevents both deprivation and financial insecurity.',
          keyPoints: [
            '50% Needs: Essentials you can\'t eliminate',
            '30% Wants: Things that enhance life',
            '20% Future: Savings, investments, extra debt payments',
            'Adjust percentages if needed, but prioritize the 20%'
          ]
        },
        {
          title: '4. Choose Your Tools',
          content: 'Pick a method that matches your style: apps for automation, spreadsheets for control, or envelopes for discipline.',
          keyPoints: [
            'Apps: Mint, YNAB, EveryDollar (automated)',
            'Spreadsheets: Full control, free templates available',
            'Envelope system: Cash-based, very effective',
            'Hybrid: Combine methods for different categories'
          ]
        },
        {
          title: '5. Track and Adjust',
          content: 'Review actual vs. budgeted monthly. Adjust categories based on reality, not aspiration.',
          keyPoints: [
            'Weekly check-ins prevent overspending',
            'Monthly reviews identify patterns',
            'Adjust categories after 2-3 months of data',
            'Be honest about your actual spending'
          ]
        }
      ],
      keyTakeaways: [
        'A budget is permission to spend, not restriction',
        'Perfect budgets don\'t exist - adjust as you learn',
        'Tracking reveals spending patterns you didn\'t know existed',
        'Consistency matters more than perfection'
      ],
      actionItems: [
        'Calculate your monthly take-home income',
        'Review last 3 months of transactions',
        'Categorize expenses into needs/wants/savings',
        'Choose and set up your tracking tool today',
        'Set calendar reminder for weekly budget check-in'
      ],
      resources: [
        {
          title: 'Free Budget Spreadsheet Templates',
          url: 'https://www.vertex42.com/ExcelTemplates/personal-budget.html'
        },
        {
          title: 'Mint - Free Budgeting App',
          url: 'https://mint.intuit.com'
        }
      ]
    }
  },
  {
    courseSlug: 'financial-literacy-basics',
    title: 'Smart Shopping and Saving Money',
    slug: 'smart-shopping-saving',
    description: 'Practical strategies to reduce expenses without sacrifice',
    duration_minutes: 12,
    display_order: 101,
    content: {
      introduction: 'Small savings add up quickly. Learn proven techniques to cut costs on everyday purchases while maintaining quality of life.',
      objectives: [
        'Compare prices like a pro',
        'Time purchases for maximum savings',
        'Avoid marketing tricks and impulse buys',
        'Use technology to save automatically'
      ],
      sections: [
        {
          title: 'Price Comparison Strategies',
          content: 'Never buy without comparing. Use apps and websites to ensure you\'re getting the best deal.',
          keyPoints: [
            'Browser extensions: Honey, Rakuten (automatic coupons)',
            'Price tracking: CamelCamelCamel for Amazon',
            'Generic vs. brand: Often identical products',
            'Unit pricing: Compare per oz/lb/count'
          ]
        },
        {
          title: 'Strategic Timing',
          content: 'Almost everything goes on sale eventually. Learn the patterns.',
          keyPoints: [
            'Black Friday/Cyber Monday: Electronics, appliances',
            'January: Fitness equipment, decorations',
            'July: Outdoor furniture, summer items',
            'End of month: Cars (salespeople meeting quotas)'
          ]
        },
        {
          title: 'Defeating Impulse Purchases',
          content: 'Retailers are experts at making you spend more. Use these counter-tactics.',
          keyPoints: [
            '24-48 hour rule for non-essentials',
            'Shopping lists: Buy only what\'s listed',
            'Unsubscribe from marketing emails',
            'Remove saved credit cards from sites'
          ]
        }
      ],
      keyTakeaways: [
        'Waiting almost always results in better prices',
        'Quality often matters more than price',
        'Cashback and rewards add up significantly',
        'The best deal is not buying what you don\'t need'
      ],
      actionItems: [
        'Install Honey or Rakuten browser extension',
        'Create a 30-day want list',
        'Unsubscribe from 5 marketing emails',
        'Set up price alerts for items you need'
      ]
    }
  }
]

async function addLessons() {
  console.log('📚 Adding new lessons...\n')

  // First, list all courses
  const { data: courses } = await supabase
    .from('courses')
    .select('id, slug, title')
    .order('title')

  console.log('Available courses:')
  courses?.forEach(c => console.log(`  - ${c.slug}: ${c.title}`))
  console.log('')

  let created = 0
  let skipped = 0

  for (const lesson of newLessons) {
    const course = courses?.find(c => c.slug === lesson.courseSlug)
    
    if (!course) {
      console.log(`❌ Course not found: ${lesson.courseSlug}`)
      skipped++
      continue
    }

    // Check if exists
    const { data: existing } = await supabase
      .from('lessons')
      .select('id')
      .eq('course_id', course.id)
      .eq('slug', lesson.slug)
      .single()

    if (existing) {
      console.log(`⏭️  ${lesson.title} (already exists)`)
      skipped++
      continue
    }

    // Insert
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
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━\n`)
}

addLessons().catch(console.error)
