import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase env vars missing')
}

const supabase = createClient(supabaseUrl, supabaseKey)

type LessonPayload = {
  slug: string
  content: Record<string, unknown>
}

const lessons: LessonPayload[] = [
  {
    slug: 'understanding-debt-types',
    content: {
      introduction:
        'Not all debt is the same. Knowing the type, cost, and risk helps you decide what to keep, refinance, or pay off first.',
      sections: [
        {
          title: 'Secured vs. Unsecured',
          content:
            'Secured debt is backed by collateral (mortgage, auto). If you default, the asset can be taken. Unsecured debt has no collateral (credit cards, personal loans, medical bills) and typically costs more.'
        },
        {
          title: 'Installment vs. Revolving',
          content:
            'Installment debt has fixed payments and end dates (mortgage, auto, student). Revolving debt lets you borrow up to a limit and varies monthly (credit cards, lines of credit). Revolving debt can grow silently through interest if unpaid.'
        },
        {
          title: 'Healthy vs. Expensive Debt',
          content:
            'Lower-rate, productive debt (mortgage within budget, low-rate student loans) can be manageable. High-rate or fee-heavy debt (credit cards, payday, rent-to-own) erodes cash flow and should be prioritized.'
        },
        {
          title: 'Variable vs. Fixed Rates',
          content:
            'Fixed rates stay the same; variable rates (HELOCs, some private student loans) can rise, increasing your payment risk. Rising rates are a signal to refinance or accelerate payoff when possible.'
        },
        {
          title: 'Signals to Act Now',
          content:
            'Carrying credit card balances, missing payments, only making minimums, or using BNPL to cover basics are signs to pause new borrowing and create a payoff plan.'
        }
      ],
      keyTakeaways: [
        'Secured debt risks the asset; unsecured costs more but has no collateral.',
        'Revolving balances can snowball—monitor utilization and interest.',
        'High-rate debt (often credit cards/payday) deserves fastest attention.',
        'Variable-rate loans can get more expensive; watch for rate resets.',
        'When signs appear (missed payments, minimums only), shift to a payoff plan.'
      ],
      actionItems: [
        { step: 1, action: 'List every debt', description: 'Note lender, balance, rate (APR), payment, fixed/variable, secured/unsecured.' },
        { step: 2, action: 'Tag risk level', description: 'Mark high-rate (>15%) and variable-rate debts as priority.' },
        { step: 3, action: 'Check utilization', description: 'For each credit card, calc balance ÷ limit; aim under 30%, under 10% is better.' },
        { step: 4, action: 'Freeze new debt', description: 'Pause new credit use on high-rate cards while you build the payoff plan.' },
        { step: 5, action: 'Identify refinance options', description: 'Explore balance transfer promos or lower-rate consolidation only if you can repay before promo ends.' }
      ],
      resources: [
        { title: 'APR vs. Interest Explained', type: 'Guide', url: 'https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-an-interest-rate-and-the-annual-percentage-rate-apr-en-99/', description: 'CFPB explanation of APR and cost.' },
        { title: 'Credit Card Payoff Calculator', type: 'Calculator', url: 'https://www.bankrate.com/calculators/credit-cards/credit-card-payoff-calculator.aspx', description: 'See payoff time and interest by payment amount.' },
        { title: 'National Foundation for Credit Counseling', type: 'Support', url: 'https://www.nfcc.org/', description: 'Nonprofit counselors for debt review and plans.' },
        { title: 'Rate Trends', type: 'Tool', url: 'https://fred.stlouisfed.org/series/TERMCBPER24NS', description: 'Track consumer credit rates to watch variable-rate risk.' },
        { title: 'Balance Transfer Checklist', type: 'Checklist', url: 'https://www.consumerfinance.gov/ask-cfpb/what-should-i-look-for-in-a-balance-transfer-offer-en-1449/', description: 'Key fine print to review before transferring.' }
      ]
    }
  },
  {
    slug: 'credit-scores-reports',
    content: {
      introduction:
        'Your credit report is your financial transcript; your score is its summary. Small, consistent actions move both in the right direction.',
      sections: [
        {
          title: 'What Builds a Score',
          content:
            'Major factors: payment history (~35%), utilization (~30%), length of history (~15%), mix (~10%), new credit/inquiries (~10%). Paying on time and keeping utilization low drive most gains.'
        },
        {
          title: 'Reading a Credit Report',
          content:
            'Check personal info, accounts (open/closed), balances, limits, payment status, and negative marks (late pays, collections). Look for errors in names, addresses, and account status.'
        },
        {
          title: 'Fast, Reliable Improvements',
          content:
            'Autopay at least minimums, pay cards before statement to lower utilization, and keep oldest cards open if no fee. Avoid multiple new cards at once.'
        },
        {
          title: 'Disputes and Fraud',
          content:
            'If you see errors, dispute with the bureau in writing with evidence. For fraud, place a free fraud alert or credit freeze; file an FTC report if identity theft is suspected.'
        },
        {
          title: 'Monitoring Without Anxiety',
          content:
            'Pull free reports at AnnualCreditReport.com (weekly is allowed). Pick one monitoring source and check monthly; avoid daily score watching.'
        }
      ],
      keyTakeaways: [
        'On-time payments and low utilization are the fastest score movers.',
        'Check reports for errors or fraud; dispute in writing with proof.',
        'Avoid opening several accounts at once; inquiries can ding scores temporarily.',
        'Keeping long-standing, no-fee cards open helps credit age.',
        'Monitor calmly: monthly checks are enough for most people.'
      ],
      actionItems: [
        { step: 1, action: 'Pull your report', description: 'Go to AnnualCreditReport.com; save each bureau PDF.' },
        { step: 2, action: 'Set autopay', description: 'Autopay minimums on every card/loan to protect payment history.' },
        { step: 3, action: 'Lower utilization', description: 'Make an extra card payment before the statement date this month.' },
        { step: 4, action: 'Dispute errors', description: 'If you spot inaccuracies, submit disputes with screenshots/bills.' },
        { step: 5, action: 'Add monitoring', description: 'Enable alerts from one source (bank/app) and calendar a monthly check.' }
      ],
      resources: [
        { title: 'Annual Credit Report', type: 'Tool', url: 'https://www.annualcreditreport.com', description: 'Free reports from all three bureaus.' },
        { title: 'CFPB Dispute Guide', type: 'Guide', url: 'https://www.consumerfinance.gov/ask-cfpb/how-do-i-dispute-an-error-on-my-credit-report-en-313/', description: 'Step-by-step dispute instructions.' },
        { title: 'Identity Theft Report', type: 'Support', url: 'https://www.identitytheft.gov/', description: 'File a recovery plan and report.' },
        { title: 'Score Factors Explained', type: 'Guide', url: 'https://www.myfico.com/credit-education/whats-in-your-credit-score', description: 'Breakdown of FICO factors.' },
        { title: 'Credit Freeze How-To', type: 'Guide', url: 'https://www.consumer.ftc.gov/articles/what-know-about-credit-freezes-fraud-alerts', description: 'When and how to freeze credit.' }
      ]
    }
  },
  {
    slug: 'debt-payoff-strategies',
    content: {
      introduction:
        'A payoff plan reduces stress and interest costs. Choose the method you can stick with and automate it.',
      sections: [
        {
          title: 'Snowball vs. Avalanche',
          content:
            'Snowball: pay smallest balances first for quick wins. Avalanche: pay highest APR first for lowest cost. Both work—choose based on what keeps you consistent.'
        },
        {
          title: 'Hybrid with Guardrails',
          content:
            'Keep minimums on all debts. Pick one “focus” debt. Send all extra to it. When it\'s gone, roll that amount to the next focus debt (snowball effect).'
        },
        {
          title: 'Automate and Isolate',
          content:
            'Automate minimums to avoid late fees. Use a dedicated checking sub-account or envelope for debt payments so extra cash does not get spent elsewhere.'
        },
        {
          title: 'Lower the Cost if Possible',
          content:
            'Ask lenders for hardship/interest reductions, consider 0% balance transfer (pay off before promo ends), or a lower-rate consolidation loan if it reduces APR and total fees.'
        },
        {
          title: 'Protect the Plan',
          content:
            'Keep a starter emergency fund ($500-$1,000) to avoid new debt when surprises hit. If income is unstable, prioritize cash buffer alongside payoff.'
        }
      ],
      keyTakeaways: [
        'Consistency matters more than the specific method.',
        'Avalanche saves the most interest; snowball can feel faster and keep motivation high.',
        'Automate minimums and focus payments to prevent missed dues.',
        'Reducing APR (negotiation, transfer, refinance) shortens the timeline.',
        'A small emergency buffer keeps you from backsliding into new debt.'
      ],
      actionItems: [
        { step: 1, action: 'Choose your method', description: 'Pick snowball (motivation) or avalanche (savings); write it down.' },
        { step: 2, action: 'Set a focus debt', description: 'Select the first target and note its balance, APR, minimum.' },
        { step: 3, action: 'Automate minimums', description: 'Schedule autopay for every debt to avoid late fees.' },
        { step: 4, action: 'Schedule an extra payment', description: 'Send an extra payment to the focus debt this pay period.' },
        { step: 5, action: 'Review monthly', description: 'Each month, roll freed-up payments to the next focus debt.' }
      ],
      resources: [
        { title: 'Debt Snowball Calculator', type: 'Calculator', url: 'https://unbury.me/', description: 'Compare snowball vs. avalanche timelines.' },
        { title: 'Balance Transfer Guide', type: 'Guide', url: 'https://www.consumerfinance.gov/ask-cfpb/what-should-i-look-for-in-a-balance-transfer-offer-en-1449/', description: 'Evaluate transfer offers safely.' },
        { title: 'Hardship Program Tips', type: 'Guide', url: 'https://www.consumerfinance.gov/ask-cfpb/can-i-negotiate-a-lower-interest-rate-on-my-credit-card-en-1457/', description: 'How to request rate reductions.' },
        { title: 'Debt Management Plans', type: 'Support', url: 'https://www.nfcc.org/our-services/debt-management-plan/', description: 'Nonprofit DMPs that reduce rates/fees.' },
        { title: 'Starter Emergency Fund', type: 'Guide', url: 'https://www.consumerfinance.gov/consumer-tools/educator-tools/your-money-your-goals/emergency-funds/', description: 'Build a buffer while paying debt.' }
      ]
    }
  },
  {
    slug: 'investment-fundamentals',
    content: {
      introduction:
        'Investing is how you grow money faster than inflation. Match your strategy to your time horizon and use low-cost, diversified funds.',
      sections: [
        {
          title: 'Start with Purpose and Horizon',
          content:
            'Name the goal (retirement, home in 5 years) and timeline. Money needed within 3 years should stay in cash/short-term bonds; long-term money can take more risk.'
        },
        {
          title: 'Account Types and Order',
          content:
            'Common order: (1) 401(k)/403(b) up to match, (2) HSA if eligible, (3) Roth or Traditional IRA, (4) extra in workplace plan, then (5) taxable brokerage for flexibility.'
        },
        {
          title: 'Diversification Made Simple',
          content:
            'Use broad index funds (total market US, international, and bond funds). Avoid concentrated single-stock bets. Keep costs low (expense ratio under 0.20% where possible).'
        },
        {
          title: 'Risk and Rebalancing',
          content:
            'Set a target mix (e.g., 80% stocks/20% bonds for long horizons). Rebalance 1-2x per year or when drift exceeds ~5%.'
        },
        {
          title: 'Investing vs. Trading',
          content:
            'Investing is long-term, rules-based, and boring. Trading is frequent and speculative. Stick to an automated, long-term plan to avoid emotional decisions.'
        }
      ],
      keyTakeaways: [
        'Align investments with time horizon; short-term money stays low risk.',
        'Grab employer match first—it is an immediate return.',
        'Broad, low-cost index funds diversify simply.',
        'Rebalance periodically to control risk, not to time markets.',
        'Stay invested; market swings are normal and expected.'
      ],
      actionItems: [
        { step: 1, action: 'Define one goal', description: 'Write the amount, timeline, and why it matters.' },
        { step: 2, action: 'Pick an account', description: 'Select the right account (401k/IRA/HSA/brokerage) for that goal.' },
        { step: 3, action: 'Choose a simple portfolio', description: 'Example: 70% total US, 20% international, 10% bonds (adjust for your horizon).' },
        { step: 4, action: 'Automate contributions', description: 'Set automatic transfers each payday; start small and increase quarterly.' },
        { step: 5, action: 'Set a rebalance reminder', description: 'Add a calendar event twice a year to rebalance to your target mix.' }
      ],
      resources: [
        { title: 'SEC Beginner Investing', type: 'Guide', url: 'https://www.investor.gov/introduction-investing', description: 'Plain-language investing basics.' },
        { title: 'Asset Allocation Quiz', type: 'Tool', url: 'https://personal.vanguard.com/us/FundsInvQuestionnaire', description: 'Helps map risk tolerance to a portfolio mix.' },
        { title: 'Bogleheads Three-Fund', type: 'Guide', url: 'https://www.bogleheads.org/wiki/Three-fund_portfolio', description: 'Simple diversified portfolio example.' },
        { title: 'Expense Ratio Checker', type: 'Tool', url: 'https://www.morningstar.com/', description: 'Look up fund costs; favor low expense ratios.' },
        { title: 'Dollar-Cost Averaging', type: 'Guide', url: 'https://www.investor.gov/introduction-investing/investing-basics/how-dollars-and-cents-add/dollar-cost-averaging', description: 'Why consistent contributions help smooth volatility.' }
      ]
    }
  }
]

async function run() {
  console.log('🚀 Updating remaining empty lessons...')

  for (const lesson of lessons) {
    const { data, error } = await supabase
      .from('lessons')
      .update({ content: lesson.content })
      .eq('slug', lesson.slug)
      .select('id, title')
      .limit(1)

    if (error) {
      console.error(`❌ ${lesson.slug}:`, error.message)
      process.exit(1)
    }

    if (!data || data.length === 0) {
      console.warn(`⚠️  ${lesson.slug}: No rows updated`)
      continue
    }

    console.log(`✅ Updated: ${data[0].title}`)
  }

  console.log('🎉 Done')
}

run().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
