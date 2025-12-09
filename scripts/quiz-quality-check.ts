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

const CATEGORY_NAMES: { [key: number]: string } = {
  1: 'Budgeting',
  2: 'Banking & Accounts',
  3: 'Credit & Debt Management',
  4: 'Saving & Emergency Funds',
  5: 'Investing Basics',
  6: 'Retirement Planning',
  7: 'Insurance',
  8: 'Taxes',
  9: 'Real Estate & Mortgages',
  10: 'Career & Income',
  11: 'Small Business & Entrepreneurship',
  12: 'Estate Planning',
  13: 'Divorce & Financial Independence',
  14: 'Abuse & Financial Safety',
  15: 'Financial Empowerment'
};

interface QuizIssue {
  id: string;
  category_id: number;
  category_name: string;
  question_text: string;
  issue_type: string;
  details: string;
  severity: 'critical' | 'warning' | 'info';
}

async function qualityCheckQuizBank() {
  console.log('🔍 Starting Quiz Bank Quality Check...\n');
  
  const issues: QuizIssue[] = [];
  let totalQuestions = 0;
  let questionsByCategory: { [key: number]: number } = {};

  // Fetch all quiz questions
  const { data: questions, error } = await supabase
    .from('quiz_questions')
    .select('*')
    .order('category_id', { ascending: true });

  if (error) {
    console.error('❌ Error fetching questions:', error);
    return;
  }

  totalQuestions = questions?.length || 0;
  console.log(`📊 Total Questions: ${totalQuestions}\n`);

  // Process each question
  questions?.forEach((q) => {
    const categoryName = CATEGORY_NAMES[q.category_id] || `Unknown (${q.category_id})`;
    questionsByCategory[q.category_id] = (questionsByCategory[q.category_id] || 0) + 1;

    // Check 1: Missing or empty question text
    if (!q.question_text || q.question_text.trim().length === 0) {
      issues.push({
        id: q.id,
        category_id: q.category_id,
        category_name: categoryName,
        question_text: '[EMPTY]',
        issue_type: 'Missing Question Text',
        details: 'Question text is empty or missing',
        severity: 'critical'
      });
    }

    // Check 2: Missing or invalid options
    if (!q.options || !Array.isArray(q.options) || q.options.length === 0) {
      issues.push({
        id: q.id,
        category_id: q.category_id,
        category_name: categoryName,
        question_text: q.question_text?.substring(0, 80) + '...',
        issue_type: 'No Options',
        details: 'Question has no answer options',
        severity: 'critical'
      });
    } else {
      // Check for minimum options based on question type
      const minOptions = q.question_type === 'true_false' ? 2 : 2;
      if (q.options.length < minOptions) {
        issues.push({
          id: q.id,
          category_id: q.category_id,
          category_name: categoryName,
          question_text: q.question_text?.substring(0, 80) + '...',
          issue_type: 'Insufficient Options',
          details: `Only ${q.options.length} option(s) provided`,
          severity: 'critical'
        });
      }

      // Check for empty options
      const emptyOptions = q.options.filter((opt: any) => {
        if (typeof opt === 'string') return !opt || opt.trim().length === 0;
        if (typeof opt === 'object') return !opt.text && !opt.value;
        return true;
      });
      
      if (emptyOptions.length > 0) {
        issues.push({
          id: q.id,
          category_id: q.category_id,
          category_name: categoryName,
          question_text: q.question_text?.substring(0, 80) + '...',
          issue_type: 'Empty Options',
          details: `${emptyOptions.length} option(s) are empty`,
          severity: 'critical'
        });
      }
    }

    // Check 3: Missing correct answer
    if (!q.correct_answer || (typeof q.correct_answer === 'string' && q.correct_answer.trim().length === 0)) {
      issues.push({
        id: q.id,
        category_id: q.category_id,
        category_name: categoryName,
        question_text: q.question_text?.substring(0, 80) + '...',
        issue_type: 'Missing Correct Answer',
        details: 'No correct answer specified',
        severity: 'critical'
      });
    } else if (Array.isArray(q.options) && q.options.length > 0) {
      // Check 4: Verify correct answer exists in options
      let answerFound = false;
      
      if (typeof q.options[0] === 'string') {
        // String-based options
        answerFound = q.options.includes(q.correct_answer);
      } else if (typeof q.options[0] === 'object') {
        // Object-based options
        answerFound = q.options.some((opt: any) => 
          opt.value === q.correct_answer || 
          opt.id === q.correct_answer ||
          opt.text === q.correct_answer
        );
      }

      if (!answerFound) {
        issues.push({
          id: q.id,
          category_id: q.category_id,
          category_name: categoryName,
          question_text: q.question_text?.substring(0, 80) + '...',
          issue_type: 'Invalid Correct Answer',
          details: `Correct answer "${q.correct_answer}" not found in options`,
          severity: 'critical'
        });
      }
    }

    // Check 5: Missing explanation
    if (!q.explanation || q.explanation.trim().length === 0) {
      issues.push({
        id: q.id,
        category_id: q.category_id,
        category_name: categoryName,
        question_text: q.question_text?.substring(0, 80) + '...',
        issue_type: 'Missing Explanation',
        details: 'No explanation provided',
        severity: 'warning'
      });
    }

    // Check 6: Very short question text
    if (q.question_text && q.question_text.length < 10) {
      issues.push({
        id: q.id,
        category_id: q.category_id,
        category_name: categoryName,
        question_text: q.question_text,
        issue_type: 'Short Question',
        details: `Question text is very short (${q.question_text.length} chars)`,
        severity: 'warning'
      });
    }

    // Check 7: Invalid difficulty level
    const validDifficulties = ['beginner', 'intermediate', 'advanced'];
    if (!validDifficulties.includes(q.difficulty_level)) {
      issues.push({
        id: q.id,
        category_id: q.category_id,
        category_name: categoryName,
        question_text: q.question_text?.substring(0, 80) + '...',
        issue_type: 'Invalid Difficulty',
        details: `Difficulty "${q.difficulty_level}" not valid`,
        severity: 'warning'
      });
    }

    // Check 8: Missing or invalid category
    if (!q.category_id || !CATEGORY_NAMES[q.category_id]) {
      issues.push({
        id: q.id,
        category_id: q.category_id,
        category_name: categoryName,
        question_text: q.question_text?.substring(0, 80) + '...',
        issue_type: 'Invalid Category',
        details: `Category ID ${q.category_id} is not valid`,
        severity: 'warning'
      });
    }
  });

  // Print summary by category
  console.log('📈 Questions by Category:\n');
  Object.entries(questionsByCategory)
    .sort(([a], [b]) => parseInt(a) - parseInt(b))
    .forEach(([catId, count]) => {
      const catName = CATEGORY_NAMES[parseInt(catId)] || `Unknown (${catId})`;
      console.log(`  ${catId.padStart(2)}. ${catName.padEnd(40)} ${count.toString().padStart(4)} questions`);
    });

  // Print issues summary
  console.log('\n\n🔴 ISSUES FOUND:\n');
  
  const criticalIssues = issues.filter(i => i.severity === 'critical');
  const warningIssues = issues.filter(i => i.severity === 'warning');
  
  console.log(`  🔴 Critical Issues: ${criticalIssues.length}`);
  console.log(`  🟡 Warnings: ${warningIssues.length}`);
  console.log(`  ✅ Clean Questions: ${totalQuestions - new Set(issues.map(i => i.id)).size}\n`);

  if (criticalIssues.length > 0) {
    console.log('\n🔴 CRITICAL ISSUES (Must Fix):\n');
    criticalIssues.forEach((issue, idx) => {
      console.log(`${idx + 1}. [${issue.category_name}] ${issue.issue_type}`);
      console.log(`   ID: ${issue.id}`);
      console.log(`   Question: ${issue.question_text}`);
      console.log(`   Problem: ${issue.details}\n`);
    });
  }

  if (warningIssues.length > 0) {
    console.log('\n🟡 WARNINGS (Should Fix):\n');
    warningIssues.slice(0, 20).forEach((issue, idx) => {
      console.log(`${idx + 1}. [${issue.category_name}] ${issue.issue_type}`);
      console.log(`   ID: ${issue.id}`);
      console.log(`   Question: ${issue.question_text}`);
      console.log(`   Problem: ${issue.details}\n`);
    });
    
    if (warningIssues.length > 20) {
      console.log(`   ... and ${warningIssues.length - 20} more warnings\n`);
    }
  }

  // Generate fix suggestions
  if (criticalIssues.length > 0) {
    console.log('\n💡 SUGGESTED FIXES:\n');
    
    const noOptionsIssues = criticalIssues.filter(i => i.issue_type === 'No Options');
    if (noOptionsIssues.length > 0) {
      console.log(`\n1. Fix ${noOptionsIssues.length} question(s) with no options:`);
      console.log('   These questions need answer choices added to the database.\n');
      noOptionsIssues.forEach(issue => {
        console.log(`   UPDATE quiz_questions SET options = '["Option A", "Option B", "Option C", "Option D"]'`);
        console.log(`   WHERE id = '${issue.id}'; -- ${issue.question_text.substring(0, 60)}...\n`);
      });
    }

    const noCorrectAnswer = criticalIssues.filter(i => i.issue_type === 'Missing Correct Answer');
    if (noCorrectAnswer.length > 0) {
      console.log(`\n2. Fix ${noCorrectAnswer.length} question(s) with missing correct answers:`);
      console.log('   These questions need a correct_answer value set.\n');
    }

    const invalidAnswer = criticalIssues.filter(i => i.issue_type === 'Invalid Correct Answer');
    if (invalidAnswer.length > 0) {
      console.log(`\n3. Fix ${invalidAnswer.length} question(s) with invalid correct answers:`);
      console.log('   The correct_answer doesn\'t match any option - needs verification.\n');
    }
  }

  // Save report to file
  const reportPath = '/Users/Sanjeev/tpw/QUIZ_QUALITY_REPORT.md';
  const report = generateMarkdownReport(totalQuestions, questionsByCategory, criticalIssues, warningIssues);
  
  const fs = require('fs');
  fs.writeFileSync(reportPath, report);
  console.log(`\n📝 Full report saved to: ${reportPath}\n`);

  return { totalQuestions, criticalIssues, warningIssues, issues };
}

