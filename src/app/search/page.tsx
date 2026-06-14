import type { Metadata } from 'next'
import { Suspense } from 'react'
import SiteSearch from '@/components/SiteSearch'

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search courses, events, newsletter, and resources on The Purple Wings website.',
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-purple-50" />}>
      <SiteSearch />
    </Suspense>
  )
}
