import { Lesson } from '@/types/curriculum'

export const creditReportsScores: Lesson = {
  id: 'credit-reports-scores',
  courseId: 'credit-management',
  slug: 'credit-reports-scores',
  title: 'Credit Reports & Scores',
  description: 'Learn what credit reports and scores are, how they work, and how to read and interpret yours.',
  durationMinutes: 45,
  displayOrder: 2,
  objectives: [
    'Understand what a credit report contains and who creates it',
    'Learn how credit scores are calculated and what they mean',
    'Know how to get your free credit reports',
    'Read and interpret your credit report accurately',
    'Identify errors and know your rights regarding credit reporting'
  ],
  keyConcepts: [
    'Credit Report',
    'Credit Score',
    'FICO Score',
    'Credit Bureaus',
    'Score Factors'
  ],
  content: {
    introduction: `Your credit report and credit score are like your financial report card. They tell lenders whether you're a responsible borrower.

But here's what most people don't know: You can check your credit report for free. You can understand it. You can improve it. And you should be checking it regularly.

This lesson demystifies credit reports and scores. You'll learn exactly what they are, how they're calculated, where they come from, and how to access and interpret your own.

No more fear, no more confusion. Just clear understanding of this critical part of your financial life.`,

    sections: [
      {
        title: '1. Credit Reports: What They Are',
        content: `A credit report is a detailed history of how you've handled credit and debt.

**What's On Your Credit Report:**

**Personal Information:**
• Full name (and previous names)
• Current and previous addresses
• Social Security number
• Date of birth
• Current and previous employers

**Credit Accounts:**
• Credit cards (open and closed)
• Loans (car, student, personal, mortgage)
• Account opening dates
• Credit limits or loan amounts
• Current balances
• Payment history (on-time, late, missed)
• Account status (open, closed, paid off)

**Credit Inquiries:**
• Hard inquiries (when you apply for credit)
• Soft inquiries (when you check your own or background checks)
• Date of each inquiry

**Public Records:**
• Bankruptcies
• Tax liens
• Civil judgments
• Foreclosures

**Collections:**
• Accounts sent to collection agencies
• Medical debt in collections
• Other unpaid debts

**What's NOT On Your Credit Report:**

• Your income or salary
• Bank account balances
• Investment accounts
• Debit card usage
• Utility payments (usually)
• Rent payments (usually, though this is changing)
• Criminal record
• Race, religion, gender
• Medical history (just medical debt)

**Who Creates Credit Reports:**

The Three Major Credit Bureaus:
• **Equifax**
• **Experian**
• **TransUnion**

These are private companies that collect information from:
• Lenders who report your payment history
• Public records
• Collection agencies

**Important: You have THREE credit reports**
One from each bureau. They're usually similar but can have differences.

**How Long Information Stays:**

• Most negative info: 7 years
• Bankruptcies: 7-10 years
• Positive accounts: 10 years after closing
• Hard inquiries: 2 years
• Unpaid tax liens: indefinitely

**Who Can See Your Credit Report:**

• Lenders (when you apply for credit)
• Landlords (when you apply to rent)
• Insurance companies (in most states)
• Employers (with your permission)
• YOU (anytime, for free)

**What They Can't See:**
• Soft inquiries (your own checks)
• Medical information beyond debt
• Your credit score from other sources`,
        examples: [
          'Lisa checked her Experian report and found: 2 credit cards, 1 car loan, 5 hard inquiries from last year, and all payments listed as on-time. Clean report.',
          'Carmen pulled all three reports and found her TransUnion report showed a collection account the other two didn\'t have. She disputed it (it was paid) and got it removed.',
          'Nina\'s report showed a car loan from 2015 that she paid off in 2018. It still appears as "paid" on her report and will stay for 10 years from 2018 (positive history).',
          'Rachel found an address on her report she\'d never lived at. It was from a creditor\'s error. She disputed it and it was removed within 30 days.'
        ],
        tips: [
          'You have three credit reports—check all three annually',
          'Credit report is your history; credit score is a number based on that history',
          'Negative items eventually fall off after 7-10 years',
          'You have the right to dispute errors on your report'
        ]
      },
      {
        title: '2. Credit Scores: How They Work',
        content: `Your credit score is a three-digit number (300-850) that predicts how likely you are to repay debt.

**Credit Score Ranges:**

• 800-850: Exceptional (top 20%)
• 740-799: Very Good
• 670-739: Good (average American)
• 580-669: Fair
• 300-579: Poor

**What Your Score Means:**

**750+:** Excellent
• Best interest rates
• Approved for premium credit cards
• Easy approval for loans
• Lowest insurance rates

**700-749:** Good
• Competitive interest rates
• Good credit card options
• Most loans approved
• Good insurance rates

**650-699:** Fair
• Higher interest rates
• Approved with conditions
• May need cosigner
• Limited card options

**Below 650:** Poor
• Very high interest rates or denied
• Difficult to get approved
• May need secured cards
• Higher deposits for rentals

**FICO vs. VantageScore:**

**FICO Score** (most widely used):
• Created by Fair Isaac Corporation
• Used by 90% of lenders
• Range: 300-850
• Multiple versions (FICO 8, 9, mortgage-specific, etc.)

**VantageScore** (newer):
• Created by the three bureaus together
• Used by some lenders, many free apps
• Range: 300-850
• Similar to FICO but slightly different calculation

**Why Your Scores Vary:**

You might see different scores because:
• FICO vs. VantageScore formulas differ
• Each bureau may have different information
• Different FICO versions (car loan FICO vs. credit card FICO)
• Scores update at different times

**Common Score Sources:**

• Credit Karma: VantageScore (free)
• Experian app: FICO (free)
• Credit card statements: FICO or VantageScore (free)
• MyFICO.com: FICO (paid, $20-40)
• AnnualCreditReport.com: Report only, no score (free)

**What Score You Need:**

**For credit cards:** 650+ (700+ for best rewards cards)
**For car loans:** 650+ (720+ for best rates)
**For mortgages:** 620+ minimum (740+ for best rates)
**For personal loans:** 600+ (700+ for best rates)
**For apartment rental:** 650+ usually

**The Reality:**

Most people don't have perfect 850 scores. You don't need perfect.

• 740+ gets you the best rates for most things
• 700+ is solid and opens most doors
• 650+ is workable but costs you more

Focus on getting above 740, not chasing 850.`,
        examples: [
          'Maya has 780 FICO (Exceptional). She qualifies for 0% car financing offers and premium travel rewards cards. Her score saved her $8,000 on her mortgage vs. 650 score.',
          'Carmen had 620 score (Fair). She got approved for car loan but at 12% interest vs. 4% her friend with 750 score got. Her lower score cost her $3,000 extra over loan term.',
          'Nina checks Credit Karma (shows 695) and Experian app (shows 710). Both are accurate—just different scoring models. She knows her FICO is around 710.',
          'Lisa improved score from 580 to 720 in 18 months. She went from denied for credit cards to approved for 0% balance transfer card that saved her $2,000 in interest.'
        ],
        tips: [
          'Credit score is calculated from your credit report information',
          'FICO is most important for loans; VantageScore for monitoring is fine',
          'You have dozens of credit scores—they\'ll vary slightly',
          '740+ gets you the best rates for most financial products'
        ]
      },
      {
        title: '3. How Credit Scores Are Calculated',
        content: `Understanding what affects your score helps you improve it.

**FICO Score Factors (Most Common):**

**1. Payment History (35% of score)**
Most important factor

What matters:
• Do you pay bills on time?
• Any late payments? (30, 60, 90+ days late)
• Any accounts in collections?
• Any bankruptcies, foreclosures, repossessions?

Impact:
• One 30-day late payment: -60 to -110 points
• Collections: -50 to -100 points
• Bankruptcy: -130 to -200 points

How to maximize:
✅ Pay EVERY bill on time, every month
✅ Set up automatic payments
✅ Payment history stays for 7 years

**2. Amounts Owed / Credit Utilization (30% of score)**
How much of your available credit you're using

What matters:
• Balance on credit cards vs. credit limit
• How many accounts have balances
• Total debt across all accounts

The magic number: Under 30% utilization (under 10% is best)

Examples:
• $3,000 limit, $900 balance = 30% (okay)
• $3,000 limit, $300 balance = 10% (excellent)
• $3,000 limit, $2,900 balance = 97% (terrible for score)

How to maximize:
✅ Keep credit card balances low
✅ Pay down high balances
✅ Don't close old cards (keeps higher total limit)
✅ Make multiple payments per month to keep balance low

**3. Length of Credit History (15% of score)**
How long you've had credit accounts

What matters:
• Age of oldest account
• Average age of all accounts
• How long since you used each account

Impact:
• Longer history = better score
• Newer accounts lower average age
• Closing old accounts hurts (lowers average age)

How to maximize:
✅ Keep oldest credit card open (even if you don't use it)
✅ Don't close old accounts in good standing
✅ Be strategic about opening new accounts

**4. Credit Mix (10% of score)**
Variety of credit types you manage

What matters:
• Revolving credit (credit cards)
• Installment loans (car, student, personal)
• Mortgage
• Mix shows you can handle different types

How to maximize:
✅ Having different types helps slightly
❌ Don't take out loans just for this—minor factor

**5. New Credit (10% of score)**
Recent credit activity

What matters:
• Hard inquiries (when you apply for credit)
• How many new accounts recently opened
• Time since most recent account

Impact:
• Each hard inquiry: -5 to -10 points temporarily
• Multiple inquiries in short time for same type (car shopping) count as one
• New accounts lower average age

How to maximize:
✅ Only apply for credit you need
✅ Rate shop within 14-45 day window (counts as one inquiry)
✅ Space out applications (wait 6 months between)

**What Doesn't Affect Your Score:**

• Your income
• Checking/savings account balances
• Debit card use
• Age, race, gender, religion
• Where you live
• Soft inquiries (checking your own score)
• Employment status

**The Quick Summary:**

Want good credit score?
1. Pay everything on time (35%)
2. Keep balances low on credit cards (30%)
3. Keep old accounts open (15%)
4. Have a mix of credit types (10%)
5. Don't apply for too much new credit (10%)`,
        examples: [
          'Elena pays all bills on time (35% perfect), keeps cards under 5% utilization (30% perfect), has 8-year credit history (15% good), has cards + car loan (10% good), no new credit (10% perfect). Result: 790 score.',
          'Carmen was late on one payment by 45 days. Her 720 score dropped to 650. That one late payment (35% factor) cost her 70 points. She set up autopay immediately.',
          'Nina had $8,000 in balances on $10,000 total limits (80% utilization). Her score was stuck at 640. She paid down to $2,000 (20% utilization) and score jumped to 710 in 2 months.',
          'Rachel closed her oldest credit card (7 years old) to "simplify." Her average account age dropped from 5 years to 2 years. Her score fell 30 points. She learned to keep old cards open.'
        ],
        tips: [
          'Payment history is 35%—always pay on time, no exceptions',
          'Keep credit card balances under 10% of limit for best scoring',
          'Don\'t close old accounts—they help your credit history length',
          'Each factor matters, but on-time payments matter most'
        ]
      },
      {
        title: '4. How to Get Your Credit Reports',
        content: `You're entitled to free credit reports. Here's how to get them:

**Free Annual Credit Reports:**

**AnnualCreditReport.com** (Official Site)
• Get all 3 reports free once per year
• From Equifax, Experian, TransUnion
• This is the ONLY official free site
• Authorized by federal law
• No credit score included (just reports)

How to use it:
• Visit www.annualcreditreport.com
• Request all 3 reports at once OR
• Request 1 report every 4 months (spreads throughout year)

Cost: $0

**Direct from Bureaus:**

**Experian.com**
• Free credit report and FICO score
• Updates monthly
• Experian Boost feature (add utility payments)

**Equifax.com**
• Free credit report
• No free score

**TransUnion.com**
• Free credit report through their app
• Free VantageScore

Cost: $0 (basic), paid plans $20+/month

**Free Apps:**

**Credit Karma** (creditkarma.com)
• Free TransUnion and Equifax VantageScores
• Updates weekly
• Credit monitoring
• Ads for financial products

**Experian App**
• Free Experian FICO score
• Updates monthly
• Credit monitoring

**Credit.com**
• Free Experian VantageScore
• Monthly updates
• Basic monitoring

**Through Credit Cards:**

Many cards offer free scores:
• Discover: Free FICO score (even for non-customers)
• Capital One: Free VantageScore
• Chase: Free VantageScore
• Amex, Citi, Bank of America: Free FICO scores for customers

**Paid Options (Usually Unnecessary):**

**MyFICO.com**: $20-40 one-time or $20-40/month subscription
• Multiple FICO scores
• All 3 bureau reports
• Monitoring

**Identity theft protection services**: $10-30/month
• Credit monitoring
• Identity theft insurance
• Dark web monitoring

**When You Need Paid:**
• Applying for mortgage (want most accurate FICO)
• Identity theft concern (want comprehensive monitoring)
• Otherwise, free options are sufficient

**The Smart Strategy:**

**Option 1: Stagger Free Reports**
• January: Equifax from AnnualCreditReport.com
• May: TransUnion from AnnualCreditReport.com
• September: Experian from AnnualCreditReport.com
= Coverage every 4 months for free

**Option 2: All at Once**
• Get all 3 reports once per year
• Review thoroughly
• Use free apps for score monitoring between

**What to Do When You Get Reports:**

1. Review each one carefully
2. Check for errors (wrong accounts, incorrect balances, etc.)
3. Dispute any errors
4. Check for signs of identity theft
5. Understand what's hurting your score
6. Create improvement plan`,
        examples: [
          'Lisa requests one free report every 4 months: Equifax in Jan, TransUnion in May, Experian in Sept. She monitors her credit year-round for free.',
          'Carmen gets all three reports in January before applying for car loan. She finds error on Experian (account reported late that wasn\'t), disputes it, gets it fixed before loan application.',
          'Nina uses Credit Karma weekly for score monitoring and AnnualCreditReport.com annually for detailed report review. Both free, comprehensive monitoring.',
          'Rachel applied for mortgage, paid $40 for MyFICO 3-bureau report to see exact scores lender would use. Worth it for big purchase. Uses free options otherwise.'
        ],
        tips: [
          'AnnualCreditReport.com is the ONLY official free report site',
          'Stagger free reports every 4 months for year-round monitoring',
          'Free apps (Credit Karma, Experian) are sufficient for regular monitoring',
          'Pay for reports only when applying for major loan (house, large car loan)'
        ]
      },
      {
        title: '5. Reading and Understanding Your Credit Report',
        content: `Once you have your report, you need to know how to read it.

**Section-by-Section Breakdown:**

**Personal Information Section:**
• Your name, SSN, DOB
• Current and former addresses
• Current and former employers

**What to check:**
✅ Name spelled correctly
✅ Addresses you recognize
✅ SSN is correct
✅ No unfamiliar names/addresses (sign of identity theft)

**Account Information Section:**
For each account, you'll see:

• **Account type**: Credit card, auto loan, mortgage, etc.
• **Account holder**: Individual, joint, authorized user
• **Account number**: Partially hidden (last 4 digits)
• **Status**: Open, closed, paid, charged off, in collections
• **Date opened**: When account started
• **Credit limit/Original amount**: For cards/loans
• **Current balance**: What you owe now
• **Payment history**: Chart showing on-time/late payments
• **High balance**: Most you've ever owed
• **Monthly payment**: Typical payment amount

**What to check:**
✅ All accounts are yours
✅ Balances are correct
✅ Statuses are accurate
✅ Payment history is correct (VERY important)
✅ No accounts you don't recognize

**Payment History Indicators:**

• OK/✓: Paid on time
• 30: 30 days late
• 60: 60 days late
• 90: 90+ days late
• CO: Charge off (very bad)
• BLANK: Account wasn't open yet that month

**Public Records Section:**
• Bankruptcies
• Tax liens
• Civil judgments
• Foreclosures

**What to check:**
✅ If present, are they accurate and current?
✅ Do dates match reality?
✅ Should any have fallen off yet (7-10 years)?

**Inquiries Section:**

**Hard inquiries**: When you applied for credit
• Shows who checked, when, why
• Each inquiry can ding score 5-10 points
• Stays 2 years, only affects score for 1 year

**Soft inquiries**: Background checks, pre-approvals, your own checks
• Doesn't affect score
• Only you can see these

**What to check:**
✅ All hard inquiries are from when you applied for credit
✅ No inquiries you didn't authorize (possible identity theft)
✅ Old inquiries over 2 years are removed

**Collections Section:**
• Accounts sent to collection agencies
• Medical bills, credit cards, utilities, etc.
• Collection agency name and amount

**What to check:**
✅ All collections are legitimate
✅ Amounts are correct
✅ Paid collections show as paid
✅ Dispute any errors

**Common Errors to Look For:**

• Accounts that aren't yours (identity theft)
• Closed accounts showing as open
• Paid accounts showing balance
• Late payments you made on time
• Duplicate accounts (same debt reported twice)
• Incorrect balances or credit limits
• Accounts belonging to someone with similar name
• Collections that were paid but still showing unpaid
• Ex-spouse's debts on your report

**How to Spot Identity Theft:**

🚨 Accounts you didn't open
🚨 Inquiries you didn't authorize
🚨 Addresses you never lived at
🚨 Debts you don't recognize
🚨 Collection accounts for things you didn't buy

**What Do If You Find Errors:**

1. Document the error
2. File dispute with credit bureau(s) showing error
3. Provide proof if you have it
4. Bureau has 30 days to investigate
5. Error must be corrected or verified
6. You can add statement if item is verified but you disagree

**How to File Dispute:**

Online (fastest):
• Equifax.com/disputes
• Experian.com/disputes
• TransUnion.com/disputes

By mail (creates paper trail):
• Send certified letter with proof
• Keep copies

**The Review Schedule:**

• Check all 3 reports: Once per year minimum
• Check one report: Every 4 months
• Monitor score: Monthly (via free apps)
• Before major loan: Get all 3 reports + scores`,
        examples: [
          'Lisa reviewed her report and found a credit card from 2015 showing $500 balance. She paid it off in 2016. She disputed it, provided proof of payment, and it was corrected to $0 within 3 weeks.',
          'Carmen found an address in California on her report. She\'s never lived in California. She disputed it as potential identity theft. Investigation showed creditor error—removed in 30 days.',
          'Nina\'s report showed her payment 30 days late in March. Her bank records proved she paid on time. She disputed with proof, and late payment was removed, boosting her score 40 points.',
          'Rachel found medical collection for $200 she\'d already paid. She sent proof of payment to all three bureaus. They removed it from all reports within a month.'
        ],
        tips: [
          'Read every line of your credit report—errors are common',
          'Dispute any errors immediately—you have the right',
          'Keep proof of payments for at least 7 years',
          'Check reports before applying for major loans to fix errors first'
        ]
      }
    ],

    keyTakeaways: [
      'You have three credit reports (Equifax, Experian, TransUnion) and multiple credit scores',
      'Credit reports show your entire credit history; credit scores predict likelihood you\'ll repay debt',
      'Get free credit reports from AnnualCreditReport.com—it\'s the only official free source',
      'Credit scores range 300-850; 740+ gets best rates; 700+ is good; below 650 costs you money',
      'Score factors: 35% payment history, 30% amounts owed, 15% length of history, 10% credit mix, 10% new credit',
      'Check all three reports annually and dispute any errors you find',
      'Credit Karma, Experian app, and many credit cards offer free score monitoring'
    ],

    actionItems: [
      'Get your free credit report from AnnualCreditReport.com this week',
      'Review your report line by line and note any errors or unfamiliar items',
      'Sign up for Credit Karma or Experian app for free ongoing score monitoring',
      'Dispute any errors you find on your credit report',
      'Set calendar reminder to check credit reports every 4 months'
    ],

    resources: [
      {
        title: 'AnnualCreditReport.com',
        type: 'tool',
        description: 'Official site for free annual credit reports from all three bureaus',
        url: 'https://www.annualcreditreport.com'
      },
      {
        title: 'Credit Karma',
        type: 'tool',
        description: 'Free credit scores and monitoring from TransUnion and Equifax',
        url: 'https://www.creditkarma.com'
      },
      {
        title: 'Credit Report Review Checklist',
        type: 'worksheet',
        description: 'Step-by-step checklist for reviewing your credit report for errors'
      },
      {
        title: 'How to Dispute Credit Report Errors',
        type: 'article',
        description: 'Consumer Financial Protection Bureau guide to disputing errors',
        url: 'https://www.consumerfinance.gov/ask-cfpb/how-do-i-dispute-an-error-on-my-credit-report-en-314/'
      }
    ]
  }
}
