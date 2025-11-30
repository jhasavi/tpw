/**
 * Add comprehensive lessons - Wave 3
 * Focus on intermediate and advanced topics
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
    courseSlug: 'investing-101',
    title: 'Understanding Stocks and Bonds',
    slug: 'stocks-and-bonds-explained',
    description: 'Learn the fundamental differences between stocks and bonds',
    duration_minutes: 16,
    display_order: 20,
    content: {
      introduction: 'Stocks and bonds are the building blocks of most investment portfolios. Understanding how they work is essential for smart investing.',
      objectives: [
        'Differentiate between stocks and bonds',
        'Understand risk vs. return tradeoffs',
        'Learn when to use each investment type',
        'Build a balanced portfolio strategy'
      ],
      sections: [
        {
          title: 'What Are Stocks?',
          content: 'Stocks represent ownership in a company. When you buy stock, you own a piece of that business and benefit from its growth.',
          keyPoints: [
            'Ownership stake in a company',
            'Value rises/falls with company performance',
            'Can pay dividends (share of profits)',
            'Higher potential returns, higher risk',
            'No guaranteed returns'
          ]
        },
        {
          title: 'What Are Bonds?',
          content: 'Bonds are loans you make to governments or corporations. They pay fixed interest over time and return your principal at maturity.',
          keyPoints: [
            'Fixed-income investment (predictable payments)',
            'Lower risk than stocks',
            'Pay regular interest (coupon payments)',
            'Principal returned at maturity',
            'Interest rate sensitive'
          ]
        },
        {
          title: 'Risk vs. Return',
          content: 'Stocks offer higher potential returns but more volatility. Bonds provide stability but lower growth.',
          keyPoints: [
            'Stocks: 7-10% average annual return (historically)',
            'Bonds: 3-5% average annual return',
            'Stocks lose value in bad markets',
            'Bonds provide income stability',
            'Diversification reduces overall risk'
          ]
        },
        {
          title: 'Building Your Mix',
          content: 'Your age and risk tolerance determine your stock/bond ratio. Common rule: 110 minus your age = % in stocks.',
          keyPoints: [
            'Age 30: 80% stocks, 20% bonds',
            'Age 50: 60% stocks, 40% bonds',
            'Age 65: 45% stocks, 55% bonds',
            'Rebalance annually',
            'Adjust based on risk tolerance'
          ]
        }
      ],
      keyTakeaways: [
        'Stocks = ownership, higher risk/return',
        'Bonds = lending, lower risk/return',
        'Diversification is key to managing risk',
        'Adjust your mix as you age'
      ],
      actionItems: [
        'Assess your current risk tolerance',
        'Calculate your ideal stock/bond ratio',
        'Review your existing portfolio allocation',
        'Set calendar reminder to rebalance annually'
      ]
    }
  },
  {
    courseSlug: 'investing-101',
    title: 'Index Funds vs. Individual Stocks',
    slug: 'index-funds-vs-stocks',
    description: 'Discover why index funds are recommended for most investors',
    duration_minutes: 14,
    display_order: 30,
    content: {
      introduction: 'Should you pick individual stocks or invest in index funds? For most people, index funds are the smarter choice.',
      objectives: [
        'Understand what index funds are',
        'Learn the benefits of diversification',
        'Compare costs and performance',
        'Decide which approach fits you'
      ],
      sections: [
        {
          title: 'What Are Index Funds?',
          content: 'Index funds automatically own all stocks in a market index like the S&P 500, giving instant diversification.',
          keyPoints: [
            'Owns 500+ companies in one fund',
            'Mirrors market performance',
            'Extremely low fees (0.03-0.20%)',
            'No stock picking required',
            'Set it and forget it investing'
          ]
        },
        {
          title: 'Individual Stock Risks',
          content: 'Picking individual stocks requires research, time, and carries higher risk if companies underperform.',
          keyPoints: [
            'Company-specific risk (bankruptcy, scandals)',
            'Requires ongoing research',
            'Hard to beat market averages',
            '90% of professionals fail to beat index',
            'Higher trading costs'
          ]
        },
        {
          title: 'The Cost Difference',
          content: 'Fees matter enormously over decades. Index funds charge 0.03%, while active funds charge 1%+.',
          keyPoints: [
            'Index fund: $100K → $1.74M (30 yrs, 0.03% fee)',
            'Active fund: $100K → $1.54M (30 yrs, 1% fee)',
            'Fee difference: $200,000 lost!',
            'Lower fees = more money for you',
            'Compounding works in reverse with fees'
          ]
        }
      ],
      keyTakeaways: [
        'Index funds offer instant diversification',
        'Lower fees mean dramatically higher returns',
        'Most professionals can\'t beat the market',
        'Simple beats complex in investing'
      ],
      actionItems: [
        'Research low-cost index funds (VTSAX, VTI, VOO)',
        'Compare expense ratios in your 401(k)',
        'Calculate fee impact on your portfolio',
        'Consider switching from active to index funds'
      ]
    }
  },
  {
    courseSlug: 'budgeting-basics',
    title: 'Tracking Your Spending Effectively',
    slug: 'tracking-spending',
    description: 'Master the art of tracking where your money goes',
    duration_minutes: 12,
    display_order: 30,
    content: {
      introduction: 'You can\'t manage what you don\'t measure. Tracking spending reveals surprising patterns and opportunities to save.',
      objectives: [
        'Choose the right tracking method for you',
        'Identify spending leaks',
        'Use technology to automate tracking',
        'Build sustainable tracking habits'
      ],
      sections: [
        {
          title: 'Why Track Spending?',
          content: 'Most people underestimate spending by 20-30%. Tracking creates awareness and enables better decisions.',
          keyPoints: [
            'Reveals unconscious spending patterns',
            'Identifies budget categories to cut',
            'Prevents overdrafts and fees',
            'Helps achieve financial goals faster',
            'Reduces money stress'
          ]
        },
        {
          title: 'Tracking Methods',
          content: 'Choose a method you\'ll actually stick with - manual, apps, or spreadsheets all work.',
          keyPoints: [
            'Apps: Mint, YNAB, PocketGuard (automated)',
            'Spreadsheet: Full control, customizable',
            'Notebook: Simple, tactile, intentional',
            'Bank statements: Monthly review',
            'Mix methods: app + weekly check-ins'
          ]
        },
        {
          title: 'The Weekly Money Date',
          content: 'Schedule 15 minutes weekly to review spending, categorize transactions, and adjust course.',
          keyPoints: [
            'Same day/time each week',
            'Review all accounts',
            'Categorize transactions',
            'Compare to budget',
            'Celebrate wins, adjust for misses'
          ]
        }
      ],
      keyTakeaways: [
        'Tracking creates awareness and control',
        'Use tools that match your personality',
        'Weekly reviews prevent monthly surprises',
        'Start simple, build the habit first'
      ],
      actionItems: [
        'Download a spending tracker app today',
        'Link all your accounts',
        'Schedule your first weekly money date',
        'Track for 30 days before making changes'
      ]
    }
  },
  {
    courseSlug: 'budgeting-basics',
    title: 'Cutting Expenses Without Sacrifice',
    slug: 'cutting-expenses-smart',
    description: 'Find savings without feeling deprived',
    duration_minutes: 15,
    display_order: 40,
    content: {
      introduction: 'Smart spending cuts target waste, not joy. Focus on big wins and unconscious spending, not daily lattes.',
      objectives: [
        'Identify high-impact cost cuts',
        'Negotiate better rates on recurring bills',
        'Eliminate forgotten subscriptions',
        'Optimize without deprivation'
      ],
      sections: [
        {
          title: 'The Big Three',
          content: 'Housing, transportation, and food represent 70% of spending. Small percentage cuts here = big savings.',
          keyPoints: [
            'Housing: Refinance, roommate, downsize',
            'Transportation: Reliable used car, biking, transit',
            'Food: Meal prep, generic brands, restaurant limits',
            '10% cut in Big Three = $500+/month saved',
            'Don\'t sweat small stuff (coffee, streaming)'
          ]
        },
        {
          title: 'Subscription Audit',
          content: 'The average person has 12 subscriptions and forgets half of them. Audit every 6 months.',
          keyPoints: [
            'Check bank statements for recurring charges',
            'Cancel unused gym, streaming, apps',
            'Share family plans (Netflix, Spotify)',
            'Use free alternatives (library, YouTube)',
            'Typical savings: $50-200/month'
          ]
        },
        {
          title: 'Negotiation Wins',
          content: 'One hour of negotiating bills can save $1,000+/year. Companies expect you to ask for discounts.',
          keyPoints: [
            'Call and ask: "What discounts are available?"',
            'Internet/cable: Threaten to switch providers',
            'Insurance: Shop around annually',
            'Credit cards: Request lower APR',
            'Phone: Switch to budget carrier (Mint, Visible)'
          ]
        }
      ],
      keyTakeaways: [
        'Focus on big expenses for maximum impact',
        'Audit subscriptions every 6 months',
        'Negotiate everything - companies expect it',
        'Optimize spending, don\'t eliminate joy'
      ],
      actionItems: [
        'List all recurring subscriptions',
        'Calculate your Big Three percentages',
        'Call one service provider to negotiate',
        'Cancel 2-3 unused subscriptions this week'
      ]
    }
  },
  {
    courseSlug: 'financial-literacy-basics',
    title: 'Understanding Insurance Basics',
    slug: 'insurance-basics',
    description: 'Learn which insurance you need and which you can skip',
    duration_minutes: 18,
    display_order: 110,
    content: {
      introduction: 'Insurance protects you from financial catastrophe. But you need the right coverage, not every policy sold to you.',
      objectives: [
        'Understand essential vs. optional insurance',
        'Calculate how much coverage you need',
        'Avoid overinsuring or underinsuring',
        'Save money on premiums'
      ],
      sections: [
        {
          title: 'Essential Insurance',
          content: 'These four types are non-negotiable for financial security.',
          keyPoints: [
            'Health: Catastrophic events can cost $100K+',
            'Auto: Required by law, protects assets',
            'Homeowners/Renters: Protects possessions',
            'Life: If anyone depends on your income',
            'Disability: Protects your ability to earn'
          ]
        },
        {
          title: 'How Much Coverage?',
          content: 'Rules of thumb for adequate protection without overpaying.',
          keyPoints: [
            'Life: 10-12x annual income',
            'Auto: $250K/$500K liability minimum',
            'Homeowners: Replacement cost of home',
            'Emergency fund: 3-6 months expenses',
            'Health: Max out-of-pocket you can afford'
          ]
        },
        {
          title: 'Skip These',
          content: 'Insurance companies profit from fear. These policies rarely make sense.',
          keyPoints: [
            'Extended warranties (low risk, high markup)',
            'Credit life insurance (expensive)',
            'Flight insurance (covered by credit cards)',
            'Disease-specific policies (health covers this)',
            'Rental car insurance (credit card covers)'
          ]
        },
        {
          title: 'Saving on Premiums',
          content: 'Smart strategies to lower insurance costs without reducing protection.',
          keyPoints: [
            'Raise deductibles ($500 → $1,000 saves 15-30%)',
            'Bundle policies (home + auto discount)',
            'Shop around annually',
            'Good credit = lower premiums',
            'Ask about discounts (alumni, professional, etc.)'
          ]
        }
      ],
      keyTakeaways: [
        'Health, auto, home/renters, life, disability are essential',
        'Higher deductibles = lower premiums',
        'Skip extended warranties and niche policies',
        'Shop around every year for better rates'
      ],
      actionItems: [
        'Review current insurance coverage',
        'Calculate if you\'re over/under insured',
        'Get 3 quotes from competitors',
        'Raise deductibles if you have emergency fund'
      ]
    }
  }
]

async function addLessons() {
  console.log('📚 Adding Wave 3 lessons...\n')

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
  console.log(`📊 Total: ${created + skipped}`)
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━\n`)
}

addLessons().catch(console.error)
