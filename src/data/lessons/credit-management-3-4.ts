import { Lesson } from '@/types/curriculum'

export const howToBuildOrRebuildCredit: Lesson = {
  id: 'how-to-build-or-rebuild-credit',
  courseId: 'credit-management',
  slug: 'how-to-build-or-rebuild-credit',
  title: 'How to Build or Rebuild Credit',
  description: 'Practical strategies to build credit from scratch or recover from past credit mistakes.',
  durationMinutes: 50,
  displayOrder: 3,
  objectives: [
    'Understand how to build credit when you have no credit history',
    'Learn strategies to rebuild credit after mistakes or hardship',
    'Know which credit-building tools work and which to avoid',
    'Create a timeline for improving your credit score',
    'Avoid common mistakes that slow credit building'
  ],
  keyConcepts: [
    'Secured Credit Cards',
    'Credit Builder Loans',
    'Authorized User Strategy',
    'Payment History Building',
    'Credit Utilization Management'
  ],
  content: {
    introduction: `Whether you're starting from zero or recovering from past mistakes, building credit is entirely possible. It just takes time, strategy, and consistency.

Bad credit isn't permanent. No credit isn't a life sentence. Both situations can be improved with the right approach.

The credit system rewards responsibility over time. You don't need to be perfect—you just need to be consistent and patient.

Let's create your personalized credit-building plan.`,

    sections: [
      {
        title: '1. Starting From No Credit',
        content: `Having no credit history is different from having bad credit—but both are challenging.

**Why "no credit" is a problem:**
• Can't get approved for regular credit cards
• Can't qualify for good loan rates
• May face difficulty renting apartments
• Some employers check credit

**Your Credit-Building Path:**

**Step 1: Become an Authorized User** (Fastest way to start)
• Ask a trusted family member with good credit to add you to their credit card
• Their payment history can appear on your credit report
• You don't need to use the card—just being listed helps
• Make sure they have perfect payment history and low utilization

**Step 2: Get a Secured Credit Card** (Most reliable method)
• Deposit $200-500 as collateral
• Use card for small purchases ($20-50/month)
• Pay in full every month
• After 6-12 months of perfect payments, many convert to regular cards

**Step 3: Credit Builder Loan** (Alternative option)
• Small loan ($500-1000) held in savings while you make payments
• Builds payment history
• You get the money back after final payment
• Available from credit unions and community banks

Start with at least 2 of these methods for faster results.`,
        examples: [
          'Maria (22, no credit) became authorized user on her mom\'s 10-year-old card. Her credit score went from 0 to 680 in 3 months just from that history.',
          'College grad Sophia got a $300 secured card from her credit union, used it for gas only, paid in full monthly. After 8 months, score hit 720 and she got approved for regular cards.',
          'After divorce, Carmen had to rebuild. She did all three: authorized user, secured card, and credit builder loan. Went from no credit to 700+ in 14 months.'
        ],
        tips: [
          'Authorized user strategy only works if the person has excellent payment history',
          'Don\'t close your secured card once you get regular cards—the age helps',
          'Use secured card for small recurring bill (Netflix, phone) and autopay it',
          'Be patient—building from zero takes 6-18 months to get good scores'
        ]
      },
      {
        title: '2. Rebuilding After Credit Damage',
        content: `Past mistakes don't define your future. Credit can be rebuilt—here's how:

**First, Assess the Damage:**
• Pull all 3 credit reports (free at AnnualCreditReport.com)
• List all negative items: late payments, collections, charge-offs
• Note when each item occurred (older = less impact)
• Check for errors and dispute them immediately

**Your Rebuild Strategy:**

**Immediate Actions (Month 1):**
• Dispute any errors on your reports
• Pay all current bills on time going forward
• Stop using credit cards if you can't pay in full
• Set up autopay for minimums at least

**Short-term (Months 2-6):**
• Get a secured card even if you have bad credit
• Make small purchases, pay in full monthly
• If you have collections, negotiate pay-for-delete
• Become authorized user on someone's good account

**Medium-term (Months 6-24):**
• Keep all accounts current—no new late payments
• Gradually pay down balances to below 30% limits
• Don't close old accounts even if paid off
• Consider credit builder loan for additional positive history

**The Golden Rule:** Time + Perfect Payment History = Rebuilt Credit

Negative items lose impact over time. Perfect payment history starting NOW gradually outweighs past mistakes.`,
        examples: [
          'After bankruptcy, Jennifer got a secured card within 3 months. 2 years of perfect payments brought her score from 520 to 680—enough to buy a house.',
          'Nina had 6 late payments from a rough year. She made 24 consecutive on-time payments. Her score recovered from 580 to 720 because recent history matters most.',
          'Collections-plagued Rachel negotiated pay-for-delete on 3 small accounts, got secured card, became authorized user. Score jumped 100 points in 8 months.'
        ],
        tips: [
          'Negative items fall off after 7 years—but don\'t wait, start rebuilding now',
          'Recent payment history weighs more than old mistakes',
          'One new late payment can undo months of progress—set up autopay',
          'Bankruptcy isn\'t the end—many people rebuild to 700+ within 2-3 years'
        ]
      },
      {
        title: '3. Credit-Building Tools: What Works',
        content: `Not all credit-building methods are equal. Here's what actually works:

**WORKS WELL:**

**Secured Credit Cards**
• Guaranteed approval with deposit
• Reports to all 3 bureaus (verify before applying)
• Builds payment history effectively
• Best option: Discover It Secured, Capital One Secured
• Avoid: Cards with annual fees over $50

**Credit Builder Loans**
• Available even with bad credit
• Specifically designed to build credit
• You get money back after paying
• Best source: Local credit unions
• Cost: Small interest (worth it for credit building)

**Becoming Authorized User**
• Fast results if primary has great credit
• No hard inquiry on your credit
• Free method
• Risk: If primary misses payments, hurts your score too

**WORKS OKAY:**

**Retail Store Cards**
• Easier approval than regular cards
• Often high interest rates
• Only use if you can pay in full
• Good for: Building initial credit only

**Rent Reporting Services**
• Services that report rent payments to credit bureaus
• Helps if you pay rent on time
• Cost: $10-20/month
• Best: Rental Kharma, Rent Reporters

**DOESN'T WORK / AVOID:**

**"Credit Repair" Companies**
• Can't remove accurate negative information
• Charge $50-100/month for what you can do free
• Often scams or overpriced
• DIY credit repair is free and legal

**"Piggybacking" Services**
• Paying strangers to add you as authorized user
• Risky, expensive, sometimes illegal
• Not worth the cost or risk`,
        examples: [
          'Yolanda wasted $600 on credit repair company that did nothing she couldn\'t do herself. Switched to secured card and saw better results in 3 months.',
          'Patricia\'s credit union offered $1000 credit builder loan at 5% interest. Total cost: $25. Credit score gain: 80 points. Best $25 she ever spent.',
          'Elena got retail cards at Target and Kohl\'s, used them once monthly for small purchases, paid in full. Combined with secured card, score went from 0 to 690 in a year.'
        ],
        tips: [
          'Secured cards are the gold standard for credit building—use them',
          'Avoid paying for credit repair—do it yourself for free',
          'Only become authorized user with someone you completely trust',
          'If using retail cards, never carry a balance—interest rates are terrible'
        ]
      },
      {
        title: '4. Timeline and Expectations',
        content: `Credit building takes time. Here's what to expect:

**Month 1-3: Foundation Phase**
• Get secured card or become authorized user
• Start making on-time payments
• Score may drop slightly from hard inquiry
• This is setup time—patience required

**Month 4-6: Early Progress**
• First positive payment history appears
• Score starts rising if payments are perfect
• May see 20-40 point increase
• Still too early for major credit applications

**Month 7-12: Visible Results**
• Consistent payment history shows pattern
• Score typically increases 50-100+ points
• May qualify for unsecured cards with fair terms
• Some rebuilders reach 680-700 range

**Month 13-24: Solid Credit**
• Credit history has age and depth
• Multiple accounts with perfect payment history
• Scores often reach 700+ if all payments on time
• Qualify for good rates on loans and cards

**Factors That Speed It Up:**
• Multiple credit-building accounts (secured card + authorized user)
• Keeping balances under 10% of limits
• Never missing a single payment
• Having older accounts remain open

**Factors That Slow It Down:**
• Even one late payment (setback of months)
• High credit utilization (over 30%)
• Closing old accounts
• Applying for too much credit at once`,
        examples: [
          'Fast rebuilder: Sarah did secured card + authorized user + credit builder loan. Went from 580 to 720 in 11 months with perfect execution.',
          'Typical rebuilder: Lisa did secured card only, paid on time every month. Went from 0 to 680 in 16 months. Solid, steady progress.',
          'Slow rebuilder: Carmen missed 2 payments during rebuild (forgot autopay). Each setback cost her 3-4 months of progress. Took 28 months to reach 700.'
        ],
        tips: [
          'Credit building is a marathon, not a sprint—expect 12-18 months minimum',
          'One missed payment can undo 6 months of work—set up autopay',
          'Don\'t apply for new credit every month—space applications 3-6 months apart',
          'Patience is mandatory—there are no shortcuts to good credit'
        ]
      },
      {
        title: '5. Common Mistakes to Avoid',
        content: `These mistakes can sabotage your credit-building efforts:

**Mistake #1: Missing Even One Payment**
• Single late payment can drop score 60-100 points
• Takes 6-12 months to recover
• Solution: Autopay everything, set calendar reminders

**Mistake #2: High Credit Utilization**
• Using 90% of your $500 limit hurts your score
• Keep balances under 30%, ideally under 10%
• Solution: Make multiple payments per month or increase limit

**Mistake #3: Closing Old Accounts**
• Reduces average age of credit
• Decreases available credit (raises utilization)
• Solution: Keep old cards open, use once per year

**Mistake #4: Applying for Too Much Credit**
• Multiple hard inquiries lower score
• Looks desperate to lenders
• Solution: Space applications 3-6 months apart, be selective

**Mistake #5: Only Having One Account**
• Credit mix matters for scoring
• All eggs in one basket
• Solution: Have 2-3 different types (card, loan, etc.)

**Mistake #6: Not Checking Your Reports**
• Errors happen frequently
• ID theft can destroy progress
• Solution: Check all 3 reports annually, monitor monthly

**Mistake #7: Paying Collections Without Strategy**
• Doesn't remove them from report
• Paying "resets" the date, making it look recent
• Solution: Negotiate pay-for-delete or wait for 7-year expiration

**Mistake #8: Impatience**
• Applying for real loans too soon
• Getting frustrated and giving up
• Solution: Accept timeline, focus on consistency`,
        examples: [
          'Tammy was doing great until she forgot autopay during vacation. One missed payment dropped her score from 680 to 610. Took 8 months to recover.',
          'Nina closed her old secured card after getting a regular card. Her average credit age dropped from 3 years to 8 months—score fell 40 points. She reopened it.',
          'Rachel paid off 4 collections thinking it would help immediately. Her score didn\'t change because paid collections still show for 7 years. Should have negotiated deletion first.'
        ],
        tips: [
          'Set up autopay for at least minimums on every account',
          'Never close your oldest card unless it has a huge annual fee',
          'Check credit reports quarterly during building phase',
          'If rebuilding after collections, learn about pay-for-delete negotiations',
          'Treat credit building like fitness—consistency over time wins'
        ]
      }
    ],

    keyTakeaways: [
      'Building credit from zero takes 6-18 months with secured cards and consistent payments',
      'Rebuilding damaged credit takes 12-24 months but is absolutely possible',
      'Secured credit cards are the most reliable credit-building tool',
      'Becoming an authorized user can give fast results if primary has perfect history',
      'Payment history is 35% of your score—never miss a payment while building',
      'Keep credit utilization under 30% (under 10% is even better)',
      'Time + consistency = rebuilt credit, but one mistake can set you back months'
    ],

    actionItems: [
      'Pull your credit reports from all 3 bureaus and identify any errors to dispute',
      'Apply for a secured credit card from a reputable issuer that reports to all bureaus',
      'Set up automatic payments on all accounts to ensure you never miss a payment',
      'If possible, ask a trusted family member to add you as authorized user',
      'Create a calendar reminder to check your credit reports every 3 months'
    ],

    resources: [
      {
        title: 'Annual Credit Report',
        type: 'tool',
        description: 'Free credit reports from all 3 bureaus (official government site)',
        url: 'https://www.annualcreditreport.com'
      },
      {
        title: 'Secured Credit Card Comparison',
        type: 'article',
        description: 'Compare best secured cards for building credit',
        url: 'https://www.nerdwallet.com/best/credit-cards/secured'
      },
      {
        title: 'Credit Builder Loan Finder',
        type: 'tool',
        description: 'Find credit builder loans from credit unions',
        url: 'https://www.selflender.com'
      },
      {
        title: 'Credit Dispute Letter Templates',
        type: 'worksheet',
        description: 'Free templates for disputing credit report errors',
        url: 'https://www.consumerfinance.gov/ask-cfpb/how-do-i-dispute-an-error-on-my-credit-report-en-314/'
      }
    ]
  }
}

