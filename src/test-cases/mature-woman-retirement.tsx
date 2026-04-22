'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { AlertCircle, Clock, BookOpen, Target, Zap, Brain, Heart, Calendar, DollarSign, Shield } from 'lucide-react'

// Test Case 2: 53-year-old woman - desperate, scared of aging without solving finance, ready to commit
export default function MatureWomanRetirementTestCase() {
  const [currentStep, setCurrentStep] = useState(0)
  const [userProfile, setUserProfile] = useState({
    age: 53,
    name: "Maria",
    profession: "Healthcare Administrator",
    income: "$78,000",
    financialStress: 9, // 1-10 scale
    learningStyle: "detailed",
    attentionSpan: "long",
    motivation: "desperate_committed",
    completedCourses: 0,
    startedCourses: 0,
    timeSpent: 0, // minutes
    urgency: "high",
    primaryGoal: "retirement_preparation",
    bankMeetingPrep: false,
    retirementQuestions: []
  })

  const [issues, setIssues] = useState<string[]>([])
  const [recommendations, setRecommendations] = useState<string[]>([])

  const TEST_SCENARIOS = [
    {
      step: 1,
      title: "Urgent Discovery & Sign-up",
      description: "53-year-old Maria finds The Purple Wings in panic about retirement",
      actions: [
        "Lands on homepage from Google search 'women retirement planning'",
        "Immediately looks for retirement-specific content",
        "Scans for '50s' life-stage information",
        "Signs up quickly with personal email",
        "Looks for retirement assessment or planning tools"
      ],
      expectedBehavior: "Immediate retirement-focused content, clear urgency",
      timeSpent: 5
    },
    {
      step: 2,
      title: "Retirement Assessment & Planning",
      description: "Maria seeks comprehensive retirement evaluation and guidance",
      actions: [
        "Takes financial assessment focusing on retirement readiness",
        "Looks for Social Security optimization guidance",
        "Searches for catch-up contributions strategies",
        "Seeks healthcare cost planning for retirement",
        "Wants bank meeting preparation materials"
      ],
      expectedBehavior: "Comprehensive retirement planning tools and resources",
      timeSpent: 25
    },
    {
      step: 3,
      title: "Deep Course Engagement",
      description: "Maria commits to learning everything about retirement planning",
      actions: [
        "Enrolls in 'Retirement Planning' course immediately",
        "Completes entire course in 3 sessions (2 hours total)",
        "Takes detailed notes on Social Security timing",
        "Downloads retirement planning worksheets",
        "Looks for advanced retirement income strategies"
      ],
      expectedBehavior: "In-depth retirement content with actionable strategies",
      timeSpent: 120
    },
    {
      step: 4,
      title: "Bank Meeting Preparation",
      description: "Maria prepares for critical bank meeting about retirement options",
      actions: [
        "Seeks 'Bank Meeting Preparation' resources",
        "Wants checklist of retirement questions to ask",
        "Looks for current retirement account optimization",
        "Researches required minimum distributions",
        "Prepares questions about annuities and income streams"
      ],
      expectedBehavior: "Comprehensive meeting prep tools and question guides",
      timeSpent: 45
    }
  ]

  const runTestStep = (stepIndex: number) => {
    const step = TEST_SCENARIOS[stepIndex]
    const newIssues: string[] = []
    const newRecommendations: string[] = []

    // Simulate user behavior and identify issues
    switch (stepIndex) {
      case 0: // Urgent Discovery
        if (userProfile.motivation === 'desperate_committed') {
          newIssues.push("Homepage doesn't immediately address retirement urgency")
          newRecommendations.push("Add prominent 'Retirement Planning' CTA for 50+ users")
          newRecommendations.push("Create 'Retirement Readiness Quiz' prominently featured")
        }
        if (userProfile.age >= 50) {
          newIssues.push("No age-targeted content for women 50+")
          newRecommendations.push("Implement age detection for personalized content")
          newRecommendations.push("Add '50s and 60s' life-stage navigation")
        }
        break

      case 1: // Retirement Assessment
        if (userProfile.primaryGoal === 'retirement_preparation') {
          newIssues.push("Generic assessment doesn't address retirement-specific concerns")
          newRecommendations.push("Create dedicated 'Retirement Readiness Assessment'")
          newRecommendations.push("Add Social Security optimization calculator")
          newRecommendations.push("Include healthcare cost planning tools")
        }
        if (userProfile.urgency === 'high') {
          newIssues.push("No clear timeline or action plan for retirement prep")
          newRecommendations.push("Add 'Retirement Countdown' feature")
          newRecommendations.push("Create step-by-step retirement planning roadmap")
        }
        break

      case 2: // Deep Course Engagement
        if (userProfile.learningStyle === 'detailed') {
          newIssues.push("Retirement course lacks depth for committed learners")
          newRecommendations.push("Add advanced retirement income strategies")
          newRecommendations.push("Include detailed case studies for 50s women")
          newRecommendations.push("Provide downloadable retirement planning templates")
        }
        newIssues.push("No integration with actual retirement account providers")
        newRecommendations.push("Add retirement account aggregation tools")
        newRecommendations.push("Create 'Retirement Account Optimizer' feature")
        break

      case 3: // Bank Meeting Preparation
        if (userProfile.bankMeetingPrep === false) {
          newIssues.push("No resources for preparing for financial institution meetings")
          newRecommendations.push("Create 'Bank Meeting Prep Kit' with checklists")
          newRecommendations.push("Add 'Questions to Ask Your Banker' guide")
          newRecommendations.push("Provide retirement account review templates")
        }
        newIssues.push("Missing specific guidance on required minimum distributions")
        newRecommendations.push("Add RMD calculator and planning tools")
        newRecommendations.push("Create 'Retirement Income Planning' workshop")
        break
    }

    setIssues(newIssues)
    setRecommendations(newRecommendations)
    setCurrentStep(stepIndex + 1)
  }

  const implementFixes = () => {
    // This would implement the recommended fixes
    console.log("Implementing fixes for 53-year-old retirement-focused user persona...")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-purple-600 to-indigo-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-2xl text-purple-900">🏦</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">Test Case: Maria, 53</h1>
              <p className="text-purple-100">Healthcare Administrator • Desperate & Scared • Retirement Focused</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <Brain className="w-6 h-6 mb-2" />
              <div className="text-sm">Learning Style</div>
              <div className="font-semibold">Detailed, Committed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <Heart className="w-6 h-6 mb-2" />
              <div className="text-sm">Motivation</div>
              <div className="font-semibold">Desperate, Ready</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <Target className="w-6 h-6 mb-2" />
              <div className="text-sm">Primary Goal</div>
              <div className="font-semibold">Retirement Security</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <Clock className="w-6 h-6 mb-2" />
              <div className="text-sm">Time Available</div>
              <div className="font-semibold">Committed Hours</div>
            </div>
          </div>
        </div>
      </section>

      {/* Test Progress */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Retirement Planning User Journey Test</h2>
            <p className="text-xl text-gray-600">Simulating Maria's urgent retirement preparation experience</p>
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
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Maria's User Profile</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-purple-50 rounded-xl p-6">
              <h4 className="font-semibold text-purple-900 mb-3">Demographics</h4>
              <div className="space-y-2 text-sm">
                <div><strong>Age:</strong> 53</div>
                <div><strong>Profession:</strong> Healthcare Administrator</div>
                <div><strong>Income:</strong> $78,000</div>
                <div><strong>Location:</strong> Worcester, MA</div>
              </div>
            </div>
            
            <div className="bg-red-50 rounded-xl p-6">
              <h4 className="font-semibold text-red-900 mb-3">Urgency Factors</h4>
              <div className="space-y-2 text-sm">
                <div><strong>Financial Stress:</strong> 9/10 (High)</div>
                <div><strong>Retirement Anxiety:</strong> Severe</div>
                <div><strong>Time Pressure:</strong> 12 years to retirement</div>
                <div><strong>Commitment:</strong> 100% Ready</div>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-xl p-6">
              <h4 className="font-semibold text-green-900 mb-3">Learning Goals</h4>
              <div className="space-y-2 text-sm">
                <div><strong>Primary:</strong> Retirement Planning</div>
                <div><strong>Social Security:</strong> Optimization Strategies</div>
                <div><strong>Healthcare:</strong> Medicare Planning</div>
                <div><strong>Bank Meeting:</strong> Preparation Needed</div>
              </div>
            </div>
            
            <div className="bg-yellow-50 rounded-xl p-6">
              <h4 className="font-semibold text-yellow-900 mb-3">Readiness Level</h4>
              <div className="space-y-2 text-sm">
                <div><strong>Learning Style:</strong> Detailed, In-depth</div>
                <div><strong>Time Commitment:</strong> 10+ hours/week</div>
                <div><strong>Course Completion:</strong> Will finish all</div>
                <div><strong>Tools Needed:</strong> Calculators, Templates</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Retirement Planning Focus Areas */}
      <section className="py-16 bg-gradient-to-br from-purple-600 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Maria's Critical Retirement Planning Needs</h2>
            <p className="text-xl text-purple-100">What a 53-year-old woman desperately needs to know</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Calendar className="w-8 h-8 mb-3 text-yellow-400" />
              <h3 className="text-xl font-bold mb-2">Timeline Planning</h3>
              <p className="text-purple-100 text-sm mb-3">Only 12 years until traditional retirement age</p>
              <ul className="text-sm text-purple-200 space-y-1">
                <li>• Catch-up contribution strategies</li>
                <li>• Retirement savings acceleration</li>
                <li>• Timeline optimization</li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <DollarSign className="w-8 h-8 mb-3 text-yellow-400" />
              <h3 className="text-xl font-bold mb-2">Income Planning</h3>
              <p className="text-purple-100 text-sm mb-3">Multiple retirement income streams needed</p>
              <ul className="text-sm text-purple-200 space-y-1">
                <li>• Social Security optimization</li>
                <li>• 401(k)/IRA strategies</li>
                <li>• Annuity evaluation</li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Shield className="w-8 h-8 mb-3 text-yellow-400" />
              <h3 className="text-xl font-bold mb-2">Healthcare Planning</h3>
              <p className="text-purple-100 text-sm mb-3">Medicare and healthcare cost planning</p>
              <ul className="text-sm text-purple-200 space-y-1">
                <li>• Medicare enrollment timeline</li>
                <li>• Long-term care options</li>
                <li>• Healthcare budget planning</li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <BookOpen className="w-8 h-8 mb-3 text-yellow-400" />
              <h3 className="text-xl font-bold mb-2">Bank Meeting Prep</h3>
              <p className="text-purple-100 text-sm mb-3">Critical questions for financial institutions</p>
              <ul className="text-sm text-purple-200 space-y-1">
                <li>• Account optimization questions</li>
                <li>• RMD planning guidance</li>
                <li>• Investment strategy review</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
