'use client'

import { useEffect } from 'react'
import { logCourseViewed } from '@/lib/crm-events-client'

interface CourseViewTrackerProps {
  courseSlug: string
  courseName: string
  curriculumSlug: string
}

export default function CourseViewTracker({ courseSlug, courseName, curriculumSlug }: CourseViewTrackerProps) {
  useEffect(() => {
    const logCourseView = async () => {
      try {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user) {
          await logCourseViewed(
            user.id,
            user.email!,
            courseSlug,
            {
              courseName,
              curriculumSlug,
              route: `/learn/${curriculumSlug}/${courseSlug}`,
              timestamp: new Date().toISOString()
            }
          )
        }
      } catch (error) {
        console.error('Failed to log course view:', error)
        // Don't throw - course viewing is more important than CRM logging
      }
    }

    logCourseView()
  }, [courseSlug, courseName, curriculumSlug])

  // This component doesn't render anything
  return null
}
