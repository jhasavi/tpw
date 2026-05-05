'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { logQuizStarted, logQuizCompleted } from '@/lib/crm-events-client'
import { Trophy, Zap, Star, Target, Flame, Award, Medal, Crown, Sparkles, Brain, Heart, Shield, Rocket } from 'lucide-react'

// Enhanced question types
interface QuizQuestion {
  id: string
  question_text: string
  question_type: 'multiple_choice' | 'true_false' | 'multi_select' | 'scenario' | 'drag_drop' | 'fill_blank' | 'matching' | 'ranking'
  options: Array<{ id: string; text: string; value: string; image?: string }>
  correct_answer: string | string[]
  explanation: string
  difficulty_level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  points: number
  time_limit?: number
  hint?: string
  category: string
  scenario?: {
    context: string
    character?: string
    situation: string
  }
}

interface QuizProps {
  lessonId: string
  lessonTitle: string
  category?: string
  onComplete?: (score: number, total: number, achievements: Achievement[]) => void
  gameMode?: 'standard' | 'speed_run' | 'survival' | 'streak'
}

interface Achievement {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  points: number
}

interface GameState {
  score: number
  streak: number
  combo: number
  timeSpent: number
  hintsUsed: number
  perfectAnswers: number
  level: number
  experience: number
}

