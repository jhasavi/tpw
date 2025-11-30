import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const CATEGORY_6_RETIREMENT = [
  // BEGINNER LEVEL (25 questions)
  {
    category_id: 6,
    question_text: "What is a 401(k)?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "A type of savings account",
      "An employer-sponsored retirement savings plan",
      "A government benefit program",
      "A type of investment"
    ],
    correct_answer: "An employer-sponsored retirement savings plan",
    explanation: "A 401(k) is a tax-advantaged retirement savings plan offered by employers. You contribute pre-tax dollars, which grow tax-deferred until withdrawal in retirement.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["401k", "retirement-accounts", "basics"]
  },
  {
    category_id: 6,
    question_text: "What is an employer match in a 401(k)?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "Your employer contributes based on your contribution",
      "Your employer pays all fees",
      "Guaranteed investment returns",
      "A loan from your employer"
    ],
    correct_answer: "Your employer contributes based on your contribution",
    explanation: "An employer match is free money! If your employer matches 50% up to 6%, and you contribute 6% of salary, they add another 3%. This is an immediate 50% return on your contribution.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["employer-match", "401k", "free-money"]
  },
  {
    category_id: 6,
    question_text: "What is the main difference between a Traditional and Roth 401(k)?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "Traditional: pre-tax contributions, taxed withdrawals; Roth: after-tax contributions, tax-free withdrawals",
      "Traditional is for young people; Roth for older",
      "Traditional has higher limits",
      "No difference"
    ],
    correct_answer: "Traditional: pre-tax contributions, taxed withdrawals; Roth: after-tax contributions, tax-free withdrawals",
    explanation: "Traditional 401(k) reduces taxable income now but taxes withdrawals. Roth 401(k) uses after-tax money but qualified withdrawals are completely tax-free—powerful for retirement.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["Traditional-401k", "Roth-401k", "taxes"]
  },
  {
    category_id: 6,
    question_text: "What is vesting in a retirement plan?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "How long before employer contributions are yours to keep",
      "Type of investment option",
      "Retirement age requirement",
      "Tax penalty"
    ],
    correct_answer: "How long before employer contributions are yours to keep",
    explanation: "Vesting determines when employer contributions become yours. With 3-year cliff vesting, you must stay 3 years to keep the match. Your own contributions are always 100% vested.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["vesting", "employer-contributions", "retention"]
  },
  {
    category_id: 6,
    question_text: "At what age can you withdraw from a 401(k) without penalty?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "55",
      "59½",
      "62",
      "65"
    ],
    correct_answer: "59½",
    explanation: "You can withdraw from retirement accounts penalty-free starting at age 59½. Withdrawals before this typically incur a 10% early withdrawal penalty plus regular income taxes.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["withdrawal-age", "penalties", "rules"]
  },
  {
    category_id: 6,
    question_text: "What is an IRA?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "Individual Retirement Account",
      "Insurance Retirement Annuity",
      "International Revenue Account",
      "Investment Return Average"
    ],
    correct_answer: "Individual Retirement Account",
    explanation: "An IRA is an Individual Retirement Account you open independently (not through an employer). It offers tax advantages for retirement savings with annual contribution limits.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["IRA", "retirement-accounts", "basics"]
  },
  {
    category_id: 6,
    question_text: "What are Required Minimum Distributions (RMDs)?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "Minimum contributions required",
      "Mandatory withdrawals starting at age 73",
      "Investment minimums",
      "Employer match requirements"
    ],
    correct_answer: "Mandatory withdrawals starting at age 73",
    explanation: "RMDs are minimum amounts you must withdraw from Traditional 401(k)s and IRAs starting at age 73 (as of 2023). Roth IRAs don't have RMDs during the owner's lifetime.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["RMD", "withdrawals", "requirements"]
  },
  {
    category_id: 6,
    question_text: "You should always contribute enough to get the full employer match.",
    question_type: "true_false",
    difficulty_level: "beginner",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "Employer match is free money with an immediate 50-100% return. Not contributing enough to get the full match means leaving free money on the table—make this your top priority.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["employer-match", "strategy", "priority"]
  },
  {
    category_id: 6,
    question_text: "What is Social Security?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "Government retirement benefit based on work history",
      "Private pension plan",
      "Type of 401(k)",
      "Investment account"
    ],
    correct_answer: "Government retirement benefit based on work history",
    explanation: "Social Security is a federal program providing monthly benefits in retirement based on your lifetime earnings. You earn credits by working and paying Social Security taxes.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["Social-Security", "government-benefits", "basics"]
  },
  {
    category_id: 6,
    question_text: "What is the earliest age you can claim Social Security retirement benefits?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "55",
      "59½",
      "62",
      "67"
    ],
    correct_answer: "62",
    explanation: "You can claim Social Security as early as 62, but benefits are permanently reduced by up to 30%. Waiting until Full Retirement Age (67 for most) or age 70 increases your monthly benefit.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["Social-Security", "claiming-age", "benefits"]
  },
  {
    category_id: 6,
    question_text: "What is a pension?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "Employer-paid retirement benefit providing monthly income",
      "Personal savings account",
      "Type of 401(k)",
      "Government welfare"
    ],
    correct_answer: "Employer-paid retirement benefit providing monthly income",
    explanation: "A pension (defined benefit plan) promises a specific monthly benefit in retirement, typically based on salary and years of service. Rare in private sector but common for government employees.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["pension", "defined-benefit", "retirement-income"]
  },
  {
    category_id: 6,
    question_text: "What does 'tax-deferred' mean in retirement accounts?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "You don't pay taxes on growth until withdrawal",
      "You never pay taxes",
      "Taxes are higher",
      "You pay taxes immediately"
    ],
    correct_answer: "You don't pay taxes on growth until withdrawal",
    explanation: "Tax-deferred means you don't pay taxes on investment gains, dividends, or interest as they accumulate. You only pay taxes when you withdraw the money in retirement.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["tax-deferred", "taxes", "growth"]
  },
  {
    category_id: 6,
    question_text: "What is Full Retirement Age (FRA) for Social Security?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "62",
      "65",
      "66-67 (depending on birth year)",
      "70"
    ],
    correct_answer: "66-67 (depending on birth year)",
    explanation: "Full Retirement Age is when you receive 100% of your Social Security benefit. It's 66-67 depending on birth year. Born 1960 or later = age 67.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["FRA", "Social-Security", "age"]
  },
  {
    category_id: 6,
    question_text: "Can you contribute to both a 401(k) and an IRA?",
    question_type: "true_false",
    difficulty_level: "beginner",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "Yes! You can contribute to both a 401(k) and an IRA in the same year. Each has separate contribution limits, allowing you to save more for retirement with tax advantages.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["401k", "IRA", "contribution-limits"]
  },
  {
    category_id: 6,
    question_text: "What is a rollover?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "Moving retirement funds between accounts without tax penalty",
      "Reinvesting dividends",
      "Early withdrawal",
      "Employer contribution"
    ],
    correct_answer: "Moving retirement funds between accounts without tax penalty",
    explanation: "A rollover transfers retirement funds from one account to another (e.g., old 401(k) to IRA) without taxes or penalties if done correctly within 60 days.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["rollover", "transfer", "portability"]
  },
  {
    category_id: 6,
    question_text: "What is the 401(k) contribution limit for 2024?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "$19,500",
      "$20,500",
      "$22,500",
      "$23,000"
    ],
    correct_answer: "$23,000",
    explanation: "The 2024 401(k) contribution limit is $23,000 for those under 50. Those 50+ can contribute an additional $7,500 catch-up contribution for a total of $30,500.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["contribution-limits", "401k", "2024"]
  },
  {
    category_id: 6,
    question_text: "What is a catch-up contribution?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "Extra contributions allowed for those 50+",
      "Making up missed contributions",
      "Employer bonus",
      "Penalty payment"
    ],
    correct_answer: "Extra contributions allowed for those 50+",
    explanation: "Catch-up contributions allow people 50+ to save extra beyond normal limits. For 2024, that's an additional $7,500 to 401(k)s and $1,000 to IRAs.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["catch-up", "age-50", "extra-savings"]
  },
  {
    category_id: 6,
    question_text: "What is a SEP IRA?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "Simplified Employee Pension for self-employed and small business",
      "Standard Employee Plan",
      "Senior Executive Program",
      "Special Emergency Plan"
    ],
    correct_answer: "Simplified Employee Pension for self-employed and small business",
    explanation: "SEP IRA is a retirement plan for self-employed individuals and small business owners with higher contribution limits (up to 25% of compensation or $66,000 in 2024).",
    points: 10,
    time_limit_seconds: 30,
    tags: ["SEP-IRA", "self-employed", "small-business"]
  },
  {
    category_id: 6,
    question_text: "What is a target-date fund in a 401(k)?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "Fund that automatically becomes more conservative as you near retirement",
      "Fund with guaranteed returns",
      "Fund that expires",
      "High-risk investment"
    ],
    correct_answer: "Fund that automatically becomes more conservative as you near retirement",
    explanation: "Target-date funds (e.g., 'Target 2050') automatically shift from stocks to bonds as you approach retirement, providing a hands-off investment strategy.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["target-date", "automatic", "glide-path"]
  },
  {
    category_id: 6,
    question_text: "Roth IRAs have Required Minimum Distributions (RMDs).",
    question_type: "true_false",
    difficulty_level: "beginner",
    options: ["True", "False"],
    correct_answer: "False",
    explanation: "Roth IRAs do NOT have RMDs during the owner's lifetime. This makes them great for estate planning and allows tax-free growth to continue as long as you want.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["Roth-IRA", "RMD", "estate-planning"]
  },
  {
    category_id: 6,
    question_text: "What is a Roth IRA conversion?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "Converting Traditional IRA to Roth IRA (pay taxes now)",
      "Converting stocks to bonds",
      "Changing investment options",
      "Closing an account"
    ],
    correct_answer: "Converting Traditional IRA to Roth IRA (pay taxes now)",
    explanation: "A Roth conversion moves money from a Traditional IRA to Roth IRA. You pay taxes on the converted amount now, but future growth and qualified withdrawals are tax-free.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["Roth-conversion", "tax-strategy", "planning"]
  },
  {
    category_id: 6,
    question_text: "What happens if you withdraw from a 401(k) before age 59½?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "10% penalty plus income taxes (with some exceptions)",
      "No penalty",
      "Only income taxes",
      "Account is closed"
    ],
    correct_answer: "10% penalty plus income taxes (with some exceptions)",
    explanation: "Early withdrawals typically face a 10% penalty plus regular income taxes. Exceptions include first home purchase ($10k), certain medical expenses, disability, and substantially equal periodic payments.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["early-withdrawal", "penalty", "exceptions"]
  },
  {
    category_id: 6,
    question_text: "What is the IRA contribution limit for 2024?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "$5,500",
      "$6,000",
      "$6,500",
      "$7,000"
    ],
    correct_answer: "$7,000",
    explanation: "The 2024 IRA contribution limit is $7,000 for those under 50. Those 50+ can contribute an additional $1,000 catch-up for a total of $8,000.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["IRA", "contribution-limits", "2024"]
  },
  {
    category_id: 6,
    question_text: "What is a 403(b)?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "Retirement plan for non-profit and public education employees",
      "Type of IRA",
      "Government pension",
      "Health savings account"
    ],
    correct_answer: "Retirement plan for non-profit and public education employees",
    explanation: "A 403(b) is similar to a 401(k) but for employees of schools, hospitals, and non-profits. It has the same contribution limits and tax advantages as a 401(k).",
    points: 10,
    time_limit_seconds: 30,
    tags: ["403b", "non-profit", "education"]
  },
  {
    category_id: 6,
    question_text: "Starting retirement savings early is more important than how much you save initially.",
    question_type: "true_false",
    difficulty_level: "beginner",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "Due to compound interest, starting early—even with small amounts—can result in more wealth than starting late with larger contributions. Time in the market beats timing the market.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["compound-interest", "time", "early-start"]
  },

  // INTERMEDIATE LEVEL (25 questions)
  {
    category_id: 6,
    question_text: "What is the backdoor Roth IRA strategy?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Contributing to Traditional IRA, then converting to Roth to bypass income limits",
      "Illegal tax avoidance",
      "Withdrawing early without penalty",
      "Employer match strategy"
    ],
    correct_answer: "Contributing to Traditional IRA, then converting to Roth to bypass income limits",
    explanation: "High earners can't contribute directly to Roth IRAs. The backdoor Roth involves contributing to a non-deductible Traditional IRA, then immediately converting to Roth—perfectly legal.",
    points: 15,
    time_limit_seconds: 45,
    tags: ["backdoor-Roth", "high-income", "strategy"]
  },
  {
    category_id: 6,
    question_text: "What is the mega backdoor Roth strategy?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Contributing after-tax to 401(k), then converting to Roth 401(k)/IRA",
      "Making large Roth IRA contributions",
      "Employer match acceleration",
      "Withdrawal strategy"
    ],
    correct_answer: "Contributing after-tax to 401(k), then converting to Roth 401(k)/IRA",
    explanation: "If your 401(k) allows after-tax contributions beyond the $23k limit (up to $69k total in 2024), you can convert these to Roth for massive tax-free growth.",
    points: 15,
    time_limit_seconds: 45,
    tags: ["mega-backdoor", "after-tax", "advanced-strategy"]
  },
  {
    category_id: 6,
    question_text: "What is the Rule of 55?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Penalty-free 401(k) withdrawals if you leave job at 55+",
      "Retire at age 55",
      "Save 55% of income",
      "Social Security rule"
    ],
    correct_answer: "Penalty-free 401(k) withdrawals if you leave job at 55+",
    explanation: "If you leave your job in or after the year you turn 55, you can withdraw from that employer's 401(k) without the 10% early withdrawal penalty (doesn't apply to IRAs).",
    points: 15,
    time_limit_seconds: 45,
    tags: ["Rule-of-55", "early-retirement", "penalty-free"]
  },
  {
    category_id: 6,
    question_text: "What are substantially equal periodic payments (SEPP/72(t))?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "IRS-approved method for penalty-free early withdrawals",
      "Employer payment schedule",
      "Social Security payments",
      "Dividend distribution method"
    ],
    correct_answer: "IRS-approved method for penalty-free early withdrawals",
    explanation: "SEPP (72(t)) allows penalty-free early withdrawals if you take substantially equal payments for 5 years or until age 59½, whichever is longer. Complex but useful for early retirees.",
    points: 15,
    time_limit_seconds: 45,
    tags: ["SEPP", "72t", "early-withdrawal"]
  },
  {
    category_id: 6,
    question_text: "What is the pro-rata rule for IRA conversions?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Conversions are taxed based on ratio of after-tax to pre-tax dollars across ALL IRAs",
      "Converting a portion of your IRA",
      "Tax rate calculation",
      "Employer match formula"
    ],
    correct_answer: "Conversions are taxed based on ratio of after-tax to pre-tax dollars across ALL IRAs",
    explanation: "The pro-rata rule means you can't just convert non-deductible IRA contributions tax-free. The IRS looks at ALL your IRAs to determine what percentage is taxable.",
    points: 15,
    time_limit_seconds: 45,
    tags: ["pro-rata", "conversions", "taxes"]
  },
  {
    category_id: 6,
    question_text: "You're 40 with $200k in 401(k). How much should you have saved by age 67 to maintain lifestyle (assuming 4% rule)?",
    question_type: "scenario",
    difficulty_level: "intermediate",
    options: [
      "25 times annual expenses",
      "10 times annual expenses",
      "50 times annual expenses",
      "5 times annual expenses"
    ],
    correct_answer: "25 times annual expenses",
    explanation: "The 4% safe withdrawal rule suggests you need 25x your annual expenses (100% ÷ 4% = 25). If you need $60k/year, you need $1.5 million saved.",
    points: 15,
    time_limit_seconds: 45,
    tags: ["4-percent-rule", "retirement-target", "planning"]
  },
  {
    category_id: 6,
    question_text: "What is a Qualified Longevity Annuity Contract (QLAC)?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Annuity purchased with IRA funds that defers RMDs",
      "Long-term care insurance",
      "Life insurance policy",
      "Social Security extension"
    ],
    correct_answer: "Annuity purchased with IRA funds that defers RMDs",
    explanation: "QLACs allow you to use up to $200k of IRA/401(k) funds to buy an annuity starting at age 85, reducing RMDs and providing longevity insurance against outliving savings.",
    points: 15,
    time_limit_seconds: 45,
    tags: ["QLAC", "annuity", "longevity-insurance"]
  },
  {
    category_id: 6,
    question_text: "What is the difference between a safe harbor 401(k) and traditional 401(k)?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Safe harbor requires employer contributions but passes discrimination testing automatically",
      "Safe harbor is government-run",
      "Safe harbor has lower limits",
      "No difference"
    ],
    correct_answer: "Safe harbor requires employer contributions but passes discrimination testing automatically",
    explanation: "Safe harbor 401(k)s require employer contributions (typically 3-4% match or 3% non-elective) but automatically pass IRS non-discrimination testing, benefiting highly compensated employees.",
    points: 15,
    time_limit_seconds: 45,
    tags: ["safe-harbor", "401k", "employer-plans"]
  },
  {
    category_id: 6,
    question_text: "What is a qualified charitable distribution (QCD)?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Tax-free IRA donation to charity (age 70½+) counting toward RMD",
      "Charitable deduction",
      "Employer donation",
      "Gift to family"
    ],
    correct_answer: "Tax-free IRA donation to charity (age 70½+) counting toward RMD",
    explanation: "At 70½+, you can donate up to $105k/year directly from IRA to charity tax-free. This satisfies RMDs without increasing taxable income—great for those who don't need the money.",
    points: 15,
    time_limit_seconds: 45,
    tags: ["QCD", "charity", "tax-strategy"]
  },
  {
    category_id: 6,
    question_text: "What is the Roth IRA 5-year rule?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Must wait 5 years after opening before tax-free withdrawals of earnings",
      "Must contribute for 5 years minimum",
      "Can only withdraw after 5 years",
      "Penalty for withdrawing within 5 years"
    ],
    correct_answer: "Must wait 5 years after opening before tax-free withdrawals of earnings",
    explanation: "For Roth IRAs, you can always withdraw contributions tax/penalty-free. But earnings are only tax-free after both 5 years AND age 59½. Each conversion also has its own 5-year clock.",
    points: 15,
    time_limit_seconds: 45,
    tags: ["5-year-rule", "Roth-IRA", "withdrawals"]
  },
  {
    category_id: 6,
    question_text: "What is spousal IRA contribution?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Working spouse can contribute to non-working spouse's IRA",
      "Spouse inherits IRA",
      "Joint IRA account",
      "Doubling contribution limits"
    ],
    correct_answer: "Working spouse can contribute to non-working spouse's IRA",
    explanation: "A working spouse can contribute to an IRA for a non-working spouse, allowing couples to save $14k/year ($7k each) even with only one income.",
    points: 15,
    time_limit_seconds: 45,
    tags: ["spousal-IRA", "married", "contributions"]
  },
  {
    category_id: 6,
    question_text: "You earn $300k/year. Can you deduct Traditional IRA contributions if you have a 401(k)?",
    question_type: "scenario",
    difficulty_level: "intermediate",
    options: [
      "No, income too high for deduction with workplace plan",
      "Yes, fully deductible",
      "Partially deductible",
      "Only if married"
    ],
    correct_answer: "No, income too high for deduction with workplace plan",
    explanation: "With a workplace retirement plan, Traditional IRA deductions phase out at $77k-$87k (single) or $123k-$143k (married) in 2024. At $300k, you get no deduction—use backdoor Roth instead.",
    points: 15,
    time_limit_seconds: 45,
    tags: ["income-limits", "deduction", "phase-out"]
  },
  {
    category_id: 6,
    question_text: "What is the Saver's Credit?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Tax credit for low-to-moderate income savers (up to 50% of contributions)",
      "Employer match bonus",
      "Interest rate on savings",
      "Social Security benefit"
    ],
    correct_answer: "Tax credit for low-to-moderate income savers (up to 50% of contributions)",
    explanation: "The Saver's Credit gives 10-50% of your retirement contributions (up to $2k) back as a tax credit if income is below $36,500 (single) or $73k (married) in 2024.",
    points: 15,
    time_limit_seconds: 45,
    tags: ["Savers-Credit", "tax-credit", "low-income"]
  },
  {
    category_id: 6,
    question_text: "What is a defined contribution plan vs defined benefit plan?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "DC: account balance (401k); DB: guaranteed benefit (pension)",
      "DC is for executives; DB for employees",
      "DC is government; DB is private",
      "No difference"
    ],
    correct_answer: "DC: account balance (401k); DB: guaranteed benefit (pension)",
    explanation: "Defined Contribution (401k) defines what goes IN—your benefit depends on contributions and investment returns. Defined Benefit (pension) defines what comes OUT—guaranteed monthly payment.",
    points: 15,
    time_limit_seconds: 45,
    tags: ["DC", "DB", "plan-types"]
  },
  {
    category_id: 6,
    question_text: "What is the windfall elimination provision (WEP)?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Reduces Social Security if you have pension from non-covered employment",
      "Bonus for working longer",
      "Penalty for early claiming",
      "Tax on benefits"
    ],
    correct_answer: "Reduces Social Security if you have pension from non-covered employment",
    explanation: "WEP reduces Social Security benefits if you receive a pension from work where you didn't pay Social Security taxes (e.g., some government jobs). Can reduce benefits by up to 50% of pension amount.",
    points: 15,
    time_limit_seconds: 45,
    tags: ["WEP", "Social-Security", "pension"]
  },
  {
    category_id: 6,
    question_text: "What is a Solo 401(k)?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "401(k) for self-employed with no employees",
      "Individual retirement account",
      "Corporate pension",
      "Government plan"
    ],
    correct_answer: "401(k) for self-employed with no employees",
    explanation: "Solo 401(k)s allow self-employed individuals to contribute as both employee ($23k) and employer (up to 25% of compensation), potentially saving $69k in 2024—more than SEP IRA.",
    points: 15,
    time_limit_seconds: 45,
    tags: ["Solo-401k", "self-employed", "high-limits"]
  },
  {
    category_id: 6,
    question_text: "What happens to your 401(k) when you change jobs?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "You can leave it, roll to IRA, roll to new 401(k), or cash out",
      "You must cash out",
      "It disappears",
      "Employer keeps it"
    ],
    correct_answer: "You can leave it, roll to IRA, roll to new 401(k), or cash out",
    explanation: "You have 4 options: (1) leave with old employer, (2) roll to IRA for more investment options, (3) roll to new employer's 401(k), or (4) cash out (taxes + penalties—avoid!).",
    points: 15,
    time_limit_seconds: 45,
    tags: ["job-change", "rollover", "portability"]
  },
  {
    category_id: 6,
    question_text: "What is a Roth 401(k) conversion vs contribution?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Contribution: new money; Conversion: moving existing Traditional to Roth",
      "They're the same thing",
      "Conversion is from IRA only",
      "Contribution is only for high earners"
    ],
    correct_answer: "Contribution: new money; Conversion: moving existing Traditional to Roth",
    explanation: "Contributions are new money going into Roth 401(k) (after-tax). Conversions move existing Traditional 401(k) balances to Roth 401(k), triggering taxes but enabling tax-free future growth.",
    points: 15,
    time_limit_seconds: 45,
    tags: ["Roth-401k", "conversion", "contribution"]
  },
  {
    category_id: 6,
    question_text: "What is the government pension offset (GPO)?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Reduces spousal Social Security benefits if you have government pension",
      "Increases government worker benefits",
      "Extra pension payment",
      "Medicare offset"
    ],
    correct_answer: "Reduces spousal Social Security benefits if you have government pension",
    explanation: "GPO reduces spousal/survivor Social Security benefits by 2/3 of your government pension amount if that work didn't pay into Social Security. Can eliminate spousal benefits entirely.",
    points: 15,
    time_limit_seconds: 45,
    tags: ["GPO", "Social-Security", "government-pension"]
  },
  {
    category_id: 6,
    question_text: "What is a tiered vesting schedule?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Gradual vesting over time (e.g., 20% per year)",
      "Immediate 100% vesting",
      "No vesting ever",
      "Vesting only at retirement"
    ],
    correct_answer: "Gradual vesting over time (e.g., 20% per year)",
    explanation: "Tiered (graded) vesting gradually increases ownership of employer contributions over time. Example: 20% after year 1, 40% after year 2, etc., reaching 100% after 5-6 years.",
    points: 15,
    time_limit_seconds: 45,
    tags: ["vesting", "graded", "employer-contributions"]
  },
  {
    category_id: 6,
    question_text: "What is the phased retirement strategy?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Gradually reducing work hours while starting benefit withdrawals",
      "Retiring all at once",
      "Working full-time until death",
      "Never retiring"
    ],
    correct_answer: "Gradually reducing work hours while starting benefit withdrawals",
    explanation: "Phased retirement involves reducing work hours, starting Social Security at 62-67, and making partial retirement account withdrawals. This eases the transition and extends portfolio longevity.",
    points: 15,
    time_limit_seconds: 45,
    tags: ["phased-retirement", "gradual", "strategy"]
  },
  {
    category_id: 6,
    question_text: "Can you contribute to a Roth IRA if you earn $250k/year (married)?",
    question_type: "scenario",
    difficulty_level: "intermediate",
    options: [
      "No, above income limit; use backdoor Roth",
      "Yes, full contribution",
      "Yes, partial contribution",
      "Only if spouse doesn't work"
    ],
    correct_answer: "No, above income limit; use backdoor Roth",
    explanation: "Roth IRA contributions phase out at $230k-$240k (married) in 2024. At $250k, you can't contribute directly—but you CAN use the backdoor Roth strategy.",
    points: 15,
    time_limit_seconds: 45,
    tags: ["income-limits", "Roth-IRA", "backdoor"]
  },
  {
    category_id: 6,
    question_text: "What is the required beginning date (RBD) for RMDs?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "April 1 following year you turn 73",
      "January 1 of year you turn 73",
      "Your actual 73rd birthday",
      "December 31 of year you turn 73"
    ],
    correct_answer: "April 1 following year you turn 73",
    explanation: "Your first RMD must be taken by April 1 following the year you turn 73. Subsequent RMDs are due by December 31 each year. Delaying the first means taking two in one year (higher taxes).",
    points: 15,
    time_limit_seconds: 45,
    tags: ["RMD", "RBD", "deadlines"]
  },
  {
    category_id: 6,
    question_text: "What is an inherited IRA?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "IRA you receive from deceased owner with special distribution rules",
      "IRA you pass to children",
      "Joint IRA with spouse",
      "IRA from employer"
    ],
    correct_answer: "IRA you receive from deceased owner with special distribution rules",
    explanation: "Inherited IRAs have special rules. Non-spouse beneficiaries must typically distribute within 10 years (SECURE Act). Spouses can treat as their own or as inherited with more flexibility.",
    points: 15,
    time_limit_seconds: 45,
    tags: ["inherited-IRA", "beneficiary", "SECURE-Act"]
  },
  {
    category_id: 6,
    question_text: "What is the aggregate limit for all retirement contributions in 2024?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "$69,000 (including employer contributions)",
      "$23,000",
      "$50,000",
      "$100,000"
    ],
    correct_answer: "$69,000 (including employer contributions)",
    explanation: "The total 401(k) contribution limit (employee + employer + after-tax) is $69k in 2024, or $76.5k if 50+. This includes your $23k, employer match, and potential after-tax contributions.",
    points: 15,
    time_limit_seconds: 45,
    tags: ["contribution-limits", "aggregate", "total"]
  },

  // ADVANCED LEVEL (20 questions)
  {
    category_id: 6,
    question_text: "You're 60, retired, with $2M in Traditional IRA. What's your optimal Roth conversion strategy to minimize lifetime taxes?",
    question_type: "scenario",
    difficulty_level: "advanced",
    options: [
      "Convert up to top of 24% bracket each year before RMDs and Social Security",
      "Convert everything immediately",
      "Never convert",
      "Wait until 73 to convert"
    ],
    correct_answer: "Convert up to top of 24% bracket each year before RMDs and Social Security",
    explanation: "Convert strategically during the 60-73 'window' before RMDs and SS push you into higher brackets. Fill the 24% bracket yearly to avoid future 32%+ rates on RMDs.",
    points: 20,
    time_limit_seconds: 60,
    tags: ["Roth-conversion", "tax-planning", "strategy"]
  },
  {
    category_id: 6,
    question_text: "Calculate the RMD for a 75-year-old with $500k IRA (distribution period: 24.6 years).",
    question_type: "scenario",
    difficulty_level: "advanced",
    options: [
      "$20,325",
      "$25,000",
      "$15,500",
      "$18,750"
    ],
    correct_answer: "$20,325",
    explanation: "RMD = Account Balance ÷ Distribution Period = $500,000 ÷ 24.6 = $20,325. Use IRS Uniform Lifetime Table for distribution period based on age.",
    points: 20,
    time_limit_seconds: 60,
    tags: ["RMD", "calculation", "distribution-period"]
  },
  {
    category_id: 6,
    question_text: "What is the SECURE Act 2.0 change to RMD age?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Raised to 73 (2023), will be 75 (2033)",
      "Lowered to 70½",
      "Eliminated RMDs",
      "Kept at 72"
    ],
    correct_answer: "Raised to 73 (2023), will be 75 (2033)",
    explanation: "SECURE 2.0 raised RMD age to 73 for those turning 72 after 2022. It will increase again to 75 in 2033. This allows more time for tax-free growth and Roth conversions.",
    points: 20,
    time_limit_seconds: 60,
    tags: ["SECURE-2.0", "RMD-age", "legislation"]
  },
  {
    category_id: 6,
    question_text: "What is the net unrealized appreciation (NUA) strategy?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Pay ordinary income tax on cost basis, capital gains on appreciation for company stock",
      "Avoid all taxes on company stock",
      "Defer taxes indefinitely",
      "Convert to Roth"
    ],
    correct_answer: "Pay ordinary income tax on cost basis, capital gains on appreciation for company stock",
    explanation: "NUA allows you to distribute appreciated company stock from 401(k), pay ordinary tax on cost basis now, then capital gains (lower rate) on appreciation when sold—can save significant taxes.",
    points: 20,
    time_limit_seconds: 60,
    tags: ["NUA", "company-stock", "tax-strategy"]
  },
  {
    category_id: 6,
    question_text: "You're 68 with $3M in retirement accounts. How does Social Security taxation interact with RMDs?",
    question_type: "scenario",
    difficulty_level: "advanced",
    options: [
      "RMDs increase provisional income, making 85% of SS taxable at higher rates",
      "RMDs don't affect SS taxation",
      "SS is never taxed",
      "RMDs reduce SS benefits"
    ],
    correct_answer: "RMDs increase provisional income, making 85% of SS taxable at higher rates",
    explanation: "Large RMDs push provisional income above $44k (married), making up to 85% of Social Security taxable. This creates a 'tax torpedo' where effective rates can hit 40%+. Roth conversions before SS help.",
    points: 20,
    time_limit_seconds: 60,
    tags: ["Social-Security", "taxation", "RMD-interaction"]
  },
  {
    category_id: 6,
    question_text: "What is the IRMAA cliff and how do RMDs affect it?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Income surcharge on Medicare premiums; RMDs can push you into higher IRMAA brackets",
      "Social Security penalty",
      "Medicaid eligibility",
      "RMD calculation method"
    ],
    correct_answer: "Income surcharge on Medicare premiums; RMDs can push you into higher IRMAA brackets",
    explanation: "IRMAA adds $70-$400+/month to Medicare Part B/D premiums when income exceeds thresholds ($103k single, $206k married in 2024). Large RMDs can trigger these surcharges—plan withdrawals carefully.",
    points: 20,
    time_limit_seconds: 60,
    tags: ["IRMAA", "Medicare", "income-planning"]
  },
  {
    category_id: 6,
    question_text: "What is the optimal Social Security claiming strategy for married couples with earnings gap?",
    question_type: "scenario",
    difficulty_level: "advanced",
    options: [
      "Lower earner claims early; higher earner delays to 70 for survivor benefit",
      "Both claim at 62",
      "Both wait until 70",
      "Higher earner claims first"
    ],
    correct_answer: "Lower earner claims early; higher earner delays to 70 for survivor benefit",
    explanation: "Lower earner can claim at 62-67 for income. Higher earner delays to 70 (8% annual increase) to maximize survivor benefit—the survivor gets the higher of the two benefits for life.",
    points: 20,
    time_limit_seconds: 60,
    tags: ["Social-Security", "married", "claiming-strategy"]
  },
  {
    category_id: 6,
    question_text: "What is the still-working exception for RMDs?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Can defer RMDs from current employer's 401(k) if still working and not 5% owner",
      "Never have to take RMDs if working",
      "Can skip RMDs from all accounts",
      "Working reduces RMD amount"
    ],
    correct_answer: "Can defer RMDs from current employer's 401(k) if still working and not 5% owner",
    explanation: "If you're still working at 73+, you can delay RMDs from your CURRENT employer's 401(k) until you retire (unless you own 5%+ of company). IRAs and old 401(k)s still require RMDs.",
    points: 20,
    time_limit_seconds: 60,
    tags: ["still-working", "RMD-exception", "deferral"]
  },
  {
    category_id: 6,
    question_text: "Calculate your Social Security break-even age: claim at 62 ($1,800/mo) vs wait to 70 ($3,168/mo).",
    question_type: "scenario",
    difficulty_level: "advanced",
    options: [
      "Around age 80-81",
      "Age 70",
      "Age 75",
      "Age 90"
    ],
    correct_answer: "Around age 80-81",
    explanation: "At 62: $1,800 × 96 months (to age 70) = $172,800. Monthly difference: $3,168 - $1,800 = $1,368. Break-even: $172,800 ÷ $1,368 ≈ 126 months (10.5 years) = age 80.5.",
    points: 20,
    time_limit_seconds: 60,
    tags: ["break-even", "Social-Security", "calculation"]
  },
  {
    category_id: 6,
    question_text: "What is the aggregation rule for RMDs?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Can take total RMD from one IRA; must take separately from each 401(k)",
      "Must take from each account separately",
      "Can aggregate all retirement accounts",
      "No aggregation allowed"
    ],
    correct_answer: "Can take total RMD from one IRA; must take separately from each 401(k)",
    explanation: "You can calculate RMDs for all IRAs, then withdraw the total from any one IRA. But 401(k) RMDs must be calculated and withdrawn separately from each 401(k) account.",
    points: 20,
    time_limit_seconds: 60,
    tags: ["RMD", "aggregation", "rules"]
  },
  {
    category_id: 6,
    question_text: "What is the 10-year rule for inherited IRAs (SECURE Act)?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Non-spouse beneficiaries must empty account within 10 years",
      "Must wait 10 years to withdraw",
      "Take equal payments for 10 years",
      "Only applies to Roth IRAs"
    ],
    correct_answer: "Non-spouse beneficiaries must empty account within 10 years",
    explanation: "Under SECURE Act, most non-spouse beneficiaries must withdraw entire inherited IRA within 10 years of owner's death. Exceptions: surviving spouse, disabled, chronically ill, minor children, or less than 10 years younger.",
    points: 20,
    time_limit_seconds: 60,
    tags: ["inherited-IRA", "10-year-rule", "SECURE-Act"]
  },
  {
    category_id: 6,
    question_text: "What is the optimal withdrawal sequencing in retirement?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Generally: taxable first, then tax-deferred, then Roth (with strategic exceptions)",
      "Always Roth first",
      "Always 401(k) first",
      "Equal from all accounts"
    ],
    correct_answer: "Generally: taxable first, then tax-deferred, then Roth (with strategic exceptions)",
    explanation: "Traditional sequence: (1) taxable accounts (already taxed basis), (2) tax-deferred (manage brackets), (3) Roth last (maximize tax-free growth). But optimize based on tax brackets, SS timing, and IRMAA thresholds.",
    points: 20,
    time_limit_seconds: 60,
    tags: ["withdrawal-sequencing", "tax-efficiency", "strategy"]
  },
  {
    category_id: 6,
    question_text: "What is the impact of the 3.8% Net Investment Income Tax (NIIT) on retirement withdrawals?",
    question_type: "scenario",
    difficulty_level: "advanced",
    options: [
      "Applies to investment income if MAGI exceeds $200k single/$250k married",
      "Applies to all retirement withdrawals",
      "Only applies to Roth conversions",
      "Doesn't affect retirees"
    ],
    correct_answer: "Applies to investment income if MAGI exceeds $200k single/$250k married",
    explanation: "NIIT adds 3.8% tax on investment income (dividends, capital gains, rental income) when MAGI exceeds thresholds. Large Roth conversions or RMDs can push you over threshold, triggering NIIT on taxable account income.",
    points: 20,
    time_limit_seconds: 60,
    tags: ["NIIT", "investment-income", "tax"]
  },
  {
    category_id: 6,
    question_text: "How does the stretch IRA strategy work post-SECURE Act?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Mostly eliminated; only eligible designated beneficiaries can stretch",
      "Everyone can stretch indefinitely",
      "Applies to all beneficiaries",
      "Only for Roth IRAs"
    ],
    correct_answer: "Mostly eliminated; only eligible designated beneficiaries can stretch",
    explanation: "Stretch IRA (lifetime distributions) is mostly gone. Only eligible beneficiaries—surviving spouse, disabled, chronically ill, minors, or those <10 years younger—can still stretch. Others face 10-year rule.",
    points: 20,
    time_limit_seconds: 60,
    tags: ["stretch-IRA", "SECURE-Act", "estate-planning"]
  },
  {
    category_id: 6,
    question_text: "What is the qualified birth or adoption distribution (QBAD)?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Penalty-free $5k withdrawal for birth/adoption within 1 year",
      "Penalty-free unlimited withdrawal",
      "Only for Roth IRAs",
      "Requires repayment"
    ],
    correct_answer: "Penalty-free $5k withdrawal for birth/adoption within 1 year",
    explanation: "SECURE Act allows penalty-free withdrawal of up to $5,000 per parent within 1 year of birth or adoption. Still pays income tax, and you can repay it to avoid the tax hit.",
    points: 20,
    time_limit_seconds: 60,
    tags: ["QBAD", "penalty-free", "SECURE-Act"]
  },
  {
    category_id: 6,
    question_text: "What is the impact of cost basis on Roth conversion taxation?",
    question_type: "scenario",
    difficulty_level: "advanced",
    options: [
      "If you have non-deductible contributions, pro-rata rule determines taxable portion",
      "All conversions are fully taxable",
      "Cost basis eliminates all taxes",
      "Only growth is taxed"
    ],
    correct_answer: "If you have non-deductible contributions, pro-rata rule determines taxable portion",
    explanation: "With $100k Traditional IRA ($20k after-tax basis, $80k pre-tax), any conversion is 80% taxable due to pro-rata rule. You can't selectively convert only after-tax dollars—IRS aggregates all Traditional IRAs.",
    points: 20,
    time_limit_seconds: 60,
    tags: ["cost-basis", "pro-rata", "taxation"]
  },
  {
    category_id: 6,
    question_text: "Calculate the effective marginal rate during the Social Security tax torpedo (provisional income $60k, married).",
    question_type: "scenario",
    difficulty_level: "advanced",
    options: [
      "46.25% (22% ordinary + 18.5% SS taxation)",
      "22%",
      "35%",
      "50%"
    ],
    correct_answer: "46.25% (22% ordinary + 18.5% SS taxation)",
    explanation: "In the SS tax torpedo zone, each dollar of income triggers 22% ordinary tax PLUS up to 85 cents of SS becoming taxable (× 22% = 18.7%). Total effective rate = 22% + 18.7% = 40.7% to 46.25%.",
    points: 20,
    time_limit_seconds: 60,
    tags: ["tax-torpedo", "effective-rate", "Social-Security"]
  },
  {
    category_id: 6,
    question_text: "What is the 'look-through' rule for trust beneficiaries of IRAs?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "IRS looks through trust to beneficiaries to determine distribution period",
      "Trusts can't be IRA beneficiaries",
      "Trust pays all taxes",
      "Distributions are tax-free"
    ],
    correct_answer: "IRS looks through trust to beneficiaries to determine distribution period",
    explanation: "If a trust is IRA beneficiary, IRS 'looks through' to individual beneficiaries to determine RMD schedule—but the trust must be valid, irrevocable at death, and identifiable. Complex estate planning tool.",
    points: 20,
    time_limit_seconds: 60,
    tags: ["trust", "look-through", "estate-planning"]
  },
  {
    category_id: 6,
    question_text: "How does the conduit trust vs accumulation trust differ for inherited IRAs?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Conduit distributes all RMDs to beneficiaries; accumulation can retain income",
      "No difference",
      "Conduit is for Roth only",
      "Accumulation is illegal"
    ],
    correct_answer: "Conduit distributes all RMDs to beneficiaries; accumulation can retain income",
    explanation: "Conduit trusts pass all IRA distributions to beneficiaries (lower taxes, creditor exposure). Accumulation trusts retain income (asset protection, trust tax rates up to 37% at $14,450). Trade-offs between protection and taxation.",
    points: 20,
    time_limit_seconds: 60,
    tags: ["conduit-trust", "accumulation-trust", "estate-planning"]
  },
  {
    category_id: 6,
    question_text: "What is the optimal age to start Social Security for maximum lifetime benefit (assuming average life expectancy)?",
    question_type: "scenario",
    difficulty_level: "advanced",
    options: [
      "70 for most people (especially with longevity or married)",
      "62",
      "67",
      "Doesn't matter"
    ],
    correct_answer: "70 for most people (especially with longevity or married)",
    explanation: "Delaying to 70 gives 8%/year increase from FRA (24% total). For longevity, survivor benefits, and COLA compounding, 70 is optimal for many—especially higher earners. Need alternative income until then.",
    points: 20,
    time_limit_seconds: 60,
    tags: ["Social-Security", "optimal-age", "longevity"]
  }
];

async function uploadQuestions() {
  console.log('Starting upload of Category 6: Retirement Planning questions...');
  
  try {
    // Transform questions to match database schema
    const questionsForDB = CATEGORY_6_RETIREMENT.map(q => ({
      category_id: q.category_id,
      question_text: q.question_text,
      question_type: q.question_type,
      difficulty_level: q.difficulty_level,
      options: q.options,
      correct_answer: q.correct_answer,
      explanation: q.explanation,
      topics: q.tags || []
    }));

    const { data, error } = await supabase
      .from('quiz_questions')
      .insert(questionsForDB);

    if (error) {
      console.error('Error uploading questions:', error);
      return;
    }

    console.log(`✅ Successfully uploaded ${CATEGORY_6_RETIREMENT.length} questions for Category 6: Retirement Planning`);
    console.log(`   - Beginner: 25 questions`);
    console.log(`   - Intermediate: 25 questions`);
    console.log(`   - Advanced: 20 questions`);
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

uploadQuestions();
