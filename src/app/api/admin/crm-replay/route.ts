// Admin API for CRM failure replay and recovery
// Supports manual admin-triggered replay of failed CRM requests

import { createClient } from '@/lib/supabase/server'
import { NextResponse, NextRequest } from 'next/server'
import { crmFailureQueue } from '@/lib/crm-failure-queue'

// Admin authentication check
async function verifyAdminAuth(request: NextRequest): Promise<boolean> {
  try {
    const supabase = await createClient()
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader?.startsWith('Bearer ')) {
      return false
    }
    
    const token = authHeader.substring(7)
    const { data: { user }, error } = await supabase.auth.getUser(token)
    
    if (error || !user) {
      return false
    }
    
    // Check if user has admin role (you may need to adjust this based on your auth system)
    const userRole = user.user_metadata?.role || user.app_metadata?.role
    return userRole === 'admin' || userRole === 'super_admin'
  } catch (error) {
    console.error('Admin auth verification failed:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    if (!(await verifyAdminAuth(request))) {
      return NextResponse.json(
        { error: 'Unauthorized - admin access required' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { action, limit = 50, dryRun = false } = body

    if (action === 'replay-all') {
      // Replay all eligible failed requests
      const stats = await crmFailureQueue.getStats()
      const eligibleCount = stats.pendingRetries
      
      if (dryRun) {
        return NextResponse.json({
          success: true,
          action: 'dry-run-replay-all',
          eligibleRequests: eligibleCount,
          message: `Would replay ${eligibleCount} failed requests`
        })
      }

      // Process replay
      await crmFailureQueue.processRetryQueue()
      
      const newStats = await crmFailureQueue.getStats()
      const processedCount = eligibleCount - newStats.pendingRetries
      
      return NextResponse.json({
        success: true,
        action: 'replay-all',
        processedRequests: processedCount,
        remainingRequests: newStats.pendingRetries,
        message: `Processed ${processedCount} failed requests`
      })
    }

    if (action === 'replay-by-email') {
      const { email } = body
      
      if (!email) {
        return NextResponse.json(
          { error: 'Email is required for replay-by-email action' },
          { status: 400 }
        )
      }

      // Get failed requests for specific email
      const failedRequests = await crmFailureQueue.getFailedRequests()
      const emailRequests = failedRequests.filter(req => req.email === email)
      
      if (dryRun) {
        return NextResponse.json({
          success: true,
          action: 'dry-run-replay-by-email',
          email,
          eligibleRequests: emailRequests.length,
          requests: emailRequests.map(req => ({
            id: req.id,
            timestamp: req.timestamp,
            endpoint: req.endpoint,
            error: req.error,
            retryCount: req.retryCount
          }))
        })
      }

      // Replay specific email's failed requests
      let processedCount = 0
      for (const request of emailRequests) {
        try {
          await crmFailureQueue.processRetryQueue()
          processedCount++
        } catch (error) {
          console.error(`Failed to replay request ${request.id}:`, error)
        }
      }

      return NextResponse.json({
        success: true,
        action: 'replay-by-email',
        email,
        processedRequests: processedCount,
        message: `Processed ${processedCount} failed requests for ${email}`
      })
    }

    if (action === 'cleanup') {
      // Clean up old failed requests
      await crmFailureQueue.cleanupOldFailures()
      
      return NextResponse.json({
        success: true,
        action: 'cleanup',
        message: 'Cleaned up old failed requests'
      })
    }

    return NextResponse.json(
      { error: 'Invalid action. Supported actions: replay-all, replay-by-email, cleanup' },
      { status: 400 }
    )

  } catch (error) {
    console.error('CRM replay API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    if (!(await verifyAdminAuth(request))) {
      return NextResponse.json(
        { error: 'Unauthorized - admin access required' },
        { status: 401 }
      )
    }

    // Get current failure queue statistics
    const stats = await crmFailureQueue.getStats()
    const recentFailures = stats.recentFailures.slice(0, 10) // Limit to 10 most recent

    return NextResponse.json({
      success: true,
      stats: {
        totalFailed: stats.totalFailed,
        pendingRetries: stats.pendingRetries,
        oldestFailure: stats.oldestFailure,
        recentFailures: recentFailures.map(req => ({
          id: req.id,
          timestamp: req.timestamp,
          endpoint: req.endpoint,
          error: req.error,
          retryCount: req.retryCount,
          email: req.email
        }))
      }
    })

  } catch (error) {
    console.error('CRM replay stats API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
