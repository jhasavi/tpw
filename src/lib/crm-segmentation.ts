// CRM segmentation support infrastructure
// Provides segmentation logic and automation triggers for JanaGana CRM

import { crmClient } from '@/lib/crm-retry-server'
import { CRMFieldMapper } from './crm-fields'
import { SegmentationFields, StandardReportingFields } from './crm-fields'

// Segmentation rules and automation triggers
export interface SegmentationRule {
  name: string
  conditions: SegmentationCondition[]
  actions: SegmentationAction[]
  priority: number
}

export interface SegmentationCondition {
  field: string
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than' | 'in' | 'not_in' | 'exists'
  value: any
}

export interface SegmentationAction {
  type: 'add_tag' | 'remove_tag' | 'update_lifecycle' | 'add_to_workflow' | 'update_field'
  parameters: Record<string, any>
}

// Predefined segmentation rules
export const SEGMENTATION_RULES: SegmentationRule[] = [
  {
    name: 'High Engagement Quiz Completers',
    conditions: [
      { field: 'quiz_results', operator: 'exists', value: null },
      { field: 'engagement_depth', operator: 'equals', value: 'high' }
    ],
    actions: [
      { type: 'add_tag', parameters: { tag: 'high-engagement-quiz' } },
      { type: 'update_lifecycle', parameters: { stage: 'MQL' } }
    ],
    priority: 1
  },
  {
    name: 'Beginner Investors',
    conditions: [
      { field: 'experience_level', operator: 'equals', value: 'beginner' },
      { field: 'quiz_results', operator: 'exists', value: null }
    ],
    actions: [
      { type: 'add_tag', parameters: { tag: 'beginner-investor' } },
      { type: 'add_to_workflow', parameters: { workflow: 'beginner-nurture' } }
    ],
    priority: 2
  },
  {
    name: 'Retirement Planning Ready',
    conditions: [
      { field: 'quiz_results', operator: 'contains', value: 'retirement_readiness' },
      { field: 'financial_goal', operator: 'contains', value: 'retirement' }
    ],
    actions: [
      { type: 'add_tag', parameters: { tag: 'retirement-interested' } },
      { type: 'add_to_workflow', parameters: { workflow: 'retirement-planning' } }
    ],
    priority: 3
  },
  {
    name: 'Course Enthusiasts',
    conditions: [
      { field: 'course_interest', operator: 'exists', value: null },
      { field: 'engagement_depth', operator: 'greater_than', value: 'medium' }
    ],
    actions: [
      { type: 'add_tag', parameters: { tag: 'course-interested' } },
      { type: 'update_lifecycle', parameters: { stage: 'SQL' } }
    ],
    priority: 4
  },
  {
    name: 'Newsletter Subscribers',
    conditions: [
      { field: 'lead_type', operator: 'equals', value: 'newsletter' }
    ],
    actions: [
      { type: 'add_tag', parameters: { tag: 'newsletter-subscriber' } },
      { type: 'add_to_workflow', parameters: { workflow: 'newsletter-nurture' } }
    ],
    priority: 5
  }
]

// Segmentation engine class
export class CRMSegmentationEngine {
  private static instance: CRMSegmentationEngine

  static getInstance(): CRMSegmentationEngine {
    if (!CRMSegmentationEngine.instance) {
      CRMSegmentationEngine.instance = new CRMSegmentationEngine()
    }
    return CRMSegmentationEngine.instance
  }

  /**
   * Process segmentation rules for a contact
   */
  async processSegmentation(contactId: string, segmentation: SegmentationFields, reporting: StandardReportingFields): Promise<void> {
    try {
      const combinedFields = { ...segmentation, ...reporting }
      const applicableRules = this.getApplicableRules(combinedFields)
      
      for (const rule of applicableRules) {
        await this.applyRule(contactId, rule)
      }
    } catch (error) {
      console.error('Failed to process segmentation:', error)
      // Don't throw - segmentation should never block user experience
    }
  }

