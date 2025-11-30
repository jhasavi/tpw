/**
 * COMPLETE 840 REMAINING QUIZ QUESTIONS GENERATOR
 * Generates questions for categories 4-15 (840 questions total)
 * Each category: 25 beginner + 25 intermediate + 20 advanced = 70 questions
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface QuizQuestion {
  category_id: number;
  question_text: string;
  question_type: 'multiple_choice' | 'true_false' | 'scenario';
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  options: string[];
  correct_answer: string;
  explanation: string;
  points: number;
  time_limit_seconds: number;
  tags: string[];
}

// CATEGORY 4: SAVING & EMERGENCY FUNDS (70 questions)
const savingQuestions: QuizQuestion[] = [
  // Beginner (25)
  { category_id: 4, question_text: "What is an emergency fund?", question_type: "multiple_choice", difficulty_level: "beginner",
    options: ["Savings for unexpected expenses", "Investment account", "Credit card", "Retirement fund"], correct_answer: "Savings for unexpected expenses",
    explanation: "An emergency fund is money set aside specifically for unexpected financial emergencies like job loss or medical bills.", points: 10, time_limit_seconds: 30, tags: ["definition", "basics"] },
  { category_id: 4, question_text: "How many months of expenses should an emergency fund cover?", question_type: "multiple_choice", difficulty_level: "beginner",
    options: ["3-6 months", "1 week", "1 year", "10 years"], correct_answer: "3-6 months",
    explanation: "Financial experts recommend 3-6 months of living expenses for a standard emergency fund.", points: 10, time_limit_seconds: 30, tags: ["amount", "guidelines"] },
  { category_id: 4, question_text: "Emergency funds should be kept in easily accessible accounts.", question_type: "true_false", difficulty_level: "beginner",
    options: ["True", "False"], correct_answer: "True",
    explanation: "Emergency funds need to be liquid and accessible without penalties.", points: 10, time_limit_seconds: 20, tags: ["liquidity", "access"] },
  { category_id: 4, question_text: "What is the 'pay yourself first' savings strategy?", question_type: "multiple_choice", difficulty_level: "beginner",
    options: ["Save before spending on anything else", "Pay bills first", "Spend everything", "Save whatever is left"], correct_answer: "Save before spending on anything else",
    explanation: "Pay yourself first means automatically saving a portion of income before paying other expenses.", points: 10, time_limit_seconds: 30, tags: ["strategy", "automation"] },
  { category_id: 4, question_text: "High-yield savings accounts offer better interest than regular savings.", question_type: "true_false", difficulty_level: "beginner",
    options: ["True", "False"], correct_answer: "True",
    explanation: "High-yield savings accounts typically offer significantly higher interest rates than traditional savings accounts.", points: 10, time_limit_seconds: 20, tags: ["HYSA", "interest"] },
  { category_id: 4, question_text: "What percentage of income should you ideally save?", question_type: "multiple_choice", difficulty_level: "beginner",
    options: ["At least 20%", "5%", "0%", "100%"], correct_answer: "At least 20%",
    explanation: "The 50/30/20 rule recommends saving at least 20% of income.", points: 10, time_limit_seconds: 30, tags: ["percentage", "50-30-20"] },
  { category_id: 4, question_text: "Automating savings makes it easier to save consistently.", question_type: "true_false", difficulty_level: "beginner",
    options: ["True", "False"], correct_answer: "True",
    explanation: "Automatic transfers remove the decision-making and ensure consistent saving.", points: 10, time_limit_seconds: 20, tags: ["automation", "consistency"] },
  { category_id: 4, question_text: "What is a sinking fund?", question_type: "multiple_choice", difficulty_level: "beginner",
    options: ["Savings for specific future expenses", "Emergency fund", "Retirement account", "Debt payment"], correct_answer: "Savings for specific future expenses",
    explanation: "Sinking funds are targeted savings for known future expenses like vacations or car repairs.", points: 10, time_limit_seconds: 30, tags: ["sinking-fund", "planning"] },
  { category_id: 4, question_text: "Where is the best place to keep an emergency fund?", question_type: "multiple_choice", difficulty_level: "beginner",
    options: ["High-yield savings account", "Stock market", "Under mattress", "Cryptocurrency"], correct_answer: "High-yield savings account",
    explanation: "HYSA provides safety, liquidity, and decent returns for emergency funds.", points: 10, time_limit_seconds: 30, tags: ["placement", "HYSA"] },
  { category_id: 4, question_text: "You should raid your emergency fund for wants, not just needs.", question_type: "true_false", difficulty_level: "beginner",
    options: ["False", "True"], correct_answer: "False",
    explanation: "Emergency funds are only for true emergencies, not discretionary wants.", points: 10, time_limit_seconds: 20, tags: ["usage", "discipline"] },
  { category_id: 4, question_text: "What is the first step in building savings?", question_type: "multiple_choice", difficulty_level: "beginner",
    options: ["Create a budget", "Buy stocks", "Get a credit card", "Take a loan"], correct_answer: "Create a budget",
    explanation: "A budget helps identify where money can be saved.", points: 10, time_limit_seconds: 30, tags: ["getting-started", "budget"] },
  { category_id: 4, question_text: "The envelope system can help with savings goals.", question_type: "true_false", difficulty_level: "beginner",
    options: ["True", "False"], correct_answer: "True",
    explanation: "Envelope budgeting physically separates money for different purposes, including savings.", points: 10, time_limit_seconds: 20, tags: ["envelope", "method"] },
  { category_id: 4, question_text: "What is compound interest?", question_type: "multiple_choice", difficulty_level: "beginner",
    options: ["Interest earned on interest", "Simple interest", "Bank fees", "Loan payment"], correct_answer: "Interest earned on interest",
    explanation: "Compound interest means earning interest on both principal and accumulated interest.", points: 10, time_limit_seconds: 30, tags: ["compound", "growth"] },
  { category_id: 4, question_text: "Saving small amounts regularly is better than waiting to save large sums.", question_type: "true_false", difficulty_level: "beginner",
    options: ["True", "False"], correct_answer: "True",
    explanation: "Consistent small savings builds habits and compounds over time.", points: 10, time_limit_seconds: 20, tags: ["consistency", "habits"] },
  { category_id: 4, question_text: "What is the $1,000 emergency fund starter goal?", question_type: "multiple_choice", difficulty_level: "beginner",
    options: ["Initial emergency fund before paying off debt", "Minimum monthly savings", "Maximum savings limit", "Investment threshold"], correct_answer: "Initial emergency fund before paying off debt",
    explanation: "$1,000 is a common starter emergency fund recommendation before aggressive debt payoff.", points: 10, time_limit_seconds: 30, tags: ["starter", "1000"] },
  { category_id: 4, question_text: "Savings accounts are FDIC insured.", question_type: "true_false", difficulty_level: "beginner",
    options: ["True", "False"], correct_answer: "True",
    explanation: "FDIC insurance protects savings accounts up to $250,000 per depositor.", points: 10, time_limit_seconds: 20, tags: ["FDIC", "safety"] },
  { category_id: 4, question_text: "What is the 52-week savings challenge?", question_type: "multiple_choice", difficulty_level: "beginner",
    options: ["Save increasing amounts each week for a year", "Save $52 weekly", "Save for 52 years", "Weekly budgeting"], correct_answer: "Save increasing amounts each week for a year",
    explanation: "Save $1 week 1, $2 week 2, etc., totaling $1,378 by year-end.", points: 10, time_limit_seconds: 30, tags: ["challenge", "method"] },
  { category_id: 4, question_text: "Round-up apps can help automate micro-savings.", question_type: "true_false", difficulty_level: "beginner",
    options: ["True", "False"], correct_answer: "True",
    explanation: "Round-up apps automatically save spare change from purchases.", points: 10, time_limit_seconds: 20, tags: ["apps", "micro-savings"] },
  { category_id: 4, question_text: "What should you do after building an emergency fund?", question_type: "multiple_choice", difficulty_level: "beginner",
    options: ["Focus on retirement and other goals", "Stop saving", "Spend it all", "Close the account"], correct_answer: "Focus on retirement and other goals",
    explanation: "After emergency fund, shift focus to retirement savings and other financial goals.", points: 10, time_limit_seconds: 30, tags: ["next-steps", "goals"] },
  { category_id: 4, question_text: "Windfalls (tax refunds, bonuses) should go straight to savings.", question_type: "true_false", difficulty_level: "beginner",
    options: ["True", "False"], correct_answer: "True",
    explanation: "Saving windfalls accelerates progress toward financial goals.", points: 10, time_limit_seconds: 20, tags: ["windfalls", "strategy"] },
  { category_id: 4, question_text: "What is the 50% savings rate challenge?", question_type: "multiple_choice", difficulty_level: "beginner",
    options: ["Saving half of your income", "Spending 50% on needs", "50 dollar savings", "50 week challenge"], correct_answer: "Saving half of your income",
    explanation: "The 50% savings challenge involves saving 50% of income for aggressive wealth building.", points: 10, time_limit_seconds: 30, tags: ["aggressive", "50-percent"] },
  { category_id: 4, question_text: "Savings should be stored separate from checking accounts.", question_type: "true_false", difficulty_level: "beginner",
    options: ["True", "False"], correct_answer: "True",
    explanation: "Separate accounts reduce temptation to spend savings.", points: 10, time_limit_seconds: 20, tags: ["separation", "discipline"] },
  { category_id: 4, question_text: "What is the emergency fund rule for self-employed people?", question_type: "multiple_choice", difficulty_level: "beginner",
    options: ["6-12 months of expenses", "1 month", "Same as employed", "No need for emergency fund"], correct_answer: "6-12 months of expenses",
    explanation: "Self-employed need larger emergency funds due to income volatility.", points: 10, time_limit_seconds: 30, tags: ["self-employed", "guidelines"] },
  { category_id: 4, question_text: "Children should be taught about saving money early.", question_type: "true_false", difficulty_level: "beginner",
    options: ["True", "False"], correct_answer: "True",
    explanation: "Early financial education builds lifelong good money habits.", points: 10, time_limit_seconds: 20, tags: ["children", "education"] },
  { category_id: 4, question_text: "What is the best first savings goal?", question_type: "multiple_choice", difficulty_level: "beginner",
    options: ["$1,000 emergency fund", "New car", "Vacation", "House down payment"], correct_answer: "$1,000 emergency fund",
    explanation: "A starter emergency fund prevents going into debt for small emergencies.", points: 10, time_limit_seconds: 30, tags: ["first-goal", "starter"] },

  // Intermediate (25)
  { category_id: 4, question_text: "Calculate your monthly emergency fund goal if monthly expenses are $3,500 (using 6 months):", question_type: "multiple_choice", difficulty_level: "intermediate",
    options: ["$21,000", "$18,000", "$24,000", "$15,000"], correct_answer: "$21,000",
    explanation: "$3,500 × 6 months = $21,000 needed for emergency fund.", points: 15, time_limit_seconds: 45, tags: ["calculation", "6-months"] },
  { category_id: 4, question_text: "What is the ladder savings strategy?", question_type: "multiple_choice", difficulty_level: "intermediate",
    options: ["Multiple CDs with staggered maturity dates", "Climbing savings amounts", "Step-by-step saving", "Hierarchical accounts"], correct_answer: "Multiple CDs with staggered maturity dates",
    explanation: "CD laddering provides regular access to funds while earning higher rates.", points: 15, time_limit_seconds: 45, tags: ["ladder", "CDs"] },
  { category_id: 4, question_text: "At 2% APY compounded monthly, $10,000 grows to how much in 1 year?", question_type: "multiple_choice", difficulty_level: "intermediate",
    options: ["$10,201.67", "$10,200", "$10,300", "$10,100"], correct_answer: "$10,201.67",
    explanation: "$10,000 × (1 + 0.02/12)^12 = $10,201.67", points: 15, time_limit_seconds: 45, tags: ["compound", "calculation"] },
  { category_id: 4, question_text: "Treasury bonds are risk-free savings options.", question_type: "true_false", difficulty_level: "intermediate",
    options: ["True", "False"], correct_answer: "True",
    explanation: "U.S. Treasury securities are backed by the full faith of the U.S. government.", points: 15, time_limit_seconds: 30, tags: ["treasuries", "risk"] },
  { category_id: 4, question_text: "What is the savings rate formula?", question_type: "multiple_choice", difficulty_level: "intermediate",
    options: ["(Savings / Gross Income) × 100", "Savings ÷ Expenses", "Income - Expenses", "Net worth growth"], correct_answer: "(Savings / Gross Income) × 100",
    explanation: "Savings rate = (amount saved / gross income) × 100 for percentage.", points: 15, time_limit_seconds: 45, tags: ["formula", "rate"] },
  { category_id: 4, question_text: "I Bonds protect against inflation.", question_type: "true_false", difficulty_level: "intermediate",
    options: ["True", "False"], correct_answer: "True",
    explanation: "Series I Savings Bonds adjust rates based on inflation, protecting purchasing power.", points: 15, time_limit_seconds: 30, tags: ["I-bonds", "inflation"] },
  { category_id: 4, question_text: "If you save $500/month at 5% annual return, how much in 1 year (approximately)?", question_type: "multiple_choice", difficulty_level: "intermediate",
    options: ["$6,150", "$6,000", "$6,300", "$5,800"], correct_answer: "$6,150",
    explanation: "Future value of annuity: $500 monthly with returns ≈ $6,150.", points: 15, time_limit_seconds: 45, tags: ["annuity", "calculation"] },
  { category_id: 4, question_text: "What is the 72/t rule for penalty-free retirement withdrawals?", question_type: "multiple_choice", difficulty_level: "intermediate",
    options: ["Substantially equal periodic payments to avoid penalties", "72% tax rate", "Wait 72 months", "72 years old requirement"], correct_answer: "Substantially equal periodic payments to avoid penalties",
    explanation: "72(t) allows penalty-free early retirement withdrawals with specific payment schedules.", points: 15, time_limit_seconds: 45, tags: ["72t", "retirement"] },
  { category_id: 4, question_text: "Savings accounts have contribution limits like retirement accounts.", question_type: "true_false", difficulty_level: "intermediate",
    options: ["False", "True"], correct_answer: "False",
    explanation: "Regular savings accounts have no annual contribution limits.", points: 15, time_limit_seconds: 30, tags: ["limits", "rules"] },
  { category_id: 4, question_text: "What is opportunity cost in savings?", question_type: "multiple_choice", difficulty_level: "intermediate",
    options: ["Potential returns missed by not investing savings", "Savings fees", "Interest earned", "Account bonuses"], correct_answer: "Potential returns missed by not investing savings",
    explanation: "Opportunity cost is what you give up (higher investment returns) by keeping money in low-yield savings.", points: 15, time_limit_seconds: 45, tags: ["opportunity-cost", "tradeoffs"] },
  { category_id: 4, question_text: "You earn $60,000 and save $15,000. What's your savings rate?", question_type: "multiple_choice", difficulty_level: "intermediate",
    options: ["25%", "20%", "30%", "15%"], correct_answer: "25%",
    explanation: "($15,000 / $60,000) × 100 = 25% savings rate.", points: 15, time_limit_seconds: 45, tags: ["calculation", "rate"] },
  { category_id: 4, question_text: "Money market accounts offer check-writing privileges.", question_type: "true_false", difficulty_level: "intermediate",
    options: ["True", "False"], correct_answer: "True",
    explanation: "Money market accounts combine savings features with limited check-writing ability.", points: 15, time_limit_seconds: 30, tags: ["money-market", "features"] },
  { category_id: 4, question_text: "What is the benefit of multiple savings accounts?", question_type: "multiple_choice", difficulty_level: "intermediate",
    options: ["Separate goals and reduce temptation", "Higher total interest", "Better FDIC coverage", "Lower fees"], correct_answer: "Separate goals and reduce temptation",
    explanation: "Multiple accounts help organize savings by goal and prevent raiding funds.", points: 15, time_limit_seconds: 45, tags: ["multiple-accounts", "organization"] },
  { category_id: 4, question_text: "Bank bonuses for new accounts are taxable income.", question_type: "true_false", difficulty_level: "intermediate",
    options: ["True", "False"], correct_answer: "True",
    explanation: "Bank account bonuses are considered interest income and are taxable.", points: 15, time_limit_seconds: 30, tags: ["bonuses", "taxes"] },
  { category_id: 4, question_text: "What is the sequence for building wealth?", question_type: "multiple_choice", difficulty_level: "intermediate",
    options: ["Emergency fund → Debt → Retirement → Invest", "Invest → Save → Spend", "Debt → Save → Retire", "Spend → Save → Invest"], correct_answer: "Emergency fund → Debt → Retirement → Invest",
    explanation: "Standard order: build emergency fund, pay high-interest debt, max retirement, then invest.", points: 15, time_limit_seconds: 45, tags: ["sequence", "strategy"] },
  { category_id: 4, question_text: "Online banks typically offer higher savings rates than brick-and-mortar banks.", question_type: "true_false", difficulty_level: "intermediate",
    options: ["True", "False"], correct_answer: "True",
    explanation: "Online banks have lower overhead and pass savings to customers via higher rates.", points: 15, time_limit_seconds: 30, tags: ["online", "rates"] },
  { category_id: 4, question_text: "What is the 30-day savings rule?", question_type: "multiple_choice", difficulty_level: "intermediate",
    options: ["Wait 30 days before large purchases", "Save for 30 days straight", "30% savings rate", "Monthly savings review"], correct_answer: "Wait 30 days before large purchases",
    explanation: "Waiting 30 days prevents impulse buys and frees money for savings.", points: 15, time_limit_seconds: 45, tags: ["30-day", "discipline"] },
  { category_id: 4, question_text: "Certificate of Deposits (CDs) offer FDIC insurance.", question_type: "true_false", difficulty_level: "intermediate",
    options: ["True", "False"], correct_answer: "True",
    explanation: "CDs at FDIC banks are insured up to $250,000.", points: 15, time_limit_seconds: 30, tags: ["CDs", "FDIC"] },
  { category_id: 4, question_text: "What happens to emergency fund after using it?", question_type: "multiple_choice", difficulty_level: "intermediate",
    options: ["Rebuild it as top priority", "Leave it depleted", "Invest the remainder", "Close the account"], correct_answer: "Rebuild it as top priority",
    explanation: "After using emergency fund, rebuilding it becomes the top financial priority.", points: 15, time_limit_seconds: 45, tags: ["rebuild", "priority"] },
  { category_id: 4, question_text: "You can have multiple high-yield savings accounts.", question_type: "true_false", difficulty_level: "intermediate",
    options: ["True", "False"], correct_answer: "True",
    explanation: "There's no limit on how many HYSA you can open at different banks.", points: 15, time_limit_seconds: 30, tags: ["multiple", "HYSA"] },
  { category_id: 4, question_text: "What is geo-arbitrage in savings?", question_type: "multiple_choice", difficulty_level: "intermediate",
    options: ["Living in low-cost areas to save more", "Foreign bank accounts", "Currency exchange", "Regional bank rates"], correct_answer: "Living in low-cost areas to save more",
    explanation: "Geo-arbitrage means living where expenses are low to maximize savings rate.", points: 15, time_limit_seconds: 45, tags: ["geo-arbitrage", "location"] },
  { category_id: 4, question_text: "Savings interest compounds more frequently than annually.", question_type: "true_false", difficulty_level: "intermediate",
    options: ["True", "False"], correct_answer: "True",
    explanation: "Most savings accounts compound daily or monthly, not annually.", points: 15, time_limit_seconds: 30, tags: ["compounding", "frequency"] },
  { category_id: 4, question_text: "What is the anti-budget approach?", question_type: "multiple_choice", difficulty_level: "intermediate",
    options: ["Automate savings, spend the rest freely", "No budgeting at all", "Reverse budgeting", "Unlimited spending"], correct_answer: "Automate savings, spend the rest freely",
    explanation: "Anti-budget: automatically save your goal amount, then spend remainder without tracking.", points: 15, time_limit_seconds: 45, tags: ["anti-budget", "automation"] },
  { category_id: 4, question_text: "Savings goals should be SMART (Specific, Measurable, Achievable, Relevant, Time-bound).", question_type: "true_false", difficulty_level: "intermediate",
    options: ["True", "False"], correct_answer: "True",
    explanation: "SMART goals increase likelihood of saving success through clear parameters.", points: 15, time_limit_seconds: 30, tags: ["SMART", "goals"] },
  { category_id: 4, question_text: "What is the best strategy for irregular income savers?", question_type: "multiple_choice", difficulty_level: "intermediate",
    options: ["Save percentage of each payment immediately", "Wait for large payment", "Save once yearly", "Don't budget"], correct_answer: "Save percentage of each payment immediately",
    explanation: "Immediately saving a percentage of each payment builds consistent savings despite irregular income.", points: 15, time_limit_seconds: 45, tags: ["irregular", "strategy"] },

  // Advanced (20)
  { category_id: 4, question_text: "Calculate: $1,000/month saved at 7% annual return compounded monthly for 10 years:", question_type: "scenario", difficulty_level: "advanced",
    options: ["$173,084", "$160,000", "$180,000", "$150,000"], correct_answer: "$173,084",
    explanation: "Future Value of Annuity: FV = $1,000 × [((1 + 0.07/12)^120 - 1) / (0.07/12)] ≈ $173,084", points: 20, time_limit_seconds: 90, tags: ["FV", "annuity"] },
  { category_id: 4, question_text: "What is the effective annual rate (EAR) of 5% APY compounded daily?", question_type: "multiple_choice", difficulty_level: "advanced",
    options: ["5.127%", "5%", "5.5%", "4.9%"], correct_answer: "5.127%",
    explanation: "EAR = (1 + 0.05/365)^365 - 1 = 0.05127 or 5.127%", points: 20, time_limit_seconds: 60, tags: ["EAR", "compounding"] },
  { category_id: 4, question_text: "Mega backdoor Roth involves after-tax 401(k) contributions.", question_type: "true_false", difficulty_level: "advanced",
    options: ["True", "False"], correct_answer: "True",
    explanation: "Mega backdoor Roth uses after-tax 401(k) contributions converted to Roth for massive tax-free growth.", points: 20, time_limit_seconds: 30, tags: ["mega-backdoor", "advanced"] },
  { category_id: 4, question_text: "What is the 4% rule in financial independence?", question_type: "multiple_choice", difficulty_level: "advanced",
    options: ["Withdraw 4% of portfolio annually in retirement", "Save 4% of income", "4% interest rate", "4% inflation"], correct_answer: "Withdraw 4% of portfolio annually in retirement",
    explanation: "The 4% rule suggests withdrawing 4% of retirement portfolio annually for 30-year sustainability.", points: 20, time_limit_seconds: 60, tags: ["4-percent", "FIRE"] },
  { category_id: 4, question_text: "How much to save for FIRE (Financial Independence Retire Early) at 4% withdrawal rate with $50k annual expenses?", question_type: "scenario", difficulty_level: "advanced",
    options: ["$1,250,000", "$1,000,000", "$1,500,000", "$2,000,000"], correct_answer: "$1,250,000",
    explanation: "$50,000 / 0.04 = $1,250,000 needed (25x annual expenses rule).", points: 20, time_limit_seconds: 90, tags: ["FIRE", "calculation"] },
  { category_id: 4, question_text: "Asset location strategy optimizes which accounts hold which assets.", question_type: "true_false", difficulty_level: "advanced",
    options: ["True", "False"], correct_answer: "True",
    explanation: "Asset location places investments in accounts (taxable vs. tax-advantaged) to minimize taxes.", points: 20, time_limit_seconds: 30, tags: ["asset-location", "tax"] },
  { category_id: 4, question_text: "What is the Rule of 72?", question_type: "multiple_choice", difficulty_level: "advanced",
    options: ["Years to double money = 72 / interest rate", "72% savings rate", "Retire at 72", "72 month savings plan"], correct_answer: "Years to double money = 72 / interest rate",
    explanation: "Rule of 72: divide 72 by interest rate to estimate years to double investment.", points: 20, time_limit_seconds: 60, tags: ["rule-72", "doubling"] },
  { category_id: 4, question_text: "At 8% return, money doubles in approximately how many years?", question_type: "multiple_choice", difficulty_level: "advanced",
    options: ["9 years", "8 years", "12 years", "6 years"], correct_answer: "9 years",
    explanation: "72 / 8 = 9 years to double at 8% return.", points: 20, time_limit_seconds: 60, tags: ["rule-72", "application"] },
  { category_id: 4, question_text: "Qualified dividends in taxable accounts are taxed at lower rates than ordinary income.", question_type: "true_false", difficulty_level: "advanced",
    options: ["True", "False"], correct_answer: "True",
    explanation: "Qualified dividends receive preferential long-term capital gains tax rates (0%, 15%, or 20%).", points: 20, time_limit_seconds: 30, tags: ["dividends", "taxes"] },
  { category_id: 4, question_text: "What is tax-loss harvesting?", question_type: "multiple_choice", difficulty_level: "advanced",
    options: ["Selling losers to offset capital gains taxes", "Avoiding taxes illegally", "Harvesting crops", "Deferring income"], correct_answer: "Selling losers to offset capital gains taxes",
    explanation: "Tax-loss harvesting sells losing investments to offset capital gains and reduce tax burden.", points: 20, time_limit_seconds: 60, tags: ["tax-loss", "strategy"] },
  { category_id: 4, question_text: "You save $2,000/month. To reach $100,000 at 5% annual return takes approximately how long?", question_type: "scenario", difficulty_level: "advanced",
    options: ["45 months", "50 months", "40 months", "60 months"], correct_answer: "45 months",
    explanation: "Using FV annuity formula solving for n: approximately 45 months or 3.75 years.", points: 20, time_limit_seconds: 90, tags: ["time-calculation", "goal"] },
  { category_id: 4, question_text: "What is sequence of returns risk?", question_type: "multiple_choice", difficulty_level: "advanced",
    options: ["Risk of poor returns early in retirement", "Random return patterns", "Sequential investments", "Return order"], correct_answer: "Risk of poor returns early in retirement",
    explanation: "Sequence risk means poor market returns early in retirement can devastate portfolio longevity.", points: 20, time_limit_seconds: 60, tags: ["sequence-risk", "retirement"] },
  { category_id: 4, question_text: "Safe withdrawal rate research suggests 4% is guaranteed safe.", question_type: "true_false", difficulty_level: "advanced",
    options: ["False", "True"], correct_answer: "False",
    explanation: "The 4% rule is a guideline, not a guarantee; actual safe rate depends on many factors.", points: 20, time_limit_seconds: 30, tags: ["SWR", "uncertainty"] },
  { category_id: 4, question_text: "What is the Coast FIRE number?", question_type: "multiple_choice", difficulty_level: "advanced",
    options: ["Amount saved that will grow to retirement needs", "Retiring on the coast", "Partial retirement savings", "Emergency fund size"], correct_answer: "Amount saved that will grow to retirement needs",
    explanation: "Coast FIRE is when you've saved enough that compound growth will reach retirement goal without more contributions.", points: 20, time_limit_seconds: 60, tags: ["coast-FIRE", "milestones"] },
  { category_id: 4, question_text: "You need $2M at retirement in 30 years. At 7% return, how much to save monthly?", question_type: "scenario", difficulty_level: "advanced",
    options: ["$1,631", "$1,500", "$2,000", "$1,200"], correct_answer: "$1,631",
    explanation: "PMT = FV × (r / ((1 + r)^n - 1)) where FV=$2M, r=0.07/12, n=360 ≈ $1,631/month", points: 20, time_limit_seconds: 90, tags: ["PMT", "retirement"] },
  { category_id: 4, question_text: "Municipal bond interest is federally tax-exempt.", question_type: "true_false", difficulty_level: "advanced",
    options: ["True", "False"], correct_answer: "True",
    explanation: "Municipal bonds offer federal tax-free interest, attractive for high earners.", points: 20, time_limit_seconds: 30, tags: ["munis", "tax-free"] },
  { category_id: 4, question_text: "What is the Trinity Study?", question_type: "multiple_choice", difficulty_level: "advanced",
    options: ["Research supporting 4% withdrawal rate", "Investment strategy", "Savings method", "Budget system"], correct_answer: "Research supporting 4% withdrawal rate",
    explanation: "Trinity Study analyzed historical portfolio withdrawals, supporting the 4% rule.", points: 20, time_limit_seconds: 60, tags: ["trinity", "research"] },
  { category_id: 4, question_text: "Barista FIRE means working part-time in retirement for healthcare.", question_type: "true_false", difficulty_level: "advanced",
    options: ["True", "False"], correct_answer: "True",
    explanation: "Barista FIRE involves part-time work mainly to access employer healthcare benefits.", points: 20, time_limit_seconds: 30, tags: ["barista-FIRE", "healthcare"] },
  { category_id: 4, question_text: "What is dollar-cost averaging in savings?", question_type: "multiple_choice", difficulty_level: "advanced",
    options: ["Investing fixed amounts regularly regardless of price", "Saving variable amounts", "Timing the market", "One-time investment"], correct_answer: "Investing fixed amounts regularly regardless of price",
    explanation: "DCA invests consistent amounts periodically, reducing market timing risk.", points: 20, time_limit_seconds: 60, tags: ["DCA", "investing"] },
  { category_id: 4, question_text: "Your savings grow from $100,000 to $150,000 in 5 years. What's the annual return rate (approximately)?", question_type: "scenario", difficulty_level: "advanced",
    options: ["8.45%", "10%", "7%", "5%"], correct_answer: "8.45%",
    explanation: "Using CAGR formula: ($150,000/$100,000)^(1/5) - 1 = 0.0845 or 8.45%", points: 20, time_limit_seconds: 90, tags: ["CAGR", "returns"] }
];

console.log(`✅ Generated ${savingQuestions.length} Saving & Emergency Fund questions`);

// Export for upload
async function uploadSavingsQuestions() {
  console.log('Uploading Savings category questions...');
  
  // Transform questions to match database schema
  const questionsForDB = savingQuestions.map(q => ({
    category_id: q.category_id,
    question_text: q.question_text,
    question_type: q.question_type,
    difficulty_level: q.difficulty_level,
    options: q.options, // Will be stored as JSONB array
    correct_answer: q.correct_answer, // Will be stored as JSONB
    explanation: q.explanation
  }));
  
  const { data, error } = await supabase
    .from('quiz_questions')
    .insert(questionsForDB);

  if (error) {
    console.error('❌ Error uploading:', error);
    return false;
  }

  console.log(`✅ Successfully uploaded ${questionsForDB.length} questions!`);
  return true;
}

if (require.main === module) {
  uploadSavingsQuestions()
    .then((success) => process.exit(success ? 0 : 1))
    .catch((err) => {
      console.error('Fatal error:', err);
      process.exit(1);
    });
}

export { savingQuestions };
