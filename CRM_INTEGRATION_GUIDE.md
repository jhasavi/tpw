# TPW CRM Integration Guide

## V1 pilot status

The current NB/TPW pilot does **not** use JanaGana API keys for visitor signup, class registration, or public website CTAs. Production visitor flows use:

- TPW website CTAs → `https://janagana.namasteneedham.com/portal/purple-wings/...`
- TPW `/events` → read-only JanaGana embed API for published Purple Wings events
- JanaGana portal forms → Purple Wings tenant Contacts and Event Registrations
- TPW weekly financial tips → TPW local Supabase newsletter list

The server-to-server CRM sync described below is legacy/deferred. It remains disabled unless `JANAGANA_LEGACY_API_SYNC_ENABLED=true` is intentionally configured.

## 🎯 Overview

This guide covers the complete JanaGana CRM integration for The Purple Wings (TPW) platform, including all implemented events, architecture, and maintenance procedures.

## 📊 Implemented Events

### Course Progress Tracking
- **course_started** - Fires once per user per course on first lesson access
- **lesson_completed** - Fires on lesson completion (100% progress)
- **course_completed** - Fires when all lessons in course are complete

### User Engagement Tracking
- **profile_updated** - Fires when user updates their profile information
- **recommendation_shown** - Fires when personalized recommendations are displayed

### Quiz & Assessment Tracking
- **quiz_started** - Fires when user begins any quiz
- **quiz_completed** - Fires when user completes a quiz
- **personality_result_generated** - Fires when personality assessment completes
- **retirement_quiz_completed** - Fires when retirement readiness quiz completes

### Lead Generation Tracking
- **newsletter_subscribed** - Fires when user subscribes to newsletter
- **exit_intent_submitted** - Fires when user submits exit intent form
- **contact_request_submitted** - Fires when user submits contact form
- **assessment_request_submitted** - Fires when user requests financial assessment
- **demo_request_submitted** - Fires when user requests product demo

## 🏗️ Architecture

### Client/Server Separation

#### Client-Side Events (crm-events-client.ts)
- Safe for use in browser components
- Communicates via API routes
- No direct database access
- Handles user-triggered events

#### Server-Side Events (crm-events.ts)
- Full database access
- Direct CRM integration
- Handles API route processing
- Manages failure queue and retry logic

### API Layer

#### Event Processing Route
```typescript
// /api/crm/events/route.ts
POST /api/crm/events
- Authenticates user
- Validates event data
- Calls server-side CRM logger
- Returns success/error response
```

#### Specialized Routes
- `/api/crm/course-progress` - Course progress events
- `/api/crm/profile-update` - Profile update events
- `/api/crm/recommendation-shown` - Recommendation events

### Failure Handling

#### Retry Logic (crm-retry-server.ts)
- Exponential backoff retry strategy
- Configurable retry limits
- Durable failure queue
- Automatic retry processing

#### Failure Queue (crm-failure-queue.ts)
- Server-side persistence
- Failed request tracking
- Retry statistics
- Cleanup automation

## 🔧 Configuration

### Environment Variables

```bash
# JanaGana CRM Configuration
JANAGANA_LEGACY_API_SYNC_ENABLED=false
JANAGANA_API_URL=https://janagana.namasteneedham.com/api
# JANAGANA_API_KEY is legacy/deferred for v1.

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Retry Configuration

```typescript
// Default retry settings
const RETRY_CONFIG = {
  maxRetries: 3,
  initialDelay: 1000,    // 1 second
  maxDelay: 10000,        // 10 seconds
  backoffFactor: 2
}
```

## 📝 Event Implementation

### Course Progress Events

#### Course Started
```typescript
// Triggered on first lesson access
await logCourseStarted(userId, email, courseSlug, {
  curriculumSlug,
  lessonId,
  source: 'lesson_page'
})
```

#### Lesson Completed
```typescript
// Triggered on 100% lesson progress
await logLessonCompleted(userId, email, lessonId, courseSlug, {
  timeSpent,
  quizScore,
  curriculumSlug
})
```

#### Course Completed
```typescript
// Triggered when all lessons complete
await logCourseCompleted(userId, email, courseSlug, {
  totalTimeSpent,
  averageQuizScore,
  curriculumSlug
})
```

### User Engagement Events

#### Profile Updated
```typescript
// Triggered on profile changes
await logProfileUpdated(userId, email, updatedFields, {
  previousValues,
  updateSource: 'user_profile_page'
})
```

#### Recommendation Shown
```typescript
// Triggered when recommendations display
await logRecommendationShown(userId, email, recommendedCourse, {
  recommendationType: 'personalized',
  score: matchScore,
  context: 'onboarding_complete'
})
```

### Lead Generation Events

#### Newsletter Subscribed
```typescript
// Triggered on newsletter signup
await logNewsletterSubscribed(userId, email, source, {
  consentGiven: true,
  source: 'homepage_footer'
})
```

#### Exit Intent Submitted
```typescript
// Triggered on exit intent form
await logExitIntentSubmitted(userId, email, leadType, {
  marketingConsent: consentStatus,
  hasUserId: !!userId,
  pageUrl: window.location.href
})
```

## 🔄 Event Flow

### Client Component → API Route → CRM

```typescript
// 1. Client Component (React)
const handleCourseStart = async () => {
  await logCourseStarted(user.id, user.email, course.slug)
}

