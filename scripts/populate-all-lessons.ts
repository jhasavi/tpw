/**
 * Populate ALL lesson content from markdown curricula
 * This creates comprehensive lesson content for all beginner lessons
 */

import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function updateLesson(
  courseSlug: string,
  lessonSlug: string,
  content: any,
  description: string,
  objectives: string[],
  keyConcepts: string[]
) {
  // Get curriculum
  const { data: curriculum } = await supabase
    .from('curricula')
    .select('id')
    .eq('slug', 'womens-financial-literacy')
    .single()

  if (!curriculum) {
    console.log('❌ Curriculum not found')
    return false
  }

  // Get course
  const { data: course } = await supabase
    .from('courses')
    .select('id')
    .eq('curriculum_id', curriculum.id)
    .eq('slug', courseSlug)
    .single()

  if (!course) {
    console.log(`❌ Course ${courseSlug} not found`)
    return false
  }

  // Update lesson
  const { error } = await supabase
    .from('lessons')
    .update({
      content,
      description,
      objectives,
      key_concepts: keyConcepts
    })
    .eq('course_id', course.id)
    .eq('slug', lessonSlug)

  if (error) {
    console.log(`❌ Error updating ${lessonSlug}:`, error.message)
    return false
  }

  console.log(`✅ ${lessonSlug} updated`)
  return true
}

