'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Clock, Bookmark, RotateCcw, CheckCircle } from 'lucide-react'

interface ProgressData {
  courseId?: string
  lessonId?: string
  lessonPosition?: number
  scrollPosition?: number
  timeSpent?: number
  lastActive: string
  quizProgress?: any[]
}

interface ProgressPersistenceProps {
  courseId?: string
  lessonId?: string
  onProgressRestored?: (progress: ProgressData) => void
}

export default function ProgressPersistence({ 
  courseId, 
  lessonId, 
  onProgressRestored 
}: ProgressPersistenceProps) {
  const [progress, setProgress] = useState<ProgressData | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  // Save progress every 30 seconds or when component unmounts
  const saveProgress = async (data: Partial<ProgressData>) => {
    if (!courseId || !lessonId) return

    setIsSaving(true)
    
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        const progressData: ProgressData = {
          courseId,
          lessonId,
          lessonPosition: data.lessonPosition ?? 0,
          scrollPosition: data.scrollPosition ?? 0,
          timeSpent: data.timeSpent ?? 0,
          lastActive: new Date().toISOString(),
          quizProgress: data.quizProgress ?? []
        }

        // Save to database
        await supabase
          .from('user_progress')
          .upsert({
            user_id: user.id,
            course_id: courseId,
            lesson_id: lessonId,
            progress_data: progressData,
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'user_id,course_id,lesson_id'
          })

        // Also save to localStorage for immediate access
        const key = `progress_${courseId}_${lessonId}`
        localStorage.setItem(key, JSON.stringify(progressData))
        
        setLastSaved(new Date())
      }
    } catch (error) {
      console.error('Error saving progress:', error)
    } finally {
      setIsSaving(false)
    }
  }

  // Load progress on component mount
  const loadProgress = async () => {
    if (!courseId || !lessonId) return

    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      let savedProgress: ProgressData | null = null

      if (user) {
        // Try database first
        const { data } = await supabase
          .from('user_progress')
          .select('progress_data')
          .eq('user_id', user.id)
          .eq('course_id', courseId)
          .eq('lesson_id', lessonId)
          .single()

        if (data) {
          savedProgress = data.progress_data
        }
      }

      // Fallback to localStorage
      if (!savedProgress) {
        const key = `progress_${courseId}_${lessonId}`
        const localData = localStorage.getItem(key)
        if (localData) {
          savedProgress = JSON.parse(localData)
        }
      }

      if (savedProgress) {
        setProgress(savedProgress)
        onProgressRestored?.(savedProgress)
      }
    } catch (error) {
      console.error('Error loading progress:', error)
    }
  }

  // Auto-save every 30 seconds
  useEffect(() => {
    if (!courseId || !lessonId) return

    const interval = setInterval(() => {
      if (progress) {
        saveProgress({
          ...progress,
          timeSpent: (progress.timeSpent || 0) + 30,
          lastActive: new Date().toISOString()
        })
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [courseId, lessonId, progress])

  // Load progress on mount
  useEffect(() => {
    loadProgress()
  }, [courseId, lessonId])

  // Save on scroll position change
  useEffect(() => {
    const handleScroll = () => {
      if (progress) {
        saveProgress({
          ...progress,
          scrollPosition: window.scrollY
        })
      }
    }

    let scrollTimeout: NodeJS.Timeout
    const debouncedScroll = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(handleScroll, 1000)
    }

    window.addEventListener('scroll', debouncedScroll)
    return () => window.removeEventListener('scroll', debouncedScroll)
  }, [progress, courseId, lessonId])

  // Save before page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (progress) {
        saveProgress({
          ...progress,
          lastActive: new Date().toISOString()
        })
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [progress, courseId, lessonId])

  if (!progress) {
    return (
      <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-3 flex items-center gap-2 z-50">
        <RotateCcw className="w-4 h-4 text-gray-500 animate-spin" />
        <span className="text-sm text-gray-600">Loading progress...</span>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-3 z-50">
      <div className="flex items-center gap-3">
        {/* Progress Status */}
        <div className="flex items-center gap-2">
          {isSaving ? (
            <>
              <RotateCcw className="w-4 h-4 text-blue-500 animate-spin" />
              <span className="text-sm text-gray-600">Saving...</span>
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-600">Progress saved</span>
            </>
          )}
        </div>

        {/* Time Tracking */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock className="w-3 h-3" />
          <span>{Math.floor((progress.timeSpent || 0) / 60)}m {(progress.timeSpent || 0) % 60}s</span>
        </div>

        {/* Bookmark Status */}
        {progress.lessonPosition && progress.lessonPosition > 0 && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Bookmark className="w-3 h-3" />
            <span>Position {progress.lessonPosition}</span>
          </div>
        )}
      </div>

      {/* Last Saved Time */}
      {lastSaved && (
        <div className="text-xs text-gray-400 mt-1">
          Saved: {lastSaved.toLocaleTimeString()}
        </div>
      )}
    </div>
  )
}
