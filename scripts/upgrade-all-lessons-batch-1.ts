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
    slug: 'tracking-spending',
    content: {
      introduction:
        'Tracking spending reveals where your money actually goes versus where you think it goes. Most people underestimate discretionary costs by 20–30%. This lesson shows you three proven tracking systems, how to set them up in under 15 minutes, and how to review weekly to spot leaks and prevent budget drift.',
      definitions: [
        { term: 'Discretionary Spending', definition: 'Non-essential purchases you choose to make (dining out, entertainment, subscriptions, hobbies).' },
        { term: 'Fixed Expense', definition: 'Recurring costs that are the same each month (rent, insurance, loan minimums).' },
        { term: 'Variable Expense', definition: 'Costs that change month-to-month but are necessary (groceries, utilities, gas).' },
        { term: 'Spending Leak', definition: 'Small, frequent purchases that add up unnoticed (daily coffee, impulse buys, unused subscriptions).' }
      ],
      sections: [
        {
          title: 'Why Tracking Works',
          content:
            'Awareness changes behavior. Studies show people who track spending reduce discretionary costs by 15–20% in the first month without feeling deprived. Tracking also identifies forgotten subscriptions, duplicate services, and emotional triggers for impulse buys.'
        },
        {
          title: 'Method 1: Receipt Envelope',
          content:
            'Keep a small envelope in your bag. Every purchase—store, online, gas—save the receipt or screenshot. On Sunday, sort receipts into 3–5 categories (groceries, dining, transport, personal, fun). Tally each category and compare to your budget. Takes 10 minutes weekly. Best for people who prefer paper and tangible records.'
        },
        {
          title: 'Method 2: Bank/App Auto-Categorization',
          content:
            'Link checking/credit accounts to an app (Mint, YNAB, EveryDollar, or your bank\'s native tool). Review transactions 2x per week and correct mis-categorized items. Export a monthly summary. Takes 5 minutes per session. Best for people comfortable with technology who want automation.'
        },
        {
          title: 'Method 3: Simple Spreadsheet',
          content:
            'Create a Google Sheet with columns: Date, Vendor, Category, Amount. At the end of each day or week, add your transactions manually or paste from bank download. Use filters and pivot tables to see totals by category. Takes 5–15 minutes weekly depending on volume. Best for people who want full control and custom categories.'
        },
        {
          title: 'Setting Up Your System (15 Minutes)',
          content:
            'Step 1: Pick one method (envelope, app, or sheet).\nStep 2: Define 5–8 categories that match your budget (needs, wants, goals; or groceries, dining, transport, personal, bills, savings).\nStep 3: Gather last week\'s transactions as a test.\nStep 4: Log or categorize them.\nStep 5: Schedule a recurring weekly review (Sunday evening, Friday lunch, etc.).'
        },
        {
          title: 'Weekly Review Routine',
          content:
            'Spend 10 minutes every week: (1) Categorize all transactions since the last review. (2) Compare category totals to your budget targets. (3) Identify one spending leak or surprise. (4) Decide one small adjustment for the coming week (skip one takeout, delay a purchase, use a grocery list). Write it down and check it next week.'
        },
        {
          title: 'Common Pitfalls and Fixes',
          content:
            'Pitfall: Forgetting cash purchases. Fix: Snap a photo of the receipt immediately or estimate and log it.\nPitfall: Reviewing only once a month. Fix: Weekly reviews prevent big surprises and keep you accountable.\nPitfall: Too many categories. Fix: Start with 5; you can always add detail later.\nPitfall: Judging yourself harshly. Fix: Tracking is data collection, not shame. Use it to learn, not punish.'
        },
        {
          title: 'Case Study: Coffee Shop Leak',
          content:
            'Maria tracked spending for 4 weeks and discovered she spent $180/month on coffee shops—about $6/day. She didn\'t realize the cumulative impact. She switched to home coffee 4 days/week and kept one café visit as a Friday treat, saving $120/month. She redirected that to her emergency fund and hit her first $500 goal in 4 months.'
        }
      ],
      keyTakeaways: [
        'Tracking reveals the gap between perceived and actual spending.',
        'Choose one simple method and commit to weekly 10-minute reviews.',
        'Most people find 15–20% in savings just by seeing where money goes.',
        'Cash and small purchases add up fast—capture them too.',
        'Use tracking data to make one small tweak each week, not to judge yourself.'
      ],
      actionItems: [
        { step: 1, action: 'Pick your tracking method', description: 'Envelope, app, or spreadsheet—choose what fits your style.' },
        { step: 2, action: 'Define 5–8 categories', description: 'Align with your budget: groceries, dining, transport, personal, bills, savings.' },
        { step: 3, action: 'Log last week\'s spending', description: 'Gather receipts/statements and categorize as a test run.' },
        { step: 4, action: 'Schedule weekly review', description: 'Add a recurring 10-minute calendar event; stick to it for 4 weeks.' },
        { step: 5, action: 'Identify one spending leak', description: 'After first review, choose one area to reduce and track progress.' }
      ],
      resources: [
        { title: 'Mint', type: 'App', url: 'https://mint.intuit.com/', description: 'Free budget and spending tracker with auto-categorization.' },
        { title: 'YNAB (You Need A Budget)', type: 'App', url: 'https://www.ynab.com/', description: 'Zero-based budgeting with robust tracking and reports.' },
        { title: 'Google Sheets Budget Template', type: 'Tool', url: 'https://docs.google.com/spreadsheets/u/0/templates', description: 'Free customizable spending tracker templates.' },
        { title: 'CFPB Spending Tracker', type: 'Worksheet', url: 'https://www.consumerfinance.gov/consumer-tools/educator-tools/your-money-your-goals/', description: 'Printable spending diary and categorization guide.' }
      ],
      quiz: {
        questions: [
          { q: 'What percentage do most people underestimate discretionary spending by?', a: '20–30%.' },
          { q: 'How often should you review your tracked spending?', a: 'Weekly, for about 10 minutes.' },
          { q: 'Name two tracking methods.', a: 'Receipt envelope, app auto-categorization, or spreadsheet.' },
          { q: 'What is a spending leak?', a: 'Small, frequent purchases that add up unnoticed.' },
          { q: 'What should you do after identifying a leak?', a: 'Choose one small adjustment for the coming week and track progress.' }
        ]
      }
    }
  },
  {
    slug: 'understanding-credit-score',
    content: {
      introduction:
        'Your credit score is a three-digit number (300–850) that lenders use to decide whether to approve you and at what interest rate. A higher score saves you thousands on loans and opens doors to better financial products. This lesson explains how scores are calculated, how to check yours for free, and proven steps to improve it in 3–12 months.',
      definitions: [
        { term: 'Credit Score', definition: 'A numerical summary (300–850) of your creditworthiness, based on your credit report. FICO and VantageScore are the two main models.' },
        { term: 'Credit Report', definition: 'A detailed record of your credit history: accounts, balances, payment history, inquiries, and public records. Maintained by Equifax, Experian, TransUnion.' },
        { term: 'Utilization Ratio', definition: 'The percentage of your available credit you\'re using. Formula: (Total Balances ÷ Total Limits) × 100. Lower is better; aim under 30%, ideally under 10%.' },
        { term: 'Hard Inquiry', definition: 'A credit check when you apply for new credit. Each inquiry can lower your score by 5–10 points temporarily.' },
        { term: 'Credit Mix', definition: 'The variety of credit types you manage: revolving (credit cards), installment (auto, student, mortgage), and open (utility accounts).' }
      ],
      sections: [
        {
          title: 'How Your Score Is Calculated',
          content:
            'FICO Score Breakdown:\n• Payment History (35%): On-time vs. late payments, collections, bankruptcies.\n• Amounts Owed / Utilization (30%): How much you owe relative to your credit limits.\n• Length of Credit History (15%): Age of oldest account, average account age.\n• New Credit (10%): Recent inquiries and new accounts.\n• Credit Mix (10%): Types of credit you manage.\n\nVantageScore is similar but weights factors slightly differently. Both reward on-time payments and low utilization most heavily.'
        },
        {
          title: 'Checking Your Credit for Free',
          content:
            'Federal law entitles you to one free report per year from each bureau via AnnualCreditReport.com. During certain periods (including 2023–2025), weekly reports are available. Many banks and credit cards also offer free monthly FICO or VantageScore access. Pull all three bureau reports at least once per year and review for errors, unfamiliar accounts, or fraud.'
        },
        {
          title: 'Reading Your Credit Report',
          content:
            'Each report has four sections:\n1. Personal Information: Name, addresses, employers. Check for errors.\n2. Credit Accounts: Open/closed accounts, balances, limits, payment history. Verify each account is yours.\n3. Inquiries: Hard inquiries from credit applications. Too many in 6 months can lower your score.\n4. Public Records & Collections: Bankruptcies, liens, collections. Dispute any inaccuracies immediately.\n\nLook for: incorrect balances, accounts you didn\'t open, late payments you made on time, and duplicate accounts.'
        },
        {
          title: 'Fast Score Improvements (3–6 Months)',
          content:
            '1. Pay Down High Balances: Target cards with utilization >30%. Paying before the statement date lowers reported balances.\n2. Set Up Autopay: Ensure every account auto-pays at least the minimum to protect payment history.\n3. Request Higher Limits: Call issuers and request increases; don\'t use the extra—just lower your ratio.\n4. Become an Authorized User: Ask a trusted person with good credit/low utilization to add you to an old, well-managed card.\n5. Dispute Errors: File disputes online with each bureau; provide proof (statements, payment confirmations).'
        },
        {
          title: 'Long-Term Score Building (6–24 Months)',
          content:
            '1. Keep Old Accounts Open: Length of history matters; don\'t close your oldest card unless it has a fee you can\'t avoid.\n2. Diversify Credit Types: If you only have credit cards, consider a small installment loan (car, personal) and pay it on time.\n3. Limit New Applications: Space out credit applications by 6+ months to minimize inquiries.\n4. Monitor Regularly: Set up free monitoring through your bank or Credit Karma; review monthly for fraud or errors.'
        },
        {
          title: 'What Hurts Your Score',
          content:
            'Major negatives:\n• Late payments (30+ days overdue): Stay on report 7 years; recent lates hurt more.\n• Collections and charge-offs: Severe damage; negotiate pay-for-delete when possible.\n• Bankruptcies: Chapter 7 (10 years), Chapter 13 (7 years).\n• High utilization (>30%): Immediate impact but recovers fast when paid down.\n• Multiple hard inquiries in short time: Looks risky to lenders.\n\nMinor negatives:\n• Closing old accounts (shortens average age).\n• Opening many new accounts at once (lowers average age, adds inquiries).'
        },
        {
          title: 'Case Study: Utilization Fix',
          content:
            'Jordan had a 680 score. She had three credit cards with total limits $10,000 and balances $3,800 (38% utilization). She made an extra payment of $1,500 two weeks before her statement dates, dropping utilization to 23%. Within two months, her score rose to 712. She later requested limit increases, bringing total limits to $15,000, and kept balances under $1,500 (10% utilization). Score climbed to 745 in 6 months.'
        }
      ],
      keyTakeaways: [
        'Payment history (35%) and utilization (30%) drive most of your score.',
        'Check all three bureau reports annually via AnnualCreditReport.com.',
        'Pay down high balances and set autopay to protect on-time history.',
        'Dispute errors immediately with proof; keep old accounts open.',
        'Score improvements are fastest when you lower utilization and fix errors.'
      ],
      actionItems: [
        { step: 1, action: 'Pull your credit reports', description: 'Go to AnnualCreditReport.com and download all three reports.' },
        { step: 2, action: 'Review for errors', description: 'Check personal info, accounts, balances, and inquiries. Note any discrepancies.' },
        { step: 3, action: 'Calculate your utilization', description: 'Total balances ÷ total limits. Target under 30%, ideally under 10%.' },
        { step: 4, action: 'Set up autopay', description: 'Enable autopay for at least minimums on every card and loan.' },
        { step: 5, action: 'Dispute errors or pay down high balances', description: 'File disputes online or make an extra payment before statement date.' }
      ],
      resources: [
        { title: 'AnnualCreditReport.com', type: 'Tool', url: 'https://www.annualcreditreport.com/', description: 'Free official credit reports from all three bureaus.' },
        { title: 'myFICO', type: 'Tool', url: 'https://www.myfico.com/', description: 'Explanation of FICO score factors and simulators.' },
        { title: 'CFPB Credit Reports Guide', type: 'Guide', url: 'https://www.consumerfinance.gov/ask-cfpb/how-do-i-get-a-copy-of-my-credit-report-en-5/', description: 'How to request, read, and dispute reports.' },
        { title: 'Credit Karma', type: 'App', url: 'https://www.creditkarma.com/', description: 'Free VantageScore and monitoring from TransUnion/Equifax.' }
      ],
      quiz: {
        questions: [
          { q: 'What two factors contribute 65% of your FICO score?', a: 'Payment history (35%) and amounts owed/utilization (30%).' },
          { q: 'What is the ideal utilization ratio?', a: 'Under 30%, ideally under 10%.' },
          { q: 'How often can you get free credit reports?', a: 'At least once per year from each bureau; weekly during certain periods.' },
          { q: 'What should you do if you find an error?', a: 'Dispute it online with the bureau and provide proof.' },
          { q: 'Should you close your oldest credit card?', a: 'No, unless it has a high fee; keeping it open helps your credit age.' }
        ]
      }
    }
  }
]

async function run() {
  console.log('🚀 Upgrading batch 1 of lessons...\n')

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

  console.log('\n🎉 Batch 1 complete')
}

run().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
