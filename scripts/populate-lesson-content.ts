/**
 * Populate lesson content from markdown files
 * This fills in the actual content for lessons that exist in the database
 */

import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

// Sample lesson content - we'll start with the Self-Assessment lesson
const selfAssessmentContent = {
  introduction: `Welcome to your financial literacy self-assessment! This interactive quiz will help you understand your current level of financial knowledge and identify areas where you can grow.

This isn't a test you can pass or fail - it's a tool to help you understand where you are on your financial journey. Be honest with yourself, and remember that everyone starts somewhere. The goal is to identify your strengths and areas for improvement.`,
  
  sections: [
    {
      title: "Why Take a Self-Assessment?",
      content: `Understanding your financial literacy level is the first step toward financial empowerment. This self-assessment will help you:

• Identify what you already know about money management
• Discover areas where you might need more learning
• Create a personalized learning path based on your needs
• Track your progress as you complete more lessons
• Build confidence in your financial decision-making

Think of this as creating a roadmap for your financial education journey. Just like you wouldn't start a road trip without knowing where you're starting from, you shouldn't begin your financial learning without understanding your current knowledge level.`,
      examples: [
        "Someone who's never had a budget might score lower on budgeting questions - that's okay! It tells them that's a great place to start learning.",
        "A person who's comfortable with credit cards but hasn't invested yet will see clearly where to focus their energy next.",
        "Understanding that you know a lot about saving but nothing about retirement planning helps you prioritize your learning time."
      ],
      tips: [
        "Answer honestly - this is just for you, and there's no judgment",
        "Don't guess if you truly don't know - 'I don't know' is valuable information",
        "Take notes on topics that surprise you or spark your curiosity",
        "Revisit this assessment every 3-6 months to see your progress"
      ]
    },
    {
      title: "How the Assessment Works",
      content: `The self-assessment quiz covers 15 major categories of financial literacy, from basic budgeting to advanced topics like estate planning. Each category has questions at three different levels:

**Beginner Level (25 questions per category)**
These questions cover fundamental concepts and basic vocabulary. They're designed to test your understanding of core ideas that form the foundation of financial literacy.

**Intermediate Level (25 questions per category)**
These questions explore practical applications and slightly more complex scenarios. They test whether you can apply basic concepts to real-world situations.

**Advanced Level (20 questions per category)**
These questions dive into sophisticated strategies, tax implications, and complex financial decisions. They're for those ready to tackle more nuanced financial topics.

The quiz is adaptive - you can start at any level and move between categories as you wish. There's no time limit, and you can take breaks whenever you need to.`,
      examples: [
        "Beginner: 'What is a budget?' - Testing basic understanding",
        "Intermediate: 'How should you allocate your emergency fund?' - Testing application",
        "Advanced: 'What are the tax implications of backdoor Roth conversions?' - Testing sophisticated knowledge"
      ],
      tips: [
        "Start with beginner questions to build confidence",
        "Focus on categories most relevant to your current life stage",
        "Don't feel pressure to complete everything in one sitting",
        "Use your results to create a personalized learning plan"
      ]
    },
    {
      title: "The 15 Financial Literacy Categories",
      content: `The assessment covers these comprehensive topics:

1. **Budgeting & Money Management** - Creating and maintaining a spending plan
2. **Banking & Accounts** - Understanding different account types and banking services
3. **Credit & Debt Management** - Building credit, managing debt, understanding scores
4. **Saving & Emergency Funds** - Building financial cushions and saving strategies
5. **Investing Basics** - Stocks, bonds, funds, and investment principles
6. **Retirement Planning** - 401(k)s, IRAs, Social Security, and long-term planning
7. **Insurance** - Protecting yourself with health, life, auto, and home insurance
8. **Taxes** - Understanding tax brackets, deductions, credits, and filing
9. **Real Estate** - Mortgages, home buying, investment properties
10. **Career & Income** - Negotiating salary, side hustles, career advancement
11. **Small Business** - Entrepreneurship basics, business structures, funding
12. **Estate Planning** - Wills, trusts, power of attorney, legacy planning
13. **Divorce & Financial Independence** - Protecting yourself during life transitions
14. **Financial Safety** - Avoiding scams, identity theft, and fraud protection
15. **Women's Financial Empowerment** - Addressing unique challenges and opportunities

Each category is designed to be comprehensive yet accessible, meeting you where you are in your financial journey.`,
      examples: [],
      tips: [
        "Some categories may be more relevant to your life stage than others",
        "It's okay to skip categories that don't apply to you yet",
        "Return to update your knowledge as your life circumstances change",
        "Use the results to prioritize which courses to take first"
      ]
    },
    {
      title: "What Happens After the Assessment?",
      content: `Once you complete the self-assessment (or sections of it), you'll receive:

**Personalized Results Dashboard**
See your scores by category, difficulty level, and overall financial literacy score. Visual charts help you understand your strengths and opportunities.

**Recommended Learning Path**
Based on your results, we'll suggest which courses to start with, which lessons to prioritize, and a recommended order for your learning journey.

**Progress Tracking**
Your results are saved so you can retake sections later and see how much you've learned. Watch your scores improve as you complete lessons and courses!

**Achievement Badges**
Earn recognition for completing assessment sections, improving scores, and demonstrating mastery in specific categories.

**Personalized Study Plan**
Get a custom 30-day, 60-day, or 90-day plan based on your goals, available time, and assessment results.

Remember: This is your journey. There's no rush, no competition, and no judgment. The goal is to grow your financial confidence and capability at your own pace.`,
      examples: [
        "Scoring high in budgeting but low in investing? You'll get recommendations for investment courses.",
        "Strong knowledge of basic concepts? Skip ahead to intermediate content in those areas.",
        "Completely new to all topics? Start with our Financial Literacy Basics course."
      ],
      tips: [
        "Review your results carefully before jumping into courses",
        "Set realistic goals based on your available time",
        "Celebrate small wins - every question you answer correctly is progress",
        "Don't get discouraged by low scores - they show you exactly where to focus energy"
      ]
    }
  ],

  keyTakeaways: [
    "Self-assessment is a powerful tool for understanding your current financial knowledge and identifying learning opportunities",
    "The quiz covers 15 comprehensive categories across three difficulty levels, allowing you to assess both breadth and depth of knowledge",
    "Your results create a personalized learning path that meets you exactly where you are in your financial journey",
    "There's no passing or failing - only discovering where you are and where you want to go",
    "You can retake the assessment anytime to track your progress and celebrate your growth"
  ],

  actionItems: [
    "Take the self-assessment quiz to establish your baseline financial literacy",
    "Review your results and identify your top 3 areas for improvement",
    "Choose one course from your recommended learning path to start this week",
    "Set a calendar reminder to retake the assessment in 3 months",
    "Share your learning goals with a trusted friend or accountability partner"
  ],

  resources: [
    {
      type: 'tool',
      title: 'Quiz Dashboard',
      description: 'Access your quiz results, track progress, and see your learning path',
      url: '/dashboard'
    },
    {
      type: 'article',
      title: 'How to Use Your Assessment Results',
      description: 'Guide to interpreting your scores and creating a study plan',
      url: '/blog/using-assessment-results'
    },
    {
      type: 'worksheet',
      title: 'Personal Learning Plan Template',
      description: 'Downloadable template to organize your financial education journey',
      url: '/resources/learning-plan-template.pdf'
    }
  ]
}

