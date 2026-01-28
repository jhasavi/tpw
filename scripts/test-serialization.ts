import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function testSerialization() {
  // Get the lesson
  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('slug', 'creating-first-budget')
    .limit(1)

  if (error || !lessons || lessons.length === 0) {
    console.error('Error:', error)
    return
  }

  const lesson = lessons[0]
  console.log('Original lesson ID:', lesson.id)
  console.log('Original lesson title:', lesson.title)

  // Simulate what Next.js does - serialize to JSON and back
  const serialized = JSON.stringify(lesson)
  const deserialized = JSON.parse(serialized)

  console.log('\n=== After JSON round-trip ===')
  console.log('Deserialized ID:', deserialized.id)
  console.log('Deserialized title:', deserialized.title)
  console.log('Content type:', typeof deserialized.content)
  console.log('Content keys:', deserialized.content ? Object.keys(deserialized.content) : 'null')

  // Check if content structure is preserved
  if (deserialized.content && deserialized.content.sections) {
    console.log('\nNumber of sections:', deserialized.content.sections.length)
    console.log('First section has examples?', !!deserialized.content.sections[0].examples)
    
    if (deserialized.content.sections[0].examples) {
      console.log('Examples is array?', Array.isArray(deserialized.content.sections[0].examples))
      console.log('First example type:', typeof deserialized.content.sections[0].examples[0])
    }
  }

  // Try to simulate React serialization
  try {
    // This is what Next.js does internally
    const reactPayload = JSON.stringify({
      props: {
        params: {
          curriculum: 'womens-financial-literacy',
          course: 'financial-literacy-basics',
          lesson: 'creating-first-budget'
        }
      },
      lesson: deserialized
    })
    
    console.log('\n✓ React payload serialization successful')
    console.log('Payload size:', reactPayload.length, 'bytes')
  } catch (e: any) {
    console.log('\n⚠️  React payload serialization FAILED:', e.message)
  }
}

testSerialization()
