import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function run() {
  const { data } = await supabase
    .from('lessons')
    .select('slug, content')

  let upgraded = 0
  let notUpgraded = 0
  const notUpgradedList = []

  data?.forEach(lesson => {
    const content = lesson.content as any
    if (content?.learningObjectives && Array.isArray(content.learningObjectives) && content.learningObjectives.length > 0) {
      upgraded++
    } else {
      notUpgraded++
      notUpgradedList.push(lesson.slug)
    }
  })

  console.log(`\n✅ Upgraded: ${upgraded}`)
  console.log(`❌ Not upgraded: ${notUpgraded}`)
  console.log(`\nRemaining lessons to upgrade:`)
  notUpgradedList.slice(0, 50).forEach(slug => console.log(`  - ${slug}`))
  if (notUpgradedList.length > 50) {
    console.log(`  ... and ${notUpgradedList.length - 50} more`)
  }
}

run()
