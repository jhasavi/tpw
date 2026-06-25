// Guide slugs — shared by sitemap, search index, and routes
export { guides, getGuideBySlug } from './content'
export type { Guide, GuideFAQ, GuideSection } from './types'

export const GUIDE_SLUGS = [
  'budgeting-for-women',
  'emergency-fund-guide',
  'credit-score-basics',
  'investing-101-women',
  'retirement-accounts-explained',
  'salary-negotiation-women',
  'financial-independence-women',
  'money-after-life-changes',
] as const

export type GuideSlug = (typeof GUIDE_SLUGS)[number]
