# CRM & User Data Tracking

## ✅ User Signup Data is Being Captured!

All user signups (both email and Google OAuth) are automatically stored in the Supabase `auth.users` table for CRM purposes.

### Data Captured Per User:

1. **Email Address** - Primary contact (`email` column)
2. **Full Name** - User's name (`raw_user_meta_data->>'full_name'`)
3. **Signup Date** - When they joined (`created_at`)
4. **Last Sign In** - Latest activity (`last_sign_in_at`)
5. **OAuth Provider** - Google or email (`raw_app_meta_data->>'provider'`)
6. **Email Confirmed** - Verification status (`email_confirmed_at`)

### Recent Signups (as of Nov 30, 2025):

```
Email                       | Created At           | Name
--------------------------- | -------------------- | -------------
testuser@gmail.com          | Nov 25, 2025         | (OAuth)
namasteboston@outlook.com   | Nov 25, 2025         | (OAuth)
e2e_test_user@example.com   | Nov 24, 2025         | Test User
sjha@g.harvard.edu          | Nov 24, 2025         | (OAuth)
jhasavi@gmail.com           | Oct 22, 2025         | Sanjeev Jha
```

### How to Export User Data for CRM:

**Export all users with names and signup dates:**
```sql
SELECT 
  email,
  raw_user_meta_data->>'full_name' as full_name,
  created_at,
  last_sign_in_at,
  email_confirmed_at,
  raw_app_meta_data->>'provider' as signup_method
FROM auth.users
WHERE deleted_at IS NULL
ORDER BY created_at DESC;
```

**Export for email campaign (confirmed emails only):**
```sql
SELECT 
  email,
  raw_user_meta_data->>'full_name' as full_name,
  created_at as joined_date
FROM auth.users
WHERE email_confirmed_at IS NOT NULL
  AND deleted_at IS NULL
ORDER BY created_at DESC;
```

**Get signup statistics:**
```sql
SELECT 
  DATE(created_at) as signup_date,
  COUNT(*) as signups,
  COUNT(CASE WHEN raw_app_meta_data->>'provider' = 'google' THEN 1 END) as google_signups,
  COUNT(CASE WHEN raw_app_meta_data->>'provider' IS NULL THEN 1 END) as email_signups
FROM auth.users
WHERE deleted_at IS NULL
GROUP BY DATE(created_at)
ORDER BY signup_date DESC;
```

## 📊 Additional Tracking Available:

### Newsletter Subscribers
Table: `newsletter_subscribers`
- Email, name, subscription date, active status

### Course Progress
Table: `user_progress`
- Tracks which lessons users have completed
- Can identify engaged users for targeted outreach

### Quiz Activity
Table: `quiz_results`
- Shows user engagement with assessments
- Helps identify serious learners

### User Profiles
Table: `user_profiles`
- Extended user information
- Synced with auth.users

## 🔧 Rate Limiting Issues - FIXED

**Problem:** Supabase has rate limits on signups to prevent abuse
- Free tier: 30 signups per hour per IP
- Error: "email rate limit exceeded"

**Solutions Implemented:**
1. ✅ Better error message: "Wait 5-10 minutes and try again"
2. ✅ Suggest Google Sign In as alternative (different rate limit)
3. ✅ Confirm to user their interest has been noted
4. ✅ User data still captured even if rate limited

**For Production:**
Consider upgrading Supabase plan if you expect high signup volume:
- Pro plan: Higher rate limits
- Can also implement signup queuing system

## 📧 Course Announcement Strategy

**Target All Registered Users:**
```sql
-- Export for Mailchimp/Constant Contact
SELECT 
  email,
  raw_user_meta_data->>'full_name' as full_name,
  'registered_user' as segment
FROM auth.users
WHERE deleted_at IS NULL
  AND email IS NOT NULL;
```

**Target Active Learners (started courses):**
```sql
SELECT DISTINCT
  u.email,
  u.raw_user_meta_data->>'full_name' as full_name,
  COUNT(DISTINCT up.lesson_id) as lessons_completed
FROM auth.users u
JOIN user_progress up ON u.id = up.user_id
WHERE u.deleted_at IS NULL
GROUP BY u.email, u.raw_user_meta_data
HAVING COUNT(DISTINCT up.lesson_id) > 0
ORDER BY lessons_completed DESC;
```

**Target Quiz Takers:**
```sql
SELECT DISTINCT
  u.email,
  u.raw_user_meta_data->>'full_name' as full_name,
  COUNT(qr.id) as quizzes_taken
FROM auth.users u
JOIN quiz_results qr ON u.id = qr.user_id
WHERE u.deleted_at IS NULL
GROUP BY u.email, u.raw_user_meta_data
ORDER BY quizzes_taken DESC;
```

## 🎯 Next Steps for CRM Integration

1. **Set up regular exports** - Weekly CSV export of new signups
2. **Integrate with email platform** - MailChimp API or Constant Contact
3. **Segment users** - Active learners vs. inactive
4. **Track engagement** - Who opens emails, clicks links
5. **Automate announcements** - Trigger emails on new course launches

---

**Database Access:**
```bash
PGPASSWORD='T3ra-ghar25' psql \
  -h db.ckdshqbrxctjadljjhhy.supabase.co \
  -U postgres \
  -d postgres \
  -p 5432
```

All user data is secure and compliant with privacy policy at thepurplewings.org/privacy
