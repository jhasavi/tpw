#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Missing Supabase environment variables');
  console.error('   Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugQuizAnswers() {
  console.log('Checking quiz questions for categories 1 (Budgeting) and 2 (Banking)...\n');
  
  // Get questions from category 1 and 2
  const { data: questions, error } = await supabase
    .from('quiz_questions')
    .select('id, category_id, question_text, options, correct_answer')
    .in('category_id', [1, 2])
    .limit(10);

  if (error) {
    console.error('Error fetching questions:', error);
    return;
  }

  questions?.forEach((q) => {
    console.log('\n---');
    console.log('ID:', q.id);
    console.log('Category:', q.category_id === 1 ? 'Budgeting' : 'Banking');
    console.log('Question:', q.question_text.substring(0, 80) + '...');
    console.log('Options type:', typeof q.options);
    console.log('Options:', JSON.stringify(q.options, null, 2));
    console.log('Correct answer type:', typeof q.correct_answer);
    console.log('Correct answer:', JSON.stringify(q.correct_answer, null, 2));
    
    // Check if options is array of objects vs strings
    if (Array.isArray(q.options) && q.options.length > 0) {
      console.log('First option type:', typeof q.options[0]);
      if (typeof q.options[0] === 'object') {
        console.log('⚠️ OPTIONS ARE OBJECTS, NOT STRINGS!');
        console.log('Sample option structure:', q.options[0]);
      }
    }
  });

  // Compare with categories 4 and 5 that work
  console.log('\n\n=== WORKING CATEGORIES (4, 5) FOR COMPARISON ===\n');
  
  const { data: workingQuestions } = await supabase
    .from('quiz_questions')
    .select('id, category_id, question_text, options, correct_answer')
    .in('category_id', [4, 5])
    .limit(3);

  workingQuestions?.forEach((q) => {
    console.log('\n---');
    console.log('ID:', q.id);
    console.log('Category:', q.category_id === 4 ? 'Savings' : 'Investing');
    console.log('Question:', q.question_text.substring(0, 80) + '...');
    console.log('Options type:', typeof q.options);
    console.log('Options:', JSON.stringify(q.options, null, 2));
    console.log('Correct answer:', JSON.stringify(q.correct_answer, null, 2));
  });
}

debugQuizAnswers().then(() => {
  console.log('\n\nDone!');
  process.exit(0);
});
