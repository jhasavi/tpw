# Supabase SMTP Configuration with Resend

## Step-by-Step Guide

### 1. Access Supabase Dashboard

**URL:** https://supabase.com/dashboard/project/ckdshqbrxctjadljjhhy

**Login credentials:** Use your Supabase account

---

### 2. Navigate to SMTP Settings

1. Click on your project: **ckdshqbrxctjadljjhhy**
2. In the left sidebar, click **Authentication**
3. Click the **Settings** tab (top navigation)
4. Scroll down to find **SMTP Settings** section

---

### 3. Configure SMTP with Resend

**Enable Custom SMTP:**
- Toggle: **✅ Enable Custom SMTP**

**SMTP Configuration:**

| Field | Value |
|-------|-------|
| **SMTP Host** | `smtp.resend.com` |
| **SMTP Port** | `587` |
| **SMTP User** | `resend` |
| **SMTP Password** | `re_jR6ucccW_CcmQvMioJRXJ2vpQyWDLZAdX` |
| **Sender Email** | `noreply@updates.namastebostonhomes.com` |
| **Sender Name** | `The Purple Wings` |

**Security Settings:**
- **Enable STARTTLS:** ✅ Yes (default)
- **Skip TLS Verification:** ❌ No (keep unchecked for security)

---

### 4. Verify Email Templates

While in **Authentication** section:

1. Click **Email Templates** (top tab)
2. Verify these templates are enabled:
   - ✅ **Confirm signup** - Sent when user registers
   - ✅ **Magic Link** - For passwordless login
   - ✅ **Change Email Address** - When user updates email
   - ✅ **Reset Password** - Password recovery

**Test Template:**
- Click "Send test email" on any template
- Enter your email
- Check if email arrives (should come from noreply@updates.namastebostonhomes.com)

---

### 5. Configure Auth Settings

In **Authentication → Settings** (URL settings section):

| Setting | Value |
|---------|-------|
| **Site URL** | `https://www.thepurplewings.org` |
| **Redirect URLs** | Add these two URLs: |
| | `https://www.thepurplewings.org/auth/callback` |
| | `http://localhost:3000/auth/callback` |

**Email Auth Settings:**
- **Enable email confirmations:** ✅ ON
- **Enable email change confirmations:** ✅ ON
- **Secure email change:** ✅ ON

---

### 6. Test Configuration

**A. Test Email Delivery:**

1. Go to: https://www.thepurplewings.org/auth/signup
2. Create a new test account:
   - Email: `test@yourdomain.com`
   - Password: `Test123!@#`
   - Full Name: `Test User`
3. Submit the form
4. **Check your inbox** (should receive email within 1-2 minutes)
5. **Check spam folder** if not in inbox

**Expected Email:**
- **From:** The Purple Wings <noreply@updates.namastebostonhomes.com>
- **Subject:** Confirm your signup
- **Content:** Link to confirm email address

**B. Check Resend Logs:**

1. Go to: https://resend.com/emails
2. Should see the confirmation email in logs
3. Check delivery status (should be "Delivered")

**C. Verify in Database:**

```sql
-- Check if user was created
SELECT email, created_at, email_confirmed_at 
FROM auth.users 
WHERE email = 'test@yourdomain.com';

-- Before clicking confirmation link:
-- email_confirmed_at will be NULL

-- After clicking confirmation link:
-- email_confirmed_at will have a timestamp ✅
```

---

### 7. Troubleshooting

**If emails not sending:**

1. **Check SMTP credentials:**
   - Verify API key is correct
   - Ensure no extra spaces in fields

2. **Check Resend domain verification:**
   - Go to: https://resend.com/domains
   - Verify `updates.namastebostonhomes.com` is verified
   - Check DNS records are properly configured

3. **Check Supabase Logs:**
   - In Supabase Dashboard: **Logs** → **Auth**
   - Look for SMTP errors

4. **Check Rate Limits:**
   - Resend free tier: 100 emails/day
   - Supabase free tier: 4 emails/hour
   - Wait if limits exceeded

**If emails going to spam:**

1. **Improve email reputation:**
   - Add DKIM, SPF, DMARC records in Resend
   - Use proper sender name and email
   - Avoid spam trigger words

2. **Warm up domain:**
   - Send emails gradually
   - Don't send too many at once

---

### 8. Alternative: Use Environment Variables (Already Configured)

Your app already has Resend configured for custom emails:

**In `.env.local` (local development):**
```bash
RESEND_API_KEY=re_jR6ucccW_CcmQvMioJRXJ2vpQyWDLZAdX
RESEND_FROM_EMAIL=The Purple Wings <noreply@updates.namastebostonhomes.com>
```

**In Vercel (production):**
- Already configured in environment variables
- Used for newsletter and contact form emails

**This SMTP configuration adds:**
- Resend for Supabase auth emails (signup confirmations, password resets)
- Consistent sender across all emails
- Better deliverability

---

### 9. Quick Reference

**Resend Dashboard:**
- API Keys: https://resend.com/api-keys
- Email Logs: https://resend.com/emails
- Domains: https://resend.com/domains

**Supabase Dashboard:**
- Project: https://supabase.com/dashboard/project/ckdshqbrxctjadljjhhy
- Auth Settings: https://supabase.com/dashboard/project/ckdshqbrxctjadljjhhy/auth/settings
- Email Templates: https://supabase.com/dashboard/project/ckdshqbrxctjadljjhhy/auth/templates

**Database:**
```bash
postgresql://postgres:T3ra-ghar25@db.ckdshqbrxctjadljjhhy.supabase.co:5432/postgres
```

---

### 10. Summary

**What we're doing:**
- Using Resend SMTP for ALL emails (auth + custom)
- Consistent sender: noreply@updates.namastebostonhomes.com
- Better deliverability than Supabase's default email service

**Benefits:**
- ✅ Reliable email delivery
- ✅ Detailed email logs in Resend
- ✅ Higher rate limits
- ✅ Professional sender domain
- ✅ Track email opens/clicks (Resend analytics)

---

## Current Status

- ✅ Resend API key ready to use
- ⏳ Need to configure in Supabase dashboard (5 minutes)
- ⏳ Test email delivery
- ✅ App code already configured

**Total setup time: ~10 minutes**

After configuration, all signup confirmations will be sent via Resend!
