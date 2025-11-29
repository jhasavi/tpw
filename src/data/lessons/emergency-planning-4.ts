import { Lesson } from '@/types/curriculum'

export const buildingItSlowly: Lesson = {
  id: 'building-it-slowly',
  courseId: 'emergency-planning',
  slug: 'building-it-slowly',
  title: 'Building It Slowly',
  description: 'Learn practical strategies to build your emergency fund steadily, even on a tight budget.',
  durationMinutes: 50,
  displayOrder: 4,
  objectives: [
    'Create a realistic savings plan that fits your budget',
    'Find money to save even when budget feels maxed out',
    'Use windfalls and extra income strategically',
    'Stay motivated during the long process of building savings',
    'Overcome setbacks and rebuild after using emergency fund'
  ],
  keyConcepts: [
    'Pay Yourself First',
    'Automated Savings',
    'Incremental Progress',
    'Windfall Strategy',
    'Motivation Tactics'
  ],
  content: {
    introduction: `"Save 3-6 months of expenses" sounds impossible when you're living paycheck to paycheck. $15,000? $20,000? How?

The truth: You build it slowly. Very slowly. $25 at a time. $50 a week. $100 a month. Whatever you can manage.

It might take 6 months to hit $1,000. It might take 3 years to reach your full goal. That's okay. Most people never build an emergency fund at all—you're already ahead just by starting.

This lesson will show you exactly how to build your emergency fund steadily, sustainably, and successfully—even if money is tight and progress feels painfully slow. Because slow progress is still progress.`,

    sections: [
      {
        title: '1. Start Small: Your First $500',
        content: `The hardest part of emergency fund building is going from $0 to something. Let's get you to $500 fast.

**The $500 Quick Start Plan:**

**Week 1: Find $50**
• Sell something (clothes, books, electronics)
• Work one extra hour
• Skip one takeout meal = $25-40
• Collect spare change around the house

**Week 2: Find $50**
• Return something you recently bought
• Cancel one subscription
• Do a side gig (TaskRabbit, babysitting, yardwork)
• Skip coffee/treats this week

**Week 3-4: Find $100**
• List more items to sell
• Pick up extra shift
• Small freelance job (Fiverr, Upwork)
• Cut grocery budget $25/week for 4 weeks

**Week 5-8: Find $200**
• Tax refund (even partial)
• Birthday/holiday money
• Overtime at work
• Continue cutting one discretionary expense weekly

**Week 9-12: Find $100**
• Auto-transfer $25/week from checking
• Mystery shop or online surveys ($5-10/week)
• Cash back from credit card/apps
• Sell bigger items (bike, furniture, old phone)

**Total: $500 in 12 weeks (3 months)**

This is FAST. Most of it comes from one-time actions (selling stuff, cutting subscriptions) rather than ongoing sacrifice.

**Alternative: The Tax Refund Jumpstart**

Average tax refund: $2,800

Strategy:
• Wait for tax refund
• Immediately transfer $500-1,000 to emergency fund
• DON'T spend refund on wants
• Boom—you're at $500-1,000 in one day

**The Key: Separate the Money Immediately**

As soon as you get ANY money (sold item, extra work, refund), transfer it to emergency fund account THE SAME DAY before you can spend it.

Money you never "see" in your checking account is money you won't miss.`,
        examples: [
          'Lisa sold clothes on Poshmark ($80), picked up two extra shifts ($160), and used her $300 tax refund. She hit $500 in 5 weeks.',
          'Carmen cut her grocery budget by $25/week using meal planning. In 20 weeks she had $500 saved just from being more intentional with food.',
          'Nina couldn\'t find things to sell or extra work. She set up automatic $12/week transfer from checking. In 42 weeks (less than a year) she had $500. Slow but it worked.',
          'Rachel got $400 birthday money from family. Instead of spending it, she deposited directly to emergency fund. Added $25/month for 4 months. Hit $500 total in 4 months.'
        ],
        tips: [
          'Focus only on getting to $500 first—don\'t think about the full $15,000 yet',
          'One-time income (selling stuff, refunds) gets you there faster than cutting spending',
          'Transfer money to emergency fund THE SAME DAY you receive it',
          'Celebrate hitting $500—you have an actual emergency fund now!'
        ]
      },
      {
        title: '2. The Pay Yourself First System',
        content: `Once you have initial momentum, you need a sustainable system. "Pay yourself first" is that system.

**The Concept:**

Traditional approach: Earn money → Pay bills → Buy necessities → Save whatever's left (usually $0)

Pay yourself first: Earn money → Save first → Pay bills → Buy necessities with what remains

**How to Implement:**

**Step 1: Decide Your Emergency Fund "Bill"**

Treat emergency fund savings like a non-negotiable bill:
• $25/month
• $50/month
• $100/month
• $200/month
• Whatever you can sustain

Start conservative. Better to save $25 consistently than commit to $100 and fail.

**Step 2: Automate It**

Set up automatic transfer:
• From checking to emergency fund savings
• Same day each month (1-2 days after payday)
• Never manually transfer—it's automatic

**Step 3: Budget With What's Left**

Whatever remains after auto-transfer is your budget for the month.
Your checking balance already reflects emergency fund savings—it's gone, it's saved.

**Step 4: Increase Over Time**

Every raise, extra income, or expense you eliminate:
Increase auto-transfer by half of the amount

Example: Get $100/month raise → Increase transfer by $50

**Why This Works:**

**You can't spend what you don't see**
Money leaves your checking before you can budget it for other things

**No willpower required**
You set it up once, it runs forever

**Forces budget adjustment**
You naturally spend less because there's less available

**Builds wealth invisibly**
$100/month = $1,200/year = $6,000 in 5 years (+ interest) without thinking about it

**Pays yourself like you pay everyone else**
Landlord gets paid first. Credit card gets paid. Why shouldn't future-you get paid?

**The Emergency Fund Paycheck Breakdown:**

From each paycheck, money goes:
1. Emergency fund transfer (10-15% ideal, whatever you can do in reality)
2. Fixed bills (rent, car, insurance, etc.)
3. Variable necessities (groceries, gas)
4. Everything else

Emergency fund comes FIRST in that list.`,
        examples: [
          'Elena set up $75 auto-transfer the day after each biweekly paycheck. $150/month goes to emergency fund without her touching it. In one year: $1,800 saved.',
          'Carmen started with $25/month auto-transfer. After 6 months, cut $40 cable bill. Increased transfer to $50/month. After a year, got raise. Now transfers $100/month. Emergency fund grows as she does.',
          'Nina manually transferred "whatever was left" and saved $0 most months. She set up $50 auto-transfer. Suddenly she was saving $600/year. Automation was the difference.',
          'Single mom Rachel could only do $40/month auto-transfer. Felt tiny. But after 2 years she had $960 plus interest. Slow and steady beat giving up.'
        ],
        tips: [
          'Set up automation TODAY, not "when I have more money"',
          'Start with an amount that feels almost too small—consistency matters more than amount',
          'Never cancel auto-transfer even in tight months—let fund build',
          'Increase transfer amount whenever income increases or expenses decrease'
        ]
      },
      {
        title: '3. Finding Money in a "Maxed Out" Budget',
        content: `"I literally have no money to save" is the most common objection. But there's almost always something. You just have to look carefully.

**Strategy 1: The Subscription Audit**

Americans average $273/month in subscriptions. Many are forgotten.

Action:
• Review bank statements for last 3 months
• Highlight every recurring charge
• Cancel anything you don't use weekly
• Downgrade anything you use but could live with less (Spotify family to individual, etc.)

Common finds: $80-150/month

**Strategy 2: The "One Less" Game**

Don't eliminate—just reduce by one:
• Eat out 4x/month instead of 5 = $30-50
• Get coffee 3x/week instead of daily = $40
• Buy lunch twice instead of daily = $80
• One less Target run = $30
• One less drink when out = $20

Total: $100-200/month from just "one less"

**Strategy 3: The No-Spend Challenge**

Pick one category for a "no-spend month":
• No eating out for 30 days
• No shopping for 30 days (except essentials)
• No entertainment spending for 30 days

Bank 100% of what you would have spent.

Results: $100-400 in one month

**Strategy 4: The 30-Day Delay Rule**

New rule: Wait 30 days before any non-essential purchase over $25.

Put the money in emergency fund immediately.
After 30 days, if you still want it AND have the cash, you can buy it.

Most times? You forget about it or realize you don't need it.

Savings: $50-200/month

**Strategy 5: The Spare Change Round-Up**

Use apps like Acorns, Qapital, or bank round-up features:
• Every purchase rounds to nearest dollar
• Difference goes to savings
• $4.60 coffee becomes $5 charge, $0.40 to savings

Invisible savings: $20-50/month

**Strategy 6: The Weekend Side Hustle**

One 4-hour side gig per weekend:
• Babysitting: $60-100
• Dog walking: $40-80
• Yard work: $60-120
• Online tutoring: $80-160
• TaskRabbit tasks: $50-100

4 weekends = $200-400/month, all to emergency fund

**Strategy 7: The Debt-to-Savings Flip**

Paid off a credit card that was $75/month minimum?
Keep paying yourself that $75—but to emergency fund instead.

Debt freedom shouldn't mean lifestyle inflation.

**Strategy 8: The Raise Allocation**

Got a raise? Pretend you didn't.
50% to emergency fund, 50% to improve lifestyle.

$200/month raise = $100 to emergency fund, $100 to enjoy

**The Reality:**

If you find $50/month: $600/year → $3,000 in 5 years
If you find $100/month: $1,200/year → $6,000 in 5 years
If you find $200/month: $2,400/year → $12,000 in 5 years

Plus interest. The money IS there. You just have to redirect it.`,
        examples: [
          'Subscription audit found Carmen paying for: gym she didn\'t use ($50), 3 streaming services she barely watched ($35), apps she forgot about ($20). Cut them all = $105/month to emergency fund.',
          'Nina did "no eating out for 30 days" and discovered she spent $380/month on restaurants. She didn\'t eliminate entirely, but cut to $150/month. Saved $230/month ongoing.',
          'Lisa started babysitting one Saturday/month for 4 hours earning $80. That\'s $960/year for 48 hours of work total. Entirely funded her starter emergency fund.',
          'When Rachel paid off her $125/month car loan, she immediately set up $125 auto-transfer to emergency fund. Kept her budget the same but now saving instead of paying interest.'
        ],
        tips: [
          'Track expenses for one month to see where money really goes',
          'Don\'t try all strategies at once—pick 2-3 and commit',
          'Redirect found money to emergency fund THE SAME WEEK',
          'Remember: it\'s easier to save $25 in 4 different ways than $100 in one way'
        ]
      },
      {
        title: '4. Using Windfalls Strategically',
        content: `Windfalls—unexpected money—are emergency fund accelerators. Here's how to use them right:

**Common Windfalls:**
• Tax refunds ($2,800 average)
• Work bonuses
• Gifts (birthday, holiday, wedding)
• Inheritance
• Garage sale profits
• Insurance settlements
• Rebates and cashback
• Stimulus payments

**The Windfall Allocation Strategy:**

**If Emergency Fund Is Not Complete:**

Use 50-75% rule:
• 50-75% to emergency fund immediately
• 25-50% for small celebration or pressing need

Example: $1,000 bonus
• $750 to emergency fund
• $250 for something you need/want

This balances progress with not feeling deprived.

**If Emergency Fund IS Complete:**

Use priority allocation:
1. High-interest debt payoff (20%+ interest)
2. Medium-interest debt (7-20%)
3. Retirement catch-up
4. Other savings goals (house, car, etc.)
5. Enjoy some guilt-free

**Specific Windfall Plans:**

**Tax Refund:**
Most people get $2,000-3,000 annually.

Plan:
• 75% to emergency fund = $1,500-2,250
• 25% to enjoy/needs = $500-750

This could build your entire starter fund in ONE day.

**Work Bonus:**
• Split 50/50: half to fund, half to celebrate

**Gift Money:**
Under $100: Do what you want
$100-500: 50% to fund
$500+: 75% to fund

**Three-Paycheck Month:**
If paid biweekly, twice a year you get 3 paychecks in a month.

Your budget assumes 2 paychecks. The 3rd is "extra."

Plan:
• 100% of 3rd paycheck to emergency fund (you already budgeted without it)

**The Danger: Lifestyle Inflation**

Windfall arrives → Immediately spend on wants → Fund stays at $0 → No progress ever

Windfall arrives → Immediately transfer to savings → Then decide how to use remainder

The difference is transfer speed. Get it into savings THE SAME DAY.

**The Psychology Trick:**

Pretend windfalls are 25% smaller than they are.

$1,000 bonus? Pretend it's $750.
Transfer $750 to emergency fund immediately.
Spend the "real" remaining $250 as you wish.

This prevents overspending while building savings.`,
        examples: [
          'Maya got $2,400 tax refund. She transferred $2,000 to emergency fund immediately (before she could talk herself out of it). Used $400 for needs and small wants. Her fund jumped from $600 to $2,600 in one day.',
          'Carmen\'s $800 work bonus: $600 to emergency fund, $200 for nice dinner and small shopping spree. She celebrated AND made progress.',
          'Nina gets paid biweekly. Twice a year, she gets 3-paycheck months. Her $1,600 "extra" paycheck goes 100% to emergency fund. That\'s $3,200/year in two lump additions.',
          'When Rachel received $500 graduation gift for her daughter, she put $400 in the emergency fund and let her daughter keep $100 for fun. Daughter learned the value of saving, family emergency fund grew.'
        ],
        tips: [
          'Transfer windfall money to savings THE SAME DAY you receive it',
          'Decide on percentages BEFORE windfall arrives so you don\'t rationalize spending it all',
          'Even putting 50% of windfalls toward emergency fund = massive acceleration',
          'After emergency fund is complete, windfalls go to debt, investing, or goals'
        ]
      },
      {
        title: '5. Staying Motivated Through the Long Haul',
        content: `Building an emergency fund takes months or years. Here's how to stay motivated:

**Motivation Strategy 1: Visual Tracking**

Make progress visible:
• Paper thermometer chart colored in as you save
• Savings app with progress bar
• Sticky notes counting hundreds ($500, $600, $700...)
• Jar with marbles (one per $100)
• Spreadsheet graph showing growth

Why it works: Seeing progress motivates more progress.

**Motivation Strategy 2: Milestone Celebrations**

Celebrate every meaningful milestone:
• $100: Tell a friend, give yourself credit
• $500: Small treat ($10-20)
• $1,000: Bigger celebration (nice meal, wanted item under $50)
• $2,500: Half-day off to relax
• $5,000: Something you've wanted
• $10,000: Significant celebration

Don't spend so much you erase progress, but acknowledge the achievement.

**Motivation Strategy 3: The "Days of Freedom" Counter**

Calculate: How many days could you survive without income?

$500 saved, $100/day in essentials = 5 days of freedom
$2,000 saved = 20 days of freedom
$6,000 saved = 60 days (2 months!) of freedom

Track "days of freedom" instead of just dollar amount. It's more motivating.

**Motivation Strategy 4: Future-You Letters**

When you're tempted to raid emergency fund for non-emergency:

Write a letter from Future-You who just experienced an emergency with no fund.

"Dear Past Me, I really wish you hadn't spent that $500 on [want]. Because now the car is broken and I have to use a credit card at 24% interest. Please save the money for me."

Reading this reminds you WHY you're building the fund.

**Motivation Strategy 5: The Compound Interest Tracker**

Track not just amount saved but interest earned.

High-yield savings at 4%:
$5,000 earns $200/year
$10,000 earns $400/year

Each month, note: "Saved $100 + earned $15 interest = $115 total progress"

Free money motivates.

**Motivation Strategy 6: The Community Approach**

Join or create accountability:
• Online group (Reddit r/personalfinance, r/DaveRamsey)
• One friend also building emergency fund
• Partner/spouse doing it together
• Money coach or financial accountability

Share milestones, cheer each other, problem-solve together.

**Motivation Strategy 7: Remember Your "Why"**

Write down specifically why you're building this fund:

"So I don't have to borrow from my mom at 40"
"So my kids don't see me panic about money"
"So I can sleep at night"
"So one car repair doesn't ruin me"

Read your "why" when tempted to quit or spend.

**When Progress Feels Too Slow:**

Remember: 
• 1 year from now, you'll wish you started today
• $50/month = $600/year—that's $600 more than most Americans save
• Slow progress beats no progress every single time
• Building wealth takes years—anyone promising quick results is lying

**When You Want to Quit:**

Look at what you've accomplished so far.
$0 → $400 in 4 months = real progress
On track to hit $1,000 in 10 months total
Keep going—you're actually doing it!`,
        examples: [
          'Lisa printed a thermometer chart for her $15,000 goal. She colors $100 increments with marker. Seeing it fill up motivates her to keep finding ways to save.',
          'Carmen posts monthly emergency fund updates in a Reddit accountability group. Other women cheer her progress and share tips. Community keeps her going.',
          'When Nina wanted to use $300 from her emergency fund for shoes, she calculated that $300 at 4% interest would be $420 in 10 years. Future dollars made her keep saving.',
          'Rachel tracks "days of freedom." She\'s at 47 days now (could survive 47 days without income). Watching that number climb from 3 days to 47 in 18 months keeps her motivated.'
        ],
        tips: [
          'Track progress visually—charts, graphs, thermometers work',
          'Celebrate every $500 milestone with small, affordable acknowledgment',
          'Focus on "days of freedom" rather than dollar amounts for motivation',
          'Find one accountability person or group to share progress with'
        ]
      }
    ],

    keyTakeaways: [
      'Start small—getting to $500 fast builds momentum for bigger goals',
      'Pay yourself first by automating transfers from checking to emergency fund',
      'Even "maxed out" budgets have $50-200/month available through subscription cuts, spending reductions, or side income',
      'Use 50-75% of windfalls (tax refunds, bonuses) to accelerate emergency fund building',
      'Visual tracking, milestone celebrations, and accountability keep you motivated through months/years of saving',
      'Slow progress is still progress—$50/month = $600/year = $3,000 in 5 years',
      'Automate everything possible—willpower fails, automation works'
    ],

    actionItems: [
      'Set up automatic transfer from checking to emergency fund starting this week',
      'Audit subscriptions and cancel at least one to free up $20-50/month',
      'Create a visual tracker (chart, thermometer, graph) for your emergency fund goal',
      'Calculate your "days of freedom" (current emergency fund ÷ daily essential expenses)',
      'Commit to directing 50%+ of next windfall (tax refund, bonus, gift) to emergency fund'
    ],

    resources: [
      {
        title: 'Emergency Fund Savings Plan Template',
        type: 'worksheet',
        description: 'Month-by-month plan for building your emergency fund with milestones'
      },
      {
        title: 'Subscription Audit Checklist',
        type: 'worksheet',
        description: 'Comprehensive list to help you find and cancel forgotten subscriptions'
      },
      {
        title: 'Automatic Savings Calculator',
        type: 'calculator',
        description: 'Calculate how long it will take to reach your goal at different monthly amounts',
        url: 'https://www.bankrate.com/banking/savings/savings-goal-calculator/'
      },
      {
        title: 'Side Hustle Ideas for Quick Cash',
        type: 'article',
        description: '50+ ways to earn extra money to jumpstart your emergency fund',
        url: 'https://www.thepennyhoarder.com/make-money/side-gigs/'
      }
    ]
  }
}
