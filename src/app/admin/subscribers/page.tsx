'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { redirect } from 'next/navigation'

interface Subscriber {
  id: string
  email: string
  name: string | null
  subscribed_at: string
  status: string
}

export default function SubscribersPage() {
  const [loading, setLoading] = useState(true)
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    checkAdminAndLoad()
  }, [])

  const checkAdminAndLoad = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      redirect('/auth/login')
      return
    }

    // Check admin status
    const adminEmails = ['jhasavi@gmail.com', 'shalini@thepurplewings.org']
    if (!adminEmails.includes(user.email || '')) {
      redirect('/')
      return
    }

    await loadSubscribers()
    setLoading(false)
  }

  const loadSubscribers = async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .order('subscribed_at', { ascending: false })

    if (error) {
      console.error('Error loading subscribers:', error)
    } else {
      setSubscribers(data || [])
    }
  }

  const exportCSV = () => {
    const csv = [
      ['Email', 'Name', 'Subscribed At', 'Status'].join(','),
      ...subscribers.map(sub => [
        sub.email,
        sub.name || '',
        new Date(sub.subscribed_at).toLocaleDateString(),
        sub.status
      ].join(','))
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `subscribers-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const filteredSubscribers = subscribers.filter(sub =>
    sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (sub.name || '').toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Loading subscribers...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Newsletter Subscribers</h1>
            <p className="text-gray-600">{subscribers.length} total subscribers</p>
          </div>
          <button
            onClick={exportCSV}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 font-medium"
          >
            📥 Export CSV
          </button>
        </div>

        <div className="bg-white rounded-lg shadow mb-6 p-4">
          <input
            type="text"
            placeholder="🔍 Search by email or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subscribed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSubscribers.map((subscriber) => (
                <tr key={subscriber.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {subscriber.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {subscriber.name || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(subscriber.subscribed_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      subscriber.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {subscriber.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredSubscribers.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-2">📭</div>
              <p className="text-gray-600">No subscribers found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
