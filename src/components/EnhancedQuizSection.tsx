'use client'

import { useState } from 'react'
import EnhancedQuiz from './EnhancedQuiz'
import { Trophy, Flame, Star, Zap, Target, Brain, Heart, Shield, Rocket, Sparkles } from 'lucide-react'

interface QuizSectionProps {
  lessonId: string
  lessonTitle: string
  category?: string
  onQuizStart?: () => void
  onQuizEnd?: () => void
}

interface Achievement {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  points: number
}

export default function EnhancedQuizSection({ lessonId, lessonTitle, category = 'general', onQuizStart, onQuizEnd }: QuizSectionProps) {
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [lastScore, setLastScore] = useState<{ score: number; total: number; achievements: Achievement[] } | null>(null)
  const [gameMode, setGameMode] = useState<'standard' | 'speed_run' | 'survival' | 'streak'>('standard')

  const handleStartQuiz = () => {
    setShowQuiz(true)
    if (onQuizStart) onQuizStart()
  }

  const handleBackToLesson = () => {
    setShowQuiz(false)
    if (onQuizEnd) onQuizEnd()
  }

  const handleQuizComplete = (score: number, total: number, achievements: Achievement[]) => {
    setQuizCompleted(true)
    setLastScore({ score, total, achievements })
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

  if (!showQuiz) {
    return (
      <div className="bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 rounded-2xl shadow-2xl p-8 mb-6 border-4 border-purple-300 text-center relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-4 left-4 text-4xl animate-bounce opacity-20">🎯</div>
        <div className="absolute top-8 right-8 text-3xl animate-pulse opacity-20">⭐</div>
        <div className="absolute bottom-4 left-8 text-3xl animate-bounce opacity-20 delay-100">🚀</div>
        <div className="absolute bottom-6 right-4 text-4xl animate-pulse opacity-20 delay-200">🏆</div>
        
        <div className="relative z-10">
          <div className="text-7xl mb-4 animate-bounce">🎮</div>
          <h3 className="text-3xl font-bold text-gray-900 mb-3">Challenge Yourself!</h3>
          <p className="text-gray-700 mb-4 text-lg">
            Test your knowledge with our interactive quiz featuring multiple game modes, achievements, and rewards!
          </p>
          
          {/* Game Mode Selection */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-600 mb-3">Choose Your Game Mode:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
              {[
                { mode: 'standard' as const, name: 'Standard', icon: <Star className="w-4 h-4" />, desc: 'Classic quiz experience' },
                { mode: 'speed_run' as const, name: 'Speed Run', icon: <Zap className="w-4 h-4" />, desc: 'Race against time' },
                { mode: 'survival' as const, name: 'Survival', icon: <Shield className="w-4 h-4" />, desc: 'No mistakes allowed' },
                { mode: 'streak' as const, name: 'Streak', icon: <Flame className="w-4 h-4" />, desc: 'Build winning streaks' }
              ].map(({ mode, name, icon, desc }) => (
                <button
                  key={mode}
                  onClick={() => setGameMode(mode)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    gameMode === mode
                      ? 'border-purple-600 bg-purple-100 text-purple-700'
                      : 'border-gray-200 hover:border-purple-300 bg-white text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1 mb-1">
                    {icon}
                    <span className="font-medium text-sm">{name}</span>
                  </div>
                  <p className="text-xs text-gray-500">{desc}</p>
                </button>
              ))}
            </div>
          </div>
          
          {/* Quiz Features */}
          <div className="flex items-center justify-center gap-6 mb-6 text-gray-700">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="font-medium">Achievements</span>
            </div>
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="font-medium">Streaks</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-500" />
              <span className="font-medium">Combos</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-green-500" />
              <span className="font-medium">Levels</span>
            </div>
          </div>

          <button
            onClick={handleStartQuiz}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-10 py-4 rounded-lg hover:from-purple-700 hover:to-indigo-700 font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 border-2 border-purple-400 flex items-center gap-2 mx-auto"
          >
            <Rocket className="w-5 h-5" />
            Start Quiz Now!
          </button>
        </div>
      </div>
    )
  }

  if (quizCompleted && lastScore) {
    const percentage = Math.round((lastScore.score / lastScore.total) * 100)
    const passed = percentage >= 70

    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-6">
          <div className={`text-6xl mb-4 ${passed ? 'animate-bounce' : ''}`}>
            {passed ? '🎉' : '📚'}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {passed ? 'Amazing Work!' : 'Keep Growing!'}
          </h2>
          <p className="text-gray-600 mb-4">
            You scored {lastScore.score} out of {lastScore.total} points ({percentage}%)
          </p>

          {/* Achievements Earned */}
          {lastScore.achievements.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center justify-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Achievements Earned
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {lastScore.achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`border-2 rounded-lg p-2 ${getRarityColor(achievement.rarity)}`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="text-purple-600">
                        {achievement.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">{achievement.name}</h4>
                        <p className="text-xs text-gray-600">+{achievement.points} pts</p>
                      </div>
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
            onClick={() => {
              setQuizCompleted(false)
              setLastScore(null)
              setShowQuiz(false)
            }}
            className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 font-medium flex items-center gap-2"
          >
            <Rocket className="w-4 h-4" />
            Play Again
          </button>
          <button
            onClick={handleBackToLesson}
            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-300 font-medium"
          >
            Review Lesson
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-purple-900 flex items-center gap-2">
            <span className="text-3xl">🎮</span>
            Enhanced Quiz: {lessonTitle}
          </h2>
          <p className="text-sm text-purple-700 mt-1">
            Game Mode: <span className="font-bold capitalize">{gameMode.replace('_', ' ')}</span> • 
            Answer all questions to unlock achievements!
          </p>
        </div>
        {!quizCompleted && (
          <button
            onClick={handleBackToLesson}
            className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-2"
          >
            Back to Lesson
          </button>
        )}
      </div>

      <EnhancedQuiz
        lessonId={lessonId}
        lessonTitle={lessonTitle}
        category={category}
        gameMode={gameMode}
        onComplete={handleQuizComplete}
      />
    </div>
  )
}
