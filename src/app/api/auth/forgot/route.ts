import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const email = body?.email?.toString().trim()

    if (!email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.thepurplewings.org'

    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json(
        { error: 'Server configuration missing Supabase credentials.' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, serviceKey)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${siteUrl.replace(/\/$/, '')}/auth/login`,
    })

    if (error) {
      console.error('Password reset request failed:', error.message, { email, status: error.status })
      const message = error.message || 'Failed to send password reset email.'
      return NextResponse.json(
        {
          error: message,
          hint: error.status === 500
            ? 'Check Supabase auth email provider / SMTP configuration.'
            : undefined,
        },
        { status: error.status || 500 }
      )
    }

    return NextResponse.json({ success: true, message: 'Password reset link sent if the email exists.' })
  } catch (error) {
    console.error('Forgot password route error:', error)
    return NextResponse.json(
      { error: 'Unable to send password reset email. Please try again later.' },
      { status: 500 }
    )
  }
}
