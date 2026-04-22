import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory rate limiter for API routes
class RateLimiter {
  private requests = new Map<string, { count: number; resetTime: number }>()

  constructor(
    private maxRequests: number,
    private windowMs: number
  ) {}

  isAllowed(identifier: string): boolean {
    const now = Date.now()
    const windowStart = now - this.windowMs

    const existing = this.requests.get(identifier)
    
    if (!existing || existing.resetTime < now) {
      this.requests.set(identifier, { count: 1, resetTime: now + this.windowMs })
      return true
    }

    if (existing.count >= this.maxRequests) {
      return false
    }

    existing.count++
    return true
  }

  getResponse() {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { 
        status: 429,
        headers: {
          'Retry-After': '60',
          'X-RateLimit-Limit': '10',
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': Math.ceil(Date.now() / 1000 + 60).toString()
        }
      }
    )
  }
}

// Rate limiters for different endpoints
export const contactFormLimiter = new RateLimiter(5, 60 * 1000) // 5 requests per minute
export const newsletterLimiter = new RateLimiter(3, 60 * 1000) // 3 requests per minute
export const eventRegistrationLimiter = new RateLimiter(3, 60 * 1000) // 3 requests per minute

export function getClientIdentifier(request: NextRequest): string {
  // Use IP address as identifier
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const ip = forwarded?.split(',')[0] || realIp || 'unknown'
  
  // Hash IP for privacy
  return Buffer.from(ip).toString('base64').substring(0, 16)
}
