import { Metadata } from 'next'

export interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  image?: string
  type?: 'website' | 'article' | 'profile'
  author?: string
  publishedTime?: string
  modifiedTime?: string
  section?: string
  tags?: string[]
}

const SITE_URL = 'https://www.thepurplewings.org'
const SITE_NAME = 'The Purple Wings'
const DEFAULT_DESCRIPTION = 'Empowering women through financial literacy. Free courses, resources, and community support for achieving financial independence.'
const DEFAULT_IMAGE = `${SITE_URL}/images/og-default.png`
const TWITTER_HANDLE = '@ThePurpleWings'

export function generateSEO(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    image = DEFAULT_IMAGE,
    type = 'website',
    author,
    publishedTime,
    modifiedTime,
    section,
    tags = [],
  } = config

  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: author ? [{ name: author }] : [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(section && { section }),
      ...(tags.length > 0 && { tags }),
    },
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title: fullTitle,
      description,
      images: [image],
    },
    alternates: {
      canonical: SITE_URL,
    },
  }

  return metadata
}

// Common keyword sets for different page types
export const COMMON_KEYWORDS = {
  financial_literacy: [
    'financial literacy',
    'financial education',
    'money management',
    'personal finance',
    'financial planning',
  ],
  women_empowerment: [
    'women and money',
    'women financial independence',
    'female empowerment',
    'women entrepreneurs',
    'financial literacy for women',
  ],
  education: [
    'online courses',
    'free financial courses',
    'financial education platform',
    'learn about money',
    'financial skills',
  ],
  community: [
    'financial community',
    'women support network',
    'financial advice',
    'money tips',
    'financial resources',
  ],
}

// Page-specific SEO configurations
export const PAGE_SEO = {
  home: {
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    keywords: [
      ...COMMON_KEYWORDS.financial_literacy,
      ...COMMON_KEYWORDS.women_empowerment,
      'financial independence',
      'budgeting',
      'saving',
      'investing',
    ],
  },
  about: {
    title: 'About Us - Our Mission & Vision',
    description: 'Learn about The Purple Wings mission to empower women through financial literacy. Discover our story, values, and commitment to financial education.',
    keywords: [
      ...COMMON_KEYWORDS.women_empowerment,
      'mission',
      'vision',
      'values',
      'financial empowerment',
    ],
  },
  courses: {
    title: 'Free Financial Literacy Courses',
    description: 'Comprehensive financial education courses covering budgeting, investing, credit, retirement planning, and more. Learn at your own pace with expert-designed curriculum.',
    keywords: [
      ...COMMON_KEYWORDS.education,
      ...COMMON_KEYWORDS.financial_literacy,
      'budgeting course',
      'investing basics',
      'retirement planning',
      'credit management',
    ],
  },
  blog: {
    title: 'Financial Education Blog',
    description: 'Expert financial advice, tips, and insights for women seeking financial independence. Practical guides on budgeting, investing, career growth, and wealth building.',
    keywords: [
      ...COMMON_KEYWORDS.financial_literacy,
      'financial blog',
      'money tips',
      'financial advice',
      'wealth building',
      'career finance',
    ],
  },
  quiz: {
    title: 'Financial Knowledge Quiz - Test Your Skills',
    description: 'Test your financial literacy with our comprehensive quiz. Get personalized insights and discover areas to improve your money management skills.',
    keywords: [
      'financial literacy quiz',
      'money knowledge test',
      'financial assessment',
      'personal finance quiz',
      'budgeting quiz',
    ],
  },
  community: {
    title: 'Community Forum - Connect & Learn',
    description: 'Join our supportive community of women on their financial journey. Share experiences, ask questions, and learn from others achieving financial independence.',
    keywords: [
      ...COMMON_KEYWORDS.community,
      'financial forum',
      'women community',
      'money discussion',
      'financial support',
    ],
  },
  contact: {
    title: 'Contact Us - Get in Touch',
    description: 'Have questions or want to collaborate? Contact The Purple Wings team. We\'re here to support your financial education journey.',
    keywords: [
      'contact',
      'support',
      'partnership',
      'collaboration',
      'help',
    ],
  },
  faq: {
    title: 'Frequently Asked Questions',
    description: 'Find answers to common questions about our platform, courses, and financial education resources. Get the help you need to start your learning journey.',
    keywords: [
      'FAQ',
      'help',
      'questions',
      'support',
      'information',
    ],
  },
  dashboard: {
    title: 'Your Learning Dashboard',
    description: 'Track your progress, manage courses, and monitor your financial education journey. Your personalized learning hub.',
    keywords: [
      'dashboard',
      'progress tracking',
      'learning hub',
      'course management',
    ],
  },
}

// Structured data generators
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo-nobg.png`,
    description: DEFAULT_DESCRIPTION,
    sameAs: [
      // Add social media URLs when available
      // 'https://facebook.com/thepurplewings',
      // 'https://twitter.com/thepurplewings',
      // 'https://linkedin.com/company/thepurplewings',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'info@thepurplewings.org',
    },
  }
}

export function generateCourseSchema(course: {
  name: string
  description: string
  provider: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.name,
    description: course.description,
    provider: {
      '@type': 'Organization',
      name: course.provider,
      url: SITE_URL,
    },
    url: course.url,
    educationalLevel: 'Beginner to Advanced',
    teaches: course.name,
    isAccessibleForFree: true,
  }
}

export function generateArticleSchema(article: {
  headline: string
  description: string
  image: string
  datePublished: string
  dateModified?: string
  author: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Organization',
      name: article.author,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo-nobg.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}
