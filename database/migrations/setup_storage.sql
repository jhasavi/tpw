-- Supabase Storage Setup for Profile Images
-- Run this in Supabase SQL Editor

-- =============================================
-- STORAGE BUCKET FOR PROFILE IMAGES
-- =============================================

-- Create storage bucket (if not exists via UI)
-- Bucket name: profile-images
-- Public: true
-- File size limit: 5MB
-- Allowed MIME types: image/*

-- Storage policies for profile-images bucket
-- Note: These need to be created in Supabase Dashboard -> Storage -> profile-images -> Policies

-- Policy 1: Allow authenticated users to upload their own avatar
-- Name: "Users can upload their own avatar"
-- Operation: INSERT
-- SQL: bucket_id = 'profile-images' AND auth.uid()::text = (storage.foldername(name))[1]

-- Policy 2: Allow public read access to all avatars
-- Name: "Public avatar access"
-- Operation: SELECT
-- SQL: bucket_id = 'profile-images'

-- Policy 3: Allow users to update their own avatar
-- Name: "Users can update their own avatar"  
-- Operation: UPDATE
-- SQL: bucket_id = 'profile-images' AND auth.uid()::text = (storage.foldername(name))[1]

-- Policy 4: Allow users to delete their own avatar
-- Name: "Users can delete their own avatar"
-- Operation: DELETE  
-- SQL: bucket_id = 'profile-images' AND auth.uid()::text = (storage.foldername(name))[1]

-- =============================================
-- INSTRUCTIONS
-- =============================================
-- 1. Go to Supabase Dashboard -> Storage
-- 2. Create a new bucket called 'profile-images'
-- 3. Set it to 'Public' (so avatars are publicly viewable)
-- 4. Set file size limit to 5MB
-- 5. Add the policies above in the Policies tab

-- Alternatively, you can use the Supabase CLI:
-- supabase storage buckets create profile-images --public

COMMENT ON TABLE public.profiles IS 'Extended user profile information. Avatar URLs stored in storage bucket: profile-images';
