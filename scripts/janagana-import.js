#!/usr/bin/env node

/**
 * JanaGana CRM Past Events Import Script
 * 
 * This script imports past events data into JanaGana CRM for unified event management.
 * 
 * Usage: node scripts/janagana-import.js
 * 
 * Prerequisites:
 * - JanaGana API access token
 * - Images uploaded to JanaGana media library
 * - Proper permissions for event creation
 */

const fs = require('fs');
const path = require('path');

// Configuration - Using existing JanaGana credentials
const config = {
  apiUrl: 'https://janagana.namasteneedham.com/api/plugin',
  organizationSlug: 'purple-wings',
  apiKey: 'jg_live_SBTGaXlwlLGks7_MwgHessJFMs2RB0cZ',
  baseUrl: 'https://www.thepurplewings.org'
};

// Past events data from the website
const pastEvents = [
  {
    id: 'fall-2024-basics',
    title: 'Basics of Finance',
    date: '2024-10-03',
    location: 'High Rock School, 77 Ferndale Road, Needham, MA',
    speaker: 'Bank of America Financial Education Team',
    description: 'Essential introduction to personal finance fundamentals. Covered banking basics, budgeting, credit scores, and emergency funds.',
    category: 'Financial Basics',
    image: 'Class-1.jpeg',
    attendees: 45,
    status: 'completed'
  },
  {
    id: 'fall-2024-investing',
    title: 'Investing in Stocks and Building Retirement',
    date: '2024-10-10',
    location: 'High Rock School, 77 Ferndale Road, Needham, MA',
    speaker: 'Vikram - Investment Specialist',
    description: 'Stock market fundamentals and retirement planning strategies. Topics included 401k, IRA accounts, portfolio diversification, and long-term wealth building.',
    category: 'Investing',
    image: 'Class-2.jpg',
    attendees: 42,
    status: 'completed'
  },
  {
    id: 'fall-2024-insurance',
    title: 'How Life Insurance Builds Assets',
    date: '2024-10-17',
    location: 'High Rock School, 77 Ferndale Road, Needham, MA',
    speaker: 'Padma - Insurance Specialist',
    description: 'Explored different types of life insurance and how they contribute to wealth-building. Covered term, whole, and universal life insurance strategies.',
    category: 'Insurance',
    image: 'Class-3.jpg',
    attendees: 38,
    status: 'completed'
  },
  {
    id: 'fall-2024-real-estate',
    title: 'Real Estate for Retirement and College Planning',
    date: '2024-10-24',
    location: 'High Rock School, 77 Ferndale Road, Needham, MA',
    speaker: 'Sanjeev - Real Estate Investment Expert',
    description: 'Practical approaches to using real estate investment for retirement income and college funding. Discussed rental properties, REITs, and tax advantages.',
    category: 'Real Estate',
    image: 'Class-4.jpeg',
    attendees: 48,
    status: 'completed'
  },
  {
    id: 'fall-2024-taxes',
    title: 'Tax Saving Strategies',
    date: '2024-11-07',
    location: 'High Rock School, 77 Ferndale Road, Needham, MA',
    speaker: 'Jan - Tax Planning Specialist',
    description: 'Legal tax reduction strategies, deductions, credits, and year-end planning techniques. Covered retirement account benefits and business expense optimization.',
    category: 'Taxes',
    image: 'seminar.jpg',
    attendees: 45,
    status: 'completed'
  },
  {
    id: 'fall-2024-mortgage',
    title: 'Making Real Estate Work with the Right Mortgage',
    date: '2024-11-14',
    location: 'High Rock School, 77 Ferndale Road, Needham, MA',
    speaker: 'Darren - Mortgage Specialist',
    description: 'How to choose the right mortgage product and use real estate to build wealth. Discussed fixed vs. adjustable rates, refinancing, and strategic financing.',
    category: 'Real Estate',
    image: 'team.jpg',
    attendees: 43,
    status: 'completed'
  },
  {
    id: 'spring-2024-1',
    title: 'Spring Financial Education Series - Session 1',
    date: '2024-05-16',
    location: 'High Rock School, 77 Ferndale Road, Needham, MA',
    speaker: 'Purple Wings Financial Education Team',
    description: 'Comprehensive workshop covering personal finance fundamentals, investment strategies, and retirement planning with interactive Q&A.',
    category: 'Financial Basics',
    image: 'learners-1.jpg',
    attendees: 45,
    status: 'completed'
  },
  {
    id: 'spring-2024-2',
    title: 'Spring Financial Education Series - Session 2',
    date: '2024-05-23',
    location: 'High Rock School, 77 Ferndale Road, Needham, MA',
    speaker: 'Purple Wings Investment Team',
    description: 'Advanced topics in wealth building, tax optimization, and real estate investing strategies from industry experts.',
    category: 'Investing',
    image: 'learners-2.jpg',
    attendees: 42,
    status: 'completed'
  },
  {
    id: 'spring-2024-3',
    title: 'Spring Financial Education Series - Session 3',
    date: '2024-05-30',
    location: 'High Rock School, 77 Ferndale Road, Needham, MA',
    speaker: 'Estate Planning Experts',
    description: 'Focus on retirement planning, estate planning, and legacy building. Expert speakers discussed comprehensive financial planning for the future.',
    category: 'Retirement',
    image: 'learners-3.jpg',
    attendees: 38,
    status: 'completed'
  },
  {
    id: 'gathering-jul-2023',
    title: 'Community Financial Literacy Gathering',
    date: '2023-07-23',
    location: 'Needham Community Center',
    speaker: 'Shalini Jha & Community Partners',
    description: 'Our first major community gathering bringing together women from across Needham and Greater Boston to discuss financial empowerment and education.',
    category: 'Community',
    image: '1st-gathering_Jul23-2.jpeg',
    attendees: 35,
    status: 'completed'
  }
];

