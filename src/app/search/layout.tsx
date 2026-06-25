import type { Metadata } from 'next'
import { generateSEO } from '@/lib/seo'

export const metadata: Metadata = generateSEO({
  title: 'Search Courses, Guides & Resources',
  description: 'Search The Purple Wings for free financial courses, topic guides, tools, and resources for women.',
  canonicalPath: '/search',
})

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children
}
