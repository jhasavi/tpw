'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface CourseProgressTrackerProps {
  courseId: string
  courseSlug: string
  courseTitle: string
  curriculumTitle: string
  lessonId?: string
  lessonTitle?: string
  eventType?: 'course_started' | 'lesson_completed' | 'course_completed'
}

export default function CourseProgressTracker({ 
  courseId, 
  courseSlug, 
  courseTitle, 
  curriculumTitle, 
  lessonId, 
  lessonTitle,
  eventType 
}: CourseProgressTrackerProps) {
  const [tracked, setTracked] = useState(false)

  useEffect(() => {
    if (!eventType || tracked) return

    const trackEvent = async () => {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) return

        // Check if event was already tracked (idempotency)
        const idempotencyKey = generateIdempotencyKey(user.id, eventType)
        const wasAlreadyTracked = await checkEventTracked(idempotencyKey)
        
        if (wasAlreadyTracked) {
          setTracked(true)
          return
        }

        // Call server-side API to log CRM event
        const response = await fetch('/api/crm/course-progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            eventType,
            courseId,
            courseSlug,
            courseTitle,
            curriculumTitle,
            lessonId,
            lessonTitle,
            idempotencyKey
          })
        })

        if (response.ok) {
          // Mark as tracked to prevent duplicates
          await markEventTracked(idempotencyKey)
          setTracked(true)
        }
      } catch (error) {
        console.error(`Failed to track ${eventType}:`, error)
        // Don't throw - CRM tracking shouldn't break user experience
      }
    }

    trackEvent()
  }, [eventType, courseId, courseSlug, courseTitle, curriculumTitle, lessonId, lessonTitle, tracked])

  // Generate stable idempotency key for each event type
  const generateIdempotencyKey = (userId: string, type: string): string => {
    switch (type) {
      case 'course_started':
        // Fixed: course_started should be per course, not per lesson
        return `course_started_${userId}_${courseId}`
      case 'lesson_completed':
        return `lesson_completed_${userId}_${lessonId}_${courseId}`
      case 'course_completed':
        return `course_completed_${userId}_${courseId}`
      default:
        return `${type}_${userId}_${courseId}_${lessonId || 'unknown'}`
    }
  }

  // Check if event was already tracked with robust error handling
  const checkEventTracked = async (key: string): Promise<boolean> => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        // Fallback to localStorage for anonymous users
        return localStorage.getItem(`crm_event_${key}`) === 'true'
      }

      // Check in Supabase for persistent tracking
      const { data, error } = await supabase
        .from('crm_events_tracked')
        .select('id')
        .eq('user_id', user.id)
        .eq('event_key', key)
        .maybeSingle()

      if (error) {
        console.error('Error checking tracked event:', error)
        // Fallback to localStorage on database error
        return localStorage.getItem(`crm_event_${key}`) === 'true'
      }

      const isTracked = !!data
      
      // Sync localStorage with database state
      if (isTracked) {
        localStorage.setItem(`crm_event_${key}`, 'true')
      }
      
      return isTracked
    } catch (error) {
      console.error('Exception checking tracked event:', error)
      // Final fallback to localStorage
      return localStorage.getItem(`crm_event_${key}`) === 'true'
    }
  }

  // Mark event as tracked with robust error handling
  const markEventTracked = async (key: string): Promise<void> => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        localStorage.setItem(`crm_event_${key}`, 'true')
        return
      }

      // Store in Supabase for persistence
      const { error } = await supabase
        .from('crm_events_tracked')
        .upsert({
          user_id: user.id,
          event_key: key,
          event_type: eventType,
          tracked_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,event_key'
        })

      if (error) {
        console.error('Error marking event as tracked:', error)
        // Fallback to localStorage on database error
        localStorage.setItem(`crm_event_${key}`, 'true')
        return
      }

      // Also set localStorage for immediate client-side state
      localStorage.setItem(`crm_event_${key}`, 'true')
    } catch (error) {
      console.error('Exception marking event as tracked:', error)
      // Final fallback to localStorage
      localStorage.setItem(`crm_event_${key}`, 'true')
    }
  }

  // This component doesn't render anything
  return null
}
