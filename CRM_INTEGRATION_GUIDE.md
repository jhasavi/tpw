# TPW CRM Integration Guide

## Overview

This guide covers the complete JanaGana CRM integration for The Purple Wings (TPW) platform, including all implemented events, architecture, and maintenance procedures.

## 🎯 Implemented Events

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

### Server-Side Only Design
All CRM writes happen server-side to ensure security:
- No client-side CRM secrets exposed
- Robust authentication required for all endpoints
- Input validation and sanitization
- Comprehensive error handling

### Idempotency Strategy
Database-based tracking prevents duplicate events:
```sql
CREATE TABLE crm_events_tracked (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  event_key VARCHAR(255) NOT NULL,
  event_type VARCHAR(50) NOT NULL,
  tracked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, event_key)
);
```

### Stable Idempotency Keys
- `course_started_${userId}_${courseId}`
- `lesson_completed_${userId}_${lessonId}_${courseId}`
- `course_completed_${userId}_${courseId}`
- `profile_updated_${userId}_${timestamp}`
- `recommendation_shown_${userId}_${courseId}_${timestamp}`

## 📁 File Structure

### API Routes
```
/src/app/api/crm/
├── course-progress/route.ts     # Course progress events
├── profile-update/route.ts      # Profile update events
└── recommendation-shown/route.ts # Recommendation events
```

### Components
```
/src/components/
├── CourseProgressTracker.tsx    # Course progress CRM tracking
├── ProgressTracker.tsx          # Enhanced with CRM events
└── onboarding/WelcomeWizard.tsx # Recommendation tracking
```

### Database Migrations
```
/supabase/migrations/
├── 20240502_crm_failed_requests.sql  # Failed request queue
└── 20240503_crm_events_tracked.sql    # Idempotency tracking
```

### Core Libraries
```
/src/lib/
├── crm-events.ts              # CRM event logging functions
├── crm-retry-server.ts       # Server-side retry logic
├── crm-failure-queue.ts       # Failed request handling
├── crm-reconciliation.ts      # Contact reconciliation
└── crm-utils.ts              # CRM utilities and types
```

## 🔧 Implementation Details

### Course Progress Events

#### course_started
**Trigger:** First lesson access in any course
**Location:** `/src/app/learn/[curriculum]/[course]/[lesson]/page.tsx`
**Component:** `CourseProgressTracker` with `eventType="course_started"`

```tsx
<CourseProgressTracker
  courseId={courseData.id}
  courseSlug={courseSlug}
  courseTitle={courseData.title}
  curriculumTitle={curriculaData.title}
  lessonId={lessonData.id}
  lessonTitle={lesson.title}
  eventType="course_started"
/>
```

#### lesson_completed
**Trigger:** User clicks "Mark Complete" button
**Location:** `/src/components/ProgressTracker.tsx`
**Integration:** Direct API call with idempotency check

#### course_completed
**Trigger:** Final lesson completion triggers course completion
**Location:** `/src/components/ProgressTracker.tsx`
**Logic:** Uses existing `/api/course/complete` endpoint

### Profile Update Events

#### profile_updated
**Trigger:** User saves profile changes
**Location:** `/src/app/profile/page.tsx` - `handleSubmit` function
**API Route:** `/src/app/api/crm/profile-update/route.ts`

```typescript
// Trigger CRM event for profile update
const response = await fetch('/api/crm/profile-update', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    profileData: {
      full_name: profile.full_name,
      location: profile.location,
      bio: profile.bio,
      financial_goals: profile.financial_goals,
      interests: profile.interests,
      experience_level: profile.experience_level,
      occupation: profile.occupation,
      industry: profile.industry,
      preferred_learning_style: profile.preferred_learning_style
    }
  })
})
```

### Recommendation Events

#### recommendation_shown
**Trigger:** User reaches recommendation step in onboarding
**Location:** `/src/components/onboarding/WelcomeWizard.tsx` - Step 3
**API Route:** `/src/app/api/crm/recommendation-shown/route.ts`

```typescript
useEffect(() => {
  if (recommendations.length > 0 && !isLoading) {
    // Track each recommendation shown
    for (const rec of recommendations) {
      await fetch('/api/crm/recommendation-shown', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recommendedCourse: rec.courses?.title || rec.id,
          courseSlug: rec.courses?.slug,
          priority: rec.priority,
          reason: rec.reason,
          assessmentData: { skillLevel, topics, goals, timeCommitment }
        })
      })
    }
  }
}, [recommendations, isLoading])
```

## 🗄️ Database Schema

### crm_events_tracked Table
```sql
CREATE TABLE crm_events_tracked (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_key VARCHAR(255) NOT NULL,
  tracked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  event_type VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, event_key)
);

-- Performance indexes
CREATE INDEX idx_crm_events_tracked_user_id ON crm_events_tracked(user_id);
CREATE INDEX idx_crm_events_tracked_event_key ON crm_events_tracked(event_key);
CREATE INDEX idx_crm_events_tracked_event_type ON crm_events_tracked(event_type);
```

