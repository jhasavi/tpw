#!/usr/bin/env node

/**
 * Fix Formatting Issues and Complete Debt Management Content
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(msg, color = 'reset') {
  console.log(`${colors[color]}${msg}${colors.reset}`);
}

async function fixIssues() {
  log('\n🔧 Fixing Formatting Issues and Completing Debt Management\n', 'cyan');

  try {
    // Get curriculum and course IDs
    const { data: curriculum } = await supabase
      .from('curricula')
      .select('id')
      .eq('slug', 'womens-financial-literacy')
      .single();

    if (!curriculum) {
      log('❌ Curriculum not found', 'red');
      return;
    }

    // 1. Fix self-assessment formatting issue
    log('1️⃣  Fixing self-assessment formatting...', 'yellow');
    const { data: basicsCourse } = await supabase
      .from('courses')
      .select('id')
      .eq('curriculum_id', curriculum.id)
      .eq('slug', 'financial-literacy-basics')
      .single();

    const { data: selfAssessment } = await supabase
      .from('lessons')
      .select('content')
      .eq('course_id', basicsCourse.id)
      .eq('slug', 'self-assessment')
      .single();

    const fixedContent = selfAssessment.content;
    
    // Fix the malformed markdown in the categories section
    if (fixedContent.sections) {
      fixedContent.sections.forEach(section => {
        if (section.content && section.content.includes('**Budgeting & Money Management*')) {
          section.content = section.content.replace(
            '**Budgeting & Money Management*',
            '**Budgeting & Money Management**'
          );
        }
      });
    }

    const { error: error1 } = await supabase
      .from('lessons')
      .update({ content: fixedContent })
      .eq('course_id', basicsCourse.id)
      .eq('slug', 'self-assessment');

    if (error1) {
      log(`❌ Error fixing self-assessment: ${error1.message}`, 'red');
    } else {
      log('✅ Fixed self-assessment formatting', 'green');
    }

    // 2. Complete debt management course
    log('\n2️⃣  Completing debt management course...', 'yellow');
    const { data: debtCourse } = await supabase
      .from('courses')
      .select('id')
      .eq('curriculum_id', curriculum.id)
      .eq('slug', 'debt-management')
      .single();

    // Comprehensive debt management content
    const debtContent = {
      introduction: `Debt is one of the most powerful forces in personal finance - it can either work for you or against you. This lesson will help you understand different types of debt, develop strategies to manage it effectively, and create a roadmap to control your financial future.

Whether you're dealing with credit card debt, student loans, mortgage payments, or other obligations, you'll learn practical strategies to reduce debt faster, save money on interest, and regain control of your finances.`,
      objectives: [
        'Understand different types of debt and how they affect your finances',
        'Evaluate your current debt situation and create a realistic assessment',
        'Learn proven debt payoff strategies (snowball vs. avalanche methods)',
        'Develop a personalized debt reduction plan',
        'Build habits to avoid accumulating new debt',
        'Calculate true costs of debt and interest payments'
      ],
      sections: [
        {
          title: 'Understanding Different Types of Debt',
          content: `Not all debt is created equal. Different types of debt have different interest rates, terms, and impacts on your financial life. Understanding these differences is crucial for creating an effective debt management strategy.

**Good Debt vs. Bad Debt**

This concept is controversial among financial experts, but here's a practical framework:

**Potentially Good Debt** (typically lower interest rates with long terms or tax benefits):
• Mortgages - Interest rates often 3-7%, and mortgage interest may be tax-deductible
• Student Loans - Fixed rates, income-driven repayment options, potential forgiveness programs
• Business Loans - Investments in your income-generating potential
• Home Equity Lines of Credit - Lower rates because secured by home equity

**Bad Debt** (high interest rates that make it expensive):
• Credit Cards - 15-25% interest rates; balance grows quickly
• Payday Loans - 300-400% APR; predatory lending practices
• Buy Now, Pay Later - Often 0%, but encourages overspending
• Personal Loans with High Rates - Unsecured debt with high interest

**The Real Distinction:**
The key difference isn't the type of debt, but whether:
1. The debt is for something that builds value or enables income growth
2. The interest rate is reasonable
3. The payment fits your budget without stress
4. You have a clear plan to pay it off`,
          keyPoints: [
            'Secured debt (mortgage, car loan) has lower interest rates than unsecured debt',
            'Credit card debt is usually the most expensive type of debt',
            'Some debt (mortgage, student loans) may have tax benefits',
            'The purpose of the debt matters: is it building assets or financing consumption?',
            'Your credit score determines what interest rates you qualify for'
          ]
        },
        {
          title: 'Assessing Your Debt Situation',
          content: `Before you can create a plan, you need to understand exactly what you owe. Many people avoid this step because it feels overwhelming, but knowledge is power. Once you see the full picture, you can take control.

**Step 1: List All Your Debts**

Create a comprehensive list that includes:

| Creditor | Balance | Interest Rate | Min Payment | Due Date |
|----------|---------|----------------|-------------|----------|
| Credit Card A | $5,000 | 19.5% | $150 | 15th |
| Credit Card B | $2,500 | 18% | $75 | 1st |
| Student Loan | $25,000 | 4.5% | $250 | N/A |
| Car Loan | $12,000 | 5.2% | $300 | 20th |
| Personal Loan | $3,000 | 12% | $100 | 10th |

**Step 2: Calculate Key Metrics**

**Total Debt Balance:** Add all balances = $47,500

**Total Monthly Payments:** Add all minimum payments = $875/month

**Debt-to-Income Ratio:** (Total Monthly Payments ÷ Gross Monthly Income) × 100
- Example: $875 ÷ $4,000 income = 21.9% debt-to-income ratio
- Less than 15% = manageable
- 15-20% = moderate concern
- Over 20% = needs attention

**Interest Paid Annually:** Sum of (Balance × Interest Rate) for each debt
- This shows how much you're throwing away on interest

**Average Interest Rate:** Total annual interest ÷ Total balance
- This tells you where to focus your efforts

**Step 3: Categorize by Priority**

HIGH PRIORITY (debt you must address):
• Credit cards over 18% APR
• Payday loans or high-rate personal loans
• Any debt in collections
• Debt affecting credit score

MEDIUM PRIORITY (debt you should address):
• Other credit card debt
• Personal loans 10-17% APR
• Medical debt

LOW PRIORITY (debt you can address later):
• Mortgages (usually 3-7%)
• Car loans (usually 4-8%)
• Student loans (usually 3-7%)`,
          keyPoints: [
            'Know exactly what you owe - get all statements and create a complete list',
            'Calculate your debt-to-income ratio to understand the severity',
            'Not all debts are equally urgent - prioritize by interest rate and terms',
            'Interest paid is money that disappeared - make it visible so you stay motivated',
            'Your credit score improves when you reduce credit utilization and pay on time'
          ]
        },
        {
          title: 'Debt Payoff Strategies: Snowball vs. Avalanche',
          content: `Once you understand your debt, it's time to choose a strategy. The two most popular methods are the snowball and avalanche approaches. Both work - the best one is the one you'll stick with.

**The Snowball Method**

Strategy: Pay off debts from smallest to largest balance, regardless of interest rate.

How it works:
1. List all debts from smallest to largest balance
2. Pay minimum payments on all debts
3. Put any extra money toward the smallest debt
4. When smallest debt is paid off, roll that payment into the next smallest
5. Repeat until debt-free

Example with our sample debts:
• Personal Loan $3,000 (pay aggressively here with extra $200)
• Credit Card B $2,500 (pay aggressively here with extra $200)
• Credit Card A $5,000 (pay aggressively here with extra $200)
• Car Loan $12,000 (minimum payments)
• Student Loan $25,000 (minimum payments)

**Advantages:**
✅ Quick wins build momentum and motivation
✅ Psychology of "winning" keeps you engaged
✅ Each payoff feels like progress
✅ Works well for people who are motivated by visible wins
✅ Easier to understand and explain to family

**Disadvantages:**
❌ Costs more in total interest
❌ Takes longer overall
❌ Not mathematically optimal

**The Avalanche Method**

Strategy: Pay off debts from highest to lowest interest rate, regardless of balance.

How it works:
1. List all debts from highest to lowest interest rate
2. Pay minimum payments on all debts
3. Put any extra money toward the highest interest debt
4. When highest interest debt is paid off, roll that payment into the next highest
5. Repeat until debt-free

Example with our sample debts (by interest rate):
• Credit Card A 19.5% $5,000 (pay aggressively here with extra $200)
• Credit Card B 18% $2,500 (pay aggressively here with extra $200)
• Personal Loan 12% $3,000 (pay aggressively here with extra $200)
• Car Loan 5.2% $12,000 (minimum payments)
• Student Loan 4.5% $25,000 (minimum payments)

**Advantages:**
✅ Saves the most money in interest
✅ Mathematically optimal
✅ Fastest path to being debt-free overall
✅ Works well if you're motivated by saving money
✅ Reduces total amount paid

**Disadvantages:**
❌ Takes longer for first win (might demotivate)
❌ Smaller early victories
❌ Some people lose motivation before payoff

**Which Should You Choose?**

Choose **Snowball** if:
• You need quick wins to stay motivated
• You have very different debt amounts
• You're new to debt management
• You're struggling with motivation

Choose **Avalanche** if:
• You're mathematically motivated
• You have high interest rate debt
• You can stay committed long-term
• You want to minimize total interest paid
• You're more motivated by money saved than quick wins

**The Hybrid Approach:**
Some people use a hybrid - pay minimum on all debts, then put extra toward the highest rate debt that's also relatively small. This combines psychology wins with interest savings.

**Reality Check:**
The best debt payoff method is the one you'll actually follow. If the Snowball keeps you motivated and you stick with it, you'll save more money than with the Avalanche if you abandon it. Choose based on YOUR psychology, not just the math.`,
          keyPoints: [
            'Snowball: smallest to largest balance (psychological wins)',
            'Avalanche: highest to lowest interest rate (saves most money)',
            'Both methods require consistent extra payments beyond minimums',
            'The best method is the one you\'ll stick with',
            'You need a budget to find money for extra payments'
          ]
        },
        {
          title: 'Creating Your Personal Debt Payoff Plan',
          content: `Now that you understand your options, it's time to create your specific plan. This is where theory becomes action.

**Step 1: Choose Your Strategy**

Decide: Snowball or Avalanche (or hybrid)? Write it down.

**Step 2: Set Your Payoff Timeline**

Determine how aggressive you want to be:

| Timeline | Monthly Extra | Lifestyle Impact | Example |
|----------|---------------|------------------|---------|
| Aggressive (2-3 years) | $300-500 | Significant budget cuts | No eating out, one vacation every 2 years |
| Moderate (4-5 years) | $150-300 | Some lifestyle changes | Reduced eating out, one vacation/year |
| Sustainable (5-7 years) | $50-150 | Minimal changes | One night out per week, annual vacation |

Remember: A plan you stick with beats a perfect plan you abandon. If you commit to $100/month extra, that's better than planning for $300 and giving up after 2 months.

**Step 3: Create Your Monthly Budget**

You need to find money for your payoff plan:

Look for savings in:
• Food ($150-300/month possible): meal planning, groceries vs. restaurants
• Subscriptions ($20-100/month): streaming services, apps, memberships
• Entertainment ($50-200/month): date nights, hobbies, events
• Transportation ($50-300/month): carpooling, public transit, delaying car upgrade
• Shopping ($100-300/month): clothes, online shopping, lifestyle inflation

**Step 4: Automate Your Plan**

Set up automatic payments:
1. Schedule minimum payments on all debts to avoid late fees
2. Schedule extra payments toward your target debt
3. This removes decision-making and ensures consistency

**Step 5: Create a Visual Progress Tracker**

Seeing progress is motivating. Create:
• A spreadsheet showing declining balance
• A chart showing progress toward goal
• A visual tracker (fill in a circle each month, cross off debts as paid)
• A savings counter: "You've saved $X in interest by paying off debt Y"

**Step 6: Plan for Obstacles**

Debt payoff is a marathon, not a sprint. Plan for:

**Emergency Expenses:**
• Have $500-1000 in emergency fund (separate from payoff money)
• If emergency happens, pause extra payments, don't go backward

**Income Changes:**
• If income decreases, reduce payment amount (don't abandon plan)
• If income increases, increase payment amount (don't lifestyle inflate)

**Motivation Dips:**
• Review progress monthly
• Celebrate milestones (debt paid off, interest saved, credit score improvement)
• Connect with accountability partner

**Step 7: Set a Specific Debt-Free Date**

Calculate and write down the exact month/year you'll be debt-free. This makes it real.

Example: "I will be credit card debt-free by December 2027. I will be completely debt-free (except mortgage) by June 2030."

Post this where you'll see it: mirror, phone lock screen, fridge.`,
          keyPoints: [
            'Choose a timeline you can sustain for the entire payoff period',
            'Find specific budget cuts to generate extra payment money',
            'Automate everything possible to remove decision-making',
            'Celebrate wins along the way to stay motivated',
            'Track progress visually - what gets measured gets improved',
            'Have a plan for obstacles before they happen',
            'Your debt-free date should be specific and visible'
          ]
        },
        {
          title: 'Avoiding New Debt While Paying Off Old',
          content: `Here's a hard truth: If you don't fix the behaviors that created debt, you'll create new debt while paying off old debt. Addressing the debt is only half the battle.

**Understand Your Debt Triggers**

Why did you accumulate debt in the first place?

Common reasons:
• Income insufficient for expenses (lifestyle too expensive)
• Emergency expenses without emergency fund
• Credit card convenience (swiped instead of paid cash)
• Emotional spending (stressed, bored, sad, celebrate)
• Peer pressure (keeping up with friends' spending)
• Lack of budget (didn't realize how much you spent)
• Medical or unexpected expenses
• Debt spiraling (minimum payments kept increasing)

**Identify YOUR primary reason.** This is crucial because different reasons need different solutions.

**Solutions for Different Debt Causes**

**If the problem is: Lifestyle Too Expensive**
Solutions:
• Create a detailed budget (know exactly where money goes)
• Find lifestyle inflation creep (gradually increasing spending)
• Cut back on discretionary spending
• Increase income if possible (side gig, raise, career change)
• Adjust expectations about what you "need"

**If the problem is: No Emergency Fund**
Solutions:
• Pause extra debt payments temporarily
• Build $500-1000 emergency fund first
• Once emergency fund exists, resume aggressive payoff
• When debt is gone, build full 3-6 month emergency fund

**If the problem is: Credit Card Convenience**
Solutions:
• Cut up credit cards or freeze them (literally or metaphorically)
• Switch to debit card or cash for daily spending
• Leave cards at home - discipline prevents temptation
• Delete cards from online shopping accounts
• Unsubscribe from shopping emails

**If the problem is: Emotional Spending**
Solutions:
• Identify your emotions and triggers (stress → shopping?)
• Create alternative coping mechanisms (walk, journal, talk, exercise)
• Wait 48 hours before any non-essential purchase
• Tell someone your spending goal (accountability)
• Remove payment information from browsers

**If the problem is: Peer Pressure**
Solutions:
• Choose friends who share your financial values
• Suggest free or low-cost activities
• Be honest about your debt payoff goal
• Find community in others paying off debt (support groups)
• Remember: "No" is a complete sentence

**If the problem is: Lack of Budget/Awareness**
Solutions:
• Track every expense for one month
• Categorize spending (food, transport, fun, etc.)
• Set spending limits for each category
• Review budget weekly
• Use budgeting apps or spreadsheets

**Credit Card Strategies During Payoff**

What should you do with credit cards while paying them off?

**Option 1: Keep Them (if you have discipline)**
✅ Maintain credit score (open accounts and low utilization)
✅ Available for emergencies (if needed)
❌ Risk of creating more debt
⚠️ Only if you can avoid using them

**Option 2: Freeze Them (Physically)**
✅ Remove temptation
✅ Still maintain account
✅ Can unfreeze for true emergency
✅ Best for people without strong discipline

**Option 3: Close Them (After Payoff)**
✅ Removes temptation
✅ Makes restart impossible
❌ Hurts credit score
❌ Loses account history

**Strategy:** 
1. While paying off: Freeze cards (except one for emergencies)
2. After payoff: Keep one or two open with low limit
3. Use responsibly: Pay in full each month
4. Build good habits before using credit again

**The Mental Shift**

This is the most important part: You're not just paying off debt, you're changing your relationship with money.

**Old mindset:** "How much can I spend?"
**New mindset:** "How much can I save?"

**Old mindset:** "I deserve this, I'll pay for it later"
**New mindset:** "I'll save up and buy this when I can afford it"

**Old mindset:** "Credit cards are free money"
**New mindset:** "Credit cards are expensive debt waiting to happen"

**Old mindset:** "This loan will definitely work out"
**New mindset:** "Can I afford the payments without stress if income changes?"

This mental shift is permanent. Once you understand how debt works, you'll naturally want to avoid it.`,
          keyPoints: [
            'Understand why you accumulated debt - addressing symptoms without root cause won\'t work',
            'Cut spending and/or increase income to create extra money for payoff',
            'Build small emergency fund ($500-1000) before aggressive debt payoff',
            'Freeze or remove credit cards during payoff to prevent new debt',
            'Have accountability partners who share your financial goals',
            'The hardest part is the psychological shift about spending vs. saving',
            'This is a permanent change in how you relate to money, not a temporary diet'
          ]
        },
        {
          title: 'Tracking Progress and Staying Motivated',
          content: `Debt payoff is a long journey. Most people will take 2-7 years to pay off their debt (depending on amount and aggressiveness). You need systems to stay motivated.

**Monthly Check-In Ritual**

Create a monthly tradition (1st of month, payday, etc.):

1. **Review Balances** (10 minutes)
   - Log into each account
   - Record current balances
   - Calculate total debt (should be decreasing)

2. **Calculate Progress** (5 minutes)
   - How much did you pay off this month?
   - How much interest did you save?
   - Update spreadsheet or tracker

3. **Celebrate Wins** (5 minutes)
   - Acknowledge the progress
   - Share with accountability partner
   - Small celebration if milestone reached

4. **Review Budget** (10 minutes)
   - Did you stick to budget?
   - Any unexpected expenses?
   - Adjust next month if needed

5. **Recommit to Goal** (5 minutes)
   - Read your debt-free date
   - Visualize being debt-free
   - Identify one action for next month

This 35-minute ritual makes progress visible and keeps you focused.

**Milestone Celebrations**

Set milestones and celebrate (no-cost celebrations):
• First $1000 paid off: Tell someone proud of you
• 25% of debt paid: Cook special meal at home
• 50% of debt paid: Free activity you enjoy (hike, movie night, friend visit)
• 75% of debt paid: Plan your debt-free celebration
• 100% debt-free: Major celebration (weekend trip, special dinner)

**Accountability Systems**

You're 65% more likely to achieve goals with accountability:

**Accountability Partner:**
• Weekly text with updated balance
• Monthly call to discuss progress
• Someone who knows your goal
• Preferably someone also working on financial goals

**Online Community:**
• Subreddit r/personalfinance or r/Debtfree
• Facebook groups focused on debt payoff
• Forums like Bogleheads
• Anonymous support - share struggles, get encouragement

**Professional Support:**
• Non-profit credit counseling (free)
• Financial coach (paid, but very effective)
• Therapist if emotional spending is issue
• Consider cost/benefit of support

**Motivation Through Numbers**

Create powerful visualizations:

**Interest Saved Calculator:**
"By paying extra on credit card debt, I'm saving approximately $X in interest. That's like getting paid $X to NOT buy stuff."

**Income Saved:**
"By paying off this debt 2 years early, I save $X. That's like earning an extra $X per year in income."

**Time Saved:**
"By paying extra, I'll be debt-free at age X instead of age X+5. That's 5 years of freedom."

**Lifestyle Gained:**
"When debt is gone, my monthly payment money ($Y) becomes available for travel, saving, or career changes."

These numbers are incredibly motivating.

**What If You Slip Up?**

You will have months where you can't stick to the plan. Maybe you had an emergency. Maybe you overspent. This is normal.

**What NOT to do:**
❌ Don't abandon the plan completely
❌ Don't beat yourself up
❌ Don't think you've failed
❌ Don't feel shame

**What to do:**
✅ Acknowledge it happened
✅ Get back on track immediately
✅ Find what caused the slip
✅ Adjust plan if needed
✅ One month off won't derail a 5-year plan

**The 80% Rule:**
If you stick to your debt payoff plan 80% of the time, you'll still reach your goal. Perfect is the enemy of good. Consistent is better than perfect.

**When to Celebrate Being Debt-Free**

When you pay off your last debt, celebrate big. You've accomplished something most people won't.

Do something meaningful:
• Take a trip you couldn't afford before
• Invest the money you were spending on payments
• Share your success to inspire others
• Financially help someone you love
• Change careers to something you love
• Start a business you've been dreaming about

Becoming debt-free opens possibilities. Make sure you use your new financial freedom intentionally.`,
          keyPoints: [
            'Monthly check-ins keep you aware and motivated - make it a ritual',
            'Celebrate milestones with inexpensive celebrations - recognition matters',
            'Accountability partners increase success rate significantly',
            'Visualize benefits in terms of interest saved, time gained, and freedom',
            'One missed month doesn\'t derail a multi-year plan - get back on track',
            'Focus on progress, not perfection - 80% consistent beats 100% perfect',
            'When debt-free, use the freed-up money intentionally for bigger goals'
          ]
        }
      ],
      keyTakeaways: [
        'Different types of debt have different characteristics - mortgages and credit cards are not equivalent',
        'Knowing exactly what you owe (balance, rate, terms) is the first step to control',
        'Snowball (smallest balance) and Avalanche (highest rate) methods both work - choose based on what motivates you',
        'You need to create a realistic budget and find money for extra payments - small consistent increases beat aggressive plans you abandon',
        'Addressing the root cause of debt (overspending, no emergency fund, emotional spending) is as important as paying it off',
        'Debt payoff is 30% math and 70% psychology - staying motivated matters more than perfect strategy',
        'Track progress monthly, celebrate milestones, and use accountability partners to maintain momentum',
        'Once debt-free, maintain the habits that got you there - credit cards, emergency fund, and budgeting remain important'
      ],
      actionItems: [
        'List all your debts (creditor, balance, interest rate, payment) - see the full picture',
        'Calculate your debt-to-income ratio and annual interest paid - these numbers reveal priority',
        'Choose between Snowball and Avalanche methods based on what motivates you psychologically',
        'Create a realistic monthly budget and identify specific spending cuts for extra debt payments',
        'Set up automatic minimum payments on all debts to avoid late fees and credit damage',
        'Set up automatic extra payments toward your target debt based on your strategy',
        'Create a visual progress tracker (spreadsheet, chart, or app) you\'ll check monthly',
        'Find accountability partner or online community to share progress and get support',
        'Calculate and write down your specific debt-free date and post it somewhere visible',
        'Schedule monthly 35-minute check-in ritual to review progress and recommit to goal',
        'Identify your personal debt triggers and create systems to prevent new debt creation',
        'If you have high-interest debt, consider balance transfer or debt consolidation options'
      ],
      resources: [
        {
          type: 'tool',
          title: 'Debt Payoff Calculator',
          description: 'Calculate payoff timeline and interest savings',
          url: '/tools/debt-calculator'
        },
        {
          type: 'tool',
          title: 'Budget Builder',
          description: 'Create your personalized spending plan',
          url: '/tools/budget-builder'
        },
        {
          type: 'article',
          title: 'Credit Score Recovery After Debt Payoff',
          description: 'Rebuild credit while managing debt',
          url: '/blog/credit-recovery'
        },
        {
          type: 'resource',
          title: 'Non-Profit Credit Counseling',
          description: 'Free or low-cost professional help',
          url: 'https://www.nfcc.org'
        }
      ]
    };

    const { error: error2 } = await supabase
      .from('lessons')
      .update({ content: debtContent })
      .eq('course_id', debtCourse.id)
      .eq('slug', 'taking-control-of-debt');

    if (error2) {
      log(`❌ Error updating debt management content: ${error2.message}`, 'red');
    } else {
      log('✅ Completed debt management lesson content', 'green');
    }

    log('\n✅ All fixes completed successfully!\n', 'green');

  } catch (error) {
    log(`\n❌ Error: ${error}`, 'red');
  }
}

fixIssues();
