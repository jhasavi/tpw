import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const returnTo = requestUrl.searchParams.get('returnTo') || '/dashboard'
  const origin = requestUrl.origin

  if (code) {
    const supabase = await createClient()
    await supabase.auth.exchangeCodeForSession(code)

    // Reconcile user with CRM (non-blocking)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        // Trigger unified CRM reconciliation via API route
        const reconcileResponse = await fetch(`${origin}/api/auth/reconcile`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.id,
            authSource: 'google'
          })
        })
        
        if (!reconcileResponse.ok) {
          console.warn('CRM reconciliation API call failed:', reconcileResponse.status)
        }
      }
    } catch (err) {
      console.error('CRM reconciliation failed (OAuth):', err)
      // Don't block login if CRM fails
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(`${origin}${returnTo}`)
}
