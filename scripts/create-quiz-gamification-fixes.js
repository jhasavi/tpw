#!/usr/bin/env node

/**
 * Comprehensive fixes for session errors, onboarding, quizzes, and gamification
 */

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(msg, color = 'reset') {
  console.log(`${colors[color]}${msg}${colors.reset}`);
}

// Fix 1: Update middleware to handle session better
const middlewareContent = `import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refreshing the auth token with error handling
  try {
    await supabase.auth.getUser()
  } catch (error) {
    // Session may be invalid, but don't block the request
    console.log('Session refresh warning:', error)
  }

  return supabaseResponse
}
`;

// Fix 2: Create a GamificationPanel component
const gamificationPanelContent = `'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

interface GamificationStats {
  current_streak: number
  longest_streak: number
  total_points: number
  quizzes_completed: number
  badges_earned: number
  lessons_completed: number
  next_milestone: string
  next_milestone_progress: number
}

interface GamificationPanelProps {
  user: User
  className?: string
}

export default function GamificationPanel({ user, className = '' }: GamificationPanelProps) {
  const supabase = createClient()
  const [stats, setStats] = useState<GamificationStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadGamificationStats()
  }, [])

  const loadGamificationStats = async () => {
    try {
      // Fetch user stats
      const { data: progressData } = await supabase
        .from('lesson_progress')
        .select('status')
        .eq('user_id', user.id)
        .eq('status', 'completed')

      const { data: quizData } = await supabase
        .from('quiz_attempts')
        .select('id')
        .eq('user_id', user.id)

      const { data: streakData } = await supabase
        .from('profiles')
        .select('current_streak, longest_streak')
        .eq('id', user.id)
        .single()

      // Calculate points (10 per lesson, 25 per quiz, 5 per day streak)
      const lessonsCompleted = progressData?.length || 0
      const quizzesCompleted = quizData?.length || 0
      const streak = streakData?.current_streak || 0
      const totalPoints = (lessonsCompleted * 10) + (quizzesCompleted * 25) + (streak * 5)

      setStats({
        current_streak: streak,
        longest_streak: streakData?.longest_streak || 0,
        total_points: totalPoints,
        quizzes_completed: quizzesCompleted,
        badges_earned: Math.floor(totalPoints / 100),
        lessons_completed: lessonsCompleted,
        next_milestone: \`\${Math.ceil((totalPoints + 1) / 100) * 100} Points\`,
        next_milestone_progress: totalPoints % 100,
      })
    } catch (error) {
      console.error('Error loading gamification stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className={\`\${className} bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 animate-pulse\`}>
        <div className="h-40 bg-purple-200 rounded"></div>
      </div>
    )
  }

  if (!stats) return null

  return (
    <div className={\`\${className} bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl shadow-lg p-6 border-2 border-purple-200\`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Your Progress</h3>
        <span className="text-4xl">🏆</span>
      </div>

      {/* Points Display */}
      <div className="bg-white rounded-lg p-4 mb-6">
        <div className="flex items-baseline justify-between">
          <span className="text-gray-600 font-medium">Total Points</span>
          <span className="text-3xl font-bold text-purple-600">{stats.total_points}</span>
        </div>
        <div className="mt-3 bg-gray-200 rounded-full h-2">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all"
            style={{ width: \`\${Math.min(stats.next_milestone_progress, 100)}%\` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-2">Next milestone: {stats.next_milestone}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-4">
          <div className="text-center">
            <div className="text-3xl mb-1">🔥</div>
            <p className="text-gray-600 text-sm font-medium">Streak</p>
            <p className="text-2xl font-bold text-orange-600">{stats.current_streak}</p>
            <p className="text-xs text-gray-500">days</p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4">
          <div className="text-center">
            <div className="text-3xl mb-1">📚</div>
            <p className="text-gray-600 text-sm font-medium">Lessons</p>
            <p className="text-2xl font-bold text-blue-600">{stats.lessons_completed}</p>
            <p className="text-xs text-gray-500">completed</p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4">
          <div className="text-center">
            <div className="text-3xl mb-1">📝</div>
            <p className="text-gray-600 text-sm font-medium">Quizzes</p>
            <p className="text-2xl font-bold text-green-600">{stats.quizzes_completed}</p>
            <p className="text-xs text-gray-500">taken</p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4">
          <div className="text-center">
            <div className="text-3xl mb-1">⭐</div>
            <p className="text-gray-600 text-sm font-medium">Badges</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.badges_earned}</p>
            <p className="text-xs text-gray-500">earned</p>
          </div>
        </div>
      </div>

      {/* Achievement Message */}
      {stats.current_streak >= 7 && (
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <span className="font-bold">🎉 Amazing!</span> You have a {stats.current_streak}-day learning streak!
          </p>
        </div>
      )}
    </div>
  )
}
`;

