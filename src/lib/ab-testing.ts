// A/B Testing system for newsletter forms

export interface ABTestVariant {
  id: string
  name: string
  description: string
  config: {
    headline: string
    subheadline: string
    buttonText: string
    backgroundColor: string
    textColor: string
    fields: {
      firstName: boolean
      lastName: boolean
      phone: boolean
    }
    layout: 'stacked' | 'inline' | 'two-column'
    socialProof: {
      enabled: boolean
      text: string
      count: number
    }
  }
  trafficSplit: number // 0-100
}

export interface ABTest {
  id: string
  name: string
  description: string
  status: 'draft' | 'running' | 'completed' | 'paused'
  startDate?: Date
  endDate?: Date
  variants: ABTestVariant[]
  goals: {
    primary: 'conversion_rate' | 'click_through_rate' | 'engagement_time'
    secondary: string[]
  }
  results?: {
    variantId: string
    impressions: number
    conversions: number
    conversionRate: number
    avgEngagementTime: number
    statisticalSignificance: number
  }[]
}

// Predefined A/B tests for newsletter optimization
export const NEWSLETTER_AB_TESTS: Omit<ABTest, 'id' | 'status' | 'startDate' | 'endDate' | 'results'>[] = [
  {
    name: 'Form Fields Optimization',
    description: 'Test minimal vs detailed form fields',
    goals: {
      primary: 'conversion_rate',
      secondary: ['engagement_time', 'bounce_rate']
    },
    variants: [
      {
        id: 'minimal-form',
        name: 'Minimal Form',
        description: 'Email only',
        trafficSplit: 50,
        config: {
          headline: 'Get Weekly Financial Tips',
          subheadline: 'Join 500+ women building financial confidence',
          buttonText: 'Subscribe Now',
          backgroundColor: 'bg-purple-600',
          textColor: 'text-white',
          fields: {
            firstName: false,
            lastName: false,
            phone: false
          },
          layout: 'stacked',
          socialProof: {
            enabled: true,
            text: 'Join 500+ women',
            count: 500
          }
        }
      },
      {
        id: 'detailed-form',
        name: 'Detailed Form',
        description: 'Email + name + phone',
        trafficSplit: 50,
        config: {
          headline: 'Start Your Financial Journey',
          subheadline: 'Get personalized financial tips and exclusive content',
          buttonText: 'Get Started',
          backgroundColor: 'bg-purple-600',
          textColor: 'text-white',
          fields: {
            firstName: true,
            lastName: true,
            phone: true
          },
          layout: 'two-column',
          socialProof: {
            enabled: true,
            text: 'Join 500+ women',
            count: 500
          }
        }
      }
    ]
  },
  {
    name: 'Headline Copy Test',
    description: 'Test different headline approaches',
    goals: {
      primary: 'conversion_rate',
      secondary: ['click_through_rate']
    },
    variants: [
      {
        id: 'benefit-headline',
        name: 'Benefit-Focused',
        description: 'Focus on benefits',
        trafficSplit: 33,
        config: {
          headline: 'Transform Your Financial Future',
          subheadline: 'Learn practical strategies for budgeting, investing, and building wealth',
          buttonText: 'Start Learning',
          backgroundColor: 'bg-purple-600',
          textColor: 'text-white',
          fields: {
            firstName: true,
            lastName: false,
            phone: false
          },
          layout: 'stacked',
          socialProof: {
            enabled: true,
            text: '500+ women already learning',
            count: 500
          }
        }
      },
      {
        id: 'community-headline',
        name: 'Community-Focused',
        description: 'Focus on community',
        trafficSplit: 33,
        config: {
          headline: 'Join Our Empowered Community',
          subheadline: 'Connect with women building financial confidence together',
          buttonText: 'Join Community',
          backgroundColor: 'bg-purple-600',
          textColor: 'text-white',
          fields: {
            firstName: true,
            lastName: false,
            phone: false
          },
          layout: 'stacked',
          socialProof: {
            enabled: true,
            text: '500+ active members',
            count: 500
          }
        }
      },
      {
        id: 'urgency-headline',
        name: 'Urgency-Focused',
        description: 'Focus on urgency',
        trafficSplit: 34,
        config: {
          headline: 'Don\'t Wait to Start',
          subheadline: 'Take control of your finances today with our free resources',
          buttonText: 'Start Now',
          backgroundColor: 'bg-purple-600',
          textColor: 'text-white',
          fields: {
            firstName: true,
            lastName: false,
            phone: false
          },
          layout: 'stacked',
          socialProof: {
            enabled: true,
            text: 'Limited spots available',
            count: 500
          }
        }
      }
    ]
  },
  {
    name: 'Visual Design Test',
    description: 'Test different visual approaches',
    goals: {
      primary: 'conversion_rate',
      secondary: ['engagement_time']
    },
    variants: [
      {
        id: 'purple-design',
        name: 'Purple Theme',
        description: 'Current purple theme',
        trafficSplit: 50,
        config: {
          headline: 'Subscribe to Our Newsletter',
          subheadline: 'Get weekly financial tips and exclusive content',
          buttonText: 'Subscribe',
          backgroundColor: 'bg-purple-600',
          textColor: 'text-white',
          fields: {
            firstName: true,
            lastName: false,
            phone: false
          },
          layout: 'stacked',
          socialProof: {
            enabled: true,
            text: 'Join 500+ women',
            count: 500
          }
        }
      },
      {
        id: 'green-design',
        name: 'Green Theme',
        description: 'Green growth theme',
        trafficSplit: 50,
        config: {
          headline: 'Grow Your Financial Knowledge',
          subheadline: 'Join our community of financially empowered women',
          buttonText: 'Start Growing',
          backgroundColor: 'bg-green-600',
          textColor: 'text-white',
          fields: {
            firstName: true,
            lastName: false,
            phone: false
          },
          layout: 'stacked',
          socialProof: {
            enabled: true,
            text: 'Growing community',
            count: 500
          }
        }
      }
    ]
  }
]

