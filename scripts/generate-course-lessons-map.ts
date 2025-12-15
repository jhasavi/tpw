import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import { writeFileSync } from 'fs'
import { resolve } from 'path'

config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

type Course = {
  id: string
  slug: string
  title: string
  description: string | null
  display_order: number | null
}

type Lesson = {
  id: string
  course_id: string | null
  slug: string
  title: string
  display_order: number | null
  duration_minutes: number | null
}

function header(text: string, level = 2) {
  return `${'#'.repeat(level)} ${text}`
}

function formatCourseBlock(course: Course, lessons: Lesson[]): string {
  const courseHeader = `${header(`${course.title} (${course.slug})`, 2)}`
  if (!lessons.length) return `${courseHeader}\n\n- No lessons found.`
  const items = lessons
    .map((l, idx) => {
      const num = l.display_order ?? idx + 1
      const dur = l.duration_minutes ? ` — ${l.duration_minutes} min` : ''
      return `- ${num}. ${l.title} (${l.slug})${dur}`
    })
    .join('\n')
  return `${courseHeader}\n\n${items}`
}

async function run() {
  console.log('🗺  Generating course lessons map...')
  const { data: courses, error: cErr } = await supabase
    .from('courses')
    .select('id, slug, title, description, display_order')
    .order('display_order', { ascending: true, nullsFirst: false })
    .order('title', { ascending: true })

  if (cErr) throw cErr

  const { data: lessons, error: lErr } = await supabase
    .from('lessons')
    .select('id, course_id, slug, title, display_order, duration_minutes')
    .order('display_order', { ascending: true, nullsFirst: false })
    .order('title', { ascending: true })

  if (lErr) throw lErr

  const lessonsByCourse = new Map<string, Lesson[]>()
  for (const l of lessons || []) {
    const key = l.course_id || 'unassigned'
    if (!lessonsByCourse.has(key)) lessonsByCourse.set(key, [])
    lessonsByCourse.get(key)!.push(l)
  }

  const parts: string[] = []
  parts.push('# Course Lessons Map')
  parts.push('')
  parts.push(`Generated: ${new Date().toISOString()}`)
  parts.push('')

  // Handle courses with proper ordering
  for (const course of courses || []) {
    const list = lessonsByCourse.get(course.id) || []
    // Stable sort: by display_order then title
    list.sort((a, b) => {
      const ao = a.display_order ?? 999999
      const bo = b.display_order ?? 999999
      if (ao !== bo) return ao - bo
      return a.title.localeCompare(b.title)
    })
    parts.push(formatCourseBlock(course, list))
    parts.push('')
  }

  // Unassigned lessons (if any)
  const unassigned = lessonsByCourse.get('unassigned') || []
  if (unassigned.length) {
    unassigned.sort((a, b) => (a.title.localeCompare(b.title)))
    parts.push(header('Unassigned Lessons', 2))
    parts.push('')
    for (const l of unassigned) {
      const dur = l.duration_minutes ? ` — ${l.duration_minutes} min` : ''
      parts.push(`- ${l.title} (${l.slug})${dur}`)
    }
    parts.push('')
  }

  // Summary
  const totalLessons = (lessons || []).length
  const totalCourses = (courses || []).length
  parts.push(header('Summary', 2))
  parts.push('')
  parts.push(`- Total courses: ${totalCourses}`)
  parts.push(`- Total lessons: ${totalLessons}`)
  parts.push('')

  const outPath = resolve(process.cwd(), 'COURSE_LESSONS_MAP.md')
  writeFileSync(outPath, parts.join('\n'), 'utf8')
  console.log(`✅ Wrote ${outPath}`)
}

run().catch(err => {
  console.error('Fatal:', err)
  process.exit(1)
})
