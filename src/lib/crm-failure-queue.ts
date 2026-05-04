// Server-side durable failure handling for CRM operations
// Replaces localStorage-based persistence with server-side storage

import { createClient } from '@/lib/supabase/server'

interface DatabaseRow {
  id: string
  timestamp: string
  endpoint: string
  method: string
  payload: any
  error: string
  status_code?: number
  retry_count: number
  user_id?: string
  email?: string
  created_at?: string
}

interface FailedCRMRequest {
  id: string
  timestamp: string
  endpoint: string
  method: string
  payload: any
  error: string
  statusCode?: number
  retryCount: number
  userId?: string
  email?: string
}

interface FailureQueueStats {
  totalFailed: number
  pendingRetries: number
  oldestFailure: string | null
  recentFailures: FailedCRMRequest[]
}

/**
 * Server-side CRM failure queue using Supabase database
 * Replaces localStorage-based persistence for durable server-side operations
 */
export class CRMFailureQueue {
  private static instance: CRMFailureQueue | null = null

  static getInstance(): CRMFailureQueue {
    if (!CRMFailureQueue.instance) {
      CRMFailureQueue.instance = new CRMFailureQueue()
    }
    return CRMFailureQueue.instance
  }

  static cleanup(): void {
    CRMFailureQueue.instance = null
  }

  /**
   * Add failed request to server-side queue
   */
  async addFailedRequest(request: FailedCRMRequest): Promise<void> {
    try {
      const supabase = await createClient()
      
      const { error } = await supabase
        .from('crm_failed_requests')
        .insert({
          id: request.id,
          timestamp: request.timestamp,
          endpoint: request.endpoint,
          method: request.method,
          payload: request.payload,
          error: request.error,
          status_code: request.statusCode,
          retry_count: request.retryCount,
          user_id: request.userId,
          email: request.email,
          created_at: new Date().toISOString()
        })

      if (error) {
        console.error('Failed to store CRM failure request in database:', error)
      }
    } catch (error) {
      console.error('CRM failure queue storage error:', error)
    }
  }

  /**
   * Get failed requests for retry
   */
  async getFailedRequests(maxRetries: number = 3): Promise<FailedCRMRequest[]> {
    try {
      const supabase = await createClient()
      
      const { data, error } = await supabase
        .from('crm_failed_requests')
        .select('*')
        .lt('retry_count', maxRetries)
        .order('created_at', { ascending: true })
        .limit(50)

      if (error) {
        console.error('Failed to retrieve CRM failure requests:', error)
        return []
      }

      return data?.map((row: DatabaseRow) => ({
        id: row.id,
        timestamp: row.timestamp,
        endpoint: row.endpoint,
        method: row.method,
        payload: row.payload,
        error: row.error,
        statusCode: row.status_code,
        retryCount: row.retry_count,
        userId: row.user_id,
        email: row.email
      })) || []
    } catch (error) {
      console.error('CRM failure queue retrieval error:', error)
      return []
    }
  }

  /**
   * Remove successfully retried request from queue
   */
  async removeFailedRequest(requestId: string): Promise<void> {
    try {
      const supabase = await createClient()
      
      const { error } = await supabase
        .from('crm_failed_requests')
        .delete()
        .eq('id', requestId)

      if (error) {
        console.error('Failed to remove CRM failure request:', error)
      }
    } catch (error) {
      console.error('CRM failure queue removal error:', error)
    }
  }

  /**
   * Update retry count for failed request
   */
  async updateRetryCount(requestId: string, retryCount: number): Promise<void> {
    try {
      const supabase = await createClient()
      
      const { error } = await supabase
        .from('crm_failed_requests')
        .update({ 
          retry_count: retryCount,
          last_retry_at: new Date().toISOString()
        })
        .eq('id', requestId)

      if (error) {
        console.error('Failed to update CRM request retry count:', error)
      }
    } catch (error) {
      console.error('CRM failure queue update error:', error)
    }
  }

