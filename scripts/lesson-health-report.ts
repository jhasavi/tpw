import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

interface LessonIssue {
  url: string
  issue: string
  severity: 'critical' | 'warning'
}

async function generateLessonHealthReport() {
  console.log('📋 GENERATING COMPREHENSIVE LESSON HEALTH REPORT\n')

  const issues: LessonIssue[] = []

  // Get all curricula
  const { data: curricula } = await supabase.from('curricula').select('id, slug, title')

  if (!curricula) {
    console.log('❌ Failed to fetch curricula')
    return
  }

  for (const curriculum of curricula) {
    // Get all courses in this curriculum
    const { data: courses } = await supabase
      .from('courses')
      .select('id, slug, title, curriculum_id')
      .eq('curriculum_id', curriculum.id)

    if (!courses || courses.length === 0) continue

    for (const course of courses) {
      // Get all lessons in this course
      const { data: lessons } = await supabase
        .from('lessons')
        .select('id, slug, title, description, course_id, content, created_at, updated_at')
        .eq('course_id', course.id)
        .order('display_order', { ascending: true })

      if (!lessons || lessons.length === 0) continue

      for (const lesson of lessons) {
        const url = `/learn/${curriculum.slug}/${course.slug}/${lesson.slug}`

        // Check 1: Missing or null content
        if (!lesson.content) {
          issues.push({
            url,
            issue: 'Null/undefined content field',
            severity: 'critical'
          })
          continue
        }

        // Check 2: Content is not an object
        if (typeof lesson.content !== 'object') {
          issues.push({
            url,
            issue: `Content is ${typeof lesson.content}, expected object`,
            severity: 'critical'
          })
          continue
        }

        // Check 3: No valid content sections
        const hasIntro = (lesson.content as any).introduction && typeof (lesson.content as any).introduction === 'string'
        const hasSections = (lesson.content as any).sections && Array.isArray((lesson.content as any).sections) && (lesson.content as any).sections.length > 0
        const hasMarkdown = (lesson.content as any).markdown && typeof (lesson.content as any).markdown === 'string'

        if (!hasIntro && !hasSections && !hasMarkdown) {
          issues.push({
            url,
            issue: 'No valid content (missing introduction, sections, or markdown)',
            severity: 'critical'
          })
          continue
        }

        // Check 4: Missing objectives
        if (!Array.isArray((lesson as any).objectives) || (lesson as any).objectives.length === 0) {
          issues.push({
            url,
            issue: 'Missing or empty objectives array',
            severity: 'warning'
          })
        }

        // Check 5: Missing description
        if (!lesson.description || lesson.description.trim().length === 0) {
          issues.push({
            url,
            issue: 'Missing or empty description',
            severity: 'warning'
          })
        }

        // Check 6: Content structure validation
        const contentKeys = Object.keys(lesson.content)
        const validKeys = ['introduction', 'sections', 'keyTakeaways', 'actionItems', 'resources', 'examples', 'markdown', 'objectives']
        const hasValidKeys = contentKeys.some(k => validKeys.includes(k))

        if (!hasValidKeys && contentKeys.length > 0) {
          issues.push({
            url,
            issue: `Unexpected content keys: ${contentKeys.join(', ')}`,
            severity: 'warning'
          })
        }
      }
    }
  }

  // Print report
  if (issues.length === 0) {
    console.log('✅ ALL LESSONS ARE HEALTHY - NO ISSUES FOUND!\n')
    return
  }

  const critical = issues.filter(i => i.severity === 'critical')
  const warnings = issues.filter(i => i.severity === 'warning')

  console.log(`⚠️  FOUND ${issues.length} ISSUES\n`)
  console.log(`🔴 CRITICAL: ${critical.length}`)
  console.log(`🟡 WARNINGS: ${warnings.length}\n`)

  if (critical.length > 0) {
    console.log('🔴 CRITICAL ISSUES (Will cause "Error Loading Lesson"):\n')
    critical.forEach(issue => {
      console.log(`  ${issue.url}`)
      console.log(`  ↳ ${issue.issue}\n`)
    })
  }

  if (warnings.length > 0) {
    console.log('\n🟡 WARNINGS (May affect user experience):\n')
    warnings.forEach(issue => {
      console.log(`  ${issue.url}`)
      console.log(`  ↳ ${issue.issue}\n`)
    })
  }

  // Summary by issue type
  console.log('\n📊 ISSUE SUMMARY BY TYPE:')
  const issueTypes = new Map<string, number>()
  issues.forEach(i => {
    const type = i.issue.split(':')[0]
    issueTypes.set(type, (issueTypes.get(type) || 0) + 1)
  })

  Array.from(issueTypes.entries()).forEach(([type, count]) => {
    console.log(`  - ${type}: ${count}`)
  })
}

generateLessonHealthReport().catch(console.error)
