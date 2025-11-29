import { Lesson } from '@/types/curriculum'

/**
 * Sample Lesson: Understanding Money & Banking
 * Course: Financial Literacy Basics
 * 
 * This serves as a template for all future lesson content.
 * Every lesson should have this level of detail and practical application.
 */

export const sampleLesson: Lesson = {
  id: 'understanding-money-banking',
  courseId: 'financial-literacy-basics',
  slug: 'understanding-money-banking',
  title: 'Understanding Money & Banking',
  description: 'Learn what money really is, how the banking system works, and why it matters for your financial future.',
  durationMinutes: 30,
  displayOrder: 1,
  objectives: [
    'Understand what money is and its three key functions',
    'Learn how banks work and make money',
    'Know the different types of bank accounts and when to use each',
    'Understand FDIC insurance and how it protects you',
    'Make informed decisions about where to keep your money'
  ],
  keyConcepts: [
    'Medium of Exchange',
    'Store of Value',
    'Unit of Account',
    'Checking vs. Savings Accounts',
    'Interest Rates',
    'FDIC Insurance',
    'Credit Unions vs. Banks',
    'Online Banks vs. Traditional Banks'
  ],
  content: {
    introduction: `Have you ever stopped to think about what money really is? It's more than just the bills in your wallet or the numbers in your bank account. Understanding money and the banking system is the first step toward taking control of your financial life.

In this lesson, we'll break down what money is, how banks work, and how to make smart choices about where to keep your money. No jargon, no judgment—just practical knowledge you can use right away.`,

    sections: [
      {
        title: 'What is Money?',
        content: `Money is a tool that serves three main purposes:

**1. Medium of Exchange**
Money lets you trade your work (like teaching, nursing, or running a business) for things you need without having to barter. Instead of finding someone who wants exactly what you have to offer, you use money.

**2. Store of Value**
Money holds its value over time (mostly). You can earn it today and spend it next month without it disappearing. This is crucial for saving and planning.

**3. Unit of Account**
Money gives us a common way to measure value. A coffee is $5, rent is $1,500, a car is $30,000. This makes it easy to compare and make decisions.`,
        examples: [
          'Without money as a medium of exchange, a teacher would have to find someone who both wants tutoring AND has groceries to trade.',
          'If money didn\'t store value, you couldn\'t save up for a down payment or emergency fund.',
          'Unit of account helps you quickly compare: "Is a $50 haircut worth 10 lattes to me?"'
        ],
        tips: [
          'Understanding these functions helps you see why inflation (when money loses value) matters',
          'Different forms of money (cash, checking, savings, investments) serve these functions differently'
        ]
      },
      {
        title: 'How Banks Work',
        content: `Banks are businesses that make money by doing a few key things:

**They take deposits** - When you put money in a bank, they pay you a small amount of interest (usually tiny for checking, slightly more for savings).

**They loan money** - Banks lend your deposited money to other people and businesses at a higher interest rate than they pay you. This difference is how they make profit.

**They provide services** - ATMs, online banking, debit cards, check writing, bill pay—banks charge fees or use these to attract customers.

**Example:** 
- You deposit $1,000 in savings. The bank pays you 0.5% interest ($5/year).
- The bank loans that money to someone buying a car at 6% interest ($60/year).
- The bank's profit: $55 (minus operating costs).`,
        examples: [
          'A woman deposits $5,000 in a savings account earning 0.5% = $25/year',
          'That same $5,000 is loaned to a small business at 8% = $400/year',
          'The bank\'s profit is $375 from that one customer\'s deposit'
        ],
        tips: [
          'This is why banks want your deposits—it\'s how they make money',
          'It\'s also why shopping around for better interest rates matters',
          'Online banks often have higher rates because they have lower overhead costs'
        ]
      },
      {
        title: 'Types of Bank Accounts',
        content: `**Checking Account**
- **Purpose:** Day-to-day spending
- **Access:** Unlimited withdrawals, debit card, checks, bill pay
- **Interest:** Usually none or very low
- **Best for:** Paying bills, everyday expenses, direct deposit

**Savings Account**
- **Purpose:** Short to medium-term savings goals
- **Access:** Limited withdrawals (usually 6 per month)
- **Interest:** Small but more than checking
- **Best for:** Emergency fund, saving for a vacation or car

**High-Yield Savings Account** (Often online banks)
- **Purpose:** Better returns on savings
- **Access:** Online, limited withdrawals
- **Interest:** 10-20x higher than traditional savings
- **Best for:** Emergency fund, medium-term goals

**Money Market Account**
- **Purpose:** Higher returns with some checking features
- **Access:** Limited checks, debit card sometimes
- **Interest:** Between savings and high-yield savings
- **Best for:** Larger emergency funds ($10,000+)

**Certificates of Deposit (CDs)**
- **Purpose:** Lock in a fixed rate for a set time
- **Access:** Money locked for 6 months to 5 years
- **Interest:** Higher than savings, guaranteed rate
- **Best for:** Money you won't need for a specific period`,
        examples: [
          'Emily keeps $2,000 in checking for monthly bills and $5,000 in high-yield savings for emergencies',
          'Sarah puts $10,000 in a 1-year CD earning 5% because she knows she won\'t need it before then'
        ],
        tips: [
          'Most people need both checking (spending) and savings (emergency fund)',
          'Don\'t keep large amounts in regular checking—it earns nothing',
          'Online high-yield savings accounts are FDIC insured and safe'
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
- Look for "Member FDIC" or "NCUA" (for credit unions) logos`,
        examples: [
          'Rachel has $100,000 in savings at Bank A and $150,000 at Bank B. Both amounts are fully insured.',
          'If Bank A fails, Rachel gets all $100,000 back within a few days.'
        ],
        tips: [
          'If you have more than $250,000 to protect, use multiple banks',
          'FDIC insurance is automatic—you don\'t need to apply',
          'This protection is one reason why keeping cash under your mattress is risky'
        ]
      },
      {
        title: 'Banks vs. Credit Unions vs. Online Banks',
        content: `**Traditional Banks**
- **Pros:** Many branches, full services, established
- **Cons:** Lower interest rates, more fees
- **Best for:** People who want in-person service

**Credit Unions**
- **Pros:** Better rates, lower fees, member-owned (profits go back to you)
- **Cons:** Fewer branches, membership requirements
- **Best for:** Those who qualify and value personal service

**Online Banks**
- **Pros:** Best interest rates, lowest fees, 24/7 access
- **Cons:** No physical branches, no cash deposits (usually)
- **Best for:** Tech-comfortable people maximizing savings`,
        examples: [
          'Maria uses a credit union for low-fee checking and an online bank for her high-yield emergency fund',
          'Jennifer keeps a traditional bank checking account (near work) plus an online savings account earning 4.5%'
        ],
        tips: [
          'You can use multiple types—checking at a local bank, savings online',
          'Compare fees and interest rates annually',
          'Many online banks reimburse ATM fees'
        ]
      }
    ],

    keyTakeaways: [
      'Money serves three functions: medium of exchange, store of value, and unit of account',
      'Banks make money by lending your deposits at higher interest than they pay you',
      'Checking accounts are for spending; savings accounts are for saving',
      'FDIC insurance protects up to $250,000 per depositor, per bank',
      'Online banks often offer 10-20x higher interest rates than traditional banks',
      'You can (and should) use multiple accounts optimized for different purposes',
      'Credit unions are member-owned and often have better rates and lower fees'
    ],

    actionItems: [
      'Review your current bank accounts: Are you earning interest on savings?',
      'Calculate how much interest you\'re earning (or losing) annually',
      'Research high-yield savings accounts if you\'re earning less than 3%',
      'Check that your accounts are FDIC or NCUA insured',
      'Consider opening a separate savings account if you only have checking'
    ],

    resources: [
      {
        title: 'FDIC BankFind',
        type: 'tool',
        description: 'Verify your bank is FDIC insured and check your coverage',
        url: 'https://banks.data.fdic.gov/bankfind-suite/bankfind'
      },
      {
        title: 'High-Yield Savings Comparison',
        type: 'tool',
        description: 'Compare interest rates across online savings accounts',
        url: 'https://www.nerdwallet.com/best/banking/high-yield-online-savings-accounts'
      },
      {
        title: 'Savings Goal Worksheet',
        type: 'worksheet',
        description: 'Calculate how much you need to save and where to keep it'
      },
      {
        title: 'Bank Account Comparison Checklist',
        type: 'worksheet',
        description: 'Compare fees, rates, and features across banks'
      }
    ]
  }
}

// This structure should be followed for ALL lessons across all courses