  /**
   * Get queue statistics
   */
  async getStats(): Promise<FailureQueueStats> {
    try {
      // Check if we're in static generation context
      const isStaticGeneration = typeof window === 'undefined' && 
        typeof globalThis !== 'undefined' && 
        !(globalThis as any).requestId && 
        !(globalThis as any).fetch

      if (isStaticGeneration) {
        return {
          totalFailed: 0,
          pendingRetries: 0,
          oldestFailure: null,
          recentFailures: []
        }
      }
      
      const supabase = await createClient()
      
      // Get all stats in separate queries for reliability
      const { count: totalFailed, error: countError } = await supabase
        .from('crm_failed_requests')
        .select('*', { count: 'exact', head: true })

      const { count: pendingRetries, error: pendingError } = await supabase
        .from('crm_failed_requests')
        .select('*', { count: 'exact', head: true })
        .lt('retry_count', 3)

      const { data: oldest, error: oldestError } = await supabase
        .from('crm_failed_requests')
        .select('created_at')
        .order('created_at', { ascending: true })
        .limit(1)
        .maybeSingle()

      const { data: recent, error: recentError } = await supabase
        .from('crm_failed_requests')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)

      if (countError || pendingError || oldestError || recentError) {
        console.error('Error getting CRM failure queue stats:', { countError, pendingError, oldestError, recentError })
      }

      return {
        totalFailed: totalFailed || 0,
        pendingRetries: pendingRetries || 0,
        oldestFailure: oldest?.created_at || null,
        recentFailures: recent?.map((row: DatabaseRow) => ({
          id: row.id,
          timestamp: row.timestamp,
          endpoint: row.endpoint,
          method: row.method,
          payload: row.payload,
          error: row.error,
          statusCode: row.status_code,
          retryCount: row.retry_count,
          userId: row.user_id,
          email: row.email
        })) || []
      }
    } catch (error) {
      // Handle cookies error during static generation
      if (error instanceof Error && error.message.includes('cookies')) {
        return {
          totalFailed: 0,
          pendingRetries: 0,
          oldestFailure: null,
          recentFailures: []
        }
      }
      
      console.error('CRM failure queue stats error:', error)
      return {
        totalFailed: 0,
        pendingRetries: 0,
        oldestFailure: null,
        recentFailures: []
      }
    }
  }

  /**
   * Process retry queue
   */
  async processRetryQueue(): Promise<void> {
    const maxRetries = 3
    const requests = await this.getFailedRequests(maxRetries)
    
    for (const request of requests) {
      try {
        await this.retryRequest(request)
        await this.removeFailedRequest(request.id)
        console.log(`CRM request retry succeeded: ${request.id}`)
      } catch (error) {
        console.error(`CRM request retry failed: ${request.id}`, error)
        await this.updateRetryCount(request.id, request.retryCount + 1)
      }
    }
  }

  private async retryRequest(failedRequest: FailedCRMRequest): Promise<void> {
    const delay = this.calculateRetryDelay(failedRequest.retryCount)
    await new Promise(resolve => setTimeout(resolve, delay))

    // Validate environment variables
    const apiUrl = (globalThis as any).process?.env?.JANAGANA_API_URL
    const apiKey = (globalThis as any).process?.env?.JANAGANA_API_KEY

    if (!apiUrl || !apiKey) {
      throw new Error('Missing required environment variables: JANAGANA_API_URL and JANAGANA_API_KEY')
    }

    // Validate payload before JSON.stringify
    if (!failedRequest.payload || typeof failedRequest.payload !== 'object') {
      throw new Error('Invalid payload: must be a non-null object')
    }

    const serializedPayload = JSON.stringify(failedRequest.payload)
    if (serializedPayload.length > 10000) {
      throw new Error('Payload too large for retry (max 10KB)')
    }

    const response = await fetch(`${apiUrl}${failedRequest.endpoint}`, {
      method: failedRequest.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: serializedPayload
    })

    if (!response.ok) {
      throw new Error(`CRM retry failed: ${response.statusText}`)
    }
  }

  private calculateRetryDelay(retryCount: number): number {
    const initialDelay = 1000 // 1 second
    const maxDelay = 10000 // 10 seconds
    const backoffFactor = 2
    
    const delay = initialDelay * Math.pow(backoffFactor, retryCount)
    return Math.min(delay, maxDelay)
  }

  /**
   * Clean up old failures (older than 7 days)
   */
  async cleanupOldFailures(): Promise<void> {
    try {
      const supabase = await createClient()
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      
      const { error } = await supabase
        .from('crm_failed_requests')
        .delete()
        .lt('created_at', sevenDaysAgo)

      if (error) {
        console.error('Failed to cleanup old CRM failures:', error)
      } else {
        console.log('Cleaned up old CRM failure requests')
      }
    } catch (error) {
      console.error('CRM failure cleanup error:', error)
    }
  }
}

// Export singleton instance
export const crmFailureQueue = CRMFailureQueue.getInstance()