// Helper function to make API requests
async function makeRequest(endpoint, options = {}) {
  const url = `${config.apiUrl}/${endpoint}`;
  const headers = {
    'X-API-Key': config.apiKey,
    'Content-Type': 'application/json',
    ...options.headers
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Request failed: ${error.message}`);
    throw error;
  }
}

// Upload image to JanaGana media library
async function uploadImage(imageName) {
  try {
    const imagePath = path.join(__dirname, '../public/images', imageName);
    
    if (!fs.existsSync(imagePath)) {
      console.log(`⚠️  Image not found: ${imageName}`);
      return null;
    }

    const formData = new FormData();
    const imageBuffer = fs.readFileSync(imagePath);
    formData.append('file', new Blob([imageBuffer]), imageName);

    const response = await makeRequest('media/upload', {
      method: 'POST',
      body: formData,
      headers: {
        'X-API-Key': config.apiKey
      }
    });

    console.log(`✅ Uploaded image: ${imageName}`);
    return response.url;
  } catch (error) {
    console.error(`❌ Failed to upload image ${imageName}: ${error.message}`);
    return null;
  }
}

// Create event in JanaGana CRM
async function createEvent(eventData, imageUrl) {
  try {
    const eventPayload = {
      title: eventData.title,
      description: eventData.description,
      date: eventData.date,
      location: eventData.location,
      speaker: eventData.speaker,
      category: eventData.category,
      image: imageUrl,
      maxAttendees: eventData.attendees || 50,
      status: eventData.status,
      organization: config.organizationSlug,
      registrationOpen: false, // Past events should not be open for registration
      tags: [eventData.category.toLowerCase().replace(' ', '-'), 'past-event']
    };

    const response = await makeRequest('events', {
      method: 'POST',
      body: JSON.stringify(eventPayload)
    });

    console.log(`✅ Created event: ${eventData.title}`);
    return response;
  } catch (error) {
    console.error(`❌ Failed to create event ${eventData.title}: ${error.message}`);
    return null;
  }
}

// Main import function
async function importPastEvents() {
  console.log('🚀 Starting JanaGana CRM import for past events...\n');

  // Check configuration
  if (!config.apiKey || config.apiKey === 'YOUR_API_KEY_HERE') {
    console.error('❌ Please update the API key in the script configuration');
    process.exit(1);
  }

  let successCount = 0;
  let errorCount = 0;

  for (const event of pastEvents) {
    console.log(`\n📅 Processing: ${event.title}`);
    
    try {
      // Upload image
      const imageUrl = await uploadImage(event.image);
      
      // Create event
      const result = await createEvent(event, imageUrl);
      
      if (result) {
        successCount++;
      } else {
        errorCount++;
      }
    } catch (error) {
      console.error(`❌ Error processing event ${event.title}: ${error.message}`);
      errorCount++;
    }
  }

  console.log('\n📊 Import Summary:');
  console.log(`✅ Successfully imported: ${successCount} events`);
  console.log(`❌ Failed to import: ${errorCount} events`);
  console.log(`📈 Total events processed: ${pastEvents.length}`);
  
  if (successCount > 0) {
    console.log('\n🎉 Import completed successfully!');
    console.log('🔗 Check your JanaGana CRM dashboard to verify the events.');
  }
}

// Test function to verify API connectivity
async function testConnection() {
  try {
    console.log('🔍 Testing JanaGana API connection...');
    const response = await makeRequest('organizations');
    console.log('✅ API connection successful');
    console.log('📊 Response:', JSON.stringify(response, null, 2));
    return true;
  } catch (error) {
    console.error('❌ API connection failed:', error.message);
    console.log('💡 Please check your API key and network connection');
    return false;
  }
}

// CLI interface
if (require.main === module) {
  const command = process.argv[2];

  switch (command) {
    case 'test':
      testConnection();
      break;
    case 'import':
      importPastEvents();
      break;
    case 'help':
      console.log(`
🔧 JanaGana CRM Import Script

Commands:
  node scripts/janagana-import.js test     - Test API connection
  node scripts/janagana-import.js import  - Import all past events
  node scripts/janagana-import.js help    - Show this help

Setup:
  1. Update config.apiKey in the script if needed
  2. Ensure images exist in /public/images/
  3. Run 'test' command first to verify connection
  4. Run 'import' command to upload events

Example:
  node scripts/janagana-import.js test
  node scripts/janagana-import.js import
      `);
      break;
    default:
      console.log('❓ Unknown command. Use "help" to see available commands.');
  }
}

module.exports = {
  importPastEvents,
  testConnection,
  pastEvents
};
