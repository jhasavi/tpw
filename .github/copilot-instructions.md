# The Purple Wing - AI Coding Instructions

## Project Overview
Next.js 15 (App Router) financial literacy platform for women, using Supabase (PostgreSQL), TypeScript, and Tailwind CSS. Focus: women's financial empowerment with courses, quizzes, progress tracking, and gamification.

## Architecture & Data Flow

### Supabase Client Pattern (Critical)
- **Client Components**: Import from `@/lib/supabase/client` - returns browser client
- **Server Components**: Import from `@/lib/supabase/server` - awaits cookie-based client
- **Scripts**: Use `@supabase/supabase-js` with `SUPABASE_SERVICE_ROLE_KEY` from `.env.local`
- Never mix client/server imports - causes hydration errors

### Curriculum Structure (3-Level Hierarchy)
1. **Curricula** (`curricula` table) → slug: `womens-financial-literacy`
2. **Courses** (`courses` table) → e.g., `budgeting-basics`, `credit-management`
3. **Lessons** (`lessons` table) → content stored as JSONB with `sections[]`, `introduction`, `keyTakeaways`

Routes: `/learn/[curriculum]/[course]/[lesson]` - all slugs, not IDs

### Lesson Content Format
Lessons store content in JSONB column with structure:
```typescript
{
  introduction: string,
  sections: Array<{ title: string, content: string }>,
  keyTakeaways: string[],
  resources?: Array<{ title: string, url: string }>
}
```
Check for markdown variant: `content.markdown` (newer format)

### Authentication & Protected Routes
- Middleware in `src/middleware.ts` protects `/dashboard`, `/learn`, `/quiz`, `/assessment`
- Auth check: Cookie contains `sb-` prefix (simple check before full session validation)
- Redirect to `/auth?returnTo=` for unauthenticated access

## Development Workflows

### Running the App
```bash
./start-dev.sh          # Recommended - handles env setup
npm run dev             # Traditional method
```

### Database Migrations
```bash
# Run migrations via Supabase SQL Editor - no CLI migration system
# Files in database/migrations/ are documentation/rollforward only
# Key migration: database/migrations/QUICK_MIGRATION.sql (profiles, bookmarks, streaks)
```

### Updating Lessons
```bash
# 1. Create lesson data file in src/data/lessons/
# 2. Run script to push to database
npx tsx scripts/update-lessons.ts

# Lesson files follow naming: [course-slug]-[lesson-number].ts
# Example: src/data/lessons/budgeting-basics-1-2.ts
```

### Quality Checks
```bash
npm run quality-check:ts   # Comprehensive TypeScript checks
npm run quality-check:sql  # SQL-based validation
bash scripts/quality-check-queries.sh
```

## Project-Specific Patterns

### Quiz System (1000+ Questions)
- **Tables**: `quiz_categories`, `quiz_questions_bank`, `quiz_attempts_detailed`, `quiz_responses`
- **15 categories** with 3 difficulty levels each (beginner/intermediate/advanced)
- Questions stored in `quiz_questions_bank` with JSONB `options` array
- See `QUIZ_SYSTEM_DOCUMENTATION.md` for complete schema

### Progress Tracking
- `lesson_progress` table tracks per-lesson completion (status: 'not_started', 'in_progress', 'completed')
- `learning_streaks` tracks daily engagement, current/longest streak
- `user_achievements` for gamification (badges, milestones)

### Bookmarking Pattern
- Separate tables: `course_bookmarks`, `lesson_bookmarks`
- User-owned with unique constraint on (user_id, [course|lesson]_id)
- Uses `BookmarkButton.tsx` component (client-side)

### Email Integration
- Uses Resend for transactional emails
- API routes in `src/app/api/email/` (contact, newsletter-welcome)
- Newsletter subscribers in `newsletter_subscribers` table

### Content Philosophy
Transform generic financial education to practical, women-centered examples:
- **Wrong**: "Budgeting is creating a plan for your money"
- **Right**: "Sarah earns $3,500/month. Fixed expenses: $2,250. She has $1,250 left. Here's how..."
- Use personas from `CASE_STUDIES_AND_SCENARIOS.md` (Sarah, Maria, Jessica, etc.)
- Reference `IMPROVED_LESSON_TEMPLATES.md` for content structure

## Critical Conventions

### TypeScript Types
- Curriculum types: `src/types/curriculum.ts` (Curriculum, Course, Lesson interfaces)
- Profile types: `src/types/profile.ts`
- Onboarding types: `src/types/onboarding.ts`

### Component Organization
- Shared components: `src/components/` (Quiz, LessonContent, Navigation, etc.)
- Route-specific: Within app directories (e.g., `src/app/dashboard/`)
- Client components: Must have `'use client'` directive (required for Supabase client usage)

### Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL` - Client-accessible
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Client-accessible  
- `SUPABASE_SERVICE_ROLE_KEY` - Server/scripts only, never expose to client
- `RESEND_API_KEY` - Email service

### Database Access Patterns
- All tables have RLS (Row Level Security) enabled
- User-scoped queries filter by `auth.uid()` in policies
- Scripts bypass RLS using service role key

## Key Files & References

- **Architecture**: `README.md`, `START_HERE.md` (quality assessment context)
- **Data Structure**: `src/data/curricula.ts` (full curriculum hierarchy)
- **Migration Reference**: `database/migrations/QUICK_MIGRATION.sql`, `create_quiz_system.sql`
- **Content Guidelines**: `IMPROVED_LESSON_TEMPLATES.md`, `RESOURCE_LIBRARY_MASTER.md`
- **Deployment**: `LAUNCH_CHECKLIST.md` (95% complete, pre-launch tasks)

## Common Pitfalls

1. **Don't** use `createClient()` in server components without `await` - causes cookie access errors
2. **Don't** create slugs with spaces or special characters - use kebab-case only
3. **Don't** query by lesson ID in routes - always use curriculum/course/lesson slug hierarchy
4. **Don't** forget RLS policies - all new tables need policies or data won't be accessible
5. **Don't** commit `.env.local` - use `setup-vercel-env.sh` for deployment env setup

## Testing & Validation

- No formal test suite - quality checks via TypeScript compilation and manual testing
- Test auth flows: Email signup, Google OAuth, logout
- Test protected routes: Should redirect when logged out
- Verify RLS: User should only see their own progress/bookmarks
- Check lesson rendering: Handle empty content gracefully (shows "Coming Soon" message)

## Next Steps for AI Agents

When implementing features:
1. Check if similar pattern exists (quiz system, bookmark system, progress tracking)
2. Follow existing Supabase client patterns (client vs server)
3. Add RLS policies for new tables
4. Use TypeScript types from `src/types/`
5. Reference `START_HERE.md` for content quality standards
6. Test with real user flow (signup → browse courses → complete lesson → quiz)
