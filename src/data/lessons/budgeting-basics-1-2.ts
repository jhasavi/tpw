import { Lesson } from '@/types/curriculum'

export const creatingYourFirstBudget: Lesson = {
  id: 'creating-your-first-budget',
  courseId: 'budgeting-basics',
  slug: 'creating-your-first-budget',
  title: 'Creating Your First Budget',
  description: 'Build a realistic budget that actually works for your real life and income.',
  durationMinutes: 50,
  displayOrder: 1,
  objectives: [
    'Understand what a budget actually is (and isn\'t)',
    'Choose a budgeting method that fits your personality and situation',
    'Create your first budget using actual numbers from your life',
    'Set up budget categories that make sense for you',
    'Build flexibility into your budget so it doesn\'t feel restrictive'
  ],
  keyConcepts: [
    '50/30/20 Rule',
    'Zero-Based Budgeting',
    'Envelope Method',
    'Budget Categories',
    'Fixed vs. Variable Expenses'
  ],
  content: {
    introduction: `A budget isn't a punishment. It's not about restriction or deprivation. It's simply a plan for your money.

Think of it like a GPS for your finances. You wouldn't drive across the country without directions—why would you navigate your financial life without a plan?

The problem is that most budgets fail because they're unrealistic, too complicated, or don't match how you actually live. We're going to create a budget that works for YOU—your income, your expenses, your goals, your real life.

No judgment, no perfection required. Just awareness and intention.`,

    sections: [
      {
        title: '1. What a Budget Really Is',
        content: `A budget is simply: telling your money where to go instead of wondering where it went.

**A budget is NOT:**
• A way to never have fun
• Something only for broke people
• Set in stone forever
• Punishment for past mistakes
• Complicated math requiring a degree

**A budget IS:**
• A spending plan based on YOUR priorities
• Permission to spend guilt-free on what matters
• A tool to reach your goals faster
• Adjustable when life changes
• Simple enough to actually use

The goal isn't to have a perfect budget. The goal is to have a budget you'll actually follow.`,
        examples: [
          'Lisa thought budgets meant "no fun ever." Then she created one that included $200/month for entertainment. Now she spends guilt-free knowing bills are covered.',
          'After years of "winging it," Carmen made a simple budget. She didn\'t spend less—she just knew where money was going and felt in control for the first time.',
          'Maria\'s first budget was too detailed (37 categories!) and she gave up in two weeks. Her second budget: 8 simple categories. She\'s followed it for 8 months.'
        ],
        tips: [
          'Start simple—you can always add complexity later',
          'Budget for fun and treats—deprivation budgets fail',
          'Your budget should reduce stress, not create it',
          'It\'s okay to adjust your budget—life isn\'t static'
        ]
      },
      {
        title: '2. Choosing Your Budgeting Method',
        content: `There's no "one right way" to budget. Pick the method that matches your personality:

**50/30/20 Rule (Simple & Popular)**
• 50% Needs (rent, food, utilities, insurance)
• 30% Wants (dining out, shopping, hobbies)
• 20% Savings & Debt Payoff
Best for: Beginners who want simple guidelines

**Zero-Based Budget (Every Dollar Has a Job)**
• Income minus all expenses and savings = $0
• Every dollar is assigned before the month starts
• Nothing "left over" because it all has a purpose
Best for: People who like detail and control

**Envelope Method (Cash-Based)**
• Money for categories goes in physical or digital envelopes
• When envelope is empty, no more spending in that category
• Forces discipline and awareness
Best for: Overspenders who need visual limits

**Pay Yourself First**
• Savings/investing comes out first automatically
• Live on what remains
• Simpler than tracking every category
Best for: People who hate detailed tracking

Choose the one that feels least painful—that's the one you'll stick with.`,
        examples: [
          'Tech worker Sophia uses zero-based budgeting because she likes spreadsheets. Every penny is planned. It feels like a fun challenge to her.',
          'Creative freelancer Jade hated detailed tracking, so she does 50/30/20. As long as bills are under 50% of income and she saves 20%, she doesn\'t stress the details.',
          'Recovering shopping addict Tammy uses the envelope method with $300 cash for "fun money" monthly. When it\'s gone, she stops. No credit cards.'
        ],
        tips: [
          'Try one method for 2-3 months before switching',
          'You can combine methods (50/30/20 + envelope for trouble categories)',
          'The best budget is the one you\'ll actually use',
          'Start with the simplest method, add complexity only if needed'
        ]
      },
      {
        title: '3. Setting Up Your Budget Categories',
        content: `Categories organize your spending. Too few and you lose visibility. Too many and you give up.

**Essential Fixed Expenses** (same every month):
• Rent/Mortgage
• Car Payment
• Insurance (car, health, renters)
• Loan Payments
• Phone Bill
• Subscriptions

**Essential Variable Expenses** (change monthly):
• Groceries
• Gas/Transportation
• Utilities
• Medical/Prescriptions
• Pet Care
• Household Items

**Non-Essential Spending** (wants, not needs):
• Dining Out/Takeout
• Entertainment
• Shopping/Clothing
• Hobbies
• Personal Care
• Coffee/Treats

**Financial Goals**:
• Emergency Fund
• Debt Payoff
• Retirement/Investing
• Specific Savings Goals

Start with 8-12 categories total. You can always split them later if needed.`,
        examples: [
          'Elena started with 15 categories, got overwhelmed, and simplified to 9. Now she tracks: Housing, Transportation, Food, Utilities, Fun, Debt, Savings, Healthcare, Misc.',
          'Single mom Rachel combined "groceries" and "household items" into "Home Supplies" because she buys them together. Fewer categories = easier tracking.',
          'After reviewing expenses, Nina realized she needed a separate "Kids" category because child expenses were hiding in multiple places. Better visibility helped her plan.'
        ],
        tips: [
          'Combine similar expenses if tracking separately feels tedious',
          'Create a "Misc/Other" category for the random stuff (5-10% of budget)',
          'Separate your biggest spending categories for better control',
          'Review and adjust categories after the first month of tracking'
        ]
      },
      {
        title: '4. Building Your First Budget (Step-by-Step)',
        content: `Ready to create your actual budget? Let's do this:

**Step 1: Calculate Your Monthly Take-Home Income**
• Add up all money you receive monthly (after taxes)
• If income varies, use your lowest typical month
• Include all sources: job, side gigs, benefits

**Step 2: List All Fixed Expenses**
• Write down every bill that's the same each month
• Include annual expenses divided by 12 (car registration, Amazon Prime, etc.)
• This is your non-negotiable baseline

**Step 3: Estimate Variable Expenses**
• Look at last month's bank/credit card statements
• Estimate typical spending for groceries, gas, etc.
• Be realistic—underestimating leads to budget failure

**Step 4: Include Financial Goals**
• Even $25/month to emergency fund counts
• Debt payments beyond minimums
• Retirement contributions

**Step 5: Assign Money to Categories**
• Make sure Income ≥ All Expenses + Goals
• If not, you need to cut expenses or increase income
• Leave a small buffer (2-5%) for surprises

**Step 6: Track and Adjust**
• First budget is always wrong—that's okay
• Adjust after seeing real spending for 1-2 months`,
        examples: [
          'Keisha\'s first budget: $3,200 income, $2,800 expenses, $300 goals, $100 buffer. Simple and it balanced.',
          'Carmen discovered her budget showed $2,500 expenses but she was actually spending $2,900. She had to either cut $400 or was going into debt monthly—budget revealed the truth.',
          'After one month, Rita realized she budgeted $200 for groceries but actually spent $350. She adjusted the budget to reality and found $150 to cut elsewhere.'
        ],
        tips: [
          'Use last month\'s actual spending as your starting point',
          'Don\'t budget for who you wish you were—budget for who you ARE',
          'If expenses exceed income, that\'s a crisis requiring immediate action',
          'First draft will be wrong—embrace it and adjust'
        ]
      },
      {
        title: '5. Making Your Budget Flexible',
        content: `Rigid budgets break. Flexible budgets bend and survive.

**Build in Flexibility:**

**1. Create a "Flex" or "Misc" Category** (5-10% of budget)
For the unexpected-but-expected: birthday gifts, car repairs, clothing needs

**2. Use Spending Ranges Instead of Exact Amounts**
"$200-250 for groceries" feels better than "$200 exactly"

**3. Allow Budget Transfers Between Categories**
Overspent on groceries? Take from dining out. Total budget stays the same.

**4. Have "No-Judgment" Money**
$50-100/month you can spend on ANYTHING, no tracking, no guilt

**5. Adjust Monthly**
Income changed? Unexpected expense? Life happened? Update the budget.

**6. Plan for Irregular Expenses**
Annual costs (insurance, registrations): divide by 12 and save monthly
Seasonal costs (heating, holidays): save extra in low months

The budget should serve you, not control you. Flexibility keeps it sustainable.`,
        examples: [
          'When Lisa\'s car needed $300 in repairs, she pulled from her "flex fund" instead of credit card. Budget saved her from debt.',
          'Nina overspent on groceries by $60 but underspent on gas by $70. She just noted it and moved on—totals still balanced.',
          'Sophie gives herself $75/month "no questions asked" money. Sometimes it\'s takeout, sometimes shoes, sometimes it rolls over. This freedom keeps her from budget rebellion.'
        ],
        tips: [
          'Perfect execution isn\'t the goal—overall balance is',
          'If you consistently overspend in one category, adjust the budget to reality',
          'Build flexibility into the plan, not as an excuse to ignore it',
          'Life changes—your budget should change with it'
        ]
      }
    ],

    keyTakeaways: [
      'A budget is a spending plan based on YOUR priorities, not restriction or punishment',
      'Choose a budgeting method that matches your personality: 50/30/20, zero-based, envelope, or pay-yourself-first',
      'Start with 8-12 simple categories—you can always add detail later',
      'Your first budget will be wrong—use real spending data to adjust it',
      'Build flexibility into your budget: flex category, spending ranges, and permission to adjust',
      'If expenses exceed income, you must cut spending or increase income immediately',
      'The best budget is one you\'ll actually follow—simple beats perfect'
    ],

    actionItems: [
      'Calculate your exact monthly take-home income (net pay, not gross)',
      'Choose one budgeting method to try for the next 2 months',
      'List all your fixed expenses and calculate the monthly total',
      'Review last month\'s bank/credit statements to see actual variable spending',
      'Create your first budget using a simple spreadsheet or budgeting app'
    ],

    resources: [
      {
        title: 'Budget Template Spreadsheet',
        type: 'worksheet',
        description: 'Free downloadable budget template with common categories',
        url: 'https://www.vertex42.com/ExcelTemplates/money-management-template.html'
      },
      {
        title: '50/30/20 Budget Calculator',
        type: 'calculator',
        description: 'Calculate your 50/30/20 budget based on your income',
        url: 'https://www.nerdwallet.com/article/finance/nerdwallet-budget-calculator'
      },
      {
        title: 'Budgeting App Comparison',
        type: 'tool',
        description: 'Compare popular budgeting apps (Mint, YNAB, EveryDollar, etc.)',
        url: 'https://www.nerdwallet.com/article/finance/best-budget-apps'
      },
      {
        title: 'Zero-Based Budget Guide',
        type: 'article',
        description: 'Step-by-step guide to creating a zero-based budget',
        url: 'https://www.ramseysolutions.com/budgeting/how-to-make-a-zero-based-budget'
      }
    ]
  }
}

