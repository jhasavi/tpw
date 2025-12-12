import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

interface Lesson {
  id: string
  title: string
  slug: string
  content: any
}

function fixFormatting(text: string): string {
  if (!text || typeof text !== 'string') return text

  let fixed = text

  // Fix markdown-style formatting (* or # at start of lines)
  // Pattern: lines starting with * or # that should be headings

  // Fix lines with multiple asterisks at start (*** or **) - should be markdown headings
  fixed = fixed.replace(/^\*{1,3}\s+(.+)$/gm, (match, title) => {
    const asteriskCount = match.match(/^\*/)[0].length
    const headingLevel = Math.min(asteriskCount, 3)
    return '#'.repeat(headingLevel) + ' ' + title
  })

  // Fix lines with # that are duplicated (### # Title should be ### Title)
  fixed = fixed.replace(/^(#{1,6})\s+#+\s+(.+)$/gm, '$1 $2')

  // Ensure proper spacing after headings
  fixed = fixed.replace(/^(#{1,6})\s+(.+)$/gm, '$1 $2')

  // Fix bold/italic markdown that might be broken
  fixed = fixed.replace(/\*\*\s+(.+?)\s+\*\*/g, '**$1**')
  fixed = fixed.replace(/\*\s+(.+?)\s+\*/g, '*$1*')

  // Fix bullet points with inconsistent formatting
  fixed = fixed.replace(/^\s*[-*+]\s+(.+)$/gm, '- $1')

  // Fix numbered lists
  fixed = fixed.replace(/^\s*\d+\.\s+(.+)$/gm, (match) => {
    const content = match.trim()
    return '  ' + content
  })

  return fixed
}

function fixContentFormatting(content: any): any {
  if (!content || typeof content !== 'object') return content

  const fixed = { ...content }

  // Fix introduction
  if (fixed.introduction && typeof fixed.introduction === 'string') {
    fixed.introduction = fixFormatting(fixed.introduction)
  }

  // Fix markdown
  if (fixed.markdown && typeof fixed.markdown === 'string') {
    fixed.markdown = fixFormatting(fixed.markdown)
  }

  // Fix sections
  if (Array.isArray(fixed.sections)) {
    fixed.sections = fixed.sections.map((section: any) => {
      const fixedSection = { ...section }
      if (fixedSection.title && typeof fixedSection.title === 'string') {
        fixedSection.title = fixFormatting(fixedSection.title)
      }
      if (fixedSection.content && typeof fixedSection.content === 'string') {
        fixedSection.content = fixFormatting(fixedSection.content)
      }
      if (Array.isArray(fixedSection.examples)) {
        fixedSection.examples = fixedSection.examples.map((ex: string) => fixFormatting(ex))
      }
      if (Array.isArray(fixedSection.tips)) {
        fixedSection.tips = fixedSection.tips.map((tip: string) => fixFormatting(tip))
      }
      return fixedSection
    })
  }

  // Fix key takeaways
  if (Array.isArray(fixed.keyTakeaways)) {
    fixed.keyTakeaways = fixed.keyTakeaways.map((item: string) => fixFormatting(item))
  }

  // Fix action items
  if (Array.isArray(fixed.actionItems)) {
    fixed.actionItems = fixed.actionItems.map((item: string) => fixFormatting(item))
  }

  return fixed
}

async function main() {
  console.log('🎨 Scanning all lessons for formatting issues...\n')

  try {
    // Get all lessons
    const { data: lessons, error } = await supabase
      .from('lessons')
      .select('id, title, slug, content, courses(slug, curricula(slug))')
      .order('title', { ascending: true })

    if (error) {
      console.error('Error fetching lessons:', error)
      return
    }

    if (!lessons || lessons.length === 0) {
      console.log('No lessons found')
      return
    }

    const fixedLessons: Array<{
      url: string
      title: string
      slug: string
      changed: boolean
    }> = []

    console.log(`📚 Total lessons: ${lessons.length}\n`)
    console.log('🔧 Fixing formatting issues...\n')

    for (const lesson of lessons) {
      const course = (lesson as any).courses
      if (!course) continue

      const curriculum = (course as any).curricula
      if (!curriculum) continue

      const url = `/learn/${curriculum.slug}/${course.slug}/${lesson.slug}`
      const originalContent = JSON.stringify(lesson.content)
      const fixedContent = fixContentFormatting(lesson.content)
      const newContentStr = JSON.stringify(fixedContent)

      const hasChanges = originalContent !== newContentStr

      if (hasChanges) {
        // Update in database
        const { error: updateError } = await supabase
          .from('lessons')
          .update({ content: fixedContent })
          .eq('id', lesson.id)

        if (updateError) {
          console.error(`❌ Error updating ${lesson.title}:`, updateError)
        } else {
          console.log(`✅ Fixed: ${lesson.title}`)
          console.log(`   URL: https://www.thepurplewings.org${url}\n`)
          fixedLessons.push({
            url,
            title: lesson.title,
            slug: lesson.slug,
            changed: true
          })
        }
      }
    }

    // Display results
    console.log(`\n📊 Summary:`)
    console.log(`✅ Lessons with formatting fixes: ${fixedLessons.length}`)
    console.log(`📚 Total lessons scanned: ${lessons.length}\n`)

    if (fixedLessons.length > 0) {
      console.log('Fixed lessons:')
      console.log(JSON.stringify(fixedLessons, null, 2))
    }
  } catch (err) {
    console.error('Fatal error:', err)
  }
}

main()
