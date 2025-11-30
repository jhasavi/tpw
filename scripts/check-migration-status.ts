import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL is required')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function runMigration() {
  console.log('🚀 Starting Profile Enhancement Migration...\n')
  
  try {
    // Step 1: Extend profiles table
    console.log('📝 Step 1: Extending profiles table...')
    const { error: profileError } = await supabase.rpc('exec_sql', {
      query: `
        ALTER TABLE public.profiles
        ADD COLUMN IF NOT EXISTS bio TEXT,
        ADD COLUMN IF NOT EXISTS financial_goals TEXT[],
        ADD COLUMN IF NOT EXISTS interests TEXT[],
        ADD COLUMN IF NOT EXISTS experience_level TEXT DEFAULT 'beginner',
        ADD COLUMN IF NOT EXISTS occupation TEXT,
        ADD COLUMN IF NOT EXISTS industry TEXT,
        ADD COLUMN IF NOT EXISTS preferred_learning_style TEXT,
        ADD COLUMN IF NOT EXISTS profile_completeness INTEGER DEFAULT 0;
      `
    })
    
    if (profileError) {
      console.log('⚠️  RPC not available, using direct table access...')
      // Profiles table extension will be done via SQL Editor
    } else {
      console.log('✅ Profiles table extended')
    }

    // Step 2: Create achievements table
    console.log('\n📝 Step 2: Creating achievements table...')
    const { error: achievementsError } = await supabase
      .from('achievements')
      .select('count')
      .limit(1)
    
    if (achievementsError && achievementsError.code === '42P01') {
      console.log('⚠️  Achievements table needs to be created via SQL Editor')
      console.log('   See: database/migrations/enhance_profiles.sql')
    } else if (!achievementsError) {
      console.log('✅ Achievements table exists')
    }

    // Step 3: Check for user_achievements
    console.log('\n📝 Step 3: Checking user_achievements table...')
    const { error: userAchError } = await supabase
      .from('user_achievements')
      .select('count')
      .limit(1)
    
    if (userAchError && userAchError.code === '42P01') {
      console.log('⚠️  User achievements table needs to be created via SQL Editor')
    } else if (!userAchError) {
      console.log('✅ User achievements table exists')
    }

    // Step 4: Check for bookmarks
    console.log('\n📝 Step 4: Checking bookmark tables...')
    const { error: courseBookmarkError } = await supabase
      .from('course_bookmarks')
      .select('count')
      .limit(1)
    
    const { error: lessonBookmarkError } = await supabase
      .from('lesson_bookmarks')
      .select('count')
      .limit(1)
    
    if (courseBookmarkError && courseBookmarkError.code === '42P01') {
      console.log('⚠️  Bookmark tables need to be created via SQL Editor')
    } else if (!courseBookmarkError && !lessonBookmarkError) {
      console.log('✅ Bookmark tables exist')
    }

    // Step 5: Check for streaks
    console.log('\n📝 Step 5: Checking learning_streaks table...')
    const { error: streakError } = await supabase
      .from('learning_streaks')
      .select('count')
      .limit(1)
    
    if (streakError && streakError.code === '42P01') {
      console.log('⚠️  Learning streaks table needs to be created via SQL Editor')
    } else if (!streakError) {
      console.log('✅ Learning streaks table exists')
    }

    // Step 6: Check for playlists
    console.log('\n📝 Step 6: Checking playlist tables...')
    const { error: playlistError } = await supabase
      .from('learning_playlists')
      .select('count')
      .limit(1)
    
    if (playlistError && playlistError.code === '42P01') {
      console.log('⚠️  Playlist tables need to be created via SQL Editor')
    } else if (!playlistError) {
      console.log('✅ Playlist tables exist')
    }

    console.log('\n' + '='.repeat(60))
    console.log('📊 MIGRATION STATUS SUMMARY')
    console.log('='.repeat(60))
    console.log('\n⚠️  MANUAL STEPS REQUIRED:\n')
    console.log('1. Go to Supabase Dashboard → SQL Editor')
    console.log('2. Copy contents of: database/migrations/enhance_profiles.sql')
    console.log('3. Paste and execute in SQL Editor')
    console.log('4. Verify all tables and achievements are created')
    console.log('\n5. Go to Supabase Dashboard → Storage')
    console.log('6. Create bucket: "profile-images" (Public)')
    console.log('7. Set file size limit: 5MB')
    console.log('8. Add storage policies (see deployment guide)')
    console.log('\n' + '='.repeat(60))
    console.log('📖 Full instructions: PROFILE_ENHANCEMENT_DEPLOYMENT.md')
    console.log('='.repeat(60) + '\n')

  } catch (error: any) {
    console.error('❌ Migration error:', error.message)
    process.exit(1)
  }
}

runMigration()
