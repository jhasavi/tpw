// Server-side CRM retry logic with durable failure handling
// Replaces client-side localStorage with server-side database storage

import { crmFailureQueue } from './crm-failure-queue'
import { CRMError } from './crm-utils'

interface RetryOptions {
  maxRetries?: number
  initialDelay?: number
  maxDelay?: number
  backoffFactor?: number
}

interface FailedRequest {
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

// JanaGana API Configuration
export const CRM_CONFIG = {
  API_URL: process.env.JANAGANA_API_URL,
  API_KEY: process.env.JANAGANA_API_KEY,
  RETRY_CONFIG: {
    maxRetries: 3,
    initialDelay: 1000, // 1 second
    maxDelay: 10000, // 10 seconds
    backoffFactor: 2
  }
}

// Calculate exponential backoff delay
function calculateRetryDelay(
  retryCount: number,
  initialDelay: number,
  maxDelay: number,
  backoffFactor: number
): number {
  const delay = initialDelay * Math.pow(backoffFactor, retryCount)
  return Math.min(delay, maxDelay)
}

// Main retry function with server-side failure queue
export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {},
  context?: { userId?: string; email?: string; endpoint?: string }
): Promise<T> {
  const {
    maxRetries = CRM_CONFIG.RETRY_CONFIG.maxRetries || 3,
    initialDelay = CRM_CONFIG.RETRY_CONFIG.initialDelay || 1000,
    maxDelay = CRM_CONFIG.RETRY_CONFIG.maxDelay || 10000,
    backoffFactor = CRM_CONFIG.RETRY_CONFIG.backoffFactor || 2
  } = options

  let lastError: Error
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error as Error

      // Don't retry on client errors (4xx)
      if (error instanceof CRMError && error.statusCode && error.statusCode >= 400 && error.statusCode < 500) {
        throw error
      }

      // Don't retry on last attempt
      if (attempt === maxRetries) {
        break
      }

      // Add to server-side failure queue
      await crmFailureQueue.addFailedRequest({
        id: requestId,
        timestamp: new Date().toISOString(),
        endpoint: context?.endpoint || 'unknown',
        method: 'POST',
        payload: context,
        error: error instanceof Error ? error.message : 'Unknown error',
        statusCode: error instanceof CRMError ? error.statusCode : undefined,
        retryCount: attempt,
        userId: context?.userId,
        email: context?.email
      })

      const delay = calculateRetryDelay(attempt, initialDelay, maxDelay, backoffFactor)
      console.warn(`CRM operation failed, retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries + 1}):`, error)
      
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }

  throw lastError!
}

// CRM HTTP client with server-side retry logic
export class CRMClient {
  private static instance: CRMClient
  private failureQueue = crmFailureQueue

  static getInstance(): CRMClient {
    if (!CRMClient.instance) {
      CRMClient.instance = new CRMClient()
    }
    return CRMClient.instance
  }

  private getRequiredConfig(): { apiUrl: string; apiKey: string } {
    const apiUrl = CRM_CONFIG.API_URL
    const apiKey = CRM_CONFIG.API_KEY

    if (!apiUrl || !apiKey) {
      throw new Error('Missing required environment variables: JANAGANA_API_URL and JANAGANA_API_KEY')
    }

    return { apiUrl, apiKey }
  }

  async post(endpoint: string, payload: any, context?: { userId?: string; email?: string }): Promise<any> {
    return this.withRetryTracking('POST', endpoint, payload, async () => {
      const { apiUrl, apiKey } = this.getRequiredConfig()
      const response = await fetch(`${apiUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new CRMError(
          `POST ${endpoint} failed: ${response.statusText}`,
          response.status,
          await response.json().catch(() => ({}))
        )
      }

      return response.json()
    }, context)
  }

  async get(endpoint: string, context?: { userId?: string; email?: string }): Promise<any> {
    return this.withRetryTracking('GET', endpoint, null, async () => {
      const { apiUrl, apiKey } = this.getRequiredConfig()
      const response = await fetch(`${apiUrl}${endpoint}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        }
      })

      if (!response.ok) {
        throw new CRMError(
          `GET ${endpoint} failed: ${response.statusText}`,
          response.status,
          await response.json().catch(() => ({}))
        )
      }

      return response.json()
    }, context)
  }

  async patch(endpoint: string, payload: any, context?: { userId?: string; email?: string }): Promise<any> {
    return this.withRetryTracking('PATCH', endpoint, payload, async () => {
      const { apiUrl, apiKey } = this.getRequiredConfig()
      const response = await fetch(`${apiUrl}${endpoint}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new CRMError(
          `PATCH ${endpoint} failed: ${response.statusText}`,
          response.status,
          await response.json().catch(() => ({}))
        )
      }

      return response.json()
    }, context)
  }

  private async withRetryTracking<T>(
    method: string,
    endpoint: string,
    payload: any,
    operation: () => Promise<T>,
    context?: { userId?: string; email?: string }
  ): Promise<T> {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    try {
      return await withRetry(operation, CRM_CONFIG.RETRY_CONFIG, {
        userId: context?.userId,
        email: context?.email,
        endpoint
      })
    } catch (error) {
      // Add to failure queue for potential manual retry
      await this.failureQueue.addFailedRequest({
        id: requestId,
        timestamp: new Date().toISOString(),
        endpoint,
        method,
        payload,
        error: error instanceof Error ? error.message : 'Unknown error',
        statusCode: error instanceof CRMError ? error.statusCode : undefined,
        retryCount: CRM_CONFIG.RETRY_CONFIG.maxRetries || 3,
        userId: context?.userId,
        email: context?.email
      })
      throw error
    }
  }

  // Get failed requests for monitoring
  async getFailedRequests(): Promise<FailedRequest[]> {
    return await this.failureQueue.getFailedRequests()
  }

  // Get queue statistics
  async getQueueStats() {
    return await this.failureQueue.getStats()
  }

  // Manually retry failed requests
  async retryFailedRequests() {
    await this.failureQueue.processRetryQueue()
  }

  // Clean up old failures
  async cleanupOldFailures() {
    await this.failureQueue.cleanupOldFailures()
  }
}

// Export singleton instance
export const crmClient = CRMClient.getInstance()
