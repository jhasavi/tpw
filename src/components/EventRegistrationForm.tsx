'use client'

import { useState } from 'react'

interface EventRegistrationFormProps {
  eventSlug: string
  eventTitle: string
}

export default function EventRegistrationForm({ eventSlug, eventTitle }: EventRegistrationFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/events/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, eventSlug, eventTitle }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setMessage(data.message)
        setName('')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong.')
      }
    } catch {
      setStatus('error')
      setMessage('Network error. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <div className="text-4xl mb-3">🎉</div>
        <h3 className="text-lg font-bold text-green-800 mb-1">You're registered!</h3>
        <p className="text-green-700 text-sm">{message}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor={`name-${eventSlug}`} className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          id={`name-${eventSlug}`}
          type="text"
          required
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Sarah Johnson"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
        />
      </div>
      <div>
        <label htmlFor={`email-${eventSlug}`} className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          id={`email-${eventSlug}`}
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="sarah@example.com"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
        />
      </div>
      {status === 'error' && (
        <p className="text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">{message}</p>
      )}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold rounded-lg transition-colors"
      >
        {status === 'loading' ? 'Registering…' : 'Register for Free →'}
      </button>
      <p className="text-xs text-gray-500 text-center">
        Free event. We'll email you details 48 hours before.
      </p>
    </form>
  )
}
