'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

interface LeadMetrics {
  totalLeads: number
  newLeadsToday: number
  newLeadsThisWeek: number
  newLeadsThisMonth: number
  conversionRate: number
  averageLeadScore: number
  topSources: Array<{ source: string; count: number; percentage: number }>
  leadScoreDistribution: Array<{ grade: string; count: number; percentage: number }>
  segmentSizes: Array<{ segment: string; size: number; percentage: number }>
  engagementMetrics: {
    emailOpenRate: number
    emailClickRate: number
    websiteVisitRate: number
    quizCompletionRate: number
  }
  retentionMetrics: {
    sevenDayReturnRate: number
    thirtyDayReturnRate: number
    activeUsers7d: number
    activeUsers30d: number
    eligibleUsers7d: number
    eligibleUsers30d: number
  }
  winBackMetrics: {
    sent: number
    opened: number
    clicked: number
    failed: number
    openRate: number
    clickRate: number
    failureRate: number
    campaignPerformance: Array<{
      campaignId: string
      sent: number
      opened: number
      clicked: number
      openRate: number
      clickRate: number
    }>
    topClickedLinks: Array<{
      url: string
      clicks: number
    }>
    recentFailures: Array<{
      email: string
      inactivityDay: number
      reason: string
      at: string
    }>
  }
}

