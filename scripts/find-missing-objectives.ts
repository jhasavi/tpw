import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function findLessonsWithoutObjectives() {
  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('id, title, slug, objectives')
    .is('objectives', null)
  
  if (error) {
    console.error('Error:', error)
    return
  }
  
  console.log(`Found ${lessons.length} lessons without objectives\n`)
  
  if (lessons.length === 0) {
    console.log('✅ All lessons have objectives!')
  } else {
    for (const lesson of lessons) {
      console.log('- ', lesson.title, `(${lesson.slug})`)
    }
  }
}

findLessonsWithoutObjectives()
