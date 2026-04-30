'use client'

import Link from 'next/link'
import Image from 'next/image'
import { JanaganaNewsletter } from '@/components/JanaganaNewsletter'

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
              <p className="text-xl text-purple-100">Join thousands of women building financial confidence</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Benefits Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Subscribe?</h2>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📚</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Weekly Financial Tips</h3>
                  <p className="text-gray-600 text-sm">
                    Get practical, actionable advice on budgeting, investing, and building wealth — delivered every week.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎓</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Exclusive Course Updates</h3>
                  <p className="text-gray-600 text-sm">
                    Be the first to know about new lessons, workshops, and events happening in our community.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👩‍👩‍👧‍👧</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Success Stories</h3>
                  <p className="text-gray-600 text-sm">
                    Read inspiring stories from women who transformed their financial lives through education.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Free Resources</h3>
                  <p className="text-gray-600 text-sm">
                    Access to exclusive downloadable guides, templates, and financial planning tools.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
              <p className="text-center text-gray-700">
                <strong className="text-purple-700">Join 500+ women</strong> who receive our weekly newsletter!
              </p>
            </div>
          </div>

          {/* Newsletter Widget */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">📬</div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Subscribe to Our Newsletter
                </h1>
                <p className="text-gray-600">
                  Get weekly financial tips, course updates, and exclusive content delivered to your inbox.
                </p>
              </div>

              <JanaganaNewsletter 
                title="Subscribe to Our Newsletter"
                description="Get weekly financial tips, course updates, and exclusive content"
              />

              <p className="text-xs text-gray-500 text-center mt-4">
                By subscribing, you agree to receive emails from The Purple Wings. 
                You can unsubscribe at any time.
              </p>
            </div>

            <div className="mt-6 text-center">
              <Link href="/" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