export default function LeadAnalyticsDashboard() {
  const [metrics, setMetrics] = useState<LeadMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('30d')

  useEffect(() => {
    fetchMetrics()
  }, [timeRange])

  const fetchMetrics = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/analytics/leads?timeRange=${timeRange}`)
      if (response.ok) {
        const data = await response.json()
        setMetrics(data)
      }
    } catch (error) {
      console.error('Failed to fetch metrics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!metrics) {
    return (
      <div className="p-6">
        <div className="text-center text-gray-500">
          Failed to load analytics data
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lead Analytics</h1>
          <p className="text-gray-600">Track and analyze your lead generation performance</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="1y">Last year</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{metrics.totalLeads.toLocaleString()}</div>
            <p className="text-xs text-gray-500">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">New Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{metrics.newLeadsToday}</div>
            <p className="text-xs text-gray-500">+{((metrics.newLeadsToday / metrics.totalLeads) * 100).toFixed(1)}% of total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{(metrics.conversionRate * 100).toFixed(1)}%</div>
            <p className="text-xs text-gray-500">Newsletter to lead</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Lead Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{metrics.averageLeadScore.toFixed(1)}</div>
            <p className="text-xs text-gray-500">Out of 100</p>
          </CardContent>
        </Card>
      </div>

      {metrics.winBackMetrics.failureRate > 0.1 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800">Win-back Delivery Alert</CardTitle>
            <CardDescription className="text-red-700">
              Failure rate is {(metrics.winBackMetrics.failureRate * 100).toFixed(1)}% which exceeds the 10% threshold.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-red-800 mb-3">
              Sent: {metrics.winBackMetrics.sent} | Failed: {metrics.winBackMetrics.failed}
            </p>
            {metrics.winBackMetrics.recentFailures.length > 0 && (
              <div className="space-y-2">
                {metrics.winBackMetrics.recentFailures.slice(0, 3).map((failure, index) => (
                  <div key={`${failure.email}-${index}`} className="rounded-lg border border-red-200 bg-white p-3">
                    <p className="text-sm font-medium text-gray-900">
                      {failure.email} ({failure.inactivityDay}d)
                    </p>
                    <p className="text-xs text-gray-600 break-all">{failure.reason}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Growth Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Growth</CardTitle>
            <CardDescription>New leads over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">This Week</span>
                <span className="font-semibold">{metrics.newLeadsThisWeek}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">This Month</span>
                <span className="font-semibold">{metrics.newLeadsThisMonth}</span>
              </div>
              <div className="pt-2">
                <div className="text-sm text-gray-600 mb-1">Monthly Progress</div>
                <Progress value={(metrics.newLeadsThisMonth / 100) * 100} className="h-2" />
                <div className="text-xs text-gray-500 mt-1">Target: 100 leads/month</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Retention KPIs</CardTitle>
            <CardDescription>Returning users after signup</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">7-Day Return Rate</span>
                <Badge variant="secondary">{metrics.retentionMetrics.sevenDayReturnRate.toFixed(1)}%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">30-Day Return Rate</span>
                <Badge variant="secondary">{metrics.retentionMetrics.thirtyDayReturnRate.toFixed(1)}%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Active Users (7d)</span>
                <span className="font-semibold">{metrics.retentionMetrics.activeUsers7d}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Active Users (30d)</span>
                <span className="font-semibold">{metrics.retentionMetrics.activeUsers30d}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Engagement Metrics</CardTitle>
            <CardDescription>How leads interact with your content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Email Open Rate</span>
                <Badge variant="secondary">{(metrics.engagementMetrics.emailOpenRate * 100).toFixed(1)}%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Email Click Rate</span>
                <Badge variant="secondary">{(metrics.engagementMetrics.emailClickRate * 100).toFixed(1)}%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Website Visit Rate</span>
                <Badge variant="secondary">{(metrics.engagementMetrics.websiteVisitRate * 100).toFixed(1)}%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Quiz Completion Rate</span>
                <Badge variant="secondary">{(metrics.engagementMetrics.quizCompletionRate * 100).toFixed(1)}%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Sources */}
      <Card>
        <CardHeader>
          <CardTitle>Top Lead Sources</CardTitle>
          <CardDescription>Where your leads are coming from</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {metrics.topSources.map((source, index) => (
              <div key={source.source} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-sm font-medium text-purple-600">
                    {index + 1}
                  </div>
                  <span className="font-medium">{source.source}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{source.count} leads</span>
                  <Badge variant="outline">{source.percentage.toFixed(1)}%</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Campaign Comparison</CardTitle>
            <CardDescription>Performance by inactivity stage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {metrics.winBackMetrics.campaignPerformance.length === 0 && (
                <p className="text-sm text-gray-500">No campaign events yet.</p>
              )}
              {metrics.winBackMetrics.campaignPerformance.map((campaign) => (
                <div key={campaign.campaignId} className="rounded-lg border border-gray-200 p-3">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-900">{campaign.campaignId}</p>
                    <Badge variant="outline">{campaign.sent} sent</Badge>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <p className="text-gray-600">Open rate: {(campaign.openRate * 100).toFixed(1)}%</p>
                    <p className="text-gray-600">Click rate: {(campaign.clickRate * 100).toFixed(1)}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Clicked Destinations</CardTitle>
            <CardDescription>Which comeback links users click most</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {metrics.winBackMetrics.topClickedLinks.length === 0 && (
                <p className="text-sm text-gray-500">No click data yet.</p>
              )}
              {metrics.winBackMetrics.topClickedLinks.map((item, index) => (
                <div key={`${item.url}-${index}`} className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
                  <p className="text-sm text-gray-700 truncate max-w-[80%]">{item.url}</p>
                  <Badge>{item.clicks}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Win-back Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Win-back Campaign Performance</CardTitle>
          <CardDescription>Open and click performance for 7/14/30-day inactivity emails</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            <div>
              <p className="text-sm text-gray-600">Sent</p>
              <p className="text-2xl font-bold text-purple-700">{metrics.winBackMetrics.sent}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Opened</p>
              <p className="text-2xl font-bold text-blue-700">{metrics.winBackMetrics.opened}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Clicked</p>
              <p className="text-2xl font-bold text-green-700">{metrics.winBackMetrics.clicked}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Failed</p>
              <p className="text-2xl font-bold text-red-700">{metrics.winBackMetrics.failed}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Open Rate</p>
              <p className="text-2xl font-bold text-indigo-700">{(metrics.winBackMetrics.openRate * 100).toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Click Rate</p>
              <p className="text-2xl font-bold text-emerald-700">{(metrics.winBackMetrics.clickRate * 100).toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Failure Rate</p>
              <p className="text-2xl font-bold text-red-700">{(metrics.winBackMetrics.failureRate * 100).toFixed(1)}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lead Score Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Lead Score Distribution</CardTitle>
            <CardDescription>Quality of your leads</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {metrics.leadScoreDistribution.map((grade) => (
                <div key={grade.grade} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={grade.grade === 'A' ? 'default' : grade.grade === 'B' ? 'secondary' : 'outline'}
                    >
                      {grade.grade}
                    </Badge>
                    <span className="text-sm text-gray-600">
                      {grade.grade === 'A' ? 'Hot' : 
                       grade.grade === 'B' ? 'Warm' : 
                       grade.grade === 'C' ? 'Cool' : 'Cold'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">{grade.count}</span>
                    <div className="w-16">
                      <Progress value={grade.percentage} className="h-2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Segment Sizes</CardTitle>
            <CardDescription>Your custom segments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {metrics.segmentSizes.map((segment) => (
                <div key={segment.segment} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{segment.segment}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{segment.size}</span>
                    <Badge variant="outline">{segment.percentage.toFixed(1)}%</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
