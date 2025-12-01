'use client'

import Link from 'next/link'
import Image from 'next/image'
import DonateButton from '@/components/DonateButton'

export default function PartnershipsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
              Partner With Us to Empower Women
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto">
              Join leading financial institutions in making a difference through financial literacy education
            </p>
          </div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Partner with The Purple Wings?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-purple-50 rounded-xl p-8">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Targeted Impact</h3>
              <p className="text-gray-700">
                Reach women who are actively seeking financial education and services. Our community is engaged, motivated, and ready to learn.
              </p>
            </div>
            <div className="bg-purple-50 rounded-xl p-8">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Community Trust</h3>
              <p className="text-gray-700">
                Build lasting relationships with our community through authentic educational partnerships and meaningful engagement.
              </p>
            </div>
            <div className="bg-purple-50 rounded-xl p-8">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Measurable Results</h3>
              <p className="text-gray-700">
                Track the impact of your partnership through engagement metrics, course completions, and community feedback.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop & Event Photos */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Workshops in Action</h2>
            <p className="text-xl text-gray-600">See the impact of financial education partnerships</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative h-72 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/Class-1.jpeg"
                alt="Financial literacy workshop"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white font-semibold">Interactive Workshops</p>
              </div>
            </div>
            <div className="relative h-72 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/Class-2.jpg"
                alt="Investment education session"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white font-semibold">Expert-Led Sessions</p>
              </div>
            </div>
            <div className="relative h-72 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/Class-3.jpg"
                alt="Community learning event"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white font-semibold">Community Engagement</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Crisis Planning & Insurance Section */}
      <section className="py-16 bg-gradient-to-br from-purple-100 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Financial Crisis Planning & Insurance Education
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-xl mb-6">
                Financial crises can happen to anyone—job loss, medical emergencies, family changes, or unexpected expenses. We believe in empowering women with the knowledge to prepare, protect, and recover.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What We Teach</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-purple-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-purple-700 mb-3">📋 Emergency Preparedness</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Building emergency funds (3-6 months expenses)</li>
                    <li>• Creating family financial crisis plans</li>
                    <li>• Document organization and backups</li>
                    <li>• Quick access to critical financial information</li>
                  </ul>
                </div>
                <div className="bg-purple-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-purple-700 mb-3">🛡️ Insurance Basics</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Health insurance coverage options</li>
                    <li>• Life insurance for family protection</li>
                    <li>• Disability and income protection</li>
                    <li>• Property and liability insurance</li>
                  </ul>
                </div>
                <div className="bg-purple-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-purple-700 mb-3">💰 Managing Financial Crises</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Prioritizing bills during hardship</li>
                    <li>• Negotiating with creditors</li>
                    <li>• Accessing emergency assistance programs</li>
                    <li>• Recovery planning and rebuilding</li>
                  </ul>
                </div>
                <div className="bg-purple-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-purple-700 mb-3">👩‍👧‍👦 Life Transitions</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Divorce and separation planning</li>
                    <li>• Widowhood financial management</li>
                    <li>• Caregiving and elder financial issues</li>
                    <li>• Single parent financial strategies</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
                <h4 className="text-lg font-semibold text-yellow-900 mb-2">🚨 Why This Matters</h4>
                <p className="text-yellow-800">
                  Studies show women are more likely to face financial crises due to caregiving responsibilities, longer lifespans, and wage gaps. 
                  Yet they're often underserved by traditional financial education. We're changing that.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Opportunities */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Partnership Opportunities
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border-2 border-purple-200 rounded-xl p-6 hover:border-purple-400 transition-all">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Course Sponsorship</h3>
              <p className="text-gray-700 text-sm">
                Sponsor specific courses or modules relevant to your services (insurance, banking, investing, etc.)
              </p>
            </div>
            <div className="border-2 border-purple-200 rounded-xl p-6 hover:border-purple-400 transition-all">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Educational Content</h3>
              <p className="text-gray-700 text-sm">
                Co-create educational materials that align with your expertise and our mission
              </p>
            </div>
            <div className="border-2 border-purple-200 rounded-xl p-6 hover:border-purple-400 transition-all">
              <div className="text-4xl mb-4">🎤</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Webinars & Workshops</h3>
              <p className="text-gray-700 text-sm">
                Host live educational sessions with your financial experts for our community
              </p>
            </div>
            <div className="border-2 border-purple-200 rounded-xl p-6 hover:border-purple-400 transition-all">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Corporate Programs</h3>
              <p className="text-gray-700 text-sm">
                Offer our courses as employee benefits or women's employee resource group initiatives
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Partnership Principles
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Education First</h3>
              <p className="text-gray-700">
                All partnerships prioritize education over sales. We maintain editorial independence.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Privacy Protected</h3>
              <p className="text-gray-700">
                We never share user data without explicit consent. Trust is our foundation.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💜</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Mission Aligned</h3>
              <p className="text-gray-700">
                Partners must share our commitment to women's financial empowerment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Make a Difference Together?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Let's explore how we can work together to empower women through financial education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact?subject=partnership"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-700 font-bold text-lg rounded-lg hover:bg-purple-50 shadow-xl transition-all"
            >
              Contact Us About Partnerships
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold text-lg rounded-lg hover:bg-white/10 transition-all"
            >
              Explore Our Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
