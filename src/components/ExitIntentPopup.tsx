'use client'

import { useState, useEffect } from 'react'
import { crmEventLoggerClient, EventType } from '@/lib/crm-events-client'
import { CRMFieldMapper } from '@/lib/crm-fields'

interface ExitIntentPopupProps {
  delay?: number // Delay before showing (ms)
  showOnce?: boolean // Show only once per session
}

export function ExitIntentPopup({ delay = 30000, showOnce = true }: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [marketingConsent, setMarketingConsent] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  // null = unknown, true = subscribed, false = not subscribed
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null)

  // Get current user info and check subscription status
  useEffect(() => {
    const initUser = async () => {
      try {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          setUserId(user.id)
          setUserEmail(user.email ?? null)
          // Pre-fill email field for logged-in users
          setEmail(user.email ?? '')

          // Derive first name from user metadata or email prefix
          const metaName: string =
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            user.user_metadata?.first_name ||
            ''
          const derivedFirst = metaName.split(' ')[0] || user.email?.split('@')[0] || ''
          setFirstName(derivedFirst)

          // Check if already subscribed — if so, suppress the popup entirely
          try {
            const res = await fetch('/api/newsletter/check-status', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: user.email }),
            })
            const data = await res.json()
            setIsSubscribed(data.isSubscribed === true)
          } catch {
            setIsSubscribed(false)
          }
        } else {
          setIsSubscribed(false)
        }
      } catch (error) {
        console.error('Failed to get current user:', error)
        setIsSubscribed(false)
      }
    }
    initUser()
  }, [])

  useEffect(() => {
    // Don't attach listeners until subscription status is resolved
    if (isSubscribed === null) return
    // Already subscribed — never show
    if (isSubscribed) return
    // Check if already shown this session
    if (showOnce && sessionStorage.getItem('exitIntentShown')) {
      return
    }

    let mouseLeaveTimer: NodeJS.Timeout
    let showTimer: NodeJS.Timeout

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves through top (user leaving site)
      if (e.clientY <= 0) {
        mouseLeaveTimer = setTimeout(() => {
          setIsVisible(true)
          if (showOnce) {
            sessionStorage.setItem('exitIntentShown', 'true')
          }
        }, 500)
      }
    }

    const handleMouseEnter = () => {
      clearTimeout(mouseLeaveTimer)
    }

    // Show after delay if user hasn't left
    showTimer = setTimeout(() => {
      if (!sessionStorage.getItem('exitIntentShown')) {
        setIsVisible(true)
        if (showOnce) {
          sessionStorage.setItem('exitIntentShown', 'true')
        }
      }
    }, delay)

    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      clearTimeout(mouseLeaveTimer)
      clearTimeout(showTimer)
    }
  }, [delay, showOnce, isSubscribed])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !marketingConsent) return

    setIsSubmitting(true)
    try {
      // Use newsletter API for consistency
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          firstName: firstName || 'Friend',
          lastName: '',
          source: 'exit-popup',
          tags: ['newsletter-subscriber', 'exit-intent-capture'],
          marketingConsent: marketingConsent
        })
      })

      if (response.ok) {
        // Log exit-intent submission to CRM
        try {
          await crmEventLoggerClient.logEvent({
            eventType: EventType.EXIT_INTENT_SUBMITTED,
            userId: userId || 'anonymous',
            email: userEmail || email,
            route: window.location.pathname,
            context: {
              trigger: 'exit_intent',
              source: 'exit-popup',
              marketingConsent: marketingConsent,
              hasUserId: !!userId,
              pageUrl: window.location.href
            },
            reporting: CRMFieldMapper.mergeReportingFields(
              CRMFieldMapper.mapFormSubmission('exit_intent'),
              { source: 'exit-popup' }
            )
          })
        } catch (eventError) {
          console.error('Failed to log exit-intent event:', eventError)
          // Don't fail the submission for event logging errors
        }

        setIsVisible(false)
        // Show success message
        setTimeout(() => {
          alert('🎉 Thanks! Check your email for your free financial planning guide.')
        }, 300)
      } else {
        const result = await response.json()
        if (result.error?.includes('already subscribed')) {
          setIsVisible(false)
          setTimeout(() => {
            alert('📬 You\'re already subscribed! Check your email for our latest newsletter.')
          }, 300)
        }
      }
    } catch (error) {
      console.error('Exit intent capture error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDismiss = () => {
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6">
          {/* Icon and Title */}
          <div className="text-center mb-6">
            <div className="text-4xl mb-3">🎁</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {firstName ? `${firstName}, before you go…` : 'Before You Go...'}
            </h3>
            <p className="text-gray-700 text-sm">Get our free financial planning guide!</p>
          </div>

          {/* Value Proposition */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📋</span>
              <div>
                <p className="text-sm font-medium text-yellow-900">Free 5-Step Financial Plan</p>
                <p className="text-xs text-yellow-700">Budget, savings, debt, investing, goals</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            
            {/* Marketing Consent Checkbox */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="marketing-consent"
                checked={marketingConsent}
                onChange={(e) => setMarketingConsent(e.target.checked)}
                className="mt-1 h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <label htmlFor="marketing-consent" className="text-sm text-gray-700">
                I'd like to receive financial tips and resources via email
              </label>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting || !email}
              className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Me The Guide'}
            </button>
          </form>

          {/* Alternative CTA */}
          <div className="text-center mt-4">
            <button
              onClick={handleDismiss}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              No thanks, I'll explore more
            </button>
            <p className="text-xs text-gray-400 mt-2">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
