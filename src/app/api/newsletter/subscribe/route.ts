import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { newsletterLimiter, getClientIdentifier } from '@/lib/rate-limiter'

/**
 * Weekly financial tips — TPW Supabase only (by design).
 * Community / class updates use JanaGana portal contact forms instead.
 */
const newsletterSchema = z.object({
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  source: z.string().default('website'),
  tags: z.array(z.string()).default(['newsletter-subscriber']),
  marketingConsent: z.boolean().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const identifier = getClientIdentifier(request)
    if (!newsletterLimiter.isAllowed(identifier)) {
      return newsletterLimiter.getResponse()
    }

    const body = await request.json()
    const validatedData = newsletterSchema.parse(body)
    const name = [validatedData.firstName, validatedData.lastName].filter(Boolean).join(' ').trim() || null

    const supabase = await createClient()
    const { data: existing } = await supabase
      .from('newsletter_subscribers')
      .select('email')
      .eq('email', validatedData.email)
      .maybeSingle()

    if (existing) {
      return NextResponse.json({
        success: true,
        message: "You're already subscribed! Check your email for our latest newsletter.",
      })
    }

    const { error: dbError } = await supabase.from('newsletter_subscribers').insert({
      email: validatedData.email,
      name,
      subscribed_at: new Date().toISOString(),
    })

    if (dbError) {
      if (dbError.code === '23505') {
        return NextResponse.json({
          success: true,
          message: "You're already subscribed! Check your email for our latest newsletter.",
        })
      }
      console.error('[newsletter/subscribe] database error:', dbError)
      return NextResponse.json({ error: 'Failed to subscribe. Please try again.' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Newsletter subscription successful',
      storage: 'tpw_supabase',
    })
  } catch (error) {
    console.error('[newsletter/subscribe] error:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid subscription data' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to process newsletter subscription' }, { status: 500 })
  }
}
