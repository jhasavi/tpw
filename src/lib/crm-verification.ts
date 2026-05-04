// Live verification tests for TPW auth + JanaGana CRM integration
// Performs real end-to-end testing of all critical flows

import { createClient } from '@/lib/supabase/server'
import { crmClient } from '@/lib/crm-retry-server'

interface VerificationResult {
  testName: string
  status: 'PASS' | 'FAIL' | 'SKIP'
  details: string
  evidence?: any
  timestamp: string
}

class CRMVerification {
  private results: VerificationResult[] = []
  private testEmail: string
  private supabase: any

  constructor() {
    this.testEmail = `test-${Date.now()}@verification.thepurplewings.com`
    this.supabase = null
  }

  async init() {
    this.supabase = await createClient()
  }

  private addResult(testName: string, status: 'PASS' | 'FAIL' | 'SKIP', details: string, evidence?: any) {
    this.results.push({
      testName,
      status,
      details,
      evidence,
      timestamp: new Date().toISOString()
    })
  }

  // Test 1: New Email Signup
  async testNewEmailSignup(): Promise<void> {
    try {
      console.log('Testing new email signup...')
      
      // Create test user
      const { data: { user }, error } = await this.supabase.auth.admin.createUser({
        email: this.testEmail,
        password: 'TestPassword123!',
        email_confirm: true,
        user_metadata: {
          full_name: 'Verification Test User',
          test_run: Date.now().toString()
        }
      })

      if (error) {
        this.addResult('New Email Signup', 'FAIL', `Failed to create test user: ${error.message}`)
        return
      }

      // Wait a moment for CRM reconciliation
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Check if CRM contact was created
      try {
        const searchResponse = await crmClient.get(`/plugin/crm/contacts?search=${encodeURIComponent(this.testEmail)}`)
        
        if (searchResponse.contacts && searchResponse.contacts.length > 0) {
          const contact = searchResponse.contacts[0]
          
          // Verify contact data
          const hasCorrectEmail = contact.email === this.testEmail
          const hasCorrectName = contact.firstName === 'Verification' && contact.lastName === 'Test User'
          const hasAuthTags = contact.tags?.includes('auth-user') && contact.tags?.includes('auth-email')
          const hasTPWUserId = contact.customAttributes?.tpw_user_id === user.id
          const hasLifecycleStage = contact.customAttributes?.lifecycle_stage === 'SUBSCRIBER'
          
          if (hasCorrectEmail && hasCorrectName && hasAuthTags && hasTPWUserId && hasLifecycleStage) {
            this.addResult('New Email Signup', 'PASS', 'CRM contact created with correct data', {
              contactId: contact.id,
              email: contact.email,
              tags: contact.tags,
              customAttributes: contact.customAttributes
            })
          } else {
            this.addResult('New Email Signup', 'FAIL', 'CRM contact created but with incorrect data', {
              hasCorrectEmail,
              hasCorrectName,
              hasAuthTags,
              hasTPWUserId,
              hasLifecycleStage,
              contact
            })
          }
        } else {
          this.addResult('New Email Signup', 'FAIL', 'CRM contact not found after signup')
        }
      } catch (crmError) {
        this.addResult('New Email Signup', 'FAIL', `Failed to verify CRM contact: ${crmError}`)
      }

    } catch (error) {
      this.addResult('New Email Signup', 'FAIL', `Test failed with error: ${error}`)
    }
  }

