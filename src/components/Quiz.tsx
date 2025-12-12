'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

interface QuizQuestion {
  id: string
  question_text: string
  question_type: 'multiple_choice' | 'true_false' | 'multi_select'
  options: Array<{ id: string; text: string; value: string }>
  correct_answer: string
  explanation: string
  difficulty_level: string
}

interface QuizProps {
  lessonId: string
  lessonTitle: string
  onComplete?: (score: number, total: number) => void
}

export default function Quiz({ lessonId, lessonTitle, onComplete }: QuizProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [loading, setLoading] = useState(true)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [answers, setAnswers] = useState<Array<{ questionId: string; userAnswer: string; correct: boolean }>>([])

  useEffect(() => {
    loadQuestions()
  }, [lessonId])

  const loadQuestions = async () => {
    try {
      setLoading(true)
      const supabase = createClient()

      // Fetch quiz questions for this lesson
      const { data: lessonQuizzes, error } = await supabase
        .from('lesson_quizzes')
        .select(`
          question_id,
          quiz_questions (
            id,
            question_text,
            question_type,
            options,
            correct_answer,
            explanation,
            difficulty_level
          )
        `)
        .eq('lesson_id', lessonId)
        .order('display_order', { ascending: true })

      if (error) {
        console.error('Error loading quiz questions:', error)
        setLoading(false)
        return
      }

      if (lessonQuizzes) {
        const loadedQuestions = lessonQuizzes
          .map((lq: any) => lq.quiz_questions)
          .filter(Boolean) as QuizQuestion[]
        
        setQuestions(loadedQuestions)
      }

      setLoading(false)
    } catch (err) {
      console.error('Exception loading quiz questions:', err)
      setLoading(false)
      // Continue without throwing - quiz will show "Coming Soon"
    }
  }

  const handleAnswerSelect = (answerId: string) => {
    if (showExplanation) return // Don't allow changing answer after submission
    setSelectedAnswer(answerId)
  }

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return

    const currentQuestion = questions[currentQuestionIndex]
    const correct = selectedAnswer === currentQuestion.correct_answer

    setIsCorrect(correct)
    setShowExplanation(true)

    if (correct) {
      setScore(score + 1)
    }

    // Track the answer
    setAnswers([
      ...answers,
      {
        questionId: currentQuestion.id,
        userAnswer: selectedAnswer,
        correct
      }
    ])
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
      setIsCorrect(null)
    } else {
      // Quiz completed
      setQuizCompleted(true)
      saveQuizAttempt()
      if (onComplete) {
        onComplete(score + (isCorrect ? 1 : 0), questions.length)
      }
    }
  }

  const saveQuizAttempt = async () => {
    try {
      const supabase = createClient()
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const finalScore = score + (isCorrect ? 1 : 0)
      const percentage = Math.round((finalScore / questions.length) * 100)

      // Save quiz attempt
      const { error } = await supabase
        .from('quiz_attempts')
        .insert({
          user_id: user.id,
          lesson_id: lessonId,
          score: finalScore,
          total_questions: questions.length,
          percentage,
          answers: answers
        })

      if (error) {
        console.error('Error saving quiz attempt:', error)
        // Don't throw - quiz is still completed, just failed to save attempt
      }
    } catch (err) {
      console.error('Exception saving quiz attempt:', err)
      // Continue anyway - user experience more important than saving attempt
    }
  }

  const handleRetakeQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setIsCorrect(null)
    setScore(0)
    setQuizCompleted(false)
    setAnswers([])
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading quiz...</p>
      </div>
    )
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Quiz Coming Soon</h3>
        <p className="text-gray-700">
          Questions for this lesson are being prepared. Check back soon!
        </p>
      </div>
    )
  }

  if (quizCompleted) {
    const finalScore = score
    const percentage = Math.round((finalScore / questions.length) * 100)
    const passed = percentage >= 70

    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className={`text-6xl mb-4 ${passed ? '🎉' : '📚'}`}>
            {passed ? '🎉' : '📚'}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {passed ? 'Great Job!' : 'Keep Learning!'}
          </h2>
          <p className="text-gray-600 mb-6">
            You scored {finalScore} out of {questions.length} ({percentage}%)
          </p>

          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="bg-purple-100 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-purple-600">{finalScore}</div>
              <div className="text-sm text-gray-600">Correct</div>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-gray-600">{questions.length - finalScore}</div>
              <div className="text-sm text-gray-600">Incorrect</div>
            </div>
          </div>

          {passed ? (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 text-left">
              <p className="text-green-800">
                <strong>Excellent!</strong> You've demonstrated a solid understanding of {lessonTitle}.
                You're ready to move forward!
              </p>
            </div>
          ) : (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 text-left">
              <p className="text-blue-800">
                <strong>Keep practicing!</strong> Review the lesson material and try again.
                Aim for 70% or higher to master this topic.
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={handleRetakeQuiz}
            className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 font-medium"
          >
            Retake Quiz
          </button>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-300 font-medium"
          >
            Review Lesson
          </button>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <div className="flex items-start gap-3 mb-4">
          <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
            {currentQuestionIndex + 1}
          </span>
          <h3 className="text-xl font-semibold text-gray-900 flex-1">
            {currentQuestion.question_text}
          </h3>
        </div>

        {/* Difficulty Badge */}
        <div className="mb-4">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
            currentQuestion.difficulty_level === 'easy' ? 'bg-green-100 text-green-800' :
            currentQuestion.difficulty_level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {currentQuestion.difficulty_level?.toUpperCase()}
          </span>
        </div>

        {/* Answer Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedAnswer === option.value
            const showCorrect = showExplanation && option.value === currentQuestion.correct_answer
            const showIncorrect = showExplanation && isSelected && option.value !== currentQuestion.correct_answer

            return (
              <button
                key={option.id}
                onClick={() => handleAnswerSelect(option.value)}
                disabled={showExplanation}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  showCorrect
                    ? 'border-green-500 bg-green-50'
                    : showIncorrect
                    ? 'border-red-500 bg-red-50'
                    : isSelected
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300 bg-white'
                } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    showCorrect
                      ? 'border-green-500 bg-green-500'
                      : showIncorrect
                      ? 'border-red-500 bg-red-500'
                      : isSelected
                      ? 'border-purple-600 bg-purple-600'
                      : 'border-gray-300'
                  }`}>
                    {showCorrect && <span className="text-white text-sm">✓</span>}
                    {showIncorrect && <span className="text-white text-sm">✗</span>}
                    {isSelected && !showExplanation && <span className="text-white text-sm">•</span>}
                  </div>
                  <span className={`flex-1 ${
                    showCorrect || showIncorrect ? 'font-medium' : ''
                  }`}>
                    {option.text}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className={`border-l-4 p-4 mb-6 ${
          isCorrect
            ? 'bg-green-50 border-green-500'
            : 'bg-blue-50 border-blue-500'
        }`}>
          <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
            {isCorrect ? (
              <>
                <span className="text-green-600">✓</span> Correct!
              </>
            ) : (
              <>
                <span className="text-blue-600">💡</span> Learn & Grow
              </>
            )}
          </h4>
          <p className="text-gray-700">{currentQuestion.explanation}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        {!showExplanation ? (
          <button
            onClick={handleSubmitAnswer}
            disabled={!selectedAnswer}
            className={`px-6 py-3 rounded-md font-medium ${
              selectedAnswer
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 font-medium"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'See Results'} →
          </button>
        )}
      </div>

      {/* Score Indicator */}
      <div className="mt-6 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
        Current Score: {score} / {currentQuestionIndex + (showExplanation ? 1 : 0)}
      </div>
    </div>
  )
}
