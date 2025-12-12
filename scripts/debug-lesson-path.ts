import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function checkLessonPath() {
  // Check for the lesson in financial-literacy-basics course
  const { data: curriculum } = await supabase
    .from('curricula')
    .select('id')
    .eq('slug', 'womens-financial-literacy')
    .single()

  if (!curriculum) {
    console.log('❌ Curriculum not found')
    return
  }

  const { data: course } = await supabase
    .from('courses')
    .select('id')
    .eq('curriculum_id', curriculum.id)
    .eq('slug', 'financial-literacy-basics')
    .single()

  if (!course) {
    console.log('❌ Course not found')
    return
  }

  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('course_id', course.id)
    .eq('slug', 'creating-first-budget')
    .single()

  if (!lesson) {
    console.log('❌ Lesson not found in the course')
    console.log('Looking for all lessons in financial-literacy-basics:')

    const { data: allLessons } = await supabase
      .from('lessons')
      .select('id, slug, title')
      .eq('course_id', course.id)
      .order('display_order')

    console.log(allLessons)
    return
  }

  console.log('✅ Lesson found:')
  console.log('Title:', lesson.title)
  console.log('Slug:', lesson.slug)
  console.log('Has content:', !!lesson.content)
  console.log('Content keys:', lesson.content ? Object.keys(lesson.content) : 'N/A')
}

checkLessonPath().catch(console.error)
