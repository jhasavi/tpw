-- Comprehensive Quiz System for 1000+ Questions
-- This creates a robust quiz system with categories, difficulty levels, and tracking

-- Create quiz_categories table
CREATE TABLE IF NOT EXISTS quiz_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quiz_questions table (supports 1000+ questions)
CREATE TABLE IF NOT EXISTS quiz_questions_bank (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES quiz_categories(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  question_type TEXT DEFAULT 'multiple_choice' CHECK (question_type IN ('multiple_choice', 'true_false', 'scenario')),
  difficulty TEXT DEFAULT 'beginner' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  options JSONB NOT NULL, -- Array of {text, isCorrect, explanation}
  correct_answer TEXT NOT NULL,
  explanation TEXT NOT NULL,
  learning_objective TEXT,
  tags TEXT[],
  points INTEGER DEFAULT 1,
  time_limit_seconds INTEGER DEFAULT 60,
  is_active BOOLEAN DEFAULT TRUE,
  usage_count INTEGER DEFAULT 0,
  correct_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quiz_attempts table (tracks user quiz attempts)
CREATE TABLE IF NOT EXISTS quiz_attempts_detailed (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  category_id UUID REFERENCES quiz_categories(id),
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  percentage DECIMAL(5,2),
  time_taken_seconds INTEGER,
  difficulty TEXT,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  questions_data JSONB, -- Store which questions were asked
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quiz_responses table (individual question responses)
CREATE TABLE IF NOT EXISTS quiz_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id UUID REFERENCES quiz_attempts_detailed(id) ON DELETE CASCADE,
  question_id UUID REFERENCES quiz_questions_bank(id),
  user_answer TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  time_taken_seconds INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quiz_achievements table
CREATE TABLE IF NOT EXISTS quiz_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  achievement_type TEXT NOT NULL,
  achievement_name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB
);

-- Enable RLS
ALTER TABLE quiz_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions_bank ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts_detailed ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_achievements ENABLE ROW LEVEL SECURITY;

-- RLS Policies for quiz_categories (public read)
CREATE POLICY "Anyone can view active categories" ON quiz_categories
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage categories" ON quiz_categories
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- RLS Policies for quiz_questions_bank (public read active questions)
CREATE POLICY "Anyone can view active questions" ON quiz_questions_bank
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage questions" ON quiz_questions_bank
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- RLS Policies for quiz_attempts_detailed
CREATE POLICY "Users can view own attempts" ON quiz_attempts_detailed
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create own attempts" ON quiz_attempts_detailed
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can view all attempts" ON quiz_attempts_detailed
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- RLS Policies for quiz_responses
CREATE POLICY "Users can view own responses" ON quiz_responses
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM quiz_attempts_detailed
      WHERE quiz_attempts_detailed.id = quiz_responses.attempt_id
      AND quiz_attempts_detailed.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create own responses" ON quiz_responses
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM quiz_attempts_detailed
      WHERE quiz_attempts_detailed.id = quiz_responses.attempt_id
      AND quiz_attempts_detailed.user_id = auth.uid()
    )
  );

-- RLS Policies for quiz_achievements
CREATE POLICY "Users can view own achievements" ON quiz_achievements
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "System can create achievements" ON quiz_achievements
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_quiz_questions_category ON quiz_questions_bank(category_id, is_active);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_difficulty ON quiz_questions_bank(difficulty, is_active);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_tags ON quiz_questions_bank USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user ON quiz_attempts_detailed(user_id, completed_at DESC);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_category ON quiz_attempts_detailed(category_id, completed_at DESC);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_attempt ON quiz_responses(attempt_id);
CREATE INDEX IF NOT EXISTS idx_quiz_achievements_user ON quiz_achievements(user_id, earned_at DESC);

