'use client'

import Link from 'next/link'
import Image from 'next/image'
import { EnhancedNewsletterForm } from '@/components/EnhancedNewsletterForm'

export default function NewsletterSubscribePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Hero Image */}
        <div className="relative h-64 mb-8 rounded-2xl overflow-hidden shadow-xl">
          <Image
            src="/images/purple-pen.jpg"
            alt="Financial education newsletter"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-indigo-900/80 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <div className="text-6xl mb-4">📨</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Weekly Financial Wisdom</h1>
              <p className="text-xl text-purple-100">Join 500+ women building financial confidence</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Enhanced Benefits Section */}
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl p-6">
              <h2 className="text-3xl font-bold mb-4">Why Subscribe?</h2>
              <p className="text-purple-100">
                Join thousands of women transforming their financial lives, one email at a time.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📚</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Weekly Financial Tips</h3>
                    <p className="text-gray-600 text-sm">
                      Practical, actionable advice on budgeting, investing, and building wealth — delivered every week.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🎓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Exclusive Course Updates</h3>
                    <p className="text-gray-600 text-sm">
                      Be the first to know about new lessons, workshops, and events in our community.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">👩‍👩‍👧‍👧</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Success Stories</h3>
                    <p className="text-gray-600 text-sm">
                      Inspiring stories from women who transformed their financial lives through education.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-pink-500">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Free Resources</h3>
                    <p className="text-gray-600 text-sm">
                      Exclusive downloadable guides, templates, and financial planning tools.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border-2 border-purple-200">
              <div className="flex items-center justify-center gap-3">
                <div className="text-2xl">⭐</div>
                <p className="text-center text-gray-700 font-medium">
                  <strong className="text-purple-700">500+ women</strong> already subscribed!
                </p>
                <div className="text-2xl">⭐</div>
              </div>
            </div>
          </div>

          {/* Enhanced Newsletter Widget */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-purple-100">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">📬</div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Get Weekly Financial Wisdom
                </h1>
                <p className="text-gray-600">
                  Join our community of empowered women building financial confidence
                </p>
              </div>

              <EnhancedNewsletterForm 
                title="Start Your Financial Journey"
                description="Get practical tips and exclusive content every week"
                variant="full"
                showBenefits={false}
                source="newsletter-page"
                onSuccess={() => {
                  // Optional: Track conversion or redirect
                  console.log('Newsletter subscription successful')
                }}
              />

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 text-center">
                  <strong>Privacy Promise:</strong> We respect your inbox. No spam, unsubscribe anytime.
                </p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link href="/" className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center gap-2 justify-center">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
