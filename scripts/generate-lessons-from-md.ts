/**
 * Generate Lessons Structure from Markdown Curricula
 * This reads the markdown files and creates lesson entries in the database
 */

import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join } from 'path'

config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

// Course data from markdown files
const coursesData = [
  // Women's Financial Literacy - Beginner
  {
    curriculumSlug: 'womens-financial-literacy',
    courseSlug: 'financial-literacy-basics',
    lessons: [
      { title: 'Understanding Money & Banking', durationMinutes: 35 },
      { title: 'Basic Financial Concepts', durationMinutes: 40 },
      { title: 'Financial Goal Setting', durationMinutes: 45 },
      { title: 'Building Good Financial Habits', durationMinutes: 30 },
      { title: 'Understanding Paychecks', durationMinutes: 30 }
    ]
  },
  {
    curriculumSlug: 'womens-financial-literacy',
    courseSlug: 'budgeting-basics',
    lessons: [
      { title: 'Creating Your First Budget', durationMinutes: 50 },
      { title: 'Tracking Income & Expenses', durationMinutes: 45 },
      { title: 'Budget Categories & Priorities', durationMinutes: 50 },
      { title: 'Budgeting Tools & Apps', durationMinutes: 40 },
      { title: 'Handling Irregular Income', durationMinutes: 55 }
    ]
  },
  {
    curriculumSlug: 'womens-financial-literacy',
    courseSlug: 'emergency-planning',
    lessons: [
      { title: 'Why Emergency Funds Matter', durationMinutes: 30 },
      { title: 'How Much to Save', durationMinutes: 40 },
      { title: 'Where to Keep Your Emergency Fund', durationMinutes: 35 },
      { title: 'Building It Slowly', durationMinutes: 50 },
      { title: 'When to Use It & When Not To', durationMinutes: 45 }
    ]
  },
  {
    curriculumSlug: 'womens-financial-literacy',
    courseSlug: 'credit-management',
    lessons: [
      { title: 'What is Credit?', durationMinutes: 30 },
      { title: 'Credit Reports & Scores', durationMinutes: 45 },
      { title: 'How to Build or Rebuild Credit', durationMinutes: 50 },
      { title: 'Choosing the Right Credit Card', durationMinutes: 40 },
      { title: 'Avoiding Common Credit Traps', durationMinutes: 45 },
      { title: 'Monitoring Your Credit', durationMinutes: 30 }
    ]
  }
]

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

async function generateLessons() {
  console.log('📝 Generating lesson entries from curriculum structure...\n')

  for (const courseData of coursesData) {
    // Get curriculum ID
    const { data: curriculum } = await supabase
      .from('curricula')
      .select('id')
      .eq('slug', courseData.curriculumSlug)
      .single()

    if (!curriculum) {
      console.log(`⚠️  Curriculum ${courseData.curriculumSlug} not found`)
      continue
    }

    // Get course ID
    const { data: course } = await supabase
      .from('courses')
      .select('id, title')
      .eq('curriculum_id', curriculum.id)
      .eq('slug', courseData.courseSlug)
      .single()

    if (!course) {
      console.log(`⚠️  Course ${courseData.courseSlug} not found`)
      continue
    }

    console.log(`📚 ${course.title}`)

    // Insert lessons
    for (let i = 0; i < courseData.lessons.length; i++) {
      const lesson = courseData.lessons[i]
      const slug = slugify(lesson.title)

      const { error } = await supabase
        .from('lessons')
        .upsert({
          course_id: course.id,
          slug,
          title: lesson.title,
          description: '',
          content: {},
          objectives: [],
          key_concepts: [],
          duration_minutes: lesson.durationMinutes,
          display_order: i + 1
        }, {
          onConflict: 'course_id,slug'
        })

      if (error) {
        console.log(`  ❌ ${lesson.title}: ${error.message}`)
      } else {
        console.log(`  ✓ ${lesson.title}`)
      }
    }
    console.log('')
  }

  // Summary
  const { count } = await supabase
    .from('lessons')
    .select('*', { count: 'exact', head: true })

  console.log(`✅ Complete! Total lessons in database: ${count}\n`)
}

generateLessons()
