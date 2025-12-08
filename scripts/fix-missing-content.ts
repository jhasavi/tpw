#!/usr/bin/env node

/**
 * Fix Missing Lesson Content
 * Updates three lessons that were showing "Coming Soon" or "Error Loading"
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(msg: string, color: keyof typeof colors = 'reset') {
  console.log(`${colors[color]}${msg}${colors.reset}`);
}

async function fixLessons() {
  log('\n📚 Fixing Missing Lesson Content\n', 'cyan');

  try {
    // Get curriculum and course IDs
    const { data: curriculum } = await supabase
      .from('curricula')
      .select('id')
      .eq('slug', 'womens-financial-literacy')
      .single();

    if (!curriculum) {
      log('❌ Curriculum not found', 'red');
      return;
    }

    const { data: course } = await supabase
      .from('courses')
      .select('id')
      .eq('curriculum_id', curriculum.id)
      .eq('slug', 'financial-literacy-basics')
      .single();

    if (!course) {
      log('❌ Course not found', 'red');
      return;
    }

    // 1. Fix Understanding Money & Banking
    log('1️⃣  Fixing "Understanding Money & Banking"...', 'yellow');
    const moneyBankingContent = {
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
          keyPoints: [
            'Money is valuable because we collectively agree it is',
            'Different cultures have used different things as money throughout history',
            'Digital money (apps, checking accounts) is money too'
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
• Member-owned cooperatives (not-for-profit)
• Lower fees, better rates on savings and loans
• May have fewer branches or membership requirements
• Funds are insured by NCUA, similar to FDIC

**Online Banks (Ally, Charles Schwab, Marcus)**
• No physical branches
• Highest interest rates on savings
• Lowest fees
• 100% digital (good for tech-savvy, inconvenient if you need checks/deposits)

**Community Banks**
• Local, independent institutions
• Personal service, community involvement
• May offer better rates for local customers
• FDIC insured like commercial banks`,
          keyPoints: [
            'Commercial banks are convenient but watch fees',
            'Credit unions offer better rates if you qualify',
            'Online banks have the best savings rates',
            'All deposits are insured by FDIC (banks) or NCUA (credit unions)'
          ]
        },
        {
          title: 'Types of Accounts',
          content: `Different accounts serve different purposes. Choose based on how you'll use the money:

**Checking Account**
• For daily spending and bill payments
• Unlimited deposits and withdrawals
• Comes with debit card and checks
• Usually earns little to no interest
• Watch for monthly fees ($10-15 at big banks, $0-5 at online banks)

**Savings Account**
• For money you're saving but might need within a few months
• Earns interest (varies: 0.01% at big banks, 4-5% at online banks)
• Limited withdrawals per month (usually 6)
• FDIC insured up to $250,000

**Money Market Account**
• Hybrid between checking and savings
• Higher interest than savings (currently 4-5%)
• Come with limited check-writing
• Higher minimum balance ($2,500+)
• FDIC insured up to $250,000

**Certificate of Deposit (CD)**
• You agree to leave money for a fixed period (3 months to 5 years)
• Higher interest rates in exchange for locking in funds
• Penalty for early withdrawal (usually 3-6 months interest)
• FDIC insured up to $250,000
• Great for short-term goals (car down payment in 2 years, wedding in 18 months)`,
          keyPoints: [
            'Keep 1-2 months expenses in checking, rest in savings or other accounts',
            'Shop around - online savings accounts often pay 10-15x more than traditional banks',
            'Avoid overdraft fees by linking savings as backup or opting out of overdraft',
            'CD laddering: open multiple CDs with staggered maturity dates for flexibility'
          ]
        },
        {
          title: 'FDIC Insurance: Your Money is Safe',
          content: `The FDIC (Federal Deposit Insurance Corporation) protects your money if your bank fails.

**Coverage:**
- Up to $250,000 per depositor, per bank
- Covers checking, savings, CDs, money market accounts
- Does NOT cover investments (stocks, bonds, mutual funds)

**What this means for you:**
If your bank goes out of business, the FDIC guarantees you'll get your money back (up to $250,000). This has been in place since 1933, and no one has lost insured deposits.

**Important:** 
- Each bank has separate $250,000 coverage
- Joint accounts have $500,000 coverage ($250,000 per owner)
- Look for "Member FDIC" or "NCUA" (for credit unions) logos

**Strategy:**
If you have more than $250,000, spread it across multiple banks to stay fully insured. For example:
- $200,000 in Bank A
- $200,000 in Bank B
- Both fully insured and earning interest`,
          keyPoints: [
            'FDIC insurance is free (banks pay for it)',
            'Your deposits are 100% safe up to $250,000',
            'This protection has never been needed in modern times',
            'Even during 2008 financial crisis, no insured deposits were lost'
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
        'Compare your current checking account fees with online options (you might save $100+/year)',
        'Review your current savings account interest rate with online high-yield savings accounts',
        'Set up at least two accounts: one checking for daily spending and one savings for emergency funds',
        'Calculate if you need multiple banks to stay within the $250,000 FDIC insurance limit'
      ],
      resources: [
        {
          type: 'tool',
          title: 'FDIC BankFind',
          description: 'Look up if your bank is FDIC insured',
          url: 'https://banks.data.fdic.gov/bankfind-suite/bankfind'
        },
        {
          type: 'tool',
          title: 'Credit Union Locator',
          description: 'Find credit unions in your area',
          url: 'https://www.mycreditunion.gov/about-credit-unions/credit-union-locator'
        },
        {
          type: 'article',
          title: 'Best High-Yield Savings Accounts',
          description: 'Compare current rates',
          url: '/blog/best-savings-accounts'
        }
      ]
    };

    const { error: error1 } = await supabase
      .from('lessons')
      .update({
        content: moneyBankingContent,
        is_published: true
      })
      .eq('course_id', course.id)
      .eq('slug', 'understanding-money-banking');

    if (error1) {
      log(`❌ Error updating Understanding Money & Banking: ${error1.message}`, 'red');
    } else {
      log('✅ Updated "Understanding Money & Banking"', 'green');
    }

    // 2. Fix Insurance Basics
    log('\n2️⃣  Fixing "Insurance Basics"...', 'yellow');
    const insuranceContent = {
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
    };

    const { error: error2 } = await supabase
      .from('lessons')
      .update({
        content: insuranceContent,
        is_published: true
      })
      .eq('course_id', course.id)
      .eq('slug', 'insurance-basics');

    if (error2) {
      log(`❌ Error updating Insurance Basics: ${error2.message}`, 'red');
    } else {
      log('✅ Updated "Insurance Basics"', 'green');
    }

    // 3. Fix Smart Shopping & Saving
    log('\n3️⃣  Fixing "Smart Shopping & Saving"...', 'yellow');
    const shoppingContent = {
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
        },
        {
          title: 'Cashback and Rewards',
          content: 'Use apps and credit cards strategically to turn spending into savings.',
          keyPoints: [
            'Rakuten: Up to 40% cashback at 3,500+ stores',
            'Swagbucks: Earn points for shopping and surveys',
            'Credit card rewards: 1-5% back on purchases',
            'Stack rewards: Use app + credit card cashback together'
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
        'Create a 30-day want list before major purchases',
        'Unsubscribe from 5 marketing emails',
        'Set up price alerts for items you need'
      ],
      resources: [
        {
          type: 'tool',
          title: 'Honey Browser Extension',
          description: 'Automatic coupon finder and cashback',
          url: 'https://www.joinhoney.com'
        },
        {
          type: 'tool',
          title: 'Rakuten',
          description: 'Cashback rewards at thousands of stores',
          url: 'https://www.rakuten.com'
        },
        {
          type: 'tool',
          title: 'CamelCamelCamel',
          description: 'Amazon price history and alerts',
          url: 'https://camelcamelcamel.com'
        }
      ]
    };

    const { error: error3 } = await supabase
      .from('lessons')
      .update({
        content: shoppingContent,
        is_published: true
      })
      .eq('course_id', course.id)
      .eq('slug', 'smart-shopping-saving');

    if (error3) {
      log(`❌ Error updating Smart Shopping & Saving: ${error3.message}`, 'red');
    } else {
      log('✅ Updated "Smart Shopping & Saving"', 'green');
    }

    log('\n✅ All lessons fixed successfully!\n', 'green');

  } catch (error) {
    log(`\n❌ Error: ${error}`, 'red');
  }
}

fixLessons();
