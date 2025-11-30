# 🚀 Profile Enhancement Setup - Quick Guide

## Step 1: Database Migration (5 minutes)

### Copy & Paste in Supabase SQL Editor

1. **Open Supabase Dashboard**
   - Go to https://supabase.com/dashboard
   - Select your project: `ckdshqbrxctjadljjhhy`

2. **Navigate to SQL Editor**
   - Click "SQL Editor" in left sidebar
   - Click "New query"

3. **Run Migration**
   - Open file: `database/migrations/QUICK_MIGRATION.sql`
   - Copy ALL contents (Cmd+A, Cmd+C)
   - Paste into SQL Editor
   - Click "Run" button
   - Wait for completion message: ✅ Migration complete!

---

## Step 2: Storage Bucket Setup (3 minutes)

### Create Profile Images Bucket

1. **Go to Storage**
   - Click "Storage" in left sidebar
   - Click "Create a new bucket"

2. **Configure Bucket**
   - Name: `profile-images`
   - Public bucket: ✅ **YES** (toggle ON)
   - Click "Create bucket"

3. **Set File Size Limit**
   - Click on `profile-images` bucket
   - Click "Configuration" tab
   - File size limit: `5242880` (5MB)
   - Allowed MIME types: `image/*`
   - Click "Save"

### Add Storage Policies

Click "Policies" tab → "Create policy" (4 times):

**Policy 1: Upload Avatar**
- Operation: INSERT
- Name: `Users can upload their own avatar`
- Policy definition:
```sql
bucket_id = 'profile-images' AND (storage.foldername(name))[1] = auth.uid()::text
```

**Policy 2: View Avatars**
- Operation: SELECT
- Name: `Public avatar access`
- Policy definition:
```sql
bucket_id = 'profile-images'
```

**Policy 3: Update Avatar**
- Operation: UPDATE
- Name: `Users can update their own avatar`
- Policy definition:
```sql
bucket_id = 'profile-images' AND (storage.foldername(name))[1] = auth.uid()::text
```

**Policy 4: Delete Avatar**
- Operation: DELETE
- Name: `Users can delete their own avatar`
- Policy definition:
```sql
bucket_id = 'profile-images' AND (storage.foldername(name))[1] = auth.uid()::text
```

---

## Step 3: Verify Migration (2 minutes)

### Check Tables Created

Go to Table Editor and verify these tables exist:
- ✅ `achievements` (should have 17 rows)
- ✅ `user_achievements`
- ✅ `course_bookmarks`
- ✅ `lesson_bookmarks`
- ✅ `learning_streaks`
- ✅ `learning_playlists`
- ✅ `playlist_items`

### Check Profiles Extended

Click on `profiles` table and verify new columns:
- ✅ `bio`
- ✅ `financial_goals`
- ✅ `interests`
- ✅ `experience_level`
- ✅ `occupation`
- ✅ `industry`
- ✅ `preferred_learning_style`
- ✅ `profile_completeness`

---

## Step 4: Deploy to Production (1 minute)

### If Using Vercel Auto-Deploy
```bash
git add .
git commit -m "feat: add profile enhancements (Priority #5)"
git push origin main
```

### If Manual Deploy
```bash
npm run build
# Deploy via Vercel CLI or dashboard
```

---

## Step 5: Test Features (5 minutes)

### Test Checklist

1. **Profile Page** (`/profile`)
   - [ ] Page loads without errors
   - [ ] Can edit name, bio
   - [ ] Can select financial goals
   - [ ] Can select interests
   - [ ] Profile completeness updates
   - [ ] Avatar upload works (test with small image)

2. **Progress Page** (`/progress`)
   - [ ] Overview tab shows stats
   - [ ] Achievements tab displays 17 badges
   - [ ] Streak tab shows current streak
   - [ ] All tabs switch correctly

3. **Bookmarks Page** (`/bookmarks`)
   - [ ] Page loads
   - [ ] Shows empty state (initially)
   - [ ] Courses/Lessons tabs work

4. **Dashboard Updates**
   - [ ] Quick Access section appears
   - [ ] Links to Profile, Bookmarks, Progress work

---

## ✅ Completion Checklist

- [ ] Database migration executed successfully
- [ ] Storage bucket `profile-images` created
- [ ] 4 storage policies added
- [ ] All 7 new tables verified in database
- [ ] 17 achievements seeded
- [ ] Application deployed to production
- [ ] All 3 new pages tested and working
- [ ] Build completed with 0 errors

---

## 🐛 Troubleshooting

### Migration Errors
- If you see "already exists" errors, that's OK! It means tables are already there
- If you see permission errors, make sure you're using service role or owner account

### Storage Upload Fails
- Check bucket is set to PUBLIC
- Verify all 4 policies are active
- Check file is under 5MB and is an image

### Pages Don't Load
- Check browser console for errors
- Verify Supabase environment variables are set
- Clear browser cache and retry

---

## 📞 Support

If you encounter issues:
1. Check Supabase logs (Logs section in dashboard)
2. Review browser console errors
3. Verify all migration steps completed
4. Check RLS policies are enabled

---

## 🎉 You're Done!

Once all checkboxes are complete, Priority #5 is fully deployed! 

Users can now:
- ✨ Upload profile pictures
- 🎯 Set financial goals and interests
- 🏆 Earn achievements
- 🔖 Bookmark courses and lessons
- 🔥 Track learning streaks
- 📊 View detailed progress

**Estimated total time: 15-20 minutes**
