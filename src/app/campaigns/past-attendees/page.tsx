'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calendar, Users, Gift, Clock, CheckCircle, Mail, Phone, MessageCircle } from 'lucide-react'

const PAST_EVENTS = [
  {
    id: 1,
    name: "Financial Independence Workshop",
    date: "March 15, 2024",
    location: "Needham Community Center",
    attendees: 87,
    description: "Introduction to budgeting and saving strategies",
    image: "https://images.unsplash.io/photo-1557804506-669a67965ba0?w=400&h=250&fit=crop"
  },
  {
    id: 2,
    name: "Women & Investing Seminar",
    date: "February 28, 2024",
    location: "Boston Public Library",
    attendees: 124,
    description: "Basics of stock market and retirement investing",
    image: "https://images.unsplash.io/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop"
  },
  {
    id: 3,
    name: "Retirement Planning for Women",
    date: "January 20, 2024",
    location: "Newton Community Center",
    attendees: 65,
    description: "Social Security and retirement income strategies",
    image: "https://images.unsplash.io/photo-1573496359142-b8d87734a5a2?w=400&h=250&fit=crop"
  },
  {
    id: 4,
    name: "Financial Abuse Prevention",
    date: "December 10, 2023",
    location: "Wellesley Community Center",
    attendees: 43,
    description: "Recognizing and preventing financial abuse",
    image: "https://images.unsplash.io/photo-1554224155-6726b3ff8585?w=400&h=250&fit=crop"
  }
]

const REACTIVATION_OFFERS = [
  {
    title: "Welcome Back Premium",
    description: "3 months free premium access",
    value: "$89 value",
    expires: "14 days",
    code: "WELCOMEBACK24"
  },
  {
    title: "Bring a Friend Bonus",
    description: "You + friend get premium access",
    value: "$178 total value",
    expires: "30 days", 
    code: "FRIEND24"
  },
  {
    title: "Community Champion",
    description: "Free premium + 1:1 coaching session",
    value: "$250 value",
    expires: "21 days",
    code: "CHAMPION24"
  }
]

const SUCCESS_STORIES = [
  {
    name: "Jennifer K.",
    event: "March 2024 Workshop",
    before: "Living paycheck to paycheck",
    after: "$25,000 emergency fund",
    quote: "That workshop changed my life. I finally have a safety net and sleep better at night.",
    image: "https://images.unsplash.io/photo-1558769132-cb1aea45c1e5?w=100&h=100&fit=crop&crop=face"
  },
  {
    name: "Maria R.",
    event: "February 2024 Seminar", 
    before: "No retirement savings",
    after: "Started investing $500/month",
    quote: "I was terrified of investing, but the seminar made it simple. Now I'm on track!",
    image: "https://images.unsplash.io/photo-1494790108755-2616b612c631?w=100&h=100&fit=crop&crop=face"
  },
  {
    name: "Linda T.",
    event: "January 2024 Workshop",
    before: "Anxious about retirement",
    after: "Confident retirement plan",
    quote: "At 61, I thought it was too late. Wrong! I have a clear plan now.",
    image: "https://images.unsplash.io/photo-1554151228-0bf1b2b5d1f5?w=100&h=100&fit=crop&crop=face"
  }
]

