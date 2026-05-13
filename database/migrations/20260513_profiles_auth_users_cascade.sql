-- Add ON DELETE CASCADE to the profiles.id foreign key to auth.users(id)
-- This allows deleting auth users without foreign-key failures when a profile exists.

ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profiles_id_fkey;

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_id_fkey
  FOREIGN KEY (id)
  REFERENCES auth.users(id)
  ON DELETE CASCADE;
