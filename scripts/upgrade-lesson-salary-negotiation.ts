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
    'Negotiate a +8–12% compensation improvement or secure a key benefit (remote days, sign-on bonus). This lesson gives you a 7-day prep plan, research worksheets, scripts, and counter tactics so you can negotiate with clarity and confidence.',
  sections: [
    {
      title: 'Day 1–2: Market Data Collection',
      content:
        'Gather three sources for your target role and location: Payscale/Glassdoor/Levels.fyi, employer HR ranges, and public data (BLS/OES). Note base, bonus, equity, and benefits. Capture min/median/max. Create a target ask anchored near the 75th percentile when you meet/exceed role requirements.'
    },
    {
      title: 'Day 3: Your Value Inventory',
      content:
        'List 5–7 contributions mapped to business outcomes: revenue growth, cost savings, risk reduction, speed/quality improvements, unique certifications, and leadership examples. Translate achievements into metrics (%, $, time saved). Align with the job description priorities.'
    },
    {
      title: 'Day 4: Scripts for the Ask',
      content:
        'Use clear anchors and trade-offs. Example: “Based on market data for this role in Austin and my track record improving conversion +11%, I\'m targeting $128–$136k base with a $10k sign-on or an extra remote day. How close can we get?” Prepare variants for HR screen, manager call, and final offer.'
    },
    {
      title: 'Day 5: Timing and Tactics',
      content:
        'Negotiate after written offer when possible; don\'t share your current salary; anchor ranges (not single numbers); keep a friendly, problem-solving tone. If pressed early, use a deflection: “I\'m focused on role fit; I\'ll consider competitive market ranges once we have details.”'
    },
    {
      title: 'Day 6–7: Handle Counters & Alternatives',
      content:
        'If base is capped, negotiate other levers: sign-on bonus, equity refresh, accelerated review, title, remote days, relocation, professional development budget, or role scope clarity. If they counter low, re-anchor with the strongest market data and value evidence.'
    }
  ],
  keyTakeaways: [
    'Use three market sources; anchor near the 75th percentile when qualified.',
    'Lead with business outcomes; quantify achievements with $, %, and time.',
    'Scripts reduce anxiety; rehearse variants for HR, manager, and final offer.',
    'Negotiate at the right moment and avoid revealing current salary.',
    'Trade across levers if base stalls; keep tone collaborative and firm.'
  ],
  actionItems: [
    { step: 1, action: 'Collect compensation data', description: 'Capture base/bonus/equity ranges from at least 3 sources.' },
    { step: 2, action: 'Draft value inventory', description: 'Write 5–7 outcomes with metrics that match the job priorities.' },
    { step: 3, action: 'Write your ask script', description: 'Prepare HR, manager, and final-offer variants with anchors.' },
    { step: 4, action: 'Schedule rehearsal', description: 'Practice with a peer or record yourself; refine tone and pace.' },
    { step: 5, action: 'Plan alternative levers', description: 'List benefits you\'ll trade for: sign-on, remote, title, review timing.' }
  ],
  resources: [
    { title: 'Fidelity Salary Negotiation Guide', type: 'Guide', url: 'https://www.fidelity.com/learning-center/salary-negotiation', description: 'Practical steps and scripts for negotiations.' },
    { title: 'Harvard Program on Negotiation', type: 'Guide', url: 'https://www.pon.harvard.edu', description: 'Evidence-based negotiation strategies and case studies.' },
    { title: 'Payscale', type: 'Tool', url: 'https://www.payscale.com', description: 'Market compensation data by role and location.' },
    { title: 'BLS Occupational Data', type: 'Tool', url: 'https://www.bls.gov/oes/', description: 'Government data for pay ranges across occupations.' },
    { title: 'Savvy Ladies Helpline', type: 'Support', url: 'https://www.savvyladies.org/free-financial-helpline/', description: 'Free volunteer advisors for negotiation prep and review.' }
  ],
  quiz: {
    questions: [
      { q: 'When is the best time to negotiate?', a: 'After you have a written offer or clear verbal terms.' },
      { q: 'How many market sources should you use?', a: 'Three: private sources, employer ranges, and public data.' },
      { q: 'What\'s a strong anchor strategy?', a: 'A range near the 75th percentile tied to your outcomes.' },
      { q: 'Name two alternative levers.', a: 'Sign-on bonus and remote days (others: title, review timing).' },
      { q: 'What should you avoid revealing?', a: 'Your current or past salary.' }
    ]
  },
  artifacts: [
    { title: 'Compensation Research Worksheet', type: 'Worksheet', url: 'https://docs.google.com/spreadsheets/u/0/templates', description: 'Template to capture ranges across sources.' },
    { title: 'Negotiation Script Sheet', type: 'Template', url: 'https://docs.google.com/document/u/0/', description: 'Fill-in-the-blank scripts for different stages.' },
    { title: 'Counteroffer Email Template', type: 'Template', url: 'https://docs.google.com/document/u/0/', description: 'Polite, firm email for countering offers.' }
  ]
}

async function run() {
  console.log('🚀 Upgrading lesson: salary-negotiation')
  const { data, error } = await supabase
    .from('lessons')
    .update({ content })
    .eq('slug', 'salary-negotiation')
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
