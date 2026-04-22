'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Gift, Users, TrendingUp, Copy, CheckCircle, Crown, Star } from 'lucide-react'

const REFERRAL_TIERS = [
  {
    level: 1,
    title: "Financial Friend",
    referrals: 3,
    reward: "Premium Access (3 months)",
    icon: Star,
    color: "bronze"
  },
  {
    level: 2,
    title: "Community Builder", 
    referrals: 10,
    reward: "Premium Access (1 year) + 1:1 Session",
    icon: Crown,
    color: "silver"
  },
  {
    level: 3,
    title: "Movement Maker",
    referrals: 25,
    reward: "Lifetime Premium + Group Workshop",
    icon: Gift,
    color: "gold"
  }
]

const SUCCESS_STORIES = [
  {
    name: "Sarah M.",
    referrals: 12,
    reward: "Year Premium + Coaching",
    quote: "I shared with my book club and now we're all learning together!",
    image: "https://images.unsplash.io/photo-1494790108755-2616b612c631?w=100&h=100&fit=crop&crop=face"
  },
  {
    name: "Maria R.",
    referrals: 8,
    reward: "6 Months Premium",
    quote: "My coworkers joined and now we have lunch money talks!",
    image: "https://images.unsplash.io/photo-1558769132-cb1aea45c1e5?w=100&h=100&fit=crop&crop=face"
  },
  {
    name: "Linda T.",
    referrals: 28,
    reward: "Lifetime Premium",
    quote: "I'm building a local chapter of financially empowered women!",
    image: "https://images.unsplash.io/photo-1554151228-0bf1b2b5d1f5?w=100&h=100&fit=crop&crop=face"
  }
]

