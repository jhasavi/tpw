import type { Metadata } from 'next'
import Link from 'next/link'
import { guides } from '@/data/guides'
import { generateSEO } from '@/lib/seo'

export const metadata: Metadata = generateSEO({
  title: 'Free Financial Guides for Women — Self-Study',
  description:
    'Topic guides on budgeting, emergency funds, credit, investing, retirement, salary negotiation, and more. Free resources for women learning personal finance.',
  keywords: ['financial guides women', 'personal finance articles', 'self study money'],
  canonicalPath: '/guides',
})

export default function GuidesIndexPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <section className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">Financial Topic Guides</h1>
          <p className="mt-4 text-purple-100 text-lg">
            In-depth self-study articles for women — each links to our free courses.
          </p>
        </div>
      </section>
      <div className="max-w-4xl mx-auto px-4 py-12 grid gap-6 md:grid-cols-2">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="rounded-xl border border-purple-100 bg-white p-6 shadow-sm hover:shadow-md hover:border-purple-300 transition-all"
          >
            <h2 className="text-lg font-bold text-gray-900">{guide.title}</h2>
            <p className="mt-2 text-sm text-gray-600 line-clamp-3">{guide.intro}</p>
            <span className="mt-4 inline-block text-sm font-medium text-purple-600">Read guide →</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
