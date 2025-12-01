import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function CurriculumPage({ 
  params 
}: { 
  params: Promise<{ curriculum: string }>
}) {
  const { curriculum: slug } = await params
  const supabase = await createClient()
  
  // Get curriculum details
  const { data: curriculum, error: currError } = await supabase
    .from('curricula')
    .select('*')
    .eq('slug', slug)
    .single()

  if (currError || !curriculum) {
    notFound()
  }

  // Get all courses in this curriculum
  const { data: courses } = await supabase
    .from('courses')
    .select(`
      *,
      lessons:lessons(count)
    `)
    .eq('curriculum_id', curriculum.id)
    .order('display_order', { ascending: true })

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/courses" 
            className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 mb-4 inline-flex items-center"
          >
            ← Back to All Courses
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-4">
            {curriculum.title}
          </h1>
          {curriculum.description && (
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              {curriculum.description}
            </p>
          )}
          <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <span className="flex items-center gap-2">
              📚 {courses?.length || 0} Courses
            </span>
            <span className="flex items-center gap-2">
              📊 {curriculum.difficulty_level || 'All Levels'}
            </span>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses?.map((course: any) => (
            <Link
              key={course.id}
              href={`/learn/${slug}/${course.slug}`}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {course.title}
              </h3>
              {course.description && (
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {course.description}
                </p>
              )}
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>{course.lessons?.[0]?.count || 0} lessons</span>
                <span className="text-purple-600 dark:text-purple-400 font-medium">
                  Start →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {(!courses || courses.length === 0) && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No courses available yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
