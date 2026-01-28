import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function checkResourceUrls() {
  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('id, title, slug, content')
    .eq('slug', 'creating-first-budget')
    .limit(1)

  if (error || !lessons || lessons.length === 0) {
    console.error('Error:', error)
    return
  }

  const lesson = lessons[0]
  console.log('Checking lesson:', lesson.title)

  if (lesson.content && lesson.content.resources) {
    console.log('\n=== RESOURCES ===')
    lesson.content.resources.forEach((resource: any, idx: number) => {
      console.log(`\nResource ${idx + 1}:`)
      console.log('  Title:', resource.title)
      console.log('  Type:', resource.type)
      console.log('  URL:', resource.url)
      console.log('  Description:', resource.description ? resource.description.substring(0, 50) + '...' : 'none')
      
      // Check if URL might cause issues
      if (resource.url) {
        try {
          new URL(resource.url)
          console.log('  ✓ Valid URL')
        } catch (e) {
          console.log('  ⚠️  INVALID URL')
        }
      } else {
        console.log('  ⚠️  NO URL PROVIDED')
      }
    })
  }

  // Also check if there are any undefined or null values that might cause rendering issues
  function findProblematicValues(obj: any, path = 'content'): string[] {
    const problems: string[] = []
    
    if (obj === undefined) {
      problems.push(`${path} is undefined`)
    }
    
    if (obj === null) {
      return problems // null is okay
    }
    
    if (Array.isArray(obj)) {
      obj.forEach((item, idx) => {
        problems.push(...findProblematicValues(item, `${path}[${idx}]`))
      })
    } else if (typeof obj === 'object') {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          problems.push(...findProblematicValues(obj[key], `${path}.${key}`))
        }
      }
    }
    
    return problems
  }

  const problems = findProblematicValues(lesson.content)
  if (problems.length > 0) {
    console.log('\n⚠️  FOUND PROBLEMATIC VALUES:')
    problems.forEach(p => console.log('  -', p))
  } else {
    console.log('\n✓ No undefined values found')
  }
}

checkResourceUrls()
