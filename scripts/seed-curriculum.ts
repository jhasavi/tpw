/**
 * Seed Script: Populate Database with Curriculum Data
 * Run with: npx tsx scripts/seed-curriculum.ts
 */

import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import { curricula } from '../src/data/curricula'
import { sampleLesson } from '../src/data/sample-lesson'

// Load environment variables
config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function seedCurriculum() {
  console.log('🌱 Starting curriculum data seed...\n')

  try {
    // Get the two curricula we created in the schema
    const { data: curriculaRecords, error: curriculaError } = await supabase
      .from('curricula')
      .select('id, slug')
    
    if (curriculaError) throw curriculaError
    
    console.log(`✓ Found ${curriculaRecords.length} curricula in database\n`)

    // Seed courses for each curriculum
    for (const curriculum of curricula) {
      const dbCurriculum = curriculaRecords.find(c => c.slug === curriculum.slug)
      if (!dbCurriculum) {
        console.log(`⚠️  Curriculum ${curriculum.slug} not found in database, skipping...`)
        continue
      }

      console.log(`📚 Seeding courses for: ${curriculum.title}`)
      
      for (const course of curriculum.courses) {
        // Insert course
        const { data: courseData, error: courseError } = await supabase
          .from('courses')
          .upsert({
            curriculum_id: dbCurriculum.id,
            slug: course.slug,
            title: course.title,
            description: course.description,
            level: course.level,
            estimated_hours: course.estimatedHours,
            display_order: course.displayOrder,
            icon: course.icon,
          }, {
            onConflict: 'curriculum_id,slug'
          })
          .select()
          .single()

        if (courseError) {
          console.error(`  ❌ Error inserting course ${course.slug}:`, courseError.message)
          continue
        }

        console.log(`  ✓ ${course.title} (${course.lessons.length} lessons)`)

        // Insert lessons for this course
        for (const lesson of course.lessons) {
          // Check if this is the sample lesson we have content for
          const isSampleLesson = lesson.slug === 'understanding-money-banking' && 
                                 course.slug === 'financial-literacy-basics'
          
          const lessonContent = isSampleLesson ? sampleLesson : {
            introduction: '',
            sections: [],
            keyTakeaways: [],
            actionItems: [],
            resources: []
          }

          const { error: lessonError } = await supabase
            .from('lessons')
            .upsert({
              course_id: courseData.id,
              slug: lesson.slug,
              title: lesson.title,
              description: lesson.description || '',
              content: lessonContent,
              objectives: isSampleLesson ? sampleLesson.objectives : [],
              key_concepts: [],
              duration_minutes: lesson.durationMinutes,
              display_order: lesson.displayOrder,
            }, {
              onConflict: 'course_id,slug'
            })

          if (lessonError) {
            console.error(`    ❌ Error inserting lesson ${lesson.slug}:`, lessonError.message)
          }
        }
      }
      console.log('')
    }

    console.log('✅ Curriculum data seed completed successfully!\n')
    
    // Show summary
    const { count: coursesCount } = await supabase
      .from('courses')
      .select('*', { count: 'exact', head: true })
    
    const { count: lessonsCount } = await supabase
      .from('lessons')
      .select('*', { count: 'exact', head: true })
    
    console.log(`📊 Summary:`)
    console.log(`   - Courses: ${coursesCount}`)
    console.log(`   - Lessons: ${lessonsCount}`)
    console.log(`   - Content complete: 1 lesson (Understanding Money & Banking)`)
    console.log(`   - Remaining to write: ${(lessonsCount || 0) - 1} lessons\n`)

  } catch (error) {
    console.error('❌ Seed failed:', error)
    process.exit(1)
  }
}

seedCurriculum()
