import type { Metadata } from 'next'
import { generateSEO } from '@/lib/seo'

export const metadata: Metadata = generateSEO({
  title: 'Free Financial Literacy Quizzes for Women',
  description:
    'Test your money knowledge with free quizzes on budgeting, investing, retirement, and more. Self-assessment tools for women learning personal finance.',
  keywords: ['financial literacy quiz', 'money quiz women', 'retirement readiness quiz', 'financial personality test'],
  canonicalPath: '/quiz',
})

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return children
}
