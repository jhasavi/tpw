import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const generateLessonContent = (courseTitle: string, lessonNumber: number) => {
  return {
    markdown: `# ${courseTitle} - Lesson ${lessonNumber}

## Welcome to This Lesson

This comprehensive lesson covers important concepts in ${courseTitle}.

## Key Topics

### Topic 1: Foundations
Understanding the fundamental principles and concepts

### Topic 2: Practical Application  
Real-world examples and case studies

### Topic 3: Best Practices
Strategies and recommendations from experts

### Topic 4: Common Mistakes
Learn what to avoid and how to overcome challenges

### Topic 5: Action Steps
Specific steps you can take today

## Practice Exercises

1. Reflect on your current situation
2. Create a personal action plan
3. Set measurable goals
4. Track your progress

## Key Takeaways

- Master the fundamentals
- Apply concepts to your life
- Avoid common pitfalls
- Take consistent action
- Track and adjust your approach

## Resources

- Additional reading materials
- Tools and calculators
- Community support
- Expert guidance

---

*This lesson content is being actively developed. Check back for updates and more detailed information.*`
  }
}

// Comprehensive course lesson mapping
const courseLessons: Record<string, { title: string; slug: string; description: string }[]> = {
  // INTERMEDIATE COURSES
  
  '9e0d63b4-a3b5-49f8-84de-a10b1207fbf5': [ // Module 6: Life Transitions & Major Financial Decisions
    {
      title: 'Managing Money Through Career Changes',
      slug: 'career-changes-money-management',
      description: 'Navigate financial decisions during career transitions, job loss, and career pivots'
    },
    {
      title: 'Getting Married: Merging Finances',
      slug: 'merging-finances-marriage',
      description: 'Learn how to combine finances, set shared goals, and maintain financial harmony'
    },
    {
      title: 'Having Children: Financial Planning',
      slug: 'financial-planning-children',
      description: 'Prepare for the costs of raising children, from birth through college'
    },
    {
      title: 'Divorce: Protecting Your Financial Future',
      slug: 'divorce-financial-protection',
      description: 'Understand asset division, alimony, child support, and rebuilding finances'
    },
    {
      title: 'Caring for Aging Parents',
      slug: 'aging-parents-caregiving-costs',
      description: 'Plan for eldercare costs, Medicare, long-term care, and financial assistance'
    }
  ],

  'fff02252-5c92-4b15-8a4a-4ac5720cb8e6': [ // Module 7: Home Ownership & Real Estate
    {
      title: 'Should You Rent or Buy?',
      slug: 'rent-vs-buy-decision',
      description: 'Analyze the financial implications of renting versus homeownership'
    },
    {
      title: 'Getting Mortgage-Ready',
      slug: 'mortgage-preparation',
      description: 'Understand credit requirements, down payments, and mortgage pre-approval'
    },
    {
      title: 'Understanding Mortgages',
      slug: 'understanding-mortgages',
      description: 'Learn about mortgage types, interest rates, and loan terms'
    },
    {
      title: 'The Home Buying Process',
      slug: 'home-buying-process',
      description: 'Navigate offers, inspections, closing costs, and moving'
    },
    {
      title: 'Homeownership Costs Beyond the Mortgage',
      slug: 'homeownership-costs',
      description: 'Budget for maintenance, repairs, taxes, insurance, and unexpected expenses'
    }
  ],

  '806a0179-cad5-45ff-8e06-0117bc3d9c9a': [ // Insurance Planning
    {
      title: 'Insurance Fundamentals',
      slug: 'insurance-fundamentals',
      description: 'Understand how insurance works, types of coverage, and why it matters'
    },
    {
      title: 'Health Insurance Essentials',
      slug: 'health-insurance-essentials',
      description: 'Navigate deductibles, premiums, copays, and choosing the right plan'
    },
    {
      title: 'Life Insurance Planning',
      slug: 'life-insurance-planning',
      description: 'Determine if you need life insurance and how much coverage to get'
    },
    {
      title: 'Disability and Income Protection',
      slug: 'disability-income-protection',
      description: 'Protect your income with disability insurance and emergency planning'
    },
    {
      title: 'Auto, Home, and Liability Insurance',
      slug: 'auto-home-liability-insurance',
      description: 'Understand property and liability coverage to protect your assets'
    }
  ],

  '87201200-5e93-4342-9c91-bb002d6359e1': [ // Tax Planning & Optimization
    {
      title: 'Tax Basics for Everyone',
      slug: 'tax-basics',
      description: 'Understand how taxes work, filing status, and basic deductions'
    },
    {
      title: 'Tax-Advantaged Accounts',
      slug: 'tax-advantaged-accounts',
      description: 'Maximize 401(k)s, IRAs, HSAs, and 529 plans for tax savings'
    },
    {
      title: 'Tax Deductions and Credits',
      slug: 'tax-deductions-credits',
      description: 'Identify deductions and credits to reduce your tax bill'
    },
    {
      title: 'Investment Taxes and Strategies',
      slug: 'investment-taxes',
      description: 'Understand capital gains, dividends, and tax-efficient investing'
    },
    {
      title: 'Year-Round Tax Planning',
      slug: 'year-round-tax-planning',
      description: 'Plan ahead to minimize taxes and avoid surprises'
    }
  ],

  'c28a6b9f-e1ff-4a83-89ee-54a8726d5c1e': [ // Financial Psychology
    {
      title: 'Your Money Mindset',
      slug: 'money-mindset',
      description: 'Explore your beliefs about money and how they shape your behavior'
    },
    {
      title: 'Emotional Spending and Impulse Control',
      slug: 'emotional-spending',
      description: 'Recognize triggers and develop strategies to control spending'
    },
    {
      title: 'Money and Relationships',
      slug: 'money-relationships',
      description: 'Navigate financial conversations with partners, family, and friends'
    },
    {
      title: 'Overcoming Financial Anxiety',
      slug: 'financial-anxiety',
      description: 'Manage stress and build confidence around money decisions'
    }
  ],

  'e1e1ec94-d753-4eb1-bb9a-bfbfbe969db5': [ // Family Finance
    {
      title: 'Teaching Kids About Money',
      slug: 'teaching-kids-money',
      description: 'Age-appropriate financial lessons and allowance strategies'
    },
    {
      title: 'Saving for College',
      slug: 'saving-for-college',
      description: '529 plans, financial aid, and funding higher education'
    },
    {
      title: 'Family Budgeting Strategies',
      slug: 'family-budgeting',
      description: 'Manage household finances with multiple needs and goals'
    },
    {
      title: 'Protecting Your Family Financially',
      slug: 'family-financial-protection',
      description: 'Insurance, emergency funds, and estate planning for families'
    }
  ],

  '77f546bd-3991-4b38-99fb-f8fecd5c21ca': [ // Career Finance & Workplace Empowerment
    {
      title: 'Salary Negotiation Strategies',
      slug: 'salary-negotiation',
      description: 'Research, prepare, and confidently negotiate your worth'
    },
    {
      title: 'Understanding Employee Benefits',
      slug: 'employee-benefits',
      description: 'Maximize 401(k) match, health insurance, and other perks'
    },
    {
      title: 'Building Multiple Income Streams',
      slug: 'multiple-income-streams',
      description: 'Side hustles, passive income, and career diversification'
    },
    {
      title: 'Career Advancement and Financial Growth',
      slug: 'career-advancement',
      description: 'Invest in skills, networking, and strategic career moves'
    }
  ],

  '3cc336fe-cf89-4806-ae4f-8977f9c8757a': [ // Social Security & Government Benefits
    {
      title: 'Social Security Basics',
      slug: 'social-security-basics',
      description: 'How Social Security works, eligibility, and benefit calculations'
    },
    {
      title: 'Maximizing Social Security Benefits',
      slug: 'maximizing-social-security',
      description: 'Claiming strategies, spousal benefits, and timing decisions'
    },
    {
      title: 'Medicare and Healthcare in Retirement',
      slug: 'medicare-healthcare',
      description: 'Parts A, B, C, D, supplemental insurance, and costs'
    },
    {
      title: 'Other Government Benefits',
      slug: 'government-benefits',
      description: 'SNAP, housing assistance, disability benefits, and more'
    }
  ],

  // ADVANCED COURSES

  '3d58d71b-a83f-4c6f-915f-7c5fdc335c7c': [ // Module 8: Financial Security & Legacy Planning
    {
      title: 'Building Generational Wealth',
      slug: 'generational-wealth',
      description: 'Strategies to create and preserve wealth for future generations'
    },
    {
      title: 'Estate Planning Essentials',
      slug: 'estate-planning-essentials',
      description: 'Wills, trusts, beneficiaries, and asset transfer'
    },
    {
      title: 'Advanced Tax Strategies',
      slug: 'advanced-tax-strategies',
      description: 'Tax-loss harvesting, charitable giving, and wealth preservation'
    },
    {
      title: 'Protecting Your Legacy',
      slug: 'protecting-legacy',
      description: 'Asset protection, insurance, and legal structures'
    }
  ],

  '8b8ff10b-d151-4d27-beb7-4cb7f48cf990': [ // Real Estate Investing
    {
      title: 'Real Estate Investment Basics',
      slug: 'real-estate-basics',
      description: 'Rental properties, REITs, and real estate strategies'
    },
    {
      title: 'Analyzing Rental Properties',
      slug: 'analyzing-rentals',
      description: 'Cash flow, cap rates, and return on investment calculations'
    },
    {
      title: 'Financing Investment Properties',
      slug: 'financing-investment-properties',
      description: 'Mortgages, leverage, and creative financing strategies'
    },
    {
      title: 'Property Management',
      slug: 'property-management',
      description: 'Tenant relations, maintenance, and maximizing returns'
    },
    {
      title: 'Real Estate Tax Advantages',
      slug: 'real-estate-taxes',
      description: 'Depreciation, 1031 exchanges, and tax benefits'
    }
  ],

  '00d79172-954f-48f1-a091-0e2b70f4ecb7': [ // Business Finance
    {
      title: 'Business vs Personal Finances',
      slug: 'business-personal-separation',
      description: 'Separate accounts, legal structures, and financial organization'
    },
    {
      title: 'Business Budgeting and Cash Flow',
      slug: 'business-budgeting',
      description: 'Revenue forecasting, expense management, and profitability'
    },
    {
      title: 'Funding Your Business',
      slug: 'business-funding',
      description: 'Loans, investors, bootstrapping, and growth capital'
    },
    {
      title: 'Business Taxes and Compliance',
      slug: 'business-taxes',
      description: 'Quarterly taxes, deductions, and record keeping'
    },
    {
      title: 'Exit Strategies and Business Valuation',
      slug: 'business-exit-strategies',
      description: 'Selling, succession planning, and maximizing business value'
    }
  ],

  '6269ed29-7079-4a57-9dd9-33b42705c41e': [ // Estate Planning
    {
      title: 'Wills and Trusts Explained',
      slug: 'wills-trusts',
      description: 'Differences, benefits, and when to use each'
    },
    {
      title: 'Power of Attorney and Healthcare Directives',
      slug: 'power-of-attorney',
      description: 'Legal documents for incapacity and end-of-life decisions'
    },
    {
      title: 'Minimizing Estate Taxes',
      slug: 'estate-tax-minimization',
      description: 'Gift strategies, trusts, and tax-efficient transfers'
    },
    {
      title: 'Digital Assets and Modern Estate Planning',
      slug: 'digital-assets-estate',
      description: 'Cryptocurrency, online accounts, and digital legacy'
    }
  ],

  '30d84d00-6e2c-46e1-8188-0f07b1091c6f': [ // Advanced Investing
    {
      title: 'Portfolio Construction and Asset Allocation',
      slug: 'portfolio-construction',
      description: 'Building diversified portfolios for different life stages'
    },
    {
      title: 'Alternative Investments',
      slug: 'alternative-investments',
      description: 'Private equity, hedge funds, commodities, and alternatives'
    },
    {
      title: 'Tax-Efficient Investing Strategies',
      slug: 'tax-efficient-investing',
      description: 'Asset location, tax-loss harvesting, and minimizing taxes'
    },
    {
      title: 'Rebalancing and Portfolio Maintenance',
      slug: 'portfolio-rebalancing',
      description: 'When and how to rebalance for optimal returns'
    },
    {
      title: 'Working with Financial Advisors',
      slug: 'financial-advisors',
      description: 'Choosing advisors, fee structures, and fiduciary duty'
    }
  ],

  // WOMEN-SPECIFIC COURSES

  '68b93aec-fa5d-4795-81d7-a7d52e9f3f3b': [ // Divorce & Separation Finance
    {
      title: 'Financial Preparation for Divorce',
      slug: 'divorce-financial-preparation',
      description: 'Document gathering, asset inventory, and financial planning'
    },
    {
      title: 'Understanding Asset Division',
      slug: 'asset-division-divorce',
      description: 'Community property, equitable distribution, and negotiations'
    },
    {
      title: 'Alimony and Child Support',
      slug: 'alimony-child-support',
      description: 'Calculations, modifications, and financial implications'
    },
    {
      title: 'Rebuilding Finances After Divorce',
      slug: 'rebuilding-after-divorce',
      description: 'Credit repair, budgeting, and financial independence'
    }
  ],

  'ee600e40-37c7-4adb-906a-edb660ae160c': [ // Single Women & Solo Financial Planning
    {
      title: 'Financial Planning as a Single Woman',
      slug: 'single-woman-financial-planning',
      description: 'Unique challenges and opportunities for single women'
    },
    {
      title: 'Building Your Solo Safety Net',
      slug: 'solo-safety-net',
      description: 'Emergency funds, insurance, and financial security'
    },
    {
      title: 'Solo Homeownership',
      slug: 'solo-homeownership',
      description: 'Buying and maintaining a home on one income'
    },
    {
      title: 'Retirement Planning for One',
      slug: 'solo-retirement-planning',
      description: 'Building retirement security without a partner'
    }
  ],

  'e8e8b285-44fa-4a8d-8004-3c95faada8a3': [ // Women's Entrepreneurship & Funding Pathways
    {
      title: 'Starting Your Business',
      slug: 'starting-women-business',
      description: 'Business planning, legal structures, and first steps'
    },
    {
      title: 'Funding Options for Women Entrepreneurs',
      slug: 'women-business-funding',
      description: 'Grants, loans, investors, and alternative funding'
    },
    {
      title: 'Financial Management for Women-Owned Businesses',
      slug: 'women-business-financial-management',
      description: 'Bookkeeping, cash flow, and profitability'
    },
    {
      title: 'Scaling Your Women-Owned Business',
      slug: 'scaling-women-business',
      description: 'Growth strategies, hiring, and expansion'
    }
  ],

  '86ced792-466d-4db1-85a0-c2e4dac43083': [ // Digital Safety & Scam Awareness
    {
      title: 'Recognizing Financial Scams',
      slug: 'recognizing-scams',
      description: 'Common scams targeting women and red flags to watch for'
    },
    {
      title: 'Protecting Your Digital Identity',
      slug: 'digital-identity-protection',
      description: 'Password security, two-factor authentication, and privacy'
    },
    {
      title: 'Safe Online Banking and Shopping',
      slug: 'safe-online-banking',
      description: 'Secure transactions and avoiding fraud'
    },
    {
      title: 'Identity Theft Prevention and Recovery',
      slug: 'identity-theft',
      description: 'Protecting your information and steps to take if compromised'
    }
  ],

  '6f6b5f8d-a18c-46d9-aae8-26ea5ca22c1a': [ // Money, Mental Health & Wellbeing
    {
      title: 'The Mind-Money Connection',
      slug: 'mind-money-connection',
      description: 'How mental health affects financial decisions'
    },
    {
      title: 'Financial Stress Management',
      slug: 'financial-stress-management',
      description: 'Coping strategies and building resilience'
    },
    {
      title: 'Money and Self-Care',
      slug: 'money-self-care',
      description: 'Budgeting for wellness without guilt'
    },
    {
      title: 'Building Financial Confidence',
      slug: 'financial-confidence',
      description: 'Overcoming fears and taking empowered action'
    }
  ],

  // BEGINNER COURSES (FINRA)

  '57f1252a-385e-47a4-a9b2-4389342fa7e1': [ // Module 1: Financial Foundations & Money Mindset
    {
      title: 'What Is Financial Literacy?',
      slug: 'what-is-financial-literacy',
      description: 'Understanding the importance of financial education'
    },
    {
      title: 'Your Money Story',
      slug: 'your-money-story',
      description: 'Explore your relationship with money and identify patterns'
    },
    {
      title: 'Setting Financial Goals',
      slug: 'setting-financial-goals',
      description: 'SMART goals and creating your financial vision'
    },
    {
      title: 'Understanding Income and Net Worth',
      slug: 'income-net-worth',
      description: 'Calculate your earnings and build a financial snapshot'
    }
  ],

  '9147db82-15d9-4c8c-95e9-625b0cd07e4d': [ // Module 2: Budgeting & Cash Flow Management
    {
      title: 'Creating Your First Budget',
      slug: 'creating-first-budget',
      description: 'Simple budgeting methods for beginners'
    },
    {
      title: 'Tracking Your Spending',
      slug: 'tracking-spending',
      description: 'Tools and techniques to monitor where your money goes'
    },
    {
      title: 'The 50/30/20 Rule',
      slug: '50-30-20-rule',
      description: 'A simple framework for allocating your income'
    },
    {
      title: 'Adjusting Your Budget',
      slug: 'adjusting-budget',
      description: 'Making your budget work when life changes'
    }
  ],

  '9c9eb0e4-1512-4767-b486-590b5809c80d': [ // Module 4: Saving & Emergency Planning
    {
      title: 'Why Saving Matters',
      slug: 'why-saving-matters',
      description: 'The importance of saving for short and long-term goals'
    },
    {
      title: 'Building an Emergency Fund',
      slug: 'building-emergency-fund',
      description: 'How much to save and where to keep it'
    },
    {
      title: 'Automatic Savings Strategies',
      slug: 'automatic-savings',
      description: 'Make saving effortless with automation'
    },
    {
      title: 'Saving for Specific Goals',
      slug: 'goal-based-saving',
      description: 'Vacations, holidays, and other planned expenses'
    }
  ]
}

