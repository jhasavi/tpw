import Link from 'next/link'
import Image from 'next/image'
import { curricula } from '@/data/curricula'

export default function CoursesPage() {
  const womensCurriculum = curricula.find(c => c.slug === 'womens-financial-literacy')
  const finraCurriculum = curricula.find(c => c.slug === 'finra-40-hour')

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore Our Curriculum
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Two comprehensive learning paths designed for women at every stage of their financial journey. 
            Start where you are, learn at your own pace.
          </p>
        </div>

        {/* Inspirational Image */}
        <div className="relative h-64 mb-12 rounded-2xl overflow-hidden shadow-xl">
          <Image
            src="/images/Women-fin.png"
            alt="Women achieving financial independence"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-indigo-900/70 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Your Financial Journey Starts Here</h2>
              <p className="text-xl text-purple-100">Free, comprehensive education designed for women</p>
            </div>
          </div>
        </div>

        {/* Women's Financial Literacy Curriculum */}
        {womensCurriculum && (
          <section className="mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-purple-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="text-5xl">📚</div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{womensCurriculum.title}</h2>
                  <p className="text-gray-600 mb-4">{womensCurriculum.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-purple-600">📊</span>
                      <span className="text-gray-700">{womensCurriculum.courses.length} courses</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-purple-600">⏱️</span>
                      <span className="text-gray-700">~{womensCurriculum.estimatedHours} hours</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-purple-600">🎯</span>
                      <span className="text-gray-700">Beginner to Advanced</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Groups */}
              <div className="space-y-8 mt-8">
                {/* Beginner */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-green-600">🟢</span> Beginner Level
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {womensCurriculum.courses.filter(c => c.level === 'beginner').map(course => (
                      <Link
                        key={course.id}
                        href={`/learn/${womensCurriculum.slug}/${course.slug}`}
                        className="block p-4 bg-green-50 border border-green-200 rounded-lg hover:shadow-md transition-all"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{course.icon}</span>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{course.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                            <p className="text-xs text-gray-500 mt-2">{course.estimatedHours} hours</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Intermediate */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-yellow-600">🟡</span> Intermediate Level
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {womensCurriculum.courses.filter(c => c.level === 'intermediate').map(course => (
                      <Link
                        key={course.id}
                        href={`/learn/${womensCurriculum.slug}/${course.slug}`}
                        className="block p-4 bg-yellow-50 border border-yellow-200 rounded-lg hover:shadow-md transition-all"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{course.icon}</span>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{course.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                            <p className="text-xs text-gray-500 mt-2">{course.estimatedHours} hours</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Advanced */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-red-600">🔴</span> Advanced Level
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {womensCurriculum.courses.filter(c => c.level === 'advanced').map(course => (
                      <Link
                        key={course.id}
                        href={`/learn/${womensCurriculum.slug}/${course.slug}`}
                        className="block p-4 bg-red-50 border border-red-200 rounded-lg hover:shadow-md transition-all"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{course.icon}</span>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{course.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                            <p className="text-xs text-gray-500 mt-2">{course.estimatedHours} hours</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Women-Specific */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-purple-600">💜</span> Women-Specific Empowerment
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {womensCurriculum.courses.filter(c => c.level === 'women-specific').map(course => (
                      <Link
                        key={course.id}
                        href={`/learn/${womensCurriculum.slug}/${course.slug}`}
                        className="block p-4 bg-purple-50 border border-purple-200 rounded-lg hover:shadow-md transition-all"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{course.icon}</span>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{course.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                            <p className="text-xs text-gray-500 mt-2">{course.estimatedHours} hours</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FINRA 40-Hour Course */}
        {finraCurriculum && (
          <section>
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-2xl shadow-lg p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="text-5xl">🎓</div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-2">{finraCurriculum.title}</h2>
                  <p className="text-purple-100 mb-4">{finraCurriculum.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span>📊</span>
                      <span>{finraCurriculum.courses.length} modules</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>⏱️</span>
                      <span>{finraCurriculum.estimatedHours} hours</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🏆</span>
                      <span>Certificate included</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-8">
                {finraCurriculum.courses.map(course => (
                  <Link
                    key={course.id}
                    href={`/learn/${finraCurriculum.slug}/${course.slug}`}
                    className="block p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{course.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-semibold">{course.title}</h4>
                        <p className="text-sm text-purple-100 mt-1">{course.description}</p>
                        <p className="text-xs text-purple-200 mt-2">{course.estimatedHours} hours</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Learning?</h3>
          <Link
            href="/auth/signup"
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-xl transition-all"
          >
            Create Free Account
          </Link>
        </div>
      </div>
    </div>
  )
}
