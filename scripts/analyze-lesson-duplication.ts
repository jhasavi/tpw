/**
 * Analyze lesson duplication in database
 * Check if all lessons have the same content
 */

import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function analyzeDuplication() {
  console.log('🔍 Analyzing lesson content duplication...\n')

  // Get all lessons with their content
  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('id, slug, title, content, course_id')
    .order('course_id', { ascending: true })

  if (error) {
    console.error('❌ Error fetching lessons:', error)
    return
  }

  if (!lessons || lessons.length === 0) {
    console.log('⚠️  No lessons found in database')
    return
  }

  console.log(`📊 Total lessons in database: ${lessons.length}\n`)

  // Analyze content
  const contentHashes = new Map<string, number>()
  const contentSamples = new Map<string, any[]>()

  for (const lesson of lessons) {
    const contentStr = JSON.stringify(lesson.content)
    const hash = contentStr.substring(0, 200) // Use first 200 chars as hash
    
    if (!contentHashes.has(hash)) {
      contentHashes.set(hash, 0)
      contentSamples.set(hash, [])
    }
    
    contentHashes.set(hash, contentHashes.get(hash)! + 1)
    contentSamples.get(hash)!.push({
      title: lesson.title,
      slug: lesson.slug,
      id: lesson.id
    })
  }

  console.log(`🔢 Unique content patterns found: ${contentHashes.size}\n`)

  // Show duplication details
  let duplicateCount = 0
  for (const [hash, count] of contentHashes.entries()) {
    if (count > 1) {
      duplicateCount++
      const samples = contentSamples.get(hash)!
      console.log(`⚠️  DUPLICATE CONTENT (${count} lessons):`)
      console.log(`   First 3 examples:`)
      samples.slice(0, 3).forEach(s => {
        console.log(`   - ${s.title} (${s.slug})`)
      })
      if (count > 3) {
        console.log(`   ... and ${count - 3} more`)
      }
      console.log()
    }
  }

  if (duplicateCount === 0) {
    console.log('✅ No duplicate content found - all lessons are unique!')
  } else {
    console.log(`❌ Found ${duplicateCount} duplicate content patterns`)
  }

  // Sample the most common duplicate
  const mostCommon = Array.from(contentHashes.entries())
    .sort((a, b) => b[1] - a[1])[0]
  
  if (mostCommon && mostCommon[1] > 1) {
    const sampleLesson = lessons.find(l => {
      const contentStr = JSON.stringify(l.content)
      return contentStr.substring(0, 200) === mostCommon[0]
    })
    
    console.log('\n📄 Sample of most common content:')
    console.log(JSON.stringify(sampleLesson?.content, null, 2).substring(0, 500))
    console.log('...\n')
  }

  // Show lessons without content
  const emptyLessons = lessons.filter(l => !l.content || 
    (typeof l.content === 'object' && Object.keys(l.content).length === 0))
  
  if (emptyLessons.length > 0) {
    console.log(`\n⚠️  Empty lessons (${emptyLessons.length}):`)
    emptyLessons.slice(0, 10).forEach(l => {
      console.log(`   - ${l.title} (${l.slug})`)
    })
    if (emptyLessons.length > 10) {
      console.log(`   ... and ${emptyLessons.length - 10} more`)
    }
  }
}

analyzeDuplication()