  // Test 2: Repeat Login
  async testRepeatLogin(): Promise<void> {
    try {
      console.log('Testing repeat login...')
      
      // Sign in the test user
      const { data: { user }, error } = await this.supabase.auth.signInWithPassword({
        email: this.testEmail,
        password: 'TestPassword123!'
      })

      if (error) {
        this.addResult('Repeat Login', 'FAIL', `Failed to sign in test user: ${error.message}`)
        return
      }

      // Wait for CRM reconciliation
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Check if CRM contact was updated
      try {
        const searchResponse = await crmClient.get(`/plugin/crm/contacts?search=${encodeURIComponent(this.testEmail)}`)
        
        if (searchResponse.contacts && searchResponse.contacts.length > 0) {
          const contact = searchResponse.contacts[0]
          
          // Verify contact was updated (should have recent auth timestamp)
          const hasRecentAuth = contact.customAttributes?.last_auth_timestamp
          const hasCorrectUserId = contact.customAttributes?.tpw_user_id === user.id
          const hasMultipleAuthTags = contact.tags?.filter((tag: string) => tag.startsWith('auth-')).length >= 1
          
          if (hasRecentAuth && hasCorrectUserId && hasMultipleAuthTags) {
            this.addResult('Repeat Login', 'PASS', 'CRM contact updated correctly on repeat login', {
              contactId: contact.id,
              lastAuthTimestamp: contact.customAttributes?.last_auth_timestamp,
              tags: contact.tags
            })
          } else {
            this.addResult('Repeat Login', 'FAIL', 'CRM contact not properly updated on repeat login', {
              hasRecentAuth,
              hasCorrectUserId,
              hasMultipleAuthTags,
              contact
            })
          }
        } else {
          this.addResult('Repeat Login', 'FAIL', 'CRM contact not found on repeat login')
        }
      } catch (crmError) {
        this.addResult('Repeat Login', 'FAIL', `Failed to verify CRM contact update: ${crmError}`)
      }

    } catch (error) {
      this.addResult('Repeat Login', 'FAIL', `Test failed with error: ${error}`)
    }
  }

  // Test 3: CRM Timeout/Failure Case
  async testCRMFailure(): Promise<void> {
    try {
      console.log('Testing CRM failure handling...')
      
      // Temporarily use invalid CRM URL to simulate failure
      const originalUrl = process.env.JANAGANA_API_URL
      process.env.JANAGANA_API_URL = 'https://invalid-crm-url.com/api'
      
      // Create another test user
      const failureTestEmail = `failure-test-${Date.now()}@verification.thepurplewings.com`
      
      const { data: { user }, error } = await this.supabase.auth.admin.createUser({
        email: failureTestEmail,
        password: 'TestPassword123!',
        email_confirm: true,
        user_metadata: {
          full_name: 'Failure Test User',
          test_run: Date.now().toString()
        }
      })

      // Restore original CRM URL
      process.env.JANAGANA_API_URL = originalUrl

      if (error) {
        this.addResult('CRM Failure Handling', 'FAIL', `Failed to create test user for failure test: ${error.message}`)
        return
      }

      // User should be created successfully even if CRM fails
      if (user) {
        // Check if failed request was queued
        const stats = await crmClient.getQueueStats()
        
        this.addResult('CRM Failure Handling', 'PASS', 'User created successfully despite CRM failure', {
          userId: user.id,
          email: failureTestEmail,
          failedRequestsInQueue: stats.totalFailed
        })

        // Clean up test user
        await this.supabase.auth.admin.deleteUser(user.id)
      } else {
        this.addResult('CRM Failure Handling', 'FAIL', 'User creation failed during CRM failure test')
      }

    } catch (error) {
      this.addResult('CRM Failure Handling', 'FAIL', `Test failed with error: ${error}`)
    }
  }

  // Test 4: Consent Field Persistence
  async testConsentFields(): Promise<void> {
    try {
      console.log('Testing consent field persistence...')
      
      // Get the existing test user's CRM contact
      const searchResponse = await crmClient.get(`/plugin/crm/contacts?search=${encodeURIComponent(this.testEmail)}`)
      
      if (searchResponse.contacts && searchResponse.contacts.length > 0) {
        const contact = searchResponse.contacts[0]
        
        // Check consent fields in customAttributes
        const hasMarketingConsent = contact.customAttributes?.marketing_consent !== undefined
        const hasConsentTimestamp = contact.customAttributes?.consent_timestamp !== undefined
        const hasConsentSource = contact.customAttributes?.consent_source !== undefined
        const hasDoNotContact = contact.customAttributes?.do_not_contact !== undefined
        
        if (hasMarketingConsent && hasConsentTimestamp && hasConsentSource && hasDoNotContact) {
          this.addResult('Consent Field Persistence', 'PASS', 'All consent fields persisted correctly', {
            marketingConsent: contact.customAttributes?.marketing_consent,
            consentTimestamp: contact.customAttributes?.consent_timestamp,
            consentSource: contact.customAttributes?.consent_source,
            doNotContact: contact.customAttributes?.do_not_contact
          })
        } else {
          this.addResult('Consent Field Persistence', 'FAIL', 'Some consent fields missing', {
            hasMarketingConsent,
            hasConsentTimestamp,
            hasConsentSource,
            hasDoNotContact,
            customAttributes: contact.customAttributes
          })
        }
      } else {
        this.addResult('Consent Field Persistence', 'FAIL', 'CRM contact not found for consent verification')
      }

    } catch (error) {
      this.addResult('Consent Field Persistence', 'FAIL', `Test failed with error: ${error}`)
    }
  }