  /**
   * Get applicable segmentation rules for given data
   */
  private getApplicableRules(fields: Record<string, any>): SegmentationRule[] {
    return SEGMENTATION_RULES
      .filter(rule => this.evaluateConditions(rule.conditions, fields))
      .sort((a, b) => a.priority - b.priority)
  }

  /**
   * Evaluate segmentation conditions
   */
  private evaluateConditions(conditions: SegmentationCondition[], fields: Record<string, any>): boolean {
    return conditions.every(condition => {
      const fieldValue = this.getFieldValue(fields, condition.field)
      
      switch (condition.operator) {
        case 'equals':
          return fieldValue === condition.value
        case 'contains':
          return Array.isArray(fieldValue) 
            ? fieldValue.includes(condition.value)
            : typeof fieldValue === 'string' && fieldValue.includes(condition.value)
        case 'greater_than':
          return Number(fieldValue) > Number(condition.value)
        case 'less_than':
          return Number(fieldValue) < Number(condition.value)
        case 'in':
          return Array.isArray(condition.value) && condition.value.includes(fieldValue)
        case 'not_in':
          return Array.isArray(condition.value) && !condition.value.includes(fieldValue)
        case 'exists':
          return fieldValue !== undefined && fieldValue !== null && fieldValue !== ''
        default:
          return false
      }
    })
  }

  /**
   * Get nested field value
   */
  private getFieldValue(fields: Record<string, any>, fieldPath: string): any {
    return fieldPath.split('.').reduce((obj, key) => obj?.[key], fields)
  }

  /**
   * Apply segmentation rule actions
   */
  private async applyRule(contactId: string, rule: SegmentationRule): Promise<void> {
    const updateData: Record<string, any> = {}

    for (const action of rule.actions) {
      switch (action.type) {
        case 'add_tag':
          updateData.tags = this.mergeTags(updateData.tags, [action.parameters.tag])
          break
        case 'remove_tag':
          updateData.tags = this.removeTags(updateData.tags, [action.parameters.tag])
          break
        case 'update_lifecycle':
          updateData.lifecycleStage = action.parameters.stage
          break
        case 'add_to_workflow':
          // This would integrate with JanaGana workflow API
          console.log(`Adding contact ${contactId} to workflow: ${action.parameters.workflow}`)
          break
        case 'update_field':
          updateData[action.parameters.field] = action.parameters.value
          break
      }
    }

    if (Object.keys(updateData).length > 0) {
      await crmClient.patch(`/plugin/crm/contacts/${contactId}`, updateData)
    }
  }

  /**
   * Merge tags avoiding duplicates
   */
  private mergeTags(existingTags: string[] = [], newTags: string[]): string[] {
    return [...new Set([...existingTags, ...newTags])]
  }

  /**
   * Remove tags from existing list
   */
  private removeTags(existingTags: string[] = [], tagsToRemove: string[]): string[] {
    return existingTags.filter(tag => !tagsToRemove.includes(tag))
  }

  /**
   * Calculate engagement depth based on user activities
   */
  calculateEngagementDepth(activities: {
    quizzesCompleted?: number
    coursesViewed?: number
    coursesStarted?: number
    coursesCompleted?: number
    profileCompleted?: boolean
    newsletterSubscribed?: boolean
    lastActivityAt?: string
  }): 'low' | 'medium' | 'high' {
    let score = 0
    
    // Quiz engagement (high value)
    if (activities.quizzesCompleted) score += activities.quizzesCompleted * 2
    
    // Course engagement
    if (activities.coursesViewed) score += activities.coursesViewed
    if (activities.coursesStarted) score += activities.coursesStarted * 3
    if (activities.coursesCompleted) score += activities.coursesCompleted * 5
    
    // Profile engagement
    if (activities.profileCompleted) score += 3
    if (activities.newsletterSubscribed) score += 1
    
    // Recency bonus
    if (activities.lastActivityAt) {
      const daysSinceActivity = (Date.now() - new Date(activities.lastActivityAt).getTime()) / (1000 * 60 * 60 * 24)
      if (daysSinceActivity < 7) score += 2
      else if (daysSinceActivity < 30) score += 1
    }
    
    // Calculate depth
    if (score >= 10) return 'high'
    if (score >= 4) return 'medium'
    return 'low'
  }

