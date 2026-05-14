import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '2024 Impact Report | The Purple Wings',
  description:
    'See the measurable difference The Purple Wings is making. 135+ lessons, 1,000+ quiz questions, and growing — all free for women building financial independence.',
  keywords:
    'The Purple Wings impact report, women financial literacy impact, nonprofit annual report, free financial education results',
  openGraph: {
    title: '2024 Impact Report | The Purple Wings',
    description:
      'Measuring our mission: free financial education for women across Massachusetts and beyond.',
    images: [{ url: '/images/Women-fin.png', width: 1200, height: 630, alt: 'The Purple Wings Impact' }],
  },
  alternates: { canonical: 'https://www.thepurplewings.org/impact' },
}

const impactNumbers = [
  { number: '135+', label: 'Lessons Published', sublabel: 'Across 5 learning tracks', icon: '📚', color: 'purple' },
  { number: '1,000+', label: 'Quiz Questions', sublabel: 'Across 15 categories', icon: '🧠', color: 'indigo' },
  { number: '100%', label: 'Free to Access', sublabel: 'No paywall, ever', icon: '🆓', color: 'purple' },
  { number: '15', label: 'Finance Topics', sublabel: 'Beginner to advanced', icon: '📊', color: 'indigo' },
  { number: '3', label: 'Media Features', sublabel: 'Needham Observer, Boston 25, Yahoo', icon: '📰', color: 'purple' },
  { number: '2020', label: 'Founded', sublabel: 'Born during COVID-19', icon: '🦋', color: 'indigo' },
]

const courseCategories = [
  { name: "Women's Financial Literacy", lessons: 75, level: 'Beginner → Advanced', icon: '👩', completion: 92 },
  { name: 'FINRA Professional Program', lessons: 40, level: '40-Hour Professional', icon: '🏛️', completion: 88 },
  { name: 'Divorce & Financial Independence', lessons: 8, level: 'Intermediate', icon: '🔑', completion: 100 },
  { name: 'Financial Safety & Crisis Planning', lessons: 7, level: 'All Levels', icon: '🛡️', completion: 100 },
  { name: 'Small Business Finance', lessons: 5, level: 'Intermediate', icon: '💼', completion: 85 },
]

const quizCategories = [
  'Budgeting & Spending', 'Banking Basics', 'Credit & Debt',
  'Saving & Emergency Fund', 'Investing', 'Retirement Planning',
  'Insurance', 'Taxes', 'Real Estate', 'Career & Income',
  'Small Business', 'Estate Planning', 'Divorce & Independence',
  'Financial Safety', 'Empowerment',
]

const milestones = [
  { year: '2020', event: 'Founded during COVID-19 pandemic in Needham, MA', icon: '🌱' },
  { year: '2021', event: 'Launched first financial literacy workshops for local women', icon: '🎓' },
  { year: '2022', event: 'Received 501(c)(3) nonprofit status', icon: '🏛️' },
  { year: '2023', event: 'Featured in Needham Observer, Boston 25 News, and Yahoo News', icon: '📰' },
  { year: '2024', event: 'Launched full online platform with 135+ lessons and 1,000+ quiz questions', icon: '🚀' },
  { year: '2025+', event: 'Expanding to serve women nationally with mentorship and community programs', icon: '🦋' },
]

const financialTopics = [
  { topic: 'Budgeting & Debt Payoff', impact: 'Women who complete this module report 3x more confidence managing monthly budgets' },
  { topic: 'Investing Basics', impact: 'Addresses the gender investing gap — women invest 40% less than men yet outlive them by 5+ years' },
  { topic: 'Retirement Planning', impact: 'Critical for women who take 12+ years out of workforce for caregiving on average' },
  { topic: 'Divorce & Financial Independence', impact: 'Directly addresses why 25% of women become poor within 5 years of divorce' },
  { topic: 'Salary Negotiation', impact: 'Closing the $900,000 lifetime earnings gap women face vs. male counterparts' },
]

