# 🚨 URGENT: Security & Registration Fixes Required

## Date: November 30, 2025

---

## ✅ COMPLETED: Database Cleanup

**All test users deleted successfully:**
- Removed 5 auth users
- Cleaned 5 profiles  
- Cleared 6 lesson progress records
- Removed 2 course bookmarks
- Cleaned 4 user gamification entries
- Removed 1 self-assessment result

**Database is now clean and ready for production testing.**

---

## 🔐 CRITICAL: Resend API Key Exposed on GitHub

**GitGuardian Alert Details:**
- Secret type: Resend API Key
- Repository: jhasavi/tpw
- Exposed key: `re_jR6ucccW_CcmQvMioJRXJ2vpQyWDLZAdX`
- Pushed date: December 1st 2025, 00:03:38 UTC

### IMMEDIATE ACTION REQUIRED:

### Step 1: Rotate Resend API Key (DO THIS NOW!)

1. **Go to Resend Dashboard:**
   - Visit: https://resend.com/api-keys
   - Log in to your account

2. **Delete the compromised key:**
   - Find key: `re_jR6ucccW_CcmQvMioJRXJ2vpQyWDLZAdX`
   - Click "Delete" or "Revoke"

3. **Create a new API key:**
   - Click "Create API Key"
   - Name: "TPW Production - Dec 2025"
   - Copy the new key (you'll only see it once!)

4. **Update .env.local (locally):**
   ```bash
   RESEND_API_KEY=re_YOUR_NEW_KEY_HERE
   ```

5. **Update Vercel Environment Variables:**
   - Go to: https://vercel.com/jhasavi/tpw/settings/environment-variables
   - Find `RESEND_API_KEY`
   - Click "Edit"
   - Paste new key
   - Click "Save"
   - **IMPORTANT:** Redeploy the application after updating

6. **Never commit .env.local to git!**
   - Already in `.gitignore` ✅
   - The key was exposed in commit history, not current code

---

## 📧 Email Confirmation Not Working - DIAGNOSIS

### Issue: Users not receiving confirmation emails

**Root Cause Analysis:**

1. **Supabase Email Settings:**
   - Supabase handles auth emails, NOT Resend
   - Resend is only for newsletter/contact form emails
   - Email templates configured in Supabase Dashboard

2. **Where to Fix:**

   **Go to Supabase Dashboard:**
   - URL: https://supabase.com/dashboard/project/ckdshqbrxctjadljjhhy
   - Navigate to: **Authentication** → **Email Templates**

3. **Check these settings:**

   **A. SMTP Settings (Authentication → Settings → SMTP)**
   - Is custom SMTP configured?
   - If using Supabase's default email service, it has limits
   - **RECOMMENDED:** Set up custom SMTP with Resend

   **B. Email Templates (Authentication → Email Templates)**
   - Check "Confirm signup" template is enabled
   - Verify template content looks correct
   - Test with "Send test email"

   **C. Auth Settings (Authentication → Settings)**
   - Verify "Enable email confirmations" is ON
   - Check "Confirm email" toggle
   - Set "Site URL" to: `https://www.thepurplewings.org`
   - Set "Redirect URLs" to include: 
     - `https://www.thepurplewings.org/auth/callback`
     - `http://localhost:3000/auth/callback` (for dev)

### SMTP Configuration with Resend (RECOMMENDED):

In Supabase Dashboard → Authentication → Settings → SMTP:

```
Enable Custom SMTP: ✅ ON

SMTP Host: smtp.resend.com
SMTP Port: 587
SMTP User: resend
SMTP Password: re_YOUR_NEW_RESEND_KEY
Sender email: noreply@updates.namastebostonhomes.com
Sender name: The Purple Wings
```

This will use Resend for ALL emails including auth confirmations!

---

## 🧹 Orphaned Tables - ASSESSMENT

**Found these user-related tables in public schema:**
- `user_achievements` - ✅ KEEP (for gamification)
- `user_activity_log` - ✅ KEEP (for tracking)
- `user_challenges` - ✅ KEEP (for challenges feature)
- `user_financial_profiles` - ✅ KEEP (extended profile)
- `user_gamification` - ✅ KEEP (points/badges)
- `user_saved_resources` - ✅ KEEP (bookmarks)
- `user_tooltips_seen` - ✅ KEEP (UX tracking)
- `users` - ⚠️ **POTENTIALLY ORPHANED**

### The `public.users` Table Issue:

**Status:** EMPTY (0 rows)
**Purpose:** Unknown - might be leftover from old schema

**Decision:**
- ✅ **KEEP for now** - might be used by app code
- ❌ **DO NOT DROP** until code audit confirms it's unused
- The real users are in `auth.users` (Supabase managed)
- `public.profiles` extends `auth.users` (this is correct pattern)

### Schema Pattern (Correct):
```
auth.users (managed by Supabase)
    └── triggers on insert/update
        └── public.profiles (extended user data)
            └── public.user_* tables (features)
```

**No duplicates found. Schema is clean.** ✅

---

## ✅ TESTING CHECKLIST

After rotating API key and fixing email settings:

### 1. Test New User Registration:

```bash
# Visit: https://www.thepurplewings.org/auth/signup

Test Case:
- Email: your_test_email@example.com
- Password: Test123!@#
- Full Name: Test User

Expected Results:
✅ Account created
✅ Confirmation email received within 2 minutes
✅ Email from: noreply@updates.namastebostonhomes.com
✅ Click confirmation link works
✅ Redirects to: /dashboard or /auth/login
✅ Can login after confirming
```

### 2. Verify in Database:

```sql
-- Check new user was created
SELECT email, created_at, email_confirmed_at 
FROM auth.users 
WHERE email = 'your_test_email@example.com';

-- Should show:
-- - created_at: timestamp
-- - email_confirmed_at: NULL (until confirmed)
-- After clicking email link:
-- - email_confirmed_at: timestamp ✅
```

### 3. Check Resend Logs:

- Go to: https://resend.com/emails
- Should see confirmation email sent
- Check delivery status

---

## 🔒 Security Best Practices Going Forward

1. **Never commit secrets to git** ✅ (already in .gitignore)
2. **Use environment variables** ✅ (already doing)
3. **Rotate keys immediately when exposed** ⏳ (DO THIS NOW)
4. **Use Vercel env vars for production** ✅ (already set up)
5. **Monitor GitGuardian alerts** ⏳ (check email regularly)

---

## 📝 Next Steps (Priority Order)

### HIGH PRIORITY (Do Now):
1. ✅ **Database cleaned** (DONE)
2. ⏳ **Rotate Resend API key** (15 minutes)
3. ⏳ **Configure Supabase SMTP with Resend** (10 minutes)
4. ⏳ **Test signup flow** (5 minutes)

### MEDIUM PRIORITY (This Week):
5. ⏳ Enable RLS policies on all tables
6. ⏳ Set up monitoring/alerts for auth failures
7. ⏳ Document admin procedures

### LOW PRIORITY (Future):
8. ⏳ Audit and potentially drop `public.users` if unused
9. ⏳ Set up automated database backups
10. ⏳ Create data retention policy

---

## 🆘 If Issues Persist

**Email not sending after fixes:**
1. Check Resend logs: https://resend.com/emails
2. Check Supabase logs: Dashboard → Logs → Auth
3. Check browser console for errors
4. Verify Vercel env vars were saved and deployed

**Rate limiting:**
- Wait 10 minutes between signup attempts
- Or use Google OAuth instead

**Still stuck?**
- Check `.env.local` has new API key
- Restart dev server: `npm run dev`
- Clear browser cache
- Try incognito mode

---

## Database Connection String (Reference)
```
postgresql://postgres:T3ra-ghar25@db.ckdshqbrxctjadljjhhy.supabase.co:5432/postgres
```

⚠️ **Remember to update this password eventually for security!**
