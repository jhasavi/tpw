import type { Metadata } from 'next'
import { generateSEO } from '@/lib/seo'

export const metadata: Metadata = generateSEO({
  title: 'Subscribe to Weekly Financial Tips',
  description:
    'Get free weekly financial tips for women by email. Practical budgeting, saving, and investing advice from The Purple Wings.',
  keywords: ['financial newsletter women', 'weekly money tips', 'free financial advice email'],
  canonicalPath: '/newsletter/subscribe',
})

export default function NewsletterSubscribeLayout({ children }: { children: React.ReactNode }) {
  return children
}
