import { NextRequest } from 'next/server'
import { escapeHtml, validateContactFields } from '@/lib/email-sanitize'
import { sendZeptoMail } from '@/lib/zeptomail'

export interface ContactInquiryInput {
  name?: unknown
  email?: unknown
  phone?: unknown
  message?: unknown
  subject?: unknown
  formType?: unknown
  sourcePage?: unknown
  website?: unknown
  companyWebsite?: unknown
}

export function isHoneypotTriggered(input: ContactInquiryInput): boolean {
  const website = typeof input.website === 'string' ? input.website.trim() : ''
  const companyWebsite = typeof input.companyWebsite === 'string' ? input.companyWebsite.trim() : ''
  return Boolean(website || companyWebsite)
}

export function getRequestMetadata(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const ip = forwarded?.split(',')[0]?.trim() || realIp || 'unknown'
  const userAgent = request.headers.get('user-agent') || 'unknown'

  return {
    ip,
    userAgent,
    timestamp: new Date().toISOString(),
  }
}

function buildInquiryHtml(input: {
  name: string
  email: string
  phone: string
  message: string
  formType: string
  sourcePage: string
  subject: string
  metadata: { ip: string; userAgent: string; timestamp: string }
}) {
  const rows = [
    ['Name', input.name],
    ['Email', input.email],
    ['Phone', input.phone || '—'],
    ['Message', input.message],
    ['Form type', input.formType],
    ['Source page', input.sourcePage],
    ['Subject', input.subject],
    ['Timestamp', input.metadata.timestamp],
    ['IP address', input.metadata.ip],
    ['User agent', input.metadata.userAgent],
  ]

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;background:#f9fafb;">${escapeHtml(label)}</td><td style="padding:8px 12px;border:1px solid #e5e7eb;white-space:pre-wrap;">${escapeHtml(value)}</td></tr>`
    )
    .join('')

  return `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;">
      <h2 style="color:#7c3aed;">New TPM inquiry</h2>
      <table style="border-collapse:collapse;width:100%;margin:16px 0;">${tableRows}</table>
      <p style="color:#6b7280;font-size:14px;">Reply directly to this email to respond to ${escapeHtml(input.name)}.</p>
    </div>
  `
}

export async function sendContactInquiryEmail(
  input: ContactInquiryInput,
  request: NextRequest
): Promise<{ success: true } | { success: false; error: string; status: number }> {
  const validated = validateContactFields(input)
  if (!validated.ok) {
    return { success: false, error: validated.error, status: 400 }
  }

  const { name, email, message, phone } = validated.data
  const formType =
    typeof input.formType === 'string' && input.formType.trim()
      ? input.formType.trim().slice(0, 100)
      : 'contact'
  const sourcePage =
    typeof input.sourcePage === 'string' && input.sourcePage.trim()
      ? input.sourcePage.trim().slice(0, 500)
      : 'unknown'
  const subject =
    typeof input.subject === 'string' && input.subject.trim()
      ? input.subject.trim().slice(0, 200)
      : formType

  const metadata = getRequestMetadata(request)
  const html = buildInquiryHtml({
    name,
    email,
    phone,
    message,
    formType,
    sourcePage,
    subject,
    metadata,
  })

  const result = await sendZeptoMail({
    subject: `New TPM inquiry from ${name}`,
    html,
    replyTo: email,
    replyToName: name,
  })

  if (!result.success) {
    return { success: false, error: 'Unable to send your message right now. Please try again later.', status: 500 }
  }

  return { success: true }
}
