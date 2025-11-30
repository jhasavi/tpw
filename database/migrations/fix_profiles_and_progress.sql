-- Fix RLS policies and ensure profiles exist for all users
-- This fixes the "Mark Complete" error and profile creation issues

-- Step 1: Add RLS policy to allow users to insert their own profile
-- This is a fallback in case the trigger doesn't work
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
CREATE POLICY "Users can insert their own profile"
  ON profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Step 2: Create profiles for any existing users that don't have one
-- This fixes users who signed up before the trigger was created
INSERT INTO profiles (id, email, full_name, created_at, updated_at)
SELECT 
  id,
  email,
  COALESCE(raw_user_meta_data->>'full_name', email) as full_name,
  created_at,
  NOW() as updated_at
FROM auth.users au
WHERE NOT EXISTS (
  SELECT 1 FROM profiles p WHERE p.id = au.id
)
ON CONFLICT (id) DO NOTHING;

-- Step 3: Verify the trigger function works correctly
-- Re-create the trigger function with better error handling
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Insert into profiles table
  INSERT INTO public.profiles (id, email, full_name, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the signup
    RAISE WARNING 'Error creating profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$;

-- Step 4: Ensure the trigger exists and is active
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- Step 5: Check RLS policies on lesson_progress
DROP POLICY IF EXISTS "Users can view their own progress" ON lesson_progress;
CREATE POLICY "Users can view their own progress"
  ON lesson_progress
  FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own progress" ON lesson_progress;
CREATE POLICY "Users can insert their own progress"
  ON lesson_progress
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own progress" ON lesson_progress;
CREATE POLICY "Users can update their own progress"
  ON lesson_progress
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own progress" ON lesson_progress;
CREATE POLICY "Users can delete their own progress"
  ON lesson_progress
  FOR DELETE
  USING (auth.uid() = user_id);

-- Step 6: Verify RLS is enabled
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;

-- Verification queries
SELECT 'Profiles without matching auth users:' as check_type, COUNT(*) as count
FROM profiles p
WHERE NOT EXISTS (SELECT 1 FROM auth.users au WHERE au.id = p.id)
UNION ALL
SELECT 'Auth users without profiles:', COUNT(*)
FROM auth.users au
WHERE NOT EXISTS (SELECT 1 FROM profiles p WHERE p.id = au.id)
UNION ALL
SELECT 'Total auth users:', COUNT(*)
FROM auth.users
UNION ALL
SELECT 'Total profiles:', COUNT(*)
FROM profiles;
