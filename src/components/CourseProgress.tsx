'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

interface CourseProgressProps {
  courseId: string
  courseName: string
  curriculumSlug: string
  courseSlug: string
}

interface LessonWithProgress {
  id: string
  title: string
  slug: string
  display_order: number
  duration_minutes: number
  status?: 'not_started' | 'in_progress' | 'completed'
  time_spent_minutes?: number
}

export default function CourseProgress({ courseId, courseName, curriculumSlug, courseSlug }: CourseProgressProps) {
  const [lessons, setLessons] = useState<LessonWithProgress[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    notStarted: 0,
    percentComplete: 0
  })

  useEffect(() => {
    loadProgress()
  }, [courseId])

  const loadProgress = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Fetch all lessons for this course
    const { data: lessonsData, error: lessonsError } = await supabase
      .from('lessons')
      .select('id, title, slug, display_order, duration_minutes')
      .eq('course_id', courseId)
      .order('display_order', { ascending: true })

    if (lessonsError || !lessonsData) {
      setLoading(false)
      return
    }

    if (!user) {
      // No user logged in, show all as not started
      setLessons(lessonsData.map(l => ({ ...l, status: 'not_started' as const })))
      setStats({
        total: lessonsData.length,
        completed: 0,
        inProgress: 0,
        notStarted: lessonsData.length,
        percentComplete: 0
      })
      setLoading(false)
      return
    }

    // Fetch progress for all lessons
    const { data: progressData } = await supabase
      .from('lesson_progress')
      .select('lesson_id, status, time_spent_minutes')
      .eq('user_id', user.id)
      .in('lesson_id', lessonsData.map(l => l.id))

    // Merge progress with lessons
    const lessonsWithProgress = lessonsData.map(lesson => {
      const progress = progressData?.find(p => p.lesson_id === lesson.id)
      return {
        ...lesson,
        status: (progress?.status || 'not_started') as 'not_started' | 'in_progress' | 'completed',
        time_spent_minutes: progress?.time_spent_minutes || 0
      }
    })

    // Calculate stats
    const completed = lessonsWithProgress.filter(l => l.status === 'completed').length
    const inProgress = lessonsWithProgress.filter(l => l.status === 'in_progress').length
    const notStarted = lessonsWithProgress.filter(l => l.status === 'not_started').length

    setLessons(lessonsWithProgress)
    setStats({
      total: lessonsData.length,
      completed,
      inProgress,
      notStarted,
      percentComplete: Math.round((completed / lessonsData.length) * 100)
    })
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <span>📊</span> Your Progress
        </h2>
        <p className="text-gray-600">
          {stats.completed} of {stats.total} lessons completed
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span className="font-medium">{stats.percentComplete}% Complete</span>
          <span>{stats.completed}/{stats.total} lessons</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-gradient-to-r from-purple-600 to-purple-700 h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
            style={{ width: `${stats.percentComplete}%` }}
          >
            {stats.percentComplete > 10 && (
              <span className="text-white text-xs font-bold">
                {stats.percentComplete}%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-green-600">{stats.completed}</div>
          <div className="text-sm text-green-800 mt-1">Completed</div>
        </div>
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-yellow-600">{stats.inProgress}</div>
          <div className="text-sm text-yellow-800 mt-1">In Progress</div>
        </div>
        <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-gray-600">{stats.notStarted}</div>
          <div className="text-sm text-gray-800 mt-1">Not Started</div>
        </div>
      </div>

      {/* Lesson List */}
      <div>
        <h3 className="font-bold text-gray-900 mb-4">Lessons</h3>
        <div className="space-y-3">
          {lessons.map((lesson, index) => (
            <Link
              key={lesson.id}
              href={`/learn/${curriculumSlug}/${courseSlug}/${lesson.slug}`}
              className="block border-2 rounded-lg p-4 hover:shadow-md transition-all hover:border-purple-300"
            >
              <div className="flex items-center gap-4">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  lesson.status === 'completed' ? 'bg-green-500 text-white' :
                  lesson.status === 'in_progress' ? 'bg-yellow-500 text-white' :
                  'bg-gray-200 text-gray-600'
                }`}>
                  {lesson.status === 'completed' ? '✓' : index + 1}
                </div>
                
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{lesson.title}</div>
                  <div className="text-sm text-gray-600 flex items-center gap-4 mt-1">
                    <span>⏱️ {lesson.duration_minutes} min</span>
                    {(lesson.time_spent_minutes || 0) > 0 && (
                      <span className="text-purple-600">
                        • Spent {lesson.time_spent_minutes} min
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex-shrink-0">
                  {lesson.status === 'completed' ? (
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Completed
                    </span>
                  ) : lesson.status === 'in_progress' ? (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                      In Progress
                    </span>
                  ) : (
                    <span className="text-gray-400 text-sm">→</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Completion Message */}
      {stats.percentComplete === 100 && (
        <div className="mt-6 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg p-6 text-center">
          <div className="text-4xl mb-3">🎉</div>
          <h3 className="text-2xl font-bold mb-2">Course Complete!</h3>
          <p className="mb-4">
            Congratulations on completing {courseName}! You're making amazing progress.
          </p>
          <Link
            href="/courses"
            className="inline-block bg-white text-purple-600 px-6 py-3 rounded-md hover:bg-gray-100 font-medium"
          >
            Explore More Courses
          </Link>
        </div>
      )}
    </div>
  )
}
