import { Lesson } from '@/types/curriculum'

export const handlingIrregularIncome: Lesson = {
  id: 'handling-irregular-income',
  courseId: 'budgeting-basics',
  slug: 'handling-irregular-income',
  title: 'Handling Irregular Income',
  description: 'Master budgeting strategies when your income varies from month to month.',
  durationMinutes: 55,
  displayOrder: 5,
  objectives: [
    'Understand the unique challenges of irregular income budgeting',
    'Learn multiple strategies for budgeting with variable pay',
    'Create a sustainable budget based on lowest typical income',
    'Build systems to smooth out income fluctuations',
    'Manage the psychological stress of income uncertainty'
  ],
  keyConcepts: [
    'Variable Income',
    'Income Smoothing',
    'Baseline Budgeting',
    'Peak and Valley Method',
    'Commission-Based Income'
  ],
  content: {
    introduction: `Traditional budgets assume you get the same paycheck every month. But what if you're self-employed, work on commission, freelance, or have seasonal work?

When income varies from $2,000 one month to $5,000 the next, traditional budgeting feels impossible. You can't plan when you don't know what's coming in.

But here's the truth: irregular income requires different strategies, but it's absolutely budgetable. You just need to work with the variability instead of against it.

This lesson will teach you proven methods for budgeting when income is unpredictable. You'll learn how to survive the low months and make smart decisions during high months—without the constant financial anxiety.`,

    sections: [
      {
        title: '1. Understanding Irregular Income Challenges',
        content: `Before we solve it, let's name what makes variable income so hard:

**The Core Challenges:**

**1. You Can't Predict Exactly**
W-2 employees know their paycheck amount and date. You might earn $3,000 or $6,000—and you won't know until the work comes in.

**2. Income and Bills Don't Sync**
Rent is due on the 1st whether you had a good month or not. Bills don't care about your income fluctuations.

**3. Psychological Stress**
The uncertainty creates anxiety. "Will I make enough this month?" is exhausting.

**4. Feast-or-Famine Spending**
Good month = overspend. Bad month = panic. Never feel stable.

**5. Traditional Budgets Don't Fit**
Apps and templates assume steady income. Your reality doesn't match.

**6. Seasonal Variations**
Some months are always higher/lower (tax season for accountants, holidays for retail, summer for wedding photographers).

**7. Delayed Payment**
You do the work in June, get paid in August. Income lags behind effort.

**8. Harder to Qualify for Things**
Lenders, landlords, loan applications all want "steady income." You have to prove more.

**The Good News:**
These are solvable problems. You need different strategies, not magic. Many self-employed people actually achieve MORE financial stability than W-2 workers once they master these techniques.

**Types of Irregular Income:**
• Freelance/contract work
• Commission-based sales
• Tips and service industry
• Seasonal business
• Self-employment/business ownership
• Gig economy (Uber, DoorDash, TaskRabbit)
• Combination of part-time jobs`,
        examples: [
          'Freelance graphic designer Maya earns $2,000-$7,000 monthly depending on client projects. She never knows exactly what\'s coming, and rent is always $1,400 on the 1st.',
          'Waitress Carmen gets $1,800 base pay + $600-2,500 in tips depending on shifts and season. Summer and holidays are high, January-March are low.',
          'Real estate agent Patricia closed zero deals in January ($0), three in February ($9,000 commission), and one in March ($3,000). Wildly variable month to month.',
          'Photographer Jade earns $8,000 May-October (wedding season) but only $1,500 November-April (slow season). Predictable pattern but extreme variation.'
        ],
        tips: [
          'Track 6-12 months of income to see your true pattern',
          'Identify if variation is random or has predictable cycles',
          'Know your absolute lowest month in the past year—that\'s your baseline',
          'Separate what you CAN control (expenses, pricing) from what you can\'t (market demand)'
        ]
      },
      {
        title: '2. The Baseline Budget Method',
        content: `This is the gold standard for irregular income budgeting. Simple, sustainable, stress-reducing.

**The Strategy:**
Budget based on your LOWEST typical monthly income. Treat anything above that as "extra" with specific rules.

**Step-by-Step:**

**1. Determine Your Baseline Income**
Look at the last 12 months. What was your lowest income month?
Add 10% buffer if that was unusually low.
This is your baseline.

**Example:** 
Past year: $2,000, $3,500, $4,200, $2,800, $5,000, $3,200, $2,500, $4,000, $3,800, $2,200, $6,000, $3,000
Lowest: $2,000
Baseline: $2,200 (with buffer)

**2. Create Your Budget Using Only Baseline**
All essential expenses must fit within baseline income:
• Rent/mortgage
• Utilities
• Groceries
• Transportation
• Insurance
• Minimum debt payments
• Basic necessities

If your essentials exceed baseline, you have three choices:
a) Cut expenses to fit baseline
b) Increase your minimum income (more clients, higher rates, additional income source)
c) Get a part-time steady job to supplement

**3. Everything Above Baseline = Priority List**
When you earn more than baseline, money goes in this order:
1. Build 1-month income buffer
2. Build 3-6 month emergency fund
3. Extra debt payments
4. Irregular expenses fund (annual bills, car maintenance)
5. Retirement/investing
6. Lifestyle upgrades
7. Fun/discretionary spending

**4. Live on Baseline, Save the Rest**
In high months, resist lifestyle inflation. Sock away extra for low months.

**The Psychology:**
Every month you cover baseline, you "win." Anything above is bonus. This prevents the low-month panic and high-month splurging.`,
        examples: [
          'Freelancer Elena\'s baseline is $3,000 (her lowest typical month). Her budget has $2,800 in expenses. When she earns $5,000, the extra $2,000 goes to emergency fund, then debt, then fun—in that priority order.',
          'Server Yolanda\'s baseline is $2,200 (slow winter months). Summer months hit $4,000. She lives on $2,200 year-round, banks the extra $1,800/month in summer to cover winter shortfalls.',
          'Commission salesperson Nina\'s baseline is $3,500. She earned $8,000 in March. Instead of upgrading lifestyle, she put $4,500 in savings. When April was only $2,500, she pulled $1,000 from savings to cover the gap. No stress.',
          'After three months of baseline budgeting, Maya built a one-month income buffer. Now when a slow month hits, she doesn\'t panic—she has $3,000 sitting there covering the gap.'
        ],
        tips: [
          'Be conservative with baseline—better to set it low and have extra than set it high and fall short',
          'Review baseline every 6-12 months as income patterns change',
          'Resist "celebrating" high months with big spending—future-you will thank you',
          'Think of savings as "paying yourself in advance" for low months'
        ]
      },
      {
        title: '3. The Income Smoothing Method',
        content: `This method creates artificial "steady paychecks" by averaging out the fluctuations.

**How It Works:**

**1. Calculate Average Monthly Income**
Add up last 6-12 months of income, divide by number of months
This is your "paycheck" amount

**Example:**
Last 6 months: $2,500, $4,000, $3,200, $5,500, $2,800, $4,200
Total: $22,200 ÷ 6 = $3,700 average

**2. Set Up a "Holding Account"**
All income goes into this account first (checking or savings)
This is NOT your spending account

**3. Pay Yourself a Monthly "Salary"**
Transfer your average amount ($3,700) to your spending account
This is your budget amount
Do this on the same day each month (your "payday")

**4. Leave Excess in Holding Account**
High months: Extra stays in holding account
Low months: Transfer makes up the difference from holding account
The holding account smooths the peaks and valleys

**5. Build a Buffer**
Ideally, keep 2-3 months' worth of "salary" in holding account as buffer
This protects against multiple low months in a row

**Advantages:**
• Creates predictable monthly "income" for budgeting
• Reduces psychological stress of variability
• Easy to explain to family/partner
• Works with traditional budgeting apps

**Disadvantages:**
• Requires discipline not to dip into holding account
• Need startup capital to build initial buffer
• More complex to manage than baseline method

**Best For:**
People who need the psychological comfort of "steady paychecks," couples where one partner has steady income, or those with truly random income patterns with no seasonal trends.`,
        examples: [
          'Freelance writer Carmen averages $4,200/month. All client payments go to Account A. On the 1st of each month, she transfers exactly $4,200 to Account B (her spending account). Some months Account A grows, some months it shrinks, but her budget is always $4,200.',
          'Real estate agent Sophia earned $15,000 in April (big closing). Instead of spending it all, she put it in her holding account and paid herself her usual $4,500 "salary." The extra $10,500 sits there for slow months.',
          'Gig worker Lisa took 3 months to build her initial buffer by living super lean. Now she has $8,000 in holding and pays herself $2,700 monthly. Bad weeks don\'t panic her anymore—the buffer covers it.',
          'Photographer Jade uses this seasonally: summer months fill the holding account, winter months draw it down. By spring it rebuilds. The cycle works because her seasonality is predictable.'
        ],
        tips: [
          'Start with at least one month\'s "salary" in holding account before beginning',
          'Review average every 3-6 months and adjust salary up or down',
          'If holding account dips below 1 month\'s worth, reduce your "salary" temporarily',
          'Automate the monthly transfer so it happens like clockwork'
        ]
      },
      {
        title: '4. The Peak and Valley Strategy',
        content: `This method works WITH your income patterns instead of fighting them.

**The Approach:**
Identify your income cycles, spend lean in valleys, save heavily in peaks.

**Step 1: Map Your Pattern**
Track 12 months minimum. Look for:
• Seasonal patterns (wedding photographer, tax preparer, retail)
• Predictable slow periods
• Predictable busy periods
• Random variation with no pattern

**Step 2: Create Two Budgets**

**Valley Budget (Bare Minimum):**
Only essential expenses:
• Rent/mortgage
• Utilities (basic level)
• Groceries (no extras)
• Gas/transportation
• Minimum debt payments
• Insurance
• Critical needs only

**Peak Budget (Full Budget):**
Essentials + discretionary:
• All valley budget items
• Debt payoff (beyond minimums)
• Savings contributions
• Entertainment/dining out
• Shopping/personal care
• Subscriptions and memberships
• Lifestyle expenses

**Step 3: Switch Between Budgets**
Low month coming → Activate valley budget
High month → Activate peak budget
In-between → Modified peak budget

**Step 4: Save Peak Month Excess**
High months aren't for splurging—they're for:
1. Building emergency fund
2. Funding irregular expenses (car registration, insurance premiums)
3. Prepaying bills for slow months if possible
4. Creating income buffer

**Step 5: Prepare for Valleys**
Before slow season:
• Cut subscriptions you can pause
• Stock up on sale groceries
• Prepay what you can
• Line up extra income sources if possible
• Set savings aside specifically for valley months

**Best For:**
Seasonal workers, people with predictable income patterns, those who can handle switching between spending modes.`,
        examples: [
          'Wedding photographer Nina earns 70% of annual income May-October. She lives on bare minimum ($2,500/month) those months and banks the rest. November-April she draws from savings to supplement lower income ($1,200-2,000/month).',
          'Tax preparer Carmen earns big January-April, almost nothing May-December. She saves 60% of peak season income to supplement the rest of the year. By December she\'s broke but January refills everything.',
          'Retail manager Jade gets 30-40 hours in summer, 15-25 in winter. Summer = peak budget with saving. Winter = valley budget plus pulling from summer savings. It balances over the year.',
          'Freelancer with unpredictable income Elena uses a hybrid: baseline for essentials, then activates "peak" discretionary spending only when she has 3 months of baseline already saved. This prevents overspending in one good month.'
        ],
        tips: [
          'Don\'t celebrate peak months—treat them as "preparing for valley"',
          'Make valley budget as low as possible without being miserable',
          'If pattern is unpredictable, use baseline method instead',
          'Track year-over-year to see if patterns repeat (they usually do)'
        ]
      },
      {
        title: '5. Mental and Emotional Strategies',
        content: `Irregular income is as much a psychological challenge as a financial one. Here's how to manage the stress:

**Mindset Shifts:**

**1. From "I Never Know What I'll Make" to "I Control My Baseline"**
You might not control every dollar earned, but you control your essential expense baseline.

**2. From "Feast or Famine" to "Peak and Valley Is Normal"**
Stop fighting the variability. Accept it, plan for it, work with it.

**3. From "Good Month = Spend" to "Good Month = Prepare"**
High months aren't rewards to blow—they're preparation for low months.

**4. From "I Can't Budget" to "I Budget Differently"**
You absolutely can budget. You just can't budget the same way W-2 employees do.

**Stress-Reduction Tactics:**

**Build a Buffer ASAP**
Even $500 dramatically reduces money stress. Make this priority #1.

**Track Income Patterns**
Knowledge reduces anxiety. When you see patterns, you can plan.

**Celebrate Non-Financial Wins**
Good month? Celebrate with free/cheap joy, not expensive splurges.
Low month? Celebrate making it through without debt.

**Have a "Low Month" Plan**
Knowing exactly what you'll cut if needed reduces panic:
• Which subscriptions pause first?
• What expenses can be delayed?
• Where can you cut 10-20% immediately?

**Separate Business and Personal**
If self-employed, separate accounts prevent "borrowing from yourself."

**Automate Savings in Good Months**
Don't rely on willpower. Set up automatic transfer when income hits.

**Find Community**
Other irregular income earners GET IT. Join forums, groups, or just one friend who understands.

**Reframe the Benefits**
You have flexibility, control over income potential, and tax advantages (if self-employed). There are upsides to trade for the variability.

**Practice Gratitude**
High month? Thank past-you for the work. Low month? Thank past-you for saving.`,
        examples: [
          'Every time freelancer Maya gets paid, she immediately transfers 40% to savings before she even sees it. Removes temptation to spend it all.',
          'When Patricia has a low month, she has a "no-spend" game plan ready: pause streaming services, use frozen meals from stockpile, delay non-urgent purchases. Having the plan prevents panic.',
          'Carmen joined a "freelancer money support group" online. Talking to others with irregular income helped her realize she wasn\'t alone or failing—it\'s just part of this lifestyle.',
          'Jade reframed her variable income as "freedom to earn more." W-2 workers are capped; she can always take on another client. This mindset shift reduced her stress significantly.'
        ],
        tips: [
          'Your income varies but your worth doesn\'t—low month doesn\'t mean failure',
          'Build buffer first, everything else second—buffer = peace of mind',
          'Celebrate discipline in high months more than the income itself',
          'Find your "enough" number and stop chasing more just because you can'
        ]
      }
    ],

    keyTakeaways: [
      'Irregular income requires different budgeting strategies, not magic—it\'s absolutely budgetable',
      'Baseline method: Budget on lowest typical month, save everything above baseline',
      'Income smoothing: Pay yourself average monthly "salary" from a holding account',
      'Peak and valley: Create two budgets and switch based on income cycles',
      'Build an income buffer ASAP—even $500 dramatically reduces financial stress',
      'High months are for preparing for low months, not for lifestyle inflation',
      'Track 6-12 months to identify patterns (seasonal, random, or cyclical)'
    ],

    actionItems: [
      'Review last 6-12 months of income and identify your lowest typical month (baseline)',
      'Calculate your average monthly income and decide which method to try first',
      'Create your baseline budget using only lowest typical monthly income',
      'Set up a separate "holding account" or income buffer fund',
      'Develop your priority list for extra income above baseline'
    ],

    resources: [
      {
        title: 'Irregular Income Budget Template',
        type: 'worksheet',
        description: 'Specialized budget template for variable income with baseline and peak/valley planning',
        url: 'https://www.ramseysolutions.com/budgeting/irregular-income'
      },
      {
        title: 'Income Tracking Spreadsheet',
        type: 'worksheet',
        description: 'Track 12 months of income to identify patterns and calculate baseline',
        url: 'https://www.vertex42.com/ExcelTemplates/income-expense-tracker.html'
      },
      {
        title: 'YNAB for Variable Income',
        type: 'article',
        description: 'Detailed guide to using YNAB\'s method for irregular income budgeting',
        url: 'https://www.youneedabudget.com/how-to-budget-with-irregular-income/'
      },
      {
        title: 'Self-Employment Tax Calculator',
        type: 'calculator',
        description: 'Calculate taxes on irregular self-employment income',
        url: 'https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes'
      }
    ]
  }
}