export const trackingIncomeExpenses: Lesson = {
  id: 'tracking-income-expenses',
  courseId: 'budgeting-basics',
  slug: 'tracking-income-expenses',
  title: 'Tracking Income & Expenses',
  description: 'Master the art of tracking where your money comes from and where it goes.',
  durationMinutes: 45,
  displayOrder: 2,
  objectives: [
    'Learn different methods for tracking spending effectively',
    'Choose tracking tools that match your lifestyle',
    'Develop a sustainable tracking routine that actually works',
    'Analyze spending patterns to find opportunities for improvement',
    'Use tracking data to make better financial decisions'
  ],
  keyConcepts: [
    'Manual vs. Automatic Tracking',
    'Spending Patterns',
    'Category Analysis',
    'Cash Flow Timing',
    'Financial Awareness'
  ],
  content: {
    introduction: `You can't manage what you don't measure. This is the universal truth of personal finance.

Most people have no idea where their money actually goes. They know the big stuff—rent, car payment—but the other $1,500/month just... disappears.

Tracking isn't about judging every purchase. It's about awareness. Once you SEE where money goes, you naturally make better choices. No willpower required.

The key is finding a tracking method you'll actually use. Not the "perfect" system, not what finance gurus recommend—what works for YOUR real life.

Let's find your system.`,

    sections: [
      {
        title: '1. Why Tracking Actually Matters',
        content: `Tracking your income and expenses isn't busy work—it's the foundation of financial control.

**What tracking reveals:**
• Where money is actually going (vs. where you think it goes)
• Problem spending patterns (every Wednesday eating out?)
• Forgotten subscriptions bleeding money
• Income timing vs. bill due dates
• Progress toward goals (or lack thereof)

**The tracking paradox:**
People who track spend less, even without trying to cut back. Why? Because awareness changes behavior automatically.

When you know that daily $6 latte is $180/month, you might naturally cut to 3x/week without anyone telling you to.

**Tracking shows reality:**
• "I barely eat out" + tracking = $400/month on food delivery
• "I'm not a big shopper" + tracking = $300/month on Amazon
• "I have no idea where money goes" + tracking = clarity and control

You don't need to track forever, but track for at least 2-3 months to establish baseline patterns.`,
        examples: [
          'Patricia thought she spent "maybe $100" monthly on coffee/treats. Tracking revealed $240. She didn\'t quit entirely—just became intentional, cutting to $120 and redirecting $120 to debt.',
          'Carmen had "mystery spending"—$800/month unaccounted for. One month of tracking found: $200 groceries bought on credit (forgot to track), $150 in subscriptions, $450 in small "quick stops."',
          'Tracking helped Elena discover she spent $80/month on a gym she visited twice. Canceling it and doing YouTube workouts at home freed money for her emergency fund.'
        ],
        tips: [
          'Track for at least 30 days before making judgments',
          'Don\'t change spending while tracking the first month—just observe',
          'You\'ll be surprised—everyone is—and that\'s the point',
          'Tracking works even if you hate it because awareness = change'
        ]
      },
      {
        title: '2. Tracking Methods: Find What Works for You',
        content: `Different people need different systems. Here are your options:

**Manual Tracking (Pen & Paper or Spreadsheet)**
Write down every expense as it happens
Pros: Forces awareness, no tech needed, complete control
Cons: Time-consuming, easy to forget entries
Best for: People who like hands-on, tactile processes

**Budgeting Apps (Mint, YNAB, EveryDollar, PocketGuard)**
Connect to bank accounts, auto-categorize transactions
Pros: Automatic, visual reports, minimal effort
Cons: Privacy concerns, subscription costs (some), learning curve
Best for: Tech-comfortable people who want automation

**Hybrid Method**
Apps for regular bills, manual tracking for cash/variable spending
Pros: Best of both worlds, catches everything
Cons: Still requires some effort
Best for: People who like automation but want control over details

**Receipt Method**
Save all receipts, review weekly, manually categorize
Pros: Perfect record, forces weekly review
Cons: Receipt clutter, weekly time commitment
Best for: Detail-oriented people who like paper trails

**The Bare Minimum**
Review bank/credit statements monthly, note just the totals by category
Pros: Low effort, still provides awareness
Cons: Less detailed, easier to miss patterns
Best for: Beginners or people who hate tracking

Pick one and commit for 60 days. Then evaluate.`,
        examples: [
          'Tech-savvy Mia uses Mint (free app). Spends 5 minutes weekly checking categorization. Sees patterns in charts without manual work.',
          'Cash-user Yolanda keeps envelopes for spending categories and writes totals in a notebook weekly. Old school but it works perfectly for her.',
          'Busy mom Rachel takes 10 minutes every Sunday to review her credit card and checking account online, categorizing totals in a simple spreadsheet.'
        ],
        tips: [
          'Don\'t switch methods for at least 2 months—give it time to become habit',
          'The method you\'ll actually use beats the "perfect" method you won\'t',
          'You can change methods later—nothing is permanent',
          'If current method isn\'t working after 60 days, try a different one'
        ]
      },
      {
        title: '3. Setting Up a Tracking Routine',
        content: `Tracking only works if it becomes a habit. Here's how to build the routine:

**Daily Tracking (5 minutes):**
For manual trackers:
• Morning: review yesterday's spending
• Evening: enter today's purchases
• Check account balances quickly

For app users:
• Morning: glance at yesterday's auto-categorized expenses
• Fix any miscategorized items
• Note anything unusual

**Weekly Review (15-20 minutes):**
Every Sunday (or your chosen day):
• Review all spending for the week
• Compare to budget categories
• Note any overspending or underspending
• Check upcoming bills for next week
• Adjust if needed

**Monthly Check-in (30-60 minutes):**
End of each month:
• Total spending by category
• Compare to budget
• Analyze patterns
• Identify wins and problems
• Adjust next month's budget based on reality
• Check progress toward goals

**The key:** Same time, same place, every cycle. Habits need consistency.`,
        examples: [
          'Every morning with coffee, Sophie spends 3 minutes reviewing yesterday in her app. It\'s paired with an existing habit so she doesn\'t forget.',
          'Sunday evenings after kids\' bedtime, married couple Jorge and Diana spend 20 minutes reviewing the week together. It\'s their "money date."',
          'First day of every month, Rita logs in and generates spending report. Takes 45 minutes to review, adjust budget, and plan for next month.'
        ],
        tips: [
          'Attach tracking to existing habits (morning coffee, Sunday routine)',
          'Put it on your calendar like any appointment',
          'Keep tracking tools visible and easily accessible',
          'If you miss a day/week, just start again—don\'t give up entirely'
        ]
      },
      {
        title: '4. Analyzing Your Spending Patterns',
        content: `Once you have data, look for patterns. This is where tracking becomes powerful.

**Questions to ask your data:**

**Where does most money go?**
Rank categories by spending—you might be surprised which is #1

**What's the biggest surprise?**
Where did you spend way more than you thought?

**What are the "leaks"?**
Small recurring expenses that add up: subscriptions, daily treats, convenience purchases

**Is there a pattern to overspending?**
Weekends? Payday? When stressed? Bored? After work?

**What feels worth it vs. regretted?**
$100 on concert = joy and memories
$100 on random Target runs = can't remember what you bought

**Are there irregular expenses you forgot?**
Car maintenance, gifts, annual fees—these blow budgets

**How does timing affect you?**
Bills due early in month but paid mid-month? That creates stress and overdrafts.

Use this analysis to make intentional changes, not to shame yourself.`,
        examples: [
          'Tracking showed Jasmine spent $280/month on "convenience"—Uber Eats when tired, drugstore runs for forgotten items. She meal-prepped Sundays and saved $150/month.',
          'Nina discovered Thursday was her danger day—$60+ on takeout every Thursday when exhausted. She started Thursday meal delivery subscription for $40/month instead. Problem solved.',
          'After 2 months tracking, Emma saw she spent $400+ monthly on clothes she rarely wore, but only $50 on hobbies she loved. She flipped the spending intentionally.'
        ],
        tips: [
          'Look for patterns without judgment—this is information, not failure',
          'Focus on the biggest categories first—don\'t obsess over $5 purchases',
          'Notice emotional spending triggers (stress, boredom, celebration)',
          'Identify what truly brings value vs. mindless spending'
        ]
      },
      {
        title: '5. Using Tracking Data to Improve',
        content: `Data without action is just numbers. Here's how to use what you learn:

**Immediate Actions:**
• Cancel forgotten subscriptions
• Stop automatic charges you don't use
• Identify and cut one "leak" category

**Budget Adjustments:**
• Increase categories you consistently overspend (if budget was unrealistic)
• Decrease categories where money goes unused
• Add categories for expenses you missed

**Behavior Changes:**
• If you overspend when bored, find free alternatives
• If payday triggers splurges, implement 48-hour rule
• If convenience spending is high, prep/plan ahead

**Goal Refinement:**
• Reallocate money from low-value to high-value spending
• Redirect "waste" spending to savings or debt
• Adjust timeline for goals based on real cash flow

**Prevention Strategies:**
• Set up alerts when approaching category limits
• Use cash for problem categories
• Block temptation apps/sites during vulnerable times

Remember: tracking is a tool for improvement, not perfection.`,
        examples: [
          'After seeing she spent $380/month eating out but only $200 on groceries, Carmen swapped the numbers—ate at home more, saved $180/month toward emergency fund.',
          'Tracking revealed Patricia\'s Amazon spending spiked after stressful workdays. She deleted the app from her phone and added a 24-hour waiting period. Spending dropped 60%.',
          'Lisa found she spent $90/month on various streaming services but only watched Netflix. Cut the rest, kept Netflix, redirected $60 to debt payoff.'
        ],
        tips: [
          'Make 1-2 changes at a time, not everything at once',
          'Start with easiest wins (forgotten subscriptions) before tackling habits',
          'Redirect "found money" to goals immediately or it disappears',
          'Re-track in 3 months to see if changes stuck'
        ]
      }
    ],

    keyTakeaways: [
      'Tracking creates awareness, and awareness naturally changes spending behavior',
      'The best tracking method is the one you\'ll actually use consistently',
      'Track for at least 2-3 months to establish true spending patterns',
      'Daily quick checks + weekly reviews + monthly analysis = sustainable tracking',
      'Look for patterns without judgment—focus on the data, not shame',
      'Small recurring expenses (subscriptions, daily treats) add up to huge annual costs',
      'Use tracking data to adjust your budget to reality, not fantasy'
    ],

    actionItems: [
      'Choose one tracking method and commit to using it for the next 60 days',
      'Set up your tracking system today (download app, create spreadsheet, or get notebook)',
      'Schedule your weekly review time on your calendar and set a recurring reminder',
      'Track every expense for the next 7 days without changing spending behavior—just observe',
      'At the end of this week, review your tracked expenses and identify your biggest spending category'
    ],

    resources: [
      {
        title: 'Mint (Free Budgeting App)',
        type: 'tool',
        description: 'Free app that connects to accounts and auto-tracks spending',
        url: 'https://mint.intuit.com'
      },
      {
        title: 'Expense Tracking Spreadsheet',
        type: 'worksheet',
        description: 'Simple Excel template for manual expense tracking',
        url: 'https://www.vertex42.com/ExcelTemplates/expense-tracker.html'
      },
      {
        title: 'YNAB (You Need A Budget)',
        type: 'tool',
        description: 'Premium budgeting app with detailed tracking and goal-setting',
        url: 'https://www.youneedabudget.com'
      },
      {
        title: 'Monthly Spending Analysis Template',
        type: 'worksheet',
        description: 'Template for reviewing and analyzing monthly spending patterns',
        url: 'https://www.consumerfinance.gov/consumer-tools/budget-worksheet/'
      }
    ]
  }
}
