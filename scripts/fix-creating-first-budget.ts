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
    'A budget is your spending plan. It tells every dollar where to go so you cover needs, reduce stress, and fund goals. This lesson walks you through a simple first budget, using real numbers and a weekly routine you can keep in 20 minutes.',
  sections: [
    {
      title: 'Know Your Net Income',
      content:
        'Use take-home pay (after tax/benefits). If income is irregular, average the last 3 months and use the lower month for safety.'
    },
    {
      title: 'List Fixed vs Variable Costs',
      content:
        '**Fixed (same each month):** rent/mortgage, utilities/phone, insurance, minimum debts.\n**Variable (change monthly):** groceries, transport, dining, kids, personal.\nAdd a care/health buffer (women often need it).'
    },
    {
      title: 'Pick a Simple Method',
      content:
        '**50/30/20** (easy start): 50% needs, 30% wants, 20% goals.\n**Zero-based** (tight budgets): every dollar assigned.\n**Pay-yourself-first** (busy): automate goals on payday, spend the rest.'
    },
    {
      title: 'Example Budget (Net $3,200)',
      content:
        'Needs: $1,750 (55%) → rent 1,050; utilities/phone 180; insurance 220; transit 150; min debt 150.\nWants: $640 (20%) → groceries 320; dining/coffee 150; personal 60; fun 110.\nGoals: $810 (25%) → emergency fund 250; extra debt 200; sinking funds 150; long-term investing 210.\nIf income drops to $2,800: cut wants to $400; keep $560 for goals (progress over perfection).'
    },
    {
      title: 'Weekly 20-Minute Routine',
      content:
        '1) Check balances (5 min).\n2) Log last week\'s spending (5).\n3) Move money to goals (5).\n4) Plan one risky category (5) like groceries or dining. If you miss a week, catch up next week—don\'t quit.'
    }
  ],
  keyTakeaways: [
    'Budget with net income; use a lower average if pay is irregular.',
    'Separate fixed vs variable; add a care/health buffer.',
    '50/30/20 or zero-based works—pick the simplest you will maintain.',
    'Small planned “fun” spend prevents guilt and blowouts.',
    'A weekly 20-minute check-in keeps the budget alive.'
  ],
  actionItems: [
    { step: 1, action: 'Calculate net income', description: 'Use last 3 months; pick the lowest month if variable.' },
    { step: 2, action: 'List fixed costs', description: 'Rent, utilities/phone, insurance, minimum debts.' },
    { step: 3, action: 'Set target for goals', description: 'Aim 15-25% to goals; start with 10% if cash is tight.' },
    { step: 4, action: 'Choose a method', description: '50/30/20 for simple; zero-based if money is tight.' },
    { step: 5, action: 'Schedule a weekly check-in', description: '20 minutes, same day/time; add calendar reminder.' }
  ],
  resources: [
    { title: 'Google Sheets Budget Template', type: 'Tool', url: 'https://docs.google.com/spreadsheets/u/0/templates', description: 'Copy a free monthly budget sheet.' },
    { title: 'YNAB (You Need A Budget)', type: 'App', url: 'https://www.ynab.com/', description: 'Zero-based budgeting app; great for irregular income.' },
    { title: 'CFPB Budget Worksheet', type: 'Tool', url: 'https://www.consumerfinance.gov/consumer-tools/budgeting/', description: 'Printable/digital worksheets from CFPB.' },
    { title: 'Grocery Spending Estimator', type: 'Calculator', url: 'https://www.numbeo.com/cost-of-living/', description: 'Set realistic grocery targets by city.' },
    { title: 'Savvy Ladies Helpline', type: 'Support', url: 'https://www.savvyladies.org/free-financial-helpline/', description: 'Free volunteer advisors for budget questions.' }
  ]
}

async function run() {
  console.log('🚀 Updating creating-first-budget')
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
    console.warn('⚠️ No lesson updated; check slug.')
    return
  }

  console.log(`✅ Updated: ${data[0].title}`)
}

run().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