### crm_failed_requests Table
```sql
CREATE TABLE crm_failed_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  endpoint TEXT NOT NULL,
  method TEXT NOT NULL,
  payload JSONB,
  error TEXT,
  status_code INTEGER,
  retry_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🛡️ Security & Safety

### Authentication
- All CRM API routes require user authentication
- Server-side Supabase client with service role key
- User context validated before CRM calls

### Data Validation
- Input validation on all API routes
- Sanitization of user-provided data
- Type checking for required fields

### Error Handling
- Comprehensive try-catch blocks
- Graceful degradation (CRM failures don't break UX)
- Detailed logging for debugging
- Server-side retry logic with exponential backoff

## 📊 JanaGana CRM Integration

### Event Mapping
| TPW Event | JanaGana Event | Tags | Context |
|-----------|----------------|------|---------|
| course_started | Activity Note | course-engaged | Course metadata |
| lesson_completed | Activity Note | lesson-completed | Progress data |
| course_completed | Activity Note | course-graduated | Completion milestone |
| profile_updated | Activity Note | profile-complete | Updated fields |
| recommendation_shown | Activity Note | recommendation-viewed | Assessment context |
| quiz_completed | Activity Note | quiz-completed | Quiz results |
| newsletter_subscribed | Activity Note | newsletter-subscriber | Subscription source |

### Data Enrichment
- User contact information from Supabase auth
- Course/lesson metadata from curriculum data
- Assessment context from user responses
- Profile completeness and engagement metrics

## 🧪 Testing

### Manual Testing
1. **Course Progress:** Navigate through lessons and complete them
2. **Profile Updates:** Modify profile information and save
3. **Recommendations:** Complete onboarding wizard
4. **Verification:** Check JanaGana CRM timeline for events

### Database Verification
```sql
-- Check tracked events
SELECT * FROM crm_events_tracked ORDER BY tracked_at DESC;

-- Verify no duplicates
SELECT event_key, COUNT(*) as count 
FROM crm_events_tracked 
GROUP BY event_key 
HAVING COUNT(*) > 1;

-- Check failed requests
SELECT * FROM crm_failed_requests ORDER BY created_at DESC;
```

### Browser Testing
```javascript
// Test API endpoints directly
fetch('/api/crm/course-progress', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    eventType: 'course_started',
    courseId: 'test-course',
    courseSlug: 'test-course',
    courseTitle: 'Test Course',
    curriculumTitle: 'Test Curriculum',
    lessonId: 'test-lesson',
    lessonTitle: 'Test Lesson'
  })
})
```

## 🚀 Deployment

### Database Migration
```bash
# Apply migration in Supabase Dashboard
1. Go to: https://supabase.com/dashboard/project/ckdshqbrxctjadljjhhy
2. Navigate to: SQL Editor → New Query
3. Copy content of: /supabase/migrations/20240503_crm_events_tracked.sql
4. Paste and execute
```

### Environment Variables
```env
JANAGANA_API_URL=https://janagana.namasteneedham.com/api
JANAGANA_API_KEY=your_api_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 🔧 Maintenance

### Monitoring
- Monitor CRM event success rates
- Track database performance metrics
- Review error logs for anomalies
- Check failed request queue

### Cleanup
```sql
-- Clean old tracking records (optional)
DELETE FROM crm_events_tracked 
WHERE tracked_at < NOW() - INTERVAL '90 days';

-- Clean processed failed requests
DELETE FROM crm_failed_requests 
WHERE status = 'processed' 
AND updated_at < NOW() - INTERVAL '7 days';
```

### Performance
- Monitor database query performance
- Check API response times
- Review CRM integration latency
- Optimize indexes as needed

## 🐛 Troubleshooting

### Common Issues

#### Events Not Appearing in CRM
1. Check authentication status
2. Verify API endpoint is accessible
3. Review browser console for errors
4. Check failed requests table

#### Duplicate Events
1. Verify idempotency key uniqueness
2. Check database constraints
3. Review client-side duplicate calls
4. Clear localStorage if needed

#### Performance Issues
1. Check database indexes
2. Monitor query performance
3. Review API response times
4. Optimize batch operations

### Debugging Tools
```sql
-- Check recent events for specific user
SELECT * FROM crm_events_tracked 
WHERE user_id = 'user-uuid' 
ORDER BY tracked_at DESC LIMIT 10;

-- Check failed requests
SELECT * FROM crm_failed_requests 
WHERE retry_count > 0 
ORDER BY created_at DESC;

-- Event type distribution
SELECT event_type, COUNT(*) as count 
FROM crm_events_tracked 
GROUP BY event_type 
ORDER BY count DESC;
```

## 📈 Future Enhancements

### Potential Additions
- **Automatic Lesson Completion** - Detect scroll/time-based completion
- **Progress Analytics** - Track time spent, retry attempts
- **Enhanced Recommendations** - Track clicks, enrollments
- **Engagement Scoring** - Calculate user engagement metrics
- **Batch Processing** - Queue events for bulk processing

### Scalability Considerations
- Database table can handle millions of tracking records
- API routes can be scaled horizontally
- Idempotency prevents duplicate load during high traffic
- Server-side retry logic ensures durability

---

**Last Updated:** May 3, 2026  
**Version:** 1.0  
**Status:** Production Ready
