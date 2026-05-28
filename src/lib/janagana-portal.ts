/** Canonical JanaGana portal URLs for The Purple Wings (production-safe defaults). */

export function getJanaganaPortalBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_JANAGANA_PORTAL_BASE_URL ||
    (process.env.NODE_ENV === "production"
      ? "https://janagana.namasteneedham.com"
      : "http://localhost:3020")
  ).replace(/\/$/, "");
}

export const janaganaPurpleWings = {
  portalHome: () => `${getJanaganaPortalBaseUrl()}/portal/purple-wings`,
  events: () => `${getJanaganaPortalBaseUrl()}/portal/purple-wings/events`,
  newsletter: () => `${getJanaganaPortalBaseUrl()}/portal/purple-wings/contact?interest=newsletter`,
  membershipInterest: () =>
    `${getJanaganaPortalBaseUrl()}/portal/purple-wings/contact?interest=membership-interest`,
} as const;
