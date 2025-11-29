import { Lesson } from '@/types/curriculum'

export const howMuchToSave: Lesson = {
  id: 'how-much-to-save',
  courseId: 'emergency-planning',
  slug: 'how-much-to-save',
  title: 'How Much to Save',
  description: 'Determine the right emergency fund target for your unique situation and life circumstances.',
  durationMinutes: 40,
  displayOrder: 2,
  objectives: [
    'Calculate your monthly essential expenses accurately',
    'Determine the right emergency fund size for your situation',
    'Understand factors that increase or decrease your target',
    'Set milestone goals to make building less overwhelming',
    'Know when you have "enough" and can shift focus to other goals'
  ],
  keyConcepts: [
    'Essential Expenses',
    '3-6 Month Rule',
    'Risk Factors',
    'Milestone Goals',
    'Personal Circumstances'
  ],
  content: {
    introduction: `"Save 3-6 months of expenses." You've probably heard this. But what does it actually mean for YOUR life?

$10,000 might be perfect for one person and completely inadequate for another. The right emergency fund size depends on your income, expenses, job stability, family situation, and risk tolerance.

This lesson will help you calculate YOUR magic number—not some generic advice, but the specific amount that lets YOU sleep at night.

We'll also break it into realistic milestones so you're not overwhelmed by a huge target. You'll build it step by step, celebrating progress along the way.`,

    sections: [
      {
        title: '1. Calculate Your Essential Monthly Expenses',
        content: `The foundation of emergency fund planning is knowing your true monthly essential expenses.

**What to Include (Needs Only):**

**Housing:**
• Rent or mortgage
• Property tax (if not in mortgage)
• HOA fees
• Renter's or homeowner's insurance

**Utilities:**
• Electric
• Gas/heat
• Water/sewer
• Internet (if needed for work)
• Phone (basic plan)

**Food:**
• Groceries only (bare bones, not current spending)
• Estimate $200-400/person depending on area

**Transportation:**
• Car payment (or save for repairs if paid off)
• Gas
• Car insurance
• Public transit costs
• Parking if required for work

**Insurance:**
• Health insurance
• Prescription medications

**Debt Minimum Payments:**
• Student loans (minimum only)
• Credit cards (minimum only)
• Personal loans (minimum only)

**Other Essentials:**
• Childcare if you work
• Child support or alimony if legally required
• Pet food and basic care

**What NOT to Include:**

Do NOT include discretionary spending:
• Dining out
• Entertainment
• Shopping
• Subscriptions (Netflix, gym, etc.)
• Hobbies
• Extra debt payments beyond minimums
• Savings contributions

**Why?**
In an emergency (job loss), you cut all non-essentials. Emergency fund only needs to cover what you absolutely cannot eliminate.

**How to Calculate:**

Step 1: List every essential expense
Step 2: Add them up
Step 3: This is your monthly "emergency budget"
Step 4: Multiply by 3-6 months for your target

**Example:**
Rent: $1,200
Utilities: $150
Groceries: $300
Car payment: $250
Insurance (car+health): $300
Gas: $100
Phone: $50
Minimum debt payment: $150
**Total: $2,500/month**

This woman's emergency fund target:
3 months: $7,500
6 months: $15,000`,
        examples: [
          'Lisa calculated $3,200/month in essentials (rent $1,400, all other costs $1,800). Her target: $9,600 for 3 months, $19,200 for 6 months. She started with $1,000, then aimed for $5,000, eventually reaching full 6 months.',
          'Single mom Rachel\'s essentials: $2,800/month including childcare. She prioritized 6-month fund ($16,800) over debt payoff because single income with kids is high risk.',
          'Carmen thought she needed $4,000/month but realized she was including dining out ($400) and subscriptions ($150). True essentials: $2,900. This made her target feel achievable.',
          'Couple Nina and David calculated together: $4,500/month essentials. Since both worked, they felt comfortable with 3 months ($13,500). If one lost job, the other\'s income would help.'
        ],
        tips: [
          'Be brutally honest—emergency budget should be bare bones survival mode',
          'Look at what you\'d actually cut if you lost income tomorrow',
          'Don\'t include current discretionary spending in essential calculation',
          'If you have dependents, include their essential costs too'
        ]
      },
      {
        title: '2. The 3-6 Month Rule (And When It Changes)',
        content: `The standard advice is "3-6 months of expenses." But which number is right for you?

**3 Months Is Enough If:**
• Two-income household (dual earning)
• Very stable job or industry
• Highly marketable skills (easy to find new job quickly)
• Low expenses relative to income
• No dependents
• Additional safety nets (family support, severance packages)
• Strong disability insurance
• Side income streams

**6 Months Is Better If:**
• Single income household
• Sole breadwinner with dependents
• Specialized career (takes longer to find equivalent job)
• Volatile industry or economy
• Self-employed or commission-based income
• Health issues that could interrupt work
• Living in high cost of living area
• No family safety net

**9-12 Months Is Ideal If:**
• Self-employed with variable income
• Single parent
• Nearing retirement age (harder to get hired)
• Medical conditions requiring ongoing care
• High-risk industry
• Only one specialized skill
• Supporting aging parents
• Naturally risk-averse person (peace of mind worth it)

**Special Circumstances:**

**Homeowner:** 
Add 1-2 months more for potential repairs. Houses break down.

**Health Issues:**
Add 2-3 months if you have chronic conditions requiring expensive care.

**Elderly Dependents:**
Add 1-2 months if you're supporting parents who might need sudden care.

**Pregnancy/New Baby:**
Aim for 6-9 months if planning to have kids (medical costs, potential leave).

**Industry Volatility:**
Tech, media, retail, hospitality = aim for 6+ months
Healthcare, education, government = 3-4 months often sufficient

**The Formula:**

Base: 3 months
+ 1 month if single income
+ 1 month if dependents
+ 1 month if self-employed
+ 1 month if specialized career
+ 1 month if homeowner
+ 1 month if health issues
= Your personal target

**Example:**
Single mom, rents apartment, specializes in graphic design, no health issues:
3 base + 1 single income + 1 dependent + 1 specialized = 6 months target`,
        examples: [
          'Married couple, both teachers (stable jobs, dual income): 3-month fund = $10,500. Felt comfortable with this given job stability and two incomes.',
          'Self-employed photographer Jade (variable income, owns home): 9-month fund = $22,500. Takes her that long to find new clients if business slows and house might need repairs.',
          'Tech worker Elena (volatile industry, rents, no kids): 6-month fund = $18,000. Industry layoffs are common, wants buffer to find right next job.',
          'Nurse Carmen (stable job, two kids, homeowner): 6-month fund = $19,800. Single income with dependents and home repair potential = needs bigger cushion.'
        ],
        tips: [
          'More months = more peace of mind but longer to save—balance urgency with security',
          'Start with 3-month goal, re-evaluate when you get there',
          'Life changes (marriage, kids, job change) = recalculate target',
          'Better to have 3 months saved than perfectionist about 6 months and have $0'
        ]
      },
      {
        title: '3. Setting Milestone Goals',
        content: `Looking at "$15,000 emergency fund" is overwhelming. Break it into achievable milestones.

**The Milestone Approach:**

**Milestone 1: $500**
Why: Covers most small emergencies (car repair, urgent care, appliance)
Timeline: 1-2 months for most people
Psychological win: You're no longer at $0. You have SOMETHING.

**Milestone 2: $1,000**
Why: Dave Ramsey's starter emergency fund. Covers most common emergencies.
Timeline: 2-4 months total
Psychological win: Four figures! You can handle most surprises.
Action: Now tackle debt while maintaining this $1,000

**Milestone 3: 1 Month of Expenses**
Why: Could survive a month without income (with cuts)
Timeline: 4-8 months total depending on income
Psychological win: You could make rent/mortgage + essentials for a full month
Example: $2,500 if your essentials are $2,500/month

**Milestone 4: 2 Months of Expenses**
Why: Starting to feel real security. Most job searches take 1-3 months.
Timeline: 8-12 months total
Psychological win: You can be selective about next job, not desperate
Example: $5,000

**Milestone 5: 3 Months of Expenses**
Why: Standard "minimum" emergency fund for many situations
Timeline: 12-18 months total
Psychological win: You're officially financially stable
Example: $7,500

**Milestone 6: 6 Months of Expenses**
Why: Full emergency fund for most people
Timeline: 18-36 months total
Psychological win: Major life achievement. You can weather nearly anything.
Example: $15,000

**Milestone 7: 9-12 Months (If Applicable)**
Why: Extended emergency fund for high-risk situations
Timeline: 3-5 years total
Psychological win: Complete financial security
Example: $22,500-30,000

**Celebrating Milestones:**

Each milestone deserves acknowledgment:
• $500: Small treat, tell someone who'll celebrate with you
• $1,000: Bigger celebration, mark the achievement
• 1 month: Recognize you're in top 50% of Americans
• 3 months: You've achieved what most people never will
• 6 months: Full party—you're financially stable!

**Using Milestones:**

Focus on NEXT milestone only:
"I need to save $15,000" = overwhelming
"I need to save $200 more to hit $1,000" = doable

Check off each milestone. Visual progress maintains motivation.`,
        examples: [
          'Maya broke down her $18,000 goal: $500 (month 2), $1,000 (month 4), $3,000 (month 10), $6,000 (month 18), $12,000 (month 28), $18,000 (month 36). Each milestone felt achievable.',
          'When Carmen hit $1,000 she celebrated with a $20 nice dinner. When she hit $5,000 she bought herself flowers. Small celebrations maintained motivation without derailing progress.',
          'Rachel tracks visually: thermometer drawing showing $0-$16,800 goal. She colors it in as she saves. Seeing it fill up keeps her motivated.',
          'After hitting $1,000 milestone, Nina paused emergency fund building to attack debt. Once debt-free, she resumed saving and quickly built to $8,000 (her 4-month target).'
        ],
        tips: [
          'Write down your milestones and dates when you hit them',
          'Focus on next milestone only—don\'t let the end goal overwhelm you',
          'Celebrate each milestone in a small, affordable way',
          'Visual tracking (chart, thermometer, progress bar) maintains motivation'
        ]
      },
      {
        title: '4. Adjusting Your Target Over Time',
        content: `Your emergency fund target isn't set in stone. Life changes, your target changes.

**When to INCREASE Your Target:**

**Life Gets More Expensive:**
• Rent/mortgage increases
• Add dependents (kids, aging parents)
• Take on car payment
• Health insurance costs rise

**Risk Increases:**
• Become sole breadwinner
• Buy a home (more can break)
• Start business or go self-employed
• Industry becomes less stable
• Health issues develop

**Peace of Mind Shifts:**
• The older you get, the more security often feels important
• After experiencing job loss, you want bigger buffer
• World events make you value stability more

**Reaching Higher Income:**
• As you earn more, expenses tend to increase
• Your 3-month fund needs to grow with your expenses

**When to DECREASE Your Target (Rare but Possible):**

**Risk Decreases:**
• Single becomes dual-income household (married/partner)
• Pay off debt (lower monthly essentials)
• Grown kids become independent (less expenses)
• Move to lower cost of living area
• Get more stable job

**Other Assets Available:**
• Build taxable investment account (can access if needed)
• Pay off house (lower monthly essentials)
• Receive inheritance or windfall

**Recalculation Schedule:**

• Annual review minimum
• Every major life change (marriage, baby, job change, move)
• After using emergency fund (rebuild to same level? Increase?)
• When you hit your original target (enough? Want more?)

**The "Enough" Point:**

You have enough when:
• You can sleep without money anxiety
• You've hit your calculated 3-6 month target
• A surprise $1,000 expense doesn't trigger panic
• You feel ready to focus on other goals (investing, house down payment)

Some people keep building emergency fund to 9-12 months even when 6 would be sufficient. If it brings peace, it's not wrong. But recognize when you're financially secure enough to shift focus.`,
        examples: [
          'When Lisa got married, she and her spouse combined emergency funds. They decreased target from 6 months to 4 months since dual income reduced risk. Shifted excess to house down payment savings.',
          'After having a baby, Rachel increased target from $12,000 (4 months) to $21,000 (6 months). More expenses, more risk as single mom, needed bigger buffer.',
          'Self-employed Carmen had 9-month fund ($24,000). When she took on steady part-time job (guaranteeing minimum income), she felt comfortable reducing to 6-month fund and investing the excess.',
          'Couple hit their 6-month goal ($18,000) and kept saving to 12 months ($36,000). They realized this was driven by anxiety from growing up poor. They redirected new savings to retirement and kept the 12 months for peace of mind.'
        ],
        tips: [
          'Review emergency fund target annually on the same date',
          'Recalculate when major life changes happen',
          'It\'s okay to have more than "necessary" if it brings peace',
          'It\'s also okay to shift focus once you hit your target'
        ]
      },
      {
        title: '5. Special Considerations',
        content: `Some situations require special emergency fund planning:

**For Self-Employed/Business Owners:**

You need TWO emergency funds:
1. Personal emergency fund (6-9 months personal expenses)
2. Business emergency fund (3-6 months business operating costs)

Why both? Business slow season shouldn't drain personal fund.
Keep them separate: Personal savings + Business savings account

**For Single Parents:**

Prioritize SIZE over speed:
• 6-9 months minimum (you're the only income)
• Include childcare costs in essentials
• Budget for kid emergencies (medical, school, activities)
• Consider separate "kid emergency" fund ($500-1,000)

Can't afford childcare to work if you lose job? Need bigger fund.

**For Those With Chronic Health Issues:**

• Add 2-3 months to standard target
• Include max out-of-pocket in calculation
• Separate fund for medical specifically if needed
• Consider disability insurance as complement

**For Caregivers:**

• Include care costs for dependents (kids, parents, disabled family)
• Plan for sudden need to take time off work
• Add 1-2 months to target for care emergencies

**For High Earners:**

• May need $50,000+ fund (6 months of $8,000+ monthly expenses)
• Don't skip this step to invest instead—you need it too
• Consider taxable investment account as "extended" emergency fund

**For Low-Income Workers:**

• Even $300 is life-changing protection
• Focus on $500 milestone first
• Every $25 matters
• Seek employer emergency savings programs
• Use every tax refund for emergency fund

**For Those Living Paycheck to Paycheck:**

• Start with $25-50 if that's all you can do
• Focus on preventing ONE common emergency (car, medical)
• Sell something, side gig for a month, tax refund—get to $500
• This fund can break the paycheck-to-paycheck cycle

**For Couples:**

• Calculate based on BOTH incomes losing simultaneously
• Or calculate based on higher earner's income loss only
• Agree on target together
• Joint fund or separate? Discuss and decide
• Review together annually`,
        examples: [
          'Self-employed Sophia has $18,000 personal emergency fund AND $12,000 business emergency fund. When business was slow, she didn\'t have to raid personal savings.',
          'Single mom Rachel prioritized emergency fund over debt payoff because she has no co-parent backup. Her $21,000 fund provides security her situation demands.',
          'Low-income worker Carmen started with $50. Then $100. Then $300. It took a year to reach $1,000 but that $1,000 changed her life—first time she wasn\'t living in crisis mode.',
          'High-earning couple has $60,000 emergency fund (6 months of $10,000 monthly expenses). Took 3 years to build but now they focus on investing and enjoying life.'
        ],
        tips: [
          'Your situation is unique—adjust standard advice to YOUR reality',
          'More risk/less safety net = bigger emergency fund needed',
          'Don\'t compare your target to others—compare to your own needs',
          'Something is always better than nothing, regardless of situation'
        ]
      }
    ],

    keyTakeaways: [
      'Calculate emergency fund based on essential expenses only (needs, not wants)',
      'Standard target is 3-6 months, but YOUR target depends on income stability, dependents, and risk factors',
      'Break large goal into milestones: $500, $1,000, 1 month, 3 months, 6 months',
      'Celebrate each milestone to maintain motivation over the months/years of building',
      'Recalculate target annually and after major life changes',
      'Single income, dependents, self-employed, or homeowner = need larger fund',
      'You have "enough" when you hit your calculated target and can sleep without money anxiety'
    ],

    actionItems: [
      'List all essential monthly expenses (needs only) and calculate the total',
      'Use the formula to determine if you need 3, 6, or 9-12 months saved',
      'Calculate your specific emergency fund target (essential monthly × number of months)',
      'Break your target into milestones and write down celebration plans for each',
      'Determine which milestone you\'re working toward right now and how much more you need'
    ],

    resources: [
      {
        title: 'Emergency Fund Size Calculator',
        type: 'calculator',
        description: 'Calculate how many months you need based on your specific situation',
        url: 'https://www.bankrate.com/banking/savings/emergency-fund-calculator/'
      },
      {
        title: 'Essential Expenses Worksheet',
        type: 'worksheet',
        description: 'List and calculate your true essential monthly expenses'
      },
      {
        title: 'Emergency Fund Milestone Tracker',
        type: 'worksheet',
        description: 'Visual tracker for your emergency fund milestones and progress'
      },
      {
        title: 'Risk Assessment Quiz',
        type: 'tool',
        description: 'Answer questions to determine your personal emergency fund target',
        url: 'https://www.nerdwallet.com/article/banking/emergency-fund-calculator'
      }
    ]
  }
}
