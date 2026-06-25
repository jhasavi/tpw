# TPW Architecture Overview

## 🏗️ System Architecture

The Purple Wings (TPW) is a modern financial literacy platform built with Next.js 16, TypeScript, and Supabase. This document provides a comprehensive overview of the system architecture, data flow, and key components.

## 📋 Technology Stack

### Frontend
- **Framework:** Next.js 16.1.6 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Custom components with Lucide icons
- **State Management:** React hooks and server state

### Backend & Database
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **API Routes:** Next.js API routes
- **File Storage:** Supabase Storage

### Third-Party Integrations
- **CRM:** JanaGana CRM
- **Email:** Custom email service
- **Analytics:** Custom tracking
- **Deployment:** Vercel

## 🗄️ Database Schema

### Core Tables

#### Users & Authentication
```sql
profiles
├── id (UUID, primary key)
├── email (text, unique)
├── full_name (text)
├── location (text)
├── bio (text)
├── financial_goals (text[])
├── interests (text[])
├── experience_level (text)
├── occupation (text)
├── industry (text)
├── preferred_learning_style (text)
├── profile_completeness (integer)
└── created_at/updated_at (timestamps)
```

#### Course Management
```sql
curricula
├── id (UUID, primary key)
├── title (text)
├── description (text)
├── slug (text, unique)
├── difficulty_level (text)
├── estimated_hours (integer)
└── metadata (jsonb)

courses
├── id (UUID, primary key)
├── curriculum_id (UUID, foreign key)
├── title (text)
├── description (text)
├── slug (text, unique)
├── order_index (integer)
└── content (jsonb)

lessons
├── id (UUID, primary key)
├── course_id (UUID, foreign key)
├── title (text)
├── content (text)
├── video_url (text)
├── order_index (integer)
└── duration_minutes (integer)
```

#### Progress Tracking
```sql
lesson_progress
├── id (UUID, primary key)
├── user_id (UUID, foreign key)
├── lesson_id (UUID, foreign key)
├── progress_percentage (integer)
├── completed_at (timestamp)
├── time_spent_minutes (integer)
└── created_at/updated_at (timestamps)

course_progress
├── id (UUID, primary key)
├── user_id (UUID, foreign key)
├── course_id (UUID, foreign key)
├── lessons_completed (integer)
├── total_lessons (integer)
├── progress_percentage (integer)
├── completed_at (timestamp)
└── created_at/updated_at (timestamps)
```

#### CRM Integration
```sql
crm_events_tracked
├── id (UUID, primary key)
├── user_id (UUID, foreign key)
├── event_key (text, unique)
├── event_type (text)
├── tracked_at (timestamp)
└── created_at/updated_at (timestamps)

crm_failed_requests
├── id (text, primary key)
├── timestamp (text)
├── endpoint (text)
├── method (text)
├── payload (jsonb)
├── error (text)
├── status_code (integer)
├── retry_count (integer)
├── user_id (text)
├── email (text)
└── created_at/last_retry_at (timestamps)
```

#### Onboarding & Assessment
```sql
onboarding_progress
├── user_id (UUID, primary key)
├── current_step (integer)
├── completed_steps (text[])
├── skipped_steps (text[])
├── started_at (timestamp)
├── completed_at (timestamp)
└── is_complete (boolean)

skill_assessments
├── id (UUID, primary key)
├── user_id (UUID, foreign key)
├── skill_level (text)
├── topics_interested (text[])
├── learning_goals (text[])
├── time_commitment (text)
├── completed_at (timestamp)
├── score (integer)
└── recommendations (jsonb)
```

## 🔄 Data Flow Architecture

### Authentication Flow
```
User → Supabase Auth → JWT Token → API Routes → Database
```

### Course Progress Flow
```
User Access → Lesson Page → ProgressTracker → Database → CRM Events
```

### CRM Integration Flow
```
User Action → Client Component → API Route → Server Processing → JanaGana CRM
```

### Onboarding Flow
```
New User → WelcomeWizard → Assessment → Recommendations → Profile Creation
```

## 🧩 Key Components

### Frontend Components

#### Navigation & Layout
- `Navigation.tsx` - Main navigation with auth state
- `Layout.tsx` - App layout with metadata
- `Footer.tsx` - Site footer with links

#### Course System
- `CourseCard.tsx` - Course preview cards
- `LessonPlayer.tsx` - Video lesson player
- `ProgressTracker.tsx` - Lesson progress tracking
- `CourseProgressTracker.tsx` - Course-level CRM tracking

#### User Engagement
- `WelcomeWizard.tsx` - Onboarding flow
- `SmartLeadCapture.tsx` - Lead generation forms
- `ExitIntentPopup.tsx` - Exit intent capture
- `Quiz.tsx` - Interactive quiz components

