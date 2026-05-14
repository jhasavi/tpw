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
import {
  sendDripDay3,
  sendDripDay7,
  sendDripDay14,
  sendWinBackDay7,
  sendWinBackDay14,
  sendWinBackDay30,
} from '@/lib/email'
import { crmClient } from '@/lib/crm-retry-server'

// Service role bypasses RLS — only used server-side
const adminSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const ONBOARDING_DRIP_DAYS = [3, 7, 14] as const
const WINBACK_DAYS = [7, 14, 30] as const

type CronResult = { email: string; category: 'onboarding' | 'winback'; day: number; status: string }

function toCampaignId(day: number) {
  return `winback_${day}d`
}

async function updateCRMBucket(email: string, userId: string, inactivityDay: number) {
  try {
    const response = await crmClient.get(`/plugin/crm/contacts?search=${encodeURIComponent(email)}`, {
      userId,
      email,
    })

    const contact = response?.contacts?.[0]
    if (!contact?.id) return

    await crmClient.patch(
      `/plugin/crm/contacts/${contact.id}`,
      {
        customAttributes: {
          inactivity_bucket: `${inactivityDay}d`,
          days_since_last_activity: inactivityDay,
          reengagement_status: 'in_winback_sequence',
          last_engagement_type: 'winback_email_sent',
          last_engagement_at: new Date().toISOString(),
        },
      },
      { userId, email }
    )
  } catch (error) {
    console.warn(`Failed to update CRM bucket for ${email}:`, error)
  }
}

async function getLastActivityAt(userId: string, profileUpdatedAt?: string | null): Promise<Date> {
  const [lessonRow, quizRow, streakRow] = await Promise.all([
    adminSupabase
      .from('lesson_progress')
      .select('updated_at')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle(),
    adminSupabase
      .from('quiz_attempts')
      .select('created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle(),
    adminSupabase
      .from('learning_streaks')
      .select('last_activity_date, updated_at')
      .eq('user_id', userId)
      .maybeSingle(),
  ])

  const candidateDates = [
    profileUpdatedAt ? new Date(profileUpdatedAt) : null,
    lessonRow.data?.updated_at ? new Date(lessonRow.data.updated_at) : null,
    quizRow.data?.created_at ? new Date(quizRow.data.created_at) : null,
    streakRow.data?.updated_at ? new Date(streakRow.data.updated_at) : null,
    streakRow.data?.last_activity_date ? new Date(streakRow.data.last_activity_date) : null,
  ].filter((date): date is Date => !!date && !Number.isNaN(date.getTime()))

  if (candidateDates.length === 0) {
    return new Date(0)
  }

  return candidateDates.reduce((latest, current) => (current > latest ? current : latest))
}

async function runOnboardingDrip(results: CronResult[]) {
  for (const day of ONBOARDING_DRIP_DAYS) {
    const windowStart = new Date(Date.now() - (day * 86_400_000) - 1_800_000).toISOString()
    const windowEnd = new Date(Date.now() - (day * 86_400_000) + 1_800_000).toISOString()

    const { data: profiles, error: profilesError } = await adminSupabase
      .from('profiles')
      .select('id, email, full_name')
      .gte('created_at', windowStart)
      .lte('created_at', windowEnd)

    if (profilesError) {
      console.error(`Error fetching onboarding profiles for day ${day}:`, profilesError)
      continue
    }

    for (const profile of profiles ?? []) {
      const { data: alreadySent } = await adminSupabase
        .from('email_drip_log')
        .select('id')
        .eq('user_id', profile.id)
        .eq('drip_day', day)
        .maybeSingle()

      if (alreadySent) continue

      const name = profile.full_name || profile.email.split('@')[0]
      const payload = { email: profile.email, name, userId: profile.id }
      let sendResult: { success: boolean }

      if (day === 3) sendResult = await sendDripDay3(payload)
      else if (day === 7) sendResult = await sendDripDay7(payload)
      else sendResult = await sendDripDay14(payload)

      if (sendResult.success) {
        await adminSupabase.from('email_drip_log').insert({
          user_id: profile.id,
          email: profile.email,
          drip_day: day,
        })
        results.push({ email: profile.email, category: 'onboarding', day, status: 'sent' })
      } else {
        results.push({ email: profile.email, category: 'onboarding', day, status: 'failed' })
      }
    }
  }
}

async function runWinBackDrip(results: CronResult[]) {
  const { data: profiles, error } = await adminSupabase
    .from('profiles')
    .select('id, email, full_name, updated_at, created_at')

  if (error) {
    console.error('Error fetching profiles for win-back sequence:', error)
    return
  }

  const now = new Date()

  for (const profile of profiles ?? []) {
    const lastActivityAt = await getLastActivityAt(profile.id, profile.updated_at)
    const inactivityDay = Math.floor((now.getTime() - lastActivityAt.getTime()) / 86_400_000)

    if (!WINBACK_DAYS.includes(inactivityDay as (typeof WINBACK_DAYS)[number])) {
      continue
    }

    const { data: alreadySent } = await adminSupabase
      .from('win_back_email_log')
      .select('id')
      .eq('user_id', profile.id)
      .eq('inactivity_day', inactivityDay)
      .maybeSingle()

    if (alreadySent) continue

    const name = profile.full_name || profile.email.split('@')[0]
    const payload = { email: profile.email, name, userId: profile.id }

    let sendResult: { success: boolean }
    if (inactivityDay === 7) sendResult = await sendWinBackDay7(payload)
    else if (inactivityDay === 14) sendResult = await sendWinBackDay14(payload)
    else sendResult = await sendWinBackDay30(payload)

    const campaignId = toCampaignId(inactivityDay)

    if (sendResult.success) {
      await adminSupabase.from('win_back_email_log').insert({
        user_id: profile.id,
        email: profile.email,
        inactivity_day: inactivityDay,
        segment: `inactive_${inactivityDay}d`,
        status: 'sent',
      })

      await adminSupabase.from('email_campaign_events').insert({
        user_id: profile.id,
        email: profile.email,
        campaign_id: campaignId,
        event_type: 'sent',
        metadata: {
          source: 'cron_winback_sequence',
          inactivityDay,
        },
      })

      await updateCRMBucket(profile.email, profile.id, inactivityDay)
      results.push({ email: profile.email, category: 'winback', day: inactivityDay, status: 'sent' })
    } else {
      await adminSupabase.from('win_back_email_log').insert({
        user_id: profile.id,
        email: profile.email,
        inactivity_day: inactivityDay,
        segment: `inactive_${inactivityDay}d`,
        status: 'failed',
      })

      results.push({ email: profile.email, category: 'winback', day: inactivityDay, status: 'failed' })
    }
  }
}

export async function GET(request: NextRequest) {
  // Protect: only Vercel cron or requests with the cron secret
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const results: CronResult[] = []

  await runOnboardingDrip(results)
  await runWinBackDrip(results)

  return NextResponse.json({
    ok: true,
    processed: results.length,
    onboarding: results.filter((item) => item.category === 'onboarding').length,
    winback: results.filter((item) => item.category === 'winback').length,
    results,
  })
}
