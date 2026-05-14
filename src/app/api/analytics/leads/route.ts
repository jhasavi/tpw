import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const adminSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

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
  const timeRange = (request.nextUrl.searchParams.get('timeRange') || '30d') as TimeRange
  const cutoff = getDateCutoff(timeRange)
  const now = new Date()

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
      winBackMetrics: {
        sent: sentCount,
        opened: openCount,
        clicked: clickCount,
        openRate: sentCount ? openCount / sentCount : 0,
        clickRate: sentCount ? clickCount / sentCount : 0,
      },
    })
  } catch (error) {
    console.error('Failed to calculate lead analytics metrics:', error)
    return NextResponse.json({ error: 'Failed to load analytics metrics' }, { status: 500 })
  }
}
