# Mark Complete Button - Verification Guide

## How to Test

1. **Sign in to the platform:**
   - Go to http://localhost:3000/auth/login
   - Sign in with Google or email

2. **Navigate to any lesson:**
   - Go to Dashboard → Select a Course → Select a Lesson
   - Example: http://localhost:3000/learn/womens-financial-literacy/financial-literacy-basics/understanding-money-banking

3. **Scroll to bottom of lesson:**
   - Look for the progress tracker component
   - Should show "Not Started" or "In Progress"

4. **Click "Mark Complete" button:**
   - Green button with checkmark
   - Should show "🎉 Lesson completed!" alert
   - Status should change to "Completed ✓"

## Expected Behavior

✅ Button appears when lesson is not completed
✅ Button is disabled when already completed
✅ Clicking shows success message
✅ Status updates to "Completed ✓"
✅ Progress persists after page refresh

## Common Issues

### Issue 1: "Please sign in to track your progress"
**Solution:** User is not authenticated. Sign in first.

### Issue 2: No error but status doesn't update
**Possible Causes:**
- Database RLS policies blocking upsert
- User ID not matching
- Lesson ID incorrect

**Debug Steps:**
1. Open browser console (F12)
2. Click "Mark Complete"
3. Check for errors in console
4. Look for error: "Error marking lesson complete:"

### Issue 3: Database Permission Error
**Solution:** Check RLS policies in Supabase:

```sql
-- Enable RLS
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;

-- Allow users to insert their own progress
CREATE POLICY "Users can insert own progress"
ON lesson_progress FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own progress
CREATE POLICY "Users can update own progress"
ON lesson_progress FOR UPDATE
USING (auth.uid() = user_id);

-- Allow users to view their own progress
CREATE POLICY "Users can view own progress"
ON lesson_progress FOR SELECT
USING (auth.uid() = user_id);
```

## Database Schema Check

The `lesson_progress` table should have:
- `id` (uuid, primary key)
- `user_id` (uuid, references auth.users)
- `lesson_id` (uuid, references lessons)
- `status` (text: 'not_started', 'in_progress', 'completed')
- `completed_at` (timestamp)
- `created_at` (timestamp)
- `updated_at` (timestamp)

Unique constraint on: `(user_id, lesson_id)`

## Testing Checklist

- [ ] User can sign in
- [ ] Lesson page loads
- [ ] Progress tracker appears at bottom
- [ ] "Mark Complete" button is visible
- [ ] Clicking button shows success message
- [ ] Status updates to "Completed"
- [ ] Green dot indicator shows
- [ ] Button disappears after completion
- [ ] Progress persists after refresh
- [ ] Works across different lessons
- [ ] Works across different courses

## Next Steps if Issues Persist

1. Check browser console for JavaScript errors
2. Check Supabase logs for database errors
3. Verify RLS policies are correct
4. Test with different user accounts
5. Check network tab for failed requests
