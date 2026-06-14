import { NextRequest, NextResponse } from 'next/server'
import { getAdminSupabase } from '@/lib/supabase/admin'

type TimeRange = '7d' | '30d' | '90d' | '1y'

function getDateCutoff(timeRange: TimeRange): Date {
  const now = new Date()
  const map: Record<TimeRange, number> = {
    '7d': 7,
    '30d': 30,
    '90d': 90,
    '1y': 365,
  }
  return new Date(now.getTime() - map[timeRange] * 24 * 60 * 60 * 1000)
}

function safePercent(numerator: number, denominator: number): number {
  if (!denominator) return 0
  return (numerator / denominator) * 100
}

export async function GET(request: NextRequest) {
  const adminSupabase = getAdminSupabase()
  if (!adminSupabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  }

  const timeRange = (request.nextUrl.searchParams.get('timeRange') || '30d') as TimeRange
  const cutoff = getDateCutoff(timeRange)
  const now = new Date()
  const cutoff7dIso = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
  const cutoff30dIso = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString()

  try {
    const [
      totalLeadsRes,
      todayRes,
      weekRes,
      monthRes,
      profileRowsRes,
      subscriberRowsRes,
      sourceRowsRes,
      segmentRowsRes,
      sentRowsRes,
      openRowsRes,
      clickRowsRes,
      campaignEventRowsRes,
      winBackFailureRowsRes,
      allProfilesRes,
      lessonActivityRes,
      quizActivityRes,
      streakActivityRes,
    ] = await Promise.all([
      adminSupabase.from('profiles').select('id', { count: 'exact', head: true }),
      adminSupabase.from('profiles').select('id', { count: 'exact', head: true }).gte('created_at', new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()),
      adminSupabase.from('profiles').select('id', { count: 'exact', head: true }).gte('created_at', new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()),
      adminSupabase.from('profiles').select('id', { count: 'exact', head: true }).gte('created_at', new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString()),
      adminSupabase.from('profiles').select('id, lead_score').gte('created_at', cutoff.toISOString()),
      adminSupabase.from('newsletter_subscribers').select('email').gte('subscribed_at', cutoff.toISOString()),
      adminSupabase.from('newsletter_subscribers').select('source').gte('subscribed_at', cutoff.toISOString()),
      adminSupabase.from('win_back_email_log').select('segment').gte('sent_at', cutoff.toISOString()),
      adminSupabase.from('email_campaign_events').select('id', { count: 'exact', head: true }).eq('event_type', 'sent').like('campaign_id', 'winback_%').gte('event_at', cutoff.toISOString()),
      adminSupabase.from('email_campaign_events').select('id', { count: 'exact', head: true }).eq('event_type', 'open').like('campaign_id', 'winback_%').gte('event_at', cutoff.toISOString()),
      adminSupabase.from('email_campaign_events').select('id', { count: 'exact', head: true }).eq('event_type', 'click').like('campaign_id', 'winback_%').gte('event_at', cutoff.toISOString()),
      adminSupabase
        .from('email_campaign_events')
        .select('campaign_id, event_type, link_url')
        .like('campaign_id', 'winback_%')
        .gte('event_at', cutoff.toISOString()),
      adminSupabase
        .from('win_back_email_log')
        .select('email, inactivity_day, status, last_error, sent_at')
        .eq('status', 'failed')
        .gte('sent_at', cutoff.toISOString())
        .order('sent_at', { ascending: false })
        .limit(20),
      adminSupabase
        .from('profiles')
        .select('id, created_at'),
      adminSupabase
        .from('lesson_progress')
        .select('user_id, updated_at')
        .gte('updated_at', cutoff30dIso),
      adminSupabase
        .from('quiz_attempts')
        .select('user_id, created_at')
        .gte('created_at', cutoff30dIso),
      adminSupabase
        .from('learning_streaks')
        .select('user_id, updated_at')
        .gte('updated_at', cutoff30dIso),
    ])

    const totalLeads = totalLeadsRes.count || 0
    const profiles = profileRowsRes.data || []
    const subscribers = subscriberRowsRes.data || []

    const leadScores = profiles
      .map((profile: any) => Number(profile.lead_score))
      .filter((score) => !Number.isNaN(score))

    const averageLeadScore = leadScores.length
      ? leadScores.reduce((sum, score) => sum + score, 0) / leadScores.length
      : 0

    const scoreBins = { A: 0, B: 0, C: 0, D: 0 }
    for (const score of leadScores) {
      if (score >= 80) scoreBins.A += 1
      else if (score >= 60) scoreBins.B += 1
      else if (score >= 40) scoreBins.C += 1
      else scoreBins.D += 1
    }

    const sourceCountMap = new Map<string, number>()
    for (const row of sourceRowsRes.data || []) {
      const source = row.source || 'unknown'
      sourceCountMap.set(source, (sourceCountMap.get(source) || 0) + 1)
    }

    const topSources = Array.from(sourceCountMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([source, count]) => ({
        source,
        count,
        percentage: safePercent(count, subscribers.length),
      }))

    const segmentCountMap = new Map<string, number>()
    for (const row of segmentRowsRes.data || []) {
      const segment = row.segment || 'unknown'
      segmentCountMap.set(segment, (segmentCountMap.get(segment) || 0) + 1)
    }

    const segmentTotal = (segmentRowsRes.data || []).length
    const segmentSizes = Array.from(segmentCountMap.entries()).map(([segment, size]) => ({
      segment,
      size,
      percentage: safePercent(size, segmentTotal),
    }))

    const sentCount = sentRowsRes.count || 0
    const openCount = openRowsRes.count || 0
    const clickCount = clickRowsRes.count || 0
    const failedCount = (winBackFailureRowsRes.data || []).length
    const totalAttempts = sentCount + failedCount
    const failureRate = totalAttempts ? failedCount / totalAttempts : 0

    const campaignAgg = new Map<string, { sent: number; open: number; click: number }>()
    const linkAgg = new Map<string, number>()
    for (const row of campaignEventRowsRes.data || []) {
      const key = row.campaign_id || 'winback_unknown'
      const bucket = campaignAgg.get(key) || { sent: 0, open: 0, click: 0 }
      if (row.event_type === 'sent') bucket.sent += 1
      if (row.event_type === 'open') bucket.open += 1
      if (row.event_type === 'click') bucket.click += 1
      campaignAgg.set(key, bucket)

      if (row.event_type === 'click' && row.link_url) {
        linkAgg.set(row.link_url, (linkAgg.get(row.link_url) || 0) + 1)
      }
    }

    const campaignPerformance = Array.from(campaignAgg.entries())
      .map(([campaignId, stats]) => ({
        campaignId,
        sent: stats.sent,
        opened: stats.open,
        clicked: stats.click,
        openRate: stats.sent ? stats.open / stats.sent : 0,
        clickRate: stats.sent ? stats.click / stats.sent : 0,
      }))
      .sort((a, b) => b.sent - a.sent)

    const topClickedLinks = Array.from(linkAgg.entries())
      .map(([url, clicks]) => ({ url, clicks }))
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 5)

    const profilesAll = allProfilesRes.data || []
    const eligible7dIds = new Set(
      profilesAll
        .filter((row: any) => row.created_at && row.created_at < cutoff7dIso)
        .map((row: any) => row.id)
    )
    const eligible30dIds = new Set(
      profilesAll
        .filter((row: any) => row.created_at && row.created_at < cutoff30dIso)
        .map((row: any) => row.id)
    )

    const active7dIds = new Set<string>()
    const active30dIds = new Set<string>()

    for (const row of lessonActivityRes.data || []) {
      if (row.user_id) {
        active30dIds.add(row.user_id)
        if (row.updated_at && row.updated_at >= cutoff7dIso) active7dIds.add(row.user_id)
      }
    }

    for (const row of quizActivityRes.data || []) {
      if (row.user_id) {
        active30dIds.add(row.user_id)
        if (row.created_at && row.created_at >= cutoff7dIso) active7dIds.add(row.user_id)
      }
    }

    for (const row of streakActivityRes.data || []) {
      if (row.user_id) {
        active30dIds.add(row.user_id)
        if (row.updated_at && row.updated_at >= cutoff7dIso) active7dIds.add(row.user_id)
      }
    }

    let returningUsers7d = 0
    let returningUsers30d = 0

    for (const userId of active7dIds) {
      if (eligible7dIds.has(userId)) returningUsers7d += 1
    }
    for (const userId of active30dIds) {
      if (eligible30dIds.has(userId)) returningUsers30d += 1
    }

    return NextResponse.json({
      totalLeads,
      newLeadsToday: todayRes.count || 0,
      newLeadsThisWeek: weekRes.count || 0,
      newLeadsThisMonth: monthRes.count || 0,
      conversionRate: totalLeads ? subscribers.length / totalLeads : 0,
      averageLeadScore,
      topSources,
      leadScoreDistribution: [
        { grade: 'A', count: scoreBins.A, percentage: safePercent(scoreBins.A, leadScores.length) },
        { grade: 'B', count: scoreBins.B, percentage: safePercent(scoreBins.B, leadScores.length) },
        { grade: 'C', count: scoreBins.C, percentage: safePercent(scoreBins.C, leadScores.length) },
        { grade: 'D', count: scoreBins.D, percentage: safePercent(scoreBins.D, leadScores.length) },
      ],
      segmentSizes,
      engagementMetrics: {
        emailOpenRate: sentCount ? openCount / sentCount : 0,
        emailClickRate: sentCount ? clickCount / sentCount : 0,
        websiteVisitRate: sentCount ? clickCount / sentCount : 0,
        quizCompletionRate: 0,
      },
      retentionMetrics: {
        sevenDayReturnRate: safePercent(returningUsers7d, eligible7dIds.size),
        thirtyDayReturnRate: safePercent(returningUsers30d, eligible30dIds.size),
        activeUsers7d: active7dIds.size,
        activeUsers30d: active30dIds.size,
        eligibleUsers7d: eligible7dIds.size,
        eligibleUsers30d: eligible30dIds.size,
      },
      winBackMetrics: {
        sent: sentCount,
        opened: openCount,
        clicked: clickCount,
        failed: failedCount,
        openRate: sentCount ? openCount / sentCount : 0,
        clickRate: sentCount ? clickCount / sentCount : 0,
        failureRate,
        campaignPerformance,
        topClickedLinks,
        recentFailures: (winBackFailureRowsRes.data || []).map((row) => ({
          email: row.email,
          inactivityDay: row.inactivity_day,
          reason: row.last_error || 'unknown',
          at: row.sent_at,
        })),
      },
    })
  } catch (error) {
    console.error('Failed to calculate lead analytics metrics:', error)
    return NextResponse.json({ error: 'Failed to load analytics metrics' }, { status: 500 })
  }
}
