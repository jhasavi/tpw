export type EnvCheck = {
  name: string
  required: boolean
  configured: boolean
}

const REQUIRED_PUBLIC = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
] as const

const REQUIRED_SERVER = [
  'SUPABASE_SERVICE_ROLE_KEY',
  'CRON_SECRET',
  'ZEPTOMAIL_TOKEN',
  'ZEPTOMAIL_FROM',
] as const

const OPTIONAL = [
  'NEXT_PUBLIC_SITE_URL',
  'NEXT_PUBLIC_GA_MEASUREMENT_ID',
  'NEXT_PUBLIC_JANAGANA_PORTAL_BASE_URL',
  'NEXT_PUBLIC_JANAGANA_API_URL',
  'NEXT_PUBLIC_JANAGANA_TENANT_SLUG',
  'JANAGANA_API_URL',
  'JANAGANA_API_KEY',
  'LEADS_TO',
  'CONTACT_EMAIL',
  'ADMIN_VERIFICATION_TOKEN',
] as const

export function getEnvChecks(): EnvCheck[] {
  const checks: EnvCheck[] = []

  for (const name of REQUIRED_PUBLIC) {
    checks.push({ name, required: true, configured: Boolean(process.env[name]) })
  }
  for (const name of REQUIRED_SERVER) {
    checks.push({ name, required: true, configured: Boolean(process.env[name]) })
  }
  for (const name of OPTIONAL) {
    checks.push({ name, required: false, configured: Boolean(process.env[name]) })
  }

  return checks
}

export function missingRequiredEnv(): string[] {
  return getEnvChecks().filter((c) => c.required && !c.configured).map((c) => c.name)
}
