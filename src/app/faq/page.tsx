'use client'

import { useState } from 'react'
import Link from 'next/link'

interface FAQItem {
  question: string
  answer: string
  category: string
}

const faqData: FAQItem[] = [
  // Getting Started
  {
    category: 'Getting Started',
    question: 'I have zero financial knowledge. Where should I start?',
    answer: 'Start with our "Financial Literacy Basics" course! It\'s designed for complete beginners and covers the fundamentals of managing money. You can also take our self-assessment quiz to get personalized recommendations.',
  },
  {
    category: 'Getting Started',
    question: 'How do I create an account?',
    answer: 'Click the "Sign Up" button in the top navigation. You can register with your email or use Google authentication for quick access.',
  },
  {
    category: 'Getting Started',
    question: 'Are the courses really free?',
    answer: 'Yes! All our core financial education courses are 100% free. We believe financial literacy should be accessible to everyone.',
  },
  
  // Courses & Learning
  {
    category: 'Courses & Learning',
    question: 'How long does it take to complete a course?',
    answer: 'Most courses take 3-5 hours to complete. You can learn at your own pace and your progress is automatically saved.',
  },
  {
    category: 'Courses & Learning',
    question: 'Can I download course materials?',
    answer: 'Yes! Each course includes downloadable worksheets, budgeting templates, and resource guides that you can save and use offline.',
  },
  {
    category: 'Courses & Learning',
    question: 'Do I get a certificate?',
    answer: 'Yes! You\'ll receive a completion certificate for each course you finish. These can be shared on LinkedIn or with employers.',
  },
  {
    category: 'Courses & Learning',
    question: 'Can I retake quizzes?',
    answer: 'Absolutely! Retake quizzes as many times as you want. Each attempt helps reinforce your learning.',
  },

  // Women-Specific
  {
    category: 'Women-Specific Topics',
    question: 'How does the content address the gender wage gap?',
    answer: 'We have dedicated content on salary negotiation, understanding your worth, and maximizing earnings despite the wage gap. Our courses specifically address how to compensate for earning less through strategic saving and investing.',
  },
  {
    category: 'Women-Specific Topics',
    question: 'Do you cover maternity leave financial planning?',
    answer: 'Yes! Our courses include guidance on preparing financially for maternity leave, managing reduced income, and maintaining retirement contributions during career breaks.',
  },
  {
    category: 'Women-Specific Topics',
    question: 'Is there content for stay-at-home moms?',
    answer: 'Absolutely! We cover topics like spousal IRAs, maintaining credit in your own name, financial independence strategies, and preparing to re-enter the workforce.',
  },

  // Technical
  {
    category: 'Technical & Support',
    question: 'Is my data secure?',
    answer: 'Yes! We use industry-standard encryption and secure servers. We never share your personal information without your consent.',
  },
  {
    category: 'Technical & Support',
    question: 'Can I access courses on mobile?',
    answer: 'Yes! Our website is fully mobile-responsive and works great on all devices.',
  },
  {
    category: 'Technical & Support',
    question: 'How do I report an issue?',
    answer: 'Contact us at info@thepurplewings.org or use the contact form. We typically respond within 24 hours.',
  },
]

export default function FAQPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  const categories = Array.from(new Set(faqData.map(item => item.category)))
  
  const filteredFAQs = searchQuery
    ? faqData.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqData

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
            Find quick answers to common questions about our platform, courses, and services.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="🔍 Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 rounded-lg text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-purple-300"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md">
            {categories.map((category) => {
              const categoryFAQs = filteredFAQs.filter(item => item.category === category)
              if (categoryFAQs.length === 0) return null

              return (
                <div key={category} className="border-b border-gray-200 last:border-b-0">
                  <div className="bg-purple-50 px-6 py-4">
                    <h2 className="text-lg font-semibold text-purple-900">{category}</h2>
                  </div>

                  <div className="divide-y divide-gray-200">
                    {categoryFAQs.map((item) => {
                      const globalIndex = faqData.findIndex(faq => faq === item)
                      return (
                        <div key={globalIndex} className="border-l-4 border-transparent hover:border-purple-500 transition-colors">
                          <button
                            onClick={() => toggleFAQ(globalIndex)}
                            className="w-full text-left px-6 py-4 focus:outline-none focus:bg-purple-50"
                          >
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-medium text-gray-900 pr-4">
                                {item.question}
                              </h3>
                              <svg
                                className={`h-5 w-5 text-purple-600 transform transition-transform flex-shrink-0 ${
                                  openFAQ === globalIndex ? 'rotate-180' : ''
                                }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </button>

                          {openFAQ === globalIndex && (
                            <div className="px-6 pb-4 text-gray-700 leading-relaxed">
                              {item.answer}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quiz CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl shadow-lg p-8 text-white">
            <div className="text-5xl mb-4">🎯</div>
            <h2 className="text-3xl font-bold mb-4">Test Your Financial Knowledge</h2>
            <p className="text-lg text-purple-100 mb-6 max-w-2xl mx-auto">
              Take our comprehensive self-assessment quiz and discover areas where you can improve your financial literacy.
            </p>
            <Link
              href="/learn/womens-financial-literacy/financial-literacy-basics/self-assessment"
              className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
            >
              Take the Quiz →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
