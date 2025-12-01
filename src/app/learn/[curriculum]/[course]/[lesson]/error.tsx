'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Lesson error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-50 p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
        <div className="text-6xl mb-4">📖</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Lesson</h2>
        <p className="text-gray-600 mb-6">
          We couldn't load this lesson. It might be unavailable or there was a connection issue.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/courses"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors"
          >
            View all courses
          </Link>
        </div>
      </div>
    </div>
  )
}
