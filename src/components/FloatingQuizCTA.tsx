'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function FloatingQuizCTA() {
  const [isVisible, setIsVisible] = useState(true)
  const [isMinimized, setIsMinimized] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    checkUser()
  }, [])

  if (!isVisible || !user) return null

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/50 hover:scale-110 transition-all duration-300 animate-bounce"
        aria-label="Open Quiz Challenge"
      >
        <span className="text-3xl">🎯</span>
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-in-right">
      <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700 text-white rounded-2xl shadow-2xl p-6 max-w-sm relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
        
        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors"
          aria-label="Dismiss"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Minimize button */}
        <button
          onClick={() => setIsMinimized(true)}
          className="absolute top-3 right-10 text-white/70 hover:text-white transition-colors"
          aria-label="Minimize"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-5xl animate-pulse">🎯</span>
            <div>
              <h3 className="text-xl font-bold">Test Your Knowledge!</h3>
              <p className="text-purple-200 text-sm">Take a quick quiz</p>
            </div>
          </div>

          <p className="text-purple-100 mb-5 text-sm leading-relaxed">
            🚀 Challenge yourself with our interactive quizzes and track your progress. 
            Earn points and badges as you learn!
          </p>

          <div className="flex gap-3">
            <Link
              href="/quiz"
              className="flex-1 bg-white text-purple-600 py-3 px-4 rounded-lg font-bold hover:bg-purple-50 transition-colors text-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Start Quiz →
            </Link>
            <Link
              href="/assessment"
              className="flex-1 bg-purple-500 text-white py-3 px-4 rounded-lg font-bold hover:bg-purple-600 transition-colors text-center"
            >
              Full Test
            </Link>
          </div>

          <p className="text-xs text-purple-200 mt-3 text-center">
            💡 Join hundreds taking quizzes daily!
          </p>
        </div>
      </div>
    </div>
  )
}
