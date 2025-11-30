import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function checkCounts() {
  const { data, error } = await supabase
    .from('quiz_questions')
    .select('category_id')
    
  if (error) throw error
  
  const counts: Record<number, number> = {}
  data.forEach(q => {
    counts[q.category_id] = (counts[q.category_id] || 0) + 1
  })
  
  console.log('\n📊 Quiz Questions by Category:')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  Object.keys(counts).sort((a,b) => Number(a) - Number(b)).forEach(catId => {
    console.log(`Category ${catId}: ${counts[Number(catId)]} questions`)
  })
  
  const total = Object.values(counts).reduce((sum, count) => sum + count, 0)
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log(`TOTAL: ${total} / 1,050 questions`)
  console.log(`Progress: ${Math.round(total/1050*100)}%`)
  console.log(`Remaining: ${1050 - total} questions\n`)
}

checkCounts()
