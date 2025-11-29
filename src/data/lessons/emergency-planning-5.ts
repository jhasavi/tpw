import { Lesson } from '@/types/curriculum'

export const whenToUseEmergencyFund: Lesson = {
  id: 'when-to-use-emergency-fund',
  courseId: 'emergency-planning',
  slug: 'when-to-use-emergency-fund',
  title: 'When to Use It & When Not To',
  description: 'Learn to distinguish true emergencies from wants, and rebuild strategically after using your fund.',
  durationMinutes: 45,
  displayOrder: 5,
  objectives: [
    'Apply clear criteria to determine what qualifies as an emergency',
    'Resist temptation to use emergency fund for non-emergencies',
    'Make smart decisions when facing gray-area situations',
    'Rebuild emergency fund quickly after legitimate use',
    'Develop separate savings for predictable irregular expenses'
  ],
  keyConcepts: [
    'Emergency Criteria',
    'Sinking Funds',
    'Rebuild Strategy',
    'Opportunity Cost',
    'Financial Discipline'
  ],
  content: {
    introduction: `You spent months building your emergency fund. You hit $3,000. You feel secure. Then... your friend's destination wedding invitation arrives. $1,500 trip. Should you use the emergency fund?

NO. But it's tempting, isn't it?

This is where emergency funds die. Not from actual emergencies, but from "I really want this" or "This feels important" or "I'll rebuild it later."

The hardest part of having an emergency fund isn't building it—it's NOT using it for non-emergencies.

This lesson gives you a clear framework to decide when to use your fund and when to find another way. Plus, how to rebuild quickly when you do use it legitimately.`,

    sections: [
      {
        title: '1. The Emergency Fund Test',
        content: `Use this three-question test to determine if something qualifies:

**Question 1: Is it unexpected?**

True emergency: You didn't know this was coming
NOT an emergency: You knew about it or should have planned for it

Examples:
✅ Unexpected: Water heater breaks, car accident, job loss, medical emergency
❌ Expected: Christmas, car registration, school supplies, annual insurance premium

**Question 2: Is it necessary?**

True emergency: You MUST deal with this or face serious consequences
NOT an emergency: You WANT this or it would be nice to have

Examples:
✅ Necessary: Car repair to get to work, urgent medical care, home repair preventing damage
❌ Want: New phone when current one works, vacation, concert tickets, new clothes

**Question 3: Is it urgent?**

True emergency: Must be handled NOW or within days
NOT an emergency: Can wait weeks or months

Examples:
✅ Urgent: Broken tooth causing pain, car won't start and you need it tomorrow, furnace out in winter
❌ Can wait: Cosmetic home improvement, car repair that's not critical, dental work that's important but not urgent

**The Rule: All Three Must Be YES**

If even ONE question is "no," it's not an emergency. Find another way to pay for it.

**Real Emergencies (Use the Fund):**
• Unexpected job loss
• Medical emergency requiring immediate care
• Car repair needed to get to work
• Home emergency (burst pipe, broken furnace, roof leak)
• Death in family requiring emergency travel
• Urgent vet care for pet
• Essential appliance breaks (refrigerator, washing machine if no laundromat nearby)
• Unexpected necessary expense to keep job (computer dies, professional licensing)

**NOT Emergencies (Find Another Way):**
• Sale on something you want
• Friend's wedding you want to attend
• Christmas, birthdays, holidays (annual and predictable)
• Car needs new tires (unless current ones are unsafe—plan ahead next time)
• Want to redecorate
• Great deal on vacation
• Phone upgrade when current phone works
• Back-to-school shopping
• Forgot to budget for something

**Gray Area (Judgment Call):**
• Car repair needed eventually but not immediately → Pay from budget over 2 months
• Important dental work not causing pain → Payment plan with dentist
• Job interview in another city → Can you borrow money or drive instead of fly?
• Pet care that's important but not life-threatening → CareCredit or payment plan

For gray area: Ask "Would I go into debt for this if I didn't have emergency fund?" If no, find another solution.`,
        examples: [
          'Carmen\'s car needed $800 in repairs to pass inspection required for her commute. Unexpected, necessary, urgent. She used emergency fund. Clear emergency.',
          'Lisa\'s best friend was having destination wedding ($1,500 cost). Expected (6 months notice), want (not need), not urgent. She saved separately for 6 months instead of using fund. NOT an emergency.',
          'Nina\'s laptop died and she works from home. Unexpected, necessary for income, urgent. Used $600 from fund. Then bought extended warranty for replacement. Clear emergency.',
          'Rachel wanted to buy Christmas gifts but hadn\'t saved. Expected (annual), want (love but not need), not urgent (could do smaller gifts). She cut back on gifts and planned better for next year. NOT an emergency.'
        ],
        tips: [
          'When in doubt, ask all three questions—be honest with yourself',
          'If you have to justify it extensively, it\'s probably not an emergency',
          'Discomfort or inconvenience doesn\'t equal emergency',
          'Your future emergency-needing self will thank you for saving the fund for real emergencies'
        ]
      },
      {
        title: '2. Common Non-Emergencies People Confuse',
        content: `Let's be specific about situations that FEEL like emergencies but aren't:

**"My phone broke"**
Emergency IF: You need it for work and can't function without it
NOT emergency IF: It's cracked but works, or you want upgrade, or you have alternatives

Solution: Buy used/refurbished phone for $100-300 instead of $1,000 new

**"I need new clothes for work"**
Emergency IF: You literally have nothing appropriate and start job Monday
NOT emergency IF: You have clothes but want new ones, or you have a few weeks

Solution: Buy 2-3 items from thrift/discount stores now, budget for more later

**"My car needs new tires"**
Emergency IF: Current tires are bald and unsafe, and you can't get to work without car
NOT emergency IF: Tires are worn but have a month+ left

Solution: Save $50/week for 10 weeks and get tires, or buy one at a time over 4 months

**"Friend's bachelor/bachelorette party"**
Emergency: NEVER (you have advance notice, it's a want not need)

Solution: Skip it, do a cheaper alternative celebration, save up specifically for it

**"Amazing sale I can't miss"**
Emergency: NEVER

Solution: If it's truly amazing and you have cash in budget, buy it. Otherwise skip it.

**"I forgot to budget for [predictable expense]"**
Emergency: No, it's poor planning

Solution: Use budget, cut elsewhere this month, or delay expense if possible. Learn for next month.

**"My kid wants [thing]"**
Emergency IF: It's essential for health, safety, or required for school
NOT emergency: They want it, peers have it, or it would be nice

Solution: Teach kid about saving, have them wait, or cut your own discretionary to buy it

**"Home improvement/decoration"**
Emergency IF: It's broken and causing damage or danger
NOT emergency: It's ugly, outdated, or you just want change

Solution: Save separately for renovations, do DIY, or live with it until you can afford it

**"Investment opportunity"**
Emergency: NEVER

Solution: Emergency fund is not investment capital. Save separately for investments.

**"Pay off debt faster"**
Emergency: No (build emergency fund first, THEN attack debt)

Exception: After you have starter fund ($500-1,000), then tackle debt, then build full fund

**The Self-Honesty Check:**

Ask yourself:
• Am I trying to justify this because I WANT to use this money?
• If I didn't have this fund, would I go into debt for this? (If no = not emergency)
• Will my friend/boss/kids actually suffer serious consequences if I don't do this? (Usually no)
• Can I find ANY other way to handle this?

Be brutally honest.`,
        examples: [
          'Sophia\'s 5-year-old phone was slow. She wanted to use her $1,000 emergency fund for new iPhone. She asked the three questions: Expected (phone was old), want (current one works), not urgent (could wait). She kept current phone 8 more months and saved separately for upgrade.',
          'Elena\'s daughter wanted to join travel soccer team ($800). Not unexpected (annual thing), not necessary (want), not urgent (months away). Elena cut her own spending and saved $100/month for 8 months instead of raiding emergency fund.',
          'Carmen got invited to destination wedding. She was tempted to use emergency fund for $1,200 trip. But she had 6 months notice (not unexpected), it was a want, and not urgent. She politely declined and sent a gift instead.',
          'Nina\'s air conditioning broke in summer. Unexpected, necessary (health risk in heat), urgent. She used $2,500 from emergency fund without guilt. This is exactly what it\'s for.'
        ],
        tips: [
          'If you have advance notice, it\'s not unexpected—plan for it',
          'Wants are valid, but save separately for them',
          'Poor planning on your part doesn\'t make something an emergency',
          'Teaching yourself (and kids) to wait and save builds character and wealth'
        ]
      },
      {
        title: '3. Creating Sinking Funds for Predictable Expenses',
        content: `The solution to "not emergencies" is sinking funds—mini-savings for specific known expenses.

**What is a Sinking Fund?**

A sinking fund is money you save monthly for predictable irregular expenses—things you know are coming but don't happen every month.

**Common Sinking Fund Categories:**

**Annual/Irregular Bills:**
• Car registration ($150/year = $12.50/month)
• Annual insurance premiums
• Amazon Prime ($139/year = $11.60/month)
• Holiday gifts ($600/year = $50/month)
• Property taxes if not in mortgage

**Eventual Needs:**
• Car repairs and maintenance ($1,200/year = $100/month)
• Home repairs ($1,000/year = $83/month)
• Medical copays and deductibles ($600/year = $50/month)
• Vet bills ($300/year = $25/month)

**Planned Expenses:**
• Vacations ($2,400/year = $200/month)
• Holiday shopping ($600/year = $50/month)
• Birthday gifts throughout year
• Back-to-school shopping ($300 = $25/month)

**How to Set Up Sinking Funds:**

**Option 1: Multiple Savings Accounts**
• Open separate savings account for each category
• Some banks allow unlimited savings accounts (Ally, Capital One)
• Name each clearly: "Car Repairs," "Christmas," "Vacation"

**Option 2: One Savings Account with Spreadsheet Tracking**
• One savings account holds all sinking funds
• Spreadsheet tracks how much is allocated to each category
• Example: $1,000 total, but $200 is for car, $300 is for Christmas, etc.

**Option 3: Cash Envelopes**
• Physical envelopes for each category
• Cash goes in each month
• When category is needed, money is there

**Option 4: Budgeting App Categories**
• YNAB, EveryDollar, or similar let you create goal categories
• App tracks sinking fund progress virtually

**Monthly Sinking Fund Budget Example:**

Car repairs: $100/month
Gifts (holiday + birthdays): $75/month
Vacation: $150/month
Home repairs: $50/month
Medical: $50/month
Annual subscriptions: $25/month
**Total sinking funds: $450/month**

This seems like a lot, but these expenses are happening anyway. You're just planning for them instead of being surprised.

**The Emergency Fund Protection:**

Sinking funds PROTECT your emergency fund by covering things that aren't actually emergencies.

Without sinking funds:
Christmas comes → No money saved → Use emergency fund → Emergency fund depleted → Real emergency hits → Go into debt

With sinking funds:
Christmas comes → Use Christmas sinking fund → Emergency fund untouched → Real emergency hits → Emergency fund available

Sinking funds = fewer "emergencies"`,
        examples: [
          'Lisa set up sinking funds: $100/month car repairs, $50/month gifts, $200/month vacation. When car needed $600 repair, she had $600 saved in car fund. Emergency fund never touched.',
          'Carmen uses one savings account with Excel tracking. She has $2,400 total saved, allocated: $800 car, $600 Christmas, $500 vacation, $500 medical. She knows exactly what each dollar is for.',
          'Nina uses YNAB categories. She "saves" for car registration, gifts, and vacation within the app. When expenses come, money is already set aside—no emergency fund raid needed.',
          'Rachel couldn\'t afford $450/month in sinking funds yet. She started with just $100/month: $50 for car, $50 for gifts. As budget loosened, she added more categories. Progress over perfection.'
        ],
        tips: [
          'Start with 2-3 sinking fund categories, add more as you can',
          'Track last year\'s spending to estimate how much you need per category',
          'Sinking funds prevent the majority of "emergencies"',
          'When you use a sinking fund, rebuild it immediately'
        ]
      },
      {
        title: '4. How to Rebuild After Using Emergency Fund',
        content: `You used your emergency fund for a real emergency. Good! That's what it's for. Now rebuild it ASAP.

**Why Rebuild Immediately:**

• You're vulnerable until it's refilled
• Another emergency could hit
• Harder to rebuild the longer you wait
• "Later" often becomes "never"

**The Rebuild Strategy:**

**Step 1: Assess the Damage**

How much did you use?
• $200? Back to baseline in a month
• $2,000? Needs focused plan
• $10,000? Significant rebuild required

**Step 2: Pause Other Goals Temporarily**

While rebuilding emergency fund:
• Pause extra debt payments (just pay minimums)
• Pause investing beyond employer match
• Pause savings for other goals
• Pause lifestyle upgrades

Emergency fund protection comes first.

**Step 3: Create Rebuild Timeline**

Example: Used $3,000, need to rebuild

Option A: Intense rebuild (3 months)
• Cut expenses aggressively: $500/month
• Side hustle income: $500/month
• Total: $1,000/month rebuild = Done in 3 months

Option B: Moderate rebuild (6 months)
• Cut expenses moderately: $250/month
• Side hustle or sell items: $250/month
• Total: $500/month rebuild = Done in 6 months

Option C: Slow rebuild (12 months)
• Just tighten budget: $250/month
• Total: $250/month rebuild = Done in 12 months

**Step 4: Track Rebuild Progress**

Visual tracker showing:
• Amount used
• Amount rebuilt
• Amount remaining
• Target completion date

Seeing progress maintains motivation.

**Step 5: Resume Other Goals Once Refilled**

When emergency fund is back to full amount:
• Resume extra debt payments
• Resume investing increases
• Resume other savings goals
• Small celebration for rebuild completion

**Special Circumstances:**

**If Another Emergency Hits During Rebuild:**
Handle it, then restart rebuild. Life happens.

**If Rebuild Takes Too Long:**
Reevaluate budget, increase income, or adjust target temporarily.

**If You Used It for Non-Emergency:**
Rebuild it AND figure out why you broke discipline. Set up systems to prevent repeat.

**Rebuild Acceleration Tactics:**

**Tactic 1: Temporary Spending Freeze**
No discretionary spending for 30-60 days, all extra to fund

**Tactic 2: Sell Stuff**
Aggressive decluttering to generate rebuild cash fast

**Tactic 3: Extra Income Push**
Overtime, side gigs, freelance specifically to rebuild

**Tactic 4: Redirect Windfalls**
Tax refund, bonuses, gifts—100% to rebuild

**Tactic 5: Delay Bills (Carefully)**
Some bills can be paid late without penalty—use that float to rebuild faster (only if you're disciplined)

**The Psychology:**

Rebuilding feels tedious. You already built it once!

Reminder: Using emergency fund for emergency is SUCCESS, not failure. The system worked. Now rebuild so it works again next time.`,
        examples: [
          'After $2,500 car repair, Maya paused her $300/month debt overpayment and redirected it to rebuild fund. Added $200 from cutting spending. Rebuilt in 5 months.',
          'Carmen used $4,000 for medical emergency. She did 60-day spending freeze (no eating out, entertainment, shopping) and side hustled $500/month. Rebuilt $4,000 in 6 months.',
          'Nina used $800 from fund for vet emergency. She sold old furniture and unused items for $400, cut budget by $100/month. Rebuilt in 4 months.',
          'After using $6,000 for three months of unemployment, Lisa got new job. Her first priority: rebuild fund. She lived super lean for 9 months and fully refilled it. Then tackled other goals.'
        ],
        tips: [
          'Pause all other financial goals while rebuilding—fund comes first',
          'The faster you rebuild, the less time you\'re vulnerable',
          'Don\'t feel guilty for using fund for real emergency—that\'s success!',
          'Track rebuild progress visually for motivation'
        ]
      },
      {
        title: '5. Long-Term Emergency Fund Management',
        content: `Your emergency fund isn't "set it and forget it." It needs ongoing management.

**Annual Review (Every 12 Months):**

**Review Target Amount:**
• Have expenses increased? Adjust target up.
• Have expenses decreased? Adjust target down (or keep larger buffer).
• Life changes (marriage, kids, job change)? Recalculate.

**Review Account:**
• Are you getting competitive interest rate?
• Is there a better high-yield savings account now?
• Is money still FDIC insured?

**Review Usage:**
• Did you use it this year? For what?
• Were those true emergencies or should you create sinking funds?
• Do you need to adjust other budgets to prevent false emergencies?

**Adjust Strategy:**
• If you never use it: Great! Keep building.
• If you use it frequently: Either creating sinking funds or need larger fund.
• If you dipped for non-emergencies: Strengthen discipline, separate accounts more.

**Life Changes That Require Adjustment:**

**Increase Fund:**
• Got married/partnered (more people, more expenses)
• Had a baby (more expenses, more can go wrong)
• Bought a home (more can break)
• Started business (income less stable)
• Took on caregiving (parents, family members)

**Could Decrease Fund (Rare):**
• Became dual-income (less risk)
• Paid off all debt (lower monthly essentials)
• Downsized significantly (lower monthly expenses)
• Built significant investment buffer

**Reaching "Fully Funded" Status:**

When emergency fund is complete:
• 3-6 months of expenses saved
• In high-yield savings account
• Earning interest
• Untouched except for real emergencies

What next?

**Continue maintaining it:**
• Keep it at current level
• Let interest build it slowly
• Review annually

**Shift savings focus:**
• Attack debt aggressively
• Max out retirement contributions
• Save for house down payment
• Build taxable investment account
• Save for kids' college
• Work toward other goals

**Consider extended fund:**
• Build to 9-12 months if higher risk situation
• Add to fund as income increases

**The "Enough" Question:**

How do you know when you have enough?

You have enough when:
• You've hit your calculated 3-6 month target
• A surprise $1,000 expense doesn't create panic
• You can sleep without money anxiety
• You feel confident handling normal life surprises
• You're ready to focus on other financial goals

Some people keep building to 12+ months. If it brings peace, that's fine. But recognize when you're financially secure enough to shift focus.

**Emergency Fund Forever:**

Your emergency fund never "graduates" to something else.
It's permanent financial infrastructure.

You'll maintain it for life:
• Adjust the amount as life changes
• Maybe move banks for better rates
• Use it when real emergencies hit
• Rebuild it after use
• Keep protecting yourself

It's the foundation everything else is built on.`,
        examples: [
          'Every January 1st, Lisa reviews her emergency fund. She recalculates expenses, checks her interest rate against competitors, and adjusts target if needed. Takes 30 minutes.',
          'After Carmen had baby, she increased target from $9,000 (3 months) to $18,000 (6 months). Took 18 months to rebuild to new level, but now she feels secure as single parent.',
          'When Nina hit her $15,000 goal (6 months), she shifted to aggressive debt payoff. Two years later, debt-free, she keeps the $15,000 fund and focuses on investing.',
          'Couple Rachel and David review annually. Expenses increased $200/month, so they added $1,200 to target. They saved $100/month for 12 months to reach new target.'
        ],
        tips: [
          'Set annual calendar reminder to review emergency fund',
          'Recalculate target after major life changes',
          'Once fully funded, shift saving energy to other goals',
          'Emergency fund is permanent—you\'ll maintain it for life'
        ]
      }
    ],

    keyTakeaways: [
      'Use three-question test: Is it unexpected, necessary, AND urgent? All three must be yes.',
      'Most "emergencies" are actually predictable expenses you should save for separately (sinking funds)',
      'Create sinking funds for known irregular expenses to protect emergency fund',
      'After using emergency fund for real emergency, rebuild immediately before pursuing other goals',
      'Review and adjust emergency fund target annually and after major life changes',
      'Being strict about what qualifies protects your fund for actual emergencies',
      'A fully-funded emergency fund is permanent financial infrastructure, not a temporary goal'
    ],

    actionItems: [
      'Write down your three-question test and post it where you can see it',
      'Review last year\'s "emergencies" and identify which should have been sinking funds',
      'Create at least two sinking funds for predictable irregular expenses',
      'If you\'ve used emergency fund recently, create a rebuild timeline starting this week',
      'Set a calendar reminder for annual emergency fund review'
    ],

    resources: [
      {
        title: 'Emergency vs. Non-Emergency Decision Tree',
        type: 'worksheet',
        description: 'Flowchart to help you decide if expense qualifies for emergency fund use'
      },
      {
        title: 'Sinking Fund Setup Template',
        type: 'worksheet',
        description: 'Calculate and track sinking funds for predictable irregular expenses'
      },
      {
        title: 'Emergency Fund Rebuild Calculator',
        type: 'calculator',
        description: 'Calculate how long it will take to rebuild based on monthly savings',
        url: 'https://www.bankrate.com/banking/savings/savings-goal-calculator/'
      },
      {
        title: 'Annual Emergency Fund Review Checklist',
        type: 'worksheet',
        description: 'Comprehensive checklist for annual emergency fund evaluation'
      }
    ]
  }
}
