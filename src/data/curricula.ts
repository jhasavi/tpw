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
        lessons: []
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
        lessons: []
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
        lessons: []
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
        lessons: []
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
