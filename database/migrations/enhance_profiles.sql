-- Profile Enhancements Migration
-- Adds extended profile fields, achievements, bookmarks, and streaks

-- =============================================
-- EXTENDED PROFILE FIELDS
-- =============================================

-- Add new columns to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS financial_goals TEXT[],
ADD COLUMN IF NOT EXISTS interests TEXT[],
ADD COLUMN IF NOT EXISTS experience_level TEXT DEFAULT 'beginner' CHECK (experience_level IN ('beginner', 'intermediate', 'advanced')),
ADD COLUMN IF NOT EXISTS occupation TEXT,
ADD COLUMN IF NOT EXISTS industry TEXT,
ADD COLUMN IF NOT EXISTS preferred_learning_style TEXT CHECK (preferred_learning_style IN ('visual', 'auditory', 'reading', 'kinesthetic', 'mixed'));

-- Add profile completeness score (0-100)
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS profile_completeness INTEGER DEFAULT 0;

-- =============================================
-- USER ACHIEVEMENTS & BADGES
-- =============================================

CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL, -- 'first_lesson', 'quiz_master', etc.
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL, -- Emoji or icon identifier
  category TEXT NOT NULL, -- 'learning', 'quiz', 'streak', 'milestone'
  criteria JSONB NOT NULL, -- Requirements to earn this achievement
  points INTEGER DEFAULT 10,
  rarity TEXT DEFAULT 'common' CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
  display_order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User earned achievements
CREATE TABLE IF NOT EXISTS public.user_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  achievement_id UUID REFERENCES public.achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  progress JSONB, -- Track progress towards achievement
  is_showcased BOOLEAN DEFAULT FALSE, -- Display on profile
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own achievements" ON public.user_achievements
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own achievements" ON public.user_achievements
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own achievements" ON public.user_achievements
  FOR UPDATE USING (auth.uid() = user_id);

-- =============================================
-- COURSE BOOKMARKS
-- =============================================

CREATE TABLE IF NOT EXISTS public.course_bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

ALTER TABLE public.course_bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own bookmarks" ON public.course_bookmarks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own bookmarks" ON public.course_bookmarks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bookmarks" ON public.course_bookmarks
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookmarks" ON public.course_bookmarks
  FOR UPDATE USING (auth.uid() = user_id);

-- =============================================
-- LESSON BOOKMARKS
-- =============================================

CREATE TABLE IF NOT EXISTS public.lesson_bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

ALTER TABLE public.lesson_bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own lesson bookmarks" ON public.lesson_bookmarks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own lesson bookmarks" ON public.lesson_bookmarks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own lesson bookmarks" ON public.lesson_bookmarks
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own lesson bookmarks" ON public.lesson_bookmarks
  FOR UPDATE USING (auth.uid() = user_id);

-- =============================================
-- LEARNING STREAKS
-- =============================================

CREATE TABLE IF NOT EXISTS public.learning_streaks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE,
  streak_start_date DATE,
  total_active_days INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.learning_streaks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own streak" ON public.learning_streaks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own streak" ON public.learning_streaks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own streak" ON public.learning_streaks
  FOR UPDATE USING (auth.uid() = user_id);

-- =============================================
-- LEARNING PLAYLISTS
-- =============================================

CREATE TABLE IF NOT EXISTS public.learning_playlists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.learning_playlists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own playlists" ON public.learning_playlists
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own playlists" ON public.learning_playlists
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own playlists" ON public.learning_playlists
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own playlists" ON public.learning_playlists
  FOR DELETE USING (auth.uid() = user_id);

-- Playlist items (courses/lessons in a playlist)
CREATE TABLE IF NOT EXISTS public.playlist_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  playlist_id UUID REFERENCES public.learning_playlists(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
  display_order INTEGER,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CHECK (course_id IS NOT NULL OR lesson_id IS NOT NULL)
);

ALTER TABLE public.playlist_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view items from their playlists" ON public.playlist_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.learning_playlists
      WHERE id = playlist_items.playlist_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert items to their playlists" ON public.playlist_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.learning_playlists
      WHERE id = playlist_items.playlist_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete items from their playlists" ON public.playlist_items
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.learning_playlists
      WHERE id = playlist_items.playlist_id AND user_id = auth.uid()
    )
  );

-- =============================================
-- HELPER FUNCTIONS
-- =============================================

