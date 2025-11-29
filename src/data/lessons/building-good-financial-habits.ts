import { Lesson } from '@/types/curriculum'

/**
 * Lesson: Building Good Financial Habits
 * Course: Financial Literacy Basics
 */

export const buildingGoodFinancialHabits: Lesson = {
  id: 'building-good-financial-habits',
  courseId: 'financial-literacy-basics',
  slug: 'building-good-financial-habits',
  title: 'Building Good Financial Habits',
  description: 'Develop the daily and weekly habits that lead to long-term financial success and security.',
  durationMinutes: 30,
  displayOrder: 4,
  objectives: [
    'Understand why small habits matter more than big gestures',
    'Learn the key financial habits that build wealth over time',
    'Create a personal habit system that works with your lifestyle',
    'Overcome common obstacles to maintaining financial habits',
    'Track progress and stay motivated for the long term'
  ],
  keyConcepts: [
    'Habit Stacking',
    'Pay Yourself First',
    'Weekly Money Dates',
    'Automatic Systems',
    'Progress Over Perfection'
  ],
  content: {
    introduction: `Financial success isn't about one big decision—it's about small,consistent habits practiced over time.

You don't get fit by working out once. You don't become financially secure by saving money once. It's the daily choices, the weekly routines, the monthly check-ins that transform your financial life.

The good news? Habits are learnable. You don't need perfect discipline or superhuman willpower. You just need the right systems and enough consistency to make them stick.

Let's build habits that work for YOU—not some ideal version of yourself, but the real you with a real life, real challenges, and real goals.`,

    sections: [
      {
        title: '1. The Power of Tiny Financial Habits',
        content: `Big financial changes come from small, repeated actions.

Instead of trying to overhaul everything at once (which usually fails), focus on building one small habit at a time. Once it becomes automatic, add another.

**Examples of Tiny Financial Habits:**
• Check your bank balance every morning while drinking coffee
• Save all $5 bills that come your way
• Transfer $10 to savings every Friday
• Review one bill or subscription per week
• Pack lunch the night before to avoid buying it
• Wait 24 hours before any purchase over $50
• Round up purchases and save the difference

These feel small. They ARE small. But they compound over time into massive results.

A $10 weekly savings habit = $520/year. That's an emergency fund starter in one year from pocket change!`,
        examples: [
          'Megan started putting $20 in an envelope every time she got paid, before paying bills. In one year, she had $520 saved without even noticing the sacrifice.',
          'After overspending on impulse buys, Sarah made a rule: nothing over $30 without sleeping on it first. This one habit saved her $200+ monthly.',
          'Every Sunday, Rita spent 15 minutes reviewing her spending from the week. This tiny habit kept her aware and prevented the "where did my money go?" panic.'
        ],
        tips: [
          'Start with ONE habit—master it before adding more',
          'Make habits so small they feel almost silly—that\'s how they stick',
          'Attach new habits to existing routines ("After coffee, check balance")',
          'Track your habit daily for the first 30 days to build the pattern'
        ]
      },
      {
        title: '2. Pay Yourself First (The Most Important Habit)',
        content: `This is the #1 habit that separates people who build wealth from those who don't.

"Pay yourself first" means savings and investing comes BEFORE spending, not whatever is "left over" at the end of the month.

**How it works:**
1. Get paid
2. Immediately transfer money to savings/investment/debt payoff
3. Live on what remains
4. Repeat forever

Most people do the opposite:
1. Get paid  
2. Pay bills and spend on life
3. Save whatever is left (usually $0)
4. Wonder why they can't get ahead

Even if you can only pay yourself $25 per paycheck right now—DO IT. Start the habit. As income grows, increase the amount, but the habit stays the same.`,
        examples: [
          'Jasmine set up automatic transfers: $100 to savings and $50 extra to credit card on every payday. In 6 months, she had $600 saved and reduced her debt by $300.',
          'When Linda got a raise, she increased her 401k contribution by half the raise amount. She never saw the money, never missed it, and is now saving 12% automatically.',
          'Single mom Rachel could only afford $10/week to "pay herself first." After a year, that $520 saved her when the car broke down—no credit card needed!'
        ],
        tips: [
          'Automate this habit—willpower fails, automation doesn\'t',
          'Start with any amount, even $5—the habit matters more than the dollar amount',
          'When you get a raise, increase the "pay yourself" amount before lifestyle inflation kicks in',
          'This habit should feel slightly uncomfortable—that means it\'s working'
        ]
      },
      {
        title: '3. The Weekly Money Date',
        content: `Once a week, spend 15-30 minutes on your finances. Same day, same time if possible.

This isn't about judging yourself or stressing out. It's about staying aware, catching issues early, and making adjustments before small problems become big ones.

**What to do in your Money Date:**
• Review spending for the week—any surprises?
• Check account balances—on track with budget?
• Look at upcoming expenses for next week
• Pay any bills due in the next 7 days
• Check progress toward current goal
• Celebrate wins (stayed under budget, extra income, debt down)
• Adjust if needed

Make it pleasant: coffee, favorite playlist, natural light. This should be calm, not chaotic.

Couples: Do this together. Single? Text a friend your wins when you're done. Accountability matters.`,
        examples: [
          'Every Sunday morning, Emma spent 20 minutes reviewing her week over coffee. She caught a double-charge on her credit card and got $45 refunded—paid for her time!',
          'Maria and her husband started "Money Date Night" twice monthly. They stopped fighting about money because they were both aware of what was happening.',
          'After her divorce, Patricia started weekly money check-ins to rebuild financial confidence. The regular reviews helped her feel in control again.'
        ],
        tips: [
          'Put it on your calendar like any other important appointment',
          'Keep it short—this isn\'t an all-day project',
          'Focus on awareness, not perfection',
          'If you find problems, don\'t panic—just note them and make a plan'
        ]
      },
      {
        title: '4. Automate Everything You Can',
        content: `The best financial habit is the one you don't have to think about.

Automation removes willpower from the equation. You can't forget, you can't "just this once skip it," you can't talk yourself out of it. It just happens.

**What to automate:**
• Savings transfers (every payday)
• Bill payments (at least minimums)
• Retirement contributions (especially 401k)
• Extra debt payments
• Investment contributions

**What NOT to automate:**
• New subscriptions (you might forget them)
• Variable expenses (keep manual control)
• Large or irregular expenses

Set it up once, monitor monthly, and let it run. This is how people who "aren't good with money" still build wealth—the system runs itself.

Warning: Make sure there's always enough in checking to cover automations, or you'll get overdraft fees that defeat the purpose!`,
        examples: [
          'Carlos automated $200 to savings and minimum payments on all bills. Even during a chaotic work month, his money habits continued perfectly.',
          'After three months of "forgetting" to transfer to savings, Whitney automated $75 every payday. One year later she had almost $2,000 saved effortlessly.',
          'Tanya automated her credit card to pay $50 over minimum. In one year, she paid off $2,100 in debt without thinking about it once.'
        ],
        tips: [
          'Start automations 2-3 days after payday to ensure money is in the account',
          'Review all automations monthly to make sure they\'re still working',
          'As income increases, increase automated savings—lifestyle inflation is real',
          'Keep a buffer in checking ($200-500) to prevent overdrafts'
        ]
      },
      {
        title: '5. Building Habits That Stick',
        content: `Knowing what to do is easy. Actually doing it consistently is hard. Here's how to make habits stick:

**Start Small**
Don't try to save $500/month if you've never saved before. Start with $20. Master it. Then increase.

**Stack Habits**
Attach new habits to existing ones:
• "After breakfast, transfer $10 to savings"
• "Before bed, check tomorrow's schedule and bank balance"
• "On grocery shopping day, check food budget first"

**Track Visibly**
Use a calendar, app, or chart where you can SEE progress. Checking off "did my money date" or watching savings grow is motivating.

**Plan for Obstacles**
You'll mess up. Everyone does. The habit isn't perfection—it's getting back on track quickly.
• Missed a savings transfer? Do it tomorrow.
• Overspent? Review why and adjust for next time.
• Forgot money date? Do a quick 5-minute version.

**Celebrate Progress**
Every month you maintain a habit is success. Every dollar saved counts. Every bill paid on time matters. Acknowledge these wins!`,
        examples: [
          'After failing twice to "save money," Nicole started with just $5/week. That felt doable. After 3 months, she increased to $10, then $20. Now saving $100/month.',
          'Jamie used a visible tracker on her fridge. Every week she saved, she added a sticker. Seeing the row grow made her not want to break the streak.',
          'When Lisa forgot her weekly money date two weeks in a row, she set a phone reminder. Now it pops up every Sunday at 10am—she hasn\'t missed it since.'
        ],
        tips: [
          'It takes 2-3 months for a habit to feel automatic—be patient',
          'If you skip 2-3 times in a row, the habit is too hard—make it smaller',
          'Focus on building one habit at a time—don\'t try to do everything',
          'The goal is progress, not perfection—even 80% consistency is winning'
        ]
      }
    ],

    keyTakeaways: [
      'Small habits practiced consistently create bigger results than grand gestures done occasionally',
      'Paying yourself first (saving before spending) is the single most important financial habit',
      'Automation removes willpower and makes good habits effortless',
      'A weekly "money date" keeps you aware and prevents small issues from becoming big problems',
      'Habits stick when they\'re tiny, attached to routines, tracked visually, and celebrated',
      'You will mess up—the habit is getting back on track quickly, not being perfect',
      'Master one habit before adding another—sustainable change is gradual change'
    ],

    actionItems: [
      'Choose ONE tiny financial habit to start this week (save $10, check balance daily, etc.)',
      'Set up at least one automation: savings transfer, bill payment, or debt payment',
      'Schedule your first weekly "money date" on your calendar and set a recurring reminder',
      'Create a simple tracker (calendar, app, or chart) to mark each day you complete your new habit',
      'Plan for one obstacle: What will you do if you forget or can\'t do the habit? Write it down.'
    ],

    resources: [
      {
        title: 'Habit Tracker Template',
        type: 'worksheet',
        description: 'Simple monthly calendar to track your financial habits',
        url: 'https://www.vertex42.com/ExcelTemplates/habit-tracker.html'
      },
      {
        title: 'Automatic Savings Guide',
        type: 'article',
        description: 'Step-by-step guide to setting up automatic savings and bill pay',
        url: 'https://www.nerdwallet.com/article/banking/automatic-savings-plan'
      },
      {
        title: 'Atomic Habits Summary',
        type: 'article',
        description: 'Key concepts from James Clear\'s book on building habits that stick',
        url: 'https://jamesclear.com/atomic-habits'
      },
      {
        title: 'Budget & Habit Tracking Apps',
        type: 'tool',
        description: 'Comparison of apps that help automate and track financial habits',
        url: 'https://www.consumerfinance.gov/consumer-tools/money-apps/'
      }
    ]
  }
}