export default function PastAttendeesPage() {
  const [selectedOffer, setSelectedOffer] = useState<number | null>(null)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [preferredContact, setPreferredContact] = useState<'email' | 'phone' | 'both'>('email')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleClaimOffer = (offerId: number) => {
    setSelectedOffer(offerId)
  }

  const submitClaim = async () => {
    if (!email && !phone) return
    
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)
      setSelectedOffer(null)
      setEmail('')
      setPhone('')
    }, 2000)
  }

  const contactMethods = [
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'phone', label: 'Phone Call', icon: Phone },
    { id: 'both', label: 'Both', icon: MessageCircle }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <span className="bg-yellow-400 text-purple-900 px-4 py-2 rounded-full text-sm font-bold">
              Welcome Back!
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            We've Evolved. We Miss You!
          </h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
            Since you last joined us, The Purple Wings has transformed into a comprehensive 
            digital platform with courses, community, and ongoing support. We want you back 
            with exclusive benefits just for past attendees.
          </p>
          
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <Users className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">319</div>
              <div className="text-purple-200 text-sm">Past Attendees</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <Calendar className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">24</div>
              <div className="text-purple-200 text-sm">Events Hosted</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <Gift className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">3</div>
              <div className="text-purple-200 text-sm">Exclusive Offers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <Clock className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">Limited</div>
              <div className="text-purple-200 text-sm">Time Remaining</div>
            </div>
          </div>
        </div>
      </section>

      {/* Past Events Gallery */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Journey Together
            </h2>
            <p className="text-xl text-gray-600">
              Remember these transformative moments? We've been growing!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PAST_EVENTS.map((event) => (
              <div key={event.id} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <div className="text-white">
                      <h3 className="font-bold text-lg">{event.name}</h3>
                      <p className="text-sm opacity-90">{event.date}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 text-sm mb-2">{event.description}</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-600 font-medium">
                      <Users className="w-4 h-4 inline mr-1" />
                      {event.attendees} attendees
                    </span>
                    <span className="text-gray-500">{event.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Women Like You Who Transformed
            </h2>
            <p className="text-xl text-gray-600">
              Your peers who attended our events and changed their financial lives
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {SUCCESS_STORIES.map((story, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">{story.name}</h3>
                    <p className="text-sm text-purple-600">{story.event}</p>
                  </div>
                </div>
                
                <blockquote className="text-gray-700 italic mb-4">
                  "{story.quote}"
                </blockquote>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="text-sm text-green-800">
                    <div className="font-medium">Transformation:</div>
                    <div>{story.before}</div>
                    <div className="text-green-600 font-semibold">{story.after}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exclusive Offers */}
      <section className="py-16 bg-gradient-to-br from-purple-600 to-indigo-800 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Exclusive Welcome Back Offers
            </h2>
            <p className="text-xl text-purple-100">
              Just for our past attendees - limited time, first come first served
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {REACTIVATION_OFFERS.map((offer, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="bg-yellow-400 text-purple-900 p-4 text-center">
                  <Gift className="w-8 h-8 mx-auto mb-2" />
                  <h3 className="text-xl font-bold">{offer.title}</h3>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-700 mb-4">{offer.description}</p>
                  
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4">
                    <div className="text-purple-800 font-semibold">{offer.value}</div>
                    <div className="text-purple-600 text-sm">Expires in {offer.expires}</div>
                  </div>
                  
                  <div className="bg-gray-100 rounded-lg p-2 mb-4">
                    <code className="text-purple-600 font-mono text-sm">{offer.code}</code>
                  </div>
                  
                  <button
                    onClick={() => handleClaimOffer(index)}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    Claim This Offer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Claim Modal */}
      {selectedOffer !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Claim Your Exclusive Offer
            </h3>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
              <h4 className="font-bold text-purple-900 mb-2">
                {REACTIVATION_OFFERS[selectedOffer].title}
              </h4>
              <p className="text-purple-700 text-sm">
                {REACTIVATION_OFFERS[selectedOffer].description}
              </p>
              <div className="text-purple-600 font-semibold mt-2">
                {REACTIVATION_OFFERS[selectedOffer].value}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                How should we contact you?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {contactMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPreferredContact(method.id as any)}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      preferredContact === method.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <method.icon className="w-5 h-5 mx-auto mb-1" />
                    <div className="text-xs">{method.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {(preferredContact === 'email' || preferredContact === 'both') && (
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            )}

            {(preferredContact === 'phone' || preferredContact === 'both') && (
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={submitClaim}
                disabled={isSubmitting || (!email && !phone)}
                className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Claiming...' : 'Claim Offer'}
              </button>
              <button
                onClick={() => setSelectedOffer(null)}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome Back!
            </h3>
            <p className="text-gray-600 mb-6">
              Your exclusive offer has been claimed! We'll contact you within 24 hours 
              with your premium access details.
            </p>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
              <div className="text-purple-800 font-semibold">Next Steps:</div>
              <ul className="text-purple-700 text-sm mt-2 text-left">
                <li>Check your email for confirmation</li>
                <li>Receive premium access within 24 hours</li>
                <li>Start your financial transformation journey</li>
              </ul>
            </div>
            
            <button
              onClick={() => setShowSuccess(false)}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Got It!
            </button>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Continue Your Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            The Purple Wings has grown so much since you last joined us. 
            New courses, community features, and ongoing support await.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/campaigns/purple-wings-challenge" className="bg-purple-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-purple-700 transition-colors">
              Start 7-Day Challenge
            </Link>
            <Link href="/stories" className="bg-purple-100 text-purple-700 px-8 py-4 rounded-lg font-bold hover:bg-purple-200 transition-colors">
              Read Success Stories
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
