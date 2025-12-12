import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function checkTables() {
  console.log('🔍 Checking if required tables exist...\n')

  const tables = ['lessons', 'lesson_progress', 'lesson_bookmarks', 'courses', 'curricula']

  for (const table of tables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1)

      if (error) {
        if (error.code === 'PGRST003') {
          console.log(`❌ ${table} - TABLE DOES NOT EXIST`)
        } else {
          console.log(`⚠️  ${table} - Error: ${error.message}`)
        }
      } else {
        console.log(`✅ ${table} - Exists (${data?.length || 0} records sampled)`)
      }
    } catch (err) {
      console.log(`❌ ${table} - Exception: ${err}`)
    }
  }
}

checkTables().catch(console.error)
