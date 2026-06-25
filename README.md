# 🦋 The Purple Wings - Financial Literacy Platform

Empowering women through financial education, community support, and accessible learning resources.

## 🚀 Quick Start

### Development
```bash
# Start development server (recommended)
./start-dev.sh

# Or traditional way
npm install
npm run dev
```

Visit http://localhost:3000

### Production Deployment

1. **Setup Git** (one-time)
```bash
git add .
git commit -m "Initial commit"
git push -u origin main
```

2. **Setup Vercel** (one-time)
```bash
# Add missing environment variables
./add-missing-env.sh

# Verify
vercel env ls
```

3. **Deploy**
```bash
vercel --prod
```

## 📚 Documentation

### Essential Documents
- **[docs/SELF_STUDY_PORTAL.md](docs/SELF_STUDY_PORTAL.md)** - Self-study learner journey and public vs signed-in features
- **[docs/PRODUCTION_READINESS.md](docs/PRODUCTION_READINESS.md)** - Production checklist and ops runbook
- **[docs/COURSE_GUIDE.md](docs/COURSE_GUIDE.md)** - Course structure and beginner track
- **[USER_GUIDE.md](USER_GUIDE.md)** - User onboarding, navigation, and platform features
- **[CRM_INTEGRATION_GUIDE.md](CRM_INTEGRATION_GUIDE.md)** - CRM integration, events, and maintenance
- **[DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md)** - Development setup, coding standards, and deployment

## ✨ Features

- **Self-Study Portal** — Free public lessons at [/learn](https://www.thepurplewings.org/learn); optional account for progress
- **Topic Guides** — SEO hubs at `/guides` (budgeting, credit, investing, retirement, and more)
- **Self-Assessment Quiz** — 15-question financial literacy assessment
- **Course Library** - Comprehensive financial education courses
- **Progress Tracking** - Track lesson completion and quiz scores
- **Community** - Team showcases and supporter recognition
- **Hero Slider** - 4-slide auto-rotating carousel
- **Contact Form** - Partnership and volunteer inquiries
- **Authentication** - Google OAuth and email signup
- **Responsive Design** - Mobile-first, accessible UI

## JanaGana Integration

For the NB/TPW pilot, JanaGana is used through public portal links and read-only event embed APIs. TPW does **not** need a JanaGana API key for visitor signup, class registration, or weekly tips.

Browser portal/event integration (public):
```env
NEXT_PUBLIC_JANAGANA_PORTAL_BASE_URL=https://janagana.namasteneedham.com
NEXT_PUBLIC_JANAGANA_TENANT_SLUG=purple-wings
NEXT_PUBLIC_JANAGANA_API_URL=https://janagana.namasteneedham.com
```

Legacy server API sync is disabled unless explicitly opted in:
```env
JANAGANA_LEGACY_API_SYNC_ENABLED=false
JANAGANA_API_URL=https://janagana.namasteneedham.com/api/plugin
```

Notes:
- Use `NEXT_PUBLIC_JANAGANA_PORTAL_BASE_URL` for CTA links to `/portal/purple-wings`.
- Use `NEXT_PUBLIC_JANAGANA_API_URL` for the read-only `/api/embed/events?tenantSlug=purple-wings` feed.
- Do not configure `JANAGANA_API_KEY` for v1 unless the legacy API sync is intentionally re-enabled.

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth + Google OAuth
- **Email:** ZeptoMail (transactional)
- **Deployment:** Vercel
- **Analytics:** Google Analytics

## 📁 Project Structure

```
tpw/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── about/        # About page
│   │   ├── auth/         # Authentication pages
│   │   ├── contact/      # Contact form
│   │   ├── courses/      # Courses listing
│   │   ├── learn/        # Learning platform
│   │   └── page.tsx      # Homepage
│   ├── components/       # React components
│   └── lib/              # Utilities and configs
├── public/
│   └── images/           # Static images
├── scripts/              # Automation scripts
└── supabase-schema.sql   # Database schema
```

## 🧪 Testing

```bash
# Full verify (types + production build)
npm run verify

# Run quality check (tests all URLs)
node scripts/quality-check.js

# E2E (Playwright)
npm run test:e2e

# Sync lesson content to Supabase
npm run sync-lessons

# Health check (after deploy)
curl -s https://www.thepurplewings.org/api/health
```

## 🌟 Team

- **Shalini Jha** - Founder & CEO
- **Sanjeev Jha** - Technical Advisor
- **Bala** - Community Supporter
- **Shweta** - Community Helper

## 📝 Scripts

- `start-dev.sh` - Start dev server (kills port 3000, clears cache)
- `add-missing-env.sh` - Add missing Vercel environment variables
- `setup-vercel-env.sh` - Full Vercel environment setup
- `scripts/quality-check.js` - Test all URLs
- `scripts/create-self-assessment.ts` - Create assessment quiz

## 🔗 Links

- **Repository:** https://github.com/jhasavi/tpw
- **Vercel Project:** prj_sNIVpOwJsHQXzv6gAfSoF9le4eUy
- **Production:** https://www.thepurplewings.org

## 📰 Media Coverage

- **Needham Observer:** [Program Encourages Women to Spread Financial Literacy Wings](https://needhamobserver.com/program-encourages-women-to-spread-financial-literacy-wings/)
- **Boston 25 News:** [She Had No Clue How Much Money She Had - Local Group Empowering Women to Understand Finances](https://www.boston25news.com/news/local/she-had-no-clue-how-much-money-she-had-local-group-empowering-women-understand-finances/JBGKMMBLRRHQPLIP564E6NCNUY/)
- **Yahoo News:** [She Had No Clue How Much Money She Had](https://www.yahoo.com/news/she-had-no-clue-much-114224629.html)
- **Hometown Weekly:** [ICON Celebrates India's Independence Day](https://hometownweekly.net/needham/icon-celebrates-indias-independence-day/)

## 📄 License

Proprietary - The Purple Wings © 2025

## 🤝 Contributing

This is a private project. For questions or collaboration inquiries, contact:
- Email: info@thepurplewings.org
- Website: (Coming soon)

---

Built with 💜 by The Purple Wings team
