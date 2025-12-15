import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function run() {
  const keywords = {
    'Retirement': '%retire%',
    'Tax': '%tax%',
    'Insurance': '%insurance%',
    'Estate': '%estate%',
    'General': '%basic%',
    'Career': '%career%'
  }

  for (const [domain, pattern] of Object.entries(keywords)) {
    const { data } = await supabase
      .from('lessons')
      .select('slug, title')
      .ilike('slug', pattern)
      .order('slug')

    console.log(`\n${domain}:`)
    data?.forEach(l => console.log(`  ${l.slug}`))
  }
}

run()
