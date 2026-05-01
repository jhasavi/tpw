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

- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Complete deployment instructions
- **[VERCEL_ENV_SETUP.md](VERCEL_ENV_SETUP.md)** - Environment variables guide
- **[FINAL_COMPLETION_SUMMARY.md](FINAL_COMPLETION_SUMMARY.md)** - Project status
- **[WORK_COMPLETED.md](WORK_COMPLETED.md)** - Features delivered

## ✨ Features

- **Self-Assessment Quiz** - 15-question financial literacy assessment
- **Course Library** - Comprehensive financial education courses
- **Progress Tracking** - Track lesson completion and quiz scores
- **Community** - Team showcases and supporter recognition
- **Hero Slider** - 4-slide auto-rotating carousel
- **Contact Form** - Partnership and volunteer inquiries
- **Authentication** - Google OAuth and email signup
- **Responsive Design** - Mobile-first, accessible UI

## JanaGana Integration

Use separate environment variables for browser embed widgets and server-to-server API calls.

Browser embed (public):
```env
NEXT_PUBLIC_JANAGANA_TENANT_SLUG=purple-wings
NEXT_PUBLIC_JANAGANA_API_URL=https://janagana.namasteneedham.com
```

Server API sync (private):
```env
JANAGANA_API_URL=https://janagana.namasteneedham.com/api/plugin
JANAGANA_API_KEY=your_private_plugin_api_key
```

Notes:
- Use `NEXT_PUBLIC_...` vars only for loading `janagana-embed.js` and calling `Janagana.init(...)` in browser code.
- Use `JANAGANA_API_*` only in server routes/scripts (never expose API keys to client code).

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth + Google OAuth
- **Email:** Resend
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
# Run quality check (tests all URLs)
node scripts/quality-check.js

# Run self-assessment creation
npx tsx scripts/create-self-assessment.ts
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
