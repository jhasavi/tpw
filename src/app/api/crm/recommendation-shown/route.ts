import { createClient } from '@/lib/supabase/server'
import { logRecommendationShown } from '@/lib/crm-events'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { recommendedCourse, courseSlug, priority, reason, assessmentData } = body

    // Validate required fields
    if (!recommendedCourse) {
      return Response.json({ error: 'Recommended course is required' }, { status: 400 })
    }

    // Log recommendation shown event to CRM
    await logRecommendationShown(
      user.id,
      user.email || '',
      recommendedCourse,
      {
        courseSlug,
        priority,
        reason,
        assessmentData,
        route: '/onboarding',
        timestamp: new Date().toISOString()
      }
    )

    return Response.json({ 
      success: true, 
      message: 'Recommendation shown logged to CRM',
      recommendedCourse,
      priority
    })

  } catch (error) {
    console.error('Recommendation shown CRM error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
