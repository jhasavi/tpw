# The Purple Wing - Database Setup

This file contains the complete database schema for The Purple Wing platform.

## Running the Schema

1. Go to your Supabase project: https://ckdshqbrxctjadljjhhy.supabase.co
2. Navigate to the SQL Editor
3. Create a new query
4. Copy and paste the contents of `supabase-schema.sql`
5. Run the query

## Schema Overview

### Core Tables

- **profiles**: Extended user information
- **curricula**: Two main learning paths (Women's Financial Literacy, FINRA 40-Hour)
- **courses**: Courses within each curriculum
- **lessons**: Individual lessons with content
- **quiz_questions**: Reusable question bank
- **lesson_quizzes**: Assignment of questions to lessons
- **self_assessments**: Self-assessment templates

### Progress Tracking

- **lesson_progress**: User progress through lessons
- **quiz_attempts**: Quiz scores and attempts
- **self_assessment_results**: Self-assessment responses and scores

### Community (Future)

- **discussion_topics**: Forum discussions (placeholder)

## Security

All user-facing tables have Row Level Security (RLS) enabled. Users can only access their own:
- Profile data
- Lesson progress
- Quiz attempts
- Assessment results

## Next Steps

After running the schema, you'll need to:
1. Configure Google OAuth in Supabase Auth settings
2. Seed course and lesson data
3. Create quiz question bank
4. Build self-assessment templates