export const choosingTheRightCreditCard: Lesson = {
  id: 'choosing-the-right-credit-card',
  courseId: 'credit-management',
  slug: 'choosing-the-right-credit-card',
  title: 'Choosing the Right Credit Card',
  description: 'Learn how to select credit cards that benefit you, not just the credit card companies.',
  durationMinutes: 40,
  displayOrder: 4,
  objectives: [
    'Understand the key features to compare when choosing credit cards',
    'Know the difference between rewards, cash back, and low-interest cards',
    'Learn how to read credit card terms and avoid hidden fees',
    'Match credit cards to your spending patterns and financial goals',
    'Avoid predatory cards that trap you in debt'
  ],
  keyConcepts: [
    'APR vs. Introductory Rates',
    'Rewards Programs',
    'Annual Fees',
    'Credit Card Terms',
    'Responsible Card Selection'
  ],
  content: {
    introduction: `Not all credit cards are created equal. Some are designed to help you. Others are designed to profit from your mistakes.

The credit card industry makes billions from fees and interest. Your job is to use their products strategically without becoming their profit source.

The right credit card can save you money, earn rewards, and build credit. The wrong one can trap you in expensive debt.

Let's learn to choose wisely.`,

    sections: [
      {
        title: '1. Understanding Credit Card Types',
        content: `Different cards serve different purposes. Choose based on YOUR situation:

**Secured Credit Cards**
• Require deposit ($200-500)
• For building/rebuilding credit
• Usually no rewards
• Best for: Credit building phase only

**Cash Back Cards**
• Earn 1-5% back on purchases
• No points or complicated redemption
• Simple and straightforward
• Best for: People who pay in full monthly

**Rewards/Points Cards**
• Earn points for travel, merchandise, etc.
• Often higher rewards than cash back
• Can be complicated to redeem
• Best for: Organized people who travel

**Balance Transfer Cards**
• 0% APR for 12-21 months on transferred balances
• Usually 3-5% transfer fee
• Regular APR kicks in after promo period
• Best for: Paying off existing debt strategically

**Low Interest Cards**
• Lower APR than average (10-15% vs. 20-25%)
• Usually no rewards
• Lower fees
• Best for: People who sometimes carry balances

**Student Cards**
• For college students
• Easier approval
• Lower limits
• Some have rewards
• Best for: Students building credit

**Store Cards**
• Only usable at specific retailers
• Often 20-30% APR
• Usually easier approval
• Sometimes good initial discount
• Best for: Avoid unless you shop there weekly and pay in full`,
        examples: [
          'New to credit Maria got Discover It Secured to build credit. After 8 months of perfect payments, they upgraded her to regular Discover It with cash back. Smart progression.',
          'Frequent traveler Sophia has Chase Sapphire for 3x points on travel/dining. She flies free twice yearly from points. Worth it because she pays in full always.',
          'Debt-focused Carmen got 0% balance transfer card, moved $5,000 debt, paid it off in 15 months interest-free. Saved $1,200 in interest. Strategic use.'
        ],
        tips: [
          'If building credit, start with secured card—don\'t reach for rewards yet',
          'If you carry balances, skip rewards cards and get low APR card',
          'Don\'t get a card just for sign-up bonus—choose for long-term use',
          'Store cards are almost never worth it—interest rates are predatory'
        ]
      },
      {
        title: '2. Key Terms to Compare',
        content: `These factors determine if a card is good or bad for YOU:

**APR (Annual Percentage Rate):**
• The interest rate if you carry a balance
• Average: 16-25%
• Matters if: You sometimes carry balances
• Doesn't matter if: You always pay in full

**Annual Fee:**
• Yearly cost just for having the card
• Range: $0-$500+
• Worth it if: Rewards exceed the fee
• Avoid if: You're building credit or rarely use card

**Intro APR:**
• Temporary low/zero interest period
• Usually 0% for 12-18 months
• Watch out: Regular APR after that
• Good for: Strategic debt payoff or large purchases

**Credit Limit:**
• Maximum you can charge
• Higher is better for utilization ratio
• But: Don't see it as "free money"

**Rewards Rate:**
• Cash back: 1-5% typical
• Points: Varies by program
• Categories: Some cards have rotating categories
• Calculate if: Worth it for your spending

**Foreign Transaction Fees:**
• 2-3% extra on international purchases
• Some cards have $0 foreign fees
• Matters if: You travel abroad

**Balance Transfer Fee:**
• Usually 3-5% of transferred amount
• Sometimes waived in promotions
• Calculate if: Worth it vs. interest saved

**Late Payment Fee:**
• $25-$40 typically
• First late often less than subsequent
• Avoid entirely: Set up autopay`,
        examples: [
          'Nina compared cards: Card A: 0% fee, 20% APR, 1% cash back vs. Card B: $95 fee, 16% APR, 2% cash back. She spends $20k/year. Card B earns $400 - $95 = $305 extra. Worth it.',
          'Traveler Elena specifically chose card with no foreign transaction fees. Saves 3% on every purchase abroad—$150+ per international trip.',
          'Budget-conscious Lisa avoided $99 annual fee card because her spending wouldn\'t earn enough rewards to cover it. Kept $0 fee card instead. Smart math.'
        ],
        tips: [
          'If you pay in full monthly, APR doesn\'t matter—focus on rewards and fees',
          'If you carry balances, APR is most important—skip rewards and annual fees',
          'Calculate whether annual fee is worth it: (rewards earned) - (annual fee) = net benefit',
          'Read the terms before applying—not just the marketing highlights'
        ]
      },
      {
        title: '3. Matching Cards to Your Situation',
        content: `The "best" card depends on YOUR financial situation and habits:

**If You're Building/Rebuilding Credit:**
• Secured card with no annual fee
• Reports to all 3 bureaus
• Don't worry about rewards yet
• Examples: Discover It Secured, Capital One Secured

**If You Pay in Full Every Month:**
• Cash back or rewards card
• Annual fee okay if rewards exceed it
• Focus on categories you spend in
• Examples: Chase Freedom, Citi Double Cash

**If You Sometimes Carry Balances:**
• Low APR card (under 15%)
• No annual fee
• Forget rewards—APR savings matter more
• Examples: PenFed Platinum, Navy Federal Cash Rewards

**If You're Paying Off Debt:**
• 0% balance transfer card
• Calculate transfer fee vs. interest saved
• Plan to pay off during 0% period
• Examples: Chase Slate Edge, Citi Simplicity

**If You Travel Frequently:**
• Travel rewards card
• No foreign transaction fees
• Annual fee often worth it for perks
• Examples: Chase Sapphire, Capital One Venture

**If You Have Specific Spending Category:**
• Category-specific card (gas, groceries, etc.)
• Pair with general cash back card
• Maximize rewards in your big categories
• Examples: Blue Cash (groceries), Costco (gas)

**If You're a Student:**
• Student card with no annual fee
• Some rewards to start good habits
• Lower limits protect you
• Examples: Discover Student, Capital One Student

Don't choose a card because it's "best"—choose because it's best for YOU.`,
        examples: [
          'Grocery-heavy mom Rachel got Blue Cash (6% groceries) for food shopping, Citi Double Cash (2% everything) for other purchases. Maximized categories.',
          'Debt-focused Jennifer got Citi Simplicity with 0% for 18 months, transferred $8k balance, paid $450/month, debt-free in 17 months. Saved $2,400 in interest.',
          'Simple-life Keisha wanted no complications. Got one flat 2% cash back card for everything. Easy to manage, good returns, no category tracking needed.'
        ],
        tips: [
          'Don\'t get multiple cards at once—space applications 3-6 months apart',
          'Your first card should be simple—complexity comes later if desired',
          'Match the card to your actual spending, not aspirational spending',
          'If decision is hard, choose the simpler option'
        ]
      },
      {
        title: '4. Reading the Fine Print',
        content: `Credit card companies hide the bad stuff in the terms. Here's what to look for:

**The Schumer Box**
• Required summary of all terms
• Must appear on applications
• Compares key features side-by-side
• Read this BEFORE applying

**Watch Out For:**

**Variable APR**
• "Prime + X%" means rate changes with market
• Your rate can increase even if you do nothing wrong
• Check current prime rate to calculate actual APR

**Penalty APR**
• Much higher rate (often 29.99%)
• Triggered by late payment or going over limit
• Can apply to existing balance, not just new charges
• May last indefinitely

**Grace Period**
• Time between purchase and interest charging
• Usually 21-25 days
• Some cards have shorter or no grace period
• Critical if you carry balances

**Compounding**
• How often interest is calculated
• Daily compounding = more expensive than monthly
• Matters only if you carry balances

**Universal Default**
• Less common now but exists
• Your rate increases if you're late with OTHER creditors
• Check if card has this clause

**Arbitration Clause**
• You can't sue; must use arbitration
• Most cards have this now
• Limits your legal options if there's a dispute

**Questions to Ask Before Applying:**
• What's the penalty APR and what triggers it?
• Is there a grace period for new purchases?
• What's the late fee and annual fee?
• Are there any hidden fees (balance inquiry, paper statement, etc.)?
• When do intro rates expire and what's the regular rate?`,
        examples: [
          'Patricia missed one payment and her card\'s penalty APR kicked in: 29.99% on her entire $2,000 balance. Cost her $50/month extra until she paid it off.',
          'Maria didn\'t notice her "0% intro rate" only applied to balance transfers, not purchases. New purchases charged 24.99% immediately. Read the fine print!',
          'Sophia\'s card charged $10/month for paper statements. She switched to electronic and saved $120/year. Small fees add up.'
        ],
        tips: [
          'Always read the Schumer Box before applying—it has all critical info',
          'If terms are confusing, that\'s a red flag—choose a simpler card',
          'Assume the worst: penalty APR, no grace period, highest fees—can you handle that?',
          'When in doubt, call issuer and ask questions before applying'
        ]
      },
      {
        title: '5. Red Flags: Cards to Avoid',
        content: `Some cards are designed to trap you. Avoid these:

**Predatory Features:**

**High Annual Fees for Bad Credit Cards**
• "Guaranteed approval" with $99-$300 annual fee
• Low credit limits ($300-500)
• You pay $300/year for a $300 limit card
• AVOID: Fee harvesting cards

**High APR Without Benefits**
• 28-36% APR with no rewards, high fees
• Targeting people with limited options
• Better option: Secured card with reasonable terms
• AVOID: Subprime cards from unknown issuers

**Deferred Interest Store Financing**
• "No interest if paid in full in X months"
• BUT: If not paid in full, interest charged retroactively
• Suddenly owe interest on original balance
• AVOID: Unless you're certain you'll pay in full

**Pre-Approval Scams**
• "Pre-approved" doesn't guarantee approval
• Leads to hard inquiry and possible denial
• Sometimes for bad deals anyway
• VERIFY: Check legitimate issuer websites

**Cards With Too Many Fees**
• Monthly maintenance fees
• Transaction fees
• Foreign fees
• Paper statement fees
• Balance inquiry fees
• AVOID: Fee stacking cards

**Sign-Up Bonus Traps**
• Must spend $5,000 in 3 months for bonus
• Encourages overspending to get "free" money
• Only makes sense if you'd spend anyway
• AVOID: Overspending for bonuses

**Good Rules of Thumb:**
• If card sounds too good to be true (for your credit), it probably is
• Avoid cards from issuers you've never heard of
• Don't choose a card just for the sign-up bonus
• If there's pressure to "apply now," walk away`,
        examples: [
          'Desperate for credit, Tammy got "guaranteed approval" card with $300 fee and $300 limit. Paid $300 to borrow $300. Wish she\'d gotten secured card instead.',
          'Nina bought furniture on "12 months no interest." Paid it off in 11 months to be safe. Her friend waited until month 13, got hit with $800 in backdated interest.',
          'Carmen signed up for card to get $200 bonus, had to spend $3,000 in 3 months. Overspent $1,500 she didn\'t need to. "Bonus" cost her money. Not worth it.'
        ],
        tips: [
          'If building credit, stick to secured cards from major banks',
          'Avoid "guaranteed approval" cards—they\'re almost always bad deals',
          'Don\'t pay annual fees unless rewards clearly exceed the cost',
          'If you can\'t calculate whether a card is good for you, it probably isn\'t',
          'When in doubt, choose the simplest, most transparent card'
        ]
      }
    ],

    keyTakeaways: [
      'Choose credit cards based on YOUR situation: credit building, debt payoff, rewards, or low interest',
      'If you pay in full monthly, focus on rewards and ignore APR; if you carry balances, prioritize low APR',
      'Read the Schumer Box before applying—it contains all critical terms in one place',
      'Annual fees are only worth it if your rewards exceed the fee amount',
      'Avoid predatory cards: high annual fees with low limits, deferred interest, excessive fee stacking',
      'Match cards to your actual spending patterns, not aspirational or bonus-chasing behavior',
      'When in doubt, simpler is better—complicated cards often hide problems in fine print'
    ],

    actionItems: [
      'Review your current credit cards and check their APR, fees, and rewards structure',
      'Calculate whether any annual fee cards you have are worth keeping based on your actual rewards',
      'If you carry balances, research low APR cards and consider switching',
      'Read the Schumer Box on your current card(s) to understand the terms you agreed to',
      'Make a list of your top 3 spending categories to inform future card choices'
    ],

    resources: [
      {
        title: 'Credit Card Comparison Tool',
        type: 'tool',
        description: 'Compare cards side-by-side by category and features',
        url: 'https://www.nerdwallet.com/credit-cards'
      },
      {
        title: 'Annual Fee Calculator',
        type: 'calculator',
        description: 'Calculate if a card\'s annual fee is worth the rewards',
        url: 'https://www.creditcards.com/calculators/annual-fee-calculator/'
      },
      {
        title: 'Understanding Credit Card Terms',
        type: 'article',
        description: 'CFPB guide to credit card terms and the Schumer Box',
        url: 'https://www.consumerfinance.gov/ask-cfpb/what-is-a-credit-card-interest-rate-what-does-it-mean-en-44/'
      },
      {
        title: 'Best Credit Cards by Category',
        type: 'article',
        description: 'Updated rankings of best cards for different needs',
        url: 'https://www.bankrate.com/credit-cards/best-credit-cards/'
      }
    ]
  }
}
