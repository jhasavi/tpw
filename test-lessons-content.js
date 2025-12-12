const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://ckdshqbrxctjadljjhhy.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrZHNocWJyeGN0amFkbGpqaGh5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzQ2MjA3MywiZXhwIjoyMDY5MDM4MDczfQ.S6JWaRsp77mUs1SgjYQrN4Y1efNsBvn_n-V8lbnaB6Y'
);

async function checkLessons() {
  try {
    const { data, error } = await supabase
      .from('lessons')
      .select('id, title, slug, content')
      .in('slug', ['cutting-expenses-smart', 'emergency-fund-essentials', 'tracking-spending', 'investment-basics-beginners', 'stocks-and-bonds-explained', 'index-funds-vs-stocks']);
    
    if (error) {
      console.error('Error:', error);
      return;
    }
    
    console.log('🔍 Checking lesson content structure:\n');
    
    data.forEach(lesson => {
      console.log(`📖 ${lesson.title} (${lesson.slug})`);
      console.log('  Content keys:', Object.keys(lesson.content || {}));
      
      if (lesson.content) {
        console.log('  - Has introduction:', !!lesson.content.introduction);
        console.log('  - Has sections:', !!lesson.content.sections && Array.isArray(lesson.content.sections) && lesson.content.sections.length > 0);
        console.log('  - Has markdown:', !!lesson.content.markdown);
        
        const totalLen = (lesson.content.introduction || '').length + 
                        (lesson.content.markdown || '').length +
                        (lesson.content.sections || []).reduce((sum, s) => sum + (s.content || '').length, 0);
        
        console.log('  - Total content length:', totalLen, 'chars');
      }
      console.log('');
    });
  } catch (e) {
    console.error('Exception:', e.message);
  }
}

checkLessons();
