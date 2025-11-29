#!/usr/bin/env node

/**
 * Quality Check Script for The Purple Wings
 * Checks for broken links, missing content, and navigation issues
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000';
const MAX_RETRIES = 3;

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkServerRunning() {
  try {
    execSync(`curl -s -o /dev/null -w "%{http_code}" ${BASE_URL}`, { encoding: 'utf8' });
    return true;
  } catch (error) {
    return false;
  }
}

async function testUrl(url, retries = 0) {
  try {
    const response = await fetch(url);
    return {
      url,
      status: response.status,
      ok: response.ok,
      statusText: response.statusText
    };
  } catch (error) {
    if (retries < MAX_RETRIES) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return testUrl(url, retries + 1);
    }
    return {
      url,
      status: 0,
      ok: false,
      statusText: error.message
    };
  }
}

const PAGES_TO_TEST = [
  // Main pages
  { url: '/', name: 'Homepage' },
  { url: '/courses', name: 'Courses Page' },
  { url: '/events', name: 'Events Page' },
  { url: '/about', name: 'About Page' },
  { url: '/contact', name: 'Contact Page' },
  { url: '/auth/login', name: 'Login Page' },
  { url: '/auth/signup', name: 'Signup Page' },
  
  // Course overview pages
  { url: '/learn/womens-financial-literacy/financial-literacy-basics', name: 'Financial Literacy Basics Course' },
  { url: '/learn/womens-financial-literacy/budgeting-basics', name: 'Budgeting Basics Course' },
  { url: '/learn/womens-financial-literacy/emergency-planning', name: 'Emergency Planning Course' },
  { url: '/learn/womens-financial-literacy/investing-101', name: 'Investing 101 Course' },
  
  // Sample lessons
  { url: '/learn/womens-financial-literacy/financial-literacy-basics/understanding-money-banking', name: 'Understanding Money & Banking Lesson' },
  { url: '/learn/womens-financial-literacy/budgeting-basics/understanding-budgets', name: 'Understanding Budgets Lesson' },
  { url: '/learn/womens-financial-literacy/investing-101/understanding-interest', name: 'Understanding Interest Lesson' },
  
  // Invalid URLs that should 404
  { url: '/learn/womens-financial-literacy/courses/financial-literacy-basics', name: 'Old URL Format (should 404)', shouldBe404: true },
  { url: '/nonexistent-page', name: 'Nonexistent Page (should 404)', shouldBe404: true },
];

async function runQualityChecks() {
  log('\n🔍 THE PURPLE WINGS - QUALITY CHECK\n', 'cyan');
  log('=' .repeat(60), 'blue');
  
  // Check if server is running
  log('\n📡 Checking if dev server is running...', 'yellow');
  if (!checkServerRunning()) {
    log('❌ Dev server is not running on http://localhost:3000', 'red');
    log('   Please start it with: npm run dev\n', 'yellow');
    process.exit(1);
  }
  log('✅ Dev server is running\n', 'green');
  
  // Test all pages
  log('🌐 Testing Page URLs...\n', 'yellow');
  const results = [];
  let passed = 0;
  let failed = 0;
  
  for (const page of PAGES_TO_TEST) {
    const result = await testUrl(`${BASE_URL}${page.url}`);
    results.push({ ...result, ...page });
    
    const expected = page.shouldBe404 ? 404 : 200;
    const isCorrect = result.status === expected;
    
    if (isCorrect) {
      log(`  ✅ ${page.name}`, 'green');
      passed++;
    } else {
      log(`  ❌ ${page.name} (Expected ${expected}, Got ${result.status})`, 'red');
      failed++;
    }
  }
  
  // Summary
  log('\n' + '='.repeat(60), 'blue');
  log('\n📊 SUMMARY', 'cyan');
  log(`Total Pages Tested: ${results.length}`, 'blue');
  log(`✅ Passed: ${passed}`, 'green');
  log(`❌ Failed: ${failed}`, failed > 0 ? 'red' : 'green');
  
  // Failed pages detail
  if (failed > 0) {
    log('\n⚠️  FAILED PAGES:', 'red');
    results
      .filter(r => {
        const expected = r.shouldBe404 ? 404 : 200;
        return r.status !== expected;
      })
      .forEach(r => {
        log(`   - ${r.name}: ${r.url} (${r.status} ${r.statusText})`, 'red');
      });
  }
  
  // Check for common issues
  log('\n🔧 Checking for Common Issues...', 'yellow');
  
  // Check if images directory exists
  const imagesExist = fs.existsSync(path.join(process.cwd(), 'public', 'images'));
  log(imagesExist ? '  ✅ Images directory exists' : '  ❌ Images directory missing', imagesExist ? 'green' : 'red');
  
  // Check if hero images exist
  const heroImages = ['hero-1.jpg', 'hero-2.jpg', 'hero-3.jpeg', 'hero-4.jpg'];
  const heroCheck = heroImages.filter(img => 
    fs.existsSync(path.join(process.cwd(), 'public', 'images', img))
  );
  log(`  ${heroCheck.length === 4 ? '✅' : '⚠️ '} Hero images: ${heroCheck.length}/4 found`, 
      heroCheck.length === 4 ? 'green' : 'yellow');
  
  // Check if logo exists
  const logoExists = fs.existsSync(path.join(process.cwd(), 'public', 'images', 'logo-nobg.png'));
  log(logoExists ? '  ✅ Logo file exists' : '  ❌ Logo file missing', logoExists ? 'green' : 'red');
  
  log('\n' + '='.repeat(60), 'blue');
  log(`\n${failed === 0 ? '✅ ALL CHECKS PASSED!' : '⚠️  SOME ISSUES FOUND'}`, 
      failed === 0 ? 'green' : 'yellow');
  log('\nFor detailed testing, consider running:', 'cyan');
  log('  - npm run lint (code quality)', 'blue');
  log('  - npm run build (production build test)', 'blue');
  log('  - Lighthouse audit (performance & SEO)\n', 'blue');
  
  process.exit(failed > 0 ? 1 : 0);
}

// Run checks
runQualityChecks().catch(error => {
  log(`\n❌ Error running quality checks: ${error.message}`, 'red');
  process.exit(1);
});
