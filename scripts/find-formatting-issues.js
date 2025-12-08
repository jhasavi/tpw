#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function findFormattingIssues() {
  const { data: lessons } = await supabase
    .from('lessons')
    .select('slug, title, content');

  let issues = [];
  lessons.forEach(lesson => {
    const content = JSON.stringify(lesson.content);
    // Look for pattern like "**text*" (missing closing asterisk)
    if (content.includes('**') && content.match(/\*\*[^*]+\*(?!\*)/g)) {
      const matches = content.match(/\*\*[^*]+\*(?!\*)/g) || [];
      issues.push({
        slug: lesson.slug,
        title: lesson.title,
        count: matches.length,
        examples: matches.slice(0, 2)
      });
    }
  });

  console.log('\n📋 Lessons with formatting issues:');
  console.log(`Total: ${issues.length}\n`);
  
  issues.slice(0, 30).forEach(i => {
    console.log(`  • ${i.slug}`);
    console.log(`    Title: ${i.title}`);
    console.log(`    Issues found: ${i.count}\n`);
  });
}

findFormattingIssues().catch(console.error);
