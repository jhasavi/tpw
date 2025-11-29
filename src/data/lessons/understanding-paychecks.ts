import { Lesson } from '@/types/curriculum'

/**
 * Lesson: Understanding Paychecks
 * Course: Financial Literacy Basics
 */

export const understandingPaychecks: Lesson = {
  id: 'understanding-paychecks',
  courseId: 'financial-literacy-basics',
  slug: 'understanding-paychecks',
  title: 'Understanding Paychecks',
  description: 'Decode your paycheck stub and understand where your money goes before it reaches your bank account.',
  durationMinutes: 30,
  displayOrder: 5,
  objectives: [
    'Understand the difference between gross pay and net pay',
    'Learn what all those deductions on your paycheck mean',
    'Know how taxes are calculated and withheld from your pay',
    'Understand benefits deductions (insurance, retirement, etc.)',
    'Verify your paycheck is accurate and catch errors early'
  ],
  keyConcepts: [
    'Gross vs. Net Pay',
    'Tax Withholding',
    'FICA Taxes',
    'Pre-tax vs. Post-tax Deductions',
    'W-4 Form'
  ],
  content: {
    introduction: `Your paycheck is probably your biggest source of income. But do you actually understand it?

Most people just look at the bottom number—what hits their bank account. But understanding what happens between your gross pay (what you earned) and net pay (what you get) is crucial for financial planning.

Those deductions aren't random. Some are required (taxes), some are investments in your future (retirement), and some are protecting you (insurance). Knowing the difference helps you make smarter decisions.

Plus, paycheck errors happen more often than you'd think. If you don't understand your paystub, you won't catch them.

Let's decode your paycheck together.`,

    sections: [
      {
        title: '1. Gross Pay vs. Net Pay',
        content: `This is the big number shock most people experience:

**Gross Pay** = What you EARNED
This is your salary or hourly wage multiplied by hours worked. It's the number in your offer letter or contract.

**Net Pay** = What you GET (Take-home pay)
This is what actually hits your bank account after all deductions.

**The Gap:**
For most people, net pay is 70-80% of gross pay. That means if you earn $50,000/year ($4,167/month gross), you might only take home $3,300-$3,500/month.

This is why budgeting on gross pay fails. Always budget based on NET pay—the actual money you receive.

Common shock: "I make $60,000 a year, why am I only seeing $1,400 every two weeks?"
Answer: Because gross annual income ≠ take-home pay.`,
        examples: [
          'Maria\'s job offer: $55,000/year salary. She calculated $4,583/month and planned her budget. Reality: She takes home $3,400/month after deductions. Her budget was off by $1,183!',
          'Hourly worker Jennifer: Makes $22/hour, works 40 hours/week. Gross weekly pay: $880. Net pay after deductions: $660. That $220 difference is where her budget kept failing.',
          'After a raise from $50k to $55k (+$5k/year), Tammy expected $416 more monthly. Reality: She saw about $280 more after taxes. Understanding this prevented lifestyle inflation.'
        ],
        tips: [
          'ALWAYS budget based on net pay, never gross pay',
          'Calculate your actual take-home percentage (net ÷ gross) to reality-check any salary offers',
          'When getting a raise, calculate the real increase after taxes',
          'This is why "I make $X per year" doesn\'t tell the whole story'
        ]
      },
      {
        title: '2. Federal Income Tax Withholding',
        content: `This is usually the biggest deduction on your paycheck.

**How it works:**
Your employer withholds (takes out) money each paycheck and sends it to the IRS on your behalf. This is based on:
• Your income level
• Your filing status (single, married, head of household)
• Information from your W-4 form (see next section)

**Tax Brackets (2024):**
The US uses progressive tax—you pay different rates on different portions of income:
• 10% on first $11,000 (single)
• 12% on $11,001-$44,725
• 22% on $44,726-$95,375
• And up from there

Important: You don't pay 22% on ALL your income if you make $50,000—you pay 10% on the first chunk, 12% on the next, and 22% only on the amount over $44,726.

**Refund vs. Owe:**
• Big refund = You overpaid all year (gave the government an interest-free loan)
• Owe money = You underpaid all year (had more money in paychecks but owe at tax time)
• Small refund or small amount owed = Just right (you didn't over or under withhold)`,
        examples: [
          'Singles Sophia earns $50,000. She pays: 10% on first $11,000 ($1,100), 12% on next $33,725 ($4,047), and 22% on remaining $5,275 ($1,161). Total: $6,308 federal tax, not $11,000 (22% of $50k).',
          'Married mom Carmen claimed too few dependents on her W-4. She got a $3,000 tax refund—sounds great! But she basically gave the government $250/month interest-free all year.',
          'After changing jobs, Rita forgot to update her W-4. She ended up owing $1,500 at tax time because too little was withheld. Lesson: Check withholding when circumstances change.'
        ],
        tips: [
          'Don\'t aim for a huge refund—that\'s YOUR money you could have had all year',
          'Don\'t underwithhold either—owing thousands at tax time is stressful',
          'Review withholding when you change jobs, get married/divorced, or have kids',
          'Use the IRS withholding calculator if you\'re unsure'
        ]
      },
      {
        title: '3. FICA Taxes (Social Security & Medicare)',
        content: `FICA = Federal Insurance Contributions Act. This pays for Social Security and Medicare.

**Social Security Tax: 6.2%**
• You pay 6.2% of your gross pay (up to $160,200 in 2024)
• Your employer also pays 6.2% (you don't see this)
• This funds your future Social Security retirement benefits
• Appears as "OASDI" on some paystubs

**Medicare Tax: 1.45%**
• You pay 1.45% on ALL income (no cap)
• Employer also pays 1.45%
• This funds the Medicare health insurance program
• High earners pay an additional 0.9% on income over $200,000

**Total FICA: 7.65%** of your gross pay

Unlike federal income tax, you can't adjust FICA withholding. It's mandatory and automatic.

**If you're self-employed:**
You pay BOTH portions (employee + employer) = 15.3% total. This is why self-employed people pay more in taxes.`,
        examples: [
          'On a $3,000 gross paycheck, Elena pays $186 for Social Security (6.2%) and $43.50 for Medicare (1.45%) = $229.50 total FICA tax.',
          'Self-employed consultant Maya earns $5,000/month. Her FICA tax: $765 (15.3%) because she pays both employee and employer portions—ouch!',
          'High earner Deborah makes $250,000/year. She pays normal FICA on most of it, plus extra 0.9% Medicare tax on the amount over $200,000.'
        ],
        tips: [
          'FICA is mandatory—you can\'t reduce or avoid it (and shouldn\'t want to)',
          'This money funds YOUR future Social Security and Medicare—it\'s not just a "tax"',
          'If self-employed, budget for the full 15.3%—it\'s a shock if you\'re not prepared',
          'Track your Social Security contributions at ssa.gov—those are your credits'
        ]
      },
      {
        title: '4. Understanding Pre-Tax vs. Post-Tax Deductions',
        content: `Not all deductions are the same. Some reduce your taxable income (good for taxes!), others don't.

**PRE-TAX Deductions** (taken BEFORE taxes calculated):
• 401(k) or 403(b) retirement contributions
• Traditional IRA contributions (sometimes)
• Health insurance premiums
• FSA (Flexible Spending Account) contributions
• HSA (Health Savings Account) contributions
• Dependent care FSA

**Why pre-tax is powerful:**
If you put $200/month into 401k, your taxable income drops by $200. You save income tax on that $200 NOW.

**POST-TAX Deductions** (taken AFTER taxes calculated):
• Roth 401(k) contributions
• Roth IRA contributions
• Life insurance premiums (sometimes)
• Disability insurance
• Union dues
• Charitable contributions

**The difference:**
Pre-tax saves you money NOW on taxes but you'll pay later when you withdraw.
Post-tax doesn't save you now, but withdrawals are tax-free later.

Look at your paystub and identify which deductions are pre-tax—you're saving tax money!`,
        examples: [
          'Julia contributes $300/month to her 401k pre-tax. In the 22% tax bracket, this saves her $66 in taxes monthly ($792/year). Free money back!',
          'Same $300 to Roth 401k means Julia pays taxes NOW, but all growth and withdrawals are tax-free in retirement—good for young earners expecting higher income later.',
          'When Laura added $100/month HSA contribution (pre-tax), her take-home only dropped $78—saved $22 in taxes monthly on money she\'d spend on healthcare anyway.'
        ],
        tips: [
          'Maximize pre-tax deductions if you\'re in a high tax bracket now',
          'Consider Roth (post-tax) if you\'re young and expect higher income later',
          'Health insurance premiums being pre-tax is a benefit most people don\'t appreciate',
          'Pre-tax retirement contributions are one of the best "deals" in personal finance'
        ]
      },
      {
        title: '5. Reading Your Paystub & Catching Errors',
        content: `Payroll errors happen. If you don't check your paystub, you might not notice.

**What to verify every paystub:**
✓ Hours worked (if hourly)—correct number?
✓ Pay rate—matches your offer/current rate?
✓ Gross pay—calculated correctly?
✓ Tax withholding—reasonable for your W-4?
✓ Benefit deductions—amounts match what you signed up for?
✓ Paid time off balance—accruing correctly?
✓ Year-to-date totals—adding up properly?

**Common errors to watch for:**
• Wrong pay rate (especially after a raise)
• Incorrect hours (overtime not paid, missing shift)
• Benefits double-deducted
• Wrong tax withholding after W-4 change
• PTO not accruing

**If you find an error:**
1. Contact HR/payroll immediately (don't wait)
2. Keep documentation (paystubs, emails, time records)
3. Most errors can be corrected in next paycheck
4. By law, they MUST pay you correctly—advocate for yourself

**Keep your paystubs:**
Save electronically or paper for at least 1 year. You'll need them for taxes, loan applications, benefit confirmations, etc.`,
        examples: [
          'Dana noticed her hourly rate was still $18 instead of $19 after her raise. She was underpaid $40/week for 6 weeks before catching it. HR corrected it and gave her the $240 back pay.',
          'After open enrollment, Yolanda saw her health insurance deducted twice in one paycheck. Quick email to payroll and they credited her account the next pay period.',
          'Self-employed contractor Gina keeps all paystubs from her main client. When they claimed she was paid differently than reality, she had proof for her taxes.'
        ],
        tips: [
          'Review EVERY paystub, even if briefly—make it a habit',
          'Set up direct deposit but still check the stub—automation doesn\'t mean accuracy',
          'Keep paystubs for a year minimum, 3 years is better',
          'If something looks wrong, ask—payroll makes mistakes, it\'s not personal',
          'After ANY change (raise, benefits, W-4 update), verify next paystub reflects it'
        ]
      }
    ],

    keyTakeaways: [
      'Gross pay is what you earn, net pay is what you get—ALWAYS budget on net pay',
      'Federal income tax, Social Security, and Medicare are mandatory deductions on every paycheck',
      'Pre-tax deductions (like 401k, health insurance) reduce your taxable income and save you tax money',
      'Your W-4 form controls how much federal tax is withheld—adjust it when life circumstances change',
      'FICA taxes (7.65% total) fund your future Social Security and Medicare—not just a "tax"',
      'Review every paystub for errors—payroll mistakes happen and you need to catch them',
      'Understanding your paycheck helps you plan accurately and maximize benefits'
    ],

    actionItems: [
      'Pull out your most recent paystub and identify: gross pay, net pay, and all deductions',
      'Calculate your take-home percentage (net ÷ gross) to know what you truly keep',
      'Verify your W-4 is correct for your current situation (single/married, dependents, etc.)',
      'Check if you have pre-tax deductions and calculate the tax savings',
      'Set a calendar reminder to review your first paystub after ANY job change or benefit update'
    ],

    resources: [
      {
        title: 'Paycheck Calculator',
        type: 'calculator',
        description: 'Calculate your take-home pay based on salary, state, and deductions',
        url: 'https://smartasset.com/taxes/paycheck-calculator'
      },
      {
        title: 'W-4 Withholding Calculator',
        type: 'calculator',
        description: 'IRS tool to determine correct tax withholding for your situation',
        url: 'https://www.irs.gov/individuals/tax-withholding-estimator'
      },
      {
        title: 'Understanding Your Paystub',
        type: 'article',
        description: 'Detailed guide to every line on your paystub',
        url: 'https://www.investopedia.com/articles/personal-finance/081615/how-read-your-paycheck-stub.asp'
      },
      {
        title: 'Pre-tax vs. Roth Contributions',
        type: 'article',
        description: 'When to choose traditional (pre-tax) vs. Roth (post-tax) retirement savings',
        url: 'https://www.nerdwallet.com/article/investing/roth-or-traditional-401k'
      }
    ]
  }
}
