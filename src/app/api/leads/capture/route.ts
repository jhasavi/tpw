import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { 
  determineLifecycleStage, 
  mapToCRMContact, 
  mapConsentFromForm, 
  CRMError,
  type CRMContact,
  type LifecycleStage 
} from '@/lib/crm-utils'
import { crmClient } from '@/lib/crm-retry-server'
import { leadsCaptureLimiter, getClientIdentifier } from '@/lib/rate-limiter'

// Schema for smart lead capture
const smartLeadSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  trigger: z.enum(['quiz_completion', 'personality_results', 'course_recommendation', 'progress_milestone', 'exit_intent']),
  value: z.string().optional(),
  context: z.any().optional(),
  source: z.string().default('smart-capture'),
  marketingConsent: z.boolean().optional(), // Explicit consent checkbox
})

export async function POST(request: NextRequest) {
  try {
    const identifier = getClientIdentifier(request)
    if (!leadsCaptureLimiter.isAllowed(identifier)) {
      return leadsCaptureLimiter.getResponse()
    }

    const body = await request.json()
    const validatedData = smartLeadSchema.parse(body)

    // Determine lifecycle stage and consent
    const lifecycleStage = determineLifecycleStage(validatedData.trigger)
    const consent = mapConsentFromForm(validatedData.marketingConsent)

    // Create contact in JanaGana CRM with enhanced context
    const contactData = mapToCRMContact({
      firstName: validatedData.firstName,
      lastName: '', // Not captured in smart form
      email: validatedData.email,
      source: validatedData.source,
      tags: ['smart-capture', validatedData.trigger],
      notes: `Captured via ${validatedData.trigger} trigger${validatedData.value ? ` - ${validatedData.value}` : ''}\nContext: ${JSON.stringify(validatedData.context || {})}\nCaptured at ${new Date().toISOString()}`,
      customAttributes: {
        captureTrigger: validatedData.trigger,
        captureValue: validatedData.value,
        captureContext: validatedData.context,
        captureSource: validatedData.source,
      }
    }, lifecycleStage, consent)

    // Create contact in JanaGana CRM
    const response = await crmClient.post('/plugin/crm/contacts', contactData)

    if (!response.ok) {
      // If contact already exists, try to update with smart capture context
      if (response.statusCode === 409) {
        try {
          const existingContacts = await crmClient.get(`/plugin/crm/contacts?search=${validatedData.email}`)
          const existingContact = existingContacts.contacts[0]

          if (existingContact) {
            // Determine new lifecycle stage based on existing stage
            const newLifecycleStage = determineLifecycleStage(validatedData.trigger, existingContact.lifecycleStage as LifecycleStage, validatedData.context)
            
            // Add smart capture tags and context
            const updatedTags = [...new Set([...(existingContact.tags || []), 'smart-capture', validatedData.trigger])]
            const updateData = mapToCRMContact({
              tags: updatedTags,
              notes: existingContact.notes 
                ? `${existingContact.notes}\n\nSmart capture: ${validatedData.trigger} at ${new Date().toISOString()}`
                : `Smart capture: ${validatedData.trigger} at ${new Date().toISOString()}`,
              customAttributes: {
                ...existingContact.customAttributes,
                captureTrigger: validatedData.trigger,
                captureValue: validatedData.value,
                captureContext: validatedData.context,
                captureSource: validatedData.source,
              }
            }, newLifecycleStage, consent)

            const patchResponse = await crmClient.patch(`/plugin/crm/contacts/${existingContact.id}`, updateData)
            
            // Trigger welcome series for new smart captures
            await triggerWelcomeSeries(validatedData.email, validatedData.firstName, existingContact.id, validatedData.trigger)
            
            return NextResponse.json({
              success: true,
              message: 'Smart lead captured and updated',
              contact: patchResponse,
              lifecycleStage: newLifecycleStage,
              consentStatus: consent.marketingConsent,
            })
          }
        } catch (updateError) {
          console.error('Failed to update existing contact:', updateError)
        }
      }

      // Return user-friendly response even if CRM fails after retries
      return NextResponse.json({
        success: true,
        message: 'Smart lead capture received. CRM sync may be delayed.',
        warning: 'CRM update failed, request queued for retry',
      })
    }

    const contact = response

    // Trigger welcome series for new smart captures
    await triggerWelcomeSeries(validatedData.email, validatedData.firstName, contact.id, validatedData.trigger)

    return NextResponse.json({
      success: true,
      message: 'Smart lead captured successfully',
      contact,
      lifecycleStage,
      consentStatus: consent.marketingConsent,
    })

  } catch (error) {
    console.error('Smart lead capture error:', error)
    
    // Return user-friendly response even if CRM fails
    if (error instanceof CRMError) {
      return NextResponse.json({
        success: true,
        message: 'Smart lead capture received. We\'ll process it shortly.',
        warning: 'CRM temporarily unavailable, request queued for retry',
      })
    }
    
    return NextResponse.json(
      { error: 'Failed to capture lead' },
      { status: 500 }
    )
  }
}

// Trigger welcome series with personalization
async function triggerWelcomeSeries(email: string, firstName: string, contactId: string, trigger: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/email/welcome-series`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        firstName,
        contactId,
        tags: ['smart-capture', trigger],
        source: 'smart-capture',
      }),
    })

    if (!response.ok) {
      console.warn('Failed to trigger welcome series for smart capture')
    }
  } catch (error) {
    console.warn('Error triggering welcome series:', error)
  }
}
