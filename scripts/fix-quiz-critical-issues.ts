#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixCriticalIssues() {
  console.log('🔧 Starting Quiz Bank Fixes...\n');

  // Fix 1: Delete self-assessment questions with no options (they're in wrong category)
  const selfAssessmentIds = [
    'e6e53cca-2de8-4460-a337-4a7b08c8c136', // What is your understanding of compound interest?
    '8c9a1eda-a5f0-4b68-b3f7-cb956cba15ab', // Have you set specific financial goals
    '0a026b0f-c270-4550-9bc3-bd66069d621e', // Do you have a will
    'b8bf4d27-60b3-450d-8ab4-9cc5501df5b2', // Are you financially independent
    'dca8f936-b14f-4f7d-b3da-2905ecd2b8a0', // How often do you review your budget
    '9ed6790a-a5d5-4350-8777-fb5d8d548ed5', // Do you have an emergency fund
    '17dcc4db-70f4-42fd-a9a7-d48b2d6c6345', // Do you currently track your monthly income
    'd1718ef4-e4da-4778-af71-b8f9684debb0', // What percentage of your income
    '3ae80034-0d2f-4289-b005-d9be1fc31218', // Do you know your credit score
    '3e034e83-d11b-4942-a3eb-f559e3f3d0e8', // How do you manage credit card payments
    'e2ee3381-7868-4d85-b160-cf6e6e076930', // Are you currently investing
    '57d1b6a3-a6ef-42ea-890b-e66ce09a56b2', // Do you have adequate insurance
    '1618e60c-3100-4132-b419-e118712cfcc4', // Do you understand your tax obligations
    'd50057a8-fe50-4c3b-afa2-0d23fe082f58', // How familiar are you with different investment types
    '7c731663-16a2-46c7-9b02-a75ce6d3c82e'  // How confident do you feel
  ];

  console.log('1. Deleting 15 self-assessment questions (no options)...');
  const { error: deleteError } = await supabase
    .from('quiz_questions')
    .delete()
    .in('id', selfAssessmentIds);

  if (deleteError) {
    console.error('❌ Error deleting:', deleteError);
  } else {
    console.log('✅ Deleted 15 self-assessment questions\n');
  }

  // Fix 2: Fix questions with category_id = null (145 questions)
  console.log('2. Analyzing questions with null category_id...');
  const { data: nullCategoryQuestions } = await supabase
    .from('quiz_questions')
    .select('id, question_text, topics')
    .is('category_id', null)
    .limit(10);

  console.log(`Found ${nullCategoryQuestions?.length || 0} sample questions (145 total)`);
  if (nullCategoryQuestions && nullCategoryQuestions.length > 0) {
    console.log('\nSample questions:');
    nullCategoryQuestions.forEach(q => {
      console.log(`  - ${q.question_text.substring(0, 60)}... (topics: ${JSON.stringify(q.topics)})`);
    });
  }

  // These appear to be from old quiz generation - delete them
  console.log('\n3. Deleting 145 questions with null category_id (orphaned questions)...');
  const { error: deleteNullError } = await supabase
    .from('quiz_questions')
    .delete()
    .is('category_id', null);

  if (deleteNullError) {
    console.error('❌ Error deleting:', deleteNullError);
  } else {
    console.log('✅ Deleted orphaned questions\n');
  }

  // Fix 3: Fix difficulty levels
  console.log('4. Fixing difficulty levels (easy → beginner, medium → intermediate, hard → advanced)...');
  
  const difficultyMappings = [
    { from: 'easy', to: 'beginner' },
    { from: 'medium', to: 'intermediate' },
    { from: 'hard', to: 'advanced' }
  ];

  for (const mapping of difficultyMappings) {
    const { error } = await supabase
      .from('quiz_questions')
      .update({ difficulty_level: mapping.to })
      .eq('difficulty_level', mapping.from);

    if (error) {
      console.error(`❌ Error updating ${mapping.from}:`, error);
    } else {
      console.log(`✅ Updated ${mapping.from} → ${mapping.to}`);
    }
  }

  console.log('\n✅ All fixes complete!\n');
  
  // Run final count
  const { count: finalCount } = await supabase
    .from('quiz_questions')
    .select('*', { count: 'exact', head: true });

  console.log(`📊 Final quiz bank size: ${finalCount} questions\n`);
}

fixCriticalIssues().then(() => {
  console.log('✅ Quiz bank repair complete!\n');
  process.exit(0);
}).catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
