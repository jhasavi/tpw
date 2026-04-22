import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Real Women, Real Financial Journeys | The Purple Wings',
  description: 'Read inspiring stories from women in their 40s, 50s, and 60s who transformed their financial lives. Real struggles, real wins, real hope.',
}

const STORIES = [
  {
    id: 1,
    name: "Sarah M., 52",
    avatar: "https://images.unsplash.io/photo-1494790108755-2616b612c631?w=100&h=100&fit=crop&crop=face",
    age: "52",
    profession: "Marketing Manager",
    location: "Needham, MA",
    beforeAmount: "$8,500 debt",
    afterAmount: "$45,000 savings",
    timeframe: "18 months",
    quote: "I was drowning in credit card debt and terrified of retirement. Now I have emergency savings and a clear path to financial freedom.",
    tags: ["debt-free", "retirement-planning", "single-income"],
    featured: true,
    readTime: "8 min read"
  },
  {
    id: 2,
    name: "Maria R., 47",
    avatar: "https://images.unsplash.io/photo-1558769132-cb1aea45c1e5?w=100&h=100&fit=crop&crop=face",
    age: "47",
    profession: "Teacher",
    location: "Boston, MA",
    beforeAmount: "No retirement savings",
    afterAmount: "$125,000 invested",
    timeframe: "3 years",
    quote: "As a single mom, I thought I'd never catch up. The Purple Wings showed me how to make small changes that added up to big results.",
    tags: ["single-mom", "investing", "retirement"],
    featured: true,
    readTime: "10 min read"
  },
  {
    id: 3,
    name: "Linda T., 61",
    avatar: "https://images.unsplash.io/photo-1554151228-0bf1b2b5d1f5?w=100&h=100&fit=crop&crop=face",
    age: "61",
    profession: "Recently Retired",
    location: "Newton, MA",
    beforeAmount: "Anxious about outliving money",
    afterAmount: "Confident retirement plan",
    timeframe: "2 years",
    quote: "I thought it was too late for me at 60. Wrong! I learned to maximize Social Security and create income streams I never knew existed.",
    tags: ["late-starter", "social-security", "retirement-income"],
    featured: true,
    readTime: "12 min read"
  },
  {
    id: 4,
    name: "Jennifer K., 43",
    avatar: "https://images.unsplash.io/photo-1558769132-cb1aea45c1e5?w=100&h=100&fit=crop&crop=face",
    age: "43",
    profession: "Healthcare Worker",
    location: "Wellesley, MA",
    beforeAmount: "Living paycheck to paycheck",
    afterAmount: "$25,000 emergency fund",
    timeframe: "1 year",
    quote: "Working in healthcare during COVID made me realize I needed a safety net. Now I sleep better at night knowing I can handle emergencies.",
    tags: ["emergency-fund", "healthcare-worker", "financial-security"],
    featured: false,
    readTime: "6 min read"
  },
  {
    id: 5,
    name: "Patricia S., 58",
    avatar: "https://images.unsplash.io/photo-1558769132-cb1aea45c1e5?w=100&h=100&fit=crop&crop=face",
    age: "58",
    profession: "Small Business Owner",
    location: "Cambridge, MA",
    beforeAmount: "Business finances mixed with personal",
    afterAmount: "Separate business + personal wealth",
    timeframe: "2.5 years",
    quote: "I was treating my business like a piggy bank. Learning to separate business and personal finances saved my marriage and my company.",
    tags: ["small-business", "marriage-finance", "business-planning"],
    featured: false,
    readTime: "9 min read"
  }
]

export default function StoriesPage() {
  const featuredStories = STORIES.filter(s => s.featured)
  const allStories = STORIES

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Real Women, Real Financial Transformations
          </h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
            These aren't success stories from financial experts. They're stories from women just like you - 
            in their 40s, 50s, and 60s - who took control of their money and transformed their lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quiz/personality" className="bg-yellow-400 text-purple-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
              Start Your Journey
            </Link>
            <Link href="/newsletter/subscribe" className="bg-white/20 backdrop-blur text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors">
              Get Weekly Inspiration
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Stories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Transformations
            </h2>
            <p className="text-xl text-gray-600">
              Women who started exactly where you are now
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {featuredStories.map((story) => (
              <div key={story.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                      <Image
                        src={story.avatar}
                        alt={story.name}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{story.name}</h3>
                      <p className="text-sm text-gray-600">{story.profession}, {story.age}</p>
                      <p className="text-sm text-purple-600">{story.location}</p>
                    </div>
                  </div>
                  
                  <blockquote className="text-gray-700 italic mb-4 text-lg leading-relaxed">
                    "{story.quote}"
                  </blockquote>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-sm">
                      <span className="text-gray-500">From:</span>
                      <span className="text-red-600 font-semibold ml-1">{story.beforeAmount}</span>
                    </div>
                    <div className="text-sm text-right">
                      <span className="text-gray-500">To:</span>
                      <span className="text-green-600 font-semibold ml-1">{story.afterAmount}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-purple-600 font-medium">
                      {story.timeframe} journey
                    </span>
                    <span className="text-sm text-gray-500">
                      {story.readTime}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {story.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium">
                    Read Full Story
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Stories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              More Real Stories
            </h2>
            <p className="text-xl text-gray-600">
              Every journey starts with a single step
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {allStories.filter(s => !s.featured).map((story) => (
              <div key={story.id} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                    <Image
                      src={story.avatar}
                      alt={story.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{story.name}</h3>
                    <p className="text-sm text-gray-600">{story.profession}, {story.age}</p>
                  </div>
                </div>
                
                <blockquote className="text-gray-700 italic mb-4">
                  "{story.quote}"
                </blockquote>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-purple-600 font-medium">
                    {story.beforeAmount} to {story.afterAmount}
                  </span>
                  <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-purple-600 to-indigo-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Your Story Starts Here
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            These women were once exactly where you are. Unsure, anxious, but ready for change. 
            In 18 months, you could be someone else's inspiration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quiz/personality" className="bg-yellow-400 text-purple-900 px-8 py-4 rounded-lg font-bold hover:bg-yellow-300 transition-colors">
              Take the First Step: Free Assessment
            </Link>
            <Link href="/community" className="bg-white/20 backdrop-blur text-white px-8 py-4 rounded-lg font-bold hover:bg-white/30 transition-colors">
              Join Our Community
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
