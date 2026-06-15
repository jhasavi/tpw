import { NextRequest, NextResponse } from 'next/server'
import { contactFormLimiter, getClientIdentifier } from '@/lib/rate-limiter'
import { crmEventLogger, EventType } from '@/lib/crm-events'
import { isHoneypotTriggered, sendContactInquiryEmail } from '@/lib/contact-inquiry'
import { sendContactAutoReply } from '@/lib/email'
import { validateContactFields } from '@/lib/email-sanitize'

export async function POST(request: NextRequest) {
  try {
    const identifier = getClientIdentifier(request)
    if (!contactFormLimiter.isAllowed(identifier)) {
      return contactFormLimiter.getResponse()
    }

    const body = await request.json()

    if (isHoneypotTriggered(body)) {
      return NextResponse.json(
        { success: true, message: 'Thank you! We received your message and will get back to you soon.' },
        { status: 200 }
      )
    }

    const validated = validateContactFields(body)
    if (!validated.ok) {
      return NextResponse.json({ error: validated.error }, { status: 400 })
    }

    const { name, email, message, phone } = validated.data
    const formType =
      typeof body.formType === 'string' && body.formType.trim()
        ? body.formType.trim().slice(0, 100)
        : 'contact'
    const sourcePage =
      typeof body.sourcePage === 'string' && body.sourcePage.trim()
        ? body.sourcePage.trim().slice(0, 500)
        : request.headers.get('referer') || 'unknown'
    const subject =
      typeof body.subject === 'string' && body.subject.trim()
        ? body.subject.trim().slice(0, 200)
        : formType

    const inquiryResult = await sendContactInquiryEmail(
      { name, email, phone, message, formType, sourcePage, subject },
      request
    )

    if (!inquiryResult.success) {
      return NextResponse.json({ error: inquiryResult.error }, { status: inquiryResult.status })
    }

    try {
      await sendContactAutoReply({ name, email, subject, message })
    } catch (autoReplyError) {
      console.warn('[contact] Auto-reply failed but inquiry was delivered:', autoReplyError)
    }

    try {
      await crmEventLogger.logEvent({
        eventType: EventType.CONTACT_REQUEST_SUBMITTED,
        userId: 'anonymous',
        email,
        route: '/api/contact',
        context: {
          name,
          subject,
          formType,
          sourcePage,
          phone: phone || null,
          messageLength: message.length,
          timestamp: new Date().toISOString(),
        },
        reporting: {
          lead_type: 'contact_request',
          source: formType,
        },
      })
    } catch (crmError) {
      console.error('Failed to log contact request to CRM:', crmError)
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you! We received your message and will get back to you soon.',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again in a moment.' },
      { status: 500 }
    )
  }
}
