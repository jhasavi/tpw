// Advanced segmentation system for The Purple Wings

export interface SegmentCriteria {
  // Demographic segments
  ageRange?: string[]
  location?: string[]
  profession?: string[]
  
  // Behavioral segments
  engagementLevel?: 'high' | 'medium' | 'low'
  interests?: string[]
  learningStyle?: string[]
  
  // Source segments
  source?: string[]
  referralSource?: string[]
  
  // Activity segments
  lastActivity?: string // '7days', '30days', '90days', 'older'
  frequency?: string // 'daily', 'weekly', 'monthly', 'rare'
  
  // Lead score segments
  leadScoreRange?: {
    min?: number
    max?: number
  }
  leadGrades?: ('A' | 'B' | 'C' | 'D' | 'F')[]
  
  // Custom segments
  tags?: string[]
  customAttributes?: Record<string, any>
}

export interface Segment {
  id: string
  name: string
  description: string
  criteria: SegmentCriteria
  size: number
  createdAt: Date
  updatedAt: Date
  isActive: boolean
}

export interface SegmentResult {
  segment: Segment
  contacts: any[]
  insights: {
    demographics: Record<string, number>
    behavior: Record<string, number>
    engagement: Record<string, number>
  }
}

// Predefined segments for The Purple Wings
export const PREDEFINED_SEGMENTS: Omit<Segment, 'id' | 'size' | 'createdAt' | 'updatedAt' | 'isActive'>[] = [
  {
    name: 'High-Value Prospects',
    description: 'Leads with high engagement and lead scores',
    criteria: {
      leadScoreRange: { min: 80 },
      engagementLevel: 'high',
      lastActivity: '30days'
    }
  },
  {
    name: 'New Subscribers',
    description: 'Recent newsletter subscribers',
    criteria: {
      tags: ['newsletter-subscriber'],
      lastActivity: '7days'
    }
  },
  {
    name: 'Course Interested',
    description: 'Users who have shown interest in courses',
    criteria: {
      interests: ['courses', 'learning'],
      engagementLevel: 'medium'
    }
  },
  {
    name: 'Local Massachusetts',
    description: 'Contacts in Massachusetts area',
    criteria: {
      location: ['MA', 'Massachusetts', 'Boston', 'Needham']
    }
  },
  {
    name: 'Financial Professionals',
    description: 'Users in finance-related professions',
    criteria: {
      profession: ['finance', 'banking', 'investment', 'accounting']
    }
  },
  {
    name: 'Inactive Leads',
    description: 'Leads that need re-engagement',
    criteria: {
      lastActivity: '90days',
      engagementLevel: 'low'
    }
  },
  {
    name: 'Quiz Takers',
    description: 'Users who have completed personality quiz',
    criteria: {
      interests: ['quiz', 'assessment'],
      tags: ['quiz-completed']
    }
  },
  {
    name: 'Event Attendees',
    description: 'Users who have attended events',
    criteria: {
      tags: ['event-attended'],
      interests: ['events', 'networking']
    }
  }
]

// Segment matching engine
export class SegmentationEngine {
  private segments: Map<string, Segment> = new Map()

  constructor() {
    // Initialize predefined segments
    this.initializePredefinedSegments()
  }

  private initializePredefinedSegments() {
    PREDEFINED_SEGMENTS.forEach((segmentData, index) => {
      const segment: Segment = {
        ...segmentData,
        id: `segment-${index + 1}`,
        size: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true
      }
      this.segments.set(segment.id, segment)
    })
  }

  // Create a new custom segment
  createSegment(name: string, description: string, criteria: SegmentCriteria): Segment {
    const segment: Segment = {
      id: `segment-${Date.now()}`,
      name,
      description,
      criteria,
      size: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true
    }

    this.segments.set(segment.id, segment)
    return segment
  }

  // Update segment criteria
  updateSegment(id: string, criteria: Partial<SegmentCriteria>): Segment | null {
    const segment = this.segments.get(id)
    if (!segment) return null

    const updatedSegment = {
      ...segment,
      criteria: { ...segment.criteria, ...criteria },
      updatedAt: new Date()
    }

    this.segments.set(id, updatedSegment)
    return updatedSegment
  }

  // Get all segments
  getAllSegments(): Segment[] {
    return Array.from(this.segments.values()).filter(s => s.isActive)
  }

  // Get segment by ID
  getSegment(id: string): Segment | null {
    return this.segments.get(id) || null
  }

