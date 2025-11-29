'use client'

import { useState } from 'react'
import Quiz from './Quiz'

interface QuizSectionProps {
  lessonId: string
  lessonTitle: string
  onQuizStart?: () => void
  onQuizEnd?: () => void
}

export default function QuizSection({ lessonId, lessonTitle, onQuizStart, onQuizEnd }: QuizSectionProps) {
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [lastScore, setLastScore] = useState<{ score: number; total: number } | null>(null)

  const handleStartQuiz = () => {
    setShowQuiz(true)
    if (onQuizStart) onQuizStart()
  }

  const handleBackToLesson = () => {
    setShowQuiz(false)
    if (onQuizEnd) onQuizEnd()
  }

  const handleQuizComplete = (score: number, total: number) => {
    setQuizCompleted(true)
    setLastScore({ score, total })
  }

  if (!showQuiz) {
    return (
      <div className="bg-gradient-to-br from-purple-600 to-indigo-700 border-2 border-purple-400 rounded-xl p-8 text-center mb-6 shadow-xl">
        <div className="text-7xl mb-4 animate-bounce">🎯</div>
        <h3 className="text-3xl font-bold text-white mb-3">Test Your Knowledge!</h3>
        <p className="text-purple-100 mb-2 text-lg">
          Challenge yourself and earn points by taking this interactive quiz.
        </p>
        <div className="flex items-center justify-center gap-6 mb-6 text-purple-100">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <span className="text-sm">Quick & Fun</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏆</span>
            <span className="text-sm">Earn Badges</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">📊</span>
            <span className="text-sm">Track Progress</span>
          </div>
        </div>
        <button
          onClick={handleStartQuiz}
          className="bg-white text-purple-700 px-10 py-4 rounded-lg hover:bg-purple-50 font-bold text-lg shadow-lg hover:shadow-2xl transition-all transform hover:scale-105"
        >
          🚀 Start Quiz Now!
        </button>
      </div>
    )
  }

  return (
    <div className="mb-6">
      <div className="mb-6 bg-purple-50 border-l-4 border-purple-600 p-4 rounded-r-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-purple-900 flex items-center gap-2">
              <span>📝</span> Quiz: {lessonTitle}
            </h2>
            <p className="text-sm text-purple-700 mt-1">Answer all questions to see your score!</p>
          </div>
          {!quizCompleted && (
            <button
              onClick={handleBackToLesson}
              className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center gap-1 bg-white px-4 py-2 rounded-md shadow-sm"
            >
              <span>←</span> Back to Lesson
            </button>
          )}
        </div>
      </div>
      <Quiz
        lessonId={lessonId}
        lessonTitle={lessonTitle}
        onComplete={handleQuizComplete}
      />
    </div>
  )
}
