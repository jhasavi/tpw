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

async function checkIfUnderdeveloped(lesson: Lesson): Promise<boolean> {
  try {
    const content = lesson.content

    if (!content || typeof content !== 'object') {
      return true
    }

    // Check for underdeveloped message patterns
    const contentStr = JSON.stringify(content).toLowerCase()
    const underdevelopedPatterns = [
      'being actively developed',
      'check back for updates',
      'coming soon',
      'under construction',
      'more detailed information',
      'work in progress',
      'to be completed',
      'placeholder'
    ]

    for (const pattern of underdevelopedPatterns) {
      if (contentStr.includes(pattern)) {
        return true
      }
    }

    // Check if content is too short (less than 300 characters total)
    const introduction = content.introduction || ''
    const sections = content.sections || []
    const markdown = content.markdown || ''
    const keyTakeaways = content.keyTakeaways || []

    const totalLength = introduction.length + sections.reduce((sum: number, s: any) => sum + (s.content?.length || 0), 0) + markdown.length + keyTakeaways.join('').length

    if (totalLength < 300) {
      return true
    }

    // Check if sections exist but are empty
    if (Array.isArray(sections) && sections.length === 0 && !introduction && !markdown) {
      return true
    }

    return false
  } catch (err) {
    return false
  }
}

async function main() {
  console.log('🛠️  Scanning all lessons for underdeveloped content...\n')

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

    const underdevelopedLessons: Array<{
      url: string
      title: string
      slug: string
      status: string
    }> = []
    const completeLessons: string[] = []

    console.log(`📚 Total lessons: ${lessons.length}\n`)

    for (const lesson of lessons) {
      const course = (lesson as any).courses
      if (!course) continue

      const curriculum = (course as any).curricula
      if (!curriculum) continue

      const url = `/learn/${curriculum.slug}/${course.slug}/${lesson.slug}`
      const isUnderdeveloped = await checkIfUnderdeveloped(lesson as Lesson)

      if (isUnderdeveloped) {
        underdevelopedLessons.push({
          url,
          title: lesson.title,
          slug: lesson.slug,
          status: '🛠️  UNDERDEVELOPED'
        })
      } else {
        completeLessons.push(url)
      }
    }

    // Display results
    if (underdevelopedLessons.length > 0) {
      console.log(`\n🛠️  UNDERDEVELOPED LESSONS (${underdevelopedLessons.length}):\n`)
      underdevelopedLessons.forEach((lesson, idx) => {
        console.log(`${idx + 1}. ${lesson.status}`)
        console.log(`   Title: ${lesson.title}`)
        console.log(`   URL: https://www.thepurplewings.org${lesson.url}\n`)
      })
    }

    console.log(`\n✅ COMPLETE LESSONS: ${completeLessons.length}`)
    console.log(`🛠️  UNDERDEVELOPED LESSONS: ${underdevelopedLessons.length}`)
    console.log(`📊 Completion: ${Math.round((completeLessons.length / lessons.length) * 100)}%\n`)

    if (underdevelopedLessons.length > 0) {
      console.log('JSON Export for reference:')
      console.log(JSON.stringify(underdevelopedLessons, null, 2))
    }
  } catch (err) {
    console.error('Fatal error:', err)
  }
}

main()
