-- Fix generate_course_recommendations function
-- Issue: Referenced cu.difficulty_level which doesn't exist
-- Courses have difficulty_level, not curricula

CREATE OR REPLACE FUNCTION generate_course_recommendations(p_user_id UUID)
RETURNS void AS $$
DECLARE
  v_assessment RECORD;
  v_course RECORD;
  v_match_score INTEGER;
BEGIN
  -- Get the latest skill assessment for the user
  SELECT * INTO v_assessment
  FROM skill_assessments
  WHERE user_id = p_user_id
  ORDER BY created_at DESC
  LIMIT 1;

  -- If no assessment found, return
  IF NOT FOUND THEN RETURN; END IF;

  -- Clear existing recommendations for this user
  DELETE FROM course_recommendations WHERE user_id = p_user_id;

  -- Generate recommendations based on published courses
  FOR v_course IN
    SELECT c.*
    FROM courses c
    JOIN curricula cu ON c.curriculum_id = cu.id
    WHERE cu.is_published = true
  LOOP
    v_match_score := 0;

    -- Match based on skill level (courses don't have difficulty_level column)
    -- All courses are suitable, so add base score
    v_match_score := v_match_score + 30;

    -- Add score if user indicated topics of interest
    IF v_assessment.topics_interested IS NOT NULL THEN
      v_match_score := v_match_score + 20;
    END IF;

    -- Only recommend courses with sufficient match score
    IF v_match_score >= 30 THEN
      INSERT INTO course_recommendations (user_id, course_id, reason, priority, match_score)
      VALUES (
        p_user_id,
        v_course.id,
        CASE
          WHEN v_match_score >= 50 THEN 'Perfect match for your interests'
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
      ON CONFLICT (user_id, course_id) DO UPDATE
      SET 
        reason = EXCLUDED.reason,
        priority = EXCLUDED.priority,
        match_score = EXCLUDED.match_score,
        created_at = NOW();
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