  /**
   * Determine financial goals from quiz results and behavior
   */
  extractFinancialGoals(quizResults: Record<string, any>, courseInterests: string[]): string[] {
    const goals: string[] = []
    
    // Extract from quiz results
    if (quizResults.financial_goals) {
      if (Array.isArray(quizResults.financial_goals)) {
        goals.push(...quizResults.financial_goals)
      } else if (typeof quizResults.financial_goals === 'string') {
        goals.push(quizResults.financial_goals)
      }
    }
    
    // Extract from course interests
    if (courseInterests.includes('retirement')) goals.push('retirement')
    if (courseInterests.includes('investing')) goals.push('wealth_building')
    if (courseInterests.includes('budgeting')) goals.push('budget_management')
    if (courseInterests.includes('tax')) goals.push('tax_optimization')
    
    return [...new Set(goals)] // Remove duplicates
  }

  /**
   * Determine experience level from quiz results and behavior
   */
  determineExperienceLevel(
    quizResults: Record<string, any>, 
    courseHistory: { viewed: string[]; started: string[]; completed: string[] }
  ): 'beginner' | 'intermediate' | 'advanced' | 'unknown' {
    // Check quiz results first
    if (quizResults.experience_level) {
      return CRMFieldMapper.normalizeExperienceLevel(quizResults.experience_level)
    }
    
    // Infer from course history
    const totalCourses = courseHistory.viewed.length + courseHistory.started.length + courseHistory.completed.length
    
    if (courseHistory.completed.length > 0) return 'advanced'
    if (courseHistory.started.length > 0 || totalCourses > 3) return 'intermediate'
    if (totalCourses > 0) return 'beginner'
    
    return 'unknown'
  }

  /**
   * Create segmentation profile from user data
   */
  createSegmentationProfile(userData: {
    quizResults?: Record<string, any>
    courseInterests?: string[]
    courseHistory?: { viewed: string[]; started: string[]; completed: string[] }
    activities?: {
      quizzesCompleted?: number
      coursesViewed?: number
      coursesStarted?: number
      coursesCompleted?: number
      profileCompleted?: boolean
      newsletterSubscribed?: boolean
      lastActivityAt?: string
    }
    demographics?: {
      age_range?: string
      location?: string
      profession?: string
    }
  }): SegmentationFields {
    const activities = userData.activities || {}
    const courseHistory = userData.courseHistory || { viewed: [], started: [], completed: [] }
    
    return {
      experience_level: this.determineExperienceLevel(userData.quizResults || {}, courseHistory),
      financial_goal: this.extractFinancialGoals(userData.quizResults || {}, userData.courseInterests || []).join(', '),
      course_interest: userData.courseInterests?.join(', '),
      engagement_depth: this.calculateEngagementDepth(activities),
      personality_type: userData.quizResults?.personality_type,
      quiz_results: userData.quizResults,
      demographics: userData.demographics
    }
  }
}

// Export singleton instance
export const crmSegmentationEngine = CRMSegmentationEngine.getInstance()

// Convenience functions for common segmentation operations
export const updateContactSegmentation = async (contactId: string, userData: any) => {
  const profile = crmSegmentationEngine.createSegmentationProfile(userData)
  await crmSegmentationEngine.processSegmentation(contactId, profile, {})
}

export const calculateUserEngagement = (activities: any) => {
  return crmSegmentationEngine.calculateEngagementDepth(activities)
}
