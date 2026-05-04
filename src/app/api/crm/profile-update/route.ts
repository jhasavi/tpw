import { createClient } from '@/lib/supabase/server'
import { logProfileUpdated } from '@/lib/crm-events'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { profileData } = body

    // Validate required fields
    if (!profileData || typeof profileData !== 'object') {
      return Response.json({ error: 'Invalid profile data' }, { status: 400 })
    }

    // Get user's profile for additional context
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (!profile) {
      return Response.json({ error: 'Profile not found' }, { status: 404 })
    }

    // Determine which fields were updated
    const updatedFields = Object.keys(profileData).filter(key => {
      const profileKey = key as keyof typeof profileData
      return profileData[profileKey] !== undefined && profileData[profileKey] !== null
    })

    // Log profile update event to CRM
    await logProfileUpdated(
      user.id,
      user.email || '',
      updatedFields,
      {
        profileData: {
          fullName: profileData.full_name,
          location: profileData.location,
          bio: profileData.bio,
          financialGoals: profileData.financial_goals || [],
          interests: profileData.interests || [],
          experienceLevel: profileData.experience_level,
          occupation: profileData.occupation,
          industry: profileData.industry,
          preferredLearningStyle: profileData.preferred_learning_style,
          profileCompleteness: profile.profile_completeness || 0
        },
        route: '/profile',
        timestamp: new Date().toISOString()
      }
    )

    return Response.json({ 
      success: true, 
      message: 'Profile update logged to CRM',
      profileCompleteness: profile.profile_completeness || 0,
      updatedFields
    })

  } catch (error) {
    console.error('Profile update CRM error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