// 2. Client Event Logger (crm-events-client.ts)
export const logCourseStarted = async (userId, email, courseSlug, context) => {
  const response = await fetch('/api/crm/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      eventType: EventType.COURSE_STARTED,
      userId,
      email,
      context: { courseSlug, ...context }
    })
  })
}

// 3. API Route (/api/crm/events/route.ts)
export async function POST(request) {
  const eventData = await request.json()
  await crmEventLogger.logEvent(eventData)
  return Response.json({ success: true })
}

// 4. Server Event Logger (crm-events.ts)
export class CRMEventLogger {
  async logEvent(event) {
    // Track in database
    await this.trackEvent(event)
    // Send to JanaGana CRM
    await this.sendToCRM(event)
  }
}
```

## 🛡️ Error Handling

### Client-Side Handling
```typescript
try {
  await logCourseStarted(user.id, user.email, course.slug)
} catch (error) {
  console.error('CRM event failed:', error)
  // Continue user experience - CRM failures are non-blocking
}
```

### Server-Side Handling
```typescript
try {
  await crmClient.post('/contacts', contactData)
} catch (error) {
  // Add to failure queue for retry
  await crmFailureQueue.addFailedRequest({
    id: generateEventId(),
    timestamp: new Date().toISOString(),
    endpoint: '/contacts',
    method: 'POST',
    payload: contactData,
    error: error.message,
    retryCount: 0
  })
}
```

### Retry Processing
```typescript
// Automatic retry with exponential backoff
const retryWithBackoff = async (request, retryCount) => {
  const delay = Math.min(
    RETRY_CONFIG.initialDelay * Math.pow(RETRY_CONFIG.backoffFactor, retryCount),
    RETRY_CONFIG.maxDelay
  )
  
  await new Promise(resolve => setTimeout(resolve, delay))
  return executeRequest(request)
}
```

## 📊 Monitoring

### Event Tracking Database

#### Events Tracked Table
```sql
CREATE TABLE crm_events_tracked (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  event_key TEXT UNIQUE NOT NULL,
  event_type TEXT NOT NULL,
  tracked_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Failed Requests Table
```sql
CREATE TABLE crm_failed_requests (
  id TEXT PRIMARY KEY,
  timestamp TEXT NOT NULL,
  endpoint TEXT NOT NULL,
  method TEXT NOT NULL,
  payload JSONB,
  error TEXT NOT NULL,
  status_code INTEGER,
  retry_count INTEGER DEFAULT 0,
  user_id TEXT,
  email TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  last_retry_at TIMESTAMP
);
```

### Monitoring Queries

#### Event Statistics
```sql
-- Event counts by type
SELECT 
  event_type,
  COUNT(*) as event_count,
  DATE_TRUNC('day', tracked_at) as date
FROM crm_events_tracked 
GROUP BY event_type, DATE_TRUNC('day', tracked_at)
ORDER BY date DESC;

-- Failed request summary
SELECT 
  COUNT(*) as total_failed,
  COUNT(CASE WHEN retry_count = 0 THEN 1 END) as pending_first_retry,
  COUNT(CASE WHEN retry_count < 3 THEN 1 END) as eligible_for_retry,
  AVG(EXTRACT(EPOCH FROM (NOW() - created_at))/60) as avg_age_minutes
FROM crm_failed_requests;
```

## 🔧 Maintenance

### Daily Tasks

#### Monitor Failed Requests
```sql
-- Check for high failure rates
SELECT 
  endpoint,
  COUNT(*) as failures,
  AVG(status_code) as avg_status_code
FROM crm_failed_requests 
WHERE created_at > NOW() - INTERVAL '24 hours'
GROUP BY endpoint
HAVING COUNT(*) > 10;
```

#### Process Retry Queue
```typescript
// Manual retry processing
await crmFailureQueue.processRetryQueue()
```

#### Cleanup Old Records
```sql
-- Automatic cleanup (runs via cron)
SELECT cleanup_old_crm_failures();
```

### Weekly Tasks

#### Review Event Patterns
```sql
-- Weekly event summary
SELECT 
  event_type,
  COUNT(*) as weekly_count,
  COUNT(DISTINCT user_id) as unique_users
FROM crm_events_tracked 
WHERE tracked_at > NOW() - INTERVAL '7 days'
GROUP BY event_type
ORDER BY weekly_count DESC;
```

#### Performance Analysis
```sql
-- API response times (if tracked)
SELECT 
  endpoint,
  AVG(response_time) as avg_response_time,
  MAX(response_time) as max_response_time,
  COUNT(*) as request_count
FROM api_logs 
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY endpoint;
```

### Monthly Tasks

#### Data Retention
```sql
-- Archive old events (optional)
-- Keep last 6 months of detailed events
-- Archive older data to cold storage
```

#### CRM Health Check
- Verify API connectivity
- Check authentication status
- Review error patterns
- Update documentation

## 🚀 Deployment

### Environment Setup

#### Development
```bash
# Local development with Supabase
npm run dev

# Environment variables in .env.local
JANAGANA_LEGACY_API_SYNC_ENABLED=false
JANAGANA_API_URL=http://localhost:3000/api
# JANAGANA_API_KEY is legacy/deferred for v1.
```

#### Production
```bash
# Deploy to Vercel
vercel --prod

# Production environment variables
vercel env add JANAGANA_LEGACY_API_SYNC_ENABLED
vercel env add JANAGANA_API_URL
# Do not add JANAGANA_API_KEY for v1 unless legacy sync is intentionally re-enabled.
```

### Database Migrations

#### Create CRM Tables
```sql
-- Run these migrations in order
-- 1. 20240502_crm_failed_requests.sql
-- 2. 20240503_crm_events_tracked.sql
```

### Testing

#### Unit Tests
```typescript
// Test CRM event logging
describe('CRM Event Logger', () => {
  it('should track course started event', async () => {
    const event = {
      eventType: EventType.COURSE_STARTED,
      userId: 'test-user',
      email: 'test@example.com',
      context: { courseSlug: 'test-course' }
    }
    
    await crmEventLogger.logEvent(event)
    
    // Verify event was tracked
    const tracked = await getTrackedEvent(event.id)
    expect(tracked).toBeTruthy()
  })
})
```

#### Integration Tests
```typescript
// Test API route
describe('CRM Events API', () => {
  it('should process client events', async () => {
    const response = await fetch('/api/crm/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventType: EventType.COURSE_STARTED,
        userId: 'test-user',
        email: 'test@example.com'
      })
    })
    
    expect(response.ok).toBe(true)
  })
})
```

## 🔍 Troubleshooting

### Common Issues

#### CRM API Failures
**Symptoms:** Events not appearing in CRM
**Causes:** API key issues, network problems, CRM downtime
**Solutions:**
1. Verify API credentials
2. Check CRM service status
3. Review failure queue
4. Manually retry failed requests

#### Database Connection Issues
**Symptoms:** Events not being tracked locally
**Causes:** Supabase connection problems, RLS policies
**Solutions:**
1. Check Supabase service status
2. Verify database connection string
3. Review Row Level Security policies
4. Test database permissions

#### Client-Side Errors
**Symptoms:** JavaScript errors in browser
**Causes:** Import issues, network failures, authentication problems
**Solutions:**
1. Check browser console for errors
2. Verify user authentication status
3. Test network connectivity
4. Review client-side imports

### Debugging Tools

#### Event Logging
```typescript
// Enable debug logging
const DEBUG_CRM = process.env.NODE_ENV === 'development'

if (DEBUG_CRM) {
  console.log('CRM Event:', eventData)
  console.log('CRM Response:', response)
}
```

#### Failure Queue Inspection
```sql
-- View recent failures
SELECT * FROM crm_failed_requests 
ORDER BY created_at DESC 
LIMIT 10;

-- View retry statistics
SELECT 
  endpoint,
  COUNT(*) as failures,
  AVG(retry_count) as avg_retries,
  MAX(retry_count) as max_retries
FROM crm_failed_requests 
GROUP BY endpoint;
```

## 📈 Performance Optimization

### Database Indexing
```sql
-- Optimized indexes for CRM queries
CREATE INDEX idx_crm_events_user_type ON crm_events_tracked(user_id, event_type);
CREATE INDEX idx_crm_events_timestamp ON crm_events_tracked(tracked_at);
CREATE INDEX idx_crm_failed_email ON crm_failed_requests(email);
CREATE INDEX idx_crm_failed_retry_count ON crm_failed_requests(retry_count);
```

### Batch Processing
```typescript
// Process multiple events efficiently
const batchEvents = async (events) => {
  const batchSize = 10
  for (let i = 0; i < events.length; i += batchSize) {
    const batch = events.slice(i, i + batchSize)
    await Promise.all(batch.map(event => crmEventLogger.logEvent(event)))
  }
}
```

### Caching Strategy
```typescript
// Cache user data to reduce database calls
const userCache = new Map()

const getUserData = async (userId) => {
  if (userCache.has(userId)) {
    return userCache.get(userId)
  }
  
  const userData = await fetchUserData(userId)
  userCache.set(userId, userData)
  return userData
}
```

## 🔐 Security Considerations

### API Key Management
- Store API keys in environment variables
- Rotate keys regularly
- Use different keys for development/production
- Monitor key usage and access

### Data Privacy
- Never log sensitive user data
- Anonymize PII in logs
- Follow GDPR compliance requirements
- Implement data retention policies

### Access Control
- Use Row Level Security (RLS) policies
- Validate user authentication
- Sanitize all input data
- Implement rate limiting

---

**Last Updated:** May 3, 2026  
**Version:** 1.0  
**Contact:** dev-team@purplewings.com
