import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase env vars missing')
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Lesson content templates keyed by lesson slug
const templates: Record<string, any> = {
  'understanding-interest': {
    introduction:
      'Interest is the cost of borrowing money or the reward for saving. If you borrow $1,000 at 5% annual interest, you will pay $50 per year in interest. If you save $1,000 in a high-yield account at 5%, you will earn $50 per year. Understanding interest is critical because it either works FOR you (when saving or investing) or AGAINST you (when borrowing). Women tend to save more conservatively and miss out on compound growth; by understanding interest, you will make smarter financial decisions.',
    sections: [
      {
        title: 'Simple Interest vs Compound Interest',
        content:
          '**Simple Interest** is straightforward: You earn interest only on your original amount.\n\n**Example: Sarah\'s $5,000 CD at 3% simple interest:**\n- Year 1: Earns $150 (3% of $5,000)\n- Year 2: Earns $150 (3% of $5,000)\n- Year 5: Earns $150 per year\n- Total earned after 5 years: $750\n\n**Compound Interest** means interest earns interest.\n\n**Example: Sarah\'s $5,000 savings at 3% compounded annually:**\n- Year 1: Earns $150; balance $5,150\n- Year 2: Earns $154.50 (3% of $5,150)\n- Year 3: Earns $159.14\n- Year 5: Total $5,796.37\n\nCompound interest earned $1,046.37 vs simple interest $750. Women with 30-40 year horizons benefit the most from compounding.'
      },
      {
        title: 'How Interest Rates Affect Borrowing',
        content:
          'When you borrow, the rate determines how much extra you pay.\n\n**Credit card example ($3,000 at 18% APR):**\n- Pay $100 per month: ~45 months, ~$1,500 interest\n- Pay $200 per month: ~18 months, ~$600 interest\n- Pay $300 per month: ~11 months, ~$300 interest\n\n**Student loan example ($25,000 at 5%):**\n- 10-year: $264 per month, $6,680 interest\n- 20-year: $149 per month, $10,820 interest\n\nWomen often carry debt longer; faster payoff cuts total cost.'
      },
      {
        title: 'How Interest Works When You Save',
        content:
          '**Savings account rates (2024):**\n- Traditional bank: ~0.01% APY\n- High-yield savings: 4-5% APY\n\n$10,000 at 0.01% earns ~$1 per year vs ~$450 at 4.5%.\n\n**Maria\'s emergency fund $8,000:**\n- At 0.01%: ~$0.80 per year\n- At 4.5%: ~$360 per year (>$1,800 over 5 years)\n\nMove idle cash to high-yield savings.'
      },
      {
        title: 'The Rule of 72',
        content:
          'Estimate doubling time: 72 divided by rate.\n- 4% return: 18 years\n- 6% return: 12 years\n- 8% return: 9 years\n\nStart early: a 25-year-old at 7% sees ~$148k from $5k by 65; starting at 40 yields ~$27k.'
      },
      {
        title: 'APR vs APY',
        content:
          'APR is the stated annual rate without compounding; APY includes compounding.\n- Credit cards show APR; actual cost is higher because of daily compounding.\n- Savings show APY; that is your true earnings.\n\nAlways compare APY when saving and be cautious of APR when borrowing.'
      }
    ],
    keyTakeaways: [
      'Compound interest is exponential; use it for saving and investing.',
      'Small payment increases on debt slash interest costs.',
      'Moving cash from 0.01% to 4.5% adds hundreds per year on $10k.',
      'Rule of 72 shows why starting early matters for women with career breaks.',
      'APY shows true earnings; APR understates borrowing cost when compounding.'
    ],
    actionItems: [
      { step: 1, action: 'Audit your accounts', description: 'List balances and APY for checking, savings, CDs, emergency fund.' },
      { step: 2, action: 'Calculate compound growth', description: 'Use the SEC calculator to project $5,000 over 10, 20, 30 years.' },
      { step: 3, action: 'Compare high-yield options', description: 'Check Bankrate for rates; move idle cash to high-yield savings.' },
      { step: 4, action: 'Check card APRs', description: 'If APR >15%, plan a payoff or balance transfer strategy.' },
      { step: 5, action: '30-day interest challenge', description: 'Before non-essential spends, note interest cost if carried on a card.' }
    ],
    resources: [
      { title: 'Compound Interest Calculator (SEC)', type: 'Interactive Tool', url: 'https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator', description: 'See how your money grows over time.' },
      { title: 'High-Yield Savings Comparison', type: 'Comparison Tool', url: 'https://www.bankrate.com/banking/savings/rates/', description: 'Compare savings rates across banks.' },
      { title: 'Credit Card Interest Calculator', type: 'Calculator', url: 'https://www.nerdwallet.com/article/credit-cards/credit-card-interest-calculator', description: 'Estimate payoff time and total interest.' },
      { title: 'Student Loan Simulator', type: 'Calculator', url: 'https://studentaid.gov/loan-simulator/', description: 'Model repayment plans and interest costs.' },
      { title: 'Savvy Ladies: Understanding Credit', type: 'Course', url: 'https://www.savvyladies.org/financial-literacy-classes/', description: 'Free class on credit and interest basics.' }
    ]
  },
  'saving-and-investing': {
    introduction:
      'Saving and investing are different, and both matter. Saving is safety and liquidity; investing is growth over time. Women often over-save and under-invest, missing long-term gains. This lesson shows how to build an emergency fund, then invest simply for wealth.',
    sections: [
      {
        title: 'Saving vs Investing: Core Difference',
        content:
          '**Saving**: Safety, liquidity, low risk; for emergencies and near-term goals.\n**Investing**: Growth, some risk, long-term; for retirement and wealth.\n\n$10k saved at 4% for 30 years: ~$12.5k. $10k invested at 7%: ~$76k (a $63k gap).'
      },
      {
        title: 'Build Emergency Fund First',
        content:
          'Do not invest until you have a cushion.\nStarter: $1,000. Target: 3-6 months expenses.\nExample expenses $2,600 per month -> 3 months $7,800; 6 months $15,600. Keep in high-yield savings, not the market.'
      },
      {
        title: 'Types of Investments',
        content:
          'Retirement accounts (401k, IRA), index funds and ETFs (diversified), bonds (stability), real estate options. Prefer broad index funds over picking individual stocks; simpler and lower risk.'
      },
      {
        title: 'Simple Portfolio',
        content:
          'Three-fund idea: US stock index, international stock index, bond index. Low fees, diversified, easy to automate. Age-based mix: more stocks when younger, add bonds as you approach retirement.'
      },
      {
        title: 'Common Mistakes',
        content:
          'Being too conservative, waiting to start, panic selling, thinking you need a lot to begin, skipping tax-advantaged accounts. Even $50 per month invested beats waiting for $5,000.'
      }
    ],
    keyTakeaways: [
      'Save for emergencies first; invest the rest for growth.',
      'Investing beats saving over long horizons by tens of thousands.',
      'Use simple diversified funds; avoid stock picking.',
      'Time in market matters more than timing the market.',
      'Use 401k/IRA/HSA to cut taxes and grow faster.'
    ],
    actionItems: [
      { step: 1, action: 'Calculate emergency target', description: 'Monthly expenses times 3 and 6; set targets.' },
      { step: 2, action: 'Capture employer match', description: 'Set 401k deferral to at least the match percent.' },
      { step: 3, action: 'Open a Roth IRA', description: 'Set up with Vanguard, Schwab, or Fidelity; start with $50+.' },
      { step: 4, action: 'Buy one index fund', description: 'Example tickers: VTI (US total), VEA (international), BND (bonds).' },
      { step: 5, action: 'Automate monthly investing', description: 'Autotransfer on payday; even $50 per month compounds.' }
    ],
    resources: [
      { title: 'Vanguard Investing Basics', type: 'Educational', url: 'https://www.vanguard.com/investor/education', description: 'Free investing fundamentals.' },
      { title: 'Roth IRA Calculator', type: 'Calculator', url: 'https://www.investor.gov/financial-tools-calculators/calculators/roth-ira-contribution-calculator', description: 'Project Roth growth to retirement.' },
      { title: 'Index Fund Comparison', type: 'Comparison', url: 'https://www.morningstar.com/funds', description: 'Compare fees and performance.' },
      { title: 'High-Yield Savings Rates', type: 'Comparison Tool', url: 'https://www.bankrate.com/banking/savings/rates/', description: 'Find the best place for your cash cushion.' },
      { title: 'Savvy Ladies: Investing for Women', type: 'Course', url: 'https://www.savvyladies.org/financial-literacy-classes/', description: 'Free course to reduce investing anxiety.' }
    ]
  },
  'borrowing-money': {
    introduction:
      'Borrowing can be a useful tool or an expensive trap. Women often face higher costs because of lower average incomes and longer repayment. Learn the true cost of loans, how lenders judge you, and how to avoid predatory offers.',
    sections: [
      {
        title: 'Know Your Debt Types',
        content:
          'Installment debt: fixed payments and end date (auto, student, personal loans).\nRevolving debt: balance and minimums can change (credit cards, HELOC).\n\nTypical rates (Dec 2025): credit cards 18-29% APR; auto 6-9%; personal 8-15%; federal student ~5-8%; BNPL 0% promo then 20%+ if late. Use cards only if paid in full; keep auto payment under 10% of take-home.'
      },
      {
        title: 'True Cost of Borrowing',
        content:
          '$8,000 card at 22% APR: pay 2% minimum (~$160) -> 30+ years, ~$17k total; pay $300 -> ~34 months, ~$10.2k total; pay $500 -> ~18 months, ~$9k total.\n$20k auto at 8% for 5 years: ~$405 per month, ~$4.3k interest; stretching to 7 years saves payment but adds ~$3k interest. Shorter terms save thousands.'
      },
      {
        title: 'Debt-to-Income (DTI)',
        content:
          'DTI = monthly debt payments divided by monthly gross income.\nExample: $4,500 gross; debts car $320, student $180, card mins $120 -> $620; DTI 13.8%. Targets: mortgages <36% total, <28% housing; auto or personal often <40%. Calculate and pay down before applying.'
      },
      {
        title: 'Predatory Red Flags',
        content:
          'Instant approval, no credit check, triple-digit APR; hidden fees; prepayment penalties; title or payday loans; BNPL late fees turning into high APR. Better: credit union small-dollar loans, 0% balance transfer paid within promo, nonprofit credit counselors.'
      },
      {
        title: 'Smart Borrowing Plan',
        content:
          'List debts with APR, balance, minimum, months left; pick avalanche (highest APR) or snowball (smallest balance); refinance only if rate drops 6%+ with low fees; avoid new debt while paying down; keep emergency fund growing to prevent new swipes.'
      }
    ],
    keyTakeaways: [
      'High APR debt destroys budgets; attack it first.',
      'Shorter terms and higher payments cut thousands in interest.',
      'DTI under 36% keeps rates and approvals favorable.',
      'Predatory lenders target people under time stress; walk away from easy money.',
      'A written payoff plan plus emergency fund prevents debt cycles.'
    ],
    actionItems: [
      { step: 1, action: 'List all debts', description: 'Balance, APR, minimum, months left.' },
      { step: 2, action: 'Calculate your DTI', description: '(Monthly debt payments divided by gross income) times 100; aim under 36%.' },
      { step: 3, action: 'Pick a payoff method', description: 'Avalanche (highest APR) or snowball (smallest balance).' },
      { step: 4, action: 'Refinance or transfer smartly', description: 'Only if fees plus promo interest are less than staying put.' },
      { step: 5, action: 'Add $50-150 to payments', description: 'Automate a small extra to high APR debt.' }
    ],
    resources: [
      { title: 'Credit Card Interest Calculator', type: 'Calculator', url: 'https://www.nerdwallet.com/article/credit-cards/credit-card-interest-calculator', description: 'See payoff time and interest at different payments.' },
      { title: 'Debt Payoff Planner', type: 'Tool', url: 'https://www.undebt.it/', description: 'Avalanche and snowball schedules with tracking.' },
      { title: 'DTI Calculator', type: 'Calculator', url: 'https://www.bankrate.com/calculators/debt-to-income.aspx', description: 'Check if you meet lender targets.' },
      { title: 'Balance Transfer Explainer', type: 'Educational', url: 'https://www.consumerfinance.gov/ask-cfpb/what-is-a-balance-transfer-en-1031/', description: 'When 0% transfers help and when they hurt.' },
      { title: 'Credit Union Locator', type: 'Tool', url: 'https://mapping.ncua.gov/', description: 'Find lower-rate small-dollar loans.' }
    ]
  },
  'smart-budgeting': {
    introduction:
      'A budget is permission to spend on what matters. Women often juggle childcare, eldercare, and irregular income. This lesson gives a real example, three methods, and a weekly 20-minute routine you can keep.',
    sections: [
      {
        title: 'Real Budget Example (Maya, $3,800 net)',
        content:
          'Income: $3,800 take-home. Fixed: rent 1,200; utilities/phone/internet 220; insurance 300; car 260; childcare 450; minimum debt 200. Fixed total $2,630 (69%). Variable: groceries 420; gas 160; dining 160; kids 120; personal 80. Variable total $940. Left for goals $230 ($150 emergency, $80 debt extra). If income drops to $3,400: cut dining to 60, personal to 40, pause extra debt; still save $90.'
      },
      {
        title: 'Pick a Method',
        content:
          '50/30/20 (simple); zero-based (tight budgets); pay-yourself-first (busy schedules). For irregular income, budget last month\'s income and keep a bare-bones version.'
      },
      {
        title: 'Women-Specific Categories',
        content:
          'Add childcare or eldercare buffer, healthcare co-pays, professional growth, self-care small line, safety fund. Explicit categories prevent credit card creep.'
      },
      {
        title: 'Weekly 20-Minute Routine',
        content:
          '1) Check balances (5 min). 2) Log last week\'s spend (5). 3) Move money: emergency + debt extra (5). 4) Plan one risky category (5). If you miss a week, catch up next week; do not quit.'
      },
      {
        title: 'Remove Friction, Not Joy',
        content:
          'Automate bills and goal transfers. Use one card for variable spend with alerts. Cash envelopes for overspend categories. Keep a $50 fun line to avoid guilt blowouts. If partnered, 10-minute weekly money huddle.'
      }
    ],
    keyTakeaways: [
      'Budgets work when they reflect reality, including care and health costs.',
      'Use last month\'s income to smooth irregular pay; keep a bare-bones version ready.',
      'Automate goals first; pay-yourself-first beats willpower.',
      'A weekly 20-minute routine matters more than a perfect template.',
      'Planned joy spending reduces binge spending.'
    ],
    actionItems: [
      { step: 1, action: 'Choose your method', description: '50/30/20 if new; zero-based if tight; pay-yourself-first if busy.' },
      { step: 2, action: 'Build two budgets', description: 'Bare-bones and normal.' },
      { step: 3, action: 'Schedule a weekly check-in', description: 'Same day and time; phone reminder.' },
      { step: 4, action: 'Automate goals', description: 'Emergency fund and debt extra on payday.' },
      { step: 5, action: 'Add one women-specific category', description: 'Start with $25-50 for care or growth.' }
    ],
    resources: [
      { title: 'Google Sheets Budget Template', type: 'Tool', url: 'https://docs.google.com/spreadsheets/u/0/templates', description: 'Copy a free monthly budget sheet.' },
      { title: 'YNAB', type: 'App', url: 'https://www.ynab.com/', description: 'Zero-based budgeting app, good for irregular income.' },
      { title: 'CFPB Budget Worksheet', type: 'Tool', url: 'https://www.consumerfinance.gov/consumer-tools/budgeting/', description: 'Printable and digital worksheets.' },
      { title: 'Grocery Spending Estimator', type: 'Calculator', url: 'https://www.numbeo.com/cost-of-living/', description: 'Set realistic grocery budgets by city.' },
      { title: 'Savvy Ladies Helpline', type: 'Support', url: 'https://www.savvyladies.org/free-financial-helpline/', description: 'Free volunteer advisors for budget questions.' }
    ]
  },
  'taxes-and-federal-revenue': {
    introduction:
      'Taxes fund public services, but confusion makes many people overpay or miss credits. Caregiving breaks, part-time work, and side gigs add complexity. Learn how income is taxed, which credits matter most, and how to adjust your paycheck so you keep more.',
    sections: [
      {
        title: 'How Income Is Taxed (2024 example)',
        content:
          'Marginal brackets: only the dollars in each bracket pay that rate.\nHead of Household taxable $60,000: 10% on first $15,700, 12% on $15,701-$59,850, 22% on the top $150. Total federal about $6,901 (effective ~11.5%). Your top bracket is not your whole bill.'
      },
      {
        title: 'Filing Status Matters',
        content:
          'Statuses: Single, Married Filing Jointly, Married Filing Separately, Head of Household (HOH). HOH and MFJ get higher deductions and better brackets. Example single mom qualifying for HOH: standard deduction $21,900 vs $14,600 single, plus better brackets.'
      },
      {
        title: 'Deductions vs Credits',
        content:
          'Deductions reduce taxable income; standard deduction 2024: $14,600 single, $21,900 HOH, $29,200 MFJ. Itemize only if higher. Credits cut tax dollar-for-dollar: Child Tax Credit up to $2,000 per child; Child and Dependent Care Credit 20-35% of up to $3,000 or $6,000 for 2+ kids; Earned Income Tax Credit up to about $7,830 depending on income and kids; Saver\'s Credit up to $1,000 single/$2,000 MFJ. Many caregivers qualify for HOH plus CTC/EITC.'
      },
      {
        title: 'Paycheck Checkup',
        content:
          'Use IRS Tax Withholding Estimator. If your refund was over $1,000, you likely over-withheld; adjust W-4 to keep more cash. If you owed over $1,000, increase withholding. Side gig: set aside 20-25% of net for quarterly taxes.'
      },
      {
        title: 'Keep Records and Plan',
        content:
          'Track childcare, education, and medical expenses. Freelancers: keep mileage, home office percentage, receipts. Contribute to 401k/IRA/HSA to lower taxable income. Avoid early retirement withdrawals to skip penalties.'
      }
    ],
    keyTakeaways: [
      'Marginal brackets only tax the top slice at the top rate.',
      'Head of Household can cut tax for single parents and caregivers.',
      'Credits beat deductions dollar-for-dollar; know CTC, EITC, Dependent Care, Saver\'s.',
      'Adjust W-4 to avoid large refunds or big tax bills.',
      'Use tax-advantaged accounts to shrink taxable income and grow faster.'
    ],
    actionItems: [
      { step: 1, action: 'Confirm filing status', description: 'Check if you qualify for Head of Household.' },
      { step: 2, action: 'Run IRS withholding estimator', description: 'Update W-4 based on results.' },
      { step: 3, action: 'List your credits', description: 'CTC, Dependent Care, EITC, Saver\'s; gather receipts.' },
      { step: 4, action: 'Capture deductions automatically', description: 'Track charity, medical over 7.5% AGI, property/state taxes (cap $10k).' },
      { step: 5, action: 'Boost tax-advantaged contributions', description: 'Add $25-50 per paycheck to 401k/IRA/HSA if eligible.' }
    ],
    resources: [
      { title: 'IRS Withholding Estimator', type: 'Tool', url: 'https://www.irs.gov/individuals/tax-withholding-estimator', description: 'Calculate proper W-4 settings.' },
      { title: 'EITC Assistant', type: 'Tool', url: 'https://www.irs.gov/credits-deductions/individuals/earned-income-tax-credit/use-the-eitc-assistant', description: 'Check eligibility and estimate EITC.' },
      { title: 'Child and Dependent Care Credit FAQ', type: 'Educational', url: 'https://www.irs.gov/credits-deductions/individuals/child-and-dependent-care-credit-information', description: 'Rules and limits for care expenses.' },
      { title: 'Saver\'s Credit Explainer', type: 'Educational', url: 'https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-savings-contributions-savers-credit', description: 'Income limits and how to claim.' },
      { title: 'Free Tax Prep (VITA)', type: 'Support', url: 'https://www.irs.gov/individuals/free-tax-return-preparation-for-qualifying-taxpayers', description: 'Find free IRS-certified tax prep if eligible.' }
    ]
  },
  'retirement-planning-fundamentals': {
    introduction:
      'Women live longer, earn less on average, and take more career breaks. You may need more saved over fewer working years. Set a clear target, use the right accounts, invest simply, and use catch-up contributions if you are starting later.',
    sections: [
      {
        title: 'Set a Target with 25x Rule',
        content:
          'Annual spending times 25 approximates the nest egg for a ~4% withdrawal. Example: $55k spend -> ~$1.375M. If Social Security expected $18k, needed from savings is (~$55k - $18k) times 25 ≈ $925k.'
      },
      {
        title: 'Account Order of Operations',
        content:
          '1) 401k/403b to full match. 2) Roth IRA up to limit ($7k; $8k if 50+). 3) Back to 401k/403b to max ($23k; $30.5k if 50+). 4) HSA if eligible. Roth gives tax-free withdrawals and flexibility after career breaks.'
      },
      {
        title: 'Simple Glide Path',
        content:
          'Stock/bond mix by age: 20-35: 80-90% stocks; 36-50: 70-80%; 51-60: 60-70%; 61+: 50-60%. A target-date index fund can automate this.'
      },
      {
        title: 'Late Starter Plan (Maria 45)',
        content:
          'Goal retire 65 with $900k. Current $120k; contribute $1,500 monthly; invest 70% stocks/30% bonds. At 7% average: ~$360k contributions, ~$450k growth, total ~$930k. Age 50+ catch-up: add $7,500 to 401k and $1,000 to IRA annually if possible.'
      },
      {
        title: 'Protect Against Risks',
        content:
          'Plan to age 95 for longevity; keep Roth contributions going even small; maintain at least match during work years; ensure disability coverage; in divorce, know retirement account rights (QDRO may apply); hold 1-2 years expenses in cash or bonds near retirement to reduce sequence risk.'
      }
    ],
    keyTakeaways: [
      'Target = spending times 25 minus Social Security.',
      'Employer match is guaranteed return; take it first.',
      'Roth IRA adds tax-free flexibility after career breaks.',
      'Simple portfolios or target-date funds work; consistency wins.',
      'Catch-up contributions and steady investing can close late-start gaps.'
    ],
    actionItems: [
      { step: 1, action: 'Calculate your 25x target', description: 'Annual spend times 25, minus expected Social Security.' },
      { step: 2, action: 'Set deferral to capture match', description: 'Adjust 401k/403b to at least the match percent.' },
      { step: 3, action: 'Open or fund Roth IRA', description: 'Automate $100-300 monthly if eligible.' },
      { step: 4, action: 'Pick a simple portfolio', description: 'Use one target-date fund or a three-fund mix aligned to your age.' },
      { step: 5, action: 'Add catch-up at 50+', description: 'Increase contributions by $7,500 (401k) and $1,000 (IRA) when eligible.' }
    ],
    resources: [
      { title: 'Retirement Nest Egg Calculator', type: 'Calculator', url: 'https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator', description: 'Project growth and see if you are on track.' },
      { title: 'SSA Benefits Estimator', type: 'Tool', url: 'https://www.ssa.gov/estimator/', description: 'Estimate Social Security for the 25x math.' },
      { title: 'Target-Date Fund Explainer', type: 'Educational', url: 'https://www.fidelity.com/learning-center/investment-products/mutual-funds/target-date-funds', description: 'How glide paths work and how to pick a year.' },
      { title: 'Catch-Up Contribution Rules', type: 'Educational', url: 'https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-catch-up-contributions', description: 'Current limits for age 50+.' },
      { title: 'Divorce and Retirement Accounts (Nolo)', type: 'Educational', url: 'https://www.nolo.com/legal-encyclopedia/dividing-retirement-plans-divorce.html', description: 'Understand QDROs and rights to shared assets.' }
    ]
  },
  'recognizing-financial-abuse': {
    introduction:
      'Financial abuse is when someone controls, steals, or sabotages your money to exert power. It often appears slowly. This lesson shows warning signs, safe steps to protect yourself, and where to get help without alerting the abuser.',
    sections: [
      {
        title: 'Warning Signs',
        content:
          'Taking your cards or paycheck; forcing you to ask for money; opening credit in your name; monitoring every purchase; blocking bank access; sabotaging work so you lose income; threatening to cut you off unless you comply.'
      },
      {
        title: 'Protect Money Quietly',
        content:
          'Use a safe device (work or library) to change passwords; set new email or phone for banking alerts; open low-profile checking or savings at a new bank; switch to e-statements; save small amounts regularly; pull free credit reports to spot fraud.'
      },
      {
        title: 'Rebuild or Protect Credit',
        content:
          'Dispute fraudulent accounts fast; place fraud alert or freeze if safe; remove yourself as authorized user if their defaults will hurt you; use a secured card in your own name to rebuild; keep paying minimums on accounts in your name to limit damage.'
      },
      {
        title: 'Plan a Safe Exit',
        content:
          'Document patterns (screenshots, dates, statements) stored safely; keep an emergency go-bag with IDs, cash, documents, meds; pick a safe contact and code word; know shelters and hotlines; ask about restraining orders that include financial protections.'
      },
      {
        title: 'Get Legal and Financial Help',
        content:
          'Domestic violence advocates can help open accounts safely; legal aid can guide divorce, custody, and asset protection; ask about emergency grants; if joint accounts exist, consult a lawyer before moving large sums; update beneficiaries and passwords once safe.'
      }
    ],
    keyTakeaways: [
      'Loss of access or forced permission is a key red flag.',
      'Create private communication channels and accounts before confrontation.',
      'Check credit reports for fraudulent accounts and dispute quickly.',
      'Safety planning with advocates and legal aid protects finances and wellbeing.',
      'Secured credit and on-time payments help rebuild after leaving.'
    ],
    actionItems: [
      { step: 1, action: 'Use a safe device', description: 'Create new email or phone for banking alerts.' },
      { step: 2, action: 'Open a separate account', description: 'New bank or credit union with e-statements; start small deposits.' },
      { step: 3, action: 'Pull your credit report', description: 'AnnualCreditReport.com; list any accounts you do not recognize.' },
      { step: 4, action: 'Contact a hotline or advocate', description: 'Make a safety plan before confronting or leaving.' },
      { step: 5, action: 'Document and store safely', description: 'Save screenshots and statements to a cloud account they cannot access.' }
    ],
    resources: [
      { title: 'National Domestic Violence Hotline', type: 'Support', url: 'https://www.thehotline.org/', description: '24/7 chat and call; safety planning and local referrals.' },
      { title: 'NNEDV Safety Net', type: 'Educational', url: 'https://www.techsafety.org/', description: 'Guides for safe tech use if devices are monitored.' },
      { title: 'Annual Credit Report', type: 'Tool', url: 'https://www.annualcreditreport.com/', description: 'Free reports to spot fraudulent accounts.' },
      { title: 'CFPB: Protecting Accounts', type: 'Educational', url: 'https://www.consumerfinance.gov/consumer-tools/educator-tools/resources-for-fraud-and-identity-theft/', description: 'Steps to freeze credit and dispute fraudulent debts.' },
      { title: 'WomensLaw.org', type: 'Legal Aid', url: 'https://www.womenslaw.org/', description: 'State-by-state info on restraining orders and financial protections.' }
    ]
  }
}

async function run() {
  console.log('🚀 Updating lesson content for empty slugs...')

  for (const [slug, content] of Object.entries(templates)) {
    const { data, error } = await supabase
      .from('lessons')
      .update({ content })
      .eq('slug', slug)
      .select('id, title')
      .limit(1)

    if (error) {
      console.error(`❌ ${slug}: ${error.message}`)
      continue
    }

    if (!data || data.length === 0) {
      console.warn(`⚠️ ${slug}: no lesson updated (check slug).`)
    } else {
      console.log(`✅ ${slug}: updated ${data[0].title}`)
    }
  }

  console.log('Done.')
}

run().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
