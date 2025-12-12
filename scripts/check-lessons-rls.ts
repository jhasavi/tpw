import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function checkRLSPolicies() {
  console.log('🔍 Checking RLS policies on lessons table...\n')

  const { data, error } = await supabase.from('lessons').select('count()', { count: 'exact' })

  if (error) {
    console.log('❌ Error querying lessons:')
    console.log(error)
    return
  }

  console.log('✅ Service role can query lessons table')

  // Check if lessons table has RLS enabled by trying direct SQL query
  // For now, just try accessing as both service role and anon
  const anonSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: anonData, error: anonError } = await anonSupabase
    .from('lessons')
    .select('id, slug, title')
    .limit(5)

  if (anonError) {
    console.log('\n⚠️  Anonymous user cannot access lessons:')
    console.log(anonError.message)
  } else {
    console.log('\n✅ Anonymous users can access lessons:', anonData?.length || 0, 'records')
  }
}

checkRLSPolicies().catch(console.error)
