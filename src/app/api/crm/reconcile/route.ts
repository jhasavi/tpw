import { NextRequest, NextResponse } from 'next/server'
import { handleCRMReconciliation } from '@/lib/crm-reconciliation'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, authSource } = body

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      )
    }

    // Reconcile user with CRM
    const result = await handleCRMReconciliation(userId, authSource || 'other')

    // Always return success to caller (CRM sync is non-blocking)
    return NextResponse.json({
      success: true,
      message: 'User authenticated successfully',
      crmSync: result
    })

  } catch (error) {
    console.error('CRM reconciliation API error:', error)
    
    // Never fail authentication due to CRM issues
    return NextResponse.json({
      success: true,
      message: 'User authenticated successfully',
      crmSync: {
        success: false,
        action: 'failed',
        message: 'CRM reconciliation failed but authentication succeeded',
        warning: error instanceof Error ? error.message : 'Unknown error'
      }
    })
  }
}
