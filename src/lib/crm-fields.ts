// Standardized CRM reporting fields mapping layer
// Centralizes all field mapping logic for consistent analytics and segmentation

// Standard UTM and analytics fields
export interface StandardReportingFields {
  source?: string
  medium?: string
  campaign?: string
  content?: string
  term?: string
  referrer?: string
  landing_page?: string
  trigger?: string
  lead_type?: string
  lifecycleStage?: string
  consentSource?: string
  quiz_type?: string
  personality_type?: string
  recommended_course?: string
  course_interest?: string
  last_engagement_at?: string
  last_engagement_type?: string
}

// Segmentation fields for CRM automation
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

// Field mapping constants
export const FIELD_MAPPINGS = {
  // Standard UTM fields
  UTM_SOURCE: 'source',
  UTM_MEDIUM: 'medium',
  UTM_CAMPAIGN: 'campaign',
  UTM_CONTENT: 'content',
  UTM_TERM: 'term',
  
  // Engagement fields
  REFERRER: 'referrer',
  LANDING_PAGE: 'landing_page',
  TRIGGER: 'trigger',
  
  // Lead classification
  LEAD_TYPE: 'lead_type',
  LIFECYCLE_STAGE: 'lifecycleStage',
  CONSENT_SOURCE: 'consentSource',
  
  // Quiz and assessment fields
  QUIZ_TYPE: 'quiz_type',
  PERSONALITY_TYPE: 'personality_type',
  RECOMMENDED_COURSE: 'recommended_course',
  COURSE_INTEREST: 'course_interest',
  
  // Engagement tracking
  LAST_ENGAGEMENT_AT: 'last_engagement_at',
  LAST_ENGAGEMENT_TYPE: 'last_engagement_type',
  
  // Segmentation fields
  EXPERIENCE_LEVEL: 'experience_level',
  FINANCIAL_GOAL: 'financial_goal',
  LEAD_SOURCE: 'lead_source',
  ENGAGEMENT_DEPTH: 'engagement_depth'
} as const

// Standard values for consistent reporting
export const STANDARD_VALUES = {
  // Source values
  SOURCES: {
    DIRECT: 'direct',
    ORGANIC: 'organic',
    REFERRAL: 'referral',
    PAID_SEARCH: 'paid_search',
    PAID_SOCIAL: 'paid_social',
    EMAIL: 'email',
    SOCIAL: 'social',
    WEBSITE: 'website'
  } as const,
  
  // Medium values
  MEDIUMS: {
    ORGANIC_SEARCH: 'organic_search',
    PAID_SEARCH: 'paid_search',
    ORGANIC_SOCIAL: 'organic_social',
    PAID_SOCIAL: 'paid_social',
    EMAIL: 'email',
    REFERRAL: 'referral',
    DIRECT: 'direct',
    CPC: 'cpc',
    CPM: 'cpm'
  } as const,
  
  // Lead type values
  LEAD_TYPES: {
    NEWSLETTER: 'newsletter',
    QUIZ_LEAD: 'quiz_lead',
    COURSE_INTEREST: 'course_interest',
    ASSESSMENT_REQUEST: 'assessment_request',
    CONTACT_REQUEST: 'contact_request',
    DEMO_REQUEST: 'demo_request',
    EXIT_INTENT: 'exit_intent',
    PROFILE_COMPLETE: 'profile_complete'
  } as const,
  
  // Trigger values
  TRIGGERS: {
    QUIZ_START: 'quiz_start',
    QUIZ_COMPLETION: 'quiz_completion',
    PERSONALITY_RESULTS: 'personality_results',
    COURSE_VIEW: 'course_view',
    NEWSLETTER_SIGNUP: 'newsletter_signup',
    EXIT_INTENT: 'exit_intent',
    PROFILE_UPDATE: 'profile_update',
    CONTACT_FORM: 'contact_form'
  } as const,
  
  // Quiz types
  QUIZ_TYPES: {
    FINANCIAL_PERSONALITY: 'financial_personality',
    RETIREMENT_READINESS: 'retirement_readiness',
    INVESTMENT_KNOWLEDGE: 'investment_knowledge',
    RISK_TOLERANCE: 'risk_tolerance',
    GENERAL_FINANCE: 'general_finance'
  } as const,
  
  // Experience levels
  EXPERIENCE_LEVELS: {
    BEGINNER: 'beginner',
    INTERMEDIATE: 'intermediate',
    ADVANCED: 'advanced',
    UNKNOWN: 'unknown'
  } as const,
  
  // Engagement depth
  ENGAGEMENT_DEPTH: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high'
  } as const
} as const

