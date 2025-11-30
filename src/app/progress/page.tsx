'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  UserAchievement,
  Achievement,
  LearningStreak,
  ProgressStats,
  AchievementProgress,
  calculateAchievementProgress,
  RARITY_COLORS
} from '@/types/profile'

export default function ProgressPage() {
  const router = useRouter()
  const supabase = createClient()
  
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<ProgressStats>({
    total_lessons: 0,
    completed_lessons: 0,
    in_progress_lessons: 0,
    total_time_spent: 0,
    quizzes_taken: 0,
    average_quiz_score: 0,
    courses_completed: 0,
    current_streak: 0,
    longest_streak: 0,
    achievements_earned: 0,
    profile_completeness: 0
  })
  const [earnedAchievements, setEarnedAchievements] = useState<UserAchievement[]>([])
  const [achievementProgress, setAchievementProgress] = useState<AchievementProgress[]>([])
  const [streak, setStreak] = useState<LearningStreak | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'streak'>('overview')

  useEffect(() => {
    loadProgressData()
  }, [])

  const loadProgressData = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      router.push('/auth/login')
      return
    }

    // Fetch profile
    const { data: profileData } = await supabase
      .from('profiles')
      .select('profile_completeness')
      .eq('id', user.id)
      .single()

    // Fetch lesson progress
    const { data: progressData } = await supabase
      .from('lesson_progress')
      .select('status, time_spent_minutes, lesson_id')
      .eq('user_id', user.id)

    // Fetch quiz attempts
    const { data: quizData } = await supabase
      .from('quiz_attempts')
      .select('percentage')
      .eq('user_id', user.id)

    // Fetch courses with all lessons completed
    const { data: coursesData } = await supabase
      .from('courses')
      .select(`
        id,
        lessons!inner(id)
      `)

    // Count completed courses
    let coursesCompleted = 0
    if (coursesData && progressData) {
      const completedLessonIds = new Set(
        progressData.filter(p => p.status === 'completed').map(p => p.lesson_id)
      )
      coursesCompleted = coursesData.filter(course => 
        course.lessons.every((lesson: any) => completedLessonIds.has(lesson.id))
      ).length
    }

    // Fetch streak data
    const { data: streakData } = await supabase
      .from('learning_streaks')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (streakData) {
      setStreak(streakData)
    }

    // Fetch earned achievements
    const { data: userAchievements } = await supabase
      .from('user_achievements')
      .select(`
        *,
        achievement:achievements(*)
      `)
      .eq('user_id', user.id)
      .order('earned_at', { ascending: false })

    if (userAchievements) {
      setEarnedAchievements(userAchievements as any)
    }

    // Fetch all achievements
    const { data: allAchievements } = await supabase
      .from('achievements')
      .select('*')
      .order('display_order')

    // Calculate stats
    const completed = progressData?.filter(p => p.status === 'completed').length || 0
    const inProgress = progressData?.filter(p => p.status === 'in_progress').length || 0
    const totalTime = progressData?.reduce((sum, p) => sum + (p.time_spent_minutes || 0), 0) || 0
    const quizCount = quizData?.length || 0
    const avgScore = quizData && quizData.length > 0
      ? Math.round(quizData.reduce((sum, q) => sum + q.percentage, 0) / quizData.length)
      : 0

    const currentStats: ProgressStats = {
      total_lessons: progressData?.length || 0,
      completed_lessons: completed,
      in_progress_lessons: inProgress,
      total_time_spent: totalTime,
      quizzes_taken: quizCount,
      average_quiz_score: avgScore,
      courses_completed: coursesCompleted,
      current_streak: streakData?.current_streak || 0,
      longest_streak: streakData?.longest_streak || 0,
      achievements_earned: userAchievements?.length || 0,
      profile_completeness: profileData?.profile_completeness || 0
    }

    setStats(currentStats)

    // Calculate progress for all achievements
    if (allAchievements) {
      const earnedCodes = new Set(userAchievements?.map(ua => (ua.achievement as any)?.code))
      const progress = allAchievements.map(achievement => {
        const prog = calculateAchievementProgress(achievement, currentStats)
        return {
          ...prog,
          is_earned: earnedCodes.has(achievement.code),
          earned_at: userAchievements?.find(
            ua => (ua.achievement as any)?.code === achievement.code
          )?.earned_at
        }
      })
      setAchievementProgress(progress)
    }

    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-8 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Progress</h1>
          <p className="text-gray-600">Track your learning journey and achievements</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-6 p-2">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'overview'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-purple-50'
              }`}
            >
              📊 Overview
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'achievements'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-purple-50'
              }`}
            >
              🏆 Achievements
            </button>
            <button
              onClick={() => setActiveTab('streak')}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'streak'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-purple-50'
              }`}
            >
              🔥 Streak
            </button>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
                <div className="text-3xl font-bold text-purple-600">{stats.completed_lessons}</div>
                <div className="text-sm text-gray-600 mt-1">Lessons Completed</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                <div className="text-3xl font-bold text-blue-600">{stats.courses_completed}</div>
                <div className="text-sm text-gray-600 mt-1">Courses Completed</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                <div className="text-3xl font-bold text-green-600">{stats.current_streak}</div>
                <div className="text-sm text-gray-600 mt-1">Day Streak</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
                <div className="text-3xl font-bold text-yellow-600">{stats.achievements_earned}</div>
                <div className="text-sm text-gray-600 mt-1">Achievements</div>
              </div>
            </div>

            {/* Detailed Stats */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Learning Stats */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">📚 Learning Stats</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Lessons Started</span>
                    <span className="font-bold text-gray-900">{stats.total_lessons}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">In Progress</span>
                    <span className="font-bold text-gray-900">{stats.in_progress_lessons}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Time Invested</span>
                    <span className="font-bold text-gray-900">
                      {Math.floor(stats.total_time_spent / 60)}h {stats.total_time_spent % 60}m
                    </span>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Completion Rate</span>
                      <span className="font-bold text-purple-600">
                        {stats.total_lessons > 0 
                          ? Math.round((stats.completed_lessons / stats.total_lessons) * 100)
                          : 0}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full transition-all"
                        style={{
                          width: `${stats.total_lessons > 0 
                            ? (stats.completed_lessons / stats.total_lessons) * 100 
                            : 0}%`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quiz Stats */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">✅ Quiz Performance</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Quizzes Taken</span>
                    <span className="font-bold text-gray-900">{stats.quizzes_taken}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Average Score</span>
                    <span className={`font-bold ${
                      stats.average_quiz_score >= 80 ? 'text-green-600' :
                      stats.average_quiz_score >= 60 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {stats.average_quiz_score}%
                    </span>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                      <div className="text-4xl mb-2">
                        {stats.average_quiz_score >= 90 ? '🌟' :
                         stats.average_quiz_score >= 80 ? '⭐' :
                         stats.average_quiz_score >= 70 ? '✨' : '📝'}
                      </div>
                      <div className="text-sm font-medium text-gray-700">
                        {stats.average_quiz_score >= 90 ? 'Outstanding!' :
                         stats.average_quiz_score >= 80 ? 'Great work!' :
                         stats.average_quiz_score >= 70 ? 'Good effort!' :
                         stats.quizzes_taken > 0 ? 'Keep practicing!' : 'Take your first quiz!'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Achievements */}
            {earnedAchievements.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">🏆 Recent Achievements</h2>
                  <button
                    onClick={() => setActiveTab('achievements')}
                    className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                  >
                    View All →
                  </button>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {earnedAchievements.slice(0, 3).map(ua => {
                    const achievement = ua.achievement as Achievement
                    return (
                      <div
                        key={ua.id}
                        className={`border-2 rounded-lg p-4 ${RARITY_COLORS[achievement.rarity]}`}
                      >
                        <div className="text-4xl mb-2 text-center">{achievement.icon}</div>
                        <div className="font-bold text-center mb-1">{achievement.title}</div>
                        <div className="text-xs text-center opacity-75">{achievement.description}</div>
                        <div className="text-xs text-center mt-2 opacity-60">
                          Earned {new Date(ua.earned_at).toLocaleDateString()}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="space-y-6">
            {/* Stats Summary */}
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-4xl font-bold">{stats.achievements_earned}</div>
                  <div className="text-yellow-100 mt-1">Achievements Unlocked</div>
                </div>
                <div className="text-6xl">🏆</div>
              </div>
            </div>

            {/* Achievement Categories */}
            {['learning', 'quiz', 'streak', 'milestone'].map(category => {
              const categoryAchievements = achievementProgress.filter(
                ap => ap.achievement.category === category
              )
              
              if (categoryAchievements.length === 0) return null

              const categoryIcons: Record<string, string> = {
                learning: '📚',
                quiz: '✅',
                streak: '🔥',
                milestone: '⭐'
              }

              const categoryTitles: Record<string, string> = {
                learning: 'Learning Achievements',
                quiz: 'Quiz Achievements',
                streak: 'Streak Achievements',
                milestone: 'Milestone Achievements'
              }

              return (
                <div key={category} className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span>{categoryIcons[category]}</span>
                    {categoryTitles[category]}
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryAchievements.map(ap => (
                      <div
                        key={ap.achievement.id}
                        className={`border-2 rounded-lg p-4 transition-all ${
                          ap.is_earned
                            ? RARITY_COLORS[ap.achievement.rarity]
                            : 'border-gray-300 bg-gray-50 opacity-60'
                        }`}
                      >
                        <div className={`text-4xl mb-2 text-center ${!ap.is_earned && 'grayscale'}`}>
                          {ap.achievement.icon}
                        </div>
                        <div className="font-bold text-center mb-1">{ap.achievement.title}</div>
                        <div className="text-xs text-center mb-3 opacity-75">
                          {ap.achievement.description}
                        </div>
                        
                        {ap.is_earned ? (
                          <div className="text-xs text-center font-medium">
                            ✓ Unlocked {ap.earned_at && new Date(ap.earned_at).toLocaleDateString()}
                          </div>
                        ) : (
                          <div>
                            <div className="text-xs text-center mb-2 text-gray-600">
                              {ap.current_progress} / {ap.required_progress}
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-purple-600 h-2 rounded-full transition-all"
                                style={{ width: `${ap.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Streak Tab */}
        {activeTab === 'streak' && (
          <div className="space-y-6">
            {/* Current Streak */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl shadow-lg p-8">
              <div className="text-center">
                <div className="text-7xl mb-4">🔥</div>
                <div className="text-5xl font-bold mb-2">{stats.current_streak}</div>
                <div className="text-xl text-orange-100 mb-6">Day Streak</div>
                <div className="text-sm text-orange-100">
                  {stats.current_streak === 0 
                    ? 'Start your learning streak today!'
                    : stats.current_streak === 1
                    ? 'Great start! Come back tomorrow to continue!'
                    : `Keep it up! You're on fire! 🎉`}
                </div>
              </div>
            </div>

            {/* Streak Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-3xl mb-2">💪</div>
                <div className="text-3xl font-bold text-gray-900">{stats.longest_streak}</div>
                <div className="text-sm text-gray-600 mt-1">Longest Streak</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-3xl mb-2">📅</div>
                <div className="text-3xl font-bold text-gray-900">{streak?.total_active_days || 0}</div>
                <div className="text-sm text-gray-600 mt-1">Total Active Days</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-3xl mb-2">⏰</div>
                <div className="text-3xl font-bold text-gray-900">
                  {streak?.last_activity_date 
                    ? new Date(streak.last_activity_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                    : 'N/A'}
                </div>
                <div className="text-sm text-gray-600 mt-1">Last Active</div>
              </div>
            </div>

            {/* Streak Milestones */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">🎯 Streak Milestones</h2>
              <div className="space-y-4">
                {[
                  { days: 3, title: '3-Day Streak', icon: '🔥', unlocked: stats.longest_streak >= 3 },
                  { days: 7, title: 'Week Warrior', icon: '💪', unlocked: stats.longest_streak >= 7 },
                  { days: 14, title: 'Two-Week Champion', icon: '🏆', unlocked: stats.longest_streak >= 14 },
                  { days: 30, title: 'Monthly Master', icon: '👑', unlocked: stats.longest_streak >= 30 },
                  { days: 100, title: 'Dedication Legend', icon: '🦸‍♀️', unlocked: stats.longest_streak >= 100 }
                ].map(milestone => (
                  <div
                    key={milestone.days}
                    className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                      milestone.unlocked
                        ? 'bg-green-50 border-green-300'
                        : 'bg-gray-50 border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`text-3xl ${!milestone.unlocked && 'grayscale opacity-50'}`}>
                        {milestone.icon}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{milestone.title}</div>
                        <div className="text-sm text-gray-600">{milestone.days} day streak</div>
                      </div>
                    </div>
                    {milestone.unlocked ? (
                      <div className="text-green-600 font-bold">✓ Unlocked</div>
                    ) : (
                      <div className="text-gray-500 text-sm">
                        {milestone.days - stats.longest_streak} more days
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
              <h3 className="font-bold text-blue-900 mb-2">💡 Streak Tips</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Complete at least one lesson or quiz each day to maintain your streak</li>
                <li>• Set a daily reminder to help you stay consistent</li>
                <li>• Even 10-15 minutes of learning counts!</li>
                <li>• Streaks reset at midnight in your timezone</li>
              </ul>
            </div>
          </div>
        )}

        {/* Back to Dashboard */}
        <div className="text-center mt-8">
          <Link
            href="/dashboard"
            className="inline-block text-purple-600 hover:text-purple-700 font-medium"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
