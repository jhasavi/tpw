'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

interface GamificationStats {
  current_streak: number
  longest_streak: number
  total_points: number
  quizzes_completed: number
  badges_earned: number
  lessons_completed: number
  next_milestone: string
  next_milestone_progress: number
}

interface GamificationPanelProps {
  user: User
  className?: string
}

export default function GamificationPanel({ user, className = '' }: GamificationPanelProps) {
  const supabase = createClient()
  const [stats, setStats] = useState<GamificationStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadGamificationStats()
  }, [])

  const loadGamificationStats = async () => {
    try {
      // Fetch user stats
      const { data: progressData } = await supabase
        .from('lesson_progress')
        .select('status')
        .eq('user_id', user.id)
        .eq('status', 'completed')

      const { data: quizData } = await supabase
        .from('quiz_attempts')
        .select('id')
        .eq('user_id', user.id)

      const { data: streakData } = await supabase
        .from('profiles')
        .select('current_streak, longest_streak')
        .eq('id', user.id)
        .single()

      // Calculate points (10 per lesson, 25 per quiz, 5 per day streak)
      const lessonsCompleted = progressData?.length || 0
      const quizzesCompleted = quizData?.length || 0
      const streak = streakData?.current_streak || 0
      const totalPoints = (lessonsCompleted * 10) + (quizzesCompleted * 25) + (streak * 5)

      setStats({
        current_streak: streak,
        longest_streak: streakData?.longest_streak || 0,
        total_points: totalPoints,
        quizzes_completed: quizzesCompleted,
        badges_earned: Math.floor(totalPoints / 100),
        lessons_completed: lessonsCompleted,
        next_milestone: `${Math.ceil((totalPoints + 1) / 100) * 100} Points`,
        next_milestone_progress: totalPoints % 100,
      })
    } catch (error) {
      console.error('Error loading gamification stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className={`${className} bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 animate-pulse`}>
        <div className="h-40 bg-purple-200 rounded"></div>
      </div>
    )
  }

  if (!stats) return null

  return (
    <div className={`${className} bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl shadow-lg p-6 border-2 border-purple-200`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Your Progress</h3>
        <span className="text-4xl">🏆</span>
      </div>

      {/* Points Display */}
      <div className="bg-white rounded-lg p-4 mb-6">
        <div className="flex items-baseline justify-between">
          <span className="text-gray-600 font-medium">Total Points</span>
          <span className="text-3xl font-bold text-purple-600">{stats.total_points}</span>
        </div>
        <div className="mt-3 bg-gray-200 rounded-full h-2">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all"
            style={{ width: `${Math.min(stats.next_milestone_progress, 100)}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-2">Next milestone: {stats.next_milestone}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-4">
          <div className="text-center">
            <div className="text-3xl mb-1">🔥</div>
            <p className="text-gray-600 text-sm font-medium">Streak</p>
            <p className="text-2xl font-bold text-orange-600">{stats.current_streak}</p>
            <p className="text-xs text-gray-500">days</p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4">
          <div className="text-center">
            <div className="text-3xl mb-1">📚</div>
            <p className="text-gray-600 text-sm font-medium">Lessons</p>
            <p className="text-2xl font-bold text-blue-600">{stats.lessons_completed}</p>
            <p className="text-xs text-gray-500">completed</p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4">
          <div className="text-center">
            <div className="text-3xl mb-1">📝</div>
            <p className="text-gray-600 text-sm font-medium">Quizzes</p>
            <p className="text-2xl font-bold text-green-600">{stats.quizzes_completed}</p>
            <p className="text-xs text-gray-500">taken</p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4">
          <div className="text-center">
            <div className="text-3xl mb-1">⭐</div>
            <p className="text-gray-600 text-sm font-medium">Badges</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.badges_earned}</p>
            <p className="text-xs text-gray-500">earned</p>
          </div>
        </div>
      </div>

      {/* Achievement Message */}
      {stats.current_streak >= 7 && (
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <span className="font-bold">🎉 Amazing!</span> You have a {stats.current_streak}-day learning streak!
          </p>
        </div>
      )}
    </div>
  )
}