-- Function to calculate profile completeness
CREATE OR REPLACE FUNCTION calculate_profile_completeness(profile_id UUID)
RETURNS INTEGER AS $$
DECLARE
  completeness INTEGER := 0;
  profile_record RECORD;
BEGIN
  SELECT * INTO profile_record FROM public.profiles WHERE id = profile_id;
  
  IF profile_record IS NULL THEN
    RETURN 0;
  END IF;
  
  -- Base fields (10 points each)
  IF profile_record.full_name IS NOT NULL AND profile_record.full_name != '' THEN
    completeness := completeness + 10;
  END IF;
  
  IF profile_record.avatar_url IS NOT NULL AND profile_record.avatar_url != '' THEN
    completeness := completeness + 15;
  END IF;
  
  IF profile_record.location IS NOT NULL AND profile_record.location != '' THEN
    completeness := completeness + 5;
  END IF;
  
  -- Extended fields (10 points each)
  IF profile_record.bio IS NOT NULL AND profile_record.bio != '' THEN
    completeness := completeness + 15;
  END IF;
  
  IF profile_record.financial_goals IS NOT NULL AND array_length(profile_record.financial_goals, 1) > 0 THEN
    completeness := completeness + 10;
  END IF;
  
  IF profile_record.interests IS NOT NULL AND array_length(profile_record.interests, 1) > 0 THEN
    completeness := completeness + 10;
  END IF;
  
  IF profile_record.experience_level IS NOT NULL THEN
    completeness := completeness + 5;
  END IF;
  
  IF profile_record.occupation IS NOT NULL AND profile_record.occupation != '' THEN
    completeness := completeness + 10;
  END IF;
  
  IF profile_record.industry IS NOT NULL AND profile_record.industry != '' THEN
    completeness := completeness + 10;
  END IF;
  
  IF profile_record.preferred_learning_style IS NOT NULL THEN
    completeness := completeness + 10;
  END IF;
  
  RETURN LEAST(completeness, 100);
END;
$$ LANGUAGE plpgsql;

-- Function to update learning streak
CREATE OR REPLACE FUNCTION update_learning_streak(p_user_id UUID)
RETURNS void AS $$
DECLARE
  streak_record RECORD;
  today DATE := CURRENT_DATE;
  yesterday DATE := CURRENT_DATE - INTERVAL '1 day';
BEGIN
  -- Get or create streak record
  SELECT * INTO streak_record FROM public.learning_streaks WHERE user_id = p_user_id;
  
  IF streak_record IS NULL THEN
    -- Create new streak record
    INSERT INTO public.learning_streaks (user_id, current_streak, longest_streak, last_activity_date, streak_start_date, total_active_days)
    VALUES (p_user_id, 1, 1, today, today, 1);
  ELSE
    -- Update existing streak
    IF streak_record.last_activity_date = today THEN
      -- Already logged today, do nothing
      RETURN;
    ELSIF streak_record.last_activity_date = yesterday THEN
      -- Continue streak
      UPDATE public.learning_streaks
      SET 
        current_streak = current_streak + 1,
        longest_streak = GREATEST(longest_streak, current_streak + 1),
        last_activity_date = today,
        total_active_days = total_active_days + 1,
        updated_at = NOW()
      WHERE user_id = p_user_id;
    ELSE
      -- Streak broken, start new streak
      UPDATE public.learning_streaks
      SET 
        current_streak = 1,
        last_activity_date = today,
        streak_start_date = today,
        total_active_days = total_active_days + 1,
        updated_at = NOW()
      WHERE user_id = p_user_id;
    END IF;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update streak when lesson progress is updated
