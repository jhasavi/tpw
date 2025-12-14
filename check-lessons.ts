import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function run() {
  const { data, error } = await supabase
    .from('lessons')
    .select('slug, title')
    .or('slug.ilike.%invest%,slug.ilike.%index%,slug.ilike.%portfolio%,slug.ilike.%retire%')
    .order('slug')

  if (error) {
    console.error('Error:', error)
    return
  }

  console.log('Found lessons:\n')
  data?.forEach(lesson => {
    console.log(`${lesson.slug} — ${lesson.title}`)
  })
}

run()
