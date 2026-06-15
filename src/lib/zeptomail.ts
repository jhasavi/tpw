const ZEPTOMAIL_API_URL = 'https://api.zeptomail.com/v1.1/email'

export interface SendZeptoMailOptions {
  to?: string | string[]
  subject: string
  html: string
  replyTo?: string
  replyToName?: string
}

export type ZeptoMailResult =
  | { success: true; messageId?: string; raw?: unknown }
  | { success: false; error: string; statusCode?: number }

function getDefaultRecipient(): string | null {
  return process.env.LEADS_TO || process.env.CONTACT_EMAIL || null
}

function normalizeRecipients(to?: string | string[]): string[] {
  if (Array.isArray(to)) {
    return to.map((address) => address.trim()).filter(Boolean)
  }
  if (typeof to === 'string' && to.trim()) {
    return [to.trim()]
  }
  const fallback = getDefaultRecipient()
  return fallback ? [fallback] : []
}

function maskToken(token: string): string {
  if (token.length <= 12) return '[redacted]'
  return `${token.slice(0, 8)}…${token.slice(-4)}`
}

export async function sendZeptoMail(options: SendZeptoMailOptions): Promise<ZeptoMailResult> {
  const token = process.env.ZEPTOMAIL_TOKEN
  const fromAddress = process.env.ZEPTOMAIL_FROM
  const fromName = process.env.ZEPTOMAIL_FROM_NAME || 'TPM'

  if (!token) {
    console.error('[ZeptoMail] ZEPTOMAIL_TOKEN is not configured')
    return { success: false, error: 'Email service is not configured' }
  }
  if (!fromAddress) {
    console.error('[ZeptoMail] ZEPTOMAIL_FROM is not configured')
    return { success: false, error: 'Email sender is not configured' }
  }

  const recipients = normalizeRecipients(options.to)
  if (recipients.length === 0) {
    console.error('[ZeptoMail] No recipient configured (to or LEADS_TO/CONTACT_EMAIL)')
    return { success: false, error: 'Email recipient is not configured' }
  }

  const payload: Record<string, unknown> = {
    from: {
      address: fromAddress,
      name: fromName,
    },
    to: recipients.map((address) => ({
      email_address: {
        address,
      },
    })),
    subject: options.subject,
    htmlbody: options.html,
  }

  if (options.replyTo) {
    payload.reply_to = [
      {
        address: options.replyTo,
        ...(options.replyToName ? { name: options.replyToName } : {}),
      },
    ]
  }

  try {
    const response = await fetch(ZEPTOMAIL_API_URL, {
      method: 'POST',
      headers: {
        Authorization: token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const bodyText = await response.text()
    let parsed: unknown = null
    try {
      parsed = bodyText ? JSON.parse(bodyText) : null
    } catch {
      parsed = bodyText
    }

    if (!response.ok) {
      console.error('[ZeptoMail] Send failed', {
        status: response.status,
        token: maskToken(token),
        toCount: recipients.length,
        subject: options.subject,
        response: typeof parsed === 'string' ? parsed.slice(0, 200) : parsed,
      })
      const errorMessage =
        typeof parsed === 'object' &&
        parsed !== null &&
        'message' in parsed &&
        typeof (parsed as { message: unknown }).message === 'string'
          ? (parsed as { message: string }).message
          : `ZeptoMail request failed (${response.status})`
      return { success: false, error: errorMessage, statusCode: response.status }
    }

    const messageId =
      typeof parsed === 'object' &&
      parsed !== null &&
      'request_id' in parsed &&
      typeof (parsed as { request_id: unknown }).request_id === 'string'
        ? (parsed as { request_id: string }).request_id
        : undefined

    console.info('[ZeptoMail] Sent', {
      status: response.status,
      toCount: recipients.length,
      subject: options.subject,
      messageId,
    })

    return { success: true, messageId, raw: parsed }
  } catch (error) {
    console.error('[ZeptoMail] Network error', {
      token: maskToken(token),
      subject: options.subject,
      error: error instanceof Error ? error.message : 'Unknown error',
    })
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email',
    }
  }
}
