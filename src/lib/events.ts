import { legacyPastEvents } from '@/data/events/past-events-legacy'

export type WebsiteEvent = {
  id: string
  title: string
  shortSummary: string | null
  description: string | null
  startDate: string
  endDate: string | null
  location: string | null
  coverImageUrl: string | null
  speakerName: string | null
  attendeeCount: number | null
  tags: string[]
  priceCents: number
  format: 'IN_PERSON' | 'VIRTUAL' | 'HYBRID'
  isVirtual: boolean
  detailsUrl: string | null
  registrationUrl: string | null
  portalUrl: string | null
  status: 'DRAFT' | 'PUBLISHED' | 'CANCELED' | 'COMPLETED'
}

type EmbedResponse = {
  success?: boolean
  data?: unknown
}

const API_URL = process.env.NEXT_PUBLIC_JANAGANA_API_URL || 'https://janagana.namasteneedham.com'
const TENANT_SLUG = process.env.NEXT_PUBLIC_JANAGANA_TENANT_SLUG || 'purple-wings'

function toAbsoluteUrl(url: unknown): string | null {
  if (typeof url !== 'string' || url.length === 0) return null
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  if (url.startsWith('/')) return `${API_URL}${url}`
  return null
}

function ensureArray(value: unknown): Record<string, unknown>[] {
  return Array.isArray(value) ? (value as Record<string, unknown>[]) : []
}

function toWebsiteEvent(input: Record<string, unknown>): WebsiteEvent | null {
  if (!input.id || !input.title || !input.startDate) return null

  return {
    id: String(input.id),
    title: String(input.title),
    shortSummary: typeof input.shortSummary === 'string' ? input.shortSummary : null,
    description: typeof input.description === 'string' ? input.description : null,
    startDate: String(input.startDate),
    endDate: typeof input.endDate === 'string' ? input.endDate : null,
    location: typeof input.location === 'string' ? input.location : null,
    coverImageUrl: typeof input.coverImageUrl === 'string' ? input.coverImageUrl : null,
    speakerName: typeof input.speakerName === 'string' ? input.speakerName : null,
    attendeeCount: typeof input.attendeeCount === 'number' ? input.attendeeCount : null,
    tags: Array.isArray(input.tags) ? input.tags.map((x) => String(x)) : [],
    priceCents: typeof input.priceCents === 'number' ? input.priceCents : 0,
    format: input.format === 'VIRTUAL' || input.format === 'HYBRID' ? input.format : 'IN_PERSON',
    isVirtual: Boolean(input.isVirtual),
    detailsUrl: toAbsoluteUrl(input.detailsUrl),
    registrationUrl: toAbsoluteUrl(input.registrationUrl),
    portalUrl: toAbsoluteUrl(input.portalUrl),
    status: input.status === 'DRAFT' || input.status === 'CANCELED' || input.status === 'COMPLETED'
      ? input.status
      : 'PUBLISHED',
  }
}

async function fetchEventSet(endpoint: 'events' | 'past-events', maxItems: number): Promise<WebsiteEvent[]> {
  const url = `${API_URL}/api/embed/${endpoint}?tenantSlug=${encodeURIComponent(TENANT_SLUG)}&maxItems=${maxItems}`

  try {
    const response = await fetch(url, {
      next: { revalidate: 300 },
    })

    if (!response.ok) return []

    const json = (await response.json()) as EmbedResponse
    if (!json.success) return []

    return ensureArray(json.data)
      .map(toWebsiteEvent)
      .filter((event): event is WebsiteEvent => event !== null)
  } catch (error) {
    console.warn('Failed to fetch website events:', error)
    return []
  }
}

function mapLegacyPastEvents(): WebsiteEvent[] {
  return legacyPastEvents.map((event) => ({
    id: event.id,
    title: event.title,
    shortSummary: event.description,
    description: event.description,
    startDate: event.startDate,
    endDate: null,
    location: event.location,
    coverImageUrl: event.coverImageUrl,
    speakerName: event.speakerName,
    attendeeCount: event.attendeeCount,
    tags: event.tags,
    priceCents: 0,
    format: 'IN_PERSON',
    isVirtual: false,
    detailsUrl: null,
    registrationUrl: null,
    portalUrl: null,
    status: 'COMPLETED',
  }))
}

export async function getWebsiteEvents() {
  const [upcoming, past] = await Promise.all([
    fetchEventSet('events', 12),
    fetchEventSet('past-events', 24),
  ])

  if (past.length > 0) {
    return { upcoming, past, usingLegacyPastFallback: false }
  }

  return {
    upcoming,
    past: mapLegacyPastEvents(),
    usingLegacyPastFallback: true,
  }
}