// Budgeting lesson content based on the markdown file
const budgetingContent = {
  introduction: `Welcome to Smart Budgeting! This lesson will transform how you think about managing your money. Instead of seeing a budget as restrictive, you'll learn to view it as a powerful tool that gives every dollar a purpose and helps you achieve your financial goals.

Whether you're trying to pay off debt, save for a big purchase, build an emergency fund, or simply gain control of where your money goes, budgeting is your foundation. This lesson combines practical techniques with real-world examples to make budgeting accessible and actionable.`,

  sections: [
    {
      title: "What Is a Budget?",
      content: `A budget is a financial plan that helps you track income and spending over time. Think of it not as restriction but as a spending plan — giving every dollar a purpose.

The 4 Basic Steps to Creating a Budget:

1. **Calculate your income** (after taxes - your "take-home" pay)
2. **List your expenses** (both fixed and variable)
3. **Subtract expenses from income** to see what's left
4. **Adjust or allocate** remaining funds toward goals, savings, or debt payoff

A budget isn't about perfection - it's about awareness and intentionality. The goal is to make conscious decisions about your money rather than wondering where it all went at the end of the month.`,
      examples: [
        "Monthly Income: $3,500 after taxes → Total Expenses: $3,100 → Remaining: $400 for savings/goals",
        "Track for one month without judging yourself - just observe where money actually goes",
        "Use your bank/credit card statements as a starting point to identify spending patterns"
      ],
      tips: [
        "Be realistic - use actual numbers from your last 2-3 months of spending",
        "Include annual expenses by dividing by 12 (car insurance, holiday gifts, etc.)",
        "Build in a small buffer for unexpected expenses",
        "Review and adjust your budget monthly - it's a living document"
      ]
    },
    {
      title: "Everyday Spending Adds Up",
      content: `Small expenses can quietly drain hundreds or thousands of dollars annually. The key isn't to eliminate all small pleasures - it's to be aware of them and make intentional choices.

Let's look at a real example of "small" monthly expenses:

• Coffee (3x/week at $3.50): $42/month = $504/year
• Lunch with friends (weekly at $12): $48/month = $576/year
• Streaming subscriptions (2 services at $9.99 each): $20/month = $240/year
• Occasional gifts (2 birthdays/month at $20): $40/month = $480/year

**Total: $150/month = $1,800/year**

This isn't about cutting out all of these - it's about awareness. Maybe you realize you only watch one streaming service, or you could bring lunch from home twice a week. Small changes create big results.`,
      examples: [
        "Bringing coffee from home 2 days/week saves $336/year - enough for a weekend trip",
        "Canceling unused gym membership ($40/month) = $480/year in savings",
        "Packing lunch 3 days/week instead of buying ($8/day) = $1,248/year saved"
      ],
      tips: [
        "Track small purchases for one month without judgment",
        "Identify which small expenses bring you real joy vs. habit",
        "Use the 24-hour rule for impulse purchases over $20",
        "Redirect money from one reduced expense into a specific savings goal"
      ]
    },
    {
      title: "Handling Irregular Expenses",
      content: `One of the biggest budget-killers is irregular expenses that "surprise" you - car insurance, holiday gifts, annual fees. The solution is to prorate these costs and save for them monthly.

**How to Prorate Irregular Expenses:**

1. List all irregular expenses and their amounts
2. Add up the total annual cost
3. Divide by 12 to get your monthly savings amount
4. Create a separate savings account for irregular expenses
5. Transfer the monthly amount automatically

**Example:**
• Car insurance: $1,200/year
• Holiday gifts: $600/year
• Car registration: $120/year
• Amazon Prime: $139/year
• Vacation: $2,400/year

Total: $4,459/year ÷ 12 = **$372/month**

By saving $372 monthly, these expenses never surprise you or derail your budget!`,
      examples: [
        "Save $100/month for car insurance → Never scramble to pay the $1,200 annual premium",
        "Set aside $50/month for gifts → December holidays don't go on credit cards",
        "Budget $200/month for vacation → Take a $2,400 trip without debt"
      ],
      tips: [
        "Start tracking irregular expenses in a simple spreadsheet or app",
        "Use a separate high-yield savings account for these funds",
        "Review and update your irregular expense list quarterly",
        "Don't forget professional memberships, subscriptions, and annual renewals"
      ]
    },
    {
      title: "Creating Your First Budget",
      content: `Ready to create your budget? Here's a step-by-step process:

**Step 1: Calculate Monthly Net Income**
Add up all income sources after taxes:
• Salary/wages (after taxes and deductions)
• Side hustle income
• Child support or alimony
• Investment income
• Other regular income

**Step 2: List Fixed Expenses (Same Every Month)**
• Rent or mortgage
• Car payment
• Insurance premiums
• Loan payments
• Phone bill
• Internet/utilities (if stable)
• Subscriptions

**Step 3: List Variable Expenses (Change Month to Month)**
• Groceries
• Gas
• Utilities (if fluctuating)
• Entertainment
• Dining out
• Shopping
• Personal care
• Miscellaneous

**Step 4: Include Savings & Goals**
• Emergency fund contribution
• Retirement contribution
• Specific savings goals (vacation, down payment, etc.)

**Step 5: Do the Math**
Income - (Fixed + Variable + Savings) = Remaining

If remaining is negative, you need to cut expenses or increase income. If positive, allocate it to additional savings or specific goals.`,
      examples: [
        "Income $4,000 - Fixed $2,200 - Variable $1,300 - Savings $400 = $100 cushion",
        "Starting point: Deficit of $200/month → Cut streaming services and reduce dining out",
        "Found $300 extra → Increase emergency fund contribution from $200 to $500/month"
      ],
      tips: [
        "Start with what you actually spend, not what you wish you spent",
        "Give yourself grace - budgeting is a skill that improves with practice",
        "Use budgeting apps like YNAB, Mint, or EveryDollar to automate tracking",
        "Review your budget weekly for the first month, then monthly once established"
      ]
    },
    {
      title: "Popular Budgeting Methods",
      content: `Different budgeting frameworks work for different people. Try these popular methods:

**50/30/20 Budget**
• 50% Needs (housing, food, utilities, insurance)
• 30% Wants (entertainment, dining, hobbies)
• 20% Savings & Debt Payoff

Simple and flexible, great for beginners.

**Zero-Based Budget**
Every dollar gets assigned a job. Income - All Allocations = Zero.
More detailed but gives maximum control and awareness.

**Envelope System**
Cash is divided into physical envelopes for each category. When the envelope is empty, you're done spending in that category. Great for controlling variable spending.

**Pay Yourself First**
Automatically transfer savings to separate accounts immediately after getting paid. Live on what's left.

**Reverse Budgeting**
Calculate savings goals first, then spend the rest guilt-free. Works well for disciplined savers who want simplicity.

Try different methods to find what clicks for you!`,
      examples: [
        "50/30/20 on $4,000/month: $2,000 needs, $1,200 wants, $800 savings",
        "Zero-based: Every dollar allocated - groceries $400, gas $150, fun $200, etc.",
        "Envelope system: $400 cash in grocery envelope, $100 in entertainment envelope"
      ],
      tips: [
        "Don't be afraid to customize methods to fit your life",
        "What works for your friend might not work for you - that's okay",
        "Give any method at least 3 months before deciding it doesn't work",
        "The best budget is the one you'll actually use consistently"
      ]
    }
  ],

  keyTakeaways: [
    "A budget is a spending plan that gives every dollar a purpose, not a restriction that ruins your fun",
    "Small everyday expenses add up to thousands annually - awareness is the first step to intentional spending",
    "Prorating irregular expenses prevents 'surprise' bills from derailing your budget throughout the year",
    "There are many budgeting methods - experiment to find what works for your personality and lifestyle",
    "Budgeting is a skill that improves with practice - start simple and refine as you go"
  ],

  actionItems: [
    "Track all your spending for the next week without changing anything - just observe",
    "Calculate your actual monthly net income after all taxes and deductions",
    "List all irregular expenses for the year and calculate your monthly proration amount",
    "Choose one budgeting method to try for the next 30 days",
    "Set up a simple budgeting system using an app or spreadsheet this week"
  ],

  resources: [
    {
      type: 'tool',
      title: 'Budget Calculator',
      description: 'Interactive calculator to create your personalized budget',
      url: '/tools/budget-calculator'
    },
    {
      type: 'worksheet',
      title: 'Monthly Budget Template',
      description: 'Downloadable Excel/Google Sheets template',
      url: '/resources/budget-template.xlsx'
    },
    {
      type: 'tool',
      title: 'Irregular Expense Tracker',
      description: 'Track and prorate annual expenses',
      url: '/tools/irregular-expense-tracker'
    },
    {
      type: 'article',
      title: 'Recommended Budgeting Apps',
      description: 'Comparison of popular budgeting apps and tools',
      url: '/blog/best-budgeting-apps'
    }
  ]
}

