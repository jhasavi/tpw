import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase env vars missing')
}

const supabase = createClient(supabaseUrl, supabaseKey)

const lessons = [
  {
    slug: 'financial-goal-setting',
    content: {
      introduction:
        'Financial goals give you direction and motivation. Vague wishes ("save more") fail; specific, timed goals with action plans succeed. This lesson walks you through setting SMART goals, prioritizing them, and building systems to hit targets in 3, 12, and 36 months.',
      definitions: [
        { term: 'SMART Goals', definition: 'Specific, Measurable, Achievable, Relevant, Time-bound. A framework for effective goal-setting.' },
        { term: 'Sinking Fund', definition: 'Money set aside monthly for a future known expense (car, vacation, annual fees).' },
        { term: 'Opportunity Cost', definition: 'What you give up to pursue one goal versus another (e.g., saving for a house vs. investing for retirement).' },
        { term: 'Milestone', definition: 'A checkpoint on the way to a larger goal (e.g., $5k saved toward a $20k emergency fund).' }
      ],
      sections: [
        {
          title: 'Why Goals Fail (and How to Fix It)',
          content:
            'Common failures:\n• Too vague ("get better with money").\n• No deadline ("someday").\n• No tracking or accountability.\n• Conflicting priorities (trying to do everything at once).\n\nFixes:\n• Make goals SMART: Specific, Measurable, Achievable, Relevant, Time-bound.\n• Write them down and review weekly.\n• Automate progress (auto-transfers, auto-invest).\n• Prioritize: Focus on 1–3 goals at a time.'
        },
        {
          title: 'SMART Goal Framework',
          content:
            'Specific: What exactly? How much? Why does it matter?\nMeasurable: Track progress with numbers ($, %, milestones).\nAchievable: Realistic given income, expenses, and timeline.\nRelevant: Aligns with your values and life priorities.\nTime-bound: Clear deadline (date or milestone).\n\nExample:\nVague: "Save money."\nSMART: "Save $1,000 emergency fund by June 30 by auto-transferring $167/month on payday."'
        },
        {
          title: 'Short-Term Goals (3–12 Months)',
          content:
            'Examples:\n• Build $500–$1,000 starter emergency fund.\n• Pay off one credit card ($2,000 balance).\n• Save for a car repair sinking fund ($600).\n• Complete a budgeting course or improve tracking routine.\n\nHow to plan:\n1. Pick one goal.\n2. Break it into monthly/weekly targets.\n3. Automate savings or payments.\n4. Track progress weekly; celebrate milestones.'
        },
        {
          title: 'Medium-Term Goals (1–3 Years)',
          content:
            'Examples:\n• Save 3–6 months of expenses in emergency fund.\n• Pay off all credit card debt.\n• Save $10k for a car down payment.\n• Build credit score to 720+.\n• Max out Roth IRA contributions for 2 years.\n\nHow to plan:\n1. Calculate total needed and timeline.\n2. Divide by months to get monthly target.\n3. Set quarterly milestones (e.g., $2,500 saved by Q1 end).\n4. Review progress monthly; adjust if income/expenses change.'
        },
        {
          title: 'Long-Term Goals (3–10+ Years)',
          content:
            'Examples:\n• Save $50k for a home down payment.\n• Build $500k retirement portfolio by age 45.\n• Pay off mortgage early.\n• Fund kids\' college (529 plan).\n• Achieve financial independence.\n\nHow to plan:\n1. Use calculators (compound interest, mortgage payoff, retirement) to estimate needs.\n2. Work backward: what monthly contribution hits the target?\n3. Automate contributions; increase by 1–2% annually or after raises.\n4. Review annually; rebalance investments as needed.'
        },
        {
          title: 'Prioritizing Competing Goals',
          content:
            'Use this hierarchy when cash is limited:\n1. Cover basic needs (food, shelter, utilities, minimum debts).\n2. Build $500–$1,000 starter emergency fund.\n3. Get employer retirement match (free money).\n4. Pay off high-interest debt (>15% APR).\n5. Build 3–6 months emergency fund.\n6. Save for medium-term goals (car, home, kids).\n7. Max retirement accounts (IRA, 401k).\n8. Invest for long-term wealth.\n\nWhen to do multiple goals: Once emergency fund is solid and high-interest debt is gone, split contributions across 2–3 goals (e.g., 60% retirement, 20% house fund, 20% vacation fund).'
        },
        {
          title: 'Tracking and Accountability',
          content:
            'Weekly check-in: Review progress on your #1 goal. Update totals, confirm automations ran, and note any obstacles.\n\nMonthly review: Compare all goals to targets. Celebrate wins (hit a milestone, paid extra $200 to debt). Adjust if needed (income change, unexpected expense).\n\nAccountability: Share goals with a partner, friend, or online community. Schedule check-ins. Visual trackers (charts, thermometer) boost motivation.'
        },
        {
          title: 'Case Study: Layered Goals',
          content:
            'Tanya, 29, set three goals:\n1. Short-term: Save $1,000 emergency fund in 6 months → $167/month.\n2. Medium-term: Pay off $5,000 credit card in 18 months → $278/month.\n3. Long-term: Save $30k house down payment in 5 years → $500/month.\n\nYear 1: She focused on emergency fund + minimum debt. Hit $1k in 5 months. Year 2: Shifted focus to debt avalanche, paying $400/month. Card paid off in 13 months. Year 3–5: Redirected $400 to house fund, reaching $30k ahead of schedule. Layering goals over time let her succeed without burnout.'
        }
      ],
      keyTakeaways: [
        'SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound) are far more likely to succeed.',
        'Short-term (3–12 mo), medium-term (1–3 yr), and long-term (3–10+ yr) goals need different planning.',
        'Prioritize: emergency fund + employer match + high-interest debt first, then layer other goals.',
        'Automate progress and track weekly to maintain momentum.',
        'Celebrate milestones; adjust plans when life changes.'
      ],
      actionItems: [
        { step: 1, action: 'Write 3 SMART goals', description: 'One short-term, one medium-term, one long-term. Use the SMART framework.' },
        { step: 2, action: 'Calculate monthly targets', description: 'Total needed ÷ months to deadline = monthly savings/payment.' },
        { step: 3, action: 'Automate first goal', description: 'Set up auto-transfer or auto-pay for your top-priority goal.' },
        { step: 4, action: 'Set weekly review reminder', description: 'Add 5-minute calendar event to check progress and update totals.' },
        { step: 5, action: 'Share one goal', description: 'Tell a friend, partner, or online group for accountability.' }
      ],
      resources: [
        { title: 'CFPB Goal-Setting Worksheet', type: 'Tool', url: 'https://www.consumerfinance.gov/consumer-tools/educator-tools/your-money-your-goals/', description: 'Free printable goal templates and trackers.' },
        { title: 'Compound Interest Calculator', type: 'Tool', url: 'https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator', description: 'See how savings grow over time.' },
        { title: 'Savings Goal Tracker Template', type: 'Tool', url: 'https://docs.google.com/spreadsheets/u/0/templates', description: 'Visual tracker for multiple savings goals.' },
        { title: 'Fidelity Retirement Calculator', type: 'Tool', url: 'https://www.fidelity.com/calculators-tools/planning-guidance-center', description: 'Estimate retirement needs and monthly contributions.' }
      ],
      quiz: {
        questions: [
          { q: 'What does SMART stand for?', a: 'Specific, Measurable, Achievable, Relevant, Time-bound.' },
          { q: 'What is a sinking fund?', a: 'Money set aside monthly for a future known expense.' },
          { q: 'What is the first financial priority after covering basic needs?', a: 'Build a $500–$1,000 starter emergency fund.' },
          { q: 'How often should you review goal progress?', a: 'Weekly for top goal; monthly for all goals.' },
          { q: 'When can you focus on multiple goals at once?', a: 'After emergency fund is solid and high-interest debt is gone.' }
        ]
      }
    }
  },
  {
    slug: 'emergency-fund-essentials',
    content: {
      introduction:
        'An emergency fund is cash reserved for unexpected expenses: job loss, medical bills, car/home repairs. It prevents you from going into debt when life happens. This lesson explains how much to save, where to keep it, and how to build it even on a tight budget.',
      definitions: [
        { term: 'Emergency Fund', definition: 'Liquid cash (easily accessible) set aside for unexpected, urgent expenses.' },
        { term: 'Liquidity', definition: 'How quickly you can access money without penalties or loss of value. Cash is highly liquid; real estate is not.' },
        { term: 'Fixed Expenses', definition: 'Monthly costs that stay the same (rent, insurance, loan minimums). Used to calculate emergency fund target.' },
        { term: 'HYSA (High-Yield Savings Account)', definition: 'A savings account with higher interest rates (4–5%+) and FDIC insurance. Ideal for emergency funds.' }
      ],
      sections: [
        {
          title: 'Why You Need an Emergency Fund',
          content:
            '40% of Americans can\'t cover a $400 emergency without borrowing. Without an emergency fund, unexpected costs force you into high-interest debt, delay goals, or cause financial panic.\n\nEmergency funds provide:\n• Peace of mind and reduced financial stress.\n• Protection from high-interest debt (credit cards, payday loans).\n• Flexibility during job loss or income drops.\n• A buffer to keep long-term investments untouched.'
        },
        {
          title: 'How Much to Save: The Tiers',
          content:
            'Starter Fund ($500–$1,000): Covers small emergencies (minor car repair, vet bill, broken appliance). Build this first before paying extra on debt or investing.\n\nFull Fund (3–6 Months Expenses): Covers essential expenses (rent, utilities, groceries, insurance, minimums) for 3–6 months. Use 3 months if income is stable and you have dual incomes; 6 months if income is variable, single income, or job security is uncertain.\n\nExtended Fund (6–12 Months): For self-employed, commission-based workers, or those in volatile industries. Provides longer runway during income disruptions.'
        },
        {
          title: 'Calculating Your Target',
          content:
            'List essential monthly expenses:\n• Housing (rent/mortgage).\n• Utilities (electric, water, gas, internet).\n• Groceries.\n• Transportation (gas, transit, car payment).\n• Insurance (health, auto, renters/home).\n• Minimum debt payments.\n• Basic personal care.\n\nDo NOT include: dining out, subscriptions, hobbies, vacations.\n\nExample: Essential monthly expenses = $2,500. Target fund:\n• Starter: $1,000.\n• 3-month: $7,500.\n• 6-month: $15,000.'
        },
        {
          title: 'Where to Keep Your Emergency Fund',
          content:
            'Requirements: Liquid (accessible in 1–3 days), safe (FDIC-insured), and earning some interest.\n\nBest options:\n• High-yield savings account (HYSA): 4–5%+ APY, FDIC-insured, no fees. Examples: Ally, Marcus, Discover, CIT Bank.\n• Money market account: Similar to HYSA; may have check-writing.\n\nAvoid:\n• Checking account (too easy to spend; low/no interest).\n• Stocks/bonds (volatile; can drop when you need cash).\n• CDs (penalties for early withdrawal).\n• Cash at home (no interest, theft/fire risk).'
        },
        {
          title: 'Building Your Fund on a Tight Budget',
          content:
            'Start small: $25–$50/month adds up. Hit $500, then $1,000, then work toward 3 months.\n\nAutomate: Set up auto-transfer on payday—even $10/week = $520/year.\n\nWindfalls: Direct tax refunds, bonuses, gifts, or side income to the fund.\n\nCut one expense: Cancel one subscription, skip one takeout meal/week, or reduce a discretionary category. Redirect savings to emergency fund.\n\nChallenge yourself: Try a no-spend week or month; save everything you didn\'t spend.'
        },
        {
          title: 'When to Use (and Not Use) Your Emergency Fund',
          content:
            'Use for:\n• Job loss or income reduction.\n• Urgent medical/dental bills not covered by insurance.\n• Essential car or home repairs (broken furnace, transmission).\n• Emergency travel (family illness, funeral).\n\nDo NOT use for:\n• Planned expenses (vacations, gifts, annual fees—use sinking funds).\n• Wants (new phone, dining out, shopping).\n• Investing opportunities.\n• Paying off low-interest debt ahead of schedule.\n\nIf you use it: Replenish immediately. Pause other goals until fund is restored.'
        },
        {
          title: 'Case Study: Job Loss Buffer',
          content:
            'Carlos had a 6-month emergency fund ($18k) when he was laid off. He immediately cut discretionary spending to essentials only, filed for unemployment ($1,200/month), and used his fund to cover the gap. He found a new job in 4 months and had used $8k of his fund. He paused retirement contributions and redirected $400/month to rebuild the fund, restoring it in 20 months. Without the fund, he would have taken on $8k+ in credit card debt at 22% APR.'
        }
      ],
      keyTakeaways: [
        'Build a $500–$1,000 starter fund first, then aim for 3–6 months of essential expenses.',
        'Keep emergency funds in a high-yield savings account—liquid, safe, and earning interest.',
        'Automate contributions, even if small; consistency beats intensity.',
        'Use only for true emergencies; replenish immediately if used.',
        'An emergency fund prevents debt spirals and protects long-term goals.'
      ],
      actionItems: [
        { step: 1, action: 'Calculate essential monthly expenses', description: 'List housing, utilities, groceries, transport, insurance, minimums.' },
        { step: 2, action: 'Set starter fund target', description: 'Aim for $500–$1,000 first.' },
        { step: 3, action: 'Open a high-yield savings account', description: 'Compare rates at Ally, Marcus, Discover; open and link to checking.' },
        { step: 4, action: 'Automate contributions', description: 'Set up auto-transfer on payday; start with $25–$50/month.' },
        { step: 5, action: 'Track progress weekly', description: 'Update balance; celebrate milestones ($500, $1k, $2.5k, etc.).' }
      ],
      resources: [
        { title: 'Bankrate HYSA Comparison', type: 'Tool', url: 'https://www.bankrate.com/banking/savings/rates/', description: 'Compare high-yield savings account rates and terms.' },
        { title: 'CFPB Emergency Savings Guide', type: 'Guide', url: 'https://www.consumerfinance.gov/consumer-tools/educator-tools/your-money-your-goals/emergency-funds/', description: 'Worksheets and tips for building emergency savings.' },
        { title: 'NerdWallet Emergency Fund Calculator', type: 'Tool', url: 'https://www.nerdwallet.com/article/banking/emergency-fund-calculator', description: 'Estimate target based on expenses and income stability.' },
        { title: 'Ally Bank', type: 'Product', url: 'https://www.ally.com/', description: 'Popular high-yield savings with no fees and competitive rates.' }
      ],
      quiz: {
        questions: [
          { q: 'How much should a starter emergency fund be?', a: '$500–$1,000.' },
          { q: 'How many months of expenses should a full emergency fund cover?', a: '3–6 months of essential expenses.' },
          { q: 'Where should you keep an emergency fund?', a: 'High-yield savings account (HYSA).' },
          { q: 'Name two appropriate uses of an emergency fund.', a: 'Job loss, urgent medical bills, essential car/home repairs.' },
          { q: 'What should you do after using your emergency fund?', a: 'Replenish it immediately; pause other goals if needed.' }
        ]
      }
    }
  }
]

async function run() {
  console.log('🚀 Upgrading batch 4 of lessons...\n')

  for (const lesson of lessons) {
    const { data, error } = await supabase
      .from('lessons')
      .update({ content: lesson.content })
      .eq('slug', lesson.slug)
      .select('id, title')
      .limit(1)

    if (error) {
      console.error(`❌ ${lesson.slug}:`, error.message)
      continue
    }

    if (!data || data.length === 0) {
      console.warn(`⚠️  ${lesson.slug}: No rows updated`)
      continue
    }

    console.log(`✅ Updated: ${data[0].title}`)
  }

  console.log('\n🎉 Batch 4 complete')
}

run().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
