'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { celebrateLessonComplete, checkMilestones } from '@/lib/celebrations'

interface ProgressTrackerProps {
  lessonId: string
  courseId: string
}

export default function ProgressTracker({ lessonId, courseId }: ProgressTrackerProps) {
  const [status, setStatus] = useState<'not_started' | 'in_progress' | 'completed'>('not_started')
  const [startTime, setStartTime] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Initialize progress tracking with proper error handling
    const initializeProgress = async () => {
      try {
        await loadProgress()
        await markAsStarted()
      } catch (err) {
        console.error('Error initializing progress:', err)
        setError(null) // Don't show error to user, just log it
      }
    }

    initializeProgress()
    
    // Track time spent
    const start = Date.now()
    setStartTime(start)

    // Update time spent every 30 seconds
    const interval = setInterval(() => {
      updateTimeSpent(start).catch((err) => {
        console.error('Error updating time spent:', err)
      })
    }, 30000)

    return () => {
      clearInterval(interval)
      // Final time update on unmount
      updateTimeSpent(start).catch((err) => {
        console.error('Error on final time update:', err)
      })
    }
  }, [lessonId])

  const loadProgress = async () => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        setLoading(false)
        return
      }

      const { data, error: queryError } = await supabase
        .from('lesson_progress')
        .select('status')
        .eq('user_id', user.id)
        .eq('lesson_id', lessonId)
        .maybeSingle()

      if (queryError && queryError.code !== 'PGRST116') {
        console.error('Error loading progress:', queryError)
      }

      if (data) {
        setStatus(data.status)
      }
      
      setLoading(false)
    } catch (err) {
      console.error('Exception loading progress:', err)
      setLoading(false)
      // Continue without throwing - user can still use lesson
    }
  }

  const markAsStarted = async () => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) return

      // Check if progress exists
      const { data: existing, error: selectError } = await supabase
        .from('lesson_progress')
        .select('id, status')
        .eq('user_id', user.id)
        .eq('lesson_id', lessonId)
        .maybeSingle()

      if (selectError && selectError.code !== 'PGRST116') {
        console.error('Error checking existing progress:', selectError)
        return
      }

      if (!existing) {
        // Create new progress record
        const { error: insertError } = await supabase
          .from('lesson_progress')
          .upsert({
            user_id: user.id,
            lesson_id: lessonId,
            status: 'in_progress',
            started_at: new Date().toISOString()
          }, {
            onConflict: 'user_id,lesson_id'
          })
        
        if (insertError) {
          console.error('Error creating progress record:', insertError)
          return
        }
        
        setStatus('in_progress')
      } else if (existing.status === 'not_started') {
        // Update to in_progress
        const { error: updateError } = await supabase
          .from('lesson_progress')
          .update({
            status: 'in_progress',
            started_at: new Date().toISOString()
          })
          .eq('id', existing.id)
        
        if (updateError) {
          console.error('Error updating progress to in_progress:', updateError)
          return
        }
        
        setStatus('in_progress')
      }
    } catch (err) {
      console.error('Exception marking as started:', err)
      // Continue without throwing
    }
  }

  const updateTimeSpent = async (startTimestamp: number) => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) return

      const timeSpentMinutes = Math.floor((Date.now() - startTimestamp) / 60000)
      
      if (timeSpentMinutes > 0) {
        const { error: updateError } = await supabase
          .from('lesson_progress')
          .update({
            time_spent_minutes: timeSpentMinutes
          })
          .eq('user_id', user.id)
          .eq('lesson_id', lessonId)

        if (updateError) {
          console.error('Error updating time spent:', updateError)
        }
      }
    } catch (err) {
      console.error('Exception updating time spent:', err)
      // Continue without throwing
    }
  }

  const markAsCompleted = async () => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        alert('Please sign in to track your progress')
        return
      }

      setLoading(true)

      // Mark the lesson as complete using upsert
      const { error: updateError } = await supabase
        .from('lesson_progress')
        .upsert({
          user_id: user.id,
          lesson_id: lessonId,
          status: 'completed',
          completed_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,lesson_id'
        })

      if (updateError) {
        console.error('Error marking lesson complete:', updateError)
        setLoading(false)
        alert('Error saving progress. Please try again.')
        return
      }

      setStatus('completed')
      
      // Trigger celebration with error handling
      try {
        await celebrateLessonComplete(user.id, 'this lesson', 1)
        await checkMilestones(user.id)
      } catch (celebrationErr) {
        console.error('Error during celebration:', celebrationErr)
        // Continue anyway - celebration is non-critical
      }
      
      // Show success message
      alert('🎉 Lesson completed! Great job!')
      
      // Refresh to show updated progress
      router.refresh()
    } catch (err) {
      console.error('Exception marking as completed:', err)
      setLoading(false)
      alert('An unexpected error occurred. Please try again.')
    }
  }

  if (loading) return null

  return (
    <div className="sticky bottom-4 z-10">
      <div className="bg-white rounded-xl shadow-lg border-2 border-purple-200 p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${
              status === 'completed' ? 'bg-green-500' :
              status === 'in_progress' ? 'bg-yellow-500' :
              'bg-gray-300'
            }`}></div>
            <div>
              <div className="text-sm font-medium text-gray-900">
                {status === 'completed' ? 'Completed ✓' :
                 status === 'in_progress' ? 'In Progress' :
                 'Not Started'}
              </div>
              <div className="text-xs text-gray-600">
                {status === 'completed' ? 'You\'ve mastered this lesson!' :
                 'Track your learning progress'}
              </div>
            </div>
          </div>
          
          {status !== 'completed' && (
            <button
              onClick={markAsCompleted}
              className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 font-medium shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <span>✓</span> Mark Complete
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
