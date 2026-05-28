import type { Metadata } from 'next'
import Link from 'next/link'
import { EventCard } from '@/components/events/EventCard'
import { FeaturedEvent } from '@/components/events/FeaturedEvent'
import { getWebsiteEvents } from '@/lib/events'
import { janaganaPurpleWings } from '@/lib/janagana-portal'

export const metadata: Metadata = {
  title: 'Financial Education Events - The Purple Wings | Needham, MA',
  description:
    'Join free financial education workshops in Needham, Massachusetts. Explore upcoming and past events with expert speakers on investing, insurance, real estate, taxes, and retirement.',
}

export default async function EventsPage() {
  const { upcoming, past, usingLegacyPastFallback } = await getWebsiteEvents()
  const totalAttendees = past.reduce((sum, event) => sum + (event.attendeeCount || 0), 0)
  const featuredEvent = upcoming.length > 0 ? upcoming[0] : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-5">Financial Education Events</h1>
            <p className="text-lg md:text-xl text-purple-100">
              One consistent event experience powered by JanaGana. Explore upcoming sessions and our complete historical archive.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 bg-white border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-3xl font-bold text-purple-700">{upcoming.length}</p>
            <p className="text-sm text-slate-600">Upcoming Events</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-purple-700">{past.length}</p>
            <p className="text-sm text-slate-600">Past Events</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-purple-700">{totalAttendees}+</p>
            <p className="text-sm text-slate-600">Recorded Attendees</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-purple-700">100%</p>
            <p className="text-sm text-slate-600">Free Access</p>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
        {/* Featured Event */}
        {featuredEvent && (
          <section className="space-y-6">
            <div className="text-center">
              <p className="inline-flex bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
                Featured Event
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Don't Miss Our Next Workshop</h2>
              <p className="text-lg text-slate-600 mt-2">
                Join us for this special financial education session
              </p>
            </div>
            <FeaturedEvent event={featuredEvent} />
          </section>
        )}

        {/* Upcoming Events */}
        <section className="space-y-6">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <p className="inline-flex bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
                Upcoming
              </p>
              <h2 className="text-3xl font-bold text-slate-900">
                Register for Upcoming Sessions
              </h2>
            </div>
          </div>

          {upcoming.length === 0 ? (
            <div className="rounded-2xl border border-purple-100 bg-white p-10 text-center text-slate-600">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-xl font-semibold mb-2">No upcoming events listed yet</h3>
              <p className="mb-4">Browse all classes and register on our JanaGana community portal.</p>
              <a
                href={janaganaPurpleWings.portalHome()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-5 py-2.5 font-semibold text-white hover:bg-purple-700"
              >
                View classes &amp; register on JanaGana →
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {(featuredEvent ? upcoming.slice(1) : upcoming).map((event) => (
                <EventCard key={event.id} event={event} variant="upcoming" />
              ))}
            </div>
          )}
        </section>

        {/* Past Events */}
        <section className="space-y-6">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <p className="inline-flex bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
                Archive
              </p>
              <h2 className="text-3xl font-bold text-slate-900">Past Events</h2>
            </div>
          </div>

          {usingLegacyPastFallback && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              Displaying preserved local archive while JanaGana historical sync is being finalized.
            </div>
          )}

          {past.length === 0 ? (
            <div className="rounded-2xl border border-purple-100 bg-white p-10 text-center text-slate-600">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2">No archived events available yet</h3>
              <p>Our event archive will populate as we complete more workshops.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {past.map((event) => (
                <EventCard key={event.id} event={event} variant="past" />
              ))}
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="rounded-3xl bg-gradient-to-r from-purple-700 to-indigo-700 text-white p-10 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-3">Stay Updated on Future Events</h3>
          <p className="text-purple-100 max-w-2xl mx-auto mb-6">
            Join The Purple Wings community for notifications about upcoming workshops, webinars, and new event releases.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={janaganaPurpleWings.newsletter()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-2.5 font-semibold text-purple-700 hover:bg-purple-50"
            >
              Community updates (JanaGana)
            </a>
            <a
              href={janaganaPurpleWings.portalHome()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-purple-200 px-5 py-2.5 font-semibold text-white hover:bg-white/10"
            >
              Register for classes →
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}
