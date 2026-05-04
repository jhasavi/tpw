import { Curriculum } from '@/types/curriculum'

/**
 * Complete curriculum data for The Purple Wing
 * Based on:
 * - WOMENS-FINANCIAL-LITERACY-CURRICULUM-EXPANDED.md
 * - 40-HOUR-FINRA-COMPLIANT-COURSE.md
 */

export const curricula: Curriculum[] = [
  {
    id: 'womens-financial-literacy',
    slug: 'womens-financial-literacy',
    title: "Women's Financial Literacy Curriculum",
    description: 'A comprehensive, life-stage-aware financial education curriculum designed for women, centered on financial independence, safety, protection, and empowerment.',
    targetAudience: 'All women seeking financial independence and literacy',
    estimatedHours: 100,
    isProfessionalTrack: false,
    displayOrder: 1,
    courses: [
      // BEGINNER LEVEL (4 courses)
      {
        id: 'financial-literacy-basics',
        curriculumId: 'womens-financial-literacy',
        slug: 'financial-literacy-basics',
        title: 'Financial Literacy Basics',
        description: 'Understand what money is, how the financial system works, and how to start thinking intentionally about personal finances.',
        level: 'beginner',
        estimatedHours: 3,
        displayOrder: 1,
        icon: '📚',
        lessons: [
          {
            id: 'financial-literacy-intro',
            courseId: 'financial-literacy-basics',
            slug: 'financial-literacy-intro',
            title: 'Introduction to Financial Literacy',
            description: 'Discover what financial literacy means and why it\'s crucial for women\'s empowerment and independence.',
            content: {
              introduction: "Financial literacy is the foundation of economic independence. For women, understanding money management isn't just about numbers—it's about creating safety, freedom, and the ability to make choices that align with your values and goals.",
              sections: [
                {
                  title: "What Financial Literacy Means for Women",
                  content: "Financial literacy empowers women to take control of their economic future. It's not just about managing money—it's about creating opportunities, building security, and having the confidence to make informed decisions that affect every aspect of life.",
                  examples: [
                    "Negotiating salary and benefits based on market value",
                    "Making investment decisions that align with personal values",
                    "Planning for career interruptions without financial stress",
                    "Building wealth that provides genuine freedom and options"
                  ],
                  tips: [
                    "Start with small, achievable financial goals",
                    "Find a financial community or mentor for support",
                    "Celebrate financial wins, no matter how small",
                    "Remember that financial literacy is a journey, not a destination"
                  ]
                },
                {
                  title: "Why Financial Education Matters Especially for Women",
                  content: "Women face unique financial challenges that make financial education particularly crucial. Understanding these challenges helps you prepare strategically and build resilience.",
                  examples: [
                    "Women live an average of 5-7 years longer than men",
                    "Career interruptions for caregiving can reduce lifetime earnings by $1 million+",
                    "The gender pay gap means women earn approximately 82 cents for every dollar earned by men",
                    "Women are more likely to be single parents or primary caregivers"
                  ],
                  tips: [
                    "Plan for longevity by saving more aggressively for retirement",
                    "Build skills that maintain earning potential during career breaks",
                    "Develop multiple income streams to offset pay disparities",
                    "Create financial plans that account for caregiving responsibilities"
                  ]
                }
              ],
              keyTakeaways: [
                "Financial literacy is about empowerment, not just numbers",
                "Women face unique financial challenges that require strategic planning",
                "Small, consistent steps lead to significant financial growth",
                "Financial education creates safety, freedom, and choice"
              ],
              actionItems: [
                "Identify your current financial strengths and challenges",
                "Set one small, achievable financial goal for this month",
                "Find a financial role model or mentor",
                "Schedule regular money check-ins (weekly or monthly)"
              ],
              resources: [
                { 
                  title: 'Financial Literacy Basics', 
                  type: 'article',
                  description: 'Khan Academy comprehensive financial literacy course',
                  url: 'https://www.khanacademy.org/college-careers-more/financial-literacy' 
                },
                { 
                  title: 'Women and Money Statistics', 
                  type: 'article',
                  description: 'Federal Reserve research on women in the labor force',
                  url: 'https://www.federalreserve.gov/econres/notes/feds-notes/2021/women-in-the-labor-force.htm' 
                }
              ]
            },
            objectives: [
              "Understand what financial literacy means for women",
              "Recognize unique financial challenges women face",
              "Identify personal financial goals and motivations",
              "Create a foundation for continued financial learning"
            ],
            keyConcepts: [
              "Financial empowerment",
              "Economic independence",
              "Gender-specific financial planning",
              "Long-term wealth building"
            ],
            durationMinutes: 45,
            displayOrder: 1
          }
        ]
      },
      {
        id: 'budgeting-basics',
        curriculumId: 'womens-financial-literacy',
        slug: 'budgeting-basics',
        title: 'Budgeting Basics',
        description: 'Build a budget that works in real life, especially with irregular or family-based income.',
        level: 'beginner',
        estimatedHours: 4,
        displayOrder: 2,
        icon: '💰',
        lessons: [
          {
            id: 'budgeting-fundamentals',
            courseId: 'budgeting-basics',
            slug: 'budgeting-fundamentals',
            title: 'Budgeting Fundamentals',
            description: 'Master the core principles of budgeting and create a system that works for your unique financial situation.',
            content: {
              introduction: "Budgeting isn't about restriction—it's about intention. A good budget gives you the freedom to spend on what matters most while building security for your future.",
              sections: [
                {
                  title: "Understanding Different Budgeting Methods",
                  content: "There's no one-size-fits-all approach to budgeting. The key is finding a method that aligns with your personality, income pattern, and financial goals.",
                  examples: [
                    "50/30/20 Rule: 50% needs, 30% wants, 20% savings",
                    "Zero-Based Budget: Every dollar has a purpose",
                    "Envelope System: Cash-based spending control",
                    "Pay Yourself First: Savings before spending"
                  ],
                  tips: [
                    "Try different methods for 2-3 months each to see what works",
                    "Combine methods to create your personalized approach",
                    "Use apps and tools that make tracking effortless",
                    "Review and adjust your budget monthly, especially at first"
                  ]
                },
                {
                  title: "Budgeting for Irregular Income",
                  content: "Many women have variable income from freelancing, commissions, seasonal work, or family businesses. This requires a flexible but disciplined approach.",
                  examples: [
                    "Freelance writers with project-based payments",
                    "Sales professionals with commission income",
                    "Small business owners with fluctuating revenue",
                    "Caregivers with part-time or seasonal work"
                  ],
                  tips: [
                    "Build a baseline budget from your lowest-earning months",
                    "Create separate accounts for taxes and irregular expenses",
                    "Use a 'priority pyramid' for variable income allocation",
                    "Maintain a larger emergency fund (6+ months)"
                  ]
                },
                {
                  title: "Family and Household Budgeting",
                  content: "Managing money for a household involves coordinating multiple needs, wants, and priorities. Clear communication and shared goals are essential.",
                  examples: [
                    "Single parents managing all household expenses",
                    "Couples combining finances with different spending habits",
                    "Multi-generational households with shared costs",
                    "Blended families with child support and alimony"
                  ],
                  tips: [
                    "Schedule regular money meetings with family members",
                    "Create shared goals that motivate everyone",
                    "Be transparent about financial constraints and priorities",
                    "Teach children about budgeting through age-appropriate activities"
                  ]
                }
              ],
              keyTakeaways: [
                "Budgeting is a tool for freedom, not restriction",
                "The best budget method is the one you'll actually use",
                "Irregular income requires flexible but disciplined planning",
                "Family budgeting succeeds through communication and shared goals"
              ],
              actionItems: [
                "Track all income and expenses for one month",
                "Choose one budgeting method to try for the next 30 days",
                "Create a budget that accounts for your specific income pattern",
                "Set up a weekly money check-in routine"
              ],
              resources: [
                { 
                  title: 'Budgeting Methods Guide', 
                  type: 'article',
                  description: 'Comprehensive guide to different budgeting approaches',
                  url: 'https://www.consumerfinance.gov/about-us/blog/4-simple-ways-to-budget-more-effectively/' 
                },
                { 
                  title: 'Irregular Income Budgeting', 
                  type: 'worksheet',
                  description: 'Printable worksheet for variable income planning',
                  url: 'https://www.practicalmoneyskills.com/resources/tools/budgeting/' 
                }
              ]
            },
            objectives: [
              "Understand different budgeting methodologies",
              "Create a budget that works with irregular income patterns",
              "Develop family budgeting strategies",
              "Build sustainable budgeting habits"
            ],
            keyConcepts: [
              "Budgeting methods",
              "Variable income management",
              "Family financial planning",
              "Sustainable money habits"
            ],
            durationMinutes: 60,
            displayOrder: 1
          },
          {
            id: 'expense-tracking',
            courseId: 'budgeting-basics',
            slug: 'expense-tracking',
            title: 'Smart Expense Tracking',
            description: 'Learn to track expenses efficiently and use the insights to optimize your spending.',
            content: {
              introduction: "Knowing where your money goes is the first step to directing it where you want it to go. Effective expense tracking reveals patterns and opportunities for improvement.",
              sections: [
                {
                  title: "Choosing Your Tracking Method",
                  content: "The best tracking system is one you'll consistently use. Consider your lifestyle, tech comfort, and what motivates you.",
                  examples: [
                    "Mobile apps that automatically categorize spending",
                    "Spreadsheet systems for manual tracking",
                    "Notebook or journal methods",
                    "Bank statement reviews and categorization"
                  ],
                  tips: [
                    "Start simple and add complexity as needed",
                    "Use automatic tracking when possible to reduce friction",
                    "Set up mobile banking alerts for real-time awareness",
                    "Choose a method that aligns with your natural habits"
                  ]
                },
                {
                  title: "Categorizing and Analyzing Spending",
                  content: "Once you track expenses, categorizing them helps you understand patterns and make informed decisions about where to optimize.",
                  examples: [
                    "Fixed expenses: Rent, insurance, loan payments",
                    "Variable necessities: Groceries, utilities, gas",
                    "Discretionary spending: Entertainment, dining out",
                    "Savings and investments: Emergency fund, retirement"
                  ],
                  tips: [
                    "Create categories that make sense for your lifestyle",
                    "Review categories quarterly and adjust as needed",
                    "Look for trends rather than focusing on individual purchases",
                    "Use the 80/20 rule: focus on the biggest spending categories"
                  ]
                }
              ],
              keyTakeaways: [
                "Consistent tracking is more important than perfect tracking",
                "Choose methods that reduce friction and increase motivation",
                "Categorization reveals patterns and optimization opportunities",
                "Regular review leads to continuous improvement"
              ],
              actionItems: [
                "Select and set up your preferred tracking method",
                "Track all expenses for 30 days without judgment",
                "Categorize your spending into meaningful groups",
                "Identify your top 3 spending categories for optimization"
              ],
              resources: [
                { 
                  title: 'Expense Tracking Apps', 
                  type: 'tool',
                  description: 'Comparison of popular expense tracking applications',
                  url: 'https://www.investopedia.com/personal-finance/best-expense-tracking-apps/' 
                },
                { 
                  title: 'Spending Analysis Worksheet', 
                  type: 'worksheet',
                  description: 'Printable worksheet for spending categorization',
                  url: 'https://www.practicalmoneyskills.com/resources/tools/spending-analyzer/' 
                }
              ]
            },
            objectives: [
              "Select appropriate expense tracking methods",
              "Categorize and analyze spending patterns",
              "Identify optimization opportunities",
              "Build sustainable tracking habits"
            ],
            keyConcepts: [
              "Expense tracking systems",
              "Spending categorization",
              "Financial pattern analysis",
              "Optimization strategies"
            ],
            durationMinutes: 45,
            displayOrder: 2
          }
        ]
      },
      {
        id: 'emergency-planning',
        curriculumId: 'womens-financial-literacy',
        slug: 'emergency-planning',
        title: 'Emergency Planning',
        description: 'Create a financial safety net, especially important for women who may carry caregiving responsibilities.',
        level: 'beginner',
        estimatedHours: 4,
        displayOrder: 3,
        icon: '🛡️',
        lessons: [
          {
            id: 'emergency-fund-basics',
            courseId: 'emergency-planning',
            slug: 'emergency-fund-basics',
            title: 'Building Your Emergency Fund',
            description: 'Create a financial safety net that provides security and peace of mind during unexpected challenges.',
            content: {
              introduction: "An emergency fund is your financial foundation. It's not just money—it's freedom from panic during unexpected events and the ability to make decisions from strength rather than fear.",
              sections: [
                {
                  title: "Why Emergency Funds Matter Especially for Women",
                  content: "Women often face unique financial vulnerabilities that make emergency funds particularly crucial. Understanding these risks helps motivate consistent saving.",
                  examples: [
                    "Higher likelihood of career interruptions for caregiving",
                    "Greater risk of single parenthood and sole financial responsibility",
                    "Longer life expectancy requiring more financial security",
                    "Gender pay gaps affecting emergency fund accumulation speed"
                  ],
                  tips: [
                    "Aim for 6-12 months of expenses rather than the standard 3-6 months",
                    "Consider additional funds for dependents' emergency needs",
                    "Factor in potential career interruptions when calculating needs",
                    "Build separate emergency funds for different types of emergencies"
                  ]
                },
                {
                  title: "Calculating Your Emergency Fund Target",
                  content: "Your emergency fund should be personalized to your specific situation, risks, and responsibilities. One size doesn't fit all.",
                  examples: [
                    "Single parent: 8-12 months of expenses",
                    "Dual-income couple: 3-6 months of expenses",
                    "Freelancer/variable income: 6-12 months of expenses",
                    "Caregiver for aging parents: 6-9 months plus additional buffer"
                  ],
                  tips: [
                    "Include all essential expenses: housing, food, insurance, debt payments",
                    "Add buffers for irregular expenses (car repairs, medical costs)",
                    "Consider your support system and family help availability",
                    "Review and adjust targets annually as circumstances change"
                  ]
                },
                {
                  title: "Smart Emergency Fund Strategies",
                  content: "Building an emergency fund requires strategy, discipline, and sometimes creative approaches to accelerate savings.",
                  examples: [
                    "Automate transfers from every paycheck to a separate account",
                    "Use windfalls (tax refunds, bonuses) exclusively for emergency savings",
                    "Start with a starter fund of $500-$1,000, then build to full target",
                    "Keep emergency funds in high-yield savings for better returns"
                  ],
                  tips: [
                    "Keep emergency funds separate from daily spending accounts",
                    "Choose accounts with easy access but not too easy (no debit cards)",
                    "Label accounts clearly to prevent accidental spending",
                    "Celebrate milestones but don't pause contributions"
                  ]
                }
              ],
              keyTakeaways: [
                "Emergency funds provide freedom from financial panic",
                "Women often need larger emergency funds due to unique risks",
                "Calculate your target based on personal circumstances",
                "Automate and separate funds to protect them from daily spending"
              ],
              actionItems: [
                "Calculate your personalized emergency fund target",
                "Open a separate high-yield savings account for emergency funds",
                "Set up automatic transfers from each paycheck",
                "Create a plan to reach your target within 12-18 months"
              ],
              resources: [
                { 
                  title: 'Emergency Fund Calculator', 
                  type: 'calculator',
                  description: 'Interactive tool to calculate your emergency fund needs',
                  url: 'https://www.calculators.org/savings/emergency-fund.php' 
                },
                { 
                  title: 'High-Yield Savings Accounts', 
                  type: 'article',
                  description: 'Guide to choosing the best account for emergency funds',
                  url: 'https://www.nerdwallet.com/article/banking/high-yield-savings-accounts' 
                }
              ]
            },
            objectives: [
              "Understand why emergency funds are crucial for women",
              "Calculate personalized emergency fund targets",
              "Implement smart saving strategies",
              "Set up automated emergency fund building systems"
            ],
            keyConcepts: [
              "Emergency fund planning",
              "Risk assessment for women",
              "Automated savings systems",
              "Financial safety nets"
            ],
            durationMinutes: 60,
            displayOrder: 1
          },
          {
            id: 'emergency-types-preparation',
            courseId: 'emergency-planning',
            slug: 'emergency-types-preparation',
            title: 'Preparing for Different Emergency Types',
            description: 'Plan for various emergency scenarios with specific strategies for each type of financial challenge.',
            content: {
              introduction: "Different emergencies require different responses. Planning for specific scenarios helps you respond quickly and effectively when challenges arise.",
              sections: [
                {
                  title: "Career and Income Emergencies",
                  content: "Job loss, reduced hours, or business setbacks can devastate finances without proper planning. These are particularly common for women in certain industries and life stages.",
                  examples: [
                    "Unexpected job loss or company downsizing",
                    "Reduced hours or pay cuts",
                    "Business revenue decline",
                    "Industry-specific disruptions"
                  ],
                  tips: [
                    "Maintain updated resume and professional network",
                    "Develop multiple income streams when possible",
                    "Keep skills current with ongoing education",
                    "Research unemployment benefits and eligibility requirements"
                  ]
                },
                {
                  title: "Health and Medical Emergencies",
                  content: "Medical emergencies can strike suddenly and create significant financial stress, especially with high deductibles and uncovered expenses.",
                  examples: [
                    "Unexpected illness or injury",
                    "Chronic condition diagnosis",
                    "Dental emergencies",
                    "Mental health treatment needs"
                  ],
                  tips: [
                    "Understand your health insurance coverage thoroughly",
                    "Research payment plans and medical financial assistance",
                    "Maintain a separate medical emergency fund if possible",
                    "Know your rights under medical billing laws"
                  ]
                },
                {
                  title: "Family and Caregiving Emergencies",
                  content: "Women often bear primary responsibility for family emergencies, requiring both financial and emotional preparation.",
                  examples: [
                    "Parent or family member illness requiring care",
                    "Child care disruptions",
                    "Pet medical emergencies",
                    "Family member financial crises"
                  ],
                  tips: [
                    "Research family leave policies and benefits",
                    "Build backup childcare arrangements",
                    "Understand family medical leave rights",
                    "Create family emergency communication plans"
                  ]
                },
                {
                  title: "Housing and Transportation Emergencies",
                  content: "Essential needs like housing and transportation can create immediate financial crises when problems arise.",
                  examples: [
                    "Major home repairs (HVAC, roof, plumbing)",
                    "Car breakdowns or accidents",
                    "Appliance failures",
                    "Natural disasters affecting property"
                  ],
                  tips: [
                    "Maintain home warranty or repair fund",
                    "Keep vehicles well-maintained to prevent breakdowns",
                    "Research emergency repair services in advance",
                    "Review insurance coverage for various scenarios"
                  ]
                }
              ],
              keyTakeaways: [
                "Different emergencies require different preparation strategies",
                "Career emergencies are common and require proactive planning",
                "Health emergencies need both insurance and financial preparation",
                "Family emergencies often fall to women to manage"
              ],
              actionItems: [
                "Identify your top 3 most likely emergency scenarios",
                "Create specific response plans for each scenario",
                "Research and document emergency resources and contacts",
                "Practice your emergency plans through scenario reviews"
              ],
              resources: [
                { 
                  title: 'Emergency Preparedness Guide', 
                  type: 'article',
                  description: 'Comprehensive guide to financial emergency planning',
                  url: 'https://www.ready.gov/financial-preparedness' 
                },
                { 
                  title: 'Emergency Response Templates', 
                  type: 'worksheet',
                  description: 'Printable templates for emergency planning',
                  url: 'https://www.consumerfinance.gov/consumer-tools/emergency-savings-planner/' 
                }
              ]
            },
            objectives: [
              "Identify different types of financial emergencies",
              "Create specific preparation strategies for each scenario",
              "Develop emergency response plans",
              "Build comprehensive emergency resource networks"
            ],
            keyConcepts: [
              "Emergency scenario planning",
              "Risk mitigation strategies",
              "Emergency response systems",
              "Resource network development"
            ],
            durationMinutes: 75,
            displayOrder: 2
          }
        ]
      },
      {
        id: 'credit-management',
        curriculumId: 'womens-financial-literacy',
        slug: 'credit-management',
        title: 'Credit Management',
        description: 'Understand and manage credit to build long-term strength, not stress.',
        level: 'beginner',
        estimatedHours: 5,
        displayOrder: 4,
        icon: '💳',
        lessons: [
          {
            id: 'credit-fundamentals',
            courseId: 'credit-management',
            slug: 'credit-fundamentals',
            title: 'Understanding Credit Fundamentals',
            description: 'Master the basics of credit scores, reports, and how credit impacts your financial future.',
            content: {
              introduction: "Credit is a powerful financial tool that can open doors or create barriers. Understanding how it works empowers you to use it strategically rather than being controlled by it.",
              sections: [
                {
                  title: "Credit Scores and How They Work",
                  content: "Your credit score is a numerical representation of your creditworthiness. Understanding the factors that influence it helps you make strategic decisions.",
                  examples: [
                    "Payment history (35%): On-time payments are crucial",
                    "Credit utilization (30%): Keep balances below 30% of limits",
                    "Credit length (15%): Longer history helps scores",
                    "Credit mix (10%): Different types of credit show responsibility",
                    "New credit (10%): Too many applications hurt scores"
                  ],
                  tips: [
                    "Check your credit reports from all three bureaus annually",
                    "Set up payment reminders to ensure on-time payments",
                    "Keep old credit cards open even if unused",
                    "Space out credit applications by at least 6 months"
                  ]
                },
                {
                  title: "Credit Reports and Disputes",
                  content: "Your credit report contains your credit history and is used to calculate your score. Errors can significantly impact your financial opportunities.",
                  examples: [
                    "Identity theft or fraudulent accounts",
                    "Incorrect payment status or dates",
                    "Duplicate accounts or entries",
                    "Outdated negative information"
                  ],
                  tips: [
                    "Review your credit reports quarterly for errors",
                    "Dispute inaccuracies immediately in writing",
                    "Keep documentation of all dispute communications",
                    "Follow up on disputes until resolved"
                  ]
                }
              ],
              keyTakeaways: [
                "Credit scores impact loan rates, insurance, and employment opportunities",
                "Payment history is the most important credit factor",
                "Regular credit monitoring helps catch errors early",
                "Understanding credit fundamentals empowers strategic financial decisions"
              ],
              actionItems: [
                "Check your credit reports from all three bureaus",
                "Set up automatic payments to ensure on-time payments",
                "Review your credit utilization and create reduction plan",
                "Create a calendar for quarterly credit report reviews"
              ],
              resources: [
                { 
                  title: 'Free Credit Reports', 
                  type: 'tool',
                  description: 'Official site for free annual credit reports',
                  url: 'https://www.annualcreditreport.com' 
                },
                { 
                  title: 'Credit Score Guide', 
                  type: 'article',
                  description: 'Comprehensive guide to understanding credit scores',
                  url: 'https://www.consumerfinance.gov/learn-about-credit/' 
                }
              ]
            },
            objectives: [
              "Understand credit score components and calculation",
              "Learn to read and interpret credit reports",
              "Develop strategies for maintaining good credit",
              "Create systems for credit monitoring and maintenance"
            ],
            keyConcepts: [
              "Credit scoring models",
              "Credit report analysis",
              "Credit building strategies",
              "Credit monitoring systems"
            ],
            durationMinutes: 60,
            displayOrder: 1
          }
        ]
      },
      // INTERMEDIATE LEVEL (8 courses)
      {
        id: 'debt-management',
        curriculumId: 'womens-financial-literacy',
        slug: 'debt-management',
        title: 'Debt Management',
        description: 'Create a debt payoff plan that balances mental health and math.',
        level: 'intermediate',
        estimatedHours: 6,
        displayOrder: 5,
        icon: '📉',
        lessons: []
      },
      {
        id: 'investing-101',
        curriculumId: 'womens-financial-literacy',
        slug: 'investing-101',
        title: 'Investing 101',
        description: 'Learn the investing basics with low fear and high clarity.',
        level: 'intermediate',
        estimatedHours: 8,
        displayOrder: 6,
        icon: '📈',
        lessons: []
      },
      {
        id: 'insurance-planning',
        curriculumId: 'womens-financial-literacy',
        slug: 'insurance-planning',
        title: 'Insurance Planning',
        description: 'Protect yourself, your dependents, and your assets.',
        level: 'intermediate',
        estimatedHours: 6,
        displayOrder: 7,
        icon: '☂️',
        lessons: []
      },
      {
        id: 'tax-planning',
        curriculumId: 'womens-financial-literacy',
        slug: 'tax-planning',
        title: 'Tax Planning & Optimization',
        description: 'Reduce tax stress and avoid leaving money on the table.',
        level: 'intermediate',
        estimatedHours: 8,
        displayOrder: 8,
        icon: '📋',
        lessons: []
      },
      {
        id: 'financial-psychology',
        curriculumId: 'womens-financial-literacy',
        slug: 'financial-psychology',
        title: 'Financial Psychology',
        description: 'Heal and strengthen your relationship with money.',
        level: 'intermediate',
        estimatedHours: 6,
        displayOrder: 9,
        icon: '🧠',
        lessons: []
      },
      {
        id: 'family-finance',
        curriculumId: 'womens-financial-literacy',
        slug: 'family-finance',
        title: 'Family Finance',
        description: 'Run the household finances with clarity and shared understanding.',
        level: 'intermediate',
        estimatedHours: 5,
        displayOrder: 10,
        icon: '👨‍👩‍👧‍👦',
        lessons: []
      },
      {
        id: 'career-finance',
        curriculumId: 'womens-financial-literacy',
        slug: 'career-finance',
        title: 'Career Finance & Workplace Empowerment',
        description: 'Use your career as a lever for wealth, while recognizing gender-specific challenges.',
        level: 'intermediate',
        estimatedHours: 7,
        displayOrder: 11,
        icon: '💼',
        lessons: []
      },
      {
        id: 'social-security-benefits',
        curriculumId: 'womens-financial-literacy',
        slug: 'social-security-benefits',
        title: 'Social Security & Government Benefits',
        description: 'Understand government programs that may support income and security, especially in later life.',
        level: 'intermediate',
        estimatedHours: 6,
        displayOrder: 12,
        icon: '🏛️',
        lessons: []
      },
      // ADVANCED LEVEL (5 courses)
      {
        id: 'retirement-planning',
        curriculumId: 'womens-financial-literacy',
        slug: 'retirement-planning',
        title: 'Retirement Planning',
        description: 'Build a resilient, realistic retirement plan.',
        level: 'advanced',
        estimatedHours: 10,
        displayOrder: 13,
        icon: '🏖️',
        lessons: []
      },
      {
        id: 'real-estate-investing',
        curriculumId: 'womens-financial-literacy',
        slug: 'real-estate-investing',
        title: 'Real Estate Investing',
        description: 'Understand how property can support long-term wealth.',
        level: 'advanced',
        estimatedHours: 10,
        displayOrder: 14,
        icon: '🏡',
        lessons: []
      },
      {
        id: 'business-finance',
        curriculumId: 'womens-financial-literacy',
        slug: 'business-finance',
        title: 'Business Finance',
        description: 'Manage money confidently as a business owner.',
        level: 'advanced',
        estimatedHours: 12,
        displayOrder: 15,
        icon: '🏢',
        lessons: []
      },
      {
        id: 'estate-planning',
        curriculumId: 'womens-financial-literacy',
        slug: 'estate-planning',
        title: 'Estate Planning',
        description: 'Protect your wishes, your dependents, and your legacy.',
        level: 'advanced',
        estimatedHours: 8,
        displayOrder: 16,
        icon: '📜',
        lessons: []
      },
      {
        id: 'advanced-investing',
        curriculumId: 'womens-financial-literacy',
        slug: 'advanced-investing',
        title: 'Advanced Investing',
        description: 'Introduce advanced investment tools responsibly.',
        level: 'advanced',
        estimatedHours: 10,
        displayOrder: 17,
        icon: '💎',
        lessons: []
      },
      // WOMEN-SPECIFIC EMPOWERMENT (6 courses)
      {
        id: 'financial-abuse-protection',
        curriculumId: 'womens-financial-literacy',
        slug: 'financial-abuse-protection',
        title: 'Financial Abuse Awareness & Protection',
        description: 'Recognize, prevent and escape financially abusive situations.',
        level: 'women-specific',
        estimatedHours: 6,
        displayOrder: 18,
        icon: '🛡️',
        lessons: []
      },
      {
        id: 'divorce-separation-finance',
        curriculumId: 'womens-financial-literacy',
        slug: 'divorce-separation-finance',
        title: 'Divorce & Separation Finance',
        description: 'Protect yourself financially before, during and after separation.',
        level: 'women-specific',
        estimatedHours: 8,
        displayOrder: 19,
        icon: '💔',
        lessons: []
      },
      {
        id: 'single-women-planning',
        curriculumId: 'womens-financial-literacy',
        slug: 'single-women-planning',
        title: 'Single Women & Solo Financial Planning',
        description: 'Design a resilient plan when you\'re the only safety net.',
        level: 'women-specific',
        estimatedHours: 5,
        displayOrder: 20,
        icon: '👤',
        lessons: []
      },
      {
        id: 'women-entrepreneurship',
        curriculumId: 'womens-financial-literacy',
        slug: 'women-entrepreneurship',
        title: 'Women\'s Entrepreneurship & Funding Pathways',
        description: 'Navigate the unique challenges women face in entrepreneurship.',
        level: 'women-specific',
        estimatedHours: 6,
        displayOrder: 21,
        icon: '🚀',
        lessons: []
      },
      {
        id: 'digital-safety-scams',
        curriculumId: 'womens-financial-literacy',
        slug: 'digital-safety-scams',
        title: 'Digital Safety & Scam Awareness',
        description: 'Protect your identity, money and devices in the digital age.',
        level: 'women-specific',
        estimatedHours: 5,
        displayOrder: 22,
        icon: '🔒',
        lessons: []
      },
      {
        id: 'money-mental-health',
        curriculumId: 'womens-financial-literacy',
        slug: 'money-mental-health',
        title: 'Money, Mental Health & Wellbeing',
        description: 'Address the emotional side of financial life.',
        level: 'women-specific',
        estimatedHours: 6,
        displayOrder: 23,
        icon: '💜',
        lessons: []
      }
    ]
  },
  {
    id: 'finra-40-hour',
    slug: 'finra-40-hour',
    title: '40-Hour FINRA-Compliant Financial Empowerment Course',
    description: 'A structured, professional-level 40-hour course for women seeking in-depth financial knowledge and potential career paths in finance.',
    targetAudience: 'Women seeking professional financial credentials',
    estimatedHours: 40,
    isProfessionalTrack: true,
    displayOrder: 2,
    courses: [
      {
        id: 'finra-module-1',
        curriculumId: 'finra-40-hour',
        slug: 'financial-foundations-mindset',
        title: 'Module 1: Financial Foundations & Money Mindset',
        description: 'Building confidence and understanding the basics',
        level: 'beginner',
        estimatedHours: 4,
        displayOrder: 1,
        icon: '🎯',
        lessons: []
      },
      {
        id: 'finra-module-2',
        curriculumId: 'finra-40-hour',
        slug: 'budgeting-cash-flow',
        title: 'Module 2: Budgeting & Cash Flow Management',
        description: 'Taking control of your money',
        level: 'beginner',
        estimatedHours: 5,
        displayOrder: 2,
        icon: '💵',
        lessons: []
      },
      {
        id: 'finra-module-3',
        curriculumId: 'finra-40-hour',
        slug: 'debt-credit',
        title: 'Module 3: Debt Management & Credit',
        description: 'Breaking free from debt and building credit',
        level: 'intermediate',
        estimatedHours: 5,
        displayOrder: 3,
        icon: '💳',
        lessons: []
      },
      {
        id: 'finra-module-4',
        curriculumId: 'finra-40-hour',
        slug: 'saving-emergency',
        title: 'Module 4: Saving & Emergency Planning',
        description: 'Building your financial safety net',
        level: 'beginner',
        estimatedHours: 4,
        displayOrder: 4,
        icon: '🏦',
        lessons: []
      },
      {
        id: 'finra-module-5',
        curriculumId: 'finra-40-hour',
        slug: 'investing-wealth',
        title: 'Module 5: Investing & Building Wealth',
        description: 'Growing your money for the future',
        level: 'intermediate',
        estimatedHours: 8,
        displayOrder: 5,
        icon: '📊',
        lessons: []
      },
      {
        id: 'finra-module-6',
        curriculumId: 'finra-40-hour',
        slug: 'life-transitions',
        title: 'Module 6: Life Transitions & Major Financial Decisions',
        description: 'Navigating money through life changes',
        level: 'intermediate',
        estimatedHours: 6,
        displayOrder: 6,
        icon: '🌟',
        lessons: []
      },
      {
        id: 'finra-module-7',
        curriculumId: 'finra-40-hour',
        slug: 'home-ownership',
        title: 'Module 7: Home Ownership & Real Estate',
        description: 'Making smart housing decisions',
        level: 'intermediate',
        estimatedHours: 4,
        displayOrder: 7,
        icon: '🏠',
        lessons: []
      },
      {
        id: 'finra-module-8',
        curriculumId: 'finra-40-hour',
        slug: 'financial-security-legacy',
        title: 'Module 8: Financial Security & Legacy Planning',
        description: 'Protecting what you\'ve built',
        level: 'advanced',
        estimatedHours: 4,
        displayOrder: 8,
        icon: '🔐',
        lessons: []
      }
    ]
  }
]

// Helper functions to navigate curriculum data
export function getCurriculumBySlug(slug: string): Curriculum | undefined {
  return curricula.find(c => c.slug === slug)
}

export function getCourseBySlug(curriculumSlug: string, courseSlug: string) {
  const curriculum = getCurriculumBySlug(curriculumSlug)
  return curriculum?.courses.find(c => c.slug === courseSlug)
}

export function getAllCourses() {
  return curricula.flatMap(c => c.courses)
}

export function getCoursesByLevel(level: string) {
  return getAllCourses().filter(c => c.level === level)
}
