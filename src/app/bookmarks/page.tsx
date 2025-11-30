'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Bookmark {
  id: string
  course_id?: string
  lesson_id?: string
  notes: string | null
  created_at: string
  course?: {
    id: string
    title: string
    slug: string
    description: string
    curricula: { slug: string }
  }
  lesson?: {
    id: string
    title: string
    slug: string
    description: string
    courses: {
      id: string
      slug: string
      curricula: { slug: string }
    }
  }
}

export default function BookmarksPage() {
  const router = useRouter()
  const supabase = createClient()
  
  const [loading, setLoading] = useState(true)
  const [courseBookmarks, setCourseBookmarks] = useState<Bookmark[]>([])
  const [lessonBookmarks, setLessonBookmarks] = useState<Bookmark[]>([])
  const [activeTab, setActiveTab] = useState<'courses' | 'lessons'>('courses')
  const [editingNotes, setEditingNotes] = useState<string | null>(null)
  const [noteText, setNoteText] = useState('')

  useEffect(() => {
    loadBookmarks()
  }, [])

  const loadBookmarks = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      router.push('/auth/login')
      return
    }

    // Fetch course bookmarks
    const { data: courseData } = await supabase
      .from('course_bookmarks')
      .select(`
        *,
        course:courses(
          id,
          title,
          slug,
          description,
          curricula(slug)
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (courseData) {
      setCourseBookmarks(courseData as any)
    }

    // Fetch lesson bookmarks
    const { data: lessonData } = await supabase
      .from('lesson_bookmarks')
      .select(`
        *,
        lesson:lessons(
          id,
          title,
          slug,
          description,
          courses(
            id,
            slug,
            curricula(slug)
          )
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (lessonData) {
      setLessonBookmarks(lessonData as any)
    }

    setLoading(false)
  }

  const removeBookmark = async (bookmarkId: string, type: 'course' | 'lesson') => {
    if (!confirm('Remove this bookmark?')) return

    const table = type === 'course' ? 'course_bookmarks' : 'lesson_bookmarks'
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', bookmarkId)

    if (error) {
      alert('Failed to remove bookmark')
      return
    }

    // Refresh bookmarks
    loadBookmarks()
  }

  const updateNotes = async (bookmarkId: string, type: 'course' | 'lesson') => {
    const table = type === 'course' ? 'course_bookmarks' : 'lesson_bookmarks'
    const { error } = await supabase
      .from(table)
      .update({ notes: noteText })
      .eq('id', bookmarkId)

    if (error) {
      alert('Failed to update notes')
      return
    }

    setEditingNotes(null)
    setNoteText('')
    loadBookmarks()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-8 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🔖 My Bookmarks</h1>
          <p className="text-gray-600">Your saved courses and lessons for later</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-6 p-2">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('courses')}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'courses'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-purple-50'
              }`}
            >
              📚 Courses ({courseBookmarks.length})
            </button>
            <button
              onClick={() => setActiveTab('lessons')}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'lessons'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-purple-50'
              }`}
            >
              📖 Lessons ({lessonBookmarks.length})
            </button>
          </div>
        </div>

        {/* Course Bookmarks */}
        {activeTab === 'courses' && (
          <div>
            {courseBookmarks.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <div className="text-6xl mb-4">🔖</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No Course Bookmarks Yet</h2>
                <p className="text-gray-600 mb-6">
                  Save courses to access them quickly later
                </p>
                <Link
                  href="/courses"
                  className="inline-block bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 font-medium"
                >
                  Browse Courses
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {courseBookmarks.map(bookmark => {
                  const course = bookmark.course!
                  const curriculumSlug = (course.curricula as any)?.slug || 'womens-financial-literacy'
                  
                  return (
                    <div key={bookmark.id} className="bg-white rounded-xl shadow-lg p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <Link
                            href={`/learn/${curriculumSlug}/${course.slug}`}
                            className="text-xl font-bold text-purple-600 hover:text-purple-700 mb-2 block"
                          >
                            {course.title}
                          </Link>
                          <p className="text-gray-600 mb-4">{course.description}</p>
                          
                          {/* Notes Section */}
                          {editingNotes === bookmark.id ? (
                            <div className="mb-4">
                              <textarea
                                value={noteText}
                                onChange={(e) => setNoteText(e.target.value)}
                                placeholder="Add your notes..."
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              />
                              <div className="flex gap-2 mt-2">
                                <button
                                  onClick={() => updateNotes(bookmark.id, 'course')}
                                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => {
                                    setEditingNotes(null)
                                    setNoteText('')
                                  }}
                                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : bookmark.notes ? (
                            <div className="mb-4 bg-purple-50 border-l-4 border-purple-300 p-3 rounded">
                              <div className="text-sm text-gray-700">{bookmark.notes}</div>
                              <button
                                onClick={() => {
                                  setEditingNotes(bookmark.id)
                                  setNoteText(bookmark.notes || '')
                                }}
                                className="text-purple-600 text-xs mt-2 hover:text-purple-700"
                              >
                                Edit notes
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                setEditingNotes(bookmark.id)
                                setNoteText('')
                              }}
                              className="text-purple-600 text-sm mb-4 hover:text-purple-700"
                            >
                              + Add notes
                            </button>
                          )}
                          
                          <div className="text-xs text-gray-500">
                            Saved on {new Date(bookmark.created_at).toLocaleDateString()}
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          <Link
                            href={`/learn/${curriculumSlug}/${course.slug}`}
                            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm whitespace-nowrap"
                          >
                            Open Course
                          </Link>
                          <button
                            onClick={() => removeBookmark(bookmark.id, 'course')}
                            className="px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* Lesson Bookmarks */}
        {activeTab === 'lessons' && (
          <div>
            {lessonBookmarks.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <div className="text-6xl mb-4">📖</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No Lesson Bookmarks Yet</h2>
                <p className="text-gray-600 mb-6">
                  Bookmark specific lessons to revisit them easily
                </p>
                <Link
                  href="/courses"
                  className="inline-block bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 font-medium"
                >
                  Browse Courses
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {lessonBookmarks.map(bookmark => {
                  const lesson = bookmark.lesson!
                  const course = lesson.courses as any
                  const curriculumSlug = course?.curricula?.slug || 'womens-financial-literacy'
                  
                  return (
                    <div key={bookmark.id} className="bg-white rounded-xl shadow-lg p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="text-sm text-purple-600 font-medium mb-1">
                            From: {course?.title || 'Unknown Course'}
                          </div>
                          <Link
                            href={`/learn/${curriculumSlug}/${course?.slug}/${lesson.slug}`}
                            className="text-xl font-bold text-purple-600 hover:text-purple-700 mb-2 block"
                          >
                            {lesson.title}
                          </Link>
                          <p className="text-gray-600 mb-4">{lesson.description}</p>
                          
                          {/* Notes Section */}
                          {editingNotes === bookmark.id ? (
                            <div className="mb-4">
                              <textarea
                                value={noteText}
                                onChange={(e) => setNoteText(e.target.value)}
                                placeholder="Add your notes..."
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              />
                              <div className="flex gap-2 mt-2">
                                <button
                                  onClick={() => updateNotes(bookmark.id, 'lesson')}
                                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => {
                                    setEditingNotes(null)
                                    setNoteText('')
                                  }}
                                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : bookmark.notes ? (
                            <div className="mb-4 bg-purple-50 border-l-4 border-purple-300 p-3 rounded">
                              <div className="text-sm text-gray-700">{bookmark.notes}</div>
                              <button
                                onClick={() => {
                                  setEditingNotes(bookmark.id)
                                  setNoteText(bookmark.notes || '')
                                }}
                                className="text-purple-600 text-xs mt-2 hover:text-purple-700"
                              >
                                Edit notes
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                setEditingNotes(bookmark.id)
                                setNoteText('')
                              }}
                              className="text-purple-600 text-sm mb-4 hover:text-purple-700"
                            >
                              + Add notes
                            </button>
                          )}
                          
                          <div className="text-xs text-gray-500">
                            Saved on {new Date(bookmark.created_at).toLocaleDateString()}
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          <Link
                            href={`/learn/${curriculumSlug}/${course?.slug}/${lesson.slug}`}
                            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm whitespace-nowrap"
                          >
                            Open Lesson
                          </Link>
                          <button
                            onClick={() => removeBookmark(bookmark.id, 'lesson')}
                            className="px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* Back to Dashboard */}
        <div className="text-center mt-8">
          <Link
            href="/dashboard"
            className="inline-block text-purple-600 hover:text-purple-700 font-medium"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