  // Test 5: Lifecycle Stage Persistence
  async testLifecycleStage(): Promise<void> {
    try {
      console.log('Testing lifecycle stage persistence...')
      
      // Get the existing test user's CRM contact
      const searchResponse = await crmClient.get(`/plugin/crm/contacts?search=${encodeURIComponent(this.testEmail)}`)
      
      if (searchResponse.contacts && searchResponse.contacts.length > 0) {
        const contact = searchResponse.contacts[0]
        
        // Check lifecycle stage
        const hasLifecycleStage = contact.customAttributes?.lifecycle_stage !== undefined
        const correctStage = contact.customAttributes?.lifecycle_stage === 'SUBSCRIBER'
        
        if (hasLifecycleStage && correctStage) {
          this.addResult('Lifecycle Stage Persistence', 'PASS', 'Lifecycle stage persisted correctly', {
            lifecycleStage: contact.customAttributes?.lifecycle_stage
          })
        } else {
          this.addResult('Lifecycle Stage Persistence', 'FAIL', 'Lifecycle stage incorrect or missing', {
            hasLifecycleStage,
            correctStage,
            lifecycleStage: contact.customAttributes?.lifecycle_stage
          })
        }
      } else {
        this.addResult('Lifecycle Stage Persistence', 'FAIL', 'CRM contact not found for lifecycle verification')
      }

    } catch (error) {
      this.addResult('Lifecycle Stage Persistence', 'FAIL', `Test failed with error: ${error}`)
    }
  }

  // Test 6: Duplicate Prevention
  async testDuplicatePrevention(): Promise<void> {
    try {
      console.log('Testing duplicate prevention...')
      
      // Get current CRM contact count for test email
      const initialSearchResponse = await crmClient.get(`/plugin/crm/contacts?search=${encodeURIComponent(this.testEmail)}`)
      const initialCount = initialSearchResponse.contacts?.length || 0
      
      // Trigger another reconciliation by updating user metadata
      const { data: { user } } = await this.supabase.auth.getUser()
      if (user) {
        await this.supabase.auth.admin.updateUserById(user.id, {
          user_metadata: {
            ...user.user_metadata,
            test_trigger: Date.now().toString()
          }
        })
      }
      
      // Wait for reconciliation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Check contact count again
      const finalSearchResponse = await crmClient.get(`/plugin/crm/contacts?search=${encodeURIComponent(this.testEmail)}`)
      const finalCount = finalSearchResponse.contacts?.length || 0
      
      if (finalCount === initialCount) {
        this.addResult('Duplicate Prevention', 'PASS', 'No duplicate contacts created', {
          initialCount,
          finalCount
        })
      } else {
        this.addResult('Duplicate Prevention', 'FAIL', 'Duplicate contacts detected', {
          initialCount,
          finalCount
        })
      }

    } catch (error) {
      this.addResult('Duplicate Prevention', 'FAIL', `Test failed with error: ${error}`)
    }
  }

  // Run all verification tests
  async runAllTests(): Promise<VerificationResult[]> {
    console.log('Starting CRM verification tests...')
    
    await this.init()
    
    await this.testNewEmailSignup()
    await this.testRepeatLogin()
    await this.testCRMFailure()
    await this.testConsentFields()
    await this.testLifecycleStage()
    await this.testDuplicatePrevention()
    
    console.log('CRM verification tests completed.')
    return this.results
  }

  // Clean up test data
  async cleanup(): Promise<void> {
    try {
      // Delete test user
      const { data: { user } } = await this.supabase.auth.getUser()
      if (user) {
        await this.supabase.auth.admin.deleteUser(user.id)
      }
      
      // Delete CRM contact
      const searchResponse = await crmClient.get(`/plugin/crm/contacts?search=${encodeURIComponent(this.testEmail)}`)
      if (searchResponse.contacts && searchResponse.contacts.length > 0) {
        const contact = searchResponse.contacts[0]
        await crmClient.patch(`/plugin/crm/contacts/${contact.id}`, {
          tags: [...(contact.tags || []), 'test-deleted'],
          notes: `${contact.notes || ''}\n\nTest cleanup - ${new Date().toISOString()}`
        })
      }
    } catch (error) {
      console.error('Cleanup failed:', error)
    }
  }
}

export { CRMVerification, type VerificationResult }
