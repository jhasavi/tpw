import { Lesson } from '@/types/curriculum'

export const whatIsCredit: Lesson = {
  id: 'what-is-credit',
  courseId: 'credit-management',
  slug: 'what-is-credit',
  title: 'What is Credit?',
  description: 'Understand what credit is, how it works, and why it matters for your financial future.',
  durationMinutes: 30,
  displayOrder: 1,
  objectives: [
    'Understand what credit is and how it functions in the financial system',
    'Learn the difference between credit and debt',
    'Recognize the benefits and risks of using credit',
    'Understand how credit affects your financial opportunities',
    'Develop a healthy perspective on credit as a financial tool'
  ],
  keyConcepts: [
    'Credit Definition',
    'Creditworthiness',
    'Interest',
    'Credit vs. Debt',
    'Responsible Credit Use'
  ],
  content: {
    introduction: `Credit is one of the most misunderstood—and misused—tools in personal finance. Some people think it's evil and avoid it completely. Others use it recklessly and end up drowning in debt.

The truth? Credit is neutral. It's a tool. Like any tool, it can build something wonderful or cause damage, depending on how you use it.

Understanding credit is essential because whether you like it or not, our financial system runs on it. Want to rent an apartment? They'll check your credit. Buy a car? You'll probably need credit. Get a mortgage? Credit is crucial. Even some jobs check credit.

This lesson demystifies credit, showing you what it really is, how it works, and how to think about it wisely.`,

    sections: [
      {
        title: '1. What Credit Actually Is',
        content: `At its simplest, credit is borrowed money with a promise to pay it back.

**The Basic Definition:**

Credit = Someone loans you money → You promise to repay it (usually with interest) → They trust you'll keep your promise

**Who Provides Credit:**
• Banks and credit unions
• Credit card companies
• Auto lenders
• Mortgage lenders
• Buy-now-pay-later services
• Retailers (store cards)
• Even friends/family (informal credit)

**How Credit Works:**

1. You need/want something you can't pay for right now
2. A creditor (lender) gives you the money
3. You get the item/service immediately
4. You repay the creditor over time
5. Usually you pay interest (fee for borrowing)

**Credit vs. Cash:**

With cash: See item → Have money → Buy it → Done
With credit: See item → Don't have money → Borrow money → Buy it → Pay back over time + interest

**Types of Credit:**

**Revolving Credit** (Credit Cards)
• Borrow up to a limit
• Pay back, can borrow again
• Interest charged on unpaid balance
• Ongoing access to credit line

**Installment Credit** (Loans)
• Borrow specific amount
• Fixed monthly payments
• Set payoff date
• Car loans, student loans, mortgages, personal loans

**Open Credit** (Rare)
• Balance due in full each period
• Charge cards, some utility bills

**The Trust Element:**

Credit only works because of TRUST.

Lender trusts: You'll pay them back
You trust: They'll give you fair terms

Your "creditworthiness" is how much lenders trust you to repay.

**Credit is Not Free Money:**

Common misconception: Credit card = extra money!

Reality: Credit card = borrowed money you must repay + interest

Every dollar you charge is a dollar you owe. Plus interest if you don't pay in full.`,
        examples: [
          'Lisa uses her credit card to buy $100 groceries. She didn\'t use her own $100—she borrowed $100 from the credit card company. She must pay it back.',
          'Carmen gets a $15,000 car loan. The bank gives her $15,000 to buy the car. She repays $300/month for 5 years. Total paid: $18,000 ($3,000 is interest for borrowing).',
          'Nina buys a couch for $1,200 with "12 months no interest." She got credit (borrowed money) with no interest charged if she pays it off in 12 months. If she doesn\'t pay in full by month 12, retroactive interest applies.',
          'Rachel was offered a store credit card for 20% off her purchase. She understood: the card is credit, meaning borrowed money, not free money. She declined because she didn\'t want to open a credit account for a discount.'
        ],
        tips: [
          'Credit is borrowed money, not your money—you must repay it',
          'Interest is the cost of borrowing—it adds up fast',
          'Creditworthiness = lenders\' trust that you\'ll repay',
          'Credit gives you access to money you don\'t have—use wisely'
        ]
      },
      {
        title: '2. Credit vs. Debt: Understanding the Difference',
        content: `People often use "credit" and "debt" interchangeably, but they're different:

**Credit = The ability to borrow money**
Your credit score, credit limit, credit cards, credit history—these represent your ABILITY to access borrowed funds.

**Debt = Money you actually owe**
When you use credit and don't pay it back immediately, it becomes debt. Debt is the balance you carry.

**The Relationship:**

Credit → You can borrow up to $5,000 on your credit card
Use credit → You charge $2,000
Create debt → You owe $2,000 (if you don't pay in full)

**Examples:**

**Credit (Ability):**
• You have a credit card with $10,000 limit
• You're approved for a $25,000 car loan
• You qualify for a $300,000 mortgage
• Bank offers you a $5,000 personal loan

**Debt (Amount Owed):**
• You carry $3,000 balance on that credit card
• You owe $18,000 on your car
• You owe $250,000 on your mortgage
• You owe $4,500 on that personal loan

**You can have credit without debt:**
• Credit card with $0 balance
• Pre-approved for loan but haven't taken it
• High credit score with no outstanding loans

**You can have debt without (current) credit:**
• Paid off credit cards but owe student loans
• Collections debt but no active credit cards
• Medical debt in collections

**Good Credit ≠ No Debt:**

You can have excellent credit while carrying debt, if:
• You make payments on time
• You don't max out credit
• Your debt-to-income ratio is manageable

**Bad Credit Can Come From:**
• Too much debt
• Late payments on debt
• Defaulting on debt
• No credit history at all (can't prove you're trustworthy)

**The Goal:**

Have credit (high credit score, available credit lines)
Minimize debt (owe as little as possible)

This gives you access to credit when you need it, without being burdened by owing money.`,
        examples: [
          'Elena has a $15,000 credit card limit (credit) but carries $0 balance (no debt). She has access to borrowed money but isn\'t using it. Perfect situation.',
          'Carmen has $8,000 in credit card debt (debt) on cards with $12,000 total limit (credit). She\'s using her credit and owes money. She has both.',
          'Nina has no credit cards (no revolving credit) but $35,000 in student loans (debt). She has debt without active credit accounts.',
          'Sophia has excellent 780 credit score (good credit) while carrying $250,000 mortgage (debt). The debt is managed responsibly so her credit is still good.'
        ],
        tips: [
          'Credit = ability to borrow; Debt = what you actually owe',
          'You want high credit score (good credit) with low debt',
          'Using credit doesn\'t automatically mean debt—only if you carry a balance',
          'Building credit requires some use, but you don\'t need to carry debt to do it'
        ]
      },
      {
        title: '3. Benefits of Good Credit',
        content: `Why should you care about credit? Because good credit opens doors and saves you money.

**Financial Benefits:**

**Lower Interest Rates:**
• Excellent credit: 3-5% mortgage rate
• Poor credit: 6-8% mortgage rate
• On $300,000 mortgage, that's $80,000+ difference over 30 years

**Access to Better Credit Cards:**
• Rewards and cash back (1-5%)
• No annual fees
• Better terms and benefits
• Sign-up bonuses worth $200-1,000+

**Approval for Loans:**
• Car loans
• Mortgages
• Personal loans
• Student loans
• Business loans

**Higher Credit Limits:**
• More available credit if you need it
• Lower credit utilization (good for score)
• Emergency buffer

**Better Insurance Rates:**
• Auto insurance (in most states)
• Homeowners/renters insurance
• Credit-based insurance scores affect premiums

**Life Benefits:**

**Apartment Rental:**
• Landlords check credit scores
• Poor credit = denied or higher deposit
• Good credit = easier approval

**Utility Services:**
• Phone, electric, water, internet
• Poor credit = deposit required ($200-500)
• Good credit = no deposit

**Employment Opportunities:**
• Some jobs check credit (finance, government, management)
• Poor credit can disqualify you
• Good credit shows responsibility

**Business Opportunities:**
• Start a business
• Get business credit cards
• Business loans require personal credit check

**Peace of Mind:**
• Emergency access to credit if needed
• Flexibility in financial decisions
• Less stress about major purchases

**Real Dollar Savings:**

Poor credit costs you:
• Higher interest rates: $50,000+ over life
• Insurance premiums: $500+/year extra
• Utility deposits: $500 upfront
• Denied opportunities: Priceless

**Good credit saves/earns you:**
• Lower interest: $50,000+ saved
• Credit card rewards: $500-2,000/year
• No deposits: $500+ saved
• Better job/housing: Priceless

**The Multiplier Effect:**

Good credit → Better rates → Save money → More to invest/save → Build wealth faster

Poor credit → Higher rates → Pay more → Less to save → Wealth builds slower

Over a lifetime, good credit can mean a difference of $100,000+ in savings.`,
        examples: [
          'Maya has 780 credit score. She got 3.5% mortgage rate saving her $200/month vs. her friend with 620 score paying 6.5%. Over 30 years: $72,000 saved.',
          'Carmen has good credit and earns $1,200/year in credit card cash back rewards on normal spending. Over 20 years: $24,000 in free money.',
          'Nina\'s poor credit meant $300 deposit for electric, $250 for phone, $400 for apartment. That\'s $950 she had to tie up. Her friend with good credit paid $0 in deposits.',
          'Lisa was offered job in financial services. They checked credit. Her 740 score and clean credit history helped her get hired. Poor credit would have disqualified her.'
        ],
        tips: [
          'Good credit can save you $100,000+ over your lifetime',
          'Credit affects housing, employment, insurance, and loans',
          'Building good credit is one of the best financial investments',
          'Poor credit costs you money every single day'
        ]
      },
      {
        title: '4. Risks and Dangers of Credit',
        content: `Credit is powerful, which means it can also be dangerous when misused.

**The Debt Trap:**

**How It Happens:**
1. Get credit card with $5,000 limit
2. Charge $3,000 you can't afford to pay back
3. Make minimum payment ($75)
4. Interest accrues ($50/month at 20% APR)
5. Balance barely goes down
6. Keep charging more
7. Now owe $5,000
8. Minimum payment is $125/month
9. Can barely make minimums
10. Trapped in debt cycle

**The Math of Minimum Payments:**

$5,000 credit card debt at 20% APR:
• Minimum payment: ~$125/month
• Time to pay off: 20+ years
• Total interest paid: $6,000+
• Total cost: $11,000 for $5,000 spent

**Psychological Dangers:**

**Feels Like Free Money:**
Swipe card, get stuff, don't see money leave bank account = easy to overspend

**Delayed Consequence:**
Buy today, pain of payment is weeks/months away = disconnect between spending and paying

**Lifestyle Inflation:**
Access to credit lets you live beyond your means = unsustainable spending

**Keeping Up With Others:**
See friends buying things, use credit to match = comparison trap

**Emotional Spending:**
Sad/stressed/bored → Shop with credit card → Temporary relief → Long-term debt

**Financial Dangers:**

**High Interest Rates:**
• Credit cards: 15-29% APR
• Store cards: 25-30% APR
• Payday loans: 400%+ APR (NEVER use these)
• Interest compounds and grows debt

**Fees:**
• Late payment: $25-40
• Over-limit: $25-35
• Balance transfer: 3-5%
• Cash advance: 5% + higher interest

**Credit Score Damage:**
• Late payments: -60 to -100 points
• Maxed out cards: -50+ points
• Collections: -100+ points
• Bankruptcy: -200+ points

**Cycle of Debt:**
• Use credit to pay other credit
• Borrow from one card to pay another
• Take out loans to pay credit cards
• Debt grows instead of shrinking

**Bankruptcy:**
• Can't pay debts
• Credit destroyed for 7-10 years
• Difficulty renting, getting loans, even jobs

**Relationship Stress:**
• Money fights
• Hidden debt from partner
• Divorce (money is top cause)

**How to Avoid the Dangers:**

✅ Never charge more than you can pay off that month
✅ Treat credit card like debit card (only spend what you have)
✅ Track credit card spending in budget
✅ Pay balance in full every month
✅ Have emergency fund so you don't need credit for emergencies
✅ Wait 24-48 hours before non-essential credit purchases
✅ Know your triggers (boredom shopping, stress spending)`,
        examples: [
          'Patricia charged $8,000 on credit cards she couldn\'t afford. At 22% APR making minimum payments, it would take 30+ years and cost $18,000 total to pay off.',
          'Carmen got into debt trap: used one credit card to pay another, took personal loan to pay cards, then charged cards back up. She went from $5,000 to $20,000 debt in 2 years.',
          'Nina missed one credit card payment (life was chaotic). $39 late fee + interest penalties + credit score dropped 60 points. One late payment cost her $39 and months of rebuilding.',
          'Lisa used credit responsibly: only charged what she could pay off monthly, treated card like debit card, paid in full every month. She enjoyed benefits without any dangers.'
        ],
        tips: [
          'Minimum payments keep you in debt for decades—always pay more',
          'If you can\'t pay it off this month, don\'t charge it',
          'Interest and fees can double what you actually owe',
          'Debt trap is easy to enter and hard to escape—prevent it'
        ]
      },
      {
        title: '5. Developing a Healthy Credit Mindset',
        content: `Your relationship with credit matters as much as the technical details.

**Credit Philosophy: The Middle Path**

**Avoid These Extremes:**

**❌ Credit Avoider:**
"Credit is evil, I'll never use it"
• Builds no credit history
• Can't rent apartments, get loans
• Misses out on rewards and benefits
• Harder time in emergencies

**❌ Credit Abuser:**
"I'll just charge it and figure it out later"
• Lives beyond means
• Drowns in debt
• Destroyed credit
• Financial crisis

**✅ Credit Respecter (The Goal):**
"Credit is a tool. I'll use it wisely for my benefit"
• Builds strong credit history
• Uses credit for benefits (rewards, building score)
• Never carries debt (pays in full)
• Has access for true emergencies

**Healthy Credit Principles:**

**Principle 1: Credit is a tool, not a solution**
Don't have money for something? Credit isn't the answer—earning more or waiting is.

**Principle 2: Credit should work for you, not against you**
If you're paying interest, you're working for credit. If you pay in full and earn rewards, credit works for you.

**Principle 3: Good credit = financial freedom**
It opens doors, lowers costs, provides options. Worth building and protecting.

**Principle 4: Debt = giving your future income to your past**
Every dollar in debt is future-you paying for past-you's choices. Break the cycle.

**Principle 5: You can use credit without debt**
Charge expenses, pay in full monthly = using credit without going into debt.

**The Credit Rules to Live By:**

**Rule 1: If you can't afford it with cash, don't buy it with credit**
Exception: House, car (with solid plan to pay), true emergency

**Rule 2: Pay balance in full every month**
Never pay interest if avoidable

**Rule 3: Track credit card spending like debit card spending**
It's still real money you're spending

**Rule 4: Build credit, minimize debt**
Use credit to build score, not to buy things you can't afford

**Rule 5: Emergency fund first, then credit**
Credit is not an emergency fund

**Reframing Credit:**

Old thinking: "Credit card means I can buy this now!"
New thinking: "Can I pay this off in full next month? If not, I can't afford it."

Old thinking: "I'll pay the minimum and it's fine"
New thinking: "Minimum payment = debt trap. Full payment = freedom."

Old thinking: "I have a $10,000 limit, that's my money"
New thinking: "I have $10,000 I can borrow and must repay. Not mine."

**Teaching Yourself Discipline:**

Start small:
• Get one credit card
• Use it for one category (gas only)
• Pay in full every month
• Build trust with yourself

Once you prove you can handle it, expand use.

If you can't handle it, go back to cash until you can.`,
        examples: [
          'Elena uses credit cards for everything (rewards) but treats them exactly like debit cards. She tracks spending in her budget and pays in full monthly. Credit works for her.',
          'Carmen went into debt, cut up cards, went cash-only for 2 years. Once she rebuilt emergency fund and learned discipline, she got one card for gas only. Rebuilding trust slowly.',
          'Nina has 780 credit score and has never paid a penny in interest. She uses credit for benefits (cash back, fraud protection, rewards) without ever carrying debt.',
          'Rachel avoided credit for years (scared of debt). She learned to build credit responsibly with one card for groceries, paid in full monthly. Now has 720 score and access when needed.'
        ],
        tips: [
          'Credit is a tool—neutral until you use it well or poorly',
          'Build credit, minimize debt—these are not the same thing',
          'If you can\'t pay balance in full, you\'re using credit wrong',
          'Healthy credit use = benefits without interest or debt'
        ]
      }
    ],

    keyTakeaways: [
      'Credit is borrowed money you must repay, usually with interest—not free money',
      'Credit (ability to borrow) is different from debt (money you owe)',
      'Good credit saves you $100,000+ over your lifetime through lower rates and better opportunities',
      'Credit risks include debt traps, high interest, fees, and credit score damage',
      'Minimum payments keep you in debt for decades—always pay more or in full',
      'Healthy credit use: charge only what you can pay off in full, earn rewards, never pay interest',
      'Credit is a powerful tool that helps or hurts depending on how you use it'
    ],

    actionItems: [
      'Write down your current understanding of credit vs. debt',
      'Calculate how much credit is costing you in interest this year',
      'Decide on your credit philosophy: Will you use credit as a tool or avoid it?',
      'If you use credit cards, commit to paying balance in full next month',
      'Research how good credit could save you money on your next major purchase'
    ],

    resources: [
      {
        title: 'Credit Card Interest Calculator',
        type: 'calculator',
        description: 'See how much interest you\'ll pay if making only minimum payments',
        url: 'https://www.bankrate.com/credit-cards/calculators/minimum-payment-calculator/'
      },
      {
        title: 'Credit vs. Debt Explained',
        type: 'article',
        description: 'Detailed breakdown of the difference between credit and debt',
        url: 'https://www.investopedia.com/ask/answers/100314/what-difference-between-debt-and-credit.asp'
      },
      {
        title: 'True Cost of Credit Worksheet',
        type: 'worksheet',
        description: 'Calculate the real cost of purchases made with credit over time'
      },
      {
        title: 'Healthy Credit Habits Checklist',
        type: 'worksheet',
        description: 'Assess your credit habits and identify areas for improvement'
      }
    ]
  }
}
