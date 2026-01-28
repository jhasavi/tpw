/**
 * Check specific lesson that's failing on production
 */
import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function checkLesson() {
  // Get the specific failing lesson
  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('id, slug, title, content')
    .eq('slug', 'creating-first-budget')
  
  if (error) {
    console.error('Error:', error);
    return;
  }
  
  console.log(`Found ${lessons?.length} lessons with slug 'creating-first-budget'\n`);
  
  for (const lesson of lessons || []) {
    console.log('Lesson:', lesson.title);
    console.log('Content type:', typeof lesson.content);
    console.log('Content keys:', Object.keys(lesson.content || {}));
    
    if (lesson.content?.sections) {
      console.log('Number of sections:', lesson.content.sections.length);
      console.log('First section structure:', JSON.stringify(lesson.content.sections[0], null, 2).substring(0, 500));
    }
    
    // Check for problematic content
    const contentStr = JSON.stringify(lesson.content);
    console.log('Content size:', contentStr.length, 'characters');
    
    // Check if content is too deeply nested
    const maxDepth = (obj: any, depth = 0): number => {
      if (typeof obj !== 'object' || obj === null) return depth;
      return Math.max(...Object.values(obj).map(v => maxDepth(v, depth + 1)));
    };
    
    console.log('Max nesting depth:', maxDepth(lesson.content));
    console.log('\n');
  }
}

checkLesson();
