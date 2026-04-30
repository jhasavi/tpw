/**
 * Migration Script: Export past event registrations from Supabase and import to JanaGana CRM
 *
 * Usage:
 * 1. Update .env.local with your JanaGana API credentials
 * 2. Run: npx tsx scripts/migrate-to-janagana.ts
 *
 * This script:
 * - Exports all event registrations from Supabase
 * - Creates contacts in JanaGana CRM
 * - Creates activities for each past event registration
 * - Preserves all past event data
 */

import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// Load environment variables from .env.local
config({ path: '.env.local' })

const API_URL = process.env.JANAGANA_API_URL || 'https://janagana.namasteneedham.com/api/plugin'
const API_KEY = process.env.JANAGANA_API_KEY

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing required environment variables:')
  console.error('   NEXT_PUBLIC_SUPABASE_URL')
  console.error('   SUPABASE_SERVICE_ROLE_KEY')
  console.error('   JANAGANA_API_KEY')
  process.exit(1)
}

const adminSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function janaganaRequest(endpoint: string, options: RequestInit = {}) {
  if (!API_KEY) {
    throw new Error('JANAGANA_API_KEY is not configured')
  }
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

async function createContact(data: {
  email: string
  firstName: string
  lastName: string
  phone?: string
}) {
  return janaganaRequest('/crm/contacts', {
    method: 'POST',
    body: JSON.stringify({
      ...data,
      source: 'thepurplewings-migration',
    }),
  })
}

async function createActivity(data: {
  type: string
  description: string
  date: string
  contactEmail: string
}) {
  return janaganaRequest('/crm/activities', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

async function migrateEventRegistrations() {
  console.log('🚀 Starting migration of past event registrations...\n')

  // Fetch all event registrations from Supabase
  const { data: registrations, error } = await adminSupabase
    .from('event_registrations')
    .select('*')
    .order('registered_at', { ascending: false })

  if (error) {
    console.error('❌ Error fetching registrations:', error)
    process.exit(1)
  }

  console.log(`📊 Found ${registrations.length} event registrations to migrate\n`)

  let successCount = 0
  let errorCount = 0
  const errors: string[] = []

  for (const reg of registrations) {
    try {
      // Split name into first and last
      const nameParts = reg.name.split(' ')
      const firstName = nameParts[0] || ''
      const lastName = nameParts.slice(1).join('') || ''

      // Create contact in JanaGana
      await createContact({
        email: reg.email,
        firstName,
        lastName,
      })

      // Create activity for the event registration
      await createActivity({
        type: 'EVENT_REGISTRATION',
        description: `Registered for: ${reg.event_title}`,
        date: reg.registered_at,
        contactEmail: reg.email,
      })

      successCount++
      console.log(`✅ Migrated: ${reg.email} - ${reg.event_title}`)
    } catch (error) {
      errorCount++
      const errorMsg = error instanceof Error ? error.message : String(error)
      errors.push(`${reg.email} - ${reg.event_title}: ${errorMsg}`)
      console.log(`❌ Failed: ${reg.email} - ${reg.event_title}`)
    }
  }

  console.log('\n📊 Migration Summary:')
  console.log(`✅ Success: ${successCount}`)
  console.log(`❌ Errors: ${errorCount}`)
  console.log(`📊 Total: ${registrations.length}`)

  if (errors.length > 0) {
    console.log('\n❌ Errors:')
    errors.forEach(err => console.log(`  - ${err}`))
  }

  console.log('\n✨ Migration complete!')
}

async function migrateNewsletterSubscribers() {
  console.log('\n🚀 Starting migration of newsletter subscribers...\n')

  // Fetch all newsletter subscribers from Supabase
  const { data: subscribers, error } = await adminSupabase
    .from('newsletter_subscribers')
    .select('*')
    .order('subscribed_at', { ascending: false })

  if (error) {
    console.error('❌ Error fetching subscribers:', error)
    process.exit(1)
  }

  console.log(`📊 Found ${subscribers.length} newsletter subscribers to migrate\n`)

  let successCount = 0
  let errorCount = 0
  const errors: string[] = []

  for (const sub of subscribers) {
    try {
      // Split name into first and last
      const nameParts = sub.name ? sub.name.split(' ') : ['', '']
      const firstName = nameParts[0] || ''
      const lastName = nameParts.slice(1).join('') || ''

      // Create contact in JanaGana
      await createContact({
        email: sub.email,
        firstName,
        lastName,
      })

      successCount++
      console.log(`✅ Migrated: ${sub.email}`)
    } catch (error) {
      errorCount++
      const errorMsg = error instanceof Error ? error.message : String(error)
      errors.push(`${sub.email}: ${errorMsg}`)
      console.log(`❌ Failed: ${sub.email}`)
    }
  }

  console.log('\n📊 Newsletter Migration Summary:')
  console.log(`✅ Success: ${successCount}`)
  console.log(`❌ Errors: ${errorCount}`)
  console.log(`📊 Total: ${subscribers.length}`)

  if (errors.length > 0) {
    console.log('\n❌ Errors:')
    errors.forEach(err => console.log(`  - ${err}`))
  }

  console.log('\n✨ Newsletter migration complete!')
}

async function main() {
  console.log('🎯 JanaGana Data Migration Script')
  console.log('=====================================\n')

  // Migrate event registrations
  await migrateEventRegistrations()

  // Migrate newsletter subscribers
  await migrateNewsletterSubscribers()

  console.log('\n🎉 All migrations complete!')
}

main().catch(error => {
  console.error('❌ Migration failed:', error)
  process.exit(1)
})
