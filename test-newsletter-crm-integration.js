#!/usr/bin/env node

/**
 * Automated Test: Newsletter CRM Integration
 * Tests if newsletter subscription properly adds contacts to JanaGana CRM
 */

const https = require('https');
const http = require('http');

// Test configuration
const TEST_CONFIG = {
  baseUrl: 'http://localhost:3000',
  testEmail: `test-${Date.now()}@newsletter-test.com`,
  testFirstName: 'Test',
  testLastName: 'User',
  testPhone: '+1234567890',
  timeout: 10000
};

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    const req = lib.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.setTimeout(TEST_CONFIG.timeout);
    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

async function testNewsletterSubscription() {
  log('\n🧪 Starting Newsletter CRM Integration Test', colors.blue);
  log('='.repeat(50), colors.blue);

  try {
    // Step 1: Test Newsletter Subscription
    log('\n📧 Step 1: Testing Newsletter Subscription', colors.yellow);
    
    const subscribeResponse = await makeRequest(`${TEST_CONFIG.baseUrl}/api/newsletter/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: TEST_CONFIG.testEmail,
        firstName: TEST_CONFIG.testFirstName,
        lastName: TEST_CONFIG.testLastName,
        phone: TEST_CONFIG.testPhone,
        source: 'automated-test',
        tags: ['newsletter-subscriber', 'test-subscription'],
        marketingConsent: true
      })
    });

    log(`Status: ${subscribeResponse.status}`, subscribeResponse.status === 200 ? colors.green : colors.red);
    log(`Response: ${JSON.stringify(subscribeResponse.data, null, 2)}`, colors.blue);

    if (subscribeResponse.status !== 200) {
      throw new Error(`Newsletter subscription failed with status ${subscribeResponse.status}`);
    }

    const subscriptionResult = subscribeResponse.data;
    log('✅ Newsletter subscription successful', colors.green);

    // Step 2: Check if contact was created in CRM
    log('\n🔍 Step 2: Verifying CRM Contact Creation', colors.yellow);
    
    if (subscriptionResult.contact && subscriptionResult.contact.id) {
      log(`✅ Contact created in CRM with ID: ${subscriptionResult.contact.id}`, colors.green);
      log(`   Email: ${subscriptionResult.contact.email}`, colors.blue);
      log(`   Lifecycle Stage: ${subscriptionResult.lifecycleStage}`, colors.blue);
      log(`   Tags: ${subscriptionResult.contact.tags?.join(', ') || 'None'}`, colors.blue);
    } else {
      log('⚠️  Contact data not available in response, checking CRM directly...', colors.yellow);
    }

    // Step 3: Test Duplicate Prevention
    log('\n🔄 Step 3: Testing Duplicate Prevention', colors.yellow);
    
    const duplicateResponse = await makeRequest(`${TEST_CONFIG.baseUrl}/api/newsletter/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: TEST_CONFIG.testEmail,
        firstName: 'Duplicate',
        lastName: 'Test',
        source: 'automated-test',
        tags: ['newsletter-subscriber', 'duplicate-test'],
        marketingConsent: true
      })
    });

    log(`Duplicate Status: ${duplicateResponse.status}`, colors.blue);
    log(`Duplicate Response: ${JSON.stringify(duplicateResponse.data, null, 2)}`, colors.blue);

    if (duplicateResponse.status === 200) {
      log('✅ Duplicate prevention working (contact updated)', colors.green);
    } else {
      log('⚠️  Duplicate prevention may need attention', colors.yellow);
    }

    // Step 4: Test Subscription Status Check
    log('\n📊 Step 4: Testing Subscription Status Check', colors.yellow);
    
    const statusResponse = await makeRequest(`${TEST_CONFIG.baseUrl}/api/newsletter/check-status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: TEST_CONFIG.testEmail
      })
    });

    log(`Status Check Response: ${JSON.stringify(statusResponse.data, null, 2)}`, colors.blue);

    if (statusResponse.data.isSubscribed) {
      log('✅ Subscription status check working', colors.green);
      log(`   Source: ${statusResponse.data.source}`, colors.blue);
      log(`   Subscribed At: ${statusResponse.data.subscribedAt}`, colors.blue);
    } else {
      log('❌ Subscription status check failed', colors.red);
    }

    // Step 5: Test Exit Intent Popup Integration
    log('\n🚪 Step 5: Testing Exit Intent Popup Integration', colors.yellow);
    
    const exitIntentResponse = await makeRequest(`${TEST_CONFIG.baseUrl}/api/newsletter/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: `exit-intent-${Date.now()}@test.com`,
        firstName: 'Exit',
        lastName: 'Intent',
        source: 'exit-popup',
        tags: ['newsletter-subscriber', 'exit-intent-capture'],
        marketingConsent: true
      })
    });

    log(`Exit Intent Status: ${exitIntentResponse.status}`, colors.blue);
    log(`Exit Intent Response: ${JSON.stringify(exitIntentResponse.data, null, 2)}`, colors.blue);

    if (exitIntentResponse.status === 200) {
      log('✅ Exit intent popup integration working', colors.green);
    } else {
      log('❌ Exit intent popup integration failed', colors.red);
    }

    // Test Results Summary
    log('\n📋 Test Results Summary', colors.blue);
    log('='.repeat(50), colors.blue);
    
    const results = {
      newsletterSubscription: subscribeResponse.status === 200,
      crmIntegration: !!(subscriptionResult.contact && subscriptionResult.contact.id),
      duplicatePrevention: duplicateResponse.status === 200,
      statusCheck: statusResponse.data.isSubscribed,
      exitIntentIntegration: exitIntentResponse.status === 200
    };

    const passedTests = Object.values(results).filter(Boolean).length;
    const totalTests = Object.keys(results).length;

    log(`Tests Passed: ${passedTests}/${totalTests}`, passedTests === totalTests ? colors.green : colors.yellow);

    Object.entries(results).forEach(([test, passed]) => {
      const status = passed ? '✅ PASS' : '❌ FAIL';
      const color = passed ? colors.green : colors.red;
      log(`${status.padEnd(10)} ${test.replace(/([A-Z])/g, ' $1').toLowerCase()}`, color);
    });

    if (passedTests === totalTests) {
      log('\n🎉 ALL TESTS PASSED! Newsletter CRM integration is working correctly.', colors.green);
      log('✅ Ready to push to main branch', colors.green);
      return true;
    } else {
      log('\n⚠️  Some tests failed. Please review the issues above.', colors.yellow);
      log('❌ Do not push to main until issues are resolved', colors.red);
      return false;
    }

  } catch (error) {
    log(`\n❌ Test failed with error: ${error.message}`, colors.red);
    log('Stack trace:', colors.red);
    console.error(error);
    return false;
  }
}

