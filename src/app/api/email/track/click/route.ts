import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const adminSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function decodeTarget(raw: string | null): string {
  if (!raw) return 'https://www.thepurplewings.org'
  try {
    return decodeURIComponent(raw)
  } catch {
    return 'https://www.thepurplewings.org'
  }
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const campaignId = params.get('c') || 'unknown_campaign'
  const encodedTarget = params.get('u')
  const email = params.get('e') || null
  const userId = params.get('uid') || null

  const target = decodeTarget(encodedTarget)

  try {
    await adminSupabase.from('email_campaign_events').insert({
      user_id: userId,
      email,
      campaign_id: campaignId,
      event_type: 'click',
      link_url: target,
      metadata: {
        source: 'email_click_tracking',
        userAgent: request.headers.get('user-agent') || 'unknown',
      },
    })
  } catch (error) {
    console.warn('Failed to store email click event:', error)
  }

  return NextResponse.redirect(target, { status: 302 })
}
