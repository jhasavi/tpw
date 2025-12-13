import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase env vars missing')
}

const supabase = createClient(supabaseUrl, supabaseKey)

const content = {
  introduction:
    'A budget is a plan for how you will use your money to meet needs, reduce stress, and fund goals. In this lesson, you will build a complete monthly budget using your real numbers, learn methods to keep it updated in 20 minutes per week, and set up automation so progress continues even on busy days.',
  definitions: [
    { term: 'Net Income', definition: 'Your take-home pay after taxes, benefits, and deductions. Use this number for budgeting.' },
    { term: 'Fixed Costs', definition: 'Expenses that are the same each month (rent/mortgage, insurance, minimum debt, phone/internet).'},
    { term: 'Variable Costs', definition: 'Expenses that change month-to-month (groceries, dining, transport, kids, personal care).'},
    { term: 'Sinking Fund', definition: 'Money set aside monthly for a future known expense (car maintenance, annual fees, holidays).'},
    { term: 'Emergency Fund', definition: 'Cash reserved for unexpected events (job loss, medical bills, urgent repairs).'}
  ],
  sections: [
    {
      title: 'Step 1: Gather Your Numbers',
      content:
        'Collect your last 2–3 months of pay stubs (or deposits), bank/credit statements, and bills. If income is irregular, average the last 3 months and use the lower month for safety. Write down net income totals, fixed bills, debt minimums, and typical variable spends.'
    },
    {
      title: 'Step 2: Choose a Method',
      content:
        'Pick one approach you can maintain:\n• 50/30/20: 50% needs, 30% wants, 20% goals (savings/debt).\n• Zero-based: assign every dollar to a category until $0 remains.\n• Pay-yourself-first: automate goals on payday; spend what remains.\nIf cash is tight or income fluctuates, use zero-based with a small weekly buffer.'
    },
    {
      title: 'Step 3: Build Your Categories',
      content:
        'List fixed costs (rent/mortgage, utilities/phone, insurance, minimum debts). List variable costs (groceries, transport, dining/coffee, kids, personal, fun). Add sinking funds (car service, gifts, vacations, annual fees). Add goals (emergency fund, extra debt, long-term investing).'
    },
    {
      title: 'Step 4: Create Your First Budget (Example)',
      content:
        'Example: Net income $3,200.\nNeeds (55%): $1,760 → rent 1,050; utilities/phone 180; insurance 220; transit 150; min debt 160.\nWants (20%): $640 → groceries 320; dining/coffee 150; personal 60; fun 110.\nGoals (25%): $800 → emergency fund 250; extra debt 240; sinking funds 150; investing 160.\nAdjust if needed: If income drops to $2,800, cut wants to $400 and keep at least $560 for goals; progress over perfection.'
    },
    {
      title: 'Step 5: Automate and Track',
      content:
        'On payday, auto-transfer goal amounts first. Enable autopay for fixed bills and minimum debts. Use a simple tracker (sheet/app) to log weekly spending in the two riskiest categories (usually groceries and dining).'
    },
    {
      title: 'Step 6: Weekly 20-Minute Routine',
      content:
        'Every week: (1) Check balances (5 min). (2) Log last week\'s spending (5). (3) Move goal money or confirm automations (5). (4) Plan one risky category (5). If you miss a week, catch up next week—don\'t quit.'
    },
    {
      title: 'Step 7: Adjust and Improve',
      content:
        'Each month, review categories and tweak: reduce a want, increase goals by $25–$50, or add a sinking fund for expenses that surprised you. If you overspent, note why and plan a guardrail (e.g., grocery list + cash envelope).'
    }
  ],
  caseStudies: [
    {
      title: 'Irregular Income: Freelance Designer',
      scenario:
        'Income varies $2,600–$3,600. She averages $3,000 and budgets to $2,600 for safety, keeping a $400 buffer. She uses zero-based budgeting, automates $300 to emergency fund and $200 to IRA when months are above $3,000.'
    },
    {
      title: 'High Debt: Single Parent',
      scenario:
        'Net income $3,400; credit card balances at 22% APR. She keeps needs under $1,800, cuts wants to $500, and sends $800 to goals: $300 emergency fund, $300 avalanche to highest APR card, $200 sinking funds to prevent new debt.'
    }
  ],
  worksheets: [
    { title: 'Monthly Budget Template', type: 'Sheet', url: 'https://docs.google.com/spreadsheets/u/0/templates', description: 'Copy a simple 50/30/20 and zero-based budget sheet.' },
    { title: 'Sinking Funds Planner', type: 'Sheet', url: 'https://docs.google.com/spreadsheets/u/0/templates', description: 'Plan future expenses and monthly contributions.' },
    { title: 'Weekly Routine Checklist', type: 'Checklist', url: 'https://docs.google.com/document/u/0/', description: '20-minute routine checklist with space for notes.' }
  ],
  keyTakeaways: [
    'Budget using net income and conservative averages for variable pay.',
    'Pick the simplest method you will maintain and automate goals on payday.',
    'Separate fixed vs variable and add sinking funds to avoid new debt.',
    'Use a weekly 20-minute routine to keep the plan alive.',
    'Iterate monthly; small improvements compound over time.'
  ],
  actionItems: [
    { step: 1, action: 'Collect statements and pay stubs', description: 'Gather the last 2–3 months of income and bills.' },
    { step: 2, action: 'Choose your method', description: '50/30/20, zero-based, or pay-yourself-first.' },
    { step: 3, action: 'List categories and amounts', description: 'Fill in fixed, variable, sinking funds, and goals.' },
    { step: 4, action: 'Automate goal transfers', description: 'Set automatic savings/debt payments on payday.' },
    { step: 5, action: 'Schedule weekly check-in', description: 'Add a recurring 20-minute event; print checklist.' }
  ],
  resources: [
    { title: 'CFPB Budgeting Tools', type: 'Guide', url: 'https://www.consumerfinance.gov/consumer-tools/budgeting/', description: 'Trusted worksheets and budgeting guidance.' },
    { title: 'YNAB', type: 'App', url: 'https://www.ynab.com/', description: 'Zero-based budgeting app for irregular income.' },
    { title: 'Vanguard Investing Basics', type: 'Guide', url: 'https://investor.vanguard.com/investor-resources-education', description: 'Learn how investing supports long-term goals.' },
    { title: 'Savvy Ladies Helpline', type: 'Support', url: 'https://www.savvyladies.org/free-financial-helpline/', description: 'Free volunteer advisors for budgeting questions.' }
  ],
  quiz: {
    questions: [
      { q: 'Should you budget using gross or net income?', a: 'Net income.' },
      { q: 'Name two fixed and two variable costs.', a: 'Fixed: rent, insurance. Variable: groceries, dining.' },
      { q: 'What\'s a sinking fund used for?', a: 'To spread out future known expenses and avoid new debt.' },
      { q: 'How long is the weekly routine?', a: 'About 20 minutes.' },
      { q: 'What\'s one way to handle irregular income?', a: 'Average the last 3 months and budget to the lower month.' }
    ]
  }
}

async function run() {
  console.log('🚀 Upgrading lesson: creating-first-budget')
  const { data, error } = await supabase
    .from('lessons')
    .update({ content })
    .eq('slug', 'creating-first-budget')
    .select('id, title')
    .limit(1)

  if (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }

  if (!data || data.length === 0) {
    console.warn('⚠️  No lesson updated; check slug.')
    return
  }

  console.log(`✅ Updated: ${data[0].title}`)
}

run().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
