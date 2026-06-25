export type SiteSearchEntry = {
  title: string
  description: string
  href: string
  keywords: string[]
  category: string
}

/** Curated site index for client-side search (no crawl infra required). */
import { guides } from '@/data/guides'

const guideEntries: SiteSearchEntry[] = guides.map((g) => ({
  title: g.title,
  description: g.metaDescription,
  href: `/guides/${g.slug}`,
  keywords: g.keywords,
  category: 'Guides',
}))

const learnEntries: SiteSearchEntry[] = [
  { title: 'Self-Study Portal', description: 'Free self-paced courses for women', href: '/learn', keywords: ['self study', 'portal', 'learn'], category: 'Learn' },
  { title: 'Financial Literacy Basics', description: 'Beginner course', href: '/learn/womens-financial-literacy/financial-literacy-basics', keywords: ['basics', 'beginner'], category: 'Learn' },
  { title: 'Budgeting Basics', description: 'Create and maintain a budget', href: '/learn/womens-financial-literacy/budgeting-basics', keywords: ['budget', 'budgeting'], category: 'Learn' },
  { title: 'Emergency Planning', description: 'Build your emergency fund', href: '/learn/womens-financial-literacy/emergency-planning', keywords: ['emergency', 'savings'], category: 'Learn' },
  { title: 'Credit Management', description: 'Understand and improve credit', href: '/learn/womens-financial-literacy/credit-management', keywords: ['credit', 'score'], category: 'Learn' },
  { title: 'All Guides', description: 'Topic guides for self-learners', href: '/guides', keywords: ['guides', 'articles'], category: 'Guides' },
]

export const siteSearchIndex: SiteSearchEntry[] = [
  { title: 'Home', description: 'The Purple Wings — free financial education for women in Needham', href: '/', keywords: ['home', 'purple wings', 'shalini jha'], category: 'Main' },
  { title: 'About Us', description: 'Our mission empowering women through financial literacy', href: '/about', keywords: ['about', 'mission', 'nonprofit'], category: 'About' },
  { title: 'Courses', description: 'Free financial literacy courses and learning paths', href: '/courses', keywords: ['courses', 'learn', 'classes', 'curriculum'], category: 'Learn' },
  { title: 'Events', description: 'Financial education workshops and class registration', href: '/events', keywords: ['events', 'workshops', 'register', 'classes'], category: 'Community' },
  { title: 'Weekly Tips Newsletter', description: 'Subscribe to weekly financial tips on The Purple Wings', href: '/newsletter/subscribe', keywords: ['newsletter', 'subscribe', 'weekly tips', 'email'], category: 'Newsletter' },
  { title: 'Blog', description: 'Articles on financial independence and empowerment', href: '/blog', keywords: ['blog', 'articles', 'stories'], category: 'Resources' },
  { title: 'FAQ', description: 'Frequently asked questions', href: '/faq', keywords: ['faq', 'help', 'questions'], category: 'Resources' },
  { title: 'Contact', description: 'Get in touch with The Purple Wings', href: '/contact', keywords: ['contact', 'email', 'reach'], category: 'About' },
  { title: 'Get Involved', description: 'Volunteer, donate, and support the movement', href: '/get-involved', keywords: ['volunteer', 'donate', 'involved'], category: 'Community' },
  { title: 'Success Stories', description: 'Stories from women in our community', href: '/stories', keywords: ['stories', 'testimonials'], category: 'Community' },
  { title: 'Financial Tools', description: 'Calculators and planning tools', href: '/tools', keywords: ['tools', 'calculator', 'budget'], category: 'Resources' },
  { title: 'Life Events Guide', description: 'Financial guidance for major life events', href: '/life-events', keywords: ['life events', 'divorce', 'caregiving'], category: 'Resources' },
  { title: 'Personality Quiz', description: 'Discover your financial personality', href: '/quiz/personality', keywords: ['quiz', 'personality'], category: 'Learn' },
  { title: 'Retirement Readiness', description: 'Assess your retirement preparedness', href: '/quiz/retirement-readiness', keywords: ['retirement', 'quiz', 'assessment'], category: 'Learn' },
  { title: 'Ambassador Program', description: 'Spread financial literacy in your community', href: '/ambassador', keywords: ['ambassador', 'volunteer'], category: 'Community' },
  { title: 'Corporate Sponsors', description: 'Partner with The Purple Wings', href: '/corporate-sponsors', keywords: ['sponsor', 'corporate', 'partnership'], category: 'About' },
  { title: 'Classes on JanaGana', description: 'Register for Purple Wings classes and events', href: 'https://janagana.namasteneedham.com/portal/purple-wings/events', keywords: ['janagana', 'register', 'class registration'], category: 'Events' },
  { title: 'Community updates (JanaGana)', description: 'Event and class announcements via JanaGana', href: 'https://janagana.namasteneedham.com/portal/purple-wings/contact?interest=newsletter', keywords: ['community updates', 'janagana newsletter', 'events email'], category: 'Newsletter' },
  ...learnEntries,
  ...guideEntries,
]

export function searchSiteIndex(query: string, limit = 12): SiteSearchEntry[] {
  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .map((t) => t.trim())
    .filter(Boolean)

  if (terms.length === 0) return []

  const scored = siteSearchIndex
    .map((entry) => {
      const haystack = [
        entry.title,
        entry.description,
        entry.category,
        ...entry.keywords,
      ]
        .join(' ')
        .toLowerCase()

      let score = 0
      for (const term of terms) {
        if (entry.title.toLowerCase().includes(term)) score += 4
        if (haystack.includes(term)) score += 2
      }
      return { entry, score }
    })
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score)

  return scored.slice(0, limit).map((row) => row.entry)
}
