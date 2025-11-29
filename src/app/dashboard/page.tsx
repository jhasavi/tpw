import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import LearningDashboard from '@/components/LearningDashboard'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LearningDashboard />
      </div>
    </div>
  )
}
