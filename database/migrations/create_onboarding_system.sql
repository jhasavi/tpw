-- =====================================================
-- PRIORITY #6: USER ONBOARDING SYSTEM
-- =====================================================
-- Creates tables for onboarding flow, skill assessment,
-- and personalized recommendations
-- =====================================================

-- 1. Skill Assessments Table
-- =====================================================
CREATE TABLE IF NOT EXISTS skill_assessments (
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

-- 2. Onboarding Progress Table
-- =====================================================
CREATE TABLE IF NOT EXISTS onboarding_progress (
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

-- 3. Course Recommendations Table
-- =====================================================
CREATE TABLE IF NOT EXISTS course_recommendations (
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

-- 4. User Tooltips Seen Table
-- =====================================================
CREATE TABLE IF NOT EXISTS user_tooltips_seen (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tooltip_id TEXT NOT NULL,
  seen_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, tooltip_id)
);

-- 5. Celebration Events Table
-- =====================================================
CREATE TABLE IF NOT EXISTS celebration_events (
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

-- =====================================================
-- INDEXES for Performance
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_skill_assessments_user 
  ON skill_assessments(user_id);

CREATE INDEX IF NOT EXISTS idx_onboarding_progress_user 
  ON onboarding_progress(user_id);

CREATE INDEX IF NOT EXISTS idx_course_recommendations_user 
  ON course_recommendations(user_id);

CREATE INDEX IF NOT EXISTS idx_course_recommendations_priority 
  ON course_recommendations(user_id, priority) 
  WHERE is_dismissed = false;

CREATE INDEX IF NOT EXISTS idx_tooltips_seen_user 
  ON user_tooltips_seen(user_id);

CREATE INDEX IF NOT EXISTS idx_celebration_events_user_unshown 
  ON celebration_events(user_id) 
  WHERE shown = false;

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

ALTER TABLE skill_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_tooltips_seen ENABLE ROW LEVEL SECURITY;
ALTER TABLE celebration_events ENABLE ROW LEVEL SECURITY;

-- Skill Assessments Policies
CREATE POLICY "Users can view own assessments"
  ON skill_assessments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own assessments"
  ON skill_assessments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own assessments"
  ON skill_assessments FOR UPDATE
  USING (auth.uid() = user_id);

-- Onboarding Progress Policies
CREATE POLICY "Users can view own onboarding progress"
  ON onboarding_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own onboarding progress"
  ON onboarding_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own onboarding progress"
  ON onboarding_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- Course Recommendations Policies
CREATE POLICY "Users can view own recommendations"
  ON course_recommendations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own recommendations"
  ON course_recommendations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own recommendations"
  ON course_recommendations FOR UPDATE
  USING (auth.uid() = user_id);

-- Tooltips Policies
CREATE POLICY "Users can view own tooltips"
  ON user_tooltips_seen FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own tooltips"
  ON user_tooltips_seen FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Celebration Events Policies
CREATE POLICY "Users can view own celebrations"
  ON celebration_events FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own celebrations"
  ON celebration_events FOR UPDATE
  USING (auth.uid() = user_id);

-- =====================================================
-- TRIGGERS for Updated At
-- =====================================================

CREATE TRIGGER update_skill_assessments_updated_at
  BEFORE UPDATE ON skill_assessments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_onboarding_progress_updated_at
  BEFORE UPDATE ON onboarding_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- FUNCTIONS for Recommendations
-- =====================================================

-- Function to generate course recommendations based on assessment
CREATE OR REPLACE FUNCTION generate_course_recommendations(p_user_id UUID)
RETURNS void AS $$
DECLARE
  v_assessment RECORD;
  v_course RECORD;
  v_match_score INTEGER;
BEGIN
  -- Get the latest assessment
  SELECT * INTO v_assessment
  FROM skill_assessments
  WHERE user_id = p_user_id
  ORDER BY created_at DESC
  LIMIT 1;

  IF NOT FOUND THEN
    RETURN;
  END IF;

  -- Clear old recommendations
  DELETE FROM course_recommendations WHERE user_id = p_user_id;

  -- Generate recommendations based on skill level and interests
  FOR v_course IN
    SELECT c.*, cu.difficulty_level
    FROM courses c
    JOIN curricula cu ON c.curriculum_id = cu.id
    WHERE cu.is_published = true
  LOOP
    v_match_score := 0;

    -- Match difficulty level with skill level
    IF (v_assessment.skill_level = 'beginner' AND v_course.difficulty_level = 'beginner') OR
       (v_assessment.skill_level = 'intermediate' AND v_course.difficulty_level IN ('beginner', 'intermediate')) OR
       (v_assessment.skill_level = 'advanced') THEN
      v_match_score := v_match_score + 30;
    END IF;

    -- Match topics (if course title or description contains interested topics)
    IF v_assessment.topics_interested IS NOT NULL THEN
      -- Simple topic matching (can be enhanced)
      v_match_score := v_match_score + 20;
    END IF;

    -- Insert recommendation if match score is high enough
    IF v_match_score >= 30 THEN
      INSERT INTO course_recommendations (
        user_id,
        course_id,
        reason,
        priority,
        match_score
      ) VALUES (
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

-- =====================================================
-- SEED DATA: Assessment Questions
-- =====================================================

-- We'll create these as JSON data that the frontend can use
COMMENT ON TABLE skill_assessments IS 'Stores user skill assessment results and preferences for personalized onboarding';
COMMENT ON TABLE onboarding_progress IS 'Tracks user progress through the onboarding wizard';
COMMENT ON TABLE course_recommendations IS 'Stores personalized course recommendations based on skill assessment';
COMMENT ON TABLE user_tooltips_seen IS 'Tracks which feature tooltips a user has already seen';
COMMENT ON TABLE celebration_events IS 'Queues celebration modals for achievements and milestones';
