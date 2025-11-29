# 🚀 Deployment Guide - The Purple Wings

## ✅ Setup Completed

All setup has been completed successfully:

1. ✅ **Git Repository Initialized**
2. ✅ **GitHub Remote Added** - github.com/jhasavi/tpw
3. ✅ **Vercel Project Linked** - prj_sNIVpOwJsHQXzv6gAfSoF9le4eUy
4. ✅ **Startup Script Created** - start-dev.sh
5. ✅ **Vercel Env Setup Script** - setup-vercel-env.sh
6. ✅ **Team Members Added** - Bala & Shweta now on About page

---

## 🎯 Quick Commands

### Start Development Server
```bash
# New easy way (kills existing process on port 3000, clears cache)
./start-dev.sh

# Or the traditional way
npm run dev
```

### Git Workflow
```bash
# Check status
git status

# Stage all changes
git add .

# Commit with message
git commit -m "Your commit message"

# Push to GitHub
git push -u origin stabilize-nov21

# Or push to main branch
git push -u origin main
```

### Vercel Deployment
```bash
# Setup environment variables (one-time)
./setup-vercel-env.sh

# Deploy to production
vercel --prod

# Or just preview deployment
vercel
```

---

## 📋 Step-by-Step First Deployment

### Step 1: Initial Git Commit
```bash
cd /Users/Sanjeev/tpw

# Stage all files
git add .

# Commit
git commit -m "Initial commit - The Purple Wings platform ready for deployment"

# Check your current branch
git branch

# If you need to rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

### Step 2: Setup Vercel Environment Variables

**Option A: Automated Script (Recommended)**
```bash
./setup-vercel-env.sh
```

**Option B: Manual via CLI**
```bash
# See commands in VERCEL_ENV_SETUP.md
cat VERCEL_ENV_SETUP.md
```

**Option C: Via Vercel Dashboard**
1. Go to https://vercel.com/jhasavi/tpw/settings/environment-variables
2. Add each variable from `.env.local`
3. Important: Update OAuth redirect URLs for production domain

### Step 3: Deploy to Vercel
```bash
# Production deployment
vercel --prod

# Follow the prompts, it will:
# 1. Build your Next.js app
# 2. Deploy to production
# 3. Give you the production URL
```

### Step 4: Update OAuth Redirect URLs

**After you get your production URL:**

1. **Update Vercel Environment Variables:**
   ```bash
   vercel env add OAUTH_GOOGLE_REDIRECT_URL production
   # Enter: https://your-domain.vercel.app/auth/callback
   
   vercel env add OAUTH_SUCCESS_REDIRECT_URL production
   # Enter: https://your-domain.vercel.app/dashboard
   
   vercel env add OAUTH_ERROR_REDIRECT_URL production
   # Enter: https://your-domain.vercel.app/auth/login?error=auth_failed
   ```

2. **Update Google OAuth Console:**
   - Go to https://console.cloud.google.com
   - Find your OAuth 2.0 Client
   - Add authorized redirect URIs:
     - `https://your-domain.vercel.app/auth/callback`
     - `https://ckdshqbrxctjadljjhhy.supabase.co/auth/v1/callback`

3. **Update Supabase:**
   - Go to Supabase Dashboard → Authentication → URL Configuration
   - Site URL: `https://your-domain.vercel.app`
   - Redirect URLs: Add `https://your-domain.vercel.app/**`

---

## 🔧 Troubleshooting

### Port 3000 Already in Use
```bash
# Use the startup script - it handles this automatically
./start-dev.sh

# Or manually kill process
lsof -ti:3000 | xargs kill -9
```

### Git Push Rejected
```bash
# If remote has changes you don't have
git pull origin main --rebase

# Then push
git push origin main
```

### Vercel Build Fails
```bash
# Check build logs in Vercel dashboard
# Common issues:
# 1. Missing environment variables
# 2. TypeScript errors
# 3. Build timeout

# Test build locally first
npm run build
```

### Environment Variables Not Working
```bash
# Pull latest from Vercel
vercel env pull

# Verify they exist
vercel env ls

# Re-run setup if needed
./setup-vercel-env.sh
```

---

## 📁 New Files Created

### Scripts
- `start-dev.sh` - Development server startup script
- `setup-vercel-env.sh` - Automated Vercel env setup
- `scripts/create-self-assessment.ts` - Self-assessment creator (already run)
- `scripts/quality-check.js` - URL testing automation

### Documentation
- `VERCEL_ENV_SETUP.md` - Vercel configuration guide
- `DEPLOYMENT_GUIDE.md` - This file
- `WORK_COMPLETED.md` - Work completion summary
- `IMPLEMENTATION_STATUS.md` - Detailed status

### Git
- `.git/` - Git repository initialized
- Remote: `https://github.com/jhasavi/tpw.git`

### Vercel
- `.vercel/` - Vercel configuration
- Project: `prj_sNIVpOwJsHQXzv6gAfSoF9le4eUy`

---

## 🌟 What's Deployed

When you deploy, you'll get:

✅ **15 Quiz Questions** for self-assessment
✅ **4-Slide Hero Carousel** with auto-rotation
✅ **Contact Form** with partnership info
✅ **4 Team Members** (Shalini, Sanjeev, Bala, Shweta)
✅ **All Bug Fixes** (404s, auth, session persistence)
✅ **Navigation Updates** (Contact link)
✅ **Quality Assurance Tools** (testing scripts)

---

## 🎯 Post-Deployment Checklist

After deploying to production:

- [ ] Visit production URL
- [ ] Test hero slider auto-rotation
- [ ] Click all navigation links
- [ ] Test signup with Google OAuth
- [ ] Test email signup (with rate limiting handling)
- [ ] Navigate to a course
- [ ] Navigate to a lesson
- [ ] Try self-assessment quiz
- [ ] Test contact form
- [ ] Check About page team members (should see 4)
- [ ] Verify favicon appears
- [ ] Test on mobile device
- [ ] Run Lighthouse audit

---

## 📞 Quick Reference

**Repository:** https://github.com/jhasavi/tpw  
**Branch:** stabilize-nov21 (or main)  
**Vercel Project:** prj_sNIVpOwJsHQXzv6gAfSoF9le4eUy  
**Local Port:** 3000  

**Key Commands:**
```bash
./start-dev.sh           # Start dev server
git add . && git commit -m "message"  # Commit changes
git push origin main     # Push to GitHub
vercel --prod           # Deploy to production
```

---

**Ready to deploy!** 🚀

Start with:
```bash
# 1. Commit your work
git add .
git commit -m "Ready for production deployment"
git push -u origin main

# 2. Setup Vercel env
./setup-vercel-env.sh

# 3. Deploy!
vercel --prod
```
