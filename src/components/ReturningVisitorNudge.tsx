'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const LAST_VISIT_KEY = 'tpw_last_visit'
const DISMISS_KEY = 'tpw_return_nudge_dismissed'

interface ReturningVisitorNudgeProps {
  className?: string
}

export default function ReturningVisitorNudge({ className = '' }: ReturningVisitorNudgeProps) {
  const [daysAway, setDaysAway] = useState<number | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const now = Date.now()
    const previous = localStorage.getItem(LAST_VISIT_KEY)
    const dismissed = sessionStorage.getItem(DISMISS_KEY)

    if (previous && !dismissed) {
      const diffMs = now - Number(previous)
      const computedDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

      if (computedDays >= 2) {
        setDaysAway(computedDays)
        setVisible(true)
      }
    }

    localStorage.setItem(LAST_VISIT_KEY, String(now))
  }, [])

  const dismiss = () => {
    setVisible(false)
    sessionStorage.setItem(DISMISS_KEY, '1')
  }

  if (!visible || daysAway === null) return null

  return (
    <div className={`rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-purple-50 p-5 shadow-sm ${className}`}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">Welcome back</p>
          <h3 className="mt-1 text-xl font-bold text-gray-900">
            You were away for {daysAway} day{daysAway === 1 ? '' : 's'}. We saved your next steps.
          </h3>
          <p className="mt-1 text-sm text-gray-700">
            Continue your last lesson, take a quick quiz, or start this month&apos;s challenge to rebuild momentum.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700"
          >
            Resume Learning
          </Link>
          <Link
            href="/quiz/personality"
            className="inline-flex items-center justify-center rounded-lg border border-purple-300 px-4 py-2 text-sm font-semibold text-purple-700 hover:bg-purple-100"
          >
            5-Min Quiz
          </Link>
          <button
            type="button"
            onClick={dismiss}
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-white"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  )
}
