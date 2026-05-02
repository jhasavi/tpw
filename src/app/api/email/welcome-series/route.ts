import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Schema for welcome series trigger
const welcomeSeriesSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  contactId: z.string(),
  tags: z.array(z.string()).default([]),
  source: z.string().default('website'),
})

// Email service configuration
const EMAIL_SERVICE_URL = process.env.EMAIL_SERVICE_URL || 'https://api.resend.io'
const EMAIL_API_KEY = process.env.RESEND_API_KEY

// Welcome series templates
const WELCOME_EMAILS = [
  {
    delay: 0, // Immediate
    subject: 'Welcome to The Purple Wings Community! 🦋',
    template: 'welcome-email-1',
  },
  {
    delay: 24 * 60 * 60 * 1000, // 24 hours
    subject: 'Your First Step to Financial Confidence',
    template: 'welcome-email-2',
  },
  {
    delay: 3 * 24 * 60 * 60 * 1000, // 3 days
    subject: 'Free Resources to Get You Started',
    template: 'welcome-email-3',
  },
  {
    delay: 7 * 24 * 60 * 60 * 1000, // 7 days
    subject: 'Join Our Community of Empowered Women',
    template: 'welcome-email-4',
  },
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = welcomeSeriesSchema.parse(body)

    // Schedule welcome series emails
    const scheduledEmails = await Promise.all(
      WELCOME_EMAILS.map(async (emailConfig, index) => {
        const scheduledAt = new Date(Date.now() + emailConfig.delay)
        
        const emailData = {
          to: validatedData.email,
          subject: emailConfig.subject,
          template: emailConfig.template,
          scheduledAt: scheduledAt.toISOString(),
          variables: {
            firstName: validatedData.firstName,
            lastName: validatedData.lastName,
            contactId: validatedData.contactId,
            source: validatedData.source,
            tags: validatedData.tags,
          },
        }

        // Schedule email via email service
        const response = await fetch(`${EMAIL_SERVICE_URL}/emails/schedule`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${EMAIL_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailData),
        })

        if (!response.ok) {
          throw new Error(`Failed to schedule email ${index + 1}`)
        }

        return {
          emailIndex: index + 1,
          scheduledAt: scheduledAt.toISOString(),
          template: emailConfig.template,
        }
      })
    )

    return NextResponse.json({
      success: true,
      message: 'Welcome series scheduled successfully',
      scheduledEmails,
    })

  } catch (error) {
    console.error('Welcome series error:', error)
    return NextResponse.json(
      { error: 'Failed to schedule welcome series' },
      { status: 500 }
    )
  }
}
