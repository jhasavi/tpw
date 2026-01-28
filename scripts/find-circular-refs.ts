import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

function checkCircularRefs(obj: any, seen = new WeakSet(), path = 'root'): string | null {
  if (obj === null || typeof obj !== 'object') {
    return null
  }

  if (seen.has(obj)) {
    return path
  }

  seen.add(obj)

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const result = checkCircularRefs(obj[key], seen, `${path}.${key}`)
      if (result) {
        return result
      }
    }
  }

  return null
}

async function findCircularReferences() {
  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('id, title, slug, content')
    .eq('slug', 'creating-first-budget')
    .limit(1)

  if (error) {
    console.error('Error fetching lesson:', error)
    return
  }

  if (!lessons || lessons.length === 0) {
    console.log('No lessons found')
    return
  }

  const lesson = lessons[0]
  console.log('Checking lesson:', lesson.title)
  
  const circularPath = checkCircularRefs(lesson)
  
  if (circularPath) {
    console.log('⚠️  CIRCULAR REFERENCE FOUND AT:', circularPath)
  } else {
    console.log('✓ No circular references found')
  }

  // Also try to JSON.stringify it
  try {
    JSON.stringify(lesson)
    console.log('✓ JSON.stringify successful')
  } catch (e: any) {
    console.log('⚠️  JSON.stringify failed:', e.message)
  }

  // Check for deeply nested structures
  function checkDepth(obj: any, depth = 0): number {
    if (obj === null || typeof obj !== 'object') {
      return depth
    }
    
    let maxDepth = depth
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const childDepth = checkDepth(obj[key], depth + 1)
        maxDepth = Math.max(maxDepth, childDepth)
      }
    }
    return maxDepth
  }

  const depth = checkDepth(lesson.content)
  console.log('Content nesting depth:', depth)
  
  // Check size when serialized
  const serialized = JSON.stringify(lesson.content)
  console.log('Content size when serialized:', serialized.length, 'bytes')
  
  // Check if there are any problematic characters
  const hasNull = serialized.includes('\u0000')
  console.log('Contains null characters:', hasNull)
}

findCircularReferences()
