import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function checkObjectives() {
  const { data: lessons, error} = await supabase
    .from('lessons')
    .select('id, title, slug, objectives')
    .eq('slug', 'creating-first-budget')
    .limit(1)

  if (error || !lessons || lessons.length === 0) {
    console.error('Error:', error)
    return
  }

  const lesson = lessons[0]
  console.log('Lesson:', lesson.title)
  console.log('\nObjectives type:', typeof lesson.objectives)
  console.log('Is array:', Array.isArray(lesson.objectives))
  console.log('Value:', lesson.objectives)
  
  if (lesson.objectives === null) {
    console.log('\n⚠️  OBJECTIVES IS NULL - This will cause issues in the page!')
    console.log('The page tries to map over lesson.objectives which will fail if null')
  }
}

checkObjectives()
