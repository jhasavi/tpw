import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { Lesson } from '@/types/curriculum'
import QuizSection from '@/components/QuizSection'
import ProgressTracker from '@/components/ProgressTracker'
import ProgressPersistence from '@/components/ProgressPersistence'
import BookmarkButton from '@/components/BookmarkButton'
import CourseProgressTracker from '@/components/CourseProgressTracker'
import SaveProgressBanner from '@/components/SaveProgressBanner'
import LessonContent from '@/components/LessonContent'

interface LessonPageProps {
  params: Promise<{
    curriculum: string
    course: string
    lesson: string
  }>
}

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const { curriculum, course, lesson } = await params
  const supabase = await createClient()

  const { data: lessonData } = await supabase
    .from('lessons')
    .select('title, description')
    .eq('slug', lesson)
    .single()

  const { data: courseData } = await supabase
    .from('courses')
    .select('title')
    .eq('slug', course)
    .single()

  const title = lessonData?.title
    ? `${lessonData.title} | ${courseData?.title || 'Course'} | The Purple Wings`
    : 'Lesson | The Purple Wings'
  const description = lessonData?.description ||
    'Learn personal finance with The Purple Wings — free financial literacy courses for women.'
  const canonicalUrl = `https://www.thepurplewings.org/learn/${curriculum}/${course}/${lesson}`

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: [{ url: 'https://www.thepurplewings.org/images/Women-fin.png' }],
    },
  }
}

