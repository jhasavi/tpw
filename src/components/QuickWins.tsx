'use client'

import { useState } from 'react'
import Link from 'next/link'

const QUICK_WINS = [
  {
    id: 1,
    title: '15-Minute Budget Review',
    description: 'Quick audit of your spending to find $100+ in monthly savings',
    time: '15 minutes',
    difficulty: 'Easy',
    category: 'Budgeting',
    impact: 'Save $100+/month',
    steps: [
      'Download last month\'s bank statement',
      'Highlight subscriptions and recurring charges',
      'Cancel 2-3 things you don\'t really use',
      'Set up automatic transfer for saved amount'
    ],
    tools: ['Bank statement', 'Budget app (optional)'],
    result: 'Average savings: $127/month'
  },
  {
    id: 2,
    title: 'Emergency Fund Starter',
    description: 'Build your first $1,000 emergency buffer in 30 days',
    time: '5 minutes setup',
    difficulty: 'Easy',
    category: 'Savings',
    impact: 'Financial security buffer',
    steps: [
      'Open separate high-yield savings account',
      'Set up automatic transfer: $25/day or $175/week',
      'Track progress with simple calendar checkmarks',
      'Celebrate when you hit $1,000!'
    ],
    tools: ['Bank account', 'Calendar'],
    result: 'Complete emergency fund in 2 months'
  },
  {
    id: 3,
    title: 'Credit Score Boost',
    description: 'Improve your credit score by 20+ points in 60 days',
    time: '30 minutes',
    difficulty: 'Medium',
    category: 'Credit',
    impact: 'Better loan rates, lower insurance costs',
    steps: [
      'Check your free credit reports (all 3 bureaus)',
      'Dispute any errors you find',
      'Pay down credit cards below 30% utilization',
      'Set up automatic minimum payments'
    ],
    tools: ['AnnualCreditReport.com', 'Credit cards'],
    result: 'Average score increase: 28 points'
  },
  {
    id: 4,
    title: 'Retirement Quick Start',
    description: 'Set up retirement savings even if you think it\'s too late',
    time: '20 minutes',
    difficulty: 'Easy',
    category: 'Retirement',
    impact: 'Tax benefits + compound growth',
    steps: [
      'Open or increase 401(k) contribution',
      'Open Roth IRA if you don\'t have one',
      'Set up automatic 10% contribution',
      'Choose target-date fund for simplicity'
    ],
    tools: ['401(k) portal', 'IRA provider'],
    result: 'Potential retirement fund: $500K+'
  },
  {
    id: 5,
    title: 'Bill Negotiation',
    description: 'Lower monthly bills by calling providers (yes, it works!)',
    time: '45 minutes',
    difficulty: 'Medium',
    category: 'Savings',
    impact: 'Save $50-200/month',
    steps: [
      'List all monthly bills and providers',
      'Research competitor rates for each service',
      'Call current providers with competitor offers',
      'Ask for loyalty discounts or promotions'
    ],
    tools: ['Phone', 'Current bills', 'Internet research'],
    result: 'Average savings: $89/month'
  },
  {
    id: 6,
    title: 'Subscriptions Audit',
    description: 'Find and eliminate forgotten subscriptions eating your budget',
    time: '10 minutes',
    difficulty: 'Easy',
    category: 'Budgeting',
    impact: 'Save $30-100/month',
    steps: [
      'Check bank statements for recurring charges',
      'List all subscriptions and monthly costs',
      'Cancel anything you haven\'t used in 30 days',
      'Set calendar reminder to review quarterly'
    ],
    tools: ['Bank statements', 'Phone'],
    result: 'Average savings: $67/month'
  }
]

export default function QuickWins() {
  const [selectedWin, setSelectedWin] = useState<number | null>(null)
  const [completedWins, setCompletedWins] = useState<number[]>([])

  const toggleComplete = (id: number) => {
    setCompletedWins(prev => 
      prev.includes(id) 
        ? prev.filter(wId => wId !== id)
        : [...prev, id]
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Quick Financial Wins
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Small actions you can complete this week that add up to big results. 
          No finance degree required - just 15-45 minutes each.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
            {completedWins.length} Completed
          </div>
          <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold">
            {QUICK_WINS.length - completedWins.length} Available
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {QUICK_WINS.map((win) => (
          <div 
            key={win.id}
            className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer ${
              completedWins.includes(win.id) ? 'ring-2 ring-green-500' : ''
            }`}
            onClick={() => setSelectedWin(selectedWin === win.id ? null : win.id)}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    win.difficulty === 'Easy' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {win.difficulty}
                  </span>
                  <span className="text-sm text-gray-500">{win.time}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleComplete(win.id)
                  }}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    completedWins.includes(win.id)
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-300 hover:border-purple-500'
                  }`}
                >
                  {completedWins.includes(win.id) && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              </div>

              <h3 className="font-bold text-gray-900 mb-2">{win.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{win.description}</p>
              
              <div className="flex items-center justify-between text-sm mb-4">
                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">
                  {win.category}
                </span>
                <span className="text-green-600 font-semibold">
                  {win.impact}
                </span>
              </div>

              {selectedWin === win.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Steps:</h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                      {win.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">What you'll need:</h4>
                    <div className="flex flex-wrap gap-2">
                      {win.tools.map((tool, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-green-800 text-sm font-medium">
                      Expected result: {win.result}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {completedWins.length > 0 && (
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Amazing Progress! {completedWins.length} Wins Completed
          </h3>
          <p className="text-purple-100 mb-6">
            You're taking real control of your finances. Ready for the next level?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quiz/personality" className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
              Take Full Assessment
            </Link>
            <Link href="/dashboard" className="bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-800 transition-colors">
              Track Your Progress
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
