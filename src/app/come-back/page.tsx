import type { Metadata } from 'next'
import Link from 'next/link'
import RevisitActionHub from '@/components/RevisitActionHub'

export const metadata: Metadata = {
  title: 'Comeback Plan | The Purple Wings',
  description:
    '10 practical actions to help registered users revisit The Purple Wings regularly and keep financial learning momentum.',
}

export default function ComeBackPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <section className="bg-gradient-to-r from-purple-700 to-indigo-800 py-16 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="inline-flex rounded-full bg-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-wide">
            Retention Focus
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold">Bring Users Back With Small, Repeatable Wins</h1>
          <p className="mt-4 text-lg text-purple-100 max-w-3xl mx-auto">
            This page bundles 10 implemented revisit ideas so your recent signups have clear reasons to return every week.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center rounded-lg bg-yellow-400 px-5 py-3 font-semibold text-purple-900 hover:bg-yellow-300"
            >
              Open Dashboard
            </Link>
            <Link
              href="/newsletter/subscribe"
              className="inline-flex items-center rounded-lg border border-white/40 px-5 py-3 font-semibold text-white hover:bg-white/10"
            >
              Enable Weekly Nudges
            </Link>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <RevisitActionHub
          title="10 Implemented Ideas To Increase Repeat Visits"
          description="These actions are all live and linked to real pages across your product experience."
        />
      </main>
    </div>
  )
}
