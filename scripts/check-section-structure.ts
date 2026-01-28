import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function checkSectionStructure() {
  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('id, title, slug, content')
    .eq('slug', 'creating-first-budget')
    .limit(1)

  if (error) {
    console.error('Error fetching lesson:', error)
    return
  }

  if (!lessons || lessons.length === 0) {
    console.log('No lessons found')
    return
  }

  const lesson = lessons[0]
  console.log('\n=== LESSON:', lesson.title, '===\n')
  
  if (lesson.content && lesson.content.sections) {
    const firstSection = lesson.content.sections[0]
    console.log('First section structure:')
    console.log(JSON.stringify(firstSection, null, 2))
    
    if (firstSection.examples) {
      console.log('\n=== EXAMPLES STRUCTURE ===')
      console.log('Type:', typeof firstSection.examples)
      console.log('Is Array:', Array.isArray(firstSection.examples))
      console.log('First example:', JSON.stringify(firstSection.examples[0], null, 2))
    }
  }
}

checkSectionStructure()
