import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { logCourseStarted, logLessonCompleted, logCourseCompleted } from '@/lib/crm-events'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { eventType, courseId, courseSlug, courseTitle, curriculumTitle, lessonId, lessonTitle, context } = body

    if (!eventType) {
      return NextResponse.json(
        { error: 'eventType is required' },
        { status: 400 }
      )
    }

    // Validate required fields based on event type
    if (eventType === 'course_started' && (!courseId || !courseSlug || !courseTitle)) {
      return NextResponse.json(
        { error: 'courseId, courseSlug, and courseTitle are required for course_started' },
        { status: 400 }
      )
    }

    if (eventType === 'lesson_completed' && (!lessonId || !lessonTitle || !courseId)) {
      return NextResponse.json(
        { error: 'lessonId, lessonTitle, and courseId are required for lesson_completed' },
        { status: 400 }
      )
    }

    if (eventType === 'course_completed' && (!courseId || !courseSlug || !courseTitle)) {
      return NextResponse.json(
        { error: 'courseId, courseSlug, and courseTitle are required for course_completed' },
        { status: 400 }
      )
    }

    // Log the appropriate CRM event
    switch (eventType) {
      case 'course_started':
        await logCourseStarted(
          user.id,
          user.email!,
          courseSlug,
          {
            courseId,
            courseTitle,
            curriculumTitle,
            firstLessonId: lessonId,
            firstLessonTitle: lessonTitle,
            timestamp: new Date().toISOString(),
            route: `/learn/${curriculumTitle?.toLowerCase().replace(/\s+/g, '-') || 'curriculum'}/${courseSlug}`,
            ...context
          }
        )
        break

      case 'lesson_completed':
        await logLessonCompleted(
          user.id,
          user.email!,
          lessonId,
          {
            lessonTitle,
            courseId,
            courseSlug,
            courseTitle,
            curriculumTitle,
            timestamp: new Date().toISOString(),
            route: `/learn/${curriculumTitle?.toLowerCase().replace(/\s+/g, '-') || 'curriculum'}/${courseSlug}/${lessonId}`,
            ...context
          }
        )
        break

      case 'course_completed':
        await logCourseCompleted(
          user.id,
          user.email!,
          courseSlug,
          {
            courseId,
            courseTitle,
            curriculumTitle,
            timestamp: new Date().toISOString(),
            route: `/learn/${curriculumTitle?.toLowerCase().replace(/\s+/g, '-') || 'curriculum'}/${courseSlug}`,
            ...context
          }
        )
        break

      default:
        return NextResponse.json(
          { error: 'Invalid event type' },
          { status: 400 }
        )
    }

    return NextResponse.json(
      { success: true, message: `${eventType} event logged successfully` },
      { status: 200 }
    )

  } catch (error) {
    console.error('CRM course progress event error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
