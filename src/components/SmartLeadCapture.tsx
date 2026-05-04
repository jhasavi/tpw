'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

interface SmartLeadCaptureProps {
  trigger: 'quiz_completion' | 'personality_results' | 'course_recommendation' | 'progress_milestone'
  value?: string
  context?: any
  onComplete?: (data: any) => void
}

export function SmartLeadCapture({ trigger, value, context, onComplete }: SmartLeadCaptureProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    checkUserAndTrigger()
  }, [trigger, value])

  const checkUserAndTrigger = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)

    // Don't show if user is already logged in
    if (user) return

    // Show based on trigger conditions
    switch (trigger) {
      case 'quiz_completion':
        if (value === 'personality') {
          // Show after personality quiz completion
          setTimeout(() => setIsVisible(true), 1000)
        }
        break
      case 'personality_results':
        // Show when personality results are ready
        setIsVisible(true)
        break
      case 'course_recommendation':
        // Show when personalized courses are recommended
        setTimeout(() => setIsVisible(true), 500)
        break
      case 'progress_milestone':
        // Show at key progress milestones
        if (value === 'lesson_complete') {
          // Only show after 3+ lesson completions
          const completedLessons = parseInt(localStorage.getItem('completedLessons') || '0')
          if (completedLessons >= 3) {
            setIsVisible(true)
          }
        }
        break
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !firstName) return

    setIsSubmitting(true)
    try {
      // Capture lead with context
      const response = await fetch('/api/leads/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          firstName,
          trigger,
          context,
          value,
          source: 'smart-capture'
        })
      })

      if (response.ok) {
        // Store in localStorage for personalization
        localStorage.setItem('leadEmail', email)
        localStorage.setItem('leadFirstName', firstName)
        
        onComplete?.({ email, firstName, trigger, context })
        setIsVisible(false)
      }
    } catch (error) {
      console.error('Lead capture error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getCaptureContent = () => {
    switch (trigger) {
      case 'quiz_completion':
      case 'personality_results':
        return {
          title: 'Save Your Financial Personality!',
          subtitle: 'Get personalized course recommendations and learning resources',
          value: 'Your detailed personality analysis and custom learning path',
          icon: '🎯'
        }
      case 'course_recommendation':
        return {
          title: 'Get Your Learning Plan',
          subtitle: 'Receive personalized course recommendations based on your progress',
          value: 'Customized learning path and progress tracking',
          icon: '📚'
        }
      case 'progress_milestone':
        return {
          title: 'Track Your Progress',
          subtitle: 'Save your achievements and get milestone celebrations',
          value: 'Progress tracking and achievement badges',
          icon: '🏆'
        }
      default:
        return {
          title: 'Continue Your Journey',
          subtitle: 'Save your progress and get personalized recommendations',
          value: 'Personalized learning experience',
          icon: '✨'
        }
    }
  }

  const content = getCaptureContent()

  if (!isVisible || user) return null

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 left-6 z-50 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 animate-pulse"
        aria-label="Save your progress"
      >
        <span className="text-xl">{content.icon}</span>
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative">
        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Minimize button */}
        <button
          onClick={() => setIsMinimized(true)}
          className="absolute top-4 right-12 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Minimize"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div className="p-6">
          {/* Icon and Title */}
          <div className="text-center mb-6">
            <div className="text-4xl mb-3">{content.icon}</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{content.title}</h3>
            <p className="text-gray-600 text-sm">{content.subtitle}</p>
          </div>

          {/* Value Proposition */}
          <div className="bg-purple-50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">💎</span>
              <div>
                <p className="text-sm font-medium text-purple-900">You'll get:</p>
                <p className="text-xs text-purple-700">{content.value}</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !email || !firstName}
              className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : 'Save My Progress'}
            </button>
          </form>

          {/* Privacy Note */}
          <p className="text-xs text-gray-500 text-center mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  )
}
