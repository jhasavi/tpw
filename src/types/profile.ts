// Profile Enhancement Types

export interface UserProfile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  location: string | null
  bio: string | null
  financial_goals: string[] | null
  interests: string[] | null
  experience_level: 'beginner' | 'intermediate' | 'advanced'
  occupation: string | null
  industry: string | null
  preferred_learning_style: 'visual' | 'auditory' | 'reading' | 'kinesthetic' | 'mixed' | null
  profile_completeness: number
  onboarding_completed: boolean
  created_at: string
  updated_at: string
}

export interface Achievement {
  id: string
  code: string
  title: string
  description: string
  icon: string
  category: 'learning' | 'quiz' | 'streak' | 'milestone'
  criteria: Record<string, number | boolean>
  points: number
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  display_order: number
  created_at: string
}

export interface UserAchievement {
  id: string
  user_id: string
  achievement_id: string
  earned_at: string
  progress: Record<string, number> | null
  is_showcased: boolean
  created_at: string
  achievement?: Achievement
}

export interface CourseBookmark {
  id: string
  user_id: string
  course_id: string
  notes: string | null
  created_at: string
}

export interface LessonBookmark {
  id: string
  user_id: string
  lesson_id: string
  notes: string | null
  created_at: string
}

export interface LearningStreak {
  id: string
  user_id: string
  current_streak: number
  longest_streak: number
  last_activity_date: string
  streak_start_date: string
  total_active_days: number
  created_at: string
  updated_at: string
}

export interface LearningPlaylist {
  id: string
  user_id: string
  title: string
  description: string | null
  is_public: boolean
  created_at: string
  updated_at: string
  items?: PlaylistItem[]
}

export interface PlaylistItem {
  id: string
  playlist_id: string
  course_id: string | null
  lesson_id: string | null
  display_order: number
  notes: string | null
  created_at: string
}

export interface ProgressStats {
  total_lessons: number
  completed_lessons: number
  in_progress_lessons: number
  total_time_spent: number
  quizzes_taken: number
  average_quiz_score: number
  courses_completed: number
  current_streak: number
  longest_streak: number
  achievements_earned: number
  profile_completeness: number
}

export interface AchievementProgress {
  achievement: Achievement
  current_progress: number
  required_progress: number
  percentage: number
  is_earned: boolean
  earned_at?: string
}

// Financial goal options
export const FINANCIAL_GOALS = [
  'Build Emergency Fund',
  'Pay Off Debt',
  'Save for Retirement',
  'Buy a Home',
  'Start a Business',
  'Invest in Stocks',
  'Save for Education',
  'Increase Income',
  'Create Passive Income',
  'Financial Independence',
  'Improve Credit Score',
  'Learn Budgeting'
] as const

export type FinancialGoal = typeof FINANCIAL_GOALS[number]

// Interest area options
export const INTEREST_AREAS = [
  'Budgeting & Money Management',
  'Investing & Wealth Building',
  'Retirement Planning',
  'Real Estate',
  'Credit & Debt Management',
  'Tax Planning',
  'Insurance & Protection',
  'Career Development',
  'Entrepreneurship',
  'Estate Planning',
  'Financial Independence/FIRE',
  'Sustainable/ESG Investing'
] as const

export type InterestArea = typeof INTEREST_AREAS[number]

// Industry options
export const INDUSTRIES = [
  'Technology',
  'Healthcare',
  'Education',
  'Finance & Banking',
  'Retail',
  'Manufacturing',
  'Real Estate',
  'Consulting',
  'Government',
  'Non-Profit',
  'Arts & Entertainment',
  'Hospitality',
  'Legal',
  'Marketing & Advertising',
  'Self-Employed',
  'Student',
  'Other'
] as const

export type Industry = typeof INDUSTRIES[number]

// Avatar options (for users without uploaded photo)
export const AVATAR_COLORS = [
  'bg-purple-500',
  'bg-pink-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-red-500',
  'bg-indigo-500',
  'bg-teal-500'
] as const

export const AVATAR_PATTERNS = [
  'gradient',
  'solid',
  'initials'
] as const

// Helper function to get user initials
export function getUserInitials(name: string | null | undefined): string {
  if (!name) return '?'
  
  const parts = name.trim().split(' ')
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase()
  }
  
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

// Helper function to get avatar color based on user ID
export function getAvatarColor(userId: string): string {
  const index = userId.charCodeAt(0) % AVATAR_COLORS.length
  return AVATAR_COLORS[index]
}

// Helper function to calculate achievement progress
export function calculateAchievementProgress(
  achievement: Achievement,
  userStats: Partial<ProgressStats>
): AchievementProgress {
  const criteria = achievement.criteria
  let current = 0
  let required = 0
  
  // Determine progress based on achievement criteria
  if ('lessons_completed' in criteria) {
    current = userStats.completed_lessons || 0
    required = criteria.lessons_completed as number
  } else if ('courses_completed' in criteria) {
    current = userStats.courses_completed || 0
    required = criteria.courses_completed as number
  } else if ('quizzes_completed' in criteria) {
    current = userStats.quizzes_taken || 0
    required = criteria.quizzes_completed as number
  } else if ('streak_days' in criteria) {
    current = userStats.current_streak || 0
    required = criteria.streak_days as number
  } else if ('profile_completeness' in criteria) {
    current = userStats.profile_completeness || 0
    required = criteria.profile_completeness as number
  } else if ('hours_spent' in criteria) {
    current = Math.floor((userStats.total_time_spent || 0) / 60)
    required = criteria.hours_spent as number
  } else {
    required = 1
    current = 0
  }
  
  const percentage = required > 0 ? Math.min((current / required) * 100, 100) : 0
  
  return {
    achievement,
    current_progress: current,
    required_progress: required,
    percentage,
    is_earned: current >= required
  }
}

// Rarity colors for achievements
export const RARITY_COLORS = {
  common: 'text-gray-600 bg-gray-100 border-gray-300',
  rare: 'text-blue-600 bg-blue-100 border-blue-300',
  epic: 'text-purple-600 bg-purple-100 border-purple-300',
  legendary: 'text-yellow-600 bg-yellow-100 border-yellow-300'
} as const

// Profile completion weights (should match database function)
export const PROFILE_COMPLETION_WEIGHTS = {
  full_name: 10,
  avatar_url: 15,
  location: 5,
  bio: 15,
  financial_goals: 10,
  interests: 10,
  experience_level: 5,
  occupation: 10,
  industry: 10,
  preferred_learning_style: 10
} as const
