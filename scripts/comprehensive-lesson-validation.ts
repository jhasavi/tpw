import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

interface ValidationIssue {
  lessonId: string
  title: string
  slug: string
  issue: string
}

async function comprehensiveValidation() {
  console.log('🔍 Running comprehensive lesson validation...\n')
  
  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('id, title, slug, description, content, objectives, duration_minutes')
    .order('id')
  
  if (error) {
    console.error('❌ Error fetching lessons:', error)
    return
  }
  
  console.log(`Checking ${lessons.length} lessons...\n`)
  
  const issues: ValidationIssue[] = []
  
  for (const lesson of lessons) {
    // Check objectives
    if (!lesson.objectives || !Array.isArray(lesson.objectives) || lesson.objectives.length === 0) {
      issues.push({
        lessonId: lesson.id,
        title: lesson.title,
        slug: lesson.slug,
        issue: 'Missing or empty objectives array'
      })
    }
    
    // Check content
    if (!lesson.content) {
      issues.push({
        lessonId: lesson.id,
        title: lesson.title,
        slug: lesson.slug,
        issue: 'No content'
      })
      continue
    }
    
    const content = lesson.content
    
    // Check if content has introduction or sections or markdown
    const hasIntroduction = 'introduction' in content && content.introduction
    const hasSections = 'sections' in content && Array.isArray(content.sections) && content.sections.length > 0
    const hasMarkdown = 'markdown' in content && content.markdown && typeof content.markdown === 'string' && content.markdown.length > 0
    
    if (!hasIntroduction && !hasSections && !hasMarkdown) {
      issues.push({
        lessonId: lesson.id,
        title: lesson.title,
        slug: lesson.slug,
        issue: 'Content has no introduction, sections, or markdown'
      })
    }
    
    // Check sections structure if exists
    if (hasSections) {
      for (let i = 0; i < content.sections.length; i++) {
        const section = content.sections[i]
        if (!section.title) {
          issues.push({
            lessonId: lesson.id,
            title: lesson.title,
            slug: lesson.slug,
            issue: `Section ${i} missing title`
          })
        }
        if (!section.content) {
          issues.push({
            lessonId: lesson.id,
            title: lesson.title,
            slug: lesson.slug,
            issue: `Section ${i} missing content`
          })
        }
      }
    }
    
    // Check keyTakeaways
    if (!content.keyTakeaways || !Array.isArray(content.keyTakeaways)) {
      issues.push({
        lessonId: lesson.id,
        title: lesson.title,
        slug: lesson.slug,
        issue: 'keyTakeaways is not an array'
      })
    }
    
    // Check actionItems
    if (!content.actionItems || !Array.isArray(content.actionItems)) {
      issues.push({
        lessonId: lesson.id,
        title: lesson.title,
        slug: lesson.slug,
        issue: 'actionItems is not an array'
      })
    }
    
    // Check resources
    if (!content.resources || !Array.isArray(content.resources)) {
      issues.push({
        lessonId: lesson.id,
        title: lesson.title,
        slug: lesson.slug,
        issue: 'resources is not an array'
      })
    } else {
      for (let i = 0; i < content.resources.length; i++) {
        const resource = content.resources[i]
        if (!resource.title) {
          issues.push({
            lessonId: lesson.id,
            title: lesson.title,
            slug: lesson.slug,
            issue: `Resource ${i} missing title`
          })
        }
        if (!resource.url) {
          issues.push({
            lessonId: lesson.id,
            title: lesson.title,
            slug: lesson.slug,
            issue: `Resource ${i} missing URL`
          })
        }
      }
    }
  }
  
  console.log('='.repeat(70))
  if (issues.length === 0) {
    console.log('✅ ALL 135 LESSONS VALIDATED SUCCESSFULLY!')
    console.log('   All lessons have:')
    console.log('   - Valid objectives array')
    console.log('   - Content (introduction/sections/markdown)')
    console.log('   - Proper section structure')
    console.log('   - Key takeaways array')
    console.log('   - Action items array')
    console.log('   - Resources array with titles and URLs')
    console.log('\n🎉 The production site should now work correctly!')
  } else {
    console.log(`⚠️  FOUND ${issues.length} ISSUES:\n`)
    issues.forEach((issue, idx) => {
      console.log(`${idx + 1}. ${issue.title} (${issue.slug})`)
      console.log(`   Issue: ${issue.issue}`)
      console.log(`   ID: ${issue.lessonId}`)
      console.log()
    })
  }
  console.log('='.repeat(70))
}

comprehensiveValidation()
