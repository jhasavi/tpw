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
import { getAdminSupabase } from '@/lib/supabase/admin'
import {
  sendDripDay3,
  sendDripDay7,
  sendDripDay14,
  sendWinBackDay7,
  sendWinBackDay14,
  sendWinBackDay30,
} from '@/lib/email'
import { crmClient } from '@/lib/crm-retry-server'

const ONBOARDING_DRIP_DAYS = [3, 7, 14] as const

type CronResult = {
  email: string
  category: 'onboarding' | 'winback'
  day: number
  status: string
  reason?: string
}

function formatFailureReason(error: unknown): string {
  if (!error) return 'send_error'
  if (typeof error === 'string') return error
  if (error instanceof Error) return error.message
  try {
    return JSON.stringify(error).slice(0, 240)
  } catch {
    return 'send_error'
  }
}

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

function getInactivityBucket(daysSinceLastActivity: number): 7 | 14 | 30 | null {
  if (daysSinceLastActivity >= 30) return 30
  if (daysSinceLastActivity >= 14) return 14
  if (daysSinceLastActivity >= 7) return 7
  return null
}

function getBucketCooldownDays(bucket: 7 | 14 | 30): number {
  if (bucket === 7) return 21
  if (bucket === 14) return 30
  return 45
}

type WinBackProfile = {
  id: string
  email: string
  full_name?: string | null
  updated_at?: string | null
  created_at?: string | null
}

function updateLatestActivity(
  latestByUserId: Map<string, Date>,
  userId: string,
  candidateDateRaw?: string | null
) {
  if (!candidateDateRaw) return

  const candidate = new Date(candidateDateRaw)
  if (Number.isNaN(candidate.getTime())) return

  const existing = latestByUserId.get(userId)
  if (!existing || candidate > existing) {
    latestByUserId.set(userId, candidate)
  }
}

async function buildLatestActivityMap(profiles: WinBackProfile[]): Promise<Map<string, Date>> {
  const adminSupabase = getAdminSupabase()
  const latestByUserId = new Map<string, Date>()

  for (const profile of profiles) {
    updateLatestActivity(latestByUserId, profile.id, profile.created_at)
    updateLatestActivity(latestByUserId, profile.id, profile.updated_at)
  }

  const userIds = profiles.map((profile) => profile.id)
  if (userIds.length === 0 || !adminSupabase) return latestByUserId

  const chunkSize = 500

  for (let i = 0; i < userIds.length; i += chunkSize) {
    const chunk = userIds.slice(i, i + chunkSize)

    const [lessonRows, quizRows, streakRows] = await Promise.all([
      adminSupabase
        .from('lesson_progress')
        .select('user_id, updated_at')
        .in('user_id', chunk),
      adminSupabase
        .from('quiz_attempts')
        .select('user_id, created_at')
        .in('user_id', chunk),
      adminSupabase
        .from('learning_streaks')
        .select('user_id, last_activity_date, updated_at')
        .in('user_id', chunk),
    ])

    if (lessonRows.error) {
      console.warn('Failed to fetch lesson_progress activity chunk:', lessonRows.error)
    }
    if (quizRows.error) {
      console.warn('Failed to fetch quiz_attempts activity chunk:', quizRows.error)
    }
    if (streakRows.error) {
      console.warn('Failed to fetch learning_streaks activity chunk:', streakRows.error)
    }

    for (const row of lessonRows.data ?? []) {
      updateLatestActivity(latestByUserId, row.user_id, row.updated_at)
    }

    for (const row of quizRows.data ?? []) {
      updateLatestActivity(latestByUserId, row.user_id, row.created_at)
    }

    for (const row of streakRows.data ?? []) {
      updateLatestActivity(latestByUserId, row.user_id, row.updated_at)
      updateLatestActivity(latestByUserId, row.user_id, row.last_activity_date)
    }
  }

  return latestByUserId
}

async function isEligibleForWinBack(email: string): Promise<boolean> {
  const adminSupabase = getAdminSupabase()
  if (!adminSupabase) return true

  try {
    const { data } = await adminSupabase
      .from('newsletter_subscribers')
      .select('status')
      .eq('email', email)
      .maybeSingle()

    // If status exists and is not active, respect unsubscribe/inactive choice.
    if (data?.status && data.status !== 'active') {
      return false
    }

    return true
  } catch {
    // Never block campaign execution due to eligibility lookup errors.
    return true
  }
}

async function runOnboardingDrip(results: CronResult[], dryRun: boolean) {
  const adminSupabase = getAdminSupabase()
  if (!adminSupabase) return

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
      if (dryRun) {
        results.push({ email: profile.email, category: 'onboarding', day, status: 'dry-run' })
        continue
      }

      const payload = { email: profile.email, name, userId: profile.id }
      let sendResult: { success: boolean; error?: unknown }

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
        results.push({
          email: profile.email,
          category: 'onboarding',
          day,
          status: 'failed',
          reason: formatFailureReason(sendResult.error),
        })
      }
    }
  }
}

