'use client'

import { useState, useEffect } from 'react'
import { Users, GraduationCap, Target, TrendingUp, Award, Heart } from 'lucide-react'

interface Metric {
  icon: any
  value: number
  label: string
  description: string
  color: string
}

const IMPACT_METRICS: Metric[] = [
  {
    icon: Users,
    value: 527,
    label: "Women Served",
    description: "Across Massachusetts communities",
    color: "text-blue-600"
  },
  {
    icon: GraduationCap,
    value: 1247,
    label: "Courses Completed",
    description: "Financial education courses finished",
    color: "text-green-600"
  },
  {
    icon: Target,
    value: 89,
    label: "Success Rate %",
    description: "Women achieving financial goals",
    color: "text-purple-600"
  },
  {
    icon: TrendingUp,
    value: 45,
    label: "Average Savings Increase",
    description: "Monthly savings improvement",
    color: "text-yellow-600"
  },
  {
    icon: Award,
    value: 12,
    label: "Communities Built",
    description: "Local support networks created",
    color: "text-red-600"
  },
  {
    icon: Heart,
    value: 98,
    label: "Satisfaction %",
    description: "Member satisfaction rate",
    color: "text-pink-600"
  }
]

export default function ImpactMetrics() {
  const [animatedValues, setAnimatedValues] = useState<number[]>(new Array(IMPACT_METRICS.length).fill(0))
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animation when component comes into view
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const steps = 60
    const increment = IMPACT_METRICS.map(metric => metric.value / steps)

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      setAnimatedValues(prev => 
        prev.map((_, index) => 
          Math.min(Math.floor(increment[index] * currentStep), IMPACT_METRICS[index].value)
        )
      )

      if (currentStep >= steps) {
        clearInterval(timer)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isVisible])

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Real Impact, Real Lives Changed
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Numbers tell the story of transformation. Every statistic represents a woman 
            who gained confidence, security, and financial independence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {IMPACT_METRICS.map((metric, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow"
            >
              <div className={`w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <metric.icon className={`w-8 h-8 ${metric.color}`} />
              </div>
              
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {metric.label.includes('%') ? (
                  <>
                    {animatedValues[index]}%
                    {metric.label.includes('Savings') && <span className="text-lg text-gray-600 ml-1">more</span>}
                  </>
                ) : (
                  <>
                    {animatedValues[index].toLocaleString()}
                    {metric.label.includes('Monthly') && <span className="text-lg text-gray-600 ml-1">%</span>}
                  </>
                )}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {metric.label}
              </h3>
              
              <p className="text-gray-600 text-sm">
                {metric.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Be Our Next Success Story?
            </h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Join hundreds of Massachusetts women who've transformed their financial futures. 
              Your journey starts with a free, no-obligation assessment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/quiz/personality"
                className="bg-yellow-400 text-purple-900 px-8 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors"
              >
                Take Free Assessment
              </a>
              <a 
                href="/stories"
                className="bg-white/20 backdrop-blur text-white px-8 py-3 rounded-lg font-bold hover:bg-white/30 transition-colors"
              >
                Read Success Stories
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
