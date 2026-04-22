/**
 * Vercel Cron Job — Email Drip Sequence
 *
 * Runs daily at 10:00 UTC (6am ET). Sends the right drip email to users based
 * on how many days have passed since they signed up.
 *
 * Prerequisites — run this SQL in Supabase once:
 * ─────────────────────────────────────────────
 * CREATE TABLE IF NOT EXISTS email_drip_log (
 *   id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 *   user_id     uuid REFERENCES auth.users(id) ON DELETE CASCADE,
 *   email       text NOT NULL,
 *   drip_day    int NOT NULL,   -- 3, 7, or 14
 *   sent_at     timestamptz NOT NULL DEFAULT now(),
 *   UNIQUE(user_id, drip_day)
 * );
 * ALTER TABLE email_drip_log ENABLE ROW LEVEL SECURITY;
 * -- Admins only; users never read their own log
 * ─────────────────────────────────────────────
 *
 * Vercel cron schedule (already in vercel.json):
 *   "0 10 * * *"  → every day at 10:00 UTC
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendDripDay3, sendDripDay7, sendDripDay14 } from '@/lib/email'

// Service role bypasses RLS — only used server-side
const adminSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const DRIP_DAYS = [3, 7, 14] as const

export async function GET(request: NextRequest) {
  // Protect: only Vercel cron or requests with the cron secret
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const results: Array<{ email: string; day: number; status: string }> = []

  for (const day of DRIP_DAYS) {
    // Find profiles created exactly `day` days ago (±30 min window)
    const windowStart = new Date(Date.now() - (day * 86_400_000) - 1_800_000).toISOString()
    const windowEnd   = new Date(Date.now() - (day * 86_400_000) + 1_800_000).toISOString()

    const { data: profiles, error: profilesError } = await adminSupabase
      .from('profiles')
      .select('id, email, full_name')
      .gte('created_at', windowStart)
      .lte('created_at', windowEnd)

    if (profilesError) {
      console.error(`Error fetching profiles for day ${day}:`, profilesError)
      continue
    }

    for (const profile of (profiles ?? [])) {
      // Skip if this drip already sent
      const { data: alreadySent } = await adminSupabase
        .from('email_drip_log')
        .select('id')
        .eq('user_id', profile.id)
        .eq('drip_day', day)
        .maybeSingle()

      if (alreadySent) continue

      const name = profile.full_name || profile.email.split('@')[0]
      let result: { success: boolean }

      if (day === 3)  result = await sendDripDay3({ email: profile.email, name })
      else if (day === 7)  result = await sendDripDay7({ email: profile.email, name })
      else            result = await sendDripDay14({ email: profile.email, name })

      if (result.success) {
        // Record in log so we don't re-send
        await adminSupabase.from('email_drip_log').insert({
          user_id: profile.id,
          email: profile.email,
          drip_day: day,
        })
        results.push({ email: profile.email, day, status: 'sent' })
      } else {
        results.push({ email: profile.email, day, status: 'failed' })
      }
    }
  }

  return NextResponse.json({
    ok: true,
    processed: results.length,
    results,
  })
}
