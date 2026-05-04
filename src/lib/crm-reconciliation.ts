// Server-side CRM reconciliation service
// Handles syncing TPW auth users to JanaGana CRM without blocking authentication

import { createClient } from '@/lib/supabase/server'
import { 
  determineLifecycleStage, 
  mapToCRMContact, 
  mapConsentFromForm,
  CRMError,
  type LifecycleStage 
} from '@/lib/crm-utils'
import { crmClient } from '@/lib/crm-retry-server'

interface AuthUserData {
  id: string
  email: string
  firstName?: string
  lastName?: string
  phone?: string
  authSource: 'email' | 'google' | 'other'
  isNewUser: boolean
  metadata?: Record<string, any>
}

interface CRMReconciliationResult {
  success: boolean
  contactId?: string
  action: 'created' | 'updated' | 'skipped' | 'failed'
  message: string
  warning?: string
}

/**
 * Reconcile authenticated user with JanaGana CRM
 * This function is:
 * - Idempotent and duplicate-safe
 * - Non-blocking (never fails authentication)
 * - Server-side only (no client-side CRM logic)
 * - Comprehensive logging for recovery
 */
export async function reconcileUserWithCRM(userData: AuthUserData): Promise<CRMReconciliationResult> {
  try {
    // Check if user already has CRM contact ID in app_metadata (server-controlled)
    const existingContactId = userData.metadata?.app_metadata?.janagana_contact_id
    
    if (existingContactId) {
      // Verify the cached contact ID still belongs to this user's email
      const isValid = await verifyContactIdMatchesEmail(existingContactId, userData.email)
      if (isValid) {
        // User already has valid CRM contact, update it
        return await updateExistingContact(existingContactId, userData)
      } else {
        // Cached ID is invalid (email mismatch), search for correct contact
        console.warn('Cached CRM contact ID email mismatch, searching for correct contact', {
          userId: userData.id,
          email: userData.email,
          cachedContactId: existingContactId
        })
        return await findOrCreateContact(userData)
      }
    } else {
      // Search for contact by email
      return await findOrCreateContact(userData)
    }
  } catch (error) {
    console.error('CRM reconciliation failed:', {
      userId: userData.id,
      email: userData.email,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    })
    
    return {
      success: false,
      action: 'failed',
      message: 'CRM reconciliation failed but authentication succeeded',
      warning: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

/**
 * Find existing contact by email or create new one
 */
async function findOrCreateContact(userData: AuthUserData): Promise<CRMReconciliationResult> {
  try {
    // Search for existing contact with context for retry
    const searchResponse = await crmClient.get(`/plugin/crm/contacts?search=${encodeURIComponent(userData.email)}`, {
      userId: userData.id,
      email: userData.email
    })
    
    if (searchResponse.contacts && searchResponse.contacts.length > 0) {
      const existingContact = searchResponse.contacts[0]
      
      // Update existing contact and store CRM ID in user metadata
      await storeCRMContactId(userData.id, existingContact.id)
      return await updateExistingContact(existingContact.id, userData)
    } else {
      // Create new contact
      return await createNewContact(userData)
    }
  } catch (error) {
    if (error instanceof CRMError && error.statusCode === 404) {
      // Contact not found, create new one
      return await createNewContact(userData)
    }
    throw error
  }
}

/**
 * Create new CRM contact
 */
async function createNewContact(userData: AuthUserData): Promise<CRMReconciliationResult> {
  try {
    // Determine lifecycle stage based on auth source and user status
    const lifecycleStage = determineLifecycleStage(
      userData.isNewUser ? 'newsletter' : 'profile_completed',
      undefined,
      { authSource: userData.authSource }
    )
    
    // Default consent to UNKNOWN for auth users (explicit consent captured elsewhere)
    const consent = {
      marketingConsent: 'UNKNOWN' as const,
      consentTimestamp: new Date().toISOString(),
      consentSource: `auth_${userData.authSource}`,
      doNotContact: false
    }
    
    // Create contact data with JanaGana field compatibility
    const contactData = mapToCRMContact({
      email: userData.email,
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      phone: userData.phone,
      source: 'thepurplewings',
      tags: ['auth-user', `auth-${userData.authSource}`],
      notes: `User authenticated via ${userData.authSource}${userData.isNewUser ? ' (new user)' : ' (returning user)'} on ${new Date().toISOString()}`,
      customAttributes: {
        tpw_user_id: userData.id,
        auth_source: userData.authSource,
        auth_timestamp: new Date().toISOString(),
        // JanaGana field mapping for compatibility
        lifecycle_stage: lifecycleStage,
        marketing_consent: consent.marketingConsent,
        consent_timestamp: consent.consentTimestamp,
        consent_source: consent.consentSource,
        do_not_contact: consent.doNotContact,
        ...userData.metadata
      }
    }, lifecycleStage, consent)
    
    // Create contact in CRM with context for retry
    const contact = await crmClient.post('/plugin/crm/contacts', contactData, {
      userId: userData.id,
      email: userData.email
    })
    
    // Store CRM contact ID in user metadata
    await storeCRMContactId(userData.id, contact.id)
    
    console.log('CRM contact created:', {
      userId: userData.id,
      email: userData.email,
      contactId: contact.id,
      lifecycleStage,
      timestamp: new Date().toISOString()
    })
    
    return {
      success: true,
      contactId: contact.id,
      action: 'created',
      message: 'CRM contact created successfully'
    }
  } catch (error) {
    console.error('Failed to create CRM contact:', error)
    throw error
  }
}

/**
 * Update existing CRM contact
 */
async function updateExistingContact(contactId: string, userData: AuthUserData): Promise<CRMReconciliationResult> {
  try {
    // Get current contact data
    const currentContact = await crmClient.get(`/plugin/crm/contacts/${contactId}`)
    
    // Determine new lifecycle stage
    const currentStage = currentContact.lifecycleStage as LifecycleStage
    const newLifecycleStage = determineLifecycleStage(
      'profile_completed',
      currentStage,
      { authSource: userData.authSource, lastAuth: new Date().toISOString() }
    )
    
    // Merge tags (avoid duplicates)
    const existingTags = currentContact.tags || []
    const newTags = ['auth-user', `auth-${userData.authSource}`]
    const mergedTags = [...new Set([...existingTags, ...newTags])]
    
    // Update contact data with JanaGana field compatibility
    const updateData = mapToCRMContact({
      tags: mergedTags,
      notes: currentContact.notes 
        ? `${currentContact.notes}\n\nRe-authenticated via ${userData.authSource} on ${new Date().toISOString()}`
        : `Re-authenticated via ${userData.authSource} on ${new Date().toISOString()}`,
      customAttributes: {
        ...currentContact.customAttributes,
        tpw_user_id: userData.id,
        auth_source: userData.authSource,
        last_auth_timestamp: new Date().toISOString(),
        // JanaGana field mapping for compatibility
        lifecycle_stage: newLifecycleStage,
        last_auth_source: userData.authSource,
        ...userData.metadata
      }
    }, newLifecycleStage)
    
    // Update contact in CRM with context for retry
    const updatedContact = await crmClient.patch(`/plugin/crm/contacts/${contactId}`, updateData, {
      userId: userData.id,
      email: userData.email
    })
    
    console.log('CRM contact updated:', {
      userId: userData.id,
      email: userData.email,
      contactId,
      lifecycleStage: newLifecycleStage,
      previousStage: currentStage,
      timestamp: new Date().toISOString()
    })
    
    return {
      success: true,
      contactId,
      action: 'updated',
      message: 'CRM contact updated successfully'
    }
  } catch (error) {
    console.error('Failed to update CRM contact:', error)
    throw error
  }
}

/**
 * Store CRM contact ID in app_metadata (server-controlled) for future sync efficiency
 */
async function storeCRMContactId(userId: string, contactId: string): Promise<void> {
  try {
    const supabase = await createClient()
    
    // Update user app_metadata with CRM contact ID (server-controlled)
    const { error } = await supabase.auth.admin.updateUserById(userId, {
      app_metadata: {
        janagana_contact_id: contactId,
        crm_sync_timestamp: new Date().toISOString(),
        crm_email_verified: new Date().toISOString()
      }
    })
    
    if (error) {
      console.warn('Failed to store CRM contact ID in app_metadata:', error)
      // Don't fail the reconciliation, just log the warning
    }
  } catch (error) {
    console.warn('Failed to store CRM contact ID:', error)
    // Don't fail the reconciliation, just log the warning
  }
}

/**
 * Verify that a cached CRM contact ID belongs to the same email
 */
async function verifyContactIdMatchesEmail(contactId: string, email: string): Promise<boolean> {
  try {
    const contact = await crmClient.get(`/plugin/crm/contacts/${contactId}`)
    return contact.email === email
  } catch (error) {
    console.warn('Failed to verify contact ID email match:', error)
    return false // Assume invalid on error
  }
}

/**
 * Get user data from Supabase auth for CRM reconciliation
 */
export async function getUserDataForCRM(userId: string, authSource: 'email' | 'google' | 'other' = 'other'): Promise<AuthUserData | null> {
  try {
    const supabase = await createClient()
    
    // Get user from auth
    const { data: { user }, error } = await supabase.auth.admin.getUserById(userId)
    
    if (error || !user) {
      return null
    }
    
    // Determine if user is new (created within last 5 minutes)
    const createdAt = new Date(user.created_at).getTime()
    const isNewUser = Date.now() - createdAt < 5 * 60 * 1000 // 5 minutes
    
    // Extract name from metadata
    const fullName = user.user_metadata?.full_name || user.user_metadata?.name || ''
    const nameParts = fullName.split(' ')
    
    return {
      id: user.id,
      email: user.email!,
      firstName: nameParts[0] || '',
      lastName: nameParts.slice(1).join(' ') || '',
      phone: user.phone || undefined,
      authSource,
      isNewUser,
      metadata: {
        user_metadata: user.user_metadata || {},
        app_metadata: user.app_metadata || {}
      }
    }
  } catch (error) {
    console.error('Failed to get user data for CRM:', error)
    return null
  }
}

/**
 * API route handler for CRM reconciliation
 * This can be called from auth callbacks
 */
export async function handleCRMReconciliation(userId: string, authSource: 'email' | 'google' | 'other' = 'other'): Promise<CRMReconciliationResult> {
  const userData = await getUserDataForCRM(userId, authSource)
  
  if (!userData) {
    return {
      success: false,
      action: 'failed',
      message: 'User not found for CRM reconciliation'
    }
  }
  
  return await reconcileUserWithCRM(userData)
}
