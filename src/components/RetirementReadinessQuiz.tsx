'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calculator, Calendar, Shield, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react'

interface QuizQuestion {
  id: number
  question: string
  category: 'savings' | 'social_security' | 'healthcare' | 'income' | 'timeline'
  weight: number
  options: {
    text: string
    score: number
    explanation: string
  }[]
}

const RETIREMENT_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "How much of your current income are you saving for retirement?",
    category: 'savings',
    weight: 25,
    options: [
      {
        text: "Less than 5%",
        score: 1,
        explanation: "You're behind the recommended 10-15% savings rate"
      },
      {
        text: "5-10%",
        score: 2,
        explanation: "Good start, but consider increasing to 15%"
      },
      {
        text: "10-15%",
        score: 3,
        explanation: "Excellent! You're on track for retirement"
      },
      {
        text: "More than 15%",
        score: 4,
        explanation: "Outstanding! You're ahead of most people"
      }
    ]
  },
  {
    id: 2,
    question: "At what age do you plan to claim Social Security benefits?",
    category: 'social_security',
    weight: 20,
    options: [
      {
        text: "62 (earliest possible)",
        score: 1,
        explanation: "Claiming early reduces benefits by up to 30%"
      },
      {
        text: "65-66",
        score: 3,
        explanation: "This is the optimal range for most people"
      },
      {
        text: "67-70",
        score: 4,
        explanation: "Waiting increases benefits by 8-24% per year"
      },
      {
        text: "I haven't thought about it",
        score: 0,
        explanation: "Social Security timing is critical for retirement planning"
      }
    ]
  },
  {
    id: 3,
    question: "How prepared are you for healthcare costs in retirement?",
    category: 'healthcare',
    weight: 20,
    options: [
      {
        text: "Not prepared at all",
        score: 0,
        explanation: "Healthcare is typically the biggest retirement expense"
      },
      {
        text: "Some basic understanding",
        score: 1,
        explanation: "Good start, but you need detailed planning"
      },
      {
        text: "Have researched Medicare options",
        score: 3,
        explanation: "Medicare planning is essential for retirement"
      },
      {
        text: "Comprehensive plan in place",
        score: 4,
        explanation: "Excellent! Healthcare planning is often overlooked"
      }
    ]
  },
  {
    id: 4,
    question: "How many income streams do you have planned for retirement?",
    category: 'income',
    weight: 20,
    options: [
      {
        text: "Just Social Security",
        score: 1,
        explanation: "Social Security alone is typically not enough"
      },
      {
        text: "Social Security + 401(k)/IRA",
        score: 2,
        explanation: "Better, but consider additional income streams"
      },
      {
        text: "3-4 different income sources",
        score: 4,
        explanation: "Excellent! Multiple income streams provide security"
      },
      {
        text: "I haven't planned income streams",
        score: 0,
        explanation: "Income planning is essential for retirement security"
      }
    ]
  },
  {
    id: 5,
    question: "How confident are you about your retirement timeline?",
    category: 'timeline',
    weight: 15,
    options: [
      {
        text: "Very confident - detailed plan",
        score: 4,
        explanation: "Great! Confidence comes from good planning"
      },
      {
        text: "Somewhat confident - basic plan",
        score: 2,
        explanation: "Good start, but add more detail"
      },
      {
        text: "Not confident - no clear plan",
        score: 1,
        explanation: "A clear plan is essential for retirement success"
      },
      {
        text: "No idea when I can retire",
        score: 0,
        explanation: "Understanding your timeline is the first step"
      }
    ]
  }
]

