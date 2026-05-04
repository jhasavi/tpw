import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmail } from '@/lib/email'
import { contactFormLimiter, getClientIdentifier } from '@/lib/rate-limiter'
import { crmEventLogger, EventType } from '@/lib/crm-events'

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const identifier = getClientIdentifier(request)
    if (!contactFormLimiter.isAllowed(identifier)) {
      return contactFormLimiter.getResponse()
    }
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Send email
    const result = await sendContactEmail({ name, email, subject, message })

    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    // Log contact request to CRM
    try {
      await crmEventLogger.logEvent({
        eventType: EventType.CONTACT_REQUEST_SUBMITTED,
        userId: 'anonymous', // Contact form can be submitted without login
        email,
        route: '/api/email/contact',
        context: {
          name,
          subject,
          messageLength: message.length,
          hasMessage: !!message,
          timestamp: new Date().toISOString()
        },
        reporting: {
          lead_type: 'contact_request',
          source: 'website_contact_form'
        }
      })
    } catch (crmError) {
      console.error('Failed to log contact request to CRM:', crmError)
      // Don't fail the contact request for CRM logging errors
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Email sent successfully. We\'ll get back to you soon!' 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