// Field mapping utilities
export class CRMFieldMapper {
  
  /**
   * Map URL parameters to standard reporting fields
   */
  static mapUrlParams(urlParams: Record<string, string>): Partial<StandardReportingFields> {
    const mapped: Partial<StandardReportingFields> = {}
    
    // Map UTM parameters
    if (urlParams.utm_source) mapped.source = urlParams.utm_source
    if (urlParams.utm_medium) mapped.medium = urlParams.utm_medium
    if (urlParams.utm_campaign) mapped.campaign = urlParams.utm_campaign
    if (urlParams.utm_content) mapped.content = urlParams.utm_content
    if (urlParams.utm_term) mapped.term = urlParams.utm_term
    
    // Map other common parameters
    if (urlParams.referrer) mapped.referrer = urlParams.referrer
    if (urlParams.landing_page) mapped.landing_page = urlParams.landing_page
    if (urlParams.trigger) mapped.trigger = urlParams.trigger
    
    return mapped
  }
  
  /**
   * Map quiz results to segmentation fields
   */
  static mapQuizResults(quizType: string, results: Record<string, any>): Partial<SegmentationFields> {
    const segmentation: Partial<SegmentationFields> = {
      quiz_results: results
    }
    
    // Map personality type if present
    if (results.personality_type) {
      segmentation.personality_type = results.personality_type
    }
    
    // Map experience level from quiz results
    if (results.experience_level) {
      segmentation.experience_level = this.normalizeExperienceLevel(results.experience_level)
    }
    
    // Map financial goal if present
    if (results.financial_goal) {
      segmentation.financial_goal = results.financial_goal
    }
    
    return segmentation
  }
  
  /**
   * Map course engagement to reporting fields
   */
  static mapCourseEngagement(courseSlug: string, engagementType: 'viewed' | 'started' | 'completed'): Partial<StandardReportingFields> {
    return {
      course_interest: courseSlug,
      last_engagement_type: `course_${engagementType}`,
      trigger: engagementType === 'viewed' ? STANDARD_VALUES.TRIGGERS.COURSE_VIEW : 
               engagementType === 'started' ? 'course_start' : 'course_completion'
    }
  }
  
  /**
   * Normalize experience level values
   */
  static normalizeExperienceLevel(level: string): 'beginner' | 'intermediate' | 'advanced' | 'unknown' {
    const normalized = level.toLowerCase().trim()
    
    if (normalized.includes('beginner') || normalized.includes('novice') || normalized.includes('new')) {
      return 'beginner'
    }
    if (normalized.includes('intermediate') || normalized.includes('some') || normalized.includes('moderate')) {
      return 'intermediate'
    }
    if (normalized.includes('advanced') || normalized.includes('expert') || normalized.includes('experienced')) {
      return 'advanced'
    }
    
    return 'unknown'
  }
  
  /**
   * Calculate engagement depth based on user activity
   */
  static calculateEngagementDepth(activities: {
    quizzesCompleted?: number
    coursesViewed?: number
    coursesStarted?: number
    coursesCompleted?: number
    profileCompleted?: boolean
    newsletterSubscribed?: boolean
  }): 'low' | 'medium' | 'high' {
    let score = 0
    
    // Quiz engagement
    if (activities.quizzesCompleted) score += activities.quizzesCompleted * 2
    
    // Course engagement
    if (activities.coursesViewed) score += activities.coursesViewed
    if (activities.coursesStarted) score += activities.coursesStarted * 3
    if (activities.coursesCompleted) score += activities.coursesCompleted * 5
    
    // Profile engagement
    if (activities.profileCompleted) score += 3
    if (activities.newsletterSubscribed) score += 1
    
    // Calculate depth
    if (score >= 10) return 'high'
    if (score >= 4) return 'medium'
    return 'low'
  }
  