function generateMarkdownReport(
  totalQuestions: number,
  questionsByCategory: { [key: number]: number },
  criticalIssues: QuizIssue[],
  warningIssues: QuizIssue[]
): string {
  const report = `# Quiz Bank Quality Check Report
Generated: ${new Date().toISOString()}

## Summary

- **Total Questions**: ${totalQuestions}
- **Critical Issues**: ${criticalIssues.length}
- **Warnings**: ${warningIssues.length}
- **Clean Questions**: ${totalQuestions - new Set([...criticalIssues, ...warningIssues].map(i => i.id)).size}

## Questions by Category

| Category | Name | Count |
|----------|------|-------|
${Object.entries(questionsByCategory)
  .sort(([a], [b]) => parseInt(a) - parseInt(b))
  .map(([catId, count]) => {
    const catName = CATEGORY_NAMES[parseInt(catId)] || `Unknown (${catId})`;
    return `| ${catId} | ${catName} | ${count} |`;
  })
  .join('\n')}

## Critical Issues (${criticalIssues.length})

${criticalIssues.length > 0 ? criticalIssues.map((issue, idx) => `
### ${idx + 1}. ${issue.issue_type}

- **Category**: ${issue.category_name}
- **Question ID**: \`${issue.id}\`
- **Question**: ${issue.question_text}
- **Problem**: ${issue.details}
`).join('\n') : '_No critical issues found_'}

## Warnings (${warningIssues.length})

${warningIssues.length > 0 ? warningIssues.slice(0, 50).map((issue, idx) => `
### ${idx + 1}. ${issue.issue_type}

- **Category**: ${issue.category_name}
- **Question ID**: \`${issue.id}\`
- **Question**: ${issue.question_text}
- **Problem**: ${issue.details}
`).join('\n') : '_No warnings found_'}

${warningIssues.length > 50 ? `\n_... and ${warningIssues.length - 50} more warnings_\n` : ''}
`;

  return report;
}

qualityCheckQuizBank().then(() => {
  console.log('✅ Quality check complete!\n');
  process.exit(0);
}).catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
