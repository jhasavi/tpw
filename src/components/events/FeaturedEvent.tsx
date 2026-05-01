import Link from 'next/link'
import Image from 'next/image'
import type { WebsiteEvent } from '@/lib/events'

type FeaturedEventProps = {
  event: WebsiteEvent
}

function formatDate(dateInput: string): string {
  const date = new Date(dateInput)
  return date.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function toGoogleCalendarUrl(event: WebsiteEvent): string {
  const start = new Date(event.startDate)
  const end = event.endDate ? new Date(event.endDate) : new Date(start.getTime() + 60 * 60 * 1000)

  const toStamp = (date: Date) =>
    date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${toStamp(start)}/${toStamp(end)}`,
    details: `${event.shortSummary || event.description || ''}\n\n${event.detailsUrl || event.portalUrl || ''}`,
    location: event.location || (event.isVirtual ? 'Virtual event' : ''),
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export function FeaturedEvent({ event }: FeaturedEventProps) {
  const isFree = event.priceCents <= 0
  const isVirtual = event.isVirtual
  const detailsUrl = event.detailsUrl || event.portalUrl
  const registerUrl = event.registrationUrl || event.detailsUrl || event.portalUrl

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-700 via-purple-800 to-indigo-900 text-white shadow-2xl">
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="relative grid md:grid-cols-2 gap-8 p-8 lg:p-12">
        {/* Content */}
        <div className="flex flex-col justify-center space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center rounded-full bg-emerald-500/20 backdrop-blur px-4 py-2 text-sm font-semibold text-emerald-300 border border-emerald-400/30">
              🌟 Featured Event
            </div>
            
            <div className="flex items-center gap-3">
              <span className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold backdrop-blur ${
                isFree ? 'bg-emerald-600/80 text-white' : 'bg-blue-600/80 text-white'
              }`}>
                {isFree ? 'Free' : `$${(event.priceCents / 100).toFixed(2)}`}
              </span>
              
              <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur px-3 py-1.5 text-xs font-medium text-white border border-white/30">
                {event.format === 'VIRTUAL' ? '💻 Virtual' : event.format === 'HYBRID' ? '🔄 Hybrid' : '📍 In-Person'}
              </span>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            {event.title}
          </h1>

          <p className="text-lg text-purple-100 leading-relaxed">
            {event.shortSummary || event.description || 'Details coming soon.'}
          </p>

          <div className="space-y-3 text-purple-200">
            <div className="flex items-center">
              <span className="font-semibold mr-3">📅</span>
              <span>{formatDate(event.startDate)}</span>
            </div>
            
            <div className="flex items-center">
              <span className="font-semibold mr-3">{event.format === 'VIRTUAL' ? '💻' : '📍'}</span>
              <span>{event.location || (isVirtual ? 'Virtual event' : 'Location to be announced')}</span>
            </div>
            
            {event.speakerName && (
              <div className="flex items-center">
                <span className="font-semibold mr-3">👤</span>
                <span>{event.speakerName}</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            {registerUrl && (
              <Link
                href={registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-6 py-3 text-base font-semibold text-white hover:bg-emerald-600 transition-colors shadow-lg"
              >
                Register Now
              </Link>
            )}

            {detailsUrl && (
              <Link
                href={detailsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-base font-semibold text-white hover:bg-white/20 transition-colors backdrop-blur"
              >
                Learn More
              </Link>
            )}

            <Link
              href={toGoogleCalendarUrl(event)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-base font-semibold text-white hover:bg-white/20 transition-colors backdrop-blur"
            >
              📅 Add to Calendar
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-xl">
          {event.coverImageUrl ? (
            <Image
              src={event.coverImageUrl}
              alt={event.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-purple-600/20 to-indigo-600/20 flex items-center justify-center border-2 border-white/20">
              <div className="text-center">
                <div className="text-6xl mb-4">📅</div>
                <div className="text-xl text-purple-200 font-medium">Featured Event</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
