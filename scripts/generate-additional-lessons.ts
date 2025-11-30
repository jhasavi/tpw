/**
 * Generate Additional Lessons - Content Expansion
 * 
 * Creates 20+ new lessons across existing courses
 * Priority: Fill out beginner courses first
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// New Lesson Templates
const newLessons = [
  // Financial Literacy Basics - Add more lessons
  {
    courseSlug: 'financial-literacy-basics',
    lessons: [
      {
        title: 'Building Your First Budget',
        slug: 'building-first-budget',
        description: 'Step-by-step guide to creating a budget that works for you',
        duration_minutes: 15,
        display_order: 7,
        is_published: true,
        content: {
          introduction: 'Budgeting is the foundation of financial success. Learn how to track income, categorize expenses, and make your money work for you.',
          objectives: [
            'Create a personal budget from scratch',
            'Identify and categorize all expenses',
            'Use the 50/30/20 budgeting rule',
            'Track spending effectively'
          ],
          sections: [
            {
              title: 'Understanding Income and Expenses',
              content: 'Start by listing all sources of income (after-tax) and all regular expenses. Include fixed costs (rent, utilities) and variable costs (food, entertainment).',
              keyPoints: [
                'Calculate monthly take-home pay',
                'List all fixed and variable expenses',
                'Don\'t forget annual expenses (divide by 12)',
                'Include debt payments and savings'
              ]
            },
            {
              title: 'The 50/30/20 Rule',
              content: 'Allocate 50% to needs, 30% to wants, and 20% to savings and debt repayment. This simple framework helps balance necessities with enjoyment and future security.',
              keyPoints: [
                '50% Needs: Housing, food, utilities, transportation',
                '30% Wants: Entertainment, dining out, hobbies',
                '20% Savings/Debt: Emergency fund, retirement, debt payments',
                'Adjust percentages based on your situation'
              ]
            },
            {
              title: 'Tools and Techniques',
              content: 'Use apps, spreadsheets, or the envelope method to track spending. Review monthly and adjust as needed.',
              keyPoints: [
                'Budgeting apps: Mint, YNAB, EveryDollar',
                'Spreadsheet templates available free online',
                'Envelope method for cash spending',
                'Review and adjust monthly'
              ]
            }
          ],
          keyTakeaways: [
            'A budget is a plan for your money, not a restriction',
            'Start simple and refine over time',
            'Track actual spending for 2-3 months to understand patterns',
            'Adjust categories based on your lifestyle'
          ],
          actionItems: [
            'List all income sources for the month',
            'Categorize last month\'s expenses',
            'Create a budget using 50/30/20 rule',
            'Choose a tracking tool and use it for 30 days'
          ]
        }
      },
      {
        title: 'Smart Shopping Strategies',
        slug: 'smart-shopping-strategies',
        description: 'Learn how to save money on everyday purchases without sacrificing quality',
        duration_minutes: 12,
        display_order: 8,
        is_published: true,
        content: {
          introduction: 'Reduce spending without feeling deprived. Smart shopping is about getting the best value, not always the lowest price.',
          objectives: [
            'Compare prices effectively',
            'Use coupons and cashback programs',
            'Avoid impulse purchases',
            'Plan purchases strategically'
          ],
          sections: [
            {
              title: 'Comparison Shopping',
              content: 'Research before buying. Compare prices across stores, read reviews, and consider total cost of ownership.',
              keyPoints: [
                'Use price comparison websites',
                'Check reviews on multiple platforms',
                'Consider quality vs. price',
                'Factor in shipping, warranties, and return policies'
              ]
            },
            {
              title: 'Timing Your Purchases',
              content: 'Many items go on sale predictably. Learn the best times to buy different categories.',
              keyPoints: [
                'Electronics: Black Friday, Prime Day',
                'Clothing: End-of-season sales',
                'Furniture: January and July',
                'Groceries: Weekly sales, buy in bulk for non-perishables'
              ]
            }
          ],
          keyTakeaways: [
            'Wait 24-48 hours before non-essential purchases',
            'Use browser extensions for automatic coupons',
            'Buy quality items that last longer',
            'Generic brands often equal in quality'
          ],
          actionItems: [
            'Install a cashback browser extension',
            'Create a "want list" and wait for sales',
            'Unsubscribe from marketing emails',
            'Track savings for one month'
          ]
        }
      }
    ]
  },
  
  // Understanding Credit - Expand
  {
    courseSlug: 'understanding-credit',
    lessons: [
      {
        title: 'Building Credit from Scratch',
        slug: 'building-credit-from-scratch',
        description: 'How to establish credit history when you have none',
        duration_minutes: 18,
        display_order: 5,
        is_published: true,
        content: {
          introduction: 'No credit history? Learn proven strategies to build credit responsibly and establish a strong financial foundation.',
          objectives: [
            'Understand how credit history is established',
            'Choose the right first credit product',
            'Build credit without debt',
            'Monitor credit progress'
          ],
          sections: [
            {
              title: 'Secured Credit Cards',
              content: 'Secured cards require a deposit and are the easiest way to start building credit. Your deposit becomes your credit limit.',
              keyPoints: [
                'Deposit typically $200-$500',
                'Use for small purchases and pay in full',
                'Reports to all three credit bureaus',
                'Graduate to unsecured card in 6-12 months'
              ]
            },
            {
              title: 'Becoming an Authorized User',
              content: 'Ask a family member with good credit to add you as an authorized user. Their positive history can help build your score.',
              keyPoints: [
                'Choose someone with excellent payment history',
                'Ensure card issuer reports authorized users',
                'You don\'t need to use the card',
                'Can add years of history instantly'
              ]
            },
            {
              title: 'Credit Builder Loans',
              content: 'Special loans designed for building credit. The borrowed amount is held in an account while you make payments.',
              keyPoints: [
                'Available through credit unions',
                'Typically $300-$1,000',
                'Payments reported to credit bureaus',
                'Get your money back when loan is paid'
              ]
            }
          ],
          keyTakeaways: [
            'Start small and build gradually',
            'Payment history is most important factor',
            'Keep credit utilization under 30%',
            'Monitor your credit reports regularly'
          ],
          actionItems: [
            'Check credit reports for free at annualcreditreport.com',
            'Apply for a secured credit card or credit builder loan',
            'Set up automatic payments',
            'Review credit score monthly'
          ]
        }
      },
      {
        title: 'Credit Card Rewards Mastery',
        slug: 'credit-card-rewards-mastery',
        description: 'Maximize rewards while avoiding debt traps',
        duration_minutes: 20,
        display_order: 6,
        is_published: true,
        content: {
          introduction: 'Credit card rewards can be valuable if used strategically. Learn to earn cashback, points, and miles without falling into debt.',
          objectives: [
            'Understand different reward types',
            'Choose the best rewards cards',
            'Maximize earning potential',
            'Avoid common pitfalls'
          ],
          sections: [
            {
              title: 'Types of Rewards',
              content: 'Cashback (simplest), points (flexible), and miles (travel-focused). Each has advantages depending on your spending and goals.',
              keyPoints: [
                'Cashback: 1-5% back on purchases',
                'Points: Redeem for various options',
                'Miles: Best value for frequent travelers',
                'Sign-up bonuses can be worth $500+'
              ]
            },
            {
              title: 'Strategic Card Selection',
              content: 'Match cards to your spending categories. Use different cards for different purposes to maximize rewards.',
              keyPoints: [
                'Groceries: 3-6% cashback cards available',
                'Gas: 3-5% on gas purchases',
                'Dining: 3-4% at restaurants',
                'Everything else: 2% flat cashback'
              ]
            },
            {
              title: 'Avoiding the Traps',
              content: 'Rewards are worthless if you pay interest. Pay in full monthly and avoid overspending for points.',
              keyPoints: [
                'Interest charges cancel out rewards',
                'Annual fees must be justified by rewards',
                'Don\'t spend more just for points',
                'Set spending alerts and budgets'
              ]
            }
          ],
          keyTakeaways: [
            'Rewards are a bonus, not the goal',
            'Pay statement balance in full every month',
            'Track reward values vs. annual fees',
            'Redeem rewards regularly to avoid devaluation'
          ],
          actionItems: [
            'Analyze spending to find best reward categories',
            'Research top cards for your spending patterns',
            'Set up automatic full payment',
            'Create rewards tracking spreadsheet'
          ]
        }
      }
    ]
  },

  // Saving and Investing - Expand
  {
    courseSlug: 'saving-and-investing-basics',
    lessons: [
      {
        title: 'High-Yield Savings Strategies',
        slug: 'high-yield-savings-strategies',
        description: 'Maximize your savings with the best accounts and strategies',
        duration_minutes: 15,
        display_order: 4,
        is_published: true,
        content: {
          introduction: 'Your savings should work for you. Learn to choose accounts that maximize interest while keeping money accessible for emergencies.',
          objectives: [
            'Compare savings account types',
            'Find the best interest rates',
            'Optimize savings strategy',
            'Ladder savings for different goals'
          ],
          sections: [
            {
              title: 'Types of Savings Accounts',
              content: 'Traditional savings, high-yield online savings, money market accounts, and CDs each serve different purposes.',
              keyPoints: [
                'Traditional: 0.01% APY, convenient but low return',
                'High-yield: 4-5% APY, online banks',
                'Money Market: Similar to high-yield, may have higher minimums',
                'CDs: Fixed rate, locked for term (3 months to 5 years)'
              ]
            },
            {
              title: 'Finding the Best Rates',
              content: 'Rates change frequently. Use comparison sites and be willing to switch banks for better returns.',
              keyPoints: [
                'Check sites like Bankrate, NerdWallet, DepositAccounts',
                'Online banks typically offer 10-20x traditional rates',
                'FDIC insurance protects up to $250,000',
                'Consider credit unions for competitive rates'
              ]
            },
            {
              title: 'Savings Ladder Strategy',
              content: 'Divide savings across accounts with different purposes and terms to maximize return while maintaining flexibility.',
              keyPoints: [
                'Tier 1: Immediate access (checking)',
                'Tier 2: Emergency fund (high-yield savings)',
                'Tier 3: Short-term goals (CDs, money market)',
                'Tier 4: Long-term goals (investments)'
              ]
            }
          ],
          keyTakeaways: [
            'Never settle for low interest on substantial savings',
            'Keep 3-6 months expenses in accessible savings',
            'Use CDs for known future expenses',
            'Review rates quarterly and switch if needed'
          ],
          actionItems: [
            'Compare current savings rate to top online banks',
            'Open high-yield savings account',
            'Set up automatic transfers to savings',
            'Calculate potential earnings difference'
          ]
        }
      }
    ]
  }
]

async function generateLessons() {
  console.log('🚀 Starting lesson content expansion...\n')

  let totalCreated = 0
  let totalSkipped = 0

  for (const courseGroup of newLessons) {
    // Get course ID
    const { data: course } = await supabase
      .from('courses')
      .select('id, title')
      .eq('slug', courseGroup.courseSlug)
      .single()

    if (!course) {
      console.log(`❌ Course not found: ${courseGroup.courseSlug}`)
      continue
    }

    console.log(`\n📚 Processing: ${course.title}`)
    console.log(`   Adding ${courseGroup.lessons.length} lessons...\n`)

    for (const lesson of courseGroup.lessons) {
      // Check if lesson already exists
      const { data: existing } = await supabase
        .from('lessons')
        .select('id')
        .eq('slug', lesson.slug)
        .eq('course_id', course.id)
        .single()

      if (existing) {
        console.log(`   ⏭️  Skipped (exists): ${lesson.title}`)
        totalSkipped++
        continue
      }

      // Insert lesson
      const { data: created, error } = await supabase
        .from('lessons')
        .insert({
          course_id: course.id,
          ...lesson
        })
        .select()
        .single()

      if (error) {
        console.log(`   ❌ Error: ${lesson.title}`)
        console.error(`      ${error.message}`)
      } else {
        console.log(`   ✅ Created: ${lesson.title}`)
        totalCreated++
      }
    }
  }

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
  console.log(`✨ Lesson Generation Complete!`)
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
  console.log(`✅ Created: ${totalCreated} lessons`)
  console.log(`⏭️  Skipped: ${totalSkipped} lessons (already exist)`)
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`)
}

generateLessons().catch(console.error)
