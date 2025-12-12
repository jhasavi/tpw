import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Test the specific lessons you mentioned
const lessonPaths = [
  { curriculum: 'womens-financial-literacy', course: 'financial-literacy-basics', lesson: 'creating-first-budget' },
  { curriculum: 'womens-financial-literacy', course: 'financial-literacy-basics', lesson: 'smart-shopping-saving' },
  { curriculum: 'womens-financial-literacy', course: 'financial-literacy-basics', lesson: 'understanding-credit-score' },
  { curriculum: 'womens-financial-literacy', course: 'financial-literacy-basics', lesson: 'insurance-basics' },
  { curriculum: 'womens-financial-literacy', course: 'budgeting-basics', lesson: 'tracking-spending' },
  { curriculum: 'womens-financial-literacy', course: 'budgeting-basics', lesson: 'cutting-expenses-smart' },
  { curriculum: 'womens-financial-literacy', course: 'budgeting-basics', lesson: 'emergency-fund-essentials' }
]

async function testLessons() {
  for (const path of lessonPaths) {
    const { data: curriculum } = await supabase
      .from('curricula')
      .select('id')
      .eq('slug', path.curriculum)
      .single()

    if (!curriculum) continue

    const { data: course } = await supabase
      .from('courses')
      .select('id')
      .eq('slug', path.course)
      .eq('curriculum_id', curriculum.id)
      .single()

    if (!course) continue

    const { data: lesson } = await supabase
      .from('lessons')
      .select('content')
      .eq('slug', path.lesson)
      .eq('course_id', course.id)
      .single()

    if (!lesson) {
      console.log(`❌ NOT FOUND: /learn/${path.curriculum}/${path.course}/${path.lesson}`)
      continue
    }

    // Check hasContent logic
    const hasContent = lesson.content &&
      typeof lesson.content === 'object' && (
        ('introduction' in lesson.content && lesson.content.introduction) ||
        ('sections' in lesson.content && Array.isArray(lesson.content.sections) && lesson.content.sections.length > 0) ||
        ('markdown' in lesson.content && lesson.content.markdown && typeof lesson.content.markdown === 'string' && lesson.content.markdown.length > 0)
      )

    if (hasContent) {
      console.log(`✅ OK: /learn/${path.curriculum}/${path.course}/${path.lesson}`)
    } else {
      console.log(`❌ BROKEN: /learn/${path.curriculum}/${path.course}/${path.lesson}`)
      console.log(`   Content keys: ${Object.keys(lesson.content || {}).join(', ')}`)
    }
  }
}

testLessons().catch(console.error)
