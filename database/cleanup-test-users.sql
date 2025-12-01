-- Database Cleanup Script
-- Purpose: Remove all test users and clean up orphaned data
-- Date: November 30, 2025

-- Step 1: Show current state
SELECT 'Current Users:' as info;
SELECT email, created_at, email_confirmed_at FROM auth.users WHERE deleted_at IS NULL;

-- Step 2: Delete all user-related data from public schema
DELETE FROM public.user_achievements;
DELETE FROM public.user_activity_log;
DELETE FROM public.user_challenges;
DELETE FROM public.user_financial_profiles;
DELETE FROM public.user_gamification;
DELETE FROM public.user_saved_resources;
DELETE FROM public.user_tooltips_seen;
DELETE FROM public.quiz_attempts;
DELETE FROM public.lesson_progress;
DELETE FROM public.lesson_bookmarks;
DELETE FROM public.course_bookmarks;
DELETE FROM public.onboarding_progress;
DELETE FROM public.profiles;
DELETE FROM public.skill_assessments;
DELETE FROM public.self_assessment_results;
DELETE FROM public.learning_streaks;
DELETE FROM public.playlist_items;
DELETE FROM public.forum_posts;
DELETE FROM public.forum_topics;
DELETE FROM public.support_group_members;
DELETE FROM public.mentorship_program;

-- Step 3: Delete from public.users (if it exists and has data)
DELETE FROM public.users;

-- Step 4: Delete all auth users (CASCADE will handle related tables)
DELETE FROM auth.users;

-- Step 5: Verify cleanup
SELECT 'After Cleanup - Auth Users:' as info;
SELECT COUNT(*) as remaining_auth_users FROM auth.users WHERE deleted_at IS NULL;

SELECT 'After Cleanup - Profiles:' as info;
SELECT COUNT(*) as remaining_profiles FROM public.profiles;

SELECT 'After Cleanup - User Progress:' as info;
SELECT COUNT(*) as remaining_progress FROM public.lesson_progress;

-- Step 6: Check for orphaned tables
SELECT 'Checking for potential duplicate/orphaned tables:' as info;
SELECT tablename 
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename LIKE '%user%'
ORDER BY tablename;
