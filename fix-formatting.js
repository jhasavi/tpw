const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://ckdshqbrxctjadljjhhy.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrZHNocWJyeGN0amFkbGpqaGh5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzQ2MjA3MywiZXhwIjoyMDY5MDM4MDczfQ.S6JWaRsp77mUs1SgjYQrN4Y1efNsBvn_n-V8lbnaB6Y'
);

function fixTextFormatting(text) {
  if (!text || typeof text !== 'string') return text;
  
  let fixed = text;
  
  // Fix lines starting with asterisks (*, **, ***) - convert to markdown headings
  // * Title -> # Title
  // ** Title -> ## Title  
  // *** Title -> ### Title
  fixed = fixed.replace(/^\*{1,3}\s+(.+)$/gm, (match) => {
    const asteriskCount = (match.match(/^\*/g) || []).length;
    const title = match.replace(/^\*+\s+/, '');
    const headingLevel = Math.min(asteriskCount, 3);
    return '#'.repeat(headingLevel) + ' ' + title;
  });
  
  // Fix duplicate heading markers (### # Title -> ### Title)
  fixed = fixed.replace(/^(#{1,6})\s+#+\s+(.+)$/gm, '$1 $2');
  
  // Ensure single space after heading markers
  fixed = fixed.replace(/^(#{1,6})\s+(.+)$/gm, '$1 $2');
  
  // Fix bold/italic formatting (remove extra spaces)
  fixed = fixed.replace(/\*{2}\s+(.+?)\s+\*{2}/g, '**$1**');
  fixed = fixed.replace(/\*\s+(.+?)\s+\*/g, '*$1*');
  
  // Fix bullet points with asterisks or plus signs -> use dashes
  fixed = fixed.replace(/^\s*[*+]\s+(.+)$/gm, '- $1');
  
  // Fix numbered lists to have consistent formatting
  fixed = fixed.replace(/^\s*\d+\.\s+(.+)$/gm, (match) => {
    const num = match.match(/^\s*(\d+)\./)[1];
    const content = match.replace(/^\s*\d+\.\s+/, '');
    return num + '. ' + content;
  });
  
  // Remove trailing whitespace from lines
  fixed = fixed.split('\n').map(line => line.trimEnd()).join('\n');
  
  // Fix multiple blank lines (max 2 consecutive blank lines)
  fixed = fixed.replace(/\n{3,}/g, '\n\n');
  
  return fixed;
}

function fixContentStructure(content) {
  if (!content || typeof content !== 'object') return content;
  
  const fixed = { ...content };
  
  // Fix introduction
  if (fixed.introduction && typeof fixed.introduction === 'string') {
    fixed.introduction = fixTextFormatting(fixed.introduction);
  }
  
  // Fix markdown content
  if (fixed.markdown && typeof fixed.markdown === 'string') {
    fixed.markdown = fixTextFormatting(fixed.markdown);
  }
  
  // Fix sections
  if (Array.isArray(fixed.sections)) {
    fixed.sections = fixed.sections.map(section => {
      const fixedSection = { ...section };
      
      if (fixedSection.title && typeof fixedSection.title === 'string') {
        fixedSection.title = fixTextFormatting(fixedSection.title);
      }
      
      if (fixedSection.content && typeof fixedSection.content === 'string') {
        fixedSection.content = fixTextFormatting(fixedSection.content);
      }
      
      if (Array.isArray(fixedSection.examples)) {
        fixedSection.examples = fixedSection.examples.map(ex => 
          typeof ex === 'string' ? fixTextFormatting(ex) : ex
        );
      }
      
      if (Array.isArray(fixedSection.tips)) {
        fixedSection.tips = fixedSection.tips.map(tip => 
          typeof tip === 'string' ? fixTextFormatting(tip) : tip
        );
      }
      
      return fixedSection;
    });
  }
  
  // Fix key takeaways
  if (Array.isArray(fixed.keyTakeaways)) {
    fixed.keyTakeaways = fixed.keyTakeaways.map(item => 
      typeof item === 'string' ? fixTextFormatting(item) : item
    );
  }
  
  // Fix action items
  if (Array.isArray(fixed.actionItems)) {
    fixed.actionItems = fixed.actionItems.map(item => 
      typeof item === 'string' ? fixTextFormatting(item) : item
    );
  }
  
  return fixed;
}

async function fixAllFormatting() {
  try {
    console.log('🎨 Fixing formatting in all lessons...\n');
    
    const { data: allLessons, error: fetchError } = await supabase
      .from('lessons')
      .select('id, title, content')
      .order('title');
    
    if (fetchError) {
      console.error('Error fetching lessons:', fetchError);
      return;
    }
    
    console.log(`📚 Found ${allLessons.length} lessons\n`);
    console.log('🔄 Analyzing and fixing formatting...\n');
    
    let successCount = 0;
    let errorCount = 0;
    let unchangedCount = 0;
    const fixedLessons = [];
    
    for (const lesson of allLessons) {
      try {
        const originalContent = JSON.stringify(lesson.content);
        const fixedContent = fixContentStructure(lesson.content);
        const newContentStr = JSON.stringify(fixedContent);
        
        if (originalContent === newContentStr) {
          unchangedCount++;
          continue;
        }
        
        const { error: updateError } = await supabase
          .from('lessons')
          .update({ content: fixedContent })
          .eq('id', lesson.id);
        
        if (updateError) {
          console.error(`❌ Error updating ${lesson.title}:`, updateError.message);
          errorCount++;
        } else {
          console.log(`✅ Fixed formatting: ${lesson.title}`);
          fixedLessons.push(lesson.title);
          successCount++;
        }
      } catch (err) {
        console.error(`❌ Exception updating ${lesson.title}:`, err.message);
        errorCount++;
      }
    }
    
    console.log(`\n📊 Formatting Fix Complete:`);
    console.log(`✅ Successfully fixed: ${successCount}`);
    console.log(`⏭️  Unchanged: ${unchangedCount}`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📚 Total lessons: ${allLessons.length}`);
    
    if (fixedLessons.length > 0) {
      console.log(`\n✅ Fixed lessons:`);
      fixedLessons.forEach(title => console.log(`  - ${title}`));
    }
    
  } catch (err) {
    console.error('Fatal error:', err.message);
  }
}

fixAllFormatting();
