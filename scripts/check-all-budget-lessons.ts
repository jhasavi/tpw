import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function checkAllCreateBudgetLessons() {
  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('id, title, slug, course_id, objectives')
    .eq('slug', 'creating-first-budget')
  
  if (error) {
    console.error('Error:', error)
    return
  }
  
  console.log(`Found ${lessons.length} lessons with slug 'creating-first-budget'\n`)
  
  for (const lesson of lessons) {
    console.log('Lesson ID:', lesson.id)
    console.log('Title:', lesson.title)
    console.log('Course ID:', lesson.course_id)
    console.log('Objectives:', lesson.objectives)
    console.log('---')
  }
}

checkAllCreateBudgetLessons()
