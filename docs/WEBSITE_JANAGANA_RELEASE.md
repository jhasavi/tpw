# Release: Website → JanaGana sync (The Purple Wings)

**Date:** 2026-05-28  
**Scope:** Visitor clarity + event embed consumption (no CRM/Stripe).

## Shipped

- `src/lib/janagana-portal.ts` for canonical production URLs.
- Homepage dual-path newsletter (weekly tips vs JanaGana community).
- Footer/nav labels distinguish tips vs classes/events.
- `/newsletter/subscribe` banner points event seekers to JanaGana.
- `/events` empty state and footer CTAs link to JanaGana.

## Depends on JanaGana

- `GET /api/embed/events` and `GET /api/embed/past-events` must be deployed on `janagana.namasteneedham.com`.

## Production domains

- Public: `https://www.thepurplewings.org`
- JanaGana: `https://janagana.namasteneedham.com`

## Production verification (2026-05-28 closeout)

- `main` @ `a34bbb6`; Vercel production **Ready**.
- Live `https://www.thepurplewings.org` — dual newsletter, `/events` embed register URLs, subscribe-page banner verified.

## Rollback

Revert `main` on TPW; event page falls back to legacy past archive if embed API unavailable.
