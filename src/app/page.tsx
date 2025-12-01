import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import HeroSlider from '@/components/HeroSlider'
import { generateOrganizationSchema } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'The Purple Wings - Financial Empowerment for Women by Shalini Jha | Needham MA',
  description: 'Founded by Shalini Jha in Needham, Massachusetts. Free financial literacy platform for women. Learn budgeting, investing, retirement planning, and more. Self-paced courses from beginner to advanced. Technical support by Sanjeev Jha and Namaste Needham Lab.',
  keywords: 'Shalini Jha, Shalini, Sanjeev Jha, Needham, Needham MA, Massachusetts, women financial education, financial literacy for women, free finance courses, budgeting, investing, retirement planning, women empowerment, Namaste Needham Lab',
  openGraph: {
    title: 'The Purple Wings - Financial Empowerment for Women by Shalini Jha',
    description: 'Free financial literacy platform helping women achieve financial independence. Founded by Shalini Jha in Needham, MA.',
    images: ['/images/logo-nobg.png'],
    type: 'website',
    siteName: 'The Purple Wings',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Purple Wings - Financial Empowerment for Women by Shalini Jha',
    description: 'Free financial literacy platform helping women achieve financial independence',
    images: ['/images/logo-nobg.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/images/logo-nobg.png',
    apple: '/images/logo-nobg.png',
  }
}

