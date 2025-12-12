import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function fixMalformedLessonContent() {
  console.log('🔧 Checking and fixing malformed lesson content...\n')

  // Get all lessons
  const { data: lessons } = await supabase
    .from('lessons')
    .select('id, slug, content')

  if (!lessons) {
    console.log('❌ Failed to fetch lessons')
    return
  }

  let fixed = 0
  const issues: { slug: string; issue: string }[] = []

  for (const lesson of lessons) {
    let needsFix = false
    let newContent = lesson.content

    // Check if content is null or not an object
    if (!lesson.content || typeof lesson.content !== 'object') {
      issues.push({ slug: lesson.slug, issue: 'Null or non-object content' })
      needsFix = true
      // Try to provide default structure
      newContent = {
        introduction: `Content for lesson: ${lesson.slug}`,
        sections: [],
        objectives: [],
        keyTakeaways: [],
        actionItems: [],
        resources: []
      }
    } else {
      const content = lesson.content as any

      // Ensure content has at least one valid section
      const hasIntro = content.introduction && typeof content.introduction === 'string'
      const hasSections = content.sections && Array.isArray(content.sections) && content.sections.length > 0
      const hasMarkdown = content.markdown && typeof content.markdown === 'string' && content.markdown.length > 0

      if (!hasIntro && !hasSections && !hasMarkdown) {
        issues.push({ slug: lesson.slug, issue: 'No valid content sections' })
        needsFix = true
        
        // Create default structure
        newContent = {
          ...content,
          introduction: `${lesson.slug}: Content being prepared`,
          sections: content.sections || [],
          objectives: content.objectives || [],
          keyTakeaways: content.keyTakeaways || [],
          actionItems: content.actionItems || [],
          resources: content.resources || []
        }
      }

      // Ensure objectives array exists and has items (if missing, add defaults)
      if (!Array.isArray((newContent as any).objectives) || (newContent as any).objectives.length === 0) {
        (newContent as any).objectives = [
          'Understand the key concepts of this lesson',
          'Apply what you learn to your financial life',
          'Gain confidence in managing your finances'
        ]
      }
    }

    // Update if needed
    if (needsFix) {
      const { error } = await supabase
        .from('lessons')
        .update({ content: newContent })
        .eq('id', lesson.id)

      if (error) {
        console.log(`❌ Failed to fix ${lesson.slug}: ${error.message}`)
      } else {
        console.log(`✅ Fixed ${lesson.slug}`)
        fixed++
      }
    }
  }

  console.log(`\n📊 Summary:`)
  console.log(`- Fixed: ${fixed} lessons`)
  console.log(`- Issues found: ${issues.length}`)

  if (issues.length > 0) {
    console.log(`\nIssues:`)
    issues.forEach(i => {
      console.log(`  - ${i.slug}: ${i.issue}`)
    })
  }
}

fixMalformedLessonContent().catch(console.error)
