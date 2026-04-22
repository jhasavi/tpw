/**
 * Event Registration API
 *
 * POST body: { name, email, eventSlug, eventTitle }
 *
 * Stores registrations in a simple `event_registrations` table.
 *
 * Run this SQL in Supabase once:
 * ─────────────────────────────────────────────
 * CREATE TABLE IF NOT EXISTS event_registrations (
 *   id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 *   name        text NOT NULL,
 *   email       text NOT NULL,
 *   event_slug  text NOT NULL,
 *   event_title text NOT NULL,
 *   registered_at timestamptz NOT NULL DEFAULT now(),
 *   UNIQUE(email, event_slug)
 * );
 * ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
 * -- No user access (admin reads via service role)
 * ─────────────────────────────────────────────
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { eventRegistrationLimiter, getClientIdentifier } from '@/lib/rate-limiter'

const adminSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'The Purple Wings <noreply@updates.namastebostonhomes.com>'
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'info@thepurplewings.org'

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const identifier = getClientIdentifier(request)
    if (!eventRegistrationLimiter.isAllowed(identifier)) {
      return eventRegistrationLimiter.getResponse()
    }
    const body = await request.json()
    const { name, email, eventSlug, eventTitle } = body

    if (!name || !email || !eventSlug || !eventTitle) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    // Insert registration (unique constraint catches duplicates)
    const { error: dbError } = await adminSupabase
      .from('event_registrations')
      .insert({ name, email, event_slug: eventSlug, event_title: eventTitle })

    if (dbError) {
      if (dbError.code === '23505') {
        return NextResponse.json(
          { error: "You're already registered for this event! Check your inbox for confirmation." },
          { status: 400 }
        )
      }
      console.error('DB error:', dbError)
      return NextResponse.json({ error: 'Registration failed. Please try again.' }, { status: 500 })
    }

    // Notify admin
    await resend.emails.send({
      from: FROM_EMAIL,
      to: CONTACT_EMAIL,
      subject: `New Event Registration: ${eventTitle}`,
      html: `<p><strong>${name}</strong> (${email}) just registered for <strong>${eventTitle}</strong>.</p>`,
    })

    // Confirmation to registrant
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `You're registered: ${eventTitle} 🎉`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%); padding: 40px; text-align: center; border-radius: 8px 8px 0 0;">
            <div style="font-size: 48px;">🎉</div>
            <h1 style="color: white; margin: 10px 0 0 0;">You're In!</h1>
          </div>
          <div style="background: white; padding: 40px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <p style="color: #374151; line-height: 1.6;">Hi ${name},</p>
            <p style="color: #374151; line-height: 1.6;">
              You are registered for <strong>${eventTitle}</strong>. We'll send you the location, 
              time, and any materials 48 hours before the event.
            </p>
            <div style="background: #f3f4f6; border-left: 4px solid #7c3aed; padding: 20px; border-radius: 4px; margin: 24px 0;">
              <p style="color: #374151; margin: 0;"><strong>Event:</strong> ${eventTitle}</p>
              <p style="color: #374151; margin: 8px 0 0 0;"><strong>Organizer:</strong> The Purple Wings</p>
              <p style="color: #374151; margin: 8px 0 0 0;"><strong>Location:</strong> Details coming soon</p>
            </div>
            <p style="color: #374151; line-height: 1.6;">
              While you wait, start learning at your own pace:<br/>
              <a href="https://www.thepurplewings.org/courses" style="color: #7c3aed;">Browse free courses →</a>
            </p>
            <p style="color: #6b7280; font-size: 14px; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
              Questions? Reply to this email or contact us at 
              <a href="mailto:${CONTACT_EMAIL}" style="color: #7c3aed;">${CONTACT_EMAIL}</a>
            </p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true, message: "You're registered! Check your email for confirmation." })
  } catch (error) {
    console.error('Event registration error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
