// Google Analytics 4 Configuration and Helpers

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''

// Page view tracking
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}

// Event tracking
interface GtagEvent {
  action: string
  category: string
  label?: string
  value?: number
}

export const event = ({ action, category, label, value }: GtagEvent) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Custom event helpers for The Purple Wings

export const trackCourseEnrollment = (courseId: string, courseTitle: string) => {
  event({
    action: 'enroll_course',
    category: 'engagement',
    label: courseTitle,
    value: 1
  })
}

export const trackLessonComplete = (lessonId: string, lessonTitle: string, timeSpent: number) => {
  event({
    action: 'complete_lesson',
    category: 'learning',
    label: lessonTitle,
    value: timeSpent
  })
}

export const trackQuizAttempt = (quizId: string, score: number, totalQuestions: number) => {
  event({
    action: 'quiz_attempt',
    category: 'assessment',
    label: quizId,
    value: Math.round((score / totalQuestions) * 100)
  })
}

export const trackAchievementUnlock = (achievementId: string, achievementTitle: string) => {
  event({
    action: 'unlock_achievement',
    category: 'gamification',
    label: achievementTitle,
    value: 1
  })
}

export const trackBookmarkAdd = (type: 'course' | 'lesson', itemId: string) => {
  event({
    action: 'add_bookmark',
    category: 'engagement',
    label: type,
    value: 1
  })
}

export const trackProfileUpdate = (field: string) => {
  event({
    action: 'update_profile',
    category: 'user',
    label: field,
    value: 1
  })
}

export const trackOnboardingComplete = (timeToComplete: number) => {
  event({
    action: 'complete_onboarding',
    category: 'conversion',
    label: 'wizard',
    value: timeToComplete
  })
}

export const trackStreakMilestone = (streakDays: number) => {
  event({
    action: 'streak_milestone',
    category: 'gamification',
    label: `${streakDays}_days`,
    value: streakDays
  })
}

export const trackSearch = (searchQuery: string, resultsCount: number) => {
  event({
    action: 'search',
    category: 'engagement',
    label: searchQuery,
    value: resultsCount
  })
}

export const trackNewsletterSignup = (source: string) => {
  event({
    action: 'newsletter_signup',
    category: 'conversion',
    label: source,
    value: 1
  })
}

export const trackContactSubmit = (topic: string) => {
  event({
    action: 'contact_submit',
    category: 'engagement',
    label: topic,
    value: 1
  })
}

export const trackDownload = (resourceType: string, resourceId: string) => {
  event({
    action: 'download',
    category: 'content',
    label: resourceType,
    value: 1
  })
}

export const trackSocialShare = (platform: string, contentType: string) => {
  event({
    action: 'social_share',
    category: 'engagement',
    label: `${platform}_${contentType}`,
    value: 1
  })
}

export const trackError = (errorMessage: string, errorType: string) => {
  event({
    action: 'error',
    category: 'technical',
    label: errorType,
    value: 0
  })
}

// User timing tracking
export const trackTiming = (name: string, value: number, category?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'timing_complete', {
      name: name,
      value: value,
      event_category: category || 'load'
    })
  }
}

// E-commerce tracking (for potential premium features)
export const trackPurchase = (transactionId: string, value: number, items: any[]) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: 'USD',
      items: items
    })
  }
}

// User properties
export const setUserProperties = (userId: string, properties: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('set', 'user_properties', {
      user_id: userId,
      ...properties
    })
  }
}

// Initialize with user data
export const initializeAnalytics = (userId: string, userProfile?: any) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      user_id: userId,
    })
    
    if (userProfile) {
      setUserProperties(userId, {
        skill_level: userProfile.experience_level,
        profile_completeness: userProfile.profile_completeness,
        total_courses: userProfile.total_courses_enrolled,
        total_lessons: userProfile.total_lessons_completed
      })
    }
  }
}

// Type declarations for gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'set' | 'event',
      targetId: string,
      config?: Record<string, any>
    ) => void
  }
}
