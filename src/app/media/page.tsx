import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Media Coverage - The Purple Wings',
  description: 'News articles, TV coverage, and media features about The Purple Wings financial literacy program.',
}

const mediaArticles = [
  {
    title: 'Program Encourages Women to Spread Financial Literacy Wings',
    outlet: 'Needham Observer',
    date: 'October 2024',
    url: 'https://needhamobserver.com/program-encourages-women-to-spread-financial-literacy-wings/',
    excerpt: 'Local program empowers women through financial education and community support.',
    image: '/images/Class-1.jpeg'
  },
  {
    title: 'She Had No Clue How Much Money She Had - Local Group Empowering Women to Understand Finances',
    outlet: 'Boston 25 News',
    date: 'September 2024',
    url: 'https://www.boston25news.com/news/local/she-had-no-clue-how-much-money-she-had-local-group-empowering-women-understand-finances/JBGKMMBLRRHQPLIP564E6NCNUY/',
    excerpt: 'TV coverage highlighting how The Purple Wings helps women gain financial confidence.',
    image: '/images/Class-2.jpg'
  },
  {
    title: 'She Had No Clue How Much Money She Had',
    outlet: 'Yahoo News',
    date: 'September 2024',
    url: 'https://www.yahoo.com/news/she-had-no-clue-much-114224629.html',
    excerpt: 'National coverage of our mission to empower women through financial literacy.',
    image: '/images/Class-3.jpg'
  },
  {
    title: 'ICON Celebrates India\'s Independence Day',
    outlet: 'Hometown Weekly',
    date: 'August 2024',
    url: 'https://hometownweekly.net/needham/icon-celebrates-indias-independence-day/',
    excerpt: 'Community event featuring The Purple Wings and financial empowerment initiatives.',
    image: '/images/1st-gathering_Jul23-2.jpeg'
  }
]

export default function MediaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Media Coverage</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              See how The Purple Wings is making headlines by empowering women through financial literacy
            </p>
          </div>
        </div>
      </section>

      {/* Media Articles Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {mediaArticles.map((article, index) => (
              <a
                key={index}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative h-64">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {article.outlet}
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">{article.date}</div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-purple-600 transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <div className="flex items-center text-purple-600 font-semibold">
                    Read full article
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Press Kit Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Press Inquiries</h2>
          <p className="text-lg text-gray-600 mb-8">
            Interested in covering The Purple Wings? We'd love to share our story with you.
          </p>
          <a
            href="/contact"
            className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Contact Us for Press
          </a>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-gradient-to-br from-purple-100 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Impact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-gray-700">Women Empowered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-700">Workshops Conducted</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-gray-700">Free Education</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
