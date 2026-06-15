const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_MESSAGE_LENGTH = 5000
const MAX_NAME_LENGTH = 200
const MAX_PHONE_LENGTH = 30

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email)
}

export function sanitizeField(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, maxLength)
}

export function validateContactFields(input: {
  name?: unknown
  email?: unknown
  message?: unknown
  phone?: unknown
}) {
  const name = sanitizeField(input.name, MAX_NAME_LENGTH)
  const email = sanitizeField(input.email, 320)
  const message = sanitizeField(input.message, MAX_MESSAGE_LENGTH)
  const phone = sanitizeField(input.phone, MAX_PHONE_LENGTH)

  if (!name) {
    return { ok: false as const, error: 'Name is required.' }
  }
  if (!email) {
    return { ok: false as const, error: 'Email is required.' }
  }
  if (!isValidEmail(email)) {
    return { ok: false as const, error: 'Please enter a valid email address.' }
  }
  if (!message) {
    return { ok: false as const, error: 'Message is required.' }
  }

  return {
    ok: true as const,
    data: { name, email, message, phone },
  }
}

export { MAX_MESSAGE_LENGTH }
