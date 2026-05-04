// CRM Retry Logic and Failure Handling

import { CRM_CONFIG, CRMError } from './crm-utils'

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
}

class RetryQueue {
  private static instance: RetryQueue
  private failedRequests: FailedRequest[] = []
  private isProcessing = false

  static getInstance(): RetryQueue {
    if (!RetryQueue.instance) {
      RetryQueue.instance = new RetryQueue()
    }
    return RetryQueue.instance
  }

  addFailedRequest(request: FailedRequest) {
    this.failedRequests.push(request)
    this.persistFailedRequests()
    console.error(`CRM Request Failed: ${request.method} ${request.endpoint}`, request)
  }

  getFailedRequests(): FailedRequest[] {
    return [...this.failedRequests]
  }

  clearFailedRequests() {
    this.failedRequests = []
    this.persistFailedRequests()
  }

  private persistFailedRequests() {
    try {
      localStorage.setItem('crm_failed_requests', JSON.stringify(this.failedRequests))
    } catch (error) {
      console.warn('Failed to persist failed requests to localStorage:', error)
    }
  }

  private loadFailedRequests() {
    try {
      const stored = localStorage.getItem('crm_failed_requests')
      if (stored) {
        this.failedRequests = JSON.parse(stored)
      }
    } catch (error) {
      console.warn('Failed to load failed requests from localStorage:', error)
    }
  }

  async processRetryQueue() {
    if (this.isProcessing) return
    this.isProcessing = true

    const requestsToRetry = this.failedRequests.filter(req => req.retryCount < (CRM_CONFIG.RETRY_CONFIG.maxRetries || 3))
    
    for (const request of requestsToRetry) {
      try {
        await this.retryRequest(request)
        // Remove successful request from queue
        this.failedRequests = this.failedRequests.filter(req => req.id !== request.id)
        this.persistFailedRequests()
      } catch (error) {
        console.error(`Retry failed for request ${request.id}:`, error)
      }
    }

    this.isProcessing = false
  }

  private async retryRequest(failedRequest: FailedRequest): Promise<void> {
    const delay = calculateRetryDelay(
      failedRequest.retryCount,
      CRM_CONFIG.RETRY_CONFIG.initialDelay || 1000,
      CRM_CONFIG.RETRY_CONFIG.maxDelay || 10000,
      CRM_CONFIG.RETRY_CONFIG.backoffFactor || 2
    )

    await new Promise(resolve => setTimeout(resolve, delay))

    const response = await fetch(`${CRM_CONFIG.API_URL}${failedRequest.endpoint}`, {
      method: failedRequest.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CRM_CONFIG.API_KEY}`,
      },
      body: JSON.stringify(failedRequest.payload)
    })

    if (!response.ok) {
      throw new CRMError(
        `Retry failed: ${response.statusText}`,
        response.status,
        await response.json().catch(() => ({}))
      )
    }

    console.log(`Successfully retried CRM request: ${failedRequest.id}`)
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

// Main retry function
export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = CRM_CONFIG.RETRY_CONFIG.maxRetries || 3,
    initialDelay = CRM_CONFIG.RETRY_CONFIG.initialDelay || 1000,
    maxDelay = CRM_CONFIG.RETRY_CONFIG.maxDelay || 10000,
    backoffFactor = CRM_CONFIG.RETRY_CONFIG.backoffFactor || 2
  } = options

  let lastError: Error

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

      const delay = calculateRetryDelay(attempt, initialDelay, maxDelay, backoffFactor)
      console.warn(`CRM operation failed, retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries + 1}):`, error)
      
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }

  throw lastError!
}

// CRM HTTP client with retry logic
export class CRMClient {
  private static instance: CRMClient
  private retryQueue: RetryQueue

  static getInstance(): CRMClient {
    if (!CRMClient.instance) {
      CRMClient.instance = new CRMClient()
    }
    return CRMClient.instance
  }

  constructor() {
    this.retryQueue = RetryQueue.getInstance()
    // Process retry queue on initialization
    this.retryQueue.processRetryQueue()
  }

  async post(endpoint: string, payload: any): Promise<any> {
    return this.withRetryTracking('POST', endpoint, payload, async () => {
      const response = await fetch(`${CRM_CONFIG.API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${CRM_CONFIG.API_KEY}`,
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
    })
  }

  async get(endpoint: string): Promise<any> {
    return this.withRetryTracking('GET', endpoint, null, async () => {
      const response = await fetch(`${CRM_CONFIG.API_URL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${CRM_CONFIG.API_KEY}`,
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
    })
  }

  async patch(endpoint: string, payload: any): Promise<any> {
    return this.withRetryTracking('PATCH', endpoint, payload, async () => {
      const response = await fetch(`${CRM_CONFIG.API_URL}${endpoint}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${CRM_CONFIG.API_KEY}`,
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
    })
  }

  private async withRetryTracking<T>(
    method: string,
    endpoint: string,
    payload: any,
    operation: () => Promise<T>
  ): Promise<T> {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    try {
      return await withRetry(operation)
    } catch (error) {
      // Add to retry queue for potential manual retry
      this.retryQueue.addFailedRequest({
        id: requestId,
        timestamp: new Date().toISOString(),
        endpoint,
        method,
        payload,
        error: error instanceof Error ? error.message : 'Unknown error',
        statusCode: error instanceof CRMError ? error.statusCode : undefined,
        retryCount: 0
      })
      throw error
    }
  }

  // Get failed requests for monitoring
  getFailedRequests(): FailedRequest[] {
    return this.retryQueue.getFailedRequests()
  }

  // Clear failed requests
  clearFailedRequests() {
    this.retryQueue.clearFailedRequests()
  }

  // Manually retry failed requests
  async retryFailedRequests() {
    await this.retryQueue.processRetryQueue()
  }
}

// Export singleton instance
export const crmClient = CRMClient.getInstance()
