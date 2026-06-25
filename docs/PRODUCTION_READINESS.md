# Production Readiness — The Purple Wings

**Last updated:** 2026-06-25  
**Production:** https://www.thepurplewings.org  
**Repository:** https://github.com/jhasavi/tpw

## Where we left off (June 2026)

The project was **not blocked on code** — the main gaps were **operational**:

| Area | Status | Notes |
|------|--------|-------|
| JanaGana portal integration | ✅ Shipped | Dual newsletter paths, `/events` embed, portal CTAs ([visitor paths](WEBSITE_JANAGANA_VISITOR_PATHS.md)) |
| Zeptomail email | ✅ Shipped | Contact, newsletter, drip routes use `src/lib/zeptomail.ts` |
| Site search | ✅ Shipped | `/search` with static index |
| GitHub CI | ⚠️ Was disabled | `frontend-ci` was manual-only; secrets not configured |
| Staging cleanup workflow | ⚠️ Failing weekly | Referenced legacy `migrations/` SQL that no longer exists in this repo |
| Quiz category analytics | 🔜 Backlog | `quiz_attempts` lacks `category_id` (see `QuizInterface.tsx` TODO) |
| Lesson mark-complete | 🔜 Verify in prod | See `scripts/verify-mark-complete.md` if RLS issues appear |

**External dependency:** JanaGana embed APIs (`/api/embed/events`) must be live on `janagana.namasteneedham.com` for `/events` to show registrations.

---

## 20 production-readiness improvements (implemented)

| # | Improvement | Implementation |
|---|-------------|----------------|
| 1 | **Health check endpoint** | `GET /api/health` — env + Supabase config status |
| 2 | **Liveness probe** | `GET /api/ready` — always 200 when process is up |
| 3 | **Environment template** | `.env.example` with all required/optional vars |
| 4 | **Security headers** | HSTS, X-Frame-Options, nosniff in `next.config.ts` |
| 5 | **Request tracing** | `x-request-id` on all responses via `src/proxy.ts` |
| 6 | **Structured logging** | `src/lib/logger.ts` JSON logs for API routes |
| 7 | **Consistent API errors** | `src/lib/api-response.ts` helpers |
| 8 | **Cron secret hardening** | Removed default `default-cron-secret` from CRM replay |
| 9 | **CRM replay cron** | Added to `vercel.json` (daily 06:00 UTC) |
| 10 | **Signup rate limiting** | 5 attempts / 15 min on `/api/auth/signup` |
| 11 | **Leads rate limiting** | 10 / min on `/api/leads/capture` |
| 12 | **Frontend CI on push** | Typecheck + build with placeholder env fallbacks |
| 13 | **Playwright CI** | Chromium E2E on push/PR (`.github/workflows/playwright-ci.yml`) |
| 14 | **Fix staging workflow** | Skip gracefully when secrets or legacy migrations missing |
| 15 | **E2E smoke tests** | `e2e/production.spec.ts` — health, search, newsletter |
| 16 | **`npm run verify`** | Typecheck + production build in one command |
| 17 | **Skip-to-content link** | Accessibility in root layout |
| 18 | **Sitemap updates** | `/search`, `/privacy`, `/terms`; uses `NEXT_PUBLIC_SITE_URL` |
| 19 | **Env validation helper** | `src/lib/env-check.ts` shared by health endpoint |
| 20 | **Documentation** | This file + README / DEVELOPMENT_GUIDE updates |

---

## Pre-deploy checklist

```bash
cp .env.example .env.local   # fill in real values
npm run verify               # lint + types + production build
npm run test:e2e             # optional local E2E
curl -s https://www.thepurplewings.org/api/health | jq .
```

### Required Vercel env vars

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `CRON_SECRET` (must match Vercel cron `Authorization: Bearer …`)
- `ZEPTOMAIL_TOKEN`, `ZEPTOMAIL_FROM`, `ZEPTOMAIL_FROM_NAME`
- `LEADS_TO` or `CONTACT_EMAIL`
- `NEXT_PUBLIC_JANAGANA_*` for portal/embed (see [JanaGana release](WEBSITE_JANAGANA_RELEASE.md))

### Post-deploy verification

1. Homepage loads; nav **Weekly Tips** vs **Classes & Events** are distinct.
2. `/api/health` returns `healthy` (or `degraded` with `missingRequired` empty).
3. `/search?q=newsletter` returns results.
4. Weekly tips subscribe works without JanaGana.
5. `/events` register links point to `janagana.namasteneedham.com/portal/purple-wings/...`

---

## Remaining backlog (not in this release)

- Add `category_id` to `quiz_attempts` for per-category analytics
- Replace in-memory rate limiter with Redis/KV for multi-instance Vercel
- Rotate `ADMIN_VERIFICATION_TOKEN` away from optional dev fallback
- Donation flow: wire `NEXT_PUBLIC_PAYPAL_DONATION_URL` when ready
- Dynamic sitemap from Supabase blog/lesson tables

---

## Related docs

- [WEBSITE_JANAGANA_VISITOR_PATHS.md](WEBSITE_JANAGANA_VISITOR_PATHS.md)
- [WEBSITE_JANAGANA_RELEASE.md](WEBSITE_JANAGANA_RELEASE.md)
- [DEVELOPMENT_GUIDE.md](../DEVELOPMENT_GUIDE.md)
- [ARCHITECTURE_OVERVIEW.md](ARCHITECTURE_OVERVIEW.md)
