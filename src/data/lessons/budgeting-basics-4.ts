import { Lesson } from '@/types/curriculum'

export const budgetingToolsApps: Lesson = {
  id: 'budgeting-tools-apps',
  courseId: 'budgeting-basics',
  slug: 'budgeting-tools-apps',
  title: 'Budgeting Tools & Apps',
  description: 'Discover the best budgeting tools and apps to make money management easier and more effective.',
  durationMinutes: 40,
  displayOrder: 4,
  objectives: [
    'Understand different types of budgeting tools and when to use each',
    'Compare popular budgeting apps and their features',
    'Choose the right tool for your specific situation and preferences',
    'Set up and optimize your chosen budgeting system',
    'Leverage technology to automate and simplify money management'
  ],
  keyConcepts: [
    'Budgeting Apps',
    'Spreadsheet Budgeting',
    'Automation',
    'Manual vs. Digital',
    'Privacy & Security'
  ],
  content: {
    introduction: `You don't need fancy tools to budget—pen and paper work fine. But the right tool can make budgeting so much easier that you actually stick with it.

The question isn't "Should I use a tool?" It's "Which tool matches how my brain works?"

Some people love detailed spreadsheets. Others want an app to do everything automatically. Some need the physical act of writing things down. And some want to track just enough to stay aware without obsessing.

This lesson will help you find YOUR perfect budgeting tool—the one you'll actually use consistently. Because the best budgeting system is the one you stick with.`,

    sections: [
      {
        title: '1. Types of Budgeting Tools',
        content: `Different tools serve different needs. Here's what's available:

**Manual Tools (Old School but Effective):**
• Pen & paper budgets
• Envelope system (cash in physical envelopes)
• Budget binder with printable worksheets
• Marble composition notebook method

Pros: Tactile, no tech needed, forces engagement, free
Cons: Time-consuming, can't track digitally, easy to lose
Best for: People who love hands-on, distrust tech, or learn better by writing

**Spreadsheet Budgeting:**
• Excel or Google Sheets templates
• Custom spreadsheets you build
• Free downloadable budget templates

Pros: Customizable, one-time setup, can track details, no subscription
Cons: Requires some tech skill, manual data entry, not mobile-friendly
Best for: Detail-lovers, customization fans, one-time learners

**Basic Budgeting Apps (Free or Low-Cost):**
• Mint, PocketGuard, Goodbudget, EveryDollar (basic version)
• Connect to bank accounts, auto-categorize transactions
• Basic tracking and reports

Pros: Free, automatic, mobile-friendly, visual charts
Cons: Less customization, ads sometimes, basic features only
Best for: Beginners, people who want "set it and forget it"

**Premium Budgeting Apps:**
• YNAB (You Need A Budget), EveryDollar Plus, Monarch Money
• Advanced features, goal tracking, detailed categories
• Usually $10-15/month or $80-100/year

Pros: Powerful features, excellent support, comprehensive tracking
Cons: Subscription cost, learning curve, maybe overkill for simple needs
Best for: Serious budgeters, goal-focused people, those wanting accountability

**Hybrid Systems:**
• App for fixed bills + cash envelopes for variable spending
• Spreadsheet for planning + app for tracking
• Paper budget + digital account checking

Pros: Best of both worlds, flexible, works with your natural habits
Cons: Slightly more complex, requires discipline on both fronts
Best for: People who like certain aspects of different systems`,
        examples: [
          'Sophia tried five apps before realizing she just needed a simple Google Sheets template. She spends 10 minutes weekly updating it and it works perfectly.',
          'Cash-user Carmen uses physical envelopes for groceries, gas, and fun money (her problem areas), but Mint to auto-track her fixed bills. Hybrid system works great.',
          'Tech-savvy Mia loves YNAB because she\'s goal-oriented. The $99/year cost motivates her to use it daily. She\'s saved $3,000+ by tracking closely.',
          'Rachel downloaded four free apps, got overwhelmed by features, and went back to a spiral notebook. She writes income, expenses, and totals weekly. Simple and sustainable for her.'
        ],
        tips: [
          'Start with free options before paying for premium tools',
          'Match tool to your tech comfort level—don\'t force it',
          'The simplest tool that meets your needs is the best choice',
          'Try a tool for at least 30 days before switching'
        ]
      },
      {
        title: '2. Popular Budgeting Apps Compared',
        content: `Here's an honest comparison of the most popular apps:

**Mint (Free)**
• Auto-syncs with bank accounts
• Categorizes transactions automatically
• Bill tracking and credit score monitoring
• Ads and product recommendations

Who it's for: Beginners wanting free automation
Downside: Ads, less control over categories, owned by Intuit

**YNAB - You Need A Budget ($99/year or $14.99/month)**
• Zero-based budgeting philosophy
• Every dollar gets a job
• Excellent educational resources
• Goal tracking and reporting

Who it's for: Serious budgeters wanting to transform relationship with money
Downside: Cost, steeper learning curve, requires active engagement

**EveryDollar (Free basic, $79.99/year premium)**
• Based on Dave Ramsey's method
• Simple interface, easy to learn
• Premium version auto-syncs banks
• Strong debt payoff focus

Who it's for: Ramsey fans, people paying off debt
Downside: Free version requires manual entry, less robust than YNAB

**PocketGuard (Free basic, $7.99/month or $34.99/year premium)**
• "In My Pocket" feature shows available spending money
• Simplifies budgeting to one number
• Auto-categorization and bill tracking
• Lower goals tracking and insights

Who it's for: People who want simple, "how much can I spend?" answer
Downside: Less detailed than other apps, fewer features

**Goodbudget (Free for 10 envelopes, $8/month for unlimited)**
• Digital envelope budgeting system
• Manual transaction entry (forces awareness)
• Good for couples (syncs across devices)
• No bank account connection

Who it's for: Envelope method lovers, couples budgeting together
Downside: Manual entry (pro or con depending on preference)

**Monarch Money ($99.99/year)**
• Beautiful interface and experience
• Comprehensive tracking and planning
• Great for couples and families
• Excellent customer support

Who it's for: People wanting premium experience without Intuit ownership
Downside: Cost, newer app (less established)

**Simplifi by Quicken ($47.88/year)**
• Streamlined version of Quicken
• Watchlists for spending categories
• Income/spending projections
• Clean, modern interface

Who it's for: Former Quicken users wanting simpler version
Downside: Less community support than YNAB/EveryDollar`,
        examples: [
          'Beginner Tasha started with free Mint, used it for 6 months to learn budgeting basics, then upgraded to YNAB when she wanted more control. Free got her started.',
          'Debt-focused Nina uses EveryDollar free version. Manual entry keeps her super aware of spending. She\'ll upgrade to premium once debt is paid off.',
          'Married couple uses Goodbudget ($8/month) because they both see the same budget in real-time and love the envelope philosophy. Worth the cost for them.',
          'Elena tried YNAB for a year ($99), loved the method but felt like overkill. Switched to PocketGuard ($35/year) and it meets her simpler needs for less money.'
        ],
        tips: [
          'Most premium apps offer free trials—test before committing',
          'Read reviews from people in similar situations (single, married, debt payoff, etc.)',
          'Consider annual payment vs. monthly—it\'s cheaper',
          'Free isn\'t always best if it doesn\'t work for you—paid apps can save money through better tracking'
        ]
      },
      {
        title: '3. Spreadsheet Budgeting',
        content: `Don't underestimate the power of a good spreadsheet. It's free, customizable, and you control everything.

**Why Spreadsheets Work:**
• Completely customizable to your needs
• One-time setup, no monthly fees
• You own your data (privacy!)
• Can track details apps don't offer
• Works offline
• Easy to print and share

**Setting Up a Budget Spreadsheet:**

**Basic Structure:**
1. Monthly income section (all sources)
2. Fixed expenses list
3. Variable expenses list
4. Savings goals section
5. Actual vs. budgeted comparison columns
6. Month-over-month tracking

**Essential Formulas:**
• SUM (adds up totals)
• Income minus expenses (cash flow)
• Percent of income per category
• Year-to-date tracking

**Where to Find Templates:**
• Vertex42 (free Excel templates)
• Google Sheets template gallery
• Reddit r/personalfinance wiki
• Your bank's website often has them
• Create your own from scratch

**Spreadsheet Best Practices:**
• Use one tab per month
• Set up formulas once, copy for future months
• Color-code categories for quick scanning
• Include notes column for unusual expenses
• Back up to cloud (Google Drive, Dropbox)

**When Spreadsheets Make Sense:**
• You're comfortable with Excel/Sheets
• You want full control and customization
• You don't want to connect bank accounts to apps
• You're tracking complex situations (business + personal, multiple income sources)
• You're building your own debt payoff plan with specific dates and calculations`,
        examples: [
          'Elena uses a Google Sheets budget with one tab per month for the whole year. Formulas calculate everything automatically. She spends 15 minutes monthly updating and reviewing.',
          'Self-employed Carmen needs to track business vs. personal expenses. A custom spreadsheet with multiple categories and tax tracking works better than any app.',
          'Nina found a free template on Vertex42, customized it to her needs, and has used the same spreadsheet structure for 3 years. Zero cost, perfect fit.',
          'After realizing apps sold her data, privacy-conscious Jade switched to Excel budgeting. She controls everything and no company sees her financial information.'
        ],
        tips: [
          'Start with a template, don\'t build from scratch your first time',
          'Learn 3-4 basic formulas—that\'s all you need',
          'Set up your formulas correctly once, then just update numbers',
          'Save monthly versions so you can track progress over time'
        ]
      },
      {
        title: '4. Choosing the Right Tool for You',
        content: `Answer these questions to find your perfect match:

**1. What's your tech comfort level?**
• Love tech and apps → Premium budgeting app
• Comfortable with basic tech → Free app or Google Sheets
• Prefer tactile/hands-on → Paper budget or cash envelopes
• Mix of both → Hybrid system

**2. How much detail do you want?**
• Every transaction tracked and categorized → YNAB, EveryDollar, or spreadsheet
• Just the big picture → Mint, PocketGuard
• Minimal tracking, maximum results → Pay yourself first + simple spending tracking

**3. What's your budget for budgeting tools?**
• $0 → Mint, EveryDollar basic, Goodbudget basic, spreadsheet, paper
• Under $50/year → Simplifi, Goodbudget premium, PocketGuard
• $80-100/year → YNAB, EveryDollar Plus, Monarch Money
• Time is money → Premium app to save time vs. free manual system

**4. Are you budgeting solo or with a partner?**
• Solo → Any tool works
• Couple → Goodbudget, YNAB, Monarch (multi-device sync is key)

**5. What's your primary goal?**
• Learning to budget → Free app to start
• Paying off debt → EveryDollar or YNAB
• Building wealth → YNAB or spreadsheet with investment tracking
• Just not overspending → PocketGuard, Mint
• Complete financial picture → Monarch, YNAB

**6. Privacy concerns?**
• Don't want apps accessing bank accounts → Spreadsheet, Goodbudget, paper
• Okay with bank connection for automation → Most apps work

**Decision Matrix:**
Try a tool for 30-60 days. If you dread using it, switch. If it feels natural, you found your match.`,
        examples: [
          'Low-tech Rachel tried Mint, hated logging in daily. Switched to paper budgeting and loves it. Right tool for her brain.',
          'Busy professional Sophia values time over money. Pays $99/year for YNAB because it saves her hours and she uses it daily. Worth every penny.',
          'Couple Maria and Jorge needed sync. Goodbudget ($8/month) lets them both see the same envelopes in real-time. Eliminated money fights—priceless.',
          'Private Carmen won\'t link bank accounts. She uses Excel and manually enters transactions weekly. Takes 10 minutes, maintains complete privacy.'
        ],
        tips: [
          'Your needs may change—what works now might not work in 2 years',
          'Don\'t feel locked in—switching tools is okay',
          'Consider your learning style: visual, hands-on, analytical?',
          'The tool should make budgeting EASIER, not harder'
        ]
      },
      {
        title: '5. Setting Up & Optimizing Your System',
        content: `Once you've chosen a tool, set it up properly from the start:

**Initial Setup (Week 1):**
1. Enter all income sources
2. List all fixed expenses with due dates
3. Estimate variable expenses based on last month
4. Set up budget categories that match your life
5. Connect bank accounts (if using an app)
6. Set up bill reminders

**Optimization (Week 2-4):**
7. Check categorization daily for accuracy
8. Adjust category amounts to match reality
9. Set up any automatic transfers (savings, investments)
10. Customize reports/dashboards to show what matters to you
11. Set notification preferences (helpful alerts, not annoying spam)

**Maintenance Routine:**
• Daily: Quick 2-minute check (if using app)
• Weekly: 15-minute review and adjustment
• Monthly: 30-minute deep dive and planning for next month
• Quarterly: Evaluate if tool still works for you

**Common Optimization Tips:**

**For Apps:**
• Turn off marketing notifications, keep only budget alerts
• Review auto-categorization and fix mistakes
• Customize category names to match your language
• Set up goals/targets for motivation
• Use mobile app for quick checks, desktop for detailed work

**For Spreadsheets:**
• Set up conditional formatting (red when over budget)
• Create charts/graphs for visual motivation
• Use data validation to prevent entry errors
• Set calendar reminders to update regularly

**For Manual Systems:**
• Keep supplies handy (notebook, envelopes always in same place)
• Make it pleasant (nice pen, colorful markers, stickers)
• Pair with enjoyable activity (coffee, music, favorite spot)
• Take photos of paper budget as backup

**Troubleshooting:**
• If you stop using it: Is it too complicated? Simplify.
• If categories don't work: Rename or combine them.
• If you're always over budget: Your budget is unrealistic—adjust to reality.
• If it feels like punishment: Add more "fun money" category—budgeting should feel empowering.`,
        examples: [
          'Nina spent 2 hours setting up YNAB properly with all accounts, categories, and goals. Now she spends just 10 minutes weekly maintaining it. Setup time was worth it.',
          'Tasha\'s Mint app sent 20 notifications daily. She turned off all except "approaching budget limit" alerts. Now it\'s helpful, not annoying.',
          'Elena color-coded her spreadsheet: green for under budget, red for over, yellow for "close." One glance shows her status. Visual cues motivate her.',
          'Rachel keeps her budget notebook and pen on her nightstand. Every night before bed, she spends 2 minutes updating. Routine makes it automatic.'
        ],
        tips: [
          'Invest time in proper setup—it pays off in easier maintenance',
          'Customize everything to match YOUR life and language',
          'If you stop using a tool, figure out why before switching',
          'Make budgeting as easy and pleasant as possible'
        ]
      }
    ],

    keyTakeaways: [
      'The best budgeting tool is the one you\'ll actually use consistently—not the most popular or feature-rich',
      'Free tools (Mint, spreadsheets, paper) work great for beginners and simple situations',
      'Premium apps ($80-100/year) can be worth it if they save time and improve results',
      'Match tool to your tech comfort, detail preference, and learning style',
      'Spreadsheets offer maximum customization and privacy with zero ongoing cost',
      'Proper initial setup and optimization makes long-term maintenance much easier',
      'You can switch tools anytime—don\'t feel locked into your first choice'
    ],

    actionItems: [
      'Based on the decision questions, identify which type of tool matches your needs',
      'Try one free option for 30 days (Mint, EveryDollar basic, spreadsheet template, or paper)',
      'Set up your chosen tool completely—all accounts, categories, and preferences',
      'Use it daily for one week to test if it fits your habits and workflow',
      'After 30 days, evaluate: Is this working? Do I need to switch or just optimize?'
    ],

    resources: [
      {
        title: 'Mint (Free Budgeting App)',
        type: 'tool',
        description: 'Popular free app with automatic transaction syncing and categorization',
        url: 'https://mint.intuit.com'
      },
      {
        title: 'YNAB (You Need A Budget)',
        type: 'tool',
        description: 'Premium budgeting app with 34-day free trial',
        url: 'https://www.youneedabudget.com'
      },
      {
        title: 'Free Budget Spreadsheet Templates',
        type: 'worksheet',
        description: 'Collection of free Excel and Google Sheets budget templates',
        url: 'https://www.vertex42.com/ExcelTemplates/money-management-template.html'
      },
      {
        title: 'Budgeting App Comparison Chart',
        type: 'article',
        description: 'Side-by-side comparison of features, costs, and user reviews',
        url: 'https://www.nerdwallet.com/article/finance/best-budget-apps'
      }
    ]
  }
}