async function populateAllLessons() {
  console.log('📝 Populating ALL lesson content...\n')

  // FINANCIAL LITERACY BASICS COURSE
  console.log('📚 Financial Literacy Basics Course\n')

  // Understanding Money & Banking
  await updateLesson(
    'financial-literacy-basics',
    'understanding-money-and-banking',
    {
      introduction: `Welcome to the foundation of financial literacy! Understanding money and banking is essential for navigating our modern economy. This lesson will demystify how money works, what banks do, and how you can make informed decisions about your financial accounts.

We'll explore the evolution of money, different types of banking institutions, account options, and the protections in place to keep your money safe. By the end, you'll feel confident managing your banking relationships and choosing the right financial products for your needs.`,
      sections: [
        {
          title: 'What Is Money?',
          content: `Money is anything widely accepted as payment for goods, services, or debts. Throughout history, societies have used shells, stones, precious metals, paper, and now digital entries to represent value.

Modern money serves three main functions:

**1. Medium of Exchange**
Instead of bartering (trading goods directly), money lets you exchange your work for something everyone accepts, then use that to buy what you need.

**2. Unit of Account**
Money provides a common measuring stick for value. It's easier to compare prices when everything is measured in dollars rather than "3 chickens = 1 haircut."

**3. Store of Value**
Money holds its value over time (mostly). You can earn it today and spend it next month. Unlike fresh bread that spoils, money maintains purchasing power—though inflation gradually reduces that power.`,
          examples: [
            'Getting paid $500 for work, then using that $500 to buy groceries, pay rent, or save for later',
            'Comparing a $15 pizza to a $12 salad - money makes value comparison simple',
            'Saving $100 today and it still having value (though perhaps slightly less due to inflation) next year'
          ],
          tips: [
            'Cash is still useful for budgeting (envelope system), privacy, and small transactions',
            'Digital money (debit/credit cards, apps) offers convenience and tracking benefits',
            'Understanding that money is fundamentally about trust - we accept it because others will too'
          ]
        },
        {
          title: 'Types of Banking Institutions',
          content: `Several types of institutions offer banking services, each with different structures and advantages:

**Commercial Banks (Chase, Bank of America, Wells Fargo)**
• For-profit corporations
• Offer full range of services: checking, savings, loans, credit cards
• Extensive branch and ATM networks
• May have higher fees but often more technology/convenience

**Credit Unions (Navy Federal, Alliant, local community CUs)**
• Not-for-profit cooperatives owned by members
• Often better interest rates on savings and lower loan rates
• Typically lower or no fees
• May have membership requirements (employer, location, organization)
• Smaller branch networks but participate in ATM sharing networks

**Online Banks (Ally, Marcus, Discover)**
• No physical branches
• Lower overhead = higher savings rates, lower fees
• 24/7 online/app access
• May need to deposit checks via mobile app or mail
• ATM access through networks, often reimburse fees

**Community Banks**
• Locally owned and operated
• Personal service, local decision-making
• Support local community development
• May offer more flexible lending for small businesses or unique situations`,
          examples: [
            'Choosing a credit union for a 2.5% auto loan vs. 4% at a commercial bank',
            'Using an online bank for emergency fund (3% interest) while keeping checking at local bank for easy deposits',
            'Joining a credit union through your employer to access member-only benefits'
          ],
          tips: [
            'You can use multiple institutions - online bank for savings, local bank for checking',
            'Compare fees, interest rates, and convenience before choosing',
            'Credit unions often have "anyone can join" affiliations (small membership fee to a nonprofit)',
            'Ensure any institution is FDIC (banks) or NCUA (credit unions) insured'
          ]
        },
        {
          title: 'Types of Bank Accounts',
          content: `**Checking Accounts**
Purpose: Day-to-day transactions and bill payments
Features:
• Debit card access
• Check writing ability
• Unlimited withdrawals/transfers (usually)
• Low or no interest
• May have monthly fees (often waived with direct deposit or minimum balance)
• Overdraft protection options

**Savings Accounts**
Purpose: Short-term goals and emergency funds
Features:
• Higher interest than checking (but still modest at traditional banks)
• Limited withdrawals (Regulation D used to limit to 6/month, now more flexible)
• FDIC insured up to $250,000 per depositor, per institution
• Easy access but not daily spending money

**Money Market Accounts**
Purpose: Higher-balance savings with better rates
Features:
• Higher interest rates than standard savings
• May include limited check-writing
• Usually require higher minimum balances ($1,000-$10,000)
• Tiered interest rates (more money = higher rate)

**Certificates of Deposit (CDs)**
Purpose: Saving for specific goals with fixed timeline
Features:
• Fixed interest rate for set term (3 months to 5 years)
• Higher rates than savings accounts
• Early withdrawal penalties
• FDIC insured
• Good for money you won't need to touch`,
          examples: [
            'Checking account for paycheck deposits and daily spending with debit card',
            'High-yield savings account at online bank earning 4% for emergency fund',
            '1-year CD at 5% for down payment you\'ll need in exactly 12 months'
          ],
          tips: [
            'Keep 1-2 months expenses in checking, rest in savings or other accounts',
            'Shop around - online savings accounts often pay 10-15x more than traditional banks',
            'Avoid overdraft fees by linking savings as backup or opting out of overdraft',
            'CD laddering: open multiple CDs with staggered maturity dates for flexibility and higher rates'
          ]
        },
        {
          title: 'FDIC and NCUA Insurance',
          content: `**FDIC (Federal Deposit Insurance Corporation)**
Insures deposits at banks up to $250,000 per depositor, per institution, per account ownership category.

What's covered:
• Checking accounts
• Savings accounts
• Money market accounts
• CDs

What's NOT covered:
• Stocks, bonds, mutual funds
• Life insurance policies
• Annuities
• Safe deposit box contents

**NCUA (National Credit Union Administration)**
Same coverage as FDIC but for credit unions.

**Coverage Limits:**
• $250,000 for individual accounts
• $250,000 per co-owner for joint accounts
• $250,000 per beneficiary for payable-on-death accounts
• Retirement accounts have separate $250,000 coverage

If you have more than $250,000 to deposit, spread it across multiple institutions or account types for full protection.`,
          examples: [
            '$300,000 in savings: Keep $250k at Bank A and $50k at Bank B for full FDIC coverage',
            'Joint account with spouse: Each person has $250k coverage = $500k total coverage',
            'If your bank fails, FDIC reimburses you (usually within a few days) up to $250,000'
          ],
          tips: [
            'Check if your bank is FDIC insured at fdic.gov/bankfind',
            'Credit unions should display NCUA insurance',
            'Don\'t keep more than $250,000 at any single institution',
            'You don\'t pay for this insurance - banks and credit unions fund it'
          ]
        }
      ],
      keyTakeaways: [
        'Money functions as a medium of exchange, unit of account, and store of value in our economy',
        'Different banking institutions (banks, credit unions, online banks) offer various advantages in fees, rates, and services',
        'Checking accounts are for daily spending; savings accounts are for emergency funds and short-term goals; CDs are for longer-term fixed savings',
        'FDIC (banks) and NCUA (credit unions) insurance protects your deposits up to $250,000 per depositor, per institution',
        'You can use multiple banks to maximize benefits - online banks for high-yield savings, local banks for convenience'
      ],
      actionItems: [
        'Verify that your current bank or credit union is FDIC or NCUA insured',
        'Compare your current savings account interest rate with online high-yield savings accounts',
        'Review your checking account fees and see if you qualify for fee waivers or should switch banks',
        'Set up at least two accounts: one checking for daily spending and one savings for emergency funds',
        'Calculate if you need multiple banks to stay within the $250,000 FDIC insurance limit'
      ],
      resources: [
        {
          type: 'tool',
          title: 'FDIC BankFind',
          description: 'Look up if your bank is FDIC insured and its health rating',
          url: 'https://banks.data.fdic.gov/bankfind-suite/bankfind'
        },
        {
          type: 'tool',
          title: 'Credit Union Locator',
          description: 'Find credit unions you can join based on your location or affiliations',
          url: 'https://www.mycreditunion.gov/about-credit-unions/credit-union-locator'
        },
        {
          type: 'article',
          title: 'Best High-Yield Savings Accounts',
          description: 'Current rates comparison for online savings accounts',
          url: '/blog/best-savings-accounts'
        }
      ]
    },
    'Understand how money functions in the economy, explore different banking institutions and their advantages, and learn how to choose the right accounts and protect your deposits.',
    [
      'Define money and explain its three primary functions in the economy',
      'Compare commercial banks, credit unions, online banks, and community banks',
      'Identify the purpose and features of checking, savings, money market, and CD accounts',
      'Understand FDIC and NCUA insurance coverage limits and what they protect',
      'Make informed decisions about which banking institutions and accounts to use'
    ],
    [
      'Functions of money',
      'Banking institution types',
      'Account types and features',
      'FDIC and NCUA insurance',
      'Account safety and protection',
      'Interest rates and fees'
    ]
  )

  // Understanding Interest
  await updateLesson(
    'emergency-planning',
    'why-emergency-funds-matter',
    {
      introduction: `Life is unpredictable. Cars break down, medical emergencies happen, jobs are lost, and unexpected expenses appear when you least expect them. An emergency fund is your financial safety net—money set aside specifically to handle life's surprises without going into debt or derailing your financial goals.

This lesson will help you understand why emergency funds are critical, how they protect you from financial catastrophe, and how they provide peace of mind and financial stability. You'll learn the real cost of not having an emergency fund and hear real-world examples of how they save the day.`,
      sections: [
        {
          title: 'What Is an Emergency Fund?',
          content: `An emergency fund is money you set aside specifically for unexpected expenses or financial emergencies. It's not for planned expenses, wants, or regular bills—it's exclusively for genuine emergencies.

**True Emergencies Include:**
• Job loss or income reduction
• Medical or dental emergencies not covered by insurance
• Urgent home repairs (roof leak, broken furnace, burst pipe)
• Car repairs needed to get to work
• Emergency travel (family illness, funeral)
• Unexpected tax bills or legal expenses

**NOT Emergencies:**
• Holiday shopping
• Vacation or concert tickets
• Sale on shoes you want
• Planned car maintenance
• Birthday gifts
• New phone because yours is "old"

The key distinction: emergencies are unexpected, necessary, and often urgent. An emergency fund keeps you from going into debt when these situations arise.`,
          examples: [
            'Your car needs a $800 transmission repair to get to work - that\'s an emergency',
            'Black Friday sale on a TV - NOT an emergency, save separately for that',
            'Emergency room visit with $1,500 deductible - that\'s an emergency'
          ],
          tips: [
            'Keep emergency fund in a separate account so you\'re not tempted to spend it',
            'Make it slightly inconvenient to access (different bank) but not impossible',
            'If you use emergency funds, replenish them as quickly as possible',
            'Create a "sinking fund" for predictable irregular expenses (car insurance, holidays) so they don\'t become "emergencies"'
          ]
        },
        {
          title: 'Why Emergency Funds Are Critical',
          content: `**1. Prevent Debt Spirals**
Without an emergency fund, unexpected expenses go on credit cards. At 20% APR, a $2,000 car repair costs $2,400+ if you take a year to pay it off. Multiple emergencies = multiple debts = financial stress spiral.

**2. Protect Against Job Loss**
The average job search takes 3-6 months. Without savings, losing your job means losing your home, going into debt, or accepting any job out of desperation rather than finding the right fit.

**3. Reduce Financial Stress and Anxiety**
Knowing you can handle a $1,000 emergency without panic reduces daily stress. You sleep better, focus better at work, and make better financial decisions when not in constant crisis mode.

**4. Avoid Predatory Lending**
Without emergency savings, people turn to payday loans (400% APR!), title loans, or cash advances. These "solutions" create worse problems and trap you in cycles of debt.

**5. Maintain Progress Toward Other Goals**
When emergencies hit without a fund, you have to raid retirement accounts (penalties + taxes), stop retirement contributions, or abandon other financial goals. Your fund protects long-term progress.

**6. Negotiate From Strength**
With an emergency fund, you can leave toxic jobs, negotiate better, refuse unfair treatment, and make choices based on what's right—not desperation.`,
          examples: [
            'Without emergency fund: $1,000 medical bill on credit card → pays $1,200+ with interest',
            'With emergency fund: $1,000 medical bill paid from savings → $1,000 total cost, then replenish savings',
            'Job loss without savings: Take first low-paying job out of desperation',
            'Job loss with 6-month fund: Take time to find right role, negotiate better salary'
          ],
          tips: [
            'Even $500 breaks the paycheck-to-paycheck cycle for many people',
            'Emergency funds aren\'t pessimistic—they\'re realistic and empowering',
            'The peace of mind alone is worth the effort of building one',
            'Think of your emergency fund as insurance you control'
          ]
        },
        {
          title: 'The Real Cost of No Emergency Fund',
          content: `Let's examine what happens when you DON'T have an emergency fund:

**Scenario: $2,500 Emergency Without Savings**

Option 1: Credit Card (20% APR, minimum payments)
• Total cost if paid over 2 years: $3,100
• Extra cost: $600 in interest
• Takes 24 months to pay off
• Stress: High

Option 2: Payday Loan ($500 for 2 weeks at 400% APR)
• Need to roll it over 5 times to cover full $2,500
• Costs $750-$1,000 in fees
• Creates debt trap cycle
• Stress: Extreme

Option 3: Retirement Account Withdrawal
• 10% early withdrawal penalty: $250
• Income taxes (22% bracket): $550
• Total cost: $800 in penalties/taxes
• Long-term cost: Lost growth on that $2,500 (could be $10,000+ by retirement)
• Stress: Moderate but future-damaging

Option 4: Emergency Fund
• Cost: $2,500 (then rebuild savings)
• No interest, penalties, or fees
• No long-term damage
• Stress: Minimal

The same $2,500 emergency costs anywhere from $2,500 (with fund) to $3,100+ (without fund). Plus immeasurable stress.`,
          examples: [
            'Family with no fund, multiple small emergencies ($300 + $500 + $800) → $4,000 credit card debt accumulates',
            'Family with $3,000 fund → handles all three, replenishes over next few months',
            'Single parent laid off without savings → loses apartment, moves in with family, kids change schools',
            'Single parent with 4-month fund → pays bills while finding new job, minimal life disruption'
          ],
          tips: [
            'Calculate what your last 3 unexpected expenses cost - imagine if they\'d been on a credit card',
            'Consider opportunity cost: interest paid on debt could have been invested for your future',
            'Remember that financial stress affects health, relationships, job performance',
            'Start with ANY amount - $50 is infinitely better than $0'
          ]
        }
      ],
      keyTakeaways: [
        'An emergency fund is money set aside exclusively for unexpected, necessary expenses—not wants or planned purchases',
        'Emergency funds prevent debt spirals, protect against job loss, and reduce financial stress and anxiety',
        'Without an emergency fund, the same expense costs significantly more due to interest, fees, penalties, and stress',
        'Even a small emergency fund ($500-$1,000) breaks the paycheck-to-paycheck cycle and provides peace of mind',
        'Emergency funds protect your long-term financial goals from being derailed by short-term crises'
      ],
      actionItems: [
        'Open a separate savings account dedicated exclusively to emergency funds',
        'Calculate what your last unexpected expense cost - imagine if it had been on a credit card at 20% APR',
        'Set a starter goal of $500-$1,000 before building to larger amounts',
        'Identify one recurring expense you could reduce to free up $25-50/month for emergency savings',
        'Write down your personal "why" for building an emergency fund and post it where you\'ll see it regularly'
      ],
      resources: [
        {
          type: 'calculator',
          title: 'Emergency Fund Calculator',
          description: 'Calculate how much you need based on your expenses and situation',
          url: '/tools/emergency-fund-calculator'
        },
        {
          type: 'worksheet',
          title: 'Emergency vs. Non-Emergency Decision Tree',
          description: 'Flowchart to help decide if an expense qualifies as an emergency',
          url: '/resources/emergency-decision-tree.pdf'
        },
        {
          type: 'article',
          title: 'Real Stories: How Emergency Funds Saved the Day',
          description: 'Real examples from people whose emergency funds prevented financial disaster',
          url: '/blog/emergency-fund-success-stories'
        }
      ]
    },
    'Understand why emergency funds are essential for financial stability, explore the real costs of not having one, and learn how they protect you from debt and financial stress.',
    [
      'Define what constitutes a true emergency vs. a planned or discretionary expense',
      'Explain the multiple ways emergency funds protect your financial health',
      'Calculate the real cost difference between handling emergencies with vs. without savings',
      'Understand how emergency funds reduce stress and provide financial security',
      'Recognize how emergency funds protect long-term financial goals'
    ],
    [
      'Emergency vs. non-emergency expenses',
      'Financial safety net',
      'Debt prevention',
      'Job loss protection',
      'Predatory lending avoidance',
      'Financial stress reduction',
      'Opportunity cost of debt'
    ]
  )

  console.log('\n✅ All lessons populated successfully!')
}

populateAllLessons()
