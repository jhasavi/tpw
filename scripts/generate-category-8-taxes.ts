import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

const CATEGORY_8_TAXES = [
  // BEGINNER LEVEL (25 questions)
  {
    question_text: "What is the purpose of filing a tax return?",
    correct_answer: "To report your income and calculate taxes owed or refund due",
    incorrect_answers: [
      "To apply for government benefits",
      "To register to vote",
      "To update your credit score"
    ],
    explanation: "A tax return reports your income, deductions, and credits to calculate how much tax you owe or how much refund you should receive.",
    difficulty_level: "beginner",
    category_id: 8
  },
  {
    question_text: "What is a W-2 form?",
    correct_answer: "A form showing wages earned and taxes withheld from an employer",
    incorrect_answers: [
      "A form to claim a tax refund",
      "A form to report self-employment income",
      "A form to apply for tax credits"
    ],
    explanation: "Employers send W-2 forms to employees each January showing total wages paid and taxes withheld during the previous year.",
    difficulty_level: "beginner",
    category_id: 8
  },
  {
    question_text: "What is a tax bracket?",
    correct_answer: "A range of income taxed at a specific rate",
    incorrect_answers: [
      "The total percentage of income you pay in taxes",
      "A type of tax deduction",
      "The maximum amount you can earn tax-free"
    ],
    explanation: "Tax brackets divide income into ranges, each taxed at different rates. The U.S. uses a progressive system where higher income is taxed at higher rates.",
    difficulty_level: "beginner",
    category_id: 8
  },
  {
    question_text: "What is the standard deduction?",
    correct_answer: "A fixed amount that reduces your taxable income without itemizing",
    incorrect_answers: [
      "The minimum tax everyone must pay",
      "A credit for having dependents",
      "The fee to file taxes electronically"
    ],
    explanation: "The standard deduction is a set amount ($13,850 for single filers in 2023) that automatically reduces your taxable income without tracking individual expenses.",
    difficulty_level: "beginner",
    category_id: 8
  },
  {
    question_text: "What is the difference between a tax deduction and a tax credit?",
    correct_answer: "Deductions reduce taxable income; credits reduce tax owed dollar-for-dollar",
    incorrect_answers: [
      "They are the same thing with different names",
      "Deductions are for businesses; credits are for individuals",
      "Credits reduce taxable income; deductions reduce tax owed"
    ],
    explanation: "Deductions lower the income you're taxed on, while credits directly reduce your tax bill. A $1,000 credit is more valuable than a $1,000 deduction.",
    difficulty_level: "beginner",
    category_id: 8
  },
  {
    question_text: "When is the federal tax filing deadline for most individuals?",
    correct_answer: "April 15th (or next business day if it falls on a weekend/holiday)",
    incorrect_answers: [
      "December 31st",
      "January 31st",
      "March 1st"
    ],
    explanation: "The tax filing deadline is typically April 15th. You can request an extension until October 15th, but any taxes owed are still due in April.",
    difficulty_level: "beginner",
    category_id: 8
  },
  {
    question_text: "What does it mean to claim someone as a dependent?",
    correct_answer: "To include them on your tax return for additional deductions/credits",
    incorrect_answers: [
      "To make them responsible for your taxes",
      "To require them to file taxes with you",
      "To transfer your tax refund to them"
    ],
    explanation: "Claiming dependents (usually children or qualifying relatives) can reduce your taxable income and make you eligible for credits like the Child Tax Credit.",
    difficulty_level: "beginner",
    category_id: 8
  },
  {
    question_text: "What is a W-4 form used for?",
    correct_answer: "To tell your employer how much tax to withhold from your paycheck",
    incorrect_answers: [
      "To file your annual tax return",
      "To report self-employment income",
      "To claim a tax refund"
    ],
    explanation: "You fill out a W-4 when starting a job to indicate your filing status and withholding preferences, which determines how much tax is taken from each paycheck.",
    difficulty_level: "beginner",
    category_id: 8
  },
  {
    question_text: "What is FICA tax?",
    correct_answer: "Tax for Social Security and Medicare, taken from your paycheck",
    incorrect_answers: [
      "Federal income tax",
      "State income tax",
      "Unemployment insurance tax"
    ],
    explanation: "FICA (Federal Insurance Contributions Act) tax is 7.65% of wages (6.2% Social Security + 1.45% Medicare), with employers matching this amount.",
    difficulty_level: "beginner",
    category_id: 8
  },
  {
    question_text: "What is a tax refund?",
    correct_answer: "Money returned when you've paid more in taxes than you owe",
    incorrect_answers: [
      "A bonus from the government",
      "Interest earned on tax payments",
      "A penalty for late filing"
    ],
    explanation: "A refund occurs when your tax withholding or estimated payments exceed your actual tax liability. It's your own money being returned, not extra income.",
    difficulty_level: "beginner",
    category_id: 8
  },
  {
    question_text: "What is taxable income?",
    correct_answer: "Income subject to federal income tax after deductions",
    incorrect_answers: [
      "Total gross income before any deductions",
      "Only wages from employment",
      "Income from investments only"
    ],
    explanation: "Taxable income is your gross income minus deductions and adjustments. This is the amount used to calculate your tax using the tax brackets.",
    difficulty_level: "beginner",
    category_id: 8
  },
  {
    question_text: "What is the Earned Income Tax Credit (EITC)?",
    correct_answer: "A refundable credit for low to moderate-income workers",
    incorrect_answers: [
      "A deduction for business expenses",
      "A penalty for not having health insurance",
      "A tax on investment income"
    ],
    explanation: "The EITC is a refundable tax credit designed to help low to moderate-income working individuals and families, especially those with children.",
    difficulty_level: "beginner",
    category_id: 8
  },
  {
    question_text: "What is the Child Tax Credit?",
    correct_answer: "A credit for each qualifying child under 17",
    incorrect_answers: [
      "A deduction for childcare expenses",
      "Money for college savings",
      "A credit for adopting a child"
    ],
    explanation: "The Child Tax Credit provides up to $2,000 per qualifying child under 17, with up to $1,600 being refundable as of 2023.",
    difficulty_level: "beginner",
    category_id: 8
  },
  {
    question_text: "What are estimated taxes?",
    correct_answer: "Quarterly tax payments for income without withholding",
    incorrect_answers: [
      "Your best guess at what you'll owe",
      "Taxes withheld from your paycheck",
      "Penalties for underpaying taxes"
    ],
    explanation: "Self-employed individuals and those with other income (like investments) without withholding must make estimated tax payments quarterly to avoid penalties.",
    difficulty_level: "beginner",
    category_id: 8
  },
  {
    question_text: "What is AGI (Adjusted Gross Income)?",
    correct_answer: "Gross income minus certain adjustments before deductions",
    incorrect_answers: [
      "Income after all deductions and credits",
      "The same as taxable income",
      "Only wages and salary"
    ],
    explanation: "AGI is your gross income minus adjustments like student loan interest, IRA contributions, and HSA contributions. It's used to determine eligibility for many tax benefits.",
    difficulty_level: "beginner",
    category_id: 8
  },
  {
    question_text: "What is a 1099 form?",
    correct_answer: "A form reporting non-employee income like freelance work or investments",
    incorrect_answers: [
      "A form for claiming tax deductions",
      "A form for requesting a tax extension",
      "A form for reporting charitable donations"
    ],
    explanation: "1099 forms report various types of income: 1099-NEC for freelance work, 1099-INT for interest, 1099-DIV for dividends, etc.",
    difficulty_level: "beginner",
    category_id: 8
  },
  {
    question_text: "What is the purpose of a tax extension?",
    correct_answer: "To get more time to file your return, but not to pay taxes owed",
    incorrect_answers: [
      "To delay paying taxes owed until October",
      "To reduce the amount of taxes you owe",
      "To avoid late filing penalties and late payment penalties"
    ],
    explanation: "An extension gives you until October 15th to file, but any taxes owed are still due by April 15th. It only extends filing time, not payment time.",
    difficulty_level: "beginner",
    category_id: 8
  },
  {
    question_text: "What is the difference between filing status 'Single' and 'Head of Household'?",
    correct_answer: "Head of Household is for unmarried people supporting dependents with better tax rates",
    incorrect_answers: [
      "They have the same tax brackets and standard deduction",
      "Single is for those under 25, Head of Household for those over 25",
      "Head of Household requires owning a home"
    ],
    explanation: "Head of Household status offers a higher standard deduction and more favorable tax brackets than Single, but requires being unmarried and paying more than half the cost of maintaining a home for a qualifying person.",
    difficulty_level: "beginner",
    category_id: 8
  },
  {
    question_text: "What are capital gains taxes?",
    correct_answer: "Taxes on profits from selling investments or assets",
    incorrect_answers: [
      "Taxes on your salary and wages",
      "Taxes on gifts received",
      "Taxes on savings account interest"
    ],
    explanation: "When you sell an asset (stocks, real estate, etc.) for more than you paid, the profit is a capital gain and is taxable. Rates depend on how long you held the asset.",
    difficulty_level: "beginner",
    category_id: 8
  },
  {
    question_text: "What is tax withholding?",
    correct_answer: "Money taken from your paycheck throughout the year for taxes",
    incorrect_answers: [
      "Money saved in a special tax account",
      "Penalties for not filing taxes",
      "Extra taxes for high earners"
    ],
    explanation: "Tax withholding is when employers automatically take federal and state taxes from your paycheck and send them to the government on your behalf.",
    difficulty_level: "beginner",
    category_id: 8
  },
  {
    question_text: "What is a refundable tax credit?",
    correct_answer: "A credit that can result in a refund even if you owe no taxes",
    incorrect_answers: [
      "A credit that must be repaid next year",
      "A credit only for business expenses",
      "A credit that expires if not used"
    ],
    explanation: "Refundable credits like the EITC can exceed your tax liability and result in a refund. Non-refundable credits can only reduce your tax to zero.",
    difficulty_level: "beginner",
    category_id: 8
  },
  {
    question_text: "What is the purpose of charitable donation deductions?",
    correct_answer: "To reduce taxable income when donating to qualified organizations",
    incorrect_answers: [
      "To get money back from the charity",
      "To avoid paying sales tax",
      "To qualify for welfare benefits"
    ],
    explanation: "Donations to qualified charities can be deducted if you itemize, reducing your taxable income. You need receipts for cash donations over $250.",
    difficulty_level: "beginner",
    category_id: 8
  },
  {
    question_text: "What is self-employment tax?",
    correct_answer: "Social Security and Medicare tax paid by self-employed individuals",
    incorrect_answers: [
      "An additional penalty for working for yourself",
      "Tax on business equipment purchases",
      "State tax for having a business license"
    ],
    explanation: "Self-employed individuals pay both the employee and employer portions of FICA taxes (15.3% total), but can deduct half as an adjustment to income.",
    difficulty_level: "beginner",
    category_id: 8
  },
  {
    question_text: "What does it mean to 'itemize deductions'?",
    correct_answer: "To list individual deductible expenses instead of taking the standard deduction",
    incorrect_answers: [
      "To file separate tax returns for each income source",
      "To create a payment plan for taxes owed",
      "To report each item you purchased during the year"
    ],
    explanation: "Itemizing means listing deductible expenses (mortgage interest, state taxes, charitable donations, etc.) instead of taking the standard deduction. Only worth it if total exceeds the standard deduction.",
    difficulty_level: "beginner",
    category_id: 8
  },
  {
    question_text: "What is a tax audit?",
    correct_answer: "An IRS examination of your tax return to verify accuracy",
    incorrect_answers: [
      "An automatic review of all tax returns",
      "A criminal investigation into tax fraud",
      "A refund calculation process"
    ],
    explanation: "A tax audit is when the IRS reviews your return and supporting documents to ensure accuracy. Most are correspondence audits handled by mail.",
    difficulty_level: "beginner",
    category_id: 8
  },

  // INTERMEDIATE LEVEL (25 questions)
  {
    question_text: "What is the difference between short-term and long-term capital gains tax rates?",
    correct_answer: "Short-term (under 1 year) is taxed as ordinary income; long-term (over 1 year) has lower preferential rates",
    incorrect_answers: [
      "They have the same tax rate",
      "Short-term has lower rates to encourage trading",
      "Long-term gains are tax-free"
    ],
    explanation: "Assets held over one year qualify for long-term capital gains rates (0%, 15%, or 20%), while assets held less than one year are taxed at your ordinary income rate (up to 37%).",
    difficulty_level: "intermediate",
    category_id: 8
  },
  {
    question_text: "What is a Health Savings Account (HSA) and how is it tax-advantaged?",
    correct_answer: "Tax-deductible contributions, tax-free growth, and tax-free withdrawals for medical expenses",
    incorrect_answers: [
      "Tax-free contributions but taxed on withdrawal",
      "Taxable contributions but tax-free growth",
      "Only tax-free for people over 65"
    ],
    explanation: "HSAs offer triple tax benefits: contributions are tax-deductible, money grows tax-free, and withdrawals for qualified medical expenses are tax-free. Must have a high-deductible health plan.",
    difficulty_level: "intermediate",
    category_id: 8
  },
  {
    question_text: "What is the Alternative Minimum Tax (AMT)?",
    correct_answer: "A parallel tax system ensuring high earners pay a minimum amount of tax",
    incorrect_answers: [
      "A penalty for filing taxes late",
      "A lower tax rate for small businesses",
      "An optional simplified tax calculation"
    ],
    explanation: "AMT prevents wealthy taxpayers from using deductions to pay little or no tax. It adds back certain deductions and uses different rates (26% or 28%).",
    difficulty_level: "intermediate",
    category_id: 8
  },
  {
    question_text: "What is a Flexible Spending Account (FSA) and how does it work?",
    correct_answer: "Pre-tax contributions for medical/dependent care expenses that must be used by year-end",
    incorrect_answers: [
      "A savings account for retirement with tax-free growth",
      "An investment account for healthcare stocks",
      "A type of health insurance plan"
    ],
    explanation: "FSAs allow pre-tax contributions for eligible expenses, reducing taxable income. Most FSAs are 'use-it-or-lose-it' with limited rollover or grace period options.",
    difficulty_level: "intermediate",
    category_id: 8
  },
  {
    question_text: "What is the difference between marginal and effective tax rate?",
    correct_answer: "Marginal is the rate on your last dollar earned; effective is your total tax divided by total income",
    incorrect_answers: [
      "They are the same thing",
      "Marginal applies to state tax; effective applies to federal tax",
      "Effective is always higher than marginal"
    ],
    explanation: "Your marginal rate (highest bracket) determines the tax on additional income. Your effective rate is the average percentage of total income paid in taxes, and is always lower than your marginal rate.",
    difficulty_level: "intermediate",
    category_id: 8
  },
  {
    question_text: "What is the Student Loan Interest Deduction?",
    correct_answer: "An adjustment to income for up to $2,500 of student loan interest paid",
    incorrect_answers: [
      "A credit for the full amount of student loan interest",
      "A deduction for the loan principal amount",
      "Only available to students currently in school"
    ],
    explanation: "You can deduct up to $2,500 of student loan interest even without itemizing, subject to income limits. It reduces AGI, making it an 'above-the-line' deduction.",
    difficulty_level: "intermediate",
    category_id: 8
  },
  {
    question_text: "What is the SALT deduction cap?",
    correct_answer: "A $10,000 limit on deducting state and local taxes when itemizing",
    incorrect_answers: [
      "A limit on how much salt you can claim as a business expense",
      "The maximum federal tax rate",
      "A cap on property tax assessments"
    ],
    explanation: "The Tax Cuts and Jobs Act of 2017 capped the state and local tax (SALT) deduction at $10,000, affecting taxpayers in high-tax states who itemize.",
    difficulty_level: "intermediate",
    category_id: 8
  },
  {
    question_text: "What is a qualified dividend for tax purposes?",
    correct_answer: "Dividends from U.S. corporations held for required periods, taxed at capital gains rates",
    incorrect_answers: [
      "Any dividend from any stock",
      "Dividends automatically reinvested",
      "Dividends over $1,000"
    ],
    explanation: "Qualified dividends are taxed at preferential long-term capital gains rates (0%, 15%, or 20%) instead of ordinary income rates. Stock must be held for specific periods.",
    difficulty_level: "intermediate",
    category_id: 8
  },
  {
    question_text: "What is the Saver's Credit?",
    correct_answer: "A credit for low to moderate-income taxpayers who contribute to retirement accounts",
    incorrect_answers: [
      "A credit for having a savings account",
      "A deduction for retirement plan contributions",
      "A penalty for not saving enough"
    ],
    explanation: "The Retirement Savings Contributions Credit offers 10%, 20%, or 50% of contributions up to $2,000 ($4,000 for joint filers) to retirement accounts, based on income.",
    difficulty_level: "intermediate",
    category_id: 8
  },
  {
    question_text: "What is basis in an investment and why does it matter for taxes?",
    correct_answer: "Your original cost plus adjustments, used to calculate capital gains",
    incorrect_answers: [
      "The current market value of your investment",
      "The annual dividend yield",
      "The minimum amount you must invest"
    ],
    explanation: "Basis is what you paid for an asset. When sold, gain = sale price - basis. Tracking basis is crucial for accurate capital gains calculations.",
    difficulty_level: "intermediate",
    category_id: 8
  },
  {
    question_text: "What is the wash sale rule?",
    correct_answer: "You can't claim a loss if you buy the same or substantially identical security within 30 days",
    incorrect_answers: [
      "You must wait 30 days between selling any stocks",
      "A rule for laundering money",
      "A requirement to wash your hands before trading"
    ],
    explanation: "If you sell a security at a loss and buy it back within 30 days before or after, the loss is disallowed for tax purposes. The loss is added to the basis of the new position.",
    difficulty_level: "intermediate",
    category_id: 8
  },
  {
    question_text: "What is the kiddie tax?",
    correct_answer: "A tax on unearned income over a threshold for children under 19 (or 24 if a student)",
    incorrect_answers: [
      "A tax on income from child actors",
      "A penalty for claiming children as dependents",
      "A special low tax rate for children"
    ],
    explanation: "The kiddie tax prevents parents from shifting investment income to children to take advantage of lower brackets. Unearned income over $2,500 (2024) is taxed at the parent's rate.",
    difficulty_level: "intermediate",
    category_id: 8
  },
  {
    question_text: "What is the Net Investment Income Tax (NIIT)?",
    correct_answer: "An additional 3.8% tax on investment income for high earners",
    incorrect_answers: [
      "A tax on all investment income for everyone",
      "A penalty for day trading",
      "A state tax on investments"
    ],
    explanation: "The NIIT is a 3.8% surtax on investment income (interest, dividends, capital gains) for individuals with MAGI over $200,000 (single) or $250,000 (married filing jointly).",
    difficulty_level: "intermediate",
    category_id: 8
  },
  {
    question_text: "What is the difference between a traditional IRA contribution deduction and a Roth IRA contribution?",
    correct_answer: "Traditional IRA contributions may be tax-deductible now; Roth contributions are not deductible but withdrawals are tax-free",
    incorrect_answers: [
      "Traditional IRA is never deductible; Roth always is",
      "They are both equally deductible",
      "Only traditional IRAs have contribution limits"
    ],
    explanation: "Traditional IRA contributions may be deductible (subject to income limits if covered by a workplace plan). Roth contributions aren't deductible, but qualified withdrawals in retirement are tax-free.",
    difficulty_level: "intermediate",
    category_id: 8
  },
  {
    question_text: "What is the excess 401(k) contribution penalty?",
    correct_answer: "Double taxation - taxed when contributed and again when withdrawn",
    incorrect_answers: [
      "A flat 10% penalty on the excess amount",
      "Inability to contribute next year",
      "Automatic audit by the IRS"
    ],
    explanation: "If you exceed the 401(k) contribution limit ($22,500 for 2023, $23,000 for 2024), excess amounts are taxed as income that year and again when withdrawn if not corrected.",
    difficulty_level: "intermediate",
    category_id: 8
  },
  {
    question_text: "What are estimated tax payment safe harbor rules?",
    correct_answer: "Pay 100% (or 110% if high earner) of last year's tax or 90% of current year's tax to avoid penalties",
    incorrect_answers: [
      "Always pay exactly 25% each quarter",
      "Pay whatever you estimate you'll owe",
      "No safe harbor exists; all underpayments are penalized"
    ],
    explanation: "You avoid underpayment penalties if estimated payments equal 100% of last year's tax (110% if AGI > $150,000) or 90% of current year's tax, even if you owe more at filing.",
    difficulty_level: "intermediate",
    category_id: 8
  },
  {
    question_text: "What is the American Opportunity Tax Credit (AOTC)?",
    correct_answer: "A credit of up to $2,500 per student for the first 4 years of college",
    incorrect_answers: [
      "A credit for all education expenses",
      "A deduction for student loan interest",
      "A credit for job training programs"
    ],
    explanation: "The AOTC provides up to $2,500 per eligible student for the first four years of college, with 40% being refundable. It covers tuition, fees, and course materials.",
    difficulty_level: "intermediate",
    category_id: 8
  },
  {
    question_text: "What is the Lifetime Learning Credit?",
    correct_answer: "A credit of up to $2,000 per tax return for post-secondary and graduate education",
    incorrect_answers: [
      "A credit that can be claimed every year for life",
      "The same as the American Opportunity Credit",
      "A credit only for online learning"
    ],
    explanation: "The Lifetime Learning Credit is worth up to $2,000 per tax return (not per student) for undergraduate, graduate, and professional degree courses, with no limit on years claimed.",
    difficulty_level: "intermediate",
    category_id: 8
  },
  {
    question_text: "What is depreciation for tax purposes?",
    correct_answer: "Deducting the cost of business assets over their useful life",
    incorrect_answers: [
      "The decrease in value of personal property",
      "A penalty for old equipment",
      "Interest charged on business loans"
    ],
    explanation: "Depreciation allows businesses to deduct the cost of tangible assets (equipment, vehicles, buildings) over time rather than all at once, matching expense to income generation.",
    difficulty_level: "intermediate",
    category_id: 8
  },
  {
    question_text: "What is the home office deduction?",
    correct_answer: "A deduction for a portion of home expenses for a space used regularly and exclusively for business",
    incorrect_answers: [
      "Any space where you occasionally work from home",
      "Only available to employees",
      "100% of all home expenses if you work from home"
    ],
    explanation: "Self-employed individuals can deduct home office expenses (mortgage interest, utilities, depreciation) for space used regularly and exclusively for business. Employees generally cannot claim this post-2017.",
    difficulty_level: "intermediate",
    category_id: 8
  },
  {
    question_text: "What is cost basis adjustment for inherited property (step-up)?",
    correct_answer: "Basis is adjusted to fair market value at the date of death",
    incorrect_answers: [
      "Basis remains what the deceased originally paid",
      "Basis is always zero for inherited property",
      "Basis is the value when the will was written"
    ],
    explanation: "Inherited property receives a 'step-up' in basis to the fair market value at death, eliminating capital gains on appreciation during the deceased's lifetime.",
    difficulty_level: "intermediate",
    category_id: 8
  },
  {
    question_text: "What is the Child and Dependent Care Credit?",
    correct_answer: "A credit for expenses to care for dependents while you work",
    incorrect_answers: [
      "The same as the Child Tax Credit",
      "A deduction for all expenses related to children",
      "Only available for daycare, not other care"
    ],
    explanation: "This credit is 20-35% of up to $3,000 of care expenses for one dependent or $6,000 for two or more, for care that enables you to work or look for work.",
    difficulty_level: "intermediate",
    category_id: 8
  },
  {
    question_text: "What is tax-loss harvesting?",
    correct_answer: "Selling investments at a loss to offset capital gains",
    incorrect_answers: [
      "Collecting refunds from previous years",
      "Growing crops for tax deductions",
      "Avoiding taxes on all investment gains"
    ],
    explanation: "Tax-loss harvesting involves selling losing investments to offset capital gains (and up to $3,000 of ordinary income), while maintaining desired portfolio allocation by purchasing similar investments.",
    difficulty_level: "intermediate",
    category_id: 8
  },
  {
    question_text: "What is the penalty for early withdrawal from a traditional IRA?",
    correct_answer: "10% penalty plus ordinary income tax on the distribution",
    incorrect_answers: [
      "Only income tax, no penalty",
      "50% penalty",
      "Loss of all future IRA contribution rights"
    ],
    explanation: "Withdrawals before age 59½ from traditional IRAs generally incur a 10% penalty plus ordinary income tax, though exceptions exist for first home, education, disability, and other circumstances.",
    difficulty_level: "intermediate",
    category_id: 8
  },
  {
    question_text: "What is a Section 179 deduction?",
    correct_answer: "An immediate deduction for the full cost of qualifying business equipment purchases",
    incorrect_answers: [
      "A type of depreciation over 7 years",
      "A deduction for business mileage",
      "A penalty for excess business expenses"
    ],
    explanation: "Section 179 allows businesses to deduct the full purchase price of qualifying equipment in the year purchased, up to $1,160,000 (2023), instead of depreciating over time.",
    difficulty_level: "intermediate",
    category_id: 8
  },

  // ADVANCED LEVEL (20 questions)
  {
    question_text: "What is the backdoor Roth IRA strategy?",
    correct_answer: "Contributing to a traditional IRA then converting to Roth to bypass income limits",
    incorrect_answers: [
      "An illegal tax avoidance scheme",
      "Contributing more than the limit through multiple accounts",
      "Using a relative's account to exceed limits"
    ],
    explanation: "High earners who can't contribute directly to Roth IRAs can contribute to a non-deductible traditional IRA and immediately convert to Roth. Be aware of the pro-rata rule if you have other traditional IRA balances.",
    difficulty_level: "advanced",
    category_id: 8
  },
  {
    question_text: "What is the pro-rata rule for IRA conversions?",
    correct_answer: "Conversions are proportionally taxed based on the ratio of pre-tax to after-tax IRA balances",
    incorrect_answers: [
      "You can choose which dollars to convert first",
      "Only non-deductible contributions are converted tax-free",
      "Each IRA account is treated separately"
    ],
    explanation: "All traditional, SEP, and SIMPLE IRAs are aggregated. If 80% of total IRA balances are pre-tax, then 80% of any conversion is taxable, regardless of which account you convert from.",
    difficulty_level: "advanced",
    category_id: 8
  },
  {
    question_text: "What is IRMAA and how does it relate to Medicare?",
    correct_answer: "Income-Related Monthly Adjustment Amount - higher Medicare premiums for high earners based on MAGI from 2 years prior",
    incorrect_answers: [
      "A penalty for not having Medicare",
      "A tax credit for Medicare recipients",
      "An additional Medicare tax on wages"
    ],
    explanation: "IRMAA increases Medicare Part B and Part D premiums based on modified AGI from two years ago. 2024 premiums are based on 2022 income, with surcharges starting at $103,000 (single) or $206,000 (married).",
    difficulty_level: "advanced",
    category_id: 8
  },
  {
    question_text: "What is the mega backdoor Roth strategy?",
    correct_answer: "Making after-tax contributions to a 401(k) beyond the normal limit, then converting to Roth",
    incorrect_answers: [
      "Contributing to multiple Roth accounts to exceed limits",
      "The same as a regular backdoor Roth",
      "An illegal tax shelter"
    ],
    explanation: "If your 401(k) allows after-tax contributions and in-service withdrawals/conversions, you can contribute beyond the $22,500 limit up to the total $66,000 limit (2023), then convert to Roth.",
    difficulty_level: "advanced",
    category_id: 8
  },
  {
    question_text: "What is the Social Security tax torpedo?",
    correct_answer: "A zone where Social Security benefits become taxable, creating marginal rates of 40.7-46.25%",
    incorrect_answers: [
      "A penalty for claiming Social Security early",
      "Additional FICA tax in retirement",
      "A reduction in benefits for high earners"
    ],
    explanation: "As income increases, up to 85% of Social Security becomes taxable. In the transition zone, each additional dollar of income can trigger taxation of $0.85 of benefits, creating effective marginal rates much higher than the nominal bracket.",
    difficulty_level: "advanced",
    category_id: 8
  },
  {
    question_text: "What is a Qualified Charitable Distribution (QCD)?",
    correct_answer: "A direct transfer from an IRA to charity for those 70½+, satisfying RMDs tax-free",
    incorrect_answers: [
      "Any charitable donation from any account",
      "A special type of charitable trust",
      "A deduction for large charitable gifts"
    ],
    explanation: "Starting at age 70½, you can transfer up to $100,000 annually directly from an IRA to qualified charities. It counts toward RMDs but isn't included in taxable income, potentially avoiding IRMAA and taxation of Social Security.",
    difficulty_level: "advanced",
    category_id: 8
  },
  {
    question_text: "What is the Net Unrealized Appreciation (NUA) strategy?",
    correct_answer: "Distributing appreciated company stock from a 401(k) to pay capital gains tax instead of ordinary income tax",
    incorrect_answers: [
      "A way to avoid all taxes on company stock",
      "A penalty for holding too much company stock",
      "Only available for executives"
    ],
    explanation: "When taking a lump-sum distribution of employer stock, you can elect to pay ordinary income tax only on the cost basis, with appreciation taxed as long-term capital gains when sold, potentially saving significant taxes.",
    difficulty_level: "advanced",
    category_id: 8
  },
  {
    question_text: "What is the substantially equal periodic payment (SEPP/72(t)) exception?",
    correct_answer: "A method to avoid early withdrawal penalties by taking calculated equal payments for 5 years or until age 59½",
    incorrect_answers: [
      "A penalty for unequal retirement account withdrawals",
      "A requirement for all retirees",
      "A way to access unlimited retirement funds penalty-free"
    ],
    explanation: "SEPP allows penalty-free withdrawals before 59½ using IRS-approved calculation methods (RMD, amortization, or annuitization). Once started, payments must continue for 5 years or until age 59½, whichever is longer.",
    difficulty_level: "advanced",
    category_id: 8
  },
  {
    question_text: "What is the 0% capital gains bracket strategy?",
    correct_answer: "Realizing long-term capital gains while in the 10-12% tax brackets to pay 0% capital gains tax",
    incorrect_answers: [
      "A method to never pay capital gains tax",
      "Only available in retirement",
      "Requires special IRS approval"
    ],
    explanation: "For 2024, if your taxable income including long-term capital gains stays under $47,025 (single) or $94,050 (married), those gains are taxed at 0%. Strategic realization can harvest gains tax-free while raising basis.",
    difficulty_level: "advanced",
    category_id: 8
  },
  {
    question_text: "What is the gift tax annual exclusion and lifetime exemption for 2024?",
    correct_answer: "Annual exclusion of $18,000 per recipient; lifetime exemption of $13.61 million per person",
    incorrect_answers: [
      "Annual exclusion of $10,000; lifetime exemption of $5 million",
      "No annual exclusion; only lifetime exemption of $1 million",
      "Annual exclusion of $15,000; no lifetime limit"
    ],
    explanation: "You can give $18,000 per person per year (2024) without filing a gift tax return. Amounts above this count against your lifetime exemption ($13.61M in 2024). Married couples can give double.",
    difficulty_level: "advanced",
    category_id: 8
  },
  {
    question_text: "What is a Grantor Retained Annuity Trust (GRAT)?",
    correct_answer: "An estate planning tool where you transfer assets, receive annuity payments, and pass appreciation to beneficiaries tax-free",
    incorrect_answers: [
      "A type of retirement account",
      "A penalty for excess retirement contributions",
      "A charitable giving strategy"
    ],
    explanation: "A GRAT allows you to transfer appreciating assets to a trust, receive annuity payments for a term, and if you survive the term, transfer any appreciation to beneficiaries without gift tax, assuming growth exceeds the IRS Section 7520 rate.",
    difficulty_level: "advanced",
    category_id: 8
  },
  {
    question_text: "What is the qualified business income (QBI) deduction under Section 199A?",
    correct_answer: "A deduction of up to 20% of qualified business income for pass-through entities and sole proprietors",
    incorrect_answers: [
      "A deduction only for C corporations",
      "A penalty for business losses",
      "The same as the standard deduction"
    ],
    explanation: "Section 199A allows eligible taxpayers to deduct up to 20% of QBI from sole proprietorships, partnerships, and S corps. Complex phase-outs and limitations apply based on income level and business type.",
    difficulty_level: "advanced",
    category_id: 8
  },
  {
    question_text: "What is an installment sale for tax purposes?",
    correct_answer: "Spreading capital gains tax over multiple years by receiving payments over time",
    incorrect_answers: [
      "Buying property in multiple transactions",
      "A payment plan for taxes owed",
      "Only available for real estate"
    ],
    explanation: "When selling property with at least one payment received after the tax year of sale, you can elect installment sale treatment to recognize gain proportionately as payments are received, deferring taxes.",
    difficulty_level: "advanced",
    category_id: 8
  },
  {
    question_text: "What is the excess business loss limitation?",
    correct_answer: "Non-corporate taxpayers cannot deduct business losses exceeding $289,000 (single) or $578,000 (married) for 2023",
    incorrect_answers: [
      "A penalty for profitable businesses",
      "Only applies to corporations",
      "No limit exists on business losses"
    ],
    explanation: "The TCJA added this limitation preventing individuals from using business losses to offset non-business income beyond the threshold. Disallowed losses carry forward as NOLs.",
    difficulty_level: "advanced",
    category_id: 8
  },
  {
    question_text: "What is the passive activity loss (PAL) limitation?",
    correct_answer: "Passive losses can only offset passive income, not wages or portfolio income",
    incorrect_answers: [
      "All investment losses are limited",
      "Only applies to rental real estate",
      "Passive income is tax-free"
    ],
    explanation: "Passive losses (from businesses where you don't materially participate) can only offset passive income. Exception: Real estate professionals can deduct rental losses. Up to $25,000 of rental losses may be deductible if AGI < $100,000.",
    difficulty_level: "advanced",
    category_id: 8
  },
  {
    question_text: "What is a 1031 like-kind exchange?",
    correct_answer: "Deferring capital gains tax by exchanging investment real estate for similar property",
    incorrect_answers: [
      "Exchanging any asset tax-free",
      "A penalty for trading property too frequently",
      "Only available for primary residences"
    ],
    explanation: "Section 1031 allows deferral of capital gains when exchanging business or investment real estate for similar property. Must be properly structured with qualified intermediary and meet strict timing rules (45/180 days).",
    difficulty_level: "advanced",
    category_id: 8
  },
  {
    question_text: "What is the Section 121 home sale exclusion?",
    correct_answer: "Exclude up to $250,000 ($500,000 married) of gain from selling your primary residence if owned and lived in 2 of last 5 years",
    incorrect_answers: [
      "All home sales are tax-free",
      "Only available once in a lifetime",
      "Requires IRS pre-approval"
    ],
    explanation: "If you owned and lived in a home as your primary residence for at least 2 of the 5 years before selling, you can exclude up to $250,000 ($500,000 if married filing jointly) of gain. Can use multiple times.",
    difficulty_level: "advanced",
    category_id: 8
  },
  {
    question_text: "What is recapture of depreciation on real estate?",
    correct_answer: "Previously claimed depreciation is taxed at 25% (plus state) when selling rental property",
    incorrect_answers: [
      "A refund of depreciation claimed in error",
      "Taxed at ordinary income rates",
      "No tax on depreciation claimed"
    ],
    explanation: "When selling rental real estate, depreciation claimed reduces basis. The portion of gain equal to depreciation is taxed at a maximum 25% (unrecaptured Section 1250 gain), while remaining gain qualifies for long-term capital gains rates.",
    difficulty_level: "advanced",
    category_id: 8
  },
  {
    question_text: "What is the opportunity zone tax benefit?",
    correct_answer: "Deferral and potential reduction of capital gains by investing in designated economically distressed areas",
    incorrect_answers: [
      "Tax credits for hiring in poor neighborhoods",
      "Only available to real estate developers",
      "Eliminates all taxes on any investment"
    ],
    explanation: "Investing capital gains in Qualified Opportunity Funds within 180 days allows deferral until 2026 (or asset sale), 10% basis step-up after 5 years, 15% after 7 years, and complete exclusion of QOF appreciation if held 10+ years.",
    difficulty_level: "advanced",
    category_id: 8
  },
  {
    question_text: "What is the stacking of Roth conversion income strategy?",
    correct_answer: "Converting traditional IRA to Roth in low-income years to fill lower tax brackets before they're used by other income",
    incorrect_answers: [
      "Converting multiple IRAs simultaneously",
      "An illegal tax avoidance scheme",
      "Only available to retirees"
    ],
    explanation: "Strategic Roth conversions in years with lower income (early retirement, sabbatical, business loss) can fill the 0%, 10%, and 12% brackets before RMDs begin, reducing lifetime taxes and avoiding future IRMAA and Social Security taxation.",
    difficulty_level: "advanced",
    category_id: 8
  }
]

