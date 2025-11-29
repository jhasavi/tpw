import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function createAdvancedLessons() {
  console.log('🚀 Creating advanced finance lessons...\n')

  // Use the existing "Investing 101" course
  const courseId = 'a54564b2-ce24-4a58-8357-c6382d3e3981' // Investing 101 course ID

  console.log('Adding lessons to Investing 101 course...\n')

  const lessons = [
    {
      title: 'Understanding Interest',
      slug: 'understanding-interest',
      description: 'Master simple interest, compound interest, continuous compounding, and APY calculations with practical examples',
      display_order: 1,
      duration_minutes: 45,
      objectives: ['Calculate simple and compound interest', 'Understand APY vs APR', 'Compare investment options'],
      key_concepts: ['Simple interest', 'Compound interest', 'APY', 'Continuous compounding'],
      content: {
        markdown: `# Understanding Interest

## Learning Goals
- Know key terms: **principal, interest, APR, APY**
- Compute **simple interest** and **future value**
- Compute **compound interest** (monthly/daily) and **continuous compounding**
- Compare offers using **APY** (effective annual rate)

## Key Terms

- **Principal (P):** the amount borrowed or invested
- **Interest:** the cost of borrowing money or the reward for saving
- **APR:** nominal annual rate (doesn't account for compounding frequency)
- **APY:** effective annual rate **after** compounding is considered

## Simple Interest

**Formula:**  
\`I = P × r × t\`  
\`A = P + I = P(1 + r × t)\`

where:
- P = principal
- r = APR (decimal)
- t = time in years

### Example: Short Personal Loan
You borrow **$2,800** for **9 months** at **12.5%** simple interest.

- Convert months to years: t = 9/12 = 0.75
- I = 2,800 × 0.125 × 0.75 = $262.50
- **Total owed:** A = 2,800 + 262.50 = **$3,062.50**

## Compound Interest

**Formula:**  
\`A = P(1 + r/n)^(n×t)\`

where n = number of compounding periods per year

### Example: Monthly Compounding (Savings)
Deposit **$7,500** at **3.2% APR**, compounded **monthly**, for **6 years**.

A = 7,500 × (1 + 0.032/12)^(12×6) ≈ **$9,215.92**

### Daily vs. Quarterly Compounding
You have **$18,000** for **10 years**.

- **Account A:** 2.05% APR, daily compounding (n=365) → **$22,048.75**
- **Account B:** 2.30% APR, quarterly compounding (n=4) → **$22,908.17**

**Takeaway:** Slightly higher APR with less frequent compounding can win!

## Continuous Compounding

**Formula:**  
\`A = P × e^(r×t)\`

### Example
Invest **$5,000** at **2.1%**, continuously compounded, for **15 years**:

A = 5,000 × e^(0.021×15) ≈ **$6,851.41**

### Time to Double
Solve 2 = e^(r×t) → t = ln(2)/r

At 2.1%, t ≈ **33.0 years** to double your money

## APY - Effective Annual Rate

**Formula:**  
\`APY = (1 + r/n)^n - 1\`

### Compare Banks
- Bank X: 4.80% APR, monthly compounding → APY ≈ **4.91%**
- Bank Y: 4.75% APR, daily compounding → APY ≈ **4.86%**

**Conclusion:** Bank X yields more despite similar APR

## Common Compounding Intervals

| Interval | n value |
|-----------|----------|
| Annually | 1 |
| Semiannually | 2 |
| Quarterly | 4 |
| Monthly | 12 |
| Weekly | 52 |
| Daily | 365 |

## Calculator Tips

Use Excel/Google Sheets:
- Simple interest: \`=P*r*t\`
- Compound interest: \`=P*(1+r/n)^(n*t)\`
- APY: \`=(1+r/n)^n-1\`

## Practice Problems

1. Simple interest: Borrow **$4,600** at **9.2%** simple interest for **18 months**
2. Compound monthly: Invest **$3,900** at **5.1% APR**, monthly compounding, for **4 years**
3. Continuous compounding: How long to reach **$8,000** from **$6,500** at **2.4%** continuously?
4. APY: Find the APY for **3.85% APR** with **daily** compounding
5. Compare offers:
   - A: 4.35% APR, quarterly
   - B: 4.30% APR, daily

### Answers
1. $5,234.80
2. $4,752.06
3. 8.25 years
4. 3.92%
5. Offer A (4.44% APY) wins

## Key Takeaways

- **Simple interest** grows linearly; **compound interest** grows exponentially
- For fair comparisons, use **APY**, not APR
- Frequency matters, but **rate differences often dominate**
- Understanding interest helps you make better financial decisions with savings accounts, loans, and investments`
      }
    },
    {
      title: 'Saving and Investing',
      slug: 'saving-and-investing',
      description: 'Learn about present value, annuities, retirement savings, stocks, and bonds with practical calculations',
      display_order: 2,
      duration_minutes: 50,
      objectives: ['Calculate present value', 'Understand annuities', 'Plan for retirement'],
      key_concepts: ['Present value', 'Annuities', 'Compound interest', 'Stocks', 'Bonds'],
      content: {
        markdown: `# Saving and Investing

## Present Value (PV)

The **present value** is the amount you need today to achieve a desired **future value (FV)** after earning interest.

**Formula:**  
\`PV = A / (1 + r/n)^(n × t)\`

### Example 1
You want $200,000 in 15 years. Your account earns 4.2% APR compounded monthly.

PV = 200,000 / (1 + 0.042/12)^(12×15) ≈ **$110,239.87**

You'd need to invest **$110,240 now** to have $200,000 in 15 years.

## Annuities - Regular Deposits

An **annuity** means equal deposits made at regular intervals.

**Formula for payment (PMT):**  
\`PMT = FV × [(r/n) / ((1 + r/n)^(n×t) – 1)]\`

### Example 2: Saving for a Goal
You want $150,000 in 12 years. Your account earns 5% APR compounded monthly.

PMT = 150,000 × (0.05/12) / ((1 + 0.05/12)^(12×12) – 1) ≈ **$796.13**

Deposit **$796/month** for 12 years to reach $150,000.

- Total deposits: 796 × 12 × 12 = $114,624
- Interest earned: 150,000 – 114,624 = **$35,376**

## Future Value of an Annuity

If you're already making regular deposits, find how much your account will be worth later.

**Formula:**  
\`FV = PMT × [((1 + r/n)^(n×t) – 1) / (r/n)]\`

### Example 3
Saving $250 per month for 10 years at 3.8% APR compounded monthly:

FV = 250 × ((1 + 0.038/12)^(12×10) – 1) / (0.038/12) ≈ **$36,115.09**

After 10 years, you'll have about **$36,115**, having contributed $30,000 and earned $6,115 in interest.

## Retirement Savings (401k Example)

You and your employer each contribute $200/month (total $400). The plan earns 6.5% APR compounded monthly.

After 20 years:  
FV = 400 × ((1 + 0.065/12)^(12×20) – 1) / (0.065/12) ≈ **$185,416.03**

If left invested for another 15 years without contributions:  
A = 185,416 × (1 + 0.065/12)^(12×15) ≈ **$468,218.62**

## Reading a Stock Listing

| Term | Meaning |
|------|----------|
| **Ticker** | Stock symbol (e.g., AAPL) |
| **Prev Close** | Previous day's closing price |
| **Open** | Today's opening price |
| **52-Week Range** | Highest/lowest price in the past year |
| **Dividend Yield** | Annual dividend ÷ share price |
| **Beta** | Volatility measure (1 = average) |

### Example
If a stock trades at $125 with a $0.80 annual dividend, its yield is (0.8 / 125) = **0.64%**

## U.S. Savings Bonds (Series EE)

Series EE bonds earn low interest but are guaranteed to double after 20 years.

Example: $500 bond at 0.2% APR, compounded twice per year.

After 15 years:  
A = 500 × (1 + 0.002/2)^(2×15) ≈ **$515.07**

After 20 years, if not doubled by interest, the government adjusts its value to **$1,000**.

## Practice Problems

1. How much must you invest now to have $75,000 in 10 years at 3.5% APR compounded quarterly?
2. How much should you deposit monthly to reach $60,000 in 8 years at 5% APR compounded monthly?
3. You deposit $100 per month for 15 years at 4.8% APR. What's the future value and total interest?
4. A bond earns 0.15% APR compounded semiannually. What's the value of a $1,000 bond after 10 years?
5. A stock pays a $1 dividend and trades at $40. What's its yield?

## Key Takeaways

- **Present value** tells how much you need today for a future goal
- **Annuities** build savings steadily through regular deposits
- **Future value** shows how contributions grow with compounding
- **Retirement savings** benefit most from time and compounding
- **Stocks and bonds** offer different risk and reward profiles
- Start early, contribute consistently, and let compound interest work for you`
      }
    },
    {
      title: 'Borrowing Money',
      slug: 'borrowing-money',
      description: 'Understand loans, mortgages, credit cards, and payday loans with detailed calculations and comparisons',
      display_order: 3,
      duration_minutes: 55,
      objectives: ['Calculate loan payments', 'Understand amortization', 'Avoid predatory lending'],
      key_concepts: ['Fixed installment loans', 'Mortgages', 'Credit cards', 'APR'],
      content: {
        markdown: `# Borrowing Money

## Fixed Installment Loans

A **fixed installment loan** has equal monthly payments over a fixed period.

**Formula:**  
\`PMT = P × (r/n) / [1 − (1 + r/n)^(-n×t)]\`

Where:
- **PMT** = monthly payment
- **P** = principal (amount borrowed)
- **r** = annual interest rate (decimal)
- **n** = payments per year
- **t** = number of years

### Example
You borrow **$18,000** at **4.5% APR** for **5 years**, with monthly payments.

PMT = 18,000 × (0.045/12) / [1 − (1 + 0.045/12)^(-60)] ≈ **$335.04/month**

- **Total paid:** 335.04 × 60 = $20,102.40
- **Interest paid:** $2,102.40

## Down Payment & Auto Loans

A **down payment** reduces the loan amount.

### Example
Buying a car for **$32,000** with:
- $750 rebate (recent graduate)
- 15% down payment

Down Payment = 0.15 × 32,000 = **$4,800**  
Amount Financed = 32,000 − 750 − 4,800 = **$26,450**

With 3.9% APR over 6 years:  
PMT ≈ **$411.77/month**  
**Total Paid:** $411.77 × 72 + 4,800 = **$34,646.44**

## Comparing Loan Options

Buying a car for $25,000 with two choices:

| Option | Offer | APR | Term | Rebate | Total Cost |
|--------|-------|-----|-------|---------|-------------|
| A | Low APR Financing | 1.9% | 60 months | None | ~$26,230 |
| B | Cash Rebate | 4.0% | 48 months | $1,000 | ~$25,900 |

**Tip:** Choose the option with **lower total cost** if keeping long-term. If cash flow is tight, lower monthly payments might make sense.

## Mortgages - Long-Term Loans

A **mortgage** is a loan for real estate, typically 15–30 years.

### Example
- House Price: $300,000
- Down Payment: 20% = $60,000
- Loan Amount: $240,000
- APR: 3.6%, 30 years

PMT = 240,000 × (0.036/12) / [1 − (1 + 0.036/12)^(-360)] ≈ **$1,091.23/month**

- Total Paid: $1,091.23 × 360 = **$392,842.80**
- Interest: $392,842.80 − $240,000 = **$152,842.80**

Adding **property tax ($250)** and **insurance ($100)**, total monthly cost = **$1,441.23**

## Loan Amortization

Each payment is split between **interest** and **principal**. Early payments go mostly to interest. Later payments reduce more principal.

| Month | Payment | Principal | Interest | Balance |
|-------|----------|-----------|-----------|----------|
| 1 | $1,091.23 | $371.23 | $720.00 | $239,628.77 |
| 60 | $1,091.23 | $615.43 | $475.80 | $208,000.00 |
| 180 | $1,091.23 | $768.10 | $323.13 | $152,000.00 |

Use Excel's \`PMT\`, \`PPMT\`, and \`IPMT\` functions to generate an **amortization table**.

## Credit Cards - Open-Ended Loans

A **credit card** is open-ended—you can borrow repeatedly up to a **credit limit**, but unpaid balances incur interest.

If you owe $2,000 at **18% APR** and only make **minimum payments of 3%** (~$60/month), it could take over **10 years** to pay off—and you'll pay over **$1,000** in interest!

If instead you pay **$200/month**, the debt clears in **11 months**, saving you over **$800**.

## Paying Off Debt - Calculate Timeline

**Formula:**  
\`R = −log(1 − (r/n)(A/PMT)) / log(1 + r/n)\`

### Example
Credit card balance: $2,000  
APR: 18%  
Payment: $100/month

R = −log(1 − (0.18/12)(2000/100)) / log(1 + 0.18/12) ≈ **23 months**

## Payday Loans - The Danger

If a payday lender charges **$20 per $100 borrowed** for a two-week loan:

There are 26 two-week periods in a year → APR = 20% × 26 = **520% APR**!

Such loans trap borrowers in cycles of debt. Always check the **effective annual rate (EAR)** before borrowing.

## Credit Scores Matter!

Your **credit score** affects your borrowing cost.

| Credit Score | APR | Monthly Payment (3-year, $20,000 loan) | Total Cost |
|---------------|-----|---------------------------------------|-------------|
| 760 | 6.5% | $613.09 | $22,071 |
| 700 | 8.0% | $626.42 | $22,551 |
| 640 | 11.0% | $654.44 | $23,560 |

Improving your credit by 100 points could save you **over $1,500** on a 3-year loan.

## Key Takeaways

- **Borrow smart:** Check APR and total cost, not just monthly payment
- **Extra payments** save thousands in long-term interest
- **Credit score = borrowing power:** Higher score → lower rates
- **Avoid payday loans:** APRs can exceed 500%
- Use online **loan calculators** or Excel to visualize payment breakdowns
- Always read the fine print and understand total cost of borrowing`
      }
    },
    {
      title: 'Understanding Taxes and Federal Revenue',
      slug: 'taxes-and-federal-revenue',
      description: 'Learn about income tax, deductions, FICA, and how to minimize your tax burden legally',
      display_order: 4,
      duration_minutes: 50,
      objectives: ['Understand tax brackets', 'Calculate FICA taxes', 'Identify deductions'],
      key_concepts: ['Progressive tax', 'FICA', 'Deductions', 'Tax brackets'],
      content: {
        markdown: `# Understanding Taxes and Federal Revenue

## What Is Federal Revenue?

Federal revenue is money the U.S. government collects mainly from **taxes** to fund public services like national defense, education, infrastructure, and healthcare.

**Fun fact:** The 16th Amendment (ratified in 1913) gave Congress the power to collect income taxes annually.

## Gross Income vs. Adjusted Gross Income (AGI)

| Term | Definition |
|------|-------------|
| **Gross Income** | All earnings from wages, tips, bonuses, investments, and other sources |
| **Adjusted Gross Income (AGI)** | Gross income **minus allowable adjustments** (student loan interest, retirement contributions, HSA deposits) |

### Example
You earn **$60,000** a year and receive **$120** in bank interest.  
You paid **$1,500** in student loan interest and contributed **$4,000** to a traditional IRA.

- **Gross Income** = 60,000 + 120 = **$60,120**
- **Adjustments** = 1,500 + 4,000 = **$5,500**
- **AGI** = 60,120 − 5,500 = **$54,620**

## Deductions and Taxable Income

A **deduction** reduces the income that is taxed. You can choose:
- The **Standard Deduction** (a fixed amount based on filing status), or
- **Itemized Deductions** (specific expenses like charitable donations, mortgage interest, medical costs)

### 2024 Standard Deduction (approximate)

| Filing Status | Standard Deduction |
|----------------|--------------------|
| Single | $14,600 |
| Married Filing Jointly | $29,200 |
| Head of Household | $21,900 |

### Example
You and your spouse earn **$120,000** combined. You donate **$1,000** to charity and put **$6,000** in a retirement account.

Since the standard deduction of **$29,200** is higher than your itemized total, take the **standard deduction**.

**Taxable Income:**  
AGI = 120,000 − 6,000 = 114,000  
Taxable Income = 114,000 − 29,200 = **$84,800**

## Calculating Federal Income Tax

Taxes are computed using **tax brackets** that increase with income. Each portion of income is taxed at its bracket rate.

### Simplified 2024 Brackets (Married Filing Jointly)

| Taxable Income Range | Tax Rate |
|------------------------|----------|
| Up to $23,200 | 10% |
| $23,201 – $94,300 | 12% |
| $94,301 – $201,050 | 22% |
| Over $201,050 | 24%+ |

If your taxable income is **$84,800**:

- 10% on first $23,200 = $2,320
- 12% on remaining $61,600 = $7,392
- **Total Tax = $9,712**

## Refunds and Balances Owed

At year-end, compare **tax owed** to **taxes withheld** from your paycheck.

- If you paid **more than owed**, you get a **refund**
- If you paid **less**, you owe the **difference**

**Example:**  
Total tax: $3,800  
Total withheld: $3,500  
You owe: $3,800 − $3,500 = **$300**

## FICA Taxes - Social Security and Medicare

Besides federal income tax, your paycheck includes **FICA** taxes:

| Tax Type | Rate (Employee) | Rate (Employer) |
|-----------|----------------|----------------|
| **Social Security** | 6.2% (up to $168,600 income) | 6.2% |
| **Medicare** | 1.45% (no cap) | 1.45% |

### Example
You earn $3,000 per month.

- Social Security = 3,000 × 0.062 = **$186.00**
- Medicare = 3,000 × 0.0145 = **$43.50**
- **Total FICA = $229.50/month**

If self-employed, you pay **both shares** (total 15.3%).

## Estimating Net Pay

**Gross Pay** = $3,000  
**Federal Tax** = $300  
**FICA (Social Security + Medicare)** = $229.50  
**Net Pay** = $3,000 − (300 + 229.50) = **$2,470.50**

Your net pay is what's left after all deductions.

## Tax Deadlines & Filing Tips

- **Tax Day:** Usually **April 15** (extended only for emergencies)
- File early to avoid identity theft
- Keep copies of W-2s, 1099s, and receipts for deductions
- Use IRS Free File or tax-prep software for quick e-filing

## Key Takeaways

- **Gross Income** includes all earnings
- **Adjusted Gross Income** = Gross − Adjustments
- **Taxable Income** = AGI − Deductions
- **FICA taxes** fund Social Security and Medicare
- Track your **withholding** to avoid surprises at tax time
- Tax brackets are progressive—higher income portions taxed at higher rates
- Deductions and credits can significantly reduce your tax burden`
      }
    },
    {
      title: 'Smart Budgeting',
      slug: 'smart-budgeting',
      description: 'Master the 50/30/20 rule, expense tracking, and practical budgeting strategies with spreadsheet examples',
      display_order: 5,
      duration_minutes: 45,
      objectives: ['Create a realistic budget', 'Apply the 50/30/20 rule', 'Track expenses effectively'],
      key_concepts: ['50/30/20 rule', 'Fixed expenses', 'Variable expenses', 'Emergency fund'],
      content: {
        markdown: `# Smart Budgeting

## What Is a Budget?

A **budget** is a financial plan that helps you track income and spending. Think of it not as restriction but as **a spending plan**—giving every dollar a purpose.

### The 4 Basic Steps

1. **Calculate your income** (after taxes)
2. **List your expenses** (fixed + variable)
3. **Subtract expenses from income**
4. **Adjust or allocate** what's left toward goals, savings, or debt

## Everyday Spending Example

Track monthly "small" expenses:

| Activity | Frequency | Cost Each | Monthly Total |
|-----------|------------|-----------|----------------|
| Coffee | 3 times/week | $3.50 | $42 |
| Lunch with friends | Weekly | $12 | $48 |
| Streaming subscriptions | 2 services | $9.99 each | $19.98 |
| Occasional gifts | 2 birthdays | $20 | $40 |

**Total:** $149.98/month → **$1,800/year**

Small expenses add up! Tracking them helps find easy savings.

## Irregular or Periodic Expenses

If you have an expense once or a few times a year, **prorate** it (spread the cost monthly).

**Example:** $1,200 car insurance annually.  
Monthly amount to set aside = $1,200 ÷ 12 = **$100/month**

If taxes or fees are due quarterly, divide by 4 for quarterly payments or by 12 for monthly savings goal.

## Determining Monthly Net Pay and Expenses

**Example:** You earn $40,000 per year, pay $6,000 in income taxes and $3,000 in FICA.

1. **Net annual pay:** 40,000 − 6,000 − 3,000 = **$31,000**
2. **Net monthly pay:** 31,000 ÷ 12 = **$2,583.33**
3. **List monthly expenses:**
   - Rent: $1,000
   - Utilities: $150
   - Phone: $70
   - Groceries: $300
   - Transportation: $200
   - Insurance: $250
   - Loan payments: $150
   - Internet: $60

**Total expenses:** $2,180  
**Money left:** $2,583 − $2,180 = **$403 for savings or discretionary spending**

## Building a Simple Spreadsheet Budget

Create a budget in **Excel**, **Google Sheets**, or **Numbers**.

### Example Table

| Expense | Amount |
|----------|---------|
| Rent | $1,200 |
| Gas | $50 |
| Utilities | $150 |
| Internet | $60 |
| Phone | $70 |
| Health Insurance | $350 |
| Transportation | $400 |
| Food | $450 |
| Credit Card | $100 |
| Donations | $40 |
| **Total Expenses** | **$2,870** |

**Income:** $3,400/month  
**Remaining:** $3,400 − $2,870 = **$530 left**

Use formulas:
- \`=SUM(B2:B10)\` to total expenses
- \`=Income−Expenses\` to see remaining funds

## Deciding What to Do with Leftover Money

If you have money left at month's end, divide it among:
- **Emergency fund** (3–6 months of expenses)
- **Retirement savings (401k/IRA)**
- **Extra loan payments**
- **Fun spending (guilt-free!)**

A plan prevents money from "disappearing."

## The 50/30/20 Budgeting Rule

Divide your take-home pay into **three categories**:

| Category | % of Income | Examples |
|-----------|-------------|-----------|
| **Needs** | 50% | Rent, utilities, groceries, insurance, transportation |
| **Wants** | 30% | Dining out, shopping, travel, streaming services |
| **Savings/Debt** | 20% | Emergency fund, investments, student loans |

### Example
Monthly income: $3,200
- Needs (50%): $1,600
- Wants (30%): $960
- Savings/Debt (20%): $640

If rent increases by $150, trim "wants" or find new income to stay balanced.

## Comparing Spending Options

Evaluating three phone plans:

| Plan | Cost | Data | Minutes | Notes |
|------|------|------|----------|-------|
| Basic | $15 | 1 GB | 2,000 | Limited features |
| Standard | $30 | 2 GB | 2,000 | Most balanced |
| Premium | $50 | Unlimited | 1,100 | Great for heavy users |

Choose based on your **budget and habits**—not just the lowest price.

## Real-World Spending Trends

According to Bureau of Labor Statistics, **Americans under 35** spend most on **housing, food, and transportation**.

| Category | Under 35 Avg Annual | 35–54 Avg Annual | 55+ Avg Annual |
|-----------|--------------------|------------------|----------------|
| Housing | $31,000 | $45,000 | $37,000 |
| Food | $12,500 | $18,000 | $15,000 |
| Transportation | $15,000 | $20,000 | $13,000 |
| Entertainment | $4,000 | $6,000 | $5,000 |

Younger adults' expenses often exceed the ideal 50/30/20 split—mainly because **necessities** like rent and insurance take a larger share.

## Final Tips for Better Budgeting

- **Automate savings** to make it effortless
- Track your **spending trends monthly**
- Review and adjust your budget every 3–6 months
- Expect change—budgets evolve as your life does
- Be flexible: shift categories as long as you stay balanced overall

## Quick Recap

| Step | What to Do |
|------|-------------|
| 1 | Calculate monthly income |
| 2 | Track all expenses |
| 3 | Identify waste or overspending |
| 4 | Set realistic savings goals |
| 5 | Adjust monthly and repeat |

## Key Takeaways

- A budget is a **spending plan**, not a restriction
- Track **small expenses**—they add up fast
- Use the **50/30/20 rule** as a guideline
- **Prorate** irregular expenses to avoid surprises
- Review and adjust regularly
- Automate savings and debt payments
- Your budget should serve your goals and values`
      }
    }
  ]

  let created = 0
  let errors = 0

  for (const lesson of lessons) {
    try {
      const { data, error } = await supabase
        .from('lessons')
        .insert({
          course_id: courseId,
          ...lesson
        })
        .select()
        .single()

      if (error) throw error

      console.log(`✅ Created: ${lesson.title}`)
      created++
    } catch (error) {
      console.error(`❌ Error creating ${lesson.title}:`, error)
      errors++
    }
  }

  console.log(`\n✨ Done! Created ${created} lessons with ${errors} errors.`)
}

createAdvancedLessons()
