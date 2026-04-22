'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { AlertCircle, Clock, BookOpen, Target, Zap, Brain, Heart } from 'lucide-react'

// Test Case 1: 34-year-old woman - curious but nervous, easily distracted, trying to break through financial hurdles
export default function YoungProfessionalWomanTestCase() {
  const [currentStep, setCurrentStep] = useState(0)
  const [userProfile, setUserProfile] = useState({
    age: 34,
    name: "Sarah",
    profession: "Marketing Manager",
    income: "$65,000",
    financialStress: 6, // 1-10 scale
    learningStyle: "visual",
    attentionSpan: "short",
    motivation: "curious_but_nervous",
    completedCourses: 0,
    startedCourses: 2,
    timeSpent: 45, // minutes
    distractions: 5,
    lastActive: new Date()
  })

  const [issues, setIssues] = useState<string[]>([])
  const [recommendations, setRecommendations] = useState<string[]>([])

  const TEST_SCENARIOS = [
    {
      step: 1,
      title: "First Visit & Sign-up",
      description: "34-year-old Sarah discovers The Purple Wings, feels overwhelmed but intrigued",
      actions: [
        "Lands on homepage from Instagram ad",
        "Scrolls through hero section quickly", 
        "Notices '500+ Women' social proof",
        "Clicks on 'Stories' to see relatable content",
        "Signs up with email/password"
      ],
      expectedBehavior: "Should feel welcomed, not overwhelmed",
      timeSpent: 8
    },
    {
      step: 2,
      title: "Initial Assessment",
      description: "Sarah takes personality quiz to understand her financial situation",
      actions: [
        "Starts 'Financial Personality Assessment'",
        "Gets distracted by phone notification (3 min)",
        "Returns and completes quiz in 12 minutes",
        "Receives 'Balanced Builder' personality type"
      ],
      expectedBehavior: "Quick, engaging quiz with immediate feedback",
      timeSpent: 15
    },
    {
      step: 3,
      title: "Course Exploration",
      description: "Sarah browses courses, feels overwhelmed by options",
      actions: [
        "Views 'Courses' page - sees 23 courses",
        "Clicks 'Budgeting Basics' - seems manageable",
        "Starts first lesson, reads 2 paragraphs",
        "Gets distracted by work email",
        "Leaves tab open, doesn't return for 2 days"
      ],
      expectedBehavior: "Clear path, easy resume, progress saved",
      timeSpent: 12
    },
    {
      step: 4,
      title: "Return & Engagement",
      description: "Sarah returns, tries to pick up where she left off",
      actions: [
        "Returns after 2 days via email reminder",
        "Can't find where she left off",
        "Starts over with lesson 1",
        "Completes 15 minutes before getting distracted",
        "Bookmarks page to return later"
      ],
      expectedBehavior: "Seamless resume, clear progress indicators",
      timeSpent: 10
    }
  ]

  const runTestStep = (stepIndex: number) => {
    const step = TEST_SCENARIOS[stepIndex]
    const newIssues: string[] = []
    const newRecommendations: string[] = []

    // Simulate user behavior and identify issues
    switch (stepIndex) {
      case 0: // First Visit
        if (userProfile.attentionSpan === 'short') {
          newIssues.push("Homepage too text-heavy for short attention span")
          newRecommendations.push("Add 30-second video explainer")
          newRecommendations.push("Implement 'Quick Start' tour")
        }
        if (userProfile.motivation === 'curious_but_nervous') {
          newIssues.push("No clear entry point for nervous beginners")
          newRecommendations.push("Add 'Start Here' guided path")
          newRecommendations.push("Show time commitment upfront")
        }
        break

      case 1: // Assessment
        if (userProfile.attentionSpan === 'short') {
          newIssues.push("Quiz too long for easily distracted users")
          newRecommendations.push("Break quiz into 3-minute micro-sessions")
          newRecommendations.push("Add progress saving mid-quiz")
        }
        break

      case 2: // Course Exploration
        if (userProfile.attentionSpan === 'short') {
          newIssues.push("23 courses overwhelming - analysis paralysis")
          newRecommendations.push("Create 'Starter Path' with 3 courses only")
          newRecommendations.push("Add estimated time per course")
        }
        newIssues.push("No 'resume where left off' functionality")
        newRecommendations.push("Implement auto-save progress every 30 seconds")
        newRecommendations.push("Send 'Come back' notifications with direct link")
        break

      case 3: // Return & Engagement
        newIssues.push("Lost progress - had to restart")
        newRecommendations.push("Persistent progress saving")
        newRecommendations.push("Email reminders with exact lesson link")
        newRecommendations.push("Dashboard showing 'Continue Learning'")
        break
    }

    setIssues(newIssues)
    setRecommendations(newRecommendations)
    setCurrentStep(stepIndex + 1)
  }

  const implementFixes = () => {
    // This would implement the recommended fixes
    console.log("Implementing fixes for 34-year-old user persona...")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-purple-600 to-indigo-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-2xl text-purple-900">👩‍💼</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">Test Case: Sarah, 34</h1>
              <p className="text-purple-100">Marketing Manager • Curious but Nervous • Easily Distracted</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <Brain className="w-6 h-6 mb-2" />
              <div className="text-sm">Learning Style</div>
              <div className="font-semibold">Visual, Short Attention</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <Heart className="w-6 h-6 mb-2" />
              <div className="text-sm">Motivation</div>
              <div className="font-semibold">Curious but Nervous</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <Target className="w-6 h-6 mb-2" />
              <div className="text-sm">Goal</div>
              <div className="font-semibold">Break Through Hurdles</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <Clock className="w-6 h-6 mb-2" />
              <div className="text-sm">Time Available</div>
              <div className="font-semibold">15-30 min sessions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Test Progress */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">User Journey Test</h2>
            <p className="text-xl text-gray-600">Simulating Sarah's experience with The Purple Wings</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Test Scenarios */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Test Steps</h3>
              <div className="space-y-4">
                {TEST_SCENARIOS.map((scenario, index) => (
                  <div
                    key={index}
                    className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all ${
                      currentStep > index ? 'bg-green-50 border-2 border-green-500' : 
                      currentStep === index ? 'ring-2 ring-purple-500' : 'hover:shadow-xl'
                    }`}
                    onClick={() => currentStep === index && runTestStep(index)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                          Step {scenario.step}
                        </span>
                        <span className="text-sm text-gray-500">{scenario.timeSpent} min</span>
                      </div>
                      {currentStep > index && (
                        <div className="text-green-600">
                          ✓ Tested
                        </div>
                      )}
                    </div>
                    
                    <h4 className="font-bold text-gray-900 mb-2">{scenario.title}</h4>
                    <p className="text-gray-600 text-sm mb-3">{scenario.description}</p>
                    
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm font-semibold text-gray-700 mb-2">Actions:</div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {scenario.actions.map((action, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-purple-600">•</span>
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mt-3 text-sm text-purple-600">
                      Expected: {scenario.expectedBehavior}
                    </div>
                    
                    {currentStep === index && (
                      <button
                        onClick={() => runTestStep(index)}
                        className="w-full mt-4 bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                      >
                        Run This Test
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Issues & Recommendations */}
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-red-500" />
                  Issues Identified
                </h3>
                {issues.length === 0 ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                    <div className="text-green-600">No issues found in this step</div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {issues.map((issue, index) => (
                      <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="text-red-800 font-medium">{issue}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Zap className="w-6 h-6 text-yellow-500" />
                  Recommendations
                </h3>
                {recommendations.length === 0 ? (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                    <div className="text-gray-600">No recommendations for this step</div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recommendations.map((rec, index) => (
                      <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="text-yellow-800 font-medium">{rec}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {currentStep > 0 && (
                <div className="mt-6">
                  <button
                    onClick={implementFixes}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors"
                  >
                    Implement All Fixes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* User Profile Summary */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Sarah's User Profile</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-purple-50 rounded-xl p-6">
              <h4 className="font-semibold text-purple-900 mb-3">Demographics</h4>
              <div className="space-y-2 text-sm">
                <div><strong>Age:</strong> 34</div>
                <div><strong>Profession:</strong> Marketing Manager</div>
                <div><strong>Income:</strong> $65,000</div>
                <div><strong>Location:</strong> Boston, MA</div>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-6">
              <h4 className="font-semibold text-blue-900 mb-3">Behavior</h4>
              <div className="space-y-2 text-sm">
                <div><strong>Attention Span:</strong> Short (15-30 min)</div>
                <div><strong>Learning Style:</strong> Visual</div>
                <div><strong>Device:</strong> Mobile-first</div>
                <div><strong>Time:</strong> Evenings/Weekends</div>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-xl p-6">
              <h4 className="font-semibold text-green-900 mb-3">Motivation</h4>
              <div className="space-y-2 text-sm">
                <div><strong>Primary:</strong> Curious but nervous</div>
                <div><strong>Financial Stress:</strong> 6/10</div>
                <div><strong>Goals:</strong> Build confidence</div>
                <div><strong>Barriers:</strong> Fear, distraction</div>
              </div>
            </div>
            
            <div className="bg-yellow-50 rounded-xl p-6">
              <h4 className="font-semibold text-yellow-900 mb-3">Current Status</h4>
              <div className="space-y-2 text-sm">
                <div><strong>Courses Started:</strong> 2</div>
                <div><strong>Courses Completed:</strong> 0</div>
                <div><strong>Time Spent:</strong> 45 minutes</div>
                <div><strong>Last Active:</strong> 2 days ago</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
