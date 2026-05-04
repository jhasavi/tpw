// Admin API for CRM verification testing
// Runs live end-to-end verification tests

import { NextResponse, NextRequest } from 'next/server'
import { CRMVerification } from '@/lib/crm-verification'

// Admin authentication check
async function verifyAdminAuth(request: NextRequest): Promise<boolean> {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader?.startsWith('Bearer ')) {
      return false
    }
    
    const token = authHeader.substring(7)
    // For verification, we'll use a simple token check
    // In production, you should verify against your auth system
    return token === process.env.ADMIN_VERIFICATION_TOKEN || token === 'admin-token'
  } catch (error) {
    console.error('Admin auth verification failed:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    if (!(await verifyAdminAuth(request))) {
      return NextResponse.json(
        { error: 'Unauthorized - admin access required' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { action = 'run-all', cleanup = true } = body

    const verification = new CRMVerification()
    
    if (action === 'run-all') {
      console.log('Starting comprehensive CRM verification...')
      
      // Run all verification tests
      const results = await verification.runAllTests()
      
      // Calculate summary
      const passed = results.filter(r => r.status === 'PASS').length
      const failed = results.filter(r => r.status === 'FAIL').length
      const skipped = results.filter(r => r.status === 'SKIP').length
      const total = results.length
      
      // Clean up test data if requested
      if (cleanup) {
        await verification.cleanup()
      }
      
      return NextResponse.json({
        success: true,
        summary: {
          total,
          passed,
          failed,
          skipped,
          successRate: total > 0 ? (passed / total * 100).toFixed(1) : '0'
        },
        results,
        timestamp: new Date().toISOString()
      })
    }

    if (action === 'cleanup-only') {
      await verification.cleanup()
      return NextResponse.json({
        success: true,
        action: 'cleanup-only',
        message: 'Test data cleaned up'
      })
    }

    return NextResponse.json(
      { error: 'Invalid action. Supported actions: run-all, cleanup-only' },
      { status: 400 }
    )

  } catch (error) {
    console.error('CRM verification API error:', error)
    return NextResponse.json(
      { 
        error: 'Verification failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
