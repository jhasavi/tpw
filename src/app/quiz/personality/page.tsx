'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Question {
  id: string
  question: string
  options: { value: string; label: string; traits: string[] }[]
}

interface AssessmentResult {
  personalityType: string
  confidence: number
  traits: string[]
  strengths: string[]
  learningStyle: string
}

export default function PersonalityQuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: string]: string }>({})
  const [isCompleted, setIsCompleted] = useState(false)
  const [result, setResult] = useState<AssessmentResult | null>(null)

  const questions: Question[] = [
    {
      id: 'risk_tolerance',
      question: 'When it comes to investing money, how do you typically feel?',
      options: [
        { value: 'very_conservative', label: 'I prefer to avoid any risk and keep money safe in savings accounts', traits: ['cautious', 'security_focused'] },
        { value: 'conservative', label: "I'm comfortable with minimal risk, like fixed deposits or bonds", traits: ['planner', 'methodical'] },
        { value: 'moderate', label: "I'm okay with some ups and downs for potentially higher returns", traits: ['balanced', 'practical'] },
        { value: 'aggressive', label: "I'm willing to take calculated risks for maximum growth potential", traits: ['ambitious', 'growth_seeking'] },
      ],
    },
    {
      id: 'decision_making',
      question: 'How do you approach making financial decisions?',
      options: [
        { value: 'research_heavy', label: 'I research extensively and analyze all options before deciding', traits: ['analytical', 'planner'] },
        { value: 'consult_others', label: 'I discuss with family/friends and consider their advice', traits: ['social', 'collaborative'] },
        { value: 'quick_decisive', label: 'I make decisions quickly based on my goals and intuition', traits: ['decisive', 'goal_oriented'] },
        { value: 'wait_and_see', label: 'I prefer to wait and see how situations develop before acting', traits: ['patient', 'observant'] },
      ],
    },
    {
      id: 'money_values',
      question: 'What matters most to you about money?',
      options: [
        { value: 'security', label: 'Financial security and stability for me and my family', traits: ['security_focused', 'family_oriented'] },
        { value: 'freedom', label: 'Freedom to live life on my own terms and pursue dreams', traits: ['freedom_seeking', 'independent'] },
        { value: 'growth', label: 'Growing wealth and achieving financial independence', traits: ['ambitious', 'wealth_builder'] },
        { value: 'helping_others', label: 'Having enough to help family, friends, and causes I care about', traits: ['generous', 'community_oriented'] },
      ],
    },
    {
      id: 'learning_style',
      question: 'How do you prefer to learn about financial topics?',
      options: [
        { value: 'step_by_step', label: 'Step-by-step guides with clear instructions and checklists', traits: ['structured', 'detail_oriented'] },
        { value: 'stories_examples', label: 'Real-life stories and examples from people like me', traits: ['relatable', 'story_learner'] },
        { value: 'group_discussion', label: 'Group discussions and sharing experiences with others', traits: ['social', 'collaborative'] },
        { value: 'hands_on', label: 'Hands-on activities and immediate practical application', traits: ['practical', 'experiential'] },
      ],
    },
    {
      id: 'financial_goals',
      question: 'What is your primary financial goal right now?',
      options: [
        { value: 'debt_payoff', label: 'Paying off debt and becoming debt-free', traits: ['debt_focused', 'relief_seeking'] },
        { value: 'emergency_fund', label: 'Building an emergency fund for security', traits: ['security_focused', 'prepared'] },
        { value: 'wealth_building', label: 'Building wealth through investments and savings', traits: ['wealth_builder', 'growth_oriented'] },
        { value: 'lifestyle_goals', label: 'Achieving specific lifestyle goals (home, travel, education)', traits: ['goal_oriented', 'dreamer'] },
      ],
    },
    {
      id: 'stress_response',
      question: 'How do you typically respond to financial stress?',
      options: [
        { value: 'create_plan', label: 'I create a detailed plan and work through it systematically', traits: ['planner', 'organized'] },
        { value: 'seek_support', label: 'I talk to trusted friends/family for emotional and practical support', traits: ['social', 'support_seeking'] },
        { value: 'take_action', label: 'I immediately look for ways to increase income or cut expenses', traits: ['action_oriented', 'practical'] },
        { value: 'research_solutions', label: 'I research all possible solutions before taking action', traits: ['analytical', 'thorough'] },
      ],
    },
  ]

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
  }

  const calculatePersonality = (): AssessmentResult => {
    const traitCounts: { [key: string]: number } = {}
    const personalityProfiles = {
      'cautious_planner': { traits: ['cautious', 'planner', 'security_focused', 'analytical'], learningStyle: 'structured' },
      'growth_seeker': { traits: ['ambitious', 'growth_oriented', 'decisive', 'wealth_builder'], learningStyle: 'conceptual' },
      'practical_manager': { traits: ['practical', 'action_oriented', 'hands_on', 'goal_oriented'], learningStyle: 'practical' },
      'community_builder': { traits: ['social', 'collaborative', 'supportive', 'community_oriented'], learningStyle: 'social' },
    }

    // Count traits from all answers
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = questions.find(q => q.id === questionId)
      if (question) {
        const option = question.options.find(o => o.value === answer)
        if (option) {
          option.traits.forEach(trait => {
            traitCounts[trait] = (traitCounts[trait] || 0) + 1
          })
        }
      }
    })

    // Determine dominant personality
    let maxScore = 0
    let dominantPersonality = 'cautious_planner'

    Object.entries(personalityProfiles).forEach(([personality, profile]) => {
      let score = 0
      profile.traits.forEach(trait => {
        score += traitCounts[trait] || 0
      })
      if (score > maxScore) {
        maxScore = score
        dominantPersonality = personality
      }
    })

    const confidence = Math.min((maxScore / 6) * 100, 95) // Cap at 95%

    return {
      personalityType: dominantPersonality,
      confidence,
      traits: personalityProfiles[dominantPersonality as keyof typeof personalityProfiles].traits,
      strengths: getStrengths(dominantPersonality),
      learningStyle: personalityProfiles[dominantPersonality as keyof typeof personalityProfiles].learningStyle,
    }
  }

  const getStrengths = (personality: string): string[] => {
    const strengthsMap = {
      'cautious_planner': ['Excellent at budgeting', 'Strong research skills', 'Patient and reliable', 'Risk management'],
      'growth_seeker': ['Strong goal setting', 'Motivated by challenges', 'Good long-term planning', 'Resilient'],
      'practical_manager': ['Excellent money management', 'Resourceful', 'Adaptable', 'Action-oriented'],
      'community_builder': ['Strong networking', 'Empathetic', 'Good communication', 'Team player'],
    }
    return strengthsMap[personality as keyof typeof strengthsMap] || []
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      completeAssessment()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const completeAssessment = () => {
    const assessmentResult = calculatePersonality()
    setResult(assessmentResult)
    setIsCompleted(true)
  }

  const getPersonalityName = (type: string): string => {
    const names = {
      'cautious_planner': 'The Cautious Planner',
      'growth_seeker': 'The Growth Seeker',
      'practical_manager': 'The Practical Manager',
      'community_builder': 'The Community Builder',
    }
    return names[type as keyof typeof names] || 'Financial Personality'
  }

  const getPersonalityDescription = (type: string): string => {
    const descriptions = {
      'cautious_planner': 'You are detail-oriented and risk-averse, preferring thorough planning and security. You excel at creating structured financial plans.',
      'growth_seeker': 'You are ambitious and optimistic, focused on long-term wealth building. You thrive on challenges and growth opportunities.',
      'practical_manager': 'You are hands-on and pragmatic, focusing on immediate financial needs. You prefer practical, actionable strategies.',
      'community_builder': 'You are social and collaborative, learning best through shared experiences. You value community support and helping others.',
    }
    return descriptions[type as keyof typeof descriptions] || ''
  }

  const getRecommendedCourses = (type: string): string[] => {
    const recommendations = {
      'cautious_planner': ['Budgeting Basics', 'Emergency Fund Planning', 'Debt Management', 'Risk Assessment'],
      'growth_seeker': ['Investment Fundamentals', 'Retirement Planning', 'Wealth Building Strategies', 'Advanced Investing'],
      'practical_manager': ['Money Management 101', 'Smart Shopping', 'Side Hustle Ideas', 'Quick Wins'],
      'community_builder': ['Group Financial Planning', 'Family Finance', 'Community Resources', 'Teaching Others'],
    }
    return recommendations[type as keyof typeof recommendations] || []
  }

  const currentQ = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100
  const isAnswered = answers[currentQ?.id]

  if (isCompleted && result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Results Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl shadow-2xl p-8 text-white mb-8">
            <div className="text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h1 className="text-4xl font-bold mb-4">Your Financial Personality</h1>
              <h2 className="text-3xl font-semibold text-purple-100 mb-2">
                {getPersonalityName(result.personalityType)}
              </h2>
              <p className="text-lg text-purple-100">
                Confidence: {Math.round(result.confidence)}%
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">About Your Type</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              {getPersonalityDescription(result.personalityType)}
            </p>
          </div>

          {/* Strengths */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Strengths</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {result.strengths.map((strength, index) => (
                <div key={index} className="flex items-center space-x-3 bg-green-50 rounded-lg p-4">
                  <span className="text-2xl">✅</span>
                  <span className="text-gray-800 font-medium">{strength}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Courses */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Recommended Courses for You</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {getRecommendedCourses(result.personalityType).map((course, index) => (
                <div key={index} className="flex items-center space-x-3 bg-purple-50 rounded-lg p-4">
                  <span className="text-2xl">📚</span>
                  <span className="text-gray-800 font-medium">{course}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Style */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Learning Style</h3>
            <p className="text-lg text-gray-700 capitalize">
              <span className="font-semibold text-purple-700">{result.learningStyle}</span> - 
              We'll personalize your learning experience based on this preference.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center px-8 py-4 bg-purple-600 text-white font-bold text-lg rounded-lg hover:bg-purple-700 shadow-xl transition-all"
            >
              Start Learning Now
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-purple-600 text-purple-600 font-bold text-lg rounded-lg hover:bg-purple-50 transition-all"
            >
              Go to Dashboard
            </Link>
            <button
              onClick={() => {
                setIsCompleted(false)
                setCurrentQuestion(0)
                setAnswers({})
                setResult(null)
              }}
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-bold text-lg rounded-lg hover:bg-gray-50 transition-all"
            >
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🧠</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Your Financial Personality
          </h1>
          <p className="text-xl text-gray-600">
            Answer 6 questions to get personalized course recommendations
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {currentQ?.question}
          </h2>
          <div className="space-y-3">
            {currentQ?.options.map((option) => (
              <label
                key={option.value}
                className={`block p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  answers[currentQ.id] === option.value
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                }`}
              >
                <input
                  type="radio"
                  name={currentQ.id}
                  value={option.value}
                  checked={answers[currentQ.id] === option.value}
                  onChange={() => handleAnswer(currentQ.id, option.value)}
                  className="sr-only"
                />
                <span className="text-gray-800 font-medium">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            ← Previous
          </button>
          <button
            onClick={handleNext}
            disabled={!isAnswered}
            className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {currentQuestion === questions.length - 1 ? 'See Results' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  )
}
