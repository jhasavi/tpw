import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ - Frequently Asked Questions | The Purple Wings',
  description: 'Find answers to common questions about The Purple Wings financial literacy platform, courses, certificates, and women-specific financial topics.',
  keywords: ['financial literacy FAQ', 'free finance courses FAQ', 'women financial education questions', 'The Purple Wings help'],
  openGraph: {
    title: 'FAQ - Frequently Asked Questions | The Purple Wings',
    description: 'Find answers about our free financial literacy courses for women. Certificates, mobile access, women-specific content, and more.',
  },
  alternates: {
    canonical: 'https://www.thepurplewings.org/faq',
  },
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
