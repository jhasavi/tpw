// Scheduled CRM replay job for automatic failure recovery
// Can be triggered by cron job or scheduled task

import { crmFailureQueue } from '@/lib/crm-failure-queue'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    // Verify this is a cron job request (you may need to adjust based on your cron service)
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET

    if (!cronSecret) {
      console.error('CRON_SECRET is not configured for /api/cron/crm-replay')
      return NextResponse.json({ error: 'Cron not configured' }, { status: 503 })
    }

    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized - cron secret required' },
        { status: 401 }
      )
    }

    console.log('Starting scheduled CRM replay job...')
    
    // Get current stats before processing
    const beforeStats = await crmFailureQueue.getStats()
    
    // Process retry queue
    await crmFailureQueue.processRetryQueue()
    
    // Get stats after processing
    const afterStats = await crmFailureQueue.getStats()
    
    // Clean up old failures (older than 7 days)
    await crmFailureQueue.cleanupOldFailures()
    
    const processedCount = beforeStats.pendingRetries - afterStats.pendingRetries
    
    console.log(`CRM replay job completed: processed ${processedCount} requests`)
    
    return NextResponse.json({
      success: true,
      job: 'scheduled-crm-replay',
      processedRequests: processedCount,
      remainingRequests: afterStats.pendingRetries,
      totalFailed: afterStats.totalFailed,
      oldestFailure: afterStats.oldestFailure,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Scheduled CRM replay job failed:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Scheduled replay job failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