async function populateRemainingCourses() {
  console.log('🚀 Populating all remaining courses with lessons...\n')

  let totalCreated = 0
  let totalErrors = 0
  let coursesProcessed = 0

  for (const [courseId, lessons] of Object.entries(courseLessons)) {
    // First check if this course already has lessons
    const { count } = await supabase
      .from('lessons')
      .select('*', { count: 'exact', head: true })
      .eq('course_id', courseId)

    if (count && count > 0) {
      console.log(`⏭️  Skipping course ${courseId} - already has ${count} lessons`)
      continue
    }

    console.log(`\n📚 Processing course: ${courseId}`)
    coursesProcessed++
    
    for (let i = 0; i < lessons.length; i++) {
      const lesson = lessons[i]
      try {
        const { data, error } = await supabase
          .from('lessons')
          .insert({
            course_id: courseId,
            title: lesson.title,
            slug: lesson.slug,
            description: lesson.description,
            display_order: i + 1,
            duration_minutes: 40 + (i * 5), // Vary duration: 40, 45, 50, etc.
            objectives: [
              'Understand key concepts',
              'Apply knowledge to real situations',
              'Build confidence in decision-making'
            ],
            key_concepts: lesson.title.split(' ').slice(0, 3),
            content: generateLessonContent(lesson.title, i + 1)
          })
          .select()
          .single()

        if (error) throw error

        console.log(`  ✅ Created: ${lesson.title}`)
        totalCreated++
      } catch (error: any) {
        console.error(`  ❌ Error creating ${lesson.title}:`, error.message)
        totalErrors++
      }
    }
  }

  console.log(`\n✨ Complete!`)
  console.log(`Courses processed: ${coursesProcessed}`)
  console.log(`Lessons created: ${totalCreated}`)
  console.log(`Errors: ${totalErrors}`)
}

populateRemainingCourses()
