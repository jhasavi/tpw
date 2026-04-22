'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Play, ArrowRight, Users, Clock, Target } from 'lucide-react'

interface AgeTargetedHeroProps {
  userAge?: number
}

export default function AgeTargetedHero({ userAge }: AgeTargetedHeroProps) {
  const [detectedAge, setDetectedAge] = useState<number | null>(null)
  const [showAgePrompt, setShowAgePrompt] = useState(false)

  useEffect(() => {
    // Try to detect age from user profile or localStorage
    const savedAge = localStorage.getItem('userAge')
    if (savedAge) {
      setDetectedAge(parseInt(savedAge))
    } else if (userAge) {
      setDetectedAge(userAge)
    }
  }, [userAge])

  const getAgeGroup = (age: number) => {
    if (age < 40) return 'young-professional'
    if (age < 50) return 'early-career'
    if (age < 60) return 'peak-earner'
    return 'pre-retirement'
  }

  const getAgeGroupContent = (ageGroup: string) => {
    switch (ageGroup) {
      case 'young-professional':
        return {
          title: "Build Your Financial Foundation",
          subtitle: "Start smart, finish strong",
          description: "You're at the perfect age to build habits that will serve you for decades. Small steps now = huge impact later.",
          stats: [
            { icon: Target, label: "Best time to start", value: "Compound growth" },
            { icon: Clock, label: "Time to retirement", value: "30+ years" },
            { icon: Users, label: "Join others like you", value: "500+ women" }
          ],
          cta: "Start Your Journey",
          secondaryCta: "Explore Quick Wins",
          urgency: "low"
        }
      case 'early-career':
        return {
          title: "Accelerate Your Wealth Building",
          subtitle: "Your peak earning years are here",
          description: "Maximize your income while building long-term security. Strategic decisions now create freedom later.",
          stats: [
            { icon: Target, label: "Peak earning years", value: "Now" },
            { icon: Clock, label: "Critical window", value: "For retirement" },
            { icon: Users, label: "Women in 40s", value: "1,200+ served" }
          ],
          cta: "Maximize Your Potential",
          secondaryCta: "40s Life Stage Guide",
          urgency: "medium"
        }
      case 'peak-earner':
        return {
          title: "Secure Your Retirement Future",
          subtitle: "The countdown has begun",
          description: "10-15 years from retirement is make-or-break time. Every decision matters. Let's ensure you're ready.",
          stats: [
            { icon: Target, label: "Years to retirement", value: "10-15" },
            { icon: Clock, label: "Critical planning", value: "Window now" },
            { icon: Users, label: "Women in 50s", value: "800+ served" }
          ],
          cta: "Plan Your Retirement",
          secondaryCta: "Retirement Readiness Quiz",
          urgency: "high"
        }
      case 'pre-retirement':
        return {
          title: "Retirement Confidence Starts Now",
          subtitle: "Make your money last",
          description: "You're in the final stretch. Let's optimize Social Security, healthcare, and income streams for a secure retirement.",
          stats: [
            { icon: Target, label: "Retirement window", value: "0-10 years" },
            { icon: Clock, label: "Action required", value: "Immediately" },
            { icon: Users, label: "Women in 60s", value: "400+ served" }
          ],
          cta: "Retirement Planning",
          secondaryCta: "Bank Meeting Prep",
          urgency: "critical"
        }
      default:
        return {
          title: "Financial Empowerment for Women",
          subtitle: "Your journey to financial independence",
          description: "Free courses, community support, and expert guidance designed specifically for women at every stage of life.",
          stats: [
            { icon: Users, label: "Women empowered", value: "2,500+" },
            { icon: Target, label: "Courses available", value: "23" },
            { icon: Clock, label: "Free to start", value: "Anytime" }
          ],
          cta: "Start Learning",
          secondaryCta: "Take Assessment",
          urgency: "low"
        }
    }
  }

  const currentContent = detectedAge 
    ? getAgeGroupContent(getAgeGroup(detectedAge))
    : getAgeGroupContent('default')

  const handleAgeSelect = (age: number) => {
    setDetectedAge(age)
    localStorage.setItem('userAge', age.toString())
    setShowAgePrompt(false)
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200'
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      default: return 'text-purple-600 bg-purple-50 border-purple-200'
    }
  }

  return (
    <section className="bg-gradient-to-br from-purple-600 to-indigo-800 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Age Detection Prompt */}
        {!detectedAge && (
          <div className="text-center mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 inline-block">
              <h3 className="text-xl font-bold mb-4">Tell us your age for personalized content</h3>
              <div className="grid grid-cols-4 gap-3">
                {[20, 30, 40, 50].map((age) => (
                  <button
                    key={age}
                    onClick={() => handleAgeSelect(age)}
                    className="bg-white/20 hover:bg-white/30 rounded-lg py-3 px-4 transition-colors"
                  >
                    {age}s
                  </button>
                ))}
                {[60, 70].map((age) => (
                  <button
                    key={age}
                    onClick={() => handleAgeSelect(age)}
                    className="bg-white/20 hover:bg-white/30 rounded-lg py-3 px-4 transition-colors"
                  >
                    {age}+
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Personalized Hero Content */}
        <div className="text-center">
          {detectedAge && (
            <div className={`mb-6 inline-flex items-center gap-2 ${getUrgencyColor(currentContent.urgency)} px-4 py-2 rounded-full border`}>
              <span className="font-semibold">Age {detectedAge} Personalized</span>
            </div>
          )}
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {currentContent.title}
          </h1>
          
          <h2 className="text-2xl text-purple-100 mb-6">
            {currentContent.subtitle}
          </h2>
          
          <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
            {currentContent.description}
          </p>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {currentContent.stats.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <stat.icon className="w-8 h-8 mx-auto mb-3" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-purple-200">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href={detectedAge && detectedAge >= 50 ? "/life-stage/50s" : detectedAge && detectedAge >= 40 ? "/life-stage/40s" : "/quiz/personality"}
              className="bg-yellow-400 text-purple-900 px-8 py-4 rounded-lg font-bold hover:bg-yellow-300 transition-colors flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              {currentContent.cta}
            </Link>
            
            <Link 
              href={detectedAge && detectedAge >= 50 ? "/campaigns/past-attendees" : detectedAge && detectedAge >= 40 ? "/stories" : "/campaigns/purple-wings-challenge"}
              className="bg-white/20 backdrop-blur text-white px-8 py-4 rounded-lg font-bold hover:bg-white/30 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowRight className="w-5 h-5" />
              {currentContent.secondaryCta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
