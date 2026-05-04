// Shared CRM activity/event logging layer for Phase 2
// Handles structured event logging to JanaGana CRM with standardized fields

import { createClient } from '@/lib/supabase/server'
import { crmClient } from '@/lib/crm-retry-server'
import { crmFailureQueue } from '@/lib/crm-failure-queue'

// Standardized event types
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

// Event deduplication tracking
interface EventDeduplication {
  userId: string
  eventType: EventType
  contextHash?: string
  timestamp: string
}

// Generate event ID
function generateEventId(): string {
  return `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Generate context hash for deduplication
function generateContextHash(context?: Record<string, any>): string {
  if (!context) return ''
  return Buffer.from(JSON.stringify(context)).toString('base64').substr(0, 16)
}

// Main CRM event logger class
export class CRMEventLogger {
  private static instance: CRMEventLogger
  private eventCache = new Map<string, EventDeduplication>()
  private readonly DEDUPLICATION_WINDOW = 5000 // 5 seconds

  static getInstance(): CRMEventLogger {
    if (!CRMEventLogger.instance) {
      CRMEventLogger.instance = new CRMEventLogger()
    }
    return CRMEventLogger.instance
  }

  /**
   * Log an event to CRM
   * Non-blocking with retry/failure handling
   */
  async logEvent(event: Omit<CRMEvent, 'id' | 'timestamp'>): Promise<void> {
    try {
      // Generate event ID and timestamp
      const fullEvent: CRMEvent = {
        ...event,
        id: generateEventId(),
        timestamp: new Date().toISOString()
      }

      // Check for duplicate events
      if (this.isDuplicateEvent(fullEvent)) {
        console.log(`Duplicate CRM event detected and skipped: ${event.eventType} for ${event.email}`)
        return
      }

      // Get user's CRM contact ID
      const contactId = await this.getCRMContactId(event.userId, event.email)
      
      if (!contactId) {
        console.warn(`No CRM contact found for user ${event.userId}, skipping event logging`)
        return
      }

      // Prepare event data for CRM
      const eventData = this.prepareEventData(fullEvent)

      // Log event to CRM (non-blocking)
      await this.logToCRM(contactId, eventData, event)

      // Update deduplication cache
      this.updateDeduplicationCache(fullEvent)

      console.log(`CRM event logged: ${event.eventType} for ${event.email}`)

    } catch (error) {
      console.error(`Failed to log CRM event ${event.eventType}:`, error)
      // Don't throw - CRM logging should never block user experience
    }
  }

  /**
   * Check if event is a duplicate within deduplication window
   */
  private isDuplicateEvent(event: CRMEvent): boolean {
    const cacheKey = `${event.userId}_${event.eventType}`
    const existing = this.eventCache.get(cacheKey)
    
    if (!existing) return false

    const contextHash = generateContextHash(event.context)
    const timeDiff = Date.now() - new Date(existing.timestamp).getTime()

    // Check if same event type within deduplication window
    if (timeDiff < this.DEDUPLICATION_WINDOW) {
      // If context provided, check if context matches
      if (!contextHash || existing.contextHash === contextHash) {
        return true
      }
    }

    return false
  }

  /**
   * Update deduplication cache
   */
  private updateDeduplicationCache(event: CRMEvent): void {
    const cacheKey = `${event.userId}_${event.eventType}`
    const contextHash = generateContextHash(event.context)

    this.eventCache.set(cacheKey, {
      userId: event.userId,
      eventType: event.eventType,
      contextHash,
      timestamp: event.timestamp
    })

    // Clean up old entries
    this.cleanupDeduplicationCache()
  }

  /**
   * Clean up old deduplication cache entries
   */
  private cleanupDeduplicationCache(): void {
    const now = Date.now()
    for (const [key, entry] of this.eventCache.entries()) {
      if (now - new Date(entry.timestamp).getTime() > this.DEDUPLICATION_WINDOW * 2) {
        this.eventCache.delete(key)
      }
    }
  }

  /**
   * Get CRM contact ID for user
   */
  private async getCRMContactId(userId: string, email: string): Promise<string | null> {
    try {
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.admin.getUserById(userId)
      
      // Check app_metadata first (server-controlled)
      let contactId = user?.app_metadata?.janagana_contact_id
      
      if (contactId) {
        return contactId
      }

      // Fallback to email search
      const searchResponse = await crmClient.get(`/plugin/crm/contacts?search=${encodeURIComponent(email)}`)
      if (searchResponse.contacts && searchResponse.contacts.length > 0) {
        return searchResponse.contacts[0].id
      }

      return null
    } catch (error) {
      console.error('Failed to get CRM contact ID:', error)
      return null
    }
  }

  /**
   * Prepare event data for CRM API
   */
  private prepareEventData(event: CRMEvent): Record<string, any> {
    return {
      eventType: event.eventType,
      timestamp: event.timestamp,
      route: event.route,
      page: event.page,
      context: event.context,
      reporting: event.reporting,
      segmentation: event.segmentation,
      sessionId: event.sessionId,
      userAgent: event.userAgent?.substring(0, 500) // Limit length
    }
  }

  /**
   * Log event to CRM with retry handling
   */
  private async logToCRM(contactId: string, eventData: Record<string, any>, originalEvent: Omit<CRMEvent, 'id' | 'timestamp'>): Promise<void> {
    try {
      // Update contact with event data
      const updateData = {
        // Add event to contact's activity timeline
        notes: this.generateActivityNote(eventData),
        // Update reporting fields
        customAttributes: {
          ...eventData.reporting,
          ...eventData.segmentation,
          last_engagement_at: eventData.timestamp,
          last_engagement_type: eventData.eventType
        },
        // Update tags based on event type
        tags: this.generateEventTags(eventData.eventType)
      }

      await crmClient.patch(`/plugin/crm/contacts/${contactId}`, updateData, {
        userId: originalEvent.userId,
        email: originalEvent.email
      })

    } catch (error) {
      // Add to failure queue for retry
      await crmFailureQueue.addFailedRequest({
        id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString(),
        endpoint: `/plugin/crm/contacts/${contactId}`,
        method: 'PATCH',
        payload: eventData,
        error: error instanceof Error ? error.message : 'Unknown error',
        statusCode: error instanceof Error && 'statusCode' in error ? (error as any).statusCode : undefined,
        retryCount: 0,
        userId: originalEvent.userId,
        email: originalEvent.email
      })
      throw error
    }
  }

  /**
   * Generate activity note for CRM timeline
   */
  private generateActivityNote(eventData: Record<string, any>): string {
    const timestamp = new Date(eventData.timestamp).toLocaleString()
    const eventType = eventData.eventType.replace(/_/g, ' ').toUpperCase()
    const route = eventData.route || 'Unknown'
    
    let note = `[${timestamp}] ${eventType}`
    
    if (eventData.context?.quizType) {
      note += ` - Quiz: ${eventData.context.quizType}`
    }
    
    if (eventData.context?.courseSlug) {
      note += ` - Course: ${eventData.context.courseSlug}`
    }
    
    if (eventData.context?.personalityType) {
      note += ` - Personality: ${eventData.context.personalityType}`
    }
    
    note += ` - Route: ${route}`
    
    return note
  }

  /**
   * Generate tags based on event type
   */
  private generateEventTags(eventType: EventType): string[] {
    const baseTags = ['activity-logged']
    
    switch (eventType) {
      case EventType.QUIZ_STARTED:
        return [...baseTags, 'quiz-engaged']
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
        return [...baseTags, 'exit-intent-captured']
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

  /**
   * Get current event count for contact (for tracking engagement)
   */
  private async getEventCount(contactId: string): Promise<number> {
    try {
      const contact = await crmClient.get(`/plugin/crm/contacts/${contactId}`)
      return contact.customAttributes?.event_count || 0
    } catch (error) {
      return 0
    }
  }

  /**
   * Batch log multiple events (for performance optimization)
   */
  async logEvents(events: Omit<CRMEvent, 'id' | 'timestamp'>[]): Promise<void> {
    // Process events in parallel with concurrency limit
    const batchSize = 5
    for (let i = 0; i < events.length; i += batchSize) {
      const batch = events.slice(i, i + batchSize)
      await Promise.allSettled(
        batch.map(event => this.logEvent(event))
      )
    }
  }
}

// Export singleton instance
export const crmEventLogger = CRMEventLogger.getInstance()

// Convenience functions for common event types
export const logQuizStarted = (userId: string, email: string, quizType: string, context?: Record<string, any>) => {
  return crmEventLogger.logEvent({
    eventType: EventType.QUIZ_STARTED,
    userId,
    email,
    context: { quizType, ...context },
    reporting: { quiz_type: quizType }
  })
}

export const logQuizCompleted = (userId: string, email: string, quizType: string, score?: number, context?: Record<string, any>) => {
  return crmEventLogger.logEvent({
    eventType: EventType.QUIZ_COMPLETED,
    userId,
    email,
    context: { quizType, score, ...context },
    reporting: { quiz_type: quizType }
  })
}

export const logPersonalityResult = (userId: string, email: string, personalityType: string, context?: Record<string, any>) => {
  return crmEventLogger.logEvent({
    eventType: EventType.PERSONALITY_RESULT_GENERATED,
    userId,
    email,
    context: { personalityType, ...context },
    reporting: { personality_type: personalityType },
    segmentation: { personality_type: personalityType }
  })
}

export const logCourseViewed = (userId: string, email: string, courseSlug: string, context?: Record<string, any>) => {
  return crmEventLogger.logEvent({
    eventType: EventType.COURSE_VIEWED,
    userId,
    email,
    context: { courseSlug, ...context },
    reporting: { course_interest: courseSlug }
  })
}

export const logCourseStarted = (userId: string, email: string, courseSlug: string, context?: Record<string, any>) => {
  return crmEventLogger.logEvent({
    eventType: EventType.COURSE_STARTED,
    userId,
    email,
    context: { courseSlug, ...context },
    reporting: { course_interest: courseSlug }
  })
}

export const logNewsletterSubscribed = (userId: string, email: string, source?: string, context?: Record<string, any>) => {
  return crmEventLogger.logEvent({
    eventType: EventType.NEWSLETTER_SUBSCRIBED,
    userId,
    email,
    context,
    reporting: { source, lead_type: 'newsletter' }
  })
}

export const logRetirementQuizCompleted = (userId: string, email: string, score: number, context?: Record<string, any>) => {
  return crmEventLogger.logEvent({
    eventType: EventType.RETIREMENT_QUIZ_COMPLETED,
    userId,
    email,
    context: { score, ...context },
    reporting: { quiz_type: 'retirement_readiness', score: score.toString() }
  })
}

export const logRecommendationShown = (userId: string, email: string, recommendedCourse: string, context?: Record<string, any>) => {
  return crmEventLogger.logEvent({
    eventType: EventType.RECOMMENDATION_SHOWN,
    userId,
    email,
    context: { recommendedCourse, ...context },
    reporting: { recommended_course: recommendedCourse }
  })
}

export const logLessonCompleted = (userId: string, email: string, lessonId: string, context?: Record<string, any>) => {
  return crmEventLogger.logEvent({
    eventType: EventType.LESSON_COMPLETED,
    userId,
    email,
    context: { lessonId, ...context },
    reporting: { course_interest: lessonId }
  })
}

export const logCourseCompleted = (userId: string, email: string, courseId: string, context?: Record<string, any>) => {
  return crmEventLogger.logEvent({
    eventType: EventType.COURSE_COMPLETED,
    userId,
    email,
    context: { courseId, ...context },
    reporting: { course_interest: courseId }
  })
}

export const logProfileUpdated = (userId: string, email: string, updatedFields: string[], context?: Record<string, any>) => {
  return crmEventLogger.logEvent({
    eventType: EventType.PROFILE_UPDATED,
    userId,
    email,
    context: { updatedFields, ...context },
    reporting: { lead_type: 'profile_update' }
  })
}

export const logAssessmentRequestSubmitted = (userId: string, email: string, assessmentType: string, context?: Record<string, any>) => {
  return crmEventLogger.logEvent({
    eventType: EventType.ASSESSMENT_REQUEST_SUBMITTED,
    userId,
    email,
    context: { assessmentType, ...context },
    reporting: { lead_type: 'assessment_request' }
  })
}

export const logDemoRequestSubmitted = (userId: string, email: string, context?: Record<string, any>) => {
  return crmEventLogger.logEvent({
    eventType: EventType.DEMO_REQUEST_SUBMITTED,
    userId,
    email,
    context,
    reporting: { lead_type: 'demo_request' }
  })
}

export const logContactRequestSubmitted = (userId: string, email: string, subject: string, context?: Record<string, any>) => {
  return crmEventLogger.logEvent({
    eventType: EventType.CONTACT_REQUEST_SUBMITTED,
    userId,
    email,
    context: { subject, ...context },
    reporting: { lead_type: 'contact_request' }
  })
}