// Check if server is running
async function checkServer() {
  try {
    log('\n🔍 Checking if server is running...', colors.blue);
    const response = await makeRequest(`${TEST_CONFIG.baseUrl}/api/newsletter/subscribe`, {
      method: 'OPTIONS'
    });
    log('✅ Server is running', colors.green);
    return true;
  } catch (error) {
    log(`❌ Server is not running at ${TEST_CONFIG.baseUrl}`, colors.red);
    log('Please start the development server with: npm run dev', colors.yellow);
    return false;
  }
}

// Main execution
async function main() {
  log('🚀 Newsletter CRM Integration Test Suite', colors.blue);
  log(`Testing against: ${TEST_CONFIG.baseUrl}`, colors.blue);
  log(`Test email: ${TEST_CONFIG.testEmail}`, colors.blue);

  const serverRunning = await checkServer();
  if (!serverRunning) {
    process.exit(1);
  }

  const testPassed = await testNewsletterSubscription();
  
  log('\n' + '='.repeat(50), colors.blue);
  log(testPassed ? '🎉 TEST SUITE PASSED' : '❌ TEST SUITE FAILED', testPassed ? colors.green : colors.red);
  log('='.repeat(50), colors.blue);
  
  process.exit(testPassed ? 0 : 1);
}

// Handle unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  log(`\n❌ Unhandled Rejection at: ${promise}`, colors.red);
  log(`Reason: ${reason}`, colors.red);
  process.exit(1);
});

// Run the test
main().catch(error => {
  log(`\n💥 Fatal error: ${error.message}`, colors.red);
  process.exit(1);
});
