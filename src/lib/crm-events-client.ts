// Client-side CRM activity/event logging layer
// Handles structured event logging to JanaGana CRM via API calls
// Safe for use in client components

// Standardized event types (same as server-side)
export enum EventType {
  QUIZ_STARTED = 'quiz_started',
  QUIZ_COMPLETED = 'quiz_completed',
  PERSONALITY_RESULT_GENERATED = 'personality_result_generated',
  RETIREMENT_QUIZ_COMPLETED = 'retirement_quiz_completed',
  RECOMMENDATION_SHOWN = 'recommendation_shown',
  COURSE_VIEWED = 'course_viewed',
  COURSE_STARTED = 'course_started',
  LESSON_COMPLETED = 'lesson_completed',
  COURSE_COMPLETED = 'course_completed',
  PROFILE_UPDATED = 'profile_updated',
  NEWSLETTER_SUBSCRIBED = 'newsletter_subscribed',
  EXIT_INTENT_SUBMITTED = 'exit_intent_submitted',
  ASSESSMENT_REQUEST_SUBMITTED = 'assessment_request_submitted',
  CONTACT_REQUEST_SUBMITTED = 'contact_request_submitted',
  DEMO_REQUEST_SUBMITTED = 'demo_request_submitted'
}

// Standardized reporting fields (UTM and analytics)
export interface ReportingFields {
  source?: string
  medium?: string
  campaign?: string
  content?: string
  term?: string
  referrer?: string
  landing_page?: string
  trigger?: string
  lead_type?: string
  quiz_type?: string
  personality_type?: string
  recommended_course?: string
  course_interest?: string
  score?: string
  last_engagement_at?: string
  last_engagement_type?: string
}

// Segmentation fields
export interface SegmentationFields {
  experience_level?: 'beginner' | 'intermediate' | 'advanced' | 'unknown'
  financial_goal?: string
  course_interest?: string
  lead_source?: string
  engagement_depth?: 'low' | 'medium' | 'high'
  personality_type?: string
  quiz_results?: Record<string, any>
  demographics?: {
    age_range?: string
    location?: string
    profession?: string
  }
}

// Base event schema
export interface CRMEvent {
  id: string
  timestamp: string
  eventType: EventType
  userId: string
  email: string
  route?: string
  page?: string
  context?: Record<string, any>
  reporting?: ReportingFields
  segmentation?: SegmentationFields
  sessionId?: string
  userAgent?: string
  ipAddress?: string
}

// Generate event ID
function generateEventId(): string {
  return `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Client-side CRM event logger class
export class CRMEventLoggerClient {
  private static instance: CRMEventLoggerClient

  static getInstance(): CRMEventLoggerClient {
    if (!CRMEventLoggerClient.instance) {
      CRMEventLoggerClient.instance = new CRMEventLoggerClient()
    }
    return CRMEventLoggerClient.instance
  }

  /**
   * Log event via API route (client-side safe)
   */
  async logEvent(event: Partial<CRMEvent>): Promise<any> {
    const eventData: CRMEvent = {
      id: generateEventId(),
      timestamp: new Date().toISOString(),
      eventType: event.eventType!,
      userId: event.userId!,
      email: event.email!,
      route: event.route,
      page: event.page,
      context: event.context,
      reporting: event.reporting,
      segmentation: event.segmentation,
      sessionId: event.sessionId,
      userAgent: event.userAgent,
      ipAddress: event.ipAddress
    }

    try {
      const response = await fetch('/api/crm/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData)
      })

      if (!response.ok) {
        throw new Error(`CRM event logging failed: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('CRM event logging error:', error)
      throw error
    }
  }

  /**
   * Get tags for event type
   */
  getTagsForEventType(eventType: EventType): string[] {
    const baseTags = ['engaged']
    
    switch (eventType) {
      case EventType.QUIZ_STARTED:
        return [...baseTags, 'quiz-started']
      case EventType.QUIZ_COMPLETED:
        return [...baseTags, 'quiz-completed']
      case EventType.PERSONALITY_RESULT_GENERATED:
        return [...baseTags, 'personality-assessed']
      case EventType.RETIREMENT_QUIZ_COMPLETED:
        return [...baseTags, 'retirement-assessed']
      case EventType.RECOMMENDATION_SHOWN:
        return [...baseTags, 'recommendation-viewed']
      case EventType.COURSE_VIEWED:
        return [...baseTags, 'course-interested']
      case EventType.COURSE_STARTED:
        return [...baseTags, 'course-enrolled']
      case EventType.LESSON_COMPLETED:
        return [...baseTags, 'lesson-completed']
      case EventType.COURSE_COMPLETED:
        return [...baseTags, 'course-graduated']
      case EventType.PROFILE_UPDATED:
        return [...baseTags, 'profile-complete']
      case EventType.NEWSLETTER_SUBSCRIBED:
        return [...baseTags, 'newsletter-subscriber']
      case EventType.EXIT_INTENT_SUBMITTED:
        return [...baseTags, 'exit-intent-capture']
      case EventType.ASSESSMENT_REQUEST_SUBMITTED:
        return [...baseTags, 'assessment-request']
      case EventType.CONTACT_REQUEST_SUBMITTED:
        return [...baseTags, 'contact-request']
      case EventType.DEMO_REQUEST_SUBMITTED:
        return [...baseTags, 'demo-request']
      default:
        return baseTags
    }
  }
}

