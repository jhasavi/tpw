'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import ProgressDashboard from './ProgressDashboard'

interface DashboardStats {
  totalLessons: number
  completedLessons: number
  inProgressLessons: number
  totalTimeSpent: number
  quizzesTaken: number
  averageQuizScore: number
}

interface ContinueLearning {
  lessonId: string
  lessonTitle: string
  lessonSlug: string
  courseTitle: string
  courseSlug: string
  curriculumSlug: string
  lastAccessed: string
  progress: number
}

export default function LearningDashboard() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState('overview')
  const [stats, setStats] = useState<DashboardStats>({
    totalLessons: 0,
    completedLessons: 0,
    inProgressLessons: 0,
    totalTimeSpent: 0,
    quizzesTaken: 0,
    averageQuizScore: 0
  })
  const [continueLesson, setContinueLesson] = useState<ContinueLearning | null>(null)
  const [loading, setLoading] = useState(true)
  const [recentCourses, setRecentCourses] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    loadDashboardData()
    const tab = searchParams.get('tab')
    if (tab) setActiveTab(tab)
  }, [searchParams])

  const loadDashboardData = async () => {
    const supabase = createClient()
    const { data: { user: currentUser } } = await supabase.auth.getUser()

    if (!currentUser) {
      setLoading(false)
      return
    }

    setUser(currentUser)

    // Fetch lesson progress stats
    const { data: progressData } = await supabase
      .from('lesson_progress')
      .select('status, time_spent_minutes, updated_at, lesson_id')
      .eq('user_id', currentUser.id)

    // Fetch quiz attempts stats
    const { data: quizData } = await supabase
      .from('quiz_attempts')
      .select('score, total_questions, percentage')
      .eq('user_id', currentUser.id)

    // Calculate stats
    const completed = progressData?.filter(p => p.status === 'completed').length || 0
    const inProgress = progressData?.filter(p => p.status === 'in_progress').length || 0
    const totalTime = progressData?.reduce((sum, p) => sum + (p.time_spent_minutes || 0), 0) || 0
    
    const quizCount = quizData?.length || 0
    const avgScore = quizData && quizData.length > 0
      ? Math.round(quizData.reduce((sum, q) => sum + q.percentage, 0) / quizData.length)
      : 0

    setStats({
      totalLessons: progressData?.length || 0,
      completedLessons: completed,
      inProgressLessons: inProgress,
      totalTimeSpent: totalTime,
      quizzesTaken: quizCount,
      averageQuizScore: avgScore
    })

    // Find most recently accessed in-progress lesson
    const mostRecent = progressData
      ?.filter(p => p.status === 'in_progress')
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())[0]

    if (mostRecent) {
      // Fetch full lesson details
      const { data: lessonData } = await supabase
        .from('lessons')
        .select(`
          id,
          title,
          slug,
          courses (
            id,
            title,
            slug,
            curricula (
              slug
            )
          )
        `)
        .eq('id', mostRecent.lesson_id)
        .single()

      if (lessonData && lessonData.courses) {
        const course = lessonData.courses as any
        setContinueLesson({
          lessonId: lessonData.id,
          lessonTitle: lessonData.title,
          lessonSlug: lessonData.slug,
          courseTitle: course.title,
          courseSlug: course.slug,
          curriculumSlug: course.curricula?.slug || 'womens-financial-literacy',
          lastAccessed: mostRecent.updated_at,
          progress: mostRecent.time_spent_minutes || 0
        })
      }
    }

    // Fetch recent courses
    const { data: coursesData } = await supabase
      .from('courses')
      .select(`
        id,
        title,
        slug,
        description,
        curricula (
          slug
        )
      `)
      .eq('curriculum_id', (await supabase
        .from('curricula')
        .select('id')
        .eq('slug', 'womens-financial-literacy')
        .single()).data?.id)
      .limit(3)

    setRecentCourses(coursesData || [])
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-8 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome & Stats */}
      <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
        <p className="text-purple-100 mb-6">Here's your learning progress at a glance</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <div className="text-3xl font-bold">{stats.completedLessons}</div>
            <div className="text-sm text-purple-100 mt-1">Lessons Completed</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <div className="text-3xl font-bold">{stats.inProgressLessons}</div>
            <div className="text-sm text-purple-100 mt-1">In Progress</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <div className="text-3xl font-bold">{Math.floor(stats.totalTimeSpent / 60)}h</div>
            <div className="text-sm text-purple-100 mt-1">Time Invested</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <div className="text-3xl font-bold">{stats.averageQuizScore}%</div>
            <div className="text-sm text-purple-100 mt-1">Avg Quiz Score</div>
          </div>
        </div>
      </div>

      {/* Continue Learning */}
      {continueLesson && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>📖</span> Continue Learning
          </h2>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-lg p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="text-sm text-purple-600 font-medium mb-1">
                  {continueLesson.courseTitle}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {continueLesson.lessonTitle}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Last accessed: {new Date(continueLesson.lastAccessed).toLocaleDateString()}
                </p>
                <Link
                  href={`/learn/${continueLesson.curriculumSlug}/${continueLesson.courseSlug}/${continueLesson.lessonSlug}`}
                  className="inline-block bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 font-medium shadow-md hover:shadow-lg transition-all"
                >
                  Continue Lesson →
                </Link>
              </div>
              <div className="text-6xl">📚</div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Access to Courses */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>🎓</span> Your Courses
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {recentCourses.map((course) => (
            <Link
              key={course.id}
              href={`/learn/${(course.curricula as any)?.slug}/${course.slug}`}
              className="border-2 border-gray-200 rounded-lg p-6 hover:border-purple-300 hover:shadow-md transition-all"
            >
              <h3 className="font-bold text-gray-900 mb-2">{course.title}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>
              <span className="text-purple-600 text-sm font-medium">
                View Course →
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/courses"
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            View All Courses →
          </Link>
        </div>
      </div>

      {/* Achievements */}
      {stats.completedLessons > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span>🏆</span> Achievements
            </h2>
            <Link
              href="/progress?tab=achievements"
              className="text-purple-600 hover:text-purple-700 font-medium text-sm"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.completedLessons >= 1 && (
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 text-center">
                <div className="text-4xl mb-2">🎯</div>
                <div className="font-bold text-gray-900">First Step</div>
                <div className="text-xs text-gray-600 mt-1">Completed 1 lesson</div>
              </div>
            )}
            {stats.completedLessons >= 5 && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 text-center">
                <div className="text-4xl mb-2">📚</div>
                <div className="font-bold text-gray-900">Knowledge Builder</div>
                <div className="text-xs text-gray-600 mt-1">Completed 5 lessons</div>
              </div>
            )}
            {stats.quizzesTaken >= 3 && (
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 text-center">
                <div className="text-4xl mb-2">✅</div>
                <div className="font-bold text-gray-900">Quiz Master</div>
                <div className="text-xs text-gray-600 mt-1">Completed 3 quizzes</div>
              </div>
            )}
            {stats.averageQuizScore >= 80 && (
              <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4 text-center">
                <div className="text-4xl mb-2">⭐</div>
                <div className="font-bold text-gray-900">High Achiever</div>
                <div className="text-xs text-gray-600 mt-1">80%+ avg score</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick Links */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>⚡</span> Quick Access
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            href="/profile"
            className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-lg p-6 hover:shadow-md transition-all"
          >
            <div className="text-3xl mb-2">👤</div>
            <div className="font-bold text-gray-900 mb-1">My Profile</div>
            <div className="text-sm text-gray-600">Update your information</div>
          </Link>
          <Link
            href="/bookmarks"
            className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-6 hover:shadow-md transition-all"
          >
            <div className="text-3xl mb-2">🔖</div>
            <div className="font-bold text-gray-900 mb-1">Bookmarks</div>
            <div className="text-sm text-gray-600">Saved courses & lessons</div>
          </Link>
          <Link
            href="/progress"
            className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-6 hover:shadow-md transition-all"
          >
            <div className="text-3xl mb-2">📊</div>
            <div className="font-bold text-gray-900 mb-1">Full Progress</div>
            <div className="text-sm text-gray-600">Detailed stats & achievements</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