async function uploadQuestions() {
  console.log('Starting upload of Category 8: Taxes questions...')
  
  for (let i = 0; i < CATEGORY_8_TAXES.length; i++) {
    const q = CATEGORY_8_TAXES[i]
    
    // Transform to match database schema
    const options = [...(q.incorrect_answers || []), q.correct_answer].sort(() => Math.random() - 0.5)
    const questionForDB = {
      category_id: q.category_id,
      question_text: q.question_text,
      question_type: 'multiple_choice',
      difficulty_level: q.difficulty_level,
      options: options,
      correct_answer: q.correct_answer,
      explanation: q.explanation,
      topics: []
    }
    
    const { data, error } = await supabase
      .from('quiz_questions')
      .insert([questionForDB])
    
    if (error) {
      console.error(`Error uploading question ${i + 1}:`, error)
    } else {
      console.log(`✓ Uploaded question ${i + 1}/${CATEGORY_8_TAXES.length}`)
    }
  }
  
  console.log('\n✅ Upload complete!')
  console.log(`Total questions uploaded: ${CATEGORY_8_TAXES.length}`)
  console.log('Breakdown:')
  console.log(`- Beginner: ${CATEGORY_8_TAXES.filter(q => q.difficulty_level === 'beginner').length}`)
  console.log(`- Intermediate: ${CATEGORY_8_TAXES.filter(q => q.difficulty_level === 'intermediate').length}`)
  console.log(`- Advanced: ${CATEGORY_8_TAXES.filter(q => q.difficulty_level === 'advanced').length}`)
}

// Auto-run on execute
uploadQuestions()

export { CATEGORY_8_TAXES }
