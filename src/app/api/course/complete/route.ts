/**
 * API: Course Completion
 *
 * Called by ProgressTracker when all lessons in a course are completed.
 * Sends the course completion email with certificate link.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendCourseCompletion } from '@/lib/email'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { courseId, courseSlug, courseTitle, curriculumTitle } = await request.json()

  if (!courseId || !courseSlug || !courseTitle) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Check if all lessons in the course are completed by this user
  const { data: allLessons } = await supabase
    .from('lessons')
    .select('id')
    .eq('course_id', courseId)

  if (!allLessons || allLessons.length === 0) {
    return NextResponse.json({ error: 'Course not found' }, { status: 404 })
  }

  const { data: completed } = await supabase
    .from('lesson_progress')
    .select('lesson_id')
    .eq('user_id', user.id)
    .in('lesson_id', allLessons.map(l => l.id))
    .eq('status', 'completed')

  const completedIds = new Set(completed?.map(c => c.lesson_id) ?? [])
  const allComplete = allLessons.every(l => completedIds.has(l.id))

  if (!allComplete) {
    return NextResponse.json({ complete: false })
  }

  // All lessons done — check we haven't already sent the email
  const { data: alreadySent } = await supabase
    .from('email_drip_log')
    .select('id')
    .eq('user_id', user.id)
    .eq('drip_day', -1) // -1 = course completion marker
    .filter('email', 'ilike', `%course:${courseSlug}%`)
    .maybeSingle()

  if (!alreadySent) {
    const name = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Learner'

    await sendCourseCompletion(
      { email: user.email!, name },
      { title: courseTitle, curriculum: curriculumTitle ?? "Women's Financial Literacy", slug: courseSlug }
    )

    // Log so we don't send again (best-effort — ignore failures)
    try {
      await supabase.from('email_drip_log').insert({
        user_id: user.id,
        email: `course:${courseSlug}:${user.email}`,
        drip_day: -1,
      })
    } catch { /* non-critical */ }
  }

  return NextResponse.json({
    complete: true,
    certificateUrl: `/certificate/${courseSlug}`,
  })
}
