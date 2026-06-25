'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SaveProgressBannerProps {
  isLoggedIn: boolean
}

export default function SaveProgressBanner({ isLoggedIn }: SaveProgressBannerProps) {
  const pathname = usePathname()

  if (isLoggedIn) return null

  const returnTo = encodeURIComponent(pathname || '/learn')

  return (
    <div className="mb-6 rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50 p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-gray-900">Studying without an account?</p>
          <p className="text-sm text-gray-600">
            Create a free account to save progress, earn certificates, and bookmark lessons.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Link
            href={`/auth/signup?returnTo=${returnTo}`}
            className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
          >
            Sign up free
          </Link>
          <Link
            href={`/auth/login?returnTo=${returnTo}`}
            className="rounded-lg border border-purple-300 px-4 py-2 text-sm font-medium text-purple-700 hover:bg-purple-100"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  )
}
