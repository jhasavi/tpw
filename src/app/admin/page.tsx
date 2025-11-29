'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [stats, setStats] = useState({
    subscribers: 0,
    users: 0,
    courseEnrollments: 0,
  })

  useEffect(() => {
    checkAdmin()
  }, [])

  const checkAdmin = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      redirect('/auth/login')
      return
    }

    // Check if user is admin (you can add admin role check here)
    const { data: profile } = await supabase
      .from('profiles')
      .select('email, is_admin')
      .eq('id', user.id)
      .single()

    // For now, allow specific emails or check is_admin column
    const adminEmails = ['jhasavi@gmail.com', 'shalini@thepurplewings.org']
    const admin = adminEmails.includes(user.email || '') || profile?.is_admin

    if (!admin) {
      redirect('/')
      return
    }

    setIsAdmin(true)
    await loadStats()
    setLoading(false)
  }

  const loadStats = async () => {
    const supabase = createClient()

    try {
      const [
        { count: subscribersCount },
        { count: usersCount },
        { count: enrollmentsCount },
      ] = await Promise.all([
        supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('enrollments').select('*', { count: 'exact', head: true }),
      ])

      setStats({
        subscribers: subscribersCount || 0,
        users: usersCount || 0,
        courseEnrollments: enrollmentsCount || 0,
      })
    } catch (error) {
      console.error('Error loading stats:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your platform content and users</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Newsletter Subscribers</p>
                <p className="text-3xl font-bold text-gray-900">{stats.subscribers}</p>
              </div>
              <div className="text-4xl">📬</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Registered Users</p>
                <p className="text-3xl font-bold text-gray-900">{stats.users}</p>
              </div>
              <div className="text-4xl">👥</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Course Enrollments</p>
                <p className="text-3xl font-bold text-gray-900">{stats.courseEnrollments}</p>
              </div>
              <div className="text-4xl">📚</div>
            </div>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/admin/subscribers" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="text-4xl">📧</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Manage Subscribers</h3>
                <p className="text-sm text-gray-600">View and manage newsletter subscribers</p>
              </div>
            </div>
          </Link>

          <Link href="/admin/users" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="text-4xl">👤</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Manage Users</h3>
                <p className="text-sm text-gray-600">View registered users and course progress</p>
              </div>
            </div>
          </Link>

          <Link href="/admin/blog" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="text-4xl">✍️</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Manage Blog</h3>
                <p className="text-sm text-gray-600">Create and edit blog posts</p>
              </div>
            </div>
          </Link>

          <Link href="/admin/newsletter" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="text-4xl">📨</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Send Newsletter</h3>
                <p className="text-sm text-gray-600">Compose and send newsletters</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
