import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { handleCRMReconciliation } from '@/lib/crm-reconciliation'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const email = body?.email?.toString().trim()
    const password = body?.password?.toString()
    const fullName = body?.fullName?.toString() || ''

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      )
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { error: 'Server configuration missing Supabase credentials.' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey)
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
      },
    })

    if (error) {
      console.error('Signup route error:', error.message)
      return NextResponse.json(
        { error: error.message || 'Unable to create account.' },
        { status: error.status || 500 }
      )
    }

    const userId = data?.user?.id
    if (userId) {
      try {
        await handleCRMReconciliation(userId, 'email')
      } catch (reconcileError) {
        console.warn('CRM reconciliation failed after signup:', reconcileError)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Account created successfully. You can sign in now.',
    })
  } catch (error) {
    console.error('Signup route exception:', error)
    return NextResponse.json(
      { error: 'Unable to create account. Please try again later.' },
      { status: 500 }
    )
  }
}
