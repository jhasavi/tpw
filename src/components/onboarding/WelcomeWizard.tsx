'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'

interface WizardStep {
  id: string
  title: string
  description: string
}

const WIZARD_STEPS: WizardStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to The Purple Wings! 👋',
    description: "Let's take a moment to personalize your learning journey."
  },
  {
    id: 'assessment',
    title: 'Quick Skill Check 📊',
    description: 'Help us understand your current financial knowledge level.'
  },
  {
    id: 'goals',
    title: 'Your Learning Goals 🎯',
    description: 'What do you want to achieve with financial literacy?'
  },
  {
    id: 'recommendations',
    title: 'Personalized Courses 📚',
    description: 'Based on your answers, here are our recommendations.'
  },
  {
    id: 'complete',
    title: 'All Set! 🎉',
    description: "You're ready to start your learning journey!"
  }
]

interface WelcomeWizardProps {
  user: User
  onComplete?: () => void
}

export default function WelcomeWizard({ user, onComplete }: WelcomeWizardProps) {
  const router = useRouter()
  const supabase = createClient()
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [skillLevel, setSkillLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner')
  const [topics, setTopics] = useState<string[]>([])
  const [goals, setGoals] = useState<string[]>([])
  const [timeCommitment, setTimeCommitment] = useState<'light' | 'moderate' | 'intensive'>('moderate')
  const [recommendations, setRecommendations] = useState<any[]>([])

  const availableTopics = [
    'Budgeting & Money Management',
    'Saving & Emergency Funds',
    'Investing & Wealth Building',
    'Debt Management',
    'Retirement Planning',
    'Insurance & Protection',
    'Taxes & Tax Planning',
    'Credit & Credit Scores'
  ]

  const availableGoals = [
    'Build an emergency fund',
    'Pay off debt',
    'Start investing',
    'Save for retirement',
    'Buy a home',
    'Understand my finances better',
    'Improve credit score',
    'Learn to budget effectively'
  ]

  useEffect(() => {
    checkOnboardingStatus()
  }, [])

  const checkOnboardingStatus = async () => {
    const { data } = await supabase
      .from('onboarding_progress')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (data?.is_complete) {
      onComplete?.()
    } else if (data?.current_step) {
      setCurrentStep(data.current_step)
    }
  }

  const handleNext = async () => {
    if (currentStep === 1) {
      // Save assessment
      await saveAssessment()
    }

    if (currentStep === 3) {
      // Generate recommendations
      await generateRecommendations()
    }

    if (currentStep === WIZARD_STEPS.length - 1) {
      // Complete onboarding
      await completeOnboarding()
      return
    }

    const nextStep = currentStep + 1
    setCurrentStep(nextStep)
    await updateProgress(nextStep)
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = async () => {
    await completeOnboarding()
  }

  const saveAssessment = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase
        .from('skill_assessments')
        .insert({
          user_id: user.id,
          skill_level: skillLevel,
          topics_interested: topics,
          learning_goals: goals,
          time_commitment: timeCommitment,
          assessment_score: 0
        })

      if (error) throw error
    } catch (error) {
      console.error('Error saving assessment:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const generateRecommendations = async () => {
    setIsLoading(true)
    try {
      // Call the RPC function to generate recommendations
      const { error: rpcError } = await supabase
        .rpc('generate_course_recommendations', { p_user_id: user.id })

      if (rpcError) throw rpcError

      // Fetch the recommendations
      const { data, error } = await supabase
        .from('course_recommendations')
        .select(`
          *,
          courses (
            id,
            title,
            description,
            slug
          )
        `)
        .eq('user_id', user.id)
        .order('match_score', { ascending: false })
        .limit(6)

      if (error) throw error
      setRecommendations(data || [])
    } catch (error) {
      console.error('Error generating recommendations:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateProgress = async (step: number) => {
    const completedSteps = WIZARD_STEPS.slice(0, step).map(s => s.id)
    
    await supabase
      .from('onboarding_progress')
      .upsert({
        user_id: user.id,
        current_step: step,
        completed_steps: completedSteps
      })
  }

  const completeOnboarding = async () => {
    setIsLoading(true)
    try {
      await supabase
        .from('onboarding_progress')
        .upsert({
          user_id: user.id,
          current_step: WIZARD_STEPS.length - 1,
          completed_steps: WIZARD_STEPS.map(s => s.id),
          is_complete: true,
          completed_at: new Date().toISOString()
        })

      onComplete?.()
      router.push('/dashboard')
    } catch (error) {
      console.error('Error completing onboarding:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleTopic = (topic: string) => {
    setTopics(prev =>
      prev.includes(topic)
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    )
  }

  const toggleGoal = (goal: string) => {
    setGoals(prev =>
      prev.includes(goal)
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    )
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Welcome
        return (
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">👋</div>
            <h2 className="text-3xl font-bold text-gray-900">Welcome to The Purple Wings!</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're excited to help you on your financial literacy journey. Let's take just a few minutes 
              to personalize your experience and recommend the best courses for your goals.
            </p>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 max-w-2xl mx-auto">
              <p className="text-sm text-purple-900">
                ⏱️ This will take about 2-3 minutes
              </p>
            </div>
          </div>
        )

      case 1: // Assessment
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Financial Knowledge Level</h3>
              <div className="grid gap-4">
                {[
                  { value: 'beginner', label: 'Beginner', desc: 'Just starting my financial journey' },
                  { value: 'intermediate', label: 'Intermediate', desc: 'Have some financial knowledge' },
                  { value: 'advanced', label: 'Advanced', desc: 'Experienced with financial concepts' }
                ].map(level => (
                  <button
                    key={level.value}
                    onClick={() => setSkillLevel(level.value as any)}
                    className={`p-6 rounded-lg border-2 text-left transition-all ${
                      skillLevel === level.value
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="font-semibold text-gray-900">{level.label}</div>
                    <div className="text-sm text-gray-600">{level.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Time Commitment</h3>
              <div className="grid gap-4">
                {[
                  { value: 'light', label: '1-2 hours/week', desc: 'Learning at my own pace' },
                  { value: 'moderate', label: '3-5 hours/week', desc: 'Regular steady progress' },
                  { value: 'intensive', label: '6+ hours/week', desc: 'Fast-track learning' }
                ].map(time => (
                  <button
                    key={time.value}
                    onClick={() => setTimeCommitment(time.value as any)}
                    className={`p-6 rounded-lg border-2 text-left transition-all ${
                      timeCommitment === time.value
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="font-semibold text-gray-900">{time.label}</div>
                    <div className="text-sm text-gray-600">{time.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )

      case 2: // Goals
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Topics You Want to Learn</h3>
              <p className="text-gray-600 mb-6">Select all that interest you</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {availableTopics.map(topic => (
                  <button
                    key={topic}
                    onClick={() => toggleTopic(topic)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      topics.includes(topic)
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        topics.includes(topic)
                          ? 'border-purple-600 bg-purple-600'
                          : 'border-gray-300'
                      }`}>
                        {topics.includes(topic) && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{topic}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Financial Goals</h3>
              <p className="text-gray-600 mb-6">What do you want to achieve?</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {availableGoals.map(goal => (
                  <button
                    key={goal}
                    onClick={() => toggleGoal(goal)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      goals.includes(goal)
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        goals.includes(goal)
                          ? 'border-purple-600 bg-purple-600'
                          : 'border-gray-300'
                      }`}>
                        {goals.includes(goal) && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{goal}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )

      case 3: // Recommendations
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Personalized Learning Path</h3>
              <p className="text-gray-600">Based on your assessment, we recommend these courses:</p>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Generating your recommendations...</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {recommendations.map((rec, index) => (
                  <div
                    key={rec.id}
                    className="border-2 border-gray-200 rounded-lg p-6 hover:border-purple-300 transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            rec.priority === 'high'
                              ? 'bg-purple-100 text-purple-800'
                              : rec.priority === 'medium'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {rec.priority === 'high' ? '⭐ Top Pick' : rec.priority === 'medium' ? '👍 Recommended' : 'Suggested'}
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 mb-2">
                          {rec.courses?.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">{rec.courses?.description}</p>
                        <p className="text-sm text-purple-700">
                          <span className="font-medium">Why:</span> {rec.reason}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )

      case 4: // Complete
        return (
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-gray-900">You're All Set!</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your personalized learning journey is ready. We've saved your preferences and 
              recommended the best courses for your goals.
            </p>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-8 max-w-2xl mx-auto">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-purple-600">{recommendations.length}</div>
                  <div className="text-sm text-gray-600 mt-1">Courses Ready</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600">{topics.length}</div>
                  <div className="text-sm text-gray-600 mt-1">Topics Selected</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600">{goals.length}</div>
                  <div className="text-sm text-gray-600 mt-1">Goals Set</div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Progress Bar */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-700">
              Step {currentStep + 1} of {WIZARD_STEPS.length}
            </h3>
            {currentStep > 0 && currentStep < WIZARD_STEPS.length - 1 && (
              <button
                onClick={handleSkip}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Skip for now
              </button>
            )}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / WIZARD_STEPS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-8">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="px-6 py-3 text-gray-700 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Back
            </button>
            <button
              onClick={handleNext}
              disabled={isLoading}
              className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                'Loading...'
              ) : currentStep === WIZARD_STEPS.length - 1 ? (
                'Start Learning! →'
              ) : (
                'Continue →'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
