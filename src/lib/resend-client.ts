import { Resend } from 'resend'

let resendClient: Resend | null = null

/** Lazy singleton — avoids build-time failure when RESEND_API_KEY is unset. */
export function getResendClient(): Resend | null {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  if (!resendClient) {
    resendClient = new Resend(key)
  }
  return resendClient
}

export function requireResendClient(): Resend {
  const client = getResendClient()
  if (!client) {
    throw new Error('RESEND_API_KEY is not configured')
  }
  return client
}