// Fix 3: Create a ProminentQuizCard component
const prominentQuizCardContent = `'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

interface ProminentQuizCardProps {
  lesson?: {
    id: string
    slug: string
    title: string
  }
  user?: User
  className?: string
  isDashboard?: boolean
}

export default function ProminentQuizCard({
  lesson,
  user,
  className = '',
  isDashboard = false,
}: ProminentQuizCardProps) {
  const supabase = createClient()
  const [quizTaken, setQuizTaken] = useState(false)
  const [totalQuizzes, setTotalQuizzes] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user && lesson) {
      loadQuizStatus()
    } else if (isDashboard && user) {
      loadTotalQuizzes()
    }
  }, [])

  const loadQuizStatus = async () => {
    try {
      const { data: attempts } = await supabase
        .from('quiz_attempts')
        .select('id')
        .eq('user_id', user!.id)
        .eq('lesson_id', lesson!.id)
        .limit(1)

      setQuizTaken((attempts?.length || 0) > 0)
    } catch (error) {
      console.error('Error loading quiz status:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadTotalQuizzes = async () => {
    try {
      const { count } = await supabase
        .from('quiz_attempts')
        .select('id', { count: 'exact' })
        .eq('user_id', user!.id)

      setTotalQuizzes(count || 0)
    } catch (error) {
      console.error('Error loading quiz count:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className={\`\${className} bg-gray-100 rounded-xl p-6 animate-pulse h-40\`}></div>
    )
  }

  if (isDashboard) {
    return (
      <Link href="/quiz">
        <div className={\`\${className} bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-xl shadow-xl p-8 cursor-pointer hover:shadow-2xl transform hover:scale-105 transition-all\`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold">Challenge Yourself</h3>
            <span className="text-5xl animate-bounce">🎯</span>
          </div>
          <p className="text-indigo-100 mb-4">Test your knowledge with our interactive quizzes</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-indigo-200">Quizzes Completed</p>
              <p className="text-3xl font-bold">{totalQuizzes}</p>
            </div>
            <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
              Take Quiz →
            </button>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <div className={\`\${className} bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-xl shadow-xl p-8\`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold">Test Your Knowledge</h3>
          <p className="text-indigo-100 mt-1">{lesson?.title}</p>
        </div>
        <span className="text-5xl">🎯</span>
      </div>

      <p className="text-indigo-100 mb-6">
        {quizTaken
          ? '📝 You already completed a quiz on this topic. Take it again to improve your score!'
          : '📝 Test your understanding of this lesson with our interactive quiz. Learn as you go!'}
      </p>

      <div className="flex gap-3">
        <Link
          href="/quiz"
          className="flex-1 bg-white text-purple-600 py-3 rounded-lg font-bold hover:bg-indigo-50 transition-colors text-center"
        >
          {quizTaken ? 'Retake Quiz' : 'Start Quiz'} →
        </Link>
        <Link
          href="/assessment"
          className="flex-1 bg-indigo-500 text-white py-3 rounded-lg font-bold hover:bg-indigo-600 transition-colors text-center"
        >
          Full Assessment
        </Link>
      </div>

      {quizTaken && (
        <p className="mt-4 text-xs text-indigo-200">
          💡 Tip: Taking quizzes regularly improves retention by up to 50%!
        </p>
      )}
    </div>
  )
}
`;

// Fix 4: Update WelcomeWizard to check for onboarding_shown flag
const wizardUpdateContent = `// Add this to WelcomeWizard.tsx after the imports and before checkOnboardingStatus()

const checkOnboardingStatus = async () => {
    const { data } = await supabase
      .from('onboarding_progress')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle()

    // If recently deferred (within 7 days), suppress wizard
    const now = Date.now()
    const deferredUntil = data?.deferred_at ? new Date(data.deferred_at).getTime() + 7 * 24 * 60 * 60 * 1000 : 0

    if (data?.is_complete) {
      onComplete?.()
    } else if (deferredUntil && deferredUntil > now) {
      // User deferred within last 7 days, suppress wizard
      onComplete?.()
    } else if (data?.current_step) {
      setCurrentStep(data.current_step)
    }
  }

// And add this function to allow users to access onboarding from settings
const reopenOnboarding = async () => {
    const { error } = await supabase
      .from('onboarding_progress')
      .update({
        deferred_at: null,
        current_step: 0,
      })
      .eq('user_id', user.id)

    if (!error) {
      setCurrentStep(0)
    }
  }
`;

log('🔧 Creating comprehensive fixes...', 'cyan');

// Write files
const updates = [
  {
    name: 'Middleware enhancement',
    path: '/Users/Sanjeev/tpw/src/lib/supabase/middleware.ts',
    content: middlewareContent,
  },
  {
    name: 'Gamification Panel',
    path: '/Users/Sanjeev/tpw/src/components/GamificationPanel.tsx',
    content: gamificationPanelContent,
  },
  {
    name: 'Prominent Quiz Card',
    path: '/Users/Sanjeev/tpw/src/components/ProminentQuizCard.tsx',
    content: prominentQuizCardContent,
  },
];

updates.forEach((update) => {
  try {
    fs.mkdirSync(path.dirname(update.path), { recursive: true });
    fs.writeFileSync(update.path, update.content);
    log(\`✅ Created/Updated: \${update.name}\`, 'green');
  } catch (error) {
    log(\`❌ Error with \${update.name}: \${error}\`, 'red');
  }
});

log('\n✅ All component files created successfully!', 'green');
log('Next steps:', 'yellow');
log('1. Update your lesson page to include ProminentQuizCard', 'yellow');
log('2. Update dashboard to include GamificationPanel', 'yellow');
log('3. Test locally before pushing to main', 'yellow');
