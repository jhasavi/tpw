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
import { crmEventLogger, EventType } from '@/lib/crm-events'
import { CRMFieldMapper } from '@/lib/crm-fields'

// Schema for newsletter subscription
const newsletterSchema = z.object({
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  source: z.string().default('website'),
  tags: z.array(z.string()).default(['newsletter-subscriber']),
  marketingConsent: z.boolean().optional(), // Explicit consent checkbox
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = newsletterSchema.parse(body)

    // Determine lifecycle stage and consent
    const lifecycleStage = determineLifecycleStage('newsletter')
    const consent = mapConsentFromForm(validatedData.marketingConsent)

    // Create contact in JanaGana CRM with new utilities
    const contactData = mapToCRMContact({
      firstName: validatedData.firstName || 'Newsletter',
      lastName: validatedData.lastName || 'Subscriber',
      email: validatedData.email,
      phone: validatedData.phone,
      source: validatedData.source,
      tags: validatedData.tags,
      notes: `Subscribed to newsletter on ${new Date().toISOString()}. Source: The Purple Wings website.`,
    }, lifecycleStage, consent)

    const response = await crmClient.post('/plugin/crm/contacts', contactData)

    // Log newsletter subscription event
    try {
      await crmEventLogger.logEvent({
        eventType: EventType.NEWSLETTER_SUBSCRIBED,
        userId: 'anonymous', // Newsletter can be submitted without login
        email: validatedData.email,
        route: '/api/newsletter/subscribe',
        context: {
          source: validatedData.source,
          tags: validatedData.tags,
          hasFirstName: !!validatedData.firstName,
          hasLastName: !!validatedData.lastName,
          hasPhone: !!validatedData.phone,
          marketingConsent: validatedData.marketingConsent
        },
        reporting: CRMFieldMapper.mergeReportingFields(
          CRMFieldMapper.mapFormSubmission('newsletter'),
          { source: validatedData.source || 'website' }
        )
      })
    } catch (eventError) {
      console.error('Failed to log newsletter subscription event:', eventError)
      // Don't fail the subscription for event logging errors
    }

    if (!response.ok) {
      // If contact already exists, try to update
      if (response.statusCode === 409) {
        try {
          const existingContacts = await crmClient.get(`/plugin/crm/contacts?search=${validatedData.email}`)
          const existingContact = existingContacts.contacts[0]

          if (existingContact) {
            // Determine new lifecycle stage based on existing stage
            const newLifecycleStage = determineLifecycleStage('newsletter', existingContact.lifecycleStage as LifecycleStage)
            
            // Update existing contact with newsletter tag and new lifecycle stage
            const updatedTags = [...new Set([...(existingContact.tags || []), ...validatedData.tags])]
            const updateData = mapToCRMContact({
              tags: updatedTags,
              notes: existingContact.notes 
                ? `${existingContact.notes}\n\nRe-subscribed to newsletter on ${new Date().toISOString()}.`
                : `Re-subscribed to newsletter on ${new Date().toISOString()}.`,
            }, newLifecycleStage, consent)

            const patchResponse = await crmClient.patch(`/plugin/crm/contacts/${existingContact.id}`, updateData)
            
            return NextResponse.json({
              success: true,
              message: 'Newsletter subscription updated in CRM',
              contact: patchResponse,
            })
          }
        } catch (updateError) {
          console.error('Failed to update existing contact:', updateError)
        }
      }

      // Return success response even if CRM fails after retries
      return NextResponse.json({
        success: true,
        message: 'Newsletter subscription received. CRM sync may be delayed.',
        warning: 'CRM update failed, request queued for retry',
      })
    }

    const contact = response

    // Optionally create a Deal for lead nurturing
    if (process.env.AUTO_CREATE_DEALS === 'true') {
      try {
        const dealData = {
          contactId: contact.id,
          title: 'Newsletter Lead - The Purple Wings',
          description: 'Lead captured through newsletter subscription on The Purple Wings website.',
          stage: 'LEAD',
          source: 'website',
          sourceId: 'newsletter-signup',
          valueCents: 0, // Newsletter leads have no immediate value
        }

        await crmClient.post('/plugin/crm/deals', dealData)
      } catch (dealError) {
        console.warn('Failed to create deal:', dealError)
        // Don't fail subscription if deal creation fails
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Newsletter subscription successful',
      contact,
      lifecycleStage,
      consentStatus: consent.marketingConsent,
    })

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    
    // Return user-friendly response even if CRM fails
    if (error instanceof CRMError) {
      return NextResponse.json({
        success: true,
        message: 'Newsletter subscription received. We'll process it shortly.',
        warning: 'CRM temporarily unavailable, request queued for retry',
      })
    }
    
    return NextResponse.json(
      { error: 'Failed to process newsletter subscription' },
      { status: 500 }
    )
  }
}
