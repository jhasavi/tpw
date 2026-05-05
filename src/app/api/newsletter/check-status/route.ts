import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Check in local database
    const supabase = await createClient()
    const { data: localSub } = await supabase
      .from('newsletter_subscribers')
      .select('email, subscribed_at')
      .eq('email', email)
      .single()

    // Check in CRM
    try {
      const { crmClient } = await import('@/lib/crm-retry-server')
      const crmResponse = await crmClient.get(`/plugin/crm/contacts?search=${email}`)
      const crmContacts = crmResponse.contacts || []
      const crmSub = crmContacts.find((contact: any) => 
        contact.email === email && 
        contact.tags?.includes('newsletter-subscriber')
      )

      return NextResponse.json({
        isSubscribed: !!(localSub || crmSub),
        source: localSub ? 'local' : crmSub ? 'crm' : null,
        subscribedAt: localSub?.subscribed_at || crmSub?.createdAt
      })
    } catch (crmError) {
      console.error('CRM check failed:', crmError)
      // Fallback to local database only
      return NextResponse.json({
        isSubscribed: !!localSub,
        source: localSub ? 'local' : null,
        subscribedAt: localSub?.subscribed_at
      })
    }
  } catch (error) {
    console.error('Check status error:', error)
    return NextResponse.json(
      { error: 'Failed to check subscription status' },
      { status: 500 }
    )
  }
}
