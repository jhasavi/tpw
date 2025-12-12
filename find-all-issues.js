const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://ckdshqbrxctjadljjhhy.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrZHNocWJyeGN0amFkbGpqaGh5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzQ2MjA3MywiZXhwIjoyMDY5MDM4MDczfQ.S6JWaRsp77mUs1SgjYQrN4Y1efNsBvn_n-V8lbnaB6Y'
);

async function findProblematicLessons() {
  try {
    console.log('🔍 Finding all lessons with potential issues...\n');
    
    // Get all lessons
    const { data: allLessons, error: fetchError } = await supabase
      .from('lessons')
      .select('id, title, slug, content, courses(slug, curricula(slug))')
      .order('title');
    
    if (fetchError) {
      console.error('Error fetching lessons:', fetchError);
      return;
    }
    
    const problemLessons = [];
    const underdevelopedLessons = [];
    const allWithIssues = [];
    
    console.log(`📚 Analyzing ${allLessons.length} lessons...\n`);
    
    for (const lesson of allLessons) {
      const course = lesson.courses;
      const curriculum = course?.curricula;
      
      if (!curriculum || !course) continue;
      
      const url = `/learn/${curriculum.slug}/${course.slug}/${lesson.slug}`;
      const fullUrl = `https://www.thepurplewings.org${url}`;
      
      const content = lesson.content;
      
      // Check for missing/invalid content
      const hasIntroduction = content?.introduction && typeof content.introduction === 'string' && content.introduction.trim().length > 50;
      const hasSections = content?.sections && Array.isArray(content.sections) && content.sections.length > 0;
      const hasMarkdown = content?.markdown && typeof content.markdown === 'string' && content.markdown.trim().length > 50;
      
      const hasContent = hasIntroduction || hasSections || hasMarkdown;
      
      // Check for underdeveloped content
      const contentStr = JSON.stringify(content).toLowerCase();
      const underdevelopedPatterns = [
        'being actively developed',
        'check back for updates',
        'coming soon',
        'work in progress',
        'placeholder'
      ];
      
      const isUnderdeveloped = underdevelopedPatterns.some(pattern => contentStr.includes(pattern));
      
      if (!hasContent) {
        problemLessons.push({
          title: lesson.title,
          url: fullUrl,
          issue: 'NO_CONTENT'
        });
        allWithIssues.push(fullUrl);
      }
      
      if (isUnderdeveloped) {
        underdevelopedLessons.push({
          title: lesson.title,
          url: fullUrl,
          issue: 'UNDERDEVELOPED'
        });
        allWithIssues.push(fullUrl);
      }
    }
    
    if (problemLessons.length > 0) {
      console.log(`\n❌ LESSONS WITH NO CONTENT (${problemLessons.length}):\n`);
      problemLessons.forEach((lesson, idx) => {
        console.log(`${idx + 1}. ${lesson.title}`);
        console.log(`   ${lesson.url}\n`);
      });
    }
    
    if (underdevelopedLessons.length > 0) {
      console.log(`\n🛠️  UNDERDEVELOPED LESSONS (${underdevelopedLessons.length}):\n`);
      underdevelopedLessons.forEach((lesson, idx) => {
        console.log(`${idx + 1}. ${lesson.title}`);
        console.log(`   ${lesson.url}\n`);
      });
    }
    
    console.log(`\n📊 SUMMARY:`);
    console.log(`  - Total lessons: ${allLessons.length}`);
    console.log(`  - Lessons with no content: ${problemLessons.length}`);
    console.log(`  - Underdeveloped lessons: ${underdevelopedLessons.length}`);
    console.log(`  - Pages with issues: ${allWithIssues.length}`);
    
    if (allWithIssues.length > 0) {
      console.log(`\n📋 ALL PROBLEMATIC PAGES:`);
      allWithIssues.forEach((url, idx) => {
        console.log(`${idx + 1}. ${url}`);
      });
    }
    
  } catch (e) {
    console.error('Exception:', e.message);
  }
}

findProblematicLessons();
