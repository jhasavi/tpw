// Lead scoring configuration for The Purple Wings

export interface LeadScoringFactors {
  // Demographic factors
  ageRange?: string
  location?: string
  profession?: string
  
  // Engagement factors
  emailOpens: number
  emailClicks: number
  websiteVisits: number
  timeOnSite: number // minutes
  pagesViewed: number
  
  // Behavioral factors
  quizAttempts: number
  courseEnrollments: number
  downloads: number
  eventRegistrations: number
  
  // Source factors
  source: string
  referralSource?: string
  
  // Time factors
  daysSinceFirstContact: number
  daysSinceLastActivity: number
  
  // Additional factors
  tags?: string[]
}

export interface LeadScoreResult {
  score: number
  grade: 'A' | 'B' | 'C' | 'D' | 'F'
  category: 'Hot' | 'Warm' | 'Cool' | 'Cold'
  factors: {
    demographic: number
    engagement: number
    behavioral: number
    recency: number
  }
  recommendations: string[]
}

// Scoring weights
const SCORING_WEIGHTS = {
  demographic: 0.15,
  engagement: 0.35,
  behavioral: 0.30,
  recency: 0.20,
}

// Demographic scoring
const getDemographicScore = (factors: LeadScoringFactors): number => {
  let score = 0
  
  // Age scoring (target demographic: 25-65)
  if (factors.ageRange) {
    const age = parseInt(factors.ageRange)
    if (age >= 25 && age <= 65) score += 20
    else if (age >= 18 && age <= 75) score += 10
  }
  
  // Location scoring (local preference)
  if (factors.location?.includes('MA') || factors.location?.includes('Massachusetts')) {
    score += 15
  } else if (factors.location?.includes('US')) {
    score += 10
  }
  
  // Profession scoring (financial relevance)
  if (factors.profession) {
    const relevantProfessions = ['finance', 'banking', 'investment', 'accounting', 'education']
    if (relevantProfessions.some(prof => factors.profession!.toLowerCase().includes(prof))) {
      score += 15
    }
  }
  
  return Math.min(score, 50) // Cap at 50 points
}

// Engagement scoring
const getEngagementScore = (factors: LeadScoringFactors): number => {
  let score = 0
  
  // Email engagement
  score += Math.min(factors.emailOpens * 2, 20)
  score += Math.min(factors.emailClicks * 5, 25)
  
  // Website engagement
  score += Math.min(factors.websiteVisits, 15)
  score += Math.min(factors.timeOnSite / 10, 10) // 1 point per 10 minutes
  score += Math.min(factors.pagesViewed * 2, 15)
  
  return Math.min(score, 100)
}

// Behavioral scoring
const getBehavioralScore = (factors: LeadScoringFactors): number => {
  let score = 0
  
  // High-value actions
  score += factors.quizAttempts * 10
  score += factors.courseEnrollments * 25
  score += factors.downloads * 5
  score += factors.eventRegistrations * 15
  
  return Math.min(score, 100)
}

// Recency scoring
const getRecencyScore = (factors: LeadScoringFactors): number => {
  let score = 0
  
  // Recent activity bonus
  if (factors.daysSinceLastActivity <= 7) score += 30
  else if (factors.daysSinceLastActivity <= 30) score += 20
  else if (factors.daysSinceLastActivity <= 90) score += 10
  
  // Long-term relationship bonus
  if (factors.daysSinceFirstContact >= 30) score += 10
  if (factors.daysSinceFirstContact >= 90) score += 20
  
  return Math.min(score, 50)
}

// Source scoring
const getSourceScore = (source: string): number => {
  const sourceScores: Record<string, number> = {
    'website': 10,
    'newsletter': 15,
    'referral': 25,
    'event': 20,
    'social': 8,
    'paid': 12,
    'organic': 10,
  }
  
  return sourceScores[source] || 5
}

