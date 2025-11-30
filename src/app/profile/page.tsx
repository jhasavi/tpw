'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  UserProfile,
  FINANCIAL_GOALS,
  INTEREST_AREAS,
  INDUSTRIES,
  getUserInitials,
  getAvatarColor,
  PROFILE_COMPLETION_WEIGHTS
} from '@/types/profile'

export default function ProfilePage() {
  const router = useRouter()
  const supabase = createClient()
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    experience_level: 'beginner',
    financial_goals: [],
    interests: []
  })
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      router.push('/auth/login')
      return
    }

    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (data) {
      setProfile(data)
      setAvatarPreview(data.avatar_url)
    }
    
    setLoading(false)
  }

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be less than 5MB')
      return
    }

    setUploadingAvatar(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      // Create unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}-${Date.now()}.${fileExt}`
      const filePath = `avatars/${fileName}`

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('profile-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        })

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profile-images')
        .getPublicUrl(filePath)

      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id)

      if (updateError) throw updateError

      setProfile({ ...profile, avatar_url: publicUrl })
      setAvatarPreview(publicUrl)
      
    } catch (error: any) {
      console.error('Error uploading avatar:', error)
      alert('Failed to upload avatar. Please try again.')
    } finally {
      setUploadingAvatar(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profile.full_name,
          location: profile.location,
          bio: profile.bio,
          financial_goals: profile.financial_goals,
          interests: profile.interests,
          experience_level: profile.experience_level,
          occupation: profile.occupation,
          industry: profile.industry,
          preferred_learning_style: profile.preferred_learning_style,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)

      if (error) throw error

      // Reload to get updated profile_completeness
      await loadProfile()
      
      alert('Profile updated successfully!')
    } catch (error: any) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const toggleGoal = (goal: string) => {
    const goals = profile.financial_goals || []
    const newGoals = goals.includes(goal)
      ? goals.filter(g => g !== goal)
      : [...goals, goal]
    setProfile({ ...profile, financial_goals: newGoals })
  }

  const toggleInterest = (interest: string) => {
    const interests = profile.interests || []
    const newInterests = interests.includes(interest)
      ? interests.filter(i => i !== interest)
      : [...interests, interest]
    setProfile({ ...profile, interests: newInterests })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-8 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="space-y-4">
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const completeness = profile.profile_completeness || 0
  const initials = getUserInitials(profile.full_name)
  const avatarColor = getAvatarColor(profile.id || '')

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Profile</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        {/* Profile Completeness */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold">Profile Completeness</h2>
            <span className="text-2xl font-bold">{completeness}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 mb-2">
            <div
              className="bg-white rounded-full h-3 transition-all duration-500"
              style={{ width: `${completeness}%` }}
            ></div>
          </div>
          <p className="text-purple-100 text-sm">
            {completeness === 100 
              ? '🎉 Your profile is complete!' 
              : `Complete your profile to unlock all features and earn the Profile Pro achievement!`}
          </p>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Avatar Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Profile Picture
            </label>
            <div className="flex items-center gap-6">
              {/* Avatar Display */}
              <div className="relative">
                {avatarPreview ? (
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-purple-200">
                    <Image
                      src={avatarPreview}
                      alt="Profile"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className={`w-24 h-24 rounded-full ${avatarColor} flex items-center justify-center text-white text-3xl font-bold border-4 border-purple-200`}>
                    {initials}
                  </div>
                )}
                {uploadingAvatar && (
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  </div>
                )}
              </div>

              {/* Upload Button */}
              <div>
                <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-purple-300 rounded-md shadow-sm text-sm font-medium text-purple-700 bg-white hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                  <span>{uploadingAvatar ? 'Uploading...' : 'Upload Photo'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="sr-only"
                    disabled={uploadingAvatar}
                  />
                </label>
                <p className="text-xs text-gray-500 mt-2">
                  JPG, PNG or GIF. Max 5MB.
                </p>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={profile.full_name || ''}
                onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={profile.email || ''}
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50"
                disabled
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              value={profile.bio || ''}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              rows={4}
              placeholder="Tell us a bit about yourself and your financial journey..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Professional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Occupation
              </label>
              <input
                type="text"
                value={profile.occupation || ''}
                onChange={(e) => setProfile({ ...profile, occupation: e.target.value })}
                placeholder="e.g., Software Engineer"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry
              </label>
              <select
                value={profile.industry || ''}
                onChange={(e) => setProfile({ ...profile, industry: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select industry...</option>
                {INDUSTRIES.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Location & Experience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location (Optional)
              </label>
              <input
                type="text"
                value={profile.location || ''}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                placeholder="e.g., Boston, MA"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Level
              </label>
              <select
                value={profile.experience_level || 'beginner'}
                onChange={(e) => setProfile({ ...profile, experience_level: e.target.value as any })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="beginner">Beginner - Just starting out</option>
                <option value="intermediate">Intermediate - Some knowledge</option>
                <option value="advanced">Advanced - Experienced</option>
              </select>
            </div>
          </div>

          {/* Learning Style */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Learning Style
            </label>
            <select
              value={profile.preferred_learning_style || ''}
              onChange={(e) => setProfile({ ...profile, preferred_learning_style: e.target.value as any })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select learning style...</option>
              <option value="visual">Visual - Learn through images and diagrams</option>
              <option value="auditory">Auditory - Learn through listening</option>
              <option value="reading">Reading - Learn through reading text</option>
              <option value="kinesthetic">Kinesthetic - Learn through hands-on practice</option>
              <option value="mixed">Mixed - Combination of styles</option>
            </select>
          </div>

          {/* Financial Goals */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Financial Goals (Select all that apply)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {FINANCIAL_GOALS.map(goal => (
                <button
                  key={goal}
                  type="button"
                  onClick={() => toggleGoal(goal)}
                  className={`px-4 py-2 rounded-md border-2 text-sm font-medium transition-all ${
                    profile.financial_goals?.includes(goal)
                      ? 'bg-purple-100 border-purple-500 text-purple-700'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-purple-300'
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>

          {/* Interest Areas */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Areas of Interest (Select all that apply)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {INTEREST_AREAS.map(interest => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`px-4 py-2 rounded-md border-2 text-sm font-medium transition-all text-left ${
                    profile.interests?.includes(interest)
                      ? 'bg-purple-100 border-purple-500 text-purple-700'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-purple-300'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
