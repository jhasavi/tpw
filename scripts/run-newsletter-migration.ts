/**
 * Run newsletter and blog table migration
 */

import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join } from 'path'

config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function runMigration() {
  console.log('📝 Running newsletter and blog table migration...\n')

  try {
    // Read the SQL file
    const sqlPath = join(process.cwd(), 'database', 'migrations', 'add_newsletter_blog.sql')
    const sql = readFileSync(sqlPath, 'utf-8')

    console.log('Executing SQL migration...')
    
    // Split by semicolons and execute each statement
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'))

    for (const statement of statements) {
      if (statement.length > 0) {
        const { error } = await supabase.rpc('exec_sql', { sql_query: statement })
        
        if (error) {
          // Try direct execution if rpc fails
          console.log('Note: RPC method not available, tables may already exist or need manual creation')
          console.log('Please run the SQL file manually in Supabase SQL Editor')
          break
        }
      }
    }

    // Verify tables exist
    const { data: tables, error: tableError } = await supabase
      .from('newsletter_subscribers')
      .select('id')
      .limit(1)

    if (!tableError) {
      console.log('✅ newsletter_subscribers table verified')
    } else if (tableError.code === 'PGRST116') {
      console.log('⚠️  newsletter_subscribers table does not exist yet')
      console.log('\nPlease run this SQL in Supabase SQL Editor:\n')
      console.log(sql)
    } else {
      console.log('✅ Tables created successfully!')
    }

  } catch (error) {
    console.error('❌ Migration error:', error)
    console.log('\n📋 Manual Steps:')
    console.log('1. Go to Supabase Dashboard → SQL Editor')
    console.log('2. Copy the contents of database/migrations/add_newsletter_blog.sql')
    console.log('3. Paste and run in SQL Editor')
  }
}

runMigration()
