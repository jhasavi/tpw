'use client'

import { useState } from 'react'
import { Star, TrendingUp, Heart, ArrowRight } from 'lucide-react'

interface Story {
  id: number
  name: string
  age: number
  location: string
  profession: string
  before: string
  after: string
  quote: string
  image: string
  timeframe: string
  category: StoryCategory
  featured: boolean
}

const SUCCESS_STORIES: Story[] = [
  {
    id: 1,
    name: "Sarah M.",
    age: 47,
    location: "Needham, MA",
    profession: "Marketing Manager",
    before: "$8,500 credit card debt, no savings",
    after: "Debt-free with $45,000 emergency fund",
    quote: "I was drowning in debt and terrified of retirement. The Purple Wings gave me a clear path to financial security. Now I sleep better at night.",
    image: "https://images.unsplash.io/photo-1494790108755-2616b612c631?w=200&h=200&fit=crop&crop=face",
    timeframe: "18 months",
    category: "debt",
    featured: true
  },
  {
    id: 2,
    name: "Maria R.",
    age: 54,
    location: "Boston, MA",
    profession: "Teacher",
    before: "No retirement savings, anxious about future",
    after: "$125,000 invested, confident retirement plan",
    quote: "At 52, I thought it was too late for me. The Purple Wings showed me it's never too late to start. I'm now on track for early retirement!",
    image: "https://images.unsplash.io/photo-1558769132-cb1aea45c1e5?w=200&h=200&fit=crop&crop=face",
    timeframe: "3 years",
    category: "retirement",
    featured: true
  },
  {
    id: 3,
    name: "Jennifer K.",
    age: 34,
    location: "Wellesley, MA",
    profession: "Healthcare Worker",
    before: "Living paycheck to paycheck",
    after: "$25,000 emergency fund, investing regularly",
    quote: "Working in healthcare during COVID made me realize I needed a safety net. The Purple Wings helped me build one and so much more.",
    image: "https://images.unsplash.io/photo-1554151228-0bf1b2b5d1f5?w=200&h=200&fit=crop&crop=face",
    timeframe: "1 year",
    category: "savings",
    featured: true
  },
  {
    id: 4,
    name: "Linda T.",
    age: 61,
    location: "Newton, MA",
    profession: "Recently Retired",
    before: "Anxious about outliving savings",
    after: "Confident retirement income plan",
    quote: "I retired at 60 worried sick. At 61, I'm sleeping better and even enjoying some travel thanks to my new financial plan.",
    image: "https://images.unsplash.io/photo-1558769132-cb1aea45c1e5?w=200&h=200&fit=crop&crop=face",
    timeframe: "2 years",
    category: "retirement",
    featured: false
  },
  {
    id: 5,
    name: "Patricia S.",
    age: 58,
    location: "Cambridge, MA",
    profession: "Small Business Owner",
    before: "Business finances mixed with personal",
    after: "Separate business + personal wealth building",
    quote: "I was treating my business like a piggy bank. Learning to separate finances saved my marriage and my company.",
    image: "https://images.unsplash.io/photo-1558769132-cb1aea45c1e5?w=200&h=200&fit=crop&crop=face",
    timeframe: "2.5 years",
    category: "investing",
    featured: false
  },
  {
    id: 6,
    name: "Amanda L.",
    age: 41,
    location: "Brookline, MA",
    profession: "Software Engineer",
    before: "High income, high spending, no savings",
    after: "$100,000+ investment portfolio",
    quote: "I earned good money but had nothing to show for it. The Purple Wings taught me how to build real wealth.",
    image: "https://images.unsplash.io/photo-1558769132-cb1aea45c1e5?w=200&h=200&fit=crop&crop=face",
    timeframe: "4 years",
    category: "investing",
    featured: false
  }
]

const CATEGORY_COLORS = {
  debt: "bg-red-100 text-red-700",
  retirement: "bg-purple-100 text-purple-700",
  savings: "bg-green-100 text-green-700",
  investing: "bg-blue-100 text-blue-700"
} as const

const CATEGORY_ICONS = {
  debt: "Credit Card",
  retirement: "Retirement",
  savings: "Savings",
  investing: "Investing"
} as const

type StoryCategory = keyof typeof CATEGORY_COLORS

export default function SuccessStories() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)

  const featuredStories = SUCCESS_STORIES.filter(story => story.featured)
  const filteredStories = selectedCategory 
    ? SUCCESS_STORIES.filter(story => story.category === selectedCategory)
    : showAll 
      ? SUCCESS_STORIES 
      : featuredStories

  const categories = Array.from(new Set(SUCCESS_STORIES.map(story => story.category)))

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Real Women, Real Transformations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            These aren't just success stories. They're real women from Massachusetts 
            who changed their financial lives with The Purple Wings.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !selectedCategory 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Stories
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category 
                  ? CATEGORY_COLORS[category]
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {CATEGORY_ICONS[category]}
            </button>
          ))}
        </div>

        {/* Stories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredStories.map((story) => (
            <div 
              key={story.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Story Header */}
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">{story.name}</h3>
                    <p className="text-sm text-gray-600">{story.age}, {story.location}</p>
                    <p className="text-sm text-purple-600">{story.profession}</p>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${CATEGORY_COLORS[story.category as StoryCategory]}`}>
                  {CATEGORY_ICONS[story.category as StoryCategory]}
                </span>
                </div>

                {/* Transformation */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Before:</span>
                    <span className="text-sm text-red-600">{story.before}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-medium text-gray-700">After:</span>
                    <span className="text-sm text-green-600">{story.after}</span>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-gray-700 italic mb-4">
                  "{story.quote}"
                </blockquote>

                {/* Timeframe */}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>Transformation in {story.timeframe}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More/Less */}
        {!selectedCategory && (
          <div className="text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-purple-700 transition-colors flex items-center gap-2 mx-auto"
            >
              {showAll ? 'Show Less' : 'View All Stories'}
              <ArrowRight className={`w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">
              Your Transformation Story Starts Here
            </h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Every woman on this page started exactly where you are now - 
              uncertain, anxious, but ready for change. In 18 months, you could be someone else's inspiration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/quiz/personality"
                className="bg-yellow-400 text-purple-900 px-8 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors"
              >
                Start Your Journey
              </a>
              <a 
                href="/campaigns/purple-wings-challenge"
                className="bg-white/20 backdrop-blur text-white px-8 py-3 rounded-lg font-bold hover:bg-white/30 transition-colors"
              >
                Join 7-Day Challenge
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