#### Assessment & Personalization
- `PersonalityQuiz.tsx` - Personality assessment
- `RetirementQuiz.tsx` - Retirement readiness quiz
- `RecommendationEngine.tsx` - Course recommendations

### Backend Services

#### API Routes Structure
```
/api/
├── auth/                    # Authentication endpoints
│   ├── signup-reconcile/    # User signup with CRM sync
│   └── login/              # Login handling
├── crm/                     # CRM integration
│   ├── events/             # Client CRM events
│   ├── course-progress/    # Course progress events
│   ├── profile-update/     # Profile update events
│   └── recommendation-shown/ # Recommendation events
├── leads/                   # Lead generation
│   ├── capture/            # Smart lead capture
│   └── profile/            # Profile updates
├── newsletter/              # Newsletter subscription
│   └── subscribe/          # Subscribe endpoint
├── course/                  # Course management
│   └── complete/           # Course completion
└── email/                   # Email services
    ├── contact/            # Contact form
    └── welcome-series/     # Welcome emails
```

#### Core Libraries
- `crm-events.ts` - Server-side CRM event logging
- `crm-events-client.ts` - Client-side CRM events
- `crm-retry-server.ts` - CRM retry logic with failure queue
- `crm-failure-queue.ts` - Failed request handling
- `crm-reconciliation.ts` - User contact reconciliation
- `crm-utils.ts` - CRM utilities and types

## 🔐 Security Architecture

### Authentication & Authorization
- **Supabase Auth** handles user authentication
- **JWT Tokens** for session management
- **Row Level Security (RLS)** on database tables
- **Service Role** for server-side operations

### Data Protection
- **Environment Variables** for sensitive configuration
- **API Key Management** for external services
- **Input Validation** using Zod schemas
- **Rate Limiting** for API endpoints

### Client/Server Separation
- **Server-side only** CRM operations
- **Client-safe** event logging via API routes
- **No client-side secrets** exposed

## 📊 Monitoring & Observability

### Error Handling
- **Comprehensive try-catch blocks** throughout
- **Graceful degradation** for CRM failures
- **Failure queue** for retry logic
- **Detailed error logging** for debugging

### Performance Monitoring
- **Database indexes** for query optimization
- **API response time tracking**
- **Client-side performance metrics**
- **Server-side logging** via `src/lib/logger.ts` (structured JSON)
- **Health endpoints:** `GET /api/ready` (liveness), `GET /api/health` (config/deps)
- **Request tracing:** `x-request-id` header on all responses

### CRM Observability
- **Event tracking** for user actions
- **Failure monitoring** for CRM operations
- **Retry queue statistics**
- **Success rate tracking**

## 🚀 Deployment Architecture

### Environment Configuration
- **Development:** Local development with Supabase local
- **Staging:** Vercel preview deployments
- **Production:** Vercel production with Supabase prod

### CI/CD Pipeline
- **Git integration** with Vercel
- **Automatic deployments** on main branch
- **Environment variable management**
- **Build optimization** with Next.js

### Infrastructure
- **Vercel** for frontend hosting
- **Supabase** for database and auth
- **JanaGana CRM** for customer management
- **Custom email service** for communications

## 🔧 Development Workflow

### Local Development
```bash
# Start development
./start-dev.sh
# or
npm install && npm run dev
```

### Database Management
- **Supabase migrations** for schema changes
- **Local development** with Supabase CLI
- **Production migrations** via dashboard

### Code Organization
- **App Router** structure for Next.js 13+
- **Component-based** architecture
- **TypeScript** for type safety
- **ESLint/Prettier** for code quality

## 📈 Scalability Considerations

### Database Scaling
- **Connection pooling** via Supabase
- **Query optimization** with proper indexing
- **Data archiving** for old records
- **Read replicas** if needed

### API Scaling
- **Serverless functions** via Vercel
- **Rate limiting** for API protection
- **Caching strategies** for frequent requests
- **Load balancing** automatic with Vercel

### CRM Scaling
- **Batch processing** for events
- **Failure queue** for reliability
- **Idempotency** for duplicate prevention
- **Retry logic** for resilience

## 🔄 Future Architecture Plans

### Multi-Tenant Support
- **Tenant isolation** at database level
- **Tenant-specific** configurations
- **Multi-tenant CRM** integration
- **Tenant management** dashboard

### Enhanced Analytics
- **Real-time analytics** dashboard
- **User behavior tracking**
- **Performance metrics**
- **Business intelligence** tools

### Mobile Application
- **React Native** mobile app
- **Offline support** for courses
- **Push notifications** for engagement
- **Cross-platform** synchronization

---

**Last Updated:** June 25, 2026  
**Version:** 2.1  
**Maintainer:** TPW Development Team
