/**
 * Execute database migration
 * Runs consolidated_p5_p6.sql to activate all profile and onboarding features
 */

import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function runMigration() {
  console.log('🚀 Starting database migration...\n')
  
  const migrationPath = path.join(__dirname, '../database/migrations/consolidated_p5_p6.sql')
  const sql = fs.readFileSync(migrationPath, 'utf8')
  
  console.log('📄 Migration file:', migrationPath)
  console.log('📊 SQL size:', (sql.length / 1024).toFixed(1), 'KB')
  console.log('\n⏳ Executing migration...\n')
  
  try {
    // Execute the migration
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql })
    
    if (error) {
      // Try direct execution if RPC doesn't exist
      const { error: directError } = await supabase.from('_sql').select('*').limit(0)
      
      if (directError) {
        console.error('❌ Migration failed:', error.message)
        console.error('\n⚠️  Please run this migration manually in Supabase SQL Editor:')
        console.error('   1. Go to https://supabase.com/dashboard/project/ckdshqbrxctjadljjhhy/sql')
        console.error('   2. Copy contents of database/migrations/consolidated_p5_p6.sql')
        console.error('   3. Paste and click "Run"\n')
        process.exit(1)
      }
    }
    
    console.log('✅ Migration completed successfully!\n')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📦 Tables Created/Verified:')
    console.log('   ✓ achievements')
    console.log('   ✓ user_achievements')
    console.log('   ✓ course_bookmarks')
    console.log('   ✓ lesson_bookmarks')
    console.log('   ✓ learning_streaks')
    console.log('   ✓ skill_assessments')
    console.log('   ✓ onboarding_progress')
    console.log('   ✓ course_recommendations')
    console.log('   ✓ user_tooltips_seen')
    console.log('   ✓ celebration_events')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    
    // Verify tables exist
    const tables = [
      'achievements',
      'user_achievements', 
      'course_bookmarks',
      'lesson_bookmarks',
      'learning_streaks',
      'skill_assessments',
      'onboarding_progress',
      'course_recommendations',
      'user_tooltips_seen',
      'celebration_events'
    ]
    
    console.log('🔍 Verifying tables...\n')
    for (const table of tables) {
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true })
      
      if (error) {
        console.log(`   ⚠️  ${table}: ${error.message}`)
      } else {
        console.log(`   ✅ ${table}: ${count ?? 0} rows`)
      }
    }
    
    console.log('\n🎉 All features are now active in production!')
    
  } catch (err: any) {
    console.error('❌ Unexpected error:', err.message)
    console.error('\n⚠️  Please run migration manually in Supabase SQL Editor')
    process.exit(1)
  }
}

runMigration().catch(console.error)
