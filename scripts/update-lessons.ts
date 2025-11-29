/**
 * Update Multiple Lessons with Content
 * Run with: npx tsx scripts/update-lessons.ts
 */

import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import { basicFinancialConcepts } from '../src/data/lessons/basic-financial-concepts'
import { financialGoalSetting } from '../src/data/lessons/financial-goal-setting'
import { buildingGoodFinancialHabits } from '../src/data/lessons/building-good-financial-habits'
import { understandingPaychecks } from '../src/data/lessons/understanding-paychecks'

config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

const lessons = [
  basicFinancialConcepts,
  financialGoalSetting,
  buildingGoodFinancialHabits,
  understandingPaychecks
]

async function updateLessons() {
  console.log(`📝 Updating ${lessons.length} lessons with full content...\n`)

  for (const lesson of lessons) {
    // Get curriculum
    const { data: curriculum } = await supabase
      .from('curricula')
      .select('id')
      .eq('slug', 'womens-financial-literacy')
      .single()

    if (!curriculum) {
      console.error('❌ Curriculum not found')
      continue
    }

    // Get course
    const { data: course } = await supabase
      .from('courses')
      .select('id')
      .eq('curriculum_id', curriculum.id)
      .eq('slug', lesson.courseId)
      .single()

    if (!course) {
      console.error(`❌ Course ${lesson.courseId} not found`)
      continue
    }

    // Update lesson
    const { error } = await supabase
      .from('lessons')
      .update({
        content: lesson.content,
        objectives: lesson.objectives,
        description: lesson.description,
      })
      .eq('course_id', course.id)
      .eq('slug', lesson.slug)

    if (error) {
      console.error(`❌ ${lesson.title}: ${error.message}`)
    } else {
      console.log(`✅ ${lesson.title}`)
      console.log(`   - ${lesson.objectives.length} objectives`)
      console.log(`   - ${lesson.content.sections.length} sections`)
      console.log(`   - ${lesson.content.keyTakeaways.length} takeaways\n`)
    }
  }

  console.log('✅ Lesson update complete!\n')
}

updateLessons()
