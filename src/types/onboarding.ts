// Onboarding System Types

export interface OnboardingStep {
  id: string
  title: string
  description: string
  component: string
  required: boolean
  order: number
}

export interface SkillAssessment {
  id: string
  user_id: string
  skill_level: 'beginner' | 'intermediate' | 'advanced'
  topics_interested: string[]
  learning_goals: string[]
  time_commitment: 'light' | 'moderate' | 'intensive'
  completed_at: string
  score?: number
  recommendations?: string[]
}

export interface OnboardingProgress {
  user_id: string
  current_step: number
  completed_steps: string[]
  skipped_steps: string[]
  started_at: string
  completed_at?: string
  is_complete: boolean
}

export interface RecommendedCourse {
  course_id: string
  reason: string
  priority: 'high' | 'medium' | 'low'
  match_score: number
}

export interface TooltipConfig {
  id: string
  target: string
  title: string
  content: string
  position: 'top' | 'bottom' | 'left' | 'right'
  showOnce: boolean
  order: number
}

export interface CelebrationModal {
  type: 'achievement' | 'milestone' | 'streak' | 'completion'
  title: string
  message: string
  icon?: string
  reward?: string
  shareText?: string
}
