import { Lesson } from '@/types/curriculum'

export const whereToKeepEmergencyFund: Lesson = {
  id: 'where-to-keep-emergency-fund',
  courseId: 'emergency-planning',
  slug: 'where-to-keep-emergency-fund',
  title: 'Where to Keep Your Emergency Fund',
  description: 'Learn the best places to store emergency savings for accessibility, safety, and growth.',
  durationMinutes: 35,
  displayOrder: 3,
  objectives: [
    'Understand the key requirements for emergency fund storage',
    'Compare different account types for emergency savings',
    'Choose the best account(s) for your emergency fund',
    'Maximize interest earnings while maintaining access',
    'Avoid common mistakes that put emergency funds at risk'
  ],
  keyConcepts: [
    'High-Yield Savings Account',
    'Liquidity',
    'FDIC Insurance',
    'Accessibility vs. Growth',
    'Account Separation'
  ],
  content: {
    introduction: `Where you keep your emergency fund matters as much as having one. The wrong account can cost you money or put your savings at risk.

Your emergency fund needs three things: Safety (won't lose value), Accessibility (get it quickly when needed), and Growth (earn something while it sits there).

Sounds simple, right? But people make costly mistakes: keeping it in checking (earns nothing), locking it in CDs (can't access), or investing it in stocks (loses value when market drops).

This lesson will show you exactly where to keep your emergency fund to maximize all three factors. You'll learn which accounts work best and which to avoid completely.`,

    sections: [
      {
        title: '1. The Three Essential Requirements',
        content: `Emergency fund storage must meet ALL three requirements simultaneously:

**Requirement 1: SAFETY**
Your emergency fund cannot be at risk of losing value.

Must haves:
• FDIC insured (banks) or NCUA insured (credit unions)
• Not invested in stocks, bonds, or volatile assets
• Protected up to $250,000 per depositor, per institution
• Guaranteed principal (you'll never have less than you deposited)

Why it matters:
If you need emergency money when the stock market is down 30%, you're forced to sell at a loss. Emergency funds must be stable, period.

**Requirement 2: ACCESSIBILITY (Liquidity)**
You need to access your money quickly when emergency strikes.

Must haves:
• Available within 1-3 business days maximum
• No penalties for withdrawal
• No waiting periods or restrictions
• Can transfer to checking account easily

Why it matters:
Car breaks down Monday, needs repair to get to work. You need $600 by Wednesday. If money is locked in a CD or takes a week to access, it's not serving its purpose.

**Requirement 3: GROWTH (Interest)**
While safety and access come first, you should earn SOMETHING.

Should have:
• Earns interest (not $0)
• Preferably high-yield (3-5% APY currently)
• Interest compounds
• No fees eating into earnings

Why it matters:
$10,000 in checking earning 0% = $10,000 after 5 years
$10,000 in high-yield savings at 4% = $12,166 after 5 years
That's $2,166 in free money just for keeping it in the right place.

**The Balance:**

Can't sacrifice safety or accessibility for growth:
• ❌ Stocks earn more but aren't safe
• ❌ CDs earn more but aren't accessible
• ✅ High-yield savings accounts meet all three requirements

**The Rule:**
Emergency fund goes in boring, safe, accessible accounts that earn some interest. Everything else is investing (different purpose, different accounts).`,
        examples: [
          'Maya kept her $5,000 emergency fund in regular checking earning 0%. She moved it to a high-yield savings account earning 4.5%. She now earns $225/year for doing nothing differently.',
          'Carmen put emergency fund in a 5-year CD earning 5% because "it\'s higher interest." When her car broke down, she had to pay early withdrawal penalty and lost 3 months interest. Accessibility matters.',
          'Nina invested her $8,000 emergency fund in stocks to "make it grow faster." When she lost her job AND the market was down 20%, she had to sell at a loss. Turned $8,000 into $6,400 when she needed it most.',
          'Lisa keeps $12,000 in Ally Bank high-yield savings earning 4.35%. It\'s FDIC insured (safe), transfers to checking in 1 day (accessible), and earns $522/year (growth). Perfect emergency fund home.'
        ],
        tips: [
          'Safety and accessibility are non-negotiable; interest rate is nice-to-have',
          'Never invest emergency fund in stocks, crypto, or anything volatile',
          'Verify FDIC or NCUA insurance before depositing',
          'If you can\'t access it within a week, it\'s not an emergency fund'
        ]
      },
      {
        title: '2. Best Account Options',
        content: `Let's compare the best places to keep your emergency fund:

**#1: High-Yield Savings Account (BEST OPTION)**

What it is: Online savings account offering 10-20x higher interest than traditional banks

Current rates: 4.0-5.0% APY (as of 2024-2025)

Pros:
• FDIC insured (safe)
• Accessible in 1-3 days (liquid)
• High interest rates (growth)
• No minimum balance usually
• No monthly fees
• Easy transfers to checking
• Can manage from phone app

Cons:
• Online only (no physical branch for some people)
• Takes 1-3 days to transfer (not instant, but fast enough)
• Rates fluctuate with Federal Reserve changes

Best for: Almost everyone. This is the gold standard.

Top providers: Ally Bank, Marcus by Goldman Sachs, American Express Savings, Capital One 360, Discover Savings

**#2: Money Market Account**

What it is: Savings account with some checking features (limited checks/debit card)

Current rates: 3.5-4.5% APY

Pros:
• FDIC insured
• Accessible immediately with debit card
• Earns decent interest
• Some allow limited check writing
• Slightly more flexible than savings

Cons:
• Often requires higher minimum balance ($2,500-10,000)
• May have monthly fees if below minimum
• Interest rates usually slightly lower than high-yield savings
• More complex than needed for most people

Best for: People who want immediate debit card access or have large emergency funds ($25,000+)

**#3: Traditional Savings Account (at your current bank)**

What it is: Basic savings account at brick-and-mortar bank

Current rates: 0.01-0.50% APY (terrible)

Pros:
• FDIC insured
• Immediately accessible
• Physical branch if you want face-to-face
• May already have one

Cons:
• Interest rates are pathetically low
• You're losing money to inflation
• Missing out on $400+/year on a $10,000 balance

Best for: People who absolutely refuse to use online banking (rare good reason to accept such low returns)

**#4: Cash Management Account**

What it is: Hybrid account offered by investment firms (like Fidelity, Vanguard)

Current rates: 2.5-4.5% APY

Pros:
• FDIC insured (usually through multiple banks)
• Debit card and check access
• Higher insurance coverage (sometimes $1M+ through multiple banks)
• Good if you already invest with that firm

Cons:
• Slightly more complex
• Rates sometimes lower than pure high-yield savings
• May require investment account too

Best for: People already investing with a major firm who want everything in one place`,
        examples: [
          'Elena moved her $15,000 emergency fund from Chase savings (0.01% = $1.50/year) to Ally high-yield savings (4.35% = $652/year). Same safety, same accessibility, $650 more per year.',
          'High-balance Nina opened a Fidelity Cash Management Account for her $40,000 emergency fund. Earns 4% ($1,600/year) and her money is FDIC insured up to $1.25M through multiple partner banks.',
          'Carmen wanted instant access, so she uses a money market account with debit card. Keeps $1,000 there, rest in high-yield savings. Best of both worlds.',
          'Rachel started with savings at her local credit union (convenient, familiar) earning 0.5%. Once comfortable with online banking, she moved to Marcus by Goldman Sachs earning 4.4%. Still FDIC insured, just better rate.'
        ],
        tips: [
          'High-yield savings account is best choice for 90% of people',
          'Shop for rates annually—banks compete, rates change',
          'Online banks aren\'t scary—they\'re FDIC insured just like physical banks',
          'Having checking and savings at different banks can reduce temptation to transfer and spend'
        ]
      },
      {
        title: '3. Where NOT to Keep Your Emergency Fund',
        content: `Just as important as knowing where TO keep it is knowing where NOT to:

**❌ Checking Account**

Why not:
• Earns 0% interest (or nearly nothing)
• Too accessible (tempting to spend)
• Mixes with daily spending money
• Inflation eats value

Exception: Keep 1-2 weeks expenses in checking as buffer, not full emergency fund

**❌ Certificates of Deposit (CDs)**

Why not:
• Money is locked for 6 months to 5 years
• Early withdrawal penalties (3-12 months interest)
• NOT accessible in emergency
• Defeats the purpose of emergency fund

Exception: "CD ladder" strategy for PART of large emergency fund (advanced strategy)

**❌ Stocks, Mutual Funds, ETFs**

Why not:
• Value fluctuates daily
• Could be down 20-50% when you need it
• Forces you to sell at worst possible time
• Defeats "safety" requirement

Exception: Once you have full emergency fund, additional savings CAN be invested

**❌ Cryptocurrency**

Why not:
• Extremely volatile
• Could lose 70%+ of value in months
• Not FDIC insured
• Absolutely not for emergency funds

Exception: Never. This is not an exception situation.

**❌ Retirement Accounts (401k, IRA)**

Why not:
• 10% early withdrawal penalty if under 59½
• Counts as taxable income
• Taxes + penalties = lose 30-40% of withdrawal
• Ruins your retirement
• Defeats purpose of retirement savings

Exception: Absolute last resort ONLY if alternative is homelessness

**❌ Under Your Mattress (Cash at Home)**

Why not:
• Earns 0% interest
• Not FDIC insured
• Risk of theft, fire, flood
• Inflation erodes value
• No records for large purchases/emergencies

Exception: $100-300 physical cash for power outages or immediate emergencies is fine, but not full fund

**❌ Regular Investment Apps (Robinhood, Acorns, etc.)**

Why not:
• Invested in stocks (volatile)
• Not designed for emergency access
• Can lose value when you need it

**❌ Prepaid Debit Cards**

Why not:
• Fees eat into balance
• No FDIC insurance often
• Can be lost or stolen
• Earns no interest
• Better options exist

**The Bottom Line:**
If it's risky, locked up, earning nothing, or not FDIC insured, it's the wrong place for your emergency fund.`,
        examples: [
          'Patricia kept $8,000 emergency fund in checking for "easy access." She earned $0 in interest and spent $1,200 of it on non-emergencies over six months because it was too available.',
          'When Nina\'s emergency fund was in stocks, she needed $3,000 during the 2020 market crash. Her $6,000 was worth $4,200. She took the loss and moved remaining to savings.',
          'Carmen put $5,000 in a 3-year CD earning 4.5%. Six months later, needed $2,000 for car repair. Early withdrawal penalty cost her $180 in interest. Lesson learned.',
          'After reading horror stories, Maya moved her $500 emergency fund from under her mattress to a high-yield savings account. Now it\'s insured, earning interest, and actually safer.'
        ],
        tips: [
          'Emergency fund goes in boring, safe accounts—exciting investments are for other money',
          'If you can lose it, it doesn\'t belong in emergency fund',
          'If you can\'t access it in a week, it\'s not an emergency fund',
          'Retirement money is for retirement, emergency money is for emergencies—don\'t mix them'
        ]
      },
      {
        title: '4. How to Set Up Your Emergency Fund Account',
        content: `Ready to open the right account? Here's your step-by-step guide:

**Step 1: Research High-Yield Savings Accounts**

Compare these factors:
• APY (interest rate)—look for 4-5%+
• Minimum balance requirements (prefer $0 minimum)
• Monthly fees (prefer $0 fees)
• Transfer time to your checking
• Mobile app reviews
• Customer service reputation
• FDIC insurance verification

Top-rated options to research:
• Ally Bank
• Marcus by Goldman Sachs
• American Express Personal Savings
• Capital One 360
• Discover Online Savings
• Synchrony Bank
• CIT Bank

Use Nerdwallet, Bankrate, or similar sites to compare current rates.

**Step 2: Open the Account**

You'll need:
• Social Security number
• Photo ID (driver's license)
• Current address
• Email address
• Phone number
• Existing bank account info (for initial funding)

Process takes 10-20 minutes online.

**Step 3: Link to Your Checking Account**

• Connect your current checking account
• Verify with small test deposits (they send 2 tiny amounts, you confirm the amounts)
• This enables transfers between accounts

Takes 2-3 business days to verify.

**Step 4: Set Up Initial Transfer**

• Transfer your current emergency fund balance
• Or set up recurring transfers to build it
• Confirm transfer completes

**Step 5: Optimize Settings**

• Turn off debit card if offered (reduces temptation)
• Set up balance alerts
• Enable statements and notifications
• Name account "EMERGENCY FUND - DO NOT TOUCH"
• Add account to your budgeting app for tracking

**Step 6: Automate Future Deposits**

• Set up automatic transfer from checking after each paycheck
• Even $50/paycheck builds fund automatically
• "Pay yourself first" into emergency fund

**Security Tips:**
• Use strong, unique password
• Enable two-factor authentication
• Never share login info
• Use bank app, not public wifi for access
• Monitor account monthly for unauthorized access`,
        examples: [
          'Lisa spent 15 minutes opening an Ally savings account online. She linked her checking, transferred $1,000, and set up $100 automatic transfer biweekly. Total setup: 30 minutes.',
          'Carmen compared rates on Nerdwallet, chose Marcus for the 4.4% rate and good reviews. Opened account on her phone during lunch break.',
          'Nina keeps her emergency fund at a different bank than her checking specifically so she can\'t do instant transfers. The 1-day wait time prevents impulse spending from emergency fund.',
          'Rachel opened a Capital One 360 account because they had both high-yield savings (for emergency fund) and checking (for daily use). She manages both from one app.'
        ],
        tips: [
          'Opening an online account is safe and takes 15-20 minutes',
          'Link but don\'t get debit card—you want slight friction to prevent non-emergency use',
          'Naming the account clearly helps prevent accidentally spending from it',
          'Set up automatic deposits so building happens without thinking about it'
        ]
      },
      {
        title: '5. Advanced Strategies',
        content: `Once you have the basics down, consider these optimization strategies:

**Strategy 1: The Two-Tier System**

Keep emergency fund in two places:
• Tier 1: $1,000-2,000 in easily accessible account (checking or money market with debit card)
• Tier 2: Remaining emergency fund in highest-yield savings

Why: Immediate access to Tier 1 for small emergencies, higher returns on Tier 2 (transfers in 1-3 days for bigger emergencies)

**Strategy 2: The CD Ladder (Advanced)**

For LARGE emergency funds ($20,000+), consider splitting:
• 50% in high-yield savings (fully accessible)
• 50% in CD ladder (higher rates, but less accessible)

CD ladder example:
$10,000 split into:
• $2,500 in 3-month CD
• $2,500 in 6-month CD
• $2,500 in 9-month CD
• $2,500 in 12-month CD

Every 3 months, one CD matures. Renew it into a 12-month CD. After first year, you have access to $2,500 every 3 months while earning higher rates.

Only for advanced savers with large funds who understand the complexity.

**Strategy 3: Rate Chasing**

Some people move money when another bank offers better rates:
• Monitor rate comparison sites monthly
• Move money if you find 0.5%+ better rate
• Worth it on large balances ($10,000+)

Caution: Diminishing returns. Moving $5,000 for 0.3% better rate = $15/year extra. Probably not worth the effort.

**Strategy 4: Multiple Banks for FDIC Coverage**

If you have $250,000+ in emergency savings:
• Split across multiple banks
• Each bank insures up to $250,000 per depositor
• Example: $250k at Ally, $250k at Marcus = $500k fully insured

**Strategy 5: I Bonds for Extended Emergency Fund (Advanced)**

For money beyond 6-month emergency fund:
• I Bonds earn inflation rate + fixed rate
• Must hold 12 months minimum (not for primary emergency fund)
• Lose 3 months interest if redeem before 5 years
• Can cash out after 12 months for extended emergencies
• Purchase at TreasuryDirect.gov
• Limited to $10,000/person/year

Only suitable for extended emergency fund you likely won't need soon.

**Strategy 6: Roth IRA as Backup (Last Resort)**

Roth IRA contributions (not earnings) can be withdrawn anytime, tax and penalty-free.

Very advanced strategy:
• Build traditional emergency fund FIRST ($10,000+)
• Then also max Roth IRA
• Roth contributions available as backup emergency fund
• This is NOT primary emergency fund, but can serve as extended backup

Caution: Don't raid retirement except in true emergency.`,
        examples: [
          'Elena keeps $2,000 in checking, $18,000 in Ally savings. Small emergencies use checking, big emergencies transfer from Ally in 1 day.',
          'High-balance Sophia ($50,000 emergency fund) uses CD ladder for half. She earns 0.5% more on the CD half while keeping $25,000 fully liquid in savings.',
          'Maya researched and found moving her $12,000 from 4.0% to 4.5% bank would earn $60 more yearly. Worth 20 minutes to switch.',
          'Retired couple with $300,000 emergency fund splits: $250k at Ally, $50k at Marcus, both earning 4%+. Both fully FDIC insured.'
        ],
        tips: [
          'Start with simple high-yield savings—advanced strategies come later',
          'Don\'t sacrifice accessibility for slightly higher returns',
          'Advanced strategies only make sense for large emergency funds',
          'If it\'s too complex to understand, stick with simple high-yield savings'
        ]
      }
    ],

    keyTakeaways: [
      'Emergency funds must be safe (FDIC insured), accessible (1-3 days), and growing (earning interest)',
      'High-yield savings accounts are the best option for most people—4-5% interest, FDIC insured, accessible',
      'Never keep emergency fund in stocks, crypto, CDs, or retirement accounts',
      'Online banks offer 10-20x higher interest rates than traditional banks with same FDIC insurance',
      'Keep emergency fund separate from checking to reduce temptation to spend it',
      'Open a high-yield savings account in 15-20 minutes online—research rates first',
      'Advanced strategies (CD ladders, I Bonds) only make sense for large emergency funds and experienced savers'
    ],

    actionItems: [
      'Research current high-yield savings account rates on Nerdwallet or Bankrate',
      'Choose one high-yield savings account and open it online today',
      'Link your new savings account to your current checking account',
      'Transfer your existing emergency fund (or make initial $25-100 deposit)',
      'Set up automatic recurring transfer to build emergency fund each pay period'
    ],

    resources: [
      {
        title: 'High-Yield Savings Account Comparison',
        type: 'tool',
        description: 'Compare current rates, fees, and features of top high-yield savings accounts',
        url: 'https://www.nerdwallet.com/best/banking/high-yield-online-savings-accounts'
      },
      {
        title: 'FDIC Insurance Coverage Calculator',
        type: 'calculator',
        description: 'Verify your deposits are fully insured',
        url: 'https://www.fdic.gov/resources/deposit-insurance/'
      },
      {
        title: 'Interest Earnings Calculator',
        type: 'calculator',
        description: 'Calculate how much interest your emergency fund will earn',
        url: 'https://www.bankrate.com/banking/savings/savings-calculator/'
      },
      {
        title: 'How to Open Online Bank Account',
        type: 'article',
        description: 'Step-by-step guide to opening your first online savings account',
        url: 'https://www.consumerfinance.gov/ask-cfpb/how-do-i-open-a-bank-account-en-923/'
      }
    ]
  }
}