async function populateLessonContent() {
  console.log('📝 Populating lesson content...\n')

  // Get the Women's Financial Literacy curriculum
  const { data: curriculum } = await supabase
    .from('curricula')
    .select('id')
    .eq('slug', 'womens-financial-literacy')
    .single()

  if (!curriculum) {
    console.log('❌ Curriculum not found')
    return
  }

  // Get the Financial Literacy Basics course
  const { data: course } = await supabase
    .from('courses')
    .select('id')
    .eq('curriculum_id', curriculum.id)
    .eq('slug', 'financial-literacy-basics')
    .single()

  if (!course) {
    console.log('❌ Course not found')
    return
  }

  // Update Self-Assessment lesson
  const { error: selfAssessmentError } = await supabase
    .from('lessons')
    .update({
      content: selfAssessmentContent,
      description: 'Assess your current financial knowledge and create a personalized learning path.',
      objectives: [
        'Understand the purpose and benefits of financial self-assessment',
        'Complete a comprehensive evaluation of your financial literacy across 15 key categories',
        'Interpret your assessment results to identify strengths and areas for growth',
        'Create a personalized learning plan based on your assessment outcomes',
        'Set realistic financial education goals and track your progress over time'
      ],
      key_concepts: [
        'Financial self-awareness',
        'The 15 categories of financial literacy',
        'Beginner, intermediate, and advanced knowledge levels',
        'Personalized learning paths',
        'Progress tracking and continuous improvement'
      ]
    })
    .eq('course_id', course.id)
    .eq('slug', 'self-assessment')

  if (selfAssessmentError) {
    console.log('❌ Error updating self-assessment:', selfAssessmentError.message)
  } else {
    console.log('✅ Self-Assessment lesson updated')
  }

  // Get Budgeting Basics course
  const { data: budgetingCourse } = await supabase
    .from('courses')
    .select('id')
    .eq('curriculum_id', curriculum.id)
    .eq('slug', 'budgeting-basics')
    .single()

  if (budgetingCourse) {
    // Update Creating Your First Budget lesson
    const { error: budgetingError } = await supabase
      .from('lessons')
      .update({
        content: budgetingContent,
        description: 'Learn the fundamentals of creating and maintaining a budget that works for your lifestyle and goals.',
        objectives: [
          'Understand what a budget is and why it matters for financial success',
          'Identify and track your income, fixed expenses, and variable expenses',
          'Learn to handle irregular expenses through prorating and planned savings',
          'Explore popular budgeting methods and choose one that fits your life',
          'Create your first realistic monthly budget using proven techniques'
        ],
        key_concepts: [
          'The 4-step budgeting process',
          'Fixed vs. variable expenses',
          'Prorating irregular expenses',
          '50/30/20 rule and other budgeting methods',
          'Zero-based budgeting',
          'Emergency fund integration',
          'Budget adjustment and refinement'
        ]
      })
      .eq('course_id', budgetingCourse.id)
      .eq('slug', 'creating-your-first-budget')

    if (budgetingError) {
      console.log('❌ Error updating budgeting lesson:', budgetingError.message)
    } else {
      console.log('✅ Creating Your First Budget lesson updated')
    }
  }

  console.log('\n✅ Lesson content population complete!')
}

populateLessonContent()
