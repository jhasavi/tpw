-- =====================================================
-- CONSOLIDATED MIGRATION: PRIORITY #5 + #6
-- =====================================================
-- Run this if you haven't run previous migrations
-- Includes all profile enhancements + onboarding system
-- =====================================================

-- Check if tables already exist to make this idempotent
DO $$ 
BEGIN
  -- Priority #5: Profile Enhancements
  IF NOT EXISTS (SELECT FROM pg_tables WHERE tablename = 'achievements') THEN
    -- Create achievements table
    CREATE TABLE achievements (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title TEXT NOT NULL,
      description TEXT,
      icon TEXT,
      category TEXT CHECK (category IN ('learning', 'quiz', 'streak', 'milestone')),
      rarity TEXT CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
      points INTEGER DEFAULT 0,
      requirements JSONB DEFAULT '{}',
      created_at TIMESTAMPTZ DEFAULT now()
    );
    
    -- Enable RLS
    ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "Achievements are viewable by everyone"
      ON achievements FOR SELECT
      USING (true);
  END IF;

  IF NOT EXISTS (SELECT FROM pg_tables WHERE tablename = 'user_achievements') THEN
    CREATE TABLE user_achievements (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
      achievement_id UUID NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
      unlocked_at TIMESTAMPTZ DEFAULT now(),
      UNIQUE(user_id, achievement_id)
    );
    
    ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "Users can view own achievements"
      ON user_achievements FOR SELECT
      USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (SELECT FROM pg_tables WHERE tablename = 'course_bookmarks') THEN
    CREATE TABLE course_bookmarks (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
      course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
      notes TEXT,
      created_at TIMESTAMPTZ DEFAULT now(),
      UNIQUE(user_id, course_id)
    );
    
    ALTER TABLE course_bookmarks ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "Users can manage own course bookmarks"
      ON course_bookmarks FOR ALL
      USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (SELECT FROM pg_tables WHERE tablename = 'lesson_bookmarks') THEN
    CREATE TABLE lesson_bookmarks (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
      lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
      notes TEXT,
      created_at TIMESTAMPTZ DEFAULT now(),
      UNIQUE(user_id, lesson_id)
    );
    
    ALTER TABLE lesson_bookmarks ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "Users can manage own lesson bookmarks"
      ON lesson_bookmarks FOR ALL
      USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (SELECT FROM pg_tables WHERE tablename = 'learning_streaks') THEN
    CREATE TABLE learning_streaks (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
      current_streak INTEGER DEFAULT 0,
      longest_streak INTEGER DEFAULT 0,
      last_activity_date DATE,
      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now()
    );
    
    ALTER TABLE learning_streaks ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "Users can view own streaks"
      ON learning_streaks FOR SELECT
      USING (auth.uid() = user_id);
  END IF;

  -- Priority #6: Onboarding System
  IF NOT EXISTS (SELECT FROM pg_tables WHERE tablename = 'skill_assessments') THEN
    CREATE TABLE skill_assessments (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
      skill_level TEXT NOT NULL CHECK (skill_level IN ('beginner', 'intermediate', 'advanced')),
      topics_interested TEXT[] DEFAULT '{}',
      learning_goals TEXT[] DEFAULT '{}',
      time_commitment TEXT NOT NULL CHECK (time_commitment IN ('light', 'moderate', 'intensive')),
      assessment_score INTEGER DEFAULT 0,
      responses JSONB DEFAULT '{}',
      completed_at TIMESTAMPTZ DEFAULT now(),
      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now()
    );
    
    ALTER TABLE skill_assessments ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "Users can manage own assessments"
      ON skill_assessments FOR ALL
      USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (SELECT FROM pg_tables WHERE tablename = 'onboarding_progress') THEN
    CREATE TABLE onboarding_progress (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
      current_step INTEGER DEFAULT 0,
      completed_steps TEXT[] DEFAULT '{}',
      skipped_steps TEXT[] DEFAULT '{}',
      started_at TIMESTAMPTZ DEFAULT now(),
      completed_at TIMESTAMPTZ,
      is_complete BOOLEAN DEFAULT false,
      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now()
    );
    
    ALTER TABLE onboarding_progress ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "Users can manage own onboarding"
      ON onboarding_progress FOR ALL
      USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (SELECT FROM pg_tables WHERE tablename = 'course_recommendations') THEN
    CREATE TABLE course_recommendations (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
      course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
      reason TEXT,
      priority TEXT CHECK (priority IN ('high', 'medium', 'low')),
      match_score INTEGER DEFAULT 0,
      is_accepted BOOLEAN DEFAULT false,
      is_dismissed BOOLEAN DEFAULT false,
      created_at TIMESTAMPTZ DEFAULT now(),
      UNIQUE(user_id, course_id)
    );
    
    ALTER TABLE course_recommendations ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "Users can manage own recommendations"
      ON course_recommendations FOR ALL
      USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (SELECT FROM pg_tables WHERE tablename = 'user_tooltips_seen') THEN
    CREATE TABLE user_tooltips_seen (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
      tooltip_id TEXT NOT NULL,
      seen_at TIMESTAMPTZ DEFAULT now(),
      UNIQUE(user_id, tooltip_id)
    );
    
    ALTER TABLE user_tooltips_seen ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "Users can manage own tooltips"
      ON user_tooltips_seen FOR ALL
      USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (SELECT FROM pg_tables WHERE tablename = 'celebration_events') THEN
    CREATE TABLE celebration_events (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
      event_type TEXT NOT NULL CHECK (event_type IN ('achievement', 'milestone', 'streak', 'completion')),
      title TEXT NOT NULL,
      message TEXT,
      icon TEXT,
      reward TEXT,
      shown BOOLEAN DEFAULT false,
      created_at TIMESTAMPTZ DEFAULT now()
    );
    
    ALTER TABLE celebration_events ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "Users can manage own celebrations"
      ON celebration_events FOR ALL
      USING (auth.uid() = user_id);
  END IF;
