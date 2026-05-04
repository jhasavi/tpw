'use client'

import { useState, useEffect } from 'react'

interface ProfileQuestion {
  id: string
  question: string
  type: 'select' | 'text' | 'number'
  options?: string[]
  placeholder?: string
  priority: 'high' | 'medium' | 'low'
}

interface ProgressiveProfilingProps {
  email: string
  onProfileUpdate?: (data: any) => void
}

export function ProgressiveProfiling({ email, onProfileUpdate }: ProgressiveProfilingProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const questions: ProfileQuestion[] = [
    {
      id: 'age_range',
      question: 'What age range are you in?',
      type: 'select',
      options: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
      priority: 'high'
    },
    {
      id: 'financial_goals',
      question: 'What are your main financial goals right now?',
      type: 'select',
      options: ['Build emergency fund', 'Pay off debt', 'Save for retirement', 'Buy a home', 'Invest for growth', 'Other'],
      priority: 'high'
    },
    {
      id: 'experience_level',
      question: 'How would you rate your financial knowledge?',
      type: 'select',
      options: ['Beginner', 'Some knowledge', 'Intermediate', 'Advanced'],
      priority: 'medium'
    },
    {
      id: 'location',
      question: 'What state are you in?',
      type: 'text',
      placeholder: 'e.g., Massachusetts',
      priority: 'medium'
    },
    {
      id: 'profession',
      question: 'What\'s your current profession?',
      type: 'text',
      placeholder: 'e.g., Teacher, Engineer, Student',
      priority: 'low'
    }
  ]

  useEffect(() => {
    // Show after 5 minutes of browsing or after 3 page views
    const pageViews = parseInt(localStorage.getItem('pageViews') || '0')
    const lastShown = localStorage.getItem('profileLastShown')
    const now = Date.now()

    // Don't show if shown in last 24 hours
    if (lastShown && (now - parseInt(lastShown)) < 24 * 60 * 60 * 1000) {
      return
    }

    // Show after 3 page views or 5 minutes
    if (pageViews >= 3) {
      setIsVisible(true)
      localStorage.setItem('profileLastShown', now.toString())
    }
  }, [])

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/leads/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          profile: answers
        })
      })

      if (response.ok) {
        onProfileUpdate?.(answers)
        setIsVisible(false)
        localStorage.setItem('userProfile', JSON.stringify(answers))
      }
    } catch (error) {
      console.error('Profile update error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSkip = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setIsVisible(false)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      handleSubmit()
    }
  }

  const currentQ = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-40 bg-white rounded-xl shadow-lg p-4 max-w-sm">
      {/* Close button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Close"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">🔍</span>
          <h4 className="font-semibold text-gray-900">Help us personalize</h4>
        </div>
        <p className="text-xs text-gray-600">Answer a few questions for better recommendations</p>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-1">
          <div
            className="bg-purple-600 h-1 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">{currentQuestion + 1} of {questions.length}</p>
      </div>

      {/* Question */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-900 mb-2">{currentQ.question}</p>
        
        {currentQ.type === 'select' && currentQ.options && (
          <select
            value={answers[currentQ.id] || ''}
            onChange={(e) => handleAnswer(currentQ.id, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          >
            <option value="">Select an option</option>
            {currentQ.options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        )}

        {currentQ.type === 'text' && (
          <input
            type="text"
            value={answers[currentQ.id] || ''}
            onChange={(e) => handleAnswer(currentQ.id, e.target.value)}
            placeholder={currentQ.placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          />
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={handleSkip}
          className="flex-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          Skip
        </button>
        <button
          onClick={handleNext}
          disabled={!answers[currentQ.id] || isSubmitting}
          className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving...' : currentQuestion === questions.length - 1 ? 'Done' : 'Next'}
        </button>
      </div>
    </div>
  )
}
