'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { CheckCircle, Circle, Users, TrendingUp, Award, Share2 } from 'lucide-react'

const CHALLENGE_DAYS = [
  {
    day: 1,
    title: "Money Mindset Audit",
    description: "Identify your money beliefs and patterns",
    action: "Write down 3 money beliefs you inherited",
    time: "10 minutes",
    category: "Mindset",
    completed: false
  },
  {
    day: 2,
    title: "Spending Snapshot",
    description: "Track every dollar for 24 hours",
    action: "Use a notebook or app to track all spending today",
    time: "5 minutes setup",
    category: "Awareness",
    completed: false
  },
  {
    day: 3,
    title: "Subscription Hunt",
    description: "Find and eliminate forgotten subscriptions",
    action: "Check bank statements for recurring charges",
    time: "15 minutes",
    category: "Savings",
    completed: false
  },
  {
    day: 4,
    title: "Emergency Fund Starter",
    description: "Open separate savings account for emergencies",
    action: "Open high-yield savings account, set up $25/day auto-transfer",
    time: "20 minutes",
    category: "Security",
    completed: false
  },
  {
    day: 5,
    title: "Credit Score Check",
    description: "Know your credit score and fix errors",
    action: "Check free credit reports from all 3 bureaus",
    time: "30 minutes",
    category: "Credit",
    completed: false
  },
  {
    day: 6,
    title: "Future Self Vision",
    description: "Define what financial freedom looks like for you",
    action: "Write detailed description of your ideal financial life",
    time: "15 minutes",
    category: "Goals",
    completed: false
  },
  {
    day: 7,
    title: "Accountability Partner",
    description: "Share your journey and invite others",
    action: "Share your progress and invite 3 friends to join",
    time: "10 minutes",
    category: "Community",
    completed: false
  }
]

const COMMUNITY_STATS = {
  participants: 1247,
  completed: 892,
  totalSaved: "$127,450",
  countries: 8
}

