/**
 * Fix the 3 "Creating Your First Budget" lessons to have unique content
 * They appear in different courses and should be differentiated
 */

import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function fixDuplicateBudgetLessons() {
  console.log('🔧 Fixing duplicate "Creating Your First Budget" lessons...\n')
  
  // Get all lessons with this title
  const { data: lessons, error } = await supabase
    .from('lessons')
    .select(`
      id,
      slug,
      title,
      content,
      courses!inner (
        id,
        title,
        slug
      )
    `)
    .eq('title', 'Creating Your First Budget')
  
  if (error) {
    console.error('❌ Error:', error)
    return
  }
  
  console.log(`Found ${lessons?.length} lessons with title "Creating Your First Budget"\n`)
  
  for (const lesson of lessons || []) {
    console.log(`Processing: ${lesson.slug} in course "${lesson.courses.title}"`)
    
    let newContent
    
    // Differentiate based on course context
    if (lesson.courses.slug === 'budgeting-basics') {
      // Beginner, comprehensive version
      newContent = {
        introduction: `Creating your first budget is one of the most empowering steps in your financial journey. This lesson is designed specifically for beginners—we'll start from scratch and build a budget that actually works for your real life.

A budget isn't about restriction or punishment. It's about taking control, making intentional choices, and ensuring your money serves your priorities. No judgment, no perfection required—just clear, practical steps that thousands of women have successfully used.

Whether you've never budgeted before or past attempts failed, this lesson will give you the foundation you need. We'll make it simple, sustainable, and tailored to how women actually live and earn.`,

        sections: [
          {
            title: 'Why Most Budgets Fail (And How Yours Will Succeed)',
            content: `Before we create your budget, let's understand why so many fail:\n\n**Common Reasons Budgets Don't Work:**\n• Too complicated—tracking 30 categories is exhausting\n• Too restrictive—no room for fun or flexibility\n• Based on ideal behavior, not reality\n• Not adjusted for irregular income\n• Created once and never revisited\n\n**Your Budget Will Be Different Because It Will:**\n✓ Start simple—8-12 categories maximum\n✓ Include spending on things you enjoy\n✓ Reflect how you actually spend, then adjust gradually\n✓ Account for income variability\n✓ Be a living document you review monthly\n\n**Real Story:** Maria tried budgeting three times before. Her mistake? Each time she created the "perfect" budget based on who she wanted to be, not who she was. When she finally built a budget based on her actual spending (wine included!), she stuck with it for 2 years and paid off $8,000 in debt.\n\nThe goal isn't perfection. The goal is awareness leading to intentional choices.`,
            examples: [
              'Lisa budgeted $150/month for groceries (ideal) but actually spent $300. Her budget failed in 2 weeks. When she budgeted $300 (reality), it worked.',
              'Carmen\'s first budget had 25 categories. Too hard to track. Her second: 10 categories. She\'s followed it for 18 months.',
              'Single mom Nina needed "flexible fun money" in her budget or she\'d overspend elsewhere. $100/month changed everything.'
            ]
          },
          {
            title: 'The 4 Essential Budget Components',
            content: `Every successful budget needs these four elements:\n\n**1. Fixed Expenses (Bills You Can't Avoid)**\n• Rent/Mortgage\n• Insurance (health, car, renters)\n• Loan payments\n• Childcare\n• Phone/Internet\n• Subscriptions you actually use\n\n**2. Variable Expenses (Changes Monthly)**\n• Groceries\n• Gas/Transportation\n• Utilities\n• Medical/Prescriptions\n• Household supplies\n\n**3. Discretionary Spending (Wants)**\n• Dining out\n• Entertainment\n• Shopping\n• Hobbies\n• Personal care\n• Coffee/treats\n\n**4. Financial Goals**\n• Emergency fund contributions\n• Extra debt payments\n• Savings for specific goals\n• Retirement (even $25/month counts)\n\n**The Distribution:** A good starting point is 50% needs, 30% wants, 20% goals (the 50/30/20 rule), but adjust based on your reality. If you live in expensive city, needs might be 60%.`,
            examples: [
              'Tech worker Sophia: 45% needs (low rent), 25% wants, 30% savings. She optimized for aggressive saving.',
              'Teacher Elena: 65% needs (high rent, kids), 25% wants, 10% savings. Still making progress despite tight budget.',
              'Freelancer Jade: 60% needs, 15% wants, 25% savings because income fluctuates—she needs bigger emergency fund.'
            ]
          },
          {
            title: 'Creating Your Budget: Step-by-Step',
            content: `Ready to build your actual budget? Follow these steps:\n\n**STEP 1: Calculate Monthly Income (10 minutes)**\n• Add up all money you receive monthly AFTER taxes\n• If income varies, use your lowest typical month\n• Include all sources: job, side gigs, child support, etc.\n• For irregular income, calculate 3-month average\n\n**STEP 2: Track Last Month's Spending (15 minutes)**\n• Pull bank and credit card statements\n• Categorize every transaction\n• Don't judge—just observe\n• This shows your REAL spending baseline\n\n**STEP 3: List All Fixed Expenses (10 minutes)**\n• Write every bill that's the same each month\n• Include annual expenses ÷ 12 (Amazon Prime, car registration)\n• Don't forget quarterly bills (insurance sometimes)\n\n**STEP 4: Estimate Variable Expenses (10 minutes)**\n• Use last month's data from Step 2\n• Round up slightly—better to overestimate\n• Group similar items (combine cleaning supplies with groceries if easier)\n\n**STEP 5: Assign Money to Goals (5 minutes)**\n• Even $25/month counts—start somewhere\n• Priority: $500-1000 emergency fund first\n• Then debt above minimums\n• Then retirement/long-term savings\n\n**STEP 6: Balance the Budget (10 minutes)**\n• Add everything up\n• Income must equal or exceed all expenses + goals\n• If it doesn't, you're going into debt monthly (crisis!)\n• Adjust by cutting expenses or increasing income`,
            examples: [
              'Keisha discovered she was spending $200/month more than she earned. Budget revealed the truth before it became debt.',
              'After tracking, Rita realized $400/month went to food delivery. Seeing the number shocked her into cooking more.',
              'Carmen budgeted $0 for savings her first month—just stopped the bleeding. Month 2, she found $50. Month 6, she saves $200.'
            ]
          },
          {
            title: 'Tools to Track Your Budget',
            content: `Choose a tracking method you'll actually use:\n\n**Option 1: Spreadsheet (Free & Customizable)**\n• Google Sheets or Excel\n• Full control, templates available\n• Best for: People who like spreadsheets\n• Time: 30 min setup, 15 min/week\n\n**Option 2: Budgeting Apps (Free or Paid)**\n• YNAB (You Need A Budget) - $99/year, very detailed\n• Mint - Free, automatic tracking\n• EveryDollar - Free basic, $80/year premium\n• Best for: People who like automation\n• Time: 1 hour setup, 10 min/week\n\n**Option 3: Envelope Method (Cash-Based)**\n• Physical or digital envelopes\n• When category envelope is empty, stop spending\n• Best for: Overspenders who need visual limits\n• Time: 1 hour/month to allocate cash\n\n**Option 4: Pen & Paper (Simplest)**\n• Notebook with categories\n• Write down spending as it happens\n• Best for: Tech-averse people\n• Time: 5 minutes daily\n\n**Sophia's Tip:** "I tried YNAB and hated it—too detailed. I use a Google Sheet with 10 rows. Takes 15 minutes/month. Simple = sustainable."`,
            examples: [
              'Visual learner Tammy uses clear jars for cash in each category. Seeing money disappear helps her stop.',
              'Busy mom Rachel uses Mint because it\'s automatic. She checks it weekly for 10 minutes.',
              'Nina kept failing with apps. Switched to notebook. It works because she sees it daily on her counter.'
            ]
          },
          {
            title: 'Your First Month: Expect Imperfection',
            content: `Your first budget will be wrong. That's not failure—it's data collection.\n\n**What Will Probably Happen:**\n• You'll underestimate some categories\n• You'll forget random expenses\n• Reality won't match your plan\n• You'll overspend somewhere\n• You'll feel frustrated\n\n**This Is Normal and Expected:**\nMonth 1 is about learning your patterns, not perfection.\n\n**What To Do:**\n✓ Track everything that happens\n✓ Note where estimates were off\n✓ Adjust budget for Month 2 based on reality\n✓ Don't quit—budget gets easier monthly\n✓ Celebrate small wins (even just completing tracking!)\n\n**The 3-Month Rule:**\nIt takes 3 months of tracking to have an accurate budget. Month 1: Rough draft. Month 2: Better estimates. Month 3: Pretty accurate. Month 6: Second nature.\n\n**Rita's Experience:** "My first budget was garbage. I budgeted $600 for expenses that cost $900. But I learned where money actually went. Month 2 was better. Month 3 I nailed it. Month 12 I don't even think about it."`,
            examples: [
              'Elena forgot about birthday gifts in her first budget. Added "Gifts" category in Month 2.',
              'Sophia underestimated utilities by $50. Adjusted and found the money by cutting takeout.',
              'Maria overspent by $200 Month 1. Month 2 by $50. Month 3 she was under budget by $20.'
            ]
          }
        ],

        keyTakeaways: [
          'Your first budget is a draft—expect to adjust it for 2-3 months',
          'Budget based on REALITY, not who you wish you were',
          'Simple budgets succeed; complicated ones fail—start with 8-12 categories',
          'Include money for fun—deprivation budgets don\'t last',
          'Track spending first to see patterns, then create budget',
          'The goal is awareness and intentional choices, not perfection',
          'Choose a tracking method you\'ll actually use consistently'
        ],

        actionItems: [
          'Calculate your monthly take-home income across all sources',
          'Download last month\'s bank and credit card statements',
          'Categorize last month\'s spending to find your baseline',
          'Choose a budgeting method/tool that fits your personality',
          'Create your first budget draft—even if it feels rough',
          'Set a calendar reminder for monthly budget review',
          'Find one area to reduce spending by even $50 this month'
        ],

        resources: [
          { title: 'Free Budget Spreadsheet Template', url: 'https://www.consumerfinance.gov/consumer-tools/budget-worksheet/' },
          { title: 'Mint - Free Budgeting App', url: 'https://mint.intuit.com/' },
          { title: '50/30/20 Budget Calculator', url: 'https://www.nerdwallet.com/article/finance/nerdwallet-budget-calculator' },
          { title: 'YNAB - You Need A Budget', url: 'https://www.youneedabudget.com/' }
        ]
      }
    } else if (lesson.courses.slug === 'budgeting-cash-flow') {
      // FINRA course version - more structured, professional
      newContent = {
        introduction: `In this lesson, you'll create your first working budget from scratch. This is a foundational skill for financial empowerment—knowing exactly where your money goes and making it work toward your goals.

This is the FINRA curriculum version, which means we'll cover the technical fundamentals with precision while keeping it practical and accessible. You'll learn the standard budgeting frameworks used by financial professionals, adapted for real-world application.

By the end of this lesson, you'll have a complete, functioning budget and the knowledge to adjust it as your life changes.`,

        sections: [
          {
            title: 'Budget Fundamentals: Income vs. Expenses',
            content: `A budget is simply: Income - Expenses = What's Left.\n\nThat "what's left" should be:\n• Going to savings/investments\n• Paying down debt beyond minimums\n• Building emergency funds\n\nIf "what's left" is $0 or negative, you have a deficit requiring immediate correction.\n\n**Income (Top Line):**\n• All sources of monthly income AFTER taxes\n• Net pay from employment\n• Side gig earnings\n• Government benefits, child support, alimony\n• Investment income (if regular)\n\n**Expenses (Bottom Line):**\n• Fixed: Same amount each month (rent, insurance)\n• Variable: Changes monthly (groceries, gas)\n• Discretionary: Optional spending (entertainment)\n• Savings/Debt as "expenses" you pay yourself\n\n**The Fundamental Rule:** You cannot spend more than you earn for extended periods without accumulating debt. A budget reveals if you're living beyond your means before it becomes a crisis.`,
            examples: [
              'Professional earning $5,000/month with $5,200 in expenses is in crisis—going $200/month into debt',
              'Student with $2,000 income, $1,700 expenses, $300 to goals has a balanced, healthy budget',
              'Freelancer averaging $3,500/month learned to budget on $3,000 (low month) and save the rest'
            ]
          },
          {
            title: 'The Zero-Based Budget Method',
            content: `Zero-based budgeting means: Income - All Allocations = $0\n\nEvery dollar has a job before the month begins. Nothing is "left over" unassigned.\n\n**How It Works:**\n1. Calculate total monthly income\n2. Assign money to each category until you hit $0\n3. Categories include expenses AND savings/debt\n4. If you run out of money before covering essentials, you must cut discretionary spending or increase income\n\n**Example Budget (Income: $4,000/month):**\n• Housing: $1,200\n• Transportation: $400\n• Groceries: $350\n• Utilities: $200\n• Insurance: $300\n• Debt Payments: $500\n• Savings: $400\n• Entertainment: $250\n• Miscellaneous: $200\n• Personal Care: $100\n• Dining Out: $100\n**Total:** $4,000 (Zero remaining)\n\n**Why This Works:** Every dollar is accounted for. No money "disappears." When you want to spend on something not budgeted, you must take from another category.`,
            examples: [
              'Sara wanted $300 dress. Couldn\'t find $300 in zero-based budget. Chose to save for 3 months instead of impulse buy.',
              'Tom realized his budget had $0 for emergency fund. Adjusted by cutting subscriptions $80/month.',
              'Zero-based budgeting revealed Nina was spending $400/month on habits she didn\'t realize were expensive.'
            ]
          },
          {
            title: 'Standard Budget Categories & Percentages',
            content: `Professional financial planners use these guideline percentages:\n\n**NEEDS (50-60%):**\n• Housing: 25-30%\n• Transportation: 10-15%\n• Groceries: 10-15%\n• Utilities: 5-10%\n• Insurance: 10-20%\n• Minimum Debt Payments: Variable\n\n**WANTS (20-30%):**\n• Entertainment: 5-10%\n• Dining Out: 5-10%\n• Shopping/Personal: 5-10%\n• Hobbies: 2-5%\n\n**SAVINGS/GOALS (20-30%):**\n• Emergency Fund: Until $1,000, then 3-6 months expenses\n• Retirement: 15%+ of gross income\n• Extra Debt Payments: Aggressive payoff\n• Other Savings: Specific goals\n\n**If Your Percentages Don't Match:**\nThese are guidelines, not rules. In high cost-of-living areas, housing might be 40%. If you're debt-free, savings might be 40%. Adjust based on your situation, but if needs exceed 70%, you likely need to reduce expenses or increase income.`,
            examples: [
              'NYC resident: Housing 40%, other needs 20%, wants 20%, savings 20%. Total needs 60% due to location.',
              'Debt-focused person: Needs 50%, wants 10%, debt payoff 40%. Aggressive but temporary strategy.',
              'Retiree with paid-off home: Needs 30%, wants 40%, savings 30%. Different life stage, different budget.'
            ]
          },
          {
            title: 'Creating Your Budget: Technical Process',
            content: `Follow this systematic approach:\n\n**STEP 1: Calculate Net Monthly Income**\n• Add all sources of income AFTER taxes\n• If paid biweekly: (Paycheck × 26) ÷ 12\n• If variable: Use 3-month average or lowest month\n• Include only reliable, regular income\n\n**STEP 2: List All Fixed Obligations**\n• Rent/Mortgage\n• Loan payments (car, student, personal)\n• Insurance premiums\n• Phone/Internet\n• Subscriptions\n• Childcare\n\n**STEP 3: Calculate Variable Necessities**\n• Review 3 months of bank statements\n• Average: Groceries, gas, utilities\n• Add 10% buffer for variable expenses\n\n**STEP 4: Assign Discretionary Spending**\n• What's left after necessities and goals\n• Divide among: Entertainment, dining, shopping\n• Be realistic but also intentional\n\n**STEP 5: Allocate to Financial Goals**\n• Minimum: $50/month to emergency fund\n• Any debt above minimum payments\n• Retirement (aim for 15% of gross income)\n\n**STEP 6: Balance and Adjust**\n• If deficit: Cut discretionary or increase income\n• If surplus: Increase goals allocation\n• Ensure total allocations = income`,
            examples: [
              'Professional budgeter spends 2 hours at month-end creating next month\'s budget using spreadsheet',
              'After 3-month review, adjusted grocery budget from $300 to $400—estimate was too low',
              'Found $200 deficit. Cut subscriptions ($50), reduced dining out ($100), found side gig ($50) to balance.'
            ]
          },
          {
            title: 'Tracking and Adjusting Your Budget',
            content: `Budget creation is 20% of the work. Tracking and adjustment is 80%.\n\n**Weekly Check-In (15 minutes):**\n• Review spending in each category\n• Note any overspending early\n• Adjust behavior if approaching limits\n\n**Monthly Review (30 minutes):**\n• Compare actual vs. budgeted for each category\n• Calculate variance (over/under)\n• Identify patterns and trends\n• Adjust next month's budget based on data\n\n**Quarterly Analysis (1 hour):**\n• Look at 3-month trends\n• Identify seasonal variations\n• Assess goal progress\n• Make strategic adjustments\n\n**Annual Planning (2 hours):**\n• Review entire year's budget performance\n• Adjust for income changes\n• Set new financial goals\n• Revise budget categories if needed\n\n**Red Flags Requiring Immediate Adjustment:**\n🚩 Consistently overspending in multiple categories\n🚩 Dipping into savings to cover regular expenses\n🚩 Using credit cards to bridge gaps\n🚩 Unable to meet minimum debt payments\n🚩 No money allocated to emergency fund`,
            examples: [
              'Monthly review revealed $150 monthly overspending in groceries—adjusted budget and reduced waste',
              'Quarterly analysis showed winter utilities $80 higher—built seasonal variation into budget',
              'Annual review: Income increased 10%. Redirected entire raise to retirement and emergency fund.'
            ]
          }
        ],

        keyTakeaways: [
          'A budget is a plan that assigns every dollar a job before the month begins',
          'Zero-based budgeting ensures no money is unaccounted for',
          'Standard guidelines: 50-60% needs, 20-30% wants, 20-30% savings/goals',
          'Track spending weekly; review monthly; analyze quarterly',
          'First budget will require 2-3 months of adjustments to become accurate',
          'Budget is a living document that evolves with life changes',
          'Deficits must be addressed immediately through spending cuts or income increases'
        ],

        actionItems: [
          'Calculate your exact net monthly income from all sources',
          'Review 3 months of bank statements and categorize all spending',
          'Create zero-based budget using template or spreadsheet',
          'Set up weekly and monthly budget review calendar reminders',
          'Choose tracking method (app, spreadsheet, or notebook)',
          'Identify one category where you can reduce spending this month',
          'Set up automatic transfers to savings on payday'
        ],

        resources: [
          { title: 'CFPB Budget Worksheet', url: 'https://www.consumerfinance.gov/consumer-tools/budget-worksheet/' },
          { title: 'Zero-Based Budget Template', url: 'https://www.vertex42.com/ExcelTemplates/zero-based-budget.html' },
          { title: 'NerdWallet Budget Calculator', url: 'https://www.nerdwallet.com/article/finance/nerdwallet-budget-calculator' },
          { title: 'BLS Consumer Expenditure Data', url: 'https://www.bls.gov/cex/' }
        ]
      }
    } else {
      // Financial literacy basics version - introductory
      newContent = {
        introduction: `Your first budget marks the beginning of financial awareness and control. This lesson introduces budgeting as a simple, approachable tool—not a complicated financial instrument that requires expertise.

We'll start with the absolute basics: what a budget is, why it helps, and how to create one without overwhelm. This is perfect if you've never budgeted before or if financial concepts feel intimidating.

No judgment, no assumptions about what you should know. Just clear, step-by-step guidance to help you take this first important step.`,

        sections: [
          {
            title: 'What Is a Budget? (Simple Definition)',
            content: `A budget is a plan that tells your money where to go.\n\nThat's it. Nothing complicated.\n\n**Without a budget:**\nYou spend money throughout the month and wonder where it all went.\n\n**With a budget:**\nYou decide where your money goes before you spend it.\n\n**A budget is NOT:**\n❌ Only for people who are broke\n❌ About never having fun\n❌ Complicated math\n❌ Set in stone forever\n❌ Judgment about your spending\n\n**A budget IS:**\n✅ A tool for EVERYONE to use\n✅ Permission to spend guilt-free on what you've planned for\n✅ Simple addition and subtraction\n✅ Adjustable when life changes\n✅ Awareness without shame\n\n**The Basic Idea:**\nImagine you get paid $2,000. Before spending anything, you decide: $800 for rent, $300 for food, $200 for fun, $500 for bills, $200 for savings. Now you know exactly what you can spend where. That's budgeting.`,
            examples: [
              'Lisa never budgeted. Each month felt chaotic. When she made a simple plan, chaos became calm.',
              'Marco thought budgets were for "poor people." Then he realized even billionaires budget—that\'s how they stay rich.',
              'Nina feared budgeting would reveal she was "bad with money." Instead it showed she was already doing okay, just needed a plan.'
            ]
          },
          {
            title: 'Why Budgeting Helps You',
            content: `Budgeting gives you three superpowers:\n\n**Superpower #1: No More Money Stress**\nWhen you have a plan, you're not constantly worried "can I afford this?" You already know.\n\n**Superpower #2: Reaching Goals Faster**\nWant to save $1,000? Budget makes it happen by showing exactly where that money will come from.\n\n**Superpower #3: Spending Without Guilt**\nIf your budget says $150 for entertainment and you spend $150—no guilt! You planned for it.\n\n**What Budgeting Does:**\n• Shows where money is actually going (eye-opening!)\n• Helps you stop spending more than you earn\n• Creates space for things you care about\n• Reduces financial anxiety and arguments\n• Makes saving automatic instead of accidental\n• Gives you control instead of feeling controlled\n\n**What Budgeting Doesn't Do:**\n• Make you rich overnight\n• Solve all financial problems\n• Work if you don't look at it\n• Feel fun at first (gets easier!)\n\nThink of a budget like a GPS for your money—tells you if you're on track and helps you reroute if needed.`,
            examples: [
              'Carmen stopped arguing with her partner about money once they had a budget both agreed to',
              'Rita discovered she spent $300/month on subscriptions she forgot about. Budget revealed the "money leaks."',
              'Elena saved $2,000 in 10 months by budgeting $200/month. Before budgeting, she "tried to save" and never did.'
            ]
          },
          {
            title: 'Your Simple First Budget (Easiest Method)',
            content: `Let's create your first budget using the simplest method possible.\n\n**STEP 1: How much money comes in? (Your Income)**\nWrite down all money you receive in a month, AFTER taxes:\n• Job paycheck (what actually hits your bank)\n• Side gigs or freelance work\n• Government benefits\n• Child support or alimony\n• Any other regular money\n\nAdd it all up. This is your **Monthly Income.**\n\n**STEP 2: What do you spend money on? (Your Expenses)**\nWrite down everything you pay for in a month:\n• Home (rent or mortgage)\n• Food (groceries and eating out)\n• Transportation (car payment, insurance, gas, or bus pass)\n• Bills (phone, internet, utilities)\n• Other (everything else—estimate for now)\n\nAdd it all up. This is your **Monthly Expenses.**\n\n**STEP 3: The Simple Math**\nIncome - Expenses = ?\n\n**If the answer is positive (like +$200):**\nGood! You're spending less than you earn. Put that extra toward savings or debt.\n\n**If the answer is zero:**\nOkay for now, but no room for emergencies. Try to find even $50 to save.\n\n**If the answer is negative (like -$150):**\nAlert! You're spending more than you earn. You must either spend less or earn more.`,
            examples: [
              'Jade earns $3,000, spends $2,700. She has $300 left to save. Budget shows she\'s doing great.',
              'Tom earns $2,500, spends $2,600. He\'s going $100/month into debt. Budget revealed the problem before it got worse.',
              'Single mom Maria earns $2,000, spends $2,000. Breaking even, but needs to find $100 to start emergency fund.'
            ]
          },
          {
            title: 'Where to Write Your Budget',
            content: `You need somewhere to write your budget and track spending. Pick the easiest option for YOU:\n\n**Option 1: Pen and Paper**\n• Get a notebook\n• Write categories and amounts\n• Cross out and adjust as needed\n• Simplest, no technology needed\n• Best for: People who like tangible, simple tools\n\n**Option 2: Spreadsheet**\n• Use Google Sheets (free) or Excel\n• Many free templates available online\n• Can do math automatically\n• Best for: People comfortable with computers\n\n**Option 3: Budgeting App**\n• Mint (free)\n• EveryDollar (free)\n• Many others available\n• Connects to bank account\n• Best for: People who like automation\n\n**Option 4: Envelope System**\n• Put cash in envelopes for each category\n• When envelope is empty, stop spending\n• Very visual and physical\n• Best for: People who overspend on cards\n\n**The Best Method Is:** The one you'll actually use. Don't overcomplicate. A simple notebook that you use beats a fancy app you ignore.`,
            examples: [
              'Nina uses a notebook. She writes her budget on the first page and tracks spending daily. Takes 5 minutes/day.',
              'Tech-savvy Sophia uses a Google Sheet. She checks it on her phone weekly. Takes 15 minutes/week.',
              'Recovering shopaholic Tammy uses cash envelopes. Seeing physical money leave the envelope helps her stop.'
            ]
          },
          {
            title: 'Your First Month Won't Be Perfect',
            content: `Important truth: Your first budget will be wrong. And that's completely okay.\n\n**Why First Budgets Are Always Wrong:**\n• You forgot about some expenses\n• You underestimated what things cost\n• Surprise expenses happened\n• Your estimates were guesses\n\n**What To Do:**\n1. Don't quit!\n2. Write down what actually happened\n3. Adjust your budget for next month\n4. Keep trying\n\n**Month 1:** Your budget is a rough guess.\n**Month 2:** Your budget is better—you have data now.\n**Month 3:** Your budget is getting accurate.\n**Month 6:** Budgeting feels normal.\n\n**The Learning Process:**\nEvery time you notice "Oh, I forgot about car registration" or "I spent more than I thought on gifts," you're learning. That makes next month's budget better.\n\n**Success Looks Like:** Following your budget imperfectly is 100% better than having no budget at all.`,
            examples: [
              'Rita\'s first budget forgot about: birthday gifts, car maintenance, annual subscriptions. Month 2 budget included them.',
              'Carmen underestimated groceries by $100. Instead of quitting, she adjusted. Month 3 was accurate.',
              'Elena overspent by $200 in Month 1. Month 2 she was only $50 over. Month 4 she was under budget. Progress!'
            ]
          }
        ],

        keyTakeaways: [
          'A budget is simply a plan for where your money will go',
          'Budgeting helps you spend without guilt and save without stress',
          'Start with simple categories: Home, Food, Transportation, Bills, Other',
          'Your method matters less than actually doing it—choose what works for YOU',
          'First budget will be imperfect—adjust it monthly as you learn',
          'Income - Expenses should be positive (or at least zero)',
          'The goal is awareness and intention, not perfection'
        ],

        actionItems: [
          'Write down your total monthly income (after taxes)',
          'List your main spending categories and estimate amounts',
          'Do the simple math: Income minus Expenses equals what?',
          'Choose one method to track your budget (paper, spreadsheet, app)',
          'Write your first budget—even if it\'s rough!',
          'Track actual spending for one week to start building awareness',
          'Schedule 10 minutes at month-end to review and adjust'
        ],

        resources: [
          { title: 'Free Budget Worksheet (PDF)', url: 'https://www.consumerfinance.gov/consumer-tools/budget-worksheet/' },
          { title: 'Mint - Free Budget App', url: 'https://mint.intuit.com/' },
          { title: 'Google Sheets Budget Template', url: 'https://docs.google.com/spreadsheets/d/1mYs3YYUl6shCDXMJv2L0qJQq4KKdJjQBY3yRAQFPh3k/template/preview' },
          { title: 'Khan Academy: Budgeting Basics', url: 'https://www.khanacademy.org/college-careers-more/personal-finance' }
        ]
      }
    }
    
    // Update the lesson
    const { error: updateError } = await supabase
      .from('lessons')
      .update({ content: newContent })
      .eq('id', lesson.id)
    
    if (updateError) {
      console.error(`❌ Error updating: ${updateError.message}`)
    } else {
      console.log(`✅ Updated with unique content for ${lesson.courses.slug} context\n`)
    }
  }
  
  console.log('✅ All "Creating Your First Budget" lessons now have unique content!')
}

fixDuplicateBudgetLessons()
