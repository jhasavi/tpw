'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

interface ProminentQuizCardProps {
  lesson?: {
    id: string
    slug: string
    title: string
  }
  user?: User | null
  className?: string
  isDashboard?: boolean
}

export default function ProminentQuizCard({
  lesson,
  user,
  className = '',
  isDashboard = false,
}: ProminentQuizCardProps) {
  const supabase = createClient()
  const [quizTaken, setQuizTaken] = useState(false)
  const [totalQuizzes, setTotalQuizzes] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user && lesson) {
      loadQuizStatus()
    } else if (isDashboard && user) {
      loadTotalQuizzes()
    } else {
      setLoading(false)
    }
  }, [user, lesson])

  const loadQuizStatus = async () => {
    try {
      const { data: attempts } = await supabase
        .from('quiz_attempts')
        .select('id')
        .eq('user_id', user!.id)
        .eq('lesson_id', lesson!.id)
        .limit(1)

      setQuizTaken((attempts?.length || 0) > 0)
    } catch (error) {
      console.error('Error loading quiz status:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadTotalQuizzes = async () => {
    try {
      const { count } = await supabase
        .from('quiz_attempts')
        .select('id', { count: 'exact' })
        .eq('user_id', user!.id)

      setTotalQuizzes(count || 0)
    } catch (error) {
      console.error('Error loading quiz count:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className={`${className} bg-gray-100 rounded-xl p-6 animate-pulse h-40`}></div>
    )
  }

  if (isDashboard) {
    return (
      <Link href="/quiz">
        <div className={`${className} bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-xl shadow-xl p-8 cursor-pointer hover:shadow-2xl transform hover:scale-105 transition-all`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold">Challenge Yourself</h3>
            <span className="text-5xl animate-bounce">🎯</span>
          </div>
          <p className="text-indigo-100 mb-4">Test your knowledge with our interactive quizzes</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-indigo-200">Quizzes Completed</p>
              <p className="text-3xl font-bold">{totalQuizzes}</p>
            </div>
            <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
              Take Quiz →
            </button>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <div className={`${className} bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-xl shadow-xl p-8`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold">Test Your Knowledge</h3>
          <p className="text-indigo-100 mt-1">{lesson?.title || 'Challenge Yourself'}</p>
        </div>
        <span className="text-5xl">🎯</span>
      </div>

      <p className="text-indigo-100 mb-6">
        {quizTaken
          ? '📝 You already completed a quiz on this topic. Take it again to improve your score!'
          : '📝 Test your understanding of this lesson with our interactive quiz. Learn as you go!'}
      </p>

      <div className="flex gap-3">
        <Link
          href="/quiz"
          className="flex-1 bg-white text-purple-600 py-3 rounded-lg font-bold hover:bg-indigo-50 transition-colors text-center"
        >
          {quizTaken ? 'Retake Quiz' : 'Start Quiz'} →
        </Link>
        <Link
          href="/assessment"
          className="flex-1 bg-indigo-500 text-white py-3 rounded-lg font-bold hover:bg-indigo-600 transition-colors text-center"
        >
          Full Assessment
        </Link>
      </div>

      {quizTaken && (
        <p className="mt-4 text-xs text-indigo-200">
          💡 Tip: Taking quizzes regularly improves retention by up to 50%!
        </p>
      )}
    </div>
  )
}
