import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkLessons() {
  console.log('🔍 Checking all lessons in database...\n')

  // Get all curricula
  const { data: curricula } = await supabase.from('curricula').select('id, slug, title')

  if (!curricula) {
    console.log('❌ No curricula found')
    return
  }

  for (const curriculum of curricula) {
    console.log(`\n📚 Curriculum: ${curriculum.title} (${curriculum.slug})`)

    // Get all courses in this curriculum
    const { data: courses } = await supabase
      .from('courses')
      .select('id, slug, title')
      .eq('curriculum_id', curriculum.id)

    if (!courses || courses.length === 0) {
      console.log('  ❌ No courses found')
      continue
    }

    for (const course of courses) {
      console.log(`  📖 Course: ${course.title} (${course.slug})`)

      // Get all lessons in this course
      const { data: lessons, error } = await supabase
        .from('lessons')
        .select('id, slug, title, content')
        .eq('course_id', course.id)
        .order('display_order', { ascending: true })

      if (error) {
        console.log(`    ❌ Error fetching lessons: ${error.message}`)
        continue
      }

      if (!lessons || lessons.length === 0) {
        console.log('    ⚠️  No lessons found')
        continue
      }

      for (const lesson of lessons) {
        // Check if lesson has content
        const hasContent =
          lesson.content &&
          typeof lesson.content === 'object' &&
          (('introduction' in lesson.content && lesson.content.introduction) ||
            ('sections' in lesson.content &&
              Array.isArray(lesson.content.sections) &&
              lesson.content.sections.length > 0) ||
            ('markdown' in lesson.content &&
              lesson.content.markdown &&
              typeof lesson.content.markdown === 'string' &&
              lesson.content.markdown.length > 0))

        const status = hasContent ? '✅' : '❌'
        const url = `/learn/${curriculum.slug}/${course.slug}/${lesson.slug}`
        console.log(`    ${status} ${lesson.title}`)
        if (!hasContent) {
          console.log(`       URL: ${url}`)
          console.log(`       Content structure: ${JSON.stringify(lesson.content).substring(0, 100)}...`)
        }
      }
    }
  }
}

checkLessons().catch(console.error)
