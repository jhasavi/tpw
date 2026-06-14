import { NextRequest } from 'next/server'
import { getAdminSupabase } from '@/lib/supabase/admin'

const ONE_PIXEL_GIF = Buffer.from(
  'R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==',
  'base64'
)

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const campaignId = params.get('c') || 'unknown_campaign'
  const email = params.get('e') || null
  const userId = params.get('uid') || null

  try {
    const adminSupabase = getAdminSupabase()
    if (adminSupabase) {
      await adminSupabase.from('email_campaign_events').insert({
        user_id: userId,
        email,
        campaign_id: campaignId,
        event_type: 'open',
        metadata: {
          source: 'email_open_tracking',
          userAgent: request.headers.get('user-agent') || 'unknown',
        },
      })
    }
  } catch (error) {
    console.warn('Failed to store email open event:', error)
  }

  return new Response(ONE_PIXEL_GIF, {
    status: 200,
    headers: {
      'Content-Type': 'image/gif',
      'Content-Length': String(ONE_PIXEL_GIF.length),
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    },
  })
}
