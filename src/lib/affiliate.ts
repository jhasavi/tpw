/**
 * Affiliate & UTM Link Management
 *
 * How to use:
 * 1. Enroll in each partner's affiliate program (links below)
 * 2. Replace the placeholder IDs with your real affiliate IDs
 * 3. All lesson resource links will automatically earn commissions
 *
 * Affiliate programs to join:
 * - YNAB:        https://www.youneedabudget.com/affiliate/
 * - NerdWallet:  https://www.nerdwallet.com/p/affiliate-program
 * - Bankrate:    https://www.bankrate.com/affiliate-program/
 * - Credit Karma: via Impact Radius (https://impact.com)
 * - Mint/Intuit:  https://www.intuit.com/partners/
 */

// ─── Affiliate IDs ─────────────────────────────────────────────────────────
// Replace "YOUR_ID" with your actual affiliate ID once enrolled
const AFFILIATE_IDS: Record<string, string> = {
  ynab: 'YOUR_YNAB_ID',         // YNAB pays ~$12/signup
  nerdwallet: 'YOUR_NW_ID',     // NerdWallet pays per lead
  bankrate: 'YOUR_BR_ID',       // Bankrate pays per lead
  creditkarma: 'YOUR_CK_ID',    // CK pays per account open
  mint: 'YOUR_MINT_ID',
}

// ─── UTM defaults ──────────────────────────────────────────────────────────
const UTM_SOURCE = 'thepurplewings'
const UTM_MEDIUM = 'lesson_resource'

// ─── Domain → affiliate config map ────────────────────────────────────────
interface AffiliateConfig {
  id: string
  paramName: string   // query param to add affiliate id
  baseOverride?: string // if the affiliate link has a different base URL
}

const DOMAIN_AFFILIATE_MAP: Record<string, AffiliateConfig> = {
  'youneedabudget.com': { id: AFFILIATE_IDS.ynab, paramName: 'utm_source' },
  'nerdwallet.com': { id: AFFILIATE_IDS.nerdwallet, paramName: 'mktg_place' },
  'bankrate.com': { id: AFFILIATE_IDS.bankrate, paramName: 'pid' },
  'creditkarma.com': { id: AFFILIATE_IDS.creditkarma, paramName: 'referrer' },
  'mint.intuit.com': { id: AFFILIATE_IDS.mint, paramName: 'referral' },
}

/**
 * Add UTM tracking (and affiliate ID where available) to a resource URL.
 * Pass the lesson identifier so we can track which lesson drove the click.
 */
export function trackResourceUrl(url: string, lessonSlug: string, resourceTitle: string): string {
  if (!url || url.startsWith('mailto:') || url.startsWith('#')) return url

  try {
    const parsed = new URL(url)
    const hostname = parsed.hostname.replace('www.', '')

    // Add UTM parameters for all links
    parsed.searchParams.set('utm_source', UTM_SOURCE)
    parsed.searchParams.set('utm_medium', UTM_MEDIUM)
    parsed.searchParams.set('utm_campaign', lessonSlug)
    parsed.searchParams.set('utm_content', slugify(resourceTitle))

    // Add affiliate ID for known partners
    for (const [domain, config] of Object.entries(DOMAIN_AFFILIATE_MAP)) {
      if (hostname.includes(domain) && !config.id.startsWith('YOUR_')) {
        parsed.searchParams.set(config.paramName, config.id)
        break
      }
    }

    return parsed.toString()
  } catch {
    // If URL parsing fails, return as-is
    return url
  }
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 40)
}

/**
 * Emoji icon for resource type
 */
export function resourceIcon(type?: string): string {
  switch (type) {
    case 'video': return '🎥'
    case 'calculator': return '🧮'
    case 'worksheet': return '📝'
    case 'tool': return '🛠️'
    case 'article': return '📄'
    case 'guide': return '📚'
    default: return '🔗'
  }
}
