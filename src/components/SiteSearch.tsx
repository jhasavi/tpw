'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { searchSiteIndex } from '@/lib/site-search-index'

export default function SearchPageClient() {
  const searchParams = useSearchParams()
  const initial = searchParams.get('q') ?? ''
  const [query, setQuery] = useState(initial)

  const results = useMemo(() => searchSiteIndex(query), [query])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <section className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">Search The Purple Wings</h1>
          <p className="mt-3 text-purple-100">Find courses, events, newsletter, tools, and resources.</p>
        </div>
      </section>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <label className="block">
          <span className="sr-only">Search</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try: newsletter, events, courses, retirement…"
            className="w-full rounded-xl border border-purple-200 bg-white px-4 py-3 text-base shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
            autoFocus
          />
        </label>

        {query.trim().length > 0 && results.length === 0 && (
          <p className="mt-8 text-center text-slate-600">No matches. Try &quot;newsletter&quot;, &quot;events&quot;, or &quot;courses&quot;.</p>
        )}

        {results.length > 0 && (
          <ul className="mt-8 space-y-3">
            {results.map((entry) => {
              const external = entry.href.startsWith('http')
              return (
                <li key={`${entry.href}-${entry.title}`} className="rounded-xl border border-purple-100 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-xs font-semibold uppercase tracking-wide text-purple-600">{entry.category}</p>
                  {external ? (
                    <a href={entry.href} target="_blank" rel="noopener noreferrer" className="mt-1 block text-lg font-semibold text-slate-900 hover:text-purple-700">
                      {entry.title} ↗
                    </a>
                  ) : (
                    <Link href={entry.href} className="mt-1 block text-lg font-semibold text-slate-900 hover:text-purple-700">
                      {entry.title}
                    </Link>
                  )}
                  <p className="mt-1 text-sm text-slate-600">{entry.description}</p>
                </li>
              )
            })}
          </ul>
        )}
      </main>
    </div>
  )
}
