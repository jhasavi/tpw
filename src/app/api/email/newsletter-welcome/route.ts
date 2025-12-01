import { NextRequest, NextResponse } from 'next/server'
import { sendNewsletterWelcome } from '@/lib/email'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name } = body

    // Validation
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Check if already subscribed
    const supabase = await createClient()
    const { data: existing } = await supabase
      .from('newsletter_subscribers')
      .select('email')
      .eq('email', email)
      .single()

    if (existing) {
      return NextResponse.json(
        { error: 'You\'re already subscribed! Check your email for our latest newsletter.' },
        { status: 400 }
      )
    }

    // Add to database
    const { error: dbError } = await supabase
      .from('newsletter_subscribers')
      .insert({ email, name, subscribed_at: new Date().toISOString() })

    if (dbError) {
      console.error('Database error:', dbError)
      // Check if it's a duplicate error
      if (dbError.code === '23505') {
        return NextResponse.json(
          { error: 'You\'re already subscribed! Check your email for our latest newsletter.' },
          { status: 400 }
        )
      }
      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again or contact support.' },
        { status: 500 }
      )
    }

    // Send welcome email
    const result = await sendNewsletterWelcome({ email, name })

    if (!result.success) {
      console.error('Email send error:', result.error)
      // Still return success since they're in database
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully subscribed! Check your email for a welcome message.' 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
