/**
 * Audit all lessons and assess quality
 */

import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

interface LessonAudit {
  curriculum: string
  course: string
  lesson: string
  slug: string
  hasIntro: boolean
  hasSections: boolean
  hasKeyTakeaways: boolean
  hasResources: boolean
  hasActionItems: boolean
  contentLength: number
  quality: 'COMPLETE' | 'PARTIAL' | 'MINIMAL' | 'EMPTY'
}

async function auditLessons() {
  console.log('🔍 Auditing all lesson quality...\n')

  try {
    // Get all lessons with content
    const { data: lessons, error } = await supabase
      .from('lessons')
      .select(`
        id,
        title,
        slug,
        content,
        courses(
          id,
          title,
          slug,
          curricula(
            id,
            title,
            slug
          )
        )
      `)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Error fetching lessons:', error)
      return
    }

    if (!lessons || lessons.length === 0) {
      console.log('No lessons found')
      return
    }

    const audits: LessonAudit[] = []
    let complete = 0
    let partial = 0
    let minimal = 0
    let empty = 0

    console.log(`📚 Total lessons: ${lessons.length}\n`)
    console.log('Analyzing content quality...\n')

    for (const lesson of lessons) {
      const course = (lesson as any).courses
      const curriculum = course?.curricula || {}
      const content = lesson.content || {}

      const hasIntro = !!content.introduction && typeof content.introduction === 'string' && content.introduction.trim().length > 50
      const hasSections = Array.isArray(content.sections) && content.sections.length > 0
      const hasKeyTakeaways = Array.isArray(content.keyTakeaways) && content.keyTakeaways.length > 0
      const hasResources = Array.isArray(content.resources) && content.resources.length > 0
      const hasActionItems = Array.isArray(content.actionItems) && content.actionItems.length > 0

      const contentLength = JSON.stringify(content).length

      let quality: 'COMPLETE' | 'PARTIAL' | 'MINIMAL' | 'EMPTY'
      const scoreElements = [hasIntro, hasSections, hasKeyTakeaways, hasResources, hasActionItems].filter(Boolean).length

      if (scoreElements >= 4) {
        quality = 'COMPLETE'
        complete++
      } else if (scoreElements >= 2) {
        quality = 'PARTIAL'
        partial++
      } else if (scoreElements >= 1) {
        quality = 'MINIMAL'
        minimal++
      } else {
        quality = 'EMPTY'
        empty++
      }

      audits.push({
        curriculum: curriculum.title || 'Unknown',
        course: course?.title || 'Unknown',
        lesson: lesson.title,
        slug: lesson.slug,
        hasIntro,
        hasSections,
        hasKeyTakeaways,
        hasResources,
        hasActionItems,
        contentLength,
        quality
      })
    }

    // Summary
    console.log('📊 QUALITY SUMMARY\n')
    console.log(`  ✅ Complete (4+ sections):   ${complete}`)
    console.log(`  ⚠️  Partial (2-3 sections):  ${partial}`)
    console.log(`  ⏳ Minimal (1 section):      ${minimal}`)
    console.log(`  ❌ Empty (0 sections):      ${empty}`)
    console.log(`  Total: ${lessons.length}\n`)

    // Group by quality
    console.log('\n═══════════════════════════════════════════════════════\n')
    console.log('LESSONS NEEDING IMPROVEMENT (PARTIAL, MINIMAL, EMPTY):\n')

    const needsWork = audits.filter(a => a.quality !== 'COMPLETE')
    
    if (needsWork.length === 0) {
      console.log('✅ All lessons are complete!')
    } else {
      // Group by curriculum and course
      const grouped = needsWork.reduce((acc, audit) => {
        const key = `${audit.curriculum} > ${audit.course}`
        if (!acc[key]) acc[key] = []
        acc[key].push(audit)
        return acc
      }, {} as Record<string, LessonAudit[]>)

      for (const [group, items] of Object.entries(grouped)) {
        console.log(`\n📚 ${group}`)
        console.log('─'.repeat(60))
        for (const item of items) {
          console.log(`  • ${item.lesson} [${item.quality}]`)
          if (!item.hasIntro) console.log(`    ⚠️  Missing introduction`)
          if (!item.hasSections) console.log(`    ⚠️  Missing detailed sections`)
          if (!item.hasKeyTakeaways) console.log(`    ⚠️  Missing key takeaways`)
          if (!item.hasResources) console.log(`    ⚠️  Missing resources`)
          if (!item.hasActionItems) console.log(`    ⚠️  Missing action items`)
        }
      }
    }

    // Export as JSON for analysis
    console.log('\n\n═══════════════════════════════════════════════════════')
    console.log('\nDetailed audit saved to audit-report.json')
    
    const fs = await import('fs/promises')
    await fs.writeFile(
      'audit-report.json',
      JSON.stringify({
        summary: {
          total: lessons.length,
          complete,
          partial,
          minimal,
          empty
        },
        audits: audits.sort((a, b) => {
          const qualityOrder = { EMPTY: 0, MINIMAL: 1, PARTIAL: 2, COMPLETE: 3 }
          return qualityOrder[a.quality] - qualityOrder[b.quality]
        })
      }, null, 2),
      'utf-8'
    )

  } catch (error) {
    console.error('Error:', error)
  }
}

auditLessons()