export default async function LessonPage({ params }: LessonPageProps) {
  try {
    const { curriculum: curriculumSlug, course: courseSlug, lesson: lessonSlug } = await params
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    // Fetch lesson from database
    const { data: curriculaData, error: curriculaError } = await supabase
      .from('curricula')
      .select('id, title')
      .eq('slug', curriculumSlug)
      .single()

    if (curriculaError) {
      console.error('Error fetching curriculum:', { slug: curriculumSlug, error: curriculaError })
      notFound()
    }

    if (!curriculaData) {
      notFound()
    }

    const { data: courseData, error: courseError } = await supabase
      .from('courses')
      .select('id, title')
      .eq('curriculum_id', curriculaData.id)
      .eq('slug', courseSlug)
      .single()

    if (courseError) {
      console.error('Error fetching course:', { slug: courseSlug, curriculumId: curriculaData.id, error: courseError })
      notFound()
    }

    if (!courseData) {
      notFound()
    }

    const { data: lessonData, error: lessonError } = await supabase
      .from('lessons')
      .select('*')
      .eq('course_id', courseData.id)
      .eq('slug', lessonSlug)
      .single()

    if (lessonError) {
      console.error('Error fetching lesson:', { slug: lessonSlug, courseId: courseData.id, error: lessonError })
      notFound()
    }

    if (!lessonData) {
      notFound()
    }

    // Get all lessons in this course for navigation
    const { data: allLessons, error: allLessonsError } = await supabase
      .from('lessons')
      .select('id, slug, title, display_order')
      .eq('course_id', courseData.id)
      .order('display_order', { ascending: true })

    if (allLessonsError) {
      console.error('Error fetching all lessons for navigation:', allLessonsError)
    }

    const currentIndex = allLessons?.findIndex(l => l.id === lessonData.id) ?? -1
  const previousLesson = currentIndex > 0 ? allLessons?.[currentIndex - 1] : null
  const nextLesson = currentIndex >= 0 && allLessons && currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null
  const totalLessons = allLessons?.length ?? 0
  const lessonNumber = currentIndex + 1

    // Get user's progress in this course (optional — anonymous learners allowed)
    const authedUser = user
    let completedLessons = 0
    let isBookmarked = false
    
    if (authedUser) {
      const { data: progressData, error: progressError } = await supabase
        .from('lesson_progress')
        .select('lesson_id, status')
        .eq('user_id', authedUser.id)
        .in('lesson_id', allLessons?.map(l => l.id) ?? [])
      
      if (progressError) {
        console.error('Error fetching lesson progress:', progressError)
      } else {
        completedLessons = progressData?.filter(p => p.status === 'completed').length ?? 0
      }
      
      // Check if lesson is bookmarked
      const { data: bookmark, error: bookmarkError } = await supabase
        .from('lesson_bookmarks')
        .select('id')
        .eq('user_id', authedUser.id)
        .eq('lesson_id', lessonData.id)
        .single()
      
      if (bookmarkError && bookmarkError.code !== 'PGRST116') {
        // PGRST116 is "not found" error, which is expected
        console.error('Error fetching bookmark:', bookmarkError)
      } else {
        isBookmarked = !!bookmark
      }
    }

  // Check if lesson has content - handle old, new, and markdown-based content structures
  const hasContent = lessonData.content &&
    typeof lessonData.content === 'object' && (
      ('introduction' in lessonData.content && lessonData.content.introduction) ||
      ('sections' in lessonData.content && Array.isArray(lessonData.content.sections) && lessonData.content.sections.length > 0) ||
      ('markdown' in lessonData.content && lessonData.content.markdown && typeof lessonData.content.markdown === 'string' && lessonData.content.markdown.length > 0)
    )

  if (!hasContent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <div className="text-6xl mb-4">🚧</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Lesson Coming Soon</h2>
          <p className="text-gray-600 mb-6">
            <strong>{lessonData.title}</strong> is being prepared. Check back soon!
          </p>
          <Link
            href="/courses"
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700"
          >
            Back to Courses
          </Link>
        </div>
      </div>
    )
  }

  const lesson = lessonData as unknown as Lesson
  const content = lesson.content

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SaveProgressBanner isLoggedIn={!!authedUser} />

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/courses" className="hover:text-purple-600">Courses</Link>
          <span className="mx-2">/</span>
          <Link href={`/learn/${curriculumSlug}/${courseSlug}`} className="hover:text-purple-600">{courseData.title}</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{lesson.title}</span>
        </nav>

        {/* Progress Indicator */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Lesson {lessonNumber} of {totalLessons}
            </span>
            <span className="text-sm font-medium text-purple-600">
              {Math.round((completedLessons / totalLessons) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-purple-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${(completedLessons / totalLessons) * 100}%` }}
            />
          </div>
          <div className="mt-2 text-xs text-gray-600">
            {completedLessons} of {totalLessons} lessons completed in this course
          </div>
        </div>

        {/* Lesson Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <ProgressPersistence 
            courseId={courseData.id}
            lessonId={lessonData.id}
            onProgressRestored={(progress) => {
              if (progress && typeof progress.scrollPosition === 'number') {
                setTimeout(() => {
                  window.scrollTo(0, progress.scrollPosition || 0)
                }, 100)
              }
            }}
          />
          
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {lesson.title}
              </h1>
              <p className="text-gray-600 text-lg">{lesson.description}</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              {authedUser && (
                <BookmarkButton
                  type="lesson"
                  itemId={lessonData.id}
                  itemTitle={lesson.title}
                  userId={authedUser.id}
                  initialBookmarked={isBookmarked}
                  showLabel={false}
                />
              )}
              <div className="text-sm text-gray-600 text-center">
                <span className="block text-2xl mb-1">⏱️</span>
                {lesson.durationMinutes} min
              </div>
            </div>
          </div>

          {/* Learning Objectives */}
          {lesson.objectives && Array.isArray(lesson.objectives) && lesson.objectives.length > 0 && (
            <div className="bg-purple-50 border-l-4 border-purple-600 p-6 mt-6">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span>🎯</span> What You'll Learn
              </h3>
              <ul className="space-y-2">
                {lesson.objectives.map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <span className="text-purple-600 mt-1">✓</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <LessonContent lesson={lesson} courseTitle={courseData.title} showHeader={false} />

        {/* Lesson Navigation - Enhanced Visibility */}
        <div className="bg-gradient-to-r from-purple-100 via-purple-50 to-indigo-100 rounded-2xl shadow-2xl p-8 mb-6 border-4 border-purple-300">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">📚 Lesson Navigation</h3>
          <div className="flex items-center justify-between gap-4">
            {previousLesson ? (
              <Link
                href={`/learn/${curriculumSlug}/${courseSlug}/${previousLesson.slug}`}
                className="flex-1 group"
              >
                <div className="flex items-center gap-3 p-5 rounded-xl border-3 border-gray-300 hover:border-gray-500 bg-white hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-gray-200 group-hover:bg-gray-300 flex items-center justify-center transition-colors">
                      <svg className="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-xs text-gray-500 mb-1">Previous Lesson</div>
                    <div className="font-semibold text-gray-900 group-hover:text-purple-600 line-clamp-1">
                      {previousLesson.title}
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="flex-1 p-4 rounded-lg border-2 border-gray-100 bg-gray-50">
                <div className="text-center text-gray-400 text-sm">First Lesson</div>
              </div>
            )}

            <Link
              href={`/learn/${curriculumSlug}/${courseSlug}`}
              className="flex-shrink-0 px-8 py-5 bg-white hover:bg-purple-50 text-purple-700 hover:text-purple-900 font-bold transition-all border-3 border-purple-400 rounded-xl shadow-lg hover:shadow-xl text-lg"
            >
              📖 All Lessons
            </Link>

            {nextLesson ? (
              <Link
                href={`/learn/${curriculumSlug}/${courseSlug}/${nextLesson.slug}`}
                className="flex-1 group"
              >
                <div className="flex items-center gap-3 p-5 rounded-xl border-3 border-purple-500 bg-purple-600 hover:bg-purple-700 transition-all shadow-lg hover:shadow-2xl">
                  <div className="flex-1 text-right">
                    <div className="text-sm font-bold text-purple-100 mb-1">Next →</div>
                    <div className="font-bold text-white line-clamp-2 text-sm">
                      {nextLesson.title}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-purple-400 group-hover:bg-purple-300 flex items-center justify-center transition-colors">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="flex-1 p-5 rounded-xl border-3 border-green-400 bg-green-500">
                <div className="text-center text-white font-bold text-lg">
                  🎉 Course Complete!
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quiz Section - placed below navigation and sized consistently */}
        <QuizSection lessonId={lessonData.id} lessonTitle={lesson.title} />

        {/* CRM Progress Tracking */}
        <CourseProgressTracker
          courseId={courseData.id}
          courseSlug={courseSlug}
          courseTitle={courseData.title}
          curriculumTitle={curriculaData.title}
          lessonId={lessonData.id}
          lessonTitle={lesson.title}
          eventType="course_started"
        />

        {/* Progress Tracker */}
        <ProgressTracker
          lessonId={lessonData.id}
          courseId={courseData.id}
          courseSlug={courseSlug}
          courseTitle={courseData.title}
          curriculumTitle={curriculaData.title}
        />

        {/* Back to Courses */}
        <div className="text-center">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
          >
            <span>←</span> Back to All Courses
          </Link>
        </div>
      </div>
    </div>
    )
  } catch (error) {
    console.error('Unexpected error in lesson page:', error)
    throw error
  }
}
