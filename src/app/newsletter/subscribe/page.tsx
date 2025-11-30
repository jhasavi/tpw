'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function NewsletterSubscribePage() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/email/newsletter-welcome', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name: name || undefined }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe')
      }

      setSuccess(true)
      setEmail('')
      setName('')
    } catch (err) {
      console.error('Subscription error:', err)
      setError(err instanceof Error ? err.message : 'Failed to subscribe. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
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

          {success ? (
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 text-center">
              <div className="text-4xl mb-3">✅</div>
              <h2 className="text-xl font-bold text-green-900 mb-2">
                You're subscribed!
              </h2>
              <p className="text-green-700 mb-4">
                Check your email for a confirmation message.
              </p>
              <Link
                href="/"
                className="inline-block bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 font-medium"
              >
                Return Home
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name (Optional)
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Subscribing...' : 'Subscribe Now'}
              </button>

              <p className="text-xs text-gray-500 text-center">
                By subscribing, you agree to receive emails from The Purple Wings. 
                You can unsubscribe at any time.
              </p>
            </form>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