  // Match contact against segment criteria
  matchContact(contact: any, criteria: SegmentCriteria): boolean {
    // Demographic matching
    if (criteria.ageRange && criteria.ageRange.length > 0) {
      if (!contact.ageRange || !criteria.ageRange.includes(contact.ageRange)) {
        return false
      }
    }

    if (criteria.location && criteria.location.length > 0) {
      if (!contact.location || !criteria.location.some(loc => 
        contact.location.toLowerCase().includes(loc.toLowerCase()))) {
        return false
      }
    }

    if (criteria.profession && criteria.profession.length > 0) {
      if (!contact.profession || !criteria.profession.some(prof => 
        contact.profession.toLowerCase().includes(prof.toLowerCase()))) {
        return false
      }
    }

    // Behavioral matching
    if (criteria.engagementLevel) {
      const engagementScore = this.calculateEngagementScore(contact)
      const levelThresholds = {
        high: 70,
        medium: 40,
        low: 0
      }
      if (engagementScore < levelThresholds[criteria.engagementLevel]) {
        return false
      }
    }

    if (criteria.interests && criteria.interests.length > 0) {
      if (!contact.interests || !criteria.interests.some(interest => 
        contact.interests.includes(interest))) {
        return false
      }
    }

    // Source matching
    if (criteria.source && criteria.source.length > 0) {
      if (!contact.source || !criteria.source.includes(contact.source)) {
        return false
      }
    }

    // Activity matching
    if (criteria.lastActivity) {
      const daysSinceActivity = this.getDaysSinceLastActivity(contact)
      const thresholds: Record<string, number> = {
        '7days': 7,
        '30days': 30,
        '90days': 90,
        'older': 91
      }
      if (criteria.lastActivity === 'older' && daysSinceActivity < thresholds[criteria.lastActivity]) {
        return false
      } else if (criteria.lastActivity !== 'older' && daysSinceActivity > thresholds[criteria.lastActivity]) {
        return false
      }
    }

    // Lead score matching
    if (criteria.leadScoreRange) {
      if (!contact.leadScore) return false
      const score = contact.leadScore.score
      if (criteria.leadScoreRange.min && score < criteria.leadScoreRange.min) return false
      if (criteria.leadScoreRange.max && score > criteria.leadScoreRange.max) return false
    }

    if (criteria.leadGrades && criteria.leadGrades.length > 0) {
      if (!contact.leadScore || !criteria.leadGrades.includes(contact.leadScore.grade)) {
        return false
      }
    }

    // Tags matching
    if (criteria.tags && criteria.tags.length > 0) {
      if (!contact.tags || !criteria.tags.every(tag => contact.tags.includes(tag))) {
        return false
      }
    }

    return true
  }

  // Get contacts for a segment
  async getSegmentContacts(segmentId: string): Promise<SegmentResult> {
    const segment = this.segments.get(segmentId)
    if (!segment) {
      throw new Error('Segment not found')
    }

    try {
      // Fetch contacts from CRM
      const response = await fetch(`${process.env.JANAGANA_API_URL}/plugin/crm/contacts`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.JANAGANA_API_KEY}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch contacts from CRM')
      }

      const data = await response.json()
      const allContacts = data.contacts || []

      // Filter contacts based on segment criteria
      const matchingContacts = allContacts.filter(contact => 
        this.matchContact(contact, segment.criteria)
      )

      // Generate insights
      const insights = this.generateInsights(matchingContacts)

      // Update segment size
      segment.size = matchingContacts.length
      segment.updatedAt = new Date()
      this.segments.set(segmentId, segment)

      return {
        segment,
        contacts: matchingContacts,
        insights
      }
    } catch (error) {
      console.error('Error getting segment contacts:', error)
      throw error
    }
  }

  // Calculate engagement score for a contact
  private calculateEngagementScore(contact: any): number {
    let score = 0
    
    // Email engagement
    score += (contact.emailOpens || 0) * 2
    score += (contact.emailClicks || 0) * 5
    
    // Website engagement
    score += (contact.websiteVisits || 0) * 3
    score += (contact.pagesViewed || 0) * 2
    
    // Behavioral engagement
    score += (contact.quizAttempts || 0) * 10
    score += (contact.courseEnrollments || 0) * 15
    score += (contact.downloads || 0) * 5
    score += (contact.eventRegistrations || 0) * 10
    
    return Math.min(score, 100)
  }

  // Get days since last activity
  private getDaysSinceLastActivity(contact: any): number {
    if (!contact.lastActivityAt) return 999
    const lastActivity = new Date(contact.lastActivityAt)
    const now = new Date()
    return Math.floor((now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24))
  }

  // Generate insights for a segment
  private generateInsights(contacts: any[]) {
    const insights = {
      demographics: {} as Record<string, number>,
      behavior: {} as Record<string, number>,
      engagement: {} as Record<string, number>
    }

    contacts.forEach(contact => {
      // Demographics
      if (contact.location) {
        insights.demographics[contact.location] = (insights.demographics[contact.location] || 0) + 1
      }
      if (contact.profession) {
        insights.demographics[contact.profession] = (insights.demographics[contact.profession] || 0) + 1
      }

      // Behavior
      if (contact.source) {
        insights.behavior[contact.source] = (insights.behavior[contact.source] || 0) + 1
      }
      
      // Engagement
      const engagementLevel = this.getEngagementLevel(contact)
      insights.engagement[engagementLevel] = (insights.engagement[engagementLevel] || 0) + 1
    })

    return insights
  }

  private getEngagementLevel(contact: any): string {
    const score = this.calculateEngagementScore(contact)
    if (score >= 70) return 'high'
    if (score >= 40) return 'medium'
    return 'low'
  }
}

// Singleton instance
export const segmentationEngine = new SegmentationEngine()
