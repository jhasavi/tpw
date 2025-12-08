#!/usr/bin/env node

/**
 * Comprehensive Quality Check Script - The Purple Wings
 * 
 * This script identifies and reports on all lessons with:
 * 1. "Lesson Coming Soon" - Lessons with no content
 * 2. "Error Loading Lesson" - Lessons that fail to load
 * 3. Missing content fields - Incomplete lesson data
 * 4. Orphaned courses - Courses with no lessons
 */

import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  white: '\x1b[37m',
}

function log(message: string, color: keyof typeof colors = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function logSection(title: string) {
  console.log(`\n${colors.blue}${'═'.repeat(70)}${colors.reset}`)
  log(`  ${title}`, 'cyan')
  console.log(`${colors.blue}${'═'.repeat(70)}${colors.reset}\n`)
}

interface LessonIssue {
  type: 'coming-soon' | 'error-loading' | 'missing-content' | 'empty-title'
  lessonId: string
  lessonTitle: string
  courseTitle: string
  courseSlug: string
  lessonSlug: string
  url: string
  severity: 'critical' | 'warning' | 'info'
  description: string
}

interface CourseIssue {
  type: 'no-lessons' | 'incomplete-metadata'
  courseId: string
  courseTitle: string
  courseSlug: string
  severity: 'critical' | 'warning'
  description: string
}

interface QualityCheckReport {
  timestamp: string
  lessonsScanned: number
  coursesScanned: number
  lessonIssues: LessonIssue[]
  courseIssues: CourseIssue[]
  summaryByType: Record<string, number>
  summaryBySeverity: Record<string, number>
}

async function runQualityCheck() {
  logSection('COMPREHENSIVE QUALITY CHECK - THE PURPLE WINGS')

  // Initialize Supabase
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    log('❌ Error: Missing Supabase environment variables', 'red')
    log('   Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY', 'yellow')
    process.exit(1)
  }

  const supabase = createClient(supabaseUrl, supabaseKey)
  const report: QualityCheckReport = {
    timestamp: new Date().toISOString(),
    lessonsScanned: 0,
    coursesScanned: 0,
    lessonIssues: [],
    courseIssues: [],
    summaryByType: {},
    summaryBySeverity: { critical: 0, warning: 0, info: 0 }
  }

  try {
    // Fetch all curricula
    log('📚 Fetching curricula...', 'yellow')
    const { data: curricula, error: curriculaError } = await supabase
      .from('curricula')
      .select('id, title, slug')
      .order('title')

    if (curriculaError || !curricula) {
      throw new Error(`Failed to fetch curricula: ${curriculaError?.message}`)
    }

    log(`   Found ${curricula.length} curriculum(s)`, 'green')

    // Fetch all courses
    log('\n📖 Fetching courses...', 'yellow')
    const { data: courses, error: coursesError } = await supabase
      .from('courses')
      .select('id, title, slug, curriculum_id')
      .order('title')

    if (coursesError || !courses) {
      throw new Error(`Failed to fetch courses: ${coursesError?.message}`)
    }

    report.coursesScanned = courses.length
    log(`   Found ${courses.length} course(s)`, 'green')

    // Create a map for quick lookup
    const curriculaMap = new Map(curricula.map(c => [c.id, c]))
    const coursesById = new Map(courses.map(c => [c.id, c]))

    // Check for courses with no lessons
    log('\n🔍 Scanning courses for completeness...', 'yellow')
    for (const course of courses) {
      const { data: lessons, error: lessonsError } = await supabase
        .from('lessons')
        .select('id')
        .eq('course_id', course.id)

      if (lessonsError) {
        log(`   ⚠️  Error checking ${course.title}: ${lessonsError.message}`, 'yellow')
        continue
      }

      if (!lessons || lessons.length === 0) {
        const curriculum = curriculaMap.get(course.curriculum_id)
        report.courseIssues.push({
          type: 'no-lessons',
          courseId: course.id,
          courseTitle: course.title,
          courseSlug: course.slug,
          severity: 'warning',
          description: `No lessons found for course "${course.title}"`
        })
      }
    }

    if (report.courseIssues.length > 0) {
      log(`   Found ${report.courseIssues.length} course(s) with issues`, 'yellow')
    } else {
      log('   ✅ All courses have lessons', 'green')
    }

    // Fetch all lessons
    log('\n📝 Fetching lessons...', 'yellow')
    const { data: lessons, error: lessonsError } = await supabase
      .from('lessons')
      .select('id, title, slug, course_id, content, created_at')
      .order('title')

    if (lessonsError || !lessons) {
      throw new Error(`Failed to fetch lessons: ${lessonsError?.message}`)
    }

    report.lessonsScanned = lessons.length
    log(`   Found ${lessons.length} lesson(s)`, 'green')

    // Scan each lesson for issues
    log('\n🔍 Scanning lessons for content issues...', 'yellow')
    let processedCount = 0

    for (const lesson of lessons) {
      processedCount++
      const progress = `[${processedCount}/${lessons.length}]`

      const course = coursesById.get(lesson.course_id)
      if (!course) {
        log(`   ${progress} ⚠️  Lesson "${lesson.title}" has no associated course`, 'yellow')
        continue
      }

      const curriculum = curriculaMap.get(course.curriculum_id)
      if (!curriculum) {
        log(`   ${progress} ⚠️  Course "${course.title}" has no associated curriculum`, 'yellow')
        continue
      }

      const lessonUrl = `/learn/${curriculum.slug}/${course.slug}/${lesson.slug}`
      let hasIssues = false
      const issues: LessonIssue[] = []

      // Check for empty/missing content (Lesson Coming Soon)
      const hasContent = lesson.content &&
        typeof lesson.content === 'object' && (
          ('introduction' in lesson.content && lesson.content.introduction) ||
          ('sections' in lesson.content && Array.isArray(lesson.content.sections) && lesson.content.sections.length > 0) ||
          ('markdown' in lesson.content && lesson.content.markdown && typeof lesson.content.markdown === 'string' && lesson.content.markdown.length > 0)
        )

      if (!hasContent) {
        hasIssues = true
        issues.push({
          type: 'coming-soon',
          lessonId: lesson.id,
          lessonTitle: lesson.title,
          courseTitle: course.title,
          courseSlug: course.slug,
          lessonSlug: lesson.slug,
          url: lessonUrl,
          severity: 'critical',
          description: `Lesson shows "Coming Soon" - no content in database`
        })
      }

      // Check for empty/null lesson title
      if (!lesson.title || lesson.title.trim().length === 0) {
        hasIssues = true
        issues.push({
          type: 'empty-title',
          lessonId: lesson.id,
          lessonTitle: lesson.title || '[No Title]',
          courseTitle: course.title,
          courseSlug: course.slug,
          lessonSlug: lesson.slug,
          url: lessonUrl,
          severity: 'critical',
          description: `Lesson has no title`
        })
      }

      // Check for null/missing content field (potential Error Loading Lesson)
      if (!lesson.content) {
        hasIssues = true
        issues.push({
          type: 'missing-content',
          lessonId: lesson.id,
          lessonTitle: lesson.title,
          courseTitle: course.title,
          courseSlug: course.slug,
          lessonSlug: lesson.slug,
          url: lessonUrl,
          severity: 'critical',
          description: `Lesson has null/undefined content field - may cause "Error Loading Lesson"`
        })
      }

      // Check for incomplete/malformed content (malformed JSON could cause error loading)
      if (lesson.content && typeof lesson.content === 'object') {
        const content = lesson.content as any
        
        // Check if content has expected structure
        const isWellFormed = (
          (content.introduction && typeof content.introduction === 'string') ||
          (Array.isArray(content.sections)) ||
          (content.markdown && typeof content.markdown === 'string') ||
          (content.keyTakeaways && Array.isArray(content.keyTakeaways))
        )

        if (content.sections && Array.isArray(content.sections)) {
          // Validate each section has required fields
          for (const section of content.sections) {
            if (!section.title || !section.content) {
              hasIssues = true
              issues.push({
                type: 'missing-content',
                lessonId: lesson.id,
                lessonTitle: lesson.title,
                courseTitle: course.title,
                courseSlug: course.slug,
                lessonSlug: lesson.slug,
                url: lessonUrl,
                severity: 'warning',
                description: `Section in lesson is incomplete (missing title or content)`
              })
              break
            }
          }
        }
      }

      report.lessonIssues.push(...issues)

      if (hasIssues) {
        issues.forEach(issue => {
          const emoji = issue.severity === 'critical' ? '🚨' : '⚠️'
          log(`   ${progress} ${emoji} [${issue.severity.toUpperCase()}] ${issue.type}: ${lesson.title}`, 
              issue.severity === 'critical' ? 'red' : 'yellow')
        })
      } else {
        log(`   ${progress} ✅ ${lesson.title}`, 'green')
      }
    }

    // Summarize by type
    for (const issue of report.lessonIssues) {
      report.summaryByType[issue.type] = (report.summaryByType[issue.type] || 0) + 1
      report.summaryBySeverity[issue.severity]++
    }

    // Generate report
    logSection('QUALITY CHECK REPORT')

    log(`📊 Summary:`, 'cyan')
    log(`   Lessons Scanned: ${report.lessonsScanned}`, 'blue')
    log(`   Courses Scanned: ${report.coursesScanned}`, 'blue')
    log(`   Lesson Issues Found: ${report.lessonIssues.length}`, 'blue')
    log(`   Course Issues Found: ${report.courseIssues.length}`, 'blue')
    log(`   Total Issues: ${report.lessonIssues.length + report.courseIssues.length}`, 'blue')

    if (report.lessonIssues.length > 0) {
      logSection('LESSON ISSUES')

      // Group by type
      const issuesByType = new Map<string, LessonIssue[]>()
      for (const issue of report.lessonIssues) {
        if (!issuesByType.has(issue.type)) {
          issuesByType.set(issue.type, [])
        }
        issuesByType.get(issue.type)!.push(issue)
      }

      // Display by severity
      const bySeverity: Record<string, LessonIssue[]> = { critical: [], warning: [], info: [] }
      for (const issue of report.lessonIssues) {
        bySeverity[issue.severity].push(issue)
      }

      if (bySeverity.critical.length > 0) {
        log(`🚨 CRITICAL ISSUES (${bySeverity.critical.length}):`, 'red')
        for (const issue of bySeverity.critical) {
          log(`\n   📌 ${issue.lessonTitle}`, 'white')
          log(`      Course: ${issue.courseTitle}`, 'white')
          log(`      URL: https://www.thepurplewings.org${issue.url}`, 'white')
          log(`      Issue: ${issue.description}`, 'red')
          log(`      Type: ${issue.type}`, 'yellow')
        }
      }

      if (bySeverity.warning.length > 0) {
        log(`\n⚠️  WARNING ISSUES (${bySeverity.warning.length}):`, 'yellow')
        for (const issue of bySeverity.warning) {
          log(`   📌 ${issue.lessonTitle} (${issue.courseTitle})`, 'white')
          log(`      ${issue.description}`, 'yellow')
        }
      }

      log(`\n📈 Issues by Type:`, 'cyan')
      for (const [type, count] of Object.entries(report.summaryByType)) {
        const color = count > 0 ? 'yellow' : 'green'
        log(`   ${type}: ${count}`, color)
      }
    } else {
      log('✅ No lesson issues found!', 'green')
    }

    if (report.courseIssues.length > 0) {
      logSection('COURSE ISSUES')

      for (const issue of report.courseIssues) {
        log(`⚠️  ${issue.courseTitle} (${issue.courseSlug})`, 'yellow')
        log(`   ${issue.description}`, 'yellow')
      }
    }

    // Save report to file
    const reportPath = path.join(process.cwd(), `quality-check-report-${Date.now()}.json`)
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
    log(`\n📄 Full report saved to: ${reportPath}`, 'blue')

    // Print action items
    logSection('ACTION ITEMS')

    if (report.summaryByType['coming-soon'] && report.summaryByType['coming-soon'] > 0) {
      log(`🔧 Fix "Coming Soon" lessons (${report.summaryByType['coming-soon']}):`, 'magenta')
      log(`   1. Update lessons with missing content`, 'blue')
      log(`   2. Use database migration scripts to populate content`, 'blue')
      log(`   3. Or hide/unpublish these lessons temporarily`, 'blue')
    }

    if (report.summaryByType['error-loading'] && report.summaryByType['error-loading'] > 0) {
      log(`\n🔧 Fix "Error Loading" lessons (${report.summaryByType['error-loading']}):`, 'magenta')
      log(`   1. Check lesson content structure`, 'blue')
      log(`   2. Validate JSON format in database`, 'blue')
      log(`   3. Check for null/undefined content`, 'blue')
    }

    if (report.summaryByType['missing-content'] && report.summaryByType['missing-content'] > 0) {
      log(`\n🔧 Fix missing content lessons (${report.summaryByType['missing-content']}):`, 'magenta')
      log(`   1. Add content to lessons`, 'blue')
      log(`   2. Validate content structure`, 'blue')
      log(`   3. Run content population scripts`, 'blue')
    }

    if (report.courseIssues.length > 0) {
      log(`\n🔧 Fix courses with no lessons (${report.courseIssues.length}):`, 'magenta')
      log(`   1. Add lessons to empty courses`, 'blue')
      log(`   2. Or hide/unpublish these courses`, 'blue')
      log(`   3. Or delete courses if no longer needed`, 'blue')
    }

    // Final summary
    logSection('FINAL SUMMARY')

    const totalIssues = report.lessonIssues.length + report.courseIssues.length
    const criticalCount = report.summaryBySeverity.critical

    if (totalIssues === 0) {
      log('✅ EXCELLENT! No quality issues found!', 'green')
    } else {
      log(`⚠️  Found ${totalIssues} issue(s) - ${criticalCount} critical`, 
          criticalCount > 0 ? 'red' : 'yellow')
    }

    log(`\nReport generated: ${report.timestamp}`, 'cyan')
    log(`Coverage: ${lessons.length} lessons across ${courses.length} courses`, 'cyan')

  } catch (error) {
    log(`\n❌ Error: ${error instanceof Error ? error.message : String(error)}`, 'red')
    process.exit(1)
  }
}

// Run the check
runQualityCheck().catch(error => {
  log(`\n❌ Fatal error: ${error.message}`, 'red')
  process.exit(1)
})
