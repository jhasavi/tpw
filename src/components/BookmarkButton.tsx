'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { BookmarkIcon as BookmarkOutline } from '@heroicons/react/24/outline'
import { BookmarkIcon as BookmarkSolid } from '@heroicons/react/24/solid'

interface BookmarkButtonProps {
  type: 'course' | 'lesson'
  itemId: string
  itemTitle?: string
  userId: string
  initialBookmarked?: boolean
  className?: string
  showLabel?: boolean
}

export default function BookmarkButton({
  type,
  itemId,
  itemTitle,
  userId,
  initialBookmarked = false,
  className = '',
  showLabel = false
}: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked)
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const handleToggle = async () => {
    if (!userId) {
      alert('Please sign in to bookmark')
      return
    }

    setIsLoading(true)
    try {
      const tableName = type === 'course' ? 'course_bookmarks' : 'lesson_bookmarks'
      const columnName = type === 'course' ? 'course_id' : 'lesson_id'

      if (isBookmarked) {
        // Remove bookmark
        const { error } = await supabase
          .from(tableName)
          .delete()
          .eq('user_id', userId)
          .eq(columnName, itemId)

        if (error) throw error
        setIsBookmarked(false)
      } else {
        // Add bookmark
        const { error } = await supabase
          .from(tableName)
          .insert({
            user_id: userId,
            [columnName]: itemId
          })

        if (error) throw error
        setIsBookmarked(true)
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error)
      alert('Failed to update bookmark')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
        isBookmarked
          ? 'border-purple-600 bg-purple-50 text-purple-700 hover:bg-purple-100'
          : 'border-gray-300 bg-white text-gray-700 hover:border-purple-400 hover:bg-purple-50'
      } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      title={isBookmarked ? 'Remove bookmark' : 'Bookmark this'}
    >
      {isBookmarked ? (
        <BookmarkSolid className="w-5 h-5" />
      ) : (
        <BookmarkOutline className="w-5 h-5" />
      )}
      {showLabel && (
        <span className="text-sm font-medium">
          {isBookmarked ? 'Bookmarked' : 'Bookmark'}
        </span>
      )}
    </button>
  )
}
