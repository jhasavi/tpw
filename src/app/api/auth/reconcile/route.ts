import { createAdminClient } from '@/lib/supabase/server'
import { NextResponse, NextRequest } from 'next/server'
import { handleCRMReconciliation } from '@/lib/crm-reconciliation'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, email, fullName, authSource } = body

    // Handle userId-based reconciliation (OAuth, login)
    if (userId) {
      try {
        const crmSync = await handleCRMReconciliation(userId, authSource || 'other')
        
        return NextResponse.json({
          success: true,
          message: 'User authentication completed successfully',
          crmSync
        })
      } catch (error) {
        console.error('CRM reconciliation error (userId):', error)
        
        return NextResponse.json({
          success: true,
          message: 'User authentication completed successfully',
          crmSync: {
            success: false,
            action: 'failed',
            message: 'CRM reconciliation failed but authentication succeeded',
            warning: error instanceof Error ? error.message : 'Unknown error'
          }
        })
      }
    }

    // Handle email-based reconciliation (signup)
    if (email) {
      try {
        // Get user by email (for signup flow)
        const supabase = createAdminClient()
        const { data: { users }, error } = await supabase.auth.admin.listUsers()

        if (error) {
          return NextResponse.json(
            { error: 'Failed to list users' },
            { status: 500 }
          )
        }

        // Find user by email
        const user = users?.find(u => u.email === email)
        if (!user) {
          return NextResponse.json(
            { error: 'User not found' },
            { status: 404 }
          )
        }
        
        // Update user metadata with full name if provided
        if (fullName) {
          try {
            await supabase.auth.admin.updateUserById(user.id, {
              user_metadata: {
                ...user.user_metadata,
                full_name: fullName
              }
            })
          } catch (metadataError) {
            console.warn('Failed to update user metadata:', metadataError)
            // Don't fail reconciliation
          }
        }
        
        // Trigger CRM reconciliation
        const crmSync = await handleCRMReconciliation(user.id, authSource || 'email')

        return NextResponse.json({
          success: true,
          message: 'User signup completed successfully',
          crmSync
        })
      } catch (error) {
        console.error('CRM reconciliation error (email):', error)
        
        return NextResponse.json({
          success: true,
          message: 'User signup completed successfully',
          crmSync: {
            success: false,
            action: 'failed',
            message: 'CRM reconciliation failed but signup succeeded',
            warning: error instanceof Error ? error.message : 'Unknown error'
          }
        })
      }
    }

    // Neither userId nor email provided
    return NextResponse.json(
      { error: 'userId or email is required' },
      { status: 400 }
    )

  } catch (error) {
    console.error('Auth reconciliation error:', error)
    
    // Never fail authentication due to CRM issues
    return NextResponse.json({
      success: true,
      message: 'Authentication completed successfully',
      crmSync: {
        success: false,
        action: 'failed',
        message: 'CRM reconciliation failed but authentication succeeded',
        warning: error instanceof Error ? error.message : 'Unknown error'
      }
    })
  }
}
