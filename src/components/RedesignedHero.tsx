'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Play, Users, Target, ArrowRight, Star, CheckCircle } from 'lucide-react'

export default function RedesignedHero() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [stats, setStats] = useState({
    womenServed: 0,
    coursesCompleted: 0,
    communitiesBuilt: 0
  })

  const testimonials = [
    {
      name: "Sarah M.",
      age: 47,
      location: "Needham, MA",
      before: "$8,500 debt, no savings",
      after: "$45,000 emergency fund, debt-free",
      quote: "The Purple Wings changed my life. I went from living paycheck to paycheck to having real financial security.",
      image: "https://images.unsplash.io/photo-1494790108755-2616b612c631?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Maria R.",
      age: 54,
      location: "Boston, MA", 
      before: "No retirement planning",
      after: "$125K invested, confident retirement",
      quote: "At 52, I thought it was too late. The Purple Wings showed me it's never too late to start.",
      image: "https://images.unsplash.io/photo-1558769132-cb1aea45c1e5?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Jennifer K.",
      age: 34,
      location: "Wellesley, MA",
      before: "Anxious about finances",
      after: "Clear financial plan, building wealth",
      quote: "I finally feel in control of my money. The community support made all the difference.",
      image: "https://images.unsplash.io/photo-1554151228-0bf1b2b5d1f5?w=100&h=100&fit=crop&crop=face"
    }
  ]

  // Animate stats on mount
  useEffect(() => {
    const targetStats = {
      womenServed: 527,
      coursesCompleted: 1247,
      communitiesBuilt: 12
    }

    const duration = 2000
    const steps = 60
    const increment = {
      womenServed: targetStats.womenServed / steps,
      coursesCompleted: targetStats.coursesCompleted / steps,
      communitiesBuilt: targetStats.communitiesBuilt / steps
    }

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      setStats({
        womenServed: Math.floor(increment.womenServed * currentStep),
        coursesCompleted: Math.floor(increment.coursesCompleted * currentStep),
        communitiesBuilt: Math.floor(increment.communitiesBuilt * currentStep)
      })

      if (currentStep >= steps) {
        clearInterval(timer)
        setStats(targetStats)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [])

  // Rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const handleVideoPlay = () => {
    setIsPlaying(true)
    // In a real implementation, this would open a video modal
  }

  return (
    <section className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0 bg-repeat" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                500+ Women Served
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Founded 2020
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                Needham, MA
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Free Financial Education
                <span className="text-yellow-400"> That Changes Lives</span>
              </h1>
              <p className="text-xl text-purple-100 leading-relaxed max-w-2xl">
                Join 500+ Massachusetts women who've transformed their financial futures. 
                Free courses, personal guidance, and a community that understands your journey.
              </p>
            </div>

            {/* Value Proposition */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-bold mb-3">What Makes Us Different:</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>100% Free - No hidden costs or premium tiers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Designed by women, for women at every life stage</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Real community support, not just online courses</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/quiz/personality"
                className="bg-yellow-400 text-purple-900 px-8 py-4 rounded-lg font-bold hover:bg-yellow-300 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Target className="w-5 h-5" />
                Start Free Assessment
              </Link>
              <button
                onClick={handleVideoPlay}
                className="bg-white/20 backdrop-blur text-white px-8 py-4 rounded-lg font-bold hover:bg-white/30 transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" />
                Watch Success Stories
              </button>
            </div>
          </div>

          {/* Right Content - Video/Testimonial */}
          <div className="space-y-6">
            {/* Video Placeholder */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-purple-800 to-indigo-900 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto">
                    <Play className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Real Women, Real Transformations</h3>
                    <p className="text-purple-200">See how The Purple Wings changed their lives</p>
                  </div>
                </div>
              </div>
              
              {/* Floating Testimonial */}
              <div className="absolute -bottom-6 -right-6 bg-white text-gray-900 rounded-xl p-4 shadow-xl max-w-xs">
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-semibold text-sm">{testimonials[currentTestimonial].name}</div>
                    <div className="text-xs text-gray-600">{testimonials[currentTestimonial].age}, {testimonials[currentTestimonial].location}</div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 italic">
                  "{testimonials[currentTestimonial].quote}"
                </p>
              </div>
            </div>

            {/* Impact Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">{stats.womenServed}+</div>
                <div className="text-sm text-purple-200">Women Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">{stats.coursesCompleted}</div>
                <div className="text-sm text-purple-200">Courses Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">{stats.communitiesBuilt}</div>
                <div className="text-sm text-purple-200">Communities Built</div>
              </div>
            </div>
          </div>
        </div>

        {/* Founder Section */}
        <div className="mt-20 pt-12 border-t border-white/20">
          <div className="grid md:grid-cols-4 gap-8 items-center">
            <div className="flex justify-center md:justify-start">
              <div className="relative">
                <img
                  src="/images/founder-photo.jpg"
                  alt="Shalini Jha, Founder"
                  className="w-24 h-24 rounded-full border-4 border-white/20"
                  onError={(e) => {
                    // Fallback to placeholder if image doesn't exist
                    e.currentTarget.src = "https://images.unsplash.io/photo-1494790108755-2616b612c631?w=100&h=100&fit=crop&crop=face"
                  }}
                />
                <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-purple-900 rounded-full p-1">
                  <Star className="w-4 h-4" />
                </div>
              </div>
            </div>
            <div className="md:col-span-3">
              <h3 className="text-xl font-bold mb-2">Founded by Shalini Jha</h3>
              <p className="text-purple-100">
                "After seeing too many women struggle with financial insecurity, I created The Purple Wings 
                to provide the education and support every woman deserves. Financial independence isn't a luxury - 
                it's a necessity."
              </p>
              <div className="flex items-center gap-4 mt-3 text-sm text-purple-200">
                <span>Needham, Massachusetts</span>
                <span>Since 2020</span>
                <span>501(c)(3) Non-Profit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