// A/B Testing Engine
export class ABTestingEngine {
  private tests: Map<string, ABTest> = new Map()
  private userAssignments: Map<string, Map<string, string>> = new Map()

  constructor() {
    this.initializeTests()
  }

  private initializeTests() {
    NEWSLETTER_AB_TESTS.forEach((testData, index) => {
      const test: ABTest = {
        ...testData,
        id: `ab-test-${index + 1}`,
        status: 'draft',
      }
      this.tests.set(test.id, test)
    })
  }

  // Get active test for a user
  getActiveTest(userId: string, testId?: string): { test: ABTest; variant: ABTestVariant } | null {
    const activeTests = Array.from(this.tests.values()).filter(test => test.status === 'running')
    
    if (activeTests.length === 0) return null

    // If specific test requested, use that
    if (testId) {
      const test = this.tests.get(testId)
      if (test && test.status === 'running') {
        const variant = this.getAssignedVariant(userId, test)
        return { test, variant }
      }
    }

    // Otherwise, get first active test
    const test = activeTests[0]
    const variant = this.getAssignedVariant(userId, test)
    return { test, variant }
  }

  // Assign user to variant based on traffic split
  private getAssignedVariant(userId: string, test: ABTest): ABTestVariant {
    // Check if user already assigned
    if (!this.userAssignments.has(userId)) {
      this.userAssignments.set(userId, new Map())
    }

    const userTests = this.userAssignments.get(userId)!
    const existingVariantId = userTests.get(test.id)

    if (existingVariantId) {
      return test.variants.find(v => v.id === existingVariantId)!
    }

    // Assign to variant based on traffic split
    const random = Math.random() * 100
    let cumulative = 0

    for (const variant of test.variants) {
      cumulative += variant.trafficSplit
      if (random <= cumulative) {
        userTests.set(test.id, variant.id)
        return variant
      }
    }

    // Fallback to last variant
    const lastVariant = test.variants[test.variants.length - 1]
    userTests.set(test.id, lastVariant.id)
    return lastVariant
  }

  // Track impression
  trackImpression(userId: string, testId: string, variantId: string) {
    // This would typically send to analytics service
    console.log(`Impression tracked: User ${userId}, Test ${testId}, Variant ${variantId}`)
  }

  // Track conversion
  trackConversion(userId: string, testId: string, variantId: string, value?: number) {
    // This would typically send to analytics service
    console.log(`Conversion tracked: User ${userId}, Test ${testId}, Variant ${variantId}, Value: ${value}`)
  }

  // Calculate test results
  calculateResults(testId: string): ABTest['results'] {
    const test = this.tests.get(testId)
    if (!test) return []

    // This would typically fetch from analytics database
    // For now, return mock data
    return test.variants.map(variant => ({
      variantId: variant.id,
      impressions: Math.floor(Math.random() * 1000) + 100,
      conversions: Math.floor(Math.random() * 100) + 10,
      conversionRate: Math.random() * 0.3 + 0.1,
      avgEngagementTime: Math.random() * 60 + 30,
      statisticalSignificance: Math.random()
    }))
  }

  // Start test
  startTest(testId: string) {
    const test = this.tests.get(testId)
    if (test) {
      test.status = 'running'
      test.startDate = new Date()
    }
  }

  // Pause test
  pauseTest(testId: string) {
    const test = this.tests.get(testId)
    if (test) {
      test.status = 'paused'
    }
  }

  // Complete test
  completeTest(testId: string) {
    const test = this.tests.get(testId)
    if (test) {
      test.status = 'completed'
      test.endDate = new Date()
      test.results = this.calculateResults(testId)
    }
  }

  // Get all tests
  getAllTests(): ABTest[] {
    return Array.from(this.tests.values())
  }

  // Get test by ID
  getTest(testId: string): ABTest | null {
    return this.tests.get(testId) || null
  }
}

// Singleton instance
export const abTestingEngine = new ABTestingEngine()
