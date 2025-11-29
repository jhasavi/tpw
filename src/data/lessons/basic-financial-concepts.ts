import { Lesson } from '@/types/curriculum'

/**
 * Lesson: Basic Financial Concepts
 * Course: Financial Literacy Basics
 */

export const basicFinancialConcepts: Lesson = {
  id: 'basic-financial-concepts',
  courseId: 'financial-literacy-basics',
  slug: 'basic-financial-concepts',
  title: 'Basic Financial Concepts',
  description: 'Master the fundamental financial terms and concepts that form the foundation of your financial life.',
  durationMinutes: 40,
  displayOrder: 2,
  objectives: [
    'Understand the difference between income, expenses, assets, and liabilities',
    'Learn how to calculate your net worth',
    'Distinguish between needs and wants in your spending',
    'Understand cash flow and why it matters',
    'Build a foundation for making informed financial decisions'
  ],
  keyConcepts: [
    'Income vs. Expenses',
    'Assets vs. Liabilities',
    'Net Worth',
    'Cash Flow',
    'Needs vs. Wants'
  ],
  content: {
    introduction: `Money can feel overwhelming when you don't understand the basic language. But here's the truth: the core concepts of personal finance are actually quite simple. Once you understand these building blocks, everything else starts to make sense.

Think of this lesson as learning the alphabet before writing a book. You don't need a finance degree to understand your money—you just need to know a few key terms and how they work together.

By the end of this lesson, you'll be able to look at your financial life with clarity and confidence. Let's break it down together.`,

    sections: [
      {
        title: '1. Income: Money Coming In',
        content: `Income is any money you receive regularly. It's the foundation of your financial life because you can't spend, save, or invest what you don't have.

Income comes in many forms:
• Salary or wages from your job
• Self-employment income from your business
• Tips, bonuses, or commissions
• Government benefits (Social Security, disability, unemployment)
• Child support or alimony
• Investment returns (dividends, interest, rent)

The key is to think about your income in terms of what you actually receive after taxes—your "take-home pay" or "net income." This is what you have available to spend and save.`,
        examples: [
          'Sarah works as a teacher earning $55,000/year. After taxes and deductions, she takes home about $3,400/month—this is her net income.',
          'Maria runs a house cleaning business and earns anywhere from $2,000-$4,000/month depending on how many clients she has. Her income is irregular, so she plans based on her lowest months.',
          'Jennifer receives $1,800/month in Social Security plus $600/month from a part-time job at a bookstore—her total monthly income is $2,400.'
        ],
        tips: [
          'Always base your budget on take-home pay, not gross salary',
          'If your income varies, plan for the low months and save extra during high months',
          'Track all income sources, even small ones—they add up',
          'Consider ways to increase income through raises, side work, or new skills'
        ]
      },
      {
        title: '2. Expenses: Money Going Out',
        content: `Expenses are what you spend money on. Understanding your expenses is crucial because this is where most people lose control of their finances.

There are two main types of expenses:

**Fixed Expenses** stay the same each month:
• Rent or mortgage
• Car payment
• Insurance premiums
• Loan payments
• Phone bill

**Variable Expenses** change from month to month:
• Groceries
• Gas
• Utilities (can vary seasonally)
• Entertainment
• Shopping
• Dining out

The goal isn't to eliminate all expenses—you need to spend money to live! The goal is to be intentional about where your money goes and make sure your expenses don't exceed your income.`,
        examples: [
          'Lisa spends $1,200/month on fixed expenses (rent, car, insurance) and about $800/month on variable expenses (groceries, gas, fun). Her total expenses are around $2,000/month.',
          'When Ana reviewed her expenses, she found she was spending $300/month on takeout without realizing it. She didn\'t need to eliminate it entirely—she just reduced it to $100/month.',
          'Rachel\'s heating bill jumps from $80 in summer to $250 in winter. She budgets $150/month year-round and uses the extra from summer months to cover winter costs.'
        ],
        tips: [
          'Track expenses for at least one month to see where money really goes',
          'Don\'t judge yourself—just observe and learn',
          'Look for "invisible" expenses like subscriptions you forgot about',
          'Remember: small recurring expenses add up to big money over time'
        ]
      },
      {
        title: '3. Assets vs. Liabilities: What You Own and What You Owe',
        content: `These two concepts are the foundation of building wealth.

**Assets** are things you own that have value:
• Cash and savings
• Your home (if you own it)
• Retirement accounts (401k, IRA)
• Investments (stocks, bonds, mutual funds)
• Your car
• Valuable possessions (jewelry, art, collectibles)

**Liabilities** are debts you owe:
• Credit card balances
• Student loans
• Car loans
• Mortgage
• Personal loans
• Medical bills

Here's the simple rule: to build wealth, you want to increase your assets and decrease your liabilities over time.

Not all debt is bad—a mortgage that helps you own a home can be a smart use of debt. But high-interest credit card debt that grows faster than you can pay it is holding you back.`,
        examples: [
          'Keisha owns a car worth $12,000 but still owes $8,000 on the loan. The car is an asset ($12,000) and the loan is a liability ($8,000).',
          'Patricia has $5,000 in savings, $15,000 in her 401k, and owns furniture worth about $3,000. Her total assets: $23,000.',
          'Nina has $8,000 in credit card debt, $25,000 in student loans, and no assets except $500 in checking. She realizes she needs to focus on paying down debt while building savings.'
        ],
        tips: [
          'Your assets should grow faster than your liabilities',
          'Focus on paying off high-interest debt first',
          'Building assets (savings, investments) is just as important as paying off debt',
          'Some assets like cars lose value over time—they\'re still assets, but be realistic about their worth'
        ]
      },
      {
        title: '4. Net Worth: Your Financial Snapshot',
        content: `Your net worth is the simplest measure of your overall financial health. It's calculated like this:

**Net Worth = Total Assets - Total Liabilities**

In plain English: Add up everything you own, subtract everything you owe, and what's left is your net worth.

Your net worth can be positive or negative:
• Positive net worth means you own more than you owe
• Negative net worth means you owe more than you own

Don't panic if your net worth is negative—many people start there, especially with student loans or when first starting out. What matters is the direction it's moving.

Calculate your net worth at least once a year. Watching it grow over time is incredibly motivating!`,
        examples: [
          'Samantha has $3,000 in savings, $10,000 in retirement, and owes $15,000 in student loans. Her net worth: $13,000 - $15,000 = -$2,000 (negative, but improving)',
          'Diane has $50,000 in home equity, $30,000 in retirement, $10,000 in savings, and $5,000 in credit card debt. Her net worth: $90,000 - $5,000 = $85,000',
          'Young professionals with student debt often start with negative net worth. That\'s okay! The goal is to move the number up each year.'
        ],
        tips: [
          'Calculate your net worth today—it\'s your financial starting point',
          'Don\'t compare your net worth to others—compare it to your own past',
          'Small, consistent improvements add up to big changes over years',
          'Celebrate progress: paying off $5,000 in debt increases your net worth by $5,000!'
        ]
      },
      {
        title: '5. Cash Flow: The Money Movement',
        content: `Cash flow is simply the movement of money in and out of your life each month.

**Positive Cash Flow:** You have money left over after paying expenses
Income > Expenses = Money to save/invest

**Negative Cash Flow:** You spend more than you earn
Income < Expenses = Going into debt or draining savings

**Neutral Cash Flow:** You break even
Income = Expenses = Living paycheck to paycheck

Your goal is positive cash flow—even if it's just $50/month. That's $50 that can go toward savings, debt payoff, or investing.

Many people make good money but still struggle because their expenses match or exceed their income. This is why understanding cash flow matters more than how much you earn.`,
        examples: [
          'Carmen earns $3,500/month and spends $3,000. Her cash flow is +$500/month, which she uses to build emergency savings.',
          'Brittany earns $4,000/month but spends $4,200. Her cash flow is -$200/month, and she\'s using credit cards to cover the gap—this needs to change.',
          'After tracking expenses, Michelle found she could cut $150/month in subscriptions and reduce eating out by $100. This changed her cash flow from neutral to +$250/month.'
        ],
        tips: [
          'Track your cash flow for 3 months to understand your true patterns',
          'If cash flow is negative, you must either earn more or spend less (or both)',
          'Positive cash flow gives you options: save, invest, or enjoy life without guilt',
          'Small improvements to cash flow compound dramatically over time'
        ]
      }
    ],

    keyTakeaways: [
      'Income minus expenses equals cash flow—this is your most important monthly number',
      'Assets are what you own, liabilities are what you owe, and net worth is the difference',
      'Positive cash flow means you\'re moving forward financially, even if it\'s slow',
      'Not all expenses are bad, but they should be intentional and aligned with your values',
      'Your net worth is your financial scorecard—track it and watch it grow over time',
      'Understanding these basics gives you the language to take control of your money',
      'You don\'t need to be perfect—you just need to be aware and intentional'
    ],

    actionItems: [
      'Calculate your current net worth using the simple formula: Assets - Liabilities',
      'Track all income and expenses for the next 30 days to understand your cash flow',
      'List your fixed vs. variable expenses to see where you have flexibility',
      'Identify one expense you can reduce to improve your cash flow by at least $50/month',
      'Set a calendar reminder to recalculate your net worth in 3 months and watch your progress'
    ],

    resources: [
      {
        title: 'Net Worth Calculator',
        type: 'calculator',
        description: 'Simple spreadsheet to calculate and track your net worth over time',
        url: 'https://www.nerdwallet.com/article/finance/net-worth-calculator'
      },
      {
        title: 'Expense Tracking Template',
        type: 'worksheet',
        description: 'Download a free monthly expense tracker to identify where your money goes',
        url: 'https://www.vertex42.com/ExcelTemplates/money-management-template.html'
      },
      {
        title: 'Cash Flow Worksheet',
        type: 'worksheet',
        description: 'Calculate your monthly cash flow and identify opportunities for improvement',
        url: 'https://www.consumerfinance.gov/consumer-tools/budget-worksheet/'
      },
      {
        title: 'Personal Finance Glossary',
        type: 'article',
        description: 'Reference guide for common financial terms and concepts',
        url: 'https://www.investopedia.com/personal-finance-4427760'
      }
    ]
  }
}
