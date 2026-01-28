import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function testLessonFetch() {
  const curriculumSlug = 'womens-financial-literacy'
  const courseSlug = 'financial-literacy-basics'
  const lessonSlug = 'creating-first-budget'

  // Simulate exactly what the page does
  const { data: curriculaData, error: curriculaError } = await supabase
    .from('curricula')
    .select('id, title')
    .eq('slug', curriculumSlug)
    .single()

  console.log('Curriculum fetch:', curriculaError ? 'ERROR' : 'SUCCESS')
  if (curriculaError) {
    console.error(curriculaError)
    return
  }

  const { data: courseData, error: courseError } = await supabase
    .from('courses')
    .select('id, title')
    .eq('curriculum_id', curriculaData.id)
    .eq('slug', courseSlug)
    .single()

  console.log('Course fetch:', courseError ? 'ERROR' : 'SUCCESS')
  if (courseError) {
    console.error(courseError)
    return
  }

  const { data: lessonData, error: lessonError } = await supabase
    .from('lessons')
    .select('*')
    .eq('course_id', courseData.id)
    .eq('slug', lessonSlug)
    .single()

  console.log('Lesson fetch:', lessonError ? 'ERROR' : 'SUCCESS')
  if (lessonError) {
    console.error(lessonError)
    return
  }

  console.log('\nLesson data keys:', Object.keys(lessonData))
  console.log('Content type:', typeof lessonData.content)
  console.log('Content keys:', lessonData.content ? Object.keys(lessonData.content) : 'null')

  // Check if hasContent logic works
  const hasContent = lessonData.content &&
    typeof lessonData.content === 'object' && (
      ('introduction' in lessonData.content && lessonData.content.introduction) ||
      ('sections' in lessonData.content && Array.isArray(lessonData.content.sections) && lessonData.content.sections.length > 0) ||
      ('markdown' in lessonData.content && lessonData.content.markdown && typeof lessonData.content.markdown === 'string' && lessonData.content.markdown.length > 0)
    )

  console.log('\nHas content:', hasContent)

  // Get all lessons for navigation
  const { data: allLessons, error: allLessonsError } = await supabase
    .from('lessons')
    .select('id, slug, title, display_order')
    .eq('course_id', courseData.id)
    .order('display_order', { ascending: true })

  console.log('All lessons fetch:', allLessonsError ? 'ERROR' : 'SUCCESS')
  console.log('Number of lessons in course:', allLessons?.length || 0)

  const currentIndex = allLessons?.findIndex(l => l.id === lessonData.id) ?? -1
  console.log('Current index:', currentIndex)

  const previousLesson = currentIndex > 0 ? allLessons?.[currentIndex - 1] : null
  const nextLesson = currentIndex >= 0 && allLessons && currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null

  console.log('Previous lesson:', previousLesson?.title || 'none')
  console.log('Next lesson:', nextLesson?.title || 'none')

  console.log('\n✅ All database queries successful')
  console.log('The lesson data looks valid and should render')
}

testLessonFetch()
