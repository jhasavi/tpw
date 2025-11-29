import { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

interface CoursePageProps {
  params: Promise<{
    curriculum: string
    course: string
  }>
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { curriculum, course } = await params
  const supabase = await createClient()
  
  const { data: courseData } = await supabase
    .from('courses')
    .select('title, description')
    .eq('slug', course)
    .single()

  return {
    title: courseData?.title || 'Course',
    description: courseData?.description || 'Learn at your own pace',
  }
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { curriculum, course } = await params
  const supabase = await createClient()

  // Get course details
  const { data: courseData, error: courseError } = await supabase
    .from('courses')
    .select(`
      *,
      curricula (
        title,
        slug
      )
    `)
    .eq('slug', course)
    .single()

  if (courseError || !courseData) {
    notFound()
  }

  // Get lessons for this course
  const { data: lessons, error: lessonsError } = await supabase
    .from('lessons')
    .select('*')
    .eq('course_id', courseData.id)
    .order('display_order')

  if (lessonsError) {
    console.error('Error fetching lessons:', lessonsError)
  }

  const lessonsList = lessons || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/courses" className="hover:text-purple-600">
              Courses
            </Link>
            <span>/</span>
            <Link href={`/courses/${curriculum}`} className="hover:text-purple-600">
              {courseData.curricula?.title}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{courseData.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Course Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            {courseData.difficulty_level === 'beginner' && (
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                🟢 Beginner
              </span>
            )}
            {courseData.difficulty_level === 'intermediate' && (
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                🟡 Intermediate
              </span>
            )}
            {courseData.difficulty_level === 'advanced' && (
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                🔴 Advanced
              </span>
            )}
            {courseData.is_required && (
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                ⭐ Required
              </span>
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {courseData.title}
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
            {courseData.description}
          </p>

          {/* Course Stats */}
          <div className="flex flex-wrap gap-6 mt-8">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📚</span>
              <div>
                <div className="text-2xl font-bold text-purple-600">{lessonsList.length}</div>
                <div className="text-sm text-gray-600">Lessons</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⏱️</span>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round(lessonsList.reduce((sum, l) => sum + (l.duration_minutes || 0), 0) / 60)}h
                </div>
                <div className="text-sm text-gray-600">Total Time</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              <div>
                <div className="text-2xl font-bold text-purple-600">Self-Paced</div>
                <div className="text-sm text-gray-600">Learn Anytime</div>
              </div>
            </div>
          </div>
        </div>

        {/* Lessons List */}
        <div className="bg-white rounded-2xl shadow-lg border border-purple-100 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Course Lessons</h2>
          </div>

          {lessonsList.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Coming Soon
              </h3>
              <p className="text-gray-600">
                Lessons for this course are being prepared.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {lessonsList.map((lesson, index) => (
                <Link
                  key={lesson.id}
                  href={`/learn/${curriculum}/${course}/${lesson.slug}`}
                  className="block px-6 py-6 hover:bg-purple-50 transition-colors group"
                >
                  <div className="flex items-start gap-4">
                    {/* Lesson Number */}
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-100 group-hover:bg-purple-200 rounded-full flex items-center justify-center transition-colors">
                      <span className="text-purple-700 font-bold">{index + 1}</span>
                    </div>

                    {/* Lesson Content */}
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-700 transition-colors mb-2">
                        {lesson.title}
                      </h3>
                      
                      {lesson.description && (
                        <p className="text-gray-600 mb-3 line-clamp-2">
                          {lesson.description}
                        </p>
                      )}

                      {/* Lesson Meta */}
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        {lesson.duration_minutes && (
                          <span className="flex items-center gap-1">
                            ⏱️ {lesson.duration_minutes} min
                          </span>
                        )}
                        {lesson.objectives && Array.isArray(lesson.objectives) && lesson.objectives.length > 0 && (
                          <span className="flex items-center gap-1">
                            🎯 {lesson.objectives.length} objectives
                          </span>
                        )}
                        {lesson.key_concepts && Array.isArray(lesson.key_concepts) && lesson.key_concepts.length > 0 && (
                          <span className="flex items-center gap-1">
                            💡 {lesson.key_concepts.length} key concepts
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Arrow Icon */}
                    <div className="flex-shrink-0 text-gray-400 group-hover:text-purple-600 transition-colors">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Back to Courses Button */}
        <div className="mt-8">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Courses
          </Link>
        </div>
      </div>
    </div>
  )
}
