# Quick Reference: Fixing Registration Issues

## ✅ Database Cleaned
All test users removed. Database ready for fresh testing.

## 🔐 Action Required: Rotate Resend API Key

**Exposed Key:** `re_jR6ucccW_CcmQvMioJRXJ2vpQyWDLZAdX`

### Steps:
1. Go to https://resend.com/api-keys
2. Delete old key
3. Create new key
4. Update `.env.local` (locally)
5. Update Vercel environment variables
6. Redeploy

## 📧 Why Email Confirmation Isn't Working

**Supabase handles auth emails, not Resend!**

### Fix in Supabase Dashboard:

**URL:** https://supabase.com/dashboard/project/ckdshqbrxctjadljjhhy

**Navigate to:** Authentication → Settings → SMTP

**Configure Custom SMTP with Resend:**
```
Enable Custom SMTP: ✅ ON
SMTP Host: smtp.resend.com
SMTP Port: 587
SMTP User: resend
SMTP Password: [YOUR NEW RESEND API KEY]
Sender email: noreply@updates.namastebostonhomes.com
Sender name: The Purple Wings
```

**Also check:**
- Authentication → Settings → Enable email confirmations: ✅ ON
- Site URL: `https://www.thepurplewings.org`
- Redirect URLs: Add `https://www.thepurplewings.org/auth/callback`

## 🧪 Test After Fixes

1. Go to https://www.thepurplewings.org/auth/signup
2. Create new account
3. Should receive confirmation email within 2 minutes
4. Click confirmation link
5. Should redirect to dashboard

## 📊 Verify in Database

```sql
-- Check new user
SELECT email, created_at, email_confirmed_at 
FROM auth.users 
ORDER BY created_at DESC 
LIMIT 1;
```

## 🔍 Current Status

- ✅ Database cleaned (5 test users deleted)
- ⏳ API key needs rotation (DO NOW)
- ⏳ Supabase SMTP needs configuration
- ✅ No orphaned tables found
- ✅ Schema is clean

See `URGENT_SECURITY_FIXES.md` for complete details.
