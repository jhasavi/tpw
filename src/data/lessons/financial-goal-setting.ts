import { Lesson } from '@/types/curriculum'

/**
 * Lesson: Financial Goal Setting
 * Course: Financial Literacy Basics
 */

export const financialGoalSetting: Lesson = {
  id: 'financial-goal-setting',
  courseId: 'financial-literacy-basics',
  slug: 'financial-goal-setting',
  title: 'Financial Goal Setting',
  description: 'Learn how to set meaningful financial goals and create a roadmap to achieve them.',
  durationMinutes: 45,
  displayOrder: 3,
  objectives: [
    'Understand the difference between short-term, medium-term, and long-term goals',
    'Learn the SMART goal framework for financial planning',
    'Identify your personal financial priorities and values',
    'Create actionable steps to achieve your financial goals',
    'Build motivation and accountability into your goal-setting process'
  ],
  keyConcepts: [
    'Short-term vs. Long-term Goals',
    'SMART Goals',
    'Financial Priorities',
    'Goal Hierarchy',
    'Milestone Tracking'
  ],
  content: {
    introduction: `Setting financial goals isn't about restricting yourself—it's about giving yourself permission to dream and then creating a plan to make those dreams real.

Without goals, money just flows in and out with no purpose. With goals, every dollar has meaning. You're not just "trying to save money"—you're building an emergency fund so you can sleep at night. You're not just "paying off debt"—you're freeing yourself to travel or start a business.

Goals transform money from a source of stress into a tool for building the life you want.

Let's learn how to set goals that actually work—not unrealistic fantasies, but real, achievable targets that move you forward.`,

    sections: [
      {
        title: '1. Understanding Goal Timeframes',
        content: `Financial goals fall into three categories based on when you want to achieve them:

**Short-term Goals (0-1 year)**
These are your immediate priorities—things you can accomplish within the next 12 months.
• Build a $1,000 starter emergency fund
• Pay off one credit card
• Save for a small purchase or expense
• Start tracking your spending
• Open a retirement account

**Medium-term Goals (1-5 years)**
These require more time and consistent effort:
• Save 3-6 months of expenses for emergencies
• Pay off credit card debt completely
• Save for a down payment on a car
• Build up retirement savings
• Take a significant trip or vacation

**Long-term Goals (5+ years)**
These are your big-picture dreams:
• Buy a home
• Pay off student loans
• Retire comfortably
• Fund your children's education
• Achieve financial independence

Understanding timeframes helps you prioritize. You can't do everything at once, but you can make progress on all three simultaneously.`,
        examples: [
          'Elena\'s goals: Short-term - Save $500 for car repairs; Medium-term - Pay off $8,000 credit card in 3 years; Long-term - Retire at 65 with $500,000 saved.',
          'Single mom Rachel focuses on: Short-term - $1,000 emergency fund; Medium-term - Stop living paycheck-to-paycheck; Long-term - Own a home and pay for daughter\'s college.',
          'After divorce, Susan\'s priorities shifted: Short-term - Separate finances from ex; Medium-term - Rebuild credit and emergency fund; Long-term - Secure retirement as a single woman.'
        ],
        tips: [
          'Don\'t ignore short-term goals while chasing long-term dreams',
          'Your timeframes might be different based on your age and life stage',
          'It\'s okay to have 2-3 goals in each category, but not 20',
          'Short-term wins build momentum for long-term success'
        ]
      },
      {
        title: '2. The SMART Goal Framework',
        content: `Vague goals fail. Specific goals succeed. The SMART framework helps you create goals that actually work:

**S - Specific**
Not "save more money" but "save $5,000"
Not "pay off debt" but "pay off the Visa card"

**M - Measurable**
You can track progress with numbers
"$100 saved per month" not "save when I can"

**A - Achievable**
Challenging but realistic given your income and situation
Not "save $10,000 this month" on a $3,000 income

**R - Relevant**
Aligns with your values and life goals
Matters to YOU, not what others think you should do

**T - Time-bound**
Has a specific deadline
"By December 31st" not "someday"

Let's transform a vague goal into a SMART goal:
Vague: "I want to save money"
SMART: "I will save $3,000 for an emergency fund by saving $250/month for 12 months, because financial security is my top priority."`,
        examples: [
          'Vague: "Get out of debt" → SMART: "Pay off my $4,000 Mastercard by putting $350/month toward it, becoming debt-free in 12 months."',
          'Vague: "Save for retirement" → SMART: "Contribute 5% of my salary ($200/month) to my 401k starting next paycheck, increasing to 10% within 2 years."',
          'Vague: "Stop overspending" → SMART: "Reduce my dining out budget from $400 to $200/month by meal planning every Sunday and packing lunch 4 days/week."'
        ],
        tips: [
          'Write your SMART goals down—they\'re 42% more likely to happen',
          'If a goal feels overwhelming, break it into smaller SMART goals',
          'Review goals monthly and adjust if life circumstances change',
          'Share goals with a trusted friend for accountability'
        ]
      },
      {
        title: '3. Identifying Your Personal Priorities',
        content: `Before setting specific goals, you need to understand what matters most to YOU. Your priorities guide where your money should go.

Ask yourself these questions:
• What keeps me up at night financially?
• What would make me feel most secure?
• If I had an extra $500/month, what would bring me the most peace or joy?
• What am I willing to sacrifice spending on to achieve my goals?
• What financial mistake do I most want to avoid?

Common financial priorities for women:
• **Security:** Emergency fund, stable housing, good insurance
• **Independence:** Not relying on anyone else financially
• **Family:** Providing for children, helping aging parents
• **Freedom:** Debt-free living, flexible work, travel
• **Legacy:** Building wealth to pass on, making a difference

There's no "right" priority—only yours. Once you know what matters, goal-setting becomes much easier.`,
        examples: [
          'After her divorce, Maria\'s top priority was financial independence. Her goals: eliminate joint debt, build 6 months savings, and never share a bank account again.',
          'Young mom Jasmine prioritized family security: $5,000 emergency fund came before retirement contributions because she needed to know she could handle an emergency.',
          'Career-focused Ana prioritized freedom: she paid off $30,000 in student loans aggressively so she could have flexibility to change careers or start a business.'
        ],
        tips: [
          'Your priorities may differ from conventional financial advice—that\'s okay',
          'Life stages change priorities: security first, then growth',
          'Being honest about priorities helps you say "no" to less important spending',
          'If everything is a priority, nothing is—choose your top 3'
        ]
      },
      {
        title: '4. Creating Your Goal Hierarchy',
        content: `You can't do everything at once, so you need a hierarchy—an order of operations for your goals.

**Foundation Goals** (Do These First):
1. Save $500-$1,000 starter emergency fund
2. Get employer 401k match (free money!)
3. Pay minimum payments on all debts

**Building Goals** (Once Foundation is Solid):
4. Pay off high-interest debt (credit cards over 15%)
5. Build emergency fund to 3-6 months of expenses
6. Save 15% for retirement

**Growth Goals** (After Foundation + Building):
7. Save for specific purchases (car, home down payment)
8. Pay off low-interest debt (student loans, mortgage)
9. Invest for other goals
10. Build wealth and generosity

This hierarchy isn't rigid—your situation might require adjustments. But it gives you a framework for deciding what to tackle first.`,
        examples: [
          'Lisa had $15,000 in credit card debt. She saved $1,000 first for emergencies, THEN attacked the debt aggressively. This prevented new debt when her car needed repairs.',
          'Carmen wanted to save for a house, but started with a small emergency fund first. When she lost her job, those savings kept her afloat while she found new work.',
          'New grad Sophie was tempted to pay off low-interest student loans fast, but focused on building emergency savings and getting her employer match first.'
        ],
        tips: [
          'Don\'t skip the foundation—it protects everything else',
          'If you have no emergency fund, that\'s goal #1',
          'Never skip employer 401k match—that\'s an instant 100% return',
          'Adjust the hierarchy for your situation, but have a clear order'
        ]
      },
      {
        title: '5. Making Goals Stick: Accountability and Motivation',
        content: `Setting goals is easy. Achieving them requires systems, accountability, and ongoing motivation.

**Visual Tracking:**
• Create a chart showing progress
• Use apps or spreadsheets to see movement
• Celebrate milestones (every $1,000 saved, every card paid off)

**Accountability:**
• Share goals with a friend or partner
• Join online communities with similar goals
• Work with a financial coach or counselor
• Regular check-ins (monthly or quarterly)

**Motivation Tactics:**
• Name your goals: "Freedom Fund" not "Savings Account"
• Keep a "Why List" - reasons your goals matter
• Visualize life after achieving the goal
• Remember your progress when you feel discouraged

**Make it Automatic:**
• Automate savings transfers on payday
• Set up automatic extra debt payments
• Use tools that round up purchases and save the difference
• Remove willpower from the equation

The difference between a wish and a goal is a plan. The difference between a plan and success is action.`,
        examples: [
          'Tanya named her savings accounts: "Oh Shit Fund" (emergency), "Freedom Fund" (debt payoff), "Adventure Fund" (travel). Seeing the names kept her motivated.',
          'Jennifer joined an online debt payoff community where women shared progress weekly. The support and accountability helped her stay on track when tempted to give up.',
          'After three failed attempts, Monica automated everything: $200 to savings, $100 extra to credit card, all on payday. She "paid herself first" and spent what was left.'
        ],
        tips: [
          'Review goals weekly at first, then monthly once you\'re in a rhythm',
          'When you hit a milestone, celebrate! Then set the next one',
          'If you fall off track, don\'t quit—just start again tomorrow',
          'Adjust goals if life changes—flexibility is strength, not failure'
        ]
      }
    ],

    keyTakeaways: [
      'Financial goals transform money from chaos into a tool for building the life you want',
      'SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound) are more likely to succeed than vague wishes',
      'Your priorities should drive your goals—not what others think you "should" do',
      'Build the foundation first (emergency fund, debt minimums) before growth goals',
      'Goals work best when they\'re written down, tracked visually, and shared with others',
      'Automate progress whenever possible—remove willpower from the equation',
      'Adjust goals as life changes, but don\'t abandon them at the first challenge'
    ],

    actionItems: [
      'Write down 1-2 goals in each timeframe: short-term, medium-term, and long-term',
      'Transform your most important goal into a SMART goal with specific numbers and deadlines',
      'Identify your top 3 financial priorities and align your goals with them',
      'Set up one automatic transfer or payment to make progress without thinking about it',
      'Choose one person to share your primary goal with for accountability'
    ],

    resources: [
      {
        title: 'Financial Goals Worksheet',
        type: 'worksheet',
        description: 'Step-by-step template for defining and tracking your financial goals',
        url: 'https://www.consumerfinance.gov/consumer-tools/financial-goal-worksheet/'
      },
      {
        title: 'Goal Progress Tracker',
        type: 'tool',
        description: 'Visual tracker to monitor progress toward multiple financial goals',
        url: 'https://www.vertex42.com/ExcelTemplates/savings-goal-tracker.html'
      },
      {
        title: 'SMART Goals Guide',
        type: 'article',
        description: 'Detailed guide to creating effective SMART financial goals',
        url: 'https://www.nerdwallet.com/article/finance/smart-money-goals'
      },
      {
        title: 'Debt Payoff Calculator',
        type: 'calculator',
        description: 'Calculate how long it will take to reach your debt payoff goals',
        url: 'https://www.bankrate.com/calculators/credit-cards/credit-card-payoff-calculator.aspx'
      }
    ]
  }
}