export default function ReferralProgram() {
  const [userReferralCode, setUserReferralCode] = useState('')
  const [referralStats, setReferralStats] = useState({
    referrals: 0,
    pending: 0,
    rewards: [],
    currentTier: 0
  })
  const [copied, setCopied] = useState(false)
  const [email, setEmail] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    // Load user referral data
    loadReferralData()
  }, [])

  const loadReferralData = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      // Load referral stats from database
      const { data: stats } = await supabase
        .from('user_referrals')
        .select('*')
        .eq('referrer_id', user.id)
      
      if (stats) {
        setReferralStats({
          referrals: stats.filter(s => s.status === 'completed').length,
          pending: stats.filter(s => s.status === 'pending').length,
          rewards: [], // Load from rewards table
          currentTier: calculateTier(stats.filter(s => s.status === 'completed').length)
        })
      }
      
      // Generate referral code if not exists
      if (!userReferralCode) {
        generateReferralCode(user.id)
      }
    }
  }

  const generateReferralCode = async (userId: string) => {
    const code = `PW${userId.slice(-6).toUpperCase()}`
    setUserReferralCode(code)
  }

  const calculateTier = (referralCount: number) => {
    if (referralCount >= 25) return 2
    if (referralCount >= 10) return 1
    return 0
  }

  const copyReferralLink = () => {
    const link = `https://www.thepurplewings.org/join?ref=${userReferralCode}`
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  const shareReferral = () => {
    const message = `I'm learning financial independence with The Purple Wings and thought you'd love it too! Join me: https://www.thepurplewings.org/join?ref=${userReferralCode}`
    
    if (navigator.share) {
      navigator.share({
        title: 'Join The Purple Wings',
        text: message,
        url: `https://www.thepurplewings.org/join?ref=${userReferralCode}`
      })
    } else {
      navigator.clipboard.writeText(message)
      alert('Message copied to clipboard!')
    }
  }

  const generateReferralCodeForEmail = async () => {
    if (!email) return
    
    setIsGenerating(true)
    
    try {
      const code = `PW${email.slice(-6).toUpperCase()}`
      setUserReferralCode(code)
      
      // Save to database
      const supabase = createClient()
      await supabase
        .from('referral_codes')
        .insert({
          email,
          code,
          created_at: new Date().toISOString()
        })
    } catch (error) {
      console.error('Error generating code:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const currentTier = REFERRAL_TIERS[referralStats.currentTier]
  const nextTier = REFERRAL_TIERS[Math.min(referralStats.currentTier + 1, 2)]
  const progressToNext = nextTier 
    ? (referralStats.referrals / nextTier.referrals) * 100 
    : 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <span className="bg-yellow-400 text-purple-900 px-4 py-2 rounded-full text-sm font-bold">
              Refer & Earn Premium
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Share Financial Freedom
          </h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
            Invite friends to join The Purple Wings and unlock exclusive rewards. 
            Together we're building a community of financially empowered women.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Gift className="w-8 h-8 mx-auto mb-3" />
              <div className="text-2xl font-bold">Free Premium</div>
              <div className="text-purple-200">Get rewarded for sharing</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Users className="w-8 h-8 mx-auto mb-3" />
              <div className="text-2xl font-bold">Build Community</div>
              <div className="text-purple-200">Learn together</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <TrendingUp className="w-8 h-8 mx-auto mb-3" />
              <div className="text-2xl font-bold">Track Progress</div>
              <div className="text-purple-200">See your impact grow</div>
            </div>
          </div>
        </div>
      </section>

      {/* Referral Code Generation */}
      {!userReferralCode ? (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Get Your Referral Code
              </h2>
              <p className="text-xl text-gray-600">
                Enter your email to generate your unique referral link
              </p>
            </div>
            
            <div className="max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              
              <button
                onClick={generateReferralCodeForEmail}
                disabled={!email || isGenerating}
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? 'Generating...' : 'Generate Referral Code'}
              </button>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Referral Stats */}
          <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Your Referral Impact
                </h2>
                <p className="text-xl text-gray-600">
                  You're making a difference in women's financial lives
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600">{referralStats.referrals}</div>
                  <div className="text-purple-800">Successful Referrals</div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-yellow-600">{referralStats.pending}</div>
                  <div className="text-yellow-800">Pending Invitations</div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-green-600">{referralStats.referrals * 3}</div>
                  <div className="text-green-800">Women Empowered</div>
                </div>
              </div>

              {/* Current Tier */}
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl p-8 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Current Tier</h3>
                    <div className="flex items-center gap-3">
                      <currentTier.icon className="w-8 h-8" />
                      <span className="text-xl">{currentTier.title}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{referralStats.referrals}</div>
                    <div className="text-purple-200">Referrals</div>
                  </div>
                </div>
                
                {nextTier && (
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress to {nextTier.title}</span>
                      <span>{referralStats.referrals}/{nextTier.referrals}</span>
                    </div>
                    <div className="bg-white/20 rounded-full h-3">
                      <div 
                        className="bg-yellow-400 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${progressToNext}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Referral Link */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Your Referral Link</h3>
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={`https://www.thepurplewings.org/join?ref=${userReferralCode}`}
                    readOnly
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-white"
                  />
                  <button
                    onClick={copyReferralLink}
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                  >
                    {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={shareReferral}
                    className="flex-1 bg-purple-100 text-purple-700 py-3 rounded-lg font-semibold hover:bg-purple-200 transition-colors"
                  >
                    Share via Text/Email
                  </button>
                  <button
                    onClick={shareReferral}
                    className="flex-1 bg-purple-100 text-purple-700 py-3 rounded-lg font-semibold hover:bg-purple-200 transition-colors"
                  >
                    Share on Social Media
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Reward Tiers */}
          <section className="py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Reward Tiers
                </h2>
                <p className="text-xl text-gray-600">
                  The more you share, the more you earn
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {REFERRAL_TIERS.map((tier, index) => {
                  const isCurrent = referralStats.currentTier === index
                  const isCompleted = referralStats.referrals >= tier.referrals
                  const isNext = referralStats.currentTier + 1 === index
                  
                  return (
                    <div
                      key={tier.level}
                      className={`bg-white rounded-xl shadow-lg overflow-hidden ${
                        isCurrent ? 'ring-2 ring-purple-500' : isCompleted ? 'ring-2 ring-green-500' : ''
                      }`}
                    >
                      <div className={`p-6 ${
                        isCompleted ? 'bg-green-50' : isCurrent ? 'bg-purple-50' : ''
                      }`}>
                        <div className="flex items-center justify-between mb-4">
                          <tier.icon className={`w-8 h-8 ${
                            isCompleted ? 'text-green-600' : isCurrent ? 'text-purple-600' : 'text-gray-400'
                          }`} />
                          {isCompleted && (
                            <CheckCircle className="w-6 h-6 text-green-600" />
                          )}
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {tier.title}
                        </h3>
                        
                        <div className="text-3xl font-bold text-purple-600 mb-2">
                          {tier.referrals} Referrals
                        </div>
                        
                        <div className="text-gray-700 mb-4">
                          {tier.reward}
                        </div>
                        
                        {isCurrent && (
                          <div className="text-sm text-purple-600 font-medium">
                            Your current tier
                          </div>
                        )}
                        
                        {isNext && (
                          <div className="text-sm text-gray-600">
                            {tier.referrals - referralStats.referrals} more to unlock
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Success Stories */}
          <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Community Champions
                </h2>
                <p className="text-xl text-gray-600">
                  Women like you making a real impact
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {SUCCESS_STORIES.map((story, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={story.image}
                        alt={story.name}
                        className="w-12 h-12 rounded-full mr-3"
                      />
                      <div>
                        <h3 className="font-bold text-gray-900">{story.name}</h3>
                        <p className="text-sm text-purple-600">{story.referrals} referrals</p>
                      </div>
                    </div>
                    
                    <blockquote className="text-gray-700 italic mb-4">
                      "{story.quote}"
                    </blockquote>
                    
                    <div className="bg-purple-100 text-purple-700 px-3 py-2 rounded-lg text-sm font-medium">
                      Earned: {story.reward}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  )
}