  /**
   * Map form submission to lead type and trigger
   */
  static mapFormSubmission(formType: 'newsletter' | 'contact' | 'assessment' | 'demo' | 'exit_intent'): {
    lead_type?: string
    trigger?: string
    source?: string
  } {
    const mapping = {
      newsletter: {
        lead_type: STANDARD_VALUES.LEAD_TYPES.NEWSLETTER,
        trigger: STANDARD_VALUES.TRIGGERS.NEWSLETTER_SIGNUP,
        source: STANDARD_VALUES.SOURCES.WEBSITE
      },
      contact: {
        lead_type: STANDARD_VALUES.LEAD_TYPES.CONTACT_REQUEST,
        trigger: STANDARD_VALUES.TRIGGERS.CONTACT_FORM,
        source: STANDARD_VALUES.SOURCES.WEBSITE
      },
      assessment: {
        lead_type: STANDARD_VALUES.LEAD_TYPES.ASSESSMENT_REQUEST,
        trigger: STANDARD_VALUES.TRIGGERS.CONTACT_FORM,
        source: STANDARD_VALUES.SOURCES.WEBSITE
      },
      demo: {
        lead_type: STANDARD_VALUES.LEAD_TYPES.DEMO_REQUEST,
        trigger: STANDARD_VALUES.TRIGGERS.CONTACT_FORM,
        source: STANDARD_VALUES.SOURCES.WEBSITE
      },
      exit_intent: {
        lead_type: STANDARD_VALUES.LEAD_TYPES.EXIT_INTENT,
        trigger: STANDARD_VALUES.TRIGGERS.EXIT_INTENT,
        source: STANDARD_VALUES.SOURCES.WEBSITE
      }
    }
    
    return mapping[formType] || {}
  }
  
  /**
   * Merge reporting fields with precedence
   * Later fields override earlier fields
   */
  static mergeReportingFields(...fields: Partial<StandardReportingFields>[]): StandardReportingFields {
    return fields.reduce((merged, current) => ({
      ...merged,
      ...current
    }), {} as StandardReportingFields)
  }
  
  /**
   * Merge segmentation fields with precedence
   */
  static mergeSegmentationFields(...fields: Partial<SegmentationFields>[]): SegmentationFields {
    return fields.reduce((merged, current) => ({
      ...merged,
      ...current,
      demographics: {
        ...merged.demographics,
        ...current.demographics
      },
      quiz_results: {
        ...merged.quiz_results,
        ...current.quiz_results
      }
    }), {} as SegmentationFields)
  }
  
  /**
   * Prepare fields for CRM API (handle native vs customAttributes)
   */
  static prepareForCRM(
    reporting: Partial<StandardReportingFields>,
    segmentation: Partial<SegmentationFields>
  ): {
    nativeFields: Record<string, any>
    customAttributes: Record<string, any>
  } {
    const nativeFields: Record<string, any> = {}
    const customAttributes: Record<string, any> = {}
    
    // Native JanaGana fields
    const nativeFieldNames = ['lifecycleStage', 'marketingConsent', 'consentTimestamp', 'consentSource', 'doNotContact']
    
    // Separate native and custom fields
    Object.entries({ ...reporting, ...segmentation }).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (nativeFieldNames.includes(key)) {
          nativeFields[key] = value
        } else {
          customAttributes[key] = value
        }
      }
    })
    
    return { nativeFields, customAttributes }
  }
}

// Convenience functions for common field mappings
export const mapNewsletterSignup = (email: string, source?: string) => {
  return CRMFieldMapper.mergeReportingFields(
    CRMFieldMapper.mapFormSubmission('newsletter'),
    { source: source || STANDARD_VALUES.SOURCES.WEBSITE }
  )
}

export const mapQuizEngagement = (quizType: string, results: Record<string, any>) => {
  const reporting = {
    quiz_type: quizType,
    trigger: STANDARD_VALUES.TRIGGERS.QUIZ_COMPLETION,
    lead_type: STANDARD_VALUES.LEAD_TYPES.QUIZ_LEAD
  }
  
  const segmentation = CRMFieldMapper.mapQuizResults(quizType, results)
  
  return { reporting, segmentation }
}

export const mapCourseInterest = (courseSlug: string, engagementType: 'viewed' | 'started' | 'completed') => {
  return CRMFieldMapper.mapCourseEngagement(courseSlug, engagementType)
}
