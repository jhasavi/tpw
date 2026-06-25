import type { Metadata } from 'next'
import { generateSEO } from '@/lib/seo'

export const metadata: Metadata = generateSEO({
  title: 'Free Financial Tools & Calculators for Women',
  description:
    'Budget calculators, debt payoff tools, and salary negotiation scripts — free financial planning tools designed for women learning personal finance.',
  keywords: ['budget calculator women', 'debt payoff calculator', 'financial tools free', 'salary negotiation women'],
  canonicalPath: '/tools',
})

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return children
}
