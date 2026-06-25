import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { generateSEO } from '@/lib/seo'

export const metadata: Metadata = generateSEO({
  title: 'Free Financial Literacy Courses for Women',
  description:
    'Explore free self-paced financial courses: budgeting, emergency planning, credit, investing, and more. Two learning paths from beginner to professional.',
  keywords: ['free finance courses women', 'financial literacy curriculum', 'self study finance'],
  canonicalPath: '/courses',
})

const LEVEL_STYLES: Record<string, { emoji: string; bg: string; border: string; label: string }> = {
  beginner: { emoji: '🟢', bg: 'bg-green-50', border: 'border-green-200', label: 'Beginner Level' },
  intermediate: { emoji: '🟡', bg: 'bg-yellow-50', border: 'border-yellow-200', label: 'Intermediate Level' },
  advanced: { emoji: '🔴', bg: 'bg-red-50', border: 'border-red-200', label: 'Advanced Level' },
  'women-specific': { emoji: '💜', bg: 'bg-purple-50', border: 'border-purple-200', label: 'Women-Specific Empowerment' },
}

export default async function CoursesPage() {
  const supabase = await createClient()

  const { data: curricula } = await supabase
    .from('curricula')
    .select('*')
    .order('display_order', { ascending: true })

  const womensCurriculum = curricula?.find((c) => c.slug === 'womens-financial-literacy')
  const finraCurriculum = curricula?.find((c) => c.slug === 'finra-40-hour')

  let womensCourses: Array<{
    id: string
    slug: string
    title: string
    description: string
    level: string
    estimated_hours: number
    icon: string
  }> = []

  if (womensCurriculum) {
    const { data } = await supabase
      .from('courses')
      .select('id, slug, title, description, level, estimated_hours, icon')
      .eq('curriculum_id', womensCurriculum.id)
      .order('display_order')
    womensCourses = data ?? []
  }

  let finraCourses: typeof womensCourses = []
  if (finraCurriculum) {
    const { data } = await supabase
      .from('courses')
      .select('id, slug, title, description, level, estimated_hours, icon')
      .eq('curriculum_id', finraCurriculum.id)
      .order('display_order')
    finraCourses = data ?? []
  }

  const levels = ['beginner', 'intermediate', 'advanced', 'women-specific'] as const

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Free Self-Study Courses
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn at your own pace — no account required. Start with our beginner path or explore the full curriculum.
          </p>
          <Link href="/learn" className="mt-4 inline-block text-purple-600 font-semibold hover:underline">
            Open self-study portal →
          </Link>
        </div>

        <div className="relative h-64 mb-12 rounded-2xl overflow-hidden shadow-xl">
          <Image
            src="/images/Women-fin.png"
            alt="Women achieving financial independence"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-indigo-900/70 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Your Financial Journey Starts Here</h2>
              <p className="text-xl text-purple-100">100% free education designed for women</p>
            </div>
          </div>
        </div>

        {womensCurriculum && (
          <section className="mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-purple-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="text-5xl">📚</div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{womensCurriculum.title}</h2>
                  <p className="text-gray-600 mb-4">{womensCurriculum.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                    <span>📊 {womensCourses.length} courses</span>
                    <span>⏱️ ~{womensCurriculum.estimated_hours ?? 100} hours</span>
                  </div>
                </div>
              </div>

              <div className="space-y-8 mt-8">
                {levels.map((level) => {
                  const group = womensCourses.filter((c) => c.level === level)
                  if (group.length === 0) return null
                  const style = LEVEL_STYLES[level]
                  return (
                    <div key={level}>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span>{style.emoji}</span> {style.label}
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {group.map((course) => (
                          <Link
                            key={course.id}
                            href={`/learn/womens-financial-literacy/${course.slug}`}
                            className={`block p-4 ${style.bg} border ${style.border} rounded-lg hover:shadow-md transition-all`}
                          >
                            <div className="flex items-start gap-3">
                              <span className="text-2xl">{course.icon || '📖'}</span>
                              <div>
                                <h4 className="font-semibold text-gray-900">{course.title}</h4>
                                <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                                <p className="text-xs text-gray-500 mt-2">{course.estimated_hours} hours</p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {finraCurriculum && (
          <section>
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-2xl shadow-lg p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="text-5xl">🎓</div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-2">{finraCurriculum.title}</h2>
                  <p className="text-purple-100 mb-4">{finraCurriculum.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span>📊 {finraCourses.length} modules</span>
                    <span>⏱️ {finraCurriculum.estimated_hours ?? 40} hours</span>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mt-8">
                {finraCourses.map((course) => (
                  <Link
                    key={course.id}
                    href={`/learn/finra-40-hour/${course.slug}`}
                    className="block p-4 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-all"
                  >
                    <h4 className="font-semibold">{course.title}</h4>
                    <p className="text-sm text-purple-100 mt-1">{course.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Start learning now</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/learn/womens-financial-literacy/financial-literacy-basics"
              className="inline-flex px-8 py-4 text-lg font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 shadow-lg"
            >
              Beginner path
            </Link>
            <Link
              href="/auth/signup"
              className="inline-flex px-8 py-4 text-lg font-medium rounded-md text-purple-700 border-2 border-purple-600 hover:bg-purple-50"
            >
              Save progress (free account)
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