export default function ImpactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-700 to-indigo-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-white/20 rounded-full px-4 py-2 text-sm font-semibold mb-6">
            📊 2024 Annual Impact Report
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            Measuring Our Mission
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto mb-10">
            Every lesson completed, every quiz taken, every woman who gains financial confidence —
            this is what The Purple Wings is building.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/corporate-sponsors"
              className="bg-white text-purple-700 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
            >
              Fund This Mission →
            </Link>
            <Link
              href="/courses"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Explore Free Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">By the Numbers</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Since our founding in 2020
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {impactNumbers.map((item) => (
              <div
                key={item.label}
                className={`rounded-2xl p-8 text-center border-2 ${
                  item.color === 'purple'
                    ? 'bg-purple-50 border-purple-200'
                    : 'bg-indigo-50 border-indigo-200'
                }`}
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <div className={`text-4xl font-extrabold mb-2 ${
                  item.color === 'purple' ? 'text-purple-700' : 'text-indigo-700'
                }`}>
                  {item.number}
                </div>
                <div className="text-gray-900 font-bold text-lg mb-1">{item.label}</div>
                <div className="text-gray-500 text-sm">{item.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="py-16 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Financial Literacy Matters for Women</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The gender wealth gap isn&apos;t just about pay — it&apos;s about knowledge, access, and confidence.
              Here&apos;s what our curriculum directly addresses.
            </p>
          </div>
          <div className="space-y-4 max-w-4xl mx-auto">
            {financialTopics.map((item) => (
              <div key={item.topic} className="bg-white rounded-xl p-6 flex gap-4 items-start shadow-sm border border-purple-100">
                <span className="text-2xl text-purple-500 mt-1">💡</span>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{item.topic}</h3>
                  <p className="text-gray-600">{item.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Completion Progress */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Curriculum Completeness
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {courseCategories.map((cat) => (
              <div key={cat.name} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{cat.icon}</span>
                    <div>
                      <h3 className="font-bold text-gray-900">{cat.name}</h3>
                      <span className="text-sm text-gray-500">{cat.lessons} lessons · {cat.level}</span>
                    </div>
                  </div>
                  <span className="text-purple-700 font-bold text-lg">{cat.completion}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-indigo-600 h-3 rounded-full transition-all"
                    style={{ width: `${cat.completion}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz Categories */}
      <section className="py-16 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">15 Quiz Categories</h2>
            <p className="text-lg text-gray-600">
              1,000+ questions with 3 difficulty levels each — beginner, intermediate, advanced
            </p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
            {quizCategories.map((cat) => (
              <span
                key={cat}
                className="bg-white border border-purple-200 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Journey</h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-purple-200" />
              <div className="space-y-8">
                {milestones.map((m, i) => (
                  <div key={i} className="relative flex gap-6 items-start">
                    <div className="flex-shrink-0 w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center z-10 text-2xl border-4 border-white shadow">
                      {m.icon}
                    </div>
                    <div className="bg-gray-50 rounded-xl p-5 flex-1 border border-gray-100">
                      <span className="text-purple-600 font-bold text-sm">{m.year}</span>
                      <p className="text-gray-800 font-medium mt-1">{m.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — Fund the Mission */}
      <section className="py-20 bg-gradient-to-br from-purple-700 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Help Us Reach 10,000 Women by 2026
          </h2>
          <p className="text-purple-100 text-lg mb-10 max-w-2xl mx-auto">
            Every dollar donated keeps The Purple Wings free for women who need it most.
            Every corporate partnership extends our reach into workplaces and communities.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-10 text-center">
            {[
              { amount: '$100', impact: 'Funds 5 women for one full year of learning' },
              { amount: '$500', impact: 'Sponsors a community workshop for 25 women' },
              { amount: '$5,000', impact: 'Powers a full course module for 1 year' },
            ].map((tier) => (
              <div key={tier.amount} className="bg-white/10 rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-yellow-300 mb-2">{tier.amount}</div>
                <div className="text-purple-100 text-sm">{tier.impact}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/corporate-sponsors"
              className="bg-white text-purple-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 transition-colors shadow-lg"
            >
              Corporate Sponsorship →
            </Link>
            <Link
              href="/get-involved"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors"
            >
              Other Ways to Give
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
