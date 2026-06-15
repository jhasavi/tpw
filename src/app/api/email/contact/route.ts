import { NextRequest, NextResponse } from 'next/server'
import { contactFormLimiter, getClientIdentifier } from '@/lib/rate-limiter'
import { crmEventLogger, EventType } from '@/lib/crm-events'
import { isHoneypotTriggered, sendContactInquiryEmail } from '@/lib/contact-inquiry'
import { escapeHtml } from '@/lib/email-sanitize'

/** @deprecated Use POST /api/contact — kept for backward compatibility. */
export async function POST(request: NextRequest) {
  try {
    const identifier = getClientIdentifier(request)
    if (!contactFormLimiter.isAllowed(identifier)) {
      return contactFormLimiter.getResponse()
    }

    const body = await request.json()

    if (isHoneypotTriggered(body)) {
      return NextResponse.json(
        { success: true, message: 'Email sent successfully. We\'ll get back to you soon!' },
        { status: 200 }
      )
    }

    const { name, email, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const result = await sendContactInquiryEmail(
      {
        name,
        email,
        message,
        subject,
        formType: typeof body.formType === 'string' ? body.formType : subject,
        sourcePage: typeof body.sourcePage === 'string' ? body.sourcePage : '/contact',
      },
      request
    )

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: result.status })
    }

    try {
      await crmEventLogger.logEvent({
        eventType: EventType.CONTACT_REQUEST_SUBMITTED,
        userId: 'anonymous',
        email,
        route: '/api/email/contact',
        context: {
          name: escapeHtml(String(name)),
          subject,
          messageLength: String(message).length,
          timestamp: new Date().toISOString(),
        },
        reporting: {
          lead_type: 'contact_request',
          source: 'website_contact_form',
        },
      })
    } catch (crmError) {
      console.error('Failed to log contact request to CRM:', crmError)
    }

    return NextResponse.json(
      { success: true, message: 'Email sent successfully. We\'ll get back to you soon!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