export default function EnhancedQuiz({ lessonId, lessonTitle, category = 'general', onComplete, gameMode = 'standard' }: QuizProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [loading, setLoading] = useState(true)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
  const [showExplanation, setShowExplanation] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    streak: 0,
    combo: 1,
    timeSpent: 0,
    hintsUsed: 0,
    perfectAnswers: 0,
    level: 1,
    experience: 0
  })
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [showHint, setShowHint] = useState(false)
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [showAchievement, setShowAchievement] = useState<Achievement | null>(null)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; type: string }>>([])

  useEffect(() => {
    loadQuestions()
  }, [lessonId])

  useEffect(() => {
    if (questions.length > 0 && !quizCompleted) {
      logQuizStartEvent()
      startTimer()
    }
  }, [questions.length, quizCompleted])

  const startTimer = () => {
    const currentQ = questions[currentQuestionIndex]
    if (currentQ?.time_limit) {
      setTimeLeft(currentQ.time_limit)
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev !== null && prev > 0) {
            return prev - 1
          } else {
            clearInterval(timer)
            handleTimeUp()
            return 0
          }
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }

  const handleTimeUp = () => {
    setShowExplanation(true)
    setIsCorrect(false)
    setGameState(prev => ({ ...prev, streak: 0, combo: 1 }))
  }

  const logQuizStartEvent = async () => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        await logQuizStarted(
          user.id,
          user.email!,
          'enhanced_quiz',
          {
            lessonId,
            lessonTitle,
            category,
            gameMode,
            questionCount: questions.length,
            route: window.location.pathname
          }
        )
      }
    } catch (error) {
      console.error('Failed to log quiz start:', error)
    }
  }

  const loadQuestions = async () => {
    try {
      setLoading(true)
      const supabase = createClient()

      // For now, create sample questions - in production, these would come from the database
      const sampleQuestions: QuizQuestion[] = generateSampleQuestions(category)
      setQuestions(sampleQuestions)
      setLoading(false)
    } catch (err) {
      console.error('Exception loading quiz questions:', err)
      setLoading(false)
    }
  }

  const generateSampleQuestions = (quizCategory: string): QuizQuestion[] => {
    const baseQuestions: QuizQuestion[] = [
      {
        id: 'q1',
        question_text: 'What is the recommended size of an emergency fund for women?',
        question_type: 'multiple_choice',
        options: [
          { id: 'a', text: '1-2 months of expenses', value: '1-2' },
          { id: 'b', text: '3-6 months of expenses', value: '3-6' },
          { id: 'c', text: '6-12 months of expenses', value: '6-12' },
          { id: 'd', text: '12+ months of expenses', value: '12+' }
        ],
        correct_answer: '6-12',
        explanation: 'Women typically need larger emergency funds (6-12 months) due to longer life expectancy, career interruptions for caregiving, and potential pay gaps.',
        difficulty_level: 'beginner',
        points: 100,
        time_limit: 30,
        hint: 'Consider factors like longer life expectancy and career interruptions.',
        category: quizCategory
      },
      {
        id: 'q2',
        question_text: 'Maria earns $4,000/month and follows the 50/30/20 rule. How much should she save monthly?',
        question_type: 'multiple_choice',
        options: [
          { id: 'a', text: '$400', value: '400' },
          { id: 'b', text: '$800', value: '800' },
          { id: 'c', text: '$1,200', value: '1200' },
          { id: 'd', text: '$2,000', value: '2000' }
        ],
        correct_answer: '800',
        explanation: 'The 50/30/20 rule allocates 20% to savings. 20% of $4,000 = $800 per month.',
        difficulty_level: 'intermediate',
        points: 150,
        time_limit: 45,
        hint: 'The 20% in 50/30/20 stands for savings.',
        category: quizCategory
      },
      {
        id: 'q3',
        question_text: 'Which factors typically affect women\'s financial planning more than men?',
        question_type: 'multi_select',
        options: [
          { id: 'a', text: 'Longer life expectancy', value: 'longevity' },
          { id: 'b', text: 'Career interruptions for caregiving', value: 'caregiving' },
          { id: 'c', text: 'Gender pay gap', value: 'pay_gap' },
          { id: 'd', text: 'Higher investment risk tolerance', value: 'risk_tolerance' }
        ],
        correct_answer: ['longevity', 'caregiving', 'pay_gap'],
        explanation: 'Women face unique financial challenges including longer lifespans, career breaks for caregiving, and pay gaps that require special planning considerations.',
        difficulty_level: 'advanced',
        points: 200,
        time_limit: 60,
        hint: 'Think about challenges that specifically affect women\'s financial lives.',
        category: quizCategory
      }
    ]

    return baseQuestions
  }

  const handleAnswerSelect = (answerValue: string) => {
    if (showExplanation) return

    const currentQuestion = questions[currentQuestionIndex]
    
    if (currentQuestion.question_type === 'multi_select') {
      setSelectedAnswers(prev => 
        prev.includes(answerValue) 
          ? prev.filter(a => a !== answerValue)
          : [...prev, answerValue]
      )
    } else {
      setSelectedAnswers([answerValue])
    }
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswers.length === 0) return

    const currentQuestion = questions[currentQuestionIndex]
    let correct = false

    if (currentQuestion.question_type === 'multi_select') {
      const correctAnswers = Array.isArray(currentQuestion.correct_answer) 
        ? currentQuestion.correct_answer 
        : [currentQuestion.correct_answer]
      correct = selectedAnswers.every(answer => correctAnswers.includes(answer)) && 
               selectedAnswers.length === correctAnswers.length
    } else {
      correct = selectedAnswers[0] === currentQuestion.correct_answer
    }

    setIsCorrect(correct)
    setShowExplanation(true)

    // Update game state
    const pointsEarned = correct ? currentQuestion.points * gameState.combo : 0
    const newStreak = correct ? gameState.streak + 1 : 0
    const newCombo = correct ? Math.min(gameState.combo + 0.5, 3) : 1
    const newExperience = gameState.experience + (correct ? currentQuestion.points : 10)

    setGameState(prev => ({
      ...prev,
      score: prev.score + pointsEarned,
      streak: newStreak,
      combo: newCombo,
      experience: newExperience,
      perfectAnswers: correct ? prev.perfectAnswers + 1 : prev.perfectAnswers,
      hintsUsed: showHint ? prev.hintsUsed + 1 : prev.hintsUsed
    }))

    // Check for achievements
    checkAchievements(newStreak, pointsEarned, correct)

    // Create celebration particles for correct answers
    if (correct) {
      createParticles('success')
    }
  }

  const createParticles = (type: string) => {
    const newParticles = Array.from({ length: 10 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      type
    }))
    setParticles(prev => [...prev, ...newParticles])
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)))
    }, 2000)
  }

  const checkAchievements = (streak: number, points: number, correct: boolean) => {
    const newAchievements: Achievement[] = []

    // Streak achievements
    if (streak === 3) {
      newAchievements.push({
        id: 'streak_3',
        name: 'On Fire!',
        description: 'Answer 3 questions correctly in a row',
        icon: <Flame className="w-6 h-6" />,
        rarity: 'common',
        points: 50
      })
    }

    if (streak === 5) {
      newAchievements.push({
        id: 'streak_5',
        name: 'Unstoppable!',
        description: 'Answer 5 questions correctly in a row',
        icon: <Rocket className="w-6 h-6" />,
        rarity: 'rare',
        points: 100
      })
    }

    // Perfect answers
    if (correct && gameState.perfectAnswers === 4) {
      newAchievements.push({
        id: 'perfect_5',
        name: 'Perfect Score!',
        description: 'Answer 5 questions correctly',
        icon: <Star className="w-6 h-6" />,
        rarity: 'rare',
        points: 75
      })
    }

    // Speed achievements
    if (timeLeft !== null && timeLeft > 10 && correct) {
      newAchievements.push({
        id: 'speed_demon',
        name: 'Speed Demon!',
        description: 'Answer correctly with more than 10 seconds left',
        icon: <Zap className="w-6 h-6" />,
        rarity: 'common',
        points: 25
      })
    }

    // Show achievements
    newAchievements.forEach(achievement => {
      setShowAchievement(achievement)
      setTimeout(() => setShowAchievement(null), 3000)
    })

    setAchievements(prev => [...prev, ...newAchievements])
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswers([])
      setShowExplanation(false)
      setIsCorrect(null)
      setShowHint(false)
      setTimeLeft(null)
      startTimer()
    } else {
      completeQuiz()
    }
  }

  const completeQuiz = async () => {
    setQuizCompleted(true)
    saveQuizAttempt()
    
    if (onComplete) {
      onComplete(gameState.score, questions.reduce((sum, q) => sum + q.points, 0), achievements)
    }
  }

  const saveQuizAttempt = async () => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const totalPoints = questions.reduce((sum, q) => sum + q.points, 0)
      const percentage = Math.round((gameState.score / totalPoints) * 100)

      await logQuizCompleted(
        user.id,
        user.email!,
        'enhanced_quiz',
        gameState.score,
        {
          lessonId,
          lessonTitle,
          category,
          gameMode,
          totalQuestions: questions.length,
          score: gameState.score,
          percentage,
          achievements: achievements.map(a => a.id),
          gameState,
          route: window.location.pathname
        }
      )
    } catch (error) {
      console.error('Failed to save quiz attempt:', error)
    }
  }

  const handleHint = () => {
    setShowHint(true)
    setGameState(prev => ({ ...prev, hintsUsed: prev.hintsUsed + 1 }))
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100'
      case 'intermediate': return 'text-yellow-600 bg-yellow-100'
      case 'advanced': return 'text-orange-600 bg-orange-100'
      case 'expert': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-400 bg-gray-50'
      case 'rare': return 'border-blue-400 bg-blue-50'
      case 'epic': return 'border-purple-400 bg-purple-50'
      case 'legendary': return 'border-yellow-400 bg-yellow-50'
      default: return 'border-gray-400 bg-gray-50'
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Brain className="w-8 h-8 text-purple-600 animate-pulse" />
          </div>
        </div>
        <p className="text-gray-600 font-medium">Loading amazing quiz...</p>
      </div>
    )
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300 rounded-xl p-8 text-center">
        <div className="text-6xl mb-4">🚧</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Quiz Under Construction</h3>
        <p className="text-gray-700">
          We're crafting amazing questions for this quiz. Check back soon!
        </p>
      </div>
    )
  }

  if (quizCompleted) {
    const totalPoints = questions.reduce((sum, q) => sum + q.points, 0)
    const percentage = Math.round((gameState.score / totalPoints) * 100)
    const passed = percentage >= 70

    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className={`text-6xl mb-4 ${passed ? 'animate-bounce' : ''}`}>
            {passed ? '🎉' : '📚'}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {passed ? 'Amazing Work!' : 'Keep Growing!'}
          </h2>
          <p className="text-gray-600 mb-6">
            You scored {gameState.score} out of {totalPoints} points ({percentage}%)
          </p>

          {/* Game Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-purple-100 rounded-lg p-4 text-center">
              <Flame className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold text-purple-600">{gameState.streak}</div>
              <div className="text-sm text-gray-600">Best Streak</div>
            </div>
            <div className="bg-green-100 rounded-lg p-4 text-center">
              <Star className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-green-600">{gameState.perfectAnswers}</div>
              <div className="text-sm text-gray-600">Perfect Answers</div>
            </div>
            <div className="bg-blue-100 rounded-lg p-4 text-center">
              <Zap className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-blue-600">{gameState.combo.toFixed(1)}x</div>
              <div className="text-sm text-gray-600">Max Combo</div>
            </div>
            <div className="bg-yellow-100 rounded-lg p-4 text-center">
              <Trophy className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
              <div className="text-2xl font-bold text-yellow-600">{achievements.length}</div>
              <div className="text-sm text-gray-600">Achievements</div>
            </div>
          </div>

          {/* Achievements */}
          {achievements.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🏆 Achievements Earned</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className={`border-2 rounded-lg p-3 ${getRarityColor(achievement.rarity)}`}>
                    <div className="flex items-center gap-3">
                      <div className="text-purple-600">
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900">{achievement.name}</h4>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                      <div className="text-sm font-bold text-purple-600">+{achievement.points}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {passed ? (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 text-left">
              <p className="text-green-800">
                <strong>Outstanding!</strong> You've mastered {lessonTitle}. 
                You're ready for the next challenge!
              </p>
            </div>
          ) : (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 text-left">
              <p className="text-blue-800">
                <strong>Great effort!</strong> Review the material and try again. 
                Aim for 70% or higher to unlock the next level!
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 font-medium flex items-center gap-2"
          >
            <Rocket className="w-4 h-4" />
            Play Again
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
    <div className="bg-white rounded-xl shadow-lg p-8 relative overflow-hidden">
      {/* Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute pointer-events-none animate-ping"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {particle.type === 'success' ? (
            <Sparkles className="w-4 h-4 text-yellow-400" />
          ) : (
            <Star className="w-4 h-4 text-purple-400" />
          )}
        </div>
      ))}

      {/* Achievement Popup */}
      {showAchievement && (
        <div className="absolute top-4 right-4 z-10 animate-bounce">
          <div className={`border-2 rounded-lg p-3 shadow-lg ${getRarityColor(showAchievement.rarity)}`}>
            <div className="flex items-center gap-2">
              <div className="text-purple-600">
                {showAchievement.icon}
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">{showAchievement.name}</h4>
                <p className="text-xs text-gray-600">+{showAchievement.points} pts</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Game Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{gameState.score}</div>
              <div className="text-xs text-gray-600">Score</div>
            </div>
            {gameState.streak > 0 && (
              <div className="text-center">
                <div className="flex items-center gap-1">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="text-xl font-bold text-orange-500">{gameState.streak}</span>
                </div>
                <div className="text-xs text-gray-600">Streak</div>
              </div>
            )}
            {gameState.combo > 1 && (
              <div className="text-center">
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span className="text-xl font-bold text-yellow-500">{gameState.combo.toFixed(1)}x</span>
                </div>
                <div className="text-xs text-gray-600">Combo</div>
              </div>
            )}
          </div>
          
          {timeLeft !== null && (
            <div className={`text-center ${timeLeft < 10 ? 'animate-pulse text-red-600' : 'text-gray-600'}`}>
              <div className="text-2xl font-bold">{timeLeft}s</div>
              <div className="text-xs">Time Left</div>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-purple-600 to-indigo-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <div className="flex items-start gap-3 mb-4">
          <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
            {currentQuestionIndex + 1}
          </span>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {currentQuestion.question_text}
            </h3>
            
            {/* Scenario Context */}
            {currentQuestion.scenario && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-3">
                <div className="text-sm">
                  <span className="font-semibold text-blue-800">Scenario:</span> {currentQuestion.scenario.context}
                </div>
              </div>
            )}

            {/* Points and Difficulty */}
            <div className="flex items-center gap-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(currentQuestion.difficulty_level)}`}>
                {currentQuestion.difficulty_level.charAt(0).toUpperCase() + currentQuestion.difficulty_level.slice(1)}
              </span>
              <span className="text-sm text-purple-600 font-medium">
                {currentQuestion.points} points
              </span>
              {currentQuestion.time_limit && (
                <span className="text-sm text-gray-500">
                  ⏱️ {currentQuestion.time_limit}s
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Answer Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedAnswers.includes(option.value)
            const showCorrect = showExplanation && Array.isArray(currentQuestion.correct_answer) 
              ? currentQuestion.correct_answer.includes(option.value)
              : showExplanation && option.value === currentQuestion.correct_answer
            const showIncorrect = showExplanation && isSelected && !showCorrect

            return (
              <button
                key={option.id}
                onClick={() => handleAnswerSelect(option.value)}
                disabled={showExplanation}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all transform hover:scale-[1.02] ${
                  showCorrect
                    ? 'border-green-500 bg-green-50'
                    : showIncorrect
                    ? 'border-red-500 bg-red-50'
                    : isSelected
                    ? 'border-purple-600 bg-purple-50 shadow-lg'
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
                  {showCorrect && <span className="text-green-600 text-sm">✓ Correct!</span>}
                  {showIncorrect && <span className="text-red-600 text-sm">✗ Incorrect</span>}
                </div>
              </button>
            )
          })}
        </div>

        {/* Hint */}
        {!showExplanation && currentQuestion.hint && !showHint && (
          <button
            onClick={handleHint}
            className="mt-3 text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center gap-2"
          >
            <Shield className="w-4 h-4" />
            Need a hint? (-50 points)
          </button>
        )}

        {showHint && currentQuestion.hint && (
          <div className="mt-3 bg-yellow-50 border-l-4 border-yellow-500 p-3">
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4 text-yellow-600" />
              <span className="text-yellow-800">
                <strong>Hint:</strong> {currentQuestion.hint}
              </span>
            </div>
          </div>
        )}
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
                <Star className="w-5 h-5 text-green-600" />
                <span className="text-green-600">Excellent!</span>
              </>
            ) : (
              <>
                <Brain className="w-5 h-5 text-blue-600" />
                <span className="text-blue-600">Learn & Grow</span>
              </>
            )}
          </h4>
          <p className="text-gray-700">{currentQuestion.explanation}</p>
          {isCorrect && (
            <div className="mt-2 text-green-700 font-medium">
              +{currentQuestion.points * gameState.combo} points earned!
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Level {gameState.level} • {gameState.experience} XP
        </div>
        <div className="flex gap-4">
          {!showExplanation ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswers.length === 0}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                selectedAnswers.length > 0
                  ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 font-medium transition-all flex items-center gap-2"
            >
              {currentQuestionIndex < questions.length - 1 ? (
                <>
                  Next Question
                  <Rocket className="w-4 h-4" />
                </>
              ) : (
                <>
                  See Results
                  <Trophy className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
