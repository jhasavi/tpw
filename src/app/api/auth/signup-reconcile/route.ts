import { createClient } from '@/lib/supabase/server'
import { NextResponse, NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, fullName, authSource } = body

    if (!email) {
      return NextResponse.json(
        { error: 'email is required' },
        { status: 400 }
      )
    }

    // Get user by email (for signup flow)
    const supabase = await createClient()
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
    
    // Trigger CRM reconciliation via API route
    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL
    const reconcileResponse = await fetch(`${origin}/api/crm/reconcile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.id,
        authSource: authSource || 'email'
      })
    })
    
    let crmSync
    if (reconcileResponse.ok) {
      crmSync = await reconcileResponse.json()
    } else {
      crmSync = {
        success: false,
        action: 'failed',
        message: 'CRM reconciliation API call failed',
        warning: `HTTP ${reconcileResponse.status}`
      }
    }

    return NextResponse.json({
      success: true,
      message: 'User signup completed successfully',
      crmSync
    })

  } catch (error) {
    console.error('Signup CRM reconciliation error:', error)
    
    // Never fail signup due to CRM issues
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
