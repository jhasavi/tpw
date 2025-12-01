import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Financial Education Events - The Purple Wings | Needham, MA',
  description: 'Join our free financial education workshops and events in Needham, Massachusetts. Expert speakers covering investing, insurance, real estate, taxes, and more. Past events include sessions at High Rock School.',
  keywords: 'financial education events, Needham MA events, women financial workshops, investing seminars, real estate education, High Rock School, Massachusetts financial literacy',
  openGraph: {
    title: 'The Purple Wings Events - Free Financial Education Workshops',
    description: 'Free financial education events for women in Needham and Greater Boston area',
    images: ['/images/Class-1.jpeg'],
  }
}

interface Event {
  id: string
  title: string
  date: string
  location: string
  speaker: string
  description: string
  category: string
  image: string
  attendees?: number
}

export default function EventsPage() {
  const pastEvents: Event[] = [
    {
      id: 'fall-2024-basics',
      title: 'Basics of Finance',
      date: 'October 3, 2024',
      location: 'High Rock School, 77 Ferndale Road, Needham, MA',
      speaker: 'Bank of America Financial Education Team',
      description: 'Essential introduction to personal finance fundamentals. Covered banking basics, budgeting, credit scores, and emergency funds.',
      category: 'Financial Basics',
      image: '/images/Class-1.jpeg',
      attendees: 45
    },
    {
      id: 'fall-2024-investing',
      title: 'Investing in Stocks and Building Retirement',
      date: 'October 10, 2024',
      location: 'High Rock School, 77 Ferndale Road, Needham, MA',
      speaker: 'Vikram - Investment Specialist',
      description: 'Stock market fundamentals and retirement planning strategies. Topics included 401k, IRA accounts, portfolio diversification, and long-term wealth building.',
      category: 'Investing',
      image: '/images/Class-2.jpg',
      attendees: 42
    },
    {
      id: 'fall-2024-insurance',
      title: 'How Life Insurance Builds Assets',
      date: 'October 17, 2024',
      location: 'High Rock School, 77 Ferndale Road, Needham, MA',
      speaker: 'Padma - Insurance Specialist',
      description: 'Explored different types of life insurance and how they contribute to wealth-building. Covered term, whole, and universal life insurance strategies.',
      category: 'Insurance',
      image: '/images/Class-3.jpg',
      attendees: 38
    },
    {
      id: 'fall-2024-real-estate',
      title: 'Real Estate for Retirement and College Planning',
      date: 'October 24, 2024',
      location: 'High Rock School, 77 Ferndale Road, Needham, MA',
      speaker: 'Sanjeev - Real Estate Investment Expert',
      description: 'Practical approaches to using real estate investment for retirement income and college funding. Discussed rental properties, REITs, and tax advantages.',
      category: 'Real Estate',
      image: '/images/Class-4.jpeg',
      attendees: 48
    },
    {
      id: 'fall-2024-taxes',
      title: 'Tax Saving Strategies',
      date: 'November 7, 2024',
      location: 'High Rock School, 77 Ferndale Road, Needham, MA',
      speaker: 'Jan - Tax Planning Specialist',
      description: 'Legal tax reduction strategies, deductions, credits, and year-end planning techniques. Covered retirement account benefits and business expense optimization.',
      category: 'Taxes',
      image: '/images/seminar.jpg',
      attendees: 45
    },
    {
      id: 'fall-2024-mortgage',
      title: 'Making Real Estate Work with the Right Mortgage',
      date: 'November 14, 2024',
      location: 'High Rock School, 77 Ferndale Road, Needham, MA',
      speaker: 'Darren - Mortgage Specialist',
      description: 'How to choose the right mortgage product and use real estate to build wealth. Discussed fixed vs. adjustable rates, refinancing, and strategic financing.',
      category: 'Real Estate',
      image: '/images/team.jpg',
      attendees: 43
    },
    {
      id: 'spring-2024-1',
      title: 'Spring Financial Education Series - Session 1',
      date: 'May 16, 2024',
      location: 'High Rock School, 77 Ferndale Road, Needham, MA',
      speaker: 'Purple Wings Financial Education Team',
      description: 'Comprehensive workshop covering personal finance fundamentals, investment strategies, and retirement planning with interactive Q&A.',
      category: 'Financial Basics',
      image: '/images/learners-1.jpg',
      attendees: 45
    },
    {
      id: 'spring-2024-2',
      title: 'Spring Financial Education Series - Session 2',
      date: 'May 23, 2024',
      location: 'High Rock School, 77 Ferndale Road, Needham, MA',
      speaker: 'Purple Wings Investment Team',
      description: 'Advanced topics in wealth building, tax optimization, and real estate investing strategies from industry experts.',
      category: 'Investing',
      image: '/images/learners-2.jpg',
      attendees: 42
    },
    {
      id: 'spring-2024-3',
      title: 'Spring Financial Education Series - Session 3',
      date: 'May 30, 2024',
      location: 'High Rock School, 77 Ferndale Road, Needham, MA',
      speaker: 'Estate Planning Experts',
      description: 'Focus on retirement planning, estate planning, and legacy building. Expert speakers discussed comprehensive financial planning for the future.',
      category: 'Retirement',
      image: '/images/learners-3.jpg',
      attendees: 38
    },
    {
      id: 'gathering-jul-2023',
      title: 'Community Financial Literacy Gathering',
      date: 'July 23, 2023',
      location: 'Needham Community Center',
      speaker: 'Shalini Jha & Community Partners',
      description: 'Our first major community gathering bringing together women from across Needham and Greater Boston to discuss financial empowerment and education.',
      category: 'Community',
      image: '/images/1st-gathering_Jul23-2.jpeg',
      attendees: 35
    }
  ]

  const categoryColors: { [key: string]: string } = {
    'Financial Basics': 'bg-blue-100 text-blue-800',
    'Investing': 'bg-green-100 text-green-800',
    'Insurance': 'bg-purple-100 text-purple-800',
    'Real Estate': 'bg-orange-100 text-orange-800',
    'Taxes': 'bg-red-100 text-red-800',
    'Retirement': 'bg-indigo-100 text-indigo-800',
    'Community': 'bg-pink-100 text-pink-800'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-6xl mb-6">📅</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Financial Education Events
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
              Join our community events, workshops, and webinars. Learn from experts, connect with peers, 
              and take actionable steps toward financial independence.
            </p>
            <div className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg font-semibold text-lg mb-4 shadow-lg">
              🎉 Next Sessions Coming April 2026!
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-purple-100">✓ Free to Attend</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-purple-100">✓ Expert Speakers</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-purple-100">✓ Interactive Learning</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">{pastEvents.length}</div>
              <div className="text-gray-600">Events Hosted</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">400+</div>
              <div className="text-gray-600">Total Attendees</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">7</div>
              <div className="text-gray-600">Topic Areas</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-gray-600">Free Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Past Events</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our history of financial education workshops and community gatherings
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[event.category]}`}>
                      {event.category}
                    </span>
                    {event.attendees && (
                      <span className="text-sm text-gray-500">{event.attendees} attended</span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {event.title}
                  </h3>
                  
                  <p className="text-sm text-purple-600 font-medium mb-2">
                    Speaker: {event.speaker}
                  </p>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span>📅 {event.date}</span>
                  </div>
                  
                  <div className="flex items-start text-sm text-gray-500 mb-4">
                    <span className="mr-1">📍</span>
                    <span className="line-clamp-2">{event.location}</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Highlights */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Event Highlights</h2>
            <p className="text-xl text-gray-600">What our attendees learned</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Financial Basics</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Understanding bank accounts and credit</li>
                <li>• Building emergency funds</li>
                <li>• Creating realistic budgets</li>
                <li>• Improving credit scores</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Investing & Retirement</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Stock market fundamentals</li>
                <li>• 401k and IRA strategies</li>
                <li>• Portfolio diversification</li>
                <li>• Long-term wealth building</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Real Estate & Assets</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Real estate investment basics</li>
                <li>• Mortgage strategies</li>
                <li>• Life insurance as an asset</li>
                <li>• Tax-advantaged investments</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Community Partners */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Event Partners & Venues</h2>
            <p className="text-xl text-gray-600">
              Thank you to our partners who make these events possible
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl mb-3">🏫</div>
              <h3 className="font-semibold text-gray-900 mb-2">High Rock School</h3>
              <p className="text-sm text-gray-600">Primary event venue in Needham</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl mb-3">🏦</div>
              <h3 className="font-semibold text-gray-900 mb-2">Bank of America</h3>
              <p className="text-sm text-gray-600">Financial education expertise</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl mb-3">🏠</div>
              <h3 className="font-semibold text-gray-900 mb-2">
                <a href="https://www.namastebostonhomes.com/" target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-purple-600 transition-colors">
                  Namaste Boston Homes
                </a>
              </h3>
              <p className="text-sm text-gray-600">Real estate education partner</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl mb-3">🤝</div>
              <h3 className="font-semibold text-gray-900 mb-2">Community Organizations</h3>
              <p className="text-sm text-gray-600">
                <a href="https://hometownweekly.net/needham/icon-celebrates-indias-independence-day/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700">
                  ICON
                </a>, BJANE, Needham Bank
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated on Future Events
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join our community to receive notifications about upcoming workshops, webinars, and educational events.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Join Our Community
            </Link>
            <Link
              href="/community"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-purple-600 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Host an Event */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Interested in Speaking or Hosting?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            We're always looking for financial experts and community leaders to share their knowledge. 
            Contact us to discuss partnership opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="mailto:info@thepurplewings.org"
              className="inline-flex items-center justify-center px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