// Main scoring function
export function calculateLeadScore(factors: LeadScoringFactors): LeadScoreResult {
  const demographicScore = getDemographicScore(factors)
  const engagementScore = getEngagementScore(factors)
  const behavioralScore = getBehavioralScore(factors)
  const recencyScore = getRecencyScore(factors)
  const sourceScore = getSourceScore(factors.source)
  
  // Calculate weighted score
  const totalScore = Math.round(
    demographicScore * SCORING_WEIGHTS.demographic +
    engagementScore * SCORING_WEIGHTS.engagement +
    behavioralScore * SCORING_WEIGHTS.behavioral +
    recencyScore * SCORING_WEIGHTS.recency +
    sourceScore * 0.1 // Small bonus for source
  )
  
  // Determine grade and category
  let grade: 'A' | 'B' | 'C' | 'D' | 'F'
  let category: 'Hot' | 'Warm' | 'Cool' | 'Cold'
  
  if (totalScore >= 80) {
    grade = 'A'
    category = 'Hot'
  } else if (totalScore >= 60) {
    grade = 'B'
    category = 'Warm'
  } else if (totalScore >= 40) {
    grade = 'C'
    category = 'Cool'
  } else if (totalScore >= 20) {
    grade = 'D'
    category = 'Cold'
  } else {
    grade = 'F'
    category = 'Cold'
  }
  
  // Generate recommendations
  const recommendations = generateRecommendations(category, factors)
  
  return {
    score: totalScore,
    grade,
    category,
    factors: {
      demographic: demographicScore,
      engagement: engagementScore,
      behavioral: behavioralScore,
      recency: recencyScore,
    },
    recommendations,
  }
}

// Generate recommendations based on lead category
function generateRecommendations(category: string, factors: LeadScoringFactors): string[] {
  const recommendations: string[] = []
  
  switch (category) {
    case 'Hot':
      recommendations.push('Immediate follow-up recommended')
      recommendations.push('Schedule personalized consultation')
      recommendations.push('Add to high-priority nurture sequence')
      break
      
    case 'Warm':
      recommendations.push('Add to standard nurture sequence')
      recommendations.push('Send targeted content based on interests')
      recommendations.push('Consider for webinar invitation')
      break
      
    case 'Cool':
      recommendations.push('Increase touch frequency')
      recommendations.push('Send re-engagement campaign')
      recommendations.push('Offer free resource or incentive')
      break
      
    case 'Cold':
      recommendations.push('Review contact data quality')
      recommendations.push('Consider for long-term nurture')
      recommendations.push('Monitor for re-engagement opportunities')
      break
  }
  
  // Specific recommendations based on behavior
  if (factors.quizAttempts > 0 && factors.courseEnrollments === 0) {
    recommendations.push('Promote course enrollment')
  }
  
  if (factors.emailOpens > 5 && factors.emailClicks === 0) {
    recommendations.push('Improve email content and CTAs')
  }
  
  if (factors.daysSinceLastActivity > 90) {
    recommendations.push('Send re-engagement survey')
  }
  
  return recommendations
}

// Update lead score in CRM
export async function updateLeadScore(contactId: string, factors: LeadScoringFactors) {
  const scoreResult = calculateLeadScore(factors)
  
  try {
    const response = await fetch(`${process.env.JANAGANA_API_URL}/plugin/crm/contacts/${contactId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${process.env.JANAGANA_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tags: [...(factors.tags || []), `lead-score-${scoreResult.grade}`, `lead-category-${scoreResult.category}`],
        notes: `Lead Score: ${scoreResult.score} (${scoreResult.grade}) - ${new Date().toISOString()}\n${scoreResult.recommendations.join('\n')}`,
      }),
    })
    
    if (!response.ok) {
      throw new Error('Failed to update lead score in CRM')
    }
    
    return scoreResult
  } catch (error) {
    console.error('Error updating lead score:', error)
    throw error
  }
}
