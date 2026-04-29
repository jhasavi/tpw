const API_URL = process.env.JANAGANA_API_URL || 'http://localhost:3000/api/plugin'
const API_KEY = process.env.JANAGANA_API_KEY

async function janaganaRequest(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'x-api-key': API_KEY,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: response.statusText }))
    throw new Error(`JanaGana API error: ${error.error || response.statusText}`)
  }

  return response.json()
}

// Create a contact/member when user signs up
export async function createMember(data: {
  email: string
  firstName: string
  lastName: string
  phone?: string
}) {
  return janaganaRequest('/crm/contacts', {
    method: 'POST',
    body: JSON.stringify({
      ...data,
      source: 'thepurplewings',
    }),
  })
}

// Fetch events for display
export async function getEvents() {
  return janaganaRequest('/events')
}

// Register for an event
export async function registerForEvent(data: {
  eventId: string
  email: string
  firstName: string
  lastName: string
  phone?: string
}) {
  return janaganaRequest('/event-registrations', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
