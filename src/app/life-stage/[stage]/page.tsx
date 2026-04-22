import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

interface LifeStagePageProps {
  params: Promise<{
    stage: string
  }>
}

const LIFE_STAGES = {
  '40s': {
    title: 'Financial Planning in Your 40s',
    subtitle: 'Peak Earning Years, Critical Decisions',
    description: 'Your 40s are your highest-earning decade, but also your most expensive. Kids, aging parents, mortgage, retirement planning - it\'s a lot. Here\'s how to thrive, not just survive.',
    age: '40-49',
    topChallenges: [
      'Balancing kids\' college costs with retirement savings',
      'Managing career peak vs. burnout',
      'Caring for aging parents',
      'Making up for lost time if you started late'
    ],
    quickWins: [
      'Maximize your 401(k) catch-up contributions',
      'Review insurance needs while rates are still good',
      'Create a 5-year financial roadmap',
      'Start teaching kids about money'
    ],
    featuredCourses: [
      { slug: 'retirement-planning', title: 'Retirement Planning', reason: 'Critical window for compound growth' },
      { slug: 'college-planning', title: 'College Planning', reason: 'Kids education costs' },
      { slug: 'career-finance', title: 'Career Finance', reason: 'Maximize peak earning years' }
    ],
    testimonial: {
      name: "Sarah M., 47",
      quote: "I wish I\'d found this at 40 instead of 45. I could have saved an extra $50K by now. Don\'t wait!",
      result: "On track for early retirement at 58"
    }
  },
  '50s': {
    title: 'Financial Freedom in Your 50s',
    subtitle: 'The Retirement Countdown Begins',
    description: '10-15 years from retirement is make-or-break time. Can you retire when you want? Will your money last? This is your last chance to course-correct.',
    age: '50-59',
    topChallenges: [
      'Retirement reality check - are you on track?',
      'Healthcare costs planning',
      'Empty nest financial adjustments',
      'Deciding when to take Social Security'
    ],
    quickWins: [
      'Run retirement projections (scary but necessary)',
      'Consider downsizing your home',
      'Review all insurance policies',
      'Create retirement income streams'
    ],
    featuredCourses: [
      { slug: 'social-security-benefits', title: 'Social Security Benefits', reason: 'Critical timing decisions' },
      { slug: 'retirement-planning', title: 'Retirement Planning', reason: 'Final countdown phase' },
      { slug: 'estate-planning', title: 'Estate Planning', reason: 'Protect your legacy' }
    ],
    testimonial: {
      name: "Maria R., 54",
      quote: "At 52, I thought I\'d work forever. Now I have a clear retirement date and a plan to get there.",
      result: "Retiring at 62 with confidence"
    }
  },
  '60s': {
    title: 'Financial Security in Your 60s',
    subtitle: 'Making Your Money Last',
    description: 'You\'ve made it - but now what? How do you make your savings last 30+ years? How do you handle healthcare? Can you still grow your money safely?',
    age: '60-69',
    topChallenges: [
      'Making retirement savings last',
      'Healthcare and long-term care costs',
      'Deciding when to retire',
      'Helping adult children without hurting yourself'
    ],
    quickWins: [
      'Create retirement withdrawal strategy',
      'Optimize Social Security timing',
      'Review investment risk tolerance',
      'Plan for required minimum distributions'
    ],
    featuredCourses: [
      { slug: 'retirement-income', title: 'Retirement Income Planning', reason: 'Make savings last' },
      { slug: 'healthcare-planning', title: 'Healthcare Planning', reason: 'Biggest retirement expense' },
      { slug: 'estate-planning', title: 'Estate Planning', reason: 'Protect what you\'ve built' }
    ],
    testimonial: {
      name: "Linda T., 65",
      quote: "I retired at 62 worried sick. At 65, I\'m sleeping better and even enjoying some travel!",
      result: "Confident retirement with travel fund"
    }
  }
}

export async function generateMetadata({ params }: LifeStagePageProps): Promise<Metadata> {
  const { stage } = await params
  const lifeStage = LIFE_STAGES[stage as keyof typeof LIFE_STAGES]
  
  if (!lifeStage) {
    return { title: 'Life Stage Not Found' }
  }

  return {
    title: `${lifeStage.title} | The Purple Wings`,
    description: lifeStage.description,
  }
}

export default async function LifeStagePage({ params }: LifeStagePageProps) {
  const { stage } = await params
  const lifeStage = LIFE_STAGES[stage as keyof typeof LIFE_STAGES]

  if (!lifeStage) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <span className="bg-yellow-400 text-purple-900 px-4 py-2 rounded-full text-sm font-bold">
              Ages {lifeStage.age}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {lifeStage.title}
          </h1>
          <h2 className="text-2xl text-purple-100 mb-6">
            {lifeStage.subtitle}
          </h2>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            {lifeStage.description}
          </p>
        </div>
      </section>

      {/* Top Challenges */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Biggest Financial Challenges Right Now
            </h2>
            <p className="text-xl text-gray-600">
              You're not alone in these concerns
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {lifeStage.topChallenges.map((challenge, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-4">
                  <span className="text-xl font-bold">{index + 1}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{challenge}</h3>
                <p className="text-gray-600 text-sm">
                  We'll show you step-by-step strategies to handle this exact challenge.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Wins */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Quick Wins You Can Achieve This Month
            </h2>
            <p className="text-xl text-gray-600">
              Small changes, big impact - start today
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {lifeStage.quickWins.map((win, index) => (
              <div key={index} className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white mr-3">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900">Quick Win #{index + 1}</h3>
                </div>
                <p className="text-gray-700">{win}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Courses Perfect for Your Age Group
            </h2>
            <p className="text-xl text-gray-600">
              Targeted learning for where you are right now
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {lifeStage.featuredCourses.map((course, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-4">
                    <span className="text-2xl">{'\ud83d\udcda'}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{course.reason}</p>
                  <Link
                    href={`/learn/womens-financial-literacy/${course.slug}`}
                    className="block w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors text-center font-medium"
                  >
                    Start Learning
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real Story */}
      <section className="py-16 bg-gradient-to-br from-purple-600 to-indigo-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <div className="text-6xl mb-4">"\ud83d\udcab"</div>
            <blockquote className="text-xl md:text-2xl font-medium text-white mb-6 italic leading-relaxed">
              {lifeStage.testimonial.quote}
            </blockquote>
            <cite className="text-yellow-400 font-semibold not-italic">
              {lifeStage.testimonial.name}
            </cite>
            <p className="text-purple-200 mt-2">
              Result: {lifeStage.testimonial.result}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Your Next Chapter Starts Now
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Don't let another year go by wondering "what if." Take control of your financial future today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quiz/personality" className="bg-purple-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-purple-700 transition-colors">
              Take Free Assessment
            </Link>
            <Link href="/stories" className="bg-purple-100 text-purple-700 px-8 py-4 rounded-lg font-bold hover:bg-purple-200 transition-colors">
              Read More Stories
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