-- Insert default categories
INSERT INTO quiz_categories (name, slug, description, icon, display_order) VALUES
  ('Budgeting & Money Management', 'budgeting', 'Master the basics of budgeting, expense tracking, and smart spending', '💰', 1),
  ('Banking & Checking Accounts', 'banking', 'Understanding checking accounts, savings, and banking services', '🏦', 2),
  ('Credit & Debt Management', 'credit', 'Credit scores, credit cards, loans, and debt payoff strategies', '💳', 3),
  ('Saving & Emergency Funds', 'saving', 'Building emergency funds and developing saving habits', '🏦', 4),
  ('Investing Basics', 'investing', 'Introduction to stocks, bonds, mutual funds, and retirement accounts', '📈', 5),
  ('Retirement Planning', 'retirement', '401(k), IRA, Social Security, and retirement savings strategies', '👵', 6),
  ('Taxes & Tax Planning', 'taxes', 'Understanding income tax, deductions, credits, and filing', '📋', 7),
  ('Insurance Fundamentals', 'insurance', 'Health, life, disability, and property insurance basics', '🛡️', 8),
  ('Home Buying & Real Estate', 'real-estate', 'Mortgages, home buying process, and real estate investing', '🏠', 9),
  ('Financial Planning for Women', 'women-finance', 'Unique financial challenges and strategies for women', '👩', 10),
  ('Career & Income', 'career', 'Salary negotiation, side hustles, and income optimization', '💼', 11),
  ('Financial Goals & Planning', 'goals', 'Setting and achieving short-term and long-term financial goals', '🎯', 12),
  ('Consumer Protection', 'consumer-protection', 'Avoiding scams, fraud prevention, and consumer rights', '🛡️', 13),
  ('Estate Planning & Wills', 'estate-planning', 'Wills, trusts, beneficiaries, and inheritance planning', '📜', 14),
  ('Financial Literacy Foundations', 'foundations', 'Core financial concepts and terminology', '📚', 15)
ON CONFLICT (slug) DO NOTHING;

-- Function to update question usage stats
CREATE OR REPLACE FUNCTION update_question_stats()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE quiz_questions_bank
  SET 
    usage_count = usage_count + 1,
    correct_count = CASE WHEN NEW.is_correct THEN correct_count + 1 ELSE correct_count END,
    updated_at = NOW()
  WHERE id = NEW.question_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update question stats
DROP TRIGGER IF EXISTS trigger_update_question_stats ON quiz_responses;
CREATE TRIGGER trigger_update_question_stats
  AFTER INSERT ON quiz_responses
  FOR EACH ROW
  EXECUTE FUNCTION update_question_stats();

-- Function to award achievements
CREATE OR REPLACE FUNCTION check_and_award_achievements()
RETURNS TRIGGER AS $$
DECLARE
  total_attempts INTEGER;
  perfect_scores INTEGER;
  total_correct INTEGER;
BEGIN
  -- Count user's attempts
  SELECT COUNT(*) INTO total_attempts
  FROM quiz_attempts_detailed
  WHERE user_id = NEW.user_id;

  -- Award "First Quiz" achievement
  IF total_attempts = 1 THEN
    INSERT INTO quiz_achievements (user_id, achievement_type, achievement_name, description, icon)
    VALUES (NEW.user_id, 'first_quiz', 'Quiz Beginner', 'Completed your first quiz!', '🎯')
    ON CONFLICT DO NOTHING;
  END IF;

  -- Award "10 Quizzes" achievement
  IF total_attempts = 10 THEN
    INSERT INTO quiz_achievements (user_id, achievement_type, achievement_name, description, icon)
    VALUES (NEW.user_id, '10_quizzes', 'Quiz Enthusiast', 'Completed 10 quizzes!', '⭐')
    ON CONFLICT DO NOTHING;
  END IF;

  -- Award "50 Quizzes" achievement  
  IF total_attempts = 50 THEN
    INSERT INTO quiz_achievements (user_id, achievement_type, achievement_name, description, icon)
    VALUES (NEW.user_id, '50_quizzes', 'Quiz Master', 'Completed 50 quizzes!', '🏆')
    ON CONFLICT DO NOTHING;
  END IF;

  -- Check for perfect score achievement
  IF NEW.percentage = 100.00 THEN
    SELECT COUNT(*) INTO perfect_scores
    FROM quiz_attempts_detailed
    WHERE user_id = NEW.user_id AND percentage = 100.00;

    IF perfect_scores = 5 THEN
      INSERT INTO quiz_achievements (user_id, achievement_type, achievement_name, description, icon)
      VALUES (NEW.user_id, 'perfectionist', 'Perfectionist', 'Got 100% on 5 quizzes!', '💯')
      ON CONFLICT DO NOTHING;
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for achievements
DROP TRIGGER IF EXISTS trigger_award_achievements ON quiz_attempts_detailed;
CREATE TRIGGER trigger_award_achievements
  AFTER INSERT ON quiz_attempts_detailed
  FOR EACH ROW
  EXECUTE FUNCTION check_and_award_achievements();
