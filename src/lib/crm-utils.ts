// JanaGana CRM Integration Utilities

export type LifecycleStage = 'SUBSCRIBER' | 'LEAD' | 'MQL' | 'SQL' | 'CUSTOMER'

export type ConsentStatus = 'GRANTED' | 'DENIED' | 'UNKNOWN'

export interface MarketingConsent {
  marketingConsent: ConsentStatus
  consentTimestamp?: string
  consentSource?: string
  doNotContact?: boolean
}

export interface CRMContact {
  firstName?: string
  lastName?: string
  email: string
  phone?: string
  source?: string
  tags?: string[]
  notes?: string
  lifecycleStage?: LifecycleStage
  customAttributes?: Record<string, any>
  assignedTo?: string
  marketingConsent?: ConsentStatus
  consentTimestamp?: string
  consentSource?: string
  doNotContact?: boolean
}

export interface CRMCreateResponse {
  id: string
  firstName?: string
  lastName?: string
  email: string
  tags?: string[]
  lifecycleStage?: LifecycleStage
  customAttributes?: Record<string, any>
}

export interface CRMUpdateResponse {
  id: string
  firstName?: string
  lastName?: string
  email: string
  tags?: string[]
  lifecycleStage?: LifecycleStage
  customAttributes?: Record<string, any>
}

// Lifecycle Stage Determination Logic
export function determineLifecycleStage(
  trigger: string,
  existingStage?: LifecycleStage,
  additionalContext?: any
): LifecycleStage {
  // If already a customer, keep as customer
  if (existingStage === 'CUSTOMER') {
    return 'CUSTOMER'
  }

  // Determine based on trigger and context
  switch (trigger) {
    case 'newsletter':
    case 'newsletter-subscriber':
      return 'SUBSCRIBER'
    
    case 'exit_intent':
    case 'smart-capture':
    case 'quiz_completion':
    case 'personality_results':
    case 'course_recommendation':
    case 'progress_milestone':
      // If currently just a subscriber, upgrade to lead
      if (existingStage === 'SUBSCRIBER') {
        return 'LEAD'
      }
      // If already a lead, check if should be MQL
      if (existingStage === 'LEAD') {
        // High-value triggers qualify as MQL
        if (['personality_results', 'course_recommendation'].includes(trigger)) {
          return 'MQL'
        }
        return 'LEAD'
      }
      return 'LEAD'
    
    case 'course_enrolled':
    case 'course_started':
      return 'SQL' // Sales Qualified Lead
    
    case 'course_completed':
    case 'purchase_completed':
      return 'CUSTOMER'
    
    default:
      return existingStage || 'LEAD'
  }
}

// Consent Management
export function createConsentData(
  consentGiven: boolean,
  source: string,
  timestamp?: string
): MarketingConsent {
  return {
    marketingConsent: consentGiven ? 'GRANTED' : 'DENIED',
    consentTimestamp: timestamp || new Date().toISOString(),
    consentSource: source,
    doNotContact: !consentGiven
  }
}

export function mapConsentFromForm(consentCheckbox?: boolean): MarketingConsent {
  // Only grant consent if explicitly given
  if (consentCheckbox === true) {
    return createConsentData(true, 'form-checkbox')
  }
  
  // Default to unknown if no explicit consent captured
  return {
    marketingConsent: 'UNKNOWN',
    consentTimestamp: new Date().toISOString(),
    consentSource: 'form-no-consent-captured'
  }
}

// CRM Field Mapping
export function mapToCRMContact(
  data: Partial<CRMContact>,
  lifecycleStage?: LifecycleStage,
  consent?: MarketingConsent
): CRMContact {
  if (!data.email) {
    throw new Error('Email is required for CRM contact')
  }

  return {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    source: data.source,
    notes: data.notes,
    assignedTo: data.assignedTo,
    lifecycleStage: lifecycleStage || data.lifecycleStage,
    marketingConsent: consent?.marketingConsent || data.marketingConsent,
    consentTimestamp: consent?.consentTimestamp || data.consentTimestamp,
    consentSource: consent?.consentSource || data.consentSource,
    doNotContact: consent?.doNotContact || data.doNotContact,
    // Ensure tags array exists
    tags: Array.isArray(data.tags) ? data.tags : (data.tags ? [data.tags] : []),
    // Merge custom attributes
    customAttributes: {
      ...data.customAttributes,
      ...(consent && {
        consentSource: consent.consentSource,
        consentTimestamp: consent.consentTimestamp
      })
    }
  }
}

// JanaGana API Configuration
export const CRM_CONFIG = {
  API_URL: process.env.JANAGANA_API_URL || 'https://janagana.namasteneedham.com/api',
  API_KEY: process.env.JANAGANA_API_KEY,
  RETRY_CONFIG: {
    maxRetries: 3,
    initialDelay: 1000, // 1 second
    maxDelay: 10000, // 10 seconds
    backoffFactor: 2
  }
}

// Error Types
export class CRMError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: any
  ) {
    super(message)
    this.name = 'CRMError'
  }
}
