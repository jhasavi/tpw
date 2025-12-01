-- Fix all remaining issues
-- Date: November 30, 2025

-- ISSUE 1: Fix missing blog featured images (all 6 blogs should have images)
UPDATE blog_posts SET featured_image_url = '/images/learners-2.jpg' 
WHERE id = 'af86a62b-afa0-4615-8ebc-f75e9a225df6' AND featured_image_url IS NULL;

-- Verify all blogs have images
SELECT 'Blog posts with images:' as check, COUNT(*) as count 
FROM blog_posts 
WHERE featured_image_url IS NOT NULL AND featured_image_url != '';

-- ISSUE 2: Check first 3 blog posts for content
SELECT 'Blog content check:' as check, 
  title, 
  CASE 
    WHEN LENGTH(content::text) > 1000 THEN 'OK'
    ELSE 'SHORT - needs more content'
  END as status
FROM blog_posts 
ORDER BY published_at 
LIMIT 3;

-- ISSUE 3: Add better error handling for newsletter - Check subscribers table
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on newsletter_subscribers
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Drop old policies if they exist
DROP POLICY IF EXISTS "Anyone can subscribe" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Public can insert subscribers" ON public.newsletter_subscribers;

-- Create policy to allow anyone to subscribe
CREATE POLICY "Public can insert subscribers"
  ON public.newsletter_subscribers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create policy to allow checking if already subscribed
CREATE POLICY "Public can check if subscribed"
  ON public.newsletter_subscribers
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Verify table structure
SELECT 'Newsletter subscribers table:' as check, COUNT(*) as total_subscribers 
FROM public.newsletter_subscribers;

-- ISSUE 4: Verify lesson content exists
SELECT 'Lessons with proper content:' as check, 
  COUNT(*) as total,
  COUNT(CASE WHEN content IS NOT NULL AND content::text != '{}' THEN 1 END) as with_content,
  COUNT(CASE WHEN content IS NULL OR content::text = '{}' THEN 1 END) as without_content
FROM lessons;

-- Find lessons without content
SELECT 'Lessons needing content:' as check, title, slug
FROM lessons 
WHERE content IS NULL OR content::text = '{}' OR content::text = ''
LIMIT 5;

-- ISSUE 5: Check specific lesson mentioned by user
SELECT 'Understanding Money & Banking lesson:' as check,
  CASE 
    WHEN content IS NOT NULL AND LENGTH(content::text) > 500 THEN 'HAS CONTENT ✓'
    ELSE 'MISSING CONTENT ✗'
  END as status
FROM lessons 
WHERE slug = 'understanding-money-banking';
