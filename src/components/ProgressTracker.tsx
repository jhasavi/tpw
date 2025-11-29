'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface ProgressTrackerProps {
  lessonId: string
  courseId: string
}

export default function ProgressTracker({ lessonId, courseId }: ProgressTrackerProps) {
  const [status, setStatus] = useState<'not_started' | 'in_progress' | 'completed'>('not_started')
  const [startTime, setStartTime] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    loadProgress()
    markAsStarted()
    
    // Track time spent
    const start = Date.now()
    setStartTime(start)

    // Update time spent every 30 seconds
    const interval = setInterval(() => {
      updateTimeSpent(start)
    }, 30000)

    return () => {
      clearInterval(interval)
      updateTimeSpent(start)
    }
  }, [lessonId])

  const loadProgress = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      setLoading(false)
      return
    }

    const { data } = await supabase
      .from('lesson_progress')
      .select('status')
      .eq('user_id', user.id)
      .eq('lesson_id', lessonId)
      .single()

    if (data) {
      setStatus(data.status)
    }
    
    setLoading(false)
  }

  const markAsStarted = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return

    // Check if progress exists
    const { data: existing } = await supabase
      .from('lesson_progress')
      .select('id, status')
      .eq('user_id', user.id)
      .eq('lesson_id', lessonId)
      .single()

    if (!existing) {
      // Create new progress record
      await supabase
        .from('lesson_progress')
        .insert({
          user_id: user.id,
          lesson_id: lessonId,
          status: 'in_progress',
          started_at: new Date().toISOString()
        })
      
      setStatus('in_progress')
    } else if (existing.status === 'not_started') {
      // Update to in_progress
      await supabase
        .from('lesson_progress')
        .update({
          status: 'in_progress',
          started_at: new Date().toISOString()
        })
        .eq('id', existing.id)
      
      setStatus('in_progress')
    }
  }

  const updateTimeSpent = async (startTimestamp: number) => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return

    const timeSpentMinutes = Math.floor((Date.now() - startTimestamp) / 60000)
    
    if (timeSpentMinutes > 0) {
      await supabase
        .from('lesson_progress')
        .update({
          time_spent_minutes: timeSpentMinutes
        })
        .eq('user_id', user.id)
        .eq('lesson_id', lessonId)
    }
  }

  const markAsCompleted = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      alert('Please sign in to track your progress')
      return
    }

    // First ensure the user profile exists
    const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .single()

    if (!profile) {
      // Create profile if it doesn't exist
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          email: user.email,
          created_at: new Date().toISOString()
        })
      
      if (profileError) {
        console.error('Error creating profile:', profileError)
        alert('Please complete your profile setup first. Go to Profile page.')
        return
      }
    }

    // Now mark the lesson as complete
    const { error } = await supabase
      .from('lesson_progress')
      .upsert({
        user_id: user.id,
        lesson_id: lessonId,
        status: 'completed',
        completed_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,lesson_id'
      })

    if (error) {
      console.error('Error marking lesson complete:', error)
      alert('Error saving progress. Please try again.')
      return
    }

    setStatus('completed')
    
    // Show success message
    alert('🎉 Lesson completed! Great job!')
    
    // Refresh to show updated progress
    router.refresh()
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
