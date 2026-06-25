import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { generateSEO } from '@/lib/seo'

export const metadata: Metadata = generateSEO({
  title: 'Free Self-Study Financial Courses for Women',
  description:
    'Learn personal finance at your own pace with free, women-centered courses on budgeting, emergency funds, credit, investing, and retirement. No account required to start.',
  keywords: [
    'self study financial literacy',
    'free finance courses women',
    'women financial education online',
    'budgeting course free',
    'financial independence women',
  ],
})

const BEGINNER_PATH = [
  { slug: 'financial-literacy-basics', title: 'Financial Literacy Basics', icon: '📚' },
  { slug: 'budgeting-basics', title: 'Budgeting Basics', icon: '💰' },
  { slug: 'emergency-planning', title: 'Emergency Planning', icon: '🛡️' },
  { slug: 'credit-management', title: 'Credit Management', icon: '💳' },
]

const GUIDE_LINKS = [
  { href: '/guides/budgeting-for-women', title: 'Budgeting for Women' },
  { href: '/guides/emergency-fund-guide', title: 'Emergency Fund Guide' },
  { href: '/guides/credit-score-basics', title: 'Credit Score Basics' },
  { href: '/guides/investing-101-women', title: 'Investing 101' },
]

export default async function LearnPortalPage() {
  const supabase = await createClient()

  const { data: curricula } = await supabase
    .from('curricula')
    .select('id, slug, title, description, estimated_hours, is_professional_track')
    .order('display_order', { ascending: true })

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-indigo-50">
      <section className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-purple-200">Self-study portal</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold">Learn finance on your schedule</h1>
          <p className="mt-4 text-lg text-purple-100 max-w-2xl mx-auto">
            Free courses designed for women. Read lessons, take quizzes, and build confidence — no signup required to start.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/learn/womens-financial-literacy/financial-literacy-basics"
              className="rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-purple-900 hover:bg-yellow-300"
            >
              Start beginner path
            </Link>
            <Link
              href="/courses"
              className="rounded-xl border border-white/50 px-6 py-3 font-semibold text-white hover:bg-white/10"
            >
              Browse all courses
            </Link>
            <Link
              href="/guides"
              className="rounded-xl border border-white/50 px-6 py-3 font-semibold text-white hover:bg-white/10"
            >
              Topic guides
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Start here: beginner path</h2>
          <p className="text-gray-600 mb-6">Four foundational courses — work through them in order or jump to what you need.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BEGINNER_PATH.map((course, i) => (
              <Link
                key={course.slug}
                href={`/learn/womens-financial-literacy/${course.slug}`}
                className="rounded-xl border border-purple-100 bg-white p-5 shadow-sm hover:shadow-md hover:border-purple-300 transition-all"
              >
                <span className="text-2xl">{course.icon}</span>
                <p className="text-xs text-purple-600 font-semibold mt-2">Step {i + 1}</p>
                <h3 className="font-bold text-gray-900 mt-1">{course.title}</h3>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Curricula</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {curricula?.map((c) => (
              <Link
                key={c.id}
                href={`/learn/${c.slug}`}
                className="rounded-2xl border border-purple-100 bg-white p-8 shadow-sm hover:shadow-lg transition-all"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-purple-600">
                  {c.is_professional_track ? 'Professional track' : 'Self-paced'}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-2">{c.title}</h3>
                <p className="text-gray-600 mt-2 line-clamp-3">{c.description}</p>
                {c.estimated_hours && (
                  <p className="text-sm text-purple-600 mt-4">~{c.estimated_hours} hours</p>
                )}
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-purple-50 border border-purple-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Study tips</h2>
          <ul className="grid md:grid-cols-2 gap-4 mt-4 text-gray-700">
            <li className="flex gap-2"><span>✓</span> Set aside 20–30 minutes per lesson — consistency beats cramming.</li>
            <li className="flex gap-2"><span>✓</span> Complete action items before moving to the next lesson.</li>
            <li className="flex gap-2"><span>✓</span> Take the lesson quiz to check your understanding.</li>
            <li className="flex gap-2"><span>✓</span> Create a free account to save progress and earn certificates.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Popular topic guides</h2>
          <p className="text-gray-600 mb-6">Quick reads that link into full courses.</p>
          <div className="flex flex-wrap gap-3">
            {GUIDE_LINKS.map((g) => (
              <Link
                key={g.href}
                href={g.href}
                className="rounded-full border border-purple-200 bg-white px-4 py-2 text-sm font-medium text-purple-800 hover:bg-purple-50"
              >
                {g.title}
              </Link>
            ))}
            <Link href="/guides" className="rounded-full bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700">
              All guides →
            </Link>
          </div>
        </section>

        <section className="text-center pb-8">
          <h2 className="text-xl font-bold text-gray-900">Ready to assess your knowledge?</h2>
          <p className="text-gray-600 mt-2 mb-4">Take a free quiz to find your starting point.</p>
          <Link href="/quiz/personality" className="inline-block rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700">
            Take the financial personality quiz
          </Link>
        </section>
      </div>
    </div>
  )
}
