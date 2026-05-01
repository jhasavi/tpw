import Link from 'next/link'
import Image from 'next/image'
import type { WebsiteEvent } from '@/lib/events'

type EventCardProps = {
  event: WebsiteEvent
  variant: 'upcoming' | 'past' | 'featured'
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

function formatTime(dateInput: string): string {
  const date = new Date(dateInput)
  return date.toLocaleTimeString('en-US', {
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

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'financial basics': 'bg-blue-100 text-blue-700',
    'investing': 'bg-green-100 text-green-700',
    'insurance': 'bg-purple-100 text-purple-700',
    'real estate': 'bg-orange-100 text-orange-700',
    'taxes': 'bg-red-100 text-red-700',
    'retirement': 'bg-indigo-100 text-indigo-700',
    'community': 'bg-pink-100 text-pink-700',
  }
  return colors[category.toLowerCase()] || 'bg-gray-100 text-gray-700'
}

function getPrimaryTopic(event: WebsiteEvent): string | null {
  return event.tags.length > 0 ? event.tags[0] : null
}

function getEventIcon(format: string): string {
  switch (format) {
    case 'VIRTUAL': return '💻'
    case 'HYBRID': return '🔄'
    default: return '📍'
  }
}

export function EventCard({ event, variant }: EventCardProps) {
  const primaryTopic = getPrimaryTopic(event)
  const isFree = event.priceCents <= 0
  const isVirtual = event.isVirtual
  const detailsUrl = event.detailsUrl || event.portalUrl
  const registerUrl = event.registrationUrl || event.detailsUrl || event.portalUrl
  const categoryColor = primaryTopic ? getCategoryColor(primaryTopic) : 'bg-gray-100 text-gray-700'

  const isFeatured = variant === 'featured'
  const isPast = variant === 'past'

  return (
    <article className={`group relative overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 ${
      isFeatured ? 'md:col-span-2 md:row-span-2' : ''
    }`}>
      {/* Cover Image */}
      <div className={`relative ${isFeatured ? 'h-64' : 'h-48'} w-full overflow-hidden`}>
        {event.coverImageUrl ? (
          <Image
            src={event.coverImageUrl}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">📅</div>
              <div className="text-sm text-purple-600 font-medium">Financial Education</div>
            </div>
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          {isPast ? (
            <span className="inline-flex items-center rounded-full bg-gray-900/80 backdrop-blur px-3 py-1.5 text-xs font-semibold text-white">
              Archive
            </span>
          ) : (
            <span className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold backdrop-blur ${isFree ? 'bg-emerald-600/80 text-white' : 'bg-blue-600/80 text-white'}`}>
              {isFree ? 'Free' : `$${(event.priceCents / 100).toFixed(2)}`}
            </span>
          )}
        </div>

        {/* Format Badge */}
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur px-2 py-1 text-xs font-medium text-gray-700">
            <span className="mr-1">{getEventIcon(event.format)}</span>
            {event.format === 'VIRTUAL' ? 'Virtual' : event.format === 'HYBRID' ? 'Hybrid' : 'In-Person'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Category Badge */}
        {primaryTopic && (
          <div className="flex items-center justify-between">
            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${categoryColor}`}>
              {primaryTopic}
            </span>
            {isPast && event.attendeeCount && (
              <span className="text-xs text-gray-500">
                {event.attendeeCount} attended
              </span>
            )}
          </div>
        )}

        {/* Title */}
        <div>
          <h3 className={`font-bold text-slate-900 leading-tight ${isFeatured ? 'text-2xl' : 'text-lg'}`}>
            {event.title}
          </h3>
        </div>

        {/* Description */}
        <p className={`text-slate-600 line-clamp-3 ${
          isFeatured ? 'text-base' : 'text-sm'
        }`}>
          {event.shortSummary || event.description || 'Details coming soon.'}
        </p>

        {/* Event Details */}
        <div className="space-y-2 text-sm text-slate-700">
          <div className="flex items-center">
            <span className="font-semibold mr-2">📅</span>
            <span>{formatDate(event.startDate)}</span>
          </div>
          
          {event.endDate && (
            <div className="flex items-center">
              <span className="font-semibold mr-2">⏰</span>
              <span>{formatTime(event.startDate)} - {formatTime(event.endDate)}</span>
            </div>
          )}
          
          <div className="flex items-center">
            <span className="font-semibold mr-2">{getEventIcon(event.format)}</span>
            <span>{event.location || (isVirtual ? 'Virtual event' : 'Location to be announced')}</span>
          </div>
          
          {event.speakerName && (
            <div className="flex items-center">
              <span className="font-semibold mr-2">👤</span>
              <span>{event.speakerName}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {event.tags.length > 1 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {event.tags.slice(0, isFeatured ? 6 : 3).map((tag) => (
              <span 
                key={tag} 
                className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] text-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 pt-3">
          {!isPast && registerUrl && (
            <Link
              href={registerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-purple-700 transition-colors"
            >
              Register
            </Link>
          )}

          {detailsUrl && (
            <Link
              href={detailsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Details
            </Link>
          )}

          <Link
            href={toGoogleCalendarUrl(event)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            📅 Add to Calendar
          </Link>
        </div>
      </div>
    </article>
  )
}