export default function PurpleWingsChallenge() {
  const [currentDay, setCurrentDay] = useState(1)
  const [completedDays, setCompletedDays] = useState<number[]>([])
  const [userStats, setUserStats] = useState({
    saved: 0,
    timeSpent: 0,
    streak: 0
  })
  const [showShareModal, setShowShareModal] = useState(false)
  const [email, setEmail] = useState('')
  const [isJoining, setIsJoining] = useState(false)

  useEffect(() => {
    // Load user progress from localStorage or API
    const saved = localStorage.getItem('purpleWingsChallenge')
    if (saved) {
      const data = JSON.parse(saved)
      setCompletedDays(data.completedDays || [])
      setCurrentDay(data.currentDay || 1)
    }
  }, [])

  const toggleDayComplete = (dayNumber: number) => {
    const newCompleted = completedDays.includes(dayNumber)
      ? completedDays.filter(d => d !== dayNumber)
      : [...completedDays, dayNumber]
    
    setCompletedDays(newCompleted)
    
    // Save to localStorage
    localStorage.setItem('purpleWingsChallenge', JSON.stringify({
      completedDays: newCompleted,
      currentDay: Math.max(currentDay, dayNumber + 1)
    }))
    
    // Update stats
    setUserStats(prev => ({
      ...prev,
      saved: prev.saved + (dayNumber === 3 ? 67 : 25), // Average savings
      timeSpent: prev.timeSpent + 20,
      streak: prev.streak + 1
    }))
  }

  const joinChallenge = async () => {
    if (!email) return
    
    setIsJoining(true)
    
    try {
      const supabase = createClient()
      // Add to challenge participants
      const { error } = await supabase
        .from('challenge_participants')
        .insert({
          email,
          challenge_type: 'purple-wings-7-day',
          joined_at: new Date().toISOString(),
          current_day: 1,
          completed_days: []
        })
      
      if (!error) {
        // Save user progress
        localStorage.setItem('purpleWingsChallenge', JSON.stringify({
          email,
          completedDays: [],
          currentDay: 1
        }))
        
        setShowShareModal(false)
      }
    } catch (error) {
      console.error('Error joining challenge:', error)
    } finally {
      setIsJoining(false)
    }
  }

  const shareProgress = () => {
    const text = `I'm on day ${Math.max(...completedDays, 1)} of the Purple Wings 7-Day Financial Freedom Challenge! Already saved $${userStats.saved} and feeling empowered. Join me! #PurpleWingsChallenge`
    
    if (navigator.share) {
      navigator.share({
        title: 'Purple Wings Challenge',
        text: text,
        url: window.location.href
      })
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(`${text} ${window.location.href}`)
      alert('Link copied to clipboard!')
    }
  }

  const progressPercentage = (completedDays.length / 7) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <span className="bg-yellow-400 text-purple-900 px-4 py-2 rounded-full text-sm font-bold">
              7-Day Challenge
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Purple Wings Financial Freedom Challenge
          </h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
            Transform your financial life in just 7 days. Small daily actions that create lasting change. 
            Join 1,247 women already taking control of their financial future.
          </p>
          
          {/* Community Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <Users className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{COMMUNITY_STATS.participants}</div>
              <div className="text-purple-200 text-sm">Women Joined</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <CheckCircle className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{COMMUNITY_STATS.completed}</div>
              <div className="text-purple-200 text-sm">Completed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <TrendingUp className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{COMMUNITY_STATS.totalSaved}</div>
              <div className="text-purple-200 text-sm">Total Saved</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <Award className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{COMMUNITY_STATS.countries}</div>
              <div className="text-purple-200 text-sm">Countries</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowShareModal(true)}
              className="bg-yellow-400 text-purple-900 px-8 py-4 rounded-lg font-bold hover:bg-yellow-300 transition-colors"
            >
              Join the Challenge
            </button>
            <button
              onClick={shareProgress}
              className="bg-white/20 backdrop-blur text-white px-8 py-4 rounded-lg font-bold hover:bg-white/30 transition-colors flex items-center justify-center"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share Challenge
            </button>
          </div>
        </div>
      </section>

      {/* Progress Tracker */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Progress</h2>
            <div className="bg-gray-200 rounded-full h-4 mb-4">
              <div 
                className="bg-gradient-to-r from-purple-600 to-indigo-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="text-xl text-gray-600">
              {completedDays.length} of 7 days completed
            </p>
          </div>

          {/* User Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-green-600">${userStats.saved}</div>
              <div className="text-green-800">Money Saved</div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-purple-600">{userStats.timeSpent}min</div>
              <div className="text-purple-800">Time Invested</div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-yellow-600">{userStats.streak}</div>
              <div className="text-yellow-800">Day Streak</div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge Days */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              7 Days to Financial Freedom
            </h2>
            <p className="text-xl text-gray-600">
              Each day builds on the last. Complete in order for maximum impact.
            </p>
          </div>

          <div className="space-y-6">
            {CHALLENGE_DAYS.map((day) => {
              const isCompleted = completedDays.includes(day.day)
              const isCurrent = day.day === currentDay
              const isFuture = day.day > currentDay

              return (
                <div
                  key={day.day}
                  className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all ${
                    isCompleted ? 'ring-2 ring-green-500' : isCurrent ? 'ring-2 ring-purple-500' : ''
                  } ${isFuture ? 'opacity-60' : ''}`}
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <button
                        onClick={() => !isFuture && toggleDayComplete(day.day)}
                        className={`mt-1 flex-shrink-0 ${
                          isFuture ? 'cursor-not-allowed' : 'cursor-pointer'
                        }`}
                        disabled={isFuture}
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        ) : (
                          <Circle className="w-6 h-6 text-gray-400" />
                        )}
                      </button>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                            Day {day.day}
                          </span>
                          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                            {day.category}
                          </span>
                          <span className="text-gray-500 text-sm">
                            {day.time}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {day.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-3">
                          {day.description}
                        </p>
                        
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                          <p className="text-purple-800 font-medium">
                            Today's Action: {day.action}
                          </p>
                        </div>
                        
                        {isCompleted && (
                          <div className="mt-3 text-green-600 font-medium">
                            Completed! Great job taking control of your finances.
                          </div>
                        )}
                        
                        {isCurrent && !isCompleted && (
                          <div className="mt-3 text-purple-600 font-medium">
                            Today's challenge - you've got this!
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Completion Celebration */}
      {completedDays.length === 7 && (
        <section className="py-16 bg-gradient-to-br from-green-600 to-emerald-800 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-6xl mb-6">"\ud83c\udf89"</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Congratulations! You Did It!
            </h2>
            <p className="text-xl text-green-100 mb-8">
              You've completed the 7-Day Purple Wings Challenge! You've saved money, 
              built habits, and taken control of your financial future.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold mb-4">Your Achievements</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold">${userStats.saved}</div>
                  <div className="text-green-200">Money Saved</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">{userStats.timeSpent}min</div>
                  <div className="text-green-200">Time Invested</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">7</div>
                  <div className="text-green-200">Days Completed</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/courses" className="bg-yellow-400 text-green-900 px-8 py-4 rounded-lg font-bold hover:bg-yellow-300 transition-colors">
                Continue Learning
              </Link>
              <button
                onClick={shareProgress}
                className="bg-white/20 backdrop-blur text-white px-8 py-4 rounded-lg font-bold hover:bg-white/30 transition-colors"
              >
                Share Your Success
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Join Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Join the Challenge
            </h3>
            <p className="text-gray-600 mb-6">
              Enter your email to start your 7-day financial freedom journey. 
              We'll send you daily reminders and support.
            </p>
            
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            
            <div className="flex gap-4">
              <button
                onClick={joinChallenge}
                disabled={!email || isJoining}
                className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isJoining ? 'Joining...' : 'Join Challenge'}
              </button>
              <button
                onClick={() => setShowShareModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
