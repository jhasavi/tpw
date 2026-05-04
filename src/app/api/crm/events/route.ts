import { createClient } from '@/lib/supabase/server'
import { crmEventLogger } from '@/lib/crm-events'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const eventData = await request.json()

    // Validate required fields
    if (!eventData.eventType || !eventData.userId || !eventData.email) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Verify the event belongs to the authenticated user
    if (eventData.userId !== user.id) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Log event using server-side CRM logger
    await crmEventLogger.logEvent(eventData)

    return Response.json({ 
      success: true, 
      message: 'Event logged successfully',
      eventId: eventData.id
    })

  } catch (error) {
    console.error('CRM event logging error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
