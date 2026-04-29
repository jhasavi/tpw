import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | The Purple Wings',
  description: 'Have questions or want to collaborate with The Purple Wings? Contact Shalini Jha and our team. We respond within 24 hours.',
  keywords: ['contact The Purple Wings', 'women financial literacy contact', 'financial education partnership'],
  openGraph: {
    title: 'Contact The Purple Wings',
    description: 'Reach out to our team for questions, partnerships, or media inquiries.',
  },
  alternates: {
    canonical: 'https://www.thepurplewings.org/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
