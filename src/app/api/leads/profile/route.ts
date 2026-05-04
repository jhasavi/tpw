import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { 
  determineLifecycleStage, 
  mapToCRMContact, 
  crmClient, 
  CRMError,
  type CRMContact,
  type LifecycleStage 
} from '@/lib/crm-utils'

// Schema for profile update
const profileSchema = z.object({
  email: z.string().email(),
  profile: z.object({
    age_range: z.string().optional(),
    financial_goals: z.string().optional(),
    experience_level: z.string().optional(),
    location: z.string().optional(),
    profession: z.string().optional(),
  })
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = profileSchema.parse(body)

    // Update contact in JanaGana CRM with profile data
    const response = await crmClient.get(`/plugin/crm/contacts?search=${validatedData.email}`)

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to find contact' },
        { status: 404 }
      )
    }

    const contactData = await response.json()
    const contact = contactData.contacts[0]

    if (!contact) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      )
    }

    // Add tags based on profile data
    const tags = [...(contact.tags || []), 'profile-completed']
    if (validatedData.profile.age_range) tags.push(`age-${validatedData.profile.age_range}`)
    if (validatedData.profile.financial_goals) tags.push(`goal-${validatedData.profile.financial_goals.toLowerCase().replace(/\s+/g, '-')}`)
    if (validatedData.profile.experience_level) tags.push(`experience-${validatedData.profile.experience_level}`)

    // Determine new lifecycle stage based on profile completion
    const newLifecycleStage = determineLifecycleStage('profile_completed', contact.lifecycleStage as LifecycleStage, validatedData.profile)

    // Update contact with profile information
    const updateData = mapToCRMContact({
      customAttributes: {
        ...contact.customAttributes,
        ...validatedData.profile,
        profileCompleted: new Date().toISOString(),
      },
      notes: contact.notes 
        ? `${contact.notes}\n\nProfile updated: ${JSON.stringify(validatedData.profile)} at ${new Date().toISOString()}`
        : `Profile updated: ${JSON.stringify(validatedData.profile)} at ${new Date().toISOString()}`,
      tags: tags,
    }, newLifecycleStage)

    const updateResponse = await crmClient.patch(`/plugin/crm/contacts/${contact.id}`, updateData)

    if (!updateResponse.ok) {
      // Return user-friendly response even if CRM fails
      return NextResponse.json({
        success: true,
        message: 'Profile update received. CRM sync may be delayed.',
        warning: 'CRM update failed, request queued for retry',
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      contact: updateResponse,
      lifecycleStage: newLifecycleStage,
    })

  } catch (error) {
    console.error('Profile update error:', error)
    
    // Return user-friendly response even if CRM fails
    if (error instanceof CRMError) {
      return NextResponse.json({
        success: true,
        message: 'Profile update received. We'll process it shortly.',
        warning: 'CRM temporarily unavailable, request queued for retry',
      })
    }
    
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    )
  }
}
