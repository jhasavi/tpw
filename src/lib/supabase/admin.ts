import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let adminClient: SupabaseClient | null = null

/** Lazy singleton — avoids build-time failure when env vars are unset. */
export function getAdminSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  if (!adminClient) {
    adminClient = createClient(url, key)
  }
  return adminClient
}
