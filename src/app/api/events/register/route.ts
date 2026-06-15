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
import { getAdminSupabase } from '@/lib/supabase/admin'
import { sendZeptoMail } from '@/lib/zeptomail'
import { escapeHtml } from '@/lib/email-sanitize'
import { eventRegistrationLimiter, getClientIdentifier } from '@/lib/rate-limiter'
import { registerForEvent } from '@/lib/janagana'

const LEADS_EMAIL = process.env.LEADS_TO || process.env.CONTACT_EMAIL || 'info@thepurplewings.org'

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

    const adminSupabase = getAdminSupabase()
    if (!adminSupabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
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

    // Sync to JanaGana CRM (non-blocking)
    try {
      await registerForEvent({
        eventId: eventSlug,
        email,
        firstName: name.split(' ')[0] || '',
        lastName: name.split(' ').slice(1).join('') || ''
      })
    } catch (error) {
      console.error('JanaGana sync error:', error)
      // Don't fail the request if JanaGana sync fails
    }

    const adminResult = await sendZeptoMail({
      to: LEADS_EMAIL,
      subject: `New Event Registration: ${eventTitle}`,
      html: `<p><strong>${escapeHtml(name)}</strong> (${escapeHtml(email)}) just registered for <strong>${escapeHtml(eventTitle)}</strong>.</p>`,
      replyTo: email,
      replyToName: name,
    })

    if (!adminResult.success) {
      console.error('Event admin notification failed:', adminResult.error)
    }

    const confirmResult = await sendZeptoMail({
      to: email,
      subject: `You're registered: ${eventTitle} 🎉`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%); padding: 40px; text-align: center; border-radius: 8px 8px 0 0;">
            <div style="font-size: 48px;">🎉</div>
            <h1 style="color: white; margin: 10px 0 0 0;">You're In!</h1>
          </div>
          <div style="background: white; padding: 40px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <p style="color: #374151; line-height: 1.6;">Hi ${escapeHtml(name)},</p>
            <p style="color: #374151; line-height: 1.6;">
              You are registered for <strong>${escapeHtml(eventTitle)}</strong>. We'll send you the location, 
              time, and any materials 48 hours before the event.
            </p>
            <div style="background: #f3f4f6; border-left: 4px solid #7c3aed; padding: 20px; border-radius: 4px; margin: 24px 0;">
              <p style="color: #374151; margin: 0;"><strong>Event:</strong> ${escapeHtml(eventTitle)}</p>
              <p style="color: #374151; margin: 8px 0 0 0;"><strong>Organizer:</strong> The Purple Wings</p>
              <p style="color: #374151; margin: 8px 0 0 0;"><strong>Location:</strong> Details coming soon</p>
            </div>
            <p style="color: #374151; line-height: 1.6;">
              While you wait, start learning at your own pace:<br/>
              <a href="https://www.thepurplewings.org/courses" style="color: #7c3aed;">Browse free courses →</a>
            </p>
            <p style="color: #6b7280; font-size: 14px; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
              Questions? Reply to this email or contact us at 
              <a href="mailto:${escapeHtml(LEADS_EMAIL)}" style="color: #7c3aed;">${escapeHtml(LEADS_EMAIL)}</a>
            </p>
          </div>
        </div>
      `,
    })

    if (!confirmResult.success) {
      console.error('Event confirmation email failed:', confirmResult.error)
    }

    return NextResponse.json({ success: true, message: "You're registered! Check your email for confirmation." })
  } catch (error) {
    console.error('Event registration error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