async function runWinBackDrip(results: CronResult[], dryRun: boolean) {
  const adminSupabase = getAdminSupabase()
  if (!adminSupabase) return

  const { data: profiles, error } = await adminSupabase
    .from('profiles')
    .select('id, email, full_name, updated_at, created_at')

  if (error) {
    console.error('Error fetching profiles for win-back sequence:', error)
    return
  }

  const typedProfiles = (profiles ?? []) as WinBackProfile[]
  const latestActivityByUserId = await buildLatestActivityMap(typedProfiles)
  const now = new Date()

  for (const profile of typedProfiles) {
    const eligible = await isEligibleForWinBack(profile.email)
    if (!eligible) {
      results.push({
        email: profile.email,
        category: 'winback',
        day: 0,
        status: 'skipped',
        reason: 'subscriber_inactive',
      })
      continue
    }

    const lastActivityAt = latestActivityByUserId.get(profile.id) ?? new Date(0)
    const daysSinceLastActivity = Math.floor((now.getTime() - lastActivityAt.getTime()) / 86_400_000)
    const inactivityBucket = getInactivityBucket(daysSinceLastActivity)

    if (!inactivityBucket) {
      continue
    }

    const resendCutoff = new Date(now.getTime() - getBucketCooldownDays(inactivityBucket) * 86_400_000).toISOString()
    const { data: alreadySent } = await adminSupabase
      .from('win_back_email_log')
      .select('id')
      .eq('user_id', profile.id)
      .eq('inactivity_day', inactivityBucket)
      .eq('status', 'sent')
      .gte('sent_at', resendCutoff)
      .maybeSingle()

    if (alreadySent) continue

    const { data: existingLog } = await adminSupabase
      .from('win_back_email_log')
      .select('attempts')
      .eq('user_id', profile.id)
      .eq('inactivity_day', inactivityBucket)
      .maybeSingle()
    const nextAttempts = (existingLog?.attempts || 0) + 1

    const name = profile.full_name || profile.email.split('@')[0]
    if (dryRun) {
      results.push({ email: profile.email, category: 'winback', day: inactivityBucket, status: 'dry-run' })
      continue
    }

    const payload = { email: profile.email, name, userId: profile.id }

    let sendResult: { success: boolean; error?: unknown }
    if (inactivityBucket === 7) sendResult = await sendWinBackDay7(payload)
    else if (inactivityBucket === 14) sendResult = await sendWinBackDay14(payload)
    else sendResult = await sendWinBackDay30(payload)

    const campaignId = toCampaignId(inactivityBucket)

    if (sendResult.success) {
      await adminSupabase.from('win_back_email_log').upsert({
        user_id: profile.id,
        email: profile.email,
        inactivity_day: inactivityBucket,
        segment: `inactive_${inactivityBucket}d`,
        status: 'sent',
        sent_at: new Date().toISOString(),
        attempts: nextAttempts,
        last_error: null,
        last_attempt_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id,inactivity_day',
      })

      await adminSupabase.from('email_campaign_events').insert({
        user_id: profile.id,
        email: profile.email,
        campaign_id: campaignId,
        event_type: 'sent',
        metadata: {
          source: 'cron_winback_sequence',
          inactivityBucket,
          daysSinceLastActivity,
        },
      })

      await updateCRMBucket(profile.email, profile.id, daysSinceLastActivity)
      results.push({ email: profile.email, category: 'winback', day: inactivityBucket, status: 'sent' })
    } else {
      await adminSupabase.from('win_back_email_log').upsert({
        user_id: profile.id,
        email: profile.email,
        inactivity_day: inactivityBucket,
        segment: `inactive_${inactivityBucket}d`,
        status: 'failed',
        sent_at: new Date().toISOString(),
        attempts: nextAttempts,
        last_error: formatFailureReason(sendResult.error),
        last_attempt_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id,inactivity_day',
      })

      results.push({
        email: profile.email,
        category: 'winback',
        day: inactivityBucket,
        status: 'failed',
        reason: formatFailureReason(sendResult.error),
      })
    }
  }
}

export async function GET(request: NextRequest) {
  // Protect: only Vercel cron or requests with the cron secret
  const cronSecret = process.env.CRON_SECRET
  if (!cronSecret) {
    console.error('CRON_SECRET is not configured for /api/cron/email-drip')
    return NextResponse.json({ error: 'Cron secret not configured' }, { status: 500 })
  }

  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const dryRun = request.nextUrl.searchParams.get('dryRun') === '1'

  const results: CronResult[] = []

  await runOnboardingDrip(results, dryRun)
  await runWinBackDrip(results, dryRun)

  return NextResponse.json({
    ok: true,
    dryRun,
    processed: results.length,
    onboarding: results.filter((item) => item.category === 'onboarding').length,
    winback: results.filter((item) => item.category === 'winback').length,
    results,
  })
}
