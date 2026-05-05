'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { Mail, User, Phone, CheckCircle, Gift, Star, ArrowRight } from 'lucide-react'

interface EnhancedNewsletterFormProps {
  title?: string
  description?: string
  variant?: 'full' | 'minimal' | 'popup' | 'inline'
  showBenefits?: boolean
  onSuccess?: () => void
  source?: string
  className?: string
}

interface FormState {
  email: string
  firstName: string
  lastName: string
  phone: string
  marketingConsent: boolean
}

export function EnhancedNewsletterForm({ 
  title = "Get Weekly Financial Wisdom", 
  description = "Join 500+ women receiving practical money tips every week",
  variant = 'full',
  showBenefits = true,
  onSuccess,
  source = 'website',
  className = ""
}: EnhancedNewsletterFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [emailExists, setEmailExists] = useState(false)
  const [formData, setFormData] = useState<FormState>({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    marketingConsent: false
  })

  // Check if user is already subscribed
  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user?.email) {
          // Check if already subscribed
          const response = await fetch('/api/newsletter/check-status', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user.email })
          })
          
          if (response.ok) {
            const data = await response.json()
            if (data.isSubscribed) {
              setEmailExists(true)
              setFormData(prev => ({ ...prev, email: user.email || '' }))
            }
          }
        }
      } catch (error) {
        console.error('Failed to check subscription status:', error)
      }
    }
    
    checkSubscription()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.email || !formData.marketingConsent) {
      toast.error('Please provide email and consent to marketing communications')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source,
          tags: ['newsletter-subscriber'],
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        toast.success('🎉 Welcome! Check your email for confirmation.')
        onSuccess?.()
      } else {
        if (result.error?.includes('already subscribed')) {
          setEmailExists(true)
          toast.info('You\'re already subscribed! Check your email for our latest newsletter.')
        } else {
          toast.error(result.error || 'Failed to subscribe')
        }
      }
    } catch (error) {
      toast.error('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  if (isSubmitted) {
    return (
      <div className={`text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 ${className}`}>
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">Welcome to The Purple Wings!</h3>
        <p className="text-green-700 mb-4">
          Check your inbox for a confirmation email and your free financial planning guide.
        </p>
        <div className="bg-white rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Successfully subscribed</span>
          </div>
        </div>
        <p className="text-sm text-green-600">
          Look out for our next newsletter with practical financial tips!
        </p>
      </div>
    )
  }

  if (emailExists) {
    return (
      <div className={`text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200 ${className}`}>
        <div className="text-5xl mb-4">📬</div>
        <h3 className="text-2xl font-bold text-blue-800 mb-2">Already Subscribed!</h3>
        <p className="text-blue-700 mb-4">
          You're already on our list. Check your inbox for our latest newsletter!
        </p>
        <div className="bg-white rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 text-blue-600">
            <Mail className="w-5 h-5" />
            <span className="font-medium">{formData.email}</span>
          </div>
        </div>
        <p className="text-sm text-blue-600">
          Can't find our emails? Check your spam folder or contact us.
        </p>
      </div>
    )
  }

  const benefits = [
    { icon: '📚', title: 'Weekly Financial Tips', description: 'Practical advice you can use immediately' },
    { icon: '🎓', title: 'Exclusive Course Updates', description: 'Be first to know about new lessons' },
    { icon: '👩‍👩‍👧‍👧', title: 'Success Stories', description: 'Inspiring stories from women like you' },
    { icon: '🎯', title: 'Free Resources', description: 'Downloadable guides and templates' }
  ]

  if (variant === 'minimal') {
    return (
      <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
        <div className="flex gap-2">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={isSubmitting || !formData.email || !formData.marketingConsent}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? '...' : 'Subscribe'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="marketing-consent-minimal"
            name="marketingConsent"
            checked={formData.marketingConsent}
            onChange={handleChange}
            className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            required
          />
          <label htmlFor="marketing-consent-minimal" className="text-sm text-gray-600">
            I agree to receive weekly financial tips
          </label>
        </div>
      </form>
    )
  }

  if (variant === 'popup') {
    return (
      <div className={`p-6 ${className}`}>
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">🎁</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <Gift className="w-5 h-5 text-yellow-600" />
            <div>
              <p className="text-sm font-medium text-yellow-900">Free 5-Step Financial Plan</p>
              <p className="text-xs text-yellow-700">Budget, savings, debt, investing, goals</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email address"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            disabled={isSubmitting}
          />
          
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="marketing-consent-popup"
              name="marketingConsent"
              checked={formData.marketingConsent}
              onChange={handleChange}
              className="mt-1 h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              required
            />
            <label htmlFor="marketing-consent-popup" className="text-sm text-gray-700">
              I'd like to receive financial tips and resources via email
            </label>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting || !formData.email || !formData.marketingConsent}
            className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Send Me The Guide'}
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className={`max-w-md mx-auto ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>

      {showBenefits && (
        <div className="grid grid-cols-2 gap-3 mb-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-purple-50 rounded-lg p-3 text-center">
              <div className="text-2xl mb-1">{benefit.icon}</div>
              <h4 className="font-medium text-purple-900 text-sm mb-1">{benefit.title}</h4>
              <p className="text-xs text-purple-700">{benefit.description}</p>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            disabled={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First name"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              disabled={isSubmitting}
            />
          </div>
          <div className="relative">
            <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last name"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="relative">
          <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone (optional)"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            disabled={isSubmitting}
          />
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="marketing-consent"
              name="marketingConsent"
              checked={formData.marketingConsent}
              onChange={handleChange}
              className="mt-1 h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              required
            />
            <label htmlFor="marketing-consent" className="text-sm text-gray-700">
              <span className="font-medium">Yes, I want to receive weekly financial tips!</span>
              <span className="block text-gray-500 mt-1">
                Join 500+ women getting practical money advice every week. No spam, unsubscribe anytime.
              </span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !formData.email || !formData.marketingConsent}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Subscribing...
            </>
          ) : (
            <>
              Subscribe Now
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500">
        <Star className="w-3 h-3 text-yellow-500" />
        <span>Join 500+ women building financial confidence</span>
        <Star className="w-3 h-3 text-yellow-500" />
      </div>
    </div>
  )
}
