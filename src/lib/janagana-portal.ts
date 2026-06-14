/** Canonical JanaGana portal URLs for The Purple Wings (production-safe defaults). */

export function getJanaganaPortalBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_JANAGANA_PORTAL_BASE_URL ||
    (process.env.NODE_ENV === "production"
      ? "https://janagana.namasteneedham.com"
      : "http://localhost:3020")
  ).replace(/\/$/, "");
}

export function getTpwSiteBaseUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://www.thepurplewings.org").replace(/\/$/, "");
}

function portalPath(path: string, returnPath?: string): string {
  const base = `${getJanaganaPortalBaseUrl()}${path}`;
  if (!returnPath) return base;
  const returnTo = `${getTpwSiteBaseUrl()}${returnPath.startsWith("/") ? returnPath : `/${returnPath}`}`;
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}returnTo=${encodeURIComponent(returnTo)}`;
}

export const janaganaPurpleWings = {
  portalHome: (returnPath = "/events") => portalPath("/portal/purple-wings", returnPath),
  events: (returnPath = "/events") => portalPath("/portal/purple-wings/events", returnPath),
  join: (returnPath = "/get-involved") => portalPath("/portal/purple-wings/join", returnPath),
  newsletter: (returnPath = "/newsletter/subscribe") =>
    portalPath("/portal/purple-wings/contact?interest=newsletter", returnPath),
  classInterest: (returnPath = "/events") =>
    portalPath("/portal/purple-wings/contact?interest=class", returnPath),
  membershipInterest: (returnPath = "/get-involved") =>
    portalPath("/portal/purple-wings/contact?interest=membership-interest", returnPath),
  registerEvent: (eventSlug: string, returnPath = "/events") =>
    portalPath(`/portal/purple-wings/register/${eventSlug}`, returnPath),
} as const;

/** Append returnTo when JanaGana embed API returns bare registration URLs. */
export function withPortalReturnTo(url: string | null, returnPath = "/events"): string | null {
  if (!url) return null;
  const returnTo = `${getTpwSiteBaseUrl()}${returnPath.startsWith("/") ? returnPath : `/${returnPath}`}`;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}returnTo=${encodeURIComponent(returnTo)}`;
}
