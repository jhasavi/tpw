const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://ckdshqbrxctjadljjhhy.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrZHNocWJyeGN0amFkbGpqaGh5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzQ2MjA3MywiZXhwIjoyMDY5MDM4MDczfQ.S6JWaRsp77mUs1SgjYQrN4Y1efNsBvn_n-V8lbnaB6Y'
);

async function checkTables() {
  try {
    const tables = ['lesson_progress', 'lesson_bookmarks', 'quiz_attempts', 'celebration_events'];
    
    console.log('🔍 Checking if required tables exist:\n');
    
    for (const table of tables) {
      const { data, error } = await supabase
        .from(table)
        .select('id')
        .limit(1);
      
      if (error && error.code === 'PGRST116') {
        console.log(`✅ ${table}: EXISTS (no data)`);
      } else if (error) {
        console.log(`❌ ${table}: ERROR - ${error.message}`);
      } else {
        console.log(`✅ ${table}: EXISTS (with data)`);
      }
    }
  } catch (e) {
    console.error('Exception:', e.message);
  }
}

checkTables();
