/**
 * Get complete list of all lessons from database
 * Map them to understand the structure
 */

import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function getLessonMap() {
  console.log('📋 Fetching all lessons from database...\n')

  // Get curriculum
  const { data: curricula, error: curricError } = await supabase
    .from('curricula')
    .select('*')
    .order('display_order')

  if (curricError) {
    console.error('❌ Error fetching curricula:', curricError)
    return
  }

  for (const curriculum of curricula || []) {
    console.log(`\n📚 CURRICULUM: ${curriculum.title} (${curriculum.slug})`)
    console.log(`${'='.repeat(80)}`)

    // Get courses for this curriculum
    const { data: courses, error: courseError } = await supabase
      .from('courses')
      .select('*')
      .eq('curriculum_id', curriculum.id)
      .order('display_order')

    if (courseError) {
      console.error('❌ Error fetching courses:', courseError)
      continue
    }

    let totalLessons = 0

    for (const course of courses || []) {
      // Get lessons for this course
      const { data: lessons, error: lessonError } = await supabase
        .from('lessons')
        .select('id, slug, title, display_order')
        .eq('course_id', course.id)
        .order('display_order')

      if (lessonError) {
        console.error('❌ Error fetching lessons:', lessonError)
        continue
      }

      const lessonCount = lessons?.length || 0
      totalLessons += lessonCount

      console.log(`\n  💼 Course: ${course.title} (${course.slug})`)
      console.log(`     Level: ${course.level} | Lessons: ${lessonCount}`)
      
      if (lessons && lessons.length > 0) {
        lessons.forEach((lesson, idx) => {
          console.log(`     ${idx + 1}. ${lesson.title} (${lesson.slug})`)
        })
      } else {
        console.log(`     ⚠️  No lessons found`)
      }
    }

    console.log(`\n  📊 Total lessons in curriculum: ${totalLessons}`)
  }

  // Summary
  const { count } = await supabase
    .from('lessons')
    .select('*', { count: 'exact', head: true })

  console.log(`\n\n${'='.repeat(80)}`)
  console.log(`🎯 TOTAL LESSONS IN DATABASE: ${count}`)
  console.log(`${'='.repeat(80)}\n`)
}

getLessonMap()
