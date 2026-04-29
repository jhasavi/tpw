import { createClient } from '@/lib/supabase/server'
import { createMember } from '@/lib/janagana'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const returnTo = requestUrl.searchParams.get('returnTo') || '/dashboard'
  const origin = requestUrl.origin

  if (code) {
    const supabase = await createClient()
    await supabase.auth.exchangeCodeForSession(code)

    // If this is a brand-new Google OAuth account, add them to Jana Gana CRM
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const createdAt = new Date(user.created_at).getTime()
        const isNewUser = Date.now() - createdAt < 30_000 // within 30 seconds
        if (isNewUser) {
          const fullName: string = user.user_metadata?.full_name || user.user_metadata?.name || ''
          const nameParts = fullName.split(' ')
          await createMember({
            email: user.email!,
            firstName: nameParts[0] || '',
            lastName: nameParts.slice(1).join(' ') || '',
          })
        }
      }
    } catch (err) {
      console.error('Failed to create JanaGana member (OAuth):', err)
      // Don't block login if JanaGana fails
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(`${origin}${returnTo}`)
}
