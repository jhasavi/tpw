# The Purple Wings → JanaGana visitor paths

**Production site:** https://www.thepurplewings.org  
**JanaGana portal:** https://janagana.namasteneedham.com  
**Tenant slug:** `purple-wings`

## CTAs that go to JanaGana

| Visitor intent | On-site location | Destination |
|----------------|------------------|-------------|
| Classes & event registration | Homepage JanaGana block, nav **Classes & Events**, footer | `/portal/purple-wings/events` |
| Community / org newsletter | Homepage JanaGana block, dual newsletter section | `/portal/purple-wings/contact?interest=newsletter` |
| Membership interest | Homepage JanaGana block | `/portal/purple-wings/contact?interest=membership-interest` |
| Paid membership join / renew | Homepage JanaGana block, referral program | `/portal/purple-wings/join` |
| Event list & register | `/events` | Embed API → portal register URLs on JanaGana |
| Empty upcoming / event CTA | `/events` | Links to portal + community updates |

Canonical URLs: `src/lib/janagana-portal.ts`. Event feed: `NEXT_PUBLIC_JANAGANA_API_URL` + `GET /api/embed/events?tenantSlug=purple-wings`.

## CTAs that stay on TPW (intentional)

| Visitor intent | Location | Destination |
|----------------|----------|-------------|
| Weekly financial tips email | `/newsletter/subscribe`, footer **Weekly financial tips**, nav **Weekly Tips**, exit-intent popup | `/api/newsletter/subscribe` (TPW Supabase) |

The subscribe page banner explains: tips here; classes/events on JanaGana.

## Env (Vercel production)

```
NEXT_PUBLIC_JANAGANA_PORTAL_BASE_URL=https://janagana.namasteneedham.com
NEXT_PUBLIC_JANAGANA_API_URL=https://janagana.namasteneedham.com
NEXT_PUBLIC_JANAGANA_TENANT_SLUG=purple-wings
```

## Verification

1. Homepage → **Community Updates (JanaGana)** → correct tenant contact form.
2. `/events` → Register opens `janagana.namasteneedham.com/portal/purple-wings/register/...`
3. Submit a test registration → appears only under Purple Wings in JanaGana admin Registrations.
4. In JanaGana dashboard/settings, confirm tenant slug `purple-wings`, portal URL, and Clerk org ID.
5. Weekly tips subscribe does **not** require JanaGana (by design).

## Related

- JanaGana: `~/janagana/docs/WEBSITE_JANAGANA_VISITOR_PATHS.md`
- Release: `docs/WEBSITE_JANAGANA_RELEASE.md`
