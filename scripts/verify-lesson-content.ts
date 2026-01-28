/**
 * Detailed content verification for all 135 lessons
 * Shows a sample of content from each lesson to verify uniqueness
 */

import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function verifyLessonContent() {
  console.log('🔍 Verifying lesson content quality...\n')

  const { data: lessons, error } = await supabase
    .from('lessons')
    .select(`
      id,
      slug,
      title,
      content,
      courses!inner (
        id,
        title,
        slug,
        curricula!inner (
          title
        )
      )
    `)
    .order('title')

  if (error) {
    console.error('❌ Error:', error)
    return
  }

  console.log(`📊 Total lessons: ${lessons?.length}\n`)
  
  // Group by curriculum
  const byCurriculum = new Map<string, any[]>()
  
  for (const lesson of lessons || []) {
    const curriculum = lesson.courses.curricula.title
    if (!byCurriculum.has(curriculum)) {
      byCurriculum.set(curriculum, [])
    }
    byCurriculum.get(curriculum)!.push(lesson)
  }
  
  for (const [curriculum, curriculumLessons] of byCurriculum.entries()) {
    console.log(`\n${'='.repeat(80)}`)
    console.log(`📚 ${curriculum}`)
    console.log(`${'='.repeat(80)}\n`)
    
    for (const lesson of curriculumLessons) {
      const hasContent = lesson.content && 
        typeof lesson.content === 'object' &&
        lesson.content.introduction
      
      const introPreview = hasContent 
        ? lesson.content.introduction.substring(0, 150) + '...'
        : 'NO CONTENT'
      
      const sectionCount = hasContent && lesson.content.sections 
        ? lesson.content.sections.length 
        : 0
        
      console.log(`  📖 ${lesson.title}`)
      console.log(`     Course: ${lesson.courses.title}`)
      console.log(`     Sections: ${sectionCount}`)
      console.log(`     Preview: ${introPreview}`)
      console.log()
    }
  }

  // Check for meaningfulness
  console.log(`\n${'='.repeat(80)}`)
  console.log('📊 CONTENT QUALITY SUMMARY')
  console.log(`${'='.repeat(80)}\n`)
  
  const withIntro = lessons?.filter(l => l.content?.introduction).length || 0
  const withSections = lessons?.filter(l => l.content?.sections?.length > 0).length || 0
  const withTakeaways = lessons?.filter(l => l.content?.keyTakeaways?.length > 0).length || 0
  const withActions = lessons?.filter(l => l.content?.actionItems?.length > 0).length || 0
  
  console.log(`✅ Lessons with introduction: ${withIntro}/135`)
  console.log(`✅ Lessons with sections: ${withSections}/135`)
  console.log(`✅ Lessons with key takeaways: ${withTakeaways}/135`)
  console.log(`✅ Lessons with action items: ${withActions}/135`)
  
  // Check for duplicates based on introduction
  const introTexts = new Map<string, string[]>()
  for (const lesson of lessons || []) {
    if (lesson.content?.introduction) {
      const intro = lesson.content.introduction.substring(0, 100)
      if (!introTexts.has(intro)) {
        introTexts.set(intro, [])
      }
      introTexts.get(intro)!.push(lesson.title)
    }
  }
  
  const duplicates = Array.from(introTexts.entries()).filter(([_, titles]) => titles.length > 1)
  
  if (duplicates.length > 0) {
    console.log(`\n⚠️  POTENTIAL DUPLICATES (${duplicates.length}):`)
    for (const [intro, titles] of duplicates) {
      console.log(`\n  Shared intro (first 100 chars):`)
      console.log(`  "${intro}..."`)
      console.log(`  Lessons:`)
      titles.forEach(title => console.log(`    - ${title}`))
    }
  } else {
    console.log(`\n✅ All lessons have unique content!`)
  }
}

verifyLessonContent()
