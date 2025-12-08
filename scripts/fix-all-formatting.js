#!/usr/bin/env node

/**
 * Scan all lessons for formatting issues and fix them
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(msg, color = 'reset') {
  console.log(`${colors[color]}${msg}${colors.reset}`);
}

function fixMarkdownBold(content) {
  if (!content) return content;
  
  // Convert to string if it's an object
  const str = typeof content === 'string' ? content : JSON.stringify(content);
  
  // Fix pattern: **text* (missing one closing asterisk)
  let fixed = str.replace(/\*\*([^*]+)\*(?!\*)/g, '**$1**');
  
  // Fix pattern: *text** (missing opening asterisk)
  fixed = fixed.replace(/(?<!\*)\*([^*]+)\*\*/g, '**$1**');
  
  return fixed;
}

function deepFix(obj) {
  if (typeof obj === 'string') {
    return fixMarkdownBold(obj);
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => deepFix(item));
  }
  
  if (obj !== null && typeof obj === 'object') {
    const fixed = {};
    for (const key in obj) {
      fixed[key] = deepFix(obj[key]);
    }
    return fixed;
  }
  
  return obj;
}

async function scanAndFixAll() {
  log('\n🔍 Scanning all lessons for formatting issues\n', 'cyan');

  try {
    const { data: lessons } = await supabase
      .from('lessons')
      .select('id, slug, title, content');

    let issuesFound = [];
    let issuesFixed = [];

    for (const lesson of lessons) {
      const originalStr = JSON.stringify(lesson.content);
      const hasIssues = /\*\*[^*]+\*(?!\*)|\*[^*]+\*\*/.test(originalStr);

      if (hasIssues) {
        issuesFound.push(lesson.slug);
        const fixedContent = deepFix(lesson.content);
        
        // Update in database
        const { error } = await supabase
          .from('lessons')
          .update({ content: fixedContent })
          .eq('id', lesson.id);

        if (!error) {
          issuesFixed.push(lesson.slug);
          log(`✅ Fixed: ${lesson.slug}`, 'green');
        } else {
          log(`❌ Error fixing ${lesson.slug}: ${error.message}`, 'red');
        }
      }
    }

    log(`\n📊 Summary:`, 'cyan');
    log(`   Issues found: ${issuesFound.length}`, 'yellow');
    log(`   Issues fixed: ${issuesFixed.length}`, 'green');

    if (issuesFixed.length > 0) {
      log(`\n✅ Fixed lessons:`, 'green');
      issuesFixed.forEach(slug => log(`   • ${slug}`, 'green'));
    }

  } catch (error) {
    log(`\n❌ Error: ${error}`, 'red');
  }
}

scanAndFixAll();
