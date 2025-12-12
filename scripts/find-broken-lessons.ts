import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

interface BrokenLesson {
  url: string
  title: string
  contentKeys: string[]
  hasIntro: boolean
  hasSections: boolean
  hasMarkdown: boolean
  reason: string
}

async function findBrokenLessons() {
  console.log('🔍 Scanning for lessons that fail the hasContent check...\n')

  const brokenLessons: BrokenLesson[] = []

  // Get all curricula
  const { data: curricula } = await supabase.from('curricula').select('id, slug, title')

  if (!curricula) {
    console.log('❌ Failed to fetch curricula')
    return
  }

  for (const curriculum of curricula) {
    // Get all courses
    const { data: courses } = await supabase
      .from('courses')
      .select('id, slug, title')
      .eq('curriculum_id', curriculum.id)

    if (!courses) continue

    for (const course of courses) {
      // Get all lessons
      const { data: lessons } = await supabase
        .from('lessons')
        .select('id, slug, title, content')
        .eq('course_id', course.id)
        .order('display_order', { ascending: true })

      if (!lessons) continue

      for (const lesson of lessons) {
        // Replicate the exact check from the lesson page
        const hasContent = lesson.content &&
          typeof lesson.content === 'object' && (
            ('introduction' in lesson.content && lesson.content.introduction) ||
            ('sections' in lesson.content && Array.isArray(lesson.content.sections) && lesson.content.sections.length > 0) ||
            ('markdown' in lesson.content && lesson.content.markdown && typeof lesson.content.markdown === 'string' && lesson.content.markdown.length > 0)
          )

        if (!hasContent) {
          const content = lesson.content as any
          const hasIntro = content?.introduction && typeof content.introduction === 'string'
          const hasSections = content?.sections && Array.isArray(content.sections) && content.sections.length > 0
          const hasMarkdown = content?.markdown && typeof content.markdown === 'string'

          let reason = 'Unknown'
          if (!lesson.content) {
            reason = 'content is null/undefined'
          } else if (typeof lesson.content !== 'object') {
            reason = `content is ${typeof lesson.content}, not object`
          } else if (!hasIntro && !hasSections && !hasMarkdown) {
            reason = 'No valid content sections (missing intro, sections, markdown)'
          }

          brokenLessons.push({
            url: `/learn/${curriculum.slug}/${course.slug}/${lesson.slug}`,
            title: lesson.title,
            contentKeys: lesson.content ? Object.keys(lesson.content) : [],
            hasIntro,
            hasSections,
            hasMarkdown,
            reason
          })
        }
      }
    }
  }

  // Print results
  if (brokenLessons.length === 0) {
    console.log('✅ NO BROKEN LESSONS FOUND!')
    return
  }

  console.log(`🔴 FOUND ${brokenLessons.length} BROKEN LESSONS\n`)

  brokenLessons.forEach((lesson, idx) => {
    console.log(`${idx + 1}. ${lesson.url}`)
    console.log(`   Title: ${lesson.title}`)
    console.log(`   Reason: ${lesson.reason}`)
    console.log(`   Content keys: ${lesson.contentKeys.join(', ') || 'EMPTY'}`)
    console.log(`   Has intro: ${lesson.hasIntro} | Has sections: ${lesson.hasSections} | Has markdown: ${lesson.hasMarkdown}`)
    console.log()
  })

  // Summary
  console.log(`\n📊 SUMMARY:`)
  console.log(`Total broken lessons: ${brokenLessons.length}`)
  const nullContent = brokenLessons.filter(l => l.reason.includes('null')).length
  const typeError = brokenLessons.filter(l => l.reason.includes('not object')).length
  const noSections = brokenLessons.filter(l => l.reason.includes('No valid')).length
  
  console.log(`- Null/undefined content: ${nullContent}`)
  console.log(`- Wrong type: ${typeError}`)
  console.log(`- Missing all valid sections: ${noSections}`)
}

findBrokenLessons().catch(console.error)
