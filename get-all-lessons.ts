import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function run() {
  const { data } = await supabase
    .from('lessons')
    .select('slug, title')
    .order('slug')

  console.log(`\nTotal lessons: ${data?.length}\n`)
  data?.forEach(l => {
    console.log(`${l.slug} — ${l.title}`)
  })
}

run()
