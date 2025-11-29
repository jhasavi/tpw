import Link from 'next/link'

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Community
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with other women on their financial empowerment journey. Learn together, support each other, 
            and build lasting connections—especially in Massachusetts.
          </p>
        </div>

        {/* Coming Soon Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-2xl shadow-lg p-12 mb-12 text-center">
          <div className="text-6xl mb-4">🚀</div>
          <h2 className="text-3xl font-bold mb-4">Community Features Coming Soon</h2>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto mb-6">
            We're building an amazing space for women to connect, share experiences, and support each other. 
            Our community features will launch soon!
          </p>
        </div>

        {/* What's Coming */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-8 border border-purple-100">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Discussion Forums</h3>
            <p className="text-gray-600">
              Share experiences, ask questions, and get advice from other women on similar financial journeys.
            </p>
            <span className="inline-block mt-4 text-sm text-purple-600 font-medium">Coming Soon</span>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border border-purple-100">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Mentorship Program</h3>
            <p className="text-gray-600">
              Connect with mentors and peer accountability partners who understand your goals and challenges.
            </p>
            <span className="inline-block mt-4 text-sm text-purple-600 font-medium">Coming Soon</span>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border border-purple-100">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Local Events (MA)</h3>
            <p className="text-gray-600">
              In-person meetups, workshops, and networking events for women in Massachusetts.
            </p>
            <span className="inline-block mt-4 text-sm text-purple-600 font-medium">Coming Soon</span>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border border-purple-100">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Study Groups</h3>
            <p className="text-gray-600">
              Join small groups working through courses together, with scheduled check-ins and shared goals.
            </p>
            <span className="inline-block mt-4 text-sm text-purple-600 font-medium">Coming Soon</span>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border border-purple-100">
            <div className="text-4xl mb-4">🎙️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Webinars</h3>
            <p className="text-gray-600">
              Live Q&A sessions with financial experts, covering timely topics and answering your questions.
            </p>
            <span className="inline-block mt-4 text-sm text-purple-600 font-medium">Coming Soon</span>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border border-purple-100">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Success Stories</h3>
            <p className="text-gray-600">
              Read and share inspiring stories of financial transformation from women in our community.
            </p>
            <span className="inline-block mt-4 text-sm text-purple-600 font-medium">Coming Soon</span>
          </div>
        </div>

        {/* Massachusetts Focus */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <div className="flex items-start gap-6">
            <div className="text-6xl">🏛️</div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Massachusetts Community Focus</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                While The Purple Wing serves women everywhere, we have a special commitment to building a strong 
                community of financially empowered women right here in Massachusetts.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Local meetups in Boston, Worcester, Springfield, and beyond</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>MA-specific resources on state benefits, tax laws, and local programs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Connections to local financial professionals and advisors</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Partnerships with MA women's organizations and nonprofits</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Get Notified */}
        <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Want to Be Notified When We Launch?</h3>
          <p className="text-gray-700 mb-6">
            Sign up for an account now and you'll be the first to know when community features go live.
          </p>
          <Link
            href="/auth/signup"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
          >
            Create Free Account
          </Link>
        </div>

        {/* Contact */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Questions about our community? Ideas for features you'd like to see?
          </p>
          <a
            href="mailto:info@thepurplewings.org"
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            info@thepurplewings.org
          </a>
        </div>
      </div>
    </div>
  )
}
