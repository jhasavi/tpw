/**
 * Update Sample Lesson with Full Content
 */

import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import { sampleLesson } from '../src/data/sample-lesson'

config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function updateSampleLesson() {
  console.log('📝 Updating "Understanding Money & Banking" with full content...\n')

  // Get curriculum
  const { data: curriculum } = await supabase
    .from('curricula')
    .select('id')
    .eq('slug', 'womens-financial-literacy')
    .single()

  if (!curriculum) {
    console.error('❌ Curriculum not found')
    return
  }

  // Get course
  const { data: course } = await supabase
    .from('courses')
    .select('id')
    .eq('curriculum_id', curriculum.id)
    .eq('slug', 'financial-literacy-basics')
    .single()

  if (!course) {
    console.error('❌ Course not found')
    return
  }

  // Update lesson
  const { data: lesson, error } = await supabase
    .from('lessons')
    .update({
      content: sampleLesson,
      objectives: sampleLesson.objectives,
      description: 'Learn what money is, how banking works, and the different types of accounts available to you.',
    })
    .eq('course_id', course.id)
    .eq('slug', 'understanding-money-banking')
    .select()
    .single()

  if (error) {
    console.error('❌ Error:', error.message)
    return
  }

  console.log('✅ Successfully updated lesson with full content!')
  console.log(`   - ${sampleLesson.objectives.length} learning objectives`)
  console.log(`   - ${sampleLesson.content.sections.length} content sections`)
  console.log(`   - ${sampleLesson.content.keyTakeaways.length} key takeaways`)
  console.log(`   - ${sampleLesson.content.actionItems?.length || 0} action items`)
  console.log(`   - ${sampleLesson.content.resources?.length || 0} resources\n`)
}

updateSampleLesson()
