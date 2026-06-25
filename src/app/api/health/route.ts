import { NextResponse } from 'next/server'
import { getEnvChecks, missingRequiredEnv } from '@/lib/env-check'
import { isSupabaseConfigured } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

/**
 * Deep health check for monitoring (Vercel, uptime bots).
 * Returns 503 when required configuration is missing.
 */
export async function GET() {
  const checks = getEnvChecks()
  const missing = missingRequiredEnv()
  const supabaseConfigured = isSupabaseConfigured()

  const status = missing.length === 0 && supabaseConfigured ? 'healthy' : 'degraded'
  const httpStatus = missing.length === 0 ? 200 : 503

  return NextResponse.json(
    {
      status,
      service: 'the-purple-wings',
      version: process.env.npm_package_version || '2.0.0',
      timestamp: new Date().toISOString(),
      checks: {
        supabase: supabaseConfigured,
        env: checks,
        missingRequired: missing,
      },
    },
    {
      status: httpStatus,
      headers: { 'Cache-Control': 'no-store' },
    }
  )
}
