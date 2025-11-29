import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { Lesson } from '@/types/curriculum'
import QuizSection from '@/components/QuizSection'
import ProgressTracker from '@/components/ProgressTracker'
import LessonContent from '@/components/LessonContent'

interface LessonPageProps {
  params: Promise<{
    curriculum: string
    course: string
    lesson: string
  }>
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { curriculum: curriculumSlug, course: courseSlug, lesson: lessonSlug } = await params
  const supabase = await createClient()

  // Fetch lesson from database
  const { data: curriculaData } = await supabase
    .from('curricula')
    .select('id, title')
    .eq('slug', curriculumSlug)
    .single()

  if (!curriculaData) {
    notFound()
  }

  const { data: courseData } = await supabase
    .from('courses')
    .select('id, title')
    .eq('curriculum_id', curriculaData.id)
    .eq('slug', courseSlug)
    .single()

  if (!courseData) {
    notFound()
  }

  const { data: lessonData } = await supabase
    .from('lessons')
    .select('*')
    .eq('course_id', courseData.id)
    .eq('slug', lessonSlug)
    .single()

  if (!lessonData) {
    notFound()
  }

  // Check if lesson has content
  const hasContent = lessonData.content && 
                     typeof lessonData.content === 'object' &&
                     'introduction' in lessonData.content &&
                     lessonData.content.introduction

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
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/courses" className="hover:text-purple-600">Courses</Link>
          <span className="mx-2">/</span>
          <Link href={`/courses`} className="hover:text-purple-600">{courseData.title}</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{lesson.title}</span>
        </nav>

        {/* Lesson Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {lesson.title}
              </h1>
              <p className="text-gray-600 text-lg">{lesson.description}</p>
            </div>
            <div className="flex-shrink-0 ml-4">
              <div className="text-sm text-gray-600">
                <span className="block text-2xl mb-1">⏱️</span>
                {lesson.durationMinutes} min
              </div>
            </div>
          </div>

          {/* Learning Objectives */}
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
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="prose prose-purple max-w-none">
            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
              {content.introduction}
            </p>
          </div>
        </div>

        {/* Content Sections */}
        {content.sections.map((section, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
            <div className="prose prose-purple max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-line mb-6">
                {section.content}
              </div>
            </div>

            {section.examples && section.examples.length > 0 && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mt-6">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span>💡</span> Examples
                </h4>
                <ul className="space-y-2">
                  {section.examples.map((example, exIdx) => (
                    <li key={exIdx} className="text-gray-700 flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {section.tips && section.tips.length > 0 && (
              <div className="bg-green-50 border-l-4 border-green-500 p-6 mt-6">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span>💭</span> Tips
                </h4>
                <ul className="space-y-2">
                  {section.tips.map((tip, tipIdx) => (
                    <li key={tipIdx} className="text-gray-700 flex items-start gap-2">
                      <span className="text-green-600 mt-1">→</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}

        {/* Key Takeaways */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span>🌟</span> Key Takeaways
          </h2>
          <ul className="space-y-3">
            {content.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-white text-purple-600 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Items */}
        {content.actionItems && content.actionItems.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>✅</span> Action Items
            </h2>
            <p className="text-gray-600 mb-4">
              Apply what you've learned! Complete these steps in the next week:
            </p>
            <ul className="space-y-3">
              {content.actionItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    className="mt-1 w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Resources */}
        {content.resources && content.resources.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>📚</span> Resources & Tools
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {content.resources.map((resource, idx) => (
                <div key={idx} className="border border-purple-200 rounded-lg p-4 hover:shadow-md transition-all">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">
                      {resource.type === 'tool' ? '🔧' : 
                       resource.type === 'worksheet' ? '📝' :
                       resource.type === 'calculator' ? '🧮' :
                       resource.type === 'article' ? '📄' : '🎥'}
                    </span>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{resource.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                      {resource.url && (
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-purple-600 hover:text-purple-700 font-medium mt-2 inline-block"
                        >
                          Access Resource →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quiz Section */}
        <QuizSection lessonId={lessonData.id} lessonTitle={lesson.title} />

        {/* Progress Tracker */}
        <ProgressTracker lessonId={lessonData.id} courseId={courseData.id} />

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Link
            href="/courses"
            className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-2"
          >
            <span>←</span> Back to Courses
          </Link>
          <div className="text-gray-500 text-sm">
            More lessons coming soon!
          </div>
        </div>
      </div>
    </div>
  )
}
