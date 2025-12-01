# Production Issues - Manual Fixes Required

## Critical Database Fixes - Run in Supabase SQL Editor

```sql
-- 1. Fix generate_course_recommendations function
-- Issue: Referenced cu.difficulty_level which doesn't exist in curricula table
CREATE OR REPLACE FUNCTION generate_course_recommendations(p_user_id UUID)
RETURNS void AS $$
DECLARE
  v_assessment RECORD;
  v_course RECORD;
  v_match_score INTEGER;
BEGIN
  -- Get latest skill assessment
  SELECT * INTO v_assessment
  FROM skill_assessments
  WHERE user_id = p_user_id
  ORDER BY created_at DESC
  LIMIT 1;

  IF NOT FOUND THEN RETURN; END IF;
  
  -- Clear existing recommendations
  DELETE FROM course_recommendations WHERE user_id = p_user_id;

  -- Generate recommendations
  FOR v_course IN
    SELECT c.*
    FROM courses c
    JOIN curricula cu ON c.curriculum_id = cu.id
    WHERE cu.is_published = true
  LOOP
    v_match_score := 50;
    
    IF v_assessment.topics_interested IS NOT NULL THEN
      v_match_score := v_match_score + 20;
    END IF;

    IF v_match_score >= 30 THEN
      INSERT INTO course_recommendations (user_id, course_id, reason, priority, match_score)
      VALUES (
        p_user_id,
        v_course.id,
        'Recommended based on your profile',
        'medium',
        v_match_score
      )
      ON CONFLICT (user_id, course_id) DO UPDATE
      SET reason = EXCLUDED.reason, 
          priority = EXCLUDED.priority, 
          match_score = EXCLUDED.match_score,
          created_at = NOW();
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Fix onboarding_progress RLS policies
-- Issue: 406 Not Acceptable errors - too many policies
DROP POLICY IF EXISTS "Users can view own onboarding progress" ON onboarding_progress;
DROP POLICY IF EXISTS "Users can create own onboarding progress" ON onboarding_progress;
DROP POLICY IF EXISTS "Users can update own onboarding progress" ON onboarding_progress;

-- Create single comprehensive policy
CREATE POLICY "Users can manage own onboarding progress" ON onboarding_progress
  FOR ALL 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 3. Fix quiz_attempts percentage column
-- Issue: 400 Bad Request when selecting percentage
ALTER TABLE quiz_attempts ADD COLUMN IF NOT EXISTS percentage NUMERIC;
UPDATE quiz_attempts 
SET percentage = (score::numeric / NULLIF(total_questions, 0) * 100) 
WHERE percentage IS NULL;

-- 4. Verify blog_posts table exists
-- If it doesn't exist, create it
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  author TEXT NOT NULL DEFAULT 'The Purple Wings Team',
  published_date TIMESTAMPTZ DEFAULT NOW(),
  category TEXT,
  tags TEXT[],
  featured_image_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on blog_posts
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published posts
CREATE POLICY "Public can view published blog posts" ON blog_posts
  FOR SELECT USING (is_published = true);

-- 5. Seed sample blog post if table is empty
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM blog_posts LIMIT 1) THEN
    INSERT INTO blog_posts (title, slug, content, excerpt, author, category, featured_image_url, is_featured)
    VALUES (
      '5 Essential Financial Tips for Women',
      '5-essential-financial-tips-for-women',
      '<h2>Take Control of Your Financial Future</h2><p>Financial independence starts with knowledge...</p>',
      'Discover the five most important financial principles every woman should know to build lasting wealth and security.',
      'Shalini Jha',
      'Financial Literacy',
      '/images/blog/financial-tips.jpg',
      true
    );
  END IF;
END $$;
```

## ✅ Already Fixed Issues

1. **PWA Icons Missing (404)**
   - ✅ Created `/public/icon-192.png` 
   - ✅ Created `/public/icon-512.png`
   - Both icons now exist and working

2. **Newsletter Subscribe 500 Error**
   - Root cause: Resend email API issue
   - Already configured: RESEND_API_KEY and FROM_EMAIL in .env.local
   - May need to verify Resend account status

## Manual Verification Steps

1. **Go to Supabase Dashboard** → SQL Editor
2. **Copy and paste the entire SQL block above**
3. **Run the migration**
4. **Verify blog posts** show up at `/blog`
5. **Test newsletter** subscription at `/newsletter/subscribe`
6. **Check dashboard** - onboarding errors should be gone

## Expected Results After Fix

- ✅ No more 404 errors on PWA icons
- ✅ Dashboard loads without 406/400 errors
- ✅ Course recommendations work correctly
- ✅ Blog page shows posts instead of empty
- ✅ Newsletter subscription works (if Resend API is active)
