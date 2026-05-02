import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Schema for newsletter subscription
const newsletterSchema = z.object({
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  source: z.string().default('website'),
  tags: z.array(z.string()).default(['newsletter-subscriber']),
})

// JanaGana CRM API configuration
const JANAGANA_API_URL = process.env.JANAGANA_API_URL || 'https://janagana.namasteneedham.com/api'
const JANAGANA_API_KEY = process.env.JANAGANA_API_KEY

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = newsletterSchema.parse(body)

    // Create contact in JanaGana CRM
    const contactData = {
      firstName: validatedData.firstName || 'Newsletter',
      lastName: validatedData.lastName || 'Subscriber',
      email: validatedData.email,
      phone: validatedData.phone,
      source: validatedData.source,
      tags: validatedData.tags,
      notes: `Subscribed to newsletter on ${new Date().toISOString()}. Source: The Purple Wings website.`,
    }

    const response = await fetch(`${JANAGANA_API_URL}/plugin/crm/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JANAGANA_API_KEY}`,
      },
      body: JSON.stringify(contactData),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('JanaGana CRM error:', errorData)
      
      // If contact already exists, try to update
      if (response.status === 409) {
        const updateResponse = await fetch(`${JANAGANA_API_URL}/plugin/crm/contacts?search=${validatedData.email}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${JANAGANA_API_KEY}`,
          },
        })

        if (updateResponse.ok) {
          const existingContacts = await updateResponse.json()
          const existingContact = existingContacts.contacts[0]

          if (existingContact) {
            // Update existing contact with newsletter tag
            const updatedTags = [...new Set([...(existingContact.tags || []), ...validatedData.tags])]
            const updateData = {
              tags: updatedTags,
              notes: existingContact.notes 
                ? `${existingContact.notes}\n\nRe-subscribed to newsletter on ${new Date().toISOString()}.`
                : `Re-subscribed to newsletter on ${new Date().toISOString()}.`,
            }

            const patchResponse = await fetch(`${JANAGANA_API_URL}/plugin/crm/contacts/${existingContact.id}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JANAGANA_API_KEY}`,
              },
              body: JSON.stringify(updateData),
            })

            if (patchResponse.ok) {
              return NextResponse.json({
                success: true,
                message: 'Newsletter subscription updated in CRM',
                contact: await patchResponse.json(),
              })
            }
          }
        }
      }

      return NextResponse.json(
        { error: 'Failed to create contact in CRM', details: errorData },
        { status: 500 }
      )
    }

    const contact = await response.json()

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

        await fetch(`${JANAGANA_API_URL}/plugin/crm/deals`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JANAGANA_API_KEY}`,
          },
          body: JSON.stringify(dealData),
        })
      } catch (dealError) {
        console.warn('Failed to create deal:', dealError)
        // Don't fail the subscription if deal creation fails
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Newsletter subscription successful',
      contact,
    })

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to process newsletter subscription' },
      { status: 500 }
    )
  }
}
