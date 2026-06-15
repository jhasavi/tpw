import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendUserWelcome } from '@/lib/email'

const welcomeSeriesSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().optional().default(''),
  contactId: z.string().optional(),
  tags: z.array(z.string()).default([]),
  source: z.string().default('website'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = welcomeSeriesSchema.parse(body)

    const name = [validatedData.firstName, validatedData.lastName].filter(Boolean).join(' ').trim()

    const result = await sendUserWelcome({
      email: validatedData.email,
      name: name || validatedData.firstName,
    })

    if (!result.success) {
      return NextResponse.json({ error: 'Failed to send welcome email' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Welcome email sent successfully',
      note: 'Follow-up drip emails are handled by /api/cron/email-drip',
    })
  } catch (error) {
    console.error('Welcome series error:', error)
    return NextResponse.json({ error: 'Failed to send welcome email' }, { status: 500 })
  }
}
