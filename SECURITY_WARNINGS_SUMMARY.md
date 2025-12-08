# Supabase Security Warnings - What We're Fixing

## Current Status (Before Fix)

### 🔴 ERRORS (11 total)

#### Security Definer Views (3 errors)
These views use the permissions of the view creator instead of the user querying them:
- ❌ `quiz_attempts_detailed`
- ❌ `course_progress_summary`
- ❌ `user_learning_stats`

**Risk**: Could allow unauthorized data access
**Fix**: Recreate views without SECURITY DEFINER

---

#### RLS Disabled (8 errors)
These tables are exposed to PostgREST without Row Level Security:
- ❌ `achievements`
- ❌ `users` (if exists)
- ❌ `courses`
- ❌ `curricula`
- ❌ `lessons`
- ❌ `lesson_quizzes`
- ❌ `self_assessments`
- ❌ `quiz_questions`

**Risk**: Anyone with PostgREST access can read/write all data
**Fix**: Enable RLS + add appropriate read-only policies

---

### ⚠️  WARNINGS (19 total)

#### Function Search Path Mutable (16 warnings)
These functions don't have a fixed search_path, vulnerable to privilege escalation:
- ⚠️  `increment_user_lesson_progress`
- ⚠️  `check_and_award_achievements`
- ⚠️  `calculate_profile_completeness`
- ⚠️  `update_learning_streak` (appears twice with different signatures)
- ⚠️  `trigger_update_profile_completeness`
- ⚠️  `get_user_role`
- ⚠️  `increment_topic_views`
- ⚠️  `update_topic_activity`
- ⚠️  `update_modified_column`
- ⚠️  `initialize_user_gamification`
- ⚠️  `update_daily_goals`
- ⚠️  `calculate_course_progress`
- ⚠️  `update_enrollment_progress`
- ⚠️  `update_updated_at_column`
- ⚠️  `generate_course_recommendations`

**Risk**: Attacker could inject malicious functions/tables with the same name
**Fix**: Add `SET search_path = public` to each function

---

#### Auth Configuration (2 warnings)
- ⚠️  **OTP Expiry too long** (> 1 hour)
  - **Fix**: Reduce to ≤ 1 hour in Dashboard → Authentication → Email Auth
  
- ⚠️  **Leaked Password Protection Disabled**
  - **Fix**: ~~Enable in Dashboard~~ **Pro Plan Only** - Can ignore on free tier

---

#### Database Version (1 warning)
- ⚠️  **Postgres version has security patches available**
  - **Current**: `supabase-postgres-17.4.1.069`
  - **Fix**: Upgrade in Dashboard → Settings → Infrastructure

---

## After Running the Migration

### ✅ Will Be Fixed (26 issues)

#### Database Changes (via SQL Migration)
- ✅ 3 views recreated without SECURITY DEFINER
- ✅ 7-8 tables with RLS enabled + policies
- ✅ 15+ functions with search_path set

#### Manual Dashboard Changes Required (3 issues)
1. ⚠️  OTP Expiry - **Manual fix needed**
2. ⚠️  Password Protection - **Ignore (Pro only)**
3. ⚠️  Postgres Upgrade - **Manual fix needed**

---

## Summary

| Issue Type | Count | Fixed by SQL | Manual Fix | Can Ignore |
|------------|-------|-------------|------------|------------|
| SECURITY DEFINER Views | 3 | ✅ | | |
| RLS Disabled | 8 | ✅ | | |
| Function Search Path | 16 | ✅ | | |
| Auth OTP Expiry | 1 | | ⚠️ | |
| Leaked Password Protection | 1 | | | ✅ Pro only |
| Postgres Version | 1 | | ⚠️ | |
| **TOTAL** | **30** | **27** | **2** | **1** |

---

## Expected Final Result

After running SQL migration + manual fixes:
- **Errors**: 11 → **0** ✅
- **Warnings**: 19 → **1** (Password Protection - Pro only)

**Security Score**: Significantly improved! 🎉