// Export singleton instance
export const crmEventLoggerClient = CRMEventLoggerClient.getInstance()

// Helper functions for common event types
export const logQuizStarted = (userId: string, email: string, quizType: string, context?: Record<string, any>) => {
  return crmEventLoggerClient.logEvent({
    eventType: EventType.QUIZ_STARTED,
    userId,
    email,
    context: { quizType, ...context },
    reporting: { quiz_type: quizType }
  })
}

export const logQuizCompleted = (userId: string, email: string, quizType: string, score?: number, context?: Record<string, any>) => {
  return crmEventLoggerClient.logEvent({
    eventType: EventType.QUIZ_COMPLETED,
    userId,
    email,
    context: { quizType, score, ...context },
    reporting: { quiz_type: quizType }
  })
}

export const logRetirementQuizCompleted = (userId: string, email: string, score?: number, context?: Record<string, any>) => {
  return crmEventLoggerClient.logEvent({
    eventType: EventType.RETIREMENT_QUIZ_COMPLETED,
    userId,
    email,
    context: { score, ...context },
    reporting: { score: score?.toString() }
  })
}

export const logPersonalityResult = (userId: string, email: string, personalityType: string, context?: Record<string, any>) => {
  return crmEventLoggerClient.logEvent({
    eventType: EventType.PERSONALITY_RESULT_GENERATED,
    userId,
    email,
    context: { personalityType, ...context },
    reporting: { personality_type: personalityType },
    segmentation: { personality_type: personalityType }
  })
}

export const logCourseViewed = (userId: string, email: string, courseSlug: string, context?: Record<string, any>) => {
  return crmEventLoggerClient.logEvent({
    eventType: EventType.COURSE_VIEWED,
    userId,
    email,
    context: { courseSlug, ...context },
    reporting: { course_interest: courseSlug }
  })
}

export const logCourseStarted = (userId: string, email: string, courseSlug: string, context?: Record<string, any>) => {
  return crmEventLoggerClient.logEvent({
    eventType: EventType.COURSE_STARTED,
    userId,
    email,
    context: { courseSlug, ...context },
    reporting: { course_interest: courseSlug }
  })
}

export const logLessonCompleted = (userId: string, email: string, lessonId: string, courseSlug: string, context?: Record<string, any>) => {
  return crmEventLoggerClient.logEvent({
    eventType: EventType.LESSON_COMPLETED,
    userId,
    email,
    context: { lessonId, courseSlug, ...context },
    reporting: { course_interest: courseSlug }
  })
}

export const logCourseCompleted = (userId: string, email: string, courseSlug: string, context?: Record<string, any>) => {
  return crmEventLoggerClient.logEvent({
    eventType: EventType.COURSE_COMPLETED,
    userId,
    email,
    context: { courseSlug, ...context },
    reporting: { course_interest: courseSlug }
  })
}

export const logProfileUpdated = (userId: string, email: string, updatedFields: string[], context?: Record<string, any>) => {
  return crmEventLoggerClient.logEvent({
    eventType: EventType.PROFILE_UPDATED,
    userId,
    email,
    context: { updatedFields, ...context }
  })
}

export const logRecommendationShown = (userId: string, email: string, recommendedCourse: string, context?: Record<string, any>) => {
  return crmEventLoggerClient.logEvent({
    eventType: EventType.RECOMMENDATION_SHOWN,
    userId,
    email,
    context: { recommendedCourse, ...context },
    reporting: { recommended_course: recommendedCourse }
  })
}

export const logNewsletterSubscribed = (userId: string, email: string, source?: string, context?: Record<string, any>) => {
  return crmEventLoggerClient.logEvent({
    eventType: EventType.NEWSLETTER_SUBSCRIBED,
    userId,
    email,
    context: { source, ...context },
    reporting: { source }
  })
}

export const logExitIntentSubmitted = (userId: string, email: string, leadType: string, context?: Record<string, any>) => {
  return crmEventLoggerClient.logEvent({
    eventType: EventType.EXIT_INTENT_SUBMITTED,
    userId,
    email,
    context: { leadType, ...context },
    reporting: { lead_type: leadType }
  })
}

export const logAssessmentRequestSubmitted = (userId: string, email: string, context?: Record<string, any>) => {
  return crmEventLoggerClient.logEvent({
    eventType: EventType.ASSESSMENT_REQUEST_SUBMITTED,
    userId,
    email,
    context
  })
}

export const logContactRequestSubmitted = (userId: string, email: string, context?: Record<string, any>) => {
  return crmEventLoggerClient.logEvent({
    eventType: EventType.CONTACT_REQUEST_SUBMITTED,
    userId,
    email,
    context
  })
}

export const logDemoRequestSubmitted = (userId: string, email: string, context?: Record<string, any>) => {
  return crmEventLoggerClient.logEvent({
    eventType: EventType.DEMO_REQUEST_SUBMITTED,
    userId,
    email,
    context
  })
}