export default function RetirementReadinessQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{[key: number]: number}>({})
  const [showResults, setShowResults] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleAnswer = (questionId: number, score: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: score }))
    
    if (currentQuestion < RETIREMENT_QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      calculateResults()
    }
  }

  const calculateResults = () => {
    setIsCalculating(true)
    
    // Simulate calculation delay
    setTimeout(() => {
      setShowResults(true)
      setIsCalculating(false)
    }, 1500)
  }

  const getScoreDetails = () => {
    let totalScore = 0
    let maxScore = 0
    const categoryScores: { [key: string]: { score: number; max: number } } = {}

    RETIREMENT_QUIZ_QUESTIONS.forEach(question => {
      const answerScore = answers[question.id] || 0
      totalScore += answerScore * question.weight
      maxScore += 4 * question.weight // Max score per question is 4

      if (!categoryScores[question.category]) {
        categoryScores[question.category] = { score: 0, max: 0 }
      }
      categoryScores[question.category].score += answerScore * question.weight
      categoryScores[question.category].max += 4 * question.weight
    })

    const overallPercentage = Math.round((totalScore / maxScore) * 100)

    const categoryPercentages = Object.entries(categoryScores).map(([category, scores]) => ({
      category,
      percentage: Math.round((scores.score / scores.max) * 100),
      label: category.replace('_', ' ').replace(/\b\w/g, char => char.toUpperCase())
    }))

    return {
      overallPercentage,
      categoryPercentages,
      totalScore,
      maxScore
    }
  }

  const getReadinessLevel = (percentage: number) => {
    if (percentage >= 80) return { level: "Excellent", color: "green", description: "You're retirement ready!" }
    if (percentage >= 60) return { level: "Good", color: "blue", description: "You're on track, with some gaps" }
    if (percentage >= 40) return { level: "Fair", color: "yellow", description: "You have work to do" }
    return { level: "Needs Work", color: "red", description: "Immediate action required" }
  }

  const getBankMeetingPrep = () => {
    const scoreDetails = getScoreDetails()
    const weakAreas = scoreDetails.categoryPercentages
      .filter(cat => cat.percentage < 60)
      .map(cat => cat.label)

    return {
      questionsToAsk: [
        "Based on my retirement readiness assessment, what specific steps should I take in the next 12 months?",
        "How can I optimize my Social Security claiming strategy?",
        "What are my options for creating additional retirement income streams?",
        "How should I structure my retirement accounts for tax efficiency?",
        "What healthcare planning should I complete before age 65?"
      ],
      documentsToBring: [
        "Current retirement account statements",
        "Social Security statement",
        "Current budget and expense analysis",
        "List of current debts and assets",
        "Healthcare coverage information"
      ],
      weakAreas
    }
  }

  if (showResults) {
    const scoreDetails = getScoreDetails()
    const readinessLevel = getReadinessLevel(scoreDetails.overallPercentage)
    const bankPrep = getBankMeetingPrep()

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Your Retirement Readiness Score
            </h1>
            <div className={`text-6xl font-bold mb-4 text-${readinessLevel.color}-600`}>
              {scoreDetails.overallPercentage}%
            </div>
            <div className={`bg-${readinessLevel.color}-100 text-${readinessLevel.color}-800 px-6 py-3 rounded-full inline-block`}>
              {readinessLevel.level}
            </div>
            <p className="text-xl text-gray-600 mt-4">
              {readinessLevel.description}
            </p>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Score Breakdown</h2>
            <div className="space-y-4">
              {scoreDetails.categoryPercentages.map((category, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-700">{category.label}</span>
                    <span className={`font-bold text-${category.percentage >= 60 ? 'green' : category.percentage >= 40 ? 'yellow' : 'red'}-600`}>
                      {category.percentage}%
                    </span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${
                        category.percentage >= 60 ? 'bg-green-500' : 
                        category.percentage >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bank Meeting Preparation */}
          <div className="bg-gradient-to-br from-purple-600 to-indigo-800 text-white rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Calculator className="w-8 h-8" />
              Bank Meeting Preparation
            </h2>
            <p className="text-purple-100 mb-6">
              You're ready for your bank meeting! Here's what to ask and what to bring:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold mb-4">Questions to Ask</h3>
                <ul className="space-y-2">
                  {bankPrep.questionsToAsk.map((question, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-1 text-yellow-400 flex-shrink-0" />
                      <span className="text-purple-100">{question}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Documents to Bring</h3>
                <ul className="space-y-2">
                  {bankPrep.documentsToBring.map((doc, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Shield className="w-4 h-4 mt-1 text-yellow-400 flex-shrink-0" />
                      <span className="text-purple-100">{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Weak Areas */}
          {bankPrep.weakAreas.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
                <AlertCircle className="w-6 h-6" />
                Areas Needing Attention
              </h3>
              <div className="space-y-2">
                {bankPrep.weakAreas.map((area, index) => (
                  <div key={index} className="text-red-700">
                    • {area}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Plan */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Next Steps</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Immediate Actions</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Schedule bank meeting using questions above</li>
                  <li>• Gather all required documents</li>
                  <li>• Review current retirement accounts</li>
                  <li>• Create detailed retirement budget</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Learning Priorities</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Social Security optimization strategies</li>
                  <li>• Retirement income planning</li>
                  <li>• Healthcare cost management</li>
                  <li>• Required minimum distributions</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/learn/womens-financial-literacy/retirement-planning" className="bg-purple-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-purple-700 transition-colors">
              Start Retirement Course
            </Link>
            <Link href="/campaigns/past-attendees" className="bg-purple-100 text-purple-700 px-8 py-4 rounded-lg font-bold hover:bg-purple-200 transition-colors">
              Join Community Support
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const currentQ = RETIREMENT_QUIZ_QUESTIONS[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} of {RETIREMENT_QUIZ_QUESTIONS.length}</span>
            <span>{Math.round(((currentQuestion) / RETIREMENT_QUIZ_QUESTIONS.length) * 100)}%</span>
          </div>
          <div className="bg-gray-200 rounded-full h-3">
            <div 
              className="bg-purple-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion) / RETIREMENT_QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
              {currentQ.category.replace('_', ' ')}
            </div>
            <div className="text-sm text-gray-500">
              Weight: {currentQ.weight}%
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {currentQ.question}
          </h2>

          <div className="space-y-4">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(currentQ.id, option.score)}
                className="w-full text-left bg-gray-50 hover:bg-purple-50 border-2 border-gray-200 hover:border-purple-300 rounded-lg p-6 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-purple-400 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 mb-2">
                      {option.text}
                    </div>
                    <div className="text-sm text-gray-600">
                      {option.explanation}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
            className="bg-gray-200 text-gray-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <div className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {RETIREMENT_QUIZ_QUESTIONS.length}
          </div>
          
          <div className="w-20" /> {/* Spacer */}
        </div>
      </div>
    </div>
  )
}