END $$;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_user_achievements_user ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_course_bookmarks_user ON course_bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_lesson_bookmarks_user ON lesson_bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_learning_streaks_user ON learning_streaks(user_id);
CREATE INDEX IF NOT EXISTS idx_skill_assessments_user ON skill_assessments(user_id);
CREATE INDEX IF NOT EXISTS idx_onboarding_progress_user ON onboarding_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_course_recommendations_user ON course_recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_course_recommendations_priority ON course_recommendations(user_id, priority) WHERE is_dismissed = false;
CREATE INDEX IF NOT EXISTS idx_tooltips_seen_user ON user_tooltips_seen(user_id);
CREATE INDEX IF NOT EXISTS idx_celebration_events_user ON celebration_events(user_id) WHERE shown = false;

-- Create or replace recommendation function
CREATE OR REPLACE FUNCTION generate_course_recommendations(p_user_id UUID)
RETURNS void AS $$
DECLARE
  v_assessment RECORD;
  v_course RECORD;
  v_match_score INTEGER;
BEGIN
  SELECT * INTO v_assessment
  FROM skill_assessments
  WHERE user_id = p_user_id
  ORDER BY created_at DESC
  LIMIT 1;

  IF NOT FOUND THEN RETURN; END IF;

  DELETE FROM course_recommendations WHERE user_id = p_user_id;

  FOR v_course IN
    SELECT c.*, cu.difficulty_level
    FROM courses c
    JOIN curricula cu ON c.curriculum_id = cu.id
    WHERE cu.is_published = true
  LOOP
    v_match_score := 0;

    IF (v_assessment.skill_level = 'beginner' AND v_course.difficulty_level = 'beginner') OR
       (v_assessment.skill_level = 'intermediate' AND v_course.difficulty_level IN ('beginner', 'intermediate')) OR
       (v_assessment.skill_level = 'advanced') THEN
      v_match_score := v_match_score + 30;
    END IF;

    IF v_assessment.topics_interested IS NOT NULL THEN
      v_match_score := v_match_score + 20;
    END IF;

    IF v_match_score >= 30 THEN
      INSERT INTO course_recommendations (user_id, course_id, reason, priority, match_score)
      VALUES (
        p_user_id,
        v_course.id,
        CASE
          WHEN v_match_score >= 50 THEN 'Perfect match for your skill level and interests'
          WHEN v_match_score >= 40 THEN 'Great fit based on your assessment'
          ELSE 'Recommended based on your profile'
        END,
        CASE
          WHEN v_match_score >= 50 THEN 'high'
          WHEN v_match_score >= 40 THEN 'medium'
          ELSE 'low'
        END,
        v_match_score
      )
      ON CONFLICT (user_id, course_id) DO NOTHING;
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Extend profiles table if columns don't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'profiles' AND column_name = 'bio') THEN
    ALTER TABLE profiles ADD COLUMN bio TEXT;
    ALTER TABLE profiles ADD COLUMN financial_goals TEXT[];
    ALTER TABLE profiles ADD COLUMN interests TEXT[];
    ALTER TABLE profiles ADD COLUMN experience_level TEXT;
    ALTER TABLE profiles ADD COLUMN occupation TEXT;
    ALTER TABLE profiles ADD COLUMN industry TEXT;
    ALTER TABLE profiles ADD COLUMN preferred_learning_style TEXT;
    ALTER TABLE profiles ADD COLUMN profile_completeness INTEGER DEFAULT 0;
  END IF;
END $$;

RAISE NOTICE 'Migration completed successfully!';
