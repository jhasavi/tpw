'use client'

import { useState } from 'react'
import Link from 'next/link'

// ─── Budget Calculator ───────────────────────────────────────────────────────
function BudgetCalculator() {
  const [income, setIncome] = useState('')
  const [housing, setHousing] = useState('')
  const [food, setFood] = useState('')
  const [transport, setTransport] = useState('')
  const [utilities, setUtilities] = useState('')
  const [other, setOther] = useState('')

  const net = Number(income)
  const totalExpenses =
    Number(housing) + Number(food) + Number(transport) + Number(utilities) + Number(other)
  const remaining = net - totalExpenses
  const savingsRate = net > 0 ? ((remaining / net) * 100).toFixed(1) : '0'

  const recommended = [
    { label: 'Housing', pct: 30, amount: Math.round(net * 0.3) },
    { label: 'Food', pct: 15, amount: Math.round(net * 0.15) },
    { label: 'Transport', pct: 15, amount: Math.round(net * 0.15) },
    { label: 'Savings', pct: 20, amount: Math.round(net * 0.2) },
    { label: 'Other', pct: 20, amount: Math.round(net * 0.2) },
  ]

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-bold text-gray-800 mb-4">Your Monthly Budget</h3>
          <div className="space-y-3">
            {[
              { label: '💵 Monthly Take-Home Income', val: income, set: setIncome, placeholder: 'e.g., 4500' },
              { label: '🏠 Housing (rent/mortgage)', val: housing, set: setHousing, placeholder: 'e.g., 1400' },
              { label: '🛒 Food & Groceries', val: food, set: setFood, placeholder: 'e.g., 600' },
              { label: '🚗 Transportation', val: transport, set: setTransport, placeholder: 'e.g., 400' },
              { label: '💡 Utilities & Bills', val: utilities, set: setUtilities, placeholder: 'e.g., 200' },
              { label: '📦 Other Expenses', val: other, set: setOther, placeholder: 'e.g., 300' },
            ].map((field) => (
              <div key={field.label}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400">$</span>
                  <input
                    type="number"
                    value={field.val}
                    onChange={(e) => field.set(e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full pl-7 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-bold text-gray-800 mb-4">Your Results</h3>
          <div className="space-y-3">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Total Expenses</span>
                <span className="font-bold text-red-600">${totalExpenses.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Monthly Income</span>
                <span className="font-bold text-green-600">${net.toLocaleString()}</span>
              </div>
              <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between">
                <span className="text-gray-800 font-bold">Remaining / Savings</span>
                <span className={`font-bold text-xl ${remaining >= 0 ? 'text-purple-700' : 'text-red-600'}`}>
                  ${remaining.toLocaleString()}
                </span>
              </div>
            </div>
            <div className={`rounded-xl p-4 ${remaining >= 0 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="text-sm font-semibold mb-1">Savings Rate</div>
              <div className={`text-3xl font-extrabold ${remaining >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                {savingsRate}%
              </div>
              <p className="text-xs text-gray-600 mt-1">
                {Number(savingsRate) >= 20
                  ? '🎉 Excellent! You\'re hitting the 20% savings target.'
                  : Number(savingsRate) >= 10
                  ? '👍 Good start. Try to work toward 20%.'
                  : '💡 Aim to cut expenses or increase income to save more.'}
              </p>
            </div>
            {net > 0 && (
              <div>
                <h4 className="text-sm font-bold text-gray-700 mb-2">50/30/20 Recommended Allocation</h4>
                {recommended.map((r) => (
                  <div key={r.label} className="flex justify-between text-sm py-1 border-b border-gray-100">
                    <span className="text-gray-600">{r.label} ({r.pct}%)</span>
                    <span className="font-semibold text-purple-700">${r.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Debt Payoff Calculator ──────────────────────────────────────────────────
function DebtPayoffCalculator() {
  const [balance, setBalance] = useState('')
  const [rate, setRate] = useState('')
  const [payment, setPayment] = useState('')

  const b = Number(balance)
  const r = Number(rate) / 100 / 12
  const p = Number(payment)

  let months = 0
  let totalInterest = 0
  if (b > 0 && r > 0 && p > b * r) {
    months = Math.ceil(Math.log(p / (p - b * r)) / Math.log(1 + r))
    totalInterest = Math.round(p * months - b)
  }

  const minPayment = b > 0 && r > 0 ? Math.round(b * r * 1.01) : 0

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-bold text-gray-800 mb-4">Your Debt Details</h3>
          <div className="space-y-4">
            {[
              { label: '💳 Current Balance', val: balance, set: setBalance, suffix: '$', placeholder: 'e.g., 8500', prefix: true },
              { label: '📊 Annual Interest Rate (APR)', val: rate, set: setRate, suffix: '%', placeholder: 'e.g., 19.9', prefix: false },
              { label: '💸 Monthly Payment', val: payment, set: setPayment, suffix: '$', placeholder: 'e.g., 250', prefix: true },
            ].map((field) => (
              <div key={field.label}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                <div className="relative">
                  {field.prefix && <span className="absolute left-3 top-2.5 text-gray-400">{field.suffix}</span>}
                  <input
                    type="number"
                    value={field.val}
                    onChange={(e) => field.set(e.target.value)}
                    placeholder={field.placeholder}
                    className={`w-full py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none ${field.prefix ? 'pl-7 pr-4' : 'pl-4 pr-7'}`}
                  />
                  {!field.prefix && <span className="absolute right-3 top-2.5 text-gray-400">{field.suffix}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-bold text-gray-800 mb-4">Your Payoff Plan</h3>
          {b > 0 && p > 0 ? (
            <div className="space-y-3">
              {p <= b * r ? (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-700 font-semibold">⚠️ Your payment is too low</p>
                  <p className="text-sm text-red-600 mt-1">
                    Minimum to make progress: <strong>${minPayment.toLocaleString()}/mo</strong>
                  </p>
                </div>
              ) : (
                <>
                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                    <div className="text-sm text-gray-600 mb-1">Debt-free in</div>
                    <div className="text-3xl font-extrabold text-purple-700">
                      {months >= 12 ? `${Math.floor(months / 12)}y ${months % 12}m` : `${months} months`}
                    </div>
                  </div>
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                    <div className="text-sm text-gray-600 mb-1">Total interest paid</div>
                    <div className="text-2xl font-bold text-orange-700">${totalInterest.toLocaleString()}</div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="text-sm text-gray-600 mb-1">Total you&apos;ll pay</div>
                    <div className="text-2xl font-bold text-green-700">${(b + totalInterest).toLocaleString()}</div>
                  </div>
                  <p className="text-xs text-gray-500 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    💡 <strong>Tip:</strong> Adding just $50/mo extra payment would save you significant interest. Try it above!
                  </p>
                </>
              )}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-6 text-center text-gray-400">
              Enter your debt details to see your payoff timeline
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Retirement Calculator ────────────────────────────────────────────────────
function RetirementCalculator() {
  const [age, setAge] = useState('')
  const [retireAge, setRetireAge] = useState('67')
  const [saved, setSaved] = useState('')
  const [monthly, setMonthly] = useState('')
  const [returnRate, setReturnRate] = useState('7')

  const years = Number(retireAge) - Number(age)
  const r = Number(returnRate) / 100 / 12
  const months = years * 12
  const pv = Number(saved)
  const pmt = Number(monthly)

  let futureValue = 0
  if (years > 0) {
    const fvExisting = pv * Math.pow(1 + r, months)
    const fvNew = r > 0 ? pmt * ((Math.pow(1 + r, months) - 1) / r) : pmt * months
    futureValue = Math.round(fvExisting + fvNew)
  }

  const annualWithdrawal = Math.round(futureValue * 0.04)
  const monthlyIncome = Math.round(annualWithdrawal / 12)

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-bold text-gray-800 mb-4">Your Retirement Details</h3>
          <div className="space-y-3">
            {[
              { label: '🎂 Current Age', val: age, set: setAge, placeholder: 'e.g., 35', prefix: false, suffix: '' },
              { label: '🏖️ Target Retirement Age', val: retireAge, set: setRetireAge, placeholder: '67', prefix: false, suffix: '' },
              { label: '💰 Current Retirement Savings', val: saved, set: setSaved, placeholder: 'e.g., 25000', prefix: true, suffix: '$' },
              { label: '📅 Monthly Contribution', val: monthly, set: setMonthly, placeholder: 'e.g., 500', prefix: true, suffix: '$' },
              { label: '📈 Expected Annual Return (%)', val: returnRate, set: setReturnRate, placeholder: '7', prefix: false, suffix: '%' },
            ].map((field) => (
              <div key={field.label}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                <div className="relative">
                  {field.prefix && <span className="absolute left-3 top-2.5 text-gray-400">{field.suffix}</span>}
                  <input
                    type="number"
                    value={field.val}
                    onChange={(e) => field.set(e.target.value)}
                    placeholder={field.placeholder}
                    className={`w-full py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none ${field.prefix ? 'pl-7 pr-4' : 'pl-4 pr-4'}`}
                  />
                  {!field.prefix && field.suffix && (
                    <span className="absolute right-3 top-2.5 text-gray-400">{field.suffix}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-bold text-gray-800 mb-4">Retirement Projection</h3>
          {age && retireAge && years > 0 ? (
            <div className="space-y-3">
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                <div className="text-sm text-gray-600">Projected nest egg at {retireAge}</div>
                <div className="text-3xl font-extrabold text-purple-700">${futureValue.toLocaleString()}</div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="text-sm text-gray-600">Estimated monthly income (4% rule)</div>
                <div className="text-2xl font-bold text-green-700">${monthlyIncome.toLocaleString()}/mo</div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="text-sm text-gray-600">Years until retirement</div>
                <div className="text-2xl font-bold text-blue-700">{years} years</div>
              </div>
              <p className="text-xs text-gray-500 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                💡 <strong>Women need more:</strong> On average, women live 5 years longer than men and spend
                12+ years out of the workforce. Consider saving 15–20% of income for retirement.
              </p>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-6 text-center text-gray-400">
              Enter your details to see your retirement projection
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Salary Negotiation Tool ──────────────────────────────────────────────────
function SalaryNegotiationTool() {
  const [currentSalary, setCurrentSalary] = useState('')
  const [targetSalary, setTargetSalary] = useState('')
  const [yearsExperience, setYearsExperience] = useState('')
  const [industry, setIndustry] = useState('technology')

  const current = Number(currentSalary)
  const target = Number(targetSalary)
  const increase = target > current ? target - current : 0
  const increasePct = current > 0 ? ((increase / current) * 100).toFixed(1) : '0'
  const lifetime = increase * 35 // 35 working years

  const scripts = [
    {
      scenario: 'Annual Review',
      script: `"I've done my research and based on my ${yearsExperience || 'X'} years of experience, contributions to [specific project], and current market data for ${industry} roles, I'd like to discuss moving my compensation to $${target ? target.toLocaleString() : 'XX,XXX'}. Can we make that happen?"`,
    },
    {
      scenario: 'New Job Offer',
      script: `"Thank you so much for the offer. I'm very excited about this role. Based on my research and experience, I was expecting something closer to $${target ? target.toLocaleString() : 'XX,XXX'}. Is there flexibility in the base salary?"`,
    },
    {
      scenario: 'Counter After Rejection',
      script: `"I understand the budget constraints. Could we revisit in 6 months with a clear performance plan? In the meantime, are there other forms of compensation — additional vacation, remote flexibility, or a signing bonus — that might be possible?"`,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-bold text-gray-800 mb-4">Your Negotiation Profile</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">💼 Current Annual Salary</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-400">$</span>
                <input
                  type="number"
                  value={currentSalary}
                  onChange={(e) => setCurrentSalary(e.target.value)}
                  placeholder="e.g., 65000"
                  className="w-full pl-7 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">🎯 Target Salary</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-400">$</span>
                <input
                  type="number"
                  value={targetSalary}
                  onChange={(e) => setTargetSalary(e.target.value)}
                  placeholder="e.g., 75000"
                  className="w-full pl-7 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">⭐ Years of Experience</label>
              <input
                type="number"
                value={yearsExperience}
                onChange={(e) => setYearsExperience(e.target.value)}
                placeholder="e.g., 5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">🏢 Industry</label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                {['Technology', 'Healthcare', 'Finance', 'Education', 'Marketing', 'Non-Profit', 'Retail', 'Other'].map(
                  (opt) => <option key={opt} value={opt.toLowerCase()}>{opt}</option>
                )}
              </select>
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-gray-800 mb-4">Your Negotiation Impact</h3>
          <div className="space-y-3">
            {current > 0 && target > 0 ? (
              <>
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                  <div className="text-sm text-gray-600">Annual raise you&apos;re asking for</div>
                  <div className="text-3xl font-extrabold text-purple-700">+${increase.toLocaleString()}</div>
                  <div className="text-sm text-purple-500">({increasePct}% increase)</div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="text-sm text-gray-600">Lifetime earnings impact</div>
                  <div className="text-2xl font-bold text-green-700">+${lifetime.toLocaleString()}</div>
                  <div className="text-xs text-gray-500 mt-1">Over a 35-year career (before compound effects)</div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-xs text-yellow-800">
                    💡 <strong>Don&apos;t leave money on the table.</strong> The average woman loses $900,000
                    in lifetime earnings compared to male counterparts — negotiating every raise matters.
                  </p>
                </div>
              </>
            ) : (
              <div className="bg-gray-50 rounded-xl p-6 text-center text-gray-400">
                Enter salaries to see your negotiation impact
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <h3 className="font-bold text-gray-800 mb-4">📝 Negotiation Scripts</h3>
        <div className="space-y-3">
          {scripts.map((s) => (
            <div key={s.scenario} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <div className="text-sm font-bold text-purple-700 mb-2">{s.scenario}</div>
              <p className="text-sm text-gray-700 italic leading-relaxed">{s.script}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
const tools = [
  { id: 'budget', label: '📊 Budget Planner', shortLabel: 'Budget', description: 'Plan your monthly income vs. expenses with the 50/30/20 rule' },
  { id: 'debt', label: '💳 Debt Payoff', shortLabel: 'Debt', description: 'See exactly when you\'ll be debt-free and how much interest you\'ll save' },
  { id: 'retirement', label: '🏖️ Retirement Planner', shortLabel: 'Retirement', description: 'Project your retirement nest egg and monthly income' },
  { id: 'salary', label: '💼 Salary Negotiation', shortLabel: 'Salary', description: 'Calculate your raise impact and get negotiation scripts' },
]

export default function ToolsPage() {
  const [active, setActive] = useState('budget')

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-white/20 rounded-full px-4 py-2 text-sm font-semibold mb-4">
            🛠️ Free Financial Tools
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Financial Calculators</h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Practical tools built for women. No signup required — just numbers that help you take action.
          </p>
        </div>
      </section>

      {/* Tool Navigation */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-1 py-3">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActive(tool.id)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-lg text-sm font-semibold transition-all flex-shrink-0 ${
                  active === tool.id
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'
                }`}
              >
                {tool.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Active Tool */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {tools.map((tool) => tool.id === active && (
            <div key={tool.id}>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{tool.label}</h2>
                <p className="text-gray-600">{tool.description}</p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
                {tool.id === 'budget' && <BudgetCalculator />}
                {tool.id === 'debt' && <DebtPayoffCalculator />}
                {tool.id === 'retirement' && <RetirementCalculator />}
                {tool.id === 'salary' && <SalaryNegotiationTool />}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Learn More CTA */}
      <section className="py-12 bg-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Want to go deeper?</h2>
          <p className="text-gray-600 mb-8">
            These calculators are just the start. Our free courses cover budgeting, debt payoff strategies,
            retirement planning, and salary negotiation in depth — with real-life scenarios.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/courses"
              className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
            >
              Explore Free Courses →
            </Link>
            <Link
              href="/quiz/personality"
              className="border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-colors"
            >
              Find Your Learning Path
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