CREATE OR REPLACE FUNCTION trigger_update_streak()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM update_learning_streak(NEW.user_id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_streak_on_lesson_progress
  AFTER INSERT OR UPDATE ON public.lesson_progress
  FOR EACH ROW
  EXECUTE FUNCTION trigger_update_streak();

-- Trigger to update profile completeness
CREATE OR REPLACE FUNCTION trigger_update_profile_completeness()
RETURNS TRIGGER AS $$
BEGIN
  NEW.profile_completeness := calculate_profile_completeness(NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profile_completeness_trigger
  BEFORE INSERT OR UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION trigger_update_profile_completeness();

-- =============================================
-- SEED ACHIEVEMENTS DATA
-- =============================================

INSERT INTO public.achievements (code, title, description, icon, category, criteria, points, rarity, display_order)
VALUES
  -- Learning Achievements
  ('first_lesson', 'First Step', 'Completed your first lesson', '🎯', 'learning', '{"lessons_completed": 1}', 10, 'common', 1),
  ('five_lessons', 'Knowledge Builder', 'Completed 5 lessons', '📚', 'learning', '{"lessons_completed": 5}', 25, 'common', 2),
  ('ten_lessons', 'Learning Enthusiast', 'Completed 10 lessons', '📖', 'learning', '{"lessons_completed": 10}', 50, 'rare', 3),
  ('course_complete', 'Course Champion', 'Completed your first course', '🎓', 'learning', '{"courses_completed": 1}', 100, 'rare', 4),
  ('three_courses', 'Curriculum Master', 'Completed 3 courses', '🏆', 'learning', '{"courses_completed": 3}', 250, 'epic', 5),
  
  -- Quiz Achievements
  ('first_quiz', 'Quiz Starter', 'Completed your first quiz', '✅', 'quiz', '{"quizzes_completed": 1}', 10, 'common', 11),
  ('three_quizzes', 'Quiz Master', 'Completed 3 quizzes', '🎪', 'quiz', '{"quizzes_completed": 3}', 25, 'common', 12),
  ('perfect_score', 'Perfect Score', 'Achieved 100% on a quiz', '⭐', 'quiz', '{"perfect_scores": 1}', 50, 'rare', 13),
  ('high_achiever', 'High Achiever', 'Maintained 80%+ average on 5 quizzes', '🌟', 'quiz', '{"high_avg_count": 5}', 100, 'epic', 14),
  
  -- Streak Achievements
  ('three_day_streak', '3-Day Streak', 'Learned for 3 consecutive days', '🔥', 'streak', '{"streak_days": 3}', 25, 'common', 21),
  ('week_warrior', 'Week Warrior', '7-day learning streak', '💪', 'streak', '{"streak_days": 7}', 50, 'rare', 22),
  ('monthly_master', 'Monthly Master', '30-day learning streak', '👑', 'streak', '{"streak_days": 30}', 200, 'epic', 23),
  ('dedication', 'Dedication Legend', '100-day learning streak', '🦸‍♀️', 'streak', '{"streak_days": 100}', 500, 'legendary', 24),
  
  -- Milestone Achievements
  ('early_bird', 'Early Bird', 'Joined The Purple Wings', '🐣', 'milestone', '{"signup": true}', 5, 'common', 31),
  ('profile_complete', 'Profile Pro', 'Completed your profile 100%', '✨', 'milestone', '{"profile_completeness": 100}', 50, 'rare', 32),
  ('bookmark_collector', 'Bookmark Collector', 'Saved 10 courses/lessons', '🔖', 'milestone', '{"bookmarks": 10}', 25, 'common', 33),
  ('time_invested', 'Time Investor', 'Spent 10+ hours learning', '⏰', 'milestone', '{"hours_spent": 10}', 100, 'rare', 34)
ON CONFLICT (code) DO NOTHING;

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

CREATE INDEX IF NOT EXISTS idx_user_achievements_user ON public.user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_achievement ON public.user_achievements(achievement_id);
CREATE INDEX IF NOT EXISTS idx_course_bookmarks_user ON public.course_bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_lesson_bookmarks_user ON public.lesson_bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_learning_streaks_user ON public.learning_streaks(user_id);
CREATE INDEX IF NOT EXISTS idx_playlists_user ON public.learning_playlists(user_id);
CREATE INDEX IF NOT EXISTS idx_playlist_items_playlist ON public.playlist_items(playlist_id);

-- =============================================
-- COMMENTS FOR DOCUMENTATION
-- =============================================

COMMENT ON TABLE public.achievements IS 'Available achievements/badges users can earn';
COMMENT ON TABLE public.user_achievements IS 'Achievements earned by users';
COMMENT ON TABLE public.course_bookmarks IS 'User-saved courses for later';
COMMENT ON TABLE public.lesson_bookmarks IS 'User-saved lessons with notes';
COMMENT ON TABLE public.learning_streaks IS 'User learning streak tracking';
COMMENT ON TABLE public.learning_playlists IS 'Custom learning paths created by users';
COMMENT ON TABLE public.playlist_items IS 'Courses/lessons in user playlists';

COMMENT ON FUNCTION calculate_profile_completeness IS 'Calculates profile completion percentage (0-100)';
COMMENT ON FUNCTION update_learning_streak IS 'Updates user learning streak based on activity';
