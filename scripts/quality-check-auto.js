#!/usr/bin/env node

/**
 * Automated Quality Check - The Purple Wings
 * 
 * This script fetches data from Supabase and generates a comprehensive report
 * showing all lessons with:
 * - "Lesson Coming Soon" (no content)
 * - "Error Loading Lesson" (missing/malformed content)
 * - Missing/incomplete data
 * - Empty courses
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

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
  bold: '\x1b[1m',
  dim: '\x1b[2m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log(`\n${colors.blue}${'═'.repeat(75)}${colors.reset}`);
  log(`  ${title}`, 'cyan');
  console.log(`${colors.blue}${'═'.repeat(75)}${colors.reset}\n`);
}

function fetchJson(url, options = {}) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('Request timeout'));
    }, 30000);

    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        clearTimeout(timeout);
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Failed to parse JSON: ${e.message}`));
        }
      });
    }).on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}

async function runQualityCheck() {
  logSection('AUTOMATED QUALITY CHECK - THE PURPLE WINGS');

  // Load environment variables
  const envPath = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) {
    log('❌ Error: .env.local not found', 'red');
    log('   Please ensure .env.local exists with Supabase credentials', 'yellow');
    process.exit(1);
  }

  // Parse .env.local
  const envContent = fs.readFileSync(envPath, 'utf8');
  const env = {};
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      env[key.trim()] = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
    }
  });

  const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    log('❌ Error: Missing Supabase credentials', 'red');
    log('   Please ensure .env.local has:', 'yellow');
    log('   - NEXT_PUBLIC_SUPABASE_URL', 'blue');
    log('   - SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY', 'blue');
    process.exit(1);
  }

  log(`✅ Found Supabase URL: ${supabaseUrl.replace(/https:\/\//, '').split('.')[0]}...`, 'green');
  log(`✅ Found API Key\n`, 'green');

  const report = {
    timestamp: new Date().toISOString(),
    lessonsScanned: 0,
    coursesScanned: 0,
    curriculaScanned: 0,
    issues: {
      comingSoon: [],
      errorLoading: [],
      missingContent: [],
      emptyCourses: [],
      orphanedLessons: [],
    },
    summary: {},
  };

  try {
    // Helper function to make API calls
    const apiCall = async (resource, filters = '') => {
      const url = `${supabaseUrl}/rest/v1/${resource}?${filters}`;
      const headers = {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      };
      return fetchJson(url, { headers });
    };

    // Fetch curricula
    log('📚 Fetching curricula...', 'yellow');
    const curricula = await apiCall('curricula', 'order=title.asc');
    report.curriculaScanned = curricula.length;
    log(`   Found ${curricula.length} curriculum(a)\n`, 'green');

    // Fetch courses
    log('📖 Fetching courses...', 'yellow');
    const courses = await apiCall('courses', 'order=title.asc&limit=1000');
    report.coursesScanned = courses.length;
    log(`   Found ${courses.length} course(s)\n`, 'green');

    // Create maps for quick lookup
    const curriculaMap = new Map(curricula.map(c => [c.id, c]));
    const coursesMap = new Map(courses.map(c => [c.id, c]));
    const coursesBySlug = new Map(courses.map(c => [c.slug, c]));

    // Check for courses with no lessons
    log('🔍 Scanning courses for lessons...', 'yellow');
    let coursesWithoutLessons = 0;

    for (const course of courses) {
      const lessons = await apiCall('lessons', `course_id=eq.${course.id}`);
      if (lessons.length === 0) {
        const curriculum = curriculaMap.get(course.curriculum_id);
        report.issues.emptyCourses.push({
          courseId: course.id,
          courseTitle: course.title,
          courseSlug: course.slug,
          curriculumSlug: curriculum?.slug,
          lessonCount: 0,
        });
        coursesWithoutLessons++;
        log(`   ⚠️  ${course.title} (${course.slug}) - No lessons`, 'yellow');
      }
    }

    if (coursesWithoutLessons === 0) {
      log(`   ✅ All courses have at least 1 lesson\n`, 'green');
    } else {
      log(`   Found ${coursesWithoutLessons} courses without lessons\n`, 'yellow');
    }

    // Fetch all lessons
    log('📝 Fetching lessons (this may take a moment)...', 'yellow');
    const lessons = await apiCall('lessons', 'select=*&order=title.asc&limit=1000');
    report.lessonsScanned = lessons.length;
    log(`   Found ${lessons.length} lesson(s)\n`, 'green');

    // Scan lessons for issues
    log('🔍 Analyzing lesson content...', 'yellow');

    let processedCount = 0;
    for (const lesson of lessons) {
      processedCount++;
      if (processedCount % 10 === 0) {
        process.stdout.write(`   Processed: ${processedCount}/${lessons.length}\r`);
      }

      const course = coursesMap.get(lesson.course_id);
      if (!course) {
        report.issues.orphanedLessons.push({
          lessonId: lesson.id,
          lessonTitle: lesson.title,
          lessonSlug: lesson.slug,
          issue: 'No associated course',
        });
        continue;
      }

      const curriculum = curriculaMap.get(course.curriculum_id);
      if (!curriculum) {
        report.issues.orphanedLessons.push({
          lessonId: lesson.id,
          lessonTitle: lesson.title,
          lessonSlug: lesson.slug,
          courseTitle: course.title,
          issue: 'Course has no curriculum',
        });
        continue;
      }

      const lessonUrl = `/learn/${curriculum.slug}/${course.slug}/${lesson.slug}`;

      // Check for content
      const hasContent = lesson.content &&
        typeof lesson.content === 'object' && (
          (lesson.content.introduction && lesson.content.introduction.length > 0) ||
          (Array.isArray(lesson.content.sections) && lesson.content.sections.length > 0) ||
          (lesson.content.markdown && lesson.content.markdown.length > 0)
        );

      if (!hasContent) {
        report.issues.comingSoon.push({
          lessonId: lesson.id,
          lessonTitle: lesson.title,
          courseTitle: course.title,
          courseSlug: course.slug,
          lessonSlug: lesson.slug,
          curriculumSlug: curriculum.slug,
          url: lessonUrl,
          contentStatus: lesson.content ? 'Empty' : 'Null',
        });
      }

      // Check for malformed content
      if (lesson.content && typeof lesson.content !== 'object') {
        report.issues.errorLoading.push({
          lessonId: lesson.id,
          lessonTitle: lesson.title,
          courseTitle: course.title,
          courseSlug: course.slug,
          lessonSlug: lesson.slug,
          curriculumSlug: curriculum.slug,
          url: lessonUrl,
          issue: 'Content is not an object',
        });
      }
    }

    console.log('   Analyzed: 100%            '); // Clear the counter line

    // Display results
    logSection('QUALITY CHECK RESULTS');

    // Summary counts
    const totalIssues =
      report.issues.comingSoon.length +
      report.issues.errorLoading.length +
      report.issues.missingContent.length +
      report.issues.emptyCourses.length +
      report.issues.orphanedLessons.length;

    log(`📊 Summary Statistics:`, 'cyan');
    log(`   Total Lessons: ${report.lessonsScanned}`, 'blue');
    log(`   Total Courses: ${report.coursesScanned}`, 'blue');
    log(`   Total Issues Found: ${totalIssues}`, 'blue');
    log(`   Coverage: ${Math.round((report.lessonsScanned - report.issues.comingSoon.length) / report.lessonsScanned * 100)}%\n`, 'blue');

    // Coming Soon Issues
    if (report.issues.comingSoon.length > 0) {
      logSection(`🚧 LESSONS SHOWING "COMING SOON" (${report.issues.comingSoon.length})`);

      report.issues.comingSoon.forEach((lesson, idx) => {
        log(`${idx + 1}. ${lesson.lessonTitle}`, 'white');
        log(`   📖 Course: ${lesson.courseTitle}`, 'white');
        log(`   🔗 URL: https://www.thepurplewings.org${lesson.url}`, 'cyan');
        log(`   Status: ${lesson.contentStatus}`, 'red');
      });
    }

    // Error Loading Issues
    if (report.issues.errorLoading.length > 0) {
      logSection(`⚠️  LESSONS WITH "ERROR LOADING" (${report.issues.errorLoading.length})`);

      report.issues.errorLoading.forEach((lesson, idx) => {
        log(`${idx + 1}. ${lesson.lessonTitle}`, 'white');
        log(`   📖 Course: ${lesson.courseTitle}`, 'white');
        log(`   🔗 URL: https://www.thepurplewings.org${lesson.url}`, 'cyan');
        log(`   Issue: ${lesson.issue}`, 'red');
      });
    }

    // Empty Courses
    if (report.issues.emptyCourses.length > 0) {
      logSection(`📭 COURSES WITH NO LESSONS (${report.issues.emptyCourses.length})`);

      report.issues.emptyCourses.forEach((course, idx) => {
        log(`${idx + 1}. ${course.courseTitle} (${course.courseSlug})`, 'white');
        log(`   💡 Action: Add lessons or unpublish course`, 'yellow');
      });
    }

    // Orphaned Lessons
    if (report.issues.orphanedLessons.length > 0) {
      logSection(`🚫 ORPHANED LESSONS (${report.issues.orphanedLessons.length})`);

      report.issues.orphanedLessons.forEach((lesson, idx) => {
        log(`${idx + 1}. ${lesson.lessonTitle}`, 'white');
        log(`   Issue: ${lesson.issue}`, 'red');
      });
    }

    // Action Items
    logSection('ACTION ITEMS & RECOMMENDATIONS');

    if (report.issues.comingSoon.length > 0) {
      log(`🔧 Fix "Coming Soon" Lessons (${report.issues.comingSoon.length}):`, 'magenta');
      log(`   1. Update each lesson with content in the database`, 'blue');
      log(`   2. Use migration scripts: npx ts-node scripts/populate-lesson-content.ts`, 'blue');
      log(`   3. Or temporarily unpublish these lessons`, 'blue');
      log(`   4. See SQL queries in scripts/quality-check-queries.sh for details\n`, 'blue');
    }

    if (report.issues.errorLoading.length > 0) {
      log(`🔧 Fix "Error Loading" Lessons (${report.issues.errorLoading.length}):`, 'magenta');
      log(`   1. Verify lesson content JSON structure`, 'blue');
      log(`   2. Check content field in database`, 'blue');
      log(`   3. Validate against Lesson type schema`, 'blue');
      log(`   4. See src/types/curriculum.ts for schema\n`, 'blue');
    }

    if (report.issues.emptyCourses.length > 0) {
      log(`🔧 Fix Empty Courses (${report.issues.emptyCourses.length}):`, 'magenta');
      log(`   1. Review these courses in the database`, 'blue');
      log(`   2. Add lessons to courses or unpublish them`, 'blue');
      log(`   3. Consider a "coming soon" status for future courses\n`, 'blue');
    }

    // Save report
    const reportFileName = `quality-check-${new Date().toISOString().split('T')[0]}.json`;
    const reportPath = path.join(process.cwd(), reportFileName);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    logSection('REPORT SAVED');
    log(`📄 Full report saved: ${reportFileName}`, 'green');
    log(`   View with: cat ${reportFileName}\n`, 'blue');

    // Final status
    logSection('FINAL STATUS');
    if (totalIssues === 0) {
      log('✅ PERFECT! No quality issues found!', 'green');
    } else if (report.issues.comingSoon.length > 0) {
      log(`⚠️  ${report.issues.comingSoon.length} lesson(s) need content`, 'red');
    }

    log(`\n📈 Run this check regularly to maintain quality\n`, 'cyan');

  } catch (error) {
    log(`\n❌ Error: ${error.message}`, 'red');
    if (error.message.includes('401') || error.message.includes('403')) {
      log('   Check your Supabase API keys in .env.local', 'yellow');
    }
    process.exit(1);
  }
}

// Run the check
runQualityCheck().catch(error => {
  log(`\n❌ Fatal error: ${error.message}`, 'red');
  process.exit(1);
});