export default function HomePage() {
  const organizationSchema = generateOrganizationSchema()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      
      {/* Hero Slider Section */}
      <HeroSlider />

      {/* Why This Matters Section - Enhanced with Purple Theme */}
      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Did You Know?</h2>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">These facts might surprise you. They changed our mission.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <div className="text-5xl mb-4">57%</div>
              <h3 className="text-xl font-bold mb-3">Women Outlive Spouses</h3>
              <p className="text-purple-100">
                Most women will manage finances alone at some point. Are you prepared to make critical financial decisions on your own?
              </p>
              <Link href="/blog/planning-for-life-changes-caregiving-divorce-loss" className="text-yellow-300 hover:text-yellow-200 font-semibold mt-3 inline-block">
                Learn how to prepare →
              </Link>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <div className="text-5xl mb-4">82¢</div>
              <h3 className="text-xl font-bold mb-3">Gender Pay Gap</h3>
              <p className="text-purple-100">
                Women earn 82 cents for every dollar men earn. Strategic financial planning is not optional—it's essential.
              </p>
              <Link href="/blog/negotiation-for-women-beyond-base-salary" className="text-yellow-300 hover:text-yellow-200 font-semibold mt-3 inline-block">
                Close your gap →
              </Link>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <div className="text-5xl mb-4">99%</div>
              <h3 className="text-xl font-bold mb-3">Will Handle Finances</h3>
              <p className="text-purple-100">
                Nearly all women will be solely responsible for their finances at some point. The question is: when will you start learning?
              </p>
              <Link href="/blog/why-financial-independence-matters-for-women" className="text-yellow-300 hover:text-yellow-200 font-semibold mt-3 inline-block">
                Start now →
              </Link>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link 
              href="/auth" 
              className="inline-block bg-yellow-400 text-purple-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105"
            >
              🚀 Join 500+ Women Taking Control
            </Link>
          </div>
        </div>
      </section>

      {/* Success Stories Teaser */}
      <section className="py-16 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Real Women, Real Results</h2>
            <p className="mt-4 text-xl text-gray-600">See what financial literacy has unlocked for our community</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl">👩‍💼</div>
                <div className="ml-3">
                  <div className="font-bold text-gray-900">Sarah M.</div>
                  <div className="text-sm text-gray-600">Marketing Manager</div>
                </div>
              </div>
              <p className="text-gray-700 italic mb-3">"Negotiated a $15K raise after taking the salary negotiation course. Finally feel confident discussing money!"</p>
              <div className="text-purple-600 font-semibold">💰 $15,000 salary increase</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl">👩‍🏫</div>
                <div className="ml-3">
                  <div className="font-bold text-gray-900">Priya K.</div>
                  <div className="text-sm text-gray-600">Teacher</div>
                </div>
              </div>
              <p className="text-gray-700 italic mb-3">"Started investing with just $100/month. My portfolio is now worth over $12K in 3 years!"</p>
              <div className="text-purple-600 font-semibold">📈 $12,000 invested</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl">👩‍⚕️</div>
                <div className="ml-3">
                  <div className="font-bold text-gray-900">Lisa R.</div>
                  <div className="text-sm text-gray-600">Nurse</div>
                </div>
              </div>
              <p className="text-gray-700 italic mb-3">"Paid off $8K in credit card debt using the budget strategies. Now I'm building an emergency fund!"</p>
              <div className="text-purple-600 font-semibold">🎉 Debt-free journey</div>
            </div>
          </div>
          <div className="text-center">
            <Link href="/community" className="inline-block text-purple-600 hover:text-purple-700 font-semibold text-lg">
              Read more success stories →
            </Link>
          </div>
        </div>
      </section>

      {/* Community Learning Photos */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Women Learning Together</h2>
            <p className="text-xl text-gray-600">Join our thriving community of learners</p>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative h-64 rounded-lg overflow-hidden shadow-lg group">
              <Image
                src="/images/learners-1.jpg"
                alt="Women learning financial literacy"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden shadow-lg group">
              <Image
                src="/images/learners-2.jpg"
                alt="Community workshop"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden shadow-lg group">
              <Image
                src="/images/learners-3.jpg"
                alt="Interactive learning session"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden shadow-lg group">
              <Image
                src="/images/learners-6.jpg"
                alt="Empowered women"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section className="py-16 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Your Financial Journey, Your Pace
            </h2>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Bite-sized lessons that fit into your busy life. Master money in just 10 minutes a day.
            </p>
          </div>

          {/* Featured: Self-Assessment Quiz */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white/10 backdrop-blur-sm border-2 border-yellow-400 rounded-2xl shadow-2xl p-8 text-center text-white transform hover:scale-105 transition-transform">
              <div className="text-6xl mb-4 animate-bounce">🎯</div>
              <h3 className="text-3xl font-bold mb-3">Not Sure Where to Start?</h3>
              <p className="text-lg text-purple-100 mb-2">
                Take our quick 15-question quiz and discover your financial knowledge level. Get personalized course recommendations!
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
                className="inline-block bg-yellow-400 text-purple-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 shadow-lg hover:shadow-xl transition-all"
              >
                🚀 Start Quiz Now!
              </Link>
            </div>
          </div>

          {/* Inspirational Quote from Founder */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-xl border-2 border-purple-300">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 mb-4 rounded-full overflow-hidden border-4 border-yellow-400">
                  <Image
                    src="/images/Shalini.jpeg"
                    alt="Shalini Jha"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <blockquote className="text-xl md:text-2xl font-medium text-white mb-4 italic leading-relaxed">
                  "I want to see women not just survive, but thrive—regardless of their background or circumstances."
                </blockquote>
                <cite className="text-yellow-400 font-semibold not-italic">
                  — Shalini Jha, President & Founder
                </cite>
                <p className="text-sm text-purple-200 mt-2">
                  The Purple Wings, 501(c)(3) Nonprofit Organization
                </p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Women's Financial Literacy Curriculum */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-8 border-2 border-purple-200 hover:border-yellow-400 transition-all transform hover:-translate-y-2">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Women's Financial Literacy</h3>
              <p className="text-gray-600 mb-4">
                Life-stage aware curriculum from budgeting basics to building wealth. Designed for women's unique financial journeys.
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
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-8 border-2 border-purple-200 hover:border-yellow-400 transition-all transform hover:-translate-y-2">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">40-Hour Professional Course</h3>
              <p className="text-gray-600 mb-4">
                FINRA-compliant structured program. Perfect for women seeking professional-level financial knowledge or career paths in finance.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Financial Freedom in 4 Simple Steps</h2>
            <p className="mt-4 text-xl text-gray-600">Join hundreds of women already building their financial future</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Create Free Account</h3>
              <p className="text-gray-600">Sign up with Google or email. No credit card needed. Ever.</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Discover Your Level</h3>
              <p className="text-gray-600">Take our 15-question quiz and get personalized recommendations</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Learn at Your Pace</h3>
              <p className="text-gray-600">Bite-sized lessons. Real-world examples. Built for busy women.</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-3xl font-bold text-white">4</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Take Control</h3>
              <p className="text-gray-600">Build confidence, make informed decisions, secure your future</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link
              href="/auth"
              className="inline-block bg-yellow-400 text-purple-900 px-10 py-4 rounded-lg font-bold text-xl hover:bg-yellow-300 transition-colors shadow-lg hover:shadow-xl"
            >
              Start Your Journey Free 🚀
            </Link>
            <p className="mt-3 text-gray-600">Join 500+ women already learning</p>
          </div>
        </div>
      </section>

      {/* Massachusetts Focus Section */}
      <section className="py-16 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">🏡 Proudly Supporting Massachusetts Women</h2>
              <p className="text-xl text-purple-100 mb-6 leading-relaxed">
                While our platform serves women everywhere, we have deep roots in Massachusetts. We're building a local network of support, community events, and resources.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400 text-xl">✓</span>
                  <span className="text-purple-100">Local community workshops and networking events</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400 text-xl">✓</span>
                  <span className="text-purple-100">Massachusetts-specific financial resources and assistance programs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400 text-xl">✓</span>
                  <span className="text-purple-100">Connect with local women on similar financial journeys</span>
                </li>
              </ul>
              <Link
                href="/community"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-yellow-400 text-base font-bold rounded-md text-white hover:bg-yellow-400 hover:text-purple-900 transition-all shadow-lg"
              >
                Join Our Community
              </Link>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-purple-300">
                <h3 className="text-2xl font-bold mb-4">Did You Know?</h3>
                <div className="space-y-4">
                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">63%</div>
                    <p className="text-sm text-purple-100">of Massachusetts women are primary breadwinners or co-earners in their households</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">$89K</div>
                    <p className="text-sm text-purple-100">Median household income in MA - yet many women still face financial insecurity</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">45%</div>
                    <p className="text-sm text-purple-100">of Massachusetts women report feeling anxious about their financial future</p>
                  </div>
                </div>
                <p className="mt-6 text-sm text-purple-200 italic">
                  Source: Massachusetts Women's Economic Security Studies, 2023
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Financial Future Starts Today 💜
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join 500+ women building confidence, independence, and security through financial literacy. Every expert started as a beginner.
          </p>
          <Link
            href="/auth"
            className="inline-flex items-center justify-center px-10 py-4 border border-transparent text-xl font-bold rounded-lg text-white bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1"
          >
            Start Learning Free - No Credit Card
          </Link>
          <p className="mt-4 text-sm text-gray-500">No credit card required. Cancel anytime.</p>
        </div>
      </section>
    </div>
  )
}
