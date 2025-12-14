import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseKey) throw new Error('Supabase env vars missing')

const supabase = createClient(supabaseUrl, supabaseKey)

const lessons = [
  {
    slug: 'retirement-planning-fundamentals',
    content: {
      learningObjectives: [
        'Calculate retirement income needs using the 70% rule and retirement expense estimation.',
        'Understand the three pillars of retirement: Social Security, pensions, and personal savings.',
        'Evaluate retirement income sources and their tax implications.',
        'Build a retirement savings plan aligned to CFP standards.',
        'Recognize common retirement planning mistakes and how to avoid them.'
      ],
      introduction:
        'Retirement planning is the cornerstone of financial security. A typical woman lives 85–90 years; you may spend 25–30 years in retirement. This requires deliberate planning, not hope. You\'ll need $1–$2 million depending on spending, life expectancy, and income sources. This lesson teaches the fundamentals: calculating needs, understanding income sources, and building a realistic plan.',
      definitions: [
        { term: 'Replacement Ratio', definition: 'The percentage of pre-retirement income needed in retirement (typically 70–90%). A $100k earner might need $70–$90k annually in retirement.' },
        { term: 'Primary Insurance Amount (PIA)', definition: 'Your Social Security benefit, calculated from your 35 highest-earning years. Claim at 62 (reduced), 67 (full), or 70 (maximum).' },
        { term: 'Full Retirement Age (FRA)', definition: 'The age at which you earn your full Social Security benefit (67 for most, 68–69 for younger workers). Claiming early reduces benefits by 25%; delaying increases them by 24% per year.' },
        { term: 'Required Minimum Distribution (RMD)', definition: 'The minimum amount you must withdraw from tax-deferred retirement accounts (401k, IRA) starting at age 73. Failure to withdraw incurs a 25% penalty.' },
        { term: 'Sequence of Returns Risk', definition: 'The risk that poor investment returns early in retirement (especially in bear markets) devastate your long-term portfolio and require you to withdraw more to cover expenses.' }
      ],
      sections: [
        {
          title: 'The Three Pillars of Retirement Income',
          content:
            'Pillar 1: Social Security. Average benefit: $1,800/month ($21,600/year). For most women, it represents 40–50% of retirement income. Claim strategically: waiting from 62 to 70 increases lifetime benefits by ~76%.\n\nPillar 2: Pensions. If you have a pension (many government/union employees do), it provides guaranteed lifetime income. Most private-sector jobs no longer offer pensions.\n\nPillar 3: Personal Savings. 401(k)s, IRAs, taxable investments. This is where you have control. Most retirees need this pillar to fund 50%+ of retirement.\n\nExample (assume $80k pre-retirement income, 25% savings rate):\nSocial Security: $20,000/year (25% of needs).\nPersonal savings: $40,000/year (50% of needs).\nRequired total savings: $600,000–$1,000,000 (depending on market returns).'
        },
        {
          title: 'Calculating Your Retirement Number',
          content:
            'Method 1: The 70% Rule.\nIf you earn $100,000/year, plan to need 70% of that ($70,000/year) in retirement, adjusted for inflation.\n\nMethod 2: Expense-Based Calculation.\nTrack current annual expenses (housing, food, utilities, travel, insurance, healthcare). Estimate retirement expenses:\n- Housing might drop (paid-off mortgage).\n- Travel might increase (more free time).\n- Healthcare increases with age (budget $300–$500k over 25 years).\n\nExample: Current expenses $70k → Retirement expenses $65k (lower housing, but higher healthcare).\n\nMethod 3: The 4% Rule (Simple).\nSave 25× your annual retirement spending.\nIf you need $60k/year in retirement, save $1.5 million ($60k × 25).\nDraw down 4% annually ($60k), adjusted for inflation.\n\nHistorically (1926–2024): This plan succeeds 95% of the time. The 5% of cases where it fails happened when retirees faced major bear markets in their first 5 years.'
        },
        {
          title: 'Social Security Strategy: The Claiming Decision',
          content:
            'Your Social Security benefit varies dramatically by claiming age:\n\nAge 62 (earliest): 70% of full benefit. Example: $1,260/month if your FRA benefit is $1,800.\n\nAge 67 (full retirement age): 100% of benefit. Example: $1,800/month.\n\nAge 70 (latest): 124% of benefit. Example: $2,232/month.\n\nBreak-even analysis:\nIf you claim at 62 ($1,260/month) vs. wait to 70 ($2,232/month), you break even at age 82. If you live past 82, delaying pays more.\n\nWomen\'s advantage: Women live 5 years longer on average than men (age 86 vs 81). For women, waiting to 70 is usually better financially.\n\nStrategy:\nIf you have other income or savings → wait to 70.\nIf you\'re unhealthy or unemployed → claim at 62.\nIf you\'re married → coordinate claiming with spouse for maximum household benefit.'
        },
        {
          title: 'Real Scenario: Three Women\'s Retirement Plans',
          content:
            'Emma, age 35, $100k income, $1.2M saved:\nPlan: Retire at 65 (30 years). Target: $70k/year. Current savings accumulate to ~$4.2M (7% annual return, $15k/year contribution). Social Security: ~$28,000/year (67). Result: Sustainable. Can spend $70k/year from portfolio + Social Security covers rest after 70.\n\nMaya, age 50, $75k income, $300k saved:\nPlan: Retire at 67 (17 years). Target: $50k/year. Current savings grow to ~$1M. Social Security: ~$22,000/year. Result: Tight. Needs to increase savings rate to 20% of income ($15k/year). Portfolio + SS = sustainable.\n\nSarah, age 60, $90k income, $200k saved:\nPlan: Retire at 67 (7 years). Target: $60k/year. Savings can grow to ~$350k with $20k/year contributions. Social Security: ~$24,000/year. Result: Shortfall. Needs either to delay retirement to 70, reduce spending to $45k/year, or work part-time in early retirement.'
        },
        {
          title: 'Retirement Account Rules and Strategies',
          content:
            '401(k): Employer-sponsored. 2024 limit: $23,500/year ($31,000 if 50+). Some employers match (free money); contribute at least enough to get the full match.\n\nTraditional IRA: Self-directed. 2024 limit: $7,000/year ($8,000 if 50+). Tax-deductible contributions reduce current taxes. Withdrawals in retirement are taxed as ordinary income. RMDs start at 73.\n\nRoth IRA: Self-directed. 2024 limit: $7,000/year. Non-deductible contributions (no current tax break). Withdrawals in retirement are tax-free. No RMDs. Great for women with 30+ years to retirement; tax-free growth is powerful.\n\nBackdoor Roth: If your income is too high for direct Roth contributions, you can contribute to a Traditional IRA and convert it. (Requires pro-rata rule consideration.)\n\nCatchup: Age 50+? Contribute an additional $7,500 to 401(k) and $1,000 to IRAs.\n\nSequencing: Prioritize 401(k) to employer match → Max out 401(k) → Max out Roth IRA → Max out 401(k) → Taxable investments.'
        },
        {
          title: 'Common Retirement Mistakes',
          content:
            '1. Withdrawing too early from retirement accounts. Penalty: 10% + taxes if before 59.5 (exceptions: SEPP, disability, RMDs).\n\n2. Claiming Social Security too early (age 62 when you\'ll live to 90). Cost: ~$400k in lost lifetime benefits.\n\n3. Ignoring healthcare costs. Budget $300k–$500k for ages 65–90. Medicare is not free; premiums, deductibles, and out-of-pocket max apply.\n\n4. Sequence of returns risk. A 40% market drop in year 1 of retirement (when you need to withdraw) devastates your plan. Solution: Hold 2–3 years of expenses in bonds/cash.\n\n5. Underestimating longevity. Plan for 95–100, not 85. If you only plan to 85 and live to 95, you run out of money.\n\n6. Not accounting for inflation. $50k in today\'s dollars might need to be $100k in 25 years (at 3% inflation). Invest for growth even in retirement.'
        },
        {
          title: 'Testing Your Retirement Readiness',
          content:
            'Question 1: Do I have 25× my annual retirement spending saved?\nExample: If you need $50k/year, do you have $1.25M?\n\nQuestion 2: Can I sustain my desired lifestyle at my withdrawal rate?\nRisk: 4% withdrawal rule fails 5% of the time. For 95% confidence, use 3.5%.\n\nQuestion 3: Do I have a healthcare plan?\nMedicare starts at 65. Pre-Medicare (55–64)? Plan for healthcare costs or COBRA.\n\nQuestion 4: Is my asset allocation appropriate for retirement?\nYou might shift from 80% stocks (pre-retirement) to 50% stocks / 50% bonds (retirement) to reduce sequence-of-returns risk.\n\nQuestion 5: Have I stress-tested my plan?\nSimulation: What if the market drops 40% in year 1 of retirement? Can your plan survive?\n\nIf you answer "no" to any question, retirement is not yet sustainable. Adjust: save more, work longer, or reduce spending.'
        }
      ],
      keyTakeaways: [
        'Retirement income needs ~70% of pre-retirement income (adjusted for inflation).',
        'The 4% rule: Save 25× your annual retirement spending to fund 30-year retirements with 95% success.',
        'Social Security: Waiting from 62 to 70 increases lifetime benefits by ~76%; most women should wait.',
        'Build a three-pillar retirement: Social Security, pensions (if available), and personal savings.',
        'Healthcare costs in retirement: Budget $300k–$500k over 25 years; plan carefully.'
      ],
      actionItems: [
        'Calculate your expected annual retirement expenses.',
        'Estimate your Social Security benefit (ssa.gov for account statement).',
        'Determine your retirement target (25× annual spending).',
        'Compare your current savings to your target.',
        'If shortfall: increase savings rate, work longer, or reduce retirement spending goal.'
      ],
      checklist: [
        '☐ Calculate your retirement income need (70% of current income, adjusted for inflation).',
        '☐ Get your Social Security estimate (create account on ssa.gov).',
        '☐ List all retirement income sources: Social Security, pensions, personal savings.',
        '☐ Estimate healthcare costs in retirement (budget $300k–$500k over 25 years).',
        '☐ Calculate your retirement number: 25× annual retirement spending.',
        '☐ Assess current retirement savings progress toward target.',
        '☐ Maximize 401(k) contributions (at least to employer match).',
        '☐ Max out Roth IRA ($7k/year) for tax-free growth.',
        '☐ Run a retirement projection (use online calculator or hire advisor).',
        '☐ Review annually; adjust savings/spending as needed.'
      ],
      practiceExercise: {
        title: 'Build Your Retirement Plan',
        steps: [
          'List your current annual expenses (housing, food, utilities, insurance, travel, healthcare).',
          'Estimate retirement expenses (expect ~70% of current, plus extra healthcare).',
          'Multiply by 25: That\'s your retirement savings goal.',
          'Get your Social Security estimate from ssa.gov.',
          'Calculate your total retirement income: (Social Security) + (Pension if any) + (4% of portfolio).',
          'Gap analysis: Do your income sources cover your expenses?',
          'If shortfall: Increase savings, work longer, or reduce expenses.'
        ]
      },
      resources: [
        { title: 'Social Security Administration: Benefit Estimator', type: 'Tool', url: 'https://www.ssa.gov/benefits/retirement/estimator.html', description: 'Get your personalized Social Security benefit estimate.' },
        { title: 'Vanguard Retirement Planner', type: 'Tool', url: 'https://retirementplans.vanguard.com/', description: 'Monte Carlo simulations for retirement planning.' },
        { title: 'CFPB Retirement Planning Guide', type: 'Guide', url: 'https://www.consumerfinance.gov/retirement/', description: 'Consumer-friendly retirement guidance.' },
        { title: 'AARP Social Security Strategy Guide', type: 'Guide', url: 'https://www.aarp.org/work/social-security/', description: 'Claiming strategies for married couples and divorcees.' }
      ],
      quiz: [
        { q: 'What percentage of pre-retirement income should you plan to need in retirement?', a: '70–90%, adjusted for inflation.' },
        { q: 'What is the 4% rule in retirement planning?', a: 'Save 25× your annual retirement spending; withdraw 4% annually (inflation-adjusted) for a 95% success rate.' },
        { q: 'If you claim Social Security at 62 instead of 70, how much do you lose in lifetime benefits?', a: 'Approximately 40% less over your lifetime (you break even at age 82).' },
        { q: 'How much should you budget for healthcare costs in retirement (ages 65–90)?', a: '$300,000–$500,000, depending on insurance choices and life expectancy.' },
        { q: 'What is the 2024 contribution limit for a 401(k)?', a: '$23,500 for those under 50; $31,000 for age 50+.' }
      ]
    }
  },
  {
    slug: 'tax-basics',
    content: {
      learningObjectives: [
        'Understand the US tax system structure and how tax brackets work.',
        'Calculate your effective tax rate and marginal tax rate.',
        'Identify the major income tax deductions and credits available to individuals.',
        'Recognize the tax implications of different income sources (wages, investments, retirement accounts).',
        'Plan basic tax strategies to minimize your tax burden.'
      ],
      introduction:
        'Taxes take 20–40% of most people\'s lifetime earnings. Understanding tax basics helps you keep more of what you earn. This lesson demystifies tax brackets, deductions, credits, and simple strategies to reduce your tax burden. The goal is not to evade taxes (illegal) but to minimize them legally.',
      definitions: [
        { term: 'Tax Bracket', definition: 'The range of income taxed at a specific rate. US has 7 federal brackets (10%, 12%, 22%, 24%, 32%, 35%, 37%). You pay the bracket rate only on income within that range, not all income.' },
        { term: 'Marginal Tax Rate', definition: 'The tax rate you pay on your next dollar of income (your bracket). Knowing this helps evaluate investment and deduction decisions.' },
        { term: 'Effective Tax Rate', definition: 'Your total tax divided by total income. Usually much lower than marginal rate. Example: $30k tax on $100k income = 30% effective rate.' },
        { term: 'Standard Deduction', definition: '2024 single: $14,600; married filing jointly: $29,200. You deduct this amount before calculating taxes. Most people take the standard deduction instead of itemizing.' },
        { term: 'Itemized Deductions', definition: 'Alternative to standard deduction. List individual deductions (mortgage interest, charitable donations, state taxes) if they exceed standard deduction. Use if you own a home or have large charitable giving.' },
        { term: 'Tax Credit', definition: 'A dollar-for-dollar reduction in taxes owed. Example: $2,000 child tax credit = $2,000 less taxes. More powerful than deductions.' }
      ],
      sections: [
        {
          title: 'How Tax Brackets Work (Not How Most People Think)',
          content:
            'Myth: If you earn $100k and move to a higher bracket, you lose money because you\'re "taxed more."\n\nFact: The US uses marginal tax brackets. You only pay the higher rate on income within that bracket.\n\nExample (2024):\n- Single filer earning $100,000.\n- Tax brackets: 10% on first $11,600; 12% on $11,601–$47,150; 22% on $47,151–$100,530.\n\nCalculation:\n- First $11,600 @ 10% = $1,160.\n- Next $35,550 ($11,601 to $47,150) @ 12% = $4,266.\n- Remaining $52,850 ($47,151 to $100,000) @ 22% = $11,627.\n- Total tax: $17,053.\n- Effective rate: 17.05% (not 22%).\n\nKey: Earning an extra $1 doesn\'t push all your income to the next bracket; it only taxes that $1 at the marginal rate.'
        },
        {
          title: 'Deductions vs. Credits: Know the Difference',
          content:
            'Deduction: Reduces your taxable income.\n- Standard deduction (2024): $14,600 (single), $29,200 (married).\n- Itemized deductions: Mortgage interest, state taxes (capped at $10k), charitable donations.\n- Example: $100k income, $14,600 standard deduction = $85,400 taxable income.\n\nCredit: Reduces your tax owed (dollar-for-dollar).\n- Child Tax Credit: $2,000 per child under 17.\n- Earned Income Tax Credit (EITC): Up to $3,995 for low-income workers; refundable (you get money back).\n- Education credits: American Opportunity Credit ($2,500/year) for college students.\n\nComparison:\n- $5,000 deduction @ 22% bracket = $1,100 tax savings.\n- $1,000 credit = $1,000 tax savings (more powerful).\n\nStrategy: Maximize credits first (they\'re worth more), then deductions.'
        },
        {
          title: 'Types of Income and How They\'re Taxed',
          content:
            '1. Ordinary Income (Wages, Salary, Interest):\nTaxed at your marginal tax bracket rate (10–37%). Most people pay the most tax on this.\n\n2. Long-Term Capital Gains (stocks/investments held 1+ year):\nTaxed at preferential rates: 0% (for low-income), 15% (most), or 20% (high-income). Much lower than ordinary income.\n\n3. Short-Term Capital Gains (stocks/investments held <1 year):\nTaxed as ordinary income (same rates as wages). Incentive: hold investments 1+ year for lower taxes.\n\n4. Qualified Dividends (from stocks you own):\nTaxed at capital gains rates (0%, 15%, 20%), not ordinary income. Better than interest income.\n\n5. Interest Income (savings accounts, bonds):\nTaxed as ordinary income at your full bracket rate. Why savings account interest is taxed heavily (another reason to invest for growth).\n\nStrategy: Prioritize long-term capital gains and qualified dividends; defer short-term gains; minimize interest income through tax-advantaged accounts.'
        },
        {
          title: 'Tax-Advantaged Accounts: Save Taxes While Saving',
          content:
            '401(k) (Employer-Sponsored):\n- Contribution: $23,500/year (2024); deducted from gross income.\n- Tax benefit: Lower current taxes; pay taxes on withdrawals in retirement (usually at a lower rate).\n- Example: $100k salary, $15k 401(k) contribution = $85k taxable income, saving ~$3,300 in taxes (22% bracket).\n\nTraditional IRA (Self-Directed):\n- Contribution: $7,000/year (2024); deductible if income is below phase-out limits.\n- Same tax benefit as 401(k): pay taxes in retirement.\n\nRoth IRA (Self-Directed):\n- Contribution: $7,000/year (non-deductible).\n- Tax benefit: Tax-free growth and withdrawals in retirement. Powerful for women with long time horizons (30+ years).\n- Example: $7k Roth contribution at age 35. Grows to $100k by age 65. All $100k withdrawn tax-free.\n\n529 College Savings Plan:\n- Contributions up to $235,000 per beneficiary (varies by state).\n- Tax-free growth for education expenses; withdrawals for K-12 tuition, college, or apprenticeships.\n\nHSA (Health Savings Account):\n- Contribution: $4,150/year (self-only coverage) or $8,300 (family).\n- Triple tax advantage: deductible, grows tax-free, withdrawals tax-free for medical expenses.\n- After age 65, use like Traditional IRA (pay taxes on non-medical withdrawals).\n\nStrategy: Max out 401(k) → Roth IRA → HSA → taxable investments (in that order).'
        },
        {
          title: 'Real Scenario: Filing Taxes at Different Life Stages',
          content:
            'Emma, age 25, Single, $50k Salary:\n- Gross income: $50,000.\n- 401(k) contribution: $8,000 (get employer 3% match = $1,500 free money).\n- Taxable income: $42,000.\n- Standard deduction (2024): $14,600.\n- Income subject to tax: $27,400.\n- Federal tax: ~$3,200 (12% bracket).\n- Effective rate: 6.4%.\n- Tip: Max out Roth IRA ($7k) for tax-free growth.\n\nMaya, age 40, Married, $120k Salary + $15k Investment Income:\n- Gross income: $135,000.\n- 401(k) contribution: $23,500 (max out).\n- Taxable income: $111,500.\n- Standard deduction (married): $29,200.\n- Income subject to tax: $82,300.\n- Federal tax: ~$12,200 (22% bracket).\n- Effective rate: 9%.\n- Note: $15k investment income (long-term gains): taxed at 15% capital gains rate, not higher ordinary rate.\n\nSarah, age 55, Widow, $80k Salary + $20k Rental Income:\n- Gross income: $100,000 (including rental income, which is ordinary income).\n- 401(k) contribution: $31,000 (max out, age 50+ catch-up).\n- Taxable income: $69,000.\n- Standard deduction (age 65+): $17,850 (higher for 65+).\n- Income subject to tax: $51,150.\n- Federal tax: ~$6,100 (22% bracket).\n- Effective rate: 6.1%.\n- Tip: Consider itemizing if mortgage interest + state taxes exceed standard deduction.'
        },
        {
          title: 'Common Tax Deductions and Credits',
          content:
            'Common Deductions:\n- Standard deduction: $14,600 (single), $29,200 (married).\n- Mortgage interest (if you itemize).\n- State and local taxes (SALT): Capped at $10,000.\n- Charitable contributions.\n- Medical expenses (only if they exceed 7.5% of AGI).\n\nCommon Credits (Usually Better Than Deductions):\n- Child Tax Credit: $2,000 per child (refundable up to $1,600).\n- Earned Income Tax Credit (EITC): Up to $3,995 (income limits apply).\n- American Opportunity Credit: Up to $2,500/year for college students.\n- Dependent Care Credit: Up to $1,050/year if you pay for childcare.\n- Saver\'s Credit: Up to $1,000 for low-to-moderate income savers (contributes to retirement accounts).\n\nTip: Many people miss refundable credits. Use Free File on IRS.gov if income <$79k to file for free and catch credits.'
        },
        {
          title: 'Basic Tax Planning Strategies',
          content:
            '1. Maximize tax-advantaged accounts:\n   - 401(k): At least to employer match (free money).\n   - Roth IRA: $7,000/year for tax-free growth.\n   - HSA: Often overlooked; triple tax advantage.\n\n2. Harvest losses:\n   - In down years, sell losing investments to offset gains.\n   - Can deduct up to $3,000 in excess losses per year.\n   - Carry forward remaining losses to future years.\n\n3. Time large gains/losses:\n   - Can control when you realize capital gains (taxable).\n   - Example: If you\'ll have high income this year, defer selling winners to next year.\n\n4. Bunching deductions:\n   - If deductions are close to standard deduction, bunch them into one year.\n   - Example: Make 2 years of charitable donations in 1 year to itemize; take standard deduction in the other year.\n\n5. Manage investment location:\n   - Tax-inefficient (high turnover, interest): Hold in 401(k)/IRA.\n   - Tax-efficient (index funds, dividends): Hold in taxable accounts.\n   - Example: Bond funds in 401(k); stock index funds in taxable account.\n\n6. Rebalance in tax-advantaged accounts:\n   - Selling in a 401(k) doesn\'t trigger taxes; selling in a taxable account does.\n   - Do rebalancing in tax-advantaged accounts only.'
        }
      ],
      keyTakeaways: [
        'Tax brackets are marginal: You only pay higher rates on income in that bracket, not all income.',
        'Effective tax rate is usually 20–30% less than marginal rate.',
        'Tax credits are worth more than deductions (dollar-for-dollar reduction).',
        'Tax-advantaged accounts (401k, IRA, HSA, 529) save thousands over a lifetime.',
        'Long-term capital gains and qualified dividends are taxed lower than wages.'
      ],
      actionItems: [
        'Calculate your effective tax rate (taxes paid ÷ total income).',
        'List all tax-advantaged accounts available to you (401k, IRA, HSA, 529).',
        'Determine which deductions you can itemize (SALT, mortgage, charitable).',
        'Check if you qualify for tax credits (child, EITC, education, saver\'s).',
        'Develop a 5-year tax plan to maximize savings.'
      ],
      checklist: [
        '☐ Know your marginal tax bracket (not all income is taxed at this rate).',
        '☐ Understand the difference: deductions reduce income; credits reduce taxes directly.',
        '☐ Max out employer 401(k) match (free money).',
        '☐ Contribute to Roth IRA if eligible ($7k/year under 50; $8k if 50+).',
        '☐ Consider HSA if on high-deductible health plan (triple tax advantage).',
        '☐ Determine if you should itemize deductions or take standard deduction.',
        '☐ Check if you qualify for tax credits (child tax, EITC, education, etc.).',
        '☐ Track investment gains/losses for year-end tax planning.',
        '☐ Harvest losses in down years to offset gains.',
        '☐ File taxes by April 15 (or request extension by Oct 15).'
      ],
      practiceExercise: {
        title: 'Calculate Your Tax Liability',
        steps: [
          'Write down your total income (wages, interest, dividends, capital gains).',
          'Subtract pre-tax deductions (401k, IRA contributions).',
          'Subtract standard deduction ($14,600 single; $29,200 married).',
          'Find your tax bracket (IRS.gov; 2024 brackets vary by filing status).',
          'Calculate tax owed on remaining income.',
          'Subtract any tax credits you qualify for.',
          'Compare your calculated tax to your paycheck witholding; adjust if needed.'
        ]
      },
      resources: [
        { title: 'IRS Tax Brackets and Rates (2024)', type: 'Reference', url: 'https://www.irs.gov/newsroom/irs-provides-tax-inflation-adjustments-for-tax-year-2024', description: 'Official tax brackets for all filing statuses.' },
        { title: 'IRS Free File Program', type: 'Tool', url: 'https://www.irs.gov/filing/free-file-do-your-federal-taxes-for-free', description: 'Free tax software for income <$79k.' },
        { title: 'CFPB Tax Guide', type: 'Guide', url: 'https://www.consumerfinance.gov/about-us/blog/saving-money-taxes/', description: 'Consumer-friendly tax tips.' },
        { title: 'Bogleheads Tax-Efficient Investing', type: 'Guide', url: 'https://www.bogleheads.org/wiki/Minimizing_tax_drag', description: 'Strategies to reduce taxes in your portfolio.' }
      ],
      quiz: [
        { q: 'If you earn $100k and are in the 22% bracket, do you pay 22% on all your income?', a: 'No. You pay 22% only on income within the bracket; lower rates on lower portions.' },
        { q: 'What is the difference between a tax deduction and a tax credit?', a: 'Deduction reduces taxable income; credit reduces taxes owed directly (more valuable).' },
        { q: 'What is the 2024 standard deduction for a single filer?', a: '$14,600.' },
        { q: 'Should you hold long-term capital gains or short-term capital gains in a taxable account?', a: 'Long-term (taxed at lower rates); hold short-term in tax-advantaged accounts.' },
        { q: 'What is the HSA and why is it powerful?', a: 'Health Savings Account: triple tax advantage (deductible, tax-free growth, tax-free withdrawals for medical).' }
      ]
    }
  }
]

async function run() {
  console.log('🚀 Upgrading Retirement + Tax lessons with CFP-aligned content...\n')

  for (const lesson of lessons) {
    try {
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
        console.warn(`⚠️  ${lesson.slug}: Not found in database`)
        continue
      }

      console.log(`✅ Updated: ${data[0].title}`)
    } catch (e) {
      console.error(`❌ ${lesson.slug}: Unexpected error`, e)
    }
  }

  console.log('\n✨ Batch complete')
}

run().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
