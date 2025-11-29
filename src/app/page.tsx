import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import HeroSlider from '@/components/HeroSlider'

export const metadata: Metadata = {
  title: 'The Purple Wings - Financial Empowerment for Women | Free Financial Education',
  description: 'Free financial literacy platform for women. Learn budgeting, investing, retirement planning, and more. Founded by Shalini Jha in Needham, MA. Self-paced courses from beginner to advanced.',
  keywords: 'women financial education, financial literacy for women, free finance courses, Shalini Jha, Needham MA, budgeting, investing, retirement planning, women empowerment',
  openGraph: {
    title: 'The Purple Wings - Financial Empowerment for Women',
    description: 'Free financial literacy platform helping women achieve financial independence',
    images: ['/images/logo-nobg.png'],
  },
  icons: {
    icon: '/images/logo-nobg.png',
    apple: '/images/logo-nobg.png',
  }
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Hero Slider Section */}
      <HeroSlider />

      {/* Why This Matters Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Financial Literacy Matters for Women</h2>
            <p className="mt-4 text-xl text-gray-600">Real challenges. Real solutions.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
              <div className="text-4xl mb-4">💪</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Financial Independence</h3>
              <p className="text-gray-600">
                Take control of your financial future. Make decisions with confidence, whether you're single, partnered, or navigating life transitions.
              </p>
            </div>
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Safety & Protection</h3>
              <p className="text-gray-600">
                Learn to recognize financial abuse, protect your assets, and build safety nets that support you and those you care for.
              </p>
            </div>
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Career & Business Growth</h3>
              <p className="text-gray-600">
                Negotiate salaries, understand benefits, start businesses, and overcome the gender pay gap with practical strategies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Choose Your Learning Path</h2>
            <p className="mt-4 text-xl text-gray-600">Start where you are. Go at your own pace.</p>
          </div>

          {/* Featured: Self-Assessment Quiz */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl shadow-2xl p-8 text-center text-white transform hover:scale-105 transition-transform">
              <div className="text-6xl mb-4 animate-bounce">🎯</div>
              <h3 className="text-3xl font-bold mb-3">Take Our Financial Literacy Quiz!</h3>
              <p className="text-lg text-purple-100 mb-2">
                Discover your financial knowledge level and get personalized course recommendations.
              </p>
              <div className="flex items-center justify-center gap-6 mb-6 text-purple-100">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⚡</span>
                  <span>15 Questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🏆</span>
                  <span>Instant Results</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📊</span>
                  <span>Personalized Tips</span>
                </div>
              </div>
              <Link
                href="/learn/womens-financial-literacy/financial-literacy-basics/self-assessment"
                className="inline-block bg-white text-purple-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-50 shadow-lg hover:shadow-xl transition-all"
              >
                🚀 Start Quiz Now!
              </Link>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Women's Financial Literacy Curriculum */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-purple-200 hover:border-purple-400 transition-all">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Women's Financial Literacy</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive curriculum from beginner to advanced. Life-stage aware, practical, and designed specifically for women's unique financial journeys.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="text-purple-600">🟢</span> Beginner - Budgeting, credit, emergency planning
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="text-purple-600">🟡</span> Intermediate - Investing, taxes, career growth
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="text-purple-600">🔴</span> Advanced - Retirement, real estate, business
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="text-purple-600">💜</span> Women-specific - Divorce, abuse, entrepreneurship
                </div>
              </div>
              <Link
                href="/learn/womens-financial-literacy"
                className="block w-full text-center bg-purple-600 text-white hover:bg-purple-700 px-6 py-3 rounded-md font-medium transition-all"
              >
                Explore This Path
              </Link>
            </div>

            {/* FINRA 40-Hour Course */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-purple-200 hover:border-purple-400 transition-all">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">40-Hour Professional Course</h3>
              <p className="text-gray-600 mb-4">
                FINRA-compliant, structured program for women seeking professional-level financial knowledge and potential career paths in finance.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="text-purple-600">✓</span> 40 hours of structured learning
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="text-purple-600">✓</span> FINRA-compliant content
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="text-purple-600">✓</span> Certificate of completion
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="text-purple-600">✓</span> Professional development credits
                </div>
              </div>
              <Link
                href="/learn/finra-40-hour"
                className="block w-full text-center bg-purple-600 text-white hover:bg-purple-700 px-6 py-3 rounded-md font-medium transition-all"
              >
                Explore This Path
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-xl text-gray-600">Your path to financial confidence in 4 simple steps</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">1</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Create Account</h3>
              <p className="text-gray-600">Sign up with Google or email in seconds</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Take Assessment</h3>
              <p className="text-gray-600">Quick self-assessment to find your starting point</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Learn & Practice</h3>
              <p className="text-gray-600">Lessons, quizzes, and real-world application</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">4</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Track Progress</h3>
              <p className="text-gray-600">See your growth and celebrate milestones</p>
            </div>
          </div>
        </div>
      </section>

      {/* Massachusetts Focus Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Proudly Supporting Women in Massachusetts</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
            While our platform serves women everywhere, we have a special focus on connecting and empowering women in Massachusetts. 
            Local resources, community events, and networking opportunities coming soon.
          </p>
          <Link
            href="/community"
            className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-purple-600 transition-all"
          >
            Join Our Community
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Take Control of Your Financial Future?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join hundreds of women who are building confidence, independence, and security through financial literacy.
          </p>
          <Link
            href="/auth/signup"
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-xl transition-all"
          >
            Start Your Journey Today - It's Free
          </Link>
          <p className="mt-4 text-sm text-gray-500">No credit card required. Cancel anytime.</p>
        </div>
      </section>
    </div>
  )
}
