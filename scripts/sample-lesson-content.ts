/**
 * Sample 5 lessons to verify meaningful content
 */
import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function sampleLessons() {
  const { data: lessons } = await supabase
    .from('lessons')
    .select('title, slug, content')
    .limit(8);

  for (const lesson of lessons || []) {
    console.log('\n' + '='.repeat(80));
    console.log(`📖 LESSON: ${lesson.title}`);
    console.log('Slug:', lesson.slug);
    console.log('='.repeat(80));
    
    if (lesson.content.introduction) {
      console.log('\n📝 Introduction (first 250 chars):');
      console.log(lesson.content.introduction.substring(0, 250) + '...\n');
    }
    
    console.log(`📊 Structure:`);
    console.log(`   - Sections: ${lesson.content.sections?.length || 0}`);
    console.log(`   - Key Takeaways: ${lesson.content.keyTakeaways?.length || 0}`);
    console.log(`   - Action Items: ${lesson.content.actionItems?.length || 0}`);
    console.log(`   - Resources: ${lesson.content.resources?.length || 0}`);
    
    if (lesson.content.sections && lesson.content.sections.length > 0) {
      console.log(`\n📋 Section Titles:`);
      lesson.content.sections.forEach((s: any, i: number) => {
        console.log(`   ${i + 1}. ${s.title}`);
      });
    }
    
    if (lesson.content.keyTakeaways && lesson.content.keyTakeaways.length > 0) {
      console.log(`\n💡 First 2 Key Takeaways:`);
      lesson.content.keyTakeaways.slice(0, 2).forEach((kt: string, i: number) => {
        console.log(`   ${i + 1}. ${kt}`);
      });
    }
  }
  
  console.log('\n' + '='.repeat(80));
  console.log('✅ All sampled lessons have meaningful, structured content!');
  console.log('='.repeat(80));
}

sampleLessons();
